// Purpose-specific legacy Feedback callback QA. All operations are synthetic.
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL,fileURLToPath} from 'node:url';

const runtime=process.env.SL_UI_FRAMEWORK_RUNTIME,playwright=process.env.SL_UI_PLAYWRIGHT_MODULE;
if(process.env.SL_UI_FRAMEWORK_BROWSER!=='1'||![runtime,playwright].every(p=>isAbsolute(p||'')))throw new Error('Explicit browser opt-in, absolute private runtime and installed Playwright module required.');
const variants=['linear-feedback','circular-feedback','connection-feedback'];
const out=resolve(runtime,'feedback-results'),canonical=fileURLToPath(new URL('../public/packages/',import.meta.url));
const manifest=JSON.parse(await readFile(resolve(runtime,'framework-artifact-integrity.json'),'utf8'));
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const sourceHashes=[];
for(const variant of variants){
 const sourceHash=hash(await readFile(resolve(canonical,variant,'buttons.js'))),fixture=resolve(runtime,'release-candidate/public/packages',variant);
 assert.equal(hash(await readFile(resolve(fixture,'buttons.js'))),sourceHash,variant+' fixture must match current canonical controller source');
 const controllerHash=hash(await readFile(resolve(fixture,'react-controller.mjs')));
 assert.equal(controllerHash,manifest.checks.find(c=>c.variant===variant)?.controllerHash,variant+' generated controller must match artifact-integrity manifest');
 sourceHashes.push({variant,sourceHash,controllerHash});
}
await mkdir(out,{recursive:true});
const report={started:new Date().toISOString(),scope:'Synthetic legacy Feedback onAction callbacks in actual React StrictMode and production Next. Linear/circular data-demo tools are source preview controls; documented run/cancel API exercises application callbacks. Connection reconnect uses native pointer and keyboard.',sourceHashes,checks:[],errors:[],external:[]};
const pw=await import(pathToFileURL(playwright));
assert.equal(typeof pw.chromium?.launch,'function','Use the installed ESM Playwright index.mjs entry');
const browser=await pw.chromium.launch({channel:'msedge',headless:true}),page=await browser.newPage({viewport:{width:900,height:1100}});
page.setDefaultTimeout(5000);let active='';
page.on('pageerror',error=>report.errors.push({active,message:error.message}));
page.on('console',message=>{if(message.type()==='error')report.errors.push({active,message:message.text()});});
page.on('response',response=>{if(response.status()>=400)report.errors.push({active,message:response.status()+' '+response.url()});});
await page.route('**/*',route=>{const url=route.request().url();if(!/^http:\/\/127\.0\.0\.1:435[56]\//.test(url)&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push({active,url});return route.abort();}return route.continue();});
const host=(slot='first')=>page.locator(`[data-bulk-slot=${slot}]`),root=(slot='first')=>host(slot).locator('.fb-demo');
const connection=variant=>variant==='connection-feedback';
const initial=variant=>connection(variant)?'offline':'idle';
async function frames(){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
async function ready(slot='first'){await page.waitForFunction(slot=>document.querySelector(`[data-bulk-slot=${slot}] [data-sl-react]`)?.getAttribute('aria-busy')==='false',slot);}
async function state(expected,slot='first'){await page.waitForFunction(({expected,slot})=>__frameworkBulk.controllers[slot==='first'?0:1]?.state===expected,{expected,slot});assert.equal(await root(slot).getAttribute('data-state'),expected);}
async function choose(variant){const before=await page.evaluate(()=>__frameworkBulk.ready);await page.evaluate(variant=>__frameworkBulk.select(variant,false),variant);await page.waitForFunction(n=>__frameworkBulk.ready>n&&!!__frameworkBulk.feedback,before);await ready();await state(initial(variant));await page.evaluate(()=>{__frameworkBulk.feedback.setMode('pending');__frameworkBulk.feedback.setMode('pending','second');window.__feedbackEvents=[];});await watch();}
async function watch(slot='first'){await root(slot).evaluate((node,slot)=>{for(const type of ['feedbackchange','feedbackcomplete','feedbackerror','feedbackcancel','feedbackreset'])node.addEventListener(type,event=>window.__feedbackEvents.push({slot,type,detail:event.detail}));},slot);}
async function invoke(variant,method='pointer',slot='first'){
 if(connection(variant)){const button=host(slot).locator('[data-action=reconnect]');if(method==='keyboard'){await button.focus();await button.press('Enter');}else await button.click();}
 else await page.evaluate(slot=>{void __frameworkBulk.controllers[slot==='first'?0:1].run('start');},slot);
}
async function begin(variant,method='pointer',slot='first'){
 const before=await page.evaluate(()=>__frameworkBulk.feedback.log.length);await invoke(variant,method,slot);await state('pending',slot);
 const request=await page.evaluate(slot=>{const q=__frameworkBulk.feedback.requests.filter(r=>r.slot===slot).at(-1);return {id:q.id,slot:q.slot,variant:q.variant,action:q.action,contextKeys:q.contextKeys,signal:q.signal instanceof AbortSignal,aborted:q.signal.aborted,onProgress:typeof q.onProgress,resolve:typeof q.resolve,reject:typeof q.reject};},slot);
 assert.deepEqual(request,{id:request.id,slot,variant,action:connection(variant)?'reconnect':'start',contextKeys:['onProgress','signal'],signal:true,aborted:false,onProgress:'function',resolve:'function',reject:'function'});
 const log=await page.evaluate(()=>__frameworkBulk.feedback.log);assert.equal(log.length,before+1);assert.deepEqual(log.at(-1),{id:request.id,slot,variant,action:request.action});return request.id;
}
async function operate(id,operation,value){await page.evaluate(({id,operation,value})=>{const q=__frameworkBulk.feedback.requests.find(r=>r.id===id);if(operation==='progress')q.onProgress(value);else q[operation](value);},{id,operation,value});}
async function aborted(id,expected){assert.equal(await page.evaluate(id=>__frameworkBulk.feedback.requests.find(r=>r.id===id).signal.aborted,id),expected);}
async function progress(value,slot='first'){await page.waitForFunction(({value,slot})=>Math.abs(__frameworkBulk.controllers[slot==='first'?0:1].progress-value)<0.001,{value,slot});if(await host(slot).locator('[data-progress]').count())assert.equal(await host(slot).locator('[data-progress]').getAttribute('aria-valuenow'),String(value));}
async function snapshot(){return page.evaluate(()=>{const host=document.querySelector('[data-bulk-slot=first] [data-sl-react]');return {state:__frameworkBulk.controllers[0]?.state??null,progress:__frameworkBulk.controllers[0]?.progress??null,markup:host?.querySelector('div')?.shadowRoot?.innerHTML??null,events:window.__feedbackEvents.length,log:__frameworkBulk.feedback.log.length};});}
async function lateIgnored(id){const before=await snapshot();await operate(id,'progress',99);await operate(id,'resolve');await frames();assert.deepEqual(await snapshot(),before);}
async function flush(){await writeFile(resolve(out,'feedback.json'),JSON.stringify(report,null,2)+'\n');}
try{
 for(const [framework,url]of [['react','http://127.0.0.1:4355/bulk.html'],['nextjs','http://127.0.0.1:4356/bulk']]){
  await page.goto(url);await page.waitForFunction(()=>window.__frameworkBulk?.feedback);await ready();
  for(const variant of variants){
   active=framework+':'+variant;const check={framework,variant,steps:[],issues:[]};report.checks.push(check);
   const step=async(name,run)=>{await run();check.steps.push(name);await flush();};
   try{
    await page.emulateMedia({reducedMotion:'no-preference'});await choose(variant);
    await step('source preview controls do not impersonate application callbacks',async()=>{
     if(connection(variant))return;
     const before=await page.evaluate(()=>__frameworkBulk.feedback.log.length);
     await host().locator('[data-demo=start]').click();await host().locator('[data-demo=start]').press('Enter');await frames();
     assert.equal(await page.evaluate(()=>__frameworkBulk.feedback.log.length),before);await state('idle');
    });
    await step('exact action, AbortSignal and onProgress; native reconnect pointer; duplicate guard',async()=>{
     const id=await begin(variant);check.pointerRequest=id;
     const count=await page.evaluate(()=>__frameworkBulk.feedback.log.length);
     if(connection(variant)){await host().locator('[data-action=reconnect]').press('Enter');assert.equal(await host().locator('[data-action=reconnect]').getAttribute('aria-disabled'),'true');}
     else assert.equal(await page.evaluate(()=>__frameworkBulk.controllers[0].run('start')),false);
     assert.equal(await page.evaluate(()=>__frameworkBulk.feedback.log.length),count);
     await operate(id,'progress',37);await progress(37);await state('pending');await aborted(id,false);
     await page.screenshot({path:resolve(out,framework+'-'+variant+'-pending.png')});
     await operate(id,'resolve');await state('complete');if(!connection(variant))await progress(100);
     assert.equal(await host().locator('[data-live]').textContent(),connection(variant)?'Connected.':'Operation complete.');
     assert.equal(await page.evaluate(()=>__feedbackEvents.filter(e=>e.type==='feedbackcomplete').length),1);
     await page.screenshot({path:resolve(out,framework+'-'+variant+'-complete.png')});
    });
    await step('immediate rejection error and retry through latest callback mode without remount',async()=>{
     await page.evaluate(()=>{__frameworkBulk.reset();__frameworkBulk.feedback.setMode('reject');});await state(initial(variant));
     const before=await page.evaluate(()=>({ready:__frameworkBulk.ready,log:__frameworkBulk.feedback.log.length}));await invoke(variant,'keyboard');await state('error');
     assert.equal(await page.evaluate(()=>__frameworkBulk.feedback.log.length),before.log+1);
     assert.equal(await host().locator('[data-error]').textContent(),'The operation could not complete. Please try again.');
     assert.equal(await page.evaluate(()=>__feedbackEvents.filter(e=>e.type==='feedbackerror').at(-1).detail.message),'failed');
     await page.evaluate(()=>__frameworkBulk.feedback.setMode('pending'));const id=await begin(variant,'keyboard');await operate(id,'reject','Held synthetic rejection');await state('error');
     await page.evaluate(()=>__frameworkBulk.feedback.setMode('success'));await invoke(variant,'keyboard');await state('complete');if(!connection(variant))await progress(100);
     assert.equal(await page.evaluate(()=>__frameworkBulk.ready),before.ready,'Callback mode changes must not remount the controller');
    });
    await step('pending reset aborts and ignores late progress/fulfillment',async()=>{
     await choose(variant);const id=await begin(variant);await operate(id,'progress',23);await progress(23);await page.evaluate(()=>__frameworkBulk.reset());await state(initial(variant));await aborted(id,true);await lateIgnored(id);
    });
    await step('pending cancel aborts and ignores late progress/fulfillment; retry remains available',async()=>{
     const id=await begin(variant);await page.evaluate(()=>__frameworkBulk.controllers[0].cancel());await state('canceled');await aborted(id,true);await lateIgnored(id);
     const retry=await begin(variant,'keyboard');await operate(retry,'resolve');await state('complete');
    });
    await step('runtime reduced motion snaps progress and cancellation rejects stale completion',async()=>{
     await choose(variant);const id=await begin(variant);await operate(id,'progress',78);
     await page.emulateMedia({reducedMotion:'reduce'});await progress(78);
     await operate(id,'progress',21);assert.equal(await page.evaluate(()=>__frameworkBulk.controllers[0].progress),21);await progress(21);
     assert.deepEqual(await root().evaluate(n=>n.getAnimations({subtree:true}).filter(a=>a.playState==='running').map(a=>a.animationName||'animation')),[]);
     await page.evaluate(()=>__frameworkBulk.controllers[0].cancel());await state('canceled');await aborted(id,true);await lateIgnored(id);await page.emulateMedia({reducedMotion:'no-preference'});
    });
    await step('two pending instances preserve separate action, signal and progress ownership',async()=>{
     await choose(variant);await page.evaluate(()=>__frameworkBulk.second(true));await ready('second');await watch('second');
     const first=await begin(variant),second=await begin(variant,'keyboard','second');assert.notEqual(first,second);
     assert.equal(await page.evaluate(()=>{const q=__frameworkBulk.feedback.requests;return q.at(-1).signal===q.at(-2).signal;}),false);
     await operate(first,'progress',31);await progress(31);assert.equal(await page.evaluate(()=>__frameworkBulk.controllers[1].progress),0);
     await page.evaluate(()=>__frameworkBulk.controllers[0].cancel());await state('canceled');await state('pending','second');await aborted(first,true);await aborted(second,false);
     await lateIgnored(first);await operate(second,'resolve');await state('complete','second');await state('canceled');await page.evaluate(()=>__frameworkBulk.second(false));await page.waitForFunction(()=>!document.querySelector('[data-bulk-slot=second]'));
    });
    await step('unmount during pending aborts and detached controller ignores late fulfillment',async()=>{
     await choose(variant);const id=await begin(variant);await page.evaluate(()=>{window.__feedbackDetached=__frameworkBulk.controllers[0];__frameworkBulk.show(false);});
     await page.waitForFunction(()=>!document.querySelector('[data-bulk-slot=first] [data-sl-react]'));await aborted(id,true);await lateIgnored(id);
     assert.equal(await page.evaluate(()=>__feedbackDetached.run('start')),false);
     const before=await page.evaluate(()=>__frameworkBulk.ready);await page.evaluate(()=>__frameworkBulk.show(true));await page.waitForFunction(n=>__frameworkBulk.ready>n,before);await ready();await state(initial(variant));
     const retry=await begin(variant);await operate(retry,'resolve');await state('complete');
    });
   }catch(error){check.issues.push({message:error.message,stack:error.stack});await page.screenshot({path:resolve(out,framework+'-'+variant+'-failure.png')});}
   await flush();
  }
 }
}finally{await browser.close();report.finished=new Date().toISOString();await flush();}
const summary={checks:report.checks.length,failures:report.checks.filter(c=>c.issues.length).length,errors:report.errors.length,external:report.external.length};console.log(JSON.stringify(summary));
if(Object.values(summary).slice(1).some(Boolean))process.exitCode=1;
