import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdir,mkdtemp,readFile,rm,realpath} from 'node:fs/promises';
import {join,resolve,sep} from 'node:path';
import {tmpdir} from 'node:os';
import {generateVariant} from '../frameworks/generate.mjs';
import {reactExample} from '../frameworks/examples.mjs';

test('additive framework pilot keeps vanilla and supplies actual React/Next entry files',async()=>{
 const scratch=resolve(process.env.SL_UI_FRAMEWORK_TEST_ROOT||tmpdir(),'scratch');await mkdir(scratch,{recursive:true});
 const target=await mkdtemp(join(scratch,'sl-framework-'));
 try{for(const variant of ['like','pair','confirm-overlay']){const packageRoot=new URL('../public/packages/'+variant+'/',import.meta.url),result=await generateVariant({packageRoot,variant,targetRoot:target});assert.equal(result.kind,'react-adapter');assert.equal(result.rendering,'client-widget');for(const file of ['Component.jsx','NextClient.jsx','react-controller.mjs','react-font.mjs','react-example.jsx','next-page.jsx','framework.json','framework-usage.md'])assert.ok((await readFile(join(target,variant,file),'utf8')).length>0);assert.deepEqual(await readFile(join(target,variant,'instrument-sans-variable.woff2')),await readFile(new URL('instrument-sans-variable.woff2',packageRoot)));assert.match(await readFile(join(target,variant,'NextClient.jsx'),'utf8'),/^['"]use client['"]/);assert.doesNotMatch(await readFile(join(target,variant,'Component.jsx'),'utf8'),/<iframe|srcDoc|dangerouslySetInnerHTML/);const usage=await readFile(join(target,variant,'framework-usage.md'),'utf8');for(const file of result.required)assert.ok(usage.includes(file),'Missing documented companion: '+file);}}
 finally{const actual=await realpath(target),allowed=(await realpath(scratch))+sep;if(!actual.startsWith(allowed))throw new Error('Refusing cleanup outside framework scratch root');await rm(actual,{recursive:true,force:true});}
});

test('legacy Feedback simulation is explicit example-only wiring',async()=>{
 const component=await readFile(new URL('../frameworks/Component.jsx',import.meta.url),'utf8');
 assert.doesNotMatch(component,/data-demo|localFeedbackOperation|bindLocalFeedbackControls/);
 for(const variant of ['toast','undo','stack','alert','connection','linear','circular','skeleton','loading','retry'].map(name=>name+'-feedback')){
  const example=reactExample(variant);assert.match(example,/bindLocalFeedbackControls/);assert.match(example,/life\.abort\(\)/);assert.match(example,/binding\.current\?\.destroy\(\)/);assert.match(example,/signal\.removeEventListener\('abort',abort\)/);assert.match(example,/No server operation was performed/);
 }
 assert.doesNotMatch(reactExample('pair'),/bindLocalFeedbackControls|localFeedbackOperation/);
});
