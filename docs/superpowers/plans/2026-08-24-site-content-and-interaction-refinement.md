# Site Content and Interaction Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Fix mobile Art scrolling, hide Shell behind accessible easter egg triggers, clarify Monumei's three-part identity, rename Log to Blog, and tighten site copy.

**Architecture:** Keep existing Astro components, content collections, tokens, and desktop scroll engine. Use CSS media queries plus a small ArtRail controller for native mobile swiping. Place existing Terminal inside a native dialog component that owns discovery triggers and lifecycle.

**Tech Stack:** Astro 5, TypeScript, vanilla CSS, Bun

**Spec:** docs/superpowers/specs/2026-08-24-site-content-and-interaction-refinement-design.md

## Global Constraints

- Use bun and bunx only.
- Add no runtime dependency.
- Keep existing /blog/, /work/, and /art/ routes.
- Preserve chassis, LED, typography, notch, and color systems.
- Keep desktop Art scroll-driven. Make Art native-swipe below 860px.
- Respect prefers-reduced-motion.
- Keep three identity rows: Software Engineering, Rhythm Games, and Art and Commissions.
- Put Full-stack, Product, Solutions, Database, and AI Engineering inside Software Engineering.
- Replace visitor-facing “Log” with “Blog.” Internal file and symbol names may remain.
- Preserve existing facts. Add no employers, client outcomes, metrics, certifications, or production claims.
- Apply stop-slop rules to public copy.

---

### Task 1: Rename Log to Blog and rewrite shared copy

**Files:**
- Modify: src/pages/index.astro
- Modify: src/pages/blog/index.astro
- Modify: src/pages/blog/[...slug].astro
- Modify: src/pages/blog/channel/[channel].astro
- Modify: src/pages/rss.xml.ts
- Modify: src/pages/work/index.astro
- Modify: src/pages/work/[...slug].astro
- Modify: src/pages/art/index.astro
- Modify: src/pages/404.astro
- Modify: src/components/EmptyBay.astro
- Modify: src/components/ArtRail.astro
- Modify: src/components/Terminal.astro
- Modify: src/content/blog/why-this-exists.md
- Modify: src/content/work/monumei-com.md

**Interfaces:**
- Consumes: Existing content collections and routes.
- Produces: Visitor-facing Blog terminology and revised prose. No exported API changes.

- [ ] **Step 1: Record stale-copy checks before editing**

    rg -n "The Log|the log|Monumei.*Log|In active use|actually|honestly|why not|—" src --glob '*.{astro,md,ts}'

Expected: matches in homepage, Blog, RSS, Terminal, Systems, and Markdown content.

- [ ] **Step 2: Replace public Log labels**

Use this exact copy map:

    Homepage plate: Blog
    Homepage empty label: Blog empty
    Homepage empty hint: No posts yet. Add a Markdown file to publish the first one.
    Homepage button: Open the blog
    Blog index title: Blog | Monumei
    Blog index plate: Blog
    Blog detail back link: ← Back to Blog
    Channel title format: {CHANNEL} | Blog | Monumei
    Channel description suffix: in the {CHANNEL} channel of Monumei's blog.
    RSS title: Monumei | Blog
    404 secondary action: Blog

Keep machine location labels such as LOG when they act as chassis addresses. In Terminal, make blog the command, keep log as an alias, and label search results blog.

- [ ] **Step 3: Rewrite small surface copy**

Use these exact strings:

    Home description: Monumei is a software engineer, rhythm-game player, and character-art collector. Browse projects, writing, and commissioned art.
    Blog description: Notes on software engineering, products, databases, AI, design, and rhythm games.
    Work description: Software projects built across product, data, infrastructure, and interface work.
    Art description: Commissioned Monumei artwork with artist credits, plus pieces drawn by Monumei.
    Art homepage line: Monumei, drawn by commissioned artists and sometimes by me.
    Art page lead: Monumei is my original character. I commission most pieces from artists whose work I admire, and I credit each artist here. I draw some pieces too.
    Commission lead: Artists made these pieces for me. Select a linked credit to find their work and commission details.
    404 body: Nothing lives at this address. The page may have moved, or the URL may be wrong.

