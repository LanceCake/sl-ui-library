import {readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {compileController} from '../frameworks/controller-source.mjs';

export async function compactFrameworkControllers(candidate,runtime){
if(![candidate,runtime].every(p=>isAbsolute(p||'')))throw new TypeError('Absolute candidate/runtime directories required');
const origin=JSON.parse(await readFile(resolve(candidate,'qa-candidate-origin.json'),'utf8'));if(origin.releaseReady!==false)throw new Error('Only unreleased QA candidate accepted');
const esbuild=await import(pathToFileURL(resolve(runtime,'node_modules/esbuild/lib/main.js'))),{components}=await import(pathToFileURL(resolve(candidate,'public/catalog-data.js')));let before=0,after=0;
if(esbuild.version!=='0.28.2')throw new Error('Pinned esbuild0.28.2 required for reproducible framework artifacts');
for(const variant of components.flatMap(c=>c.variants)){
 // Always compile the reviewed vanilla source afresh. Re-minifying previous
 // output is history-dependent (local alias ordering can change each pass).
 const file=resolve(candidate,'public/packages',variant,'react-controller.mjs'),source=await compileController(pathToFileURL(resolve(candidate,'public/packages',variant)+'/'),variant);
 const result=await esbuild.transform(source,{loader:'js',format:'esm',target:'es2022',minifyWhitespace:true,minifyIdentifiers:true,minifySyntax:false,charset:'utf8',legalComments:'inline'});
 if(result.warnings.length)throw new Error('Controller compaction warning: '+variant);
 before+=Buffer.byteLength(source);after+=Buffer.byteLength(result.code);await writeFile(file,result.code);
}
const result={scope:'Fresh source extraction then exactly one pinned esbuild whitespace/identifier pass; no syntax optimizations or vanilla-source changes',before,after,saved:before-after};console.log(JSON.stringify(result));return result;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await compactFrameworkControllers(...process.argv.slice(2));
