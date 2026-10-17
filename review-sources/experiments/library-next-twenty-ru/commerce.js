import {field,input,action,panel,actions,pair,choices,quantity,pill,rub} from './ui.js';

export const commerce={
  product(t){
    t.heading('Детали имеют значение','Выберите размер набора и количество экземпляров.');
    let size='small',count=1;const art=t.el('div','product-art'),object=t.el('div','product-object','Studio');art.setAttribute('aria-hidden','true');art.append(object);
    const total=t.el('div','summary-total'),status=t.live('Демонстрационный товар. В заказ ничего не отправляется.');
    function update(){object.dataset.size=size;const amount=(size==='small'?1200:1800)*count;t.swap(total,()=>total.replaceChildren(pair(t,'Итого',rub(amount))));status.textContent='Демонстрационный товар. В заказ ничего не отправляется.';}
    const sizes=choices(t,'Размер набора',[['small','Компактный'],['large','Большой']],'small',value=>{size=value;update();});
    const counter=quantity(t,1,value=>{count=value;update();}),row=t.el('div','summary-line product-quantity');row.append(t.el('span','','Количество'),counter.node);
    const add=action('Добавить в пример',()=>{status.textContent=`Добавлено в локальный пример: ${count} шт., ${size==='small'?'компактный':'большой'} набор. Реального заказа нет.`;t.enter(status);});
    update();t.root.append(panel(t,art,t.el('h2','','Набор Studio'),sizes.node,row,total,add,status));
  },
  cart(t){
    t.heading('Всё для проекта','Количество, стоимость и обратимое удаление товара.');
    const items=[{id:'book',name:'Дизайн-блокнот',price:1200,count:1,active:true},{id:'cards',name:'Набор карточек',price:650,count:2,active:true}];
    const list=t.el('div','cart-list'),total=t.el('div','summary-total'),status=t.live('Корзина-пример. Оформление не выполняется.');
    function updateTotal(){const sum=items.filter(x=>x.active).reduce((s,x)=>s+x.price*x.count,0);t.swap(total,()=>total.replaceChildren(pair(t,'Итого',rub(sum))));checkout.button.disabled=!sum;}
    function paint(){list.replaceChildren();for(const item of items.filter(x=>x.active)){const row=t.el('article','cart-item'),heading=pair(t,item.name,rub(item.price*item.count));const counter=quantity(t,item.count,value=>{item.count=value;t.swap(heading,()=>heading.replaceChildren(t.el('span','',item.name),t.el('strong','',rub(item.price*item.count))));updateTotal();});const bottom=t.el('div','cart-item-bottom');bottom.append(counter.node,action('Убрать',()=>{item.active=false;t.swap(list,paint);updateTotal();restore.button.disabled=false;status.textContent='Товар убран из примера. Его можно восстановить.';restore.button.focus({preventScroll:true});},true,'small'));row.append(heading,bottom);list.append(row);}if(!list.children.length)list.append(t.el('p','empty-copy','Пока пусто. Верните товары, чтобы продолжить пример.'));}
    const restore=action('Вернуть товары',()=>{items.forEach(x=>x.active=true);t.swap(list,paint);updateTotal();restore.button.disabled=true;status.textContent='Все товары снова в локальной корзине.';checkout.button.focus({preventScroll:true});},true);
    const checkout=action('К оформлению',()=>{status.textContent=`Состав примера готов на ${rub(items.filter(x=>x.active).reduce((s,x)=>s+x.price*x.count,0))}. Заказ не создан.`;t.enter(status);});restore.button.disabled=true;
    paint();updateTotal();t.root.append(panel(t,pill(t,'Демонстрационный заказ'),list,total,actions(t,restore,checkout),status));
  },
  delivery(t){
    t.heading('Как вам удобнее','Способ получения с понятной стоимостью и сроком.');
    const options={pickup:['Пункт выдачи',190,'Завтра после 14:00','Пример: ул. Мира, 12. Время хранения — 5 дней.'],courier:['Курьер',390,'Послезавтра, 10:00–18:00','Адрес в реальном заказе запрашивается следующим шагом.'],store:['Самовывоз',0,'Сегодня до 20:00','Пример: магазин Studio, ул. Садовая, 8.']};let selected='pickup';
    const detail=t.el('div','delivery-detail'),summary=t.el('div','summary-stack'),status=t.live('Стоимость и адреса указаны только для демонстрации.');
    function paint(){const item=options[selected];t.swap(detail,()=>detail.replaceChildren(t.el('h3','',item[2]),t.el('p','',item[3])));t.swap(summary,()=>summary.replaceChildren(pair(t,'Товары',rub(2400)),pair(t,'Доставка',item[1]?rub(item[1]):'Бесплатно'),pair(t,'К оплате',rub(2400+item[1]))));status.textContent='Стоимость и адреса указаны только для демонстрации.';}
    const selector=choices(t,'Способ доставки',[['pickup','В пункт'],['courier','Курьер'],['store','Заберу']],'pickup',value=>{selected=value;paint();});
    paint();t.root.append(panel(t,selector.node,detail,summary,action('Выбрать доставку',()=>{status.textContent=`В примере выбран способ «${options[selected][0]}». Доставка не заказана.`;t.enter(status);}),status));
  },
  promo(t){
    t.heading('Небольшой бонус','Введите STUDIO10 и посмотрите точный пересчёт.');
    let applied=false;const code=field('text-input','Промокод'),summary=t.el('div','summary-stack'),status=t.live('Промокод действует только в этом локальном примере.');
    function paint(){t.swap(summary,()=>summary.replaceChildren(pair(t,'Сумма товаров',rub(3000)),pair(t,'Скидка',applied?`−${rub(300)}`:rub(0)),pair(t,'Итого',rub(applied?2700:3000))));apply.label.textContent=applied?'Убрать скидку':'Применить';const control=input(code);if(control)control.readOnly=applied;}
    const apply=action('Применить',()=>{if(applied){applied=false;paint();status.textContent='Скидка убрана из примера.';input(code).focus();return;}if(input(code).value.trim().toUpperCase()!=='STUDIO10'){status.textContent='В этом примере доступен код STUDIO10. Попробуйте его.';input(code).focus();t.enter(status);return;}applied=true;paint();status.textContent='Применена демонстрационная скидка 10%: 300 ₽. Оплаты нет.';t.enter(status);});
    const wrap=panel(t,code,apply,summary,status);t.root.append(wrap);paint();t.on(code,'keydown',event=>{if(event.key==='Enter'){event.preventDefault();apply.button.click();}});
  },
  saved(t){
    t.heading('Под рукой','Собирайте полезное в небольшую личную подборку.');
    const items=[{name:'Поля для форм',meta:'Компоненты · 8 состояний',saved:true},{name:'Навигация проекта',meta:'Блоки · адаптивная группа',saved:true},{name:'Спокойные карточки',meta:'Композиции · 3 варианта',saved:true}];
    const list=t.el('div','saved-list'),count=t.el('span','next-pill'),status=t.live('Изменения хранятся только до сброса превью.');
    function paint(){list.replaceChildren();items.forEach(item=>{if(!item.saved)return;const row=t.el('article','saved-row'),copy=t.el('div');copy.append(t.el('h3','',item.name),t.el('p','',item.meta));row.append(copy,action('Убрать',()=>{item.saved=false;t.swap(list,paint);status.textContent=`«${item.name}» убрано. Можно вернуть всю подборку.`;restore.button.disabled=false;restore.button.focus({preventScroll:true});},true,'small'));list.append(row);});const n=items.filter(x=>x.saved).length;count.textContent=`Сохранено: ${n}`;if(!n)list.append(t.el('p','empty-copy','Подборка пустая. Начните заново с демонстрационных материалов.'));}
    const restore=action('Вернуть подборку',()=>{items.forEach(x=>x.saved=true);t.swap(list,paint);restore.button.disabled=true;status.textContent='Подборка восстановлена в примере.';list.querySelector('.source-action')?.button.focus({preventScroll:true});},true);restore.button.disabled=true;
    paint();t.root.append(panel(t,count,list,restore,status));
  },
};
