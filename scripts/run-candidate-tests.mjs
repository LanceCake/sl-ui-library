import {spawn} from 'node:child_process';
import {mkdir,readdir,writeFile} from 'node:fs/promises';
import {createWriteStream} from 'node:fs';
import {resolve,isAbsolute} from 'node:path';
const[candidate,runtime,mode='static',label=mode]=process.argv.slice(2);
if(![candidate,runtime].every(p=>isAbsolute(p||''))||!['static','browser'].includes(mode))throw new Error('Absolute candidate/runtime and static|browser mode required');
if(!/^[a-z0-9-]+$/.test(label))throw new Error('Safe report label required');
if(mode==='browser'&&!isAbsolute(process.env.SL_UI_PLAYWRIGHT_MODULE||''))throw new Error('Existing installed Playwright module required');
async function discover(folder){const result=[];for(const entry of await readdir(folder,{withFileTypes:true})){const path=resolve(folder,entry.name);if(entry.isDirectory())result.push(...await discover(path));else if(entry.isFile()&&entry.name.endsWith('.test.mjs'))result.push(path);}return result.sort();}
const files=await discover(resolve(candidate,'tests')),out=resolve(runtime,'candidate-tests',label);await mkdir(out,{recursive:true});
const results=[];
if(mode==='browser'){
 // Some original suites import named ESM exports, others use require(). A CJS
 // entry may expose only default under import(), silently skipping those ESM
 // suites. Fail before running any tests instead of counting those as covered.
 const args=['--import',new URL('../tests/browser-defaults.mjs',import.meta.url).href,'--input-type=module','-e',"import {pathToFileURL} from 'node:url'; const m=await import(pathToFileURL(process.env.SL_UI_PLAYWRIGHT_MODULE)); if(typeof m.chromium?.launch!=='function')throw new Error('Use the installed Playwright ESM index.mjs entry with named chromium export.'); console.log('Explicit installed QA runtime has named chromium export');"];
 const probe=spawn(process.execPath,args,{cwd:candidate,env:{...process.env,TEMP:resolve(runtime,'temp'),TMP:resolve(runtime,'temp')},windowsHide:true,stdio:'inherit'});
 const code=await new Promise((resolve,reject)=>{probe.once('error',reject);probe.once('exit',resolve);});if(code!==0)throw new Error('Browser runtime preflight failed; no component tests run.');
}
for(const file of files){
 const name=file.slice(candidate.length+1).replaceAll('\\','/'),filename=name.replaceAll('/','_')+'.tap',env={...process.env,TEMP:resolve(runtime,'temp'),TMP:resolve(runtime,'temp')};
 if(mode==='static'){for(const key of Object.keys(env))if(key.startsWith('SL_UI_PLAYWRIGHT')||key.startsWith('SL_UI_BROWSER'))delete env[key];}
 else{
  env.SL_UI_PLAYWRIGHT=env.SL_UI_PLAYWRIGHT_MODULE;
  env.SL_UI_PLAYWRIGHT_PATH=env.SL_UI_PLAYWRIGHT_MODULE;
  env.SL_UI_BROWSER_CHANNEL='msedge';
  // Historical suites use this one name for either opt-in or an executable.
  env.SL_UI_BROWSER=name.endsWith('/inputs-basic-2.test.mjs')?'1':process.env.SL_UI_BROWSER_EXECUTABLE;
  if(!env.SL_UI_BROWSER)delete env.SL_UI_BROWSER;
 }
 const log=createWriteStream(resolve(out,filename)),args=[...(mode==='browser'?['--import',new URL('../tests/browser-defaults.mjs',import.meta.url).href]:[]),'--test','--test-reporter=tap',file];
 const child=spawn(process.execPath,args,{cwd:candidate,env,windowsHide:true,stdio:['ignore','pipe','pipe']});let tail='';
 for(const stream of[child.stdout,child.stderr])stream.on('data',chunk=>{log.write(chunk);tail=(tail+chunk.toString()).slice(-1800);});
 const exit=await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',(code,signal)=>resolve({code,signal}));});await new Promise(resolve=>log.end(resolve));
 const counts={};for(const key of['tests','pass','fail','cancelled','skipped'])counts[key]=Number(tail.match(new RegExp('# '+key+' (\\d+)'))?.[1]??0);
 results.push({file:name,...exit,...counts,log:filename});await writeFile(resolve(out,'summary.json'),JSON.stringify(results,null,2)+'\n');console.log(name+' '+JSON.stringify({...exit,...counts}));
}
if(results.some(r=>r.code!==0))process.exitCode=1;
