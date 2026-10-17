import{retainFont as S}from"./react-font.mjs";const v="playback";const E='<button class="sl-playback" id="playback-button" type="button" data-playing="false" aria-label="Play" disabled>\n          <span class="sl-playback__surface" aria-hidden="true">\n            <span class="sl-playback__icon">\n              <span class="sl-playback__piece sl-playback__piece--left"></span>\n              <span class="sl-playback__piece sl-playback__piece--right"></span>\n            </span>\n            <span class="sl-playback__label">Play</span>\n          </span>\n        </button>\n  <p class="playback-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const T=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-playback {
  --playback-unit: 1px;
  --playback-ink: #222222;
  --playback-hover: #2e2e2e;
  --playback-active: #3f3f3f;
  --playback-text: #fafafa;
  --playback-focus: #5a5a5a;
  --playback-ease: cubic-bezier(.22, 1, .36, 1);
  box-sizing: border-box;
  display: block;
  position: relative;
  width: calc(184 * var(--playback-unit));
  height: calc(52 * var(--playback-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--playback-unit));
  appearance: none;
  background: transparent;
  color: var(--playback-text);
  font: 550 calc(19 * var(--playback-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-playback *, .sl-playback *::before, .sl-playback *::after { box-sizing: border-box; }
.sl-playback:disabled, .sl-playback[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.sl-playback:focus-visible { outline: 2px solid var(--playback-focus); outline-offset: 6px; }
.sl-playback__surface { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; border-radius: inherit; background: var(--playback-ink); box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d; transition: transform 350ms var(--playback-ease), background-color 350ms ease, box-shadow 350ms ease; }
.sl-playback[data-playing="true"] .sl-playback__surface { background-color: var(--playback-active); }
@media (hover: hover) {
  .sl-playback:not(:disabled):not([aria-disabled="true"]):hover .sl-playback__surface { transform: translateY(-2px); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }
  .sl-playback:not(:disabled):not([aria-disabled="true"]):not([data-playing="true"]):hover .sl-playback__surface { background-color: var(--playback-hover); }
}
.sl-playback:not(:disabled):not([aria-disabled="true"]):active .sl-playback__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-playback__label { position: relative; display: block; text-align: center; white-space: nowrap; }
.sl-playback__icon { position: absolute; left: calc(25 * var(--playback-unit)); top: 50%; width: calc(24 * var(--playback-unit)); height: calc(24 * var(--playback-unit)); transform: translateY(-50%); }
.sl-playback__piece { position: absolute; inset: 0; display: block; background: currentColor; transition: clip-path 420ms cubic-bezier(.4, 0, .2, 1); }
/* Two adjoining pieces form one triangle, then open into pause bars. */
.sl-playback__piece--left { clip-path: polygon(29.1667% 20.8333%, 46% 31.5455%, 46% 68.4545%, 29.1667% 79.1667%); }
.sl-playback__piece--right { clip-path: polygon(45.8333% 31.4394%, 75% 50%, 75% 50%, 45.8333% 68.5606%); }
.sl-playback[data-playing="true"] .sl-playback__piece--left { clip-path: polygon(25% 20.8333%, 41.6667% 20.8333%, 41.6667% 79.1667%, 25% 79.1667%); }
.sl-playback[data-playing="true"] .sl-playback__piece--right { clip-path: polygon(58.3333% 20.8333%, 75% 20.8333%, 75% 79.1667%, 58.3333% 79.1667%); }
@media (prefers-reduced-motion: reduce) {
  .sl-playback * { transition: none !important; animation: none !important; }
  .sl-playback .sl-playback__surface { transform: none !important; }
  .sl-playback:active .sl-playback__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-playback .sl-playback__surface { border: 1px solid ButtonText; background: ButtonFace !important; color: ButtonText; box-shadow: none !important; }
  .sl-playback__piece { forced-color-adjust: none; background: ButtonText; }
  .sl-playback:focus-visible { outline-color: Highlight; }
}

.playback-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function A(){return(()=>{const r=new WeakMap;const g="Try Play, then Pause. This preview does not play media.";function m(a,{feedback:i,onChange:u}={}){if(!a||a.tagName!=="BUTTON")throw new TypeError("A Play / Pause button is required.");if(r.has(a))return r.get(a);const n=a.querySelector(".sl-playback__label");const h=a.querySelector(".sl-playback__icon");if(!n||!h)throw new TypeError("The Play / Pause button needs its label and icon elements.");if(u!==void 0&&typeof u!=="function")throw new TypeError("onChange must be a function.");const s=a.ownerDocument.defaultView;const c=s.matchMedia("(prefers-reduced-motion: reduce)");let e=a.dataset.playing==="true";let l=e?"Pause":"Play";let t=null;let f=0;let p=false;function k(){f++;t?.cancel();t=null;n.textContent=l;n.style.removeProperty("opacity")}async function C(o){if(o===l)return;const d=t?Number(s.getComputedStyle(n).opacity):1;const b=++f;l=o;t?.cancel();t=null;if(c.matches||!n.animate){k();return}n.style.opacity=String(d);try{if(n.textContent!==o){if(d>.001){t=n.animate([{opacity:d},{opacity:0}],{duration:140*d,easing:"cubic-bezier(.4, 0, .2, 1)",fill:"forwards"});await t.finished;if(b!==f||p)return}n.style.opacity="0";t?.cancel();n.textContent=o}const y=Number(n.style.opacity);t=n.animate([{opacity:y},{opacity:1}],{duration:240*(1-y),easing:"cubic-bezier(.4, 0, .2, 1)",fill:"forwards"});await t.finished;if(b!==f||p)return;n.style.removeProperty("opacity");t.cancel();t=null}catch(y){if(y.name!=="AbortError"&&b===f&&!p)k()}}function w(o,d=false){const b=Boolean(o);if(p||b===e)return;e=b;a.dataset.playing=String(e);a.setAttribute("aria-label",e?"Pause":"Play");C(e?"Pause":"Play");if(i)i.textContent=e?"Preview set to playing. Choose Pause to switch back. No media is playing.":"Preview paused. Choose Play to switch back.";if(d){const y={playing:e};a.dispatchEvent(new s.CustomEvent("playbackchange",{bubbles:true,detail:y}));u?.(y)}}function _(){if(!a.disabled&&a.getAttribute("aria-disabled")!=="true")w(!e,true)}function x(){if(c.matches)k()}a.type="button";a.removeAttribute("aria-pressed");a.dataset.playing=String(e);a.setAttribute("aria-label",l);n.textContent=l;a.disabled=false;a.addEventListener("click",_);c.addEventListener("change",x);const P={setPlaying:o=>w(o),reset(){if(p)return;w(false);k();if(i)i.textContent=g},destroy(){if(p)return;p=true;k();a.disabled=true;a.removeEventListener("click",_);c.removeEventListener("change",x);r.delete(a)}};r.set(a,P);return P}return{mount:m}})()}function q(r,g={},{preview:m=false}={}){if(!r||typeof r.attachShadow!=="function")throw new TypeError("A DOM host is required");const a=r.shadowRoot||r.attachShadow({mode:"open"});a.innerHTML=E;const i=r.ownerDocument.createElement("style");const u=new URL("./instrument-sans-variable.woff2",import.meta.url).href;i.textContent=T.replaceAll("./instrument-sans-variable.woff2",u)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';a.prepend(i);const n=a.querySelector(".sl-playback");if(!n){a.replaceChildren();throw new Error("Missing component root")}const h=S(r.ownerDocument,u);let s,c=false;try{const e=A(),l={};if(v==="upload")l.input=a.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(v))l.feedback=a.querySelector("."+v+"-feedback");if(m&&typeof e.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");s=(m?e.mountPreview:e.mount)(n,{...l,...g});if(typeof s?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(e){h();a.replaceChildren();throw e}return new Proxy(s,{get(e,l){if(l==="destroy")return()=>{if(c)return;c=true;try{e.destroy()}finally{h();a.replaceChildren()}};const t=Reflect.get(e,l,e);return typeof t==="function"?t.bind(e):t}})}export{q as mountInto,v as variant};
