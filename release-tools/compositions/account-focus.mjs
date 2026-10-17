/** Patch only the frozen, audited account source grammar during portable export. */
export function prepareAccountFocus(path,source){
 const once=(before,after)=>{if(source.split(before).length!==2)throw new Error('Unsupported account focus grammar: '+path+' / '+before);source=source.replace(before,after);};
 if(path==='account-core-ru/runtime.js'){
  once("  function cancel(){",`  const ownsFocus=()=>{const active=root.getRootNode().activeElement;return active===root||root.contains(active);};
  let applying=false,actionOwnsFocus=true;
  function focus(node,options){if(node?.isConnected&&(!applying||(actionOwnsFocus&&ownsFocus())))node.focus(options);}
  function restoreFocus(operation){if(!operation.parked)return;requestAnimationFrame(()=>{const button=operation.button;if(!destroyed&&!pending&&root.isConnected&&root.getRootNode().activeElement===root&&button?.isConnected&&!button.disabled&&!button.closest('[inert]')&&button.checkVisibility({checkVisibilityCSS:true}))button.focus({preventScroll:true});});}
  function cancel(){`);
  once("root.removeAttribute('aria-busy');}\n  function dispose()","root.removeAttribute('aria-busy');restoreFocus(p);}\n  function dispose()");
  once("root.className='account-control';root.dataset.kind=key;","root.className='account-control';root.dataset.kind=key;root.tabIndex=-1;root.setAttribute('role','group');");
  once('const t={root,options,el,glyph,on,reduced,signal:', 'const t={root,options,el,glyph,on,reduced,focus,signal:');
  once("title(title,hint,icon='user'){const head=", "title(title,hint,icon='user'){root.setAttribute('aria-label',title);const head=");
  once("pending=operation;root.setAttribute('aria-busy','true');if(button){button.disabled=true;", "pending=operation;if(button?.getRootNode().activeElement===button){root.focus({preventScroll:true});operation.parked=root.getRootNode().activeElement===root;}root.setAttribute('aria-busy','true');if(button){button.disabled=true;");
  once("apply(result);t.say(","actionOwnsFocus=ownsFocus();applying=true;try{apply(result);}finally{applying=false;}t.say(");
  once("button.removeAttribute('aria-busy');}}}","button.removeAttribute('aria-busy');}restoreFocus(operation);}}");
 }
 // These targets occur in the reviewed core renderers' synchronous completion
 // callbacks and their shared editor-close helpers. Outside apply(), behavior is
 // unchanged. No document-level key or focus listener is installed.
 const targets={
  'account-core-ru/profile.js':{'code.input':3,request:2},
  'account-core-ru/access.js':{others:2,name:2,button:1,add:1},
  'account-core-ru/privacy.js':{action:2,add:2,undo:1},
 }[path];
 if(targets)for(const [target,count]of Object.entries(targets)){
  const escaped=target.replaceAll('.','\\.');
  const pattern=new RegExp('(?<![\\w.])'+escaped+'\\.focus\\(([^)]*)\\)','g');
  const matches=[...source.matchAll(pattern)];
  if(matches.length!==count)throw new Error('Unsupported account focus targets: '+path+' / '+target);
  source=source.replace(pattern,(_match,args)=>'t.focus('+target+(args?','+args:'')+')');
 }
 return source;
}
