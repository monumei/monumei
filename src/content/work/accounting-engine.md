---
title: Accounting engine
summary: The operating system and books for a small company, where money is integer centavos and journal entries get reversed, never edited.
unit: 4
tech: Elysia
stack: [Elysia, React 19, Turso, Drizzle ORM, Bun]
status: ongoing
year: '2026'
---

Accounting is one of those places where "close enough" isn't, so I made this one
strict on purpose. Money lives as integer centavos with banker's rounding… no floats
anywhere near a balance. Journal entries get reversed, never edited, so the history
can't be quietly rewritten. Closed periods lock, and tax schedules follow the
Philippine BIR rules.

Around the books sits everything else a company runs on: audit trails, approvals,
signed documents, and backups that actually get restore drills instead of just
existing.
