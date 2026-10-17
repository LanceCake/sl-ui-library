// Fixed source copy only. Editable values are never translated.
export const dictionary = {
  'Find a component':'Найти в библиотеке','Clear search':'Очистить поиск','Component suggestions':'Подсказки поиска',
  'Search the local component list.':'Начните вводить или выберите подсказку.','No matches. Try another word.':'Ничего не найдено. Попробуйте другое слово.',
  'Project name':'Ваше имя','Try a name for your next project.':'Как к вам обращаться?',
  'Email address':'Электронная почта','Use an address such as name@example.com.':'Введите любой адрес для примера.',
  'Looks like an email address.':'Адрес введён.','Add a valid email address.':'Проверьте адрес.',
  'Project notes':'Сообщение','Add a short note for your team.':'Расскажите немного о задаче.',
  'Show details':'Подробнее','Hide details':'Скрыть','Details are visible.':'Ответ открыт.','Details are hidden.':'Ответ скрыт.',
  'Details disclosure':'Раскрытие подробностей','In progress':'В работе','Planned':'Запланировано','Done':'Готово','Paused':'На паузе',
  'PROJECT STATUS':'ВЫБЕРИТЕ ВАРИАНТ','Status picker':'Выбор варианта','Labels':'Темы','FILTER BY LABEL':'ВЫБЕРИТЕ ТЕМЫ',
  'Design':'Дизайн','Development':'Разработка','Research':'Исследование','Priority':'Приоритет','No labels selected.':'Темы не выбраны.',
  'labels options':'Темы проекта',
  'Overview':'Обзор','Files':'Материалы','Activity':'Активность','Project sections':'Разделы проекта','STUDIO PROJECT':'ВАШ ПРОЕКТ',
  'A little more clarity.':'Всё важное рядом.','Your ideas, files and progress in one place.':'Идеи, материалы и прогресс в одном месте.',
  'Updated today':'Обновлено сегодня','Project brief':'Описание проекта','Research notes':'Заметки','Document':'Документ','Color palette':'Палитра','Components':'Компоненты',
  'Document · Updated today':'Документ · обновлено сегодня','Design assets':'Материалы дизайна','Folder · Three files':'Папка · три файла',
  'Brief updated':'Описание обновлено','Alex · Just now':'Алексей · только что','Assets added':'Материалы добавлены','Sam · Earlier today':'Анна · сегодня',
  'Project brief.txt':'Описание проекта.txt','Research notes.md':'Заметки.md','Release checklist.txt':'Список проверки.txt',
  'STUDIO COLLECTION':'КОЛЛЕКЦИЯ','Brand system':'Фирменный стиль','Product flow':'Интерфейс продукта','Motion study':'Анимация',
  'Motion notes':'Анимация','Small movements with a little meaning.':'Небольшие движения с понятным смыслом.',
  'A shared language for every detail.':'Один язык для каждой детали.','A clear path from idea to interaction.':'От идеи к готовому взаимодействию.',
  'Small movements, meaningful feedback.':'Небольшие движения, понятные состояния.','Previous project':'Предыдущий проект','Next project':'Следующий проект',
  'Project collection':'Галерея проектов','Bookmark':'Сохранить','Bookmarked':'Сохранено','Save':'Сохранить','Saved':'Сохранено','Cancel':'Отмена',
  'Sample document':'Документ для примера','Choose demo file':'Выбрать пример файла','Demo files':'Примеры файлов','Close picker':'Закрыть список',
  'No file selected':'Файл не выбран','Remove file':'Удалить из списка','PDF, TXT or MD · up to 5 MiB':'PDF, TXT или MD · до 5 МБ',
  'Local selection only. Nothing is uploaded or read.':'Локальный пример. Файлы с компьютера не используются.',
  'Attachment input':'Выбор файла','Project document':'Документ проекта','Choose file':'Выбрать файл',
  'Built-in samples. No computer files.':'Встроенные примеры. Настоящие файлы не нужны.',
  'Demo only. Choose a sample document.':'Выберите демонстрационный документ.',
  'Demo file selected. Nothing is read or uploaded.':'Выбран пример. Ничего не загружено.',
  'Sample · stored in memory':'Пример · только в памяти',
  'Features':'Возможности','Add features':'Выберите возможности','Fonts':'Шрифты','Icons':'Иконки','Templates':'Шаблоны','Sections':'Секции',
  'Gallery':'Галерея','Documents':'Документы',
  'Notifications':'Уведомления','On':'Включено','Off':'Выключено','Privacy lock':'Приватность','Auto save':'Сохранение',
  'Search reveal':'Поиск','Open search':'Открыть поиск','Close search':'Закрыть поиск','Search':'Поиск',
  'Move item':'Переместить','Moving':'Перемещение','Moved':'Перемещено','Try again':'Повторить','Ready to move.':'Измените порядок.',
  'Moving item.':'Меняем порядок.','Item moved.':'Порядок изменён.','Close item':'Закрыть','Details':'Подробности',
  'Connection lost':'Связь прервана','Your changes are safe here.':'Ваши изменения сохранены в этом примере.',
  'Reconnect':'Повторить','Go offline':'Отключить','OFFLINE':'БЕЗ СЕТИ','Simulate an error':'Показать ошибку',
  'Connection states are simulated in this preview.':'Демонстрация состояний соединения.',
};
export function translateText(text, extra = {}) {
  const trimmed = text.trim();
  const replacement = extra[trimmed] ?? dictionary[trimmed];
  if (replacement !== undefined) return text.replace(trimmed, replacement);
  if (/^\d+ of \d+$/.test(trimmed)) return text.replace(' of ', ' из ');
  if (/^[\d,]+ bytes$/.test(trimmed)) return text.replace(' bytes', ' байт');
  const slide = trimmed.match(/^(Brand system|Product flow|Motion notes), (\d+) of (\d+)$/);
  if (slide) return text.replace(trimmed, `${dictionary[slide[1]]}, ${slide[2]} из ${slide[3]}`);
  if (/ selected in this preview\.$/.test(trimmed)) return text.replace(' selected in this preview.', ' выбран в примере.');
  if (/^Selected: /.test(trimmed)) return text.replace('Selected: ', 'Выбрано: ');
  if (/^Character limit reached:/.test(trimmed)) return text.replace('Character limit reached:', 'Достигнут лимит символов:');
  return text;
}
export function translate(root, extra) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (node.parentElement?.closest('input,textarea,[contenteditable],[data-user-text],style,script')) continue;
    const next = translateText(node.data, extra);
    if (node.data !== next) node.data = next;
  }
  root.querySelectorAll('[aria-label],[placeholder],[title],[data-on],[data-off],[data-label]').forEach(node => {
    for (const attr of ['aria-label','placeholder','title','data-on','data-off','data-label']) {
      if (!node.hasAttribute(attr)) continue;
      const value = node.getAttribute(attr), next = translateText(value, extra);
      if (value !== next) node.setAttribute(attr, next);
    }
  });
}
