import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../release-tools/ui-overrides/public/', import.meta.url);
const read = name => readFile(new URL(name, root), 'utf8');
const companionFiles = ['react-controller.mjs', 'react-font.mjs', 'framework-usage.md', 'framework.json', 'react-example.jsx', 'next-page.jsx'];
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };

test('five source tabs preserve vanilla names and expose framework companion files honestly', async () => {
  const html = await read('component.html');
  const tabs = [...html.matchAll(/<button[^>]+role="tab"[^>]+data-file="([^"]+)"[^>]*>([^<]+)<\/button>/g)];
  assert.deepEqual(tabs.map(match => [match[1], match[2]]), [['index.html', 'HTML'], ['buttons.css', 'CSS'], ['example.js', 'JavaScript'], ['Component.jsx', 'React'], ['NextClient.jsx', 'Next.js']]);
  for (const file of companionFiles) assert.ok(html.includes('value="' + file + '"'), file);
  assert.match(html, /source-preserving React adapter/);
  assert.match(html, /client-only widget/);
  assert.match(html, /Download \.zip/);
  assert.match(html, /id="show-controller"/);
  assert.match(html, /id="source-file"/);
});

test('source cache fetches only exact flat filenames, lazily, preserving Unicode text', async () => {
  const requests = [];
  const source = (await read('source-cache.js')).replace(/^import .*;\r?\n/gm, '').replace('export function readSource', 'function readSource').replaceAll('import.meta.url', "'https://library.test/source-cache.js'");
  const context = vm.createContext({ initialSources: {}, components: [{ variants: ['pair'] }], URL, fetch: async url => { requests.push(String(url)); return { ok: true, text: async () => '<script>literal</script> Привет 🦉' }; } });
  vm.runInContext(source + '\nglobalThis.readSource = readSource;', context);
  assert.equal(requests.length, 0);
  for (const file of ['index.html', 'buttons.css', 'buttons.js', 'example.js', 'Component.jsx', 'NextClient.jsx', ...companionFiles]) {
    assert.equal(await context.readSource('pair', file), '<script>literal</script> Привет 🦉');
    await context.readSource('pair', file);
  }
  assert.equal(requests.length, 12);
  for (const [variant, file] of [['../pair', 'Component.jsx'], ['pair', '../Component.jsx'], ['pair', 'nested/Component.jsx'], ['pair', 'unknown.jsx'], ['pair', 'component.jsx']]) await assert.rejects(context.readSource(variant, file), /Unknown source/);
  assert.equal(requests.length, 12);
});

test('failed source fetches are evicted so choosing the same file can retry', async () => {
  let attempts = 0;
  const source = (await read('source-cache.js')).replace(/^import .*;\r?\n/gm, '').replace('export function readSource', 'function readSource').replaceAll('import.meta.url', "'https://library.test/source-cache.js'");
  const context = vm.createContext({ initialSources: {}, components: [{ variants: ['pair'] }], URL, fetch: async () => ({ ok: ++attempts > 1, text: async () => 'recovered source' }) });
  vm.runInContext(source + '\nglobalThis.readSource = readSource;', context);
  await assert.rejects(context.readSource('pair', 'Component.jsx'), /Source not available/);
  assert.equal(await context.readSource('pair', 'Component.jsx'), 'recovered source');
  assert.equal(attempts, 2);
});

class Element {
  constructor(data = {}) { this.dataset = data; this.textContent = ''; this.hidden = false; this.attributes = {}; this.listeners = {}; this.children = []; }
  setAttribute(name, value) { this.attributes[name] = value; }
  addEventListener(name, handler) { this.listeners[name] = handler; }
  replaceChildren(...children) { this.children = children; }
  focus() { this.focused = true; }
  scrollTo() {}
  close() {}
  reset() {}
  fire(name, event = {}) { return this.listeners[name]?.(event); }
}

