---
title: Local government back office
summary: One platform a city or town runs its whole back office on, from accounting and treasury to procurement, land records, and a citizen portal.
unit: 3
tech: Next.js
stack: [Next.js, Elysia, Bun, PostgreSQL, PostGIS]
status: ongoing
year: '2025'
---

Cities and towns handle the public money people actually touch: roads, drainage,
permits, property taxes, payroll. A lot of it still moves on paper and spreadsheets,
where a ledger can be quietly rewritten. Corruption only works when nobody can trace
a peso, so I built the system that traces every one.

## What it covers

Pretty much everything a town's back office touches: accounting, budget, treasury,
HR, procurement under the national procurement law, property assessment, planning,
business permits, and a citizen portal. The rule underneath all of it is simple…
every transaction is recorded once, approved by named people, and audited. Land
records moved into PostGIS too, which replaced a lot of manual GIS work.

## Built for more than one town

Every local government gets its own isolated deployment and database, run from a
shared control plane. Adding a municipality means provisioning a tenant, not
rebuilding the product. Access works like Discord roles, but for modules and data
instead of channels, scoped by department, office, or barangay.

## Beyond the code

It's running in production. I architected and wrote most of it, and I own the
infrastructure, failover, backups, and disaster recovery. I also train the
developers and the staff who use it, work through requirements with department
heads, and pitch it to other towns.
