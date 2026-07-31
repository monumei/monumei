import { getCollection, type CollectionEntry } from 'astro:content';
import { CHANNELS, type ChannelName } from '../content.config';

export type Post = CollectionEntry<'blog'>;

/** Published entries, newest first. Drafts never leave the working copy. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * How many entries sit in each channel, in the declared channel order.
 * Channels with nothing in them are dropped — the filter row only prints
 * chips that lead somewhere.
 */
export function channelCounts(posts: Post[]): { channel: ChannelName; count: number }[] {
  return CHANNELS.map((channel) => ({
    channel,
    count: posts.filter((p) => p.data.channel === channel).length,
  })).filter((c) => c.count > 0);
}

/**
 * The entries either side of this one, for the footer of a post.
 *
 * `posts` is newest-first, so the entry at a lower index is the newer one.
 * Returning them as newer/older rather than prev/next keeps the labels honest
 * — "previous" is ambiguous in a reverse-chronological list.
 */
export function neighbours(posts: Post[], id: string): { newer?: Post; older?: Post } {
  const i = posts.findIndex((p) => p.id === id);
  if (i === -1) return {};
  return { newer: posts[i - 1], older: posts[i + 1] };
}
