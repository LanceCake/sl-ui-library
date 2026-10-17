import {mkdir,readFile,writeFile,copyFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {compileController} from './controller-source.mjs';
import {reactExample} from './examples.mjs';

export async function generateVariant({packageRoot,variant,targetRoot}){
 if(!/^[a-z0-9-]+$/.test(variant))throw new TypeError('Invalid variant');
 if(!(packageRoot instanceof URL)||packageRoot.protocol!=='file:')throw new TypeError('Use a local package directory URL');
 const controller=await compileController(packageRoot,variant),folder=resolve(targetRoot,variant);await mkdir(folder,{recursive:true});
 const files={
  'Component.jsx':await readFile(new URL('./Component.jsx',import.meta.url),'utf8'),
  'NextClient.jsx':"'use client';\nexport {default} from './Component.jsx';\n",
  'react-controller.mjs':controller,
  'react-font.mjs':await readFile(new URL('./dom-font.mjs',import.meta.url),'utf8'),
  'react-example.jsx':reactExample(variant),
  'next-page.jsx':`import Example from './react-example.jsx';\n// This server page imports a callback-owning Client Component.\n// For production use NextClient.jsx inside your own client wrapper.\nexport default function Page(){return <Example/>;}\n`,
  'framework-usage.md':await readFile(new URL('./usage.md',import.meta.url),'utf8'),
 };
 const metadata={schemaVersion:1,variant,kind:'react-adapter',rendering:'client-widget',status:'generated-not-verified',formats:['html','css','javascript','react','nextjs'],react:'Component.jsx',nextjs:'NextClient.jsx',required:['Component.jsx','react-controller.mjs','react-font.mjs','instrument-sans-variable.woff2'],tested:{react:false,nextjs:false}};
 files['framework.json']=JSON.stringify(metadata,null,2)+'\n';for(const[name,content]of Object.entries(files))await writeFile(resolve(folder,name),content);
 const sourceFont=fileURLToPath(new URL('instrument-sans-variable.woff2',packageRoot)),targetFont=resolve(folder,'instrument-sans-variable.woff2');
 if(resolve(sourceFont)!==targetFont)await copyFile(sourceFont,targetFont);
 return metadata;
}
