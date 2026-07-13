# Performance Budget Template

Copy this policy into each production project's documentation and replace every
`TBD` before launch. Budgets are route- and device-aware; one global Lighthouse
score is not sufficient.

## Field Experience SLOs

Evaluate mobile and desktop separately at the 75th percentile:

| Metric | Good threshold | Data source         | Owner |
| ------ | -------------: | ------------------- | ----- |
| LCP    |        ≤ 2.5 s | TBD RUM/CrUX source | TBD   |
| INP    |       ≤ 200 ms | TBD RUM/CrUX source | TBD   |
| CLS    |          ≤ 0.1 | TBD RUM/CrUX source | TBD   |

## Route Budgets

Define numeric compressed-transfer budgets for every critical route.

| Route/journey          | Initial JS | Total transfer |  Images |   Fonts | Third-party origins |
| ---------------------- | ---------: | -------------: | ------: | ------: | ------------------: |
| Application shell      |    TBD KiB |        TBD KiB | TBD KiB | TBD KiB |                 TBD |
| Primary journey        |    TBD KiB |        TBD KiB | TBD KiB | TBD KiB |                 TBD |
| Largest supported view |    TBD KiB |        TBD KiB | TBD KiB | TBD KiB |                 TBD |

New projects establish budgets during the first representative production build.
Existing projects start from measured production values and require no regression
until an intentional, reviewed budget change is approved.

## CI Policy

- Build in production mode and serve the generated artifact.
- Run laboratory checks multiple times under a documented mobile profile.
- Block route-level asset budget regressions.
- Use lab LCP/CLS as regression signals; field INP is the production SLO.
- Attach the report to the pull request or CI run.
- A budget increase requires rationale, measured user impact, owner, and follow-up.

Lighthouse CI may enforce repeatable lab assertions and resource budgets. RUM or
CrUX supplies field truth. Never infer real-user compliance from Lighthouse alone.

## Runtime Collection Guardrails

- Sample intentionally and publish the sampling rate.
- Include release, route, device class, and coarse network context.
- Do not include user text, full URLs with identifiers, credentials, or PII.
- Define retention, access, alert ownership, and the response playbook.

Official reference: [Core Web Vitals](https://web.dev/articles/vitals).
