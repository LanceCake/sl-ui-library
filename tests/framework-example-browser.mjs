import assert from 'node:assert/strict';

export async function copiedFeedbackTests(t,page,host){
 // Observe actual delegated listener lifetimes without adding a test API to examples.
 await page.evaluate(()=>{
  window.__feedbackListeners=[];window.__feedbackSignals=[];const original=EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener=function(type,listener,options){if(type==='click'&&this instanceof Element&&this.matches('.fb-demo'))__feedbackListeners.push({root:this,signal:options?.signal});if(type==='abort'&&this instanceof AbortSignal)__feedbackSignals.push(this);return original.call(this,type,listener,options);};
 });
 const first=()=>page.locator('[data-example="first"]'),root=()=>first().locator('.fb-demo');
 const choose=async variant=>{await page.getByRole('navigation',{name:'Example variants'}).getByRole('button',{name:variant,exact:true}).click();await root().waitFor();await page.waitForFunction(()=>document.querySelector('[data-example="first"] [data-sl-react]')?.getAttribute('aria-busy')==='false');};
 const state=async expected=>{await page.waitForFunction(value=>document.querySelector('[data-example="first"] [data-sl-react]>div').shadowRoot.querySelector('.fb-demo').dataset.state===value,expected,{timeout:6000});};
 await t.test(host+' copied Feedback visible start, cancel, reset, mode and local failure controls',async()=>{
  for(const variant of ['linear-feedback','circular-feedback','loading-feedback','skeleton-feedback']){
   await choose(variant);const start=first().locator('[data-demo="start"],[data-demo="load"]');await start.click();await state('pending');await state('complete');
   await first().getByRole('button',{name:'Reset local example',exact:true}).click();await start.click();await state('pending');await page.evaluate(()=>window.__pendingExampleSignal=__feedbackSignals.at(-1));assert.equal(await page.evaluate(()=>__pendingExampleSignal?.aborted),false);
   if(variant==='skeleton-feedback'){await first().locator('[data-demo="reset"]').click();await state('idle');}else{await first().locator('[data-demo="cancel"]').click();await state('canceled');}
   assert.equal(await page.evaluate(()=>__pendingExampleSignal.aborted),true);
   await first().getByRole('button',{name:'Reset local example',exact:true}).click();
   if(await first().locator('[data-demo="unknown"]').count()){
    await first().locator('[data-demo="unknown"]').click();await state('pending');assert.equal(await first().locator('[data-progress]').getAttribute('data-mode'),'unknown');assert.equal(await first().locator('[data-progress]').getAttribute('aria-valuenow'),null);await first().locator('[data-demo="unknown"]').click();assert.equal(await first().locator('[data-progress]').getAttribute('data-mode'),'determinate');assert.notEqual(await first().locator('[data-progress]').getAttribute('aria-valuenow'),null);await first().locator('[data-demo="cancel"]').click();await state('canceled');
   }
  }
 });
 await t.test(host+' copied Feedback tone/show/remove and stack delegation survive reset and StrictMode remount',async()=>{
  await choose('toast-feedback');await first().locator('[data-demo="tone"][data-tone="error"]').click();assert.equal(await root().getAttribute('data-tone'),'error');assert.equal(await first().locator('[data-demo="tone"][data-tone="error"]').getAttribute('aria-pressed'),'true');
  await first().locator('[data-action="dismiss"]').click();assert.equal(await first().locator('[data-panel]').getAttribute('aria-hidden'),'true');await first().locator('[data-demo="show"]').click();assert.equal(await first().locator('[data-panel]').getAttribute('data-visible'),'true');
  await first().getByRole('button',{name:'Reset local example',exact:true}).click();await first().locator('[data-demo="tone"][data-tone="info"]').click();assert.equal(await root().getAttribute('data-tone'),'info');
  await choose('undo-feedback');await first().locator('[data-demo="remove"]').click();await first().locator('[data-action="undo"]').click();await state('pending');await state('complete');await first().locator('[data-demo="remove"]').click();await state('removed');
  await choose('stack-feedback');await first().locator('[data-demo="add"]').click();assert.match(await first().locator('[data-queue]').textContent(),/1 queued/);await first().locator('[data-demo="clear"]').click();await page.waitForFunction(()=>document.querySelector('[data-example="first"] [data-sl-react]>div').shadowRoot.querySelectorAll('.fb-stack-item').length===0);
  for(let i=0;i<2;i++){await first().getByRole('button',{name:'Reset local example',exact:true}).click();await first().locator('[data-demo="add"]').click();assert.match(await first().locator('[data-queue]').textContent(),/1 queued/);}
  await root().evaluate(node=>window.__oldStack=node);await page.getByRole('button',{name:'Remount example',exact:true}).click();await root().waitFor();await first().locator('[data-demo="add"]').click();assert.match(await first().locator('[data-queue]').textContent(),/1 queued/);assert.equal(await page.evaluate(()=>{const entries=__feedbackListeners.filter(entry=>entry.root===__oldStack);return entries.length===2&&entries.every(entry=>entry.signal?.aborted);}),true);
  await page.getByRole('button',{name:'Toggle second example',exact:true}).click();const second=page.locator('[data-example="second"]');await second.locator('.fb-demo').waitFor();await second.locator('[data-demo="add"]').click();assert.match(await second.locator('[data-queue]').textContent(),/1 queued/);assert.match(await first().locator('[data-queue]').textContent(),/1 queued/);
 });
 await t.test(host+' copied Feedback connection/offline, retry, alert reset and pending unmount stay local',async()=>{
  for(const [variant,action]of [['connection-feedback','reconnect'],['retry-feedback','retry']]){await choose(variant);await first().locator('[data-action="'+action+'"]').click();await state('pending');await state('complete');const restore=first().locator('[data-demo="offline"],[data-demo="reset"]');await restore.click();await first().locator('[data-demo-error]').check();await first().locator('[data-action="'+action+'"]').click();await state('pending');await state('error');await restore.click();await first().locator('[data-action="'+action+'"]').click();await state('pending');await state('complete');}
  await choose('alert-feedback');await first().locator('[data-action="dismiss"]').click();await first().locator('[data-demo="show"]').click();assert.equal(await first().locator('[data-panel]').getAttribute('data-visible'),'true');
  await choose('linear-feedback');await first().locator('[data-demo="start"]').click();await state('pending');await root().evaluate(node=>{window.__detachedExample={node,completed:0};node.addEventListener('feedbackcomplete',()=>__detachedExample.completed++);});await page.getByRole('button',{name:'Toggle example',exact:true}).click();assert.equal(await page.evaluate(()=>{const entries=__feedbackListeners.filter(entry=>entry.root===__detachedExample.node);return entries.length===2&&entries.every(entry=>entry.signal?.aborted);}),true);await page.waitForTimeout(3600);assert.equal(await page.evaluate(()=>__detachedExample.completed),0);assert.equal(await page.evaluate(()=>[...__detachedExample.node.querySelectorAll('button')].every(button=>button.disabled)),true);
  await page.getByRole('button',{name:'Toggle example',exact:true}).click();await root().waitFor();await first().locator('[data-demo="start"]').click();await state('pending');await first().locator('[data-demo="cancel"]').click();await state('canceled');
 });
}
