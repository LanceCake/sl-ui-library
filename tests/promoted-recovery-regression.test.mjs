import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {reviewedSourceRoot} from '../release-tools/reviewed-source-root.mjs';
import {translateAccountSource} from '../release-tools/compositions/core.mjs';
const root=await reviewedSourceRoot(new URL('../',import.meta.url));
const path='account-core-ru/privacy.js';
const source=await readFile(new URL('experiments/'+path,root),'utf8');
const copy=JSON.parse(await readFile(new URL('../release-tools/public-copy.json',import.meta.url),'utf8'));

test('portable recovery explicit hide cancels its pending local action before clearing codes',()=>{
 const translated=translateAccountSource(path,source,copy);
 assert.match(translated,/if\(shown\)\{if\(t\.root\.hasAttribute\('aria-busy'\)\)t\.cancel\(\);hide\(\);return;\}/);
 assert.match(translated,/function hide\(\)\{shown=false;grid\.replaceChildren\(\)/);
 assert.match(translated,/Expected recovery codes/);
 assert.match(translated,/\},rotate\);rotate\.disabled=t\.root\.hasAttribute\('aria-busy'\)\|\|!acknowledged;/);
});

test('recovery original remains pinned byte for byte',async()=>{
 const manifest=JSON.parse(await readFile(new URL('../release-tools/approved-91.json',import.meta.url),'utf8'));
 assert.equal(createHash('sha256').update(source).digest('hex'),manifest.sources['experiments/'+path]);
});

test('recovery adaptation fails closed on missing and duplicate exact grammar',async()=>{
 const {prepareAccountRecovery}=await import('../release-tools/compositions/account-recovery.mjs');
 const needle='if(shown){hide();return;}';
 assert.throws(()=>prepareAccountRecovery(path,source.replace(needle,'if(shown){hide();}')),/Unsupported account recovery grammar/);
 assert.throws(()=>prepareAccountRecovery(path,source+'\n'+needle),/Unsupported account recovery grammar/);
 assert.throws(()=>prepareAccountRecovery(path,prepareAccountRecovery(path,source)),/Unsupported account recovery grammar/);
 assert.throws(()=>prepareAccountRecovery(path,source.replace('},rotate);rotate.disabled=!acknowledged;', '},rotate);rotate.disabled=false;')),/Unsupported account recovery grammar/);
 assert.equal(prepareAccountRecovery('account-core-ru/access.js',source),source);
 assert.equal(prepareAccountRecovery(path,source).replace("if(shown){if(t.root.hasAttribute('aria-busy'))t.cancel();hide();return;}",needle).replace("},rotate);rotate.disabled=t.root.hasAttribute('aria-busy')||!acknowledged;",'},rotate);rotate.disabled=!acknowledged;'),source);
});

test('recovery regression browser callbacks, hide intent and lifecycle',{skip:!process.env.SL_RECOVERY_HIDE_BROWSER},async t=>{
 const {runRecoveryRegression}=await import('../scripts/audit-recovery-hide-regression.mjs');
 const report=await runRecoveryRegression('green');
 for(const c of report.cases)await t.test(c.name,()=>assert.equal(c.pass,true,c.error));
 assert.deepEqual(report.errors,[]);assert.deepEqual(report.external,[]);assert.deepEqual(report.cleanup,{browser:true,server:true});
});
