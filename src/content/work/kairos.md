---
title: Kairos
summary: A visual novel engine in Rust with a script VM, a wgpu renderer, and an Electron editor.
unit: 6
tech: Rust
stack: [Rust, wgpu, kira, N-API, Electron]
status: personal
---

Kairos is a visual novel engine I'm building in Rust. It's split across 8 crates: a
script VM, a wgpu renderer, kira for audio, and N-API bindings, so the editor is
really just an Electron app driving the engine underneath.
