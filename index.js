const { execSync } = require("child_process");
const { createRequire } = require('module');
const semver = require("semver");
const pkg = process.argv[2] ?? "typescript";
const ver = process.argv[3];


async function ensurePackage(pkg) {
  const detectedVersion = getPackageVersion(pkg);
  console.log(">>> found", detectedVersion);

  if (!detectedVersion) {
    const cmd = `npm i -D ${pkg}`;
    execSync(cmd, { stdio: [0, 1, 2] });
  } else if (ver && !semver.satisfies(detectedVersion, ver)) {
    const cmd = `npm i -D ${pkg}@${ver}`;
    execSync(cmd, { stdio: [0, 1, 2] });
  }
}

async function initGenerator() {
  await ensurePackage(pkg);
  console.log(require.resolve(pkg));
}

function getPackageVersion(pkg) {
  try {
    // Create a sand-boxed `require` otherwise the module/file cache may be polluted,
    // and importing packages such as `typescript` may fail even though they are installed.
    const require = createRequire(__filename);
    console.log(__filename);
    return require(`${pkg}/package.json`).version;
  } catch (e) {
    console.error(e);
    return null;
  }
}

initGenerator();
