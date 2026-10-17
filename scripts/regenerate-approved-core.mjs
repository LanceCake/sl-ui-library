import {readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute,relative} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {promoteFamily} from '../release-tools/promote-91.mjs';
import {approved91} from '../release-tools/compositions/inventory.mjs';
const[sourceRoot,targetRoot,runtime]=process.argv.slice(2);if(![sourceRoot,targetRoot,runtime].every(p=>isAbsolute(p||'')))throw new Error('Absolute source, explicit QA target and private runtime required');
const offset=relative(resolve(runtime),resolve(targetRoot));if(!['approved-qa','release-candidate'].includes(offset))throw new Error('Only the two existing owner-approved QA targets accepted');
if(offset==='release-candidate'){const origin=JSON.parse(await readFile(resolve(targetRoot,'qa-candidate-origin.json'),'utf8'));if(origin.releaseReady!==false)throw new Error('Candidate already released');}
const esbuild=await import(pathToFileURL(resolve(runtime,'node_modules/esbuild/lib/main.js')));if(esbuild.version!=='0.28.2')throw new Error('Pinned esbuild required');
const entries=approved91.filter(e=>e.batch==='account-core'),files=['index.html','buttons.css','buttons.js','example.js','instrument-sans-variable.woff2','OFL.txt','LICENSE'],hash=bytes=>createHash('sha256').update(bytes).digest('hex'),before=new Map();
for(const entry of entries)for(const name of files){const key=entry.variants[0]+'/'+name;before.set(key,hash(await readFile(resolve(targetRoot,'public/packages',key))));}
await promoteFamily('core',{sourceRoot,targetRoot,esbuild});const changes=[];
for(const entry of entries)for(const name of files){const key=entry.variants[0]+'/'+name,after=hash(await readFile(resolve(targetRoot,'public/packages',key)));if(after!==before.get(key)){if(name!=='buttons.js')throw new Error('Unexpected non-controller change: '+key);changes.push({file:key,before:before.get(key),after});}}
if(changes.length!==10)throw new Error('Expected exactly10 account-core controller adaptations');
await writeFile(resolve(targetRoot,'qa-core-regeneration.json'),JSON.stringify({packages:10,changed:changes,unchanged:60,frameworks:'Not regenerated; coordinator must propagate after source testing.'},null,2)+'\n');console.log(JSON.stringify({target:offset,changed:10,unchanged:60}));
