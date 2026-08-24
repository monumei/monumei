const errors: string[] = [];

const fail = (page: string, message: string) => errors.push(`${page}: ${message}`);
const count = (source: string, pattern: RegExp) => [...source.matchAll(pattern)].length;
const has = (source: string, pattern: RegExp) => pattern.test(source);

function routeFor(file: string): string {
  if (file === 'index.html') return '/';
  if (file === '404.html') return '/404/';
  return `/${file.replace(/index\.html$/, '')}`;
}

function schemaTypes(source: string, page: string): Set<string> {
  const match = source.match(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/
  );
  if (!match) return new Set();

  try {
    const parsed = JSON.parse(match[1]) as { '@graph'?: Array<{ '@type'?: string }> };
    return new Set((parsed['@graph'] ?? []).flatMap((node) => node['@type'] ?? []));
  } catch (error) {
    fail(page, `invalid JSON-LD: ${String(error)}`);
    return new Set();
  }
}

const glob = new Bun.Glob('**/*.html');
const files = [...glob.scanSync({ cwd: 'dist' })].sort();

for (const file of files) {
  const page = routeFor(file);
  const source = await Bun.file(`dist/${file}`).text();
  const noindex = has(source, /<meta name="robots" content="noindex,follow">/);
  const is404 = file === '404.html';

  if (count(source, /<h1\b/g) !== 1) fail(page, 'expected exactly one h1');
  if (count(source, /<title>/g) !== 1) fail(page, 'expected exactly one title');
  if (count(source, /<meta name="description"/g) !== 1) {
    fail(page, 'expected exactly one meta description');
  }

  if (!noindex) {
    if (count(source, /<link rel="canonical"/g) !== 1) {
      fail(page, 'expected exactly one canonical');
    }

    const requiredSocial = [
      /<meta property="og:type"/,
      /<meta property="og:site_name" content="Monumei">/,
      /<meta property="og:locale" content="en_US">/,
      /<meta property="og:title"/,
      /<meta property="og:description"/,
      /<meta property="og:url"/,
      /<meta name="twitter:card" content="summary">/,
      /<meta name="twitter:creator" content="@m0numei">/,
      /<meta name="twitter:title"/,
      /<meta name="twitter:description"/,
    ];
    for (const pattern of requiredSocial) {
      if (!has(source, pattern)) fail(page, `missing social metadata ${pattern}`);
    }
  }

  if (has(source, /<meta property="og:image"|<meta name="twitter:image"/)) {
    fail(page, 'image metadata must wait for approved assets');
  }

  const types = schemaTypes(source, page);
  if (page === '/') {
    for (const type of ['WebSite', 'ProfilePage', 'Person']) {
      if (!types.has(type)) fail(page, `missing ${type} schema`);
    }
  }

  const isBlogPost = page.startsWith('/blog/') && page !== '/blog/' && !page.startsWith('/blog/channel/');
  if (isBlogPost) {
    if (!types.has('BlogPosting')) fail(page, 'missing BlogPosting schema');
    if (!types.has('BreadcrumbList')) fail(page, 'missing BreadcrumbList schema');
    if (!has(source, /<meta property="og:type" content="article">/)) {
      fail(page, 'expected article Open Graph type');
    }
    if (!has(source, /<meta property="article:published_time"/)) {
      fail(page, 'missing article publication time');
    }
    if (!has(source, /<meta property="article:section"/)) {
      fail(page, 'missing article section');
    }
  }

  const isWorkDetail = page.startsWith('/work/') && page !== '/work/';
  if (isWorkDetail) {
    if (!types.has('SoftwareSourceCode')) fail(page, 'missing SoftwareSourceCode schema');
    if (!types.has('BreadcrumbList')) fail(page, 'missing BreadcrumbList schema');
  }

  if (page.startsWith('/blog/channel/')) {
    if (!noindex) fail(page, 'channel archive must be noindex,follow');
    if (!has(source, /<link rel="canonical"/)) fail(page, 'channel archive needs canonical');
  }

  if (is404) {
    if (!noindex) fail(page, '404 must be noindex,follow');
    if (has(source, /<link rel="canonical"/)) fail(page, '404 must not have canonical');
    if (has(source, /<meta property="og:|<meta name="twitter:/)) {
      fail(page, '404 must not have social metadata');
    }
    if (types.size > 0) fail(page, '404 must not have JSON-LD');
  }
}

const robots = await Bun.file('dist/robots.txt').text();
if (!robots.includes('User-agent: *\nAllow: /')) fail('/robots.txt', 'must allow site crawling');
if (!robots.includes('Sitemap: https://monumei.com/sitemap-index.xml')) {
  fail('/robots.txt', 'must name absolute sitemap index URL');
}

const sitemap = await Bun.file('dist/sitemap-0.xml').text();
for (const url of [
  'https://monumei.com/',
  'https://monumei.com/blog/',
  'https://monumei.com/work/',
  'https://monumei.com/art/',
]) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail('/sitemap-0.xml', `missing ${url}`);
}
if (sitemap.includes('/blog/channel/')) {
  fail('/sitemap-0.xml', 'must exclude noindex channel archives');
}

if (errors.length > 0) {
  console.error(`SEO check failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`SEO check passed for ${files.length} HTML pages.`);
