import { getCollection, type CollectionEntry } from 'astro:content';

export type ArtEntry = CollectionEntry<'art'>;

export async function getArt(): Promise<ArtEntry[]> {
  const art = await getCollection('art', ({ data }) => !data.draft);
  return art.sort((a, b) => {
    const at = a.data.date?.getTime();
    const bt = b.data.date?.getTime();
    if (at !== undefined && bt !== undefined) return bt - at;
    if (at !== undefined) return -1;
    if (bt !== undefined) return 1;
    return a.id.localeCompare(b.id);
  });
}

export function artistKey(name?: string): string {
  return (name ?? '').trim().toLowerCase();
}

export function artistCounts(entries: ArtEntry[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const e of entries) {
    const key = artistKey(e.data.artist);
    if (!key) continue;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

export function artistPayload(data: ArtEntry['data'], count: number): string {
  return JSON.stringify({
    name: data.artist ?? '',
    handle: data.artistHandle ?? '',
    links: data.artistLinks,
    count,
  });
}
