import assert from 'node:assert/strict';
export const frameworkFiles=Object.freeze(['Component.jsx','NextClient.jsx','framework-usage.md','framework.json','next-page.jsx','react-controller.mjs','react-example.jsx','react-font.mjs']);
export function withFrameworkFiles(vanilla){
 assert.deepEqual([...vanilla].sort(),['LICENSE','OFL.txt','buttons.css','buttons.js','example.js','index.html','instrument-sans-variable.woff2']);
 return [...vanilla,...frameworkFiles].sort();
}
