import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/log';

/**
 * The log's feed. Built at compile time, so it costs nothing at runtime and
 * cannot drift from what the site actually publishes.
 */
export async function GET(context: APIContext) {
  const posts = await getPosts();

  return rss({
    title: 'Monumei — The Log',
    description:
      'Writing by Monumei on fullstack engineering, cloud, design, conventions, and the occasional rhythm-game tangent.',
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
