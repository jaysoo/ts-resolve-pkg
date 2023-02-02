const { execSync } = require("child_process");
const { existsSync } = require("fs");
const { join } = require("path");
const semver = require("semver");
const pkg = process.argv[2] ?? "typescript";
const ver = process.argv[3];

async function initGenerator() {
  const detectedVersion = getPackageVersion(pkg);
  console.log(">>> found", detectedVersion);

  if (!detectedVersion) {
    console.log(">> installing...");
    execSync(`npm i -D ${pkg}`, {
      stdio: [0, 1, 2],
    });
  } else if (ver && !semver.satisfies(detectedVersion, ver)) {
    console.log(">> installing...");
    execSync(`npm i -D ${pkg}`, {
      stdio: [0, 1, 2],
    });
  }

  require.resolve(pkg);
}

function detectPackageManager(dir = process.cwd()) {
  return existsSync(join(dir, "yarn.lock"))
    ? "yarn"
    : existsSync(join(dir, "pnpm-lock.yaml"))
      ? "pnpm"
      : "npm";
}

function getPackageVersion(pkg) {
  try {
    const pm = detectPackageManager();
    if (pm === "pnpm") {
      const json = JSON.parse(execSync(`pnpm list --depth=0 --json ${pkg}`));
      return json.dependencies[pkg]?.version ?? null;
    } else if (pm === "yarn") {
      const json = JSON.parse(
        execSync(
          `yarn list --pattern ${pkg} --depth=0 --json --non-interactive --no-progress`
        )
      );
      return json?.type?.trees?.find((t) => t.name === pkg)?.version;
    } else {
      const json = JSON.parse(execSync(`npm list --depth=0 --json ${pkg}`));
      return json.dependencies[pkg]?.version ?? null;
    }
  } catch {
    return null;
  }
}
initGenerator();
