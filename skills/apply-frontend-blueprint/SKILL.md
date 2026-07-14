---
name: apply-frontend-blueprint
description: Apply or audit the Frontend Stack Blueprint in an existing or new frontend repository. Use when an agent must inspect a project, select capability-gated profiles, create a blueprint.config.json contract, plan safe changes, run conformance, or verify that implementation evidence matches the blueprint without blanket-installing its catalog.
---

# Apply Frontend Blueprint

Apply the blueprint as an evidence-backed contract. Keep the target repository's
user instructions and explicit product requirements authoritative.

## Workflow

1. Locate the blueprint root and the target project. Read `stack.yaml`,
   `agent-contract.json`, `profiles/README.md`, and each candidate profile.
2. Inspect the target repository without writing. Read its agent instructions,
   package manifest, lockfile, build/test configs, CI, targets, and product docs.
3. Select `core` implicitly. Activate optional profiles only when explicit product
   requirements or repository evidence support them. Ask before proceeding when a
   materially ambiguous profile changes architecture or installed capabilities.
4. Create or update `blueprint.config.json` from
   `blueprint.config.example.json`. Record only temporary exceptions as waivers;
   require an ID, reason, owner, and expiry date.
5. Run the checker before changes:

   ```sh
   node <blueprint>/scripts/check-project-conformance.mjs \
     --project <target> --format json
   ```

6. Present an Impact Preflight: selected profiles, evidence, missing requirements,
   exact files and dependencies affected, commands, risks, and rollback approach.
7. Apply only authorized changes. Prefer official CLIs after preflight, pin
   reproducible inputs, preserve unrelated work, and never expose secrets.
8. Run the project's applicable typecheck, lint, unit, build, browser, security,
   accessibility, release, and target-specific checks.
9. Run conformance again. Report selected and resolved profiles, changed files,
   verification results, waivers, warnings, and remaining failures.

## Selection Rules

- Do not install the full stack. Profiles and capabilities are gates, not a
  starter dependency list.
- Do not activate `networked-app`, production, component-platform, Electron, PWA,
  authentication, data access, observability, or advanced capabilities by taste.
- Do not create a root `DESIGN.md` unless the product has explicit visual intent
  or source tokens. When active, treat it as the visual contract.
- Do not weaken a project-local instruction to satisfy the blueprint silently.
  Surface the conflict and request direction when it changes the outcome.
- Do not accept permanent waivers. Expired waivers fail conformance.

## Output Contract

Return these sections in order:

1. `profiles`: selected profiles and activation evidence.
2. `findings`: pre-change conformance failures and warnings.
3. `plan`: Impact Preflight and authorized changes.
4. `verification`: project checks and post-change conformance score.
5. `waivers`: active, expired, and newly proposed exceptions.
