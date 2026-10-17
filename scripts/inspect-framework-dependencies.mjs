import {readFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const[root]=process.argv.slice(2);if(!isAbsolute(root||''))throw new Error('Absolute candidate root required');
const{components}=await import(pathToFileURL(resolve(root,'public/catalog-data.js'))),groups=new Map();
for(const variant of components.flatMap(c=>c.variants)){
 const html=await readFile(resolve(root,'public/packages',variant,'index.html'),'utf8');
 for(const match of html.matchAll(/<link\b[^>]*>/g)){const tag=match[0],relation=tag.match(/\brel=["']([^"']+)["']/)?.[1],href=tag.match(/\bhref=["']([^"']+)["']/)?.[1];if(relation!=='stylesheet')continue;if(!groups.has(href))groups.set(href,[]);groups.get(href).push(variant);}
}
console.log(JSON.stringify([...groups].map(([href,variants])=>({href,count:variants.length,variants:href==='./buttons.css'?[]:variants})),null,2));
