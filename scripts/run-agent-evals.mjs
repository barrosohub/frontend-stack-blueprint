import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const suite = JSON.parse(
  readFileSync(resolve(root, "evals/scenarios.json"), "utf8"),
);

function set(value) {
  return new Set(value ?? []);
}

function recall(expected, actual) {
  const wanted = set(expected);
  if (wanted.size === 0) return 1;
  return [...wanted].filter((item) => actual.has(item)).length / wanted.size;
}

function precision(expected, actual) {
  const wanted = set(expected);
  if (actual.size === 0) return wanted.size === 0 ? 1 : 0;
  return [...actual].filter((item) => wanted.has(item)).length / actual.size;
}

function f1(expected, actual) {
  const p = precision(expected, actual);
  const r = recall(expected, actual);
  return p + r === 0 ? 0 : (2 * p * r) / (p + r);
}

function scoreScenario(scenario, result) {
  const profiles = set(result?.profiles);
  const capabilities = set(result?.capabilities);
  const checks = set(result?.checks);
  const forbiddenHits = scenario.forbidden_capabilities.filter((item) =>
    capabilities.has(item),
  );
  const score =
    f1(scenario.expected_profiles, profiles) * 40 +
    recall(scenario.required_capabilities, capabilities) * 30 +
    recall(scenario.required_checks, checks) * 20 +
    (forbiddenHits.length === 0 ? 10 : 0);
  return {
    id: scenario.id,
    score: Math.round(score * 100) / 100,
    missing_profiles: scenario.expected_profiles.filter(
      (item) => !profiles.has(item),
    ),
    extra_profiles: [...profiles].filter(
      (item) => !scenario.expected_profiles.includes(item),
    ),
    missing_capabilities: scenario.required_capabilities.filter(
      (item) => !capabilities.has(item),
    ),
    forbidden_capabilities: forbiddenHits,
    missing_checks: scenario.required_checks.filter(
      (item) => !checks.has(item),
    ),
  };
}

function evaluate(results) {
  const byId = new Map(results.map((result) => [result.scenario_id, result]));
  const scenarios = suite.scenarios.map((scenario) =>
    scoreScenario(scenario, byId.get(scenario.id)),
  );
  const score =
    scenarios.reduce((sum, scenario) => sum + scenario.score, 0) /
    scenarios.length;
  return {
    score: Math.round(score * 100) / 100,
    minimum_score: suite.minimum_score,
    passed: score >= suite.minimum_score,
    scenarios,
  };
}

function idealResults() {
  return suite.scenarios.map((scenario) => ({
    scenario_id: scenario.id,
    profiles: scenario.expected_profiles,
    capabilities: scenario.required_capabilities,
    checks: scenario.required_checks,
  }));
}

const args = process.argv.slice(2);
if (args[0] === "--self-test") {
  const perfect = evaluate(idealResults());
  const deliberatelyBad = evaluate([
    {
      scenario_id: suite.scenarios[0].id,
      profiles: [],
      capabilities: suite.scenarios[0].forbidden_capabilities,
      checks: [],
    },
  ]);
  if (perfect.score !== 100 || !perfect.passed || deliberatelyBad.passed) {
    console.error("Agent eval harness self-test failed.");
    process.exit(1);
  }
  console.log(
    `Agent eval harness OK: ${suite.scenarios.length} scenarios, perfect=${perfect.score}, negative=${deliberatelyBad.score}.`,
  );
  process.exit(0);
}

if (args[0] !== "--results" || !args[1]) {
  console.error(
    "Usage: node scripts/run-agent-evals.mjs --results <results.json> | --self-test",
  );
  process.exit(2);
}

const candidate = JSON.parse(readFileSync(resolve(args[1]), "utf8"));
const evaluation = evaluate(candidate.results ?? []);
console.log(JSON.stringify(evaluation, null, 2));
if (!evaluation.passed) process.exitCode = 1;
