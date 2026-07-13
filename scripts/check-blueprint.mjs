import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function read(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function requireText(path, expected, label = expected) {
  const content = read(path);
  if (!content.includes(expected)) {
    failures.push(`${path}: missing ${label}`);
  }
}

const stackYaml = read("stack.yaml");
const version = stackYaml.match(/^blueprint_version: "([^"]+)"$/m)?.[1];
const updated = stackYaml.match(/^updated: "([^"]+)"$/m)?.[1];

if (!version || !updated) {
  failures.push("stack.yaml: blueprint_version or updated is missing");
}

const versionSurfaces = [
  ["README.md", `version-${version}-blue.svg`],
  ["CLAUDE.md", `# Frontend Stack Blueprint v${version}`],
  ["llms-full.txt", `FRONTEND STACK BLUEPRINT v${version} (${updated})`],
  ["llms-full.txt", `VERSION: ${version} | DATE: ${updated}`],
  ["backlog/ROADMAP.md", `## Current: v${version} (${updated})`],
];

for (const [path, expected] of versionSurfaces) {
  requireText(path, expected, `version marker ${expected}`);
}

const agentEntryPoints = [
  "CLAUDE.md",
  "AGENTS.md",
  ".cursorrules",
  ".cursor/rules/frontend-stack-blueprint.mdc",
  ".github/copilot-instructions.md",
  "llms.txt",
  "llms-full.txt",
];

const parityTerms = ["Advanced Capabilities", "DESIGN.md Design Contract"];

for (const path of agentEntryPoints) {
  for (const term of parityTerms) {
    requireText(path, term, `canonical term ${term}`);
  }
}

const operationalEntryPoints = agentEntryPoints.filter(
  (path) => path !== "llms.txt",
);

const operationalParityTerms = [
  "motion/react",
  "@date-fns/tz",
  "TanStack Store",
];

for (const path of operationalEntryPoints) {
  for (const term of operationalParityTerms) {
    requireText(path, term, `canonical term ${term}`);
  }
}

const bannedTerms = [
  "redux",
  "mobx",
  "styled-components",
  "emotion",
  "jest",
  "moment",
  "dayjs",
  "formik",
  "yup",
];

for (const path of operationalEntryPoints) {
  const content = read(path).toLowerCase();
  for (const term of bannedTerms) {
    if (!content.includes(term)) {
      failures.push(`${path}: banned-list drift for ${term}`);
    }
  }
}

const requiredFiles = [
  "stack/advanced-capabilities.md",
  "rationale/why-advanced-capabilities.md",
  "stack/design-system.md",
  "rationale/why-design-md.md",
  "templates/DESIGN.example.md",
  ".github/workflows/blueprint-integrity.yml",
];

for (const path of requiredFiles) {
  if (!existsSync(resolve(root, path))) {
    failures.push(`${path}: required file is missing`);
  }
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    if (entry.name === ".git") return [];
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
const checkedExtensions = new Set([".md", ".mdc"]);

for (const absolutePath of walk(root)) {
  const metadata = lstatSync(absolutePath);
  if (
    metadata.isSymbolicLink() ||
    !metadata.isFile() ||
    !checkedExtensions.has(extname(absolutePath))
  ) {
    continue;
  }

  const source = readFileSync(absolutePath, "utf8");
  for (const match of source.matchAll(linkPattern)) {
    const target = match[1].trim().replace(/^<|>$/g, "");
    if (/^(?:https?:|mailto:|#)/i.test(target)) continue;

    const filePart = decodeURIComponent(
      target.split("#", 1)[0].split("?", 1)[0],
    );
    if (!filePart) continue;

    const resolved = resolve(dirname(absolutePath), filePart);
    if (!existsSync(resolved)) {
      failures.push(
        `${absolutePath.slice(root.length + 1)}: broken link ${target}`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error("Blueprint integrity check failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Blueprint integrity OK: v${version}, ${agentEntryPoints.length} entry points, internal links valid.`,
);