Rewrite sample notices and empty states in the same direct voice. Keep source paths accurate.

- [ ] **Step 4: Rewrite Blog entry**

Set summary to:

    i wanted a personal site that felt like mine, so a weekend build grew into this hardware-shaped corner of the web.

Replace body with:

    i started this site after seeing too many portfolios built from the same template. i wanted a place i owned, with room for engineering notes, project write-ups, commissioned art, and whatever else kept my attention.

    one weekend became a full interface system. panels turned into a chassis, section labels became hardware addresses, and the hidden shell became functional.

    the blog holds engineering notes, design decisions, cloud experiments, art posts, and convention recaps. work covers projects. art collects monumei commissions and credits each artist.

    i add posts when i have something worth keeping.

- [ ] **Step 5: Rewrite Work case study**

Set summary to:

    A static Astro portfolio with a hardware-inspired interface, content collections, and no client framework.

Use headings Visual system, Build notes, and Next. State these facts:

- Astro renders static pages with vanilla CSS and small scripts for required interactions.
- RGX supplies graphite, seams, and blue light. Endfield supplies printed labels, square geometry, and yellow status marks.
- Content collections validate Blog, Work, and Art.
- One scroll controller supplies progress and CSS handles visual response.
- Finished content renders without JavaScript and under reduced motion.
- Hidden Shell reads from the same collections.
- More screenshots and case studies remain future work.
- External panels stay optional so service outages cannot break pages.

- [ ] **Step 6: Run copy scan and build**

    rg -n "The Log|the log|In active use|actually|honestly|why not|—" src --glob '*.{astro,md,ts}'
    bun run build

Expected: no visitor-facing stale wording. Review machine formatting and alt text by hand. Build exits 0.

- [ ] **Step 7: Commit**

    git add src/pages src/components/EmptyBay.astro src/components/ArtRail.astro src/components/Terminal.astro src/content
    git commit -m "Rewrite site copy and rename Blog"

---

### Task 2: Clarify three-part identity

**Files:**
- Modify: src/components/Hero.astro
- Modify: src/components/Systems.astro

**Interfaces:**
- Consumes: Existing pinned-stage progress from ScrollEngine.
- Produces: Three identity rows with five engineering capability items.

- [ ] **Step 1: Capture current strings**

    rg -n "What I actually do|In active use|Principal by title|Mostly Monumei|personality trait" src/components/Hero.astro src/components/Systems.astro

- [ ] **Step 2: Replace Hero copy**

Keep visible role Principal Software Engineer. Use blurb:

    I build products across full-stack, solutions, database, and AI work. Away from code, I play maimai and collect art of Monumei.

Change primary action to Read the blog.

- [ ] **Step 3: Replace Systems data**

Use exact values:

    Software Engineering
    I work across product delivery, technical discovery, data design, and AI features.
    Work I take on
    Full-stack Engineering
    Product Engineering
    Solutions Engineering
    Database Engineering
    AI Engineering

    Rhythm Games
    Maimai has stayed in the rotation for more than 15,000 plays.
    Current status
    Still playing.

    Art and Commissions
    I collect commissioned art of Monumei, credit each artist, and draw a few pieces myself.
    Browse
    The gallery keeps every piece with its artist credit.

Change section heading to Engineering, rhythm games, and art. Add row numbers 01, 02, and 03 in data type.

- [ ] **Step 4: Improve grid scanning**

Use four desktop columns: LED rule, 3ch number, text, evidence. Below 900px use LED rule, number, text, then place evidence under text in column 3. Keep existing progress activation and backgrounds.

- [ ] **Step 5: Build and inspect output**

    bun run build
    rg -n "Engineering, rhythm games, and art|Work I take on|Full-stack Engineering|15,000" dist/index.html

