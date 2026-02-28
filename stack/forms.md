---
title: "Forms & Validation"
version: "1.1.0"
updated: "2026-02-28"
tier: 1
---

# Forms & Validation

## React Hook Form

| Attribute | Value                                            |
| --------- | ------------------------------------------------ |
| Role      | Form state management (performant, uncontrolled) |
| Status    | ✅ Core                                          |
| Install   | `npm install react-hook-form`                    |

## Zod

| Attribute | Value                                            |
| --------- | ------------------------------------------------ |
| Role      | Schema validation with TypeScript type inference |
| Status    | ✅ Core                                          |
| Install   | `npm install zod @hookform/resolvers`            |

## Rules

- **Any form with 2+ fields** MUST use React Hook Form + Zod
- RHF handles state; Zod handles validation with type inference
- Use `@hookform/resolvers/zod` to integrate
- Zod schemas also validate API responses, URL params, env vars
- NEVER use Formik — React Hook Form is the standard

## Integration Pattern

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define schema
const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

// 2. Infer type from schema
type LoginForm = z.infer<typeof loginSchema>;

// 3. Use in component
export function LoginForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm): Promise<void> => {
    await authenticate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        Sign In
      </button>
    </form>
  );
}
```

## Zod Beyond Forms

Zod is the standard validation library for ALL external data:

```typescript
// API response validation
const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["admin", "user", "viewer"]),
});

type User = z.infer<typeof userSchema>;

// Validate API response
const user = userSchema.parse(apiResponse);
```

See [templates/zod-form-example.md](../templates/zod-form-example.md) for complete examples.
