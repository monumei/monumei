import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/log';

export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: 'Monumei | Blog',
    description: 'Notes on software engineering, products, databases, AI, design, and rhythm games.',
    site: context.site ?? 'https://monumei.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: [post.data.channel, ...post.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
