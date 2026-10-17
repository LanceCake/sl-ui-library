import{retainFont as C}from"./react-font.mjs";const v="like";const S='<button class="sl-like" id="like-button" type="button" aria-label="Like" aria-pressed="false" disabled>\n          <span class="sl-like__surface" aria-hidden="true">\n            <span class="sl-like__wash"></span>\n            <span class="sl-like__icon">\n              <svg class="sl-like__heart" viewBox="0 0 24 24" fill="none" focusable="false">\n                <path class="sl-like__outline" d="M12 20S3 14.5 3 8.5a4.6 4.6 0 0 1 9-1.4 4.6 4.6 0 0 1 9 1.4C21 14.5 12 20 12 20Z"/>\n                <path class="sl-like__fill" d="M12 20S3 14.5 3 8.5a4.6 4.6 0 0 1 9-1.4 4.6 4.6 0 0 1 9 1.4C21 14.5 12 20 12 20Z"/>\n              </svg>\n            </span>\n            <span class="sl-like__label">Like</span>\n          </span>\n        </button>\n  <p class="like-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const E=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-like {
  --like-unit: 1px;
  --like-ink: #222222;
  --like-hover: #2e2e2e;
  --like-active: #3f3f3f;
  --like-text: #fafafa;
  --like-focus: #5a5a5a;
  --like-ease: cubic-bezier(.22,1,.36,1);
  display: block;
  position: relative;
  width: calc(184 * var(--like-unit));
  height: calc(52 * var(--like-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--like-unit));
  appearance: none;
  background: transparent;
  color: var(--like-text);
  font: 550 calc(19 * var(--like-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-like *, .sl-like *::before, .sl-like *::after { box-sizing: border-box; }
.sl-like:disabled, .sl-like[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.sl-like:focus-visible { outline: 2px solid var(--like-focus); outline-offset: 6px; }
.sl-like__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; border-radius: inherit; background-color: var(--like-ink); background-image: linear-gradient(155deg,#ffffff06,transparent 68%); box-shadow: inset 0 1px #ffffff12,0 1px 2px #0000000d; transition: transform 350ms var(--like-ease),background-color 350ms ease,box-shadow 350ms ease; }
@media (hover: hover) {
  .sl-like:not(:disabled):not([aria-disabled="true"]):hover .sl-like__surface { transform: translateY(-2px); background-color: var(--like-hover); box-shadow: inset 0 1px #ffffff17,0 6px 12px -8px #00000047; }
}
.sl-like:not(:disabled):not([aria-disabled="true"]):active .sl-like__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-like__wash { position: absolute; inset: 0; z-index: -1; background: var(--like-active); opacity: 0; transition: opacity 650ms cubic-bezier(.4,0,.2,1); }
.sl-like[aria-pressed="true"] .sl-like__wash { opacity: 1; }
.sl-like__label { display: block; position: relative; white-space: nowrap; }
.sl-like__icon { position: absolute; left: calc(25 * var(--like-unit)); top: 50%; width: calc(23 * var(--like-unit)); height: calc(24 * var(--like-unit)); transform: translateY(-50%); }
.sl-like__heart { display: block; width: 100%; height: 100%; overflow: visible; transform-origin: center; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.sl-like__fill { fill: currentColor; stroke: none; clip-path: inset(100% 0 0 0); transition: clip-path 480ms cubic-bezier(.4,0,.2,1); }
.sl-like[aria-pressed="true"] .sl-like__fill { clip-path: inset(0 0 0 0); }
@media (prefers-reduced-motion: reduce) {
  .sl-like *, .sl-like svg, .sl-like path { transition: none !important; animation: none !important; }
  .sl-like .sl-like__surface, .sl-like:hover .sl-like__surface, .sl-like:active .sl-like__surface { transform: none; }
  .sl-like:active .sl-like__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-like__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }
  .sl-like__wash { display: none; }
  .sl-like:focus-visible { outline-color: Highlight; }
}

.like-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function z(){return(()=>{const o=new WeakMap;function b(e,{feedback:r}={}){if(o.has(e))return o.get(e);if(!e?.querySelector)throw new TypeError("A Like button is required.");const t=e.querySelector(".sl-like__label");const d=e.querySelector(".sl-like__heart");if(!t||!d)throw new TypeError("The Like button needs its label and heart elements.");const f=matchMedia("(prefers-reduced-motion: reduce)");let a=e.getAttribute("aria-pressed")==="true";let u=a?"Liked":"Like";let i;let n;let l=0;let c=false;function h(){l++;i?.cancel();n?.cancel();i=n=null;t.textContent=u;t.style.removeProperty("opacity")}async function x(s,m=1){if(s===u)return;u=s;const p=++l;i?.cancel();if(f.matches||!t.animate){h();return}try{i=t.animate([{opacity:m},{opacity:0}],{duration:180,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await i.finished;if(p!==l||c)return;t.style.opacity="0";i.cancel();t.textContent=s;i=t.animate([{opacity:0},{opacity:1}],{duration:300,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await i.finished;if(p!==l||c)return;t.style.removeProperty("opacity");i.cancel();i=null}catch(k){if(k.name!=="AbortError"&&p===l)h()}}function L(s,m="none"){n?.cancel();if(f.matches||!d.animate)return;const p=s?[{transform:m},{transform:"scale(.9)",offset:.18},{transform:"scale(1.14)",offset:.5},{transform:"scale(.985)",offset:.8},{transform:"scale(1)"}]:[{transform:m},{transform:"scale(.94)",offset:.4},{transform:"scale(1)"}];n=d.animate(p,{duration:s?620:420,easing:"cubic-bezier(.4,0,.2,1)"});const k=n;k.onfinish=()=>{if(n===k)n=null;k.cancel()}}function y(s,m=false){if(c||a===Boolean(s))return;const p=i?getComputedStyle(t).opacity:1;const k=n?getComputedStyle(d).transform:"none";a=Boolean(s);e.setAttribute("aria-pressed",String(a));x(a?"Liked":"Like",p);L(a,k);if(r)r.textContent=a?"Liked. Click again to undo.":"Like removed.";if(m)e.dispatchEvent(new CustomEvent("likechange",{bubbles:true,detail:{pressed:a}}))}function w(){if(!e.disabled&&e.getAttribute("aria-disabled")!=="true")y(!a,true)}function _(){if(f.matches)h()}t.textContent=u;e.disabled=false;e.addEventListener("click",w);f.addEventListener("change",_);const g={setPressed:s=>y(s),reset(){if(c)return;y(false);if(r)r.textContent="Try the button. Your selection stays until you undo it."},destroy(){if(c)return;c=true;h();e.disabled=true;e.removeEventListener("click",w);f.removeEventListener("change",_);o.delete(e)}};o.set(e,g);return g}return{mount:b}})()}function M(o,b={},{preview:e=false}={}){if(!o||typeof o.attachShadow!=="function")throw new TypeError("A DOM host is required");const r=o.shadowRoot||o.attachShadow({mode:"open"});r.innerHTML=S;const t=o.ownerDocument.createElement("style");const d=new URL("./instrument-sans-variable.woff2",import.meta.url).href;t.textContent=E.replaceAll("./instrument-sans-variable.woff2",d)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';r.prepend(t);const f=r.querySelector(".sl-like");if(!f){r.replaceChildren();throw new Error("Missing component root")}const a=C(o.ownerDocument,d);let u,i=false;try{const n=z(),l={};if(v==="upload")l.input=r.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(v))l.feedback=r.querySelector("."+v+"-feedback");if(e&&typeof n.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");u=(e?n.mountPreview:n.mount)(f,{...l,...b});if(typeof u?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(n){a();r.replaceChildren();throw n}return new Proxy(u,{get(n,l){if(l==="destroy")return()=>{if(i)return;i=true;try{n.destroy()}finally{a();r.replaceChildren()}};const c=Reflect.get(n,l,n);return typeof c==="function"?c.bind(n):c}})}export{M as mountInto,v as variant};
