# DESIGN.md — monumei.com

Written from the built site, not from intention. If the code and this file
disagree, the code is right and this file is stale.

## Thesis

The site is a machine you scroll through in the rain. Two pinned acts do the
storytelling; everything else is chassis.

The world is pinned by two references — **VALORANT RGX 11z Pro (blue variant)**
and **Arknights: Endfield** — fused at the material level rather than the "glow"
level:

- RGX is industrial product design: anodized graphite, machined panel seams,
  and light that reaches you *through* frosted acrylic rather than blooming off
  an edge.
- Endfield is industrial signage printed on metal: zero corner radius, chamfered
  notches, hazard tape, and a signal yellow that means "read this".

**The load-bearing rule: the chassis is neutral (0% saturation). Blue is light,
never metal.** Tinting the panels blue is what makes this genre look generic —
it leaves the LED nothing to do.

## Color

| Role | Token | Value |
|---|---|---|
| Page ground | `--void` | `#08090b` |
| Panel / raised / hover | `--chassis-1..4` | `#131519` → `#2c3138` |
| Seams | `--seam`, `--seam-strong` | white @ 7% / 14% |
| LED (light) | `--led`, `--led-hot`, `--led-deep` | `#2e7bff`, `#8cbaff`, `#0a3fa0` |
| Signage (print) | `--sig` | `#ffd429` |
| Status | `--live` / `--warn` / `--fault` | `#cbff40` / `#ffa502` / `#ff4757` |
| Ink | `--ink`, `--ink-2/3/4` | `#f0f2f5` → `#646c78` |

Strategy is **Committed**: blue occupies whole regions as light (channels,
cavities, the hero sky), not scattered accents. `--ink-4` is for non-essential
labels only — it does not meet 4.5:1 on panel surfaces, so body text never uses it.

The character art was not colour-matched to the palette after the fact; the coat
already sat in the LED-blue family and the horn streaks were already almost
exactly `--sig`. That coincidence is why the figure composites cleanly.

## Type

- **Display** — Saira Variable. Wordmark, headings, buttons, nav, chips.
- **Body** — Chakra Petch. Prose and UI sentences.
- **Data** — JetBrains Mono. Readouts, timestamps, the shell, spec keys, code.
  Mono is restricted to data and measurement; it is never a costume for
  "this section is technical".

Display tracking `-0.035em`, plate tracking `0.24em`. Prose measure 68ch.

## Materials

- **Notch** — one chamfer system, three sizes (`--notch-s/m/l`, 8/14/22px), cut
  top-right and bottom-left. The asymmetry is what stops it reading as a
  generic bevelled box. Radius is 0 everywhere.
- **Panel** — graphite face, 1px seam, and a 2px scanline texture standing in
  for the diffusion film over an acrylic window.
- **LED channel** — a recessed 2px track with a light bar whose fill is driven
  by scroll position. Used for the global spine, every section heading, and
  each work unit's edge.
- **Depth vs emission are separate.** `--lift-*` are real shadows with offset
  and blur. `--emit-*` are light. A zero-offset coloured halo is never used as
  depth.

## Motion

One system, no exceptions: **every stage publishes `--p` (0 → 1) and all motion
is CSS reading that number.** Motion is scrubbed against scroll position, not
fired once on entry — scroll back up and it runs backwards.

`src/components/ScrollEngine.astro` measures only on-screen stages, in one rAF
pass, and writes `--p` plus a document-level `--scroll`.

- `data-stage="pin"` — element is taller than the viewport, inner frame is
  sticky, `--p` runs across the extra height. Used by the hero (250vh) and
  Systems (300vh).
- `data-stage="view"` — `--p` runs from entry to exit. Used by every `.mod`.
- `.rise` / `.rise--late` — single elements, offset ramps.
- `.deck > *` — a wave; each child is nudged later by `--i`.
- `.deck--alt` — alternating horizontal entry, so a second grid on the page
  doesn't repeat the first one's move.

Content is visible by default. Without JS nothing sets `--p` and every stage
sits finished; `prefers-reduced-motion` pins stages to their settled state and
stops the rain. Below 720px both pinned acts fall back to ordinary tall
sections, because the camera move needs viewport height it doesn't have.

## Layout

Rail `1360px`, gutter `clamp(20px, 4vw, 56px)`. Spacing scale `--s1..s10`.
`overflow-x: clip` on `html` (not `hidden` — `hidden` would make the root a
scroll container and break the sticky stages).

## The island

The nav is a floating capsule, not a full-width bar. Collapsed it carries the
mark and the module you are currently in; it morphs open — width, not just
opacity — to reveal the routes. Hover or focus on a pointer device, a button on
touch, where opening drops the routes into a stacked sheet instead.

**This is the one deliberate exception to the zero-radius rule**, at the owner's
request: a Dynamic Island that is not a capsule is not a Dynamic Island. The
chamfer survives in the LED diamond inside it and in the focus ring, so it still
reads as this site's own object rather than a component lifted from another one.

The morph animates a grid track from `0fr` to `1fr` rather than a measured pixel
width — smooth, no JS measurement, and it re-animates correctly when the label
inside changes length. No `backdrop-filter`: the island floats over art that
repaints every frame, which is its worst case.

