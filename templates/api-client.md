# Typed Fetch Boundary Template

Use this only when the product consumes a network API. TanStack Query remains
responsible for caching, invalidation, mutations, and UI-facing retry behavior.

```typescript
// src/shared/api/request.ts
import { z } from "zod";

type ApiErrorKind = "cancelled" | "timeout" | "network" | "http" | "decode";

export class ApiError extends Error {
  constructor(
    readonly kind: ApiErrorKind,
    message: string,
    readonly status?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "ApiError";
  }
}

interface RequestOptions extends Omit<RequestInit, "signal"> {
  signal?: AbortSignal;
  timeoutMs?: number;
}

export async function request<T>(
  url: URL,
  schema: z.ZodType<T>,
  options: RequestOptions = {},
): Promise<T> {
  const { signal: parentSignal, timeoutMs = 10_000, ...init } = options;
  const controller = new AbortController();
  let timedOut = false;

  const abortFromParent = (): void => controller.abort(parentSignal?.reason);
  if (parentSignal?.aborted) abortFromParent();
  else parentSignal?.addEventListener("abort", abortFromParent, { once: true });

  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, { ...init, signal: controller.signal });

    if (!response.ok) {
      throw new ApiError(
        "http",
        `Request failed with ${response.status}`,
        response.status,
      );
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch (error: unknown) {
      throw new ApiError("decode", "Response was not valid JSON", undefined, {
        cause: error,
      });
    }

    const parsed = schema.safeParse(payload);

    if (!parsed.success) {
      throw new ApiError(
        "decode",
        "Response did not match its contract",
        undefined,
        {
          cause: parsed.error,
        },
      );
    }

    return parsed.data;
  } catch (error: unknown) {
    if (error instanceof ApiError) throw error;
    if (timedOut)
      throw new ApiError("timeout", "Request timed out", undefined, {
        cause: error,
      });
    if (controller.signal.aborted) {
      throw new ApiError("cancelled", "Request was cancelled", undefined, {
        cause: error,
      });
    }
    throw new ApiError("network", "Network request failed", undefined, {
      cause: error,
    });
  } finally {
    clearTimeout(timeout);
    parentSignal?.removeEventListener("abort", abortFromParent);
  }
}
```

Project adaptations:

- Resolve URLs from the typed environment contract, not user-controlled strings.
- Handle empty `204` responses explicitly instead of calling `response.json()`.
- Add request encoding and safe response metadata without logging secrets or bodies.
- Keep retry in one layer and require idempotency for mutation retries.
- Validate representative success and malformed payloads with MSW integration tests.
