import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,writeFile,rm,realpath} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join,sep} from 'node:path';
import {pathToFileURL} from 'node:url';
import {compileController} from '../frameworks/controller-source.mjs';

const navigation=['tabs','views','steps','sections','breadcrumbs','pages','sidebar','carousel','dock','tree'].map(name=>name+'-navigation');
const displays=['metric','table','avatars','status','details','timeline','file','bar','donut','calendar'].map(name=>name+'-display');
const root=variant=>new URL('../public/packages/'+variant+'/',import.meta.url);
const cssOf=source=>JSON.parse(source.match(/const sourceCSS=(.*);\n/)[1]);

test('legacy button feedback retains source typography and margins with local flow positioning',async()=>{
 for(const variant of ['copy','like','download','bookmark','playback','delete','upload','share','follow']){
  const original=await readFile(new URL('buttons.css',root(variant)),'utf8');
  assert.equal(cssOf(await compileController(root(variant),variant)),original+'\n.'+variant+'-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}',variant);
 }
});

test('legacy navigation preserves source CSS and adds only the reviewed host width bound',async()=>{
 for(const variant of navigation){
  const original=await readFile(new URL('buttons.css',root(variant)),'utf8');
  assert.equal(cssOf(await compileController(root(variant),variant)),original+'\n.nav-demo{max-width:100%}',variant);
 }
});

test('legacy displays preserve the exact inline source container dependency after source CSS',async()=>{
 for(const variant of displays){
  const original=await readFile(new URL('buttons.css',root(variant)),'utf8');
  assert.equal(cssOf(await compileController(root(variant),variant)),original+'\n.dd-demo{width:min(320px,100%);container-type:inline-size}',variant);
 }
});

test('other families retain their CSS without a new blanket container or clipping rule',async()=>{
 for(const variant of ['appearance-menu','inputs-color-v11','navigation-drill-down-v11','navigation-history-v11','navigation-reference-return-v11']){
  assert.equal(cssOf(await compileController(root(variant),variant)),await readFile(new URL('buttons.css',root(variant)),'utf8'),variant);
 }
});

for(const selector of ['.other .dd-demo','.other,.dd-demo'])test('display head grammar rejects changed selector '+selector,async()=>{
 const scratchBase=await realpath(process.env.SL_UI_FRAMEWORK_TEST_ROOT||tmpdir());
 const scratch=await mkdtemp(join(scratchBase,'sl-layout-selector-'));
 try{
  const original=root('donut-display');
  for(const file of ['buttons.css','buttons.js'])await writeFile(join(scratch,file),await readFile(new URL(file,original),'utf8'));
  const html=await readFile(new URL('index.html',original),'utf8');
  await writeFile(join(scratch,'index.html'),html.replace('.dd-demo{width:min(320px,100%);container-type:inline-size}',selector+'{width:min(320px,100%);container-type:inline-size}'));
  await assert.rejects(compileController(pathToFileURL(scratch+'/'),'donut-display'),/Unrecognized display head layout dependency/);
 }finally{const actual=await realpath(scratch);if(!actual.startsWith(scratchBase+sep))throw new Error('Refusing cleanup outside layout scratch');await rm(actual,{recursive:true,force:true});}
});

test('reviewed layout extraction rejects missing, duplicated or changed source dependencies',async()=>{
 const scratchBase=await realpath(process.env.SL_UI_FRAMEWORK_TEST_ROOT||tmpdir());
 const scratch=await mkdtemp(join(scratchBase,'sl-layout-'));
 const fixture=pathToFileURL(scratch+'/');
 try{
  const html=await readFile(new URL('index.html',root('donut-display')),'utf8');
  const css=await readFile(new URL('buttons.css',root('donut-display')),'utf8');
  await writeFile(join(scratch,'buttons.css'),css);
  await writeFile(join(scratch,'buttons.js'),await readFile(new URL('buttons.js',root('donut-display')),'utf8'));
  const rule='.dd-demo{width:min(320px,100%);container-type:inline-size}';
  for(const replacement of ['',rule+rule,rule.replace('inline-size','size'),rule.replace('320px','321px'),'@media(min-width:1px){'+rule+'}']){
   await writeFile(join(scratch,'index.html'),html.replace(rule,replacement));
   await assert.rejects(compileController(fixture,'donut-display'),/Unrecognized display head layout dependency/);
  }
  const navHTML=await readFile(new URL('index.html',root('tabs-navigation')),'utf8');
  const navCSS=await readFile(new URL('buttons.css',root('tabs-navigation')),'utf8');
  await writeFile(join(scratch,'index.html'),navHTML);
  for(const replacement of ['', '.nav-demo{width:min(320px,calc(100vw - 40px))}']){
   await writeFile(join(scratch,'buttons.css'),navCSS.replace('.nav-demo{width:min(320px,calc(100vw - 32px))}',replacement));
   await assert.rejects(compileController(fixture,'tabs-navigation'),/Unrecognized navigation scene layout/);
  }
  const feedbackHTML=await readFile(new URL('index.html',root('copy')),'utf8');
  await writeFile(join(scratch,'buttons.css'),await readFile(new URL('buttons.css',root('copy')),'utf8'));
  for(const changed of [feedbackHTML.replace('font-size: 12px','font-size: 13px'),feedbackHTML.replace('.copy-feedback {','.unknown-feedback {')]){
   await writeFile(join(scratch,'index.html'),changed);
   await assert.rejects(compileController(fixture,'copy'),/Unrecognized button feedback head layout dependency/);
  }
 }finally{const actual=await realpath(scratch);if(!actual.startsWith(scratchBase+sep))throw new Error('Refusing cleanup outside layout scratch');await rm(actual,{recursive:true,force:true});}
});
