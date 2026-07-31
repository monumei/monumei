# PRODUCT.md — monumei.com

## What this is

The personal site of **Monumei** — a software engineer's portfolio, writing log, and
contact surface. One person, no company, no product to sell.

## Who it's for

Three visitors, in order of how much the design owes them:

1. **Recruiters / potential collaborators** — arrive from a GitHub profile link or a
   shared URL. Need to answer "who is this, what do they build, are they any good"
   in under fifteen seconds, then find a way to reach out.
2. **Other developers** — arrived from a post or a repo. Want the writing and the
   technical specifics. Will read.
3. **Friends / community** — Discord, rhythm-game circles. Here for the personality.

## Product truth (verified from README.md + owner answers)

- Works as a **Principal Software Engineer**.
- Focus: fullstack web development, cloud engineering, graphics design, "lowkey art".
- Currently learning cloud engineering and graphics design.
- **15,000+ maimai plays** (rhythm game).
- Runs on matcha latte and Monster Energy.
- Stack in active use: Figma, HTML, CSS, JS, TypeScript, React, Next.js, Tailwind,
  Python, Bun, Elysia, discord.js, Vite.
- Channels: GitHub `@monumei`, X `@m0numei`, Discord `@monumei`.
- Spotify now-playing embed via `spotify-github-profile` (uid on record).

## Explicitly NOT true / not yet established

These were invented by an earlier design pass and must not ship as fact:

- The blog entries ("Bun + Elysia in production, six months later", etc.)
- The projects ("Edge API Service", "Discord Bot Framework", "maimai Score Tracker",
  "Interface Studies") and all their claimed metrics (`sub-40ms p95`, `shipped`).

**Decision (owner, this session):** blog and work become real Astro content
collections. The site ships with designed empty states and one clearly-labelled
example entry. Monumei adds real markdown files over time. No invented claim ships
as fact.

## Brand commitments (owner-pinned)

- Visual world is pinned to two references: **VALORANT RGX 11z Pro (blue variant)**
  and **Arknights: Endfield**. This pin beats any default.
- Tone: understated. The owner's own word is "lowkey". The site can look loud;
  the copy stays dry.

## Constraints

- **Astro + vanilla CSS, zero runtime dependencies.** Owner-chosen.
- Toolchain is **Bun** (no Node on this machine).
- Static output. Deployable to any static host.
- Third-party embeds (skillicons, spotify-github-profile, streak-stats) are
  external images that can fail or go offline — they need real fallbacks, not
  broken-image icons.

## Assumptions made without the owner (labelled)

- "Principal Software Engineer" is stated without an employer; no company is named
  anywhere on the site, since none was given.

Confirmed by the owner this session: the site's hostname is **monumei.com**.
