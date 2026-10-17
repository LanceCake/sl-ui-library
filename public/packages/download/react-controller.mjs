import{retainFont as F}from"./react-font.mjs";const M="download";const Y='<button class="sl-download" id="download-button" type="button" aria-label="Download file" data-download-state="idle" disabled>\n          <span class="sl-download__surface" aria-hidden="true">\n            <span class="sl-download__wash"></span>\n            <span class="sl-download__icon">\n              <svg viewBox="0 0 24 24" fill="none" focusable="false">\n                <path class="sl-download__arrow" d="M12 3.5v10m-3.5-3.5 3.5 3.5 3.5-3.5"/>\n                <g class="sl-download__tray">\n                  <path class="sl-download__tray-left" d="M4.5 20.5H9"/>\n                  <path class="sl-download__tray-right" d="M9 20.5H19.5"/>\n                  <path class="sl-download__rim-left" d="M4.5 16.5v4"/>\n                  <path class="sl-download__rim-right" d="M19.5 20.5v-4"/>\n                </g>\n              </svg>\n            </span>\n            <span class="sl-download__label">Download</span>\n          </span>\n        </button>\n  <p class="download-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const H=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-download {
  --download-unit: 1px;
  --download-ink: #222222;
  --download-hover: #2e2e2e;
  --download-active: #3f3f3f;
  --download-text: #fafafa;
  --download-focus: #5a5a5a;
  --download-ease: cubic-bezier(.22,1,.36,1);
  display: block;
  position: relative;
  width: calc(208 * var(--download-unit));
  height: calc(52 * var(--download-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--download-unit));
  appearance: none;
  background: transparent;
  color: var(--download-text);
  font: 550 calc(19 * var(--download-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-download *, .sl-download *::before, .sl-download *::after { box-sizing: border-box; }
.sl-download:disabled { opacity: .5; cursor: not-allowed; }
.sl-download[aria-disabled="true"] { cursor: wait; }
.sl-download:focus-visible { outline: 2px solid var(--download-focus); outline-offset: 6px; }
.sl-download__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; border-radius: inherit; background: var(--download-ink); box-shadow: inset 0 1px #ffffff12,0 1px 2px #0000000d; transition: transform 350ms var(--download-ease),background-color 350ms ease,box-shadow 350ms ease; }
@media (hover: hover) {
  .sl-download:not(:disabled):not([aria-disabled="true"]):hover .sl-download__surface { transform: translateY(-2px); background: var(--download-hover); box-shadow: inset 0 1px #ffffff17,0 6px 12px -8px #00000047; }
}
.sl-download:not(:disabled):not([aria-disabled="true"]):active .sl-download__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-download__wash { position: absolute; inset: 0; z-index: -1; background: var(--download-active); opacity: 0; transition: opacity 550ms cubic-bezier(.4,0,.2,1); }
.sl-download[data-download-state="ready"] .sl-download__wash { opacity: 1; }
.sl-download__label { display: block; position: relative; white-space: nowrap; }
.sl-download__icon { position: absolute; left: calc(23 * var(--download-unit)); top: 50%; width: calc(23 * var(--download-unit)); height: calc(24 * var(--download-unit)); transform: translateY(-50%); }
.sl-download__icon svg { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.sl-download__arrow { transform-box: view-box; transform-origin: 12px 17px; transition: transform 420ms cubic-bezier(.32,0,.16,1) 180ms,opacity 220ms ease 220ms; }
.sl-download__tray { transform-box: view-box; transform-origin: 12px 17px; transform: translate(0,0) scale(1); transition: transform 520ms cubic-bezier(.22,1,.36,1); }
.sl-download__tray-left, .sl-download__tray-right { transform-box: view-box; transform-origin: 9px 20.5px; transition: transform 520ms cubic-bezier(.22,1,.36,1); }
.sl-download__rim-left, .sl-download__rim-right { transform-box: view-box; transition: transform 260ms ease,opacity 180ms ease; }
.sl-download__rim-left { transform-origin: 4.5px 20.5px; }
.sl-download__rim-right { transform-origin: 19.5px 20.5px; }
.sl-download[data-download-icon="pending"] .sl-download__arrow,
.sl-download[data-download-icon="ready"] .sl-download__arrow { transform: translateY(3.5px) scale(.18); opacity: 0; transition-delay: 0ms,130ms; }
.sl-download[data-download-icon="ready"] .sl-download__tray { transform: translate(1.5px,-4.7px) scale(1.5); transition-delay: 60ms; }
.sl-download[data-download-icon="ready"] .sl-download__tray-left { transform: rotate(45deg); transition-delay: 60ms; }
.sl-download[data-download-icon="ready"] .sl-download__tray-right { transform: rotate(-45deg); transition-delay: 60ms; }
.sl-download[data-download-icon="ready"] .sl-download__rim-left,
.sl-download[data-download-icon="ready"] .sl-download__rim-right { transform: scaleY(.15); opacity: 0; }
.sl-download[data-download-static] .sl-download__icon * { transition: none !important; }
@media (prefers-reduced-motion: reduce) {
  .sl-download *, .sl-download svg, .sl-download path { transition: none !important; animation: none !important; }
  .sl-download .sl-download__surface, .sl-download:hover .sl-download__surface, .sl-download:active .sl-download__surface { transform: none; }
  .sl-download:active .sl-download__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-download__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }
  .sl-download__wash { display: none; }
  .sl-download:focus-visible { outline-color: Highlight; }
}

.download-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function O(){return(()=>{const l=new WeakMap;function S(o,{getFile:d,handoff:f,feedback:i,messages:b={},filename:g="download.txt",idleMessage:v="Choose Download to get the file."}={}){if(l.has(o))return l.get(o);if(o?.tagName!=="BUTTON")throw new TypeError("A Download button is required.");if(typeof d!=="function")throw new TypeError("Download needs a getFile callback.");if(f!==void 0&&typeof f!=="function")throw new TypeError("handoff must be a function.");const a=o.querySelector(".sl-download__label");const t=o.querySelector(".sl-download__arrow");const u=o.querySelector(".sl-download__tray");if(!a||!t||!u)throw new TypeError("The Download button needs its label, arrow, and tray.");const c=matchMedia("(prefers-reduced-motion: reduce)");let m="idle";let p=0;let x=0;let r=false;let y;let w;let D;let B;let C="Download";function k(n){m=n;o.dataset.downloadState=n;o.setAttribute("aria-busy",String(n==="pending"));if(n==="pending")o.setAttribute("aria-disabled","true");else o.removeAttribute("aria-disabled")}function T(n=C){x++;w?.cancel();w=null;a.textContent=C=n;a.style.removeProperty("opacity")}async function E(n){if(n===C)return;const h=w?getComputedStyle(a).opacity:1;const e=++x;C=n;w?.cancel();if(c.matches||!a.animate){T();return}try{w=a.animate([{opacity:h},{opacity:0}],{duration:160,easing:"ease",fill:"forwards"});await w.finished;if(e!==x||r)return;a.style.opacity="0";w.cancel();a.textContent=n;w=a.animate([{opacity:0},{opacity:1}],{duration:280,easing:"ease",fill:"forwards"});await w.finished;if(e===x&&!r)T()}catch(s){if(s.name!=="AbortError"&&e===x)T()}}function _(n,h=false){o.toggleAttribute("data-download-static",h);o.dataset.downloadIcon=n}function q(){clearTimeout(D);clearTimeout(B)}function P(n,h){const e=URL.createObjectURL(n);const s=o.ownerDocument.createElement("a");s.href=e;s.download=h;s.hidden=true;try{o.ownerDocument.body.append(s);s.click()}finally{s.remove();setTimeout(()=>URL.revokeObjectURL(e),1e3)}}async function R(){if(r||o.disabled||m==="pending"||o.getAttribute("aria-disabled")==="true")return false;const n=++p;const h=performance.now();y=new AbortController;q();k("pending");E("Download");_("pending");if(i)i.textContent=b?.pending??"Preparing file…";try{const e=await d({signal:y.signal});if(r||n!==p)return false;const s=e instanceof Blob?e:e?.blob;const A=e instanceof Blob?g:e?.filename||g;if(f){await f(e,{signal:y.signal,filename:String(A)});if(r||n!==p)return false}else{if(!(s instanceof Blob))throw new TypeError("getFile must return a Blob or { blob, filename }.");P(s,String(A));if(r||n!==p)return true}y=null;k("ready");if(i)i.textContent=b?.complete??"Download started.";D=setTimeout(()=>{if(n!==p||r)return;_("ready");E("Complete")},c.matches?0:Math.max(0,380-(performance.now()-h)));B=setTimeout(()=>{if(n!==p||r)return;k("idle");_("idle");E("Download")},2200);o.dispatchEvent(new CustomEvent(f?"downloadhandoff":"downloadstart",{bubbles:true,detail:{filename:String(A)}}));return true}catch(e){if(r||n!==p)return false;y=null;k("error");_("idle");E("Try again");if(i)i.textContent=b?.error??"The download could not start. Try again.";o.dispatchEvent(new CustomEvent("downloaderror",{bubbles:true,detail:{error:e}}));return false}}function z(){void R()}function I(){if(!c.matches)return;clearTimeout(D);_(m==="ready"?"ready":m==="pending"?"pending":"idle");T(m==="ready"?"Complete":m==="error"?"Try again":"Download")}function L(){if(r)return;p++;y?.abort();y=null;q();_("idle",true);T("Download");k("idle");if(i)i.textContent=v}L();o.disabled=false;o.addEventListener("click",z);c.addEventListener("change",I);const U={start:R,reset:L,get state(){return m},destroy(){if(r)return;L();r=true;o.disabled=true;o.removeEventListener("click",z);c.removeEventListener("change",I);l.delete(o)}};l.set(o,U);return U}return{mount:S}})()}function N(l,S={},{preview:o=false}={}){if(!l||typeof l.attachShadow!=="function")throw new TypeError("A DOM host is required");const d=l.shadowRoot||l.attachShadow({mode:"open"});d.innerHTML=Y;const f=l.ownerDocument.createElement("style");const i=new URL("./instrument-sans-variable.woff2",import.meta.url).href;f.textContent=H.replaceAll("./instrument-sans-variable.woff2",i)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';d.prepend(f);const b=d.querySelector(".sl-download");if(!b){d.replaceChildren();throw new Error("Missing component root")}const g=F(l.ownerDocument,i);let v,a=false;try{const t=O(),u={};if(M==="upload")u.input=d.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(M))u.feedback=d.querySelector("."+M+"-feedback");if(o&&typeof t.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");v=(o?t.mountPreview:t.mount)(b,{...u,...S});if(typeof v?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(t){g();d.replaceChildren();throw t}return new Proxy(v,{get(t,u){if(u==="destroy")return()=>{if(a)return;a=true;try{t.destroy()}finally{g();d.replaceChildren()}};const c=Reflect.get(t,u,t);return typeof c==="function"?c.bind(t):c}})}export{N as mountInto,M as variant};
