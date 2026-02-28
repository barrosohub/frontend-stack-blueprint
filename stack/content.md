---
title: "Content & Editing"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Content & Editing

## Lexical (Primary)

| Attribute | Value                                |
| --------- | ------------------------------------ |
| Role      | Rich text editing                    |
| Status    | ✅ Core (primary)                    |
| Install   | `npm install lexical @lexical/react` |

### Why Lexical

- Meta-backed — active development, large community
- Extensible plugin architecture
- Excellent React integration via `@lexical/react`
- Good performance for large documents
- Modern API with immutable state model

### When to Use

- Rich text editors (blog posts, comments, notes)
- WYSIWYG content creation
- Collaborative editing basics
- Content with embedded media, mentions, hashtags

---

## ProseMirror (Fallback)

| Attribute | Value                                                              |
| --------- | ------------------------------------------------------------------ |
| Role      | Rich text editing (advanced)                                       |
| Status    | ⚠️ Secondary                                                       |
| Install   | `npm install prosemirror-state prosemirror-view prosemirror-model` |

### When to Use (instead of Lexical)

- Complex collaborative editing requirements (OT/CRDT)
- Google Docs-like editing experience needed
- Existing ProseMirror-based ecosystem integration (Tiptap)
- Highly custom document schemas

**Agent behavior:** In a new project, use Lexical first. Only suggest
ProseMirror if the project has specific collaborative editing needs
that Lexical cannot satisfy.

---

## Shiki

| Attribute | Value               |
| --------- | ------------------- |
| Role      | Syntax highlighting |
| Status    | ✅ Core             |
| Install   | `npm install shiki` |

### Why Shiki

- TextMate grammar-based — same highlighting as VS Code
- Theme support (dark/light modes)
- Server-side and client-side rendering
- Accurate highlighting for 100+ languages

### When to Use

- Code blocks in documentation
- Code snippets in blog posts
- Source code display in developer tools
- Syntax-highlighted previews

### Pattern

```typescript
import { codeToHtml } from "shiki";

const html = await codeToHtml("const x = 1;", {
  lang: "typescript",
  theme: "github-dark",
});
```
