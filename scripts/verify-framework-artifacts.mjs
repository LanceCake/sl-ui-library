import assert from 'node:assert/strict';
import {readFile,readdir,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {compileController} from '../frameworks/controller-source.mjs';
import {frameworkRuntimeHash} from '../release-tools/framework-runtime-hash.mjs';
const[candidate,runtime]=process.argv.slice(2);if(![candidate,runtime].every(p=>isAbsolute(p||'')))throw new Error('Absolute candidate/runtime required');
const{components}=await import(pathToFileURL(resolve(candidate,'public/catalog-data.js'))),esbuild=await import(pathToFileURL(resolve(runtime,'node_modules/esbuild/lib/main.js')));
assert.equal(esbuild.version,'0.28.2');assert.equal(components.length,388);
const variants=components.flatMap(c=>c.variants);assert.equal(new Set(variants).size,390);
const hash=bytes=>createHash('sha256').update(bytes).digest('hex'),fontHash=hash(await readFile(resolve(candidate,'public/packages/like/instrument-sans-variable.woff2'))),checks=[];
for(const variant of variants){
 const folder=resolve(candidate,'public/packages',variant),metadata=JSON.parse(await readFile(resolve(folder,'framework.json'),'utf8'));
 assert.equal(metadata.variant,variant);assert.equal(metadata.kind,'react-adapter');assert.equal(metadata.rendering,'client-widget');assert.deepEqual(metadata.formats,['html','css','javascript','react','nextjs']);
 for(const name of['Component.jsx','NextClient.jsx','react-controller.mjs','react-font.mjs','react-example.jsx','next-page.jsx','framework-usage.md','framework.json',...metadata.required])assert.ok((await readFile(resolve(folder,name))).length>0,variant+'/'+name);
 assert.equal(hash(await readFile(resolve(folder,'instrument-sans-variable.woff2'))),fontHash);
 const source=await compileController(pathToFileURL(folder+'/'),variant),compacted=await esbuild.transform(source,{loader:'js',format:'esm',target:'es2022',minifyWhitespace:true,minifyIdentifiers:true,minifySyntax:false,charset:'utf8',legalComments:'inline'}),actual=await readFile(resolve(folder,'react-controller.mjs'),'utf8');
 assert.equal(compacted.warnings.length,0);assert.equal(actual,compacted.code,'Noncanonical controller bytes: '+variant);
 const zip=await readFile(resolve(candidate,'public/downloads','matte-'+variant+'.zip')),entries=new Set();let offset=0;
 while(zip.readUInt32LE(offset)===0x04034b50){assert.equal(zip.readUInt16LE(offset+8),0);const size=zip.readUInt32LE(offset+18),length=zip.readUInt16LE(offset+26),extra=zip.readUInt16LE(offset+28),start=offset+30,name=zip.subarray(start,start+length).toString();assert.match(name,/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/);assert.equal(entries.has(name),false,'Duplicate ZIP file');entries.add(name);const dataStart=start+length+extra;assert.deepEqual(zip.subarray(dataStart,dataStart+size),await readFile(resolve(folder,name)));offset=dataStart+size;}
 const files=(await readdir(folder,{withFileTypes:true})).filter(e=>e.isFile()).map(e=>e.name).sort();assert.deepEqual([...entries].sort(),files,'Incomplete ZIP manifest: '+variant);
 checks.push({variant,controllerHash:hash(actual),runtimeHash:await frameworkRuntimeHash(folder),zipHash:hash(zip),files:files.length});
}
const bundle=await readFile(resolve(candidate,'plugins/sl-ui-library/assets/source-bundle.json'));assert.ok(bundle.length<32_000_000,'Retain original32MB backward-compatible update limit');
const report={status:'artifact-integrity-checked-not-runtime-certification',variants:checks.length,archiveFiles:checks.reduce((n,c)=>n+c.files,0),sourceBundleBytes:bundle.length,sourceBundleHash:hash(bundle),esbuild:esbuild.version,fontHash,checks};await writeFile(resolve(runtime,'framework-artifact-integrity.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({variants:report.variants,archiveFiles:report.archiveFiles,sourceBundleBytes:bundle.length,canonicalControllers:true,exactZIPBytes:true}));
