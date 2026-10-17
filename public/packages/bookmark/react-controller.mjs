import{retainFont as C}from"./react-font.mjs";const v="bookmark";const S='<button class="sl-bookmark" id="bookmark-button" type="button" aria-label="Bookmark" aria-pressed="false" disabled>\n          <span class="sl-bookmark__surface" aria-hidden="true">\n            <span class="sl-bookmark__wash"></span>\n            <span class="sl-bookmark__icon">\n              <svg class="sl-bookmark__ribbon" viewBox="0 0 24 24" fill="none" focusable="false">\n                <path class="sl-bookmark__outline" d="M6 20V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-4-6 4Z"/>\n                <path class="sl-bookmark__fill" d="M6 20V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v15l-6-4-6 4Z"/>\n              </svg>\n            </span>\n            <span class="sl-bookmark__label">Bookmark</span>\n          </span>\n        </button>\n  <p class="bookmark-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const E=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-bookmark {
  --bookmark-unit: 1px;
  --bookmark-ink: #222222;
  --bookmark-hover: #2e2e2e;
  --bookmark-active: #3f3f3f;
  --bookmark-text: #fafafa;
  --bookmark-focus: #5a5a5a;
  --bookmark-ease: cubic-bezier(.4, 0, .2, 1);
  display: block;
  position: relative;
  flex: none;
  width: calc(236 * var(--bookmark-unit));
  height: calc(52 * var(--bookmark-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--bookmark-unit));
  appearance: none;
  background: transparent;
  color: var(--bookmark-text);
  font: 550 calc(19 * var(--bookmark-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  text-align: center;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-bookmark *, .sl-bookmark *::before, .sl-bookmark *::after { box-sizing: border-box; }
.sl-bookmark:disabled, .sl-bookmark[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.sl-bookmark:focus-visible { outline: 2px solid var(--bookmark-focus); outline-offset: 6px; }
.sl-bookmark .sl-bookmark__surface {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
  background: var(--bookmark-ink);
  box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d;
  transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease;
}
@media (hover: hover) and (forced-colors: none) {
  .sl-bookmark:not(:disabled):not([aria-disabled="true"]):hover .sl-bookmark__surface {
    transform: translateY(-2px);
    background-color: var(--bookmark-hover);
    box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047;
  }
}
.sl-bookmark:not(:disabled):not([aria-disabled="true"]):active .sl-bookmark__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-bookmark .sl-bookmark__wash { position: absolute; inset: 0; z-index: -1; background: var(--bookmark-active); opacity: 0; transition: opacity 540ms var(--bookmark-ease); }
.sl-bookmark[aria-pressed="true"] .sl-bookmark__wash { opacity: 1; }
.sl-bookmark .sl-bookmark__label { position: absolute; inset: 0 calc(56 * var(--bookmark-unit)); display: grid; place-items: center; text-align: center; white-space: nowrap; }
.sl-bookmark .sl-bookmark__icon { position: absolute; left: calc(18 * var(--bookmark-unit)); top: 50%; width: calc(22 * var(--bookmark-unit)); height: calc(24 * var(--bookmark-unit)); transform: translateY(-50%); }
.sl-bookmark .sl-bookmark__ribbon {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-box: view-box;
  transform-origin: 50% 12.5%;
  transform: translateY(0) scaleY(1);
  transition: transform 540ms var(--bookmark-ease);
}
.sl-bookmark[aria-pressed="true"] .sl-bookmark__ribbon { transform: translateY(calc(-1.2 * var(--bookmark-unit))) scaleY(.88); }
.sl-bookmark .sl-bookmark__fill { fill: currentColor; stroke: none; clip-path: inset(0 0 100% 0); transition: clip-path 540ms var(--bookmark-ease); }
.sl-bookmark[aria-pressed="true"] .sl-bookmark__fill { clip-path: inset(0); }
@media (prefers-reduced-motion: reduce) {
  .sl-bookmark *, .sl-bookmark *::before, .sl-bookmark *::after { transition: none !important; animation: none !important; }
  .sl-bookmark .sl-bookmark__surface, .sl-bookmark:hover .sl-bookmark__surface, .sl-bookmark:active .sl-bookmark__surface, .sl-bookmark[aria-pressed] .sl-bookmark__ribbon { transform: none !important; }
  .sl-bookmark:active .sl-bookmark__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-bookmark .sl-bookmark__surface { forced-color-adjust: none; border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; box-shadow: none; }
  .sl-bookmark[aria-pressed="true"] .sl-bookmark__surface { background: Highlight; color: HighlightText; border-color: Highlight; }
  .sl-bookmark .sl-bookmark__wash { display: none; }
  .sl-bookmark:focus-visible { outline-color: Highlight; }
}

.bookmark-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function A(){return(()=>{const t=new WeakMap;const h="Try the button. Your selection stays until you undo it.";function u(o,{feedback:k}={}){if(t.has(o))return t.get(o);if(o?.tagName!=="BUTTON")throw new TypeError("A native Bookmark button is required.");const r=o.querySelector(".sl-bookmark__label");const f=o.querySelector(".sl-bookmark__ribbon");if(!r||!f)throw new TypeError("The Bookmark button needs its label and ribbon elements.");const c=o.ownerDocument.defaultView;const i=c.matchMedia("(prefers-reduced-motion: reduce)");let n=o.getAttribute("aria-pressed")==="true";let a=n?"Bookmarked":"Bookmark";let e=null;let s=0;let m=false;function d(){s++;e?.cancel();e=null;r.textContent=a;r.style.removeProperty("opacity")}async function x(l){if(l===a)return;const p=e?c.getComputedStyle(r).opacity:"1";a=l;const b=++s;r.style.opacity=p;e?.cancel();if(i.matches||!r.animate){d();return}try{if(r.textContent!==l){e=r.animate([{opacity:p},{opacity:0}],{duration:180,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await e.finished;if(b!==s||m)return;r.style.opacity="0";e.cancel();r.textContent=l}e=r.animate([{opacity:r.style.opacity},{opacity:1}],{duration:300,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await e.finished;if(b!==s||m)return;r.style.removeProperty("opacity");e.cancel();e=null}catch(B){if(B.name!=="AbortError"&&b===s)d()}}function y(l,p=false){const b=Boolean(l);if(m||n===b)return;n=b;o.setAttribute("aria-pressed",String(n));x(n?"Bookmarked":"Bookmark");if(k)k.textContent=n?"Bookmarked. Click again to undo.":"Bookmark removed.";if(p)o.dispatchEvent(new c.CustomEvent("bookmarkchange",{bubbles:true,detail:{pressed:n}}))}function w(){if(!o.disabled&&o.getAttribute("aria-disabled")!=="true")y(!n,true)}function _(){if(i.matches)d()}o.type="button";if(!o.hasAttribute("aria-label")&&!o.hasAttribute("aria-labelledby"))o.setAttribute("aria-label","Bookmark");o.setAttribute("aria-pressed",String(n));r.textContent=a;o.disabled=false;o.addEventListener("click",w);i.addEventListener("change",_);const g={setPressed:l=>y(l),reset(){if(m)return;y(false);d();if(k)k.textContent=h},destroy(){if(m)return;m=true;d();o.disabled=true;o.removeEventListener("click",w);i.removeEventListener("change",_);t.delete(o)}};t.set(o,g);return g}return{mount:u}})()}function L(t,h={},{preview:u=false}={}){if(!t||typeof t.attachShadow!=="function")throw new TypeError("A DOM host is required");const o=t.shadowRoot||t.attachShadow({mode:"open"});o.innerHTML=S;const k=t.ownerDocument.createElement("style");const r=new URL("./instrument-sans-variable.woff2",import.meta.url).href;k.textContent=E.replaceAll("./instrument-sans-variable.woff2",r)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';o.prepend(k);const f=o.querySelector(".sl-bookmark");if(!f){o.replaceChildren();throw new Error("Missing component root")}const c=C(t.ownerDocument,r);let i,n=false;try{const a=A(),e={};if(v==="upload")e.input=o.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(v))e.feedback=o.querySelector("."+v+"-feedback");if(u&&typeof a.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");i=(u?a.mountPreview:a.mount)(f,{...e,...h});if(typeof i?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(a){c();o.replaceChildren();throw a}return new Proxy(i,{get(a,e){if(e==="destroy")return()=>{if(n)return;n=true;try{a.destroy()}finally{c();o.replaceChildren()}};const s=Reflect.get(a,e,a);return typeof s==="function"?s.bind(a):s}})}export{L as mountInto,v as variant};
