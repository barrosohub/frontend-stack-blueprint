---
title: "Why Lexical over ProseMirror"
updated: "2026-02-28"
tier: 3
---

# Why Lexical over ProseMirror

## Decision

Lexical as primary rich text editor. ProseMirror as fallback for advanced collaborative editing.

## Reasons for Lexical as Primary

1. **Meta-backed** — Active development with strong backing.
2. **React-native integration** — `@lexical/react` provides first-class React support.
3. **Plugin architecture** — Extensible via plugins without deep framework knowledge.
4. **Modern API** — Immutable state model, better TypeScript support.
5. **Simpler learning curve** — Faster to get productive vs ProseMirror.

## When ProseMirror Instead

- Google Docs-level collaborative editing (OT/CRDT)
- Complex custom document schemas
- Existing Tiptap ecosystem integration needed
- Very advanced editing features beyond Lexical's current scope

## Agent Behavior

- New project → **Lexical first**
- If collaborative editing is a hard requirement → suggest ProseMirror
- If unsure → ASK the developer

## Status

Lexical: ✅ Core (primary) | ProseMirror: ⚠️ Secondary (fallback)
