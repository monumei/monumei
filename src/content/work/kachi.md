---
title: Kachi
summary: Agency discovery and ranking platform backed by Turso/libSQL, with deterministic rankings and an authenticated Elysia API inside one Next.js process.
unit: 2
tech: Next.js
stack: [Next.js, React, TypeScript, Elysia, Drizzle ORM, Turso/libSQL, Tailwind CSS, Bun]
status: ongoing
year: '2026'
repo: https://github.com/monumei/kachi
---

Kachi is a responsive agency discovery and ranking application. Next.js Server
Components read through the public `src/modules/discovery` seam, and a thin,
authenticated Elysia API exposes the same internal view models from one process.

## Ranking system

Ranking order is deterministic. Movement is persisted per Arena and geography:
each six-hour bucket writes one immutable Global/region/country run, so historical
positions can be replayed rather than guessed. Verification states for agencies
and proofs append immutable history in the same transaction that flips the state.

## Data layer

- Drizzle migrations define the schema; `bun dbcheck` verifies required tables
  and foreign-key integrity.
- Seeding and JSON batch imports are atomic upserts followed by a ranking refresh.
- Production migration, seed, and import commands require explicit confirmation
  against the Turso host before they run.

## Tooling

Everything runs on Bun — dev server, tests, database commands, and deploys to
Vercel with libSQL transports bundled into the functions. `bun check` runs lint,
TypeScript, and unit tests; Playwright covers end-to-end flows.
