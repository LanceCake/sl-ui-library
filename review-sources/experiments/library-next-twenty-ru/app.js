import {forms} from './forms.js';
import {blocks} from './blocks.js';
import {commerce} from './commerce.js';
import {tools} from './tools.js';
import {motionTokens} from '/drafts/ru/motion-tokens.js';

const renderers={...forms,...blocks,...commerce,...tools};
const key=new URLSearchParams(location.search).get('only')||'login';
const preview=document.querySelector('#preview');
let lifecycle,observer;const animations=new Set(),running=new WeakMap(),visibility=new WeakMap();
function render(){
  lifecycle?.abort();observer?.disconnect();for(const a of animations)a.cancel();animations.clear();
  lifecycle=new AbortController();preview.replaceChildren();
  const root=document.createElement('section');root.className='composition next-composition';root.dataset.component=key;
  const el=(tag,className='',text)=>{const n=document.createElement(tag);n.className=className;if(text!==undefined)n.textContent=text;return n;};
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  function animate(node,frames,duration=motionTokens.duration.layout){
    running.get(node)?.cancel();if(reduced.matches||!node.isConnected)return;
    const a=node.animate(frames,{duration,easing:motionTokens.easing});running.set(node,a);animations.add(a);
    const done=()=>{animations.delete(a);if(running.get(node)===a)running.delete(node);};a.finished.then(done,done);return a;
  }
  const mounted=[];
  const t={root,el,
    cleanup(callback){const signal=lifecycle.signal;signal.addEventListener('abort',callback,{once:true});return ()=>{signal.removeEventListener('abort',callback);callback();};},
    mounted(callback){if(root.isConnected){const signal=lifecycle.signal;queueMicrotask(()=>{if(!signal.aborted)callback();});}else mounted.push(callback);},
    on(node,type,listener){node.addEventListener(type,listener,{signal:lifecycle.signal});},
    heading(title,description){const h=el('header','heading');h.append(el('h1','',title),el('p','',description));root.append(h);},
    live(text=''){const n=el('p','status',text);n.setAttribute('role','status');return n;},
    enter(node){const opacity=running.has(node)?getComputedStyle(node).opacity:0;animate(node,[{opacity,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],motionTokens.duration.content);},
    swap(node,update){
      const height=node.getBoundingClientRect().height,style=getComputedStyle(node),opacity=running.has(node)?+style.opacity:.35,transform=running.has(node)?style.transform:'translateY(3px)';
      running.get(node)?.cancel();update();const next=node.getBoundingClientRect().height;
      const layout=Math.abs(height-next)>.5;
      animate(node,layout?[{height:height+'px',opacity,transform},{height:next+'px',opacity:1,transform:'translateY(0)'}]:[{opacity,transform},{opacity:1,transform:'translateY(0)'}],layout?motionTokens.duration.layout:motionTokens.duration.content);
    },
    reveal(node,show){
      const height=node.getBoundingClientRect().height,style=getComputedStyle(node),opacity=style.opacity,margin=height?style.marginTop:'0px',padding=height?style.paddingTop:'0px';
      running.get(node)?.cancel();const operation={show};visibility.set(node,operation);node.hidden=false;node.inert=!show;
      const next=show?node.getBoundingClientRect().height:0,target=getComputedStyle(node);
      const a=animate(node,[{height:height+'px',opacity:height?opacity:0,marginTop:margin,paddingTop:padding},{height:next+'px',opacity:show?1:0,marginTop:show?target.marginTop:'0px',paddingTop:show?target.paddingTop:'0px'}]);
      const finish=()=>{if(visibility.get(node)===operation)node.hidden=!show;};if(a)a.finished.then(finish,finish);else finish();
    },
    reflow(node,update){const before=new Map([...node.children].map(n=>[n,n.getBoundingClientRect()]));update();for(const n of node.children){const old=before.get(n),now=n.getBoundingClientRect();if(old)animate(n,[{transform:`translate(${old.x-now.x}px,${old.y-now.y}px)`},{transform:'translate(0,0)'}]);else t.enter(n);}},
  };
  (renderers[key]||renderers.login)(t);preview.append(root);for(const callback of mounted)callback();
  document.title=`${root.querySelector('h1')?.textContent} · SL UI Library`;
  if(parent!==window){observer=new ResizeObserver(()=>{const css=getComputedStyle(preview);parent.postMessage({kind:'sl-draft-size',key,height:Math.ceil(root.getBoundingClientRect().height+parseFloat(css.paddingTop)+parseFloat(css.paddingBottom))},location.origin);});observer.observe(root);}
  reduced.addEventListener('change',()=>{if(reduced.matches)for(const a of animations)a.cancel();},{signal:lifecycle.signal});
  window.__draftReady=true;
}
render();
window.addEventListener('message',event=>{if(event.origin===location.origin&&event.data?.kind==='sl-next-reset'&&event.data.key===key)render();});
window.addEventListener('pagehide',()=>{lifecycle.abort();observer?.disconnect();for(const a of animations)a.cancel();preview.replaceChildren();});