async function viewer() {
  const elements = new Map();
  const get = selector => { if (!elements.has(selector)) elements.set(selector, new Element()); return elements.get(selector); };
  const files = ['index.html', 'buttons.css', 'example.js', 'Component.jsx', 'NextClient.jsx'];
  const ids = ['html-tab', 'css-tab', 'js-tab', 'react-tab', 'next-tab'];
  const tabs = files.map((file, i) => { const tab = get('#' + ids[i]); tab.dataset.file = file; tab.id = ids[i]; return tab; });
  const requests = [];
  const writes = [];
  const timers = [];
  const context = vm.createContext({
    components: [{ id: 'test', name: 'Test', description: 'Test', variants: ['pair', 'save'], downloads: { pair: './pair.zip', save: './save.zip' } }],
    readSource: (variant, file) => { const task = deferred(); requests.push({ variant, file, ...task }); return task.promise; },
    document: { createElement: () => new Element(), createRange: () => ({ selectNodeContents() {} }) },
    window: { getSelection: () => ({ removeAllRanges() {}, addRange() {} }) },
    navigator: { clipboard: { writeText: text => { const task = deferred(); writes.push({ text, ...task }); return task.promise; } } },
    setTimeout: callback => { timers.push(callback); return timers.length; }, clearTimeout() {},
  });
  const source = (await read('library.js')).replace(/^import .*;\r?\n/gm, '').replace('export function mountComponent', 'function mountComponent');
  vm.runInContext(source + '\nglobalThis.mountComponent = mountComponent;', context);
  const root = { dataset: {}, querySelector: get, querySelectorAll: selector => selector === '[role="tab"]' ? tabs : selector === '[data-variant]' ? get('.variant-controls').children : [] };
  const mounted = context.mountComponent(root, new URL('https://library.test/?component=test'));
  requests[0].resolve('initial source');
  await mounted.ready;
  return { get, tabs, requests, writes, mounted, timers };
}
const settle = () => new Promise(resolve => setImmediate(resolve));

test('tab, companion and variant changes clear old source immediately and ignore stale fetches', async () => {
  const view = await viewer();
  view.tabs[3].fire('click');
  assert.equal(view.get('#source-code').textContent, 'Loading source…');
  assert.equal(view.get('#copy').disabled, true);
  view.tabs[4].fire('click');
  view.requests[2].resolve('<React>literal 🦉</React>');
  await settle();
  view.requests[1].resolve('stale React source');
  await settle();
  assert.equal(view.get('#source-code').textContent, '<React>literal 🦉</React>');
  view.get('#source-file').value = 'next-page.jsx';
  view.get('#source-file').fire('change');
  assert.equal(view.requests.at(-1).file, 'next-page.jsx');
  assert.equal(view.get('#source-filename').textContent, 'next-page.jsx');
  assert.equal(view.tabs[4].attributes['aria-selected'], 'true');
  view.get('.variant-controls').children[1].fire('click');
  assert.equal(view.requests.at(-1).variant, 'save');
  assert.equal(view.get('#source-code').textContent, 'Loading source…');
  view.requests.at(-2).resolve('old variant companion');
  await settle();
  assert.equal(view.get('#copy').disabled, true);
  view.requests.at(-1).resolve('new variant companion');
  await settle();
  assert.equal(view.get('#source-code').textContent, 'new variant companion');
  view.mounted.destroy();
});

test('copy snapshots current source, ignores stale completion, and reports manual fallback honestly', async () => {
  const view = await viewer();
  const pending = view.get('#copy').fire('click');
  assert.equal(view.writes[0].text, 'initial source');
  view.tabs[3].fire('click');
  view.requests.at(-1).resolve('new React source');
  await settle();
  view.writes[0].resolve();
  await pending;
  assert.equal(view.get('#copy-label').textContent, 'Copy code');
  assert.equal(view.get('#copy-status').textContent, '');
  const failed = view.get('#copy').fire('click');
  view.writes[1].reject(new Error('clipboard denied'));
  await failed;
  assert.match(view.get('#copy-status').textContent, /Code selected\. Press Ctrl\+C/);
  assert.equal(view.get('#source-panel').focused, true);
  view.mounted.destroy();
});