## Structure

Three collections, three routes, one homepage that samples them.

| Route | Collection | What it is |
|---|---|---|
| `/blog/` | `blog` | The Log — writing, filtered by a closed set of channels |
| `/blog/channel/<c>/` | `blog` | One page per occupied channel. Built only for channels that have entries, so no chip leads anywhere empty |
| `/work/` | `work` | The rack — projects |
| `/art/` | `art` | Drawings, and commissions split into their own section |
| `/rss.xml` | `blog` | Feed, built at compile time |

The homepage shows the first three of each and links out. **Nav links to
routes, never to homepage anchors** — only Shell and Contact are anchors,
because those two genuinely only exist on the homepage. An anchor-only nav is
what made every subpage a dead end: from a post, "Log" pointed at a scroll
position on a different document.

Each fact is stated **once**. Systems owns what Monumei does. The stack used to
appear four times on the homepage — a marquee, Systems, a Loadout panel, and a
shell command — and that repetition was the page's loudest machine-generated
tell. The marquee and the Loadout act are gone; the shell's `skills` now aliases
`whoami` rather than reciting the list again.

The stack's single home is the **evidence column** in Systems: each discipline's
tools sit beside the statement they belong to, in the right half of the stage
that used to be empty board texture. Cloud deliberately carries no tool list —
Monumei is learning it, and inventing provider logos to balance the layout is
exactly the decoration-as-fact this site refuses. It prints its status instead.

The footer carries the sitemap and the handles, because the closing act's
display-scale contact rows only exist on the homepage and every other page
needs a way out.

## Art

The section is a gallery of **Monumei** — the OC shares the site's name — mostly
drawn by commissioned artists, plus Monumei's own pieces. `/art/` leads with
**Commissioned** and follows with **Drawn by me**; one undifferentiated wall
would quietly imply authorship of work that isn't Monumei's.

**Credit is a destination, not small print.** Every commissioned piece names the
artist on the tile. Once that artist has links on file, the name becomes a
control that opens their card — name, handle, how many pieces of theirs hang
here, and every place they can be found or hired. One `<dialog>` binds to any
`[data-artist]` control, so gallery tiles, the lightbox and the homepage rail all
share it.

Until an artist has links, the credit is **printed rather than clickable**. A
button that opens a panel saying "no links yet" is a dead end dressed up as an
affordance.

**One card shape everywhere.** Gallery tiles and rail cells share a 3:4 frame
and crop with `object-fit: cover`, biased to the top so a face survives the crop
before the feet do. Source files run from 4MB to 13MB at wildly different
resolutions, and sizing each tile to its own image made the wall ragged and the
rail's travel distance depend on whatever happened to be in the collection. The
lightbox is where a piece is seen uncropped.

The homepage carries an **art rail**, not a full-bleed band. The band gave a
single image an entire viewport, which is a takeover rather than a section and
could only ever show one piece. The rail travels sideways on the same `--p`
every stage uses: `ScrollEngine` measures the viewport's overflow into
`--travel`, and the pin length is derived from that measurement rather than
guessed — so a rail with nothing to travel never reserves dead scroll, and the
horizontal speed stays constant however many pieces the gallery holds.

Assets:

| Path | What it is |
|---|---|
| `src/assets/hero.png` | The hero figure. Not a gallery entry. |
| `src/assets/arts/<artist>/` | Source images, foldered by the artist who drew them. |
| `src/content/art/*.md` | One file per piece, pointing at an image in `arts/`. |

Adding a piece is one markdown file. For a commission, fill in `artist`, and
`artistHandle` / `artistLinks` when you have them. If a piece is commissioned
and the artist genuinely isn't known yet, `creditPending: true` prints a visible
warning plate — and a commissioned piece with neither an artist nor that flag
**fails the build**, so a credit can be deferred but never silently forgotten.

`date` is optional. A guessed date is an invented fact and the gallery prints
it, so undated pieces carry none and sort after the dated ones in file order.

## Rules this site keeps

- No invented instrumentation. Earlier drafts carried fake `THERM 41°C`
  readouts, a fake `MNM-11z` SKU, and `MOD.01/02/03` section numbering. All
  removed — they are decoration cosplaying as data, and they are the single
  biggest reason a page like this reads as machine-generated. The nav readout
  was a live clock for the same reason and went the same way; it now names the
  section actually under the bar, which is a thing this page knows.
- No claim ships as fact. `sample: true` on a content entry prints a visible
  notice.
- **No artwork ships uncredited.** `commissioned: true` without an `artist`
  fails the build. Commissions get their own section with the credit printed on
  the tile, not buried in a caption.
- Third-party embeds degrade to a printed offline plate, never a broken image.
  The GitHub streak panel was removed outright because every host for it is
  dead.
- The source art's hard crop on its right and bottom edges is bled past the
  frame and masked, so no straight cut is ever visible against the sky.
- Enhancement never owns the only path. Art tiles are links to the image file
  before the lightbox script upgrades them; channel filters are real routes, not
  a client-side filter. Nothing needed to reach content depends on JavaScript.
