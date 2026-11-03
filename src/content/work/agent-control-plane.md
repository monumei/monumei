---
title: Agent control plane
summary: The setup I run all my engineering through. It routes each task to a lane, dispatches models across Claude, GPT, and Gemini, and gates every change behind review.
unit: 2
tech: TypeScript
stack: [TypeScript, Bun, Jev, GitNexus, OpenSpec]
status: ongoing
year: '2026'
---

At some point I had more work than hands, so I built the thing that hands work out.
Each task gets routed to a lane: done inline, done in its own isolated worktree, or
split into a parallel wave of workers. Coordinator and worker models come from
Claude, GPT, or Gemini, depending on the job and what quota is left.

Workers don't start blind. Their briefs pull in code-graph impact analysis from
GitNexus, so they know what a change will touch before they touch it. Changes go
through spec-driven change control with OpenSpec and an independent review gate.
The control plane has 246 tests.

## Where the small model sits

Jev sits on the decision points: when to escalate a lane, how hard a worker should
think, which skill to load, whether a failure is the code, the test, the
environment, or just flaky, how to rank review findings, and whether a task is
actually done.

Rules set the floor, and Jev can only escalate above it at 0.6 confidence or higher.
It's budget-capped, times out at 3 seconds, and fails open. New uses run in shadow
mode first, so they don't gate anything until they've earned it. It made 4,667 calls
in its first 39 days.
