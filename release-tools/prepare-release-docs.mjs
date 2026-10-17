import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
import {pathToFileURL} from 'node:url';
const [root]=process.argv.slice(2);if(!isAbsolute(root||''))throw new TypeError('Absolute isolated candidate required');
const origin=JSON.parse(await readFile(resolve(root,'qa-candidate-origin.json'),'utf8'));if(origin.releaseReady!==false||origin.status!=='approved-91-added')throw new Error('Expected unreleased owner-approved candidate');
const {components,categories}=await import(pathToFileURL(resolve(root,'public/catalog-data.js')));
if(components.length!==388||components.flatMap(c=>c.variants).length!==390)throw new Error('Unexpected approved catalog');
const version='1.2.0';
for(const file of['package.json','plugins/sl-ui-library/plugin.json','plugins/sl-ui-library/.claude-plugin/plugin.json','plugins/sl-ui-library/.codex-plugin/plugin.json']){
 const data=JSON.parse(await readFile(resolve(root,file),'utf8'));if(!['1.1.2',version].includes(data.version))throw new Error('Unexpected baseline version in '+file);data.version=version;
 if(file==='package.json')data.description='Interactive UI components and an agent toolkit. HTML, CSS and JavaScript with additive React and Next.js adapters.';
 else data.description='Find real SL UI components, adapt their palette and integrate bundled HTML/CSS/JavaScript or source-preserving React/Next.js adapters.';
 if(data.interface)data.interface.longDescription=`Let the agent choose from ${components.length} HTML, CSS and JavaScript components across ten categories, plus source-preserving React and Next.js adapters. Inspect real source, adapt your palette and integrate a complete package. The complete library works offline. Optional catalog updates require a published channel and explicit opt-in.`;
 await writeFile(resolve(root,file),JSON.stringify(data,null,2)+'\n');
}
let readme=await readFile(resolve(root,'README.md'),'utf8');
readme=readme.replace(/^An AI plugin.*$/m,'An AI plugin for finding and integrating UI components, with a browsable HTML, CSS and JavaScript library and additive React / Next.js exports.');
readme=readme.replace(/^\*\*Version 1\.[12]\.\d+\*\*.*$/m,'**Version 1.2.0** adds 91 owner-approved elements and React / Next.js source-preserving adapters for every export variant. Existing HTML, CSS and JavaScript remain available. [Release notes](docs/releases/v1.2.0.md) · [Framework integration](docs/frameworks.md) · [Previous release](docs/releases/v1.1.2.md).');
readme=readme.replace(/^\*\*\d+ interactive components\*\*.*$/m,'**388 interactive components** with 390 export variants. Vanilla exports have no runtime dependencies, remote fonts or stock icon libraries. React and Next.js use your application\'s framework runtime and mount the same original controller as an isolated client widget. Preview components and download their complete source files.');
for(const category of categories){const count=components.filter(c=>c.category===category.id).length;const escaped=category.label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');readme=readme.replace(new RegExp('\\| '+escaped+' \\| \\d+ \\|'),`| ${category.label} | ${count} |`);}
readme=readme.replace(/\d+ components, \d+ export variants\. Save & Cancel[^\n]*/, '388 components, 390 export variants. Save & Cancel is available together or separately. All ten categories contain working previews and complete source packages. Each package retains its original vanilla files and adds React / Next.js entry points with their documented companions.');
await writeFile(resolve(root,'README.md'),readme);
const agentFile=resolve(root,'AGENTS.md');
let agent=await readFile(agentFile,'utf8');
agent=agent.replace('Version 1.1 contains 234 owner-reviewed components','Version 1.2 contains 388 owner-reviewed components (390 export variants)');
if(!agent.includes('Version 1.2 contains 388 owner-reviewed components (390 export variants)'))throw new Error('Unexpected agent inventory heading');
await writeFile(agentFile,agent);
const setupFile=resolve(root,'docs/agents.md');
let setup=await readFile(setupFile,'utf8');
if(!setup.includes('## React and Next.js exports')){
 if(!/^## Claude\r?$/m.test(setup))throw new Error('Unexpected plugin setup headings');
 setup=setup.replace(/^## Claude\r?$/m,`## React and Next.js exports\n\nEvery variant retains its vanilla HTML/CSS/JavaScript and adds source-preserving React and Next.js entry points. Export the complete package with the source tools, then read framework-usage.md and framework.json. Component.jsx imports the bundled controller and font helper; NextClient.jsx supplies the client boundary. Copying one JSX file alone is not a complete integration. These are isolated client widgets, not native React-state rewrites or meaningful widget SSR. Use callbacks/ref for application operations and form values. See [framework integration](frameworks.md) for lifecycle, examples, CSP and source-audit constraints.\n\n## Claude`);
 await writeFile(setupFile,setup);
}
const qaFile=resolve(root,'QA.md');let qa=await readFile(qaFile,'utf8');
if(!qa.startsWith('Current additive-framework verification:')){
 qa='Current additive-framework verification: [2026-10-18 report](docs/development/reports/framework-release-2026-10-18.md), covering 388 entries / 390 variants. Earlier dated evidence below is retained as history, not a current catalog count.\n\n'+qa;
 await writeFile(qaFile,qa);
}
const showcase=await readFile(resolve(root,'public/showcase.html'),'utf8');await writeFile(resolve(root,'public/showcase.html'),showcase.replace(/297 components\./g,'388 components.'));
await mkdir(resolve(root,'docs/releases'),{recursive:true});
await writeFile(resolve(root,'docs/releases/v1.2.0.md'),`# SL UI Library 1.2.0\n\n91 owner-approved additions extend the existing 297 components to 388 entries / 390 export variants. Rejected local experiments are not included.\n\n## Five source formats\n\nHTML, CSS and JavaScript remain unchanged as supported integration formats. Every variant also provides Component.jsx (React), NextClient.jsx (Next.js client boundary), the original-controller adapter, a shared-font lifecycle helper, a complete callback-owning example and framework instructions. Download the whole package; the entry files are not standalone.\n\nThese are source-preserving adapters, not a native JSX rewrite or meaningful widget SSR. Initial server output is a stable client-widget placeholder. Shadow DOM isolates source styles. Real application callbacks, data operations, accessibility integration and form ownership remain the application's responsibility. Explicit preview examples only change local demonstration state.\n\n## Catalog additions\n\nThe exact additions are listed in [the reviewed source map](v1.2.0-approved-elements.json). Existing IDs and all ten categories are preserved. Public interface labels are English; Unicode user text remains literal. Frozen local Russian owner-review sources are retained separately from public exports.\n\n## Verification\n\nThe dated release QA report records actual commands, environments, per-purpose coverage and limitations. Generation or a successful framework build alone does not prove every interaction. Publication is a separate owner-authorized gate.\n`);
await writeFile(resolve(root,'docs/frameworks.md'),await readFile(new URL('../frameworks/usage.md',import.meta.url),'utf8'));
await mkdir(resolve(root,'docs/development/reports'),{recursive:true});
await writeFile(resolve(root,'docs/development/reports/framework-release-2026-10-18.md'),await readFile(new URL('../docs/development/reports/framework-release-2026-10-18.md',import.meta.url),'utf8'));
await mkdir(resolve(root,'docs/motion'),{recursive:true});
await writeFile(resolve(root,'docs/motion/claude-release-prompt-ru.md'),await readFile(new URL('../docs/development/proposals/claude-motion-release-prompt-ru.md',import.meta.url),'utf8'));
const approved=JSON.parse(await readFile(new URL('./approved-91.json',import.meta.url),'utf8')).approved;
const map=approved.map(entry=>{const component=components.find(c=>c.id===entry.id);if(!component)throw new Error('Missing approved component '+entry.id);return {...entry,name:component.name,page:'https://sltowl.github.io/sl-ui-library/component.html?component='+entry.id,packageURL:'https://sltowl.github.io/sl-ui-library/packages/'+entry.variants[0]+'/',download:component.downloads[entry.variants[0]]};});
await writeFile(resolve(root,'docs/releases/v1.2.0-approved-elements.json'),JSON.stringify({version,additions:map},null,2)+'\n');
console.log('Prepared candidate-only1.2.0 metadata,388/390 counts, honest adapter docs and exact91 source map. Not a publication or verification claim.');
