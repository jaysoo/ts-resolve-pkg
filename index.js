// Put this file somewhere, and run `npm init`.
// Then `node index.js` and see that it will error the first time.
// If you run it a second time it works.
//
// Also if you use another package like date-fns,  it works the frist time.
const child_process_1 = require("child_process");
const pkg = process.argv[2] ?? 'typescript';


function ensurePackage(tree, pkg, requiredVersion, options = {}) {
  try {
    require.resolve(pkg);
  }
  catch (_d) {
  }
  (0, child_process_1.execSync)(`npm i -D ${pkg}@${requiredVersion}`, {
    cwd: process.cwd(),
    stdio: [0, 1, 2],
  });
  return
}


function initGenerator(host, schema) {
  ensurePackage(host, pkg, 'latest');
  console.log(`> resolved at ${require.resolve(pkg)}`);
}

initGenerator();
