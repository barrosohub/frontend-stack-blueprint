---
title: "Why Bun Runtime"
updated: "2026-03-09"
tier: 3
---

# Why Bun Runtime

## Decision

Approve Bun as an alternative JavaScript runtime while keeping Node.js as the blueprint default runtime.

## Reasons

1. **Modern runtime option** — Bun provides a fast JavaScript runtime with growing ecosystem support.
2. **Toolchain fit** — Bun can run many modern frontend workflows without forcing a full stack redesign.
3. **Optionality** — It gives teams a runtime alternative without destabilizing the Node.js-first baseline.
4. **Clear separation of concerns** — Bun can be treated as runtime choice while `pnpm` remains the package manager default.
5. **AI-friendliness** — Bun's official docs are clear enough for agents to understand installation and runtime positioning.

## Trade-offs

- Bun compatibility is not universal across every dependency, CLI, or deployment scenario
- Teams still need to validate runtime behavior before switching from Node.js
- Using Bun does not eliminate the need for package-manager consistency

## Alternatives Considered

| Alternative | Why Not |
| ----------- | ------- |
| Node.js only | Too restrictive when a project explicitly wants Bun runtime support |
| Bun as full default | Too aggressive for the current ecosystem and unnecessary for the blueprint baseline |

## Rule

Default to Node.js. Use Bun only when the project explicitly wants it and runtime compatibility has been validated. Keep `pnpm` as the default package manager either way.

## Status

✅ Approved alternative runtime.
