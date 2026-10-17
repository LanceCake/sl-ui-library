import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {resolve,isAbsolute} from 'node:path';
const[runtime,runId]=process.argv.slice(2);if(!isAbsolute(runtime||'')||!/^[a-f0-9-]{36}$/.test(runId||''))throw new Error('Absolute private QA runtime and current runner UUID required');
const variants=JSON.parse(await readFile(resolve(runtime,'bulk-variants.json'),'utf8')),reports=[];
assert.equal(variants.length,390);assert.equal(new Set(variants).size,390);
for(const framework of['react','nextjs']){
 const report=JSON.parse(await readFile(resolve(runtime,'bulk-results','matrix-'+framework+'.json'),'utf8'));
 assert.equal(report.runId,runId,'Stale matrix shard from another run');assert.ok(report.finished,'Unfinished matrix shard');assert.equal(report.checks.length,390);
 assert.deepEqual(report.checks.map(c=>c.variant).sort(),[...variants].sort());
 assert.ok(report.checks.every(c=>c.framework===framework),'Mixed or stale framework shard');reports.push(report);
}
const report={runId,started:reports.map(r=>r.started).sort()[0],finished:reports.map(r=>r.finished).sort().at(-1),scope:'390 additive client-widget exports in actual React StrictMode and production Next; two completed independent browser shards, generic lifecycle/input/geometry matrix, not exhaustive source-state verification',checks:reports.flatMap(r=>r.checks),errors:reports.flatMap(r=>r.errors),external:reports.flatMap(r=>r.external),failures:reports.flatMap(r=>r.failures)};
await writeFile(resolve(runtime,'bulk-results/matrix.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({checks:report.checks.length,failures:report.failures.length,errors:report.errors.length,external:report.external.length}));
if(report.failures.length||report.errors.length||report.external.length)process.exitCode=1;
