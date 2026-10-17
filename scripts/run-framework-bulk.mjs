import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {randomUUID} from 'node:crypto';
const [candidate,runtime,mode]=process.argv.slice(2);
if(mode&&!['--overlays-only','--matrix-only','--parallel-matrix'].includes(mode))throw new Error('Only --overlays-only, --matrix-only or --parallel-matrix is supported');
if(![candidate,runtime].every(p=>isAbsolute(p||'')))throw new TypeError('Absolute candidate and approved private test runtime required');
await mkdir(resolve(runtime,'temp'),{recursive:true});
const runId=randomUUID(),env={...process.env,NEXT_TELEMETRY_DISABLED:'1',SL_UI_FRAMEWORK_BROWSER:'1',SL_UI_FRAMEWORK_RUNTIME:runtime,SL_UI_MATRIX_RUN_ID:runId,TEMP:resolve(runtime,'temp'),TMP:resolve(runtime,'temp')};
if(!isAbsolute(env.SL_UI_PLAYWRIGHT_MODULE||''))throw new Error('Set SL_UI_PLAYWRIGHT_MODULE to the existing installed test runtime; this runner installs nothing.');
function start(args,cwd=process.cwd(),overrides={}){return spawn(process.execPath,args,{cwd,env:{...env,...overrides},stdio:'inherit',windowsHide:true});}
async function run(args,cwd,overrides){const child=start(args,cwd,overrides);await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',(code,signal)=>code===0?resolve():reject(new Error(args[0]+' failed: '+code+' '+signal)));});}
async function health(url){const deadline=Date.now()+15000;while(Date.now()<deadline){try{const response=await fetch(url,{signal:AbortSignal.timeout(500)});if(response.ok)return;}catch{}await new Promise(resolve=>setTimeout(resolve,100));}throw new Error('Own test server did not start: '+url);}
const servers=[];
try{
 await run(['scripts/prepare-framework-bulk.mjs',candidate,runtime]);
 await run([resolve(runtime,'bulk-ssr.mjs')],runtime);
 await run([resolve(runtime,'node_modules/next/dist/bin/next'),'build','--webpack'],runtime);
 servers.push(start(['scripts/serve-framework-pilot.mjs',resolve(runtime,'browser'),'4355']));
 servers.push(start([resolve(runtime,'node_modules/next/dist/bin/next'),'start','-H','127.0.0.1','-p','4356'],runtime));
 await Promise.all([health('http://127.0.0.1:4355/bulk.html'),health('http://127.0.0.1:4356/bulk')]);
 if(mode!=='--matrix-only')await run(['tests/framework-overlay-browser.mjs']);
 if(mode!=='--matrix-only'&&mode!=='--overlays-only')await run(['tests/framework-feedback-browser.mjs']);
 if(mode!=='--overlays-only'){
  servers.push(start(['scripts/serve-approved-qa.mjs',resolve(candidate,'public'),'4358']));
  await health('http://127.0.0.1:4358/packages/like/index.html');
  if(mode!=='--matrix-only')await run(['tests/framework-fidelity-browser.mjs']);
  if(mode==='--parallel-matrix'){
   // Separate processes and browser instances avoid shared page/report state.
   // Wait for both even if one fails so cleanup never interrupts its sibling.
   const results=await Promise.allSettled(['react','nextjs'].map(framework=>run(['tests/framework-bulk-browser.mjs'],undefined,{SL_UI_MATRIX_FRAMEWORK:framework})));
   await run(['scripts/merge-framework-matrix.mjs',runtime,runId]);
   for(const result of results)if(result.status==='rejected')throw result.reason;
  }else await run(['tests/framework-bulk-browser.mjs']);
 }
}finally{for(const child of servers)if(child.exitCode===null)child.kill();}
