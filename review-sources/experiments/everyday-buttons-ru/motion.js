import {motionTokens as tokens} from './motion-tokens.js';
const omega=Math.sqrt(tokens.spatial.stiffness/tokens.spatial.mass);

// Exact critically damped integration: frame-rate independent, velocity survives reversal.
export function springStep(position,velocity,target,seconds,frequency=omega){
  const delta=position-target,c=velocity+frequency*delta,decay=Math.exp(-frequency*seconds);
  return [target+(delta+c*seconds)*decay,(velocity-frequency*c*seconds)*decay];
}

export function createMotion(svg,reduced,{stiffness=tokens.spatial.stiffness}={}){
  const frequency=Math.sqrt(stiffness/tokens.spatial.mass);
  let position=0,velocity=0,target=0,frame=0,last=0,replaying=false,destroyed=false;
  const paint=()=>{svg.paint(position);svg.dataset.motionRunning=String(Boolean(frame));};
  const stop=()=>{cancelAnimationFrame(frame);frame=0;last=0;};
  function tick(now){
    frame=0;if(destroyed)return;
    const seconds=last?Math.min(tokens.maxFrameSeconds,(now-last)/1000):1/60;last=now;
    [position,velocity]=springStep(position,velocity,target,seconds,frequency);
    if(replaying&&position<tokens.replayTurn){target=1;replaying=false;}
    if(Math.abs(position-target)<tokens.restPosition&&Math.abs(velocity)<tokens.restVelocity){position=target;velocity=0;last=0;}
    else frame=requestAnimationFrame(tick);
    paint();
  }
  function move(value){
    if(destroyed)return;target=Math.max(0,Math.min(1,value));replaying=false;
    if(reduced.matches){stop();position=target;velocity=0;paint();return;}
    if(!frame&&(Math.abs(position-target)>tokens.restPosition||Math.abs(velocity)>tokens.restVelocity)){frame=requestAnimationFrame(tick);paint();}
  }
  paint();
  return {
    move,
    play(){
      if(destroyed)return;
      if(reduced.matches||position<.9){move(1);return;}
      target=tokens.replayRetreat;replaying=true;
      if(!frame)frame=requestAnimationFrame(tick);paint();
    },
    reset(value=0){if(destroyed)return;stop();position=target=value;velocity=0;replaying=false;paint();},
    reduce(){if(reduced.matches){if(replaying)target=1;replaying=false;stop();position=target;velocity=0;paint();}},
    get state(){return {position,velocity,target,running:Boolean(frame)};},
    destroy(){destroyed=true;stop();svg.dataset.motionRunning='false';},
  };
}
