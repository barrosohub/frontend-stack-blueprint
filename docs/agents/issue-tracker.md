# Issue tracker: GitHub

Issues and PRDs for this repository live in GitHub Issues.

## Conventions

- Prefer the connected GitHub integration for issue and pull-request operations.
- When the GitHub CLI is available, infer the repository from `git remote -v`.
- Create one issue per independently deliverable change.
- Read the issue body, labels, and comments before implementation.
- Link pull requests to their originating issue when one exists.
- Use GitHub-native sub-issues and dependencies for blocked work when available.

## Pull requests as a triage surface

**PRs as a request surface: no.**

External pull requests are reviewed as proposed changes, not treated as feature
requests by default.

## Skill operations

- When a skill says **publish to the issue tracker**, create a GitHub issue.
- When a skill says **fetch the relevant ticket**, read the corresponding issue
  body, labels, and comments.
- Resolve a bare `#42` as either an issue or pull request before acting because
  GitHub shares one number space between them.
