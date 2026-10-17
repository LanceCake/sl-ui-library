import{retainFont as O}from"./react-font.mjs";const P="pair";const D='<div class="button-kit">\n<button class="bk-button bk-button--save" data-action="save" type="button" data-state="idle" disabled>\n        <span class="bk-surface" aria-hidden="true">\n          <span class="bk-progress"></span>\n          <span class="bk-label bk-label-idle">Save changes</span>\n          <span class="bk-label bk-label-saving">Saving<span class="bk-ellipsis">…</span></span>\n          <span class="bk-label bk-label-saved">\n            <svg class="bk-check" viewBox="0 0 24 24" fill="none" focusable="false"><path d="M4 12.5 9.2 17.5 20 6.5" pathLength="1"/></svg>\n            <span class="bk-saved-text">Saved</span>\n          </span>\n        </span>\n        <span class="bk-sr-only">Save changes</span>\n      </button>\n<button class="bk-button bk-button--cancel" data-action="cancel" type="button" data-state="idle" disabled>\n        <span class="bk-surface" aria-hidden="true">\n          <span class="bk-wash"></span>\n          <span class="bk-label bk-label-idle">Cancel</span>\n          <span class="bk-label bk-label-cancelled">Cancelled</span>\n        </span>\n        <span class="bk-sr-only">Cancel</span>\n      </button>\n    <span class="bk-sr-only" data-feedback role="status" aria-live="polite" aria-atomic="true"></span>\n  </div>';const N=`/* Matte buttons. Scoped styles and editable color and motion tokens. */
@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.button-kit {
  --unit: 1px;
  --ink: #222222;
  --secondary: #e4e3e0;
  --save-feedback: #3f3f3f;
  --primary-hover: #2e2e2e;
  --primary-foreground: #fafafa;
  --secondary-hover: #dcdcdc;
  --secondary-feedback: #cdcdcd;
  --secondary-foreground: var(--ink);
  --focus-ring: #5a5a5a;
  --motion-duration-short-2: 100ms;
  --motion-duration-short-3: 150ms;
  --motion-duration-short-4: 200ms;
  --motion-duration-medium-1: 250ms;
  --motion-duration-medium-2: 300ms;
  --motion-duration-medium-3: 350ms;
  --motion-easing-standard: cubic-bezier(0.2,0,0,1);
  --motion-easing-emphasized-decelerate: cubic-bezier(0.05,0.7,0.1,1);
  --motion-easing-ease-in-out-gentle: cubic-bezier(0.4,0,0.2,1);
  font-family: 'Instrument Sans', sans-serif;
  font-synthesis: none;
  -webkit-font-smoothing: antialiased;
  display: flex; flex-direction: column; align-items: center; gap: calc(20 * var(--unit));
}
.button-kit *, .button-kit *::before, .button-kit *::after { box-sizing: border-box; }
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
.bk-button--save {
  width: calc(220 * var(--unit));
  height: calc(52 * var(--unit));
  font-size: calc(19 * var(--unit));
  color: var(--primary-foreground);
}
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
.bk-button--save .bk-surface {
  background-color: var(--secondary-foreground);
  background-image: linear-gradient(155deg, rgb(255 255 255 / 2.5%), transparent 68%);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 7%), 0 1px 2px rgb(0 0 0 / 5%);
}
.bk-button--cancel .bk-surface {
  background-color: var(--secondary);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 18%);
}
@media (hover: hover) {
  .bk-button:not([aria-disabled="true"]):hover .bk-surface { transform: translateY(-2px); }
  .bk-button--save:not([aria-disabled="true"]):hover .bk-surface {
    background-color: var(--primary-hover);
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 9%), 0 6px 12px -8px rgb(0 0 0 / 28%);
  }
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
[data-state="saving"] .bk-label-saving,
[data-state="saved"] .bk-label-saved,
[data-state="cancelled"] .bk-label-cancelled { opacity: 1; }
/* M3 fade-through: finish the outgoing label before revealing its replacement. */
.bk-button[data-state="idle"] .bk-label-idle,
.bk-button[data-state="saving"] .bk-label-saving,
.bk-button[data-state="saved"] .bk-label-saved,
.bk-button[data-state="cancelled"] .bk-label-cancelled {
  transition-duration: var(--motion-duration-short-4);
  transition-delay: var(--motion-duration-short-3);
}
/* A gentler, 600ms return after success; other state changes keep their timing. */
.bk-button--save[data-transition="return"] .bk-label-saved {
  transition-duration: var(--motion-duration-medium-1);
  transition-timing-function: var(--motion-easing-ease-in-out-gentle);
}
.bk-button--save[data-transition="return"] .bk-label-idle {
  transition-duration: var(--motion-duration-medium-3);
  transition-delay: var(--motion-duration-medium-1);
  transition-timing-function: var(--motion-easing-ease-in-out-gentle);
}
.bk-ellipsis { margin-left: -0.3em; }
.bk-progress {
  position: absolute;
  inset: 0;
  background: var(--save-feedback);
  transform: scaleX(0);
  transform-origin: left center;
}
.bk-wash { position: absolute; inset: 0; background: var(--secondary-feedback); opacity: 0; }
.bk-label-saved {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.24em;
}
.bk-label-saved .bk-check { justify-self: end; }
.bk-saved-text { grid-column: 2; }
.bk-check { width: 1em; height: 1em; flex: 0 0 auto; overflow: visible; }
.bk-check path {
  stroke: currentColor;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}
[data-state="saved"] .bk-check path {
  animation: bk-check-draw var(--motion-duration-medium-3) var(--motion-easing-standard) var(--motion-duration-short-2) backwards;
}
@keyframes bk-check-draw {
  from { stroke-dashoffset: 1; opacity: 0; }
  15% { opacity: 1; }
  to { stroke-dashoffset: 0; opacity: 1; }
}

.bk-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) {
  .bk-button .bk-surface, .bk-button .bk-label, .bk-check path { transition: none; }
  .bk-button[data-state] .bk-label { transition: none; }
  [data-state="saved"] .bk-check path { animation: none; }
  .bk-button .bk-surface, .bk-button:hover .bk-surface, .bk-button:active .bk-surface,
  .bk-button.is-pressed .bk-surface, .bk-button .bk-label { transform: none; }
  .bk-button:active .bk-surface { opacity: 0.88; }
  .bk-progress { display: none; }
}
@media (forced-colors: active) {
  .bk-surface { border: 1px solid ButtonText; }
  .bk-progress, .bk-wash { display: none; }
}

`;function U(){return(()=>{const o={"short-2":100,"short-4":200,"medium-3":350,"medium-4":400,"long-4":600};const p={"linear":"cubic-bezier(0,0,1,1)","ease-in-out-gentle":"cubic-bezier(0.4,0,0.2,1)"};const m=new WeakMap;function r(i,{onSave:x,onCancel:C=()=>{},previewDuration:k=0,confirmationMs:g=1400}={}){if(m.has(i))return m.get(i);const e=i.querySelector('[data-action="save"]');const t=i.querySelector('[data-action="cancel"]');const s=e?.querySelector(".bk-progress");const h=t?.querySelector(".bk-wash");const R=i.querySelector("[data-feedback]");if(e&&typeof x!=="function")throw new TypeError("Pass your async onSave function.");const d=matchMedia("(prefers-reduced-motion: reduce)");const v=new AbortController;const A=new Map;const T=new Set;let l,E,L,y,u;let M=false;function b(n,a,f){if(!n)return;if(n===e&&n.dataset.state!==a){n.dataset.transition=n.dataset.state==="saved"&&a==="idle"?"return":"default"}n.dataset.state=a;n.setAttribute("aria-label",f)}function z(n){if(R)R.textContent=n}function q(){e?.setAttribute("aria-disabled","false");e?.setAttribute("aria-busy","false")}function w(n=false){if(!s)return;const a=n&&!d.matches&&y?getComputedStyle(s):null;const f=a?.transform||"none";const B=a?Number(a.opacity):0;const F=f==="none"?0:new DOMMatrixReadOnly(f).a;if(n&&!d.matches&&F>.001&&B>0){const c=s.cloneNode(false);c.classList.add("bk-retiring");c.style.transform=f;c.style.opacity=String(B);s.before(c);const S=c.animate([{opacity:B},{opacity:0}],{duration:e.dataset.transition==="return"?o["long-4"]:o["medium-4"],easing:p["ease-in-out-gentle"],fill:"forwards"});A.set(c,S);S.onfinish=()=>{c.remove();A.delete(c);S.cancel()}}y?.cancel();y=null;if(!n||d.matches){for(const[c,S]of A){S.cancel();c.remove()}A.clear()}}async function X(){if(M||e.disabled||e.getAttribute("aria-disabled")==="true")return;clearTimeout(E);clearTimeout(L);u?.cancel();b(t,"idle","Cancel");w(true);const n=new AbortController;l=n;b(e,"saving","Saving changes");e.setAttribute("aria-disabled","true");e.setAttribute("aria-busy","true");z("Saving changes.");if(!d.matches&&k>o["short-4"]){const a=o["short-4"]/k;y=s.animate([{transform:"scaleX(0)",opacity:0},{transform:`scaleX(${a})`,opacity:1,offset:a},{transform:"scaleX(1)",opacity:1}],{duration:k,easing:p.linear,fill:"forwards"})}try{await x({signal:n.signal});if(l!==n||n.signal.aborted)return;l=null;if(!y&&!d.matches){y=s.animate([{transform:"scaleX(1)",opacity:0},{transform:"scaleX(1)",opacity:1}],{duration:o["medium-3"],easing:p["ease-in-out-gentle"],fill:"forwards"})}b(e,"saved","Changes saved");e.setAttribute("aria-busy","false");z("Changes saved.");E=setTimeout(()=>{b(e,"idle","Save changes");q();w(true)},g)}catch(a){if(l!==n)return;l=null;b(e,"idle","Save changes");q();w(true);z(a?.name==="AbortError"?"Saving cancelled.":"Could not save. Please try again.")}}function j(){if(M||t.disabled||t.getAttribute("aria-disabled")==="true")return;const n=Boolean(l);l?.abort();l=null;clearTimeout(E);clearTimeout(L);b(e,"idle","Save changes");q();w(true);b(t,"cancelled","Cancelled");u?.cancel();if(h&&!d.matches){u=h.animate([{opacity:0},{opacity:.35,offset:.5},{opacity:0}],{duration:o["medium-4"],easing:p["ease-in-out-gentle"]});const a=u;a.onfinish=()=>{if(u===a)u=null;a.cancel()}}z(n?"Saving cancelled.":"Cancelled.");L=setTimeout(()=>b(t,"idle","Cancel"),g);C({wasSaving:n})}e?.addEventListener("click",X,{signal:v.signal});t?.addEventListener("click",j,{signal:v.signal});for(const n of[e,t].filter(Boolean)){n.disabled=false;n.addEventListener("keydown",a=>{if(a.key!=="Enter"||a.repeat||n.getAttribute("aria-disabled")==="true")return;n.classList.add("is-pressed");const f=setTimeout(()=>{n.classList.remove("is-pressed");T.delete(f)},o["short-2"]);T.add(f)},{signal:v.signal});n.addEventListener("blur",()=>n.classList.remove("is-pressed"),{signal:v.signal})}d.addEventListener("change",()=>{if(d.matches){w();u?.cancel()}},{signal:v.signal});const I={destroy(){if(M)return;M=true;v.abort();l?.abort();l=null;clearTimeout(E);clearTimeout(L);T.forEach(clearTimeout);T.clear();w();u?.cancel();for(const n of[e,t].filter(Boolean)){n.classList.remove("is-pressed");n.disabled=true}m.delete(i)}};m.set(i,I);return I}return{mount:r}})()}function H(o,p={},{preview:m=false}={}){if(!o||typeof o.attachShadow!=="function")throw new TypeError("A DOM host is required");const r=o.shadowRoot||o.attachShadow({mode:"open"});r.innerHTML=D;const i=o.ownerDocument.createElement("style");const x=new URL("./instrument-sans-variable.woff2",import.meta.url).href;i.textContent=N.replaceAll("./instrument-sans-variable.woff2",x)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';r.prepend(i);const C=r.querySelector(".button-kit");if(!C){r.replaceChildren();throw new Error("Missing component root")}const k=O(o.ownerDocument,x);let g,e=false;try{const t=U(),s={};if(P==="upload")s.input=r.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(P))s.feedback=r.querySelector("."+P+"-feedback");if(m&&typeof t.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");g=(m?t.mountPreview:t.mount)(C,{...s,...p});if(typeof g?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(t){k();r.replaceChildren();throw t}return new Proxy(g,{get(t,s){if(s==="destroy")return()=>{if(e)return;e=true;try{t.destroy()}finally{k();r.replaceChildren()}};const h=Reflect.get(t,s,t);return typeof h==="function"?h.bind(t):h}})}export{H as mountInto,P as variant};
