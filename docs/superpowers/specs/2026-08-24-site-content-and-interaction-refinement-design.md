# Site Content and Interaction Refinement

Date: 2026-08-24

## Goal

Refine monumei.com without replacing its hardware-inspired identity. The update fixes the mobile art interaction, turns the Shell into an easter egg, clarifies Monumei's engineering capabilities, renames the Log to the Blog, rewrites public copy, and adds a small set of UI and motion improvements.

## Scope

This revision covers the homepage, Blog pages, Work pages, Art page, shared navigation, metadata, empty states, and Shell copy. It keeps the current Astro architecture, content collections, visual tokens, and desktop scroll system.

## Homepage Structure

The homepage keeps its current order with one removal:

1. Hero
2. Identity and interests
3. Blog
4. Selected Work
5. Art
6. Channels and current listening

The visible Shell section leaves the page flow. The Shell remains in the homepage document as a hidden overlay so visitors can discover it through easter egg triggers.

## Identity and Engineering Capabilities

The current three-part identity stays intact:

- Software Engineering
- Rhythm Games
- Art and Commissions

The section heading becomes "Engineering, rhythm games, and art." The Software Engineering row presents five capability areas under the label "Work I take on":

- Full-stack Engineering
- Product Engineering
- Solutions Engineering
- Database Engineering
- AI Engineering

These items describe the types of problems Monumei handles. They do not become five separate identity rows, and they do not use an "in active use" label or a tool inventory.

The Rhythm Games row keeps maimai and the existing play history as personal context. The Art and Commissions row credits the artists behind commissioned pieces and mentions Monumei's occasional original work without presenting commissioned art as Monumei's own work.

## Blog Naming

All visitor-facing uses of "Log" become "Blog." This includes homepage plates and buttons, navigation, page titles, descriptions, channel pages, entry navigation, empty states, RSS title, Shell commands and output, and prose that refers to the section.

Existing `/blog/` routes stay unchanged. Internal implementation names can stay when renaming them would add churn without changing the visitor experience.

## Mobile Art Interaction

Desktop keeps the pinned, scroll-driven horizontal Art sequence.

At viewport widths of 860px or less, the Art section becomes a normal document section. Vertical scrolling moves past it without pinning or translating the cards. Visitors swipe the card rail with native horizontal touch scrolling. Cards snap to stable resting points.

The mobile rail includes compact position marks. The active mark updates as the visitor swipes, communicates the current card to assistive technology where useful, and does not block native scrolling. The rail hides its scrollbar while retaining keyboard and touch access.

Short viewports and reduced-motion settings use the same static, swipeable behavior. Desktop reduced-motion mode removes scroll-driven animation and keeps all pieces reachable.

## Shell Easter Egg

The Shell disappears from primary navigation and the visible homepage sequence. Visitors can open it through any of these triggers:

- Enter the Konami code with a keyboard.
- Type `shell` while focus is outside a form control.
- Tap the Monumei navigation mark five times within a short interval on touch devices.

The Shell opens in a full-screen dialog layer with a clear close control. Escape closes it. Opening the dialog moves focus into the Shell, prevents background scrolling, and keeps keyboard focus inside the dialog. Closing it restores focus to the trigger when the browser exposes one.

The overlay reuses the current terminal component and command behavior. It adds no routing requirement and no third-party dependency. Reduced-motion mode displays the final open and closed states without transition.

## Copy Direction

The rewrite covers visible interface copy, page metadata, the existing Work case study, the existing Blog entry, Art descriptions, empty states, and Shell responses.

Copy should:

- Sound direct, specific, and personal.
- Preserve the casual lowercase voice of authored Blog posts.
- Describe engineering capabilities through problems and outcomes.
- Credit commissioned artists with precise ownership language.
- Remove filler, fake reversals, vague claims, repeated jokes, and corporate language.
- Avoid adverbs, passive voice, em dashes, and unsupported claims.

The rewrite preserves facts already present in the repository. It does not invent employers, client results, project metrics, certifications, or production AI experience.

## UI and Motion Refinement

The existing chassis, LED, typography, notches, and color tokens remain the visual authority.

Changes stay focused:

- Strengthen boundaries between major homepage sections.
- Add consistent numbering and alignment to the three identity rows.
- Improve capability-list spacing and scanning at desktop and mobile sizes.
- Add card focus states that match hover states.
- Add mobile Art position marks and edge spacing.
- Give the Shell overlay a short chassis-seat entrance.

Motion supports state changes and orientation. The update does not add decorative cursor effects, continuous ambient animation, or a new animation library. Existing reduced-motion behavior remains mandatory.

## Accessibility

The mobile Art rail remains usable by touch, trackpad, keyboard, and assistive technology. Focus indicators stay visible. Position marks do not replace semantic list structure.

The Shell overlay uses dialog semantics, an accessible name, focus management, Escape handling, and background scroll lock. Trigger listeners ignore text entry inside form controls. Visitors can close the overlay without knowing the easter egg sequence.

## Technical Approach

The implementation uses Astro, vanilla CSS, and small client-side scripts already consistent with the project. No new package is required.

The scroll engine must skip mobile Art translation and retain desktop travel calculations. The Art component owns its swipe state and position marks. The homepage owns Shell overlay placement, while a small controller owns discovery triggers and dialog lifecycle.

Visitor-facing copy changes remain in their current page, component, or Markdown source. Existing content schemas and routes stay stable.

## Verification

Verification includes:

- Run the Astro production build with Bun.
- Inspect the homepage at desktop and mobile widths.
- Confirm vertical scrolling does not drive horizontal Art movement on mobile.
- Confirm touch or pointer swiping reaches every Art card and updates position marks.
- Confirm desktop Art retains its pinned movement.
- Test Konami code, `shell` typing, and five-tap discovery.
- Test Shell focus entry, focus containment, Escape, close control, focus restoration, and body scroll restoration.
- Confirm Shell no longer appears in navigation or visible page flow.
- Search public copy for stale visitor-facing uses of "Log" and "in active use."
- Check Blog, Work, Art, channel, detail, empty, 404, and RSS surfaces for revised copy.
- Test `prefers-reduced-motion` behavior.
- Check horizontal overflow at common mobile widths.

## Out of Scope

This revision does not add projects, Blog posts, artworks, external telemetry, analytics, CMS support, or new routes. It does not replace the site's design system or rebuild the homepage around five service sections.
