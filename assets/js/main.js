// Mobile nav
const burger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
burger?.addEventListener('click', () => {
  const open = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = open ? 'none' : 'flex';
  burger.setAttribute('aria-expanded', String(!open));
});

// Testimonials carousel (simple)
const cards = Array.from(document.querySelectorAll('.t-card'));
const prevBtn = document.querySelector('.t-prev');
const nextBtn = document.querySelector('.t-next');
let idx = 0;

function show(i) {
  cards.forEach((c, k) => c.classList.toggle('active', k === i));
}
function prev() { idx = (idx - 1 + cards.length) % cards.length; show(idx); }
function next() { idx = (idx + 1) % cards.length; show(idx); }

prevBtn?.addEventListener('click', prev);
nextBtn?.addEventListener('click', next);

let auto = setInterval(next, 5000);
document.getElementById('testimonials')?.addEventListener('mouseenter', () => clearInterval(auto));
document.getElementById('testimonials')?.addEventListener('mouseleave', () => auto = setInterval(next, 5000));
