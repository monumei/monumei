---
title: typesafe-cascade
summary: A typed System 1 → System 2 cascade. A small model answers first, and anything it isn't sure about escalates to an LLM or a person.
unit: 1
tech: TypeScript
stack: [TypeScript, Bun, Jev]
status: ongoing
year: '2026'
repo: https://github.com/monumei/typesafe-cascade
---

I don't trust LLMs to be right. I trust them to be wrong in ways I can catch, so this
is built around that. Jev answers first. When a call comes back low-confidence,
fails, or times out, it escalates to a bigger LLM or to a human, and every step stays
typed.

## Does the confidence mean anything?

I ran Jev 1.14 against 2,319 human-labeled GitHub issues from 7 major repos.

- 76.7% accurate with no filter.
- 81.9% accurate on the 85% it keeps at a 0.8 confidence threshold.

The thresholds help, but not evenly. Calls in the 0.9+ bucket averaged 98.9%
confidence and were right only 84.3% of the time. So the top of the scale is
overconfident, and a cascade that trusts it blindly lets mistakes through.

## Along the way

I also patched an SDK bug that only showed up under Bun.
