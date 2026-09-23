/* ===== XTS Tech Support - Main JS ===== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- AOS Init ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile menu toggle ---- */
  const menuBtn  = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen  = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      menuIconOpen ?.classList.toggle('hidden', open);
      menuIconClose?.classList.toggle('hidden', !open);
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuIconOpen ?.classList.remove('hidden');
        menuIconClose?.classList.add('hidden');
      });
    });
  }

  /* ---- Typing animation ---- */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const words = ['Computer Repairs', 'Virus Removal', 'Wi-Fi Setup', 'Data Recovery', 'Printer Setup', 'Remote Support', 'Email Help'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];
      typedEl.textContent = deleting ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
      deleting ? ci-- : ci++;

      if (!deleting && ci === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
      if (deleting && ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
      setTimeout(type, deleting ? 45 : 95);
    }
    setTimeout(type, 600);
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer  = btn.nextElementSibling;
      const chevron = btn.querySelector('.faq-chevron');
      const isOpen  = answer.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-answer.open').forEach(a => a.classList.remove('open'));
      document.querySelectorAll('.faq-chevron.open').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.faq-btn').forEach(b => {
        b.classList.remove('text-blue-400');
        b.classList.add('text-white');
      });

      if (!isOpen) {
        answer.classList.add('open');
        chevron?.classList.add('open');
        btn.classList.add('text-blue-400');
        btn.classList.remove('text-white');
      }
    });
  });

  /* ---- Pricing tab toggle ---- */
  const tabs   = document.querySelectorAll('.pricing-tab');
  const panels = document.querySelectorAll('.pricing-panel');
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => {
          t.classList.remove('bg-blue-600', 'text-white');
          t.classList.add('text-slate-400');
        });
        tab.classList.add('bg-blue-600', 'text-white');
        tab.classList.remove('text-slate-400');
        panels.forEach(p => p.style.display = p.id === target ? 'grid' : 'none');
      });
    });
  }

  /* ---- Booking form submit ---- */
  const form = document.getElementById('bookingForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending…';
      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('formSuccess')?.style.setProperty('display', 'block');
      }, 1400);
    });
  }

  /* ---- Service type toggle (contact page) ---- */
  document.querySelectorAll('.support-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.support-type-btn').forEach(b => {
        b.classList.remove('bg-blue-600', 'border-blue-500', 'text-white');
        b.classList.add('border-white/10', 'text-slate-400');
      });
      btn.classList.add('bg-blue-600', 'border-blue-500', 'text-white');
      btn.classList.remove('border-white/10', 'text-slate-400');
    });
  });

  /* ---- Counter animation ---- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el  = entry.target;
        const end = parseInt(el.dataset.count);
        const sfx = el.dataset.suffix || '';
        const dur = 1600;
        const step = end / (dur / 16);
        let cur = 0;
        const tick = () => {
          cur = Math.min(cur + step, end);
          el.textContent = Math.floor(cur).toLocaleString() + sfx;
          if (cur < end) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
  }

  /* ---- Active nav link ---- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('text-blue-400');
      link.classList.remove('text-slate-300');
    }
  });

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

});
