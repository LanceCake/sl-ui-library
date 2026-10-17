import assert from 'node:assert/strict';
export const frameworkScenarios=['normal mount and explicit local preview','narrow host and document geometry','keyboard focus and typography inventory','literal Unicode input and rapid local activation','runtime reduced motion interruption','independent instances and cleanup/remount'];

// Generation must never set these flags. Only completed, exact-controller
// browser evidence can promote an already generated candidate export.
export function verifyFrameworkEvidence({variants,matrix,fidelity,hashes,runtimeHashes}){
 assert.equal(variants.length,390);assert.equal(new Set(variants).size,390);
 for(const report of[matrix,fidelity]){assert.ok(report.finished,'Incomplete browser report');assert.deepEqual(report.errors,[]);assert.deepEqual(report.external,[]);}
 assert.equal(matrix.checks.length,780);assert.equal(fidelity.checks.length,390);
 const expected=new Set(variants),seen=new Set(),styles=new Set();
 for(const check of fidelity.checks){assert.ok(expected.has(check.variant));assert.ok(!styles.has(check.variant),'Duplicate fidelity record');styles.add(check.variant);assert.deepEqual(check.issues,[]);assert.equal(check.controllerHash,hashes[check.variant],'Fidelity controller differs from release bytes');assert.match(runtimeHashes[check.variant]||'',/^[a-f0-9]{64}$/);assert.equal(check.runtimeHash,runtimeHashes[check.variant],'Fidelity runtime differs from release bytes');}
 const notes=new Map();
 for(const check of matrix.checks){
  assert.ok(expected.has(check.variant));assert.ok(['react','nextjs'].includes(check.framework));
  const key=check.framework+':'+check.variant;assert.ok(!seen.has(key),'Duplicate runtime record');seen.add(key);
  assert.deepEqual(check.issues,[]);assert.deepEqual([...check.passed].sort(),[...frameworkScenarios].sort(),'Incomplete runtime scenarios');
  assert.match(hashes[check.variant]||'',/^[a-f0-9]{64}$/);assert.equal(check.controllerHash,hashes[check.variant],'Tested controller differs from release bytes');
  assert.equal(check.runtimeHash,runtimeHashes[check.variant],'Tested runtime differs from release bytes');
  notes.set(check.variant,[...new Set([...(notes.get(check.variant)||[]),...(check.scopeNotes||[])])]);
 }
 return new Map(variants.map(variant=>[variant,{
  status:'verified-client-widget',tested:{react:true,nextjs:true},
  verification:{controllerSHA256:hashes[variant],runtimeSHA256:runtimeHashes[variant],scope:'Client mount, generic input/activation, focus, host geometry, runtime reduced motion, isolated instances and cleanup in React StrictMode and production Next.js; source control typography/SVG fingerprint at320px.',limitations:'Not exhaustive application-state or real-backend verification. No meaningful widget SSR. Original default-size constraints and generic activation limits are recorded below.',notes:notes.get(variant)||[]},
 }]));
}
