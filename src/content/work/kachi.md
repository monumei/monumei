---
title: Kachi
summary: Agency discovery and ranking platform backed by Turso/libSQL, with deterministic rankings and an authenticated Elysia API inside one Next.js process.
unit: 2
tech: Next.js
stack: [Next.js, React, TypeScript, Elysia, Drizzle ORM, Turso/libSQL, Tailwind CSS, Bun]
status: ongoing
year: '2026'
live: https://kachi-pawn.vercel.app
---

Kachi helps people find agencies. Agencies are organized into Arenas and by
geography, so a visitor can narrow the field to the region and category they
actually care about instead of scrolling one long list.

## Rankings that hold up

Rankings follow a fixed order computed from the underlying data. The same input
always produces the same result, so a position is never arbitrary.

Every refresh saves its own record. If an agency sat at #4 in a country last
week, that fact stays lookable. Movement up or down reflects what actually
changed, not noise from an unstable sort.

## Verification

Agencies can carry verified states for their profiles and their proofs. Each
state change is recorded with its review note in place, so the history of who
confirmed what remains readable after the fact.

## Careful with live data

Changes to production data ask for explicit confirmation before anything runs,
and imports replace records completely rather than partially. A bad update
cannot slip through halfway.
