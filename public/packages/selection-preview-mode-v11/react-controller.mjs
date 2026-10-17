import{retainFont as P}from"./react-font.mjs";const E="selection-preview-mode-v11";const R='<section class="sl-component" data-kind="selection-preview-mode-v11" aria-label="Preview mode">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="2.5"/></svg><div><h2>Preview mode</h2><p>Try a layout before applying it.</p></div></header>\n  <div class="sl-segments " role="radiogroup" aria-label="Preview layout" data-field="draft"><button type="button" role="radio" data-choice="list" aria-checked="true" tabindex="0">List</button><button type="button" role="radio" data-choice="outline" aria-checked="false" tabindex="-1">Outline</button></div><div class="sl-layout-sample" aria-label="Layout sample"><span>Field notes</span><span>Walking routes</span><span>Next weekend</span></div><div class="sl-actions"><button type="button" class="sl-action sl-action--primary" data-action="apply" disabled>Apply layout</button><button type="button" class="sl-action" data-action="cancel" disabled>Cancel</button></div>\n  <p class="sl-status" role="status" data-status>List layout applied</p>\n</section>';const D=`@font-face {
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
.sl-component .sl-layout-sample { display: grid; gap: 8px; margin-top: 16px; padding: 12px; border-radius: 9px; background: var(--sl-inset); border: 1px solid var(--sl-border); }
.sl-component .sl-layout-sample span { padding: 4px 0 4px 12px; border-left: 1px solid var(--sl-border); font-size: 11px; color: var(--sl-muted); transition: transform 280ms var(--sl-ease); }
.sl-component[data-layout="outline"] .sl-layout-sample span:nth-child(2) { transform: translateX(10px); }
.sl-component[data-layout="outline"] .sl-layout-sample span:nth-child(3) { transform: translateX(20px); }
`;function H(){return(()=>{"use strict";const r=new WeakMap;function y(t,p={}){if(!t||!t.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(r.has(t))return r.get(t);if(p.onChange!==void 0&&typeof p.onChange!=="function")throw new TypeError("onChange must be a function.");const m=t.ownerDocument.defaultView;const u=new m.AbortController;const i=e=>t.querySelector(e);const g=e=>[...t.querySelectorAll(e)];const c=e=>JSON.parse(JSON.stringify(e));let a=false;delete t.dataset.destroyed;function d(e,n){i(e).textContent=n}function b(e,n){g('[data-field="'+e+'"] [data-choice]').forEach(l=>{const s=l.dataset.choice===n;l.setAttribute("aria-checked",String(s));l.tabIndex=s?0:-1})}function N(e,n,l=false){const s=i('[data-toggle="'+e+'"]');s.setAttribute("aria-checked",String(n));s.disabled=l;s.querySelector(".sl-toggle-word").textContent=n?"On":"Off"}function S(e,n){if(!n.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function j(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const v={"draft":"list","applied":"list"};let o=c(v);function T(e){return{draft:S(e.draft,["list","outline"]),applied:S(e.applied,["list","outline"])}}function k(){b("draft",o.draft);t.dataset.layout=o.draft;const e=o.draft!==o.applied;i('[data-action="apply"]').disabled=!e;i('[data-action="cancel"]').disabled=!e;d("[data-status]",e?"Previewing "+o.draft+". Apply or cancel.":(o.applied==="list"?"List":"Outline")+" layout applied")}function C(e,n){if(e==="apply")x({applied:o.draft},{emit:true});else if(e==="cancel")x({draft:o.applied},{emit:true})}function x(e,{emit:n=false}={}){if(a)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const h of Object.keys(e))if(!Object.hasOwn(v,h))throw new TypeError("Unknown state field: "+h);const l=T({...o,...e});if(JSON.stringify(l)===JSON.stringify(o))return;const s=t.getRootNode().activeElement;o=l;k();A(s);if(n){t.dispatchEvent(new m.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:c(o)}}));p.onChange?.(c(o))}}function A(e){if(e&&t.contains(e)&&e.disabled)i("button:not(:disabled)")?.focus()}function O(e){const n=e.target.closest("button");if(!n||!t.contains(n)||n.disabled)return;if(n.hasAttribute("data-choice")){x({[n.closest("[data-field]").dataset.field]:n.dataset.choice},{emit:true})}else if(n.hasAttribute("data-toggle")){x({[n.dataset.toggle]:!o[n.dataset.toggle]},{emit:true})}else C(n.dataset.action,n)}function q(e){if(e.key==="Escape"&&o.draft!==o.applied){e.preventDefault();C("cancel");i('[role="radio"][aria-checked="true"]').focus();return}const n=e.target.closest('[role="radio"]');if(!n||!t.contains(n)||n.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const l=n.closest('[role="radiogroup"]');const s=[...l.querySelectorAll('[role="radio"]')].filter(L=>!L.disabled);const h=s.indexOf(n);let f;if(e.key==="Home")f=0;else if(e.key==="End")f=s.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")f=(h+1)%s.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")f=(h-1+s.length)%s.length;else return;e.preventDefault();s[f].focus();s[f].click()}t.addEventListener("click",O,{signal:u.signal});t.addEventListener("keydown",q,{signal:u.signal});const z={setState:x,reset(){if(a)return;const e=t.getRootNode().activeElement;o=c(v);k();A(e)},destroy(){if(a)return;a=true;u.abort();t.dataset.destroyed="true";r.delete(t)},get state(){return c(o)}};k();r.set(t,z);return z}function w(t){return y(t)}return{mount:y,mountPreview:w}})()}function M(r,y={},{preview:w=false}={}){if(!r||typeof r.attachShadow!=="function")throw new TypeError("A DOM host is required");const t=r.shadowRoot||r.attachShadow({mode:"open"});t.innerHTML=R;const p=r.ownerDocument.createElement("style");const m=new URL("./instrument-sans-variable.woff2",import.meta.url).href;p.textContent=D.replaceAll("./instrument-sans-variable.woff2",m)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';t.prepend(p);const u=t.querySelector(".sl-component");if(!u){t.replaceChildren();throw new Error("Missing component root")}const i=P(r.ownerDocument,m);let g,c=false;try{const a=H(),d={};if(E==="upload")d.input=t.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(E))d.feedback=t.querySelector("."+E+"-feedback");if(w&&typeof a.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");g=(w?a.mountPreview:a.mount)(u,{...d,...y});if(typeof g?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(a){i();t.replaceChildren();throw a}return new Proxy(g,{get(a,d){if(d==="destroy")return()=>{if(c)return;c=true;try{a.destroy()}finally{i();t.replaceChildren()}};const b=Reflect.get(a,d,a);return typeof b==="function"?b.bind(a):b}})}export{M as mountInto,E as variant};
