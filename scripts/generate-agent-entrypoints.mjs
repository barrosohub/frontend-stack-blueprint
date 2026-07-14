import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2];

if (!new Set(["--write", "--check"]).has(mode)) {
  console.error(
    "Usage: node scripts/generate-agent-entrypoints.mjs --write|--check",
  );
  process.exit(2);
}

const targets = [
  "CLAUDE.md",
  "AGENTS.md",
  ".cursorrules",
  ".cursor/rules/frontend-stack-blueprint.mdc",
  ".github/copilot-instructions.md",
  "llms.txt",
  "llms-full.txt",
];
const begin = "<!-- BEGIN GENERATED: AGENT CONTRACT -->";
const end = "<!-- END GENERATED: AGENT CONTRACT -->";
const stack = YAML.parse(readFileSync(resolve(root, "stack.yaml"), "utf8"));
const contract = JSON.parse(
  readFileSync(resolve(root, "agent-contract.json"), "utf8"),
);

if (stack.blueprint_version !== contract.blueprint_version) {
  throw new Error("stack.yaml and agent-contract.json versions differ");
}

const bullets = (items) => items.map(({ rule }) => `- ${rule}`).join("\n");
const block = `${begin}
## Agent-Native Contract (generated)

Blueprint \`${contract.blueprint_version}\`. Canonical machine sources:
\`stack.yaml\`, \`agent-contract.json\`, \`schemas/\`, and \`profiles/\`.

Foundations:

${bullets(contract.foundations)}

Profile activation:

${bullets(contract.activation_rules)}

Prohibited behavior:

${bullets(contract.prohibited)}

Apply or audit the contract with \`skills/apply-frontend-blueprint/SKILL.md\` and
\`node scripts/check-project-conformance.mjs --project <path> --format json\`.
${end}`;

function generated(content) {
  const start = content.indexOf(begin);
  const finish = content.indexOf(end);

  if (start >= 0 || finish >= 0) {
    if (start < 0 || finish < start)
      throw new Error("Malformed generated markers");
    return `${content.slice(0, start)}${block}${content.slice(finish + end.length)}`;
  }

  return `${content.trimEnd()}\n\n${block}\n`;
}

const drift = [];
for (const path of targets) {
  const absolutePath = resolve(root, path);
  const current = readFileSync(absolutePath, "utf8");
  const expected = generated(current);

  if (mode === "--write") {
    writeFileSync(
      absolutePath,
      expected.endsWith("\n") ? expected : `${expected}\n`,
    );
  } else if (current !== expected) {
    drift.push(path);
  }
}

if (drift.length > 0) {
  console.error("Generated agent contract is stale. Run pnpm generate:agents:");
  for (const path of drift) console.error(`- ${path}`);
  process.exit(1);
}

console.log(
  `${mode === "--write" ? "Generated" : "Verified"} agent contract in ${targets.length} entry points.`,
);
