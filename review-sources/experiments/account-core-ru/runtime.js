import {actionStyles} from './comfort.js';
import {previews} from '/preview-data.js';
import motion from './motion.tokens.json' with {type:'json'};
const mounts=new WeakMap();
export function el(tag,cls='',text=''){const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;}
export function glyph(name){
  const paths={user:'M16 7A4 4 0 1 1 8 7A4 4 0 1 1 16 7M4 21V19A8 8 0 0 1 20 19V21',shield:'M12 3L20 6V12C20 17 16 20 12 22C8 20 4 17 4 12V6ZM9 12L12 15L16 10',laptop:'M4 4H20V16H4ZM2 20H22M9 16L8 20M15 16L16 20',phone:'M7 2H17V22H7ZM11 18H13',key:'M13 8A5 5 0 1 1 3 8A5 5 0 1 1 13 8M13 8H22M18 8V12M21 8V11',link:'M9 15L15 9M8 12L6 14A4 4 0 0 0 12 20L15 17M16 12L18 10A4 4 0 0 0 12 4L9 7',mail:'M3 5H21V19H3ZM3 5L12 13L21 5',pin:'M19 10C19 15 12 22 12 22S5 15 5 10A7 7 0 1 1 19 10ZM15 10A3 3 0 1 1 9 10A3 3 0 1 1 15 10',right:'M5 12H19M14 7L19 12L14 17',close:'M6 6L18 18M18 6L6 18',plus:'M5 12H19M12 5V19',edit:'M4 20L5 15L17 3L21 7L9 19ZM14 6L18 10',eye:'M2 12Q12 1 22 12Q12 23 2 12ZM15 12A3 3 0 1 1 9 12A3 3 0 1 1 15 12',undo:'M5 10H14A5 5 0 0 1 14 20M5 10L10 5M5 10L10 15'};
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]||paths.user);svg.append(path);return svg;
}
export function mount(root,{key,renderers,...options}){
  if(!renderers[key])throw new TypeError('Unknown account workflow');mounts.get(root)?.destroy();
  let lifetime,cleanups=[],pending=null,read=()=>({}),destroyed=false;const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  function cancel(){if(!pending)return;const p=pending;pending=null;p.abort.abort();p.button?.removeAttribute('aria-busy');if(p.button)p.button.disabled=p.wasDisabled;root.removeAttribute('aria-busy');}
  function dispose(){cancel();lifetime?.abort();cleanups.forEach(fn=>fn());cleanups=[];}
  function render(){
    dispose();lifetime=new AbortController();root.replaceChildren();root.className='account-control';root.dataset.kind=key;
    root.style.setProperty('--ac-fast',motion.duration.short4.$value);root.style.setProperty('--ac-duration',motion.duration.medium2.$value);root.style.setProperty('--ac-ease',`cubic-bezier(${motion.easing.settle.$value.join(',')})`);
    let listenerScope=null;
    const on=(node,event,handler,extra={})=>node.addEventListener(event,handler,{...extra,signal:listenerScope?AbortSignal.any([lifetime.signal,listenerScope.signal]):lifetime.signal});
    const status=el('p','ac-status','Локальный пример. Изменения не отправляются на сервер.');status.setAttribute('role','status');status.setAttribute('aria-atomic','true');
    const t={root,options,el,glyph,on,reduced,signal:lifetime.signal,cleanup:fn=>cleanups.push(fn),
      say(text){status.textContent=text;},
      emit(state){const safe=structuredClone(state);options.onChange?.(safe);root.dispatchEvent(new CustomEvent('sl:change',{bubbles:true,detail:structuredClone(safe)}));},
      title(title,hint,icon='user'){const head=el('div','ac-heading'),mark=el('span','ac-mark');mark.append(glyph(icon));head.append(mark,el('h2','ac-title',title));root.append(head,el('p','ac-hint ac-intro',hint));},
      button(label,handler,kind='primary'){
        const host=el('span','ac-action'),shadow=host.attachShadow({mode:'open'}),style=el('style');
        style.textContent=previews.pair.css+`:host{display:inline-flex;min-width:0;max-width:100%;font-family:'Segoe UI',sans-serif}.button-kit{--focus-ring:#eee;font-family:'Segoe UI',sans-serif;display:block;min-width:0;width:100%}.bk-button{width:auto;max-width:100%;height:44px;font:500 16px/1.4 'Segoe UI',sans-serif;letter-spacing:0;min-width:0;border-radius:11px;outline-offset:3px}.bk-surface{position:relative;min-height:44px;padding:10px 16px;color:#f4f4f4}.bk-label{position:relative;inset:auto;white-space:normal;overflow-wrap:anywhere;opacity:1;transition:none;gap:8px}.bk-button--cancel .bk-surface{background:#3c3c3c;color:#ddd}.bk-button--cancel:hover .bk-surface{background:#474747}.bk-button:disabled{opacity:.4;cursor:default}.bk-button:disabled .bk-surface,.bk-button[aria-busy=true] .bk-surface{transform:none!important}.bk-surface:before,.bk-surface:after{display:none}.bk-button[aria-busy=true]{cursor:progress}.bk-button--quiet .bk-surface{background:transparent;box-shadow:none;color:#c6c6c6;padding-inline:8px}.bk-button--small{font-size:14px;height:36px;border-radius:8px}.bk-button--small .bk-surface{min-height:36px;padding:7px 10px}.bk-button svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}.bk-button:focus-visible{outline:2px solid #eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`;
        style.textContent+=actionStyles;
        const kit=el('span','button-kit'),button=el('button',`bk-button bk-button--${kind==='primary'?'save':kind==='quiet'?'quiet':'cancel'} ${kind==='small'?'bk-button--small':''}`),surface=el('span','bk-surface'),text=el('span','bk-label',label);button.type='button';surface.append(text);button.append(surface);kit.append(button);shadow.append(style,kit);on(button,'click',handler);button.view=host;button.label=text;return button;
      },
      actions(...buttons){const n=el('div','ac-actions');n.append(...buttons.map(b=>b.view||b));return n;},
      field(label,value='',variant='text-input'){
        const definition=previews[variant];if(!definition)throw new Error(`Unknown field ${variant}`);
        const host=el('div','ac-source'),shadow=host.attachShadow({mode:'open'});shadow.innerHTML=definition.markup; // Trusted generated library markup only; never user values.
        const style=el('style');style.textContent=definition.css+`:host{display:block;min-width:0}.sl-field{width:100%;max-width:none;--field-ink:#222;--field-hover:#2c2c2c;--field-focus:#dedede;font-family:'Segoe UI',sans-serif;font-synthesis:none}.sl-field input,.sl-field textarea,.sl-field label,.sl-field button,.sl-code__label{font-family:'Segoe UI',sans-serif!important}.sl-field__input{font-size:16px!important}.sl-field__label{font-size:16px}.sl-field__helper,.sl-field__counter{display:none!important}.sl-field__control{margin:0}.sl-field.sl-field--textarea .sl-field__control{max-height:none}.sl-field textarea{resize:none;overflow:hidden!important}.sl-code__label{font-size:13px;color:#c6c6c6}.sl-code__control{margin-top:8px}.sl-field__reveal:focus-visible{outline-color:#eee}@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`;shadow.prepend(style);
        const fieldRoot=shadow.querySelector(definition.rootSelector||'.sl-field'),input=shadow.querySelector('input,textarea'),caption=shadow.querySelector('.sl-field__label,.sl-code__label');
        caption.textContent=label;input.setAttribute('aria-label',label);input.removeAttribute('aria-describedby');input.removeAttribute('required');input.removeAttribute('maxlength');input.value=value;input.defaultValue=value;input.autocomplete=variant==='password-input'?'off':input.autocomplete;
        // Keep the source six-cell geometry, but verification belongs to the host
        // workflow, not the source preview's hard-coded accepted code.
        let control;
        if(variant==='code-input'){
          const cells=[...shadow.querySelectorAll('.sl-code__cells span')];
          const paint=()=>{input.value=input.value.replace(/\D/g,'').slice(0,6);fieldRoot.dataset.result='neutral';fieldRoot.dataset.length=String(input.value.length);fieldRoot.dataset.complete=String(input.value.length===6);cells.forEach((cell,i)=>{cell.textContent=input.value[i]||'';cell.classList.toggle('is-filled',i<input.value.length);cell.classList.toggle('is-active',shadow.activeElement===input&&i===Math.min(5,input.value.length));});};
          for(const type of ['input','compositionend','focus','blur'])on(input,type,paint);paint();control={reset(){input.value='';paint();},destroy(){input.value='';cells.forEach(c=>c.textContent='');}};
        }else control=definition.mount(fieldRoot);
        cleanups.push(()=>{if(variant==='password-input')input.value='';control.destroy();});
        const reveal=shadow.querySelector('.sl-field__reveal');if(reveal){const localize=()=>reveal.setAttribute('aria-label',control.isVisible?'Скрыть пароль':'Показать пароль');localize();on(reveal,'click',localize);}
        if(input.tagName==='TEXTAREA'){
          const box=shadow.querySelector('.sl-field__control');let width=0;
          const resize=()=>{if(!host.getBoundingClientRect().width)return;input.style.height='0px';const height=Math.max(76,input.scrollHeight+2);input.style.height='100%';box.style.height=height+'px';};
          on(input,'input',resize);on(input,'compositionend',resize);on(window,'resize',resize);const observer=new ResizeObserver(()=>{const next=host.getBoundingClientRect().width;if(next!==width){width=next;resize();}});observer.observe(host);cleanups.push(()=>observer.disconnect());
        }
        return {node:host,input,control};
      },
      listRow(title,detail,icon='key'){
        const row=el('div','ac-row'),mark=el('span','ac-row-icon'),copy=el('div','ac-row-copy'),name=el('strong','ac-row-name',title),caption=el('span','ac-hint',detail);mark.append(glyph(icon));copy.append(name,caption);row.append(mark,copy);return {node:row,copy,name,caption};
      },
      list(container,{animateInsert=false}={}){
        const entries=new Map();let initialized=false;
        cleanups.push(()=>{for(const entry of entries.values()){entry.scope?.abort();clearTimeout(entry.timer);}});
        return (records,build)=>{
          const ids=new Set(records.map(r=>r.id));
          for(const [id,entry]of entries)if(!ids.has(id)&&entry.node.dataset.removed!=='true'){
            entry.node.dataset.removed='true';entry.node.inert=true;entry.node.setAttribute('aria-hidden','true');entry.scope?.abort();
            const finish=()=>{if(entry.node.dataset.removed==='true'){entry.node.remove();entries.delete(id);}};
            if(reduced.matches)finish();else entry.timer=setTimeout(finish,parseFloat(motion.duration.medium2.$value));
          }
          for(const record of records){
            let entry=entries.get(record.id);const fresh=!entry;
            if(!entry){const node=el('div','ac-list-slot'),inner=el('div','ac-list-slot-inner');node.dataset.id=record.id;node.append(inner);entry={node,inner};entries.set(record.id,entry);container.append(node);}
            clearTimeout(entry.timer);entry.node.dataset.removed='false';entry.node.inert=false;entry.node.removeAttribute('aria-hidden');
            const fingerprint=JSON.stringify(record);
            if(entry.fingerprint!==fingerprint||!entry.scope||entry.scope.signal.aborted){entry.scope?.abort();entry.scope=new AbortController();const previous=listenerScope;listenerScope=entry.scope;try{entry.inner.replaceChildren(build(record));entry.fingerprint=fingerprint;}finally{listenerScope=previous;}}
            if(fresh&&initialized&&animateInsert&&!reduced.matches){entry.node.dataset.entering='true';entry.node.getBoundingClientRect();delete entry.node.dataset.entering;}
          }
          initialized=true;
        };
      },
      panels(panes){
        const node=el('div','ac-panels');let current=0;panes.forEach((pane,i)=>{pane.classList.add('ac-pane');pane.dataset.active=String(i===0);pane.inert=i!==0;pane.setAttribute('aria-hidden',String(i!==0));node.append(pane);});
        return {node,select(index){if(index===current)return;current=index;panes.forEach((pane,i)=>{pane.dataset.active=String(i===index);pane.inert=i!==index;pane.setAttribute('aria-hidden',String(i!==index));});}};
      },
      reveal(content){
        const node=el('div','ac-reveal'),inner=el('div','ac-reveal-inner');inner.append(content);node.append(inner);node.dataset.open='false';node.inert=true;node.setAttribute('aria-hidden','true');return {node,set(open){node.dataset.open=String(open);node.inert=!open;node.setAttribute('aria-hidden',String(!open));}};
      },
      toggle(label,checked,change){const row=el('label','ac-switch'),input=el('input'),track=el('span','ac-switch-track');input.type='checkbox';input.checked=checked;row.append(el('span','',label),input,track);on(input,'change',()=>change(input.checked));return {node:row,input};},
      async run(type,payload,apply,button){
        if(pending||destroyed)return false;
        if(!options.demo&&typeof options.onAction!=='function'){t.say('Действие не подключено. Данные не изменены.');return false;}
        const operation={abort:new AbortController(),button,wasDisabled:button?.disabled};pending=operation;root.setAttribute('aria-busy','true');if(button){button.disabled=true;button.setAttribute('aria-busy','true');}t.say('Обрабатываем действие… Можно отменить.');
        try{
          const result=options.demo?{demo:true}:await options.onAction({type,payload},{signal:operation.abort.signal});
          if(pending!==operation||operation.abort.signal.aborted)return false;
          if(result===false)throw new Error('Action rejected');
          apply(result);t.say(options.demo?'Изменено только в примере. На сервер ничего не отправлено.':'Обработчик завершил действие.');return true;
        }catch(error){if(pending===operation&&!operation.abort.signal.aborted)t.say('Не удалось выполнить действие. Данные сохранены — попробуйте ещё раз.');return false;}
        finally{if(pending===operation){pending=null;root.removeAttribute('aria-busy');if(button){button.disabled=operation.wasDisabled;button.removeAttribute('aria-busy');}}}
      },
      cancel(){cancel();t.say('Действие отменено. Данные не изменены.');},
    };
    on(reduced,'change',()=>{root.dataset.reduced=String(reduced.matches);if(reduced.matches)root.getAnimations({subtree:true}).forEach(a=>a.finish());});root.dataset.reduced=String(reduced.matches);
    read=renderers[key](t)||(()=>({}));root.append(status);
    on(root,'keydown',event=>{if(event.key==='Escape'&&pending){event.preventDefault();t.cancel();}});
  }
  render();const controller={reset(){if(!destroyed)render();},cancel(){if(destroyed)return;cancel();root.querySelector('.ac-status').textContent='Действие отменено. Данные не изменены.';},destroy(){if(destroyed)return;destroyed=true;dispose();root.replaceChildren();mounts.delete(root);},get state(){return {key,destroyed,pending:!!pending,...(!destroyed?read():{})};}};mounts.set(root,controller);return controller;
}
