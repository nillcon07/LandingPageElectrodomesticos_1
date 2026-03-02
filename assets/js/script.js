// ===================================================
//  ElectroHogar – Main JavaScript
// ===================================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('scrollTop').classList.toggle('visible', window.scrollY > 400);
});

// --- Mobile hamburger ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
// Close on nav link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- Scroll to top ---
document.getElementById('scrollTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Cart ---
let cartCount = 0;
const cartCountEl = document.getElementById('cartCount');
const cartToast = document.getElementById('cartToast');
const toastMsg = document.getElementById('toastMsg');

function showToast(msg) {
  toastMsg.textContent = msg;
  cartToast.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => cartToast.classList.remove('show'), 3000);
}

document.querySelectorAll('.btn-add-cart').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const productName = e.target.dataset.product;
    cartCount++;
    cartCountEl.textContent = cartCount;
    showToast(`"${productName}" agregado al carrito 🛒`);
    // Bounce animation on cart button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.style.transform = 'scale(1.3)';
    setTimeout(() => cartBtn.style.transform = 'scale(1)', 300);
  });
});

// --- Product Filters ---
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- Intersection Observer for fade-in animations ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.product-card, .testimonial-card, .feature-item, .contact-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// --- Countdown Timer ---
function initCountdown() {
  // Set end date to 2 days from now
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 2);
  endDate.setHours(endDate.getHours() + 14);
  endDate.setMinutes(endDate.getMinutes() + 38);

  function updateCountdown() {
    const now = new Date();
    const diff = endDate - now;
    if (diff <= 0) {
      document.getElementById('cd-days').textContent = '00';
      document.getElementById('cd-hours').textContent = '00';
      document.getElementById('cd-mins').textContent = '00';
      document.getElementById('cd-secs').textContent = '00';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
initCountdown();

// --- Contact Form ---
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Enviar Mensaje ✉️';
    btn.disabled = false;
    form.reset();
    const successEl = document.getElementById('formSuccess');
    successEl.classList.add('show');
    setTimeout(() => successEl.classList.remove('show'), 5000);
  }, 1200);
});

// --- Smooth scroll for all anchor nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 90;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navLinkEls.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = '#fff';
      link.style.background = 'rgba(255,255,255,0.12)';
    } else {
      link.style.background = '';
    }
  });
}, { passive: true });
