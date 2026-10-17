import {field,input,action,panel,pair,choices,check,pill} from './ui.js';

export const forms={
  login(t){
    t.heading('С возвращением','Вход и восстановление в одном компактном сценарии.');
    const email=field('email-input','Электронная почта'),password=field('password-input','Пароль');
    const body=t.el('div','auth-body stack'),status=t.live('Это пример: вход в аккаунт не выполняется.');
    let recovery=false;const mode=choices(t,'Режим формы',[['login','Вход'],['recover','Восстановить']],'login',value=>{
      recovery=value==='recover';t.swap(body,()=>{password.hidden=recovery;hint.hidden=!recovery;});submit.label.textContent=recovery?'Показать результат':'Войти';status.textContent=recovery?'Укажите любой адрес для демонстрации.':'Это пример: вход в аккаунт не выполняется.';
    });
    const hint=t.el('p','auth-foot','В рабочем продукте здесь отправляется ссылка для смены пароля. Этот пример ничего не отправляет.');hint.hidden=true;
    const submit=action('Войти',()=>{
      if(!input(email).value.trim()){status.textContent='Введите адрес для примера.';input(email).focus();return;}
      if(!recovery&&!input(password).value){status.textContent='Введите пароль для примера.';input(password).focus();return;}
      status.textContent=recovery?'Предпросмотр: здесь появится подтверждение запроса. Письмо не отправлено.':'Форма заполнена. Это локальный пример, вход не выполнен.';t.enter(status);
    });
    body.append(email,password,hint);t.root.append(panel(t,mode.node,body,submit,status));
    t.on(body,'keydown',event=>{if(event.key==='Enter'&&event.composedPath()[0].tagName==='INPUT'){event.preventDefault();submit.button.click();}});
  },
  register(t){
    t.heading('Создать профиль','Знакомые поля, видимость пароля и понятная проверка.');
    const name=field('text-input','Ваше имя'),email=field('email-input','Электронная почта'),password=field('password-input','Придумайте пароль');
    const strength=t.el('div','password-strength'),caption=t.el('p','password-caption','Введите не менее 6 символов для примера.');
    strength.setAttribute('aria-hidden','true');for(let i=0;i<4;i++)strength.append(t.el('i'));
    const strengthWrap=t.el('div');strengthWrap.append(strength,caption);
    const consent=check(t,'Согласен с условиями примера',false,()=>{status.textContent='';});const status=t.live('Данные остаются в превью. Аккаунт не создаётся.');
    const fields=t.el('div','input-grid');fields.append(name,email,password,strengthWrap);
    const submit=action('Создать профиль',()=>{
      for(const host of [name,email,password])if(!input(host).value.trim()){status.textContent='Заполните все поля для примера.';input(host).focus();return;}
      if(input(password).value.length<6){status.textContent='В примере нужно не менее 6 символов пароля.';input(password).focus();return;}
      if(!consent.input.checked){status.textContent='Подтвердите условия примера.';consent.input.focus();return;}
      status.textContent=`${input(name).value}, поля заполнены. Профиль не создан, данные не отправлены.`;status.dataset.userText='';t.enter(status);
    });
    t.root.append(panel(t,fields,consent.node,submit,status));
    t.on(fields,'keydown',event=>{if(event.key==='Enter'&&event.composedPath()[0].tagName==='INPUT'){event.preventDefault();submit.button.click();}});
    t.on(password,'input',()=>{const count=Math.min(4,Math.floor(input(password).value.length/3));[...strength.children].forEach((n,i)=>n.classList.toggle('is-filled',i<count));caption.textContent=input(password).value.length>=6?'Для демонстрации длины достаточно.':'Введите не менее 6 символов для примера.';});
  },
  contact(t){
    t.heading('Давайте обсудим','Контактный блок с понятным способом связи и коротким сообщением.');
    const email=field('email-input','Ваша почта'),message=field('textarea-input','О чём хотите поговорить?');
    const status=t.live('Это пример формы. Сообщение никуда не отправляется.');
    const send=action('Проверить сообщение',()=>{for(const host of [email,message])if(!input(host).value.trim()){status.textContent='Укажите почту и напишите пару слов для примера.';input(host).focus();return;}status.textContent=`Сообщение для ${input(email).value} готово в превью. Отправки не было.`;t.enter(status);});
    const contact=t.el('div','contact-address');contact.append(t.el('strong','','hello@example.com'),t.el('p','','Обычно отвечаем в течение рабочего дня.'));
    t.root.append(panel(t,pill(t,'Есть идея?'),contact,email,message,send,status));
  },
  booking(t){
    t.heading('Выбрать время','Свободные интервалы обновляются при смене дня.');
    const dates=['Сегодня','Завтра','Позже'];let date='1',time='11:00';
    const availability=[['10:00','11:00','12:30','14:00','15:30','17:00'],['09:30','11:00','12:00','14:30','16:00','17:30'],['10:30','12:00','13:30','15:00','16:30','18:00']];
    const busy=[['12:30','15:30'],['12:00'],['13:30','16:30']];
    const slotWrap=t.el('div'),summary=t.el('div','summary-stack'),status=t.live('Выбор времени не создаёт настоящую запись.');
    function updateSummary(){t.swap(summary,()=>summary.replaceChildren(pair(t,'День',dates[Number(date)]),pair(t,'Начало',time),pair(t,'Длительность','30 минут')));status.textContent='Выбор времени не создаёт настоящую запись.';}
    function drawSlots(){slotWrap.firstElementChild?.dispose?.();const slots=choices(t,'Время встречи',availability[date].map(x=>[x,x,busy[date].includes(x)]),time,value=>{time=value;updateSummary();});slots.node.classList.add('slot-grid');slotWrap.replaceChildren(slots.node);}
    const days=choices(t,'День встречи',dates.map((x,i)=>[String(i),x]),date,value=>{date=value;time=availability[date].find(x=>!busy[date].includes(x));t.swap(slotWrap,drawSlots);updateSummary();});
    const confirm=action('Выбрать интервал',()=>{status.textContent=`Выбран пример: ${dates[Number(date)].toLowerCase()}, ${time}. Запись никуда не отправлена.`;t.enter(status);});
    drawSlots();updateSummary();t.root.append(panel(t,t.el('h2','control-heading','Выберите день'),days.node,t.el('h2','control-heading','Выберите время'),slotWrap,t.el('p','booking-caption','Недоступные интервалы приглушены.'),summary,confirm,status));
  },
};
