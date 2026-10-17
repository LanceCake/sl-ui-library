import{retainFont as P}from"./react-font.mjs";const I="search-input";const R='<div class="sl-field sl-field--search" id="search-field" data-search-open="false">\n            <div class="sl-field__control">\n              <svg class="sl-field__leading" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>\n              <input class="sl-field__input" id="demo-search" type="search" placeholder=" " autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-controls="search-options" aria-expanded="false" aria-describedby="search-help">\n              <label class="sl-field__label" for="demo-search">Find a component</label>\n              <button class="sl-field__action sl-field__clear" type="button" aria-label="Clear search" aria-controls="demo-search" hidden><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button>\n            </div>\n            <div class="sl-field__popup" aria-hidden="true" inert><ul class="sl-field__options" id="search-options" role="listbox" aria-label="Component suggestions"></ul><p class="sl-field__empty" hidden>No matches. Try another word.</p></div>\n            <p class="sl-field__helper" id="search-help" role="status" aria-live="polite">Search the local component list.</p>\n          </div>';const H=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-field {
  --field-ink: #222222;
  --field-hover: #2e2e2e;
  --field-active: #3f3f3f;
  --field-text: #fafafa;
  --field-muted: #bbbbbb;
  --field-focus: #686868;
  --field-ease: cubic-bezier(.4, 0, .2, 1);
  position: relative;
  width: min(300px, 100%);
  color: var(--field-text);
  font-family: 'Instrument Sans', sans-serif;
  text-align: left;
}
.sl-field *, .sl-field *::before, .sl-field *::after { box-sizing: border-box; }
.sl-field [hidden] { display: none !important; }
.sl-field .sl-field__control { position: relative; height: 60px; border: 1px solid transparent; border-radius: 13px; background: var(--field-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--field-ease); }
.sl-field .sl-field__control:hover { background: var(--field-hover); }
.sl-field .sl-field__control:focus-within { border-color: #b0b0b0; box-shadow: 0 0 0 3px #5c5c5c24, inset 0 1px #ffffff12; }
.sl-field .sl-field__input { display: block; width: 100%; height: 100%; margin: 0; padding: 24px 16px 7px; border: 0; border-radius: inherit; outline: none; background: transparent; color: var(--field-text); caret-color: var(--field-text); font: 450 16px/1.25 'Instrument Sans', sans-serif; letter-spacing: -.01em; }
.sl-field .sl-field__input::placeholder { color: transparent; }
.sl-field .sl-field__input:focus-visible { outline: none; }
.sl-field .sl-field__label { position: absolute; top: 19px; left: 16px; max-width: calc(100% - 32px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; pointer-events: none; color: var(--field-muted); font: 450 16px/20px 'Instrument Sans', sans-serif; letter-spacing: -.01em; transform-origin: left top; transition: transform 460ms var(--field-ease), color 360ms ease; }
.sl-field .sl-field__input:focus ~ .sl-field__label, .sl-field .sl-field__input:not(:placeholder-shown) ~ .sl-field__label { transform: translateY(-10px) scale(.8); color: #cecece; }
.sl-field .sl-field__input:disabled { opacity: .55; cursor: not-allowed; }
.sl-field .sl-field__helper { min-height: 36px; margin: 10px 2px 0; color: #5f5f5f; font: 400 12px/1.5 'Instrument Sans', sans-serif; transition: opacity 300ms ease; }
.sl-field .sl-field__action, .sl-field .sl-field__step { display: grid; place-items: center; flex: none; padding: 0; border: 0; border-radius: 8px; background: transparent; color: #d0d0d0; cursor: pointer; touch-action: manipulation; transition: background-color 180ms ease, color 180ms ease; }
.sl-field .sl-field__action { position: absolute; right: 7px; top: 11px; width: 36px; height: 36px; }
.sl-field .sl-field__action:hover, .sl-field .sl-field__step:hover { background: var(--field-active); color: var(--field-text); }
.sl-field .sl-field__action:focus-visible, .sl-field .sl-field__step:focus-visible { outline: 2px solid #dbdbdb; outline-offset: -2px; }
.sl-field .sl-field__action:disabled, .sl-field .sl-field__step:disabled { opacity: .35; background: transparent; cursor: not-allowed; }
.sl-field .sl-field__action svg, .sl-field .sl-field__step svg, .sl-field .sl-field__leading, .sl-field .sl-field__validation { display: block; width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.sl-field.sl-field--search .sl-field__input { padding-left: 52px; padding-right: 44px; }
.sl-field.sl-field--search .sl-field__label { left: 52px; max-width: calc(100% - 96px); }
.sl-field .sl-field__leading { position: absolute; top: 15px; left: 13px; width: 28px; height: 28px; stroke-width: 1.9; color: #e4e4e4; pointer-events: none; transform-origin: center; }
.sl-field.sl-field--search input::-webkit-search-cancel-button, .sl-field.sl-field--search input::-webkit-search-decoration { -webkit-appearance: none; }
.sl-field .sl-field__popup { position: absolute; z-index: 5; top: 68px; left: 0; right: 0; padding: 6px; border: 1px solid #575757; border-radius: 13px; background: var(--field-ink); box-shadow: 0 8px 20px #0000001f; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(-6px); transition: opacity 300ms ease, transform 420ms var(--field-ease), visibility 0s 420ms; }
.sl-field[data-search-open="true"] .sl-field__popup { opacity: 1; visibility: visible; pointer-events: auto; transform: translateY(0); transition-delay: 0s; }
.sl-field[data-search-open="true"] .sl-field__helper { opacity: 0; }
.sl-field .sl-field__options { list-style: none; margin: 0; padding: 0; }
.sl-field .sl-field__option { display: flex; align-items: center; min-height: 34px; padding: 7px 10px; border-radius: 7px; color: var(--field-text); font-size: 14px; line-height: 20px; cursor: pointer; }
.sl-field .sl-field__option:hover, .sl-field .sl-field__option[aria-selected="true"] { background: var(--field-active); }
.sl-field .sl-field__empty { margin: 0; padding: 9px 10px; color: #c8c8c8; font-size: 13px; line-height: 1.5; }
.sl-field.sl-field--email .sl-field__input, .sl-field.sl-field--password .sl-field__input { padding-right: 48px; }
.sl-field.sl-field--email .sl-field__label, .sl-field.sl-field--password .sl-field__label { max-width: calc(100% - 68px); }
.sl-field .sl-field__validation { position: absolute; top: 16px; right: 12px; width: 26px; height: 26px; border-radius: 50%; background: #ffffff09; stroke-width: 1.15; color: var(--field-text); opacity: 0; pointer-events: none; transition: opacity 300ms ease; }
.sl-field .sl-field__valid-icon, .sl-field .sl-field__invalid-icon { opacity: 0; transition: opacity 140ms ease; }
.sl-field .sl-field__invalid-icon { stroke-width: 1.05; }
.sl-field .sl-field__validation path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 140ms ease, stroke-dashoffset 0s 140ms; }
.sl-field[data-validation="invalid"] .sl-field__validation, .sl-field[data-validation="valid"] .sl-field__validation { opacity: 1; }
.sl-field[data-validation="valid"] .sl-field__valid-icon, .sl-field[data-validation="invalid"] .sl-field__invalid-icon { opacity: 1; transition: opacity 220ms ease 140ms; }
.sl-field[data-validation="valid"] .sl-field__valid-icon { stroke-dashoffset: 0; transition: opacity 220ms ease 140ms, stroke-dashoffset 440ms var(--field-ease) 140ms; }
.sl-field[data-validation="invalid"] .sl-field__invalid-icon path { stroke-dashoffset: 0; transition: stroke-dashoffset 360ms var(--field-ease) 140ms; }
.sl-field[data-validation="invalid"] .sl-field__invalid-icon path + path { transition-delay: 240ms; }
.sl-field[data-validation="invalid"] .sl-field__control { border-color: #c5c5c5; }
.sl-field[data-validation="invalid"] .sl-field__helper { color: #3c3c3c; }
.sl-field.sl-field--password .sl-field__input { padding-right: 58px; }
.sl-field .sl-field__reveal { top: 7px; right: 5px; width: 44px; height: 44px; border-radius: 10px; }
.sl-field .sl-field__reveal svg { width: 32px; height: 24px; overflow: visible; stroke: currentColor; stroke-width: 1.35; }
.sl-field .sl-field__eyes-open, .sl-field .sl-field__eyes-closed { transform-box: fill-box; transform-origin: center; transition: opacity 220ms ease, transform 440ms var(--field-ease); }
.sl-field .sl-field__eyes-open { opacity: 0; transform: scaleY(.25); }
.sl-field .sl-field__eyes-open circle { fill: currentColor; stroke: none; transform-box: fill-box; transform-origin: center; transform: scale(.3); transition: transform 380ms var(--field-ease); }
.sl-field .sl-field__eyes-closed { opacity: 1; transform: scaleY(1); }
.sl-field[data-visible="true"] .sl-field__eyes-open { opacity: 1; transform: scaleY(1); transition-delay: 120ms, 0s; }
.sl-field[data-visible="true"] .sl-field__eyes-open circle { transform: scale(1); transition-delay: 180ms; }
.sl-field[data-visible="true"] .sl-field__eyes-closed { opacity: 0; transform: scaleY(.2); }
.sl-field.sl-field--number .sl-field__input { padding-right: 92px; appearance: textfield; -moz-appearance: textfield; }
.sl-field.sl-field--number .sl-field__input::-webkit-inner-spin-button, .sl-field.sl-field--number .sl-field__input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.sl-field.sl-field--number .sl-field__label { max-width: calc(100% - 108px); }
.sl-field .sl-field__steps { position: absolute; top: 11px; right: 7px; display: flex; gap: 2px; }
.sl-field .sl-field__step { width: 36px; height: 36px; }
@media (prefers-reduced-motion: reduce) {
  .sl-field *, .sl-field *::before, .sl-field *::after { transition: none !important; animation: none !important; }
  .sl-field .sl-field__popup { transform: none !important; }
}
@media (forced-colors: active) {
  .sl-field .sl-field__control, .sl-field .sl-field__popup { forced-color-adjust: none; background: Field !important; border-color: FieldText; color: FieldText; box-shadow: none; }
  .sl-field .sl-field__input, .sl-field .sl-field__label, .sl-field .sl-field__leading, .sl-field .sl-field__validation, .sl-field .sl-field__option, .sl-field .sl-field__action, .sl-field .sl-field__step, .sl-field .sl-field__empty { color: FieldText !important; caret-color: FieldText; }
  .sl-field .sl-field__control:focus-within { outline: 2px solid Highlight; outline-offset: 3px; }
  .sl-field .sl-field__option[aria-selected="true"], .sl-field .sl-field__option:hover, .sl-field .sl-field__action:hover, .sl-field .sl-field__step:hover { background: Highlight; color: HighlightText !important; }
  .sl-field .sl-field__helper { color: CanvasText; }
}

/* Draft input styles below this marker are not included in approved packages. */
.sl-field.sl-field--textarea .sl-field__control { height: 60px; min-height: 60px; max-height: 180px; transition: height 420ms var(--field-ease), background-color 360ms ease, border-color 360ms ease, box-shadow 420ms var(--field-ease); }
.sl-field.sl-field--textarea .sl-field__input { min-height: 0; padding: 30px 16px 24px; resize: none; overflow: hidden; line-height: 1.45; scrollbar-width: none; }
.sl-field.sl-field--textarea .sl-field__input::-webkit-scrollbar { display: none; width: 0; height: 0; }
.sl-field.sl-field--textarea .sl-field__label { top: 18px; }
.sl-field .sl-field__counter { position: absolute; right: 13px; bottom: 7px; display: flex; gap: 2px; color: #8f8f8f; font-size: 11px; line-height: 16px; font-variant-numeric: tabular-nums; pointer-events: none; }
.sl-field.sl-field--textarea .sl-field__input:focus ~ .sl-field__label, .sl-field.sl-field--textarea .sl-field__input:not(:placeholder-shown) ~ .sl-field__label { transform: translateY(-13px) scale(.76); }

.sl-field.sl-field--url .sl-field__input { padding-left: 50px; padding-right: 48px; }
.sl-field.sl-field--url .sl-field__label { left: 50px; max-width: calc(100% - 100px); }
.sl-field .sl-field__globe { top: 16px; left: 13px; width: 26px; height: 26px; overflow: visible; stroke-width: 1.35; }
.sl-field .sl-field__globe-axis { transform-box: fill-box; transform-origin: center; transition: transform 520ms var(--field-ease), opacity 320ms ease; }
.sl-field.sl-field--url[data-validation="valid"] .sl-field__globe { color: #f5f5f5; }
.sl-field.sl-field--url[data-validation="valid"] .sl-field__globe-axis { transform: scaleX(.92); }

.sl-field.sl-field--phone .sl-field__input { padding-left: 52px; }
.sl-field.sl-field--phone .sl-field__label { left: 52px; max-width: calc(100% - 70px); }
.sl-field .sl-field__phone { top: 15px; left: 12px; width: 29px; height: 29px; overflow: visible; stroke-width: 1.4; }
.sl-field .sl-field__phone-body { transform-box: fill-box; transform-origin: 54% 58%; }
.sl-field .sl-field__phone-ring { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; }
.sl-field[data-ringing="true"] .sl-field__phone-ring { opacity: 1; stroke-dashoffset: 0; transition: opacity 160ms ease, stroke-dashoffset 320ms var(--field-ease); }
.sl-field[data-ringing="true"] .sl-field__phone-ring--two { transition-delay: 90ms; }

.sl-field.sl-field--amount .sl-field__input { padding-left: 37px; padding-right: 58px; font-variant-numeric: tabular-nums; }
.sl-field.sl-field--amount .sl-field__label { left: 37px; max-width: calc(100% - 100px); }
.sl-field .sl-field__currency, .sl-field .sl-field__currency-code { position: absolute; z-index: 1; pointer-events: none; color: #d0d0d0; transition: transform 440ms var(--field-ease), color 300ms ease, opacity 300ms ease; }
.sl-field .sl-field__currency { top: 19px; left: 15px; font-size: 18px; font-weight: 520; line-height: 22px; }
.sl-field .sl-field__currency-code { top: 23px; right: 14px; font-size: 11px; line-height: 16px; letter-spacing: .04em; }
.sl-field.sl-field--amount .sl-field__control:focus-within .sl-field__currency { color: #f6f6f6; transform: translateX(-2px); }
.sl-field.sl-field--amount .sl-field__control:focus-within .sl-field__currency-code { color: #f6f6f6; transform: translateX(2px); }
.sl-field.sl-field--amount[data-amount-state="invalid"] .sl-field__control { border-color: #c5c5c5; }
.sl-field.sl-field--amount[data-amount-state="invalid"] .sl-field__helper { color: #3c3c3c; }

.sl-field.sl-field--code { width: min(300px, 100%); }
.sl-code__label { display: block; margin: 0 0 10px 2px; color: #5f5f5f; font: 500 12px/1.4 'Instrument Sans', sans-serif; }
.sl-code__control { position: relative; height: 46px; }
.sl-code__input { position: absolute; z-index: 2; inset: 0; width: 100%; height: 100%; padding: 0; border: 0; outline: 0; opacity: 0; cursor: text; caret-color: transparent; }
.sl-code__cells { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 7px; pointer-events: none; }
.sl-code__cells span { display: grid; place-items: center; min-width: 0; border: 1px solid transparent; border-radius: 11px; color: #f9f9f9; background: var(--field-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; font: 600 18px/1 'Instrument Sans', sans-serif; font-variant-numeric: tabular-nums; transition: border-color 300ms ease, background-color 300ms ease, box-shadow 380ms var(--field-ease), transform 380ms var(--field-ease); }
.sl-code__input:focus-visible + .sl-code__cells span.is-active { border-color: #b0b0b0; background: var(--field-hover); box-shadow: 0 0 0 3px #5c5c5c24, inset 0 1px #ffffff12; transform: translateY(-2px); }
.sl-field[data-result="success"] .sl-code__cells span { color: #eaf8ef; border-color: #4f8d72; background: #234b3a; box-shadow: inset 0 1px #ffffff17, 0 0 0 2px #4f8d7218; transform: translateY(-2px); }
.sl-field[data-result="error"] .sl-code__cells span { color: #fff0f0; border-color: #a85e63; background: #543134; box-shadow: inset 0 1px #ffffff12, 0 0 0 2px #a85e6315; transform: translateY(1px); }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(1) { transition-delay: 0ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(2) { transition-delay: 80ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(3) { transition-delay: 160ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(4) { transition-delay: 240ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(5) { transition-delay: 320ms; }
.sl-field[data-result]:not([data-result="neutral"]) .sl-code__cells span:nth-child(6) { transition-delay: 400ms; }

@media (max-width: 420px) {
  .sl-code__cells { gap: 5px; }
}
@media (prefers-reduced-motion: reduce) {
  .sl-field .sl-field__counter, .sl-field .sl-field__phone-ring, .sl-field .sl-code__cells span { transition: none !important; animation: none !important; transform: none !important; }
}
@media (forced-colors: active) {
  .sl-field .sl-code__cells span { forced-color-adjust: none; background: Field; border-color: FieldText; color: FieldText; box-shadow: none; }
  .sl-field .sl-code__input:focus-visible + .sl-code__cells span.is-active { outline: 2px solid Highlight; outline-offset: 2px; }
}
`;function j(){return(()=>{const o=new WeakMap;let F=0;function Y(a,_,k=()=>({})){if(o.has(a))return o.get(a);const i=a?.querySelector("input, textarea");const e=i?.tagName==="TEXTAREA"?"textarea":i?.type;if(!i||e!==_)throw new TypeError(`A native ${_} control is required.`);const f=a.ownerDocument,s=f.defaultView;const t=new s.AbortController;const h=[],q=[];let m=false;const b=(c,r,C,z={})=>c.addEventListener(r,C,{...z,signal:t.signal});const n=k({root:a,input:i,doc:f,view:s,on:b,resets:h,cleanups:q,alive:()=>!m});if(i.form)b(i.form,"reset",c=>queueMicrotask(()=>{if(!m&&!c.defaultPrevented)h.forEach(r=>r())}));const g={reset(){if(m)return;i.value=i.defaultValue;h.forEach(c=>c())},destroy(){if(m)return;m=true;t.abort();q.forEach(c=>c());o.delete(a)}};Object.defineProperties(g,Object.getOwnPropertyDescriptors(n));o.set(a,g);return g}function d(a,{items:_=["Buttons","Inputs","Toggles","Checkboxes","Sliders","Menus","Navigation","Overlays","Feedback","Data display"]}={}){if(!Array.isArray(_)||_.some(i=>typeof i!=="string"))throw new TypeError("Search items must be strings.");const k=[...new Set(_)];return Y(a,"search",({root:i,input:e,doc:f,view:s,on:t,resets:h,cleanups:q,alive:m})=>{const b=i.querySelector(".sl-field__popup"),n=i.querySelector(".sl-field__options");const g=i.querySelector(".sl-field__clear"),c=i.querySelector(".sl-field__empty"),r=i.querySelector(".sl-field__helper");if(!b||!n||!g||!c||!r)throw new TypeError("Search needs its list, clear action and helper.");if(!n.id)n.id="sl-field-options-"+ ++F;e.setAttribute("aria-controls",n.id);const C=r.textContent;const z=i.querySelector(".sl-field__leading");const D=s.matchMedia("(prefers-reduced-motion: reduce)");let S=null;function A(){S?.cancel();S=null}function L(){if(D.matches||!z?.animate||S?.playState==="running")return;A();S=z.animate([{transform:"translateY(0) rotate(0) scale(1)",easing:"ease-in-out"},{transform:"translateY(1px) rotate(3deg) scale(.96)",offset:.14,easing:"cubic-bezier(.25, .1, .25, 1)"},{transform:"translateY(-6px) rotate(-16deg) scale(1.08)",offset:.46,easing:"cubic-bezier(.35, 0, .3, 1)"},{transform:"translateY(.7px) rotate(2deg) scale(1)",offset:.78,easing:"ease-out"},{transform:"translateY(0) rotate(0) scale(1)"}],{duration:700});const l=S;l.onfinish=()=>{if(S===l)A()}}let p=[],u=-1,v=false;function x(){v=false;u=-1;i.dataset.searchOpen="false";b.inert=true;b.setAttribute("aria-hidden","true");e.setAttribute("aria-expanded","false");e.removeAttribute("aria-activedescendant")}function M(l){u=l;[...n.children].forEach((y,T)=>y.setAttribute("aria-selected",String(T===u)));if(u>=0)e.setAttribute("aria-activedescendant",n.children[u].id);else e.removeAttribute("aria-activedescendant")}function E(l=true){const y=e.value.trim().toLocaleLowerCase();p=k.filter(T=>T.toLocaleLowerCase().includes(y)).slice(0,4);n.replaceChildren(...p.map((T,N)=>{const w=f.createElement("li");w.className="sl-field__option";w.id=n.id+"-"+N;w.setAttribute("role","option");w.setAttribute("aria-selected","false");w.dataset.index=String(N);w.textContent=T;return w}));g.hidden=!e.value;c.hidden=p.length>0;M(-1);if(!l||e.disabled||e.readOnly){x();return}v=true;i.dataset.searchOpen="true";b.inert=false;b.setAttribute("aria-hidden","false");e.setAttribute("aria-expanded","true");r.textContent=p.length?`${p.length} suggestions. Use the arrow keys to choose.`:"No matching components."}function O(l){if(!m()||!p[l])return;e.value=p[l];e.dispatchEvent(new s.Event("input",{bubbles:true,composed:true}));e.dispatchEvent(new s.Event("change",{bubbles:true,composed:true}));e.focus({preventScroll:true});x();r.textContent=`${e.value} selected.`;e.dispatchEvent(new s.CustomEvent("searchselect",{bubbles:true,composed:true,detail:{value:e.value}}))}t(e,"focus",()=>{E();L()});t(e,"pointerdown",l=>{if(l.button===0&&(f.activeElement===e||i.getRootNode().activeElement===e))L()});t(e,"input",l=>{if(!l.isComposing)E()});t(e,"compositionend",()=>E());t(e,"keydown",l=>{if(l.isComposing)return;if(l.key==="ArrowDown"||l.key==="ArrowUp"){l.preventDefault();if(!v)E();if(!p.length)return;M(l.key==="ArrowDown"?(u+1)%p.length:u<=0?p.length-1:u-1)}else if(l.key==="Enter"&&v){l.preventDefault();if(u>=0)O(u)}else if(l.key==="Escape"&&v){l.preventDefault();x();r.textContent=C}});t(n,"pointerdown",l=>l.preventDefault());t(n,"click",l=>{const y=l.target.closest('[role="option"]');if(y&&n.contains(y))O(Number(y.dataset.index))});t(g,"click",()=>{if(e.disabled||e.readOnly)return;e.value="";e.dispatchEvent(new s.Event("input",{bubbles:true,composed:true}));e.dispatchEvent(new s.Event("change",{bubbles:true,composed:true}));e.focus({preventScroll:true});x();r.textContent=C});t(i,"focusout",l=>{if(l.relatedTarget){if(!i.contains(l.relatedTarget))x();return}queueMicrotask(()=>{if(m()&&!i.contains(i.getRootNode().activeElement||f.activeElement))x()})});t(f,"pointerdown",l=>{if(v&&!l.composedPath().includes(i))x()});t(D,"change",()=>{if(D.matches)A()});h.push(()=>{A();E(false);r.textContent=C});q.push(()=>{A();x();g.hidden=true});E(false);return{close:()=>{if(m())x()},get isOpen(){return v}}})}return{mount:d}})()}function X(o,F={},{preview:Y=false}={}){if(!o||typeof o.attachShadow!=="function")throw new TypeError("A DOM host is required");const d=o.shadowRoot||o.attachShadow({mode:"open"});d.innerHTML=R;const a=o.ownerDocument.createElement("style");const _=new URL("./instrument-sans-variable.woff2",import.meta.url).href;a.textContent=H.replaceAll("./instrument-sans-variable.woff2",_)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';d.prepend(a);const k=d.querySelector(".sl-field");if(!k){d.replaceChildren();throw new Error("Missing component root")}const i=P(o.ownerDocument,_);let e,f=false;try{const s=j(),t={};if(I==="upload")t.input=d.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(I))t.feedback=d.querySelector("."+I+"-feedback");if(Y&&typeof s.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");e=(Y?s.mountPreview:s.mount)(k,{...t,...F});if(typeof e?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(s){i();d.replaceChildren();throw s}return new Proxy(e,{get(s,t){if(t==="destroy")return()=>{if(f)return;f=true;try{s.destroy()}finally{i();d.replaceChildren()}};const h=Reflect.get(s,t,s);return typeof h==="function"?h.bind(s):h}})}export{X as mountInto,I as variant};
