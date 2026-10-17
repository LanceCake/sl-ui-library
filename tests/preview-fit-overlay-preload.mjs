// Process-local file overlay for the unchanged candidate gallery test suite.
// This changes no test predicate, candidate file or browser readiness behavior.
import fs from 'node:fs/promises';
import { syncBuiltinESMExports } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const source = fileURLToPath(new URL('../', import.meta.url));
const target = process.env.SL_UI_FIT_CANDIDATE;
if (!target) throw new Error('Explicit QA candidate required');
const paths = new Map([
  [resolve(target, 'public/preview-runtime.js'), resolve(source, 'public/preview-runtime.js')],
  [resolve(target, 'public/catalog.css'), resolve(source, 'public/catalog.css')],
  [resolve(target, 'public/library.css'), resolve(source, 'release-tools/ui-overrides/public/library.css')],
]);
const read = fs.readFile;
fs.readFile = (path, ...options) => read(paths.get(resolve(path instanceof URL ? fileURLToPath(path) : path)) || path, ...options);
syncBuiltinESMExports();
