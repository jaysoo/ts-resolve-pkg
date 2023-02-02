This is a reproduction for a bug where `ensurePackage` does not work with `typescript`. Even after `typescript` is installed, Node still cannot resolve it unless you re-run the script.

## Steps

1. Try `node index.js` and see that it fails the first time.
2. Call `node index.js` a second time and it works.

> Note: if you remove `node_modules` first then the script works. It seems to be a problem when `node_modules` exist but typescript is not found.

## Notes

- `moment` also fails.
- If you try a different package it also works: `node index.js date-fns`.
- If you remove the `require.resolve(pkg)` call then the script works the first time as well.
