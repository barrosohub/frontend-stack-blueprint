# Project Profiles

Profiles turn the blueprint into an explicit, composable contract. `core` always
applies. Select optional profiles only when repository evidence or product
requirements activate the capability.

| Profile              | Activate when                                                     |
| -------------------- | ----------------------------------------------------------------- |
| `core`               | Always                                                            |
| `browser-app`        | An interactive UI runs in browsers                                |
| `networked-app`      | The frontend consumes remote data                                 |
| `production-service` | Real users or business operations depend on a deployment          |
| `component-platform` | The repository owns reusable components or a design system        |
| `electron-app`       | Desktop/native Electron capabilities are required                 |
| `pwa`                | Installability, offline behavior, or service workers are required |

Each profile is validated by
[`schemas/profile.schema.json`](../schemas/profile.schema.json). A consuming
repository records selected profiles in `blueprint.config.json` and may attach
temporary, owned, expiring waivers. Run the conformance checker described in
[`guides/agent-consumption.md`](../guides/agent-consumption.md) to produce a
machine-readable or Markdown report.
