# Golden Agent Evaluations

These scenarios measure whether an agent selects profiles conservatively,
activates required capabilities, avoids unsupported capabilities, and proposes
the right verification gates.

Run the harness self-test:

```sh
pnpm eval:self-test
```

Score an agent result:

```sh
pnpm eval -- --results path/to/results.json
```

The result file has this shape:

```json
{
  "results": [
    {
      "scenario_id": "public-marketing-site",
      "profiles": ["browser-app", "networked-app"],
      "capabilities": [
        "browser-runtime",
        "accessibility",
        "api-boundary",
        "runtime-validation"
      ],
      "checks": [
        "typecheck",
        "lint",
        "test:unit",
        "build",
        "test:e2e",
        "network:error"
      ]
    }
  ]
}
```

Profile selection uses precision and recall. Required capabilities and checks use
recall, while selecting a forbidden capability loses the safety component. The
suite threshold is defined in `scenarios.json`.