test('loading and errors cannot copy old code, and retry restores only current source', async () => {
  const view = await viewer();
  view.tabs[3].fire('click');
  await view.get('#copy').fire('click');
  assert.equal(view.writes.length, 0);
  view.tabs[4].fire('click');
  view.requests.at(-2).reject(new Error('stale error'));
  await settle();
  assert.equal(view.get('#copy-status').textContent, '');
  view.requests.at(-1).reject(new Error('unavailable'));
  await settle();
  assert.match(view.get('#source-code').textContent, /could not be loaded/);
  assert.equal(view.get('#source-panel').attributes['aria-busy'], 'false');
  assert.equal(view.get('#copy').disabled, true);
  view.tabs[4].fire('click');
  view.requests.at(-1).resolve('retried source');
  await settle();
  assert.equal(view.get('#copy').disabled, false);
  const copying = view.get('#copy').fire('click');
  assert.equal(view.writes[0].text, 'retried source');
  view.writes[0].resolve();
  await copying;
  assert.equal(view.get('#copy-status').textContent, 'Code copied.');
  view.mounted.destroy();
});

test('roving tabs retain arrow/home/end selection and controller action stays on JavaScript', async () => {
  const view = await viewer();
  let prevented = false;
  view.tabs[2].fire('keydown', { key: 'End', preventDefault() { prevented = true; } });
  assert.ok(prevented);
  assert.ok(view.tabs[4].focused);
  assert.deepEqual(view.tabs.map(tab => tab.tabIndex), [-1, -1, -1, -1, 0]);
  view.tabs[4].fire('keydown', { key: 'ArrowRight', preventDefault() {} });
  assert.equal(view.tabs[0].tabIndex, 0);
  view.tabs[0].fire('keydown', { key: 'ArrowLeft', preventDefault() {} });
  assert.equal(view.tabs[4].tabIndex, 0);
  view.tabs[4].fire('keydown', { key: 'Home', preventDefault() {} });
  assert.equal(view.tabs[0].tabIndex, 0);
  view.get('#show-controller').fire('click');
  assert.equal(view.requests.at(-1).file, 'buttons.js');
  assert.equal(view.tabs[2].tabIndex, 0);
  assert.equal(view.get('#source-filename').textContent, 'buttons.js');
  view.mounted.destroy();
});

test('toolbar and intrinsic-width tabs wrap without shrinking labels or touch targets', async () => {
  const css = await read('library.css');
  const tabs = css.match(/\.file-tabs\s*\{([^}]*)\}/)?.[1];
  const button = css.match(/\.file-tabs button\s*\{([^}]*)\}/)?.[1];
  assert.match(css, /\.code-toolbar\s*\{[^}]*flex-wrap:\s*wrap/);
  assert.match(tabs, /min-width:\s*0/);
  assert.match(tabs, /flex-wrap:\s*wrap/);
  assert.match(button, /flex:\s*1\s+0\s+auto\s*;/);
  assert.match(button, /min-width:\s*44px\s*;/);
  assert.match(button, /min-height:\s*44px\s*;/);
  assert.match(button, /white-space:\s*nowrap/);
  assert.doesNotMatch(button, /text-overflow:\s*ellipsis|overflow:\s*hidden/);
  assert.match(css, /\.source-context\s*\{[^}]*overflow-wrap:\s*anywhere/);
  assert.match(css, /prefers-reduced-motion/);
});

test('integration manifest includes only the four reviewed source-viewer override paths', async () => {
  const manifest = JSON.parse(await readFile(new URL('../release-tools/ui-files.json', import.meta.url), 'utf8'));
  assert.deepEqual(manifest, ['public/component.html', 'public/library.js', 'public/library.css', 'public/source-cache.js']);
});
