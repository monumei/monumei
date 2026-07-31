/**
 * The contact channels, in one place.
 *
 * The closing act, the footer and the shell's `contact` command all print
 * these. Three copies of the same handles is three chances for one of them to
 * go stale, so they read from here.
 */
export interface Channel {
  name: string;
  handle: string;
  /** Absent for channels that are copied rather than opened. */
  href?: string;
  /** The value put on the clipboard when there is nowhere to link to. */
  copy?: string;
  rel?: string;
  verb: 'Open' | 'Copy';
}

export const CHANNELS: Channel[] = [
  {
    name: 'GitHub',
    handle: '@monumei',
    href: 'https://github.com/monumei',
    rel: 'me noopener',
    verb: 'Open',
  },
  {
    name: 'Twitter / X',
    handle: '@m0numei',
    href: 'https://x.com/m0numei',
    rel: 'me noopener',
    verb: 'Open',
  },
  {
    name: 'Discord',
    handle: '@monumei',
    copy: 'monumei',
    verb: 'Copy',
  },
];

/** The site's real destinations, for the nav and the footer sitemap. */
export const ROUTES = [
  { href: '/blog/', label: 'The Log', note: 'Writing, notes, conventions' },
  { href: '/work/', label: 'Work', note: 'Projects and what they run on' },
  { href: '/art/', label: 'Art', note: 'Drawings and commissions' },
];
