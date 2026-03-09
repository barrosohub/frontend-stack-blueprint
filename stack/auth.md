---
title: "Authentication (optional)"
version: "1.4.0"
updated: "2026-03-09"
tier: 1
---

# Authentication (optional)

## Better Auth ≥1

| Attribute   | Value                                                           |
| ----------- | --------------------------------------------------------------- |
| Role        | Authentication and session management when a project needs login |
| Min Version | ≥1.0                                                            |
| Current     | 1.5.1                                                           |
| Status      | ⭐ Recommended optional                                          |
| Install     | `pnpm add better-auth`                                          |
| Tooling     | `pnpm dlx @better-auth/cli@latest <command>`                    |

### When to Use

- Use Better Auth when the project needs sign-up, sign-in, sessions, OAuth, passkeys, or auth plugins
- Do NOT install it for public or static apps that do not need authentication
- Treat authentication as a dedicated feature module: `src/features/auth/`

### Boundary

- Better Auth owns auth endpoints, session lifecycle, cookies/tokens, and auth-specific plugins
- A server-side runtime is required to mount the auth handler; frontend-only static apps are out of scope
- In React clients, create the client from `better-auth/react`
- Use Better Auth client APIs and `useSession()` for auth session state
- TanStack Query remains the standard for non-auth server state
- Zustand remains the standard for local UI state
- Never mirror auth session or tokens into Zustand

### Official CLI-First + Impact Preflight

- Better Auth provides an official CLI for `init`, `generate`, `migrate`, and `secret`
- Apply Impact Preflight before any Better Auth CLI command: files created/modified, overwrite risk, structural conflicts, and config compatibility
- If impact is non-trivial or uncertain, ask the developer before running the CLI
- As of `2026-03-09`, the official `init` command documents framework support for Next.js only; generic Vite/React projects should follow the installation docs manually and use CLI commands such as `generate`, `migrate`, or `secret` only when applicable

### Rules

- If the project needs authentication, Better Auth is the default recommendation
- Keep auth business logic in hooks and auth-specific utilities, never inline in components
- Keep the client instance in a dedicated shared/auth lib, then consume it from feature hooks/components
- Keep auth provider configuration, plugins, and secrets outside presentation components

### References

- Official docs: [Installation](https://better-auth.com/docs/installation)
- Official docs: [Client](https://better-auth.com/docs/concepts/client)
- Official docs: [CLI](https://better-auth.com/docs/concepts/cli)
