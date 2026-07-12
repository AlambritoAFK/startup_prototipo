/* =============================================================
   MENÚ HAMBURGUESA (responsive)
   Al abrir: se oscurece el fondo, se bloquea el scroll y solo
   se puede interactuar con el navbar.
   Al cerrar: desaparece el fondo oscuro y se libera el scroll.
============================================================= */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('.nav-menu a');

function openMenu() {
  navMenu.classList.add('active');
  navOverlay.classList.add('active');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('no-scroll');
}

function closeMenu() {
  navMenu.classList.remove('active');
  navOverlay.classList.remove('active');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('no-scroll');
}

hamburger.addEventListener('click', () => {
  const isOpen = navMenu.classList.contains('active');
  isOpen ? closeMenu() : openMenu();
});

navOverlay.addEventListener('click', closeMenu);
navLinks.forEach((link) => link.addEventListener('click', closeMenu));

// Si la ventana crece más allá del breakpoint móvil, aseguramos que el menú quede cerrado
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

/* =============================================================
   ANIMACIÓN DE TARJETAS DE PROYECTOS
   Cada tarjeta queda fija (sticky) y, al hacer scroll, la
   siguiente sube y la va tapando. Aquí reforzamos ese efecto
   escalando y oscureciendo ligeramente la tarjeta que queda
   debajo a medida que la siguiente la va cubriendo.
============================================================= */
const projectCards = document.querySelectorAll('.project-card');
const STACK_TRANSITION_DISTANCE = 150; // px de recorrido para completar la transición

function updateStackedCards() {
  projectCards.forEach((card, index) => {
    const nextCard = projectCards[index + 1];
    if (!nextCard) return;

    const cardTop = parseFloat(getComputedStyle(card).top) || 0;
    const nextCardRect = nextCard.getBoundingClientRect();

    let progress = 1 - (nextCardRect.top - cardTop) / STACK_TRANSITION_DISTANCE;
    progress = Math.min(Math.max(progress, 0), 1);

    const scale = 1 - progress * 0.08;
    const brightness = 1 - progress * 0.25;

    card.style.transform = `scale(${scale})`;
    card.style.filter = `brightness(${brightness})`;
  });
}

window.addEventListener('scroll', updateStackedCards, { passive: true });
window.addEventListener('resize', updateStackedCards);
updateStackedCards();
