import{retainFont as V}from"./react-font.mjs";const R="buttons-review-decision-v11";const W='<section class="sl-component" data-kind="buttons-review-decision" data-phase="idle" aria-label="Approve or reject" aria-busy="false">\n    <p class="ab-eyebrow">Decision</p>\n    <h2>Review draft</h2>\n    <p class="ab-description">Choose the next step for this draft.</p>\n    <div class="ab-decision-mark" data-mark><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path data-approval d="m5 12 4 4L19 6"/><path data-rejection d="m6 6 12 12M6 18 18 6" style="opacity:0"/></svg><span data-decision>Awaiting review</span></div>\n<div class="ab-actions ab-decisions"><button type="button" class="ab-primary" data-approve aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m5 12 4 4L19 6"/></svg>Approve</button><button type="button" class="ab-danger" data-reject aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M6 18 18 6"/></svg>Reject</button></div>\n<div class="ab-actions"><button type="button" class="ab-quiet ab-wide" data-undo disabled><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 10h10a6 6 0 0 1 0 12M4 10l5-5M4 10l5 5"/></svg>Undo decision</button></div>\n    <p class="ab-status" data-status role="status" aria-live="polite" aria-atomic="true">No decision selected.</p>\n    <p class="ab-note" data-note>Local selection · nothing is submitted.</p>\n  </section>';const X=`/* Palette tokens may be overridden on this component alone. */
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
.sl-component .ab-decision-mark { display: flex; align-items: center; gap: 10px; padding: 20px 0 4px; color: var(--action-muted); font-size: 13px; }
.sl-component .ab-decision-mark svg { opacity: .35; transition: opacity 180ms ease, transform 240ms ease; transform: scale(.85); }
.sl-component[data-decision="approve"] .ab-decision-mark { color: var(--action-accent); }
.sl-component[data-decision="reject"] .ab-decision-mark { color: var(--action-danger); }
.sl-component[data-decision="approve"] .ab-decision-mark svg, .sl-component[data-decision="reject"] .ab-decision-mark svg { opacity: 1; transform: scale(1); }
.sl-component .ab-decisions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.sl-component .ab-decisions button { padding-inline: 7px; gap: 5px; }
.sl-component .ab-decisions button[aria-pressed="true"] { border-color: var(--action-focus); box-shadow: inset 0 -3px 0 var(--action-border); }
.sl-component .ab-decision-mark path { transition: opacity 180ms ease; }
`;function G(){return(()=>{"use strict";function s(o,c={}){if(!o?.matches(".sl-component"))throw new TypeError("Expected a .sl-component root.");const f=o.ownerDocument.defaultView;o.dispatchEvent(new f.Event("sl:buttons-remount"));const x=new f.AbortController;const n=e=>o.querySelector(e);const j=e=>[...o.querySelectorAll(e)];const l=(e,z,q)=>e.addEventListener(z,q,{signal:x.signal});const m=()=>o.getRootNode().activeElement;const r=n("[data-status]");const d=r.textContent;const v=n("[data-note]");const B=v.textContent;let i=false,a="idle",y=0,h=null;function p(e){r.textContent=String(e)}function w(e={}){o.dispatchEvent(new f.CustomEvent("sl:action",{bubbles:true,composed:true,detail:{kind:o.dataset.kind,phase:a,...e}}))}function I(){o.dataset.phase=a;o.setAttribute("aria-busy",String(a==="pending"))}function L(){y++;const e=h;h=null;e?.abort()}function A(){["[data-run]","[data-hold]","[data-stop]","[data-add]"].map(n).find(e=>e&&!e.hidden&&!e.disabled)?.focus()}function C(){if(i||a!=="pending")return false;const e=m()===n("[data-cancel]");L();a="canceled";u();if(e)A();p("Action canceled.");w();return true}async function J(e,z,q,U,$){if(i||a==="pending")return false;if(typeof e!=="function"){a="error";u();p("Connect the action callback before running this control.");return false}const D=++y;h=new f.AbortController;const O=h.signal;a="pending";u();p(U);try{const g=await e({...z,signal:O});if(i||D!==y)return false;if(g?.status==="canceled"){C();return false}q(g);if(i||D!==y)return false;const M=m()===n("[data-cancel]");h=null;a="complete";u();if(M)A();p($);w({result:g});return true}catch(g){if(i||D!==y)return false;const M=m()===n("[data-cancel]");h=null;a=g?.name==="AbortError"?"canceled":"error";u();if(M)A();p(a==="canceled"?"Action canceled.":"Could not complete the action. Try again.");w({error:g});return false}}let t=null,b=null;function u(){I();o.dataset.decision=t??"none";n("[data-approve]").setAttribute("aria-pressed",String(t==="approve"));n("[data-reject]").setAttribute("aria-pressed",String(t==="reject"));n("[data-decision]").textContent=t==="approve"?"Approved locally":t==="reject"?"Rejected locally":"Awaiting review";n("[data-approval]").style.opacity=t==="reject"?"0":"1";n("[data-rejection]").style.opacity=t==="reject"?"1":"0";n("[data-undo]").disabled=t===null&&b===null}function S(e){if(i||!["approve","reject"].includes(e)||e===t)return false;b=t;t=e;a="complete";u();p(t==="approve"?"Approval selected. You can undo.":"Rejection selected. You can undo.");w({decision:t});return true}function P(){if(i||t===null&&b===null)return false;t=b;b=null;a=t?"complete":"idle";if(m()===n("[data-undo]")&&t===null)n("[data-approve]").focus();u();p(t?"Previous decision restored.":"Decision cleared.");w({decision:t});return true}function H(e){if(i||![null,"approve","reject"].includes(e))return false;t=e;b=null;a=e?"complete":"idle";u();p(e?"Decision restored locally.":d);return true}l(n("[data-approve]"),"click",()=>S("approve"));l(n("[data-reject]"),"click",()=>S("reject"));l(n("[data-undo]"),"click",P);function Y(){t=b=null;if(m()===n("[data-undo]"))n("[data-approve]").focus()}const F={choose:S,undo:P,setDecision:H};const N=()=>({decision:t});function E(){if(i)return;L();a="idle";Y();u();p(d)}function T(){if(i)return;E();i=true;x.abort();v.textContent=B}l(o,"sl:buttons-remount",T);l(o,"keydown",e=>{if(e.key==="Escape"&&a==="pending"){e.preventDefault();e.stopPropagation();C()}});E();return{reset:E,destroy:T,cancel:C,...F,get state(){return{phase:a,...N()}}}}function k(o){return s(o)}return{mount:s,mountPreview:k}})()}function Q(s,k={},{preview:o=false}={}){if(!s||typeof s.attachShadow!=="function")throw new TypeError("A DOM host is required");const c=s.shadowRoot||s.attachShadow({mode:"open"});c.innerHTML=W;const f=s.ownerDocument.createElement("style");const x=new URL("./instrument-sans-variable.woff2",import.meta.url).href;f.textContent=X.replaceAll("./instrument-sans-variable.woff2",x)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';c.prepend(f);const n=c.querySelector(".sl-component");if(!n){c.replaceChildren();throw new Error("Missing component root")}const j=V(s.ownerDocument,x);let l,m=false;try{const r=G(),d={};if(R==="upload")d.input=c.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(R))d.feedback=c.querySelector("."+R+"-feedback");if(o&&typeof r.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");l=(o?r.mountPreview:r.mount)(n,{...d,...k});if(typeof l?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(r){j();c.replaceChildren();throw r}return new Proxy(l,{get(r,d){if(d==="destroy")return()=>{if(m)return;m=true;try{r.destroy()}finally{j();c.replaceChildren()}};const v=Reflect.get(r,d,r);return typeof v==="function"?v.bind(r):v}})}export{Q as mountInto,R as variant};
