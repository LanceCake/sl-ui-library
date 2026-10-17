import { essentials } from './essentials.js';
import { popular } from './popular.js';
import { motionTokens } from './motion-tokens.js';

const renderers={...essentials,...popular};
const only=new URLSearchParams(location.search).get('only')||'search';
const preview=document.querySelector('#preview');let lifecycle,sizeObserver,animations=new Set();const running=new WeakMap();
function render(){
  lifecycle?.abort();sizeObserver?.disconnect();for(const animation of animations)animation.cancel();animations.clear();
  lifecycle=new AbortController();preview.replaceChildren();
  const root=document.createElement('section');root.className='composition';root.dataset.component=only;
  const el=(tag,className='',text)=>{const node=document.createElement(tag);node.className=className;if(text!==undefined)node.textContent=text;return node;};
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate=(node,frames,duration=motionTokens.duration.layout)=>{running.get(node)?.cancel();if(reduced()||!node.isConnected)return;const a=node.animate(frames,{duration,easing:motionTokens.easing});running.set(node,a);animations.add(a);const done=()=>{animations.delete(a);if(running.get(node)===a)running.delete(node);};a.finished.then(done,done);return a;};
  const t={root,el,on:(node,type,callback)=>node.addEventListener(type,callback,{signal:lifecycle.signal}),
    heading(title,description,target=root){const header=el('header','heading');header.append(el('h1','',title),el('p','',description));target.append(header);},
    live(text){const node=el('p','status',text);node.setAttribute('role','status');node.setAttribute('aria-live','polite');return node;},
    motion(node){const opacity=getComputedStyle(node).opacity;animate(node,[{opacity:Math.min(Number(opacity),.8)},{opacity:1}],motionTokens.duration.content);},
    enter(node){const opacity=running.has(node)?getComputedStyle(node).opacity:0;animate(node,[{opacity},{opacity:1}],motionTokens.duration.content);},
    appear(node){const style=getComputedStyle(node),height=node.getBoundingClientRect().height;const previous=node.style.overflow;node.style.overflow='hidden';const a=animate(node,[{height:'0px',paddingTop:'0px',paddingBottom:'0px',opacity:0},{height:height+'px',paddingTop:style.paddingTop,paddingBottom:style.paddingBottom,opacity:1}]);const restore=()=>{if(node.isConnected)node.style.overflow=previous;};if(a)a.finished.then(restore,restore);else restore();},
    move(node,y,x=0){const transform=getComputedStyle(node).transform;if(transform!=='none'){const matrix=new DOMMatrixReadOnly(transform);x+=matrix.m41;y+=matrix.m42;}if(Math.abs(x)+Math.abs(y)>1)animate(node,[{transform:`translate(${x}px,${y}px)`},{transform:'translate(0,0)'}]);},
    swap(node,update){const from=node.getBoundingClientRect().height,opacity=getComputedStyle(node).opacity;running.get(node)?.cancel();update();const to=node.getBoundingClientRect().height;if(node.isConnected){const frames=Math.abs(from-to)>.5?[{height:from+'px',opacity:Math.min(Number(opacity),.88)},{height:to+'px',opacity:1}]:[{opacity:Math.min(Number(opacity),.88)},{opacity:1}];animate(node,frames,Math.abs(from-to)>.5?motionTokens.duration.layout:motionTokens.duration.content);}},
  };
  (renderers[only]||renderers.search)(t);preview.append(root);document.title=`${root.querySelector('h1,h2')?.textContent||'Композиция'} · SL UI Library`;
  if(parent!==window){sizeObserver=new ResizeObserver(()=>{const style=getComputedStyle(preview);parent.postMessage({kind:'sl-draft-size',key:only,height:root.getBoundingClientRect().height+parseFloat(style.paddingTop)+parseFloat(style.paddingBottom)},location.origin);});sizeObserver.observe(root);}
  const media=matchMedia('(prefers-reduced-motion: reduce)');media.addEventListener('change',()=>{if(media.matches)for(const a of animations)a.cancel();},{signal:lifecycle.signal});
  window.__draftReady=true;
}
render();
window.addEventListener('message',event=>{if(event.origin===location.origin&&['sl-draft-reset','sl-popular-reset'].includes(event.data?.kind)&&event.data.key===only)render();});
window.addEventListener('pagehide',()=>{lifecycle.abort();sizeObserver?.disconnect();preview.replaceChildren();for(const a of animations)a.cancel();});
