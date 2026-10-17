import {items} from './manifest.js';
import {icon} from './icons.js';
import {createMotion} from './motion.js';
import {createInviteMotion} from './invite-motion.js';
import {motionTokens} from './motion-tokens.js';

export function mount(root,{key,onAction,initial=false}={}){
  const item=items.find(x=>x.key===key);if(!item)throw new Error('Unknown button purpose');
  const lifetime=new AbortController(),reduced=matchMedia('(prefers-reduced-motion:reduce)');
  let operation=null,version=0,phase='idle',active=Boolean(initial),disabled=false,destroyed=false,hovered=false,keyboard=false,completed=false;
  const button=document.createElement('button');button.type='button';button.className='everyday-button';
  const surface=document.createElement('span');surface.className='button-surface';
  const glyph=icon(key);glyph.classList.add('button-icon');
  const motion=key==='invite'?createInviteMotion(glyph,reduced):createMotion(glyph,reduced,motionTokens.purposes[key]),persistent=key==='expand-all'||key==='invert';
  motion.reset(persistent&&active?1:0);
  const labels=document.createElement('span');labels.className='button-labels';
  const normal=document.createElement('span');normal.className='normal-label';normal.textContent=item.label;
  const alternate=document.createElement('span');alternate.className='alternate-label';alternate.textContent=item.alternate||item.label;
  labels.append(normal,alternate);surface.append(glyph,labels);button.append(surface);
  const status=document.createElement('p');status.className='button-status';status.setAttribute('role','status');status.setAttribute('aria-atomic','true');
  root.classList.add('everyday-component');root.dataset.kind=key;root.replaceChildren(button,status);
  function render(){
    root.dataset.phase=phase;root.dataset.active=String(active);root.dataset.reduced=String(reduced.matches);
    normal.setAttribute('aria-hidden',String(active&&Boolean(item.alternate)));alternate.setAttribute('aria-hidden',String(!active||!item.alternate));
    button.setAttribute('aria-label',active&&item.alternate?item.alternate:item.label);
    button.setAttribute('aria-busy',String(phase==='pending'));button.setAttribute('aria-disabled',String(disabled||phase==='pending'));
    if(item.alternate){button.setAttribute('aria-expanded',String(active));}
  }
  function cancel(){version++;operation?.abort();operation=null;}
  function rest(){if(persistent)motion.move(active?1:0);else if(!disabled&&!completed)motion.move(hovered||keyboard?motionTokens.anticipation:0);}
  async function activate(){
    if(destroyed||disabled||phase==='pending')return;
    cancel();const current=version;operation=new AbortController();const signal=operation.signal;
    if(typeof onAction!=='function'){phase='idle';status.textContent='Подключите действие в своём приложении.';render();return;}
    phase='pending';status.textContent='';render();
    try{
      const result=await onAction({key,active,signal});
      if(destroyed||current!==version||signal.aborted)return;
      active=result?.active??(item.alternate?!active:active);disabled=Boolean(result?.disabled);phase='complete';status.textContent=String(result?.message||'');render();
      completed=true;if(persistent)motion.move(active?1:0);else motion.play();
    }catch(error){
      if(destroyed||current!==version||signal.aborted)return;
      phase='error';status.textContent='Не получилось. Попробуйте ещё раз.';render();rest();
    }finally{if(current===version)operation=null;}
  }
  button.addEventListener('click',activate,{signal:lifetime.signal});
  button.addEventListener('pointerenter',event=>{if(event.pointerType==='touch')return;hovered=true;if(phase==='idle'&&!persistent)rest();},{signal:lifetime.signal});
  button.addEventListener('pointerleave',()=>{hovered=false;if(!keyboard)rest();},{signal:lifetime.signal});
  button.addEventListener('focus',()=>{keyboard=button.matches(':focus-visible');if(phase==='idle'&&!persistent)rest();},{signal:lifetime.signal});
  button.addEventListener('blur',()=>{keyboard=false;if(!hovered)rest();},{signal:lifetime.signal});
  reduced.addEventListener('change',()=>{motion.reduce();render();},{signal:lifetime.signal});render();
  return {
    button,status,
    get state(){return {key,phase,active,disabled,destroyed,motion:motion.state};},
    reset(){if(destroyed)return;cancel();phase='idle';active=Boolean(initial);disabled=false;completed=false;status.textContent='';motion.reset(persistent&&active?1:0);render();},
    destroy(){if(destroyed)return;cancel();destroyed=true;motion.destroy();lifetime.abort();root.replaceChildren();},
  };
}
