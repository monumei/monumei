---
title: monumei.com
summary: A static Astro portfolio with a hardware-inspired interface, content collections, and no client framework.
unit: 1
tech: Astro
stack: [Astro, TypeScript, Vanilla CSS, Bun]
status: ongoing
year: '2026'
repo: https://github.com/monumei/monumei
---

The site you are reading runs as a static Astro build with vanilla CSS. Astro ships
small scripts for the interactions that need them, while the main pages render without
a client framework.

## Visual system

VALORANT's RGX 11z Pro line and Arknights: Endfield shaped the interface. RGX supplied
the graphite chassis, panel seams, and diffused blue light. Endfield supplied the
printed labels, square geometry, and signal yellow.

The palette keeps metal neutral. Blue appears as light inside channels and windows.
Yellow marks labels and status. Each color has one job.

## Build notes

- Astro content collections validate Blog, Work, and Art entries during the build.
- One scroll controller updates section progress. CSS handles the visual response.
- Content renders in its finished state without JavaScript and under reduced-motion
  settings.
- The hidden Shell reads from the same collections as the visible pages, so its
  commands stay current.

## Next

The Work section needs more project screenshots and case studies. External music and
GitHub panels will stay optional so third-party outages cannot break the page.
