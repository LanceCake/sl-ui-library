import{retainFont as E}from"./react-font.mjs";const y="follow";const S='<button class="sl-follow" id="follow-button" type="button" aria-label="Follow" aria-pressed="false" disabled>\n          <span class="sl-follow__surface" aria-hidden="true">\n            <span class="sl-follow__wash"></span>\n            <span class="sl-follow__icon">\n              <svg class="sl-follow__person" viewBox="0 0 28 24" fill="none" focusable="false"><circle cx="8" cy="7" r="3"/><path d="M2 20v-1a6 6 0 0 1 12 0v1"/></svg>\n              <span class="sl-follow__mark"><span class="sl-follow__mark-short"></span><span class="sl-follow__mark-long"></span></span>\n            </span>\n            <span class="sl-follow__label">Follow</span>\n          </span>\n        </button>\n  <p class="follow-feedback" role="status" aria-live="polite" aria-atomic="true"></p>';const A=`@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-follow {
  --follow-unit: 1px;
  --follow-ink: #222222;
  --follow-hover: #2e2e2e;
  --follow-active: #3f3f3f;
  --follow-text: #fafafa;
  --follow-focus: #5a5a5a;
  --follow-ease: cubic-bezier(.4, 0, .2, 1);
  display: block;
  position: relative;
  flex: none;
  width: calc(236 * var(--follow-unit));
  height: calc(52 * var(--follow-unit));
  padding: 0;
  border: 0;
  border-radius: calc(13 * var(--follow-unit));
  appearance: none;
  background: transparent;
  color: var(--follow-text);
  font: 550 calc(19 * var(--follow-unit))/1.1 'Instrument Sans', sans-serif;
  letter-spacing: -.02em;
  text-align: center;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.sl-follow *, .sl-follow *::before, .sl-follow *::after { box-sizing: border-box; }
.sl-follow:disabled, .sl-follow[aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
.sl-follow:focus-visible { outline: 2px solid var(--follow-focus); outline-offset: 6px; }
.sl-follow .sl-follow__surface {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
  border-radius: inherit;
  background: var(--follow-ink);
  box-shadow: inset 0 1px #ffffff12, 0 1px 2px #0000000d;
  transition: transform 350ms cubic-bezier(.22, 1, .36, 1), background-color 350ms ease, box-shadow 350ms ease;
}
@media (hover: hover) and (forced-colors: none) {
  .sl-follow:not(:disabled):not([aria-disabled="true"]):hover .sl-follow__surface { transform: translateY(-2px); background-color: var(--follow-hover); box-shadow: inset 0 1px #ffffff17, 0 6px 12px -8px #00000047; }
}
.sl-follow:not(:disabled):not([aria-disabled="true"]):active .sl-follow__surface { transform: translateY(1px) scale(.98); transition-duration: 120ms; }
.sl-follow .sl-follow__wash { position: absolute; inset: 0; z-index: -1; background: var(--follow-active); opacity: 0; transition: opacity 480ms var(--follow-ease); }
.sl-follow[aria-pressed="true"] .sl-follow__wash { opacity: 1; }
.sl-follow .sl-follow__label { position: absolute; inset: 0 calc(56 * var(--follow-unit)); display: grid; place-items: center; text-align: center; white-space: nowrap; }
.sl-follow .sl-follow__icon { position: absolute; left: calc(18 * var(--follow-unit)); top: 50%; width: calc(28 * var(--follow-unit)); height: calc(24 * var(--follow-unit)); transform: translateY(-50%); }
.sl-follow .sl-follow__person { display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.sl-follow .sl-follow__mark { position: absolute; left: calc(18 * var(--follow-unit)); top: calc(11 * var(--follow-unit)); width: calc(8 * var(--follow-unit)); height: calc(8 * var(--follow-unit)); }
.sl-follow .sl-follow__mark-short, .sl-follow .sl-follow__mark-long {
  position: absolute;
  left: 0;
  top: calc(3.1 * var(--follow-unit));
  width: calc(8 * var(--follow-unit));
  height: calc(1.8 * var(--follow-unit));
  border-radius: calc(.9 * var(--follow-unit));
  background: currentColor;
  transform-origin: center;
  transition: transform 480ms var(--follow-ease);
}
.sl-follow .sl-follow__mark-short { transform: translate(0, 0) rotate(0) scaleX(1); }
.sl-follow .sl-follow__mark-long { transform: translate(0, 0) rotate(90deg) scaleX(1); }
.sl-follow[aria-pressed="true"] .sl-follow__mark-short { transform: translate(calc(-1 * var(--follow-unit)), calc(1.3 * var(--follow-unit))) rotate(45deg) scaleX(.58); }
.sl-follow[aria-pressed="true"] .sl-follow__mark-long { transform: translate(calc(2.65 * var(--follow-unit)), calc(-.2 * var(--follow-unit))) rotate(-48deg) scaleX(1.07); }
@media (prefers-reduced-motion: reduce) {
  .sl-follow *, .sl-follow *::before, .sl-follow *::after { transition: none !important; animation: none !important; }
  .sl-follow .sl-follow__surface { transform: none !important; }
  .sl-follow:active .sl-follow__surface { opacity: .9; }
}
@media (forced-colors: active) {
  .sl-follow .sl-follow__surface { forced-color-adjust: none; border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; box-shadow: none; }
  .sl-follow[aria-pressed="true"] .sl-follow__surface { background: Highlight; color: HighlightText; border-color: Highlight; }
  .sl-follow .sl-follow__wash { display: none; }
  .sl-follow:focus-visible { outline-color: Highlight; }
}

.follow-feedback{margin:0;color:#545454;font-size:12px;line-height:1.5;text-align:center}`;function T(){return(()=>{const a=new WeakMap;const g="Try the button. Click again to unfollow.";function m(o,{feedback:i,onChange:w}={}){if(a.has(o))return a.get(o);if(o?.tagName!=="BUTTON")throw new TypeError("A native Follow button is required.");if(w!=null&&typeof w!=="function")throw new TypeError("onChange must be a function.");const e=o.querySelector(".sl-follow__label");const h=o.querySelector(".sl-follow__mark");if(!e||!h)throw new TypeError("The Follow button needs its label and mark elements.");const f=o.ownerDocument.defaultView;const c=f.matchMedia("(prefers-reduced-motion: reduce)");let l=o.getAttribute("aria-pressed")==="true";let t=l?"Following":"Follow";let n=null;let d=0;let u=false;function p(){d++;n?.cancel();n=null;e.textContent=t;e.style.removeProperty("opacity")}async function F(r){if(r===t)return;const b=n?f.getComputedStyle(e).opacity:"1";t=r;const s=++d;e.style.opacity=b;n?.cancel();if(c.matches||!e.animate){p();return}try{if(e.textContent!==r){n=e.animate([{opacity:b},{opacity:0}],{duration:180,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await n.finished;if(s!==d||u)return;e.style.opacity="0";n.cancel();e.textContent=r}n=e.animate([{opacity:e.style.opacity},{opacity:1}],{duration:300,easing:"cubic-bezier(.4,0,.2,1)",fill:"forwards"});await n.finished;if(s!==d||u)return;e.style.removeProperty("opacity");n.cancel();n=null}catch(C){if(C.name!=="AbortError"&&s===d)p()}}function v(r,b=false){const s=Boolean(r);if(u||l===s)return;l=s;o.setAttribute("aria-pressed",String(l));F(l?"Following":"Follow");if(i)i.textContent=l?"Following in this preview. Click again to unfollow.":"No longer following in this preview.";if(b){o.dispatchEvent(new f.CustomEvent("followchange",{bubbles:true,detail:{following:s}}));w?.(s)}}function _(){if(!o.disabled&&o.getAttribute("aria-disabled")!=="true")v(!l,true)}function k(){if(c.matches)p()}o.type="button";if(!o.hasAttribute("aria-label")&&!o.hasAttribute("aria-labelledby"))o.setAttribute("aria-label","Follow");o.setAttribute("aria-pressed",String(l));e.textContent=t;o.disabled=false;o.addEventListener("click",_);c.addEventListener("change",k);const x={setFollowing:r=>v(r),reset(){if(u)return;l=false;t="Follow";o.setAttribute("aria-pressed","false");p();if(i)i.textContent=g},destroy(){if(u)return;u=true;p();o.disabled=true;o.removeEventListener("click",_);c.removeEventListener("change",k);a.delete(o)}};a.set(o,x);return x}return{mount:m}})()}function M(a,g={},{preview:m=false}={}){if(!a||typeof a.attachShadow!=="function")throw new TypeError("A DOM host is required");const o=a.shadowRoot||a.attachShadow({mode:"open"});o.innerHTML=S;const i=a.ownerDocument.createElement("style");const w=new URL("./instrument-sans-variable.woff2",import.meta.url).href;i.textContent=A.replaceAll("./instrument-sans-variable.woff2",w)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';o.prepend(i);const e=o.querySelector(".sl-follow");if(!e){o.replaceChildren();throw new Error("Missing component root")}const h=E(a.ownerDocument,w);let f,c=false;try{const l=T(),t={};if(y==="upload")t.input=o.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(y))t.feedback=o.querySelector("."+y+"-feedback");if(m&&typeof l.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");f=(m?l.mountPreview:l.mount)(e,{...t,...g});if(typeof f?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(l){h();o.replaceChildren();throw l}return new Proxy(f,{get(l,t){if(t==="destroy")return()=>{if(c)return;c=true;try{l.destroy()}finally{h();o.replaceChildren()}};const n=Reflect.get(l,t,l);return typeof n==="function"?n.bind(l):n}})}export{M as mountInto,y as variant};
