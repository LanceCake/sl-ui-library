import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {copyFile,readFile,writeFile,mkdir,lstat} from 'node:fs/promises';
import {resolve,dirname,isAbsolute,relative} from 'node:path';
import {pathToFileURL} from 'node:url';
import {promote91ForQA} from '../release-tools/promote-91.mjs';

const [baselineRoot,approvedSourceRoot,runtimeRoot]=process.argv.slice(2);
if(![baselineRoot,approvedSourceRoot,runtimeRoot].every(p=>isAbsolute(p||'')))throw new TypeError('Absolute baseline, approved-source and runtime directories required');
const git=promisify(execFile),target=resolve(runtimeRoot,'release-candidate'),markerFile=resolve(target,'qa-candidate-origin.json');
if(target===resolve(baselineRoot)||target===resolve(approvedSourceRoot))throw new Error('Candidate must not replace either source checkout');
const head=(await git('git',['-C',baselineRoot,'rev-parse','HEAD'])).stdout.trim();
let marker;
try{marker=JSON.parse(await readFile(markerFile,'utf8'));if(marker.baseline!==head)throw new Error('Existing QA candidate baseline mismatch');}
catch(error){if(error.code!=='ENOENT')throw error;await mkdir(target,{recursive:false});marker={baseline:head,status:'copying-tracked-baseline',releaseReady:false};await writeFile(markerFile,JSON.stringify(marker,null,2)+'\n');}
if(marker.status==='copying-tracked-baseline'){
 const tracked=(await git('git',['-C',baselineRoot,'ls-files','-z'],{maxBuffer:16*1024*1024})).stdout.split('\0').filter(Boolean);
 for(const name of tracked){if(isAbsolute(name)||name.split(/[\\/]/).includes('..'))throw new Error('Unsafe tracked path');const source=resolve(baselineRoot,name),destination=resolve(target,name);if(relative(target,destination).startsWith('..'))throw new Error('Candidate path escape');if(!(await lstat(source)).isFile())throw new Error('Only regular tracked files accepted: '+name);await mkdir(dirname(destination),{recursive:true});await copyFile(source,destination);}
 marker.status='tracked-baseline-copied';marker.files=tracked.length;await writeFile(markerFile,JSON.stringify(marker,null,2)+'\n');
}
if(marker.status==='tracked-baseline-copied'){
 const esbuild=await import(pathToFileURL(resolve(runtimeRoot,'node_modules/esbuild/lib/main.js')));
 const additions=await promote91ForQA({sourceRoot:approvedSourceRoot,targetRoot:target,esbuild});
 const catalogFile=resolve(target,'public/catalog-data.js'),catalog=await readFile(catalogFile,'utf8');
 if(catalog.includes('approved-local-91'))throw new Error('Unexpected already-modified baseline catalog');
 await writeFile(catalogFile,"import approvedLocal91 from './catalog-batches/approved-local-91.js';\n"+catalog+'\n// Owner-approved additions; generated candidate remains gated on release QA.\ncomponents.push(...approvedLocal91);\n');
 await writeFile(resolve(target,'qa-approved-91.json'),JSON.stringify(additions,null,2)+'\n');
 marker.status='approved-91-added';marker.additions=additions.length;await writeFile(markerFile,JSON.stringify(marker,null,2)+'\n');
}
const {components}=await import(pathToFileURL(resolve(target,'public/catalog-data.js')));
if(components.length!==388||components.flatMap(c=>c.variants).length!==390)throw new Error('Candidate coverage mismatch');
console.log(JSON.stringify({target,baseline:head,entries:388,variants:390,status:marker.status,releaseReady:false}));
