(function () {
  const file = location.pathname.split('/').pop().toLowerCase();
  addEventListener('DOMContentLoaded', () => {
    if (file === 'payement.html') {
      document.querySelectorAll('.payment-method').forEach(method => {
        if (method.textContent.toLowerCase().includes('rixty')) method.remove();
      });

      const replaceLegacyLogo = (selector, source, className) => {
        const legacy = document.querySelector(selector);
        if (!legacy || legacy.tagName === 'IMG') return;
        const image = document.createElement('img');
        image.className = `payment-logo ${className}`;
        image.src = source;
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');
        legacy.replaceWith(image);
      };
      replaceLegacyLogo('.robux-mark', 'assets/robux-payment-logo.png?v=4', 'robux-logo');
      replaceLegacyLogo('.paypal-logo', 'assets/paypal-payment-logo.png?v=4', 'paypal-logo');
      replaceLegacyLogo('.card-logo', 'assets/card-payment-logo.png?v=4', 'card-logo');
    }
  });
})();
