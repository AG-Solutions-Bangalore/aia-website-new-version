import { BASE_URL } from "./base-url";

const normalizeCourse = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const stripRouteSuffix = (value) =>
  value.replace(/[-_\s]+(curriculum|course|syllabus|page|route)$/i, "").trim();

const toTitleCase = (value) =>
  value.replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

const buildSlugVariants = (slug) => {
  const raw = String(slug ?? "").trim();
  if (!raw) return [];

  const spaced = raw.replace(/[-_]+/g, " ").trim();
  const dashed = spaced.replace(/\s+/g, "-");
  const core = stripRouteSuffix(spaced);
  const coreDashed = core.replace(/\s+/g, "-");

  const bases = [raw, spaced, dashed, core, coreDashed];
  if (/^cia[-_\s]*challenge/i.test(raw)) bases.push("CIAC");

  const variants = [];
  for (const value of bases) {
    if (!value) continue;
    variants.push(value, toTitleCase(value), value.toLowerCase(), value.toUpperCase());
  }
  return [...new Set(variants)];
};

const scoreResponse = (json, target) => {
  const rows = Array.isArray(json?.data) ? json.data : [];
  if (rows.length === 0) return -1;
  const exactMatches = rows.filter(
    (row) => normalizeCourse(row?.student_course) === target,
  ).length;
  return exactMatches / rows.length;
};

const resolveTargetCourse = (slug) => {
  if (/^cia[-_\s]*challenge/i.test(slug)) return "ciac";
  return normalizeCourse(stripRouteSuffix(slug.replace(/[-_]+/g, " ")));
};

export async function fetchTestimonials(slug) {
  const normalized = String(slug ?? "").trim().toLowerCase();

  if (!normalized || normalized === "home" || normalized === "all") {
    const res = await fetch(`${BASE_URL}/api/getAllTestimonials`);
    if (!res.ok) throw new Error(`Testimonials request failed: ${res.status}`);
    return res.json();
  }

  const target = resolveTargetCourse(normalized);
  let best = null;
  let bestScore = -1;
  let fallback = { data: [], image_url: [] };

  for (const variant of buildSlugVariants(slug)) {
    try {
      const res = await fetch(
        `${BASE_URL}/api/getTestimonialbyCourse/${encodeURIComponent(variant)}`,
      );
      if (!res.ok) continue;

      const json = await res.json();
      if (!json) continue;
      fallback = json;

      const score = scoreResponse(json, target);
      if (score === 1) return json;
      if (score > bestScore) {
        best = json;
        bestScore = score;
      }
    } catch {
      continue;
    }
  }

  return best || fallback;
}
