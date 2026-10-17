/** Respect explicit Hide intent in the frozen recovery renderer during export. */
export function prepareAccountRecovery(path,source){
 if(path!=='account-core-ru/privacy.js')return source;
 const patches=[
  ["if(shown){hide();return;}","if(shown){if(t.root.hasAttribute('aria-busy'))t.cancel();hide();return;}"],
  // An older cancelled run can finish after a newer rotation starts. Its local
  // button cleanup must respect the newer operation's busy/disabled state.
  ['},rotate);rotate.disabled=!acknowledged;',"},rotate);rotate.disabled=t.root.hasAttribute('aria-busy')||!acknowledged;"],
 ];
 // Refuse missing or duplicated grammar instead of adapting an unreviewed path.
 for(const [before,after]of patches){if(source.split(before).length!==2)throw new Error('Unsupported account recovery grammar: '+path);source=source.replace(before,after);}
 return source;
}
