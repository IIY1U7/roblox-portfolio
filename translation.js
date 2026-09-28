const browserLanguage = navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en';
const savedLanguage = localStorage.getItem('portfolio-language');
const portfolioLanguage = savedLanguage === 'fr' || savedLanguage === 'en' ? savedLanguage : browserLanguage;
window.portfolioLanguage = portfolioLanguage;

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setAllText(selector, value) {
  document.querySelectorAll(selector).forEach(element => { element.textContent = value; });
}

function applyPortfolioLanguage(language) {
  window.portfolioLanguage = language;
  document.documentElement.lang = language;

  const french = language === 'fr';
  setAllText('#main-navigation a[href^="index.html"]', french ? 'Accueil' : 'Homepage');
  setAllText('#main-navigation a[href="index.html#build"]', french ? 'Créations' : 'Build');
  setAllText('#main-navigation a[href^="build.html"]', french ? 'Créations' : 'Build');
  setAllText('#main-navigation a[href="index.html#contribution"]', 'Commissions');
  setAllText('#main-navigation a[href^="contribution.html"]', 'Commissions');
  setAllText('#main-navigation a[href="index.html#resaux"]', french ? 'Réseaux' : 'Socials');
  setAllText('#main-navigation a[href^="socials.html"]', french ? 'Réseaux' : 'Socials');
  setAllText('.index-navigation a[href^="index.html"]', french ? 'Accueil' : 'Homepage');
  setAllText('.index-navigation a[href="index.html#build"]', french ? 'Créations' : 'Build');
  setAllText('.index-navigation a[href="index.html#contribution"]', 'Commissions');
  setAllText('.index-navigation a[href="index.html#resaux"]', french ? 'Réseaux' : 'Socials');
  setText('.index-eyebrow', 'STUD BUILDER');
  setText('.index-intro h2', french ? 'Bienvenue sur mon portfolio' : 'Welcome to my portfolio');
  setText('.index-description', french
    ? 'Je m’appelle IY1U7. Je suis sur Roblox depuis 2017 et builder depuis 2018. Je crée des maps, des pets, des arbres et des assets entièrement en studs.'
    : 'My name is IY1U7. I joined Roblox in 2017 and have been building since 2018. I create maps, pets, trees and assets entirely with studs.');
  setText('.group-label', french ? 'GROUPE ROBLOX' : 'ROBLOX GROUP');
  setText('.group-support', french
    ? 'Rejoins le groupe pour me soutenir, ça m’aide énormément !'
    : 'Join the group to support me, it helps enormously!');
  setText('.group-goal-heading b', french ? 'OBJECTIF COMMUNAUTÉ' : 'COMMUNITY GOAL');
  setText('.group-goal-heading em', french ? '5 / 100 membres · 5 %' : '5 / 100 members · 5%');

  if (document.querySelector('.socials-page')) {
    setText('.payment-heading p', french ? 'RÉSEAUX / CONTACT' : 'SOCIALS / CONTACT');
    setText('.payment-heading h1', french ? 'Réseaux' : 'Socials');
  } else if (document.querySelector('.contribution-page')) {
    setText('.payment-heading>p:first-child', french ? 'PROJETS / COMMISSIONS' : 'PROJECTS / COMMISSIONS');
    setText('.payment-heading h1', 'Commissions');
    setText('.contribution-introduction', french
      ? 'Voici les expériences Roblox auxquelles j’ai contribué.'
      : 'Here are the Roblox experiences I have contributed to.');
    setText('.project-description', french
      ? 'Une expérience Roblox à laquelle j’ai contribué en tant que builder.'
      : 'A Roblox experience I contributed to as a builder.');
    setText('.project-details div:nth-child(1) dt', french ? 'Rôle' : 'Role');
    setText('.project-details div:nth-child(1) dd', 'Builder');
    setText('.project-details div:nth-child(2) dt', french ? 'Visites' : 'Visits');
    setText('.project-details div:nth-child(2) dd', '250');
    const projectLink = document.querySelector('.project-link-label');
    if (projectLink) projectLink.innerHTML = `${french ? 'Ouvrir sur Roblox' : 'Open on Roblox'} <span aria-hidden="true">↗</span>`;
  } else if (document.querySelector('.build-page')) {
    setText('.payment-heading p', french ? 'CRÉATIONS / ASSETS' : 'BUILDS / ASSETS');
    setText('.payment-heading h1', french ? 'Créations' : 'Build');
    setText('.build-introduction', french
      ? 'Vous pouvez découvrir ici toutes mes créations et tous mes assets Roblox.'
      : 'Here you can explore all my Roblox creations and assets.');
    setText('[data-build-filter="all"]', french ? 'TOUS' : 'ALL');
    setText('[data-build-filter="trees"]', french ? 'ARBRE' : 'TREE');
    setText('[data-build-filter="shops"]', french ? 'BOUTIQUE' : 'SHOP');
    setText('[data-build-filter="pets"]', french ? 'ANIMAUX' : 'PET');
    setText('[data-build-filter="cars"]', french ? 'VÉHICULE' : 'CAR');
    setText('[data-build-filter="flowers"]', french ? 'FLEUR' : 'FLOWER');
    setText('[data-build-filter="statues"]', french ? 'STATUE' : 'STATUE');
    setText('[data-build-filter="food"]', french ? 'NOURRITURE' : 'FOOD');
    setText('[data-build-filter="guns"]', french ? 'ARME' : 'GUN');
    setText('[data-build-filter="other"]', french ? 'AUTRE' : 'ANOTHER');
    setText('.build-card:nth-child(1) h2', french ? 'Bouleau' : 'Birch Tree');
    setText('.build-card:nth-child(2) h2', french ? 'Arbre fleuri' : 'Flower Tree');
    setText('.build-card:nth-child(3) h2', french ? 'Acacia' : 'Acacia Tree');
    setText('.build-card:nth-child(4) h2', french ? 'Sapin' : 'Pine Tree');
    setText('.build-card:nth-child(5) h2', french ? 'Palmier' : 'Palm Tree');
    setText('.build-card:nth-child(6) h2', french ? 'Bouleau' : 'Birch Tree');
    setText('.build-card:nth-child(7) h2', french ? 'Arbre classique' : 'Basic Tree');
    setText('.build-card:nth-child(8) h2', french ? 'Arbre fantastique' : 'Fantasy Tree');
    setText('.build-card:nth-child(9) h2', 'Sniper');
    setText('.build-card:nth-child(10) h2', french ? 'Arme inconnue' : 'Unknown Weapon');
    setText('.build-card:nth-child(11) h2', 'Sniper');
    setText('.build-card:nth-child(12) h2', french ? 'Orchidée' : 'Orchid');
    setText('.build-card:nth-child(13) h2', french ? 'Maïs' : 'Corn');
    setText('.build-card:nth-child(14) h2', french ? 'Marguerite' : 'Daisy');
    setText('.build-card:nth-child(15) h2', french ? 'Statue de la Liberté' : 'Statue of Liberty');
    setText('.build-card:nth-child(16) h2', french ? 'Cristal de glace' : 'Ice Crystal');
    setText('.build-card:nth-child(17) h2', french ? 'Cristal' : 'Crystal');
    setText('.build-card:nth-child(18) h2', french ? 'Boutique' : 'Shop');
    setText('.build-card:nth-child(19) h2', french ? 'Classement' : 'Leader Board');
    setText('.build-card:nth-child(20) h2', french ? 'Lampadaire' : 'Street Lamp');
    setText('.build-card:nth-child(21) h2', french ? 'Camion' : 'Truck');
    setText('.build-card:nth-child(22) h2', french ? 'Scooter' : 'Scooter');
    setText('.build-card:nth-child(23) h2', french ? 'Voiture' : 'Car');
    setText('.build-card:nth-child(24) h2', french ? 'Poubelle de rue' : 'Street Trash Can');
    setText('.build-card:nth-child(25) h2', french ? 'Banc' : 'Bench');
    setText('.build-card:nth-child(26) h2', french ? 'Radio-cassette' : 'BoomBox');
    document.querySelectorAll('.build-card').forEach((card) => {
      const tag = card.querySelector('.build-tag');
      if (!tag) return;
      const labels = {
        trees: french ? 'ARBRE' : 'TREE',
        shops: french ? 'BOUTIQUE' : 'SHOP',
        pets: french ? 'ANIMAL' : 'PET',
        cars: french ? 'VÉHICULE' : 'CAR',
        flowers: french ? 'FLEUR' : 'FLOWER',
        statues: 'STATUE',
        food: french ? 'NOURRITURE' : 'FOOD',
        guns: french ? 'ARME' : 'GUN',
        other: french ? 'AUTRE' : 'ANOTHER'
      };
      tag.textContent = labels[card.dataset.buildCategory] || (french ? 'AUTRE' : 'ANOTHER');
    });
    document.querySelectorAll('.build-view').forEach(button => {
      button.innerHTML = `${french ? 'VOIR' : 'VIEW'} <span>›</span>`;
    });
    setText('.build-empty', french ? 'Aucune création dans cette catégorie pour le moment.' : 'No creation in this category yet.');
  }
  setText('.socials-introduction', french ? 'Retrouvez ici mes réseaux et les différentes façons de me contacter !' : 'Here you can find my socials and ways to contact me!');
  setText('.copy-discord', french ? 'COPIER LE PSEUDO' : 'COPY USERNAME');
  setText('.social-card:nth-of-type(1) small', french ? 'Vous pouvez m’ajouter sur Discord !' : 'You can add me on Discord!');
  setText('.social-card:nth-of-type(2) small', french ? 'Builder depuis 2018 · Découvrez mon profil Roblox !' : 'Builder since 2018 · Check out my Roblox profile!');
  setText('.social-card:nth-of-type(2) .social-action', french ? 'VOIR LE PROFIL  ›' : 'VIEW PROFILE  ›');
  setText('.discord-server-card small', french ? 'Vous pouvez rejoindre mon serveur Discord ^^ !' : 'You can join my server Discord ^^ !');
  setText('.disabled-social-action', french ? 'BIENTÔT' : 'COMING SOON');
  setText('.footer-thanks', french ? 'Merci d’avoir visité mon portfolio !' : 'Thanks for visiting my portfolio!');
  setText('.footer-message', french ? 'Construisons quelque chose d’incroyable.' : 'Let’s build something amazing.');
  document.querySelectorAll('.language-toggle [data-lang]').forEach(option => {
    option.classList.toggle('active-language', option.dataset.lang === language);
    option.setAttribute('aria-pressed', String(option.dataset.lang === language));
  });
}

applyPortfolioLanguage(portfolioLanguage);

document.querySelectorAll('.language-toggle [data-lang]').forEach(button => {
  button.addEventListener('click', () => {
    const nextLanguage = button.dataset.lang;
    localStorage.setItem('portfolio-language', nextLanguage);
    applyPortfolioLanguage(nextLanguage);
  });
});

// Other browser languages are translated automatically after the site is hosted.
window.gtranslateSettings = {
  default_language: 'en',
  detect_browser_language: savedLanguage === null && !navigator.language.toLowerCase().startsWith('fr'),
  native_language_names: true,
  wrapper_selector: '.gtranslate_wrapper',
  languages: [
    'en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg',
    'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo',
    'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha',
    'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw',
    'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk',
    'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ps', 'fa',
    'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si',
    'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'te', 'th', 'tr',
    'uk', 'ur', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
  ]
};
