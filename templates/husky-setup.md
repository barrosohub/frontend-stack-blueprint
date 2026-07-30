---
title: "Template: Husky + lint-staged Setup"
version: "2.0.0"
updated: "2026-07-30"
tier: 2
---

# Husky + lint-staged Setup

## Install

```bash
pnpm add -D husky@^9.1.7 lint-staged@^17.2.0
```

## Initialize Husky

```bash
pnpm exec husky init
```

This creates `.husky/` directory and a sample pre-commit hook.

## Configure Pre-Commit Hook

```bash
# .husky/pre-commit
pnpm exec lint-staged
```

## Configure lint-staged

Add to `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

## Prettier Config

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

## Verification

```bash
# Stage a file and commit to test the hook
git add .
git commit -m "test: verify husky pre-commit"
# If lint errors exist → commit is blocked ✅
```

## Rules

- Setup is optional local feedback; protected CI remains mandatory
- Code with lint errors NEVER enters the repository
- Pre-commit runs on staged files only (fast)
- Do NOT skip hooks with `--no-verify` in regular workflow
