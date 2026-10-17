import { source, action, field } from './source-host.js';

const materials=[['Типографика','Руководство','design'],['Компоненты','Раздел','code'],['Композиция','Подборка','design'],['Процесс','Заметки','notes']];
export const popular={
  search(t){
    t.heading('Поиск по библиотеке','Найдите материал по названию или выберите подсказку.');
    const results=t.el('div','search-results'),status=t.live('');
    function paint(value=''){const found=materials.filter(([name])=>!value||name.toLocaleLowerCase('ru').includes(value.toLocaleLowerCase('ru')));t.swap(results,()=>{results.replaceChildren(...found.map(([name,kind])=>{const row=t.el('article','');row.append(t.el('strong','',name),t.el('p','',kind));return row;}));});for(const row of results.children)t.enter(row);status.textContent=found.length?`Материалов: ${found.length}.`:'По этому запросу пока ничего нет.';}
    const input=source('search-input',{options:{items:materials.map(x=>x[0])},ready(host){t.on(host.sourceRoot,'searchselect',event=>paint(event.detail.value));t.on(host.shadowRoot.querySelector('input'),'input',event=>paint(event.target.value));t.on(host.shadowRoot.querySelector('.sl-field__clear'),'click',()=>paint());}});
    t.root.append(input,results,status);paint();
  },
  tabs(t){
    t.heading('Рабочее пространство','Обзор, документы и последние изменения — рядом.');
    t.root.append(source('tabs-navigation'),source('glide-toggle',{copy:{'Notifications':'Уведомления проекта'}}));
  },
  filters(t){
    t.heading('Материалы проекта','Выберите категории или найдите материал по названию.');
    const tools=t.el('div','filter-tools'),grid=t.el('div','filtered-grid'),status=t.live('');let tags=['design'],query='';
    const cards=materials.map(([name,kind],i)=>{const row=t.el('article','work-card');const art=t.el('div','art');art.dataset.art=['one','two','three','one'][i];const copy=t.el('p','',name);copy.append(t.el('small','',kind));row.append(art,copy);grid.append(row);return row;});
    function paint(){const before=new Map(cards.filter(n=>!n.hidden).map(n=>[n,n.getBoundingClientRect()]));cards.forEach((card,i)=>card.hidden=Boolean((tags.length&&!tags.includes(materials[i][2]))||(query&&!materials[i][0].toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru')))));for(const card of cards){if(card.hidden)continue;const old=before.get(card);if(old)t.move(card,old.top-card.getBoundingClientRect().top,old.left-card.getBoundingClientRect().left);else t.enter(card);}status.textContent=`Показано: ${cards.filter(n=>!n.hidden).length} из ${cards.length}.`;}
    const categories=source('labels-menu',{copy:{'Labels':'Категории','Design':'Дизайн','Development':'Код','Motion':'Заметки'},prepare(root){const items=[...root.querySelectorAll('[data-value]')];items[1].dataset.value='code';items[2].dataset.value='notes';},options:{onSelect(values){tags=values;paint();}}});
    tools.append(categories,action('Все материалы',()=>{categories.shadowRoot.querySelectorAll('[data-value][aria-checked="true"]').forEach(item=>item.click());categories.controller.close();tags=[];query='';search.controller.reset();paint();},true,'menu'));
    const search=source('search-input',{options:{items:materials.map(x=>x[0])},ready(host){t.on(host.shadowRoot.querySelector('input'),'input',event=>{query=event.target.value;paint();});t.on(host.sourceRoot,'searchselect',event=>{query=event.detail.value;paint();});}});
    t.root.append(tools,search,grid,status);paint();
  },
  'featured-card'(t){
    const card=t.el('article','material-card'),art=t.el('div','art');art.dataset.art='two';const copy=t.el('div','material-copy');copy.append(t.el('h2','','Тихие формы'),t.el('p','','Как простая типографика и точные состояния помогают собрать цельный интерфейс.'));
    const status=t.live('6 минут чтения');copy.append(source('bookmark',{attributes:['small-action'],ready(host){t.on(host.sourceRoot,'bookmarkchange',event=>{status.textContent=event.detail.pressed?'Добавлено в избранное.':'6 минут чтения';});}}),status);card.append(art,copy);t.root.append(card);
  },
  contact(t){
    t.heading('Расскажите о задаче','Пара деталей поможет понять, с чего начать.');
    const fields=t.el('div','contact-fields'),name=field('text-input','Ваше имя'),email=field('email-input','Электронная почта'),message=field('textarea-input','Сообщение');fields.append(name,email,message);const status=t.live('');
    const actions=t.el('div','contact-actions');actions.append(action('Очистить',()=>{[name,email,message].forEach(x=>x.controller.reset());status.textContent='';},true),action('Отправить пример',()=>{const input=name.shadowRoot.querySelector('input'),text=message.shadowRoot.querySelector('textarea');if(!input.value.trim()||!text.value.trim()){status.textContent='Добавьте имя и сообщение.';(!input.value.trim()?input:text).focus();return;}status.textContent='Сообщение показано в примере. Отправки на сервер нет.';t.motion(status);}));t.root.append(fields,actions,status);
  },
  newsletter(t){
    const panel=t.el('div','newsletter');t.heading('Полезное — иногда','Небольшая подборка идей для вашей следующей страницы.',panel);
    const row=t.el('div','row'),email=field('email-input','Ваш адрес'),status=t.live('Локальная демонстрация подписки.');row.append(email,action('Подписаться',()=>{const input=email.shadowRoot.querySelector('input');if(!input.value.trim()){status.textContent='Введите адрес для примера.';input.focus();return;}status.textContent='Адрес принят в примере. Подписка не оформлена.';t.motion(status);},false,'field'));panel.append(row,status);t.root.append(panel);
  },
  cta(t){
    const panel=t.el('section','cta');panel.append(t.el('h2','','Соберите следующую страницу.'),t.el('p','','Начните с нужных деталей. Поля, кнопки и навигация уже говорят на одном языке.'));
    const selection=t.el('div','cta-selection');selection.hidden=true;
    function choose(kind){selection.hidden=false;t.swap(selection,()=>{selection.replaceChildren();if(kind==='Формы'){selection.append(t.el('h3','','Контактная форма'),field('text-input','Ваше имя'),field('textarea-input','Ваша задача'));const result=t.live('');selection.append(action('Проверить пример',()=>{result.textContent='Это пример формы. Отправки данных нет.';},false,'small'),result);}else if(kind==='Навигация'){selection.append(t.el('h3','','Навигация по проекту'),source('tabs-navigation'));}else{const card=t.el('article','work-card');card.append(t.el('p','','Материал для вашей страницы'));const status=t.live('Выберите, что сохранить.');selection.append(t.el('h3','','Карточка материала'),card,source('bookmark',{attributes:['small-action'],ready(host){t.on(host.sourceRoot,'bookmarkchange',event=>status.textContent=event.detail.pressed?'Сохранено в этом примере.':'Сохранение отменено.');}}),status);}});}
    panel.append(source('buttons-details-disclosure-v11',{attributes:['compact','dark','no-caption','small-disclosure','direction-picker'],css:'.direction-list{display:flex;flex-wrap:wrap;gap:8px}.direction-list .source-action{min-width:80px}',copy:{'Show details':'Выбрать направление','Hide details':'Скрыть направления'},prepare(root){const body=root.querySelector('[data-panel]>div'),directions=t.el('div','direction-list');directions.append(...['Формы','Навигация','Карточки'].map(label=>action(label,()=>choose(label),true,'small')));body.replaceChildren(t.el('p','','Выберите направление и попробуйте его элементы.'),directions);}}),selection);t.root.append(panel);
  },
  features(t){
    t.heading('Подберите возможности','Соберите набор, который нужен вашему проекту.');
    const detail=t.el('div','feature-detail'),status=t.live('');const art=t.el('div','art');detail.append(art,t.el('h2','','Ваш набор'),t.el('p','','Выберите возможности выше.'));
    const list=source('feature-list-checkbox',{ready(host){t.on(host.shadowRoot,'change',()=>{const checked=[...host.shadowRoot.querySelectorAll('input:checked')];const names=checked.map(input=>input.closest('label').querySelector('.sl-check__title').textContent);detail.querySelector('p').textContent=names.length?names.join(' · '):'Выберите возможности выше.';status.textContent=`В наборе: ${names.length}.`;art.dataset.art=['one','two','three'][names.length%3];t.motion(detail);});}});
    t.root.append(list,detail,status);
  },
  announcement(t){
    const wrap=t.el('div','announcement-wrap'),inner=t.el('div','announcement-inner'),banner=t.el('div','announcement'),copy=t.el('div','');copy.append(t.el('strong','','Новые материалы в библиотеке'),t.el('p','','Свежая подборка уже доступна для просмотра.'));
    const status=t.live('Объявление можно скрыть и вернуть.');const restore=action('Вернуть объявление',()=>{wrap.classList.remove('is-closed');wrap.inert=false;restore.hidden=true;status.textContent='Объявление снова видно.';});restore.hidden=true;
    banner.append(copy,action('Скрыть',()=>{wrap.classList.add('is-closed');wrap.inert=true;restore.hidden=false;restore.button.focus();status.textContent='Объявление скрыто в этом примере.';},true));inner.append(banner);wrap.append(inner);
    const page=t.el('section','mock-page'),slot=t.el('div','restore-slot');slot.append(restore);page.append(t.el('h2','','Ваша страница'),t.el('p','','Компактное объявление занимает ровно столько места, сколько ему нужно.'),slot,status);t.root.append(wrap,page);
  },
  footer(t){
    const panel=t.el('footer','footer');panel.append(t.el('p','footer-brand','Студия'),t.el('p','footer-description','Детали для ясных и удобных интерфейсов.'));
    const groups=t.el('div','footer-groups'),status=t.live('Выберите раздел.');
    for(const [name,links] of [['Библиотека',['Компоненты','Шрифты','Иконки']],['О проекте',['Контакты','Обновления','Условия']]]){
      groups.append(source('buttons-details-disclosure-v11',{attributes:['compact','dark','no-caption','small-disclosure','link-group'],copy:{'Show details':name,'Hide details':name},prepare(root){const target=root.querySelector('[data-panel]>div');target.setAttribute('role','navigation');target.setAttribute('aria-label',name);target.replaceChildren(...links.map(label=>{const link=action(label,()=>{status.textContent=`Выбрано: ${label}. Это локальный пример навигации.`;},true,'link');link.classList.add('footer-link');return link;}));}}));
    }
    panel.append(groups,status,t.el('div','footer-bottom','© 2026 · Локальный пример'));t.root.append(panel);
  },
};
