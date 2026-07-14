export function profileGraphFailures(profileDocuments) {
  const failures = [];
  const profilesById = new Map();

  for (const [path, profile] of profileDocuments) {
    if (profilesById.has(profile.id)) {
      failures.push(`${path}: duplicate profile id ${profile.id}`);
      continue;
    }
    profilesById.set(profile.id, { path, profile });
  }

  for (const { path, profile } of profilesById.values()) {
    for (const parent of profile.extends) {
      if (!profilesById.has(parent)) {
        failures.push(`${path}: unknown parent profile ${parent}`);
      }
    }
  }

  const state = new Map();
  const stack = [];
  const reportedCycles = new Set();

  function visit(id) {
    state.set(id, "visiting");
    stack.push(id);

    for (const parent of profilesById.get(id).profile.extends) {
      if (!profilesById.has(parent)) continue;
      if (state.get(parent) === "visiting") {
        const start = stack.indexOf(parent);
        const cycle = [...stack.slice(start), parent].join(" -> ");
        if (!reportedCycles.has(cycle)) {
          reportedCycles.add(cycle);
          failures.push(`profiles: inheritance cycle ${cycle}`);
        }
      } else if (!state.has(parent)) {
        visit(parent);
      }
    }

    stack.pop();
    state.set(id, "visited");
  }

  for (const id of profilesById.keys()) {
    if (!state.has(id)) visit(id);
  }

  return failures;
}
