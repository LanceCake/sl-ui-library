import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { mkdir, readFile, realpath, writeFile } from 'node:fs/promises';
import { resolve, relative, isAbsolute, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { inflateRawSync } from 'node:zlib';

// Opt-in browser QA. Uses an already installed runtime and a private, explicit
// release candidate. It never installs dependencies or modifies the candidate.
const tabFiles = [
  ['html-tab', 'index.html', 'HTML'], ['css-tab', 'buttons.css', 'CSS'],
  ['js-tab', 'example.js', 'JavaScript'], ['react-tab', 'Component.jsx', 'React'],
  ['next-tab', 'NextClient.jsx', 'Next.js'],
];
const companions = ['react-controller.mjs', 'react-font.mjs', 'framework-usage.md', 'framework.json', 'react-example.jsx', 'next-page.jsx'];
const frameworkFile = name => /\.(?:jsx|mjs|md|json)$/.test(name);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const deferred = () => { let resolvePromise; const promise = new Promise(resolve => { resolvePromise = resolve; }); return { promise, resolve: resolvePromise }; };

export function zipEntries(bytes) {
  let end = bytes.length - 22;
  while (end >= Math.max(0, bytes.length - 65557) && bytes.readUInt32LE(end) !== 0x06054b50) end--;
  assert.ok(end >= 0, 'ZIP end record exists');
  const count = bytes.readUInt16LE(end + 10), entries = new Map();
  let cursor = bytes.readUInt32LE(end + 16);
  for (let index = 0; index < count; index++) {
    assert.equal(bytes.readUInt32LE(cursor), 0x02014b50, 'ZIP central directory signature');
    const method = bytes.readUInt16LE(cursor + 10), compressed = bytes.readUInt32LE(cursor + 20);
    const length = bytes.readUInt16LE(cursor + 28), extra = bytes.readUInt16LE(cursor + 30), comment = bytes.readUInt16LE(cursor + 32);
    const name = bytes.subarray(cursor + 46, cursor + 46 + length).toString('utf8');
    assert.match(name, /^[a-zA-Z0-9][a-zA-Z0-9._-]*$/, 'flat, safe ZIP member');
    assert.equal(entries.has(name), false, 'unique ZIP member');
    const local = bytes.readUInt32LE(cursor + 42);
    assert.equal(bytes.readUInt32LE(local), 0x04034b50);
    const start = local + 30 + bytes.readUInt16LE(local + 26) + bytes.readUInt16LE(local + 28);
    const data = bytes.subarray(start, start + compressed);
    assert.ok(method === 0 || method === 8, 'supported ZIP compression');
    entries.set(name, method === 8 ? inflateRawSync(data) : data);
    cursor += 46 + length + extra + comment;
  }
  return entries;
}

export async function runSourceUIAudit(options = {}) {
  const runtime = options.runtime || process.env.SL_UI_FRAMEWORK_RUNTIME;
  const modulePath = options.playwright || process.env.SL_UI_PLAYWRIGHT_MODULE;
  assert.equal(process.env.SL_UI_SOURCE_UI_BROWSER, '1', 'Set SL_UI_SOURCE_UI_BROWSER=1 to launch opt-in browser QA');
  assert.ok(isAbsolute(runtime || '') && isAbsolute(modulePath || ''), 'Explicit private runtime and installed Playwright module required');
  const root = await realpath(options.root || process.env.SL_UI_SOURCE_UI_ROOT || resolve(runtime, 'release-candidate/public'));
  const out = resolve(options.out || process.env.SL_UI_SOURCE_UI_OUTPUT || resolve(runtime, 'source-ui-results'));
  const port = Number(options.port || process.env.SL_UI_SOURCE_UI_PORT || 4359);
  assert.ok(Number.isInteger(port) && port > 1024 && port < 65536, 'Valid private server port');
  assert.ok(relative(root, out).startsWith('..') || isAbsolute(relative(root, out)), 'Evidence must stay outside public candidate');
  await mkdir(out, { recursive: true });
  const report = {
    started: new Date().toISOString(), browser: 'Microsoft Edge / Playwright',
    inventory: [
      'Actual package bytes for all five tabs; six companion files; framework disclosure',
      'Arrow keys, Home, End, wraparound, selected tab and one roving tabindex',
      '320, 861, 1024, 1440 CSS pixel widths; both motion preferences; viewport and source region screenshots',
      'Lazy request/caching, literal Unicode/HTML text, line numbers',
      'Clipboard stub success, denied fallback, stale success and stale denied completions',
      'Failed fetch retry; out-of-order tab and variant responses; loading cannot copy',
      'Variant ZIP href/name and browser download; archive companions match candidate bytes',
      'Usage actions, reset and reversible selection; local-only network and cleanup',
    ],
    sourceHashes: {}, checks: [], errors: [], console: [], httpErrors: [], failedRequests: [], external: [], screenshots: [], cleanup: {},
  };
  for (const name of ['component.html', 'library.js', 'library.css', 'source-cache.js']) report.sourceHashes[name] = sha256(await readFile(resolve(root, name)));
  const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.jsx': 'text/plain', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.zip': 'application/zip', '.md': 'text/plain' };
  const server = createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405).end(); return; }
      const url = new URL(request.url, 'http://127.0.0.1');
      const filename = resolve(root, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname));
      const rel = relative(root, filename);
      if (rel.startsWith('..') || isAbsolute(rel)) { response.writeHead(403).end(); return; }
      const target = await realpath(filename), realRel = relative(root, target);
      if (realRel.startsWith('..') || isAbsolute(realRel)) { response.writeHead(403).end(); return; }
      const body = await readFile(target);
      response.writeHead(200, { 'Content-Type': (mime[extname(target)] || 'application/octet-stream') + (mime[extname(target)]?.startsWith('text/') ? '; charset=utf-8' : ''), 'Cache-Control': 'no-store' });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch { response.writeHead(404).end('Not found'); }
  });
  const base = `http://127.0.0.1:${port}`;
  let browser, active = '', context, page;
  const shot = async (name, locator) => {
    const filename = name + '.png';
    if (locator) await locator.screenshot({ path: resolve(out, filename), scale: 'css' });
    else await page.screenshot({ path: resolve(out, filename), scale: 'css' });
    report.screenshots.push(filename);
  };
  const sourceText = (variant, name) => readFile(resolve(root, 'packages', variant, name), 'utf8');
  const ready = async () => { await page.waitForFunction(() => document.querySelector('#source-panel')?.getAttribute('aria-busy') === 'false'); };
  const exact = async (variant, name) => { await ready(); assert.equal(await page.locator('#source-code').textContent(), await sourceText(variant, name)); assert.equal(await page.locator('#source-filename').textContent(), name); };
  const selected = async id => {
    assert.equal(await page.locator('[role=tab][aria-selected=true]').getAttribute('id'), id);
    assert.equal(await page.locator('[role=tab][tabindex="0"]').getAttribute('id'), id);
    assert.equal(await page.locator('#source-panel').getAttribute('aria-labelledby'), id + ' source-filename');
  };
  const tab = async id => { await page.locator('#' + id).click(); await ready(); await selected(id); };
  const fresh = async ({ width = 1440, motion = 'no-preference', route } = {}) => {
    await context?.close();
    context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: motion, acceptDownloads: true });
    await context.route('**/*', async requestRoute => {
      const url = new URL(requestRoute.request().url());
      if (url.origin !== base && !['data:', 'blob:'].includes(url.protocol)) { report.external.push({ active, url: url.href }); return requestRoute.abort(); }
      if (route && await route(requestRoute, url)) return;
      return requestRoute.continue();
    });
    await context.addInitScript(() => {
      window.__sourceClipboard = { writes: [], pending: [] };
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText(text) {
        window.__sourceClipboard.writes.push(text);
        return new Promise((resolve, reject) => window.__sourceClipboard.pending.push({ resolve, reject }));
      } } });
    });
    page = await context.newPage();
    page.setDefaultTimeout(10000);
    page.on('pageerror', error => report.errors.push({ active, message: error.message }));
    page.on('console', message => { if (['error', 'warning'].includes(message.type())) report.console.push({ active, type: message.type(), message: message.text(), location: message.location() }); });
    page.on('response', response => { if (response.status() >= 400) report.httpErrors.push({ active, url: response.url(), status: response.status(), expected: active === 'fetch-failure-retry-and-loading-cannot-copy' && response.status() === 503 && new URL(response.url()).pathname === '/packages/pair/Component.jsx' }); });
    page.on('requestfailed', request => report.failedRequests.push({ active, url: request.url(), error: request.failure()?.errorText }));
    await page.goto(base + '/component.html?component=matte-save-cancel', { waitUntil: 'networkidle' });
    await exact('pair', 'example.js');
  };
  const check = async (name, fn) => {
    active = name;
    const item = { name, passed: false }; report.checks.push(item);
    try { const evidence = await fn(); item.passed = true; if (evidence) item.evidence = evidence; }
    catch (error) { item.error = error.stack; if (page && !page.isClosed()) await shot(`failure-${report.checks.length}`).catch(() => {}); }
    console.log(`${item.passed ? 'PASS' : 'FAIL'} ${name}${item.error ? ': ' + item.error.split('\n')[0] : ''}`);
  };
  try {
    await new Promise((yes, no) => { server.once('error', no); server.listen(port, '127.0.0.1', yes); });
    assert.equal((await fetch(base + '/component.html')).status, 200);
    const pw = await import(pathToFileURL(modulePath));
    browser = await (pw.chromium || pw.default.chromium).launch({ headless: true, ...(process.env.SL_UI_BROWSER_EXECUTABLE ? { executablePath: process.env.SL_UI_BROWSER_EXECUTABLE } : { channel: process.env.SL_UI_BROWSER_CHANNEL || 'msedge' }) });
    report.browserVersion = browser.version();
    for (const width of [320, 861, 1024, 1440]) for (const motion of ['no-preference', 'reduce']) {
      await check(`layout-${width}-${motion}`, async () => {
        await fresh({ width, motion });
        await shot(`initial-${width}-${motion}`);
        for (const [id, file, label] of tabFiles) { assert.equal(await page.locator('#' + id).textContent(), label); await tab(id); await exact('pair', file); }
        await tab('react-tab');
        assert.equal(await page.locator('#framework-source').isVisible(), true);
        assert.match(await page.locator('#framework-source').textContent(), /client-only widget.*Download \.zip/s);
        await page.locator('#source-file').selectOption('framework-usage.md'); await exact('pair', 'framework-usage.md');
        await selected('react-tab');
        const metrics = await page.evaluate(() => {
          const bounds = selector => [...document.querySelectorAll(selector)].map(node => {
            const box = node.getBoundingClientRect(), range = document.createRange(); range.selectNodeContents(node);
            const text = range.getBoundingClientRect();
            return { id: node.id, left: box.left, right: box.right, width: box.width, height: box.height, textLeft: text.left, textRight: text.right };
          });
          return { width: innerWidth, documentWidth: document.documentElement.scrollWidth, controls: bounds('[role=tab], #copy, #source-file, #download'), panel: bounds('#source-panel')[0] };
        });
        assert.ok(metrics.documentWidth <= width + 1, `page horizontal overflow: ${JSON.stringify(metrics)}`);
        for (const control of metrics.controls) {
          assert.ok(control.left >= -1 && control.right <= width + 1 && control.height > 0, `control bounds: ${JSON.stringify(control)}`);
          if (control.id.endsWith('-tab')) assert.ok(control.textLeft >= control.left - 1 && control.textRight <= control.right + 1, `tab label clipped: ${JSON.stringify(control)}`);
        }
        assert.ok(metrics.panel.height >= 40, `source viewport too small: ${metrics.panel.height}`);
        await page.locator('.code-panel').scrollIntoViewIfNeeded();
        await shot(`framework-${width}-${motion}`);
        await shot(`code-panel-${width}-${motion}`, page.locator('.code-panel'));
        return metrics;
      });
    }
    await check('all-companions-keyboard-and-controller', async () => {
      await fresh();
      await tab('react-tab');
      for (const name of companions) { await page.locator('#source-file').selectOption(name); await exact('pair', name); await selected('react-tab'); }
      await page.locator('#react-tab').focus();
      for (const [key, id, file] of [['End', 'next-tab', 'NextClient.jsx'], ['ArrowRight', 'html-tab', 'index.html'], ['ArrowLeft', 'next-tab', 'NextClient.jsx'], ['Home', 'html-tab', 'index.html'], ['ArrowRight', 'css-tab', 'buttons.css'], ['ArrowRight', 'js-tab', 'example.js']]) {
        await page.keyboard.press(key); await exact('pair', file); await selected(id); assert.equal(await page.locator('#' + id).evaluate(node => node === document.activeElement), true);
        assert.notEqual(await page.locator('#' + id).evaluate(node => getComputedStyle(node).outlineStyle), 'none', 'keyboard focus visibly styled');
      }
      await page.locator('#open-usage').click(); await page.locator('#show-controller').click(); await exact('pair', 'buttons.js'); await selected('js-tab');
      assert.equal(await page.locator('#js-tab').evaluate(node => node === document.activeElement), true);
      await page.locator('#open-usage').click(); await page.locator('#show-integration').click(); await exact('pair', 'example.js');
      await page.locator('#reset').click(); assert.equal(await page.locator('#copy-status').textContent(), 'Preview reset.');
    });
    await check('lazy-fetch-cache-and-literal-unicode', async () => {
      const requests = [], literal = '<script>window.__sourceExecuted = true</script>\nПривет 🦉 & <b>literal</b>\n';
      await fresh({ route: async (route, url) => {
        if (!url.pathname.startsWith('/packages/')) return false;
        const name = url.pathname.split('/').pop(); if (frameworkFile(name)) requests.push(url.pathname);
        if (name === 'Component.jsx') { await route.fulfill({ status: 200, contentType: 'text/plain; charset=utf-8', body: literal }); return true; }
        return false;
      } });
      assert.equal(requests.length, 0, 'framework source is not eagerly fetched');
      await tab('react-tab'); assert.equal(await page.locator('#source-code').textContent(), literal);
      assert.equal(await page.locator('#source-code > *').count(), 0); assert.equal(await page.evaluate(() => window.__sourceExecuted), undefined);
      assert.equal(await page.locator('#line-numbers').textContent(), '1\n2');
      await tab('js-tab'); await tab('react-tab'); assert.equal(requests.filter(path => path.endsWith('/Component.jsx')).length, 1);
      await tab('next-tab'); await exact('pair', 'NextClient.jsx'); assert.equal(requests.filter(path => path.endsWith('/NextClient.jsx')).length, 1);
      await shot('literal-unicode'); return { requests, literalSha256: sha256(literal) };
    });
    await check('clipboard-success-denied-and-stale-completions', async () => {
      await fresh();
      const complete = async (index, denied = false) => { await page.evaluate(({ index, denied }) => { const pending = window.__sourceClipboard.pending[index]; denied ? pending.reject(new Error('Synthetic clipboard denial')) : pending.resolve(); }, { index, denied }); };
      const copy = async index => { await page.locator('#copy').click(); await page.waitForFunction(index => window.__sourceClipboard.writes.length === index + 1, index); };
      await copy(0); assert.equal(await page.evaluate(() => __sourceClipboard.writes[0]), await sourceText('pair', 'example.js'));
      await complete(0); await page.waitForFunction(() => document.querySelector('#copy-status').textContent === 'Code copied.');
      assert.equal(await page.locator('#copy-label').textContent(), 'Copied');
      await tab('react-tab'); await copy(1); await tab('next-tab'); await complete(1);
      assert.equal(await page.locator('#copy-label').textContent(), 'Copy code'); assert.equal(await page.locator('#copy-status').textContent(), '');
      await copy(2); await complete(2, true); await page.waitForFunction(() => document.querySelector('#copy-status').textContent.startsWith('Code selected.'));
      // Chromium Selection.toString() returns rendered text and omits a final
      // newline. Inspect the selected DOM range to verify every source byte.
      assert.equal(await page.evaluate(() => { const selection = getSelection(); return selection.rangeCount === 1 ? selection.getRangeAt(0).cloneContents().textContent : null; }), await sourceText('pair', 'NextClient.jsx'));
      assert.equal(await page.locator('#source-panel').evaluate(node => document.activeElement === node), true);
      await shot('clipboard-denied');
      await tab('react-tab'); await copy(3); await tab('css-tab'); await complete(3, true);
      assert.equal(await page.locator('#copy-status').textContent(), ''); assert.equal(await page.locator('#copy-label').textContent(), 'Copy code');
      assert.equal(await page.locator('#css-tab').evaluate(node => document.activeElement === node), true, 'stale denial cannot move focus to source panel');
      return { writes: await page.evaluate(() => __sourceClipboard.writes.map(text => text.length)), clipboard: 'stubbed; no system clipboard changes' };
    });
    await check('fetch-failure-retry-and-loading-cannot-copy', async () => {
      let attempts = 0; const release = deferred(), started = deferred();
      await fresh({ route: async (route, url) => {
        if (url.pathname !== '/packages/pair/Component.jsx') return false;
        if (++attempts === 1) { await route.fulfill({ status: 503, body: 'Synthetic source outage' }); return true; }
        started.resolve(); await release.promise; await route.fulfill({ status: 200, contentType: 'text/plain', body: await sourceText('pair', 'Component.jsx') }); return true;
      } });
      await tab('react-tab'); assert.match(await page.locator('#source-code').textContent(), /could not be loaded/); assert.equal(await page.locator('#copy').isDisabled(), true);
      await shot('fetch-unavailable'); await page.locator('#react-tab').click(); await started.promise;
      assert.equal(await page.locator('#source-code').textContent(), 'Loading source…'); assert.equal(await page.locator('#source-panel').getAttribute('aria-busy'), 'true');
      assert.equal(await page.locator('#copy').isDisabled(), true); assert.equal(await page.evaluate(() => __sourceClipboard.writes.length), 0);
      release.resolve(); await exact('pair', 'Component.jsx'); assert.equal(await page.locator('#copy').isDisabled(), false); assert.equal(attempts, 2);
      return { attempts, syntheticHttpStatus: 503 };
    });
    await check('rapid-tabs-and-variants-ignore-stale-fetches', async () => {
      const pending = new Map();
      await fresh({ route: async (route, url) => {
        if (!['/packages/pair/Component.jsx', '/packages/pair/NextClient.jsx', '/packages/pair/framework.json', '/packages/save/framework.json'].includes(url.pathname)) return false;
        const task = deferred(); pending.set(url.pathname, { ...task, route }); await task.promise;
        const [, , variant, name] = url.pathname.split('/');
        await route.fulfill({ status: 200, contentType: 'text/plain', body: await sourceText(variant, name) }); return true;
      } });
      const waitPending = async path => { const end = Date.now() + 10000; while (!pending.has(path)) { assert.ok(Date.now() < end, 'request arrived: ' + path); await new Promise(yes => setTimeout(yes, 10)); } };
      await page.locator('#react-tab').click(); await waitPending('/packages/pair/Component.jsx');
      await page.locator('#next-tab').click(); await waitPending('/packages/pair/NextClient.jsx');
      pending.get('/packages/pair/NextClient.jsx').resolve(); await exact('pair', 'NextClient.jsx');
      pending.get('/packages/pair/Component.jsx').resolve(); await page.waitForLoadState('networkidle'); await exact('pair', 'NextClient.jsx'); await selected('next-tab');
      await page.locator('#source-file').selectOption('framework.json'); await waitPending('/packages/pair/framework.json');
      await page.locator('[data-variant=save]').click(); await waitPending('/packages/save/framework.json');
      assert.equal(await page.locator('#source-code').textContent(), 'Loading source…'); assert.equal(await page.locator('#copy').isDisabled(), true);
      const staleResponse = page.waitForResponse(response => response.url().endsWith('/packages/pair/framework.json'));
      pending.get('/packages/pair/framework.json').resolve(); await (await staleResponse).finished();
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
      assert.equal(await page.locator('#source-code').textContent(), 'Loading source…');
      pending.get('/packages/save/framework.json').resolve(); await exact('save', 'framework.json'); await selected('next-tab');
      assert.equal(await page.locator('[data-variant=save]').getAttribute('aria-pressed'), 'true');
      return { delayedRequests: [...pending.keys()] };
    });
    await check('zip-hrefs-browser-download-and-companion-bytes', async () => {
      await fresh(); const archives = [];
      for (const variant of ['pair', 'save', 'cancel', 'pair']) {
        await page.locator('[data-variant=' + variant + ']').click(); await exact(variant, 'example.js');
        const filename = `matte-${variant}.zip`;
        assert.equal(await page.locator('#download').getAttribute('href'), './downloads/' + filename);
        assert.equal(await page.locator('#download').getAttribute('download'), filename);
        const downloadPromise = page.waitForEvent('download'); await page.locator('#download').click(); const download = await downloadPromise;
        assert.equal(download.suggestedFilename(), filename); assert.equal(await download.failure(), null);
        const dest = resolve(out, filename); await download.saveAs(dest); const bytes = await readFile(dest);
        assert.deepEqual(bytes, await readFile(resolve(root, 'downloads', filename)));
        const entries = zipEntries(bytes);
        for (const name of ['Component.jsx', 'NextClient.jsx', ...companions]) assert.deepEqual(entries.get(name), await readFile(resolve(root, 'packages', variant, name)), `${variant}/${name} archive bytes`);
        archives.push({ variant, filename, sha256: sha256(bytes), members: entries.size, verifiedCompanions: ['Component.jsx', 'NextClient.jsx', ...companions] });
      }
      return archives;
    });
    await check('exploratory-reversible-controls-and-motion', async () => {
      await fresh({ width: 861, motion: 'reduce' });
      const start = Date.now(); let cycles = 0;
      // A bounded exploration pass with normal inputs, including short code-panel
      // height, all framework companions, variant reversals and usage dialog.
      do {
        for (const variant of ['save', 'cancel', 'pair']) {
          await page.locator('[data-variant=' + variant + ']').click(); await ready();
          for (const id of ['react-tab', 'next-tab', 'html-tab', 'js-tab']) await tab(id);
        }
        await tab('next-tab'); for (const name of companions) { await page.locator('#source-file').selectOption(name); await exact('pair', name); }
        await page.locator('#open-usage').click(); await page.keyboard.press('Escape'); assert.equal(await page.locator('#usage-dialog').evaluate(node => node.open), false);
        await page.locator('#reset').click(); await tab('js-tab'); await exact('pair', 'example.js'); cycles++;
      } while (Date.now() - start < 30000);
      await shot('exploratory-final'); return { durationMs: Date.now() - start, cycles };
    });
    assert.equal(report.errors.length, 0, 'No browser page errors');
    assert.equal(report.external.length, 0, 'No external network dependencies');
    assert.equal(report.httpErrors.filter(item => !item.expected).length, 0, 'No unexpected HTTP errors');
    assert.equal(report.failedRequests.length, 0, 'No failed network requests');
    assert.equal(report.console.filter(item => item.type === 'error' && !(item.active === 'fetch-failure-retry-and-loading-cannot-copy' && item.message.includes('503'))).length, 0, 'No unexpected console errors');
  } catch (error) { report.fatal = error.stack; }
  finally {
    try { await context?.close(); report.cleanup.context = true; } catch (error) { report.cleanup.context = error.message; }
    try { await browser?.close(); report.cleanup.browser = true; } catch (error) { report.cleanup.browser = error.message; }
    await new Promise(yes => server.close(yes)); report.cleanup.server = !server.listening;
    report.finished = new Date().toISOString();
    report.passed = !report.fatal && report.checks.length === 15 && report.checks.every(item => item.passed) && report.errors.length === 0 && report.external.length === 0;
    await writeFile(resolve(out, 'source-ui.json'), JSON.stringify(report, null, 2) + '\n');
  }
  return { report, out };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { report, out } = await runSourceUIAudit();
  console.log(JSON.stringify({ passed: report.passed, checks: report.checks.length, failed: report.checks.filter(item => !item.passed).map(item => item.name), report: resolve(out, 'source-ui.json') }));
  if (!report.passed) process.exitCode = 1;
}
