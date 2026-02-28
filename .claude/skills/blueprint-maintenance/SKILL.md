---
name: blueprint-maintenance
description: >
  Internal maintenance skill for the Frontend Stack Blueprint repository.
  Use this skill when updating, reviewing, or evolving any part of the
  blueprint's documentation, stack decisions, versions, or architecture.
  Covers safe update procedures, cross-reference validation, version
  bumps, technology evaluation, and protection of consolidated decisions.
compatibility: Designed for Claude Code, VSCode Copilot, Codex, and Antigravity.
license: MIT
metadata:
  author: barrosohub
  version: "1.0"
  scope: internal
---

# Blueprint Maintenance

> This skill governs how agents safely maintain and evolve the Frontend
> Stack Blueprint. Follow every step rigorously. This repo is designed
> to survive decades — treat every edit with surgical precision.

## Golden Rule

**NEVER remove or weaken a consolidated decision without an explicit RFC
and MAJOR version bump.** Stable decisions are the foundation of trust.
If in doubt, ADD context — don't delete existing content.

## Universal Invariants (Technology-Agnostic)

These invariants apply regardless of framework, language, or tooling:

1. **Single source of truth** — every project must define one canonical artifact
   for versions/rules (manifest/config/spec) and all other docs derive from it.
2. **No multi-surface drift** — if a rule exists in multiple entry points, all
   must be updated in the same change set.
3. **Deterministic terminology** — one canonical term per concept; avoid synonyms
   that can confuse agents and automation.
4. **Explicit temporality** — temporal claims must include concrete versions/dates;
   avoid ambiguous language about "latest/current" without context.
5. **Traceable decision lifecycle** — decisions move explicitly through
   active → under-evaluation → deprecated, with rationale and migration guidance.
6. **Non-silent removals** — no silent deletion of consolidated decisions,
   technologies, or architecture principles.

---

## Before ANY Edit

### 1. Identify the Change Type

| Type                              | Version Bump | Approval Required     |
| --------------------------------- | ------------ | --------------------- |
| Fix typo / broken link            | PATCH        | No                    |
| Bump min version of existing tech | PATCH        | Verify compat first   |
| Add new technology to stack       | MINOR        | Yes — full evaluation |
| Add new deployment target         | MINOR        | Yes                   |
| Remove technology from stack      | MAJOR        | Yes — RFC required    |
| Change architecture principle     | MAJOR        | Yes — RFC required    |
| Add rationale / guide / template  | PATCH        | No                    |

### 2. Verify Current State

Before editing, ALWAYS:

```
1. Read the FULL content of the file you plan to edit
2. Read stack.yaml to know current pinned versions
3. Read DECISIONS.md to know existing ADRs
4. Read backlog/deprecated.md to verify banned list
5. Check backlog/under-evaluation.md for status
```

### 3. Cross-Reference with Official Sources

**MANDATORY for any version bump or technology claim:**

- Go to the OFFICIAL documentation site of the technology
- Verify the LATEST stable release version
- Check for breaking changes, deprecations, security advisories
- Verify Node.js compatibility requirements
- Never trust cached knowledge — always verify against CURRENT data

#### Official Sources Registry

