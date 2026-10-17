import{retainFont as L}from"./react-font.mjs";const S="selection-output-priority-v11";const j='<section class="sl-component" data-kind="selection-output-priority-v11" aria-label="Output priority">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 15V9a7 7 0 0 1 14 0v6M5 10H3v7h4v-7H5ZM19 10h2v7h-4v-7h2ZM17 19h-4"/></svg><div><h2>Output priority</h2><p>Keep a second choice ready.</p></div></header>\n  <ol class="sl-priority"><li><span>01</span><div><small>Primary</small><strong data-primary>Headphones</strong></div></li><li><span>02</span><div><small data-secondary-label>Fallback</small><strong data-secondary>Speakers</strong></div></li></ol><div class="sl-row"><span>Allow fallback<small>Use the second output if needed</small></span><button type="button" class="sl-toggle" role="switch" aria-label="Allow fallback" aria-checked="true" data-toggle="fallback"><span class="sl-toggle-word" aria-hidden="true">On</span><span class="sl-toggle-track" aria-hidden="true"></span></button></div><div class="sl-actions"><button type="button" class="sl-action" data-action="swap"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h15m-4-4 4 4-4 4M20 17H5m4-4-4 4 4 4"/></svg>Swap priority</button></div>\n  <p class="sl-status" role="status" data-status>Headphones first, speakers second</p>\n</section>';const D=`@font-face {
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
.sl-component .sl-priority { list-style: none; padding: 0; margin: 0; }
.sl-component .sl-priority li { display: flex; align-items: center; gap: 12px; padding: 12px; border-left: 2px solid var(--sl-accent); background: var(--sl-inset); border-radius: 0 8px 8px 0; }
.sl-component .sl-priority li + li { margin-top: 8px; border-left-color: var(--sl-border); transition: opacity 220ms ease; }
.sl-component .sl-priority li > span { font-size: 11px; color: var(--sl-muted); font-variant-numeric: tabular-nums; }
.sl-component .sl-priority small { display: block; font-size: 10px; color: var(--sl-muted); }
.sl-component .sl-priority strong { display: block; font-size: 12px; font-weight: 500; margin-top: 3px; }
.sl-component[data-fallback="false"] .sl-priority li + li { opacity: .6; }
`;function F(){return(()=>{"use strict";const r=new WeakMap;function h(t,p={}){if(!t||!t.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(r.has(t))return r.get(t);if(p.onChange!==void 0&&typeof p.onChange!=="function")throw new TypeError("onChange must be a function.");const m=t.ownerDocument.defaultView;const u=new m.AbortController;const d=e=>t.querySelector(e);const g=e=>[...t.querySelectorAll(e)];const c=e=>JSON.parse(JSON.stringify(e));let a=false;delete t.dataset.destroyed;function l(e,n){d(e).textContent=n}function y(e,n){g('[data-field="'+e+'"] [data-choice]').forEach(i=>{const s=i.dataset.choice===n;i.setAttribute("aria-checked",String(s));i.tabIndex=s?0:-1})}function A(e,n,i=false){const s=d('[data-toggle="'+e+'"]');s.setAttribute("aria-checked",String(n));s.disabled=i;s.querySelector(".sl-toggle-word").textContent=n?"On":"Off"}function z(e,n){if(!n.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function H(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const v={"primary":"headphones","fallback":true};let o=c(v);function O(e){return{primary:z(e.primary,["headphones","speakers"]),fallback:H(e.fallback)}}function k(){const e=o.primary==="headphones"?"Headphones":"Speakers";const n=o.primary==="headphones"?"Speakers":"Headphones";t.dataset.fallback=String(o.fallback);l("[data-primary]",e);l("[data-secondary]",n);l("[data-secondary-label]",o.fallback?"Fallback":"Fallback disabled");A("fallback",o.fallback);d('[data-action="swap"]').disabled=!o.fallback;l("[data-status]",o.fallback?e+" first, "+n.toLowerCase()+" second":e+" only")}function T(e,n){if(e==="swap"&&o.fallback)w({primary:o.primary==="headphones"?"speakers":"headphones"},{emit:true})}function w(e,{emit:n=false}={}){if(a)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const b of Object.keys(e))if(!Object.hasOwn(v,b))throw new TypeError("Unknown state field: "+b);const i=O({...o,...e});if(JSON.stringify(i)===JSON.stringify(o))return;const s=t.getRootNode().activeElement;o=i;k();C(s);if(n){t.dispatchEvent(new m.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:c(o)}}));p.onChange?.(c(o))}}function C(e){if(e&&t.contains(e)&&e.disabled)d("button:not(:disabled)")?.focus()}function q(e){const n=e.target.closest("button");if(!n||!t.contains(n)||n.disabled)return;if(n.hasAttribute("data-choice")){w({[n.closest("[data-field]").dataset.field]:n.dataset.choice},{emit:true})}else if(n.hasAttribute("data-toggle")){w({[n.dataset.toggle]:!o[n.dataset.toggle]},{emit:true})}else T(n.dataset.action,n)}function M(e){const n=e.target.closest('[role="radio"]');if(!n||!t.contains(n)||n.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const i=n.closest('[role="radiogroup"]');const s=[...i.querySelectorAll('[role="radio"]')].filter(R=>!R.disabled);const b=s.indexOf(n);let f;if(e.key==="Home")f=0;else if(e.key==="End")f=s.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")f=(b+1)%s.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")f=(b-1+s.length)%s.length;else return;e.preventDefault();s[f].focus();s[f].click()}t.addEventListener("click",q,{signal:u.signal});t.addEventListener("keydown",M,{signal:u.signal});const E={setState:w,reset(){if(a)return;const e=t.getRootNode().activeElement;o=c(v);k();C(e)},destroy(){if(a)return;a=true;u.abort();t.dataset.destroyed="true";r.delete(t)},get state(){return c(o)}};k();r.set(t,E);return E}function x(t){return h(t)}return{mount:h,mountPreview:x}})()}function N(r,h={},{preview:x=false}={}){if(!r||typeof r.attachShadow!=="function")throw new TypeError("A DOM host is required");const t=r.shadowRoot||r.attachShadow({mode:"open"});t.innerHTML=j;const p=r.ownerDocument.createElement("style");const m=new URL("./instrument-sans-variable.woff2",import.meta.url).href;p.textContent=D.replaceAll("./instrument-sans-variable.woff2",m)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';t.prepend(p);const u=t.querySelector(".sl-component");if(!u){t.replaceChildren();throw new Error("Missing component root")}const d=L(r.ownerDocument,m);let g,c=false;try{const a=F(),l={};if(S==="upload")l.input=t.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))l.feedback=t.querySelector("."+S+"-feedback");if(x&&typeof a.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");g=(x?a.mountPreview:a.mount)(u,{...l,...h});if(typeof g?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(a){d();t.replaceChildren();throw a}return new Proxy(g,{get(a,l){if(l==="destroy")return()=>{if(c)return;c=true;try{a.destroy()}finally{d();t.replaceChildren()}};const y=Reflect.get(a,l,a);return typeof y==="function"?y.bind(a):y}})}export{N as mountInto,S as variant};
