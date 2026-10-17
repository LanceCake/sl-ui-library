import {spawn} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';

const [sourceRoot,runtimeRoot]=process.argv.slice(2);
if(!isAbsolute(sourceRoot||'')||!isAbsolute(runtimeRoot||''))throw new TypeError('Absolute source and approved test runtime roots required');
await mkdir(resolve(runtimeRoot,'temp'),{recursive:true});
const env={...process.env,NEXT_TELEMETRY_DISABLED:'1',SL_UI_FRAMEWORK_BROWSER:'1',TEMP:resolve(runtimeRoot,'temp'),TMP:resolve(runtimeRoot,'temp')};
function start(args,cwd=process.cwd()){return spawn(process.execPath,args,{cwd,env,stdio:'inherit',windowsHide:true});}
async function run(args,cwd){const child=start(args,cwd);await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',(code,signal)=>code===0?resolve():reject(new Error(args[0]+' failed: '+code+' '+signal)));});}
async function health(url){const deadline=Date.now()+10000;while(Date.now()<deadline){try{const response=await fetch(url,{signal:AbortSignal.timeout(500)});if(response.ok)return;}catch{}await new Promise(resolve=>setTimeout(resolve,100));}throw new Error('Test server did not start: '+url);}
const servers=[];
try{
 await run(['scripts/prepare-framework-pilot.mjs',sourceRoot,runtimeRoot]);
 await run([resolve(runtimeRoot,'ssr-test.mjs')],runtimeRoot);
 await run([resolve(runtimeRoot,'node_modules/next/dist/bin/next'),'build','--webpack'],runtimeRoot);
 servers.push(start(['scripts/serve-framework-pilot.mjs',resolve(runtimeRoot,'browser'),'4355']));
 servers.push(start([resolve(runtimeRoot,'node_modules/next/dist/bin/next'),'start','-H','127.0.0.1','-p','4356'],runtimeRoot));
 await Promise.all([health('http://127.0.0.1:4355/'),health('http://127.0.0.1:4356/')]);
 await run(['--test','tests/framework-pilot.test.mjs']);
}finally{for(const child of servers)if(child.exitCode===null)child.kill();}
