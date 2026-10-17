import {source,field as sourceField,action as sourceAction} from '/drafts/ru/source-host.js';
export {source};
export function action(...args){const host=sourceAction(...args),css=document.createElement('style');css.textContent='.button-kit{--focus-ring:#bdbdbd}';host.shadowRoot.append(css);return host;}
export const rub=value=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(value);
export function field(variant,label,value=''){
  const host=sourceField(variant,label);const prepare=host.config.prepare;
  host.config.prepare=shadow=>{prepare(shadow);const input=shadow.querySelector('input,textarea');input.value=value;input.removeAttribute('required');};
  host.config.copy={'Show password':'Показать пароль','Hide password':'Скрыть пароль'};
  host.config.css=".sl-field{--field-ink:#303030;--field-hover:#3b3b3b}.sl-field button{font-family:'Instrument Sans',sans-serif}";
  return host;
}
export const input=host=>host.shadowRoot.querySelector('input,textarea');
export function panel(t,...children){const node=t.el('div','panel next-panel');node.append(...children);return node;}
export function actions(t,...children){const node=t.el('div','next-actions');node.append(...children);return node;}
export function pair(t,label,value){const row=t.el('div','summary-line');row.append(t.el('span','',label),t.el('strong','',value));return row;}
export function choices(t,label,options,initial,onChange){
  const group=t.el('div','next-choices');group.setAttribute('role','group');group.setAttribute('aria-label',label);
  const indicator=t.el('span','choice-indicator');indicator.setAttribute('aria-hidden','true');group.append(indicator);
  let value=initial;const controls=options.map(([id,text,disabled=false])=>{
    const host=action(text,()=>set(id,true),true);host.button.disabled=disabled;host.button.setAttribute('aria-pressed',String(id===value));host.dataset.value=id;
    host.style.setProperty('--choice-min',Math.max(60,text.length*8+24)+'px');
    const css=document.createElement('style');css.textContent='.bk-button,.bk-button:hover,.bk-button:active{transform:none!important}.bk-button .bk-surface,.bk-button:hover .bk-surface,.bk-button:active .bk-surface{transform:none!important;background:transparent!important;box-shadow:none!important;color:#bdbdbd;transition:color 200ms}.bk-button[aria-pressed=true] .bk-surface{color:#fff}.bk-button:after{display:none}@media(prefers-reduced-motion:reduce){.bk-button .bk-surface{transition:none}}';host.shadowRoot.append(css);
    t.on(host.button,'keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(event.key))return;event.preventDefault();const enabled=controls.filter(c=>!c.button.disabled);const index=enabled.indexOf(host);const next=event.key==='Home'?0:event.key==='End'?enabled.length-1:(index+(['ArrowRight','ArrowDown'].includes(event.key)?1:-1)+enabled.length)%enabled.length;enabled[next].button.focus();set(enabled[next].dataset.value,true);});
    group.append(host);return host;
  });
  function measure(){const host=controls.find(c=>c.dataset.value===value);if(!host?.isConnected)return;indicator.style.transform=`translate(${host.offsetLeft}px,${host.offsetTop}px)`;indicator.style.width=host.offsetWidth+'px';indicator.style.height=host.offsetHeight+'px';}
  function set(next,emit=false){if(next===value||!controls.some(c=>c.dataset.value===next&&!c.button.disabled))return;value=next;controls.forEach(c=>c.button.setAttribute('aria-pressed',String(c.dataset.value===value)));measure();if(emit)onChange(next);}
  t.mounted(()=>{if(!group.isConnected)return;indicator.style.transition='none';measure();const frame=requestAnimationFrame(()=>indicator.style.removeProperty('transition'));const observer=new ResizeObserver(measure);observer.observe(group);group.dispose=t.cleanup(()=>{cancelAnimationFrame(frame);observer.disconnect();});});
  return {node:group,set,get value(){return value;}};
}
export function check(t,label,checked,onChange){
  const row=t.el('label','next-check'),control=t.el('input');control.type='checkbox';control.checked=checked;
  row.append(control,t.el('span','',label));t.on(control,'change',()=>onChange(control.checked));return {node:row,input:control};
}
export function quantity(t,initial,onChange){
  let count=initial;const row=t.el('div','quantity'),value=t.el('output','',String(count));value.setAttribute('aria-label','Количество');
  const minus=action('−',()=>set(count-1),true,'small'),plus=action('+',()=>set(count+1),true,'small');minus.button.setAttribute('aria-label','Уменьшить количество');plus.button.setAttribute('aria-label','Увеличить количество');
  for(const host of [minus,plus]){const css=document.createElement('style');css.textContent='.bk-button,.bk-button:hover,.bk-button:active{transform:none!important}.bk-surface,.bk-button:hover .bk-surface,.bk-button:active .bk-surface{background:#3b3b3b!important;box-shadow:none!important;transform:none!important}';host.shadowRoot.append(css);}
  function set(next){const bounded=Math.max(1,Math.min(9,next));if(bounded===count)return;count=bounded;t.swap(value,()=>value.textContent=String(count));minus.button.disabled=count===1;plus.button.disabled=count===9;onChange(count);}
  minus.button.disabled=count===1;plus.button.disabled=count===9;row.append(minus,value,plus);return {node:row,get value(){return count;}};
}
export function pill(t,text){return t.el('span','next-pill',text);}
