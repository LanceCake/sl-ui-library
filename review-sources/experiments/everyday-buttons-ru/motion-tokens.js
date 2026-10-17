// M3 default spatial stiffness; SL uses critical damping for quiet, reversible controls.
export const motionTokens=Object.freeze({
  spatial:Object.freeze({stiffness:700,mass:1,dampingRatio:1}),
  // Deliberate two-stage actions use M3 slow spatial stiffness, critically damped.
  purposes:Object.freeze({redo:Object.freeze({stiffness:300}),signout:Object.freeze({stiffness:300})}),
  inviteRepeat:Object.freeze({distance:1.5,turn:.8}),
  restPosition:.0005,restVelocity:.008,maxFrameSeconds:.064,
  anticipation:.12,replayRetreat:.58,replayTurn:.66,
});
