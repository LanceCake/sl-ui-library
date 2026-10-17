import{retainFont as q}from"./react-font.mjs";const L="hours-slider";const j='<fieldset class="sl-slider sl-slider--range slider-hours" data-slider="hours" data-format="hours" style="--low:37.5%;--high:75%;--position:37.5%;--fraction:0.375;--zoom:0.09;--preview-value:9px"><legend class="slider-sr">Time window</legend><div class="slider-header"><span>Time window</span><output for="next-hours-min next-hours-max" data-output>09:00 – 18:00</output></div><div class="slider-track slider-track--dual"><span class="slider-rail" aria-hidden="true"><span class="slider-fill"></span></span><input class="slider-input" id="next-hours-min" name="hours-min" type="range" min="0" max="24" step="1" value="9" aria-label="Start time" data-low><input class="slider-input" id="next-hours-max" name="hours-max" type="range" min="0" max="24" step="1" value="18" aria-label="End time" data-high></div><div class="hour-marks" aria-hidden="true"><span>00</span><span>06</span><span>12</span><span>18</span><span>24</span></div></fieldset>';const T=`@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
.sl-slider {
  --slider-ink: #222222; --slider-light: #efefef; --slider-muted: #b3b3b3;
  --slider-ease: cubic-bezier(.22,.61,.36,1); --low: 0%; --high: 50%;
  width: min(320px,100%); min-width: 0; margin: 0; padding: 20px;
  border: 1px solid #ffffff0b; border-radius: 14px;
  background: var(--slider-ink); color: var(--slider-light);
  box-shadow: inset 0 1px #ffffff0d,0 2px 5px #00000010;
  font-family: 'Instrument Sans',sans-serif; text-align: left;
}
.sl-slider, .sl-slider * { box-sizing: border-box; }
.slider-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; min-height: 26px; font-size: 14px; }
.slider-header label { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.slider-header svg { width: 24px; height: 24px; flex: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.slider-header output { font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; color: #cecece; }
.slider-track { position: relative; height: 46px; margin-top: 18px; }
.slider-rail { position: absolute; left: 12px; right: 12px; height: 4px; top: 21px; background: #5f5f5f; border-radius: 3px; pointer-events: none; }
.slider-fill { position: absolute; top: 0; bottom: 0; left: var(--low); right: calc(100% - var(--high)); border-radius: inherit; background: var(--slider-light); }
.slider-input { position: absolute; inset: 0; margin: 0; width: 100%; height: 46px; appearance: none; -webkit-appearance: none; border: 0; background: transparent; cursor: pointer; touch-action: pan-y; }
.slider-input::-webkit-slider-runnable-track { height: 4px; background: transparent; border: 0; }
.slider-input::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 24px; height: 24px; margin-top: -10px; border: 1px solid #fdfdfd; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease, border-radius 280ms var(--slider-ease); }
.slider-input::-moz-range-track { height: 4px; background: transparent; border: 0; }
.slider-input::-moz-range-thumb { width: 22px; height: 22px; border: 1px solid #fdfdfd; border-radius: 8px; background: var(--slider-light); box-shadow: 0 2px 5px #0007; transition: box-shadow 220ms ease; }
.slider-input:active::-webkit-slider-thumb { box-shadow: 0 0 0 5px #f3f3f319,0 2px 5px #0007; border-radius: 7px; }
.slider-input:active::-moz-range-thumb { box-shadow: 0 0 0 5px #f3f3f319,0 2px 5px #0007; }
.slider-input:focus-visible { outline: 1px solid #d2d2d2; outline-offset: 3px; border-radius: 8px; }
.slider-input:disabled { cursor: not-allowed; opacity: .5; }
.slider-ends { display: flex; justify-content: space-between; padding-inline: 8px; color: var(--slider-muted); font-size: 11px; }
.sl-slider--volume .slider-header svg { width: 28px; height: 28px; }
.volume-wave { stroke-dasharray: 1; transform-origin: 12px 12px; transition: opacity 180ms ease, stroke-dashoffset 200ms var(--slider-ease), transform 200ms var(--slider-ease); }
.volume-wave.one { opacity: var(--wave-one,1); stroke-dashoffset: calc(1 - var(--wave-one,1)); transform: scaleX(calc(.85 + var(--wave-one,1) * .15)); }
.volume-wave.two { opacity: var(--wave-two,.7); stroke-dashoffset: calc(1 - var(--wave-two,.7)); transform: scaleX(calc(.85 + var(--wave-two,.7) * .15)); }
.volume-mute { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 300ms var(--slider-ease); }
.sl-slider--volume[data-zero="true"] .volume-mute { opacity: 1; stroke-dashoffset: 0; }
.sun-rays { transform-origin: 12px 12px; transform: rotate(var(--sun-angle,0deg)); opacity: var(--sun-opacity,.7); transition: transform 100ms linear, opacity 100ms linear; }
.sl-slider--brightness .slider-input::-webkit-slider-thumb { border-radius: 50%; }
.sl-slider--brightness .slider-input::-moz-range-thumb { border-radius: 50%; }
.slider-step-labels { display: flex; justify-content: space-between; color: var(--slider-muted); font-size: 10px; }
.slider-step-labels span { position: relative; transition: color 220ms ease; }
.slider-step-labels span::before { content: ""; display: block; width: 3px; height: 5px; background: #828282; border-radius: 2px; margin: 0 auto 6px; transition: background-color 220ms ease; }
.slider-step-labels span.is-current { color: #f3f3f3; }
.slider-step-labels span.is-current::before { background: #f3f3f3; }
.sl-slider--steps .slider-header { gap: 6px; }
.sl-slider--steps output { font-size: 12px; }
.slider-track--dual { touch-action: none; cursor: pointer; }
.slider-track--dual .slider-input { pointer-events: none; }
.slider-track--dual .slider-input::-webkit-slider-thumb { pointer-events: auto; }
.slider-track--dual .slider-input::-moz-range-thumb { pointer-events: auto; }
.slider-track--dual .slider-input:focus { z-index: 2; }
.sl-slider--vertical { width: 178px; }
.sl-slider--vertical .slider-header { font-size: 13px; gap: 6px; }
.slider-vertical-body { display: flex; justify-content: center; gap: 18px; margin-top: 12px; }
.sl-slider--vertical .slider-track { width: 46px; height: 172px; margin-top: 0; }
.sl-slider--vertical .slider-rail { top: 12px; bottom: 12px; height: auto; left: 21px; width: 4px; }
.sl-slider--vertical .slider-fill { left: 0; right: 0; top: calc(100% - var(--high)); bottom: 0; }
.sl-slider--vertical .slider-input { writing-mode: vertical-lr; direction: rtl; width: 46px; height: 172px; touch-action: pan-x; }
.sl-slider--vertical .slider-input::-webkit-slider-runnable-track { width: 4px; height: 100%; }
.sl-slider--vertical .slider-input::-webkit-slider-thumb { margin-top: 0; margin-left: -10px; }
.sl-slider--vertical .slider-input::-moz-range-track { width: 4px; height: 100%; }
.slider-scale { display: flex; flex-direction: column; justify-content: space-between; padding-block: 4px; color: #cecece; font-size: 14px; line-height: 16px; font-variant-numeric: tabular-nums; }
.sl-slider--vertical .slider-header output { font-size: 14px; }
.slider-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media(max-width:420px) { .sl-slider { padding: 16px; } .slider-header { font-size: 13px; } .slider-step-labels { font-size: 9px; } }
@media(prefers-reduced-motion:reduce) { .sl-slider * { transition: none !important; } .slider-input::-webkit-slider-thumb { transition: none !important; } .slider-input::-moz-range-thumb { transition: none !important; } }
@media(forced-colors:active) { .sl-slider { border-color: CanvasText; } .slider-rail { background: GrayText; } .slider-fill { background: Highlight; } .slider-input { forced-color-adjust: none; } .slider-input::-webkit-slider-thumb { background: Highlight; border-color: Canvas; } .slider-input::-moz-range-thumb { background: Highlight; border-color: Canvas; } }

/* Additional studies. Base slider mechanics are shared with the approved set. */
[data-study] .toggle-heading h2 { font-size: 21px; }
.slider-scrub .slider-track { height: 70px; margin-top: 18px; }
.slider-scrub .slider-input { height: 70px; }
.slider-scrub .slider-input::-webkit-slider-thumb { width: 4px; height: 52px; margin-top: -24px; border-radius: 2px; }
.slider-scrub .slider-input::-moz-range-thumb { width: 2px; height: 50px; border-radius: 2px; }
.slider-scrub .slider-input::-webkit-slider-thumb { background: transparent; border-color: transparent; box-shadow: none; }
.slider-scrub .slider-input::-moz-range-thumb { background: transparent; border-color: transparent; box-shadow: none; }
.slider-scrub .slider-input:active::-webkit-slider-thumb { box-shadow: none; }
.slider-scrub .slider-input:active::-moz-range-thumb { box-shadow: none; }
.scrub-playhead { position: absolute; inset: 0; pointer-events: none; transform: translateX(calc(var(--fraction,0) * (100% - 4px))); }
.scrub-playhead::before { content: ""; position: absolute; left: 0; top: 9px; width: 4px; height: 52px; border-radius: 2px; background: var(--slider-light); }
.slider-scrub[data-playing="true"] .scrub-playhead { will-change: transform; }
.slider-scrub .slider-rail { display: none; }
.scrub-art { position: absolute; inset: 8px 2px; display: flex; align-items: center; gap: 3px; pointer-events: none; }
.scrub-art span { flex: 1; min-width: 0; height: var(--bar); border-radius: 8px; background: #585858; transition: background-color 220ms ease; }
.scrub-art span.is-played { background: #dedede; }
.scrub-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; color: var(--slider-muted); font-size: 12px; font-variant-numeric: tabular-nums; }
.scrub-caption { color: #9d9d9d; }
.scrub-play { display: flex; align-items: center; justify-content: center; gap: 7px; min-width: 86px; min-height: 36px; padding: 6px 12px; border: 1px solid #ffffff14; border-radius: 18px; background: #323232; color: #efefef; font: inherit; cursor: pointer; transition: background-color 220ms ease, transform 220ms var(--slider-ease); }
.scrub-play svg { width: 18px; height: 18px; overflow: visible; }
.play-symbol { fill: currentColor; stroke: currentColor; stroke-linejoin: round; transition: opacity 160ms ease; }
.pause-symbol { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; opacity: 0; transition: opacity 160ms ease; }
[data-playing="true"] .play-symbol { opacity: 0; }
[data-playing="true"] .pause-symbol { opacity: 1; }
.scrub-play:hover { background: #3d3d3d; }
.scrub-play:active { transform: scale(.97); }
.scrub-play:focus-visible, .rating-choice:focus-visible, .speed-stops button:focus-visible { outline: 2px solid #e0e0e0; outline-offset: 3px; }
.speed-stops { display: flex; justify-content: space-between; gap: 4px; color: #b5b5b5; font-size: 12px; }
.speed-stops button { flex: 1; min-width: 0; }
.speed-stops button { min-height: 36px; padding: 5px 7px; border: 0; font: inherit; color: inherit; background: transparent; cursor: pointer; border-radius: 10px; transition: background-color 240ms ease, color 240ms ease; }
.speed-stops button.is-current { background: #e1e1e1; color: #222222; }
.slider-speed .slider-input::-webkit-slider-thumb { border-radius: 8px; }
.slider-speed .slider-input::-moz-range-thumb { border-radius: 8px; }
.zoom-preview { display: grid; place-items: center; height: 112px; margin-top: 15px; overflow: hidden; background: #191919; border-radius: 10px; }
.zoom-frame { position: relative; display: grid; place-items: center; width: 48px; height: 48px; transform: scale(var(--zoom,1)); border: 1px solid #787878; border-radius: 50%; background: #ffffff03; transition: transform 120ms var(--slider-ease); }
.zoom-frame::before { content: ""; position: absolute; inset: 8px; border: 1px solid #b2b2b2; border-radius: 50%; }
.zoom-frame::after { content: ""; width: 12px; height: 12px; border-radius: 50%; background: #e3e3e3; }
.temperature-meter { position: relative; height: 12px; margin: 26px 6px 10px 8px; border: 0; border-radius: 12px; background: #474747; box-shadow: inset 0 1px 2px #0003; }
.temperature-meter span { position: absolute; inset: 3px 4px; transform: scaleX(var(--fraction,.6)); transform-origin: left; border-radius: inherit; background: #e3e3e3; transition: transform 200ms var(--slider-ease); }
.temperature-meter i { position: absolute; width: 22px; height: 22px; border: 5px solid #474747; background: #e3e3e3; border-radius: 50%; left: -6px; top: -5px; }
.slider-temperature .slider-input::-webkit-slider-thumb { border-radius: 50%; }
.slider-temperature .slider-input::-moz-range-thumb { border-radius: 50%; }
.slider-bipolar .slider-rail::after { content: ""; position: absolute; top: -5px; left: 50%; height: 14px; width: 1px; background: #b5b5b5; }
.balance-symbol { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 24px; color: #c7c7c7; font-size: 12px; }
.balance-symbol i { position: relative; width: 92px; height: 4px; background: #747474; border-radius: 6px; }
.balance-symbol i::after { content: ""; position: absolute; width: 16px; height: 16px; border: 1px solid #ebebeb; background: #373737; border-radius: 50%; top: -6px; left: calc(var(--fraction,.5) * 76px); transition: left 200ms var(--slider-ease); }
.exposure-scale, .hour-marks { display: flex; justify-content: space-between; color: #bcbcbc; font-size: 11px; }
.exposure-scale { border-top: 8px solid transparent; border-image: repeating-linear-gradient(90deg,#8d8d8d 0 1px,transparent 1px 8px) 8; padding-top: 6px; }
.slider-exposure .slider-input::-webkit-slider-thumb { width: 12px; border-radius: 6px; }
.slider-exposure .slider-input::-moz-range-thumb { width: 10px; border-radius: 6px; }
.slider-exposure .slider-rail { left: 6px; right: 6px; }
.slider-segments .slider-rail { height: 12px; top: 17px; border-radius: 2px; }
.slider-segments .slider-rail::after { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(90deg,transparent 0 calc(10% - 3px),#222222 calc(10% - 3px) 10%); }
.slider-segments .slider-input::-webkit-slider-thumb { border-radius: 8px; height: 28px; margin-top: -12px; }
.slider-segments .slider-input::-moz-range-thumb { border-radius: 8px; height: 26px; }
.rating-stars { display: flex; justify-content: space-between; gap: 2px; margin-top: 18px; }
.rating-choice { display: grid; place-items: center; flex: 1; min-width: 0; min-height: 44px; padding: 4px; background: transparent; color: inherit; border: 0; border-radius: 12px; cursor: pointer; transition: background-color 220ms ease; }
.rating-choice:hover { background: #ffffff08; }
.rating-choice:hover .rating-star { transform: translateY(-2px); }
.rating-choice:active .rating-star { transform: scale(.94); }
.rating-star { width: 28px; height: 28px; stroke: #b1b1b1; stroke-width: 1.2; stroke-linejoin: round; fill: none; transition: transform 220ms var(--slider-ease); }
.star-solid { fill: #e9e9e9; stroke: #e9e9e9; clip-path: inset(0 calc(90% - var(--star-fill,0) * 80%) 0 0); }
.sl-slider .slider-input:focus-visible { outline-offset: -2px; }
.slider-rating .slider-input::-webkit-slider-thumb { border-radius: 50%; }
.slider-rating .slider-input::-moz-range-thumb { border-radius: 50%; }
.hour-marks { padding-inline: 6px; }
.hour-marks span::before { content: ""; display: block; width: 1px; height: 6px; margin: 0 auto 8px; background: #828282; }
.slider-hours .slider-input::-webkit-slider-thumb { border-radius: 8px; }
.slider-hours .slider-input::-moz-range-thumb { border-radius: 8px; }
.slider-distance .slider-track { margin-top: 45px; }
.distance-bubble { position: absolute; left: calc(12px + (100% - 24px) * var(--fraction,.35)); bottom: 44px; transform: translateX(-50%); padding: 5px 8px; min-width: 40px; font-size: 11px; text-align: center; white-space: nowrap; color: #222222; background: #e7e7e7; border-radius: 7px; pointer-events: none; }
.distance-bubble::after { content: ""; position: absolute; bottom: -3px; left: calc(50% - 3px); width: 6px; height: 6px; transform: rotate(45deg); background: inherit; }
.slider-meter .slider-track { margin: 18px auto 6px; }
.slider-meter .slider-rail { width: 22px; left: 12px; border-radius: 20px; background: #575757; }
.slider-meter .slider-fill { background: #c8c8c8; }
.slider-meter .slider-input::-webkit-slider-thumb { width: 32px; height: 24px; margin-left: -14px; border-radius: 12px; }
.slider-meter .slider-input::-moz-range-thumb { width: 30px; height: 22px; border-radius: 12px; }
.meter-endpoints { display: flex; justify-content: space-between; color: #bfbfbf; font-size: 12px; }
.mixer-group { box-sizing: border-box; width: min(320px,100%); min-width: 0; padding: 16px; margin: 0; border: 1px solid #ffffff0b; border-radius: 14px; background: #222222; color: #f0f0f0; font-family: 'Instrument Sans',sans-serif; box-shadow: inset 0 1px #ffffff0d,0 2px 5px #00000010; }
.mixer-title { margin: 0 0 14px; font-size: 14px; }
.mixer-channels { display: flex; gap: 8px; }
.slider-channel { flex: 1; width: 0; padding: 8px 3px; border-radius: 8px; background: #1a1a1a; box-shadow: none; }
.slider-channel .slider-header { flex-direction: column; gap: 5px; font-size: 12px; }
.slider-channel .slider-header output { font-size: 11px; color: #c2c2c2; }
.slider-channel .slider-track { width: 40px; height: 132px; margin: 12px auto 0; }
.slider-channel .slider-input { width: 40px; height: 132px; }
.slider-channel .slider-rail { left: 18px; }
.slider-channel .slider-ends { display: none; }
.type-preview { height: 80px; display: grid; place-items: center; margin-top: 12px; background: #191919; border-radius: 8px; overflow: hidden; }
.type-preview span { font-size: var(--preview-value,28px); line-height: 1; transition: font-size 200ms var(--slider-ease); }
.radius-preview { display: grid; place-items: center; margin-top: 18px; height: 84px; }
.radius-preview span { width: 80px; height: 80px; background: #dcdcdc; border-radius: var(--preview-value,16px); box-shadow: inset 0 0 0 1px #f4f4f4; }
.opacity-preview { height: 80px; margin-top: 20px; border-radius: 8px; overflow: hidden; background: conic-gradient(#545454 25%,#2e2e2e 0 50%,#545454 0 75%,#2e2e2e 0) 0 0/16px 16px; }
.opacity-preview span { display: block; height: 100%; background: #ebebeb; opacity: var(--fraction,.7); transition: opacity 200ms var(--slider-ease); }
.slider-temperature .slider-input:active::-webkit-slider-thumb, .slider-rating .slider-input:active::-webkit-slider-thumb { border-radius: 50%; }
.slider-scrub .slider-input:active::-webkit-slider-thumb { border-radius: 2px; }
.slider-exposure .slider-input:active::-webkit-slider-thumb { border-radius: 6px; }
.speed-stops button:hover:not(.is-current) { background: #ffffff0a; }
[data-study] .sl-slider:not([data-interacted]) .zoom-frame,
[data-study] .sl-slider:not([data-interacted]) .temperature-meter span,
[data-study] .sl-slider:not([data-interacted]) .rating-star { transition: none; }
@media(max-width:420px) { .speed-stops { font-size: 10px; } .speed-stops button { padding-inline: 4px; } .mixer-group { padding: 12px; } .slider-channel { padding: 8px 2px; } .mixer-channels { gap: 6px; } .slider-channel .slider-header { font-size: 11px; } }
@media(prefers-reduced-motion:reduce) { .sl-slider *, .sl-slider *::before, .sl-slider *::after { transition: none !important; } }
`;function D(){return(()=>{const w=new WeakMap;function C(i,{onChange:o,formatValue:d}={}){if(w.has(i))return w.get(i);if(o!==void 0&&typeof o!=="function")throw new TypeError("onChange must be a function.");if(d!==void 0&&typeof d!=="function")throw new TypeError("formatValue must be a function.");const t=[...i.querySelectorAll('input[type="range"]')];const u=i.querySelector("[data-output]");if(!t.length||!u)throw new TypeError("A native range and output are required.");const c=new AbortController;const r=i.ownerDocument.defaultView;const n=t.length===2;const A=i.dataset.labels?.split(",");const h=a=>d?String(d(a)):n?"$"+a:a+"%";const m=i.querySelector(".slider-track");let p=null,S=false;const k=()=>t.map(a=>a.valueAsNumber);const E=a=>(a.valueAsNumber-Number(a.min))/(Number(a.max)-Number(a.min))*100;function x(a,g=false){if(S)return;if(n){if(t[0].valueAsNumber>t[1].valueAsNumber){if(a===t[0])t[0].value=t[1].value;else t[1].value=t[0].value}i.style.setProperty("--low",E(t[0])+"%");i.style.setProperty("--high",E(t[1])+"%");t[0].setAttribute("aria-valuemax",t[1].value);t[1].setAttribute("aria-valuemin",t[0].value);for(const e of t)e.setAttribute("aria-valuetext",h(e.valueAsNumber));u.textContent=h(t[0].valueAsNumber)+" – "+h(t[1].valueAsNumber)}else{const e=E(t[0]);i.style.setProperty("--high",e+"%");i.style.setProperty("--position",e+"%");if(i.hasAttribute("data-centered")){const s=(0-Number(t[0].min))/(Number(t[0].max)-Number(t[0].min))*100;i.style.setProperty("--low",Math.min(e,s)+"%");i.style.setProperty("--high",Math.max(e,s)+"%")}i.style.setProperty("--sun-angle",e*.9+"deg");i.style.setProperty("--sun-opacity",String(.25+e*.0075));i.dataset.zero=String(e===0);i.dataset.quiet=String(e<=50);if(i.dataset.slider==="volume"){i.style.setProperty("--wave-one",String(Math.min(1,e/35)));i.style.setProperty("--wave-two",String(Math.max(0,Math.min(1,(e-20)/80))))}u.textContent=A?A[t[0].valueAsNumber]:h(t[0].valueAsNumber);t[0].setAttribute("aria-valuetext",u.textContent);for(const s of i.querySelectorAll("[data-step]"))s.classList.toggle("is-current",Number(s.dataset.step)===t[0].valueAsNumber)}if(g){o?.(k());i.dispatchEvent(new r.CustomEvent("sliderchange",{bubbles:true,detail:{values:k()}}))}}i.addEventListener("input",a=>{if(t.includes(a.target))x(a.target,true)},{signal:c.signal});if(n){const a=e=>{const s=m.getBoundingClientRect();const b=Math.max(0,Math.min(1,(e.clientX-s.left-12)/(s.width-24)));const v=Number(p.min),l=Number(p.max),f=Number(p.step)||1;p.value=String(v+Math.round(b*(l-v)/f)*f);p.dispatchEvent(new r.Event("input",{bubbles:true}))};m.addEventListener("pointerdown",e=>{if(e.button!==0||t.includes(e.target)||p)return;const s=t.filter(l=>!l.disabled);if(!s.length)return;const b=m.getBoundingClientRect();const v=(e.clientX-b.left-12)/(b.width-24)*100;p=s.reduce((l,f)=>Math.abs(E(f)-v)<Math.abs(E(l)-v)?f:l);p.focus({preventScroll:true});m.setPointerCapture(e.pointerId);a(e);e.preventDefault()},{signal:c.signal});m.addEventListener("pointermove",e=>{if(p&&m.hasPointerCapture(e.pointerId))a(e)},{signal:c.signal});const g=()=>{const e=p;p=null;e?.dispatchEvent(new r.Event("change",{bubbles:true}))};m.addEventListener("pointerup",g,{signal:c.signal});m.addEventListener("pointercancel",g,{signal:c.signal});m.addEventListener("lostpointercapture",g,{signal:c.signal})}function z(){if(S)return;t.forEach(a=>{a.value=a.defaultValue});x()}t[0].form?.addEventListener("reset",()=>queueMicrotask(z),{signal:c.signal});r.addEventListener("pageshow",()=>x(),{signal:c.signal});x();const N={reset:z,get values(){return k()},destroy(){S=true;p=null;c.abort();w.delete(i)}};w.set(i,N);return N}function M(i){return o=>{switch(i.dataset.format){case"time":return Math.floor(o/60)+":"+String(Math.floor(o)%60).padStart(2,"0");case"hours":return String(o).padStart(2,"0")+":00";case"temperature":return o+" °C";case"balance":return o===0?"Center":Math.abs(o)+"% "+(o<0?"L":"R");case"exposure":return(o>0?"+":"")+o.toFixed(1)+" EV";case"rating":return o+" / 5";case"distance":return o+" km";case"pixels":return o+" px";default:return o+"%"}}}function y(i,{onChange:o}={}){if(o!==void 0&&typeof o!=="function")throw new TypeError("onChange must be a function.");const d=new AbortController;const t=i.matches(".sl-slider")?[i]:[...i.querySelectorAll(".sl-slider")];const u=t.map(r=>{const n=r.querySelector("input"),A=M(r);r.addEventListener("input",()=>{r.dataset.interacted="true"},{signal:d.signal});const h=[...r.querySelectorAll("[data-rating],button[data-step]")];const m=[...r.querySelectorAll(".scrub-art span")];let p=-1;const S=e=>{const s=e[0],b=(s-Number(n.min))/(Number(n.max)-Number(n.min));r.style.setProperty("--fraction",String(b));r.style.setProperty("--preview-value",s+"px");r.style.setProperty("--zoom",String(s/100));r.querySelector("[data-bubble]")?.replaceChildren(A(s));for(const l of h){const f=Number(l.dataset.rating??l.dataset.step);if(l.hasAttribute("data-rating")){const P=l.querySelector("svg");P.classList.toggle("is-filled",f<=s);P.style.setProperty("--star-fill",String(Math.max(0,Math.min(1,s-f+1))));l.setAttribute("aria-checked",String(f===s));l.tabIndex=f===Math.round(s)?0:-1}else l.setAttribute("aria-pressed",String(f===s))}const v=Math.round(b*m.length);if(v!==p){m.forEach((l,f)=>l.classList.toggle("is-played",f<v));p=v}};const k=C(r,{formatValue:A,onChange:e=>{S(e);o?.(e)}});const E=e=>{if(n.disabled)return;n.value=String(e);n.dispatchEvent(new Event("input",{bubbles:true}));n.dispatchEvent(new Event("change",{bubbles:true}))};for(const e of h){e.addEventListener("click",()=>E(Number(e.dataset.rating??e.dataset.step)),{signal:d.signal});if(!e.hasAttribute("data-rating"))continue;e.addEventListener("keydown",s=>{const b={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1}[s.key];if(b===void 0&&!["Home","End"].includes(s.key))return;s.preventDefault();const v=h.indexOf(e);const l=s.key==="Home"?0:s.key==="End"?h.length-1:(v+b+h.length)%h.length;h[l].focus();h[l].click()},{signal:d.signal})}const x=r.querySelector("[data-play]");let z=null,N=0,a=0;const g=()=>{cancelAnimationFrame(z);z=null;if(!x)return;r.dataset.playing="false";x.setAttribute("aria-label","Play preview");x.querySelector("[data-play-label]").textContent="Play"};if(x){x.addEventListener("click",()=>{if(z!==null){g();return}if(n.valueAsNumber>=Number(n.max))E(Number(n.min));N=performance.now();a=n.valueAsNumber;r.dataset.playing="true";x.setAttribute("aria-label","Pause preview");x.querySelector("[data-play-label]").textContent="Pause";const e=s=>{const b=Math.min(Number(n.max),a+(s-N)/1e3);if(b!==n.valueAsNumber){n.value=String(b);n.dispatchEvent(new Event("input",{bubbles:true}))}if(b>=Number(n.max))g();else z=requestAnimationFrame(e)};z=requestAnimationFrame(e)},{signal:d.signal});n.addEventListener("input",e=>{if(e.isTrusted&&z!==null){N=performance.now();a=n.valueAsNumber}},{signal:d.signal});n.addEventListener("keydown",e=>{const s={ArrowRight:1,ArrowUp:1,ArrowLeft:-1,ArrowDown:-1}[e.key];if(s===void 0)return;e.preventDefault();E(Math.max(Number(n.min),Math.min(Number(n.max),n.valueAsNumber+s)));if(z!==null){N=performance.now();a=n.valueAsNumber}},{signal:d.signal});document.addEventListener("visibilitychange",()=>{if(document.hidden)g()},{signal:d.signal})}S(k.values);return{get values(){return k.values},sync(){S(k.values)},pause:g,reset(){g();k.reset();S(k.values)},destroy(){g();k.destroy()}}});const c=()=>u.forEach(r=>r.sync());window.addEventListener("pageshow",c,{signal:d.signal});window.addEventListener("pagehide",()=>u.forEach(r=>r.pause()),{signal:d.signal});return{get values(){return u.flatMap(r=>r.values)},reset(){u.forEach(r=>r.reset())},destroy(){d.abort();u.forEach(r=>r.destroy())}}}return{mount:y}})()}function R(w,C={},{preview:M=false}={}){if(!w||typeof w.attachShadow!=="function")throw new TypeError("A DOM host is required");const y=w.shadowRoot||w.attachShadow({mode:"open"});y.innerHTML=j;const i=w.ownerDocument.createElement("style");const o=new URL("./instrument-sans-variable.woff2",import.meta.url).href;i.textContent=T.replaceAll("./instrument-sans-variable.woff2",o)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';y.prepend(i);const d=y.querySelector(".mixer-group,.sl-slider");if(!d){y.replaceChildren();throw new Error("Missing component root")}const t=q(w.ownerDocument,o);let u,c=false;try{const r=D(),n={};if(L==="upload")n.input=y.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(L))n.feedback=y.querySelector("."+L+"-feedback");if(M&&typeof r.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");u=(M?r.mountPreview:r.mount)(d,{...n,...C});if(typeof u?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(r){t();y.replaceChildren();throw r}return new Proxy(u,{get(r,n){if(n==="destroy")return()=>{if(c)return;c=true;try{r.destroy()}finally{t();y.replaceChildren()}};const A=Reflect.get(r,n,r);return typeof A==="function"?A.bind(r):A}})}export{R as mountInto,L as variant};
