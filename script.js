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


/* ════════════════════════════════════════════════════
   MODAL ADHÉSION — Complete logic
════════════════════════════════════════════════════ */
(function() {
  const overlay  = document.getElementById('modalAdhesion');
  const closeBtn = document.getElementById('modalClose');
  if (!overlay) return;

  // Open / Close
  window.openModal = function() {
    overlay.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    modalGoStep(1);
  };
  window.closeModal = function() {
    overlay.classList.remove('modal-open');
    document.body.style.overflow = '';
  };
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Step navigation
  window.modalGoStep = function(step) {
    if (step === 3 && !validateStep2()) return;
    for (let s = 1; s <= 4; s++) {
      const el  = document.getElementById('step' + s);
      const ind = document.getElementById('step' + s + '-ind');
      if (el)  el.style.display  = (s === step) ? 'block' : 'none';
      if (ind) {
        ind.className = 'modal-step';
        if (s < step)  ind.classList.add('modal-step--done');
        if (s === step) ind.classList.add('modal-step--active');
      }
    }
    if (step === 3) updateSummary();
    overlay.querySelector('.modal-box').scrollTop = 0;
  };

  // Validate step 2
  function validateStep2() {
    const ids = ['fPrenom','fNom','fEmail','fDob','fVille'];
    let ok = true;
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('input-error', !el.value.trim());
      if (!el.value.trim()) ok = false;
    });
    const rgpd = document.getElementById('fRgpd');
    if (rgpd && !rgpd.checked) {
      rgpd.parentElement.style.color = '#ef4444';
      ok = false;
    } else if (rgpd) { rgpd.parentElement.style.color = ''; }
    if (!ok) {
      const msg = document.getElementById('step2Msg');
      if (msg) { msg.textContent = '⚠️ Veuillez remplir tous les champs obligatoires.'; msg.style.color = '#ef4444'; }
    }
    return ok;
  }

  // Toggle conjoint fields
  document.querySelectorAll('input[name="plan"]').forEach(r => {
    r.addEventListener('change', () => {
      const cb = document.getElementById('conjoint-block');
      if (cb) cb.style.display = (r.value === '30') ? 'block' : 'none';
      updateSummary();
    });
  });

  // Update summary
  window.updateSummary = function() {
    const plan  = document.querySelector('input[name="plan"]:checked');
    if (!plan) return;
    const price = parseInt(plan.value);
    const label = price === 30 ? 'Adhésion Couple' : 'Adhésion Individuelle';
    const str   = price.toFixed(2).replace('.', ',') + ' €';
    ['summaryPlan','summaryPrice','summaryTotal'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = i === 0 ? label : str;
    });
    const pa = document.getElementById('paypalAmt');
    if (pa) pa.textContent = str;
    const pb = document.getElementById('payBtn');
    if (pb) pb.innerHTML = '<i class="fas fa-lock"></i> Confirmer &amp; Payer ' + str;
  };

  // Payment method
  window.selectPayMethod = function(btn, method) {
    document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('pay-method-btn--active'));
    btn.classList.add('pay-method-btn--active');
    const ids = ['Card','Paypal','Helloasso','Virement','Cheque'];
    ids.forEach(id => {
      const f = document.getElementById('pm' + id + '-form');
      if (f) f.style.display = 'none';
    });
    const cap = method.charAt(0).toUpperCase() + method.slice(1);
    const form = document.getElementById('pm' + cap + '-form');
    if (form) form.style.display = 'block';
    const pb = document.getElementById('payBtn');
    const pbtns = document.getElementById('payBtns');
    if (['virement','cheque'].includes(method)) {
      if (pb) { pb.innerHTML = 'Terminer <i class="fas fa-check"></i>'; pb.onclick = () => modalGoStep(4); }
    } else if (['paypal','helloasso'].includes(method)) {
      if (pb) pb.style.display = 'none';
    } else {
      if (pb) { pb.style.display = ''; pb.onclick = submitPayment; updateSummary(); }
    }
  };

  // Card formatting
  window.formatCard = function(el) {
    let v = el.value.replace(/\D/g,'').slice(0,16);
    el.value = v.match(/.{1,4}/g)?.join(' ') || v;
  };
  window.formatExp = function(el) {
    let v = el.value.replace(/\D/g,'').slice(0,4);
    if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2);
    el.value = v;
  };
  window.updateCardPreview = function() {
    const n = document.getElementById('cardNum');
    const h = document.getElementById('cardName');
    const e = document.getElementById('cardExp');
    const pn = document.getElementById('previewNum');
    const ph = document.getElementById('previewName');
    const pe = document.getElementById('previewExp');
    if (pn && n) pn.textContent = n.value || '•••• •••• •••• ••••';
    if (ph && h) ph.textContent = (h.value || 'NOM PRÉNOM').toUpperCase();
    if (pe && e) pe.textContent = e.value || 'MM/AA';
  };

  window.submitPayment = function() {
    const n = document.getElementById('cardNum');
    const h = document.getElementById('cardName');
    const e = document.getElementById('cardExp');
    const c = document.getElementById('cardCvc');
    if (!n?.value || !h?.value || !e?.value || !c?.value) {
      alert('Veuillez remplir toutes les informations de carte.');
      return;
    }
    const pb = document.getElementById('payBtn');
    if (pb) { pb.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...'; pb.disabled = true; }
    setTimeout(() => {
      modalGoStep(4);
      if (pb) { pb.innerHTML = ''; pb.disabled = false; pb.onclick = submitPayment; }
    }, 2000);
  };
})();

/* ════════════════════════════════════════════════════
   MAP SWITCH
════════════════════════════════════════════════════ */
window.switchMap = function(btn, mapId) {
  document.querySelectorAll('.map-tab').forEach(b => b.classList.remove('map-tab--active'));
  btn.classList.add('map-tab--active');
  ['gmap','streetview'].forEach(id => {
    const f = document.getElementById(id);
    if (f) f.style.display = (id === mapId) ? 'block' : 'none';
  });
};
