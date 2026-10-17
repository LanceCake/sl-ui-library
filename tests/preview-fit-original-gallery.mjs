import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { frameworkRuntimeFiles } from '../release-tools/framework-runtime-hash.mjs';

const [candidate, output] = process.argv.slice(2);
if (![candidate, output, process.env.SL_UI_PLAYWRIGHT_MODULE].every(path => isAbsolute(path || '')) || output === candidate || !output.includes('preview-fit-fixed')) throw new Error('Absolute candidate, distinct preview-fit-fixed output and installed Playwright ESM module required');
const source = fileURLToPath(new URL('../', import.meta.url));
await mkdir(output, { recursive: true });
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const { components } = await import(pathToFileURL(resolve(candidate, 'public/catalog-data.js')));
const variants = components.flatMap(entry => entry.variants);
assert.equal(variants.length, 390);
const snapshot = async () => {
  const native = {}, framework = {};
  for (const variant of variants) {
    for (const name of ['index.html', 'buttons.css', 'buttons.js']) native[`${variant}/${name}`] = hash(await readFile(resolve(candidate, 'public/packages', variant, name)));
    for (const name of frameworkRuntimeFiles) framework[`${variant}/${name}`] = hash(await readFile(resolve(candidate, 'public/packages', variant, name)));
  }
  return { native, framework };
};
const files = {
  originalGallery: resolve(candidate, 'tests/gallery.test.mjs'),
  servedRuntime: resolve(source, 'public/preview-runtime.js'),
  servedCatalogCSS: resolve(source, 'public/catalog.css'),
  servedLibraryCSS: resolve(source, 'release-tools/ui-overrides/public/library.css'),
  candidatePreviewData: resolve(candidate, 'public/preview-data.js'),
};
const fingerprints = async () => Object.fromEntries(await Promise.all(Object.entries(files).map(async ([key, path]) => [key, { path, sha256: hash(await readFile(path)) }])));
const before = await snapshot(), inputBefore = await fingerprints();
const log = createWriteStream(resolve(output, 'original-gallery.tap'));
const env = { ...process.env, SL_UI_FIT_CANDIDATE: candidate, SL_UI_PLAYWRIGHT_PATH: process.env.SL_UI_PLAYWRIGHT_MODULE, SL_UI_BROWSER_CHANNEL: 'msedge' };
delete env.SL_UI_BROWSER;
const command = [
  '--import', pathToFileURL(resolve(source, 'tests/browser-defaults.mjs')).href,
  '--import', pathToFileURL(resolve(source, 'tests/preview-fit-overlay-preload.mjs')).href,
  '--test', '--test-reporter=tap', files.originalGallery,
];
const child = spawn(process.execPath, command, { cwd: source, env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
let outputText = '';
for (const stream of [child.stdout, child.stderr]) stream.on('data', chunk => { outputText += chunk; log.write(chunk); process.stdout.write(chunk); });
const exit = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', (code, signal) => resolve({ code, signal })); });
await new Promise(resolve => log.end(resolve));
const after = await snapshot(), inputAfter = await fingerprints();
const report = {
  ...exit, command: [process.execPath, ...command], fingerprints: inputBefore,
  inputsUnchanged: JSON.stringify(inputBefore) === JSON.stringify(inputAfter),
  nativeFiles: Object.keys(before.native).length,
  nativeUnchanged: JSON.stringify(before.native) === JSON.stringify(after.native),
  nativeAggregateSha256: hash(JSON.stringify(after.native)),
  frameworkRuntimeFiles: Object.keys(before.framework).length,
  frameworkRuntimeUnchanged: JSON.stringify(before.framework) === JSON.stringify(after.framework),
  frameworkRuntimeAggregateSha256: hash(JSON.stringify(after.framework)),
  counts: Object.fromEntries(['tests', 'pass', 'fail', 'cancelled', 'skipped'].map(key => [key, Number(outputText.match(new RegExp('# ' + key + ' (\\d+)'))?.[1] || 0)])),
};
await writeFile(resolve(output, 'original-gallery.json'), JSON.stringify(report, null, 2));
assert.equal(exit.code, 0);
assert.deepEqual(report.counts, { tests: 4, pass: 4, fail: 0, cancelled: 0, skipped: 0 });
assert.ok(report.inputsUnchanged && report.nativeUnchanged && report.frameworkRuntimeUnchanged);
console.log(JSON.stringify(report));
