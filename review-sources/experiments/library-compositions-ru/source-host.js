import { previews } from '/preview-data.js';
import { translate } from './dictionary.js';

const roots = { input:'.sl-field', menu:'.menu-demo', navigation:'.nav-demo', checkbox:'.sl-check-card', toggle:'.sl-toggle', display:'.dd-demo' };
const compact = `:host{display:block;position:relative;min-width:0;font-family:'Instrument Sans',sans-serif}:host(:focus-within){z-index:6} [hidden]{display:none!important}
  :host([compact])>.sl-component{width:100%;height:auto;min-height:0;padding:0;border:0;background:transparent;box-shadow:none;gap:10px}
  :host([compact])>.sl-component .motion-button{width:100%}
  :host([compact])>.sl-component .component-status{max-width:none;min-height:0;font-size:11px}
  :host>.sl-field,:host>.menu-demo,:host>.nav-demo,:host>.sl-check-card,:host>.sl-toggle{width:100%;max-width:100%}
  :host>.menu-demo{height:100px;padding-top:0}
  :host>.menu-demo .menu-panel{top:62px;z-index:5}
  :host([dark]) .component-status,:host([dark]) .sl-field__helper{color:#bdbdbd}
  :host([dark]) .sl-component{--action-muted:#c4c4c4;--action-edge:#484848;color:#f1f1f1}
  :host([dark]) .details-panel{width:100%}
  :host([dark]) .details-panel p{background:#2b2b2b;color:#d6d6d6;font-size:14px;line-height:1.6}
  :host([no-caption]) .component-status,:host([no-caption]) .menu-feedback{display:none}
  :host([free-text]) .sl-field--textarea .sl-field__control{max-height:none}
  :host([free-text]) textarea.sl-field__input{overflow:hidden!important}
  :host([free-text]) .sl-field__counter{display:none}
  :host([compact-field]) .sl-field__helper{position:absolute;width:1px;height:1px;min-height:0;overflow:hidden;clip-path:inset(50%);margin:0}
  :host([accordion]) .motion-button{height:48px;font-size:14px;font-weight:500;text-align:left;border-radius:10px}
  :host([accordion]) .button-surface{justify-content:flex-start;padding:0 16px;gap:12px}
  :host([accordion]) .button-icon{width:18px;height:18px}
  :host([accordion]) .button-label{padding:0;white-space:normal;line-height:1.4}
  :host([accordion]) .details-panel{width:100%}
  :host([small-action]) .sl-bookmark{width:152px;height:36px;font-size:14px;font-weight:500;border-radius:9px}
  :host([small-action]) .sl-bookmark__icon{left:12px;width:16px;height:18px}
  :host([small-action]) .sl-bookmark__label{inset:0 12px 0 36px}
  :host([small-disclosure]) .sl-component .motion-button{height:40px;font-size:14px;font-weight:500;border-radius:8px}
  :host([small-disclosure]) .sl-component .button-surface{justify-content:flex-start;padding:0 12px;gap:8px}
  :host([small-disclosure]) .sl-component .button-icon{width:16px;height:16px}
  :host([link-group]) .sl-component .details-panel>div{display:grid;gap:4px;padding:8px 0}
  :host([direction-picker]) .sl-component .details-panel>div{padding:14px 0}
  :host([direction-picker]) .sl-component .details-panel p{padding:0;border:0;background:transparent;margin:0 0 12px}
  *,*::before,*::after{scrollbar-width:none}*::-webkit-scrollbar{display:none}
`;

