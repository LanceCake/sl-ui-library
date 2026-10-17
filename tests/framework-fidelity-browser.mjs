// Compare rendered typography and original inline SVG geometry with standalone
// sources. No screenshot similarity score is misrepresented as visual approval.
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const runtime=process.env.SL_UI_FRAMEWORK_RUNTIME,playwright=process.env.SL_UI_PLAYWRIGHT_MODULE;
if(process.env.SL_UI_FRAMEWORK_BROWSER!=='1'||![runtime,playwright].every(p=>isAbsolute(p||'')))throw new Error('Explicit private browser environment required');
const variants=JSON.parse(await readFile(resolve(runtime,'bulk-variants.json'),'utf8')),out=resolve(runtime,'fidelity-results');await mkdir(out,{recursive:true});
const integrity=JSON.parse(await readFile(resolve(runtime,'framework-artifact-integrity.json'),'utf8')),controllerHashes=new Map(integrity.checks.map(c=>[c.variant,c.controllerHash]));
const runtimeHashes=new Map(integrity.checks.map(c=>[c.variant,c.runtimeHash]));
assert.equal(controllerHashes.size,390);
const pw=await import(pathToFileURL(playwright)),browser=await(pw.chromium??pw.default.chromium).launch({channel:'msedge',headless:true}),context=await browser.newContext({viewport:{width:768,height:1100}}),source=await context.newPage(),react=await context.newPage();
const report={started:new Date().toISOString(),scope:'Initial rendered controls: source typography/style metrics and inline SVG geometry, source versus actual React; meaningful interactions tested separately',checks:[],errors:[],external:[]};let active='';
for(const page of[source,react]){page.on('pageerror',error=>report.errors.push({active,message:error.message}));await page.route('**/*',route=>{const url=route.request().url();if(!/^http:\/\/127\.0\.0\.1:435[58]\//.test(url)&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push({active,url});return route.abort();}return route.continue();});}
function fingerprint(scope){
 const nodes=[];function visit(root){for(const n of root.querySelectorAll('*')){if(n.closest?.('.example-note'))continue;nodes.push(n);if(n.shadowRoot)visit(n.shadowRoot);}}visit(scope);
 const controls=nodes.filter(n=>n.matches('button,input,textarea,select,label')&&n.checkVisibility({checkVisibilityCSS:true}));
 return {controls:controls.map(n=>{const style=getComputedStyle(n);return{tag:n.tagName,type:n.type||'',name:n.getAttribute('aria-label')||n.getAttribute('placeholder')||n.getAttribute('name')||n.textContent.trim().replace(/\s+/g,' ').slice(0,100),style:Object.fromEntries(['fontFamily','fontSize','fontWeight','lineHeight','color','backgroundColor','borderRadius','paddingTop','paddingRight','paddingBottom','paddingLeft','textAlign'].map(key=>[key,style[key]]))};}),svg:nodes.filter(n=>n.matches('svg path,svg circle,svg rect,svg line,svg polyline,svg polygon,svg ellipse')).map(n=>({tag:n.tagName,geometry:Object.fromEntries([...n.attributes].filter(a=>['d','cx','cy','r','x','y','x1','y1','x2','y2','width','height','points','rx','ry','viewBox'].includes(a.name)).map(a=>[a.name,a.value]))}))};
}
async function settled(page){
 await page.waitForFunction(()=>{const roots=[document];function visit(root){for(const n of root.querySelectorAll('*'))if(n.shadowRoot){roots.push(n.shadowRoot);visit(n.shadowRoot);}}visit(document);return roots.flatMap(root=>root.getAnimations()).filter(animation=>animation.effect?.getTiming().iterations!==Infinity).every(animation=>animation.playState!=='running');},null,{timeout:6000});
 await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
}
try{
 await react.goto('http://127.0.0.1:4355/bulk.html');await react.waitForFunction(()=>window.__frameworkBulk);
 for(const[index,variant]of variants.entries()){
  active=variant;const check={variant,controllerHash:controllerHashes.get(variant),runtimeHash:runtimeHashes.get(variant),issues:[]};report.checks.push(check);
  try{
   const ready=await react.evaluate(()=>__frameworkBulk.ready);await react.evaluate(variant=>__frameworkBulk.select(variant,variant.endsWith('-v11')),variant);await react.waitForFunction(n=>__frameworkBulk.ready>n,ready);
   await source.goto('http://127.0.0.1:4358/packages/'+variant+'/index.html');await source.evaluate(async()=>{Object.assign(document.body.style,{width:'320px',margin:'0',padding:'0',display:'block'});await document.fonts.ready;});
   await react.evaluate(()=>document.fonts.ready);await Promise.all([source,react].map(settled));
   const expected=await source.locator('body').evaluate(fingerprint),actual=await react.locator('[data-bulk-slot=first] [data-sl-react]').evaluate(fingerprint);
   check.controlCount={source:expected.controls.length,react:actual.controls.length};check.svgCount={source:expected.svg.length,react:actual.svg.length};
   // Keep differences verbatim for diagnosis rather than omitting controls with
   // inconvenient measurements or claiming an unexplained visual match.
   if(JSON.stringify(actual.controls)!==JSON.stringify(expected.controls))check.issues.push({kind:'control-style-or-markup',source:expected.controls,react:actual.controls});
   if(JSON.stringify(actual.svg)!==JSON.stringify(expected.svg))check.issues.push({kind:'svg-geometry',source:expected.svg,react:actual.svg});
  }catch(error){check.issues.push({kind:'runner',message:error.message});}
  await writeFile(resolve(out,'fidelity.json'),JSON.stringify(report,null,2)+'\n');if((index+1)%25===0||check.issues.length)console.log('Fidelity '+(index+1)+'/'+variants.length+' '+variant+': '+check.issues.length+' differences');
 }
}finally{await browser.close();report.finished=new Date().toISOString();await writeFile(resolve(out,'fidelity.json'),JSON.stringify(report,null,2)+'\n');}
const differences=report.checks.filter(c=>c.issues.length);console.log(JSON.stringify({variants:report.checks.length,differences:differences.map(c=>c.variant),errors:report.errors.length,external:report.external.length}));
assert.equal(report.errors.length,0);assert.equal(report.external.length,0);assert.equal(differences.length,0,'Inspect recorded source-versus-framework differences before publication.');
