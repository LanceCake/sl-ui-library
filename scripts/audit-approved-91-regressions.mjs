import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {pathToFileURL,fileURLToPath} from 'node:url';
import {resolve,isAbsolute} from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';

const sourceRoot=fileURLToPath(new URL('../',import.meta.url));
const workspace=process.env.SL_UI_FRAMEWORK_RUNTIME;
if(!isAbsolute(workspace||''))throw new Error('Set SL_UI_FRAMEWORK_RUNTIME to an absolute private QA runtime.');
const out=workspace+'/approved-functional/regressions';
const inventory=JSON.parse(await readFile(new URL('../release-tools/approved-91.json',import.meta.url),'utf8')).approved;
const keys=['profile','contact','password','twofactor','passkeys','visibility','addresses'];
const literal='<b>Анна 日本語 😀</b>';
export async function regenerateAffected(){
 const {promoteFamily}=await import('../release-tools/promote-91.mjs');
 const esbuild=await import(pathToFileURL(workspace+'/node_modules/esbuild/lib/main.js'));
 const generated=[];
 for(const target of ['approved-qa','release-candidate'])for(const family of ['core','services','extensions','next']){
  const entries=await promoteFamily(family,{sourceRoot,targetRoot:workspace+'/'+target,esbuild});
  generated.push({target,family,count:entries.length});
 }
 await mkdir(out,{recursive:true});await writeFile(out+'/regenerated.json',JSON.stringify(generated,null,2));return generated;
}
export async function verifyAffected(){
 const names=['buttons.js','buttons.css','index.html','example.js','instrument-sans-variable.woff2','OFL.txt','LICENSE'];
 const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
 const report={targets:['approved-qa','release-candidate'],packages:[],registries:{}};
 for(const target of report.targets)report.registries[target]=hash(await readFile(workspace+'/'+target+'/public/preview-data.js'));
 for(const entry of inventory.filter(e=>['account-core','account-services','account-extensions','next-twenty'].includes(e.batch))){
  const files={};for(const name of names){const buffers=await Promise.all(report.targets.map(target=>readFile(workspace+'/'+target+'/public/packages/'+entry.variants[0]+'/'+name)));assert.deepEqual(buffers[0],buffers[1],entry.variants[0]+'/'+name+' differs between targets');files[name]=hash(buffers[0]);}
  report.packages.push({variant:entry.variants[0],files});
 }
 await mkdir(out,{recursive:true});await writeFile(out+'/fixture-verification.json',JSON.stringify(report,null,2)+'\n');return {packages:report.packages.length,matchingFiles:report.packages.length*names.length,registries:report.registries};
}

