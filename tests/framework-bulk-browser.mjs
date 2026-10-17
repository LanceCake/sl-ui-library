// Integration matrix, not a substitute for each source family's scenario tests.
// Uses application-operation/clipboard stubs; never contacts an application backend.
import assert from 'node:assert/strict';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';

const runtime=process.env.SL_UI_FRAMEWORK_RUNTIME;
const playwright=process.env.SL_UI_PLAYWRIGHT_MODULE;
const shard=process.env.SL_UI_MATRIX_FRAMEWORK;
if(shard&&!['react','nextjs'].includes(shard))throw new Error('Only explicit react or nextjs matrix shard supported');
if(process.env.SL_UI_FRAMEWORK_BROWSER!=='1'||![runtime,playwright].every(p=>isAbsolute(p||'')))throw new Error('Explicit browser opt-in, absolute private runtime and Playwright module required.');
const names=JSON.parse(await readFile(resolve(runtime,'bulk-variants.json'),'utf8'));
assert.equal(names.length,390);
// These four already-reviewed vanilla controls have intentional fixed widths.
// Retaining them is not evidence of a React-only regression or226px support.
const sourceMinimum={bookmark:236,delete:248,share:240,follow:236};
const integrity=JSON.parse(await readFile(resolve(runtime,'framework-artifact-integrity.json'),'utf8')),controllerHashes=new Map(integrity.checks.map(c=>[c.variant,c.controllerHash]));
const runtimeHashes=new Map(integrity.checks.map(c=>[c.variant,c.runtimeHash]));
assert.equal(controllerHashes.size,390);
const out=resolve(runtime,'bulk-results');await mkdir(out,{recursive:true});
const pw=await import(pathToFileURL(playwright)),browser=await(pw.chromium??pw.default.chromium).launch({channel:'msedge',headless:true});
const report={runId:process.env.SL_UI_MATRIX_RUN_ID||null,started:new Date().toISOString(),scope:'390 additive client-widget exports in actual React StrictMode and production Next; generic lifecycle/input/geometry matrix, not exhaustive source-state verification',checks:[],errors:[],external:[],failures:[]};let active='';
const page=await browser.newPage({viewport:{width:768,height:1100}});page.setDefaultTimeout(4000);
page.on('pageerror',error=>report.errors.push({active,message:error.message}));
page.on('console',message=>{if(message.type()==='error')report.errors.push({active,message:message.text()});});
page.on('response',response=>{if(response.status()>=400)report.errors.push({active,message:response.status()+' '+response.url()});});
await page.route('**/*',route=>{const url=route.request().url();if(!/^http:\/\/127\.0\.0\.1:435[56]\//.test(url)&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push({active,url});return route.abort();}return route.continue();});
await page.addInitScript(()=>{window.open=()=>null;});
const first=()=>page.locator('[data-bulk-slot=first] [data-sl-react]');
// Some reviewed fields have their own nested ShadowRoot. Inertness belongs to
// composed ancestors, not just Element.closest() within the innermost root.
function interactiveElement(element){if(element.matches?.(':disabled'))return false;for(let n=element;n;n=n.parentElement||n.getRootNode()?.host){if(n.inert||n.hidden)return false;}return true;}
async function frames(){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));}
async function select(name,preview){const ready=await page.evaluate(()=>__frameworkBulk.ready);await page.evaluate(({name,preview})=>__frameworkBulk.select(name,preview),{name,preview});await page.waitForFunction(n=>__frameworkBulk.ready>n&&document.querySelector('[data-bulk-slot=first] [data-sl-react]')?.getAttribute('aria-busy')==='false',ready);await frames();const errors=await page.evaluate(()=>__frameworkBulk.events.filter(e=>e.type==='mount-error'));assert.deepEqual(errors,[]);}
async function observe(fn,arg){return first().evaluate((host,{source,arg})=>{const all=[];function visit(root){for(const element of root.querySelectorAll('*')){all.push(element);if(element.shadowRoot)visit(element.shadowRoot);}}visit(host);return (0,eval)('('+source+')')(host,all,arg);},{source:fn.toString(),arg});}
async function settle(){await frames();await page.waitForTimeout(100);}
async function geometry(){return observe((host,all)=>{
 const bounds=host.getBoundingClientRect(),overflow=all.filter(n=>{const r=n.getBoundingClientRect();return r.width>0&&(r.right>bounds.right+1||r.left<bounds.left-1);});
 return{documentOverflow:document.documentElement.scrollWidth>innerWidth+1,hostOverflow:host.scrollWidth>host.clientWidth+1,hostWidth:host.clientWidth,largest:all.filter(n=>n.checkVisibility?.({checkVisibilityCSS:true})).reduce((maximum,n)=>Math.max(maximum,n.getBoundingClientRect().right-bounds.left),0),onlyHiddenClosedMenu:overflow.length>0&&overflow.every(n=>!!n.closest('.menu-panel[inert][aria-hidden="true"]')),overflowNodes:overflow.map(n=>({tag:n.tagName,class:n.className?.baseVal??n.className,hidden:!!n.closest('.menu-panel[inert][aria-hidden="true"]')}))};
 });}
async function flush(){await writeFile(resolve(out,shard?'matrix-'+shard+'.json':'matrix.json'),JSON.stringify(report,null,2)+'\n');}
try{
 for(const [framework,url]of [['react','http://127.0.0.1:4355/bulk.html'],['nextjs','http://127.0.0.1:4356/bulk']].filter(([name])=>!shard||name===shard)){
  await page.goto(url);await page.waitForFunction(()=>window.__frameworkBulk&&document.querySelector('[data-sl-react]')?.getAttribute('aria-busy')==='false');
  for(const [index,variant]of names.entries()){
   active=framework+':'+variant;const check={framework,variant,controllerHash:controllerHashes.get(variant),runtimeHash:runtimeHashes.get(variant),passed:[],issues:[],geometry:[],typography:[],scopeNotes:[]};report.checks.push(check);
   const scenario=async(name,fn)=>{try{await fn();check.passed.push(name);}catch(error){check.issues.push({scenario:name,message:error.message});}};
   await scenario('normal mount and explicit local preview',async()=>{await select(variant,false);check.normalState=await page.evaluate(()=>JSON.stringify(__frameworkBulk.controllers[0]?.state)??null);if(variant.endsWith('-v11'))await select(variant,true);assert.ok(await observe((host,all)=>all.some(n=>['BUTTON','INPUT','TEXTAREA','SELECT','CANVAS','SVG'].includes(n.tagName)||(n.tagName!=='STYLE'&&n.childElementCount===0&&n.textContent.trim()))));});
   if(check.issues.length){await flush();continue;}
   await scenario('narrow host and document geometry',async()=>{
    for(const [viewport,width]of [[320,226],[320,272],[768,320],[1440,320]]){
     await page.setViewportSize({width:viewport,height:1100});await page.locator('[data-bulk-slot=first]').evaluate((n,width)=>n.style.width=width+'px',width);await settle();const measured=await geometry();check.geometry.push({viewport,width,...measured});assert.equal(measured.documentOverflow,false,JSON.stringify(check.geometry.at(-1)));
     if(sourceMinimum[variant]>width){check.scopeNotes.push('Original fixed-size source requires '+sourceMinimum[variant]+'px;226px host is unsupported, not reported as fitting.');assert.ok(measured.largest<=sourceMinimum[variant]+1);}
     else if(variant==='appearance-menu'){
      if(measured.hostOverflow){assert.equal(measured.onlyHiddenClosedMenu,true,JSON.stringify(measured));assert.ok(measured.largest<=width+1);check.scopeNotes.push('Closed translated menu contributes scroll extent only through positively identified hidden/inert descendants; open options are separately measured.');}
      await first().locator('[data-trigger]').click();await page.waitForFunction(()=>{const shadow=document.querySelector('[data-bulk-slot=first] [data-sl-react]')?.querySelector('div')?.shadowRoot;return shadow?.querySelector('[data-open="true"]')&&shadow.getAnimations({subtree:true}).every(a=>a.playState!=='running');});
      const opened=await geometry();check.geometry.push({viewport,width,state:'open',...opened});assert.equal(opened.hostOverflow,false,JSON.stringify(opened));assert.equal(await first().locator('[role=menuitemradio]').count(),3);await page.keyboard.press('Escape');await page.waitForFunction(()=>{const shadow=document.querySelector('[data-bulk-slot=first] [data-sl-react]')?.querySelector('div')?.shadowRoot;return shadow?.querySelector('.menu-panel')?.inert&&shadow.getAnimations({subtree:true}).every(a=>a.playState!=='running');});
     }else assert.equal(measured.hostOverflow,false,JSON.stringify(check.geometry.at(-1)));
    }
   });
   await page.setViewportSize({width:768,height:1100});await page.locator('[data-bulk-slot=first]').evaluate(n=>n.style.width='320px');await settle();
   await scenario('keyboard focus and typography inventory',async()=>{
    // Native disabled boundaries must not become enabled merely to satisfy a
    // generic focus probe. :disabled includes inherited fieldset disabling.
    const controls=first().locator('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href],[tabindex="0"]:not(:disabled)').filter({visible:true});
    for(const control of await controls.all()){if(!await control.evaluate(interactiveElement)||await control.evaluate(n=>n.tabIndex<0))continue;await control.focus();assert.equal(await control.evaluate(n=>n===n.getRootNode().activeElement),true);await page.keyboard.press('Tab');break;}
    check.typography=await observe((host,all)=>all.filter(n=>n.matches('button,input,textarea,select')&&n.checkVisibility?.({checkVisibilityCSS:true})&&!n.matches('input[type=checkbox],input[type=radio]')).map(n=>{const s=getComputedStyle(n),r=n.getBoundingClientRect();return{tag:n.tagName,name:n.getAttribute('aria-label')||n.textContent.trim().slice(0,80),font:s.fontFamily,size:s.fontSize,line:s.lineHeight,height:r.height};}));
   });
   await scenario('literal Unicode input and rapid local activation',async()=>{
    const fields=first().locator('input:not([type=file]):not([type=checkbox]):not([type=radio]):not([type=range]):not([type=number]):not([type=date]):not([type=time]):not([type=color]):not([readonly]):not([disabled]),textarea:not([readonly]):not([disabled])');
    check.inputs=[];for(let i=0;i<Math.min(await fields.count(),8);i++){const field=fields.nth(i);if(!await field.isVisible()||!await field.evaluate(interactiveElement))continue;const literal='<b>Анна 日本語 😀</b>',type=await field.getAttribute('type')||'text',mode=await field.getAttribute('inputmode'),restricted=type==='tel'||['numeric','decimal'].includes(mode),maximum=await field.evaluate(n=>n.maxLength),boldBefore=await first().locator('b').count();await field.fill(literal);const value=await field.inputValue();if(!restricted)assert.equal(value,maximum>=0?literal.slice(0,maximum):literal);assert.equal(await first().locator('b').count(),boldBefore,'Input must not create markup, including a native-maxlength truncated tag/payload.');if(restricted){const valid=(type==='tel'?'79991234567':'123456').slice(0,maximum>0?maximum:99);await field.fill(valid);assert.match(await field.inputValue(),/\d/);}check.inputs.push({type,mode,maxLength:maximum,literal:restricted?'Purpose-specific filtering, not unrestricted text':value,validInput:restricted?await field.inputValue():null});}
    const buttons=first().locator('button:not([disabled])').filter({visible:true});check.activated=[];
    // Two genuinely actionable clicks, then source-local rapid reversal. The
    // specialized source suites assert semantic outcomes; this probes wrappers.
    for(let i=0;i<Math.min(await buttons.count(),2);i++){const target=buttons.nth(i);if(!await target.isVisible()||!await target.evaluate(interactiveElement))continue;const label=(await target.getAttribute('aria-label'))||(await target.textContent()).trim().slice(0,80);try{await target.click({timeout:1200});check.activated.push(label);}catch(error){if(!/intercepts pointer|not stable|not visible|not enabled|outside of the viewport/.test(error.message))throw error;check.scopeNotes.push('Generic activation not actionable after prior state change: '+error.message.split('\n')[0]);}await page.keyboard.press('Escape');}
    await observe((host,all)=>{const button=all.find(n=>{if(n.tagName!=='BUTTON'||n.matches(':disabled')||!n.checkVisibility?.({checkVisibilityCSS:true}))return false;for(let p=n;p;p=p.parentElement||p.getRootNode()?.host)if(p.inert||p.hidden)return false;return true;});for(let i=0;i<12;i++)button?.click();});await page.keyboard.press('Escape');
   });
   await scenario('runtime reduced motion interruption',async()=>{await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(420);const running=await observe((host,all)=>{const roots=[host,...all.filter(n=>n.shadowRoot).map(n=>n.shadowRoot)];return roots.flatMap(n=>n.getAnimations?.({subtree:true})||[]).filter(a=>a.playState==='running').map(a=>({name:a.animationName||null,target:a.effect?.target?.tagName}));});check.reducedRunning=running;assert.deepEqual(running,[]);await page.emulateMedia({reducedMotion:'no-preference'});});
   await scenario('independent instances and cleanup/remount',async()=>{
    await select(variant,variant.endsWith('-v11'));await page.evaluate(()=>__frameworkBulk.second(true));await page.waitForFunction(()=>document.querySelector('[data-bulk-slot=second] [data-sl-react]')?.getAttribute('aria-busy')==='false');await settle();const before=await page.evaluate(()=>JSON.stringify(__frameworkBulk.controllers[1]?.state)??null);
    await observe((host,all)=>all.find(n=>{if(n.tagName!=='BUTTON'||n.matches(':disabled')||!n.checkVisibility?.({checkVisibilityCSS:true}))return false;for(let p=n;p;p=p.parentElement||p.getRootNode()?.host)if(p.inert||p.hidden)return false;return true;})?.click());const after=await page.evaluate(()=>JSON.stringify(__frameworkBulk.controllers[1]?.state)??null);assert.equal(after,before);
    await page.evaluate(()=>__frameworkBulk.show(false));await page.waitForSelector('[data-bulk-slot=first] [data-sl-react]',{state:'detached'});assert.equal(await page.locator('[data-bulk-slot=second] [data-sl-react]').count(),1);await page.evaluate(()=>__frameworkBulk.second(false));await page.waitForSelector('[data-sl-react]',{state:'detached'});assert.equal(await page.locator('head style[data-sl-ui-font]').count(),0);await page.evaluate(()=>__frameworkBulk.show(true));await page.waitForFunction(()=>document.querySelector('[data-sl-react]')?.getAttribute('aria-busy')==='false');
   });
   if(check.issues.length)await page.screenshot({path:resolve(out,framework+'-'+variant+'.png'),fullPage:true});
   if((index+1)%20===0||check.issues.length)console.log(framework+' '+(index+1)+'/'+names.length+' '+variant+': '+check.issues.length+' issues');
   await flush();
  }
 }
}finally{await browser.close();report.finished=new Date().toISOString();report.failures=report.checks.flatMap(c=>c.issues.map(issue=>({framework:c.framework,variant:c.variant,...issue})));await flush();}
console.log(JSON.stringify({checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,external:report.external.length}));
if(report.failures.length||report.errors.length||report.external.length)process.exitCode=1;
