import{retainFont as R}from"./react-font.mjs";const S="selection-measurement-units-v11";const I='<section class="sl-component" data-kind="selection-measurement-units-v11" aria-label="Measurement units">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 16 12-12 4 4L8 20l-4-4ZM12 8l2 2M9 11l2 2M6 14l2 2"/></svg><div><h2>Measurement units</h2><p>One route, two ways to read it.</p></div></header>\n  <div class="sl-segments " role="radiogroup" aria-label="Measurement units" data-field="units"><button type="button" role="radio" data-choice="metric" aria-checked="true" tabindex="0">Metric</button><button type="button" role="radio" data-choice="imperial" aria-checked="false" tabindex="-1">Imperial</button></div><div class="sl-measure"><div><span>Distance</span><strong><span data-distance>12.0</span><small data-distance-unit>km</small></strong></div><div><span>Ascent</span><strong><span data-ascent>480</span><small data-ascent-unit>m</small></strong></div></div><p class="sl-hint">Ridge loop / same route in both units</p>\n  <p class="sl-status" role="status" data-status>Metric units selected</p>\n</section>';const D=`@font-face {
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
.sl-component .sl-measure { display: flex; flex-wrap: wrap; gap: 20px; padding: 20px 0 8px; }
.sl-component .sl-measure > div { flex: 1; min-width: 70px; }
.sl-component .sl-measure > div > span { font-size: 11px; color: var(--sl-muted); }
.sl-component .sl-measure strong { display: flex; align-items: baseline; gap: 5px; font-size: 28px; font-weight: 500; letter-spacing: -.05em; font-variant-numeric: tabular-nums; margin-top: 7px; }
.sl-component .sl-measure small { font-size: 11px; font-weight: 400; color: var(--sl-muted); letter-spacing: 0; }
`;function H(){return(()=>{"use strict";const a=new WeakMap;function h(n,d={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(a.has(n))return a.get(n);if(d.onChange!==void 0&&typeof d.onChange!=="function")throw new TypeError("onChange must be a function.");const f=n.ownerDocument.defaultView;const p=new f.AbortController;const u=e=>n.querySelector(e);const g=e=>[...n.querySelectorAll(e)];const c=e=>JSON.parse(JSON.stringify(e));let s=false;delete n.dataset.destroyed;function r(e,t){u(e).textContent=t}function b(e,t){g('[data-field="'+e+'"] [data-choice]').forEach(i=>{const o=i.dataset.choice===t;i.setAttribute("aria-checked",String(o));i.tabIndex=o?0:-1})}function L(e,t,i=false){const o=u('[data-toggle="'+e+'"]');o.setAttribute("aria-checked",String(t));o.disabled=i;o.querySelector(".sl-toggle-word").textContent=t?"On":"Off"}function A(e,t){if(!t.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function j(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const y={"units":"metric"};let l=c(y);function z(e){return{units:A(e.units,["metric","imperial"])}}function v(){const e=l.units==="metric";b("units",l.units);r("[data-distance]",(e?12:12/1.609344).toFixed(1));r("[data-ascent]",String(Math.round(e?480:480/.3048)));r("[data-distance-unit]",e?"km":"mi");r("[data-ascent-unit]",e?"m":"ft");r("[data-status]",e?"Metric units selected":"Imperial units selected")}function M(e,t){}function k(e,{emit:t=false}={}){if(s)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const x of Object.keys(e))if(!Object.hasOwn(y,x))throw new TypeError("Unknown state field: "+x);const i=z({...l,...e});if(JSON.stringify(i)===JSON.stringify(l))return;const o=n.getRootNode().activeElement;l=i;v();E(o);if(t){n.dispatchEvent(new f.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:c(l)}}));d.onChange?.(c(l))}}function E(e){if(e&&n.contains(e)&&e.disabled)u("button:not(:disabled)")?.focus()}function T(e){const t=e.target.closest("button");if(!t||!n.contains(t)||t.disabled)return;if(t.hasAttribute("data-choice")){k({[t.closest("[data-field]").dataset.field]:t.dataset.choice},{emit:true})}else if(t.hasAttribute("data-toggle")){k({[t.dataset.toggle]:!l[t.dataset.toggle]},{emit:true})}else M(t.dataset.action,t)}function O(e){const t=e.target.closest('[role="radio"]');if(!t||!n.contains(t)||t.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const i=t.closest('[role="radiogroup"]');const o=[...i.querySelectorAll('[role="radio"]')].filter(q=>!q.disabled);const x=o.indexOf(t);let m;if(e.key==="Home")m=0;else if(e.key==="End")m=o.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")m=(x+1)%o.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")m=(x-1+o.length)%o.length;else return;e.preventDefault();o[m].focus();o[m].click()}n.addEventListener("click",T,{signal:p.signal});n.addEventListener("keydown",O,{signal:p.signal});const C={setState:k,reset(){if(s)return;const e=n.getRootNode().activeElement;l=c(y);v();E(e)},destroy(){if(s)return;s=true;p.abort();n.dataset.destroyed="true";a.delete(n)},get state(){return c(l)}};v();a.set(n,C);return C}function w(n){return h(n)}return{mount:h,mountPreview:w}})()}function P(a,h={},{preview:w=false}={}){if(!a||typeof a.attachShadow!=="function")throw new TypeError("A DOM host is required");const n=a.shadowRoot||a.attachShadow({mode:"open"});n.innerHTML=I;const d=a.ownerDocument.createElement("style");const f=new URL("./instrument-sans-variable.woff2",import.meta.url).href;d.textContent=D.replaceAll("./instrument-sans-variable.woff2",f)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';n.prepend(d);const p=n.querySelector(".sl-component");if(!p){n.replaceChildren();throw new Error("Missing component root")}const u=R(a.ownerDocument,f);let g,c=false;try{const s=H(),r={};if(S==="upload")r.input=n.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))r.feedback=n.querySelector("."+S+"-feedback");if(w&&typeof s.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");g=(w?s.mountPreview:s.mount)(p,{...r,...h});if(typeof g?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(s){u();n.replaceChildren();throw s}return new Proxy(g,{get(s,r){if(r==="destroy")return()=>{if(c)return;c=true;try{s.destroy()}finally{u();n.replaceChildren()}};const b=Reflect.get(s,r,s);return typeof b==="function"?b.bind(s):b}})}export{P as mountInto,S as variant};
