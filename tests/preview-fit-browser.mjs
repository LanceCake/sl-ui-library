import assert from 'node:assert/strict';

export function measureFit(selector = 'sl-preview') {
  const host = document.querySelector(selector);
  const root = host.shadowRoot.querySelector('.stage > .sl-component');
  const hostBox = host.getBoundingClientRect(), box = root.getBoundingClientRect();
  const heading = host.closest('.preview-panel')?.querySelector('h2')?.getBoundingClientRect();
  const controls = [];
  const visit = node => {
    for (const item of node.querySelectorAll('*')) {
      if (item.shadowRoot) visit(item.shadowRoot);
      if (!item.matches('button,input,select,textarea,a[href],[tabindex]') || item.disabled || item.tabIndex < 0) continue;
      const rect = item.getBoundingClientRect(), style = getComputedStyle(item);
      if (!rect.width || !rect.height || style.visibility === 'hidden' || style.display === 'none') continue;
      // Deliberately scrollable component panes are source-owned, not shell defects.
      let innerScroller = false, hidden = false;
      for (let parent = item.parentElement; parent && parent !== root; parent = parent.parentElement || parent.getRootNode()?.host) {
        if (parent.hidden || parent.inert || parent.getAttribute('aria-hidden') === 'true') hidden = true;
        if (/(auto|scroll)/.test(getComputedStyle(parent).overflowY) && parent.scrollHeight > parent.clientHeight + 1) innerScroller = true;
      }
      if (!hidden && !innerScroller && (rect.left < hostBox.left - 1 || rect.right > hostBox.right + 1 || rect.top < hostBox.top - 1 || rect.bottom > hostBox.bottom + 1)) controls.push(item.textContent.trim().slice(0, 60) || item.getAttribute('aria-label') || item.tagName);
    }
  };
  visit(root);
  const shell = host.closest('.card-preview,.preview-panel');
  const active = (() => { let item = document.activeElement; while (item?.shadowRoot?.activeElement) item = item.shadowRoot.activeElement; return item; })();
  const activeRect = active?.getBoundingClientRect();
  let activeOwner = active;
  while (activeOwner && activeOwner !== host) activeOwner = activeOwner.parentNode || activeOwner.host;
  const activeFits = activeOwner !== host || (activeRect.left >= hostBox.left - 1 && activeRect.right <= hostBox.right + 1 && activeRect.top >= hostBox.top - 1 && activeRect.bottom <= hostBox.bottom + 1);
  return { variant: host.getAttribute('variant'), width: innerWidth, rootHeight: root.offsetHeight, hostHeight: hostBox.height, sourceTop: box.top - hostBox.top, rootFits: box.left >= hostBox.left - 1 && box.right <= hostBox.right + 1 && box.top >= hostBox.top - 1 && box.bottom <= hostBox.bottom + 1, headingFits: !heading || box.top >= heading.bottom + 8, outsideControls: controls, shellScroll: shell?.scrollTop || 0, outerScroll: host.closest('.workbench')?.scrollTop || 0, activeTag: active?.tagName, activeText: active?.textContent?.trim().slice(0, 80), activeFits, pageWidth: document.documentElement.scrollWidth };
}
export async function settled(page, selector = 'sl-preview') {
  await page.waitForFunction(selector => document.querySelector(selector)?.dataset.ready === 'true', selector);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(selector => {
    const host = document.querySelector(selector);
    const root = host?.shadowRoot?.querySelector('.stage > .sl-component');
    if (!root) return true;
    const height = root.getBoundingClientRect().height;
    const previous = window.fitSettling;
    if (!previous || previous.root !== root || Math.abs(previous.height - height) > .05) { window.fitSettling = { root, height, since: performance.now() }; return false; }
    const animations = [];
    const visit = node => { animations.push(...node.getAnimations({ subtree: true })); for (const item of node.querySelectorAll('*')) if (item.shadowRoot) visit(item.shadowRoot); };
    visit(host.shadowRoot);
    return performance.now() - previous.since >= 250 && !animations.some(animation => animation.playState === 'running' && animation.effect?.getTiming().iterations !== Infinity);
  }, selector, { timeout: 10000 });
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}
export function assertFit(result) {
  assert.ok(result.rootFits, JSON.stringify(result));
  assert.ok(result.headingFits, JSON.stringify(result));
  assert.deepEqual(result.outsideControls, [], JSON.stringify(result));
  assert.equal(result.shellScroll, 0, JSON.stringify(result));
  assert.equal(result.outerScroll, 0, JSON.stringify(result));
  assert.ok(result.activeFits, JSON.stringify(result));
  assert.ok(result.pageWidth <= result.width + 1, JSON.stringify(result));
}
export async function initialContentChecks({ page, base, entries, widths, baseline = false }) {
  const results = [];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const category of [...new Set(entries.map(entry => entry.category))]) {
      await page.goto(`${base}/category.html?type=${category}`);
      for (const entry of entries.filter(entry => entry.category === category)) {
        const selector = `sl-preview[variant="${entry.variants[0]}"]`;
        await settled(page, selector);
        const result = await page.evaluate(measureFit, selector);
        if (!baseline) assertFit(result);
        results.push({ mode: 'actual-gallery', ...result });
      }
    }
  }
  return results;
}

