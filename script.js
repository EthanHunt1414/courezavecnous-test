/* ====================================================
   CAN SARREGUEMINES – SCRIPT.JS
   Navbar · Hero Slider · Infinite Carousel · Tabs
   Event Filters · Reveal · Counters
===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL ─────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveLink();
  }, { passive: true });

  /* ── HAMBURGER MENU ─────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Close on nav link click
  navMenu.querySelectorAll('a.nav-link, a.nav-btn').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  /* ── ACTIVE NAV LINK ────────────────────────────── */
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  function updateActiveLink() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
  }

  /* ── SMOOTH SCROLL ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ── HERO BG SLIDER ─────────────────────────────── */
  const slides   = document.querySelectorAll('.hero-bg-slide');
  const dots     = document.querySelectorAll('.hdot');
  let heroIdx    = 0;
  let heroTimer;

  function goSlide(idx) {
    slides[heroIdx].classList.remove('active');
    dots[heroIdx].classList.remove('active');
    heroIdx = (idx + slides.length) % slides.length;
    slides[heroIdx].classList.add('active');
    dots[heroIdx].classList.add('active');
  }

  function nextSlide() { goSlide(heroIdx + 1); }

  function startHeroAuto() {
    stopHeroAuto();
    heroTimer = setInterval(nextSlide, 5000);
  }
  function stopHeroAuto() { clearInterval(heroTimer); }

  dots.forEach(d => {
    d.addEventListener('click', () => {
      goSlide(parseInt(d.dataset.idx));
      startHeroAuto();
    });
  });

  startHeroAuto();

  /* ── HERO COUNTER ANIMATION ─────────────────────── */
  const counters = document.querySelectorAll('.hstat-n');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(el => {
      const target = parseInt(el.dataset.target) || 0;
      let start = 0;
      const step = target / 60; // ~1s at 60fps
      const tick = () => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start) + '+';
        if (start < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  // Start counters when hero is in view
  const heroObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) animateCounters();
  }, { threshold: 0.4 });
  const heroSec = document.getElementById('accueil');
  if (heroSec) heroObs.observe(heroSec);

  /* ── INFINITE CAROUSEL (Pause on hover) ─────────── */
  // CSS animation handles the movement; JS only pauses on hover
  document.querySelectorAll('.carousel-track').forEach(track => {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  });

  /* ── EVENT FILTERS ──────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      eventCards.forEach(card => {
        const show = f === 'all' || card.dataset.type === f;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity .35s ease, transform .35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        }
      });
    });
  });

  /* ── COURSE TABS ────────────────────────────────── */
  const ctabs  = document.querySelectorAll('.ctab');
  const panels = document.querySelectorAll('.course-panel');

  ctabs.forEach(tab => {
    tab.addEventListener('click', () => {
      ctabs.forEach(t => t.classList.remove('ctab--active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('ctab--active');
      const panel = document.getElementById(`tab-${tab.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── REVEAL ON SCROLL ───────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.news-card, .event-card, .result-card, .archive-card, ' +
    '.media-card, .info-card, .lien-item, .partner-item, .challenge-board'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObs.observe(el));

  /* ── DROPDOWN MOBILE TOGGLE ─────────────────────── */
  document.querySelectorAll('.nav-link--drop').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        const menu = link.nextElementSibling;
        if (menu) menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  /* ── CONSOLE GREETING ───────────────────────────── */
  console.log('%c🏃 CAN Sarreguemines', 'color:#1d4ed8;font-size:20px;font-weight:900;');
  console.log('%cCourez Avec Nous — Site modernisé 2026', 'color:#64748b;font-size:13px;');
});
