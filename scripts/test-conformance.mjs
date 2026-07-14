import assert from "node:assert/strict";
import {
  cpSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fixture = resolve(
  root,
  "tests/fixtures/conformance/compliant-browser-app",
);
const checker = resolve(root, "scripts/check-project-conformance.mjs");
const temporaryRoot = mkdtempSync(resolve(tmpdir(), "blueprint-conformance-"));
let cases = 0;

function run(project) {
  return spawnSync(
    process.execPath,
    [checker, "--project", project, "--format", "json"],
    { encoding: "utf8" },
  );
}

function check(name, mutate, expectedStatus, expectedText) {
  const project = resolve(temporaryRoot, name);
  cpSync(fixture, project, { recursive: true });
  mutate(project);
  const result = run(project);
  assert.equal(
    result.status,
    expectedStatus,
    `${name}: expected exit ${expectedStatus}\n${result.stdout}\n${result.stderr}`,
  );
  assert.match(`${result.stdout}\n${result.stderr}`, expectedText, name);
  cases += 1;
}

try {
  check("compliant", () => {}, 0, /"status": "pass"/);

  check(
    "invalid-waiver",
    (project) => {
      const path = resolve(project, "blueprint.config.json");
      const config = JSON.parse(readFileSync(path, "utf8"));
      config.waivers = [{ id: "core.react", expires: "9999-99-99" }];
      writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
    },
    2,
    /Invalid consumer config/,
  );

  check(
    "duplicate-lockfiles",
    (project) =>
      writeFileSync(
        resolve(project, "package-lock.json"),
        '{"lockfileVersion": 3}\n',
      ),
    1,
    /core\.lockfile/,
  );

  check(
    "placeholder-e2e",
    (project) =>
      writeFileSync(resolve(project, "e2e/smoke.spec.ts"), "export {};\n"),
    1,
    /browser\.e2e-suite/,
  );

  check(
    "placeholder-playwright",
    (project) =>
      writeFileSync(
        resolve(project, "playwright.config.ts"),
        "export default {};\n",
      ),
    1,
    /browser\.playwright-config/,
  );

  check(
    "empty-evidence",
    (project) =>
      writeFileSync(resolve(project, "docs/browser-support.md"), "\n"),
    1,
    /browser\.support-policy/,
  );
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}

console.log(
  `Conformance checker tests OK: ${cases} positive and negative cases.`,
);