export async function lifecycleChecks({ page, base }) {
  const records = [];
  const variant = 'inputs-account-core-profile-v11';
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(`${base}/fit-fixture.html?variant=${variant}&mode=gallery`);
  await settled(page);
  await page.evaluate(() => {
    const original = document.querySelector('.component-card');
    const second = original.cloneNode(true);
    second.querySelector('.card-preview').style.removeProperty('--card-canvas-height');
    second.querySelector('sl-preview').dataset.instance = 'second';
    original.after(second);
  });
  await page.waitForFunction(() => [...document.querySelectorAll('sl-preview')].every(x => x.dataset.ready === 'true'));
  await page.waitForTimeout(500);
  const firstBefore = await page.evaluate(measureFit);
  const secondBefore = await page.evaluate(measureFit, 'sl-preview[data-instance="second"]');
  await page.locator('sl-preview').first().getByRole('textbox', { name: 'About you', exact: true }).fill('Literal Юникод <img src=x onerror=alert(1)>\n'.repeat(16));
  await page.waitForTimeout(500);
  const grown = await page.evaluate(measureFit);
  const secondAfter = await page.evaluate(measureFit, 'sl-preview[data-instance="second"]');
  assertFit(grown); assertFit(secondAfter);
  assert.ok(grown.rootHeight > firstBefore.rootHeight, 'Long text must actually grow the first source root');
  assert.ok(grown.hostHeight > firstBefore.hostHeight, 'The presentation must grow with its source');
  assert.equal(secondBefore.rootHeight, secondAfter.rootHeight);
  assert.equal(secondBefore.hostHeight, secondAfter.hostHeight);
  for (const width of [1024, 768, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(500);
    const result = await page.evaluate(measureFit);
    assertFit(result); records.push({ phase: 'resize', ...result });
  }
  for (let count = 0; count < 5; count++) {
    await page.locator('sl-preview').first().evaluate(host => host.reset());
    await settled(page);
    const result = await page.evaluate(measureFit);
    assertFit(result);
    assert.equal(result.rootHeight, firstBefore.rootHeight, 'Reset must restore the original source height');
    assert.equal(result.hostHeight, firstBefore.hostHeight, 'Reset must restore the original presentation height');
    assert.ok(result.rootHeight < grown.rootHeight, 'Reset must actually shrink the grown source');
    records.push({ phase: 'reset', ...result });
  }
  const cleanup = await page.evaluate(async () => {
    const first = document.querySelector('sl-preview');
    const second = document.querySelector('sl-preview[data-instance="second"]');
    const card = first.closest('.card-preview'), otherCard = second.closest('.card-preview');
    const firstRoot = first.shadowRoot.querySelector('.sl-component');
    const observersFor = node => [...window.fitResizeObservers].filter(observer => observer.fitTargets?.has(node)).length;
    const before = observersFor(firstRoot);
    first.setAttribute('variant', 'like');
    const afterVariant = { observers: observersFor(firstRoot), value: card.style.getPropertyValue('--card-canvas-height') };
    const secondRoot = second.shadowRoot.querySelector('.sl-component');
    second.remove();
    const disconnected = { observers: observersFor(secondRoot), value: otherCard.style.getPropertyValue('--card-canvas-height') };
    otherCard.append(second);
    return { before, afterVariant, disconnected };
  });
  assert.equal(cleanup.before, 1);
  assert.deepEqual(cleanup.afterVariant, { observers: 0, value: '' });
  assert.deepEqual(cleanup.disconnected, { observers: 0, value: '' });
  await page.waitForTimeout(500);
  const reconnect = await page.evaluate(measureFit, 'sl-preview[data-instance="second"]');
  assertFit(reconnect);
  records.push({ phase: 'isolation', firstBefore, grown, secondBefore, secondAfter }, { phase: 'cleanup', ...cleanup }, { phase: 'reconnect', ...reconnect });
  return records;
}

export async function focusedActionChecks({ page, base, entries }) {
  const records = [];
  for (const width of [320, 1024]) for (const mode of ['gallery', 'workbench']) for (const purpose of ['password', 'sessions']) {
    const entry = entries.find(entry => entry.variants[0].endsWith(`account-core-${purpose}-v11`));
    const selector = `sl-preview[variant="${entry.variants[0]}"]`;
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(mode === 'workbench' ? `${base}/component.html?component=${entry.id}` : `${base}/category.html?type=${entry.category}`);
    assert.ok(response?.ok());
    await settled(page, selector);
    const host = page.locator(selector);
    if (purpose === 'password') {
      const inputs = host.locator('input');
      assert.equal(await inputs.count(), 3);
      await inputs.nth(0).fill('Current-example-42');
      await inputs.nth(1).fill('New-example-42');
      await inputs.nth(2).fill('Mismatch-example-42');
      await host.getByRole('button', { name: 'Show password', exact: true }).first().click();
      assert.equal(await inputs.nth(0).getAttribute('type'), 'text');
      await host.getByRole('button', { name: 'Change password', exact: true }).click();
      assert.equal(await inputs.nth(2).evaluate(input => input.getRootNode().activeElement === input), true);
    } else await host.getByRole('button', { name: 'End other sessions', exact: true }).click();
    const before = await page.evaluate(selector => {
      let focused = document.activeElement;
      while (focused?.shadowRoot?.activeElement) focused = focused.shadowRoot.activeElement;
      window.fitExpectedFocus = focused;
      const host = document.querySelector(selector);
      return { tag: focused?.tagName, text: focused?.textContent?.trim(), shellScroll: host.closest('.card-preview,.preview-panel').scrollTop };
    }, selector);
    await settled(page, selector);
    const expanded = await page.evaluate(measureFit, selector);
    assertFit(expanded);
    await page.setViewportSize({ width: width === 320 ? 1024 : 320, height: 900 });
    await settled(page, selector);
    const after = await page.evaluate(measureFit, selector);
    assertFit(after);
    const sameFocus = await page.evaluate(() => {
      let focused = document.activeElement;
      while (focused?.shadowRoot?.activeElement) focused = focused.shadowRoot.activeElement;
      return focused === window.fitExpectedFocus;
    });
    assert.equal(sameFocus, true, `${purpose}: wrapper resizing changed the exact source focus`);
    await host.evaluate(host => host.reset());
    await settled(page, selector);
    const reset = await page.evaluate(measureFit, selector);
    assertFit(reset);
    records.push({ purpose, mode, width, before, expanded, after, sameFocus, reset });
  }
  return records;
}
