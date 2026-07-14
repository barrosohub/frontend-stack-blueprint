import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const blueprintRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validateConsumerConfig = ajv.compile(
  JSON.parse(
    readFileSync(
      resolve(blueprintRoot, "schemas/consumer-config.schema.json"),
      "utf8",
    ),
  ),
);

function argumentsFrom(argv) {
  const options = { project: ".", format: "markdown" };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--project" || value === "--config" || value === "--format") {
      options[value.slice(2)] = argv[index + 1];
      index += 1;
    } else if (value === "--help") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${value}`);
    }
  }
  if (!new Set(["json", "markdown"]).has(options.format)) {
    throw new Error("--format must be json or markdown");
  }
  return options;
}

function loadProfiles() {
  const profiles = new Map();
  for (const name of readdirSync(resolve(blueprintRoot, "profiles")).sort()) {
    if (!name.endsWith(".json")) continue;
    const profile = JSON.parse(
      readFileSync(resolve(blueprintRoot, "profiles", name), "utf8"),
    );
    profiles.set(profile.id, profile);
  }
  return profiles;
}

function resolveProfiles(selected, available) {
  const ordered = [];
  const visiting = new Set();
  const visited = new Set();

  function visit(id) {
    if (visited.has(id)) return;
    if (visiting.has(id)) throw new Error(`Profile cycle detected at ${id}`);
    const profile = available.get(id);
    if (!profile) throw new Error(`Unknown profile: ${id}`);
    visiting.add(id);
    for (const parent of profile.extends) visit(parent);
    visiting.delete(id);
    visited.add(id);
    ordered.push(profile);
  }

  for (const id of selected) visit(id);
  return ordered;
}

function matchingPaths(projectRoot, requirement) {
  return requirement.any_of.filter((path) => {
    const absolutePath = resolve(projectRoot, path);
    if (!existsSync(absolutePath) || !lstatSync(absolutePath).isFile()) {
      return false;
    }

    const content = readFileSync(absolutePath, "utf8");
    if (content.trim().length === 0) return false;
    if (!requirement.content_any_of) return true;

    const normalized = content.toLowerCase();
    return requirement.content_any_of.some((expected) =>
      normalized.includes(expected.toLowerCase()),
    );
  });
}

function requirementSatisfied(requirement, matches) {
  return requirement.match_count === undefined
    ? matches.length > 0
    : matches.length === requirement.match_count;
}

function observedMatches(matches) {
  if (matches.length === 0) return null;
  return matches.length === 1 ? matches[0] : matches;
}

function inspectProject(projectRoot, profiles, waivers) {
  const packagePath = resolve(projectRoot, "package.json");
  const packageJson = existsSync(packagePath)
    ? JSON.parse(readFileSync(packagePath, "utf8"))
    : {};
  const installed = new Set([
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.devDependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
  ]);
  const scripts = packageJson.scripts ?? {};
  const waiverById = new Map(waivers.map((waiver) => [waiver.id, waiver]));
  const today = new Date().toISOString().slice(0, 10);
  const findings = [];

  function add(profile, category, requirement, satisfied, observed) {
    const waiver = waiverById.get(requirement.id);
    const activeWaiver = waiver && waiver.expires >= today;
    const status = satisfied ? "pass" : activeWaiver ? "waived" : "fail";
    findings.push({
      profile: profile.id,
      category,
      id: requirement.id,
      severity: requirement.severity,
      status,
      description: requirement.description,
      expected: requirement.any_of ?? [requirement.name],
      observed,
      waiver: activeWaiver ? waiver : undefined,
      expired_waiver: Boolean(waiver && !activeWaiver),
    });
  }

  for (const profile of profiles) {
    for (const category of ["files", "evidence"]) {
      for (const requirement of profile.requirements[category]) {
        const matches = matchingPaths(projectRoot, requirement);
        add(
          profile,
          category,
          requirement,
          requirementSatisfied(requirement, matches),
          observedMatches(matches),
        );
      }
    }
    for (const requirement of profile.requirements.packages) {
      const matches = requirement.any_of.filter((name) => installed.has(name));
      add(
        profile,
        "packages",
        requirement,
        requirementSatisfied(requirement, matches),
        observedMatches(matches),
      );
    }
    for (const requirement of profile.requirements.scripts) {
      add(
        profile,
        "scripts",
        requirement,
        Boolean(scripts[requirement.name]),
        scripts[requirement.name] ?? null,
      );
    }
  }

  return findings;
}

function reportFor(projectRoot, configPath, config, profiles, findings) {
  const enforced = findings.filter((finding) => finding.severity === "error");
  const passed = enforced.filter(
    (finding) => finding.status === "pass" || finding.status === "waived",
  ).length;
  const failures = enforced.filter((finding) => finding.status === "fail");
  const warnings = findings.filter(
    (finding) => finding.severity === "warning" && finding.status === "fail",
  );
  return {
    schema_version: "1.0",
    generated_at: new Date().toISOString(),
    project: projectRoot,
    config: configPath,
    blueprint_version: config.blueprint_version,
    selected_profiles: config.profiles,
    resolved_profiles: profiles.map(({ id }) => id),
    status: failures.length === 0 ? "pass" : "fail",
    score:
      enforced.length === 0
        ? 100
        : Math.round((passed / enforced.length) * 100),
    summary: {
      passed,
      failed: failures.length,
      warnings: warnings.length,
      waived: findings.filter(({ status }) => status === "waived").length,
    },
    findings,
  };
}

function markdown(report) {
  const lines = [
    "# Frontend Blueprint Conformance",
    "",
    `- Status: **${report.status.toUpperCase()}**`,
    `- Score: **${report.score}%**`,
    `- Profiles: ${report.resolved_profiles.map((id) => `\`${id}\``).join(", ")}`,
    `- Findings: ${report.summary.passed} passed, ${report.summary.failed} failed, ${report.summary.waived} waived, ${report.summary.warnings} warnings`,
    "",
    "| Status | Severity | Requirement | Profile | Evidence |",
    "| --- | --- | --- | --- | --- |",
  ];
  for (const finding of report.findings) {
    const evidence = finding.observed ?? finding.expected.join(" or ");
    lines.push(
      `| ${finding.status} | ${finding.severity} | \`${finding.id}\` | \`${finding.profile}\` | ${evidence} |`,
    );
  }
  return `${lines.join("\n")}\n`;
}

