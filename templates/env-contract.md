# Typed Environment Contract

In Vite, `VITE_*` values are client-visible configuration, never secrets.
Validate them once and import the typed result instead of reading
`import.meta.env` throughout features.

```typescript
// src/config/env.ts
import { z } from "zod";

const publicEnvSchema = z.object({
  VITE_APP_ENV: z.enum(["development", "preview", "production"]),
  VITE_APP_RELEASE: z.string().min(1),
  VITE_API_BASE_URL: z.string().url(),
  VITE_SENTRY_DSN: z.string().url().optional(),
});

const result = publicEnvSchema.safeParse(import.meta.env);

if (!result.success) {
  console.error(
    "Invalid public environment configuration",
    result.error.flatten(),
  );
  throw new Error("Invalid public environment configuration");
}

export const env = Object.freeze(result.data);
```

```dotenv
# .env.example — safe examples only
VITE_APP_ENV=development
VITE_APP_RELEASE=local
VITE_API_BASE_URL=http://localhost:3000
```

Rules:

- Keep privileged server/edge variables in a separate server-only schema.
- Do not use a `VITE_` prefix for secrets, service-role tokens, private keys, or
  unrestricted provider credentials.
- Fail during startup/build when required configuration is invalid.
- Avoid logging environment values; validation output should identify fields,
  not disclose credentials.
- CI, preview, and production each provide an explicit configuration set.
