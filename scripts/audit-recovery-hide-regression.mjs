import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {resolve,isAbsolute} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {reviewedSourceRoot} from '../release-tools/reviewed-source-root.mjs';

const repository=fileURLToPath(new URL('../',import.meta.url));
const workspace=process.env.SL_UI_FRAMEWORK_RUNTIME;
if(!isAbsolute(workspace||''))throw new Error('Set SL_UI_FRAMEWORK_RUNTIME to an absolute private QA runtime.');
const out=workspace+'/recovery-hide-qa';
const variant='data-display-account-core-recovery-v11';
const files=['buttons.js','buttons.css','index.html','example.js','instrument-sans-variable.woff2','OFL.txt','LICENSE'];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
export async function prepareRecoveryFixture(label){
 if(!['red','green'].includes(label))throw new TypeError('red or green required');
 const targetRoot=out+'/'+label;await mkdir(targetRoot+'/public/packages/'+variant,{recursive:true});
 if(label==='red')for(const file of files)await copyFile(workspace+'/approved-qa/public/packages/'+variant+'/'+file,targetRoot+'/public/packages/'+variant+'/'+file);
 else{
  await copyFile(workspace+'/release-candidate/public/preview-data.js',targetRoot+'/public/preview-data.js');
  const esbuild=await import(pathToFileURL(workspace+'/node_modules/esbuild/lib/main.js'));assert.equal(esbuild.version,'0.28.2');
  const {promoteFamily}=await import('../release-tools/promote-91.mjs');
  const sourceRoot=fileURLToPath(await reviewedSourceRoot(repository));
  const entries=await promoteFamily('core',{sourceRoot,targetRoot,esbuild});
  const closure={family:'core',sourceRoot,esbuild:esbuild.version,sources:{},registry:hash(await readFile(targetRoot+'/public/preview-data.js')),packages:[]};
  for(const file of ['runtime.js','profile.js','access.js','privacy.js','comfort.js','motion.tokens.json','styles.css','comfort.css'])closure.sources['experiments/account-core-ru/'+file]=hash(await readFile(resolve(sourceRoot,'experiments/account-core-ru',file)));
  for(const entry of entries){const item={variant:entry.variants[0],files:{},changed:[]};for(const file of files){const current=hash(await readFile(targetRoot+'/public/packages/'+item.variant+'/'+file)),before=hash(await readFile(workspace+'/approved-qa/public/packages/'+item.variant+'/'+file));item.files[file]={before,current};if(current!==before)item.changed.push(file);}closure.packages.push(item);}
  await writeFile(out+'/fixture.json',JSON.stringify(closure,null,2)+'\n');
 }
 return targetRoot;
}

