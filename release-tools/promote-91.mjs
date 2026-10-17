import {readFile,mkdir,writeFile,copyFile} from 'node:fs/promises';
import {isAbsolute,resolve} from 'node:path';
import {approved91,verifySources} from './compositions/inventory.mjs';
import {bundleCore,coreCss} from './compositions/core.mjs';
import {accountFamilies} from './compositions/account-families.mjs';
import servicesCopy from './compositions/services-copy.mjs';
import extensionsCopy from './compositions/extensions-copy.mjs';
import {accountOperations,accountResults} from './compositions/account-api.mjs';
import {localFamilies,bundleLocal,localCss} from './compositions/local-families.mjs';
import {compositionFamilies,bundleComposition,compositionCss} from './compositions/composition-families.mjs';

export async function promote91({sourceRoot,targetRoot,esbuild}) {
  validateRoots(sourceRoot,targetRoot);
  await verifySources(sourceRoot);
  throw new Error('Portable 91 release evidence incomplete: all seven adapters exist, but full integration and browser QA remain. Use promote91ForQA or promoteFamily for explicit QA only. No packages written.');
}
function validateRoots(sourceRoot,targetRoot) {
  if(typeof sourceRoot!=='string'||typeof targetRoot!=='string'||!isAbsolute(sourceRoot)||!isAbsolute(targetRoot))throw new TypeError('Use absolute sourceRoot and targetRoot directory strings');
  if(resolve(sourceRoot)===resolve(targetRoot))throw new Error('Promotion requires a distinct isolated targetRoot');
}

/** Generate a complete isolated QA candidate; this does not certify a release. */
export async function promote91ForQA(options){
  validateRoots(options.sourceRoot,options.targetRoot);
  await verifySources(options.sourceRoot);
  const entries=[];
  for(const family of ['compositions','next','everyday','daily','core','services','extensions'])entries.push(...await promoteFamily(family,options));
  if(entries.length!==91||new Set(entries.map(entry=>entry.id)).size!==91)throw new Error('Invalid full QA inventory');
  const folder=resolve(options.targetRoot,'public/catalog-batches');
  await mkdir(folder,{recursive:true});
  await writeFile(resolve(folder,'approved-local-91.js'),'// Isolated QA candidate only. Browser and release integration gates remain.\nexport default '+JSON.stringify(entries,null,2)+';\n');
  return entries;
}