class Source extends HTMLElement {
  constructor() { super(); this.attachShadow({mode:'open'}); }
  connectedCallback() {
    const variant = this.getAttribute('variant'), definition = previews[variant];
    if (!definition) throw new Error(`Unknown source: ${variant}`);
    this.definition = definition;
    this.shadowRoot.innerHTML = definition.markup; // Trusted, generated repository source only.
    const style = document.createElement('style'); style.textContent = definition.css + compact + (this.config?.css || '');
    this.shadowRoot.prepend(style);
    const selector = definition.rootSelector || Object.entries(roots).find(([suffix]) => variant.endsWith('-'+suffix))?.[1] || '.sl-'+variant;
    this.sourceRoot = this.shadowRoot.querySelector(selector);
    if (!this.sourceRoot) throw new Error(`Missing source root: ${variant}`);
    this.config?.prepare?.(this.shadowRoot, this.sourceRoot);
    if (this.hasAttribute('free-text')) this.shadowRoot.querySelector('textarea')?.removeAttribute('maxlength');
    translate(this.shadowRoot, this.config?.copy);
    const options = this.config?.options || {};
    this.controller = (this.config?.demo && definition.demoMount ? definition.demoMount : definition.mount)(this.sourceRoot, options);
    this.config?.ready?.(this);
    const localize = () => translate(this.shadowRoot, this.config?.copy);
    localize();
    this.observer = new MutationObserver(localize);
    this.observer.observe(this.sourceRoot, {subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','data-label','data-on','data-off']});
    if (this.hasAttribute('free-text')) {
      const input = this.shadowRoot.querySelector('textarea');
      const control = this.shadowRoot.querySelector('.sl-field__control');
      let lastHeight=60,lastWidth=0;
      const resize = () => {
        // The source controller also resizes on window changes. A hidden pane
        // has no measurable text layout; preserve its last size until revealed.
        const width=control.getBoundingClientRect().width;
        if(width){
          const style=getComputedStyle(control);
          input.style.height='0px';
          lastHeight=input.value?Math.max(60,input.scrollHeight+parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth)):60;
        }
        input.style.height='100%';input.style.overflowY='hidden';control.style.height=lastHeight+'px';
      };
      input.removeAttribute('maxlength');
      this.resize = resize; input.addEventListener('input',resize);input.addEventListener('compositionend',resize);resize();
      const reset=this.controller.reset.bind(this.controller);this.controller.reset=()=>{reset();resize();};
      const observer=new ResizeObserver(()=>{const width=control.getBoundingClientRect().width;if(width!==lastWidth){lastWidth=width;resize();}});observer.observe(this);
      window.addEventListener('resize',resize);
      this.freeTextCleanup=()=>{window.removeEventListener('resize',resize);input.removeEventListener('input',resize);input.removeEventListener('compositionend',resize);observer.disconnect();};
    }
    this.dataset.ready='true';
  }
  disconnectedCallback() { this.observer?.disconnect(); this.freeTextCleanup?.(); this.controller?.destroy(); this.config?.cleanup?.(); }
}
customElements.define('sl-source',Source);
export function source(variant, config={}) {
  const host = document.createElement('sl-source'); host.setAttribute('variant',variant); host.config=config;
  for (const attribute of config.attributes || []) host.setAttribute(attribute,'');
  return host;
}
export function action(label, callback, secondary=false, size='normal') {
  const host=document.createElement('div'); host.className='source-action action-'+size; const shadow=host.attachShadow({mode:'open'});
  const sizes={normal:{height:40,radius:10},small:{height:32,radius:8},link:{height:34,radius:6},field:{height:60,radius:13},menu:{height:52,radius:14}};
  const dimensions=sizes[size]||sizes.normal;
  const style=document.createElement('style'); style.textContent=previews.pair.css+`:host{display:block;min-width:0}.button-kit{gap:0}.bk-button{width:100%;min-width:0;font-size:${size==='small'?13:14}px;line-height:1.4;font-weight:500;height:${dimensions.height}px;border-radius:${dimensions.radius}px}.bk-button .bk-label{opacity:1;transition:none}.bk-button--cancel{color:#ededed}.bk-button--cancel .bk-surface{background:#3b3b3b;box-shadow:inset 0 1px #ffffff0d}.bk-button--cancel:hover .bk-surface{background:#484848}.bk-button:disabled{opacity:.45;cursor:default}.bk-button:disabled .bk-surface{transform:none}`+(size==='link'?`.bk-button{font-weight:400;color:#c4c4c4}.bk-button .bk-surface,.bk-button:hover .bk-surface{background:transparent;box-shadow:none}.bk-button .bk-label{justify-content:flex-start;padding:0 8px}.bk-button:hover{color:#fafafa}.bk-button:hover .bk-surface{transform:translateX(2px)}`:'');
  const kit=document.createElement('div'); kit.className='button-kit';
  const button=document.createElement('button');button.type='button';button.className='bk-button bk-button--'+(secondary?'cancel':'save');
  const surface=document.createElement('span');surface.className='bk-surface';
  const text=document.createElement('span');text.className='bk-label';text.textContent=label;
  surface.append(text);button.append(surface);kit.append(button);shadow.append(style,kit);
  button.addEventListener('click',callback);host.button=button;host.label=text;return host;
}
export function field(variant,label,placeholder='') {
  return source(variant,{attributes:variant==='textarea-input'?['free-text','compact-field']:['compact-field'],prepare(root){
    root.querySelector('.sl-field__label').textContent=label;
    root.querySelector('.sl-field__helper').textContent='';
    const input=root.querySelector('input,textarea');input.setAttribute('aria-label',label);if(placeholder)input.setAttribute('title',placeholder);
  }});
}
export const original = previews;