export async function runRecoveryRegression(label='green'){
 const targetRoot=out+'/'+label;await mkdir(out,{recursive:true});
 const report={label,scope:'Synthetic recovery callbacks only; no server rotation claim',cases:[],errors:[],external:[],cleanup:{browser:false,server:false},hashes:{}};
 for(const file of files)report.hashes[file]=hash(await readFile(targetRoot+'/public/packages/'+variant+'/'+file));
 const sourceRoot=await reviewedSourceRoot(repository),manifest=JSON.parse(await readFile(new URL('../release-tools/approved-91.json',import.meta.url),'utf8'));
 report.frozenSources={};for(const [file,pin]of Object.entries(manifest.sources)){const actual=hash(await readFile(new URL(file,sourceRoot)));assert.equal(actual,pin,file);report.frozenSources[file]=actual;}
 const save=()=>writeFile(out+'/'+label+'.json',JSON.stringify(report,null,2)+'\n');
 let server,browser,page;
 try{
  server=spawn(process.execPath,['scripts/serve-approved-qa.mjs',targetRoot+'/public','4357'],{cwd:repository,windowsHide:true,env:{...process.env,TEMP:out,TMP:out},stdio:['ignore','pipe','pipe']});
  await new Promise((yes,no)=>{server.stdout.once('data',yes);server.once('error',no);server.once('exit',code=>no(new Error('Owned server exited '+code)));});
  if(!isAbsolute(process.env.SL_UI_PLAYWRIGHT_MODULE||''))throw new Error('Set an absolute installed SL_UI_PLAYWRIGHT_MODULE.');
  const pw=await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE));
  browser=await(pw.chromium??pw.default.chromium).launch({channel:'msedge',headless:true,env:{...process.env,TEMP:out,TMP:out}});
  page=await browser.newPage({viewport:{width:520,height:1100}});page.setDefaultTimeout(4000);
  page.on('pageerror',e=>report.errors.push(e.message));page.on('response',r=>{if(r.status()>=400&&r.url().includes('/packages/'))report.errors.push(r.status()+' '+r.url());});
  await page.route('**/*',r=>{const url=r.request().url();if(!url.startsWith('http://127.0.0.1:4357/')){report.external.push(url);return r.abort();}return r.continue();});
  await page.addInitScript(()=>{const no=()=>{throw new Error('External API forbidden');};Object.defineProperty(navigator,'clipboard',{value:{readText:no,writeText:no}});window.open=no;});
  const settle=()=>page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  const root=()=>page.locator('.sl-component').first(),button=name=>root().getByRole('button',{name,exact:true}),state=()=>page.evaluate(()=>qa.controller.state);
  const status=()=>root().locator('.ac-status').textContent();
  const test=async(name,fn)=>{const c={name,pass:false};report.cases.push(c);try{await fn(c);c.pass=true;}catch(e){c.error=e.message;c.evidence=await page.evaluate(()=>({state:qa?.controller?.state,status:document.querySelector('.ac-status')?.textContent,grid:document.querySelector('.ac-codes')?.textContent,aborted:qa?.signal?.aborted})).catch(()=>null);await page.screenshot({path:out+'/'+label+'-'+name.replace(/[^a-z0-9]+/gi,'-')+'.png',fullPage:true});}await save();};
  const load=async(mode='hold',motion='no-preference')=>{
   await page.emulateMedia({reducedMotion:motion});await page.goto('http://127.0.0.1:4357/packages/'+variant+'/index.html');
   await page.evaluate(mode=>{const q={mode,calls:[],changes:[],signal:null,resolve:null,reject:null};window.qa=q;q.controller=SLComponent.mount(document.querySelector('.sl-component'),{onAction:(request,{signal})=>{q.calls.push(structuredClone(request));if(request.type==='recovery.reveal')return {codes:['QA-OLD-A','QA-OLD-B']};q.signal=signal;if(q.mode==='hold')return new Promise((resolve,reject)=>{q.resolve=resolve;q.reject=reject;});if(q.mode==='reject')return Promise.reject(new Error('Synthetic rejection'));if(q.mode==='false')return false;if(q.mode==='invalid')return {codes:[123]};return {codes:['<b>Анна 日本語 😀</b>','QA-NEW-B']};},onChange:value=>q.changes.push(structuredClone(value))});},mode);await settle();
  };
  const reveal=async()=>{await button('Show codes').click();await settle();assert.equal((await state()).shown,true);assert.equal(await root().locator('.ac-codes code').count(),2);};
  const begin=async()=>{await reveal();await root().getByRole('checkbox').check();await button('Replace set').focus();await page.keyboard.press('Enter');await settle();assert.equal((await state()).pending,true);assert.equal(await button('Replace set').isDisabled(),true);await button('Replace set').evaluate(n=>n.click());assert.equal(await page.evaluate(()=>qa.calls.filter(c=>c.type==='recovery.rotate').length),1);};
  const reply=async(mode='success')=>{await page.evaluate(mode=>{if(mode==='reject')qa.reject(new Error('Synthetic late rejection'));else qa.resolve(mode==='false'?false:mode==='invalid'?{codes:[123]}:{codes:['<b>Анна 日本語 😀</b>','QA-NEW-B']});},mode);await settle();};
  const hidden=async()=>{assert.equal((await state()).shown,false,'Explicit Hide must survive a late rotation result');assert.equal(await root().locator('.ac-codes').textContent(),'');assert.equal(await button('Show codes').count(),1);assert.doesNotMatch(JSON.stringify(await state()),/QA-|Анна/);};
  const hide=async(keyboard=false)=>{if(keyboard){await button('Hide codes').focus();await page.keyboard.press('Enter');}else await button('Hide codes').click();await settle();};
  for(const motion of label==='red'?['no-preference']:['no-preference','reduce'])for(const keyboard of label==='red'?[false]:[false,true])await test('hide late success '+motion+' '+(keyboard?'keyboard':'pointer'),async c=>{
   await load('hold',motion);await begin();await hide(keyboard);c.afterHide={state:await state(),status:await status(),aborted:await page.evaluate(()=>qa.signal.aborted)};await reply();await hidden();assert.equal(c.afterHide.state.pending,false);assert.equal(c.afterHide.aborted,true);assert.doesNotMatch(c.afterHide.status,/Processing/);assert.match(c.afterHide.status,/cancelled/);assert.equal((await state()).generation,0);assert.equal(await page.evaluate(()=>qa.changes.some(v=>JSON.stringify(v).includes('QA-NEW'))),false);await page.screenshot({path:out+'/'+label+'-hidden-'+motion+'-'+keyboard+'.png',fullPage:true});
   await page.evaluate(()=>qa.mode='success');await reveal();await button('Replace set').click();await settle();assert.equal((await state()).generation,1);assert.equal((await state()).acknowledged,false);assert.equal(await button('Replace set').isDisabled(),true);assert.equal(await root().locator('b').count(),0);assert.equal(await root().locator('.ac-codes').textContent(),'<b>Анна 日本語 😀</b>QA-NEW-B');await hide(keyboard);await hidden();
  });
  if(label==='green'){
   for(const mode of ['reject','false','invalid'])await test('rotation '+mode+' and retry',async()=>{await load(mode);await reveal();await root().getByRole('checkbox').check();await button('Replace set').click();await settle();assert.equal((await state()).generation,0);assert.equal((await state()).shown,true);assert.match(await status(),/failed/);await page.evaluate(()=>qa.mode='success');await button('Replace set').click();await settle();assert.equal((await state()).generation,1);assert.equal((await state()).acknowledged,false);});
   for(const mode of ['reject','false','invalid'])await test('hide ignores late '+mode,async()=>{await load();await begin();await hide();const before=await state();await reply(mode);await hidden();assert.deepEqual(await state(),before);assert.match(await status(),/cancelled/);});
   for(const op of ['cancel','escape','reset','destroy'])await test(op+' ignores late rotation',async()=>{await load();await begin();if(op==='escape')await page.keyboard.press('Escape');else await page.evaluate(op=>qa.controller[op](),op);await settle();assert.equal(await page.evaluate(()=>qa.signal.aborted),true);const after=await state();await reply();assert.deepEqual(await state(),after);if(op==='destroy')assert.equal(await root().textContent(),'');if(op==='reset')await hidden();});
   await test('missing handler reveal stays hidden',async()=>{await load();await page.evaluate(()=>qa.controller=SLComponent.mount(document.querySelector('.sl-component')));await button('Show codes').click();await hidden();assert.match(await status(),/Connect an action handler/);});
   for(const op of ['cancel','reset','destroy'])await test('pending reveal '+op+' ignores late',async()=>{await load();await page.evaluate(()=>qa.controller=SLComponent.mount(document.querySelector('.sl-component'),{onAction:(_r,{signal})=>{qa.signal=signal;return new Promise(resolve=>qa.resolve=resolve);}}));await button('Show codes').click();assert.equal((await state()).pending,true);await page.evaluate(op=>qa.controller[op](),op);const after=await state();await reply();assert.equal(await page.evaluate(()=>qa.signal.aborted),true);assert.deepEqual(await state(),after);assert.equal(await root().locator('.ac-codes code').count(),0);});
   await test('late reply preserves external focus',async()=>{await load();await begin();await hide(true);await page.evaluate(()=>{const b=document.createElement('button');b.id='outside';b.textContent='Outside';document.body.append(b);b.focus();});await reply();await hidden();assert.equal(await page.evaluate(()=>document.activeElement.id),'outside');});
   await test('keyboard Hide retains focus after late success',async()=>{await load();await begin();await hide(true);const focused=()=>page.evaluate(()=>{let n=document.activeElement;while(n?.shadowRoot?.activeElement)n=n.shadowRoot.activeElement;return n?.textContent;});assert.equal(await focused(),'Show codes');await reply();await hidden();assert.equal(await focused(),'Show codes');});
   await test('cancelled old reply cannot interrupt newer pending rotation',async()=>{await load();await begin();await page.evaluate(()=>{qa.oldResolve=qa.resolve;qa.oldSignal=qa.signal;});await hide();await reveal();await button('Replace set').click();await settle();assert.equal((await state()).pending,true);await page.evaluate(()=>qa.oldResolve({codes:['QA-STALE']}));await settle();assert.equal((await state()).pending,true);assert.equal(await page.evaluate(()=>qa.oldSignal.aborted),true);assert.equal(await page.evaluate(()=>qa.signal.aborted),false);assert.equal((await state()).generation,0);assert.equal(await button('Replace set').isDisabled(),true);await reply();assert.equal((await state()).generation,1);assert.equal((await state()).pending,false);assert.doesNotMatch(await root().locator('.ac-codes').textContent(),/STALE/);});
   for(const codes of [[],null,['X'.repeat(81)]])await test('invalid reveal schema '+JSON.stringify(codes).slice(0,24),async()=>{await load();await page.evaluate(codes=>qa.controller=SLComponent.mount(document.querySelector('.sl-component'),{onAction:()=>({codes})}),codes);await button('Show codes').click();await settle();await hidden();assert.match(await status(),/failed/);});
   await test('demo reveal rotation and hide remain local',async()=>{await load();await page.evaluate(()=>qa.controller=SLComponent.mountPreview(document.querySelector('.sl-component')));await button('Show codes').click();await root().getByRole('checkbox').check();await button('Replace set').click();await settle();assert.equal((await state()).generation,1);assert.match(await status(),/Only the example changed/);await hide();await hidden();assert.equal(await page.evaluate(()=>qa.calls.length),0);});
   await test('second instance hide and Escape do not cancel owner',async()=>{await load();await begin();await page.evaluate(()=>{const second=document.createElement('section');second.id='second';document.body.append(second);qa.second=SLComponent.mount(second,{onAction:()=>({codes:['QA-SECOND']})});});const second=page.locator('#second');await second.getByRole('button',{name:'Show codes',exact:true}).click();await second.getByRole('button',{name:'Hide codes',exact:true}).click();await second.locator('.account-control').focus();await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>qa.signal.aborted),false);assert.equal((await state()).pending,true);await reply();assert.equal((await state()).generation,1);assert.equal(await second.locator('.ac-codes').textContent(),'');await page.evaluate(()=>qa.second.destroy());});
   await test('runtime reduced motion switches while hidden',async()=>{await load();await reveal();await hide();await page.emulateMedia({reducedMotion:'reduce'});await page.waitForFunction(()=>document.querySelector('.account-control').dataset.reduced==='true');await hidden();await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForFunction(()=>document.querySelector('.account-control').dataset.reduced==='false');await hidden();await reveal();});
  }
 }finally{if(browser){await browser.close();report.cleanup.browser=true;}if(server){server.kill();await new Promise(r=>server.exitCode!==null?r():server.once('exit',r));report.cleanup.server=true;}report.finished=new Date().toISOString();await save();}
 report.passed=report.cases.filter(c=>c.pass).length;report.failed=report.cases.length-report.passed;await save();return report;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const label=process.argv[2]||'green';await prepareRecoveryFixture(label);const report=await runRecoveryRegression(label);console.log(JSON.stringify({label,cases:report.cases.length,passed:report.passed,failed:report.failed,errors:report.errors,external:report.external,cleanup:report.cleanup}));if(report.failed||report.errors.length||report.external.length)process.exitCode=1;
}
