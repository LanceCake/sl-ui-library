import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {reviewedSourceRoot} from '../release-tools/reviewed-source-root.mjs';
const reviewedRoot=await reviewedSourceRoot(new URL('../',import.meta.url));

test('portable account focus patch fails closed on unexpected runtime and renderer grammar',async()=>{
 const {prepareAccountFocus}=await import('../release-tools/compositions/account-focus.mjs');
 const source=await readFile(new URL('experiments/account-core-ru/runtime.js',reviewedRoot),'utf8');
 const changed=prepareAccountFocus('account-core-ru/runtime.js',source);
 assert.match(changed,/root\.tabIndex=-1;root\.setAttribute\('role','group'\)/);
 assert.match(changed,/restoreFocus\(operation\)/);
 assert.throws(()=>prepareAccountFocus('account-core-ru/runtime.js',source.replace('apply(result);','apply(result,other);')),/Unsupported account focus grammar/);
 assert.throws(()=>prepareAccountFocus('account-core-ru/profile.js','code.input.focus();'),/Unsupported account focus targets/);
});

test('approved QA keyboard focus, async lifecycle, instance isolation and cart geometry',{skip:!process.env.SL_APPROVED_REGRESSION_LABEL},async t=>{
 const {runRegressions}=await import('../scripts/audit-approved-91-regressions.mjs');
 const report=await runRegressions(process.env.SL_APPROVED_REGRESSION_LABEL,process.env.SL_APPROVED_REGRESSION_TARGET||'approved-qa');
 for(const c of report.cases)await t.test(c.name,()=>assert.equal(c.pass,true,c.error));
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.external,[]);
});
