---
title: monumei.com
summary: This site — a static Astro build with a hardware-inspired interface and zero runtime JavaScript dependencies.
unit: 1
tech: Astro
stack: [Astro, TypeScript, Vanilla CSS, Bun]
status: ongoing
year: '2026'
repo: https://github.com/monumei/monumei
---

The portfolio you're reading. Built as a static Astro site with vanilla CSS and no
runtime framework, because a personal site that takes a second to become interactive
is a personal site nobody scrolls.

## The idea

Two visual references drive the whole interface: the **RGX 11z Pro** weapon skin line
from VALORANT, and the UI language of **Arknights: Endfield**.

The easy reading of both is "dark page, neon glow". That's not what either one is
actually doing. RGX is industrial product design — anodized graphite, machined panel
seams, and light that reaches you *through* frosted acrylic rather than blooming off
an edge. Endfield is industrial signage printed on metal — zero corner radius,
chamfered notches, stencil numerals, hazard tape.

So the site is built as a piece of hardware. The chassis is neutral graphite with no
colour in it at all; blue only ever appears as light inside a channel or behind a
window, and signal yellow only ever appears as printed marking. Keeping the metal
neutral is what leaves the LED something to do.

## Notes on the build

- **Content collections** for the log and the rack, schema-checked at build time.
  A malformed post fails the build instead of shipping broken.
- **One authored motion system** rather than scattered hover effects: modules seat
  into the chassis and their LED channel fills as they come online. Everything is
  `IntersectionObserver` plus CSS transitions.
- **Visible by default.** Every reveal only ever adds. With JavaScript disabled, or
  with `prefers-reduced-motion` set, the finished state is what renders.
- **The shell is real.** It reads the same content collections the page does, so
  `log` and `projects` can't drift from what's on screen, and `open UNIT.01` routes
  to an actual page.

## Still open

The project cards want real screenshots — right now the rack is one unit deep. The
Spotify and GitHub telemetry panels depend on third-party services that go down
regularly, so both degrade to a printed offline plate rather than a broken image.
