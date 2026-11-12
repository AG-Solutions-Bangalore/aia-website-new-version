<?php
/**
 * Dynamic API-Driven Sitemap Generator
 * Pure API data direct from https://aia.in.net/webapi/public/api/getSitemap
 * No manual modifications, no hardcoded rules, no extra tables.
 */

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');

$apiUrl = 'https://aia.in.net/webapi/public/api/getSitemap';

$ctx = stream_context_create([
    'http' => [
        'timeout' => 15,
        'header'  => "Accept: application/json\r\nUser-Agent: AIA-Sitemap-Generator/1.0\r\n",
    ],
    'ssl' => [
        'verify_peer' => true,
        'verify_peer_name' => true,
    ],
]);

$response = @file_get_contents($apiUrl, false, $ctx);
if ($response === false) {
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    echo "  <url>\n    <loc>https://aia.in.net/</loc>\n    <priority>1.00</priority>\n  </url>\n";
    echo "</urlset>";
    exit;
}

$data = json_decode($response, true);
if (!is_array($data)) {
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
    echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
    echo "  <url>\n    <loc>https://aia.in.net/</loc>\n    <priority>1.00</priority>\n  </url>\n";
    echo "</urlset>";
    exit;
}

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
echo "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

// 1. Root
echo "  <url>\n";
echo "    <loc>https://aia.in.net/</loc>\n";
echo "    <priority>1.00</priority>\n";
echo "  </url>\n";

// 2. Active pages direct from API data
if (!empty($data['data']) && is_array($data['data'])) {
    foreach ($data['data'] as $page) {
        $status = strtolower(trim($page['page_two_status'] ?? ''));
        if ($status !== 'active') {
            continue;
        }

        $url = trim($page['page_two_url'] ?? '');
        $url = ltrim($url, '/');
        if ($url === '') {
            continue;
        }

        $loc = 'https://aia.in.net/' . htmlspecialchars($url, ENT_XML1, 'UTF-8');
        $priority = !empty($page['page_two_priority']) ? htmlspecialchars($page['page_two_priority'], ENT_XML1, 'UTF-8') : '0.80';
        $lastmod = !empty($page['updated_at']) ? substr($page['updated_at'], 0, 10) : '';

        echo "  <url>\n";
        echo "    <loc>{$loc}</loc>\n";
        if (!empty($lastmod)) {
            echo "    <lastmod>{$lastmod}</lastmod>\n";
        }
        echo "    <priority>{$priority}</priority>\n";
        echo "  </url>\n";
    }
}

// 3. Active blogs direct from API blog
if (!empty($data['blog']) && is_array($data['blog'])) {
    foreach ($data['blog'] as $blog) {
        $status = strtolower(trim($blog['page_two_status'] ?? ''));
        if ($status !== 'active') {
            continue;
        }

        $url = trim($blog['page_two_url'] ?? '');
        $url = ltrim($url, '/');
        if ($url === '') {
            continue;
        }

        $loc = 'https://aia.in.net/blogs/' . htmlspecialchars($url, ENT_XML1, 'UTF-8');
        $priority = !empty($blog['page_two_priority']) ? htmlspecialchars($blog['page_two_priority'], ENT_XML1, 'UTF-8') : '0.80';
        $lastmod = !empty($blog['updated_at']) ? substr($blog['updated_at'], 0, 10) : '';

        echo "  <url>\n";
        echo "    <loc>{$loc}</loc>\n";
        if (!empty($lastmod)) {
            echo "    <lastmod>{$lastmod}</lastmod>\n";
        }
        echo "    <priority>{$priority}</priority>\n";
        echo "  </url>\n";
    }
}

echo "</urlset>";

