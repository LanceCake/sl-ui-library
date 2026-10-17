import {readFile,writeFile,readdir,copyFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';

/** Expand only literal exact-seven file assertions, never filter unknown files. */
export async function extendPackageContracts(candidate){
 if(!isAbsolute(candidate||''))throw new TypeError('Absolute QA candidate root required');
 const origin=JSON.parse(await readFile(resolve(candidate,'qa-candidate-origin.json'),'utf8'));if(origin.releaseReady!==false)throw new Error('Only unreleased QA candidate accepted');
 await copyFile(new URL('./framework-file-contract.mjs',import.meta.url),resolve(candidate,'tests/framework-file-contract.mjs'));
 const exact=['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2'];let changed=0;
 for(const entry of await readdir(resolve(candidate,'tests/batches'),{withFileTypes:true})){
  if(!entry.isFile()||!entry.name.endsWith('.test.mjs'))continue;
  const file=resolve(candidate,'tests/batches',entry.name),source=await readFile(file,'utf8');if(source.includes("import {withFrameworkFiles}"))continue;
  let matches=0;const updated=source.replace(/\[\s*(?:['"][A-Za-z0-9._-]+['"]\s*,?\s*)+\]/g,array=>{
   const names=[...array.matchAll(/['"]([^'"]+)['"]/g)].map(match=>match[1]);
   if(JSON.stringify([...names].sort())!==JSON.stringify(exact))return array;
   matches++;return 'withFrameworkFiles('+array+')';
  });
  if(matches){await writeFile(file,"import {withFrameworkFiles} from '../framework-file-contract.mjs';\n"+updated);changed++;}
 }
 console.log('Extended exact package-file assertions in '+changed+' suites; original vanilla seven plus exact eight framework companions required.');
}
if(process.argv[1]?.endsWith('extend-package-contracts.mjs'))await extendPackageContracts(process.argv[2]);
