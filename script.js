const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-navigation');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.querySelector('.active')?.classList.remove('active');
    link.classList.add('active');
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      const original = button.innerHTML;
      button.textContent = window.portfolioLanguage === 'fr' ? 'COPIÉ !' : 'COPIED!';
      setTimeout(() => { button.innerHTML = original; }, 1400);
    } catch {
      window.prompt(window.portfolioLanguage === 'fr' ? 'Copiez ce pseudo Discord :' : 'Copy this Discord username:', value);
    }
  });
});

const buildCards = [...document.querySelectorAll('.build-card')];
const buildEmpty = document.querySelector('.build-empty');
const buildFilterCarousel = document.querySelector('[data-build-filter-carousel]');
if (buildFilterCarousel) {
  const filterButtons = [...buildFilterCarousel.querySelectorAll('[data-build-filter]')];
  const previousButton = buildFilterCarousel.querySelector('[data-build-filter-prev]');
  const nextButton = buildFilterCarousel.querySelector('[data-build-filter-next]');
  let filterPage = 0;

  const getFilterPageSize = () => {
    if (window.matchMedia('(max-width: 520px)').matches) return 2;
    if (window.matchMedia('(max-width: 760px)').matches) return 3;
    return 5;
  };

  const showFilterPage = () => {
    const pageSize = getFilterPageSize();
    const pageCount = Math.ceil(filterButtons.length / pageSize);
    filterPage = (filterPage + pageCount) % pageCount;
    filterButtons.forEach((button, index) => {
      button.hidden = Math.floor(index / pageSize) !== filterPage;
    });
  };

  previousButton?.addEventListener('click', () => {
    filterPage -= 1;
    showFilterPage();
  });
  nextButton?.addEventListener('click', () => {
    filterPage += 1;
    showFilterPage();
  });
  window.addEventListener('resize', () => {
    filterPage = 0;
    showFilterPage();
  });
  showFilterPage();
}
document.querySelectorAll('[data-build-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.buildFilter;
    document.querySelectorAll('[data-build-filter]').forEach(item => item.classList.toggle('active', item === button));
    let visible = 0;
    buildCards.forEach(card => {
      const show = category === 'all' || card.dataset.buildCategory === category;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (buildEmpty) buildEmpty.hidden = visible !== 0;
  });
});

// Build previews intentionally remain static and do not open a lightbox.

const bouncingParts = [...document.querySelectorAll('.floating-part')];
if (bouncingParts.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const page = document.querySelector('.page-shell').getBoundingClientRect();
  const randomBetween = (minimum, maximum) => minimum + Math.random() * Math.max(0, maximum - minimum);
  const parts = bouncingParts.map((element, index) => {
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const leftSpace = page.left - width - 8;
    const rightStart = page.right + 8;
    const rightSpace = innerWidth - rightStart - width;
    const side = index % 2 === 0 ? 'left' : 'right';
    const x = side === 'left'
      ? randomBetween(4, leftSpace)
      : randomBetween(rightStart, rightStart + rightSpace);
    const speed = randomBetween(200, 250);
    const angle = randomBetween(.42, 1.14);
    return {
      element,
      x,
      y: randomBetween(4, innerHeight - height - 4),
      vx: Math.cos(angle) * speed * (Math.random() < .5 ? -1 : 1),
      vy: Math.sin(angle) * speed * (Math.random() < .5 ? -1 : 1)
    };
  });
  let previous = performance.now();
  const moveParts = now => {
    const elapsed = Math.min((now - previous) / 1000, .04);
    previous = now;
    parts.forEach(part => {
      const width = part.element.offsetWidth;
      const height = part.element.offsetHeight;
      part.x += part.vx * elapsed;
      part.y += part.vy * elapsed;
      if (part.x <= 0) { part.x = 0; part.vx = Math.abs(part.vx); }
      if (part.x + width >= innerWidth) { part.x = innerWidth - width; part.vx = -Math.abs(part.vx); }
      if (part.y <= 0) { part.y = 0; part.vy = Math.abs(part.vy); }
      if (part.y + height >= innerHeight) { part.y = innerHeight - height; part.vy = -Math.abs(part.vy); }
      part.element.style.transform = `translate3d(${part.x}px, ${part.y}px, 0)`;
    });
    requestAnimationFrame(moveParts);
  };
  requestAnimationFrame(moveParts);
}

const buildTabs = [...document.querySelectorAll('[data-build-tab]')];
function selectBuildTab(tab) {
  buildTabs.forEach(button => {
    const selected = button === tab;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    panel.hidden = !selected;
    if (!selected) panel.querySelectorAll('video').forEach(video => video.pause());
  });
}
buildTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectBuildTab(tab));
  tab.addEventListener('keydown', event => {
    let nextIndex;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % buildTabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + buildTabs.length) % buildTabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = buildTabs.length - 1;
    else return;
    event.preventDefault();
    selectBuildTab(buildTabs[nextIndex]);
    buildTabs[nextIndex].focus();
  });
});
