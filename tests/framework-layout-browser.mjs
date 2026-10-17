// Focused actual React regression. Uses an in-memory bundle/server; never writes
// candidate sources, Next app files, or the frozen canonical matrix.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute,sep,extname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {compileController} from '../frameworks/controller-source.mjs';

const runtime=process.env.SL_UI_FRAMEWORK_RUNTIME,playwright=process.env.SL_UI_PLAYWRIGHT_MODULE;
if(process.env.SL_UI_FRAMEWORK_BROWSER!=='1'||![runtime,playwright].every(path=>isAbsolute(path||'')))throw new Error('Explicit private runtime, Playwright and browser opt-in required');
const sourceRoot=resolve(process.env.SL_UI_FRAMEWORK_SOURCE_ROOT||resolve(runtime,'release-candidate'));
const baseline=process.argv.includes('--baseline'),port=4360,origin='http://127.0.0.1:'+port;
const navigation=['tabs','views','steps','sections','breadcrumbs','pages','sidebar','carousel','dock','tree'].map(name=>name+'-navigation');
const displays=['metric','table','avatars','status','details','timeline','file','bar','donut','calendar'].map(name=>name+'-display');
const feedback=['copy','like','download','bookmark','playback','delete','upload','share','follow'];
const knownVariants=[...navigation,...displays,...feedback,'appearance-menu'];
const only=process.argv.find(argument=>argument.startsWith('--only='))?.slice(7);
const variants=only?only.split(','):knownVariants;
if(!variants.length||variants.some(variant=>!knownVariants.includes(variant)))throw new Error('Unknown focused layout variant');
const mode=baseline?'baseline':'fixed',out=resolve(runtime,'layout-results');
const report={mode,sourceRoot,started:new Date().toISOString(),checks:[],errors:[],external:[],controllers:[]};
const sources=new Map();
for(const variant of variants){
 const packageRoot=pathToFileURL(resolve(sourceRoot,'public/packages',variant)+'/');
 const source=baseline?await readFile(new URL('react-controller.mjs',packageRoot),'utf8'):await compileController(packageRoot,variant);
 sources.set(variant,source);report.controllers.push({variant,sha256:createHash('sha256').update(source).digest('hex')});
}
const component=await readFile(new URL('../frameworks/Component.jsx',import.meta.url),'utf8');
const font=await readFile(new URL('../frameworks/dom-font.mjs',import.meta.url),'utf8');
const callbacks=`{getText:()=> 'Local text',writeText:async()=>{},getFile:()=>({blob:new Blob(['Local file']),filename:'local.txt'}),handoff:async()=>{},onDelete:async()=>{},getUrl:()=> 'https://example.invalid/local',onShare:async()=>({label:'Local test'})}`;
const esbuild=await import(pathToFileURL(resolve(runtime,'node_modules/esbuild/lib/main.js')));
const bundle=await esbuild.build({stdin:{contents:`import React from 'react';import{createRoot}from'react-dom/client';${variants.map((variant,index)=>`import C${index} from 'layout-component:${variant}';`).join('')}const registry={${variants.map((variant,index)=>JSON.stringify(variant)+':C'+index).join(',')}};const root=createRoot(document.querySelector('main'));let key=0;window.__layout={ready:0,render(name){delete window.__layout.error;const C=registry[name];root.render(React.createElement(React.StrictMode,null,React.createElement(C,{key:++key,callbacks:${callbacks},onReady(controller){window.__layout.controller=controller;window.__layout.ready++},onError(error){window.__layout.error=error.message}})))}};`,resolveDir:runtime,sourcefile:'layout-entry.jsx',loader:'jsx'},bundle:true,format:'esm',write:false,jsx:'automatic',plugins:[{name:'layout-fixtures',setup(build){build.onResolve({filter:/^layout-(component|controller|font):/},args=>({path:args.path,namespace:'layout'}));build.onResolve({filter:/^\.\/react-(controller|font)\.mjs$/,namespace:'layout'},args=>({path:args.path.includes('controller')?'layout-controller:'+args.importer.split(':')[1]:'layout-font:shared',namespace:'layout'}));build.onLoad({filter:/.*/,namespace:'layout'},args=>({contents:args.path.startsWith('layout-component:')?component:args.path.startsWith('layout-controller:')?sources.get(args.path.split(':')[1]):font,loader:args.path.startsWith('layout-component:')?'jsx':'js',resolveDir:runtime}));}}]});
const server=createServer(async(request,response)=>{
 try{
  const pathname=new URL(request.url,origin).pathname;
  if(pathname==='/'){response.setHeader('Content-Type','text/html');return response.end('<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="icon" href="data:,"></head><body style="margin:0"><main style="width:226px"></main><script type="module" src="/bundle.js"></script></body></html>');}
  if(pathname==='/bundle.js'){response.setHeader('Content-Type','text/javascript');return response.end(bundle.outputFiles[0].contents);}
  const relative=pathname==='/instrument-sans-variable.woff2'?'copy/instrument-sans-variable.woff2':decodeURIComponent(pathname.replace(/^\/packages\//,''));
  const base=resolve(sourceRoot,'public/packages'),file=resolve(base,relative);
  if(!file.startsWith(base+sep))throw new Error('Invalid package request');
  response.setHeader('Content-Type',({'.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.html':'text/html','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');response.end(await readFile(file));
 }catch(error){response.statusCode=404;response.end(error.message);}
});
let browser;
await new Promise((resolveListen,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolveListen);});
try{
 const pw=await import(pathToFileURL(playwright));browser=await(pw.chromium??pw.default.chromium).launch({channel:'msedge',headless:true});
 const page=await browser.newPage({viewport:{width:320,height:1100}});
 page.setDefaultTimeout(5000);
 page.on('pageerror',error=>report.errors.push(error.message));
 await page.route('**/*',route=>{const url=route.request().url();if(!url.startsWith(origin+'/')&&!url.startsWith('data:')&&!url.startsWith('blob:')){report.external.push(url);return route.abort();}return route.continue();});
 await page.goto(origin);await page.waitForFunction(()=>window.__layout);
 async function settle(){await page.evaluate(()=>document.fonts.ready);await page.waitForFunction(()=>[...document.querySelectorAll('[data-sl-react]>div')].every(host=>!host.shadowRoot||host.shadowRoot.getAnimations().filter(animation=>animation.effect?.getTiming().iterations!==Infinity).every(animation=>animation.playState!=='running')));await page.evaluate(()=>new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done))));}
 const host=()=>page.locator('[data-sl-react]>div');
 async function select(variant,width){await page.locator('main').evaluate((node,width)=>node.style.width=width+'px',width);const ready=await page.evaluate(()=>__layout.ready);await page.evaluate(variant=>__layout.render(variant),variant);await page.waitForFunction(ready=>__layout.ready>ready||__layout.error,ready);assert.equal(await page.evaluate(()=>__layout.error),undefined);await settle();}
 async function geometry(){return host().evaluate(host=>{const root=host.shadowRoot.querySelector('.nav-demo,.dd-demo,.menu-demo'),bounds=host.getBoundingClientRect(),rect=root.getBoundingClientRect();const visible=[...root.querySelectorAll('button,input,select,textarea,a[href],[tabindex],[role="tab"],[role="treeitem"],h3,p')].filter(node=>node.checkVisibility({checkVisibilityCSS:true,checkOpacity:true})&&!node.closest('[inert],[aria-hidden="true"]'));return{hostWidth:bounds.width,rootWidth:rect.width,rootLeft:rect.left-bounds.left,rootRight:rect.right-bounds.left,hostOverflow:host.scrollWidth>host.clientWidth+1,documentOverflow:document.documentElement.scrollWidth>innerWidth+1,controls:visible.map(node=>{const r=node.getBoundingClientRect();let left=r.left,right=r.right;for(let parent=node.parentElement;parent&&parent!==root;parent=parent.parentElement){const s=getComputedStyle(parent);if(['hidden','clip','auto','scroll'].includes(s.overflowX)){const clip=parent.getBoundingClientRect();left=Math.max(left,clip.left);right=Math.min(right,clip.right);}}return{tag:node.tagName,label:(node.getAttribute('aria-label')||node.textContent).trim().slice(0,80),left:left-bounds.left,right:right-bounds.left};})};});}
 for(const variant of variants.filter(variant=>!feedback.includes(variant)))for(const width of [226,272,320]){
  const check={variant,width,issues:[],states:[]};report.checks.push(check);
  try{
   await page.setViewportSize({width:width===320?768:320,height:1100});await select(variant,width);
   async function fit(state){await settle();const measured=await geometry();check.states.push({state,...measured});assert.ok(measured.rootWidth<=width+1,JSON.stringify(measured));assert.equal(measured.documentOverflow,false);for(const control of measured.controls)assert.ok(control.left>=-1&&control.right<=width+1,JSON.stringify(control));if(variant!=='appearance-menu')assert.equal(measured.hostOverflow,false);}
   await fit('rest');
   const rootHost=host();
   if(displays.includes(variant))assert.equal(await rootHost.locator('.dd-demo').evaluate(node=>getComputedStyle(node).containerType),'inline-size');
   if(variant==='donut-display')assert.equal(await rootHost.locator('.dd-donut').evaluate(node=>node.getBoundingClientRect().width),width<=290?100:130);
   if(variant==='appearance-menu'){
    const panel=rootHost.locator('[role="menu"]');assert.equal(await panel.getAttribute('aria-hidden'),'true');assert.equal(await panel.evaluate(node=>node.inert),true);
    await rootHost.locator('[aria-haspopup="menu"]').click();await fit('open');assert.equal(await panel.getAttribute('aria-hidden'),'false');
    await page.keyboard.press('Escape');await fit('closed');
    await rootHost.locator('[aria-haspopup="menu"]').evaluate(node=>{for(let i=0;i<8;i++)node.click();});await fit('rapid reversal');
   }else if(variant==='tree-navigation'){
    const branch=rootHost.locator('[data-branch="0"]');await branch.focus();await page.keyboard.press('ArrowLeft');await fit('branch closed');assert.equal(await branch.getAttribute('aria-expanded'),'false');
    await page.keyboard.press('ArrowRight');await fit('branch opened');assert.equal(await branch.getAttribute('aria-expanded'),'true');
    await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');await fit('file selected');assert.equal(await rootHost.locator('[data-file="0-0"]').getAttribute('aria-selected'),'true');
   }else if(variant==='carousel-navigation'){
    for(let index=0;index<3;index++){
     await rootHost.locator('[data-slide="'+index+'"]').click();await fit('slide '+index);
     const slides=await rootHost.locator('.collection-slide').evaluateAll(nodes=>nodes.map(node=>({inert:node.inert,hidden:node.getAttribute('aria-hidden')})));
     assert.equal(slides.length,3);slides.forEach((slide,position)=>assert.deepEqual(slide,{inert:position!==index,hidden:String(position!==index)}));
     const selected=await rootHost.locator('.collection-slide').nth(index).evaluate(node=>{const rect=node.getBoundingClientRect(),clip=node.closest('.collection-window').getBoundingClientRect();return{left:rect.left-clip.left,right:rect.right-clip.left,width:clip.width};});
     assert.ok(selected.left>=-1&&selected.right<=selected.width+1,JSON.stringify({index,...selected}));
    }
   }else{
    const buttons=rootHost.locator('button:not(:disabled)').filter({visible:true});
    for(let index=0;index<Math.min(await buttons.count(),3);index++){const button=buttons.nth(index);if(await button.isVisible()){await button.click();await fit('activation '+index);}}
   }
   const enabled=rootHost.locator('button:not(:disabled):not([inert] button)').filter({visible:true}).first();if(await enabled.count()){await enabled.focus();assert.equal(await enabled.evaluate(node=>node.getRootNode().activeElement===node),true);}
  }catch(error){check.issues.push(error.message);}
  console.log(mode+' '+variant+' '+width+': '+check.issues.length+' issues');
 }
 for(const variant of variants.filter(variant=>feedback.includes(variant))){
  const check={variant,kind:'feedback',issues:[]};report.checks.push(check);
  try{
   await select(variant,320);
   const status=host().locator('.'+variant+'-feedback');await status.evaluate(node=>node.textContent='Local status message');
   check.style=await status.evaluate(node=>{const style=getComputedStyle(node);return Object.fromEntries(['fontSize','lineHeight','color','textAlign','marginTop','marginBottom','position'].map(name=>[name,style[name]]));});
   assert.deepEqual(check.style,{fontSize:'12px',lineHeight:'18px',color:'rgb(84, 84, 84)',textAlign:'center',marginTop:'0px',marginBottom:'0px',position:'static'});
  }catch(error){check.issues.push(error.message);}
  console.log(mode+' '+variant+' status: '+check.issues.length+' issues');
 }
}finally{
 await browser?.close();await new Promise(done=>server.close(done));report.finished=new Date().toISOString();await mkdir(out,{recursive:true});await writeFile(resolve(out,mode+(only?'-'+only.replaceAll(',','_'):'')+'.json'),JSON.stringify(report,null,2)+'\n');
}
const failures=report.checks.filter(check=>check.issues.length);console.log(JSON.stringify({mode,checks:report.checks.length,failures:failures.map(check=>({variant:check.variant,width:check.width,issues:check.issues})),errors:report.errors,external:report.external},null,2));
if(failures.length||report.errors.length||report.external.length)process.exitCode=1;
