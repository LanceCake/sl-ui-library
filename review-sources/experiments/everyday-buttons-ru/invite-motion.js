import {createMotion,springStep} from './motion.js';
import {motionTokens as tokens} from './motion-tokens.js';

// Entrance belongs to the base spring. Repeats acknowledge without rewinding alpha.
export function createInviteMotion(svg,reduced){
  const base=createMotion(svg,reduced),guest=[...svg.querySelectorAll('[data-part^="guest-"]')];
  let frame=0,last=0,position=0,velocity=0,target=1,returning=false;
  function clear(){
    cancelAnimationFrame(frame);frame=0;last=0;position=velocity=0;returning=false;
    guest.forEach(path=>path.removeAttribute('transform'));
    svg.dataset.motionRunning=String(base.state.running);
  }
  function tick(now){
    frame=0;const dt=last?Math.min((now-last)/1000,tokens.maxFrameSeconds):1/60;last=now;
    [position,velocity]=springStep(position,velocity,target,dt);
    if(!returning&&position>=tokens.inviteRepeat.turn){target=0;returning=true;}
    if(returning&&Math.abs(position)<tokens.restPosition&&Math.abs(velocity)<tokens.restVelocity){clear();return;}
    guest.forEach(path=>path.setAttribute('transform',`translate(0 ${(-position*tokens.inviteRepeat.distance).toFixed(4)})`));
    frame=requestAnimationFrame(tick);svg.dataset.motionRunning='true';
  }
  return {
    move(value){clear();base.move(value);},
    play(){
      if(reduced.matches||base.state.running||base.state.position<1){base.move(1);return;}
      // Frequent clicks still invoke the real callback; only the visual pulse coalesces.
      if(frame)return;
      target=1;returning=false;last=0;frame=requestAnimationFrame(tick);svg.dataset.motionRunning='true';
    },
    reset(value=0){clear();base.reset(value);},
    reduce(){clear();base.reduce();},
    get state(){return {...base.state,running:Boolean(frame)||base.state.running};},
    destroy(){clear();base.destroy();},
  };
}
