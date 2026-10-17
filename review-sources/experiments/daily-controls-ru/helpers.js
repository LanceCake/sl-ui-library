import motion from './motion.tokens.json' with {type:'json'};
const mounted=new WeakMap();
export function el(tag,cls='',text=''){const node=document.createElement(tag);node.className=cls;node.textContent=text;return node;}
export function glyph(name){
  const paths={check:'M5 12L10 17L19 7',star:'M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7Z',copy:'M9 3L20 3L20 15L9 15ZM5 8L5 21L16 21L16 18',right:'M5 12L19 12M14 7L19 12L14 17',left:'M19 12L5 12M10 7L5 12L10 17',minus:'M5 12L19 12',plus:'M5 12L19 12M12 5L12 19',search:'M16 10A6 6 0 1 1 4 10A6 6 0 1 1 16 10M15 15L21 21',eye:'M2 12Q12 1 22 12Q12 23 2 12ZM15 12A3 3 0 1 1 9 12A3 3 0 1 1 15 12',close:'M6 6L18 18M18 6L6 18'};
  Object.assign(paths,{paste:'M9 4H5V21H19V4H15M9 3H15V7H9ZM8 14H16M12 10V18M9 15L12 18L15 15',cut:'M9 9L20 20M9 15L20 4M9 7A3 3 0 1 1 3 7A3 3 0 1 1 9 7ZM9 17A3 3 0 1 1 3 17A3 3 0 1 1 9 17',card:'M3 5H21V19H3ZM3 10H21M7 15H10',cash:'M3 6H21V18H3ZM14 12A2 2 0 1 1 10 12A2 2 0 1 1 14 12M6 12H6.1M18 12H18.1',pen:'M4 20L5 15L17 3L21 7L9 19ZM14 6L18 10',clock:'M21 12A9 9 0 1 1 3 12A9 9 0 1 1 21 12M12 6V12L16 14',box:'M3 7L12 3L21 7V17L12 21L3 17ZM3 7L12 11L21 7M12 11V21M8 5L17 9',undo:'M5 10H14A5 5 0 0 1 14 20M5 10L10 5M5 10L10 15'});
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[name]||paths.check);svg.append(path);return svg;
}
export function mount(root,{key,renderers,...options}){
  mounted.get(root)?.destroy();if(!renderers[key])throw new Error('Unknown daily control');
  let lifetime,cleanups,animations,reader,destroyed=false;const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  function cleanupView(){lifetime?.abort();cleanups?.forEach(fn=>fn());animations?.forEach(a=>a.cancel());}
  function render(){
    cleanupView();lifetime=new AbortController();cleanups=[];animations=new Set();root.replaceChildren();root.className='daily-control';root.dataset.kind=key;
    root.style.setProperty('--dc-fast',motion.duration.short4.$value);root.style.setProperty('--dc-duration',motion.duration.medium2.$value);root.style.setProperty('--dc-ease',`cubic-bezier(${motion.easing.settle.$value.join(',')})`);
    root.style.setProperty('--dc-exit',motion.duration.short2.$value);root.style.setProperty('--dc-stagger',motion.duration.short1.$value);
    const on=(target,type,fn,extra={})=>target.addEventListener(type,fn,{...extra,signal:lifetime.signal});
    const nodeAnimations=new WeakMap(),stopAnimation=node=>{nodeAnimations.get(node)?.cancel();nodeAnimations.delete(node);};
    const animate=(node,frames)=>{
      const previous=nodeAnimations.get(node),next=frames.map(frame=>({...frame}));
      if(previous?.playState==='running'){const current=getComputedStyle(node);for(const prop of Object.keys(next[0]))if(prop==='opacity'||prop==='transform')next[0][prop]=current[prop];}
      stopAnimation(node);if(reduced.matches)return;
      const a=node.animate(next,{duration:parseFloat(motion.duration.medium2.$value),easing:`cubic-bezier(${motion.easing.settle.$value.join(',')})`});nodeAnimations.set(node,a);animations.add(a);a.finished.catch(()=>{}).finally(()=>{animations.delete(a);if(nodeAnimations.get(node)===a)nodeAnimations.delete(node);});
    };
    const t={root,el,glyph,on,options,signal:lifetime.signal,reduced,animate,stopAnimation,cleanup:fn=>cleanups.push(fn),
      emit:state=>{options.onChange?.(structuredClone(state));root.dispatchEvent(new CustomEvent('sl:change',{bubbles:true,detail:structuredClone(state)}));},
      button(text,fn,icon){const b=el('button','dc-button',text);b.type='button';if(icon)b.prepend(glyph(icon));on(b,'click',fn);return b;},
      field(label,type='text',value=''){const wrap=el('label','dc-field'),caption=el('span','dc-label',label),input=el('input');input.type=type;input.value=value;wrap.append(caption,input);return {wrap,input};},
      live(text=''){const p=el('p','dc-status',text);p.setAttribute('role','status');p.setAttribute('aria-atomic','true');return p;},
      title(text,hint){root.append(el('h2','dc-title',text));if(hint)root.append(el('p','dc-hint',hint));},
      panels(panes,cls=''){
        const node=el('div',`dc-state-stack ${cls}`);let active=0;
        panes.forEach((pane,index)=>{pane.classList.add('dc-state');pane.dataset.active=String(index===active);pane.setAttribute('aria-hidden',String(index!==active));pane.inert=index!==active;node.append(pane);});
        return {node,panes,select(index){if(index===active)return false;if(!Number.isInteger(index)||index<0||index>=panes.length)return false;active=index;panes.forEach((pane,i)=>{pane.dataset.active=String(i===index);pane.setAttribute('aria-hidden',String(i!==index));pane.inert=i!==index;});return true;}};
      },
      spring(initial,paint){
        let p=initial,v=0,target=p,frame=0,last=0;const omega=Math.sqrt(500);
        const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;};
        function tick(now){frame=0;const dt=last?Math.min((now-last)/1000,.064):1/60;last=now;const d=p-target,c=v+omega*d,decay=Math.exp(-omega*dt);p=target+(d+c*dt)*decay;v=(v-omega*c*dt)*decay;
          if(Math.abs(p-target)<.001&&Math.abs(v)<.01){p=target;v=0;last=0;}else frame=requestAnimationFrame(tick);paint(p);}
        const snap=()=>{stop();p=target;v=0;paint(p);};
        on(reduced,'change',()=>{if(reduced.matches)snap();});cleanups.push(stop);paint(p);
        return {move(value,instant=false){target=value;if(instant||reduced.matches)snap();else if(!frame)frame=requestAnimationFrame(tick);},get value(){return p;}};
      },
    };
    on(reduced,'change',()=>{root.dataset.reduced=String(reduced.matches);if(reduced.matches){animations.forEach(a=>a.cancel());animations.clear();}});root.dataset.reduced=String(reduced.matches);
    reader=renderers[key](t)||(()=>({}));
  }
  render();const controller={reset(){if(!destroyed)render();},destroy(){if(destroyed)return;destroyed=true;cleanupView();root.replaceChildren();mounted.delete(root);},get state(){return {key,destroyed,...(!destroyed?reader():{})};}};mounted.set(root,controller);return controller;
}
