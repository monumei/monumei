---
title: How this log works
summary: A formatting reference for the entries that follow — and the two minutes of setup needed to write one.
date: 2026-07-31
channel: META
sample: true
---

This entry ships with the site. It exists so the log module has something in it and
so every piece of prose styling has somewhere to be seen. Delete it once you've
written something real.

## Writing an entry

Each post is one markdown file in `src/content/blog/`. The filename becomes the URL,
so `bun-in-production.md` publishes at `/blog/bun-in-production/`.

The frontmatter block at the top is checked at build time. Get a field wrong and the
build fails with the specific problem rather than shipping a broken page:

```yaml
---
title: Bun in production, six months later
summary: One sentence that shows up on the card and in search results.
date: 2026-08-14
channel: ENG
---
```

`channel` is free text — it prints on the entry plate in signal yellow. `ENG`,
`DESIGN`, `CLOUD`, and `OFF-TOPIC` all work; so does anything else short.

Two optional flags:

- `draft: true` keeps a file out of every listing without deleting it.
- `sample: true` prints the orange notice you can see on this page.

## What the prose looks like

Body copy runs to a measure of about 68 characters, which is the range where the eye
finds the start of the next line without effort. Longer than that and you lose your
place; much shorter and the rhythm breaks.

> Pull quotes get a single hairline rule in LED blue. One pixel — anything heavier
> starts competing with the text it's supposed to be serving.

Inline `code` sits in a recessed plate. Links like [this one](/work/) pick up a
subtle underline that switches to signal yellow on hover, so the two accent colours
keep their meanings: blue is the resting state, yellow is the thing you're touching.

### Lists

1. Ordered lists carry a real sequence.
2. Use them when the order is load-bearing.
3. Otherwise reach for bullets.

- Unordered lists for sets where order doesn't matter
- Kept tight, because a list is a scan target
- Not a place to hide paragraphs

## Images

Images fill the measure and take a one-pixel seam so they read as inset panels
rather than floating rectangles. Drop them in `public/` and reference them from the
site root.

That's the whole system. Write markdown, commit, done.
