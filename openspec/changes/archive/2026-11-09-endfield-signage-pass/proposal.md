## Why

The OC brand pass landed but left duplicates: the homepage shows the wordmark twice on first paint (nav pill and hero), the site sharing card shows both the wordmark and the horn mark twice, and the superseded `v2` card exports still ship in `public/`. The Endfield half of the visual language lives in the global utilities but barely reaches the hero or the sharing cards, which lean on a generic blue gradient instead.

## What Changes

- Remove the versioned `social-*-v2.png` and `social-*-v3.png` exports; publish unversioned `social-site.png` and `social-vibe-coding.png`.
- Nav shows the compact mark only on the homepage, where the hero carries the wordmark.
- Hero gains an Endfield-style signage layer built from existing utilities: hairline frame with corner brackets, a mono data column, diamond markers, and a yellow designation plate.
- Hero wordmark is sized so the full name clears the artwork on desktop.
- Both sharing cards move to one industrial template: graphite field with a hairline grid, mono designation header, one wordmark, yellow plate, bracketed mark frame, and a narrow LED channel in place of the blue gradient wall.

Style references (Endfield, Lungmen, Aurorian) inform vocabulary only. No game logos, names, characters, or art are used.

## Impact

`src/components/Nav.astro`, `src/components/Hero.astro`, `src/layouts/Base.astro`, the blog post frontmatter, `src/assets/social-*.svg`, `public/social-*`.
