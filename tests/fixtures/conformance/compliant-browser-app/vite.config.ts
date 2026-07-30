import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    target: "baseline-widely-available",
    sourcemap: false,
  },
});