| Technology           | Official Source                                                                     |
| -------------------- | ----------------------------------------------------------------------------------- |
| React                | https://react.dev/blog                                                              |
| TypeScript           | https://devblogs.microsoft.com/typescript/                                          |
| Vite                 | https://vite.dev/blog , https://vite.dev/releases                                   |
| Vitest               | https://github.com/vitest-dev/vitest/releases                                       |
| Tailwind CSS         | https://tailwindcss.com/blog , https://github.com/tailwindlabs/tailwindcss/releases |
| TanStack Router      | https://github.com/TanStack/router/releases                                         |
| TanStack Query       | https://github.com/TanStack/query/releases                                          |
| TanStack Store       | https://tanstack.com/store                                                          |
| Zustand              | https://github.com/pmndrs/zustand/releases                                          |
| React Router         | https://github.com/remix-run/react-router/releases                                  |
| Radix UI             | https://github.com/radix-ui/primitives/releases                                     |
| React Hook Form      | https://github.com/react-hook-form/react-hook-form/releases                         |
| Zod                  | https://github.com/colinhacks/zod/releases                                          |
| date-fns             | https://github.com/date-fns/date-fns/releases                                       |
| Motion               | https://motion.dev/docs/react-upgrade-guide                                         |
| Lexical              | https://github.com/facebook/lexical/releases                                        |
| Electron             | https://github.com/electron/electron/releases                                       |
| Tauri                | https://github.com/tauri-apps/tauri/releases                                        |
| Sentry               | https://github.com/getsentry/sentry-javascript/releases                             |
| Cursor rules         | https://docs.cursor.com/context/rules                                               |
| Claude Code          | https://docs.anthropic.com/en/docs/claude-code                                      |
| Copilot instructions | https://docs.github.com/en/copilot                                                  |

---

## Update Procedures

### A. Version Bump (PATCH)

```
1. Verify new version on official source
2. Check breaking changes between current → new
3. Update stack.yaml (single source of truth for versions)
4. Update stack/<layer>.md where the tech is documented
5. Update llms-full.txt if version is mentioned there
6. Update CHANGELOG.md with the bump
7. Do NOT touch entry points (CLAUDE.md, AGENTS.md) for patch versions
   unless the version is explicitly shown there
8. Verify: grep -r "old_version" . to catch any missed references
```

### B. Add New Technology (MINOR)

```
1. Verify the tech against evaluation criteria:
   - Stable (v1+, production track record)
   - Maintained (active development)
   - Ecosystem fit (works with existing stack)
   - AI-friendly (LLMs generate quality code)
   - No overlap with existing stack

2. Create documentation:
   - stack/<layer>.md — add section or new file
   - rationale/why-<tech>.md — full justification
   - templates/<tech>.md — config template if applicable
   - Update stack.yaml with install commands
   - Update stack/STACK.md manifesto table
   - Update ALL entry points: CLAUDE.md, AGENTS.md, .cursorrules,
     .cursor/rules/*.mdc, .github/copilot-instructions.md, llms.txt,
     llms-full.txt

3. Version:
   - Bump MINOR in stack.yaml blueprint_version
   - Add CHANGELOG.md entry
   - Update DECISIONS.md
```

### C. Remove Technology (MAJOR)

```
⚠️ THIS IS THE MOST DANGEROUS OPERATION

1. Write RFC explaining:
   - Why the tech is being removed
   - What replaces it (if anything)
   - Migration path for existing projects
   - Impact on documentation

2. Move tech from stack files to backlog/deprecated.md
3. Add migration guidance to guides/migration-paths.md
4. Update ALL entry points and stack.yaml
5. Bump MAJOR version
6. Update CHANGELOG.md with full explanation

NEVER silently remove a technology. Always leave a trail.
```

### D. Update Architecture Principle (MAJOR)

```
1. This changes the FOUNDATION of the blueprint
2. Requires RFC with justification
3. Must NOT contradict existing principles without explicit note
4. Bump MAJOR version
5. Update stack/architecture.md
6. Update ALL entry points that reference the principle
```

---

## File Sync Checklist

When editing stack rules or technologies, these files may need updates:

```
ALWAYS check:
□ stack.yaml                    (machine-readable source of truth)
□ stack/STACK.md                (full manifesto)
□ stack/<specific-layer>.md     (detail file)

THEN sync entry points:
□ CLAUDE.md                     (Claude Code)
□ AGENTS.md                     (Universal agents)
□ .cursor/rules/*.mdc           (Cursor IDE, modern)
□ .cursorrules                  (Cursor IDE, legacy)
□ .github/copilot-instructions.md (GitHub Copilot)
□ llms.txt                      (index)
□ llms-full.txt                 (complete single-file)

IF version changed:
□ CHANGELOG.md
□ stack.yaml blueprint_version

IF technology added/removed:
□ DECISIONS.md
□ rationale/why-*.md
□ backlog/deprecated.md or backlog/under-evaluation.md
□ README.md (stack diagram, doc structure)
```