Expected: build exits 0 and all phrases appear.

- [ ] **Step 6: Commit**

    git add src/components/Hero.astro src/components/Systems.astro
    git commit -m "Clarify engineering and personal interests"

---

### Task 3: Make mobile Art a native swipe rail

**Files:**
- Modify: src/components/ArtRail.astro
- Modify: src/components/ScrollEngine.astro

**Interfaces:**
- Consumes: pieces, data-track, and desktop --p progress.
- Produces: data-art-viewport, data-art-cell, data-art-dot, and data-art-status hooks.

- [ ] **Step 1: Add semantic swipe markup**

Add tabindex 0 and aria-label Art preview to viewport. Add data-art-cell and stable index to each list item. After viewport, render dots and this live status when more than one piece exists:

    <span class="sr-only" data-art-status aria-live="polite">
      Piece 1 of {pieces.length}
    </span>

Dots remain aria-hidden. First dot starts with data-active.

- [ ] **Step 2: Replace mobile pinned CSS**

At max-width 860px:

    .arail { height: auto; }
    .arail__frame { position: static; height: auto; overflow: visible; }
    .arail__viewport {
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
      touch-action: pan-x pan-y;
    }
    .arail__track { transform: none; will-change: auto; }
    .cell { scroll-snap-align: start; }

Use the same static behavior for short viewports and reduced motion. Keep desktop pinning unchanged.

- [ ] **Step 3: Add swipe position controller**

Initialize once per viewport on load and astro:page-load. On scroll, queue one animation frame. Pick cell with smallest absolute distance between cell.offsetLeft and viewport.scrollLeft. Toggle data-active on matching dot. Set status to Piece N of M.

- [ ] **Step 4: Clear stale track travel**

In ScrollEngine measureTracks, detect an Art frame whose computed position is not sticky. Remove --travel and continue. Desktop still calculates scrollWidth minus clientWidth.

- [ ] **Step 5: Build and inspect hooks**

    bun run build
    rg -n "data-art-viewport|data-art-status|Piece 1 of" dist/index.html

Expected: build exits 0 and generated homepage contains all hooks.

- [ ] **Step 6: Commit**

    git add src/components/ArtRail.astro src/components/ScrollEngine.astro
    git commit -m "Fix mobile Art swiping"

---

### Task 4: Hide Shell behind easter egg

**Files:**
- Create: src/components/ShellOverlay.astro
- Modify: src/pages/index.astro
- Modify: src/components/Nav.astro
- Modify: src/components/Terminal.astro

**Interfaces:**
- Consumes: Terminal posts, units, and art props; data-shell-mark on Nav logo.
- Produces: native dialog shell-overlay and three discovery triggers.

- [ ] **Step 1: Create dialog component**

ShellOverlay accepts the same three arrays as Terminal and renders Terminal inside:

    <dialog class="shell" id="shell-overlay" aria-labelledby="shell-overlay-title">
      <div class="shell__frame">
        <div class="shell__head">
          <div>
            <p class="shell__eyebrow data">HIDDEN MODULE / SHELL</p>
            <h2 class="shell__title" id="shell-overlay-title">Terminal</h2>
          </div>
          <button class="shell__close btn btn--ghost" type="button" data-shell-close>
            Close <span aria-hidden="true">Esc</span>
          </button>
        </div>
        <Terminal posts={posts} units={units} art={art} />
      </div>
    </dialog>

Style full viewport, safe-area padding, backdrop, rail width, and an entrance under 320ms using --ease-seat. Collapse new motion to 1ms under reduced motion.

- [ ] **Step 2: Add lifecycle and triggers**

Use showModal and close. Save last focused element, focus term-input after open, add data-shell-open to html, and remove it on close.

Exact trigger constants:

    Konami: ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a
    Typed target: shell
    Typed reset: 1200ms
    Tap target: 5
    Tap window: 1800ms

