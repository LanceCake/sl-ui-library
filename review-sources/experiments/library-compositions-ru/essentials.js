import { source, action, field } from './source-host.js';
import { translateText } from './dictionary.js';

export const essentials = {
  accordion(t) {
    t.heading('Частые вопросы','Всё, что полезно знать перед началом работы.');
    const list=t.el('div','accordion-list');
    for (const [question,answer] of [
      ['Можно ли изменить цвета?','Да. Поверхности, текст и состояния вынесены в переменные. Сохраните контраст между ними.'],
      ['Работает ли с клавиатуры?','Tab перемещает фокус. Enter и пробел раскрывают ответ, Escape закрывает его.'],
      ['Подойдёт ли для телефона?','Да. Контролы остаются доступными на узком экране и при уменьшении движения.'],
    ]) list.append(source('buttons-details-disclosure-v11',{attributes:['compact','accordion','dark','no-caption'],copy:{'Show details':question,'Hide details':question},prepare(root){root.querySelector('[data-panel] p').textContent=answer;}}));
    t.root.append(list);
  },
  select(t) {
    t.heading('Формат проекта','Выберите вариант — описание ниже обновится вместе с ним.');
    const detail=t.el('div','wizard-summary');detail.append(t.el('h2','', 'Какой проект вы собираете?'),t.el('p','','Выбор можно изменить в любой момент.'));
    const choices=[['landing','Лендинг','Одна страница с предложением и понятным действием.'],['portfolio','Портфолио','Работы, подробности проектов и контактная информация.'],['shop','Магазин','Каталог, карточки товаров и корзина.']];
    t.root.append(source('status-menu',{prepare(root){root.querySelector('[data-trigger-label]').textContent='Выберите формат';root.querySelector('[data-feedback]').textContent='Откройте список вариантов.';root.querySelectorAll('[data-value]').forEach((node,i)=>{const c=choices[i%choices.length];node.dataset.value=c[0];node.dataset.label=c[1];node.querySelector('strong').textContent=c[1];node.setAttribute('aria-checked','false');if(i>=choices.length)node.remove();});},options:{onSelect(values){const c=choices.find(x=>x[0]===values[0]);if(c)t.swap(detail,()=>{detail.replaceChildren(t.el('h2','',c[1]),t.el('p','',c[2]));});}}}),detail);
  },
  multi(t) {
    t.heading('Темы проекта','Несколько значений и одна понятная сводка выбранного.');
    const chips=t.el('div','chip-list'), status=t.live('Выбрана одна тема.');
    function paint(values){chips.replaceChildren(...values.map(value=>t.el('span','chip',({design:'Дизайн',development:'Разработка',motion:'Анимация'})[value])));status.textContent=values.length?`Выбрано тем: ${values.length}.`:'Выберите хотя бы одну тему.';}
    t.root.append(source('labels-menu',{copy:{'Labels':'Темы проекта','Motion':'Анимация','Done':'Готово','labels options':'Темы проекта'},options:{onSelect:paint}}),chips,status);paint(['design']);
  },
  files(t) {
    t.heading('Документы проекта','Выберите встроенный пример. Настоящие файлы с компьютера не нужны.');
    const queue=t.el('ul','file-queue'),status=t.live('Очередь пока пустая.');const files=new Map();let lastSelected;
    const picker=source('inputs-attachment-v11',{css:'.sl-component{width:100%}.sl-remove-file{font-size:13px;min-height:32px;padding:5px 10px}',options:{demo:true},copy:{'Attachment input':'Добавить документ'},ready(host){t.on(host,'sl:change',event=>{const file=event.detail.file;if(file){lastSelected=file.name;files.set(file.name,file);}else if(lastSelected){files.delete(lastSelected);lastSelected=null;}paint();});}});
    function paint(){t.swap(queue,()=>{queue.replaceChildren();for(const [name,file] of files){const row=t.el('li','file-row');const info=t.el('span','','');info.append(t.el('span','',translateText(name)),t.el('small','',`${file.size} байт · пример`));row.append(info,action('Убрать',()=>{files.delete(name);if(picker.controller.state.file?.name===name)picker.controller.reset();paint();},true,'small'));queue.append(row);}});status.textContent=files.size?`Документов в очереди: ${files.size}. Ничего не загружено.`:'Очередь пока пустая.';}
    t.root.append(picker,queue,status);
  },
  wizard(t) {
    t.heading('Коротко о проекте','Расскажите о себе и задаче, затем проверьте заполненное.');
    const progress=t.el('nav','wizard-progress');progress.setAttribute('aria-label','Этапы формы');
    const body=t.el('div','wizard-body'),actions=t.el('div','wizard-actions'),status=t.live('');
    let step=0;const data={name:'',email:'',message:''};
    const name=field('text-input','Ваше имя'),email=field('email-input','Электронная почта'),message=field('textarea-input','Коротко о проекте');
    const panes=[t.el('div','contact-fields'),t.el('div','stack'),t.el('div','wizard-summary')];panes[0].append(name,email);panes[1].append(message);panes.forEach((pane,i)=>{pane.hidden=i!==0;body.append(pane);});
    const labels=['О вас','Задача','Проверка'];const tabs=labels.map((label,i)=>{const b=t.el('button','',label);b.type='button';t.on(b,'click',()=>{if(i<step){step=i;paint();}});progress.append(b);return b;});
    const back=action('Назад',()=>{step=Math.max(0,step-1);paint();},true),next=action('Далее',()=>{
      if(step===0){data.name=name.shadowRoot.querySelector('input').value;data.email=email.shadowRoot.querySelector('input').value;if(!data.name.trim()){status.textContent='Введите имя для примера.';name.shadowRoot.querySelector('input').focus();return;}}
      if(step===1){data.message=message.shadowRoot.querySelector('textarea').value;if(!data.message.trim()){status.textContent='Добавьте пару слов о проекте.';message.shadowRoot.querySelector('textarea').focus();return;}}
      if(step===2){status.textContent='Пример готов. Данные никуда не отправлены.';next.button.disabled=true;return;}
      step++;paint();
    });actions.append(back,next);
    function paint(){tabs.forEach((tab,i)=>{tab.toggleAttribute('disabled',i>step);if(i===step)tab.setAttribute('aria-current','step');else tab.removeAttribute('aria-current');});t.swap(body,()=>{panes.forEach((pane,i)=>{pane.hidden=i!==step;});if(step===2){panes[2].replaceChildren(t.el('h2','','Проверьте пример'),t.el('p','',data.name),t.el('p','',data.email||'Без адреса'),t.el('p','',data.message));panes[2].querySelectorAll('p').forEach(p=>p.dataset.userText='');}});back.button.disabled=step===0;next.label.textContent=step===2?'Готово':'Далее';next.button.disabled=false;status.textContent='';}
    t.root.append(progress,body,actions,status);paint();
  },
  nav(t) {
    const top=t.el('header','nav-top');top.append(t.el('strong','','Студия'),action('Найти',()=>{search.hidden=!search.hidden;if(!search.hidden)search.querySelector('sl-source').shadowRoot.querySelector('input').focus();},true));
    const search=t.el('div','nav-search');search.hidden=true;search.append(source('search-input',{options:{items:['Обзор','Материалы','Активность']}}));
    t.root.append(top,search,source('tabs-navigation',{copy:{'Project sections':'Основная навигация'}}));
  },
  gallery(t) {
    t.heading('Коллекция работ','Листайте проекты и сохраняйте то, что понравилось.');
    const nav=source('carousel-navigation',{css:`.collection-slide{position:relative;padding:0 0 16px}.collection-slide .art{height:135px;margin-bottom:16px;position:relative;overflow:hidden;background:#353535}.collection-slide .art:before{content:'';position:absolute;width:90px;height:180px;left:23%;top:-24px;background:#bdbdbd;border-radius:70px;transform:rotate(28deg)}.collection-slide .art[data-art=two]{background:#c4c4c4}.collection-slide .art[data-art=two]:before{background:#262626;left:48%;transform:rotate(-30deg)}.collection-slide .art[data-art=three]{background:#555}.collection-slide .art[data-art=three]:before{background:#e0e0e0;left:40%;transform:rotate(70deg)}.slide-emblem{position:absolute;right:12px;top:12px;margin:0;background:#222c;width:36px;height:36px}.slide-emblem .menu-glyph{width:23px;height:23px}.collection-slide .nav-eyebrow,.collection-slide h3,.collection-slide p{margin-left:20px;margin-right:20px}.collection-slide h3{margin-top:9px;margin-bottom:8px}.collection-slide p{font-size:12px;line-height:1.5;color:#bdbdbd}`,
      prepare(root){root.querySelectorAll('.collection-slide').forEach((slide,i)=>{const art=t.el('div','art');art.dataset.art=['one','two','three'][i];slide.prepend(art);});}});
    const saved=t.live('Работа ещё не сохранена.');
    t.root.append(nav,source('bookmark',{attributes:['small-action'],options:{},ready(host){t.on(host.sourceRoot,'bookmarkchange',event=>{saved.textContent=event.detail.pressed?'Работа сохранена в этом примере.':'Сохранение отменено.';});}}),saved);
  },
  reorder(t) {
    t.heading('Порядок разделов','Перемещайте разделы вверх: остальные строки плавно освобождают место.');
    const list=t.el('ol','reorder-list');const names=['О проекте','Работы','Контакты'];const status=t.live('Изменения доступны только в этом примере.');
    const rows=names.map(name=>{const row=t.el('li','reorder-row');row.append(t.el('strong','',name),action('Выше',()=>{const previous=row.previousElementSibling;if(!previous)return;const before=new Map([...list.children].map(n=>[n,n.getBoundingClientRect().top]));list.insertBefore(row,previous);for(const node of list.children)t.move(node,before.get(node)-node.getBoundingClientRect().top);update();status.textContent=`«${name}» перемещён выше.`;},true,'small'));return row;});list.append(...rows);
    function update(){[...list.children].forEach((row,i)=>row.querySelector('.source-action').button.disabled=i===0);}
    t.root.append(list,status);update();
  },
  comments(t) {
    t.heading('Обсуждение','Поделитесь мыслью или задайте вопрос.');
    const list=t.el('div','comments-list'),entry=field('textarea-input','Ваш комментарий'),status=t.live('');
    const reply=t.el('div','reply-target');reply.hidden=true;const replyName=t.el('span');let target=null;
    function chooseReply(next){target=next;reply.hidden=!next;replyName.textContent=next?`Ответ: ${next.name}`:'';const input=entry.shadowRoot.querySelector('textarea');input.focus({preventScroll:true});}
    reply.append(replyName,action('Отмена',()=>chooseReply(null),true,'small'));
    function add(name,text,fresh=false,parent=null){const row=t.el('article','comment'+(fresh?' is-new':'')+(parent?' is-reply':'')),head=t.el('header','');head.append(t.el('strong','',name),t.el('span','','только что'));const copy=t.el('p','',text);copy.dataset.userText='';const replies=t.el('div','comment-replies');const answer=action('Ответить',()=>chooseReply({name,row,replies}),true,'small');row.append(head,copy,answer,replies);(parent?.replies||list).append(row);if(fresh)t.appear(row);}
    add('Мария','Нравится, что состояния спокойные и понятно, что происходит.');
    const composer=t.el('div','comment-entry');composer.append(reply,entry,action('Добавить',()=>{const input=entry.shadowRoot.querySelector('textarea');if(!input.value.trim()){status.textContent='Напишите комментарий.';input.focus();return;}add('Вы',input.value,true,target);input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));chooseReply(null);status.textContent='Добавлено в локальный пример.';}));
    t.root.append(list,composer,status);
  },
  cookies(t) {
    t.heading('Настройки приватности','Вы решаете, какие дополнительные функции разрешить.');
    const list=t.el('div','settings-list');const analytics=source('glide-toggle',{copy:{'Notifications':'Аналитика'}}),personal=source('privacy-toggle',{copy:{'Private profile':'Персонализация','Private':'Включено','Public':'Выключено'}});list.append(analytics,personal);
    const controls=t.el('div','settings-actions'),status=t.live('Необходимые функции включены всегда.');
    controls.append(action('Отклонить',()=>{for(const host of [analytics,personal])host.controller.setChecked(false);status.textContent='Дополнительные категории выключены в примере.';},true),action('Сохранить',()=>{status.textContent='Выбор сохранён только в этом превью.';}));t.root.append(list,controls,status);
  },
};