## Mandatory Drift Audit (Before Merge)

Run these checks whenever stack rules, versions, or entry points changed:

```
1. Version parity:
   rg -n 'blueprint_version|^version: "'

2. Canonical rule parity across entry points:
   rg -n 'motion/react|@date-fns/tz|TanStack Store replaces Zustand|deep relative imports|CSS-in-JS'

3. Banned list parity:
   Compare stack.yaml banned entries with AGENTS.md / CLAUDE.md /
   .cursor/rules/*.mdc / .cursorrules / .github/copilot-instructions.md / llms-full.txt

4. Link integrity:
   Validate internal markdown links after structural edits.
```

If any mismatch appears, do not finalize the change until drift is resolved.

## If Git History Is Insufficient

When the repository has minimal commit history (for example, most files are
still staged as new), historical diff cannot prove whether something was
removed previously. In this case you MUST:

1. Explicitly report this limitation in the review.
2. Perform snapshot integrity checks (file presence, link integrity, rule parity).
3. Avoid claims about historical removals unless proven by commit history.

---

## Safety Guards

### What MUST NOT Be Done

1. **Never delete existing rationale** — if a decision changes, ADD the
   new rationale alongside the old one with dates
2. **Never remove a banned technology** from `backlog/deprecated.md`
   without MAJOR version bump and explicit RFC
3. **Never change `stack.yaml` schema** without updating this skill
4. **Never edit only one entry point** — if CLAUDE.md changes, ALL
   entry points must be checked for consistency
5. **Never use cached/memorized versions** — always verify against
   official release pages before claiming a version number
6. **Never merge changes that break the tiered structure** (Tier 0-4)

### What MUST Be Done

1. **Always read the full file** before editing any line
2. **Always grep for the old value** after replacing, to catch duplicates
3. **Always update CHANGELOG.md** for any non-trivial change
4. **Always cross-reference official docs** for version claims
5. **Always preserve markdown frontmatter** (title, version, updated, tier)
6. **Always update the `updated` field** in YAML frontmatter of modified files
7. **Always test relative links** between documents after structural changes

---

## Annual Review Process

At least once per year (recommended: Q1), perform a full stack audit:

```
1. For EACH technology in stack.yaml:
   a. Visit the official release page
   b. Note the latest stable version
   c. Check for security advisories
   d. Check for deprecation notices
   e. Check if our minimum version is still supported

2. For EACH technology in backlog/under-evaluation.md:
   a. Check if it reached v1 / stability threshold
   b. Update ETA column
   c. Promote to stack or archive if appropriate

3. For EACH technology in backlog/deprecated.md:
   a. Verify it's still deprecated (hasn't been revived)
   b. Ensure migration paths are still accurate

4. Review backlog/ROADMAP.md:
   a. Move completed items
   b. Add newly identified opportunities
   c. Update timelines

5. Bump blueprint_version (at minimum PATCH) with the audit date
6. Add CHANGELOG.md entry documenting the audit
```

---

## Commit Convention

All commits to this repo MUST follow:

```
<type>: <description>

Types:
  feat:     New technology, target, guide, or template
  fix:      Correct inaccurate information, broken links
  docs:     Improve clarity, add examples, fix typos
  bump:     Version bump of existing technology
  audit:    Annual/periodic review updates
  refactor: Restructure docs without changing content
  chore:    Tooling, CI, non-content changes
```

Examples:

```
bump: update Vite minimum to >=7.4
feat: add Biome as ESLint alternative (MINOR)
fix: correct Node.js requirement for Vite 7
audit: Q1 2027 annual stack review
docs: expand TanStack Query caching patterns
```
