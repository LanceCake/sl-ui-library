import {readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {generateVariant} from '../frameworks/generate.mjs';
import {compactFrameworkControllers} from './compact-framework-controllers.mjs';

const [root,runtime]=process.argv.slice(2);if(![root,runtime].every(p=>isAbsolute(p||'')))throw new TypeError('Absolute isolated candidate and pinned test-runtime roots required');
const origin=JSON.parse(await readFile(resolve(root,'qa-candidate-origin.json'),'utf8'));
if(origin.status!=='approved-91-added'||origin.releaseReady!==false)throw new Error('Expected isolated unreleased QA candidate');
const {components}=await import(pathToFileURL(resolve(root,'public/catalog-data.js'))),variants=components.flatMap(c=>c.variants);
if(variants.length!==390||new Set(variants).size!==390)throw new Error('Expected390 unique approved variants');
const results=[];
for(const variant of variants){results.push(await generateVariant({packageRoot:pathToFileURL(resolve(root,'public/packages',variant)+'/'),variant,targetRoot:resolve(root,'public/packages')}));}
const compaction=await compactFrameworkControllers(root,runtime);
await writeFile(resolve(root,'qa-framework-exports.json'),JSON.stringify({status:'generated-not-verified',entries:components.length,compaction,variants:results},null,2)+'\n');
console.log('Generated '+results.length+' source adapters. Runtime, examples, source UI and archive QA still required.');
