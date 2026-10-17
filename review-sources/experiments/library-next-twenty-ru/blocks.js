import {action,panel,actions,pair,choices,pill,rub} from './ui.js';

export const blocks={
  pricing(t){
    t.heading('План для вашей работы','Переключайте период: сумма и условия меняются вместе.');
    let yearly=false;const body=t.el('div','price-body'),status=t.live('Выберите период и посмотрите итог. Оплаты здесь нет.');
    function paint(){const price=t.el('div','price-value',rub(yearly?790:990));price.append(t.el('small','','/ месяц'));const list=t.el('ul','feature-list');for(const item of ['Все материалы библиотеки','Личные коллекции','Новые подборки каждый месяц'])list.append(t.el('li','',item));body.replaceChildren(price,t.el('p','',yearly?`${rub(9480)} за год · экономия ${rub(2400)}`:`${rub(990)} списывается ежемесячно в реальном продукте`),list);status.textContent='Выберите период и посмотрите итог. Оплаты здесь нет.';}
    const billing=choices(t,'Период оплаты',[['month','Месяц'],['year','Год']],'month',value=>{yearly=value==='year';t.swap(body,paint);});
    const confirm=action('Выбрать план',()=>{status.textContent=`Выбран пример: ${yearly?'годовой':'месячный'} план за ${rub(yearly?9480:990)}. Оплата не выполнялась.`;t.enter(status);});
    paint();t.root.append(panel(t,pill(t,'Для самостоятельной работы'),billing.node,body,confirm,status));
  },
  comparison(t){
    t.heading('Что входит в план','Сравните возможности без широкой таблицы и мелкого текста.');
    const plans={basic:['Базовый',0,'5 проектов','Личные','Вручную','Нет'],pro:['Про',990,'Без ограничений','Совместные','Автоматически','Есть']};
    let selected='basic';const rows=t.el('div','compare-rows'),status=t.live('Оба плана показаны для примера.');
    function paint(){const p=plans[selected];rows.replaceChildren(pair(t,'Стоимость в месяц',rub(p[1])),...['Проекты','Коллекции','Обновления','История версий'].map((label,i)=>pair(t,label,p[i+2])));status.textContent='Оба плана показаны для примера.';}
    const selector=choices(t,'Сравниваемый план',[['basic','Базовый'],['pro','Про']],'basic',value=>{selected=value;t.swap(rows,paint);});
    const button=action('Выбрать базовый',()=>{status.textContent=`Выбран план «${plans[selected][0]}» только в этом превью.`;t.enter(status);});
    const originalChange=selector.node; t.on(originalChange,'click',()=>{button.label.textContent=selected==='basic'?'Выбрать базовый':'Выбрать Про';});t.on(originalChange,'keydown',()=>{button.label.textContent=selected==='basic'?'Выбрать базовый':'Выбрать Про';});
    paint();t.root.append(panel(t,selector.node,rows,button,status));
  },
  testimonials(t){
    t.heading('Говорят о работе','Спокойная смена отзывов без автопрокрутки.');
    const reviews=[
      ['«Собрала прототип за вечер. Все состояния уже продуманы — осталось настроить детали.»','Анна Морозова','Дизайнер продукта','АМ'],
      ['«Удобно начать с готового поведения, а не тратить время на очередное раскрывающееся меню.»','Илья Власов','Разработчик интерфейсов','ИВ'],
      ['«На узком экране всё осталось читаемым. Именно таких небольших деталей обычно не хватает.»','Мария Белова','Арт-директор','МБ'],
    ];let index=0;const body=t.el('div','quote-body'),status=t.live('Демонстрационные отзывы, не цитаты реальных клиентов.');
    function paint(){const r=reviews[index],person=t.el('div','person'),details=t.el('div');details.append(t.el('strong','',r[1]),t.el('p','',r[2]));person.append(t.el('span','avatar',r[3]),details);body.replaceChildren(t.el('blockquote','',r[0]),person);counter.textContent=`${index+1} из ${reviews.length}`;}
    const counter=t.el('span','next-pill');const controls=actions(t,action('Назад',()=>{index=(index+2)%3;t.swap(body,paint);},true),action('Далее',()=>{index=(index+1)%3;t.swap(body,paint);},true));
    paint();t.root.append(panel(t,counter,body,controls,status));
    t.on(body,'keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();index=(index+(event.key==='ArrowRight'?1:2))%3;t.swap(body,paint);}});body.tabIndex=0;body.setAttribute('aria-label','Отзыв. Стрелки влево и вправо меняют отзыв.');body.setAttribute('aria-live','polite');
  },
  team(t){
    t.heading('Люди за проектом','Короткое знакомство с командой и отдельное действие.');
    const people={anna:['Анна Морозова','Дизайн продукта','АМ','Собирает понятные интерфейсы и следит за деталями каждого состояния.','anna@example.com'],ilya:['Илья Власов','Разработка','ИВ','Отвечает за доступность, скорость и аккуратную работу на любом экране.','ilya@example.com'],maria:['Мария Белова','Арт-дирекция','МБ','Помогает найти визуальный язык и удерживает единый стиль во всём продукте.','maria@example.com']};
    let selected='anna';const detail=t.el('div','member-detail'),status=t.live('Имена и контакты демонстрационные.');
    function paint(){const p=people[selected],person=t.el('div','person'),copy=t.el('div');copy.append(t.el('strong','',p[0]),t.el('p','',p[1]));person.append(t.el('span','avatar',p[2]),copy);detail.replaceChildren(person,t.el('p','',p[3]));status.textContent='Имена и контакты демонстрационные.';}
    const selector=choices(t,'Участник команды',[['anna','Анна'],['ilya','Илья'],['maria','Мария']],'anna',value=>{selected=value;t.swap(detail,paint);});
    paint();t.root.append(panel(t,selector.node,detail,action('Показать контакт',()=>{status.textContent=`Контакт примера: ${people[selected][4]}. Сообщение не отправлено.`;t.enter(status);},true),status));
  },
  metrics(t){
    t.heading('Обзор посещений','Период, сумма и график всегда показывают одни и те же данные.');
    const data={week:[144,172,158,181,169,204,220],month:[480,612,704,576,860,934,842]};
    const labels={week:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'],month:['1–4','5–8','9–12','13–16','17–20','21–24','25–30']};
    let selected='week';const total=t.el('p','metric-value'),chart=t.el('div','bars'),caption=t.el('p','chart-caption'),detail=t.el('div','summary-stack'),status=t.live('Пример набора данных, не настоящая аналитика.');
    chart.setAttribute('role','img');const columns=Array.from({length:7},()=>{const col=t.el('div','bar-column'),bar=t.el('i'),label=t.el('span');col.append(bar,label);chart.append(col);return {bar,label};});
    const scale=t.el('div','chart-scale');scale.setAttribute('aria-hidden','true');const plot=t.el('div','chart-plot');plot.append(scale,chart);
    function paint(){const values=data[selected],sum=values.reduce((a,b)=>a+b,0),max=Math.max(...values);t.swap(total,()=>{total.textContent=new Intl.NumberFormat('ru-RU').format(sum);});scale.replaceChildren(t.el('span','',String(max)),t.el('span','',String(Math.round(max/2))),t.el('span','','0'));columns.forEach((c,i)=>{c.bar.style.height=`${Math.round(values[i]/max*85)}px`;c.bar.dataset.peak=String(values[i]===max);c.label.textContent=labels[selected][i];});chart.setAttribute('aria-label',`Просмотры: ${values.map((v,i)=>`${labels[selected][i]} — ${v}`).join('; ')}. Итого ${sum}.`);caption.textContent=selected==='week'?'Каждый столбец — один день.':'Столбцы — интервалы дней месяца, последний включает 6 дней.';t.swap(detail,()=>detail.replaceChildren(pair(t,'Максимум за интервал',String(max)),pair(t,'Интервалов','7')));}
    const selector=choices(t,'Период данных',[['week','7 дней'],['month','30 дней']],'week',value=>{selected=value;paint();});
    paint();t.root.append(panel(t,selector.node,t.el('p','metric-label','Просмотры за период'),total,plot,caption,detail,status));
  },
  process(t){
    t.heading('От идеи к результату','Короткий блок этапов для услуги, продукта или студии.');
    const steps=[['Знакомство','Понимаем задачу','Обсуждаем цель, аудиторию и ограничения. Вместо длинного брифа — несколько точных вопросов.','На выходе: понятная задача.'],['Решение','Собираем рабочий вариант','Показываем структуру и ключевые состояния. Вы видите решение целиком, прежде чем переходить к деталям.','На выходе: согласованный прототип.'],['Запуск','Проверяем и передаём','Проверяем мобильные экраны, доступность и поведение. Передаём материалы и объясняем, как ими пользоваться.','На выходе: готовые материалы.']];
    let selected=0;const detail=t.el('div','process-detail'),status=t.live('Пример секции: выберите этап, чтобы узнать подробности.');
    function paint(){const step=steps[selected];detail.replaceChildren(t.el('span','process-kicker',step[0]),t.el('h2','',step[1]),t.el('p','',step[2]),t.el('p','process-outcome',step[3]));next.label.textContent=selected===2?'Вернуться к началу':'Следующий этап';}
    const selector=choices(t,'Этап работы',steps.map((s,i)=>[String(i),s[0]]),'0',value=>{selected=Number(value);t.swap(detail,paint);status.textContent=`Открыт этап «${steps[selected][0]}».`;});
    const next=action('Следующий этап',()=>{selected=(selected+1)%3;selector.set(String(selected));t.swap(detail,paint);status.textContent=`Открыт этап «${steps[selected][0]}».`;},true);
    paint();t.root.append(panel(t,selector.node,detail,next,status));
  },
};
