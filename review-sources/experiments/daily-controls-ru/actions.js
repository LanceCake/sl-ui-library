export const actions={
  paste(t){
    t.title('Текст — в один клик','Вставка в текущую позицию, без потери остального текста.');
    const {wrap,input}=t.field('Заметка'),status=t.live(t.options.demo?'Локальный пример. Буфер обмена не читается.':'Подключите onPaste для чтения буфера.');
    input.placeholder='Начните писать…';let busy=false,completed=false;
    const action=t.button('Вставить',async()=>{
      if(busy)return;
      if(!t.options.onPaste&&!t.options.demo){status.textContent='Чтение буфера не подключено.';return;}
      busy=true;action.disabled=true;action.setAttribute('aria-busy','true');const start=input.selectionStart,end=input.selectionEnd,original=input.value;
      try{
        const text=t.options.onPaste?await t.options.onPaste({signal:t.signal}):'Новая идея для проекта';
        if(t.signal.aborted)return;if(typeof text!=='string')throw new TypeError('Expected text');
        if(input.value!==original){status.textContent='Текст изменился. Вставьте ещё раз в новую позицию.';return;}
        input.setRangeText(text,start,end,'end');completed=true;action.dataset.done='true';status.textContent=t.options.demo&&!t.options.onPaste?'Текст примера вставлен. Буфер обмена не читался.':'Текст вставлен.';
        input.focus();t.animate(action.querySelector('svg'),[{transform:'translateY(-5px)',opacity:.25},{transform:'translateY(0)',opacity:1}]);t.emit({value:input.value});
      }catch{if(!t.signal.aborted)status.textContent='Не удалось вставить. Текст сохранён.';}
      finally{if(!t.signal.aborted){busy=false;action.disabled=false;action.removeAttribute('aria-busy');}}
    },'paste');
    const row=t.el('div','dc-actions');row.append(action);t.root.append(wrap,row,status);
    t.on(input,'input',()=>{completed=false;action.dataset.done='false';t.emit({value:input.value});});
    return()=>({value:input.value,busy,completed});
  },
  cut(t){
    t.title('Вырезать, не потерять','Выделите часть строки или используйте выделенный пример.');
    const {wrap,input}=t.field('Фрагмент','text','Заголовок для новой страницы'),status=t.live(t.options.demo?'Локальный пример. Буфер обмена не изменяется.':'Подключите onCut для записи в буфер.');
    let range=[0,9],backup=null,busy=false;input.setSelectionRange(...range);
    const remember=()=>{if(input.selectionStart!==input.selectionEnd)range=[input.selectionStart,input.selectionEnd];};
    t.on(input,'select',remember);t.on(input,'keyup',remember);t.on(input,'pointerup',remember);
    const action=t.button('Вырезать',async()=>{
      if(busy)return;if(!t.options.onCut&&!t.options.demo){status.textContent='Запись в буфер не подключена.';return;}
      const original=input.value,[start,end]=range,text=original.slice(start,end);
      if(!text){status.textContent='Сначала выделите фрагмент.';input.focus();return;}
      busy=true;action.disabled=true;action.setAttribute('aria-busy','true');
      try{
        if(t.options.onCut)await t.options.onCut(text,{signal:t.signal});if(t.signal.aborted)return;
        if(input.value!==original){status.textContent='Текст изменился. Вырезание отменено.';return;}
        backup=original;input.setRangeText('',start,end,'start');range=[start,start];restore.disabled=false;
        status.textContent=t.options.demo&&!t.options.onCut?'Фрагмент убран в примере. Буфер обмена не изменён.':'Фрагмент записан в буфер и вырезан.';
        input.focus();t.animate(action.querySelector('svg'),[{transform:'rotate(-16deg) scale(.9)'},{transform:'rotate(0deg) scale(1)'}]);t.emit({value:input.value});
      }catch{if(!t.signal.aborted)status.textContent='Не удалось вырезать. Исходный текст сохранён.';}
      finally{if(!t.signal.aborted){busy=false;action.disabled=false;action.removeAttribute('aria-busy');}}
    },'cut');
    const restore=t.button('Вернуть',()=>{if(backup===null)return;input.value=backup;backup=null;range=[0,9];restore.disabled=true;status.textContent='Исходный текст восстановлен.';input.focus();input.setSelectionRange(...range);t.emit({value:input.value});},'undo');restore.classList.add('dc-quiet');restore.disabled=true;
    t.on(input,'input',()=>{range=[input.selectionStart,input.selectionEnd];backup=null;restore.disabled=true;});
    const row=t.el('div','dc-actions');row.append(action,restore);t.root.append(wrap,row,status);return()=>({value:input.value,busy,canRestore:backup!==null});
  },
  signature(t){
    t.title('Ваша подпись','Нарисуйте подпись и добавьте имя под ней.');
    const toolbar=t.el('div','dc-segments'),indicator=t.el('span','dc-segment-indicator');indicator.setAttribute('aria-hidden','true');toolbar.append(indicator);toolbar.setAttribute('role','group');toolbar.setAttribute('aria-label','Способ ввода подписи');
    const drawButton=t.button('Нарисовать',()=>setMode('draw'),'pen'),typeButton=t.button('Ввести имя',()=>setMode('type'));toolbar.append(drawButton,typeButton);
    const panel=t.el('div','dc-signature'),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 280 120');svg.setAttribute('aria-label','Рисунок подписи. Имя вводится отдельно под ним.');svg.setAttribute('role','img');
    const guide=t.el('span','dc-signature-guide','Ваша подпись'),typed=t.el('span','dc-signature-name'),{wrap,input}=t.field('Имя и фамилия'),status=t.live('Пример поля, не юридическая подпись.'),reveal=t.el('div','dc-reveal'),inner=t.el('div','dc-reveal-inner');inner.append(wrap);reveal.append(inner);input.autocomplete='name';typed.hidden=true;
    panel.append(svg,guide);let mode='draw',paths=[],pointer=null,path=null,points=[];
    function setMode(next){if(pointer!==null)release();mode=next;panel.dataset.mode=mode;drawButton.setAttribute('aria-pressed',String(mode==='draw'));typeButton.setAttribute('aria-pressed',String(mode==='type'));indicator.style.transform=`translateX(${mode==='draw'?0:100}%)`;reveal.dataset.open=String(mode==='type');reveal.inert=mode!=='type';reveal.setAttribute('aria-hidden',String(mode!=='type'));paintGuide();t.emit({mode,hasSignature:hasSignature()});}
    function hasSignature(){return paths.length>0||input.value.trim().length>0;}
    function paintGuide(){guide.hidden=paths.length>0;typed.hidden=!input.value.trim();clear.disabled=!paths.length&&!input.value;}
    function coordinate(e){const matrix=svg.getScreenCTM();if(!matrix)return null;const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(matrix.inverse());return [Math.max(0,Math.min(280,p.x)),Math.max(0,Math.min(120,p.y))];}
    function release(){const current=pointer;pointer=null;path=null;if(current!==null&&svg.hasPointerCapture(current))svg.releasePointerCapture(current);}
    t.on(svg,'pointerdown',e=>{if(mode!=='draw'||e.button!==0||pointer!==null)return;const p=coordinate(e);if(!p)return;e.preventDefault();pointer=e.pointerId;svg.setPointerCapture(pointer);points=[p];path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',`M${p[0]} ${p[1]}l.1 .1`);svg.append(path);paths.push(path);paintGuide();});
    t.on(svg,'pointermove',e=>{if(e.pointerId!==pointer||!path)return;const p=coordinate(e);if(!p)return;points.push(p);path.setAttribute('d',points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' '));});
    for(const event of ['pointerup','pointercancel','lostpointercapture'])t.on(svg,event,e=>{if(e.pointerId===pointer){release();t.emit({mode,hasSignature:hasSignature()});}});t.cleanup(release);
    const clear=t.button('Очистить',()=>{release();paths.forEach(p=>p.remove());paths=[];input.value='';typed.textContent='';paintGuide();status.textContent='Подпись очищена. Пример не сохраняется.';t.emit({mode,hasSignature:false});});clear.classList.add('dc-quiet');clear.disabled=true;
    t.on(input,'input',()=>{typed.textContent=input.value;paintGuide();t.emit({mode,hasSignature:hasSignature()});});
    t.root.append(toolbar,panel,typed,reveal,clear,status);setMode('draw');return()=>({mode,hasSignature:hasSignature(),strokes:paths.length});
  }
};
