import assert from "node:assert/strict";
import { profileGraphFailures } from "./lib/profile-graph.mjs";

function profile(id, parents = []) {
  return [`profiles/${id}.json`, { id, extends: parents }];
}

assert.deepEqual(
  profileGraphFailures([
    profile("core"),
    profile("browser-app", ["core"]),
    profile("pwa", ["browser-app"]),
  ]),
  [],
);

assert.match(
  profileGraphFailures([
    profile("core"),
    profile("electron-app", ["production-service"]),
    profile("production-service", ["electron-app"]),
  ]).join("\n"),
  /inheritance cycle electron-app -> production-service -> electron-app/,
);

assert.match(
  profileGraphFailures([profile("browser-app", ["core"])]).join("\n"),
  /unknown parent profile core/,
);

assert.match(
  profileGraphFailures([profile("core"), profile("core")]).join("\n"),
  /duplicate profile id core/,
);

console.log(
  "Machine-contract graph tests OK: valid, cycle, parent, duplicate.",
);
