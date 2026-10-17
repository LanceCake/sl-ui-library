import { readFile, writeFile } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { approved91 } from './compositions/inventory.mjs';

export const standaloneFitVariants = Object.freeze([
  ...'split-action cancellable-process hold-confirm action-queue record-take review-decision refresh-snapshot repeat-stepper shuffle-choice'.split(' ').map(x => `buttons-${x}-v11`),
  ...'funnel score-matrix treemap comparison grouped-rows distribution series-legend heatmap histogram ranking'.split(' ').map(x => `data-display-${x}-v11`),
]);
export function contentSizedEntries(entries) {
  if (!Array.isArray(entries) || entries.length !== 91) throw new Error('Expected exactly the approved 91 entries');
  const allow = new Map(approved91.map(entry => [entry.id, entry]));
  const seen = new Set();
  return entries.map(entry => {
    const expected = allow.get(entry.id);
    if (!expected || seen.has(entry.id) || JSON.stringify(entry.variants) !== JSON.stringify(expected.variants) || entry.category !== expected.category) throw new Error(`Unexpected approved entry: ${entry.id}`);
    if (entry.previewSizing !== undefined && entry.previewSizing !== 'content') throw new Error(`Unknown previewSizing: ${entry.id}`);
    seen.add(entry.id);
    return { ...entry, previewSizing: 'content' };
  });
}
export function fixStandaloneWrapper(html) {
  const styles = [...html.matchAll(/<style>body\s*\{[^}]*\}<\/style>/g)];
  if (styles.length !== 1 || html.indexOf(styles[0][0]) > html.indexOf('</head>') || !/display:\s*grid;/.test(styles[0][0])) throw new Error('Unknown standalone head wrapper');
  const style = styles[0][0];
  const columns = [...style.matchAll(/grid-template-columns\s*:\s*([^;]+);/g)];
  if (columns.length) {
    if (columns.length !== 1 || columns[0][1] !== 'minmax(0,1fr)') throw new Error('Unknown standalone grid columns');
    return html;
  }
  return html.replace(style, style.replace(/display:\s*grid;/, '$&grid-template-columns:minmax(0,1fr);'));
}

/** Prepare only known presentation files and metadata in an isolated, unreleased QA candidate.
 * This deliberately does not promote/regenerate controllers, CSS, framework exports or release data.
 * Run the candidate's build/check separately after inspecting the returned plan.
 */
export async function integratePreviewFit({ sourceRoot, targetRoot, write = false }) {
  if (![sourceRoot, targetRoot].every(x => typeof x === 'string' && isAbsolute(x)) || resolve(sourceRoot) === resolve(targetRoot)) throw new Error('Use distinct absolute source and isolated target roots');
  const catalogPath = resolve(targetRoot, 'public/catalog-data.js');
  const catalogSource = await readFile(catalogPath, 'utf8');
  if (!/approved-local-91\.js/.test(catalogSource)) throw new Error('Target does not register the isolated approved 91 manifest');
  const manifestPath = resolve(targetRoot, 'public/catalog-batches/approved-local-91.js');
  const manifestSource = await readFile(manifestPath, 'utf8');
  const manifestMatch = manifestSource.match(/^\/\/ Isolated QA candidate only\.[^\n]*\nexport default ([\s\S]+);\s*$/);
  if (!manifestMatch) throw new Error('Target lacks the unreleased QA manifest guard');
  const entries = contentSizedEntries(JSON.parse(manifestMatch[1]));
  const catalog = await import(pathToFileURL(catalogPath).href + `?preview-fit=${Date.now()}`);
  const all = catalog.components.flatMap(entry => entry.variants);
  const allowed = new Set(entries.flatMap(entry => entry.variants));
  if (all.length !== 390 || new Set(all).size !== 390 || all.filter(x => allowed.has(x)).length !== 91 || catalog.components.some(entry => entry.previewSizing !== undefined && (!allowed.has(entry.variants[0]) || entry.previewSizing !== 'content'))) throw new Error('Target must retain 299 baseline and exactly 91 content-sized additions');
  const plan = [];
  for (const relative of ['public/preview-runtime.js', 'build-previews.mjs']) plan.push({ relative, bytes: await readFile(resolve(sourceRoot, relative)) });
  plan.push({ relative: 'public/catalog.css', bytes: await readFile(resolve(sourceRoot, 'public/catalog.css')) });
  plan.push({ relative: 'public/library.css', bytes: await readFile(resolve(sourceRoot, 'release-tools/ui-overrides/public/library.css')) });
  for (const variant of standaloneFitVariants) {
    const relative = `public/packages/${variant}/index.html`;
    const source = await readFile(resolve(sourceRoot, relative), 'utf8');
    const target = await readFile(resolve(targetRoot, relative), 'utf8');
    if (fixStandaloneWrapper(source) !== source || fixStandaloneWrapper(target) !== source) throw new Error(`Standalone source differs beyond the reviewed wrapper: ${variant}`);
    plan.push({ relative, bytes: Buffer.from(source) });
  }
  plan.push({ relative: 'public/catalog-batches/approved-local-91.js', bytes: Buffer.from(manifestSource.replace(manifestMatch[1], JSON.stringify(entries, null, 2))) });
  // Validate every target and complete the plan before performing any write.
  if (write) for (const item of plan) await writeFile(resolve(targetRoot, item.relative), item.bytes);
  return { write, files: plan.map(({ relative, bytes }) => ({ relative, bytes: bytes.length })), metadataCount: entries.length, baselineCount: all.length - entries.length };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  const [sourceRoot, targetRoot, mode] = process.argv.slice(2);
  console.log(JSON.stringify(await integratePreviewFit({ sourceRoot, targetRoot, write: mode === '--write' }), null, 2));
}
