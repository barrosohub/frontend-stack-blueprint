---
title: "PWA Target"
version: "1.1.0"
updated: "2026-02-28"
tier: 2
target: "pwa"
---

# PWA Target

> Progressive Web Apps — web applications with offline support and native-like features.

## When to Use

- Web app needs offline capability
- App install experience on mobile/desktop without app stores
- Push notifications required
- Background sync needed

## Stack Addition

| Technology      | Install                          |
| --------------- | -------------------------------- |
| vite-plugin-pwa | `npm install -D vite-plugin-pwa` |

## Configuration

```typescript
// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "My App",
        short_name: "App",
        description: "App description",
        theme_color: "#ffffff",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
```

## Key Considerations

- **Service Worker:** vite-plugin-pwa generates the service worker
  automatically using Workbox
- **Caching strategies:** Configure workbox options for runtime caching
- **Update flow:** `registerType: 'autoUpdate'` silently updates;
  `'prompt'` shows update notification to user
- **Assets:** Provide icons in 192x192 and 512x512 at minimum

## PWA Checklist

- [ ] Web manifest with name, icons, theme color
- [ ] Service worker for offline caching
- [ ] HTTPS (required for service workers)
- [ ] Responsive design (works on all screen sizes)
- [ ] App icons in required sizes
- [ ] Meta tags for mobile (viewport, theme-color)