try {
  const options = argumentsFrom(process.argv.slice(2));
  if (options.help) {
    console.log(
      "Usage: node scripts/check-project-conformance.mjs [--project <path>] [--config <path>] [--format json|markdown]",
    );
    process.exit(0);
  }
  const projectRoot = resolve(options.project);
  const configPath = options.config
    ? resolve(
        isAbsolute(options.config)
          ? options.config
          : resolve(projectRoot, options.config),
      )
    : resolve(projectRoot, "blueprint.config.json");
  if (!existsSync(configPath))
    throw new Error(`Missing consumer config: ${configPath}`);
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  if (!validateConsumerConfig(config)) {
    const details = (validateConsumerConfig.errors ?? [])
      .map(
        (error) =>
          `${error.instancePath || "/"}: ${error.message ?? "invalid value"}`,
      )
      .join("; ");
    throw new Error(`Invalid consumer config: ${details}`);
  }
  const waiverIds = config.waivers.map(({ id }) => id);
  if (new Set(waiverIds).size !== waiverIds.length) {
    throw new Error("Invalid consumer config: waiver IDs must be unique");
  }
  const supportedVersion = JSON.parse(
    readFileSync(resolve(blueprintRoot, "agent-contract.json"), "utf8"),
  ).blueprint_version;
  if (config.blueprint_version !== supportedVersion) {
    throw new Error(
      `Consumer config targets blueprint ${config.blueprint_version ?? "<missing>"}; this checker supports ${supportedVersion}`,
    );
  }
  const profileCatalog = loadProfiles();
  const profiles = resolveProfiles(config.profiles, profileCatalog);
  const findings = inspectProject(projectRoot, profiles, config.waivers ?? []);
  const report = reportFor(projectRoot, configPath, config, profiles, findings);
  console.log(
    options.format === "json"
      ? JSON.stringify(report, null, 2)
      : markdown(report),
  );
  if (report.status === "fail") process.exitCode = 1;
} catch (error) {
  console.error(`Conformance check could not run: ${error.message}`);
  process.exitCode = 2;
}
