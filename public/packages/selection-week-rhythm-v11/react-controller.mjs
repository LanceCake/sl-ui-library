import{retainFont as O}from"./react-font.mjs";const S="selection-week-rhythm-v11";const B='<section class="sl-component" data-kind="selection-week-rhythm-v11" aria-label="Week rhythm">\n  <header class="sl-head"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16M8 14h2M14 14h2M8 17h2"/></svg><div><h2>Week rhythm</h2><p>Choose your active days.</p></div></header>\n  <div class="sl-days" role="group" aria-label="Active days"><button type="button" class="sl-day" aria-label="Monday" aria-pressed="true" data-action="day" data-day="mon"><span>Mo</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button><button type="button" class="sl-day" aria-label="Tuesday" aria-pressed="true" data-action="day" data-day="tue"><span>Tu</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button><button type="button" class="sl-day" aria-label="Wednesday" aria-pressed="true" data-action="day" data-day="wed"><span>We</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button><button type="button" class="sl-day" aria-label="Thursday" aria-pressed="true" data-action="day" data-day="thu"><span>Th</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button><button type="button" class="sl-day" aria-label="Friday" aria-pressed="true" data-action="day" data-day="fri"><span>Fr</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button><button type="button" class="sl-day" aria-label="Saturday" aria-pressed="false" data-action="day" data-day="sat"><span>Sa</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button><button type="button" class="sl-day" aria-label="Sunday" aria-pressed="false" data-action="day" data-day="sun"><span>Su</span><i aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 12 4 4 8-8"/></svg></i></button></div><div class="sl-actions"><button type="button" class="sl-action" data-action="weekdays">Weekdays</button><button type="button" class="sl-action" data-action="weekend">Weekend</button><button type="button" class="sl-action" data-action="clear">Clear</button></div>\n  <p class="sl-status" role="status" data-status>5 active days</p>\n</section>';const R=`@font-face {
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
.sl-component .sl-days { display: flex; flex-wrap: wrap; gap: 6px; }
.sl-component .sl-day { flex: 1 0 30px; min-width: 30px; max-width: 42px; padding: 10px 2px 7px; background: var(--sl-inset); border: 1px solid var(--sl-border); border-radius: 9px; color: var(--sl-muted); font-size: 11px; transition: background-color 220ms ease, color 220ms ease; }
.sl-component .sl-day i { display: grid; place-items: center; height: 16px; margin-top: 7px; }
.sl-component .sl-day svg { width: 13px; height: 13px; opacity: 0; transform: scale(.6); transition: opacity 180ms ease, transform 240ms var(--sl-ease); }
.sl-component .sl-day[aria-pressed="true"] { background: var(--sl-selected); color: var(--sl-text); }
.sl-component .sl-day[aria-pressed="true"] svg { opacity: 1; transform: scale(1); }
.sl-component .sl-days + .sl-actions .sl-action { flex: 1; padding-inline: 7px; }
`;function H(){return(()=>{"use strict";const i=new WeakMap;function y(n,u={}){if(!n||!n.matches(".sl-component"))throw new TypeError("A .sl-component root is required.");if(i.has(n))return i.get(n);if(u.onChange!==void 0&&typeof u.onChange!=="function")throw new TypeError("onChange must be a function.");const b=n.ownerDocument.defaultView;const m=new b.AbortController;const c=e=>n.querySelector(e);const f=e=>[...n.querySelectorAll(e)];const l=e=>JSON.parse(JSON.stringify(e));let r=false;delete n.dataset.destroyed;function d(e,t){c(e).textContent=t}function v(e,t){f('[data-field="'+e+'"] [data-choice]').forEach(o=>{const a=o.dataset.choice===t;o.setAttribute("aria-checked",String(a));o.tabIndex=a?0:-1})}function N(e,t,o=false){const a=c('[data-toggle="'+e+'"]');a.setAttribute("aria-checked",String(t));a.disabled=o;a.querySelector(".sl-toggle-word").textContent=t?"On":"Off"}function W(e,t){if(!t.includes(e))throw new RangeError("Unsupported selection: "+String(e));return e}function j(e){if(typeof e!=="boolean")throw new TypeError("Expected a boolean.");return e}const w={"days":["mon","tue","wed","thu","fri"]};let s=l(w);function A(e){const t=["mon","tue","wed","thu","fri","sat","sun"];if(!Array.isArray(e.days)||e.days.some(o=>!t.includes(o)))throw new RangeError("Expected valid day keys.");return{days:t.filter(o=>e.days.includes(o))}}function k(){f("[data-day]").forEach(e=>e.setAttribute("aria-pressed",String(s.days.includes(e.dataset.day))));c('[data-action="clear"]').disabled=s.days.length===0;d("[data-status]",s.days.length===0?"No active days":s.days.length+(s.days.length===1?" active day":" active days"))}function T(e,t){if(e==="day"){const o=t.dataset.day;p({days:s.days.includes(o)?s.days.filter(a=>a!==o):[...s.days,o]},{emit:true})}else if(e==="weekdays")p({days:["mon","tue","wed","thu","fri"]},{emit:true});else if(e==="weekend")p({days:["sat","sun"]},{emit:true});else if(e==="clear")p({days:[]},{emit:true})}function p(e,{emit:t=false}={}){if(r)return;if(!e||typeof e!=="object"||Array.isArray(e))throw new TypeError("Expected a state patch.");for(const h of Object.keys(e))if(!Object.hasOwn(w,h))throw new TypeError("Unknown state field: "+h);const o=A({...s,...e});if(JSON.stringify(o)===JSON.stringify(s))return;const a=n.getRootNode().activeElement;s=o;k();E(a);if(t){n.dispatchEvent(new b.CustomEvent("selectionchange",{bubbles:true,composed:true,detail:{state:l(s)}}));u.onChange?.(l(s))}}function E(e){if(e&&n.contains(e)&&e.disabled)c("button:not(:disabled)")?.focus()}function z(e){const t=e.target.closest("button");if(!t||!n.contains(t)||t.disabled)return;if(t.hasAttribute("data-choice")){p({[t.closest("[data-field]").dataset.field]:t.dataset.choice},{emit:true})}else if(t.hasAttribute("data-toggle")){p({[t.dataset.toggle]:!s[t.dataset.toggle]},{emit:true})}else T(t.dataset.action,t)}function M(e){const t=e.target.closest('[role="radio"]');if(!t||!n.contains(t)||t.disabled||e.altKey||e.ctrlKey||e.metaKey)return;const o=t.closest('[role="radiogroup"]');const a=[...o.querySelectorAll('[role="radio"]')].filter(q=>!q.disabled);const h=a.indexOf(t);let g;if(e.key==="Home")g=0;else if(e.key==="End")g=a.length-1;else if(e.key==="ArrowRight"||e.key==="ArrowDown")g=(h+1)%a.length;else if(e.key==="ArrowLeft"||e.key==="ArrowUp")g=(h-1+a.length)%a.length;else return;e.preventDefault();a[g].focus();a[g].click()}n.addEventListener("click",z,{signal:m.signal});n.addEventListener("keydown",M,{signal:m.signal});const C={setState:p,reset(){if(r)return;const e=n.getRootNode().activeElement;s=l(w);k();E(e)},destroy(){if(r)return;r=true;m.abort();n.dataset.destroyed="true";i.delete(n)},get state(){return l(s)}};k();i.set(n,C);return C}function x(n){return y(n)}return{mount:y,mountPreview:x}})()}function I(i,y={},{preview:x=false}={}){if(!i||typeof i.attachShadow!=="function")throw new TypeError("A DOM host is required");const n=i.shadowRoot||i.attachShadow({mode:"open"});n.innerHTML=B;const u=i.ownerDocument.createElement("style");const b=new URL("./instrument-sans-variable.woff2",import.meta.url).href;u.textContent=R.replaceAll("./instrument-sans-variable.woff2",b)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';n.prepend(u);const m=n.querySelector(".sl-component");if(!m){n.replaceChildren();throw new Error("Missing component root")}const c=O(i.ownerDocument,b);let f,l=false;try{const r=H(),d={};if(S==="upload")d.input=n.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(S))d.feedback=n.querySelector("."+S+"-feedback");if(x&&typeof r.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");f=(x?r.mountPreview:r.mount)(m,{...d,...y});if(typeof f?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(r){c();n.replaceChildren();throw r}return new Proxy(f,{get(r,d){if(d==="destroy")return()=>{if(l)return;l=true;try{r.destroy()}finally{c();n.replaceChildren()}};const v=Reflect.get(r,d,r);return typeof v==="function"?v.bind(r):v}})}export{I as mountInto,S as variant};
