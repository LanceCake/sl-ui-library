export const profile={
  profile(t){
    t.title('Ваш профиль','Расскажите о себе. Примените изменения, когда всё готово.');
    let saved={name:'Анна Смирнова',bio:'Дизайнер интерфейсов. Люблю ясные и живые продукты.',link:'anna.design'};
    const name=t.field('Имя и фамилия',saved.name),bio=t.field('О себе',saved.bio,'textarea-input'),link=t.field('Сайт или портфолио',saved.link),form=t.el('div','ac-fields');form.append(name.node,bio.node,link.node);
    const draft=()=>({name:name.input.value,bio:bio.input.value,link:link.input.value});
    const same=()=>JSON.stringify(saved)===JSON.stringify(draft());
    const summary=t.el('p','ac-draft-line','Все изменения применены');
    const save=t.button('Сохранить',async()=>{if(!name.input.value.trim()){t.say('Добавьте имя — остальные поля можно оставить пустыми.');name.input.focus();return;}const next=draft();await t.run('profile.save',next,()=>{saved={...next};t.emit({saved:{...saved}});},save);sync();});
    const undo=t.button('Отменить',()=>{t.cancel();name.input.value=saved.name;bio.input.value=saved.bio;bio.input.dispatchEvent(new Event('input'));link.input.value=saved.link;sync();},'quiet');
    function sync(){save.disabled=same();undo.disabled=same();summary.textContent=same()?'Все изменения применены':'Есть несохранённые изменения';}
    for(const f of [name,bio,link])t.on(f.input,'input',()=>{if(t.root.hasAttribute('aria-busy'))t.cancel();sync();});
    t.root.append(form,summary,t.actions(save,undo));sync();return()=>({saved:{...saved},draft:draft(),dirty:!same()});
  },
  contact(t){
    t.title('Контакт для связи','Старый контакт остаётся действующим до подтверждения нового.','mail');
    let mode='email',stage='edit',current={email:'anna@example.com',phone:'+7 900 123-45-67'},requested='',challenge=null;
    const saved=t.listRow('Текущий адрес',current.email,'mail'),email=t.field('Новый адрес',''),phone=t.field('Новый телефон',''),fields=t.panels([email.node,phone.node]);
    const choose=t.el('div','ac-segments');choose.setAttribute('role','group');choose.setAttribute('aria-label','Тип контакта');
    const modes=['email','phone'].map((id,i)=>{const b=t.el('button','ac-segment',i?'Телефон':'Почта');b.type='button';b.setAttribute('aria-pressed',String(i===0));t.on(b,'click',()=>setMode(id));t.on(b,'keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?1:1-i;modes[next].focus();setMode(next?'phone':'email');});choose.append(b);return b;});
    function setMode(next){if(stage!=='edit'||mode===next)return;mode=next;fields.select(mode==='email'?0:1);modes.forEach((b,i)=>b.setAttribute('aria-pressed',String((i===0)===(mode==='email'))));saved.name.textContent=mode==='email'?'Текущий адрес':'Текущий телефон';saved.caption.textContent=current[mode];}
    const edit=t.el('div','ac-flow'),verify=t.el('div','ac-flow'),verification=t.reveal(verify),code=t.field('Код подтверждения','','code-input'),destination=t.el('p','ac-note');
    const request=t.button('Продолжить',async()=>{const input=mode==='email'?email.input:phone.input;const value=input.value.trim();if(!value){t.say('Введите новый контакт для примера.');input.focus();return;}if(value===current[mode]){t.say('Это уже ваш текущий контакт.');return;}const targetMode=mode;await t.run('contact.request',{kind:targetMode,value},result=>{challenge=result?.challengeId??null;requested=value;stage='verify';destination.textContent='Подтвердите новый контакт';requestArea.set(false);verification.set(true);modes.forEach(b=>b.disabled=true);email.input.readOnly=phone.input.readOnly=true;code.input.focus();},request);});
    const confirm=t.button('Подтвердить',async()=>{if(t.options.demo&&code.input.value!=='123456'){t.say('В этом примере используйте код 123456.');code.input.focus();return;}if(!/^\d{6}$/.test(code.input.value)){t.say('Введите шесть цифр кода.');code.input.focus();return;}await t.run('contact.confirm',{kind:mode,value:requested,challengeId:challenge,code:code.input.value},()=>{current[mode]=requested;saved.caption.textContent=current[mode];stage='edit';challenge=null;code.input.value='';code.input.dispatchEvent(new Event('input'));requestArea.set(true);verification.set(false);modes.forEach(b=>b.disabled=false);email.input.readOnly=phone.input.readOnly=false;(mode==='email'?email.input:phone.input).value='';t.emit({current:{...current}});request.focus();},confirm);});
    const back=t.button('Отменить',()=>{t.cancel();stage='edit';challenge=null;requestArea.set(true);verification.set(false);modes.forEach(b=>b.disabled=false);email.input.readOnly=phone.input.readOnly=false;code.input.value='';code.input.dispatchEvent(new Event('input'));request.focus();},'quiet');
    const requestArea=t.reveal(t.actions(request));requestArea.set(true);edit.append(fields.node,requestArea.node);verify.append(destination,code.node,t.el('p','ac-hint ac-code-hint',t.options.demo?'Код примера: 123456. Письмо и SMS не отправляются.':'Введите код от вашего сервиса.'),t.actions(confirm,back));
    for(const field of [email,phone,code])t.on(field.input,'input',()=>{if(t.root.hasAttribute('aria-busy'))t.cancel();});
    t.root.append(saved.node,choose,edit,verification.node);return()=>({mode,stage,current:{...current},pendingContact:stage==='verify'?requested:null});
  },
  password(t){
    t.title('Обновить пароль','Новый пароль заменит текущий только после применения.','key');
    let changed=false;const current=t.field('Текущий пароль','','password-input'),next=t.field('Новый пароль','','password-input'),repeat=t.field('Повторите новый','','password-input'),fields=t.el('div','ac-fields');
    current.input.autocomplete='current-password';next.input.autocomplete=repeat.input.autocomplete='new-password';fields.append(current.node,next.node,repeat.node);
    const feedback=t.el('p','ac-draft-line','В примере можно использовать любые значения.');
    const clear=()=>{for(const f of [current,next,repeat]){f.input.value='';f.control.setVisible(false);f.node.shadowRoot.querySelector('.sl-field__reveal').setAttribute('aria-label','Показать пароль');}sync();};
    const save=t.button('Изменить пароль',async()=>{
      if(next.input.value!==repeat.input.value){t.say('Новые пароли не совпадают.');repeat.input.focus();return;}
      await t.run('password.change',{current:current.input.value,password:next.input.value},()=>{changed=true;clear();t.emit({changed:true});},save);sync();
    });
    const cancel=t.button('Очистить',()=>{t.cancel();clear();},'quiet');
    function sync(){const ready=!!current.input.value&&!!next.input.value&&!!repeat.input.value;save.disabled=!ready;cancel.disabled=![current,next,repeat].some(f=>f.input.value);feedback.textContent=next.input.value&&repeat.input.value?(next.input.value===repeat.input.value?'Новые пароли совпадают':'Проверьте совпадение новых паролей'):'В примере можно использовать любые значения.';}
    for(const f of [current,next,repeat])t.on(f.input,'input',()=>{if(t.root.hasAttribute('aria-busy'))t.cancel();sync();});
    t.root.append(fields,feedback,t.actions(save,cancel));sync();return()=>({changed,hasDraft:[current,next,repeat].some(f=>!!f.input.value)});
  },
};
