Try `node index.js` and see that it fails the first time, but subsequence calls work.

Also note that if you remove `node_modules` it also works. It seems to be a problem when `node_modules` exist but typescript is not found.

If you try a different package it also works: `node index.js date-fns`.
