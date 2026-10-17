export const samplePrices=Object.freeze({RUB:2490,USD:29,EUR:27});
export function pollCounts(base,selected){return base.map((n,i)=>n+(i===selected?1:0));}
export const choices={
  currency(t){
    t.title('Цена в вашей валюте','Выберите, как показывать стоимость.');let currency='RUB';
    const offer=t.el('div','dc-offer'),caption=t.el('span','dc-label','Набор для проекта'),unit=t.el('span','dc-hint','Разовая покупка'),prices=t.panels(Object.keys(samplePrices).map(code=>t.el('strong','dc-price',new Intl.NumberFormat('ru-RU',{style:'currency',currency:code,maximumFractionDigits:0}).format(samplePrices[code]))));offer.append(caption,prices.node,unit);
    const rail=t.el('div','dc-segments'),indicator=t.el('span','dc-segment-indicator');rail.style.setProperty('--segments',3);indicator.setAttribute('aria-hidden','true');rail.append(indicator);rail.setAttribute('role','group');rail.setAttribute('aria-label','Валюта цен');
    const buttons=Object.keys(samplePrices).map((code,index)=>{const button=t.button({RUB:'₽ RUB',USD:'$ USD',EUR:'€ EUR'}[code],()=>select(code,index));rail.append(button);return button;});
    const status=t.live('Фиксированные цены примера, не курс валют.');
    function select(code,index){if(code===currency)return;currency=code;buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));indicator.style.transform=`translateX(${index*100}%)`;prices.select(index);t.emit({currency,price:samplePrices[currency]});}
    buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===0)));t.root.append(offer,rail,status);return()=>({currency,price:samplePrices[currency]});
  },
  payment(t){
    t.title('Как вам удобнее?','Выберите способ оплаты заказа.');let method='card';const group=t.el('div','dc-options');group.setAttribute('role','radiogroup');group.setAttribute('aria-label','Способ оплаты');
    const values=[['card','Банковской картой','Онлайн, после оформления','card'],['receipt','При получении','Оплатить при доставке','cash']];
    const buttons=values.map(([value,label,hint,icon],index)=>{const button=t.button('',()=>select(value),icon),copy=t.el('span','dc-option-copy'),name=t.el('span','dc-label',label),sub=t.el('span','dc-hint',hint),dot=t.el('span','dc-radio');dot.setAttribute('aria-hidden','true');copy.append(name,sub);button.className='dc-payment';button.setAttribute('role','radio');button.append(copy,dot);t.on(button,'keydown',e=>{let next;if(['ArrowRight','ArrowDown','ArrowLeft','ArrowUp'].includes(e.key))next=(index+1)%2;if(e.key==='Home')next=0;if(e.key==='End')next=1;if(next!==undefined){e.preventDefault();select(values[next][0]);buttons[next].focus();}});group.append(button);return button;});
    const status=t.live('Платёж не выполняется. Заказ не оформляется.');function select(value){const changed=value!==method;method=value;buttons.forEach((b,i)=>{const selected=values[i][0]===method;b.setAttribute('aria-checked',String(selected));b.tabIndex=selected?0:-1;});if(changed)t.emit({method});}
    t.root.append(group,status);select(method);return()=>({method});
  },
  poll(t){
    t.title('Что показать следующим?','Один ответ — один голос в локальном примере.');const labels=['Практические примеры','Разборы интерфейсов','Небольшие уроки'],base=[18,12,10];let selected=null,voted=false;
    const group=t.el('div','dc-poll');group.setAttribute('role','radiogroup');group.setAttribute('aria-label','Вариант ответа');
    const buttons=labels.map((label,index)=>{const b=t.button('',()=>{if(voted)return;selected=index;paint();}),bar=t.el('span','dc-poll-bar'),dot=t.el('span','dc-poll-choice'),name=t.el('span','dc-poll-name',label),value=t.el('span','dc-poll-percent');bar.setAttribute('aria-hidden','true');dot.setAttribute('aria-hidden','true');value.setAttribute('aria-hidden','true');b.className='dc-poll-option';b.setAttribute('role','radio');b.append(bar,dot,name,value);t.on(b,'keydown',e=>{if(voted)return;let next;if(['ArrowRight','ArrowDown'].includes(e.key))next=(index+1)%3;if(['ArrowLeft','ArrowUp'].includes(e.key))next=(index+2)%3;if(e.key==='Home')next=0;if(e.key==='End')next=2;if(next!==undefined){e.preventDefault();selected=next;paint();buttons[next].focus();}});group.append(b);return b;});
    const status=t.live('Результаты демонстрационные. Голоса не отправляются.');
    const action=t.button('',()=>{if(voted){voted=false;selected=null;}else if(selected!==null)voted=true;paint();t.emit({selected,voted,counts:pollCounts(base,voted?selected:null)});}),actionLabel=t.el('span','','Проголосовать');action.append(actionLabel);
    function paint(){const counts=pollCounts(base,voted?selected:null),total=counts.reduce((a,b)=>a+b,0);group.dataset.results=String(voted);buttons.forEach((b,i)=>{b.setAttribute('aria-checked',String(selected===i));b.setAttribute('aria-disabled',String(voted));b.tabIndex=i===(selected??0)?0:-1;b.querySelector('.dc-poll-bar').style.transform=`scaleX(${voted?counts[i]/total:0})`;b.querySelector('.dc-poll-percent').textContent=voted?`${Math.round(counts[i]/total*100)}%`:'';b.setAttribute('aria-label',labels[i]+(voted?`, ${counts[i]} из ${total} голосов`:''));});actionLabel.textContent=voted?'Отменить голос':'Проголосовать';action.disabled=selected===null;status.textContent=voted?`${total} голос в примере, включая ваш. Ничего не отправлено.`:'Результаты демонстрационные. Голоса не отправляются.';}
    t.root.append(group,action,status);paint();return()=>({selected,voted,counts:pollCounts(base,voted?selected:null)});
  },
  hours(t){
    t.title('Загляните к нам','Расписание небольшой студии.');let day=0;const labels=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],full=['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
    const week=t.el('div','dc-week');week.setAttribute('role','group');week.setAttribute('aria-label','Дни недели');const buttons=labels.map((label,index)=>{const b=t.button(label,()=>select(index));b.setAttribute('aria-label',full[index]);week.append(b);return b;});
    const detail=t.el('div','dc-hours'),icon=t.glyph('clock'),copy=t.el('div'),name=t.el('span','dc-label'),time=t.el('strong','dc-time-value'),hint=t.el('span','dc-hint');copy.append(name,time,hint);detail.append(icon,copy);
    function select(index){day=index;buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===day)));name.textContent=full[day];time.textContent=day===6?'Выходной':day===5?'11:00 — 16:00':'10:00 — 19:00';hint.textContent=day===6?'Будем рады вам в понедельник':'По местному времени';t.animate(detail,[{opacity:.4,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}]);t.emit({day,hours:time.textContent});}
    t.root.append(week,detail,t.live('Пример расписания, не статус реальной студии.'));select(day);return()=>({day,hours:time.textContent});
  }
};
