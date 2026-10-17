import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { approved91 } from '../release-tools/compositions/inventory.mjs';
import { measureFit, assertFit, settled, lifecycleChecks, focusedActionChecks, initialContentChecks } from './preview-fit-browser.mjs';

const args = process.argv.slice(2), value = key => args[args.indexOf(key) + 1];
const candidate = resolve(value('--candidate'));
const source = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(value('--out'));
if (output === candidate || !output.includes('preview-fit-fixed')) throw new Error('Use a distinct preview-fit-fixed evidence directory');
await mkdir(output, { recursive: true });
const baseline = args.includes('--baseline'), all = args.includes('--all');
const { components } = await import(pathToFileURL(resolve(candidate, 'public/catalog-data.js')));
const allowed = new Set(approved91.map(entry => entry.id));
const entries = components.filter(entry => allowed.has(entry.id));
assert.equal(entries.length, 91);
assert.equal(components.flatMap(entry => entry.variants).length, 390);
const hashes = async () => {
  const result = {};
  for (const entry of components) for (const variant of entry.variants) for (const name of ['index.html', 'buttons.css', 'buttons.js']) {
    const path = `public/packages/${variant}/${name}`;
    result[path] = createHash('sha256').update(await readFile(resolve(candidate, path))).digest('hex');
  }
  return result;
};
const before = await hashes();
const evidence = { baseline, immediate: [], deterministic: [], errors: [], failures: [] };
// Reuse the unchanged original gallery predicates, including heading and panel fit.
const original = await readFile(resolve(source, 'tests/gallery.test.mjs'), 'utf8');
const fitIssues = original.slice(original.indexOf('function fitIssues()'), original.indexOf('async function ready('));
const overrides = new Map([
  ['preview-runtime.js', 'public/preview-runtime.js'],
  ['catalog.css', 'public/catalog.css'],
  ['library.css', 'release-tools/ui-overrides/public/library.css'],
]);
const fixture = `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><link rel="stylesheet" href="/catalog.css"><link rel="stylesheet" href="/library.css"><style>body{margin:0;padding:16px}.fixture{width:100%;max-width:420px}</style><script type="module" src="/preview-runtime.js"></script><article class="component-card fixture"><div class="card-preview"><button class="card-reset">Reset</button><sl-preview variant="inputs-account-core-profile-v11"></sl-preview></div></article>`;
let server, browser, page;
try {
  server = createServer(async (request, response) => {
    try {
      const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname.slice(1)) || 'index.html';
      if (path.split('/').includes('..')) throw new Error('path');
      const bytes = path === 'fit-fixture.html' ? Buffer.from(fixture) : await readFile(resolve(!baseline && overrides.has(path) ? source : candidate, !baseline && overrides.has(path) ? overrides.get(path) : `public/${path}`));
      response.writeHead(200, { 'Content-Type': ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.zip': 'application/zip' })[extname(path)] || 'application/octet-stream' }).end(bytes);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(4361, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:4361';
  const playwright = await import(pathToFileURL(resolve(process.env.SL_UI_PLAYWRIGHT_PATH)).href);
  browser = await playwright.chromium.launch({ channel: 'msedge', headless: true });
  page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    window.fitResizeObservers = new Set();
    const Native = ResizeObserver;
    window.ResizeObserver = class extends Native {
      constructor(callback) { super(callback); this.fitTargets = new Set(); window.fitResizeObservers.add(this); }
      observe(target, options) { this.fitTargets.add(target); super.observe(target, options); }
      disconnect() { this.fitTargets.clear(); super.disconnect(); }
    };
  });
  page.on('pageerror', error => evidence.errors.push(error.message));
  page.on('response', response => { if (!response.ok()) evidence.errors.push(`HTTP ${response.status()}: ${response.url()}`); });
  page.on('console', message => { if (message.type() === 'error') evidence.errors.push(message.text()); });
  // One JS task changes the owner width and reads forced layout, before any RO/rAF
  // can run. This deterministically covers the same stale-height boundary as CDP
  // viewport resize, whose task ordering can otherwise hide the regression.
  for (const purpose of args.includes('--behavior-only') ? [] : ['password', 'sessions', 'filters']) {
    const entry = entries.find(entry => entry.variants[0].includes(`-${purpose}-v11`));
    assert.ok(entry, purpose);
    await page.setViewportSize({ width: 1440, height: 900 });
    assert.ok((await page.goto(`${base}/component.html?component=${entry.id}`)).ok());
    await settled(page);
    const immediate = await page.evaluate(source => {
      document.querySelector('.preview-panel').style.width = '286px';
      return Function(source + '; return fitIssues();')();
    }, fitIssues);
    const geometry = await page.evaluate(measureFit);
    await settled(page);
    const after = await page.evaluate(measureFit);
    evidence.deterministic.push({ purpose, immediate, geometry, settled: after });
    if (!baseline) { assert.deepEqual(immediate, [], purpose); assertFit(geometry); assertFit(after); }
  }
  for (const entry of args.includes('--behavior-only') ? [] : all ? entries : entries.filter(entry => /-(filters|password|sessions)-v11$/.test(entry.variants[0]))) {
    await page.goto(`${base}/component.html?component=${entry.id}`);
    await page.waitForFunction(() => document.querySelector('sl-preview')?.dataset.ready === 'true');
    await page.evaluate(() => document.fonts.ready);
    if (!evidence.contentSizingVariants) {
      evidence.contentSizingVariants = await page.evaluate(async () => {
        const { previews } = await import('/preview-data.js?v=instant-4');
        return Object.entries(previews).filter(([, definition]) => definition.contentSizing).map(([variant]) => variant).sort();
      });
      assert.deepEqual(evidence.contentSizingVariants, entries.flatMap(entry => entry.variants).sort(), 'Only the exact approved91 may use intrinsic presentation flow');
    }
    for (const width of [320, 768, 1024, 1440, 320]) {
      await page.setViewportSize({ width, height: 900 });
      // Deliberately no wait, frame or readiness poll after changing width.
      const issues = await page.evaluate(source => Function(source + ';return fitIssues();')(), fitIssues);
      evidence.immediate.push({ id: entry.id, width, issues });
      if (!baseline) assert.deepEqual(issues, [], `${entry.id}/${width}`);
    }
  }
  if (!baseline && !args.includes('--immediate-only') && (all || args.includes('--behavior-only'))) {
    if (all) evidence.gallery = await initialContentChecks({ page, base, entries, widths: [320, 768, 1024, 1440] });
    evidence.lifecycle = await lifecycleChecks({ page, base });
    evidence.focus = await focusedActionChecks({ page, base, entries });
  }
  if (!baseline) assert.deepEqual(evidence.errors, []);
} catch (error) { evidence.failures.push(error.stack); process.exitCode = 1; }
finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  const after = await hashes();
  evidence.candidateNativeUnchanged = JSON.stringify(before) === JSON.stringify(after);
  evidence.candidateNativeAggregateSha256 = createHash('sha256').update(JSON.stringify(after)).digest('hex');
  await writeFile(resolve(output, baseline ? 'resize-red.json' : 'resize-green.json'), JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify({ baseline, immediate: evidence.immediate.length, deterministic: evidence.deterministic.length, errors: evidence.errors, failures: evidence.failures, candidateNativeUnchanged: evidence.candidateNativeUnchanged, output }));
  assert.equal(evidence.candidateNativeUnchanged, true, 'Private resize QA must not change candidate native sources');
}
