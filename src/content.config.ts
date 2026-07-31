import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CHANNELS = ['ENG', 'CLOUD', 'DESIGN', 'ART', 'EVENT', 'LIFE', 'META'] as const;

export type ChannelName = (typeof CHANNELS)[number];

export const CHANNEL_NOTES: Record<ChannelName, string> = {
  ENG: 'Building things',
  CLOUD: 'Infrastructure, still learning',
  DESIGN: 'Interfaces and type',
  ART: 'Drawing',
  EVENT: 'Conventions and meetups',
  LIFE: 'Everything else',
  META: 'About this site',
};

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        summary: z.string(),
        date: z.coerce.date(),
        channel: z.enum(CHANNELS).default('ENG'),
        tags: z.array(z.string()).default([]),
        cover: image().optional(),
        coverAlt: z.string().optional(),
        draft: z.boolean().default(false),
        sample: z.boolean().default(false),
      })
      .refine((d) => !d.cover || !!d.coverAlt, {
        message: 'An entry with a `cover` must also set `coverAlt` describing the image.',
        path: ['coverAlt'],
      }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    unit: z.number(),
    tech: z.string(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['shipped', 'maintained', 'ongoing', 'personal', 'archived']),
    year: z.string().optional(),
    repo: z.string().url().optional(),
    live: z.string().url().optional(),
    draft: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

const art = defineCollection({
  loader: glob({ base: './src/content/art', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        alt: z.string(),
        image: image(),
        date: z.coerce.date().optional(),
        note: z.string().optional(),
        medium: z.string().optional(),
        commissioned: z.boolean().default(false),
        artist: z.string().optional(),
        artistHandle: z.string().optional(),
        artistLinks: z
          .array(z.object({ label: z.string(), href: z.string().url() }))
          .default([]),
        creditPending: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
        sample: z.boolean().default(false),
      })
      .refine((d) => !d.commissioned || !!d.artist || d.creditPending, {
        message:
          'A commissioned piece must name its `artist`, or set `creditPending: true` to say the credit is still being chased. Never publish another artist’s work silently uncredited.',
        path: ['artist'],
      })
      .refine((d) => !d.artistLinks.length || !!d.artist, {
        message: 'artistLinks needs an `artist` to attach the links to.',
        path: ['artist'],
      }),
});

export const collections = { blog, work, art };
