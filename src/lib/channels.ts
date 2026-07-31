export interface Channel {
  name: string;
  handle: string;
  href?: string;
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

export const ROUTES = [
  { href: '/blog/', label: 'The Log', note: 'Writing, notes, conventions' },
  { href: '/work/', label: 'Work', note: 'Projects and what they run on' },
  { href: '/art/', label: 'Art', note: 'Drawings and commissions' },
];
