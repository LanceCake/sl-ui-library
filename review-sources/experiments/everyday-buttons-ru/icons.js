// Original SL geometry. Matching command topology keeps intermediate poses valid SVG.
const part=(name,d,options={})=>({part:name,d,...options});
export const definitions={
  top:[
    part('boundary',['M5 4L19 4','M4 4L20 4']),
    part('head',['M7 12L12 7L17 12','M8 10L12 6L16 10']),
    part('stem',['M12 7L12 20','M12 6L12 15']),
  ],
  more:[
    part('row-one',['M5 5L19 5','M5 6L19 6']),
    part('row-two',['M5 10L19 10','M5 12L19 12'],{from:.06}),
    part('new-row',['M8 17L12 21L16 17','M5 18L12 18L19 18'],{from:.12}),
    part('stem',['M12 14L12 21','M12 18L12 18'],{opacity:[1,0],to:.65}),
  ],
  defaults:[
    part('rails','M5 4L5 20M12 4L12 20M19 4L19 20',{opacity:[.5,.5]}),
    part('thumb-one',['M3 7L7 7','M3 12L7 12']),
    part('thumb-two',['M10 16L14 16','M10 12L14 12'],{from:.08}),
    part('thumb-three',['M17 10L21 10','M17 12L21 12'],{from:.16}),
  ],
  redo:[
    part('forward-arc',['M5 10Q5 4 12 4Q17 4 19 8','M4 9Q5 3 12 3Q18 3 20 9'],{tail:.62,transform:['rotate(0 12 12)','rotate(180 12 12)']}),
    part('forward-head',['M15 8L19 8L19 4','M16 9L20 9L20 5'],{transform:['rotate(0 12 12)','rotate(180 12 12)']}),
    part('return-arc',['M19 14Q19 20 12 20Q7 20 5 16','M20 15Q19 21 12 21Q6 21 4 15'],{tail:.62,transform:['rotate(0 12 12)','rotate(180 12 12)']}),
    part('return-head',['M9 16L5 16L5 20','M8 15L4 15L4 19'],{transform:['rotate(0 12 12)','rotate(180 12 12)']}),
  ],
  invert:[
    part('first-tile','M4 3L12 3Q13 3 13 4L13 12Q13 13 12 13L4 13Q3 13 3 12L3 4Q3 3 4 3Z',{opacity:[1,.55]}),
    part('first-check','M5 8L7 10L11 6',{draw:[1,0],to:.6}),
    part('second-tile','M12 11L20 11Q21 11 21 12L21 20Q21 21 20 21L12 21Q11 21 11 20L11 12Q11 11 12 11Z',{opacity:[.55,1]}),
    part('second-check','M13 16L15 18L19 14',{draw:[0,1],from:.18}),
  ],
  'expand-all':[
    part('top-panel',['M5 9L19 9','M5 7L19 7']),
    part('top-chevron',['M9 5L12 2L15 5','M9 1L12 4L15 1'],{from:.08}),
    part('bottom-panel',['M5 15L19 15','M5 17L19 17']),
    part('bottom-chevron',['M9 19L12 22L15 19','M9 23L12 20L15 23'],{from:.08}),
  ],
  invite:[
    part('person-head',['M12 7A3 3 0 1 1 6 7A3 3 0 1 1 12 7','M10 7A3 3 0 1 1 4 7A3 3 0 1 1 10 7']),
    part('person-shoulders',['M3 20L3 18Q3 13 9 13Q15 13 15 18L15 20','M2 20L2 18Q2 13 7 13Q12 13 12 18L12 20']),
    part('plus','M19 10L19 18M15 14L23 14',{draw:[1,0],opacity:[1,0],to:.48}),
    part('guest-head',['M23 7A3 3 0 1 1 17 7A3 3 0 1 1 23 7','M20 7A3 3 0 1 1 14 7A3 3 0 1 1 20 7'],{opacity:[0,1],from:.2}),
    part('guest-shoulders',['M16 20L16 18Q16 13 20 13Q24 13 24 18L24 20','M13 20L13 18Q13 13 17 13Q21 13 21 18L21 20'],{opacity:[0,1],from:.3}),
  ],
  signout:[
    part('exit','M11 4L5 4Q3 4 3 6L3 18Q3 20 5 20L11 20'),
    part('shaft',['M7 12L17 12','M12 12L22 12']),
    part('head',['M13 8L17 12L13 16','M18 8L22 12L18 16']),
  ],
  call:[
    part('handset','M7 3L4 5C3 11 13 21 19 20L21 17L16 14L14 16C11 15 9 13 8 10L10 8L7 3Z',{transform:['translate(0 0) rotate(0 12 12)','translate(-1 0) rotate(-12 12 12)']}),
    part('near-wave','M15 5Q19 5 19 9',{draw:[0,1],opacity:[0,1],from:.22}),
    part('far-wave','M15 1Q23 1 23 9',{draw:[0,1],opacity:[0,1],from:.42}),
  ],
  email:[
    part('outline',['M3 5L21 5L21 19L3 19Z','M5 3L17 3L17 21L5 21Z']),
    part('writing-line',['M3 6L12 12L21 6','M8 8L11 8L14 8'],{to:.7}),
    part('pencil',['M21 6L22 7L18 11L15 12L16 9Z','M21 9L22 10L15 17L12 18L13 15Z'],{opacity:[0,1],draw:[0,1],from:.5}),
    part('pencil-tip',['M15 12L16 9','M12 18L13 15'],{opacity:[0,1],from:.7}),
  ],
  support:[
    part('bubble',['M20 11Q20 19 12 19L6 19L3 22L3 11Q3 3 12 3Q20 3 20 11Z','M18 9Q18 16 11 16L6 16L3 19L3 9Q3 2 11 2Q18 2 18 9Z']),
    part('dot-one',['M7 11L7.01 11','M7 8L7.01 8'],{opacity:[1,0],to:.35}),
    part('dot-two',['M11 11L11.01 11','M10.5 8L10.51 8'],{opacity:[1,0],from:.05,to:.5}),
    part('dot-three',['M15 11L15.01 11','M14 8L14.01 8'],{opacity:[1,0],from:.12,to:.65}),
    part('reply','M12 19Q12 21 16 21L19 21L22 23L22 17Q22 13 19 13',{draw:[0,1],opacity:[0,1],from:.32}),
    part('message','M7 7L14 7M7 11L11 11',{draw:[0,1],opacity:[0,1],from:.35}),
  ],
  directions:[
    part('map','M2 5L8 3L16 5L22 3L22 20L16 22L8 20L2 22Z',{opacity:[.65,.65]}),
    part('folds','M8 3L8 20M16 5L16 22',{opacity:[.25,.25]}),
    part('route','M5 17L5 10Q5 8 8 8L17 8',{draw:[.12,1]}),
    part('route-head',['M14 5L17 8L14 11','M16 5L19 8L16 11'],{opacity:[1,0],to:.65}),
    part('endpoint','M20 7A3 3 0 1 1 14 7A3 3 0 1 1 20 7',{opacity:[0,1],draw:[0,1],from:.5}),
  ],
  calendar:[
    part('page','M4 5L20 5L20 21L4 21ZM4 9L20 9'),
    part('rings','M8 3L8 7M16 3L16 7'),
    part('plus-stem',['M12 12L12 18','M12 15L12 15'],{opacity:[1,0],to:.55}),
    part('event-one',['M9 15L15 15','M7 14L17 14'],{from:.1}),
    part('event-two','M7 18L13 18',{draw:[0,1],opacity:[0,1],from:.4}),
  ],
};
const numeric=/-?\d*\.?\d+/g;
export function interpolate(from,to,t){
  const a=from.match(numeric).map(Number);let i=0;
  return to.replace(numeric,n=>{const start=a[i++];return String(Number((start+(Number(n)-start)*t).toFixed(4)));});
}
export function icon(key){
  const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');
  const parts=definitions[key].map(def=>{const node=document.createElementNS(svg.namespaceURI,'path');node.dataset.part=def.part;node.setAttribute('pathLength','1');svg.append(node);return {def,node};});
  svg.paint=progress=>{
    const p=Math.max(0,Math.min(1,progress));svg.dataset.progress=p.toFixed(4);
    for(const {def,node}of parts){
      const t=Math.max(0,Math.min(1,(p-(def.from||0))/((def.to??1)-(def.from||0))));
      node.setAttribute('d',Array.isArray(def.d)?interpolate(...def.d,t):def.d);
      if(def.transform)node.setAttribute('transform',interpolate(...def.transform,t));
      if(def.fill)node.setAttribute('fill',def.fill);
      if(def.opacity)node.setAttribute('opacity',String(def.opacity[0]+(def.opacity[1]-def.opacity[0])*t));
      if(def.draw){node.setAttribute('stroke-dasharray','1');node.setAttribute('stroke-dashoffset',String(1-(def.draw[0]+(def.draw[1]-def.draw[0])*t)));}
      if(def.tail){const length=1-(1-def.tail)*Math.sin(Math.PI*t);node.setAttribute('stroke-dasharray',`${length} 1`);node.setAttribute('stroke-dashoffset',String(length-1));}
    }
  };
  svg.paint(0);return svg;
}
