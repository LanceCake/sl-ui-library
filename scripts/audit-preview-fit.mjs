import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { approved91 } from '../release-tools/compositions/inventory.mjs';
import { standaloneFitVariants } from '../release-tools/integrate-preview-fit.mjs';
import { initialContentChecks, measureFit, settled, assertFit, lifecycleChecks, focusedActionChecks } from '../tests/preview-fit-browser.mjs';

const args = process.argv.slice(2);
const value = flag => args[args.indexOf(flag) + 1];
const candidate = resolve(value('--candidate'));
const output = resolve(value('--out'));
const source = fileURLToPath(new URL('../', import.meta.url));
const baseline = args.includes('--baseline');
const quick = args.includes('--quick');
const standaloneOnly = args.includes('--standalone-only');
const direct = args.includes('--direct');
const presentationOverlay = args.includes('--presentation-overlay');
if (output === candidate || !output.includes('preview-fit-fixed')) throw new Error('Use a distinct preview-fit-fixed evidence directory');
await mkdir(output, { recursive: true });
const { components } = await import(pathToFileURL(resolve(candidate, 'public/catalog-data.js')));
if (components.flatMap(x => x.variants).length !== 390) throw new Error('Expected complete 390 variant QA candidate');
const allow = new Set(approved91.map(x => x.id));
const entries = components.filter(x => allow.has(x.id));
if (entries.length !== 91) throw new Error('Missing approved content sources');
const nativeHashes = async () => {
  const hashes = {};
  for (const variant of components.flatMap(x => x.variants)) for (const name of ['buttons.css', 'buttons.js', 'index.html']) {
    const relative = `public/packages/${variant}/${name}`;
    hashes[relative] = createHash('sha256').update(await readFile(resolve(candidate, relative))).digest('hex');
  }
  return hashes;
};
const sourceBefore = await nativeHashes();
let generated;
if (!baseline && !direct && !presentationOverlay) {
  // Run the real compiler logic with an in-memory metadata overlay and one private output.
  let compiler = await readFile(resolve(source, 'build-previews.mjs'), 'utf8');
  compiler = compiler.replace("import { readFile, writeFile } from 'node:fs/promises';", "import { readFile, writeFile as saveGenerated } from 'node:fs/promises';\nconst writeFile = (_url, text) => saveGenerated(" + JSON.stringify(resolve(output, 'preview-data.js')) + ",text);");
  compiler = compiler.replace("import { components } from './public/catalog-data.js';", `const { components: original } = await import(${JSON.stringify(pathToFileURL(resolve(candidate, 'public/catalog-data.js')).href)});\nconst approved = new Set(${JSON.stringify([...allow])});\nconst components = original.map(x=>approved.has(x.id)?{...x,previewSizing:'content'}:x);`);
  compiler = compiler.replace("import { approved91 } from './release-tools/compositions/inventory.mjs';", `const {approved91} = await import(${JSON.stringify(pathToFileURL(resolve(source, 'release-tools/compositions/inventory.mjs')).href)});`);
  compiler = compiler.replace("new URL('./public/', import.meta.url)", `new URL(${JSON.stringify(pathToFileURL(resolve(candidate, 'public/')).href + '/')})`);
  try { await import('data:text/javascript;base64,' + Buffer.from(compiler).toString('base64')); }
  catch (error) { console.error('Private preview compilation failed:', error.message); process.exit(1); }
  generated = await readFile(resolve(output, 'preview-data.js'));
}
const fixture = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><link rel="stylesheet" href="/catalog.css"><link rel="stylesheet" href="/library.css"><style>body{margin:0;padding:16px;background:#eee}.fixture{width:100%;max-width:420px}.card-preview{width:100%}.workbench{width:100%}h2{white-space:normal}</style><script type="module" src="/preview-runtime.js"></script></head><body><main id="fixture"></main><script>const p=new URLSearchParams(location.search),v=p.get('variant'),host='<sl-preview variant="'+v+'"></sl-preview>';document.querySelector('#fixture').innerHTML=p.get('mode')==='workbench'?'<div class="workbench"><div class="workbench-body"><section class="preview-panel"><h2 id="preview-heading">Component preview</h2>'+host+'</section><section class="code-panel"></section></div></div>':'<article class="component-card fixture"><div class="card-preview"><button class="card-reset" aria-label="Reset">Reset</button>'+host+'</div></article>';</script></body></html>`;
const overrides = new Map([
  ['public/preview-runtime.js', 'public/preview-runtime.js'],
  ['public/catalog.css', 'public/catalog.css'],
  ['public/library.css', 'release-tools/ui-overrides/public/library.css'],
  ...(!presentationOverlay ? standaloneFitVariants.map(x => [`public/packages/${x}/index.html`, `public/packages/${x}/index.html`]) : []),
]);
let server, browser, page;
const evidence = { baseline, direct, presentationOverlay, candidate, content: [], standalone: [], expanded: [], lifecycle: [], errors: [], httpFailures: [], failures: [] };
if (generated) {
  const prior = await readFile(resolve(candidate, 'public/preview-data.js'), 'utf8');
  const clean = generated.toString().replaceAll(', contentSizing: true', '');
  evidence.generatedUnflaggedMatchesCandidate = clean === prior;
  if (!evidence.generatedUnflaggedMatchesCandidate) throw new Error('Compiler changed more than content flags');
}
try {
  server = createServer(async (request, response) => {
    try {
      const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname.slice(1)) || 'index.html';
      if (path.split('/').includes('..')) throw new Error('path');
      let bytes;
      if (path === 'fit-fixture.html') bytes = Buffer.from(fixture);
      else if (path === 'preview-data.js' && generated) bytes = generated;
      else {
        const relative = 'public/' + path;
        const overlay = !baseline && (!direct || presentationOverlay) && overrides.has(relative);
        bytes = await readFile(resolve(overlay ? source : candidate, overlay ? overrides.get(relative) : relative));
      }
      response.writeHead(200, { 'Content-Type': ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2' })[extname(path)] || 'application/octet-stream' }).end(bytes);
    } catch { response.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(4361, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:4361';
  const playwright = await import(process.env.SL_UI_PLAYWRIGHT_PATH ? pathToFileURL(resolve(process.env.SL_UI_PLAYWRIGHT_PATH)).href : 'playwright');
  browser = await playwright.chromium.launch({ channel: 'msedge', headless: true });
  page = await browser.newPage();
  await page.addInitScript(() => {
    window.fitResizeLog = [];
    window.fitResizeObservers = new Set();
    const NativeResizeObserver = window.ResizeObserver;
    window.ResizeObserver = class extends NativeResizeObserver {
      constructor(callback) { super((entries, observer) => { window.fitResizeLog.push(entries.map(x => ({ target: x.target.className || x.target.tagName, height: x.target.offsetHeight }))); callback(entries, observer); }); this.fitTargets = new Set(); window.fitResizeObservers.add(this); }
      observe(target, options) { this.fitTargets.add(target); return super.observe(target, options); }
      unobserve(target) { this.fitTargets.delete(target); return super.unobserve(target); }
      disconnect() { this.fitTargets.clear(); return super.disconnect(); }
    };
  });
  page.on('pageerror', error => evidence.errors.push(error.message));
  page.on('response', response => { if (!response.ok()) evidence.httpFailures.push({ url: response.url(), status: response.status() }); });
  page.on('requestfailed', request => evidence.httpFailures.push({ url: request.url(), failure: request.failure()?.errorText }));
  page.on('console', message => { if (message.type() === 'error' && /ResizeObserver/.test(message.text())) evidence.errors.push(message.text()); });
  if (!standaloneOnly && !args.includes('--skip-initial')) evidence.content = await initialContentChecks({ page, base, entries: quick ? entries.filter(x => /profile|sessions|reviews/.test(x.variants[0])) : entries, widths: quick ? [320] : [320, 768, 1024, 1440], baseline });
  for (const width of standaloneOnly || args.includes('--skip-expanded') ? [] : quick ? [320] : [320, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const entry of entries.filter(x => /account-core-(profile|password|sessions)|compositions-files|next-twenty-export|account-services-exports|account-extensions-reviews/.test(x.variants[0]))) for (const mode of ['gallery', 'workbench']) {
      const selector = `sl-preview[variant="${entry.variants[0]}"]`;
      const host = page.locator(selector);
      await page.goto(mode === 'workbench' ? `${base}/component.html?component=${entry.id}` : `${base}/category.html?type=${entry.category}`);
      await settled(page, selector);
      const initial = await page.evaluate(measureFit, selector);
      if (!baseline) assertFit(initial);
      const actions = await host.evaluate(host => {
        const found = [];
        const visit = node => { for (const item of node.querySelectorAll('button,textarea,input')) { found.push({ tag: item.tagName, text: item.textContent?.trim(), placeholder: item.getAttribute('placeholder') }); } for (const item of node.querySelectorAll('*')) if (item.shadowRoot) visit(item.shadowRoot); };
        visit(host.shadowRoot); return found;
      });
      const variant = entry.variants[0];
      if (variant.includes('sessions')) await host.getByRole('button', { name: 'End other sessions', exact: true }).click();
      else if (variant.includes('profile')) await host.getByRole('textbox', { name: 'About you', exact: true }).fill('Line one\nLine two\nLine three\nLine four\nLine five\nLine six — Юникод <literal>');
      else if (variant.includes('account-services-exports')) await host.getByRole('button', { name: /Request export/ }).click();
      else if (variant.includes('next-twenty-export')) { const button = host.getByRole('button', { name: /Prepare example/ }); if (await button.count()) await button.click(); }
      else if (variant.includes('compositions-files')) await host.getByRole('button', { name: /Choose demo file/ }).click();
      else if (variant.includes('reviews')) { await host.getByRole('button', { name: /Design review/ }).click(); const textbox = host.locator('textarea'); if (await textbox.count()) await textbox.fill('A useful review with literal Юникод <b>text</b>. '.repeat(12)); }
      await settled(page, selector);
      const expanded = await page.evaluate(measureFit, selector);
      if (!baseline) assertFit(expanded);
      await host.evaluate(host => host.reset());
      await settled(page, selector);
      const reset = await page.evaluate(measureFit, selector);
      if (!baseline) { assertFit(reset); if (initial.rootHeight !== reset.rootHeight) throw new Error(`Reset changed source size: ${variant}`); }
      evidence.expanded.push({ mode, initial, expanded, reset, actions });
    }
  }
  if (!baseline && !standaloneOnly) evidence.lifecycle = await lifecycleChecks({ page, base });
  if (!baseline && args.includes('--password-focus')) evidence.focused = await focusedActionChecks({ page, base, entries });
  if (!quick && !args.includes('--skip-standalone')) {
    await page.setViewportSize({ width: 320, height: 900 });
    for (const variant of components.flatMap(x => x.variants)) {
      const response = await page.goto(`${base}/packages/${variant}/index.html`);
      if (!response?.ok()) throw new Error(`Standalone HTTP failure: ${variant}, status ${response?.status()}`);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(30);
      const result = await page.evaluate(() => { const root = document.querySelector('.sl-component') || [...document.body.children].find(item => !item.matches('script,style,.example-note') && item.getBoundingClientRect().height > 2); const box = root?.getBoundingClientRect(); return { width: innerWidth, scrollWidth: document.documentElement.scrollWidth, root: box && { tag: root.tagName, className: root.className, left: box.left, right: box.right, height: box.height } }; });
      if (!result.root || result.root.height < 2) throw new Error(`Standalone source root missing: ${variant}`);
      if (!baseline && (result.scrollWidth > 321 || result.root.left < -1 || result.root.right > 321)) throw new Error(`Standalone overflow ${variant}: ${JSON.stringify(result)}`);
      evidence.standalone.push({ variant, ...result });
    }
  }
  if (!baseline && evidence.errors.length) throw new Error(JSON.stringify(evidence.errors));
  if (!baseline && evidence.httpFailures.length) throw new Error(JSON.stringify(evidence.httpFailures));
} catch (error) { evidence.failures.push(error.stack); evidence.debug = await page?.evaluate(() => ({ resize: window.fitResizeLog, owner: document.querySelector('.card-preview,.workbench-body')?.getAttribute('style'), stage: document.querySelector('sl-preview')?.shadowRoot?.querySelector('.stage')?.innerHTML.slice(0, 800) })); process.exitCode = 1; }
finally {
  await browser?.close();
  if (server) await new Promise(resolve => server.close(resolve));
  evidence.generatedSha256 = generated && createHash('sha256').update(generated).digest('hex');
  evidence.candidatePreviewSha256 = createHash('sha256').update(await readFile(resolve(candidate, 'public/preview-data.js'))).digest('hex');
  const sourceAfter = await nativeHashes();
  evidence.candidateNativeFiles = Object.keys(sourceBefore).length;
  evidence.candidateNativeUnchanged = JSON.stringify(sourceBefore) === JSON.stringify(sourceAfter);
  evidence.candidateNativeAggregateSha256 = createHash('sha256').update(JSON.stringify(sourceAfter)).digest('hex');
  if (!evidence.candidateNativeUnchanged) { evidence.failures.push('Candidate native sources changed during audit'); process.exitCode = 1; }
  await writeFile(resolve(output, baseline ? 'red.json' : 'green.json'), JSON.stringify(evidence, null, 2));
  console.log(JSON.stringify({ baseline, content: evidence.content.length, expanded: evidence.expanded.length, standalone: evidence.standalone.length, errors: evidence.errors.length, failures: evidence.failures, output }));
}