/** Explicit partial QA export. Never registers a partial release manifest. */
export async function promoteFamily(family,{sourceRoot,targetRoot,esbuild}) {
  validateRoots(sourceRoot,targetRoot);
  const configuration=accountFamilies[family]||localFamilies[family]||compositionFamilies[family],isLocal=!!localFamilies[family],isComposition=!!compositionFamilies[family];
  if(!configuration)throw new Error('Unknown or incomplete family adapter');
  const names=configuration.names;
  if(typeof esbuild?.build!=='function')throw new TypeError('Supply an imported esbuild module');
  await verifySources(sourceRoot);
  const copy={...JSON.parse(await readFile(new URL('./public-copy.json',import.meta.url),'utf8')),...servicesCopy,...extensionsCopy};
  const css=isComposition?null:isLocal?await localCss(sourceRoot,family):await coreCss(sourceRoot,family);
  const items=approved91.filter(x=>x.batch===configuration.batch);
  // Build every controller before writing to avoid partially translating a family.
  const bundles=[];
  for(const entry of items)bundles.push(isComposition?await bundleComposition({sourceRoot,targetRoot,entry,esbuild,family}):isLocal?await bundleLocal({sourceRoot,entry,esbuild,family}):await bundleCore({sourceRoot,targetRoot,entry,esbuild,copy,family}));
  for(const [i,entry]of items.entries()) {
    const variant=entry.variants[0],folder=resolve(targetRoot,'public/packages',variant),name=names[entry.key];
    await mkdir(folder,{recursive:true});
    await writeFile(resolve(folder,'buttons.js'),bundles[i]);
    await writeFile(resolve(folder,'buttons.css'),isComposition?await compositionCss(sourceRoot,family,'sl-source-'+variant):css);
    await writeFile(resolve(folder,'index.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title><link rel="stylesheet" href="./buttons.css"><script defer src="./buttons.js"></script><script defer src="./example.js"></script><style>body{margin:0;padding:16px;display:flex;justify-content:center;background:#f2f2f2}</style></head><body><section class="sl-component" data-kind="${variant}" aria-label="${name}"><p role="status">Initializing ${name.toLowerCase()}…</p></section></body></html>`);
    await writeFile(resolve(folder,'example.js'),`// Explicit local demonstration only. See catalog Controller usage for the family callback contract.\n// Application code calls SLComponent.mount(root, options); destroy the returned controller during cleanup.\nwindow.SLComponent.mountPreview(document.querySelector('.sl-component'));\n`);
    for(const file of ['instrument-sans-variable.woff2','OFL.txt'])await copyFile(resolve(sourceRoot,'public/packages/actions-menu',file),resolve(folder,file));
    await copyFile(resolve(sourceRoot,'LICENSE'),resolve(folder,'LICENSE'));
  }
  return items.map(entry=>({...entry,previewSizing:'content',name:names[entry.key],description:isLocal||isComposition?`${names[entry.key]} with the reviewed local state and reversible motion.`:`${names[entry.key]} with application-owned actions and an explicit local demonstration.`,motions:['Reversible reveal','Soft press'],keywords:[configuration.batch,entry.key],page:`./component.html?component=${entry.id}`,preview:`./packages/${entry.variants[0]}/index.html?embed=1`,packageRoot:'./packages/',downloads:{[entry.variants[0]]:`./downloads/${entry.id}.zip`},usage:isComposition?[{title:'Controller',paragraphs:['mount(root) and mountPreview(root) both render the reviewed local example. The controller provides reset(), destroy() and state: {key, local:true}. Reset rebuilds initial local state; destroy removes instance listeners, observers and active animations. No callback option is implied by this adapter.']},{title:'Application integration',paragraphs:['Selections, comments, saved items, inbox changes and sample files remain local until reset. Sign-in, registration, contact, subscription, booking, checkout, delivery and export confirmations explicitly describe examples; they do not perform server, device, account, file or navigation operations. Connect real operations explicitly when adapting this source to your application.']},{title:'Appearance and accessibility',paragraphs:['The original reviewed renderer, inline SVG primitives and reversible motion context are bundled from an allowlisted source closure. Each package owns a lazy custom-element name and nested Shadow DOM. Styles are scoped to the public root and JavaScript observes runtime reduced motion. Public labels are English; user input remains literal text.']}]:isLocal?[{title:'Controller',paragraphs:[family==='everyday'?'mount(root, {onAction, initial}) delegates to onAction({key, active, signal}); resolve with optional {active, disabled, message}, or reject on failure. Missing callbacks do not perform or claim an action. mountPreview() alone supplies the reviewed local examples.':'mount(root, {onChange}) mounts a local UI example; onChange receives a cloned state. Payment/poll/signature/tracking are local presentation only, with no payment, vote submission, signature persistence or order request. Connect actual operations explicitly in your application.','The controller provides state, reset() and destroy(). Reset rebuilds the initial state and cancels pending work. Destroy is repeat-safe. Runtime reduced motion and original SVG/motion remain intact.']}]:[{title:'Controller',paragraphs:['Call mount(root, {onAction, onChange}); onAction({type,payload},{signal}) performs application operations. Missing handlers preserve data. The controller provides state, reset(), cancel() and destroy(). mountPreview() changes local demonstration state only.']},{title:'Application actions',paragraphs:[accountOperations[entry.key].length?'Action types: '+accountOperations[entry.key].join(', ')+'.':'This read-only component does not invoke external actions.',accountResults[entry.key]||'Resolve only after the real application operation succeeds; reject or return false on failure. Observe the supplied AbortSignal and validate permissions on your server.']},{title:'Appearance and lifecycle',paragraphs:['Styles retain the reviewed graphite surfaces, original inline SVGs and comfortable account controls. The stable outer root contains an instance-local account workflow and nested primitive Shadow DOM. Reset cancels pending work and restores initial state. Destroy is repeat-safe. CSS and mounted JavaScript observe runtime reduced-motion changes.']}]}));
}
