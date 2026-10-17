// Read-only inventory of inline head styles and reviewed adapter layout additions.
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {compileController} from '../frameworks/controller-source.mjs';

export async function auditFrameworkLayout(sourceRoot,variants){
 const report={variants:variants.length,withHeadStyles:0,withoutHeadStyles:0,styleBlocks:0,pageOnly:0,nonPage:0,containerVariants:[],adaptedVariants:[],groups:{},checks:[]};
 for(const variant of variants){
  const root=pathToFileURL(resolve(sourceRoot,'public/packages',variant)+'/');
  const html=await readFile(new URL('index.html',root),'utf8');
  const head=html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1]||'';
  const blocks=[...head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(match=>match[1]);
  report.styleBlocks+=blocks.length;
  if(blocks.length)report.withHeadStyles++;else report.withoutHeadStyles++;
  const rules=blocks.flatMap(block=>[...block.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(match=>({selector:match[1].trim().replace(/\s+/g,' '),declarations:match[2].trim()})));
  const nonPage=rules.filter(rule=>!rule.selector.split(',').every(selector=>['body','html','body.embedded','.embedded'].includes(selector.trim())));
  if(nonPage.length)report.nonPage++;else if(blocks.length)report.pageOnly++;
  if(rules.some(rule=>/container-type\s*:/.test(rule.declarations)))report.containerVariants.push(variant);
  const css=await readFile(new URL('buttons.css',root),'utf8'),compiled=await compileController(root,variant);
  const derived=JSON.parse(compiled.match(/const sourceCSS=(.*);\n/)[1]);
  let addition=derived.startsWith(css)?derived.slice(css.length):'';
  // Popover has a separately reviewed dependency-first source stylesheet.
  if(variant==='popover-overlay')addition='';
  if(addition)report.adaptedVariants.push(variant);
  const signature=nonPage.map(rule=>rule.selector).join(' | ')||'(page only or absent)';
  (report.groups[signature]??=[]).push(variant);
  report.checks.push({variant,styleBlocks:blocks.length,nonPageRules:nonPage,addition});
 }
 return report;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const sourceRoot=resolve(process.argv[2]||'.');
 const variants=process.argv[3]?JSON.parse(await readFile(resolve(process.argv[3]),'utf8')):(await import(pathToFileURL(resolve(sourceRoot,'public/catalog-data.js')))).components.flatMap(component=>component.variants);
 console.log(JSON.stringify(await auditFrameworkLayout(sourceRoot,variants),null,2));
}
