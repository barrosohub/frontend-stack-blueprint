---
title: "Template: React Hook Form + Zod Example"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
---

# React Hook Form + Zod Integration Example

## Install

```bash
npm install react-hook-form zod @hookform/resolvers
```

## Complete Example: Contact Form

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/shared/utils/cn';

// 1. Define schema with Zod
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.enum(['general', 'support', 'feedback'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be under 1000 characters'),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms' }),
  }),
});

// 2. Infer TypeScript type from schema
type ContactFormData = z.infer<typeof contactSchema>;

// 3. Component
export function ContactForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: 'general',
    },
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      await submitContactForm(data);
      reset();
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          className={cn(
            "w-full rounded-md border px-3 py-2",
            errors.name && "border-red-500",
          )}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className={cn(
            "w-full rounded-md border px-3 py-2",
            errors.email && "border-red-500",
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          Subject
        </label>
        <select
          id="subject"
          {...register('subject')}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="general">General</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className={cn(
            "w-full rounded-md border px-3 py-2",
            errors.message && "border-red-500",
          )}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium",
          isSubmitting && "opacity-50 cursor-not-allowed",
        )}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

## Key Patterns

- **Schema first** — Define Zod schema, then infer the TypeScript type
- **`zodResolver`** — Bridges Zod validation into React Hook Form
- **Error display** — Use `errors.<field>.message` for user-facing messages
- **`cn()` for styling** — Conditional error styling with cn()
- **Type safety** — Full type inference from schema to form values
