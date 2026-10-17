import{retainFont as O}from"./react-font.mjs";const F="upload";const H='<button class="sl-upload" id="upload-button" type="button" aria-label="Upload file" data-upload-state="idle" disabled>\n          <span class="sl-upload__surface" aria-hidden="true">\n            <span class="sl-upload__wash"></span>\n            <span class="sl-upload__icon">\n              <svg viewBox="0 0 24 24" fill="none" focusable="false">\n                <path class="sl-upload__arrow" d="M12 15.5V4m-4 4 4-4 4 4"/>\n                <path class="sl-upload__tray" d="M4.5 16.5v4h15v-4"/>\n                <path class="sl-upload__progress" d="M4.5 20.5h15"/>\n                <path class="sl-upload__check" d="m4 12.5 5 5L20 6.5" pathLength="1"/>\n              </svg>\n            </span>\n            <span class="sl-upload__label">Upload</span>\n          </span>\n        </button>\n  <input id="upload-input" type="file" hidden aria-label="Choose a file">\n  <p class="upload-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const V=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-upload {
  --upload-unit: 1px;
  --upload-ink: #222222;
  --upload-hover: #2e2e2e;
  --upload-active: #3f3f3f;
  --upload-text: #fafafa;
  --upload-focus: #5a5a5a;
  --upload-ease: cubic-bezier(.22,1,.36,1);
  display: block;
  position: relative;
  width: calc(224 * var(--upload-unit));
  height: calc(52 * var(--upload-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--upload-unit));
  appearance: none;
  background: transparent;
  color: var(--upload-text);
  font: 550 calc(19 * var(--upload-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-upload *, .sl-upload *::before, .sl-upload *::after { box-sizing: border-box; }
.sl-upload:disabled { opacity: .5; cursor: not-allowed; }
.sl-upload[aria-disabled="true"] { cursor: wait; }
.sl-upload:focus-visible { outline: 2px solid var(--upload-focus); outline-offset: 6px; }
.sl-upload__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; isolation: isolate; border-radius: inherit; background: var(--upload-ink); box-shadow: inset 0 1px #ffffff12,0 1px 2px #0000000d; transition: transform 350ms var(--upload-ease),background-color 350ms ease,box-shadow 350ms ease; }
@media (hover: hover) {
  .sl-upload:not(:disabled):not([aria-disabled="true"]):hover .sl-upload__surface { transform: translateY(-2px); background: var(--upload-hover); box-shadow: inset 0 1px #ffffff17,0 6px 12px -8px #00000047; }
}
.sl-upload:not(:disabled):not([aria-disabled="true"]):active .sl-upload__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-upload__wash { position: absolute; inset: 0; z-index: -1; background: var(--upload-active); opacity: 0; transition: opacity 550ms cubic-bezier(.4,0,.2,1); }
.sl-upload[data-upload-state="complete"] .sl-upload__wash { opacity: 1; }
.sl-upload__label { display: block; position: relative; white-space: nowrap; }
.sl-upload__icon { position: absolute; left: calc(24 * var(--upload-unit)); top: 50%; width: calc(24 * var(--upload-unit)); height: calc(24 * var(--upload-unit)); transform: translateY(-50%); }
.sl-upload__icon svg { display: block; width: 100%; height: 100%; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
.sl-upload__arrow { transform-box: view-box; transform-origin: 12px 12px; transition: transform 500ms cubic-bezier(.32,0,.16,1) 180ms,opacity 280ms ease 180ms; }
.sl-upload__tray { transform-box: view-box; transform-origin: 12px 20px; transition: transform 480ms var(--upload-ease),opacity 260ms ease; }
.sl-upload__progress { transform-box: view-box; transform-origin: 4.5px 20.5px; transform: scaleX(var(--upload-progress,0)); opacity: 0; transition: transform 180ms ease,opacity 180ms ease; }
.sl-upload__check { transform-box: view-box; transform-origin: 12px 12px; transform: translateY(3px) scale(.85); opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: transform 500ms var(--upload-ease),opacity 180ms ease,stroke-dashoffset 400ms ease; }
.sl-upload[data-upload-icon="pending"] .sl-upload__arrow,
.sl-upload[data-upload-icon="complete"] .sl-upload__arrow { transform: translateY(-8px) scale(.82); opacity: 0; transition-delay: 0ms,100ms; }
.sl-upload[data-upload-state="pending"][data-upload-progress] .sl-upload__tray { opacity: .35; }
.sl-upload[data-upload-state="pending"][data-upload-progress] .sl-upload__progress { opacity: 1; }
.sl-upload[data-upload-icon="complete"] .sl-upload__tray { transform: translateY(-3px) scaleX(.35); opacity: 0; }
.sl-upload[data-upload-icon="complete"] .sl-upload__check { transform: translateY(0) scale(1); opacity: 1; stroke-dashoffset: 0; transition-delay: 140ms,140ms,140ms; }
.sl-upload[data-upload-static] .sl-upload__icon * { transition: none !important; }
@media (prefers-reduced-motion: reduce) {
  .sl-upload *, .sl-upload svg, .sl-upload path { transition: none !important; animation: none !important; }
  .sl-upload .sl-upload__surface, .sl-upload:hover .sl-upload__surface, .sl-upload:active .sl-upload__surface { transform: none; }
  .sl-upload:active .sl-upload__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-upload__surface { border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; }
  .sl-upload__wash { display: none; }
  .sl-upload:focus-visible { outline-color: Highlight; }
}

.upload-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function X(){return(()=>{const u=new WeakMap;function A(a,{input:o,onUpload:c,feedback:n}={}){if(u.has(a))return u.get(a);if(a?.tagName!=="BUTTON"||o?.tagName!=="INPUT"||o.type!=="file")throw new TypeError("Upload needs a button and a file input.");if(c!==void 0&&typeof c!=="function")throw new TypeError("onUpload must be a function.");const d=a.querySelector(".sl-upload__label");if(!d||!a.querySelector(".sl-upload__icon"))throw new TypeError("The Upload button needs its label and icon.");const m=matchMedia("(prefers-reduced-motion: reduce)");const w=n?.textContent||(c?"Choose a file to upload.":"Choose a file. Its contents stay on your device.");let l="idle",t=0,p=0;let r=false,h=false,v=false;let g,f,S,q;let k="Upload";function b(e){l=e;a.dataset.uploadState=e;a.setAttribute("aria-label",e==="complete"?"Complete. Choose another file":e==="pending"?"Uploading file":"Upload file");a.setAttribute("aria-busy",String(e==="pending"));if(e==="pending")a.setAttribute("aria-disabled","true");else a.removeAttribute("aria-disabled")}function y(e,s=false){a.toggleAttribute("data-upload-static",s);a.dataset.uploadIcon=e}function _(e=k){p++;f?.cancel();f=null;d.textContent=k=e;d.style.removeProperty("opacity")}async function T(e){if(e===k)return;const s=f?getComputedStyle(d).opacity:1;const i=++p;k=e;f?.cancel();if(m.matches||!d.animate){_();return}try{f=d.animate([{opacity:s},{opacity:0}],{duration:160,easing:"ease",fill:"forwards"});await f.finished;if(i!==p||r)return;d.style.opacity="0";f.cancel();d.textContent=e;f=d.animate([{opacity:0},{opacity:1}],{duration:280,easing:"ease",fill:"forwards"});await f.finished;if(i===p&&!r)_()}catch(I){if(I.name!=="AbortError"&&i===p)_()}}function N(){clearTimeout(S);clearTimeout(q)}function E(){a.removeAttribute("data-upload-progress");a.style.removeProperty("--upload-progress")}function D(e){const s=o.accept.toLowerCase().split(",").map(i=>i.trim()).filter(Boolean);return!s.length||s.some(i=>i.startsWith(".")?e.name.toLowerCase().endsWith(i):i.endsWith("/*")?e.type.toLowerCase().startsWith(i.slice(0,-1)):e.type.toLowerCase()===i)}function M(e,s){b(e?.name==="AbortError"?"idle":"error");y("idle");T("Upload");if(n)n.textContent=s;a.dispatchEvent(new CustomEvent("uploaderror",{bubbles:true,detail:{error:e}}))}async function Y(e){if(r||a.disabled||l==="pending"||a.getAttribute("aria-disabled")==="true")return false;if(h)return false;N();E();const s=++t;const i=o.ownerDocument.defaultView?.File||File;if(!(e instanceof i)||!D(e)){M(new TypeError("Unsupported file selection."),"Choose a file of an allowed type and try again.");return false}const I=performance.now();g=new AbortController;let L=0,W=-1;b("pending");y("pending");T("Uploading");if(n)n.textContent=c?`Uploading ${e.name}…`:`Selecting ${e.name}…`;try{if(c)await c(e,{signal:g.signal,onProgress(C){if(r||s!==t||l!=="pending"||!Number.isFinite(C))return;L=Math.max(L,Math.min(1,Math.max(0,C)));a.setAttribute("data-upload-progress","");a.style.setProperty("--upload-progress",String(L));const B=Math.floor(L*10)*10;if(n&&B!==W){n.textContent=`Uploading ${e.name}. ${B}%.`;W=B}}});if(r||s!==t)return false;g=null;b("complete");if(n)n.textContent=c?`${e.name}: upload complete.`:`${e.name} selected. This demo does not read or upload your file.`;S=setTimeout(()=>{if(r||s!==t)return;y("complete");T("Complete")},m.matches?0:Math.max(0,420-(performance.now()-I)));q=setTimeout(()=>{if(r||s!==t)return;b("idle");y("idle");T("Upload");E()},2400);a.dispatchEvent(new CustomEvent("uploadcomplete",{bubbles:true,detail:{file:e,uploaded:Boolean(c)}}));return true}catch(C){if(r||s!==t)return false;g=null;E();M(C,C?.name==="AbortError"?"Upload canceled. Choose a file to try again.":"The upload could not complete. Choose the file to try again.");return false}}function U(){if(r||h||a.disabled||o.disabled||l==="pending"||a.getAttribute("aria-disabled")==="true")return false;h=true;o.value="";try{o.click();return true}catch(e){h=false;x();M(e,"The file chooser could not open. Try again.");return false}}function z(){const e=o.files?.[0];h=false;o.value="";if(v){v=false;return}if(e)void Y(e);else P()}function P(){h=false;if(v){v=false;return}if(l==="pending")return;x();if(n)n.textContent="No file selected. Nothing was uploaded."}function $(){if(!m.matches)return;clearTimeout(S);y(l==="complete"?"complete":l==="pending"?"pending":"idle");_(l==="complete"?"Complete":l==="pending"?"Uploading":"Upload")}function x(){if(r)return;t++;g?.abort();g=null;if(h)v=true;o.value="";N();E();b("idle");y("idle",true);_("Upload");if(n)n.textContent=w}x();a.disabled=false;a.addEventListener("click",U);o.addEventListener("change",z);o.addEventListener("cancel",P);m.addEventListener("change",$);const R={chooseFile:U,select:Y,reset:x,get state(){return l},destroy(){if(r)return;x();r=true;a.disabled=true;a.removeEventListener("click",U);o.removeEventListener("change",z);o.removeEventListener("cancel",P);m.removeEventListener("change",$);u.delete(a)}};u.set(a,R);return R}return{mount:A}})()}function G(u,A={},{preview:a=false}={}){if(!u||typeof u.attachShadow!=="function")throw new TypeError("A DOM host is required");const o=u.shadowRoot||u.attachShadow({mode:"open"});o.innerHTML=H;const c=u.ownerDocument.createElement("style");const n=new URL("./instrument-sans-variable.woff2",import.meta.url).href;c.textContent=V.replaceAll("./instrument-sans-variable.woff2",n)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';o.prepend(c);const d=o.querySelector(".sl-upload");if(!d){o.replaceChildren();throw new Error("Missing component root")}const m=O(u.ownerDocument,n);let w,l=false;try{const t=X(),p={};if(F==="upload")p.input=o.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(F))p.feedback=o.querySelector("."+F+"-feedback");if(a&&typeof t.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");w=(a?t.mountPreview:t.mount)(d,{...p,...A});if(typeof w?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(t){m();o.replaceChildren();throw t}return new Proxy(w,{get(t,p){if(p==="destroy")return()=>{if(l)return;l=true;try{t.destroy()}finally{m();o.replaceChildren()}};const r=Reflect.get(t,p,t);return typeof r==="function"?r.bind(t):r}})}export{G as mountInto,F as variant};
