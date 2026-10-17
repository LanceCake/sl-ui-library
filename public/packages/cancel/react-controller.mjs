import{retainFont as x}from"./react-font.mjs";const y="cancel";const S='<div class="button-kit">\n\n<button class="bk-button bk-button--cancel" data-action="cancel" type="button" data-state="idle" disabled>\n        <span class="bk-surface" aria-hidden="true">\n          <span class="bk-wash"></span>\n          <span class="bk-label bk-label-idle">Cancel</span>\n          <span class="bk-label bk-label-cancelled">Cancelled</span>\n        </span>\n        <span class="bk-sr-only">Cancel</span>\n      </button>\n    <span class="bk-sr-only" data-feedback role="status" aria-live="polite" aria-atomic="true"></span>\n  </div>';const C=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.button-kit {
  --unit: 1px;
  --ink: #222222;
  --secondary: #e4e3e0;
  --secondary-hover: #dcdcdc;
  --secondary-feedback: #cdcdcd;
  --secondary-foreground: var(--ink);
  --focus-ring: #5a5a5a;
  --motion-duration-short-2: 100ms;
  --motion-duration-short-3: 150ms;
  --motion-duration-short-4: 200ms;
  --motion-duration-medium-2: 300ms;
  --motion-duration-medium-3: 350ms;
  --motion-easing-standard: cubic-bezier(0.2,0,0,1);
  --motion-easing-emphasized-decelerate: cubic-bezier(0.05,0.7,0.1,1);
  font-family: 'Instrument Sans', sans-serif;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  display: flex; flex-direction: column; align-items: center; gap: calc(20 * var(--unit));
}
.button-kit *,
.button-kit *::before,
.button-kit *::after { box-sizing: border-box; }
.bk-button {
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  display: block;
  border: 0;
  padding: 0;
  background: transparent;
  font: inherit;
  font-weight: 550;
  letter-spacing: -0.02em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  border-radius: calc(13 * var(--unit));
  outline-offset: 6px;
}
.bk-button:focus-visible { outline: 2px solid var(--focus-ring); }
.bk-button--cancel {
  width: calc(140 * var(--unit));
  height: calc(46 * var(--unit));
  font-size: calc(16 * var(--unit));
  color: var(--secondary-foreground);
}
.bk-surface {
  position: absolute;
  inset: 0;
  overflow: hidden;
  isolation: isolate;
  display: grid;
  place-items: center;
  border-radius: inherit;
  transition:
    transform var(--motion-duration-medium-3) var(--motion-easing-emphasized-decelerate),
    background-color var(--motion-duration-short-4) var(--motion-easing-standard),
    box-shadow var(--motion-duration-medium-2) var(--motion-easing-standard);
}
.bk-button--cancel .bk-surface {
  background-color: var(--secondary);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 18%);
}
@media (hover: hover) {
.bk-button:not([aria-disabled="true"]):hover .bk-surface { transform: translateY(-2px); }
.bk-button--cancel:hover .bk-surface { background-color: var(--secondary-hover); }
}
.bk-button:not([aria-disabled="true"]):active .bk-surface,
.bk-button.is-pressed .bk-surface {
  transform: translateY(1px) scale(0.98);
  transition-duration: var(--motion-duration-short-2);
  transition-timing-function: var(--motion-easing-standard);
}
.bk-button[aria-disabled="true"] { cursor: default; }
.bk-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  line-height: 1.1;
  white-space: nowrap;
  opacity: 0;
  transition: opacity var(--motion-duration-short-3) var(--motion-easing-standard);
}
[data-state="idle"] .bk-label-idle,
[data-state="cancelled"] .bk-label-cancelled { opacity: 1; }
.bk-button[data-state="idle"] .bk-label-idle,
.bk-button[data-state="cancelled"] .bk-label-cancelled {
  transition-duration: var(--motion-duration-short-4);
  transition-delay: var(--motion-duration-short-3);
}
.bk-wash { position: absolute; inset: 0; background: var(--secondary-feedback); opacity: 0; }
.bk-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) {
.bk-button .bk-surface,
.bk-button .bk-label { transition: none; }
.bk-button[data-state] .bk-label { transition: none; }
.bk-button .bk-surface,
.bk-button:hover .bk-surface,
.bk-button:active .bk-surface,
.bk-button.is-pressed .bk-surface,
.bk-button .bk-label { transform: none; }
.bk-button:active .bk-surface { opacity: 0.88; }
}
@media (forced-colors: active) {
.bk-surface { border: 1px solid ButtonText; }
.bk-wash { display: none; }
}
`;function E(){return(()=>{const o={"short-2":100,"medium-4":400};const m={"ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"};const l=new WeakMap;function a(r,{onCancel:b=()=>{},confirmationMs:f=1400}={}){if(l.has(r))return l.get(r);const n=r.querySelector('[data-action="cancel"]');if(!n)throw new TypeError("The component needs a Cancel button.");const d=n.querySelector(".bk-wash");const u=r.querySelector("[data-feedback]");const e=matchMedia("(prefers-reduced-motion: reduce)");const t=new AbortController;const i=new Set;let k,s;let h=false;function v(c,p){n.dataset.state=c;n.setAttribute("aria-label",p)}function w(){if(h||n.disabled||n.getAttribute("aria-disabled")==="true")return;clearTimeout(k);v("cancelled","Cancelled");s?.cancel();if(d&&!e.matches){s=d.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:o["medium-4"],easing:m["ease-in-out-gentle"]});const c=s;c.onfinish=()=>{if(s===c)s=null;c.cancel()}}if(u)u.textContent="Cancelled.";k=setTimeout(()=>v("idle","Cancel"),f);b({wasSaving:false})}n.addEventListener("click",w,{signal:t.signal});n.addEventListener("keydown",c=>{if(c.key!=="Enter"||c.repeat||n.getAttribute("aria-disabled")==="true")return;n.classList.add("is-pressed");const p=setTimeout(()=>{n.classList.remove("is-pressed");i.delete(p)},o["short-2"]);i.add(p)},{signal:t.signal});n.addEventListener("blur",()=>n.classList.remove("is-pressed"),{signal:t.signal});e.addEventListener("change",()=>{if(e.matches)s?.cancel()},{signal:t.signal});n.disabled=false;const g={destroy(){if(h)return;h=true;t.abort();clearTimeout(k);i.forEach(clearTimeout);i.clear();s?.cancel();s=null;n.classList.remove("is-pressed");n.disabled=true;l.delete(r)}};l.set(r,g);return g}return{mount:a}})()}function L(o,m={},{preview:l=false}={}){if(!o||typeof o.attachShadow!=="function")throw new TypeError("A DOM host is required");const a=o.shadowRoot||o.attachShadow({mode:"open"});a.innerHTML=S;const r=o.ownerDocument.createElement("style");const b=new URL("./instrument-sans-variable.woff2",import.meta.url).href;r.textContent=C.replaceAll("./instrument-sans-variable.woff2",b)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';a.prepend(r);const f=a.querySelector(".button-kit");if(!f){a.replaceChildren();throw new Error("Missing component root")}const n=x(o.ownerDocument,b);let d,u=false;try{const e=E(),t={};if(y==="upload")t.input=a.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(y))t.feedback=a.querySelector("."+y+"-feedback");if(l&&typeof e.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");d=(l?e.mountPreview:e.mount)(f,{...t,...m});if(typeof d?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(e){n();a.replaceChildren();throw e}return new Proxy(d,{get(e,t){if(t==="destroy")return()=>{if(u)return;u=true;try{e.destroy()}finally{n();a.replaceChildren()}};const i=Reflect.get(e,t,e);return typeof i==="function"?i.bind(e):i}})}export{L as mountInto,y as variant};
