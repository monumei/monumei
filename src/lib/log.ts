import { getCollection, type CollectionEntry } from 'astro:content';
import { CHANNELS, type ChannelName } from '../content.config';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function channelCounts(posts: Post[]): { channel: ChannelName; count: number }[] {
  return CHANNELS.map((channel) => ({
    channel,
    count: posts.filter((p) => p.data.channel === channel).length,
  })).filter((c) => c.count > 0);
}

export function neighbours(posts: Post[], id: string): { newer?: Post; older?: Post } {
  const i = posts.findIndex((p) => p.id === id);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}
