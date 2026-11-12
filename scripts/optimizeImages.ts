/**
 * @file scripts/optimizeImages.ts
 * @description Build-time image optimizer. Scans prerendered HTML for the
 * original remote image URLs exposed by `OptimizedImage` (`data-original-src`),
 * downloads each source once, and emits deterministic AVIF/WebP variants into
 * `dist/optimized/<kind>/`.
 *
 * The runtime derives the same filenames via `src/lib/imageVariants.ts`, so no
 * manifest or HTML rewrite is needed after the optimizer runs.
 */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import {
  IMAGE_KIND_FORMATS,
  IMAGE_KIND_WIDTHS,
  detectImageKind,
  imageBasename,
  isOptimizableRemoteImage,
  optimizedImagePath,
} from "../src/lib/imageVariants";

const DIST_DIR = path.resolve(process.argv[2] || "dist");
const CONCURRENCY = 4;
const REMOTE_IMAGE_RE = /https:\/\/aia\.in\.net\/webapi\/[^"'\s<>]+/g;

function walkHtml(dir: string, files: string[] = []): string[] {
  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "assets" || entry.name === "optimized") continue;
      walkHtml(fullPath, files);
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function collectSources(): string[] {
  const sources = new Set<string>();

  for (const file of walkHtml(DIST_DIR)) {
    const html = fs.readFileSync(file, "utf8");
    const matches = html.match(REMOTE_IMAGE_RE) || [];

    for (const match of matches) {
      const normalized = match.replace(/\/images\/\/+/g, "/images/");

      if (normalized.endsWith("/")) continue;

      if (isOptimizableRemoteImage(normalized)) {
        sources.add(normalized);
      }
    }
  }

  return [...sources].sort();
}

async function optimizeSource(source: string): Promise<number> {
  const kind = detectImageKind(source);
  const widths = IMAGE_KIND_WIDTHS[kind];
  const formats = IMAGE_KIND_FORMATS[kind];
  const base = imageBasename(source);

  let response: Response;

  try {
    response = await fetch(source);
  } catch {
    console.warn(`  ! download failed: ${source}`);
    return 0;
  }

  if (!response.ok) {
    console.warn(`  ! HTTP ${response.status}: ${source}`);
    return 0;
  }

  const input = Buffer.from(await response.arrayBuffer());

  try {
    await sharp(input).metadata();
  } catch {
    console.warn(`  ! not a decodable image: ${source}`);
    return 0;
  }

  let written = 0;

  for (const format of formats) {
    for (const width of widths) {
      const target = optimizedImagePath(source, width, format, kind);
      const outputPath = path.join(DIST_DIR, target.replace(/^\//, ""));
      const outputDir = path.dirname(outputPath);

      fs.mkdirSync(outputDir, { recursive: true });

      try {
        let pipeline = sharp(input).resize({
          width,
          withoutEnlargement: true,
        });

        pipeline =
          format === "avif"
            ? pipeline.avif({ quality: 52, effort: 4 })
            : pipeline.webp({ quality: 72, effort: 4 });

        await pipeline.toFile(outputPath);
        written += 1;
      } catch {
        console.warn(`  ! encode failed (${format} ${width}): ${source}`);
      }
    }
  }

  console.log(`  ✓ ${kind.padEnd(7)} ${base} (${written} files)`);
  return written;
}

async function run() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`✗ dist directory not found: ${DIST_DIR}`);
    process.exitCode = 1;
    return;
  }

  const sources = collectSources();

  if (sources.length === 0) {
    console.log("Image optimizer: no remote sources found in dist HTML.");
    return;
  }

  const optDir = path.join(DIST_DIR, "optimized");
  if (fs.existsSync(optDir)) {
    fs.rmSync(optDir, { recursive: true, force: true });
  }

  console.log(`Image optimizer: ${sources.length} unique sources`);

  let total = 0;
  let cursor = 0;

  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (cursor < sources.length) {
      const index = cursor++;
      const written = await optimizeSource(sources[index]);
      total += written;
    }
  });

  await Promise.all(workers);

  console.log(`Image optimizer: generated ${total} files into dist/optimized.`);
}

run().catch((error) => {
  console.error("✗ Image optimizer failed:", error);
  process.exitCode = 1;
});
