import{retainFont as C}from"./react-font.mjs";const A="brightness-slider";const P='<div class="sl-slider sl-slider--brightness" data-slider="brightness"><div class="slider-header"><label for="slider-brightness"><svg class="slider-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><g class="sun-rays"><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></g></svg><span>Brightness</span></label><output for="slider-brightness" data-output>48%</output></div><div class="slider-track"><span class="slider-rail" aria-hidden="true"><span class="slider-fill"></span></span><input class="slider-input" id="slider-brightness" name="slider-brightness" type="range" min="0" max="100" value="48" ></div><div class="slider-ends"><span>0</span><span>100</span></div></div>';const L=`@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
.sl-slider {
  --slider-ink: #222222; --slider-light: #efefef; --slider-muted: #b3b3b3;
  --slider-ease: cubic-bezier(.22,.61,.36,1); --low: 0%; --high: 50%;
  width: min(320px,100%); min-width: 0; margin: 0; padding: 20px;
  border: 1px solid #ffffff0b; border-radius: 14px;
  background: var(--slider-ink); color: var(--slider-light);
  box-shadow: inset 0 1px #ffffff0d,0 2px 5px #00000010;
  font-family: 'Instrument Sans',sans-serif; text-align: left;
}
.sl-slider, .sl-slider * { box-sizing: border-box; }
.slider-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 26px; font-size: 14px; }
.slider-header label { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.slider-header svg { width: 24px; height: 24px; flex: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.slider-header output { font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; color: #cecece; }
.slider-track { position: relative; height: 46px; margin-top: 18px; }
.slider-rail { position: absolute; left: 12px; right: 12px; height: 4px; top: 21px; background: #5f5f5f; border-radius: 3px; pointer-events: none; }
.slider-fill { position: absolute; top: 0; bottom: 0; left: var(--low); right: calc(100% - var(--high)); border-radius: inherit; background: var(--slider-light); }
.slider-input { position: absolute; inset: 0; margin: 0; width: 100%; height: 46px; appearance: none; -webkit-appearance: none; border: 0; background: transparent; cursor: pointer; touch-action: pan-y; }
.slider-input::-webkit-slider-runnable-track { height: 4px; background: transparent; border: 0; }
.slider-input::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 24px; height: 24px; margin-top: -10px; border: 1px solid #fdfdfd; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease, border-radius 280ms var(--slider-ease); }
.slider-input::-moz-range-track { height: 4px; background: transparent; border: 0; }
.slider-input::-moz-range-thumb { width: 22px; height: 22px; border: 1px solid #fdfdfd; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease; }
.slider-input:active::-webkit-slider-thumb { box-shadow: 0 0 0 5px #f3f3f319,0 2px 5px #0007; border-radius: 7px; }
.slider-input:active::-moz-range-thumb { box-shadow: 0 0 0 5px #f3f3f319,0 2px 5px #0007; }
.slider-input:focus-visible { outline: 1px solid #d2d2d2; outline-offset: 3px; border-radius: 8px; }
.slider-input:disabled { cursor: not-allowed; opacity: .5; }
.slider-ends { display: flex; justify-content: space-between; padding-inline: 8px; color: var(--slider-muted); font-size: 11px; }
.sl-slider--volume .slider-header svg { width: 28px; height: 28px; }
.volume-wave { stroke-dasharray: 1; transform-origin: 12px 12px; transition: opacity 180ms ease, stroke-dashoffset 200ms var(--slider-ease), transform 200ms var(--slider-ease); }
.volume-wave.one { opacity: var(--wave-one,1); stroke-dashoffset: calc(1 - var(--wave-one,1)); transform: scaleX(calc(.85 + var(--wave-one,1) * .15)); }
.volume-wave.two { opacity: var(--wave-two,.7); stroke-dashoffset: calc(1 - var(--wave-two,.7)); transform: scaleX(calc(.85 + var(--wave-two,.7) * .15)); }
.volume-mute { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 300ms var(--slider-ease); }
.sl-slider--volume[data-zero="true"] .volume-mute { opacity: 1; stroke-dashoffset: 0; }
.sun-rays { transform-origin: 12px 12px; transform: rotate(var(--sun-angle,0deg)); opacity: var(--sun-opacity,.7); transition: transform 100ms linear, opacity 100ms linear; }
.sl-slider--brightness .slider-input::-webkit-slider-thumb { border-radius: 50%; }
.sl-slider--brightness .slider-input::-moz-range-thumb { border-radius: 50%; }
.slider-step-labels { display: flex; justify-content: space-between; color: var(--slider-muted); font-size: 10px; }
.slider-step-labels span { position: relative; transition: color 220ms ease; }
.slider-step-labels span::before { content: ""; display: block; width: 3px; height: 5px; background: #828282; border-radius: 2px; margin: 0 auto 6px; transition: background-color 220ms ease; }
.slider-step-labels span.is-current { color: #f3f3f3; }
.slider-step-labels span.is-current::before { background: #f3f3f3; }
.sl-slider--steps .slider-header { gap: 6px; }
.sl-slider--steps output { font-size: 12px; }
.slider-track--dual { touch-action: none; cursor: pointer; }
.slider-track--dual .slider-input { pointer-events: none; }
.slider-track--dual .slider-input::-webkit-slider-thumb { pointer-events: auto; }
.slider-track--dual .slider-input::-moz-range-thumb { pointer-events: auto; }
.slider-track--dual .slider-input:focus { z-index: 2; }
.sl-slider--vertical { width: 178px; }
.sl-slider--vertical .slider-header { font-size: 13px; gap: 6px; }
.slider-vertical-body { display: flex; justify-content: center; gap: 18px; margin-top: 12px; }
.sl-slider--vertical .slider-track { width: 46px; height: 172px; margin-top: 0; }
.sl-slider--vertical .slider-rail { top: 12px; bottom: 12px; height: auto; left: 21px; width: 4px; }
.sl-slider--vertical .slider-fill { left: 0; right: 0; top: calc(100% - var(--high)); bottom: 0; }
.sl-slider--vertical .slider-input { writing-mode: vertical-lr; direction: rtl; width: 46px; height: 172px; touch-action: pan-x; }
.sl-slider--vertical .slider-input::-webkit-slider-runnable-track { width: 4px; height: 100%; }
.sl-slider--vertical .slider-input::-webkit-slider-thumb { margin-top: 0; margin-left: -10px; }
.sl-slider--vertical .slider-input::-moz-range-track { width: 4px; height: 100%; }
.slider-scale { display: flex; flex-direction: column; justify-content: space-between; padding-block: 4px; color: #cecece; font-size: 14px; line-height: 16px; font-variant-numeric: tabular-nums; }
.sl-slider--vertical .slider-header output { font-size: 14px; }
.slider-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media(max-width:420px) { .sl-slider { padding: 16px; } .slider-header { font-size: 13px; } .slider-step-labels { font-size: 9px; } }
@media(prefers-reduced-motion:reduce) { .sl-slider * { transition: none !important; } .slider-input::-webkit-slider-thumb { transition: none !important; } .slider-input::-moz-range-thumb { transition: none !important; } }
@media(forced-colors:active) { .sl-slider { border-color: CanvasText; } .slider-rail { background: GrayText; } .slider-fill { background: Highlight; } .slider-input { forced-color-adjust: none; } .slider-input::-webkit-slider-thumb { background: Highlight; border-color: Canvas; } .slider-input::-moz-range-thumb { background: Highlight; border-color: Canvas; } }
`;function q(){return(()=>{const d=new WeakMap;function z(t,{onChange:a,formatValue:f}={}){if(d.has(t))return d.get(t);if(a!==void 0&&typeof a!=="function")throw new TypeError("onChange must be a function.");if(f!==void 0&&typeof f!=="function")throw new TypeError("formatValue must be a function.");const e=[...t.querySelectorAll('input[type="range"]')];const h=t.querySelector("[data-output]");if(!e.length||!h)throw new TypeError("A native range and output are required.");const l=new AbortController;const c=t.ownerDocument.defaultView;const b=e.length===2;const i=t.dataset.labels?.split(",");const u=n=>f?String(f(n)):b?"$"+n:n+"%";const s=t.querySelector(".slider-track");let o=null,E=false;const S=()=>e.map(n=>n.valueAsNumber);const g=n=>(n.valueAsNumber-Number(n.min))/(Number(n.max)-Number(n.min))*100;function y(n,x=false){if(E)return;if(b){if(e[0].valueAsNumber>e[1].valueAsNumber){if(n===e[0])e[0].value=e[1].value;else e[1].value=e[0].value}t.style.setProperty("--low",g(e[0])+"%");t.style.setProperty("--high",g(e[1])+"%");e[0].setAttribute("aria-valuemax",e[1].value);e[1].setAttribute("aria-valuemin",e[0].value);for(const r of e)r.setAttribute("aria-valuetext",u(r.valueAsNumber));h.textContent=u(e[0].valueAsNumber)+" – "+u(e[1].valueAsNumber)}else{const r=g(e[0]);t.style.setProperty("--high",r+"%");t.style.setProperty("--position",r+"%");if(t.hasAttribute("data-centered")){const p=(0-Number(e[0].min))/(Number(e[0].max)-Number(e[0].min))*100;t.style.setProperty("--low",Math.min(r,p)+"%");t.style.setProperty("--high",Math.max(r,p)+"%")}t.style.setProperty("--sun-angle",r*.9+"deg");t.style.setProperty("--sun-opacity",String(.25+r*.0075));t.dataset.zero=String(r===0);t.dataset.quiet=String(r<=50);if(t.dataset.slider==="volume"){t.style.setProperty("--wave-one",String(Math.min(1,r/35)));t.style.setProperty("--wave-two",String(Math.max(0,Math.min(1,(r-20)/80))))}h.textContent=i?i[e[0].valueAsNumber]:u(e[0].valueAsNumber);e[0].setAttribute("aria-valuetext",h.textContent);for(const p of t.querySelectorAll("[data-step]"))p.classList.toggle("is-current",Number(p.dataset.step)===e[0].valueAsNumber)}if(x){a?.(S());t.dispatchEvent(new c.CustomEvent("sliderchange",{bubbles:true,detail:{values:S()}}))}}t.addEventListener("input",n=>{if(e.includes(n.target))y(n.target,true)},{signal:l.signal});if(b){const n=r=>{const p=s.getBoundingClientRect();const k=Math.max(0,Math.min(1,(r.clientX-p.left-12)/(p.width-24)));const v=Number(o.min),m=Number(o.max),w=Number(o.step)||1;o.value=String(v+Math.round(k*(m-v)/w)*w);o.dispatchEvent(new c.Event("input",{bubbles:true}))};s.addEventListener("pointerdown",r=>{if(r.button!==0||e.includes(r.target)||o)return;const p=e.filter(m=>!m.disabled);if(!p.length)return;const k=s.getBoundingClientRect();const v=(r.clientX-k.left-12)/(k.width-24)*100;o=p.reduce((m,w)=>Math.abs(g(w)-v)<Math.abs(g(m)-v)?w:m);o.focus({preventScroll:true});s.setPointerCapture(r.pointerId);n(r);r.preventDefault()},{signal:l.signal});s.addEventListener("pointermove",r=>{if(o&&s.hasPointerCapture(r.pointerId))n(r)},{signal:l.signal});const x=()=>{const r=o;o=null;r?.dispatchEvent(new c.Event("change",{bubbles:true}))};s.addEventListener("pointerup",x,{signal:l.signal});s.addEventListener("pointercancel",x,{signal:l.signal});s.addEventListener("lostpointercapture",x,{signal:l.signal})}function M(){if(E)return;e.forEach(n=>{n.value=n.defaultValue});y()}e[0].form?.addEventListener("reset",()=>queueMicrotask(M),{signal:l.signal});c.addEventListener("pageshow",()=>y(),{signal:l.signal});y();const N={reset:M,get values(){return S()},destroy(){E=true;o=null;l.abort();d.delete(t)}};d.set(t,N);return N}return{mount:z}})()}function j(d,z={},{preview:t=false}={}){if(!d||typeof d.attachShadow!=="function")throw new TypeError("A DOM host is required");const a=d.shadowRoot||d.attachShadow({mode:"open"});a.innerHTML=P;const f=d.ownerDocument.createElement("style");const e=new URL("./instrument-sans-variable.woff2",import.meta.url).href;f.textContent=L.replaceAll("./instrument-sans-variable.woff2",e)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';a.prepend(f);const h=a.querySelector(".mixer-group,.sl-slider");if(!h){a.replaceChildren();throw new Error("Missing component root")}const l=C(d.ownerDocument,e);let c,b=false;try{const i=q(),u={};if(A==="upload")u.input=a.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(A))u.feedback=a.querySelector("."+A+"-feedback");if(t&&typeof i.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");c=(t?i.mountPreview:i.mount)(h,{...u,...z});if(typeof c?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(i){l();a.replaceChildren();throw i}return new Proxy(c,{get(i,u){if(u==="destroy")return()=>{if(b)return;b=true;try{i.destroy()}finally{l();a.replaceChildren()}};const s=Reflect.get(i,u,i);return typeof s==="function"?s.bind(i):s}})}export{j as mountInto,A as variant};
