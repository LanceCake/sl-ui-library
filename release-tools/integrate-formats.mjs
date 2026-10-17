import {readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';

/** Mechanical integration into an explicit unreleased test candidate only. */
export async function integrateFormats(root){
 if(!isAbsolute(root||''))throw new TypeError('Absolute candidate directory required');
 const origin=JSON.parse(await readFile(resolve(root,'qa-candidate-origin.json'),'utf8'));if(origin.releaseReady!==false||origin.status!=='approved-91-added')throw new Error('Not an unreleased QA candidate');
 const ui=JSON.parse(await readFile(new URL('./ui-files.json',import.meta.url),'utf8'));
 const exact=['public/component.html','public/library.js','public/library.css','public/source-cache.js'];
 if(JSON.stringify(ui)!==JSON.stringify(exact))throw new Error('Unexpected UI integration scope');
 for(const file of ui)await copyFile(new URL('./ui-overrides/'+file,import.meta.url),resolve(root,file));
 await copyFile(new URL('./catalog-contract.mjs',import.meta.url),resolve(root,'tests/catalog-contract.mjs'));
 const approved=JSON.parse(await readFile(new URL('./approved-91.json',import.meta.url),'utf8')).approved;
 if(approved.length!==91)throw new Error('Incorrect owner-approved release ledger');
 await writeFile(resolve(root,'tests/approved-release-91.json'),JSON.stringify(approved,null,2)+'\n');
 function replaceKnown(source,from,to){if(source.includes(to))return source;if(source.includes(from))return source.replaceAll(from,to);throw new Error('Baseline integration grammar changed: '+from);}
 async function patch(file,changes){let source=await readFile(resolve(root,file),'utf8');for(const[from,to]of changes)source=replaceKnown(source,from,to);await writeFile(resolve(root,file),source);}
 await patch('build.mjs',[[String.raw`\.(html|css|js|txt)$`,String.raw`\.(html|css|js|mjs|jsx|json|md|txt)$`]]);
 await patch('build-previews.mjs',[[String.raw`source.match(/\(\(\) => \{[\s\S]*\}\)\(\);\s*$/)`,String.raw`source.match(/\(\(\)\s*=>\s*\{[\s\S]*\}\)\(\);\s*$/)`]]);
 await patch('plugins/sl-ui-library/scripts/library.mjs',[[String.raw`\.(css|html|js)$`,String.raw`\.(css|html|js|mjs|jsx)$`]]);
 await patch('serve.mjs',[
  ["js: 'text/javascript; charset=utf-8',","js: 'text/javascript; charset=utf-8', mjs: 'text/javascript; charset=utf-8', jsx: 'text/plain; charset=utf-8', md: 'text/plain; charset=utf-8',"],
  ["allowed.add('preview-data.js');","allowed.add('preview-data.js');\nallowed.add('catalog-batches/approved-local-91.js');"],
  ["'example.js', 'preview.js',","'example.js', 'Component.jsx', 'NextClient.jsx', 'react-controller.mjs', 'react-font.mjs', 'react-example.jsx', 'next-page.jsx', 'framework-usage.md', 'framework.json', 'preview.js',"],
 ]);
 await patch('verify.mjs',[
  [String.raw`\.(html|css|js)$`,String.raw`\.(html|css|js|mjs|jsx|json|md)$`],
  ["for(const ref of refs){if(/^(?:#|data:|https?:|blob:)/.test(ref))continue;","for(const ref of refs){if(/^(?:#|data:|https?:|blob:)/.test(ref))continue;if(ref==='react'&&['Component.jsx','react-example.jsx'].includes(entry.name))continue;"],
 ]);
 console.log('Integrated five source formats, UTF-8 packaging, safe preview extraction and explicit source-serving allowlists. No release readiness claim.');
}
if(process.argv[1]?.endsWith('integrate-formats.mjs'))await integrateFormats(process.argv[2]);
