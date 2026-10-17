import{retainFont as V}from"./react-font.mjs";const R="buttons-shuffle-choice-v11";const X='<section class="sl-component" data-kind="buttons-shuffle-choice" data-phase="idle" aria-label="Shuffle and undo" aria-busy="false">\n    <p class="ab-eyebrow">Creative prompt</p>\n    <h2>Pick a starting point</h2>\n    <p class="ab-description">Try another direction for this draft.</p>\n    <div class="ab-suggestion"><span class="ab-value" data-number>01 / 04</span><strong data-choice>Quiet geometry</strong><svg viewBox="0 0 120 30" aria-hidden="true" focusable="false"><path d="M2 24 23 7l23 17L70 7l23 17 25-17"/></svg></div>\n<div class="ab-actions"><button type="button" class="ab-primary" data-shuffle><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 6h3c4 0 8 12 12 12h3M17 14l4 4-4 4M3 18h3c1.5 0 3-1.6 4.4-3.7M13.5 9.5C15 7.4 16.5 6 18 6h3M17 2l4 4-4 4"/></svg>Shuffle</button><button type="button" class="ab-quiet" data-undo disabled><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 10h10a6 6 0 0 1 0 12M4 10l5-5M4 10l5 5"/></svg>Undo</button></div>\n    <p class="ab-status" data-status role="status" aria-live="polite" aria-atomic="true">A local suggestion, ready to explore.</p>\n    <p class="ab-note" data-note>Local selection · no content is generated.</p>\n  </section>';const G=`/* Palette tokens may be overridden on this component alone. */
@font-face { font-family: 'Instrument Sans'; src: url('./instrument-sans-variable.woff2') format('woff2'); font-weight: 400 700; font-style: normal; font-display: swap; }
.sl-component {
  --action-ink: #222222; --action-surface: #2f2f2f; --action-hover: #3c3c3c;
  --action-text: #f6f6f6; --action-muted: #bdbdbd; --action-accent: #e0e0e0;
  --action-on-accent: #2a2a2a; --action-danger: #efb8a6; --action-border: #505050;
  --action-focus: #e0e0e0; --action-track: #5e5e5e;
  width: 320px; max-width: 100%; min-width: 0; padding: 20px; position: relative;
  color: var(--action-text); background: var(--action-ink); border: 1px solid var(--action-surface);
  border-radius: 16px; box-shadow: inset 0 1px 0 #ffffff08, 0 3px 7px #00000010;
  font: 14px/1.45 'Instrument Sans', sans-serif; font-synthesis: none; -webkit-font-smoothing: antialiased;
}
.sl-component, .sl-component *, .sl-component *::before, .sl-component *::after { box-sizing: border-box; }
.sl-component [hidden] { display: none !important; }
.sl-component h2, .sl-component p { margin: 0; }
.sl-component h2 { font-size: 15px; line-height: 1.4; font-weight: 550; letter-spacing: -.02em; }
.sl-component .ab-eyebrow { color: var(--action-muted); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; }
.sl-component .ab-description { margin-top: 5px; color: var(--action-muted); font-size: 12px; }
.sl-component .ab-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 20px; }
.sl-component button { appearance: none; font: inherit; font-size: 12px; line-height: 1.35; font-weight: 550; border: 1px solid var(--action-border); border-radius: 10px; padding: 11px 13px; min-height: 42px; background: var(--action-surface); color: var(--action-text); display: inline-flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; touch-action: manipulation; position: relative; transition: background-color 180ms ease, color 180ms ease, transform 240ms cubic-bezier(.2,0,0,1), border-color 180ms ease; -webkit-tap-highlight-color: transparent; }
.sl-component button.ab-primary { background: var(--action-accent); color: var(--action-on-accent); border-color: transparent; }
.sl-component button.ab-quiet { background: transparent; }
.sl-component button.ab-danger { color: var(--action-danger); }
.sl-component button.ab-wide { width: 100%; }
.sl-component button.ab-icon { width: 42px; padding: 10px; flex: 0 0 42px; }
.sl-component button:focus-visible { outline: 2px solid var(--action-focus); outline-offset: 3px; }
.sl-component button:disabled, .sl-component button[aria-disabled="true"] { opacity: .55; cursor: default; transform: none; }
@media (hover: hover) {
  .sl-component button:hover:not(:disabled):not([aria-disabled="true"]) { background: var(--action-hover); transform: translateY(-1px); }
  .sl-component button.ab-primary:hover:not(:disabled):not([aria-disabled="true"]) { background: var(--action-accent); filter: brightness(1.04); }
}
.sl-component button:active:not(:disabled):not([aria-disabled="true"]) { transform: translateY(1px) scale(.98); transition-duration: 90ms; }
.sl-component svg { width: 20px; height: 20px; flex: 0 0 auto; display: block; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.sl-component .ab-status { color: var(--action-muted); font-size: 12px; min-height: 36px; margin-top: 16px; overflow-wrap: anywhere; }
.sl-component[data-phase="error"] .ab-status { color: var(--action-danger); }
.sl-component .ab-note { color: var(--action-muted); border-top: 1px solid var(--action-surface); margin-top: 12px; padding-top: 10px; font-size: 10px; }
.sl-component .ab-meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; color: var(--action-muted); font-size: 11px; margin-top: 14px; }
.sl-component .ab-value { font-variant-numeric: tabular-nums; color: var(--action-accent); }
.sl-component .ab-track { height: 4px; border-radius: 4px; background: var(--action-track); margin-top: 12px; overflow: hidden; }
.sl-component .ab-fill { display: block; height: 100%; background: var(--action-accent); transform: scaleX(0); transform-origin: left; transition: transform 200ms ease; }
.sl-component .ab-reveal { display: grid; grid-template-rows: 0fr; opacity: 0; visibility: hidden; transition: grid-template-rows 240ms ease, opacity 180ms ease, visibility 0s 240ms; }
.sl-component .ab-reveal[data-open="true"] { grid-template-rows: 1fr; opacity: 1; visibility: visible; transition: grid-template-rows 240ms ease, opacity 180ms ease, visibility 0s; }
.sl-component .ab-reveal > div { overflow: hidden; min-height: 0; }
.sl-component .ab-reveal .ab-inset { padding: 8px 4px 4px; }
.sl-component .ab-divider { height: 1px; background: var(--action-border); margin: 16px 0; }
@media (prefers-reduced-motion: reduce) {
  .sl-component *, .sl-component *::before, .sl-component *::after { transition: none !important; animation: none !important; scroll-behavior: auto !important; }
  .sl-component button:hover, .sl-component button:active { transform: none !important; }
}
@media (forced-colors: active) {
  .sl-component { border-color: CanvasText; }
  .sl-component button { border: 1px solid ButtonText; }
  .sl-component button[aria-pressed="true"], .sl-component button[aria-checked="true"] { outline: 1px solid Highlight; outline-offset: -4px; }
  .sl-component .ab-fill { background: Highlight; }
  .sl-component button:focus-visible { outline-color: Highlight; }
}
.sl-component .ab-suggestion { padding: 22px 0 6px; }
.sl-component .ab-suggestion .ab-value { font-size: 10px; letter-spacing: .08em; display: block; margin-bottom: 8px; }
.sl-component .ab-suggestion strong { font-size: 21px; font-weight: 500; line-height: 1.35; display: block; min-height: 57px; overflow-wrap: anywhere; }
.sl-component .ab-suggestion svg { width: 120px; height: 30px; margin-top: 8px; color: var(--action-accent); transition: transform 280ms ease; }
.sl-component[data-alternate="true"] .ab-suggestion svg { transform: scaleY(-1); }
.sl-component .ab-actions { flex-wrap: nowrap; }
.sl-component .ab-actions button { padding-inline: 10px; }
.sl-component [data-shuffle] { flex: 1; min-width: 0; }
`;function J(){return(()=>{"use strict";function c(t,i={}){if(!t?.matches(".sl-component"))throw new TypeError("Expected a .sl-component root.");const b=t.ownerDocument.defaultView;t.dispatchEvent(new b.Event("sl:buttons-remount"));const k=new b.AbortController;const e=n=>t.querySelector(n);const M=n=>[...t.querySelectorAll(n)];const d=(n,v,q)=>n.addEventListener(v,q,{signal:k.signal});const u=()=>t.getRootNode().activeElement;const r=e("[data-status]");const f=r.textContent;const x=e("[data-note]");const U=x.textContent;let s=false,o="idle",S=0,w=null;function l(n){r.textContent=String(n)}function C(n={}){t.dispatchEvent(new b.CustomEvent("sl:action",{bubbles:true,composed:true,detail:{kind:t.dataset.kind,phase:o,...n}}))}function j(){t.dataset.phase=o;t.setAttribute("aria-busy",String(o==="pending"))}function D(){S++;const n=w;w=null;n?.abort()}function A(){["[data-run]","[data-hold]","[data-stop]","[data-add]"].map(e).find(n=>n&&!n.hidden&&!n.disabled)?.focus()}function z(){if(s||o!=="pending")return false;const n=u()===e("[data-cancel]");D();o="canceled";p();if(n)A();l("Action canceled.");C();return true}async function K(n,v,q,O,Q){if(s||o==="pending")return false;if(typeof n!=="function"){o="error";p();l("Connect the action callback before running this control.");return false}const P=++S;w=new b.AbortController;const W=w.signal;o="pending";p();l(O);try{const y=await n({...v,signal:W});if(s||P!==S)return false;if(y?.status==="canceled"){z();return false}q(y);if(s||P!==S)return false;const L=u()===e("[data-cancel]");w=null;o="complete";p();if(L)A();l(Q);C({result:y});return true}catch(y){if(s||P!==S)return false;const L=u()===e("[data-cancel]");w=null;o=y?.name==="AbortError"?"canceled":"error";p();if(L)A();l(o==="canceled"?"Action canceled.":"Could not complete the action. Try again.");C({error:y});return false}}const h=i.choices??["Quiet geometry","Warm contrast","Open space","Rhythmic lines"];if(!Array.isArray(h)||h.length<2||h.length>20||h.some(n=>typeof n!=="string"||!n.trim())||new Set(h).size!==h.length)throw new TypeError("Provide 2–20 distinct non-empty choice strings.");const m=[...h],I=i.random??Math.random;if(typeof I!=="function")throw new TypeError("random must be a function returning a number in [0, 1).");let a=0,g=null;function p(){j();e("[data-choice]").textContent=m[a];e("[data-number]").textContent=String(a+1).padStart(2,"0")+" / "+String(m.length).padStart(2,"0");e("[data-undo]").disabled=g===null;t.dataset.alternate=String(a%2===1)}function B(){if(s)return false;const n=I();if(!Number.isFinite(n)||n<0||n>=1){o="error";p();l("The random source must return a number from 0 up to 1.");return false}g=a;const v=Math.floor(n*(m.length-1));a=v>=a?v+1:v;o="complete";p();l(m[a]+" selected.");C({index:a,choice:m[a]});return true}function F(){if(s||g===null)return false;a=g;g=null;o="idle";if(u()===e("[data-undo]"))e("[data-shuffle]").focus();p();l("Restored "+m[a]+".");C({index:a,choice:m[a]});return true}d(e("[data-shuffle]"),"click",B);d(e("[data-undo]"),"click",F);function N(){a=0;g=null;if(u()===e("[data-undo]"))e("[data-shuffle]").focus()}const Y={shuffle:B,undo:F};const $=()=>({index:a,choice:m[a],canUndo:g!==null});function T(){if(s)return;D();o="idle";N();p();l(f)}function H(){if(s)return;T();s=true;k.abort();x.textContent=U}d(t,"sl:buttons-remount",H);d(t,"keydown",n=>{if(n.key==="Escape"&&o==="pending"){n.preventDefault();n.stopPropagation();z()}});T();return{reset:T,destroy:H,cancel:z,...Y,get state(){return{phase:o,...$()}}}}function E(t){return c(t)}return{mount:c,mountPreview:E}})()}function _(c,E={},{preview:t=false}={}){if(!c||typeof c.attachShadow!=="function")throw new TypeError("A DOM host is required");const i=c.shadowRoot||c.attachShadow({mode:"open"});i.innerHTML=X;const b=c.ownerDocument.createElement("style");const k=new URL("./instrument-sans-variable.woff2",import.meta.url).href;b.textContent=G.replaceAll("./instrument-sans-variable.woff2",k)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';i.prepend(b);const e=i.querySelector(".sl-component");if(!e){i.replaceChildren();throw new Error("Missing component root")}const M=V(c.ownerDocument,k);let d,u=false;try{const r=J(),f={};if(R==="upload")f.input=i.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(R))f.feedback=i.querySelector("."+R+"-feedback");if(t&&typeof r.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");d=(t?r.mountPreview:r.mount)(e,{...f,...E});if(typeof d?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(r){M();i.replaceChildren();throw r}return new Proxy(d,{get(r,f){if(f==="destroy")return()=>{if(u)return;u=true;try{r.destroy()}finally{M();i.replaceChildren()}};const x=Reflect.get(r,f,r);return typeof x==="function"?x.bind(r):x}})}export{_ as mountInto,R as variant};
