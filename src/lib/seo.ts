export type JsonLdNode = Record<string, unknown>;

export const SITE_URL = 'https://monumei.com/';
export const SITE_NAME = 'Monumei';
export const PERSON_ID = `${SITE_URL}#person`;
export const WEBSITE_ID = `${SITE_URL}#website`;
export const PROFILE_ID = `${SITE_URL}#profile`;

const personReference = () => ({ '@id': PERSON_ID, name: SITE_NAME });

export const absoluteUrl = (path: string): string => new URL(path, SITE_URL).href;

export function homeSchema(description: string): JsonLdNode[] {
  return [
    {
      '@id': WEBSITE_ID,
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
    {
      '@id': PROFILE_ID,
      '@type': 'ProfilePage',
      url: SITE_URL,
      description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
    },
    {
      '@id': PERSON_ID,
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      jobTitle: 'Principal Software Engineer',
      sameAs: ['https://github.com/monumei', 'https://x.com/m0numei'],
    },
  ];
}

interface Breadcrumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: Breadcrumb[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

interface BlogPostSchemaInput {
  title: string;
  description: string;
  path: string;
  publishedDate: string;
  section: string;
  tags: string[];
}

export function blogPostSchema(input: BlogPostSchemaInput): JsonLdNode[] {
  const canonical = absoluteUrl(input.path);

  return [
    {
      '@type': 'BlogPosting',
      headline: input.title,
      description: input.description,
      url: canonical,
      mainEntityOfPage: canonical,
      datePublished: input.publishedDate,
      articleSection: input.section,
      keywords: input.tags,
      author: personReference(),
    },
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog/' },
      { name: input.title, path: input.path },
    ]),
  ];
}

interface WorkSchemaInput {
  title: string;
  description: string;
  path: string;
  tech: string;
  stack: string[];
  repo?: string;
  live?: string;
}

export function workSchema(input: WorkSchemaInput): JsonLdNode[] {
  const project: JsonLdNode = {
    '@type': 'SoftwareSourceCode',
    name: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    programmingLanguage: input.tech,
    keywords: input.stack,
    author: personReference(),
  };

  if (input.repo) project.codeRepository = input.repo;
  if (input.live) project.workExample = { '@type': 'WebApplication', url: input.live };

  return [
    project,
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Work', path: '/work/' },
      { name: input.title, path: input.path },
    ]),
  ];
}

export function serializeSchema(nodes: JsonLdNode[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(
    /</g,
    '\\u003c'
  );
}
