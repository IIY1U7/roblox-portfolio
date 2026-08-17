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

const products = [
  [20000, '1940245813'], [10000, '1940881826'], [9500, '1947417367'],
  [9000, '1944282455'], [8500, '1951305288'], [8000, '1944528441'],
  [7500, '1947897369'], [7000, '1943671830'], [6500, '1951125292'],
  [6000, '1940581889'], [5500, '1948857370'], [5000, '1943689799'],
  [4500, '1944870523'], [4000, '1940095813'], [3500, '1944432772'],
  [3000, '1938214160'], [2500, '1944630736'], [2000, '1942129747'],
  [1500, '1944432430'], [1000, '1940851805'], [900, '1944642434'],
  [800, '1944258476'], [700, '1941745851'], [600, '1940227805'],
  [500, '1940329805'], [400, '1941643864'], [300, '1940917840'],
  [200, '1940011842'], [100, '1940305870'],
  [75, '1944426804'], [50, '1944042823'], [25, '1940726245']
];

function findProducts(total) {
  const selection = [];
  let remaining = total;
  products.forEach(product => {
    while (remaining >= product[0]) {
      selection.push(product);
      remaining -= product[0];
    }
  });
  return remaining === 0 ? selection : null;
}

const amountForm = document.querySelector('#amount-form');
const result = document.querySelector('#calculation-result');

if (amountForm) {
  amountForm.addEventListener('submit', event => {
    event.preventDefault();
    const french = window.portfolioLanguage === 'fr';
    const amount = Number(document.querySelector('#robux-amount').value);
    if (!Number.isInteger(amount) || amount < 100 || amount % 100 !== 0) {
      result.innerHTML = `<p class="result-error">${french ? 'Choisissez un montant d’au moins 100, par tranche de 100 Robux.' : 'Choose an amount of at least 100, in increments of 100 Robux.'}</p>`;
      return;
    }
    const selection = findProducts(amount);
    if (!selection) {
      result.innerHTML = `<p class="result-error">${french ? 'Ce montant ne peut pas être composé avec les Developer Products disponibles.' : 'This amount cannot be created with the available Developer Products.'}</p>`;
      return;
    }
    const cards = selection.map(product => `<div class="product-card" data-product-id="${product[1]}"><b>${product[0].toLocaleString()} Robux</b></div>`).join('');
    result.innerHTML = `<div class="result-links">${cards}</div>`;
    result.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        window.open(`https://www.roblox.com/game-pass/${card.dataset.productId}/robux`, '_blank', 'noopener');
      });
    });
  });
}

document.querySelectorAll('[data-payment-tab]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-payment-tab]').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.payment-panel').forEach(panel => {
      panel.hidden = panel.id !== `panel-${button.dataset.paymentTab}`;
    });
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
