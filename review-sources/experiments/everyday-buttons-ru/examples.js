// Preview-only effects. External-intent buttons never launch protocols or claim server success.
export function example(key){
  const sample=document.createElement('div');sample.className='example-sample';sample.setAttribute('aria-label','Локальный пример');
  let count=3,active=false;
  const el=(tag,text,cls='')=>{const n=document.createElement(tag);n.className=cls;n.textContent=text;return n;};
  const message=text=>({message:text});
  if(key==='top'){
    sample.classList.add('scroll-example');sample.tabIndex=0;sample.setAttribute('aria-label','Прокручиваемый пример страницы');
    for(const text of ['Начало страницы','Содержание','Ниже по странице'])sample.append(el('p',text));
    return {sample,ready(){sample.scrollTop=sample.scrollHeight;},run(){sample.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});return message('Вернулись к началу примера.');}};
  }
  if(key==='more'){
    sample.classList.add('more-example');const draw=()=>{let entered=0;while(sample.children.length<count){const row=el('span',['Главная','Студия','Услуги','Работы','Блог','Отзывы','Связь','Помощь','Новости'][sample.children.length],'sample-chip arriving');row.style.setProperty('--arrival-delay',`${entered++*35}ms`);sample.append(row);}};draw();
    return {sample,run(){count=Math.min(9,count+3);draw();return {message:count===9?'Все 9 элементов показаны.':`Показано ${count} из 9 элементов.`,disabled:count===9};}};
  }
  if(key==='defaults'){
    sample.classList.add('settings-example');const widths=[78,35,65];['Размер','Интервал','Плотность'].forEach((name,i)=>{const row=el('div','');row.append(el('span',name));const track=el('i',''),fill=el('i','');fill.style.width=widths[i]+'%';track.append(fill);row.append(track);sample.append(row);});
    return {sample,run(){sample.querySelectorAll('i i').forEach(n=>n.style.width='50%');return {message:'Исходные значения восстановлены в примере.',disabled:true};}};
  }
  if(key==='redo'){
    sample.append(el('span','Заголовок страницы','redo-sample'));return {sample,run(){sample.dataset.restored='true';return {message:'Отменённый заголовок возвращён.'};}};
  }
  if(key==='invert'){
    let choices=[true,false,true];['Главная','Работы','Контакты'].forEach((name,i)=>{const n=el('span',name,'sample-chip selection-chip');n.dataset.selected=String(choices[i]);sample.append(n);});
    return {sample,run(){choices=choices.map(x=>!x);[...sample.children].forEach((n,i)=>n.dataset.selected=String(choices[i]));return {active:choices[1],message:`Выбрано: ${choices.map((x,i)=>x?sample.children[i].textContent:null).filter(Boolean).join(', ')}.`};}};
  }
  if(key==='expand-all'){
    sample.classList.add('fold-example');for(const [title,text]of [['Доставка','Курьером или в пункт выдачи.'],['Оплата','Картой или при получении.']]){const row=el('div',''),heading=el('strong',title),fold=el('div','','sample-fold'),inner=el('div',text);fold.inert=true;fold.setAttribute('aria-hidden','true');fold.append(inner);row.append(heading,fold);sample.append(row);}
    return {sample,run(){active=!active;sample.dataset.expanded=String(active);sample.querySelectorAll('.sample-fold').forEach(n=>{n.inert=!active;n.setAttribute('aria-hidden',String(!active));});return {active,message:active?'Оба раздела раскрыты.':'Оба раздела свёрнуты.'};}};
  }
  const external={
    invite:['Приглашение в команду','В приложении здесь отправится приглашение. В примере ничего не отправлено.'],
    signout:['Текущая сессия','В приложении здесь завершится сессия. Вы не вышли из аккаунта.'],
    call:['Контактный номер','В приложении откроется звонок. В примере звонок не запускается.'],
    email:['hello@example.com','В приложении откроется новое письмо. В примере почта не запускается.'],
    support:['Нужна помощь?','В приложении откроется чат поддержки. Здесь показано только действие.'],
    directions:['Адрес организации','В приложении откроется маршрут. Геолокация не запрашивается.'],
    calendar:['Встреча · 30 минут','В приложении откроется добавление события. Календарь не изменён.'],
  };
  const [context,feedback]=external[key];sample.append(el('span',context,'sample-context'));
  return {sample,run(){return message(feedback);}};
}
