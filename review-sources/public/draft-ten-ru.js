const essentialDrafts = [
  ['accordion', 'Аккордеон', 'Раскрытие ответа · плавный возврат'],
  ['select', 'Выбор из списка', 'Появление списка · выбранное состояние'],
  ['multi', 'Множественный выбор', 'Выбор тем · появление меток'],
  ['files', 'Очередь файлов', 'Демонстрационные файлы · локально'],
  ['wizard', 'Пошаговая форма', 'Переход между этапами · проверка'],
  ['nav', 'Верхняя навигация', 'Смена раздела · встроенный поиск'],
  ['gallery', 'Галерея', 'Смена кадра · сохранение'],
  ['reorder', 'Переставляемый список', 'Перемещение · изменение порядка'],
  ['comments', 'Комментарии', 'Ответы на записи · плавное добавление'],
  ['cookies', 'Настройки cookie', 'Выбор категорий · подтверждение'],
];

const popularDrafts = [
  ['search', 'Поиск с подсказками', 'Живые результаты · клавиатура'],
  ['tabs', 'Вкладки с содержимым', 'Смена панели · движущийся маркер'],
  ['filters', 'Фильтруемая подборка', 'Категории · перестройка карточек'],
  ['featured-card', 'Карточка материала', 'Карточка · сохранение'],
  ['contact', 'Контактная форма', 'Проверка полей · локальный итог'],
  ['newsletter', 'Блок подписки', 'Ввод адреса · локальный пример'],
  ['cta', 'Призыв к действию', 'Выбор направления · живые примеры'],
  ['features', 'Секция преимуществ', 'Смена акцента и визуального блока'],
  ['announcement', 'Информационный баннер', 'Закрыть · восстановить'],
  ['footer', 'Адаптивный футер', 'Группы ссылок · узкий экран'],
];

function createGrid(items, offset, route, resetKind) {
  const grid = document.createElement('div');
  grid.className = 'draft-grid';
  items.forEach(([key, name, motion], index) => {
    const card = document.createElement('article');
    card.className = 'component-card draft-card';
    card.id = `draft-${key}`;
    const heading = document.createElement('div');
    heading.className = 'card-details';
    const text = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = name;
    const caption = document.createElement('p');
    caption.className = 'card-motion';
    caption.textContent = motion;
    text.append(title, caption);
    const count = document.createElement('span');
    count.className = 'draft-count';
    count.textContent = String(offset + index + 1).padStart(2, '0');
    heading.append(text, count);
    const preview = document.createElement('div');
    preview.className = 'card-preview draft-preview';
    const frame = document.createElement('iframe');
    frame.title = `Предпросмотр: ${name}`;
    frame.loading = index < 2 ? 'eager' : 'lazy';
    frame.src = `${route}?only=${encodeURIComponent(key)}`;
    window.addEventListener('message', event => {
      if (event.origin !== location.origin || event.source !== frame.contentWindow || event.data?.kind !== 'sl-draft-size' || event.data.key !== key) return;
      const height = Number(event.data.height);
      if (!Number.isFinite(height) || height < 0) return;
      // The reported size is iframe content, but height belongs to the bordered
      // outer wrapper. Account for its edges instead of leaving a tiny overflow.
      const style = getComputedStyle(preview);
      const edges = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
      const next = Math.max(matchMedia('(max-width:450px)').matches ? 500 : 480, Math.min(10000, Math.ceil(height + edges)));
      // Keep space once revealed: closing one control must not pull the page
      // and all later review cards back up underneath the pointer.
      if (next > preview.getBoundingClientRect().height) preview.style.height = `${next}px`;
    });
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'card-reset draft-reset';
    reset.setAttribute('aria-label', `Сбросить ${name}`);
    reset.textContent = '↺';
    reset.addEventListener('click', () => {
      preview.style.height = '';
      frame.contentWindow?.postMessage({ kind: resetKind, key }, location.origin);
    });
    preview.append(frame, reset);
    card.append(heading, preview);
    grid.append(card);
  });
  return grid;
}

export function mountDraftTen(root, includePopular = false) {
  if (!document.getElementById('draft-ten-style')) {
    const sheet = document.createElement('link');
    sheet.id = 'draft-ten-style';
    sheet.rel = 'stylesheet';
    sheet.href = './draft-ten-ru.css';
    document.head.append(sheet);
  }
  root.classList.add('draft-ten-view');
  root.dataset.title = 'Новые элементы · SL UI Library';
  const intro = root.querySelector('.home-intro');
  intro.querySelector('h1').textContent = 'Новые элементы';
  intro.querySelector('p').textContent = includePopular
    ? 'Двадцать утверждённых локальных композиций на основе компонентов библиотеки. Попробуйте каждый сценарий.'
    : 'Первая десятка утверждена локально. Попробуйте каждый сценарий.';
  const tiles = root.querySelector('#category-tiles');
  tiles.hidden = true;

  const review = document.createElement('section');
  review.className = 'draft-review';
  review.setAttribute('aria-label', includePopular ? 'Двадцать локальных элементов' : 'Десять локальных элементов');
  const note = document.createElement('p');
  note.className = 'draft-note';
  note.textContent = 'Локальная русская версия · демонстрация без отправки данных · ещё не опубликовано';
  review.append(note);
  if (includePopular) {
    const basicHeading = document.createElement('h2');
    basicHeading.className = 'draft-group-heading';
    basicHeading.textContent = 'Базовые сценарии · утверждены';
    review.append(basicHeading);
  }
  review.append(createGrid(essentialDrafts, 0, './drafts/ru/index.html', 'sl-draft-reset'));
  if (includePopular) {
    const heading = document.createElement('h2');
    heading.className = 'draft-group-heading';
    heading.textContent = 'Популярные блоки · утверждены';
    review.append(heading, createGrid(popularDrafts, 10, './drafts/popular/index.html', 'sl-popular-reset'));
  }
  tiles.after(review);
}
