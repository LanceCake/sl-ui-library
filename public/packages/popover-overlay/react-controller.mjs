import{retainFont as J}from"./react-font.mjs";const X="popover-overlay";const Q='<div class="overlay-demo" data-overlay="popover" data-open="false"><div class="overlay-launch"><button class="overlay-trigger" type="button" data-trigger aria-haspopup="dialog" aria-expanded="false" aria-controls="overlay-popover"><i class="menu-glyph " data-icon="file" aria-hidden="true"><svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true"><path d="M7 4h10l6 6v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm10 0v6h6"/></svg></i><span>Project info</span></button><p class="overlay-feedback" data-feedback role="status">Try it here. Nothing leaves this preview.</p></div><section class="overlay-panel" role="dialog" id="overlay-popover" aria-labelledby="panel-title" aria-hidden="true" inert><button class="overlay-close" type="button" data-close aria-label="Close"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="m8 8 12 12M20 8 8 20"/></svg></button><div class="overlay-eyebrow">PROJECT BRIEF</div><h2 id="panel-title">The details, nearby.</h2><p>A small space for context without leaving your work.</p><div class="popover-footer"><span>Updated today</span><div class="sl-check-card popover-pin" data-pin><label class="sl-check sl-check--icon sl-check--round sl-check--pin"><input class="sl-check__input" type="checkbox" id="popover-pin" name="pinned" aria-label="Pin project info" ><span class="sl-check__box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><g class="mark-icon"><path d="M8 3h8v3l-1 1v5l3 3v2H6v-2l3-3V7L8 6V3ZM12 17v5"/></g><path class="sl-check__dash" d="M6 12h12"/></svg></span><span class="sl-check__copy"><span class="sl-check__title" aria-hidden="true"><span class="pin-off">Pin</span><span class="pin-on">Pinned</span></span></span></label></div></div></section></div>';const $=`@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
.sl-check-card {
  --check-ink: #222222;
  --check-paper: #efefef;
  --check-muted: #b3b3b3;
  --check-ease: cubic-bezier(.22,.61,.36,1);
  width: min(320px,100%); min-width: 0; margin: 0; padding: 6px;
  border: 1px solid #ffffff0b; border-radius: 14px;
  color: #f8f8f8; background: var(--check-ink);
  box-shadow: inset 0 1px #ffffff0d, 0 2px 5px #00000010;
  font-family: 'Instrument Sans',sans-serif; text-align: left;
}
.sl-check-card, .sl-check-card * { box-sizing: border-box; }
.sl-check { position: relative; display: flex; align-items: center; gap: 16px; min-height: 68px; padding: 12px; border-radius: 9px; cursor: pointer; transition: background-color 300ms ease; }
.sl-check:hover { background: #ffffff06; }
.sl-check__input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
.sl-check__box { position: relative; isolation: isolate; display: grid; place-items: center; flex: none; width: 28px; height: 28px; overflow: hidden; border: 1px solid #797979; border-radius: 8px; background: #141414; box-shadow: inset 0 1px 2px #0004; transition: border-color 350ms ease, transform 260ms var(--check-ease); }
.sl-check__box::before { content: ""; position: absolute; inset: -1px; z-index: -1; background: var(--check-paper); opacity: 0; transition: opacity 380ms ease, transform 520ms var(--check-ease); }
.sl-check__box svg { display: block; width: 23px; height: 23px; stroke: var(--check-ink); stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }
.sl-check__tick { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; transition: stroke-dashoffset 480ms var(--check-ease), opacity 240ms ease; }
.sl-check__dash { opacity: 0; transition: opacity 220ms ease; }
.sl-check__input:checked + .sl-check__box, .sl-check__input:indeterminate + .sl-check__box { border-color: var(--check-paper); }
.sl-check__input:checked + .sl-check__box::before, .sl-check__input:indeterminate + .sl-check__box::before { opacity: 1; }
.sl-check__input:checked + .sl-check__box .sl-check__tick { opacity: 1; stroke-dashoffset: 0; transition-delay: 70ms; }
.sl-check__input:indeterminate + .sl-check__box .sl-check__tick { opacity: 0; }
.sl-check__input:indeterminate + .sl-check__box .sl-check__dash { opacity: 1; }
.sl-check__input:focus-visible + .sl-check__box { outline: 2px solid var(--check-paper); outline-offset: 4px; }
.sl-check:active .sl-check__box { transform: scale(.94); }
.sl-check:has(.sl-check__input:disabled) { opacity: .5; cursor: not-allowed; }
.sl-check__copy { display: grid; gap: 4px; min-width: 0; }
.sl-check__title { position: relative; width: fit-content; font-size: 15px; font-weight: 540; line-height: 20px; }
.sl-check__hint { color: var(--check-muted); font-size: 12px; line-height: 17px; }
/* Short, coordinated fill: no delayed second beat after the surface settles. */
.sl-check--fill .sl-check__box { border-radius: 4px; transition: border-color 240ms ease, transform 220ms var(--check-ease); }
.sl-check--fill .sl-check__box::before { transform: scale(.65); border-radius: 3px; transition: opacity 200ms ease, transform 280ms var(--check-ease); }
.sl-check--fill .sl-check__tick { stroke-dashoffset: 0; transform: scale(.9); transform-origin: 12px 12px; transition: opacity 180ms ease, transform 260ms var(--check-ease); }
.sl-check--fill .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }
.sl-check--fill .sl-check__input:checked + .sl-check__box .sl-check__tick { transform: scale(1); transition-delay: 20ms; }
/* Circular checkbox, not a radio: selections remain independent. */
.sl-check--outline .sl-check__box { width: 30px; height: 30px; border-radius: 50%; }
.sl-check--outline .sl-check__box::before { border-radius: 50%; transform: scale(.65); transition: opacity 200ms ease, transform 280ms var(--check-ease); }
.sl-check--outline .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }
.sl-check--outline .sl-check__tick { stroke-dashoffset: 0; transform: scale(.9); transform-origin: 12px 12px; transition: opacity 180ms ease, transform 260ms var(--check-ease); }
.sl-check--outline .sl-check__input:checked + .sl-check__box .sl-check__tick { transform: scale(1); transition-delay: 20ms; }
.sl-check--task .sl-check__title { transition: color 440ms ease; }
.sl-check--task .sl-check__title::after { content: ""; position: absolute; left: 0; right: 0; top: 52%; height: 1px; background: #bebebe; transform: scaleX(0); transform-origin: left; transition: transform 600ms var(--check-ease); }
.sl-check--task .sl-check__input:checked ~ .sl-check__copy .sl-check__title { color: #b3b3b3; }
.sl-check--task .sl-check__input:checked ~ .sl-check__copy .sl-check__title::after { transform: scaleX(1); transition-delay: 90ms; }
.sl-check-group__children { margin: 0 12px 5px; padding-top: 7px; border-top: 1px solid #ffffff12; }
.sl-check-group__children .sl-check { min-height: 45px; padding: 7px 0; }
.sl-check-group__children .sl-check__box { width: 24px; height: 24px; border-radius: 7px; }
.sl-check-group__children .sl-check__box svg { width: 21px; height: 21px; }
.sl-check-group__children .sl-check__title { font-size: 14px; font-weight: 450; }
.visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
@media (max-width:420px) { .sl-check { gap: 12px; padding-inline: 10px; } .sl-check__title { font-size: 14px; } }
@media (prefers-reduced-motion:reduce) { .sl-check-card *, .sl-check-card *::before, .sl-check-card *::after { transition: none !important; animation: none !important; } .sl-check:active .sl-check__box { transform: none; } }
@media (forced-colors:active) {
  .sl-check-card { color: CanvasText; background: Canvas; border-color: CanvasText; }
  .sl-check__hint { color: CanvasText; }
  .sl-check__box { forced-color-adjust: none; background: Canvas; border-color: CanvasText; }
  .sl-check__box::before { background: Highlight; }
  .sl-check__box svg { stroke: HighlightText; }
  .sl-check--outline .sl-check__box svg { stroke: HighlightText; }
  .sl-check--outline .sl-check__input:checked + .sl-check__box { border-color: Highlight; }
  .sl-check__input:focus-visible + .sl-check__box { outline-color: Highlight; }
}

/* Only the twenty new studies; the original five keep their own motion. */
.check-jumps { display: flex; flex-wrap: wrap; gap: 10px 22px; margin-top: 28px; }
.check-jumps a { color: #bdbdbd; font-size: 14px; text-decoration: none; border-bottom: 1px solid #676767; padding-block: 8px; }
.check-jumps a:hover { color: #fff; }
.check-jumps a:focus-visible { outline: 2px solid #ddd; outline-offset: 4px; }
.check-section { grid-column: 1 / -1; padding-top: 26px; scroll-margin-top: 30px; }
.check-section h2 { margin: 0 0 4px; font-size: 28px; letter-spacing: -.03em; }
[data-variation] .toggle-heading h2 { font-size: 21px; }
[data-variation] .sl-check__title { line-height: 1.4; }
.sl-check--round .sl-check__box { border-radius: 50%; width: 30px; height: 30px; }
.sl-check--sharp .sl-check__box { border-radius: 4px; }
.mark-stroke { opacity: 0; stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 360ms var(--check-ease), opacity 240ms ease; }
.sl-check__input:checked + .sl-check__box .mark-stroke { opacity: 1; stroke-dashoffset: 0; }
.sl-check--cross .stroke-two { transition-delay: 0ms; }
.sl-check--cross .sl-check__input:checked + .sl-check__box .stroke-two { transition-delay: 75ms; }
.sl-check--cross-turn .mark-stroke { stroke-dashoffset: 0; transform-origin: 12px 12px; transform: rotate(-35deg) scale(.7); transition: transform 400ms var(--check-ease), opacity 240ms ease; }
.sl-check--cross-turn .sl-check__input:checked + .sl-check__box .mark-stroke { transform: rotate(0) scale(1); transition-delay: 0ms; }
.sl-check--icon .sl-check__box { width: 36px; height: 36px; }
.sl-check--icon .sl-check__box svg { stroke: #b4b4b4; transition: stroke 320ms ease; }
.sl-check--icon .sl-check__input:checked + .sl-check__box svg { stroke: var(--check-ink); }
.mark-icon { transform-origin: 12px 12px; fill: transparent; transition: fill 360ms ease, transform 460ms var(--check-ease); }
.sl-check--star .sl-check__input:checked + .sl-check__box .mark-icon { fill: var(--check-ink); transform: rotate(12deg) scale(.93); }
.sl-check--heart .mark-icon { transform: scale(.88); }
.sl-check--heart .sl-check__input:checked + .sl-check__box .mark-icon { fill: var(--check-ink); transform: scale(1); }
.sl-check--bookmark .mark-icon { transform: translateY(-2px); }
.sl-check--bookmark .sl-check__input:checked + .sl-check__box .mark-icon { transform: translateY(0); fill: var(--check-ink); }
.sl-check--shield .sl-check__box::before { border-radius: 7px; transform: scale(.5); }
.sl-check--shield .sl-check__input:checked + .sl-check__box::before { transform: scale(1); }
.sl-check--shield .sl-check__input:checked + .sl-check__box .mark-stroke { transition-delay: 80ms; }
.sl-check--pin .mark-icon { transform: translateY(-1px) rotate(-15deg); transform-origin: 12px 12px; }
.sl-check--pin .sl-check__input:checked + .sl-check__box .mark-icon { transform: translateY(0) rotate(0); }
.sl-check--bell .mark-icon { transform: rotate(-10deg); transform-origin: 12px 4px; }
.sl-check--bell .sl-check__input:checked + .sl-check__box .mark-icon { transform: rotate(0); }
.sl-check--bell .sl-check__input:checked + .sl-check__box .mark-stroke { transition-delay: 120ms; }
.sl-check--ring .sl-check__box { border-color: #6d6d6d; }
.sl-check--ring .sl-check__box::before, .sl-check--corner .sl-check__box::before { display: none; }
.sl-check--ring .sl-check__box svg, .sl-check--corner .sl-check__box svg { stroke: var(--check-paper); }
.check-ring { stroke-dasharray: 1; stroke-dashoffset: 1; transform: rotate(-90deg); transform-origin: 12px 12px; transition: stroke-dashoffset 520ms var(--check-ease); }
.sl-check--ring .sl-check__input:checked + .sl-check__box .check-ring { stroke-dashoffset: 0; }
.sl-check--ring .sl-check__input:checked + .sl-check__box { border-color: #6d6d6d; }
.sl-check--corner .sl-check__box { overflow: visible; border: 0; background: transparent; box-shadow: none; }
.check-corners { transform-origin: 12px 12px; transform: scale(1.08); opacity: .45; transition: transform 400ms var(--check-ease), opacity 320ms ease; }
.sl-check--corner .sl-check__input:checked + .sl-check__box .check-corners { transform: scale(.9); opacity: 1; }

.check-caption { margin: 12px 12px 14px; color: #c9c9c9; font-size: 13px; line-height: 1.4; }
.check-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; padding: 0 10px 12px; }
.sl-check--chip { min-height: 40px; padding: 8px 28px; justify-content: center; gap: 0; background: #131313; border: 1px solid #585858; border-radius: 30px; transition: background-color 320ms ease, border-color 320ms ease; }
.sl-check--chip .sl-check__copy { transform: translateX(0); transition: transform 360ms var(--check-ease); }
.sl-check--chip:has(:checked) .sl-check__copy { transform: translateX(12px); }
.sl-check--chip .sl-check__title { font-size: 13px; }
.sl-check--chip .sl-check__box { position: absolute; left: 16px; top: calc(50% - 9px); width: 18px; height: 18px; border: 0; background: transparent; box-shadow: none; opacity: 0; transition: opacity 180ms ease; }
.sl-check--chip:has(:checked) .sl-check__box { opacity: 1; }
.sl-check--chip .sl-check__box::before { display: none; }
.sl-check--chip .sl-check__box svg { width: 18px; height: 18px; stroke: var(--check-paper); }
.sl-check--chip:has(:checked) { background: #404040; border-color: #b6b6b6; }
.sl-check--chip .sl-check__tick { stroke-dashoffset: 1; transition: opacity 180ms ease, stroke-dashoffset 360ms var(--check-ease); }
.sl-check--chip .sl-check__input:checked + .sl-check__box .sl-check__tick { stroke-dashoffset: 0; transition-delay: 70ms; }
.sl-check--chip:has(:focus-visible) { outline: 2px solid var(--check-paper); outline-offset: 3px; }
.sl-check--chip .sl-check__input:focus-visible + .sl-check__box { outline: none; }
.check-days { display: grid; grid-template-columns: repeat(7,minmax(0,1fr)); gap: 3px; padding: 0 9px 12px; }
.check-day { position: relative; min-width: 0; cursor: pointer; }
.check-day > span { position: relative; display: grid; place-content: center; height: 44px; border: 1px solid #5c5c5c; border-radius: 20px; color: #bdbdbd; font-size: 12px; transition: color 300ms ease, background-color 300ms ease, border-color 300ms ease; }
.check-day i { position: absolute; bottom: 5px; left: calc(50% - 2px); width: 4px; height: 4px; background: #262626; border-radius: 50%; transform: scale(0); transition: transform 340ms var(--check-ease); }
.check-day input:checked + span { background: var(--check-paper); color: var(--check-ink); border-color: var(--check-paper); }
.check-day input:checked + span i { transform: scale(1); }
.check-day input:focus-visible + span, .check-tile input:focus-visible + span, .check-swatch input:focus-visible + span { outline: 2px solid var(--check-paper); outline-offset: 3px; }
.check-tiles { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; padding: 8px; }
.check-tile { position: relative; min-width: 0; cursor: pointer; }
.check-tile__face { display: flex; min-height: 128px; flex-direction: column; align-items: center; justify-content: center; gap: 10px; border: 1px solid #686868; border-radius: 10px; background: #181818; color: #bebebe; transition: border-color 340ms ease, background-color 340ms ease, color 340ms ease; font-size: 12px; }
.tile-art { width: 29px; height: 29px; transition: transform 420ms var(--check-ease); }
.check-tile svg, .row-art { stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }
.tile-check { position: absolute; width: 17px; height: 17px; right: 8px; top: 8px; }
.check-tile input:checked + span { border-color: #c9c9c9; background: #3b3b3b; color: #f3f3f3; }
.check-tile input:checked + span .tile-art { transform: translateY(-2px); }
.check-tile input:checked + span .sl-check__tick { stroke-dashoffset: 0; opacity: 1; }
.check-swatches { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; padding: 0 10px 12px; }
.check-swatch { position: relative; display: grid; justify-items: center; gap: 9px; cursor: pointer; }
.swatch-face { position: relative; display: grid; place-content: center; width: 60px; height: 60px; border: 1px solid #777777; border-radius: 50%; box-shadow: 0 0 0 3px transparent; transition: box-shadow 350ms ease, border-color 350ms ease; }
.texture-0 { background: #474747; }
.texture-1 { background: repeating-linear-gradient(45deg,#303030 0 4px,#5b5b5b 4px 5px); }
.texture-2 { background: radial-gradient(#7d7d7d 1px,transparent 1.5px) 0 0 / 7px 7px,#323232; }
.swatch-face svg { width: 24px; height: 24px; stroke: #222222; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; background: #f2f2f2; border-radius: 50%; opacity: 0; transform: scale(.65); transition: transform 380ms var(--check-ease), opacity 240ms ease; }
.check-swatch input:checked + span { border-color: #e6e6e6; box-shadow: 0 0 0 3px #828282; }
.check-swatch input:checked + span svg { opacity: 1; transform: scale(1); }
.check-swatch input:checked + span .sl-check__tick { stroke-dashoffset: 0; opacity: 1; }
.swatch-label { font-size: 12px; color: #c3c3c3; }

.check-list .sl-check { min-height: 52px; padding: 10px 12px; gap: 12px; }
.check-list .sl-check__title { font-size: 13px; }
.check-list .sl-check__box { width: 24px; height: 24px; }
.check-list .sl-check__box svg { width: 20px; height: 20px; }
.check-list .sl-check + .sl-check { border-top: 1px solid #ffffff0a; }
.check-exclusions .sl-check__title { transition: opacity 300ms ease; }
.check-exclusions .sl-check:has(:checked) .sl-check__title { opacity: .55; text-decoration: line-through; text-decoration-thickness: 1px; }
.sl-check--right .sl-check__box { order: 3; margin-left: auto; }
.sl-check--right .sl-check__copy { flex: 1; }
.row-art { width: 22px; height: 22px; color: #c3c3c3; flex: none; }
.check-filelist .sl-check:has(:checked) { background: #3c3c3c; }
.check-filelist .sl-check { transition: background-color 400ms ease; }
.check-table-head { display: flex; justify-content: space-between; margin: 10px 12px 6px 48px; color: #aaaaaa; font-size: 11px; }
.check-table .sl-check { border-radius: 0; min-height: 45px; }
.check-table .sl-check__copy { display: flex; flex: 1; align-items: center; justify-content: space-between; gap: 8px; }
.check-table .sl-check__hint { font-size: 11px; }
.check-table .sl-check:has(:checked) { background: #363636; }
.check-tree { margin: 0 8px 10px 23px; border-left: 1px solid #5e5e5e; padding-left: 10px; }
.check-tree .sl-check { position: relative; min-height: 43px; border: 0; padding-right: 4px; }
.check-tree .sl-check::before { content: ""; position: absolute; left: -10px; width: 12px; height: 1px; background: #5e5e5e; }
.check-nested > .sl-check { min-height: 65px; }
@media (max-width:420px) {
  .swatch-face { width: 49px; height: 49px; }
  .check-swatches { gap: 7px; padding-inline: 6px; }
  .check-list .sl-check { padding-inline: 8px; gap: 9px; }
  .check-list .sl-check__title { font-size: 12px; }
  .check-days { padding-inline: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .sl-check-card *, .sl-check-card *::before, .sl-check-card *::after { animation: none !important; transition: none !important; }
}
@media (forced-colors:active) {
  .sl-check--icon .sl-check__box svg { stroke: CanvasText; }
  .sl-check--icon .sl-check__input:checked + .sl-check__box svg { stroke: HighlightText; }
  .sl-check--icon .sl-check__input:checked + .sl-check__box .mark-icon { fill: transparent; }
  .sl-check--ring .sl-check__box svg, .sl-check--corner .sl-check__box svg, .sl-check--chip .sl-check__box svg { stroke: CanvasText; }
  .check-day > span, .check-tile__face, .swatch-face { forced-color-adjust: none; color: CanvasText; background: Canvas; border-color: CanvasText; }
  .check-day input:checked + span, .check-tile input:checked + span, .check-swatch input:checked + span { background: Highlight; color: HighlightText; border-color: HighlightText; }
  .check-day input:checked + span i { background: HighlightText; }
}

@font-face{font-family:'Instrument Sans';src:url('./instrument-sans-variable.woff2') format('woff2');font-weight:400 700;font-display:swap}
*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:'Instrument Sans',sans-serif;color:#ededed;color-scheme:light;background:#edf0f1}body{background:radial-gradient(ellipse at 25% 0%,#f7f8f9,transparent 95%),linear-gradient(145deg,#eef0f2,#e4e7eb)}
button,input{font:inherit}button{cursor:pointer;-webkit-tap-highlight-color:transparent;touch-action:manipulation}button:disabled{cursor:default;opacity:.4}button:focus-visible,input:focus-visible{outline:2px solid #afafaf;outline-offset:3px}button{color:inherit}svg{display:block;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}.menu-glyph{display:inline-flex;width:25px;height:25px;align-items:center;justify-content:center;flex:none;pointer-events:none}.menu-glyph>svg{width:100%;height:100%}
.overlay-demo{min-height:100svh;position:relative;display:grid;place-items:center;--overlay-ease:cubic-bezier(.22,.61,.36,1)}
.overlay-launch{width:min(288px,calc(100% - 40px));position:relative;text-align:center}.overlay-trigger{display:flex;justify-content:center;align-items:center;gap:12px;min-height:54px;width:100%;border:1px solid #ffffff16;border-radius:14px;padding:14px 16px;background:#262626;box-shadow:inset 0 1px #ffffff0c,0 3px 6px #0001;font-size:14px;color:#f1f1f1;transition:background-color 180ms ease,border-color 180ms ease}.overlay-trigger:hover{background:#323232;border-color:#858585}.overlay-feedback{position:absolute;left:0;right:0;margin:14px 0 0;color:#656565;font-size:11px;line-height:1.6;text-wrap:balance}
.overlay-panel{margin:0;color:#f1f1f1;background:#262626;border:1px solid #f3f3f320;border-radius:18px;box-shadow:inset 0 1px #ffffff09,0 14px 32px #1d1d1d24;padding:24px;max-width:none;max-height:calc(100svh - 24px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:#787878 transparent;font-size:13px;opacity:0;transition:transform 280ms var(--overlay-ease),opacity 180ms ease}
.overlay-panel h2{font-size:22px;line-height:1.18;font-weight:500;letter-spacing:-.035em;margin:14px 0 10px;padding-right:12px}.overlay-panel p{color:#c0c0c0;line-height:1.6;font-size:12px;margin:0}.overlay-panel::backdrop{background:#21212145;opacity:0;transition:opacity 220ms ease}
[data-open=true] .overlay-panel{opacity:1;transform:none}[data-open=true] .overlay-panel::backdrop{opacity:1}
.overlay-close{display:grid;place-items:center;position:absolute;right:12px;top:12px;width:30px;height:30px;border:0;border-radius:8px;background:transparent;color:#c7c7c7}.overlay-close svg{width:24px;height:24px}.overlay-close:hover{color:white;background:#ffffff08}
.overlay-emblem{display:grid;place-items:center;width:40px;height:40px;border:1px solid #b8b8b833;border-radius:12px;color:#cccccc}.overlay-emblem .menu-glyph{width:25px;height:25px}.overlay-eyebrow{font-size:9px;letter-spacing:.08em;color:#adadad;margin:4px 0 19px}
.overlay-field{display:block;margin-top:24px;color:#c5c5c5;font-size:11px}.overlay-field input{display:block;width:100%;min-width:0;min-height:42px;border:1px solid #8787876b;border-radius:9px;background:#1c1c1c;color:#f2f2f2;padding:10px 12px;font-size:13px;margin-top:8px;transition:border-color 160ms ease}.overlay-field input:focus{border-color:#bdbdbd}
.overlay-actions{display:flex;justify-content:flex-end;align-items:center;gap:8px;margin-top:24px}.overlay-actions button,.overlay-primary{border:1px solid transparent;border-radius:9px;padding:10px 12px;min-height:39px;font-size:12px;background:transparent}.overlay-actions .overlay-primary,.overlay-primary{background:#dddddd;color:#313131;border-color:#eaeaea;transition:background-color 160ms ease}.overlay-primary:hover{background:#eeeeee}
[data-overlay=modal] .overlay-panel{position:fixed;inset:0;margin:auto;width:min(310px,calc(100% - 28px));height:fit-content;transform:none;transition:none}
[data-overlay=modal][data-open=true] .overlay-panel{transform:none;transition:none}
.genie-layer{position:fixed;inset:0;width:100vw;height:100svh;max-width:none;max-height:none;margin:0;padding:0;border:0;background:transparent;overflow:hidden;pointer-events:none}
.genie-copy{pointer-events:none;backface-visibility:hidden;contain:layout paint}
.genie-copy>*{opacity:var(--genie-content,1)}
.overlay-field input:focus,.overlay-field input:focus-visible{outline:0;box-shadow:none;border-color:#c1c1c1}
.overlay-field input:focus-visible{border-color:#e0e0e0}
[data-overlay=drawer] .overlay-panel{position:fixed;inset:0 0 0 auto;width:min(300px,calc(100% - 22px));height:100svh;max-height:100svh;border-radius:18px 0 0 18px;transform:translateX(102%);transition:transform 340ms var(--overlay-ease),opacity 220ms ease;padding-top:29px}[data-overlay=drawer][data-open=true] .overlay-panel{transform:none}[data-overlay=drawer] .overlay-panel h2{font-size:23px;margin-top:0}.status-choices{border:0;padding:0;margin:23px 0 0;display:flex;gap:5px}.status-choices legend{padding:0;margin-bottom:9px;font-size:11px;color:#c5c5c5}.status-choices label{position:relative;flex:1}.status-choices input,.collection-choices input{position:absolute;opacity:0;width:1px;height:1px}.status-choices label>span{display:block;font-size:10px;text-align:center;border:1px solid #c0c0c033;border-radius:8px;padding:10px 2px;cursor:pointer;transition:background-color 160ms ease,border-color 160ms ease}.status-choices input:checked+span{background:#c7c7c717;border-color:#c7c7c78a}.status-choices input:focus-visible+span{outline:2px solid #cecece;outline-offset:2px}.drawer-note{display:flex;gap:8px;align-items:center;color:#a5a5a5;font-size:10px;margin-top:28px}.drawer-note .menu-glyph{width:17px;height:17px}
[data-overlay=sheet] .overlay-panel{position:fixed;inset:auto 0 0;width:100%;max-height:calc(100svh - 18px);border-radius:21px 21px 0 0;padding:30px 23px 22px;transform:translateY(102%);transition:transform 340ms var(--overlay-ease),opacity 190ms ease}[data-overlay=sheet][data-open=true] .overlay-panel{transform:translateY(var(--drag-y,0px))}.sheet-handle{position:absolute;top:0;left:calc(50% - 36px);width:72px;height:27px;display:grid;place-items:center;touch-action:none;cursor:grab}.sheet-handle span{width:33px;height:3px;border-radius:4px;background:#bababa75}.sheet-handle:active{cursor:grabbing}[data-dragging=true] .overlay-panel{transition:none!important}.collection-choices{border:0;padding:0;margin:18px 0}.collection-choices label{position:relative;display:flex;align-items:center;gap:12px;min-height:57px;padding:10px 0;cursor:pointer}.collection-choices label+label{border-top:1px solid #ffffff0c}.collection-choices label>.menu-glyph{color:#c4c4c4;width:23px;height:23px}.collection-choices label>span:not(.choice-ring){flex:1}.collection-choices strong{display:block;font-size:12px;font-weight:450}.collection-choices small{display:block;font-size:10px;margin-top:4px;color:#b3b3b3}.choice-ring{width:15px;height:15px;border:1px solid #8c8c8c;border-radius:50%;position:relative}.choice-ring:after{content:'';position:absolute;inset:3px;background:#d7d7d7;border-radius:50%;opacity:0;transition:opacity 170ms ease}.collection-choices input:checked+.choice-ring:after{opacity:1}.collection-choices input:focus-visible+.choice-ring{outline:2px solid #cecece;outline-offset:3px}.sheet-confirm{width:100%}
[data-overlay=popover] .overlay-launch{align-self:start;margin-top:64px}
[data-overlay=popover] .overlay-panel,[data-overlay=tooltip] .overlay-panel{position:absolute;width:min(286px,calc(100% - 28px));left:14px;top:14px;opacity:0;visibility:hidden;transform:translateY(6px);transition:transform 220ms var(--overlay-ease),opacity 160ms ease,visibility 0s 220ms;overflow:visible}
[data-overlay=popover][data-open=true] .overlay-panel,[data-overlay=tooltip][data-open=true] .overlay-panel{visibility:visible;opacity:1;transform:none;transition-delay:0s}
[data-overlay=popover] .overlay-panel{padding:23px 20px 14px}[data-overlay=popover] .overlay-panel h2{font-size:18px;margin:0 0 10px}[data-overlay=popover] .overlay-eyebrow{margin-bottom:14px}.popover-footer{display:flex;justify-content:space-between;align-items:center;gap:8px;border-top:1px solid #ffffff14;margin-top:17px;padding-top:11px}.popover-footer>span{font-size:10px;color:#b0b0b0}.popover-footer button{display:flex;align-items:center;gap:5px;background:transparent;border:1px solid #b5b5b540;border-radius:8px;padding:6px 9px;font-size:11px}.popover-footer button[aria-pressed=true]{border-color:#cfcfcf;color:#e8e8e8}.popover-footer .menu-glyph{width:17px;height:17px}
[data-overlay=tooltip] .overlay-panel{width:min(224px,calc(100% - 34px));padding:16px 18px;border-radius:12px;box-shadow:0 6px 16px #2424241f;transform:translateY(3px);transition:opacity 140ms ease,transform 180ms var(--overlay-ease),visibility 0s 180ms}[data-overlay=tooltip] .overlay-panel strong{display:block;font-size:12px;font-weight:500;margin-bottom:6px}[data-overlay=tooltip] .overlay-panel span{display:block;font-size:11px;line-height:1.55;color:#c3c3c3}[data-overlay=tooltip] .overlay-panel:after{content:'';position:absolute;left:calc(var(--arrow-x,50%) - 5px);bottom:-5px;width:9px;height:9px;background:#262626;border-right:1px solid #f3f3f320;border-bottom:1px solid #f3f3f320;transform:rotate(45deg)}[data-overlay=tooltip] [data-placement=below]:after{bottom:auto;top:-5px;transform:rotate(225deg)}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
[data-overlay=sheet] .overlay-panel{inset:auto 0 12px;margin-inline:auto;width:min(304px,calc(100% - 24px));border-radius:18px;padding:24px 18px 16px}
[data-overlay=sheet] .overlay-panel h2{font-size:20px;margin:9px 0 7px}
[data-overlay=sheet] .collection-choices{margin:10px 0 12px}
[data-overlay=sheet] .collection-choices label{min-height:47px;padding:7px 0;gap:10px}
[data-overlay=sheet] .sheet-confirm{min-height:39px;padding-block:8px}
.popover-footer .popover-pin{width:auto;padding:0;margin:0;border:0;background:transparent;box-shadow:none;--check-ink:#262626;--check-paper:#dddddd}
.popover-pin .sl-check{min-height:34px;padding:6px 9px;gap:5px;user-select:none;background:transparent;border:1px solid #b5b5b555;border-radius:8px;transition:border-color 220ms ease}
.popover-pin .sl-check:has(:checked){border-color:#cfcfcf}
.popover-pin .sl-check__box{width:20px;height:20px;background:transparent;box-shadow:none;border:0;border-radius:0;overflow:visible}
.popover-pin .sl-check__box::before{display:none}
.popover-pin .sl-check__input:checked+.sl-check__box svg{stroke:#dddddd}
.popover-pin .sl-check__input:checked+.sl-check__box .mark-icon{fill:#dddddd33}
.popover-pin .sl-check__input:focus-visible+.sl-check__box{outline:none}
.popover-pin .sl-check:has(:focus-visible){outline:1px solid #cecece;outline-offset:2px}
.popover-pin .sl-check__box svg{width:20px;height:20px}
.popover-pin .sl-check__title{display:grid;width:40px;line-height:17px;font-size:11px;font-weight:450}
.popover-pin .sl-check__title>span{grid-area:1/1;transition:opacity 180ms ease,transform 260ms var(--check-ease)}
.popover-pin .pin-on{opacity:0;transform:translateY(4px)}
.popover-pin .sl-check__input:checked~.sl-check__copy .pin-on{opacity:1;transform:none}
.popover-pin .sl-check__input:checked~.sl-check__copy .pin-off{opacity:0;transform:translateY(-4px)}
@media(max-width:290px){.overlay-panel{padding:21px 17px}.overlay-panel h2{font-size:20px}.overlay-actions{gap:4px}.overlay-actions button{padding-inline:8px;font-size:11px}[data-overlay=drawer] .overlay-panel{padding-inline:17px}[data-overlay=sheet] .overlay-panel{padding-inline:17px}.overlay-trigger{font-size:13px;gap:8px}.overlay-feedback{font-size:10px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after,*::backdrop{transition:none!important;animation:none!important}}
/* Short embedded cards are real viewports too: keep every primary action in view. */
@media(max-height:450px){
 .overlay-panel{padding:18px;max-height:calc(100svh - 24px)}
 .overlay-panel h2{font-size:20px;margin:10px 0 8px}
 .overlay-emblem{width:32px;height:32px;border-radius:10px}
 .overlay-emblem .menu-glyph{width:22px;height:22px}
 .overlay-field{margin-top:16px}
 .overlay-field input{min-height:38px;padding:8px 10px;margin-top:6px}
 .overlay-actions{margin-top:16px}
 .overlay-actions button,.overlay-primary{min-height:36px;padding:8px 10px}
 [data-overlay=drawer] .overlay-panel{padding:20px 18px 16px}
 [data-overlay=drawer] .overlay-eyebrow{margin:0 0 12px}
 [data-overlay=drawer] .overlay-panel h2{font-size:20px;margin-top:0}
 .status-choices{margin-top:16px}
 .status-choices label>span{padding:8px 2px}
 .drawer-note{margin-top:16px}
 [data-overlay=popover] .overlay-panel{max-height:calc(100svh - 24px);overflow-y:auto}
}
@media(max-height:350px){
 [data-overlay=modal] .overlay-panel{padding:16px}
 [data-overlay=modal] .overlay-panel>p{display:none}
 [data-overlay=drawer] .overlay-panel{padding:15px 17px}
 [data-overlay=drawer] .overlay-panel>p,.drawer-note{display:none}
 [data-overlay=drawer] .overlay-eyebrow{margin-bottom:8px}
 [data-overlay=drawer] .overlay-field{margin-top:12px}
 [data-overlay=drawer] .status-choices{margin-top:12px}
 [data-overlay=drawer] .overlay-actions{margin-top:14px}
 [data-overlay=sheet] .overlay-panel{padding:22px 16px 14px}
 [data-overlay=sheet] .collection-choices{margin:8px 0}
 [data-overlay=sheet] .collection-choices label{min-height:43px;padding:5px 0}
 [data-overlay=sheet] .sheet-confirm{min-height:36px}
}

`;function ee(){const E=(()=>{const t=new WeakMap;function d(p,{onChange:s}={}){if(t.has(p))return t.get(p);if(s!==void 0&&typeof s!=="function")throw new TypeError("onChange must be a function.");const x=[...p.querySelectorAll('input[type="checkbox"]')];if(!x.length)throw new TypeError("Native checkboxes are required.");const a=p.querySelector("[data-parent]");const n=[...p.querySelectorAll("[data-child]")];const e=new AbortController;let k=false;const b=()=>x.filter(c=>c!==a&&c.checked).map(c=>c.name);function h(){if(!a||!n.length)return;const c=n.filter(i=>i.checked).length;a.checked=c===n.length;a.indeterminate=c>0&&c<n.length}function v(c){if(!x.includes(c.target))return;if(c.target===a)for(const i of n){if(!i.disabled)i.checked=a.checked}h();s?.(b());p.dispatchEvent(new CustomEvent("selectionchange",{bubbles:true,detail:{values:b()}}))}const g=()=>{if(k)return;for(const c of x)c.checked=c.defaultChecked;h()};p.addEventListener("change",v,{signal:e.signal});const u=x[0].form;u?.addEventListener("reset",()=>queueMicrotask(g),{signal:e.signal});h();const _={reset:g,get values(){return b()},destroy(){k=true;e.abort();t.delete(p)}};t.set(p,_);return _}return{mount:d}})();;function H(t,d,p,s){const x=t.ownerDocument.defaultView,a="translateY(12px) scale(.96)";let n=null,e=0,k=0,b=Promise.resolve(),h=null;function v(u){e=u;n?.cancel();n=null;d.style.opacity=String(u);d.style.transform=u?"none":a}function g(u,_=false){if(n&&u===k&&!_&&!s.matches)return b;const c=n?x.getComputedStyle(d):null;const i={opacity:c?c.opacity:String(e),transform:c?c.transform:e?"none":a};h?.();h=null;n?.cancel();n=null;k=u;if(_||s.matches){v(u);return Promise.resolve()}d.style.opacity=i.opacity;d.style.transform=i.transform;n=d.animate([i,{opacity:String(u),transform:u?"none":a}],{duration:220,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"});const M=n;b=new Promise(L=>{h=L;M.finished.then(()=>{if(n!==M)return;v(u);h=null;L()}).catch(()=>{})});return b}return{run:g,get progress(){return e},destroy(){h?.();h=null;n?.cancel();n=null;d.style.removeProperty("opacity");d.style.removeProperty("transform")}}}const S=new WeakMap;function y(t,{onCommit:d}={}){if(S.has(t))return S.get(t);const p=t.ownerDocument,s=p.defaultView,x=new AbortController,a=x.signal;const n=t.querySelector("[data-trigger]"),e=t.querySelector(".overlay-panel"),k=t.querySelector("[data-feedback]"),b=t.querySelector("form"),h=t.dataset.overlay;const v=e.tagName==="DIALOG",g=h==="tooltip",u=k.textContent,_=s.matchMedia("(prefers-reduced-motion: reduce)");const c=h==="modal"?H(t,e,n,_):null;let i=false,M=false,L=0,q=false,I=false,Y=false,C=false,j=false,F,A,w=null,B=false;function N(){s.clearTimeout(F);s.clearTimeout(A)}function V(){if(h==="modal"&&e.open){const D=n.getBoundingClientRect();e.style.setProperty("--window-origin-x",D.left+D.width/2-e.offsetLeft+"px");e.style.setProperty("--window-origin-y",D.top+D.height/2-e.offsetTop+"px")}if(v)return;const r=t.getBoundingClientRect(),o=n.getBoundingClientRect(),l=e.getBoundingClientRect();const z=Math.max(12,Math.min(o.x-r.x+(o.width-l.width)/2,r.width-l.width-12));const m=o.top-r.top-l.height-12,T=o.bottom-r.top+12;const Z=m>=12?m:Math.min(T,r.height-l.height-12);e.dataset.placement=m>=12?"above":"below";e.style.left=z+"px";e.style.top=Math.max(12,Z)+"px";e.style.setProperty("--arrow-x",Math.max(14,Math.min(l.width-14,o.x-r.x+o.width/2-z))+"px")}function R(){if(M)return;N();L++;i=true;if(v&&!e.open){e.inert=false;e.showModal();e.getBoundingClientRect()}e.inert=false;e.removeAttribute("aria-hidden");V();t.dataset.open="true";c?.run(1);if(!g)n.setAttribute("aria-expanded","true");if(!g){const r=e.querySelector("input");(r||e.querySelector("[data-close]"))?.focus({preventScroll:true});if(r?.name==="project")r.select()}}function f({restoreFocus:r=true,instant:o=false}={}){N();const l=++L;i=false;t.dataset.open="false";if(!g)n.setAttribute("aria-expanded","false");if(v){if(!e.open)return;e.inert=true;const z=()=>{if(M||i||L!==l)return;const m=r&&p.hasFocus(),T=n.disabled;n.disabled=true;e.close();n.disabled=T;e.inert=false;if(m&&!T)n.focus({preventScroll:true})};if(c){c.run(0,o).then(z)}else if(o||_.matches)z();else Promise.allSettled(e.getAnimations().map(m=>m.finished)).then(z)}else{if(!g&&e.contains(t.getRootNode().activeElement)&&r)n.focus({preventScroll:true});e.inert=!g;e.setAttribute("aria-hidden","true")}}n.addEventListener("click",()=>{if(g){C=!C;j=!C;C?R():f();return}if(i)f();else R()},{signal:a});e.querySelectorAll("[data-close]").forEach(r=>r.addEventListener("click",()=>f(),{signal:a}));if(v){const r=o=>{const l=e.getBoundingClientRect();return o.clientX<l.left||o.clientX>l.right||o.clientY<l.top||o.clientY>l.bottom};e.addEventListener("cancel",o=>{o.preventDefault();f()},{signal:a});e.addEventListener("keydown",o=>{if(o.key!=="Tab"||!i)return;const l=[...e.querySelectorAll("button,input,select,textarea,[tabindex]")].filter(T=>!T.disabled&&T.tabIndex>=0&&T.getClientRects().length);const z=l[0],m=l.at(-1);if(o.shiftKey&&t.getRootNode().activeElement===z||!o.shiftKey&&t.getRootNode().activeElement===m){o.preventDefault();(o.shiftKey?m:z)?.focus({preventScroll:true})}},{signal:a});e.addEventListener("pointerdown",o=>B=o.target===e&&r(o),{signal:a});e.addEventListener("click",o=>{if(B&&o.target===e&&r(o))f();B=false},{signal:a});e.addEventListener("close",()=>{if(e.open||!i)return;i=false;t.dataset.open="false";n.setAttribute("aria-expanded","false")},{signal:a})}else{p.addEventListener("pointerdown",r=>{if(i&&!r.composedPath().includes(e)&&!r.composedPath().includes(n)){C=false;j=true;f({restoreFocus:false})}},{signal:a});p.addEventListener("keydown",r=>{if(r.key==="Escape"&&i){r.preventDefault();C=false;j=true;f()}},{signal:a});if(!g){t.addEventListener("focusout",r=>{if(i&&r.relatedTarget&&!t.contains(r.relatedTarget))f({restoreFocus:false})},{signal:a});s.addEventListener("blur",()=>{if(i)f({restoreFocus:false})},{signal:a})}}if(g){const r=()=>{s.clearTimeout(A);A=s.setTimeout(()=>{if(!q&&!I&&!Y&&!C)f({restoreFocus:false})},140)};n.addEventListener("pointerenter",o=>{if(o.pointerType==="touch")return;q=true;j=false;s.clearTimeout(A);F=s.setTimeout(()=>{if(q&&!j)R()},180)},{signal:a});n.addEventListener("pointerleave",()=>{q=false;s.clearTimeout(F);r()},{signal:a});n.addEventListener("focus",()=>{Y=true;j=false;R()},{signal:a});n.addEventListener("blur",()=>{Y=false;r()},{signal:a});e.addEventListener("pointerenter",()=>{I=true;s.clearTimeout(A)},{signal:a});e.addEventListener("pointerleave",()=>{I=false;r()},{signal:a})}b?.addEventListener("submit",r=>{r.preventDefault();const o=b.elements.namedItem("project");if(o){o.value=o.value.trim();if(!o.reportValidity())return}const l=Object.fromEntries(new s.FormData(b));k.textContent=h==="modal"?l.project+" created in this preview.":h==="drawer"?l.project+" · "+l.status+" · Saved locally.":l.collection+" selected in this preview.";if(t.dataset.success)k.textContent=t.dataset.success.replace(/\{(\w+)\}/g,(z,m)=>l[m]||"");t.dispatchEvent(new s.CustomEvent("overlaycommit",{bubbles:true,detail:l}));d?.(l);f()},{signal:a});const K=t.querySelector("[data-pin]");const U=K?E.mount(K):null;const P=t.querySelector("[data-drag-handle]");if(P){let r=function(){w=null;delete t.dataset.dragging;t.style.removeProperty("--drag-y")};P.addEventListener("pointerdown",o=>{if(!o.isPrimary||o.button!==0||!i)return;w={id:o.pointerId,y:o.clientY,dy:0};t.dataset.dragging="true";P.setPointerCapture(o.pointerId)},{signal:a});P.addEventListener("pointermove",o=>{if(!w||w.id!==o.pointerId)return;w.dy=Math.max(0,o.clientY-w.y);t.style.setProperty("--drag-y",w.dy+"px")},{signal:a});P.addEventListener("pointerup",()=>{if(!w)return;const o=w.dy>55;r();if(o)f()},{signal:a});P.addEventListener("pointercancel",r,{signal:a});P.addEventListener("lostpointercapture",r,{signal:a})}const O=new s.ResizeObserver(()=>{if(i)V()});O.observe(t);O.observe(e);_.addEventListener("change",()=>{if(!_.matches)return;if(c&&i)c.run(1,true);if(!i&&v&&e.open)f({instant:true})},{signal:a});function G(){C=false;j=true;q=I=Y=false;w=null;delete t.dataset.dragging;t.style.removeProperty("--drag-y");f({instant:true,restoreFocus:t.contains(t.getRootNode().activeElement)});b?.reset();k.textContent=u;U?.reset()}const W={open:R,close:f,reset:G,destroy(){G();if(v&&e.open)e.close();c?.destroy();U?.destroy();M=true;L++;N();O.disconnect();x.abort();S.delete(t)}};S.set(t,W);return W}return{mount(t,d){const p=y(t,d);return p}}}function ne(E,H={},{preview:S=false}={}){if(!E||typeof E.attachShadow!=="function")throw new TypeError("A DOM host is required");const y=E.shadowRoot||E.attachShadow({mode:"open"});y.innerHTML=Q;const t=E.ownerDocument.createElement("style");const d=new URL("./instrument-sans-variable.woff2",import.meta.url).href;t.textContent=$.replaceAll("./instrument-sans-variable.woff2",d)+':host{display:block;min-width:0;max-width:100%;font-family:"Instrument Sans",sans-serif}[hidden]{display:none!important}';y.prepend(t);const p=y.querySelector(".overlay-demo");if(!p){y.replaceChildren();throw new Error("Missing component root")}const s=J(E.ownerDocument,d);let x,a=false;try{const n=ee(),e={};if(X==="upload")e.input=y.querySelector('input[type="file"]');if(["like","copy","download","bookmark","playback","delete","upload","share","follow"].includes(X))e.feedback=y.querySelector("."+X+"-feedback");if(S&&typeof n.mountPreview!=="function")throw new Error("This source has no preview adapter; supply its documented application callbacks.");x=(S?n.mountPreview:n.mount)(p,{...e,...H});if(typeof x?.destroy!=="function")throw new Error("Missing source cleanup contract")}catch(n){s();y.replaceChildren();throw n}return new Proxy(x,{get(n,e){if(e==="destroy")return()=>{if(a)return;a=true;try{n.destroy()}finally{s();y.replaceChildren()}};const k=Reflect.get(n,e,n);return typeof k==="function"?k.bind(n):k}})}export{ne as mountInto,X as variant};
