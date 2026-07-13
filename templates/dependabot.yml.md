# Dependabot Template

```yaml
# .github/dependabot.yml
version: 2

updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: "09:00"
      timezone: Etc/UTC
    open-pull-requests-limit: 10
    groups:
      development-dependencies:
        dependency-type: development
        update-types: [minor, patch]
      production-dependencies:
        dependency-type: production
        update-types: [minor, patch]

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: weekly
      day: monday
      time: "09:30"
      timezone: Etc/UTC
    open-pull-requests-limit: 5
```

Dependabot pull requests pass the full Production Reliability gate. Review major
upgrades and security-sensitive runtime packages manually. Keep GitHub Actions
pinned to full verified commit SHAs; the comment may record the corresponding tag.
