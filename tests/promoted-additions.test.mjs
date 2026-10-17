import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {Script} from 'node:vm';
import {reviewedSourceRoot} from '../release-tools/reviewed-source-root.mjs';
const root = new URL('../', import.meta.url);
const reviewedRoot=await reviewedSourceRoot(root);

test('everyday export preserves reviewed inherited typography on its scoped root',async()=>{
 const {localCss}=await import('../release-tools/compositions/local-families.mjs');
 const {fileURLToPath}=await import('node:url');
 const css=await localCss(fileURLToPath(reviewedRoot),'everyday');
 assert.match(css,/\.sl-component\{[^}]*font:14px\/1\.45 'Instrument Sans',sans-serif/);
 assert.match(css,/\.sl-component\{[^}]*font-synthesis:none/);
 assert.match(css,/\.sl-component\{[^}]*-webkit-font-smoothing:antialiased/);
});
test('approved promotion is exactly the qualified 91-item owner allowlist', async () => {
  const {approved91} = await import('../release-tools/compositions/inventory.mjs');
  assert.equal(approved91.length, 91);
  assert.equal(new Set(approved91.map(x => `${x.batch}:${x.key}`)).size, 91);
  assert.equal(new Set(approved91.map(x => x.localNumber)).size, 91);
  assert.deepEqual(approved91.map(x => x.localNumber), Array.from({length:93}, (_,i)=>i+1).filter(n=>n!==54&&n!==55));
  assert.equal(approved91.filter(x=>x.key==='contact').length,3);
  for (const entry of approved91) {
    assert.match(entry.id,/^matte-[a-z0-9-]+-v11$/);
    assert.equal(entry.variants[0],entry.id.slice(6));
    assert.ok(!/final|rejected|universal/.test(entry.batch));
  }
});
test('source inventory pins every consumed module and extracted review toolkit without executing review pages', async () => {
  const {verifySources} = await import('../release-tools/compositions/inventory.mjs');
  await verifySources(reviewedRoot);
  const inventory=JSON.parse(await readFile(new URL('release-tools/approved-91.json',root),'utf8'));
  assert.ok(Object.keys(inventory.sources).length>20);
  const {approved91}=await import('../release-tools/compositions/inventory.mjs');
  assert.deepEqual(inventory.approved,approved91);
  const {compositionFamilies}=await import('../release-tools/compositions/composition-families.mjs');
  const {localFamilies}=await import('../release-tools/compositions/local-families.mjs');
  const {accountFamilies}=await import('../release-tools/compositions/account-families.mjs');
  const consumed=[...Object.values(compositionFamilies).flatMap(f=>[...f.files,f.folder+'/app.js']),...Object.values(localFamilies).flatMap(f=>f.files.map(file=>f.folder+'/'+file)),...Object.values(accountFamilies).flatMap(f=>f.files.map(file=>f.folder+'/'+file))];
  for(const path of consumed)assert.ok(inventory.sources['experiments/'+path],`Unpinned consumed source: ${path}`);
  for(const [file,hash] of Object.entries(inventory.sources)) {
    assert.match(hash,/^[a-f0-9]{64}$/);
    assert.ok(!file.includes('account-final'));
  }
});
test('all additions have explicit existing categories matching their interaction purpose',async()=>{
  const {approved91,categoryMap,existingCategories,families}=await import('../release-tools/compositions/inventory.mjs');
  assert.deepEqual(Object.keys(categoryMap),families.map(([batch])=>batch));
  for(const [batch,,keys]of families){
    assert.deepEqual(Object.keys(categoryMap[batch]),keys.split(' '));
    for(const entry of approved91.filter(item=>item.batch===batch)){
      assert.ok(existingCategories.includes(entry.category));
      assert.equal(entry.category,categoryMap[batch][entry.key]);
    }
  }
  const categories=batch=>Object.fromEntries(approved91.filter(x=>x.batch===batch).map(x=>[x.key,x.category]));
  assert.deepEqual(categories('next-twenty'),{login:'inputs',register:'inputs',contact:'inputs',booking:'inputs',pricing:'selection',comparison:'data-display',testimonials:'data-display',team:'data-display',metrics:'data-display',process:'data-display',product:'selection',cart:'selection',delivery:'selection',promo:'inputs',saved:'data-display',reader:'navigation',table:'data-display',notifications:'feedback',export:'buttons','not-found':'feedback'});
  assert.deepEqual(categories('daily-controls'),{currency:'selection',payment:'selection',signature:'inputs',poll:'selection',partners:'data-display',hours:'data-display',splitter:'sliders',tracking:'data-display'});
  assert.deepEqual(categories('account-core'),{profile:'inputs',contact:'inputs',password:'inputs',sessions:'data-display',connections:'selection',twofactor:'selection',recovery:'data-display',passkeys:'data-display',visibility:'selection',addresses:'inputs'});
  assert.deepEqual(categories('account-services'),{communications:'selection',security:'data-display',recipient:'inputs',methods:'selection',documents:'data-display',subscription:'selection',orders:'data-display',returns:'inputs',tickets:'inputs',exports:'buttons'});
  assert.deepEqual(categories('account-extensions'),{region:'selection',balance:'data-display',rewards:'selection',referrals:'data-display',licenses:'data-display',appointments:'inputs',reviews:'inputs',members:'selection',ownership:'inputs',lifecycle:'selection'});
});
test('incomplete portable release fails before writing any packages', async () => {
  const {promote91,promote91ForQA} = await import('../release-tools/promote-91.mjs');
  assert.equal(typeof promote91ForQA,'function');
  const {fileURLToPath}=await import('node:url');
  const sourceRoot=fileURLToPath(reviewedRoot);
  await assert.rejects(promote91({sourceRoot,targetRoot:sourceRoot,esbuild:{}}),/distinct/i);
  await assert.rejects(promote91({sourceRoot,targetRoot:sourceRoot+'unwritten-candidate',esbuild:{}}),/incomplete/i);
});
test('core fixed copy is exhaustively translated without modifying user values',async()=>{
  const {translateSource}=await import('../release-tools/compositions/core.mjs');
  const copy=JSON.parse(await readFile(new URL('release-tools/public-copy.json',root),'utf8'));
  for(const name of ['runtime.js','profile.js','access.js','privacy.js','comfort.js','motion.tokens.json']) {
    const source=await readFile(new URL(`experiments/account-core-ru/${name}`,reviewedRoot),'utf8');
    assert.doesNotMatch(translateSource(source,copy),/[\u0400-\u04ff]/);
  }
  assert.throws(()=>translateSource("'Непереведённая строка'",copy),/Untranslated/);
  // The translation is applied to frozen build sources, never runtime payloads.
  assert.equal(translateSource('input.value=value;',copy),'input.value=value;');
});
test('services and extensions adapters translate every approved dependency with English defaults',async()=>{
  const {translateAccountSource}=await import('../release-tools/compositions/core.mjs');
  assert.equal(typeof translateAccountSource,'function');
  const {accountFamilies}=await import('../release-tools/compositions/account-families.mjs');
  const {default:services}=await import('../release-tools/compositions/services-copy.mjs');
  const {default:extensions}=await import('../release-tools/compositions/extensions-copy.mjs');
  const copy={...JSON.parse(await readFile(new URL('release-tools/public-copy.json',root),'utf8')),...services,...extensions};
  for(const family of Object.values(accountFamilies))for(const file of family.files){
    const path=family.folder+'/'+file,source=await readFile(new URL('experiments/'+path,reviewedRoot),'utf8');
    const translated=translateAccountSource(path,source,copy);
    assert.doesNotMatch(translated,/[\u0400-\u04ff]/);
    if(path==='account-extensions-ru/value.js')assert.match(translated,/saved=\{locale:'en-GB'/);
    if(path==='account-services-ru/data.js')assert.match(translated,/Intl.NumberFormat\('en-GB'/);
  }
});
test('translated account money and ledger preserve integer-unit totals and explicit confirmation',async()=>{
  const {translateAccountSource}=await import('../release-tools/compositions/core.mjs');
  const {default:services}=await import('../release-tools/compositions/services-copy.mjs');
  const {default:extensions}=await import('../release-tools/compositions/extensions-copy.mjs');
  const copy={...JSON.parse(await readFile(new URL('release-tools/public-copy.json',root),'utf8')),...services,...extensions};
  const load=async path=>import('data:text/javascript,'+encodeURIComponent(translateAccountSource(path,await readFile(new URL('experiments/'+path,reviewedRoot),'utf8'),copy)));
  const money=await load('account-services-ru/data.js');
  assert.equal(money.total([{unit:89000,quantity:2},{unit:32000,quantity:1}]),210000);
  assert.match(money.formatMoney(210000),/2,100/);
  assert.throws(()=>money.total([{unit:1.5,quantity:1}]),TypeError);
  const ledger=await load('account-extensions-ru/data.js');
  assert.equal(ledger.ledgerTotal(200000,ledger.operations),200000);
  const organization=translateAccountSource('account-extensions-ru/organization.js',await readFile(new URL('experiments/account-extensions-ru/organization.js',reviewedRoot),'utf8'),copy);
  assert.match(organization,/confirmation:\s*'DELETE'/);
  assert.equal((organization.match(/confirmation.input.value!=='DELETE'/g)||[]).length,2);
});
test('daily exports omit withdrawn clipboard renderers and preserve local numeric boundaries',async()=>{
  const {localFamilies,prepareLocalSource}=await import('../release-tools/compositions/local-families.mjs');
  for(const [family,configuration]of Object.entries(localFamilies))for(const file of configuration.files){
    const translated=prepareLocalSource(family,file,await readFile(new URL(`experiments/${configuration.folder}/${file}`,reviewedRoot),'utf8'));
    assert.doesNotMatch(translated,/[\u0400-\u04ff]/);
    if(family==='daily'&&file==='actions.js'){
      assert.match(translated,/signature\(t\)/);
      assert.doesNotMatch(translated,/paste\(t\)|cut\(t\)|onPaste|onCut/);
    }
  }
  const load=async file=>import('data:text/javascript,'+encodeURIComponent(prepareLocalSource('daily',file,await readFile(new URL('experiments/daily-controls-ru/'+file,reviewedRoot),'utf8'))));
  const {clampSplit}=await load('blocks.js');
  assert.deepEqual([clampSplit(10),clampSplit(90),clampSplit(NaN)],[30,70,50]);
  const {pollCounts,samplePrices}=await load('choices.js');
  assert.deepEqual(pollCounts([18,12,10],1),[18,13,10]);
  assert.deepEqual(pollCounts([18,12,10],null),[18,12,10]);
  assert.deepEqual(samplePrices,{RUB:2490,USD:29,EUR:27});
});
test('pruned registry parses and contains exactly the five actual core primitives',async()=>{
  const {pruneRegistry,corePrimitives}=await import('../release-tools/compositions/core.mjs');
  const source=await readFile(new URL('public/preview-data.js',root),'utf8');
  const pruned=pruneRegistry(source);
  assert.ok(pruned.length<100000);
  new Script(pruned.replace('export const previews','const previews'));
  const context={};
  new Script(pruned.replace('export const previews','globalThis.previews')).runInNewContext(context);
  assert.deepEqual(Object.keys(context.previews),corePrimitives);
  const keys=[...pruned.matchAll(/^"([a-z-]+)": \{/gm)].map(m=>m[1]);
  assert.deepEqual(keys,corePrimitives);
  assert.throws(()=>pruneRegistry(source,['missing-source']),/Missing approved primitive/);
  assert.doesNotMatch(pruned,/C:[/\\]|\/drafts\/|\/preview-data\.js/);
});
test('both composition families have audited closures, English copy and isolated lazy source hosts',async()=>{
  const {compositionFamilies,prepareCompositionSource,compositionCss,compositionPrimitives}=await import('../release-tools/compositions/composition-families.mjs');
  const {fileURLToPath}=await import('node:url');
  assert.deepEqual(Object.keys(compositionFamilies),['compositions','next']);
  assert.equal(compositionPrimitives.length,16);
  for(const [family,configuration]of Object.entries(compositionFamilies)){
    assert.equal(Object.keys(configuration.names).length,20);
    for(const path of configuration.files){
      const source=await readFile(new URL('experiments/'+path,reviewedRoot),'utf8');
      const translated=prepareCompositionSource(path,source,'sl-source-test');
      assert.doesNotMatch(translated,/[\u0400-\u04ff]|location\.search|parent\.postMessage/);
      if(path.endsWith('/source-host.js')){
        assert.match(translated,/function ensureSource/);
        assert.match(translated,/customElements\.get/);
        assert.doesNotMatch(translated,/customElements\.define\('sl-source'/);
      }
    }
    const css=await compositionCss(fileURLToPath(reviewedRoot),family,'sl-source-test');
    assert.doesNotMatch(css,/:root|(?:^|[},])\s*(?:html|body)\s*\{|#preview|@import|url\(['"]?\//);
    assert.match(css,/\.sl-component/);
    assert.match(css,/prefers-reduced-motion/);
  }
});
test('core export CSS has no review-page global selectors or external dependencies',async()=>{
  const {coreCss}=await import('../release-tools/compositions/core.mjs');
  const {fileURLToPath}=await import('node:url');
  const css=await coreCss(fileURLToPath(reviewedRoot));
  assert.doesNotMatch(css,/:root|\bbody\s*\{|#preview|@import|url\(['"]?\//);
  assert.match(css,/\.account-control/);
  assert.match(css,/height:48px|min-height:48px/);
  assert.match(css,/prefers-reduced-motion/);
});
test('generated approved QA packages are flat, parseable, English and dependency-local',{skip:!(process.env.SL_CORE_QA_ROOT||process.env.SL_APPROVED_QA_ROOT)},async()=>{
  const {readdir}=await import('node:fs/promises');
  const {resolve}=await import('node:path');
  const {approved91}=await import('../release-tools/compositions/inventory.mjs');
  const expected=['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2'].sort();
  const approvedFont=await readFile(new URL('public/packages/actions-menu/instrument-sans-variable.woff2',root));
  const approvedOFL=await readFile(new URL('public/packages/actions-menu/OFL.txt',root));
  const approvedLicense=await readFile(new URL('LICENSE',root));
  const items=approved91.filter(x=>process.env.SL_APPROVED_QA_ROOT?true:x.batch==='account-core');
  assert.equal(items.length,process.env.SL_APPROVED_QA_ROOT?91:10);
  const sharedContext={window:{}};
  for(const item of items) {
    const dir=resolve(process.env.SL_APPROVED_QA_ROOT||process.env.SL_CORE_QA_ROOT,'public/packages',item.variants[0]);
    assert.deepEqual((await readdir(dir)).sort(),expected);
    assert.deepEqual(await readFile(resolve(dir,'instrument-sans-variable.woff2')),approvedFont);
    assert.deepEqual(await readFile(resolve(dir,'OFL.txt')),approvedOFL);
    assert.deepEqual(await readFile(resolve(dir,'LICENSE')),approvedLicense);
    for(const name of ['buttons.js','example.js'])new Script(await readFile(resolve(dir,name),'utf8'));
    const context={window:{}};
    const controller=new Script(await readFile(resolve(dir,'buttons.js'),'utf8'));
    controller.runInNewContext(context,{timeout:5000});
    // Evaluate every standalone IIFE in one host too: no top-level DOM/custom
    // element registration, lexical collisions or shared mutable instance state.
    controller.runInNewContext(sharedContext,{timeout:5000});
    assert.equal(typeof context.window.SLComponent.mount,'function');
    assert.equal(typeof context.window.SLComponent.mountPreview,'function');
    for(const name of ['buttons.js','example.js','index.html','buttons.css']) {
      const source=await readFile(resolve(dir,name),'utf8');
      assert.doesNotMatch(source,/C:[/\\]|\/preview-data\.js|\/drafts\/|[\u0400-\u04ff]/i);
    }
    const html=await readFile(resolve(dir,'index.html'),'utf8');
    assert.match(html,/lang="en"/);
    assert.ok(html.includes(`data-kind="${item.variants[0]}"`));
    assert.match(await readFile(resolve(dir,'buttons.css'),'utf8'),/url\('\.\/instrument-sans-variable.woff2'\)/);
  }
  if(process.env.SL_APPROVED_QA_ROOT){
    const source=await readFile(resolve(process.env.SL_APPROVED_QA_ROOT,'public/catalog-batches/approved-local-91.js'),'utf8');
    assert.doesNotMatch(source,/C:[/\\]|D:[/\\]|[\u0400-\u04ff]|\bimport\b/);
    const context={};
    new Script(source.replace('export default ','globalThis.entries=')).runInNewContext(context);
    const entries=JSON.parse(JSON.stringify(context.entries));
    assert.equal(entries.length,91);
    assert.deepEqual(entries.map(({localNumber,batch,key,category,id,variants})=>({localNumber,batch,key,category,id,variants})),approved91);
    for(const entry of entries){
      for(const field of ['name','description','page','preview','packageRoot'])assert.equal(typeof entry[field],'string');
      for(const field of ['motions','keywords','usage'])assert.ok(entry[field].length>0);
      assert.equal(entry.downloads[entry.variants[0]],`./downloads/${entry.id}.zip`);
    }
  }
});
