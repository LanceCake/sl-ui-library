import assert from 'node:assert/strict';
import {mkdir,copyFile,writeFile,readFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {frameworkRuntimeHash} from '../release-tools/framework-runtime-hash.mjs';
const [candidate,runtime]=process.argv.slice(2);if(![candidate,runtime].every(p=>isAbsolute(p||'')))throw new TypeError('Absolute candidate/runtime roots required');
if(resolve(candidate)!==resolve(runtime,'release-candidate'))throw new Error('The fixture registry imports this runtime\'s exact release-candidate; another source path is not accepted.');
const {components}=await import(pathToFileURL(resolve(candidate,'public/catalog-data.js'))),variants=components.flatMap(c=>c.variants);if(variants.length!==390)throw new Error('Expected390 variants');
const integrity=JSON.parse(await readFile(resolve(runtime,'framework-artifact-integrity.json'),'utf8'));
for(const variant of variants)assert.equal(await frameworkRuntimeHash(resolve(candidate,'public/packages',variant)),integrity.checks.find(c=>c.variant===variant)?.runtimeHash,'Verify current complete runtime bytes before building fixtures: '+variant);
await mkdir(resolve(runtime,'app/bulk'),{recursive:true});await mkdir(resolve(runtime,'browser'),{recursive:true});
for(const file of ['BulkHarness.jsx','app/bulk/page.jsx','app/bulk/pilot.jsx'])await copyFile(new URL('../tests/framework-fixture/'+file,import.meta.url),resolve(runtime,file));
for(const [mode,file]of [['react','Component.jsx'],['next','NextClient.jsx']]){const lines=variants.map((v,i)=>`import C${i} from './release-candidate/public/packages/${v}/${file}';`);await writeFile(resolve(runtime,'registry-bulk-'+mode+'.js'),lines.join('\n')+'\nexport const registry={'+variants.map((v,i)=>JSON.stringify(v)+':C'+i).join(',')+'};\n');}
const esbuild=await import(pathToFileURL(resolve(runtime,'node_modules/esbuild/lib/main.js')));
await esbuild.build({stdin:{contents:`import{createRoot}from'react-dom/client';import{StrictMode}from'react';import BulkHarness from './BulkHarness.jsx';import{registry}from'./registry-bulk-react.js';createRoot(document.getElementById('root')).render(<StrictMode><BulkHarness registry={registry}/></StrictMode>);`,resolveDir:runtime,sourcefile:'bulk-entry.jsx',loader:'jsx'},bundle:true,format:'esm',platform:'browser',outfile:resolve(runtime,'browser/bulk.js'),jsx:'automatic',logLevel:'warning'});
await copyFile(resolve(candidate,'public/packages/like/instrument-sans-variable.woff2'),resolve(runtime,'browser/instrument-sans-variable.woff2'));
await writeFile(resolve(runtime,'browser/bulk.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="icon" href="data:,"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Bulk React QA</title></head><body style="margin:24px;font-family:Arial,sans-serif"><div id="root"></div><script type="module" src="./bulk.js"></script></body></html>');
await esbuild.build({stdin:{contents:`import{createElement}from'react';import{renderToString}from'react-dom/server';import{registry}from'./registry-bulk-react.js';for(const[key,Component]of Object.entries(registry)){if(!renderToString(createElement(Component)).includes('data-sl-react'))throw new Error(key);}console.log('All390 server imports/renders safe (client placeholders, not meaningful SSR).');`,resolveDir:runtime,sourcefile:'bulk-server-entry.mjs'},bundle:true,platform:'node',format:'esm',outfile:resolve(runtime,'bulk-ssr.mjs'),external:['react','react-dom/server'],jsx:'automatic',logLevel:'warning'});
await writeFile(resolve(runtime,'bulk-variants.json'),JSON.stringify(variants,null,2)+'\n');console.log('Prepared390 imports; actual runtime/browser matrix remains pending.');
