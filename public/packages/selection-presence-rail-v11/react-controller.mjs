import{retainFont as M}from"./react-font.mjs";const S="selection-presence-rail-v11";const R='<section class="sl-component" data-kind="selection-presence-rail-v11" aria-label="Presence rail">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M6 20v-2a6 6 0 0 1 12 0v2M4 5h2M18 5h2"/></svg><div><h2>Presence rail</h2><p>Choose how you appear.</p></div></header>\n  <div class="sl-segments sl-rail" role="radiogroup" aria-label="Presence" data-field="mode"><button type="button" role="radio" data-choice="available" aria-checked="true" tabindex="0">Available</button><button type="button" role="radio" data-choice="focus" aria-checked="false" tabindex="-1">Focus</button><button type="button" role="radio" data-choice="away" aria-checked="false" tabindex="-1">Away</button></div><div class="sl-presence" aria-hidden="true"><i></i><span data-presence>Open to conversation</span></div>\n  <p class="sl-status" role="status" data-status>Available selected</p>\n</section>';const H=`@font-face {
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
.sl-component .sl-rail { --sl-position: 0; gap: 0; }
.sl-component .sl-rail::before { content: ''; position: absolute; top: 4px; bottom: 4px; left: 4px; width: calc((100% - 8px) / 3); background: var(--sl-selected); border-radius: 6px; z-index: -1; transform: translateX(calc(var(--sl-position) * 100%)); transition: transform 320ms var(--sl-ease); }
.sl-component .sl-rail button[aria-checked="true"] { background: transparent; }
.sl-component .sl-presence { display: flex; align-items: center; gap: 9px; margin-top: 20px; font-size: 12px; color: var(--sl-muted); }
.sl-component .sl-presence i { width: 9px; height: 9px; border: 1px solid var(--sl-accent); border-radius: 50%; background: var(--sl-accent); transition: background-color 220ms ease, border-radius 220ms ease; }
.sl-component[data-mode="focus"] .sl-presence i { border-radius: 2px; }
.sl-component[data-mode="away"] .sl-presence i { background: transparent; }
`;function j(){return(()=>{"use strict";const a=new WeakMap;function x(n,p={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(a.has(n))return a.get(n);if(p.onChange!==void 0&&typeof p.onChange!=="function")throw new TypeError("onChange must be a function.");const f=n.ownerDocument.defaultView;const u=new f.AbortController;const d=e=>n.querySelector(e);const b=e=>[...n.querySelectorAll(e)];const c=e=>JSON.parse(JSON.stringify(e));let s=false;delete n.dataset.destroyed;function i(e,t){d(e).textContent=t}function g(e,t){b('[data-field="'+e+'"] [data-choice]').forEach(l=>{const o=l.dataset.choice===t;l.setAttribute("aria-checked",String(o));l.tabIndex=o?0:-1})}function D(e,t,l=false){const o=d('[data-toggle="'+e+'"]');o.setAttribute("aria-checked",String(t));o.disabled=l;o.querySelector(".sl-toggle-word").textContent=t?"On":"Off"}function E(e,t){if(!t.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function I(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const y={"mode":"available"};let r=c(y);function z(e){return{mode:E(e.mode,["available","focus","away"])}}function v(){g("mode",r.mode);n.dataset.mode=r.mode;d(".sl-rail").style.setProperty("--sl-position",String(["available","focus","away"].indexOf(r.mode)));i("[data-presence]",{available:"Open to conversation",focus:"Keeping time for deep work",away:"Taking a little time away"}[r.mode]);i("[data-status]",{available:"Available selected",focus:"Focus selected",away:"Away selected"}[r.mode])}function O(e,t){}function k(e,{emit:t=false}={}){if(s)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const h of Object.keys(e))if(!Object.hasOwn(y,h))throw new TypeError("Unknown state field: "+h);const l=z({...r,...e});if(JSON.stringify(l)===JSON.stringify(r))return;const o=n.getRootNode().activeElement;r=l;v();A(o);if(t){n.dispatchEvent(new f.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:c(r)}}));p.onChange?.(c(r))}}function A(e){if(e&&n.contains(e)&&e.disabled)d("button:not(:disabled)")?.focus()}function T(e){const t=e.target.closest("button");if(!t||!n.contains(t)||t.disabled)return;if(t.hasAttribute("data-choice")){k({[t.closest("[data-field]").dataset.field]:t.dataset.choice},{emit:true})}else if(t.hasAttribute("data-toggle")){k({[t.dataset.toggle]:!r[t.dataset.toggle]},{emit:true})}else O(t.dataset.action,t)}function q(e){const t=e.target.closest('[role="radio"]');if(!t||!n.contains(t)||t.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const l=t.closest('[role="radiogroup"]');const o=[...l.querySelectorAll('[role="radio"]')].filter(P=>!P.disabled);const h=o.indexOf(t);let m;if(e.key==="Home")m=0;else if(e.key==="End")m=o.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")m=(h+1)%o.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")m=(h-1+o.length)%o.length;else return;e.preventDefault();o[m].focus();o[m].click()}n.addEventListener("click",T,{signal:u.signal});n.addEventListener("keydown",q,{signal:u.signal});const C={setState:k,reset(){if(s)return;const e=n.getRootNode().activeElement;r=c(y);v();A(e)},destroy(){if(s)return;s=true;u.abort();n.dataset.destroyed="true";a.delete(n)},get state(){return c(r)}};v();a.set(n,C);return C}function w(n){return x(n)}return{mount:x,mountPreview:w}})()}function N(a,x={},{preview:w=false}={}){if(!a||typeof a.attachShadow!=="function")throw new TypeError("A DOM host is required");const n=a.shadowRoot||a.attachShadow({mode:"open"});n.innerHTML=R;const p=a.ownerDocument.createElement("style");const f=new URL("./instrument-sans-variable.woff2",import.meta.url).href;p.textContent=H.replaceAll("./instrument-sans-variable.woff2",f)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';n.prepend(p);const u=n.querySelector(".sl-component");if(!u){n.replaceChildren();throw new Error("Missing component root")}const d=M(a.ownerDocument,f);let b,c=false;try{const s=j(),i={};if(S==="upload")i.input=n.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))i.feedback=n.querySelector("."+S+"-feedback");if(w&&typeof s.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");b=(w?s.mountPreview:s.mount)(u,{...i,...x});if(typeof b?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(s){d();n.replaceChildren();throw s}return new Proxy(b,{get(s,i){if(i==="destroy")return()=>{if(c)return;c=true;try{s.destroy()}finally{d();n.replaceChildren()}};const g=Reflect.get(s,i,s);return typeof g==="function"?g.bind(s):g}})}export{N as mountInto,S as variant};
