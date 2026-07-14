import { readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import YAML from "yaml";
import { profileGraphFailures } from "./lib/profile-graph.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);

function json(path) {
  return JSON.parse(readFileSync(resolve(root, path), "utf8"));
}

function validate(schemaPath, documents) {
  const check = ajv.compile(json(schemaPath));
  const failures = [];

  for (const [path, value] of documents) {
    if (check(value)) continue;
    for (const error of check.errors ?? []) {
      failures.push(`${path}${error.instancePath || "/"}: ${error.message}`);
    }
  }

  return failures;
}

const profileDocuments = readdirSync(resolve(root, "profiles"))
  .filter((name) => name.endsWith(".json"))
  .sort()
  .map((name) => [`profiles/${name}`, json(`profiles/${name}`)]);

const stack = YAML.parse(readFileSync(resolve(root, "stack.yaml"), "utf8"));
const scenarios = json("evals/scenarios.json");
const failures = [
  ...validate("schemas/stack.schema.json", [["stack.yaml", stack]]),
  ...validate("schemas/agent-contract.schema.json", [
    ["agent-contract.json", json("agent-contract.json")],
  ]),
  ...validate("schemas/profile.schema.json", profileDocuments),
  ...validate("schemas/consumer-config.schema.json", [
    ["blueprint.config.example.json", json("blueprint.config.example.json")],
  ]),
  ...validate("schemas/evals.schema.json", [
    ["evals/scenarios.json", scenarios],
  ]),
];

const contract = json("agent-contract.json");
if (stack.blueprint_version !== contract.blueprint_version) {
  failures.push("agent-contract.json: blueprint_version must match stack.yaml");
}

failures.push(...profileGraphFailures(profileDocuments));

if (failures.length > 0) {
  console.error("Machine-contract validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Machine contracts OK: stack, agent contract, ${profileDocuments.length} profiles, consumer config, and ${scenarios.scenarios.length} eval scenarios.`,
);
