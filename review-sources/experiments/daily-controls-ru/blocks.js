export function clampSplit(value){return Math.min(70,Math.max(30,Number.isFinite(value)?value:50));}
export const blocks={
  partners(t){
    t.title('Хорошая компания','Небольшой блок с выразительными знаками партнёров.');
    const brands=[['Линия','M5 18L12 4L19 18M8 12H16','Дизайн и визуальные системы'],['Контур','M5 5H19V19H5ZM10 5V14H19','Продуктовая разработка'],['Форма','M12 3L21 12L12 21L3 12ZM12 8V16M8 12H16','Исследования и стратегия']];
    const strip=t.el('div','dc-brands'),detail=t.el('div','dc-brand-detail'),descriptions=t.panels(brands.map(([label,,hint])=>{const pane=t.el('div');pane.append(t.el('strong','dc-label',label),t.el('span','dc-hint',hint));return pane;}),'dc-brand-descriptions');detail.append(descriptions.node);let active=0;
    const buttons=brands.map(([label,path],index)=>{const b=t.button('',()=>choose(index)),svg=t.glyph('check'),caption=t.el('span','dc-brand-name',label);svg.querySelector('path').setAttribute('d',path);b.className='dc-brand';b.append(svg,caption);b.setAttribute('aria-label',label);t.on(b,'pointerenter',()=>choose(index));t.on(b,'focus',()=>choose(index));strip.append(b);return b;});
    function choose(index){if(index===active)return;active=index;buttons.forEach((b,i)=>b.dataset.active=String(i===active));descriptions.select(index);}
    buttons.forEach((b,i)=>b.dataset.active=String(i===0));t.root.append(strip,detail,t.live('Вымышленные бренды и авторские SVG-знаки для примера.'));return()=>({active});
  },
  splitter(t){
    t.title('Ваше рабочее место','Потяните границу между двумя областями.');let value=50,pointer=null;const workspace=t.el('div','dc-workspace'),left=t.el('div','dc-pane'),right=t.el('div','dc-pane'),separator=t.el('div','dc-separator'),handle=t.el('span');
    left.append(t.el('span','dc-pane-label','Материалы'),t.el('span','dc-document','Макет'),t.el('span','dc-document','Тексты'),t.el('span','dc-document','Файлы'));right.append(t.el('span','dc-pane-label','Просмотр'),t.el('div','dc-mini-page'));separator.tabIndex=0;separator.setAttribute('role','separator');separator.setAttribute('aria-orientation','vertical');separator.setAttribute('aria-label','Ширина левой панели');separator.setAttribute('aria-valuemin','30');separator.setAttribute('aria-valuemax','70');separator.append(handle);workspace.append(left,separator,right);
    const status=t.live(),reset=t.button('Поровну',()=>set(50));reset.classList.add('dc-quiet');
    const position=t.spring(50,p=>workspace.style.setProperty('--split',p+'%'));
    function set(next,instant=false){value=clampSplit(next);position.move(value,instant);separator.setAttribute('aria-valuenow',String(Math.round(value)));separator.setAttribute('aria-valuetext',`${Math.round(value)} процентов слева`);status.textContent=`Слева ${Math.round(value)}%, справа ${100-Math.round(value)}%. Клавиши ← и → меняют ширину.`;}
    function release(){const current=pointer;pointer=null;if(current!==null&&separator.hasPointerCapture(current))separator.releasePointerCapture(current);workspace.dataset.dragging='false';}
    t.on(separator,'pointerdown',e=>{if(e.button!==0||pointer!==null)return;e.preventDefault();pointer=e.pointerId;separator.setPointerCapture(pointer);separator.focus();workspace.dataset.dragging='true';position.move(value,true);});
    t.on(separator,'pointermove',e=>{if(e.pointerId!==pointer)return;const box=workspace.getBoundingClientRect();set((e.clientX-box.left)/box.width*100,true);});
    for(const event of ['pointerup','pointercancel','lostpointercapture'])t.on(separator,event,e=>{if(e.pointerId===pointer){release();t.emit({value});}});t.cleanup(release);
    t.on(separator,'keydown',e=>{const next={ArrowLeft:value-5,ArrowRight:value+5,Home:30,End:70}[e.key];if(next!==undefined){e.preventDefault();set(next);t.emit({value});}});
    t.root.append(workspace,reset,status);set(50,true);return()=>({value,dragging:pointer!==null});
  },
  tracking(t){
    t.title('Статус вашего заказа','Понятные этапы от оформления до получения.');const steps=['Принят','Собран','В пути','Доставлен'],examples=[{id:'SL-2048',stage:2,date:'14 октября, 12:00–18:00'},{id:'SL-2031',stage:3,date:'Получен 10 октября'}];let selected=0;
    const rail=t.el('div','dc-segments'),indicator=t.el('span','dc-segment-indicator');indicator.setAttribute('aria-hidden','true');rail.append(indicator);rail.setAttribute('role','group');rail.setAttribute('aria-label','Пример заказа');
    const buttons=examples.map((order,index)=>{const b=t.button(order.id,()=>select(index));rail.append(b);return b;});
    const orders=t.panels(examples.map(order=>{
      const pane=t.el('div','dc-order'),details=t.el('div','dc-tracking'),icon=t.glyph('box'),label=t.el('span','dc-label',order.stage===3?'Доставлено':'Ожидаемая доставка'),date=t.el('strong','dc-arrival',order.date);details.append(icon,label,date);
      const list=t.el('ol','dc-track-list');for(const [index,name]of steps.entries()){const li=t.el('li'),dot=t.el('span','dc-track-dot'),text=t.el('span','',name);dot.setAttribute('aria-hidden','true');li.dataset.complete=String(index<=order.stage);if(index===order.stage)li.setAttribute('aria-current','step');li.append(dot,text);list.append(li);}pane.append(details,list);return pane;
    }),'dc-orders');
    const status=t.live('Локальные примеры заказов. Данные не загружаются.');
    function select(index){if(index===selected)return;selected=index;buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));indicator.style.transform=`translateX(${selected*100}%)`;orders.select(index);t.emit({order:examples[selected].id,stage:examples[selected].stage});}
    buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===0)));t.root.append(rail,orders.node,status);return()=>({order:examples[selected].id,stage:examples[selected].stage});
  }
};
