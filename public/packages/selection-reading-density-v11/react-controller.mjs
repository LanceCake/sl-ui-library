import{retainFont as q}from"./react-font.mjs";const S="selection-reading-density-v11";const B='<section class="sl-component" data-kind="selection-reading-density-v11" aria-label="Reading density">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6h14M5 12h10M5 18h14M19 10v4"/></svg><div><h2>Reading density</h2><p>Find a comfortable rhythm.</p></div></header>\n  <div class="sl-density-control"><button type="button" class="sl-action" data-action="less"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m14 6-6 6 6 6"/></svg><span class="sl-sr">Less spacing</span></button><div><strong data-density>Balanced</strong><span data-step>2 of 3</span></div><button type="button" class="sl-action" data-action="more"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10 6 6 6-6 6"/></svg><span class="sl-sr">More spacing</span></button></div><div class="sl-reading" aria-label="Spacing sample"><span>Morning notes</span><span>A quieter workspace</span><span>Room for the next idea</span></div>\n  <p class="sl-status" role="status" data-status>Balanced spacing</p>\n</section>';const j=`@font-face {
  font-family: 'Instrument Sans';
  src: url('./instrument-sans-variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
}
.sl-component {
  --sl-surface: #222222;
  --sl-hover: #353535;
  --sl-inset: #1a1a1a;
  --sl-border: #525252;
  --sl-text: #f6f6f6;
  --sl-muted: #bdbdbd;
  --sl-accent: #e0e0e0;
  --sl-on-accent: #282828;
  --sl-selected: #454545;
  --sl-focus: #e0e0e0;
  --sl-disabled: #929292;
  --sl-ease: cubic-bezier(.4, 0, .2, 1);
  width: min(320px, 100%);
  min-width: 0;
  padding: 20px;
  color: var(--sl-text);
  background: var(--sl-surface);
  border: 1px solid var(--sl-border);
  border-radius: 16px;
  box-shadow: 0 3px 8px #00000012;
  font: 14px/1.45 'Instrument Sans', sans-serif;
  font-synthesis: none;
  text-align: left;
  position: relative;
}
.sl-component, .sl-component *, .sl-component *::before, .sl-component *::after { box-sizing: border-box; }
.sl-component h2, .sl-component p { margin: 0; }
.sl-component h2 { font-size: 15px; font-weight: 550; letter-spacing: -.02em; }
.sl-component .sl-head { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.sl-component .sl-head > div { min-width: 0; }
.sl-component .sl-head p { margin-top: 4px; color: var(--sl-muted); font-size: 11px; }
.sl-component svg { flex: none; width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; color: var(--sl-accent); }
.sl-component button { font: inherit; color: inherit; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
.sl-component button:focus-visible { outline: 2px solid var(--sl-focus); outline-offset: 3px; }
.sl-component button:disabled { cursor: default; color: var(--sl-disabled); }
.sl-component button:disabled svg { color: inherit; }
.sl-component .sl-status { border-top: 1px solid var(--sl-border); padding-top: 12px; margin-top: 16px; color: var(--sl-muted); font-size: 11px; min-height: 29px; overflow-wrap: anywhere; }
.sl-component .sl-hint { color: var(--sl-muted); font-size: 11px; margin-top: 12px; }
.sl-component .sl-segments { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; padding: 4px; gap: 4px; background: var(--sl-inset); border: 1px solid var(--sl-border); border-radius: 10px; position: relative; isolation: isolate; }
.sl-component .sl-segments button { min-width: 0; padding: 8px 3px; min-height: 34px; border: 0; border-radius: 6px; background: transparent; color: var(--sl-muted); font-size: 11px; transition: color 180ms ease, background-color 220ms ease; }
.sl-component .sl-segments button[aria-checked="true"] { background: var(--sl-selected); color: var(--sl-text); font-weight: 600; }
.sl-component .sl-segments button:hover:not(:disabled) { color: var(--sl-text); }
.sl-component .sl-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; }
.sl-component .sl-row + .sl-row { border-top: 1px solid var(--sl-border); }
.sl-component .sl-row > span { min-width: 0; font-size: 12px; }
.sl-component .sl-row small { display: block; color: var(--sl-muted); margin-top: 3px; font-size: 10px; }
.sl-component .sl-toggle { flex: none; display: flex; align-items: center; gap: 7px; border: 0; padding: 4px; min-height: 36px; background: transparent; border-radius: 7px; }
.sl-component .sl-toggle .sl-toggle-word { font-size: 10px; width: 17px; color: var(--sl-muted); }
.sl-component .sl-toggle-track { display: block; position: relative; width: 38px; height: 22px; border-radius: 8px; border: 1px solid var(--sl-border); background: var(--sl-inset); transition: background-color 240ms ease; }
.sl-component .sl-toggle-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; background: var(--sl-muted); border-radius: 5px; transition: transform 300ms var(--sl-ease), background-color 200ms ease; }
.sl-component .sl-toggle[aria-checked="true"] .sl-toggle-track { background: var(--sl-selected); }
.sl-component .sl-toggle[aria-checked="true"] .sl-toggle-track::after { transform: translateX(16px); background: var(--sl-accent); }
.sl-component .sl-toggle:disabled .sl-toggle-track::after { background: var(--sl-disabled); }
.sl-component .sl-action { display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 8px 12px; min-height: 36px; border: 1px solid var(--sl-border); border-radius: 8px; background: var(--sl-inset); color: var(--sl-accent); font-size: 11px; transition: background-color 180ms ease, transform 180ms var(--sl-ease); }
.sl-component .sl-action:hover:not(:disabled) { background: var(--sl-hover); }
.sl-component .sl-action:active:not(:disabled) { transform: translateY(1px); }
.sl-component .sl-action svg { width: 16px; height: 16px; }
.sl-component .sl-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.sl-component .sl-action--primary { background: var(--sl-accent); color: var(--sl-on-accent); border-color: var(--sl-accent); }
.sl-component .sl-action--primary:hover:not(:disabled) { background: var(--sl-accent); }
.sl-component .sl-action--primary:disabled { background: var(--sl-inset); border-color: var(--sl-border); }
.sl-component .sl-sample { margin-top: 16px; padding: 12px; background: var(--sl-inset); border: 1px solid var(--sl-border); border-radius: 10px; }
.sl-component .sl-sample strong { display: block; font-size: 12px; font-weight: 500; }
.sl-component .sl-sample p { margin-top: 6px; color: var(--sl-muted); font-size: 11px; }
.sl-component [hidden] { display: none !important; }
.sl-component[data-destroyed="true"] *, .sl-component[data-destroyed="true"] *::before, .sl-component[data-destroyed="true"] *::after { transition: none !important; animation: none !important; }
@media (prefers-reduced-motion: reduce) {
  .sl-component, .sl-component *, .sl-component *::before, .sl-component *::after { transition: none !important; animation: none !important; }
}
@media (forced-colors: active) {
  .sl-component { --sl-surface: Canvas; --sl-hover: Canvas; --sl-inset: Canvas; --sl-border: ButtonText; --sl-text: CanvasText; --sl-muted: CanvasText; --sl-accent: Highlight; --sl-on-accent: HighlightText; --sl-selected: Canvas; --sl-focus: Highlight; --sl-disabled: GrayText; box-shadow: none; }
  .sl-component button[aria-checked="true"], .sl-component button[aria-pressed="true"] { outline: 1px solid Highlight; outline-offset: -2px; }
  .sl-component button:focus-visible { outline: 2px solid Highlight; outline-offset: 3px; }
}
.sl-component .sl-density-control { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.sl-component .sl-density-control > div { text-align: center; }
.sl-component .sl-density-control strong { display: block; font-size: 13px; font-weight: 550; }
.sl-component .sl-density-control span[data-step] { display: block; margin-top: 4px; font-size: 10px; color: var(--sl-muted); }
.sl-component .sl-reading { margin-top: 20px; padding: 12px; border-left: 2px solid var(--sl-accent); background: var(--sl-inset); border-radius: 0 8px 8px 0; }
.sl-component .sl-reading span { display: block; padding: 8px 0; font-size: 11px; color: var(--sl-muted); transition: padding 280ms var(--sl-ease); }
.sl-component[data-density="compact"] .sl-reading span { padding: 3px 0; }
.sl-component[data-density="roomy"] .sl-reading span { padding: 14px 0; }
.sl-component .sl-sr { position: absolute; width: 1px; height: 1px; clip-path: inset(50%); overflow: hidden; white-space: nowrap; }
`;function H(){return(()=>{"use strict";const i=new WeakMap;function h(n,p={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(i.has(n))return i.get(n);if(p.onChange!==void 0&&typeof p.onChange!=="function")throw new TypeError("onChange must be a function.");const f=n.ownerDocument.defaultView;const u=new f.AbortController;const c=e=>n.querySelector(e);const g=e=>[...n.querySelectorAll(e)];const d=e=>JSON.parse(JSON.stringify(e));let s=false;delete n.dataset.destroyed;function l(e,t){c(e).textContent=t}function b(e,t){g('[data-field="'+e+'"] [data-choice]').forEach(a=>{const o=a.dataset.choice===t;a.setAttribute("aria-checked",String(o));a.tabIndex=o?0:-1})}function L(e,t,a=false){const o=c('[data-toggle="'+e+'"]');o.setAttribute("aria-checked",String(t));o.disabled=a;o.querySelector(".sl-toggle-word").textContent=t?"On":"Off"}function A(e,t){if(!t.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function D(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const v={"density":"balanced"};let r=d(v);function z(e){return{density:A(e.density,["compact","balanced","roomy"])}}function k(){const e=["compact","balanced","roomy"].indexOf(r.density);b("density",r.density);n.dataset.density=r.density;l("[data-density]",["Compact","Balanced","Roomy"][e]);l("[data-step]",e+1+" of 3");c('[data-action="less"]').disabled=e===0;c('[data-action="more"]').disabled=e===2;l("[data-status]",["Compact","Balanced","Roomy"][e]+" spacing")}function M(e,t){const a=["compact","balanced","roomy"];const o=a.indexOf(r.density);if(e==="less"||e==="more")w({density:a[Math.max(0,Math.min(2,o+(e==="more"?1:-1)))]},{emit:true})}function w(e,{emit:t=false}={}){if(s)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const x of Object.keys(e))if(!Object.hasOwn(v,x))throw new TypeError("Unknown state field: "+x);const a=z({...r,...e});if(JSON.stringify(a)===JSON.stringify(r))return;const o=n.getRootNode().activeElement;r=a;k();C(o);if(t){n.dispatchEvent(new f.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:d(r)}}));p.onChange?.(d(r))}}function C(e){if(e&&n.contains(e)&&e.disabled)c("button:not(:disabled)")?.focus()}function O(e){const t=e.target.closest("button");if(!t||!n.contains(t)||t.disabled)return;if(t.hasAttribute("data-choice")){w({[t.closest("[data-field]").dataset.field]:t.dataset.choice},{emit:true})}else if(t.hasAttribute("data-toggle")){w({[t.dataset.toggle]:!r[t.dataset.toggle]},{emit:true})}else M(t.dataset.action,t)}function R(e){const t=e.target.closest('[role="radio"]');if(!t||!n.contains(t)||t.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const a=t.closest('[role="radiogroup"]');const o=[...a.querySelectorAll('[role="radio"]')].filter(T=>!T.disabled);const x=o.indexOf(t);let m;if(e.key==="Home")m=0;else if(e.key==="End")m=o.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")m=(x+1)%o.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")m=(x-1+o.length)%o.length;else return;e.preventDefault();o[m].focus();o[m].click()}n.addEventListener("click",O,{signal:u.signal});n.addEventListener("keydown",R,{signal:u.signal});const E={setState:w,reset(){if(s)return;const e=n.getRootNode().activeElement;r=d(v);k();C(e)},destroy(){if(s)return;s=true;u.abort();n.dataset.destroyed="true";i.delete(n)},get state(){return d(r)}};k();i.set(n,E);return E}function y(n){return h(n)}return{mount:h,mountPreview:y}})()}function N(i,h={},{preview:y=false}={}){if(!i||typeof i.attachShadow!=="function")throw new TypeError("A DOM host is required");const n=i.shadowRoot||i.attachShadow({mode:"open"});n.innerHTML=B;const p=i.ownerDocument.createElement("style");const f=new URL("./instrument-sans-variable.woff2",import.meta.url).href;p.textContent=j.replaceAll("./instrument-sans-variable.woff2",f)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';n.prepend(p);const u=n.querySelector(".sl-component");if(!u){n.replaceChildren();throw new Error("Missing component root")}const c=q(i.ownerDocument,f);let g,d=false;try{const s=H(),l={};if(S==="upload")l.input=n.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))l.feedback=n.querySelector("."+S+"-feedback");if(y&&typeof s.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");g=(y?s.mountPreview:s.mount)(u,{...l,...h});if(typeof g?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(s){c();n.replaceChildren();throw s}return new Proxy(g,{get(s,l){if(l==="destroy")return()=>{if(d)return;d=true;try{s.destroy()}finally{c();n.replaceChildren()}};const b=Reflect.get(s,l,s);return typeof b==="function"?b.bind(s):b}})}export{N as mountInto,S as variant};