Ignore typed trigger inside input, textarea, select, or contenteditable. Close with Escape and close button. Restore focus after close. On coarse pointers, prevent homepage logo navigation while counting taps.

- [ ] **Step 3: Move Terminal out of visible flow**

Remove visible shell Act and ModulePlate from index. Import and render ShellOverlay once after homepage sections with termPosts, termUnits, and termArt.

- [ ] **Step 4: Remove Shell nav link**

Delete /#shell from Nav links. Add data-shell-mark to isle__mark. Link remains normal on pages without ShellOverlay.

- [ ] **Step 5: Update Terminal Blog command**

Make blog the command. Keep log as compatibility alias. Update help and search output. Ensure boot output initializes once while dialog stays hidden.

- [ ] **Step 6: Build and inspect**

    bun run build
    rg -n "shell-overlay|data-shell-close|data-shell-mark" dist/index.html
    rg -n "href=\"/#shell\"|>Shell<" dist/index.html

Expected: first scan finds overlay hooks. Second scan prints nothing.

- [ ] **Step 7: Commit**

    git add src/components/ShellOverlay.astro src/components/Terminal.astro src/components/Nav.astro src/pages/index.astro
    git commit -m "Hide Shell behind easter egg"

---

### Task 5: Polish UI and verify

**Files:**
- Modify: src/styles/global.css
- Modify: src/components/Systems.astro
- Modify: src/components/ArtRail.astro
- Modify: src/components/ShellOverlay.astro
- Modify: src/components/LogEntry.astro
- Modify: src/components/WorkUnit.astro

**Interfaces:**
- Consumes: Existing tokens and new Art and Shell hooks.
- Produces: section boundaries, complete focus states, bounded motion, and responsive spacing.

- [ ] **Step 1: Load design guidance**

Run Impeccable context loader once. Read polish, adapt, animate, and craft-floor references. Inspect tokens and target components before editing.

- [ ] **Step 2: Strengthen section boundaries**

Use one seam plus restrained chassis gradient on major homepage sections:

    border-block-start: 1px solid var(--seam);
    background-image: linear-gradient(180deg, rgb(255 255 255 / 0.018), transparent 96px);

Add no color, radius, or shadow tokens.

- [ ] **Step 3: Complete focus states**

Ensure LogEntry, WorkUnit, Art cards, Art viewport, progress marks, Shell close, and Terminal input show visible keyboard focus. Pair hover title changes with parent focus-visible:

    .row:focus-visible .row__title,
    .unit:focus-visible .unit__title {
      color: var(--led-hot);
    }

- [ ] **Step 4: Bound motion**

Keep Shell entrance below 320ms. Do not animate mobile scrollLeft. Collapse every new transition to 1ms under reduced motion.

- [ ] **Step 5: Run static checks**

    bun run build
    git diff --check
    rg -n "The Log|the log|In active use" src --glob '*.{astro,md,ts}'

Expected: build exits 0, diff check prints nothing, and scan finds no visitor-facing stale copy.

- [ ] **Step 6: Inspect one desktop and mobile pass**

Start:

    bun run dev --host 127.0.0.1

Inspect 1440x900, 768x1024, and 390x844:

- Desktop Art pins and reaches last card.
- Mobile Art does not pin. Vertical scroll passes it. Swipe reaches every card.
- Dots track nearest card.
- Identity rows stay readable.
- Cards align without horizontal page overflow.
- Shell stays absent from nav and page flow.
- All three easter egg triggers open dialog.
- Escape and Close dismiss it. Focus and background scroll restore.
- Reduced motion removes new entrance and scroll-driven effects.

Fix findings in one batch. Run one confirmation pass.

- [ ] **Step 7: Commit**

    git add src/styles/global.css src/components
    git commit -m "Polish site interactions"

- [ ] **Step 8: Confirm clean state**

    git status --short
    git log -5 --oneline

Expected: clean worktree and five implementation commits.
