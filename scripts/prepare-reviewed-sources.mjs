import {readFile,writeFile,copyFile,mkdir,lstat} from 'node:fs/promises';
import {resolve,dirname,isAbsolute} from 'node:path';
import {verifySources} from '../release-tools/compositions/inventory.mjs';

const[sourceRoot,candidate]=process.argv.slice(2);if(![sourceRoot,candidate].every(p=>isAbsolute(p||'')))throw new Error('Absolute frozen source and isolated candidate required');
const marker=JSON.parse(await readFile(resolve(candidate,'qa-candidate-origin.json'),'utf8'));if(marker.releaseReady!==false||marker.status!=='approved-91-added')throw new Error('Only unreleased QA candidate accepted');
const manifest=JSON.parse(await readFile(new URL('../release-tools/approved-91.json',import.meta.url),'utf8'));await verifySources(sourceRoot);
const target=resolve(candidate,'review-sources');if(target===resolve(sourceRoot))throw new Error('Archive must not overwrite reviewed sources');
const files=[...Object.keys(manifest.sources),'public/packages/actions-menu/instrument-sans-variable.woff2','public/packages/actions-menu/OFL.txt','LICENSE'];
for(const file of files){if(isAbsolute(file)||file.split(/[\\/]/).includes('..'))throw new Error('Unsafe archive source');const from=resolve(sourceRoot,file),to=resolve(target,file);if(!(await lstat(from)).isFile())throw new Error('Expected regular frozen source');await mkdir(dirname(to),{recursive:true});await copyFile(from,to);}
await writeFile(resolve(target,'approved-source-map.json'),JSON.stringify({schemaVersion:1,approvedCount:91,purpose:'Hash-pinned development sources only. Not part of the public deployment.',sources:manifest.sources},null,2)+'\n');
await verifySources(target);console.log('Archived '+Object.keys(manifest.sources).length+' exact frozen source files plus existing font/license assets outside public/.');
