import {readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {verifyFrameworkEvidence} from '../release-tools/framework-verification.mjs';
import {frameworkRuntimeHash} from '../release-tools/framework-runtime-hash.mjs';
const[candidate,runtime]=process.argv.slice(2);
if(![candidate,runtime].every(p=>isAbsolute(p||'')))throw new Error('Absolute unreleased candidate and private QA runtime required');
const marker=JSON.parse(await readFile(resolve(candidate,'qa-candidate-origin.json'),'utf8'));
if(marker.releaseReady!==false||marker.status!=='approved-91-added')throw new Error('Unreleased approved candidate required');
const{components}=await import(pathToFileURL(resolve(candidate,'public/catalog-data.js'))),variants=components.flatMap(c=>c.variants),hashes={},runtimeHashes={};
for(const variant of variants){const folder=resolve(candidate,'public/packages',variant);hashes[variant]=createHash('sha256').update(await readFile(resolve(folder,'react-controller.mjs'))).digest('hex');runtimeHashes[variant]=await frameworkRuntimeHash(folder);}
const load=file=>readFile(resolve(runtime,file),'utf8').then(JSON.parse);
const evidence=verifyFrameworkEvidence({variants,hashes,runtimeHashes,matrix:await load('bulk-results/matrix.json'),fidelity:await load('fidelity-results/fidelity.json')});
// Validate the complete metadata set before promoting any record. A malformed
// later package must not leave earlier packages marked verified on rejection.
const updates=[];
for(const[variant,verification]of evidence){const path=resolve(candidate,'public/packages',variant,'framework.json'),metadata=JSON.parse(await readFile(path,'utf8'));if(metadata.variant!==variant||metadata.kind!=='react-adapter')throw new Error('Unexpected export metadata');updates.push({path,text:JSON.stringify({...metadata,...verification},null,2)+'\n'});}
for(const{path,text}of updates)await writeFile(path,text);
console.log('Stamped390 exact-controller runtime evidence records; ZIPs and plugin source bundle must be rebuilt. Not a publication gate.');
