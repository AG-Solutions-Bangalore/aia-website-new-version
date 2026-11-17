<?php
/**
 * Dynamic API-Driven Sitemap Generator
 * Pure API data direct from https://aia.in.net/webapi/public/api/getSitemap
 * No manual modifications, no hardcoded rules, no extra tables.
 *
 * On any API failure, this script outputs an <error> XML element with the
 * exact error details so you can see what went wrong and fix it.
 */

header('Content-Type: application/xml; charset=utf-8');
header('Cache-Control: no-cache, must-revalidate');

$apiUrl = 'https://aia.in.net/webapi/public/api/getSitemap';

function outputSitemapError(string $message, int $httpCode = 0, string $curlError = ''): void
{
    echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
    echo "  <url>\n";
    echo "    <loc>https://aia.in.net/sitemap-error</loc>\n";
    echo "    <priority>0.0</priority>\n";
    echo "  </url>\n";
    echo "  <error>\n";
    echo "    <message>" . htmlspecialchars($message, ENT_XML1, 'UTF-8') . "</message>\n";
    if ($httpCode > 0) {
        echo "    <http_code>" . htmlspecialchars((string) $httpCode, ENT_XML1, 'UTF-8') . "</http_code>\n";
    }
    if ($curlError !== '') {
        echo "    <curl_error>" . htmlspecialchars($curlError, ENT_XML1, 'UTF-8') . "</curl_error>\n";
    }
    echo "  </error>\n";
    echo '</urlset>';
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json',
    'User-Agent: AIA-Sitemap-Generator/1.0',
]);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_MAXREDIRS, 5);

// Always verify SSL peer; fail loudly if CA bundle is missing so you can fix it
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Step 1: curl execution failed (network, DNS, SSL, timeout, etc.)
if ($response === false) {
    outputSitemapError(
        'cURL request to CRM API failed.',
        $httpCode,
        $curlError
    );
    exit;
}

// Step 2: HTTP status not 200
if ($httpCode !== 200) {
    outputSitemapError(
        'CRM API returned non-200 HTTP status.',
        $httpCode,
        $curlError
    );
    exit;
}

// Step 3: JSON decode failed
$data = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    outputSitemapError(
        'CRM API returned invalid JSON: ' . json_last_error_msg(),
        $httpCode,
        $curlError
    );
    exit;
}

// Step 4: Missing expected keys
if (!isset($data['data']) || !is_array($data['data'])) {
    outputSitemapError(
        'CRM API response missing "data" array.',
        $httpCode,
        $curlError
    );
    exit;
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// 1. Root
echo "  <url>\n";
echo "    <loc>https://aia.in.net/</loc>\n";
echo "    <priority>1.00</priority>\n";
echo "  </url>\n";

// 2. Active pages direct from API data
foreach ($data['data'] as $page) {
    $status = strtolower(trim($page['page_two_status'] ?? ''));
    if ($status !== 'active') {
        continue;
    }

    $url = trim($page['page_two_url'] ?? '');
    $url = trim($url, '/');
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

// 3. Active blogs direct from API blog
if (isset($data['blog']) && is_array($data['blog'])) {
    foreach ($data['blog'] as $blog) {
        $status = strtolower(trim($blog['page_two_status'] ?? ''));
        if ($status !== 'active') {
            continue;
        }

        $url = trim($blog['page_two_url'] ?? '');
        $url = trim($url, '/');
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
