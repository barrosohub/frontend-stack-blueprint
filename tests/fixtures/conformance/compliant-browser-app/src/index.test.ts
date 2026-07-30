import { describe, expect, it } from "vitest";

import { fixtureReady } from "./index";

describe("blueprint fixture", () => {
  it("loads the validated TypeScript entrypoint", () => {
    expect(fixtureReady).toBe(true);
  });
});
