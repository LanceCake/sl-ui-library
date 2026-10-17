import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { approved91 } from '../release-tools/compositions/inventory.mjs';
import { contentSizedEntries, fixStandaloneWrapper, standaloneFitVariants, integratePreviewFit } from '../release-tools/integrate-preview-fit.mjs';

test('content sizing is explicit, exact, idempotent and rejects unknown or duplicated entries', () => {
  const entries = contentSizedEntries(approved91);
  assert.equal(entries.length, 91);
  assert.ok(entries.every(entry => entry.previewSizing === 'content'));
  assert.deepEqual(contentSizedEntries(entries), entries);
  for (const bad of [approved91.slice(1), [...approved91.slice(1), approved91[1]], approved91.map((x, i) => i ? x : { ...x, id: 'old-v11' }), approved91.map((x, i) => i ? x : { ...x, previewSizing: 'automatic' }), approved91.map((x, i) => i ? x : { ...x, variants: ['unknown'] })]) assert.throws(() => contentSizedEntries(bad));
});
test('the compiler fails closed for missing, partial, unknown and baseline sizing metadata', async () => {
  const compiler = await readFile(new URL('../build-previews.mjs', import.meta.url), 'utf8');
  const fragment = compiler.slice(compiler.indexOf('const sizing ='), compiler.indexOf('for (const variant of components.flatMap'));
  const compile = components => vm.runInNewContext(fragment + '\nsizing.size', { components, approved91 });
  const baseline = [{ id: 'baseline-old-v11', variants: ['old-v11'] }];
  assert.equal(compile(baseline), 0);
  assert.equal(compile([...baseline, ...contentSizedEntries(approved91)]), 91);
  for (const bad of [approved91, contentSizedEntries(approved91).slice(1), [...baseline.map(x => ({ ...x, previewSizing: 'content' })), ...contentSizedEntries(approved91)], baseline.map(x => ({ ...x, previewSizing: 'auto' }))]) assert.throws(() => compile(bad));
});
test('all exact nineteen HTML fixes change only the head grid declaration', async () => {
  assert.equal(standaloneFitVariants.length, 19);
  assert.equal(new Set(standaloneFitVariants).size, 19);
  for (const variant of standaloneFitVariants) {
    const html = await readFile(new URL(`../public/packages/${variant}/index.html`, import.meta.url), 'utf8');
    assert.equal(fixStandaloneWrapper(html), html);
    const old = html.replace('grid-template-columns:minmax(0,1fr);', '');
    assert.notEqual(old, html, variant);
    assert.equal(fixStandaloneWrapper(old), html);
    assert.equal(old.slice(old.indexOf('<body>')), html.slice(html.indexOf('<body>')), variant);
  }
  for (const bad of ['<body><style>body{display:grid;}</style></body>', '<head><style>body{display:flex;}</style></head>', '<head><style>body{display:grid;grid-template-columns:1fr;}</style></head>']) assert.throws(() => fixStandaloneWrapper(bad));
});
test('integration refuses the working source and incomplete targets', async () => {
  const sourceRoot = new URL('../', import.meta.url).pathname.replace(/^\/(?=[A-Za-z]:)/, '');
  await assert.rejects(integratePreviewFit({ sourceRoot, targetRoot: sourceRoot }));
  await assert.rejects(integratePreviewFit({ sourceRoot, targetRoot: 'relative' }));
});

test('intrinsic sizing leaves owner heights untouched, repairs only shells and cleans stale observations', async () => {
  const runtime = await readFile(new URL('../public/preview-runtime.js', import.meta.url), 'utf8');
  const fragment = runtime.slice(runtime.indexOf('const sizingOwners ='), runtime.indexOf('function stylesheet('));
  const frames = new Map(), observers = [];
  let nextFrame = 0;
  const context = vm.createContext({
    WeakMap, Math,
    ResizeObserver: class {
      constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
      observe(element) { this.targets.add(element); }
      disconnect() { this.targets.clear(); }
    },
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(frame) { frames.delete(frame); },
    getComputedStyle(element) { return { overflowY: 'hidden', getPropertyValue(name) { return element.style?.getPropertyValue(name) || '466px'; } }; },
  });
  const allocate = vm.runInContext(fragment + '\ncontentSizing', context);
  const properties = new Map();
  const card = { scrollTop: 243, style: {
    getPropertyValue(name) { return properties.get(name) || ''; },
    getPropertyPriority() { return ''; },
    setProperty(name, value) { properties.set(name, value); },
    removeProperty(name) { properties.delete(name); },
  } };
  const element = { isConnected: true, offsetHeight: 800 };
  const listeners = new Map();
  const host = { isConnected: true, closest(selector) { return selector === '.card-preview' ? card : null; }, shadowRoot: {
    querySelector() { return element; }, addEventListener(name, listener) { listeners.set(name, listener); }, removeEventListener(name) { listeners.delete(name); },
  } };
  const flush = () => { const pending = [...frames.values()]; frames.clear(); pending.forEach(callback => callback()); };
  const stop = allocate(host, element);
  assert.equal(properties.size, 0);
  assert.equal(card.scrollTop, 0);
  element.offsetHeight = 200;
  observers[0].callback(); flush();
  assert.equal(properties.size, 0);
  card.scrollTop = 22;
  listeners.get('focusin')(); flush();
  assert.equal(card.scrollTop, 0);
  observers[0].callback();
  stop();
  assert.equal(frames.size, 0);
  assert.equal(observers[0].targets.size, 0);
  assert.equal(properties.size, 0);
  assert.equal(listeners.size, 0);
  element.offsetHeight = 1500;
  observers[0].callback(); flush();
  assert.equal(properties.size, 0);
});
