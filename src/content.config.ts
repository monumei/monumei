import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Channels are a closed set rather than free text. A free-form label drifts —
 * `ENG`, `Eng`, `engineering` all become separate filters — and the log's
 * channel index is only useful if the same subject always lands in the same
 * place.
 */
export const CHANNELS = ['ENG', 'CLOUD', 'DESIGN', 'ART', 'EVENT', 'LIFE', 'META'] as const;

export type ChannelName = (typeof CHANNELS)[number];

/** What each channel is for, printed on the log's filter row. */
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
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      /** Which channel the entry files under. See CHANNELS above. */
      channel: z.enum(CHANNELS).default('ENG'),
      /** Free-form, for cross-cutting subjects a channel is too broad for. */
      tags: z.array(z.string()).default([]),
      /**
       * Optional lead image. Event write-ups want photos; an engineering note
       * usually does not, so nothing is forced to carry one.
       */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Hides the entry from listings without deleting the file. */
      draft: z.boolean().default(false),
      /**
       * Marks an entry as a scaffolding example rather than Monumei's real
       * writing. Rendered with a visible notice. Delete the flag when the
       * content is genuinely yours.
       */
      sample: z.boolean().default(false),
    })
      // A cover with no alt text is a picture nobody reading with a screen
      // reader can use. Catch it at build time rather than shipping it.
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
    /** Ordering within the rack. Lower sorts first. */
    unit: z.number(),
    /** Primary technology, shown on the unit plate. */
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

/**
 * Art — the gallery of Monumei's OC, mostly drawn by commissioned artists,
 * plus Monumei's own pieces.
 *
 * The credit fields are not optional decoration. Publishing another artist's
 * work without their name on it is the one thing this section must never do,
 * so a commissioned piece has to either name its `artist` or say out loud that
 * the credit is still being chased (`creditPending`). Forgetting fails the
 * build; deferring on purpose is allowed and prints a visible warning plate.
 */
const art = defineCollection({
  loader: glob({ base: './src/content/art', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string(),
        /** Required: this is the alt text, not a caption. */
        alt: z.string(),
        image: image(),
        /**
         * Optional. A guessed date is an invented fact, and the gallery prints
         * this one — so a piece whose date isn't known simply doesn't carry it.
         * Dated pieces sort newest first, undated ones follow in file order.
         */
        date: z.coerce.date().optional(),
        /** Optional note printed under the piece in the lightbox. */
        note: z.string().optional(),
        /** e.g. "Digital — Procreate", "Ink on paper". */
        medium: z.string().optional(),
        /** True when another artist drew it for Monumei. */
        commissioned: z.boolean().default(false),
        /** The artist's name, as they want to be credited. */
        artist: z.string().optional(),
        /** Their handle, e.g. "@someone". Printed on the tile. */
        artistHandle: z.string().optional(),
        /**
         * Where to find them. Each entry becomes a row in the artist card —
         * ArtStation, Twitter, Pixiv, a shop, commissions-open form, whatever
         * they actually use.
         */
        artistLinks: z
          .array(z.object({ label: z.string(), href: z.string().url() }))
          .default([]),
        /**
         * Set when the piece is commissioned but the credit hasn't been filled
         * in yet. Renders a loud plate rather than quietly reading as Monumei's
         * own work.
         */
        creditPending: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        /** Pulls the piece into the homepage art band. */
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