export async function runRegressions(label='current',target='approved-qa'){
 await mkdir(out,{recursive:true});
 const report={label,target,started:new Date().toISOString(),cases:[],errors:[],external:[]};
 const save=()=>writeFile(out+'/'+label+'.json',JSON.stringify(report,null,2)+'\n');
 const server=spawn(process.execPath,['scripts/serve-approved-qa.mjs',workspace+'/'+target+'/public','4357'],{cwd:sourceRoot,env:{...process.env,TEMP:out,TMP:out},windowsHide:true,stdio:['ignore','pipe','pipe']});
 let browser;
 try{
  await new Promise((yes,no)=>{server.stdout.once('data',yes);server.once('error',no);server.once('exit',code=>no(new Error('Owned server exited '+code)));});
  if(!isAbsolute(process.env.SL_UI_PLAYWRIGHT_MODULE||''))throw new Error('Set an absolute installed SL_UI_PLAYWRIGHT_MODULE.');
  const pw=await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE));
  browser=await(pw.chromium??pw.default.chromium).launch({channel:'msedge',headless:true,env:{...process.env,TEMP:out,TMP:out}});
  const page=await browser.newPage({viewport:{width:520,height:1100}});page.setDefaultTimeout(4000);
  page.on('pageerror',error=>report.errors.push(error.message));
  await page.route('**/*',route=>{const url=route.request().url();if(!url.startsWith('http://127.0.0.1:4357/')&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push(url);return route.abort();}return route.continue();});
  const settle=async()=>{await page.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await page.waitForFunction(()=>{const roots=[document];for(let i=0;i<roots.length;i++)for(const n of roots[i].querySelectorAll('*'))if(n.shadowRoot)roots.push(n.shadowRoot);return roots.flatMap(r=>r.getAnimations?.({subtree:true})||[]).every(a=>['finished','idle'].includes(a.playState));});};
  const run=async(name,fn)=>{const item={name,pass:false};report.cases.push(item);try{await fn(item);item.pass=true;}catch(error){item.error=error.message;}await save();};
  const entry=key=>inventory.find(e=>e.batch==='account-core'&&e.key===key);
  const root=()=>page.locator('.sl-component').first();
  const state=()=>page.evaluate(()=>qaController.state);
  const focus=()=>page.evaluate(()=>{let n=document.activeElement;while(n?.shadowRoot?.activeElement)n=n.shadowRoot.activeElement;return {tag:n?.tagName,label:n?.getAttribute('aria-label')||n?.textContent?.slice(0,60),root:document.querySelector('.account-control')===n,group:n?.getAttribute('role'),name:n?.getAttribute('aria-label'),visible:n?.matches(':focus-visible'),outline:getComputedStyle(n).outlineWidth};});
  const load=async key=>{await page.goto('http://127.0.0.1:4357/packages/'+entry(key).variants[0]+'/index.html');await page.evaluate(()=>document.fonts.ready);await settle();};
  const mount=async()=>{await page.evaluate(()=>{window.qaCalls=[];window.qaSignal=null;window.qaResolve=null;window.qaReject=null;window.qaController=SLComponent.mount(document.querySelector('.sl-component'),{onAction:(request,{signal})=>{qaCalls.push(structuredClone(request));window.qaSignal=signal;return new Promise((resolve,reject)=>{window.qaResolve=resolve;window.qaReject=reject;});}});});await settle();};
  const prepare=async key=>{const r=root(),F=(name,value=literal)=>r.getByLabel(name,{exact:true}).fill(value),C=name=>r.getByRole('button',{name,exact:true}).click();switch(key){
   case 'profile':await F('Full name');return 'Save';
   case 'contact':await F('New address','qa@example.test');return 'Continue';
   case 'password':await F('Current password','current-private');await F('New password','next-private');await F('Repeat new password','next-private');return 'Change password';
   case 'twofactor':await C('Connect');await F('Verification code','123456');return 'Confirm';
   case 'passkeys':await C('Add passkey');await F('Passkey name');return 'Save';
   case 'visibility':{const c=r.getByRole('checkbox').first();await c.setChecked(!await c.isChecked());return 'Apply';}
   case 'addresses':return 'Primary: Work';
   case 'sessions':await C('End session: Phone');return 'End session';
   case 'connections':return 'Connect Google';
   case 'recovery':return 'Show codes';
  }};
  const begin=async key=>{await mount();const name=await prepare(key),b=root().getByRole('button',{name,exact:true});await b.focus();assert.equal((await focus()).tag,'BUTTON');await page.keyboard.press('Enter');await page.waitForFunction(()=>qaController.state.pending);assert.equal(await b.isDisabled(),true);await b.evaluate(n=>n.click());assert.equal(await page.evaluate(()=>qaCalls.length),1,'Disabled pending action must suppress duplicate invocation');await settle();return b;};
  const complete=async()=>{await page.evaluate(()=>qaResolve({ok:true,id:'qa-created',challengeId:'qa-challenge'}));await settle();};
  for(const key of keys){await load(key);
   await run(key+' keyboard pending Escape',async c=>{await begin(key);c.focus=await focus();c.pendingState=await state();if(key==='profile')await page.screenshot({path:out+'/'+label+'-profile-pending.png',fullPage:true,scale:'css'});await page.keyboard.press('Escape');c.aborted=await page.evaluate(()=>qaSignal.aborted);assert.equal(c.aborted,true,'First Escape must abort pending native-button operation');assert.equal(c.focus.root,true,'Pending native button must park inside owning root');assert.equal(c.focus.group,'group');assert.ok(c.focus.name);assert.equal(c.focus.visible,true);assert.ok(parseFloat(c.focus.outline)>=2);await settle();assert.equal((await state()).pending,false);assert.equal((await focus()).tag,'BUTTON','Canceled operation should return focus to an enabled owner control');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>qaCalls.length),1);const after=await state();await complete();assert.deepEqual(await state(),after,'Late success changed canceled state');});
   for(const mode of ['reject','positive','external-positive','external-reject','external-cancel','external-reset','external-destroy','reset','destroy'])await run(key+' '+mode,async c=>{await begin(key);const before=await state(),operation=mode.replace('external-','');
    if(mode.startsWith('external'))await page.evaluate(()=>{let b=document.querySelector('#qa-external');if(!b){b=document.createElement('button');b.id='qa-external';b.textContent='External action';document.body.append(b);}b.focus();});
    if(operation==='reject'){await page.evaluate(()=>qaReject(new Error('Rejected by QA')));await settle();assert.equal((await state()).pending,false);if(mode==='external-reject')assert.equal(await page.evaluate(()=>document.activeElement.id),'qa-external');else assert.equal((await focus()).tag,'BUTTON');assert.match(await root().locator('.ac-status').textContent(),/failed|unable|could not/i);}
    if(mode==='positive'||mode==='external-positive'){await complete();const after=await state();assert.equal(after.pending,false);assert.notDeepEqual(after,{...before,pending:false},'Positive callback must commit');assert.equal(await root().locator('b').count(),0);if(mode==='external-positive')assert.equal(await page.evaluate(()=>document.activeElement.id),'qa-external','Successful operation stole intentional external focus');else{c.completedFocus=await focus();if(['profile','password','visibility'].includes(key)){const b=root().getByRole('button',{name:key==='profile'?'Save':key==='password'?'Change password':'Apply',exact:true});assert.equal(await b.isDisabled(),true,'Successful clean workflow must retain disabled primary action');}}}
    if(['cancel','reset','destroy'].includes(operation)){await page.evaluate(op=>qaController[op](),operation);assert.equal(await page.evaluate(()=>qaSignal.aborted),true);const after=await state();await complete();assert.deepEqual(await state(),after,'Late completion changed canceled lifecycle state');if(mode.startsWith('external'))assert.equal(await page.evaluate(()=>document.activeElement.id),'qa-external');if(operation==='destroy')assert.equal(await root().locator('*').count(),0);}
   });
  }
  for(const key of ['sessions','connections','recovery']){await load(key);await run(key+' existing keyboard cancellation',async c=>{await begin(key);c.focus=await focus();await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>qaSignal.aborted),true);await settle();const after=await state();await complete();assert.deepEqual(await state(),after);});}
  await load('profile');await run('profile detached root cannot resurrect or steal external focus',async()=>{await begin('profile');await page.evaluate(()=>{window.qaDetachedRoot=document.querySelector('.sl-component');qaDetachedRoot.remove();const b=document.createElement('button');b.id='qa-detached-external';b.textContent='Outside';document.body.append(b);b.focus();});await complete();assert.equal(await page.locator('.sl-component').count(),0);assert.equal(await page.evaluate(()=>qaDetachedRoot.isConnected),false);assert.equal(await page.evaluate(()=>document.activeElement.id),'qa-detached-external');await page.evaluate(()=>qaController.destroy());});
  await load('profile');await run('profile independent second-instance Escape and completion',async()=>{await begin('profile');await page.evaluate(()=>{const n=document.createElement('section');n.id='qa-second';document.body.append(n);window.qaSecond=SLComponent.mountPreview(n);});const second=page.locator('#qa-second');await second.getByLabel('Full name',{exact:true}).fill('Second 日本語');await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>qaSignal.aborted),false);await complete();assert.equal(await second.getByLabel('Full name',{exact:true}).evaluate(n=>n.getRootNode().activeElement===n),true);await second.getByRole('button',{name:'Save',exact:true}).click();assert.equal(await page.evaluate(()=>qaSecond.state.saved.name),'Second 日本語');await page.evaluate(()=>{qaSecond.destroy();document.querySelector('#qa-second').remove();});});
  const cart=inventory.find(e=>e.batch==='next-twenty'&&e.key==='cart');await page.goto('http://127.0.0.1:4357/packages/'+cart.variants[0]+'/index.html');await page.evaluate(()=>document.fonts.ready);await settle();
  for(const phase of ['resting','changed']){if(phase==='changed'){await root().getByRole('button',{name:'Increase quantity',exact:true}).first().click();await root().getByRole('button',{name:'Remove',exact:true}).first().click();await root().getByRole('button',{name:'Restore items',exact:true}).click();}
   for(const width of [226,320,1440])await run('cart '+phase+' '+width,async c=>{await page.setViewportSize({width,height:1100});await settle();c.bounds=await root().evaluate(n=>{const r=n.getBoundingClientRect();return {width:r.width,scroll:n.scrollWidth,client:n.clientWidth,document:document.documentElement.scrollWidth,viewport:innerWidth,rows:[...n.querySelectorAll('.cart-item')].map(el=>{const b=el.getBoundingClientRect();return {width:b.width,left:b.left-r.left,right:b.right-r.right,scroll:el.scrollWidth,client:el.clientWidth};})};});if(width===226)await page.screenshot({path:out+'/'+label+'-cart-'+phase+'226.png',fullPage:true,scale:'css'});assert.ok(c.bounds.scroll<=c.bounds.client+1,JSON.stringify(c.bounds));assert.ok(c.bounds.rows.every(r=>r.left>=-.5&&r.right<=.5&&r.scroll<=r.client+1));assert.ok(c.bounds.document<=width+1);});
  }
 }finally{await browser?.close();server.kill();report.finished=new Date().toISOString();await save();}
 return report;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const mode=process.argv[2]||'current';if(mode==='regenerate')console.log(await regenerateAffected());else if(mode==='verify')console.log(await verifyAffected());else{const report=await runRegressions(mode,process.argv[3]||'approved-qa');console.log(JSON.stringify({cases:report.cases.length,failures:report.cases.filter(c=>!c.pass).length,errors:report.errors,external:report.external}));if(report.cases.some(c=>!c.pass)||report.errors.length||report.external.length)process.exitCode=1;}
}
