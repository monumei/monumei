---
title: Breaking the Stigma of Vibe Coding
summary: AI-assisted coding deserves scrutiny, but the real questions are whether software is tested, respects your data, and has an accountable developer.
date: 2026-11-09
channel: ENG
tags: [vibe coding, AI-assisted coding, software engineering, privacy]
socialImage: /social-vibe-coding.png
---

> "Yuck, you built this with AI."
>
> "Not coded by a human btw."
>
> "One person built this in two months? Of course it's AI."
>
> "It's vibecoded LMAO, I called it."

Lately I keep seeing replies like these, mostly from the creative community. And honestly, it makes me sad. Somewhere along the way, vibe coding became a stigma. People don't ask "is this good?" or "is this safe?" anymore. They ask "did a human type this?"

(Quick context for non-devs: vibe coding is when you build software by telling an AI what you want and letting it write a lot of the code.)

## K-Stage and Discord Phoenix

Early this November, K-Stage, a karaoke scoring game a lot of vsingers and youtaite were enjoying, got hit with backlash after its solo dev admitted in their Discord that most of it was vibecoded. The dev said they mainly handled the system design and product decisions. People got upset for a bunch of reasons: there was no disclosure, the UI looked a lot like osu!, and the game stores your vocal data for scoring. Some defended it as a one-person project still in alpha. A lot of people just said "yuck" and left.

A few days later, Discord co-founder Stanislav Vishnevskiy showed off Discord Phoenix, the whole client rewritten in Rust, no more Electron. It boots almost instantly and uses around 290 MB of RAM. Most people loved it. Some still joked "it's vibecoded lmao," even though Discord never said AI was used.

Same word, two very different reactions. With K-Stage it was an accusation. With Phoenix it was a joke, because the app was fast, polished, and came from a team people already trust.

## So what are people actually mad about?

I get why creatives are wary. They've watched AI get trained on their art and voices without anyone asking, and their feeds get flooded with low-effort stuff. That trust issue didn't come from nowhere.

But look at the K-Stage complaints again: no disclosure, a UI that looks borrowed, unclear handling of vocal data, some glitches. None of those are really about AI. A dev who hand-codes everything can do all of that too. And a dev who uses AI a lot can still be honest, original, careful with data, and test properly.

That's the part I feel is missing from the whole debate. There's a big difference between people who actually engineer with AI as a tool (design the system, review the output, test it, own it) and people who just generate stuff and ship it without checking. Throwing both in the same "vibe coder" bin doesn't help anyone.

## From the HTML guy to AI engineering

I started as that HTML guy, typing every tag by hand. Now most of my work is integrating AI into engineering workflows: architecting systems, building them, then reviewing and testing before anything deploys. I've shipped a lot of tools that way, including systems for LGUs where citizens' data is involved. In that kind of work, "the AI wrote it" is never an excuse. Privacy, access control, and security are still my call, and I check them myself.

AI didn't take over that part of the job. It just made the rest of it faster. If my name is on it, I own it.

## My unpopular opinion

AI isn't going away. It's already in the apps we use, and probably in the same platform people post "yuck, it's AI" on. So I keep wondering: when are we going to accept it as a tool for working more efficiently, instead of treating every use of it as slop?

Tech moves fast. If you refuse to even look at these tools, you're going to get left behind, and I don't say that to be mean. I'd rather we all figure this out together.

So to people who are wary of AI-built stuff: judge the work, not the tool. Ask if it was tested, if the dev is honest about how they made it, and if it respects your data. And to fellow devs: be upfront about using AI, review what you ship, and own it.

We can still push for safety and accountability. We just don't have to fight the tech itself to do it.
