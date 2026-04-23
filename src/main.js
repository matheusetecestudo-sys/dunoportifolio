// 1. SMOOTH SCROLL (Lenis.js)
// We assume Lenis is loaded via CDN in index.html
let lenis;
const initLenis = () => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

// 2. NAVBAR — scroll-aware
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const progressBar = document.querySelector('.scroll-progress');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    // Scrolled state
    navbar.classList.toggle('scrolled', current > 80);
    
    // Hide/Show on scroll
    if (current > lastScroll && current > 200) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    
    // Progress bar
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (current / totalHeight) * 100;
    if (progressBar) progressBar.style.width = progress + '%';
    
    lastScroll = current;
  }, { passive: true });
};

// 3. COUNTER ANIMATION
const initCounters = () => {
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';

    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentVal = target * progress;

      el.textContent = prefix + Math.floor(currentVal) + suffix;

      if (currentFrame === totalFrames) {
        el.textContent = prefix + target + suffix;
        clearInterval(counter);
      }
    }, frameRate);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
};

// 4. REVEAL ON SCROLL (GSAP)
const initReveals = () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true
          }
        }
      );
    });
  }
};

// 5. SPLITTING.JS (Letter by Letter)
const initSplitting = () => {
  if (typeof Splitting !== 'undefined') {
    Splitting();
    
    if (typeof gsap !== 'undefined') {
      gsap.from('.char', {
        opacity: 0,
        y: '100%',
        rotateX: -90,
        stagger: 0.02,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.3
      });
    }
  }
};

// 6. PORTFOLIO FILTER
const initPortfolio = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      projects.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (typeof gsap !== 'undefined') {
          gsap.to(card, {
            opacity: match ? 1 : 0.2,
            scale: match ? 1 : 0.95,
            duration: 0.3,
            pointerEvents: match ? 'auto' : 'none'
          });
        } else {
          card.style.opacity = match ? '1' : '0.2';
          card.style.transform = match ? 'scale(1)' : 'scale(0.95)';
          card.style.pointerEvents = match ? 'auto' : 'none';
        }
      });
    });
  });
};

// 7. FAQ ACCORDION
const initFAQ = () => {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
};

// 8. ANNOUNCEMENT BAR
const initAnnouncement = () => {
  const annBar = document.querySelector('.announcement-bar');
  const annClose = document.querySelector('.ann-close');
  
  if (annClose && annBar) {
    if (sessionStorage.getItem('ann-closed')) {
      annBar.style.display = 'none';
      document.querySelector('.navbar').style.top = '0';
    } else {
      annClose.addEventListener('click', () => {
        annBar.style.display = 'none';
        document.querySelector('.navbar').style.top = '0';
        sessionStorage.setItem('ann-closed', '1');
      });
    }
  }
};

// 9. CURSOR CUSTOMIZADO
const initCursor = () => {
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Add styles via JS to avoid CSS clutter
    Object.assign(cursor.style, {
      position: 'fixed', width: '12px', height: '12px', background: 'var(--brand-pink)',
      borderRadius: '50%', pointerEvents: 'none', zIndex: '10000', mixBlendMode: 'difference',
      transition: 'transform 0.15s ease-out, opacity 0.3s ease'
    });

    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animate = () => {
      curX += (mouseX - curX) * 0.15;
      curY += (mouseY - curY) * 0.15;
      cursor.style.transform = `translate(${curX - 6}px, ${curY - 6}px)`;
      requestAnimationFrame(animate);
    };
    animate();

    document.querySelectorAll('a, button, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(4)';
        cursor.style.opacity = '0.5';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.opacity = '1';
      });
    });
  }
};

// 10. SWIPER (Testimonials)
const initSwiper = () => {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-next', prevEl: '.swiper-prev' },
    });
  }
};

// 11. COUNTDOWN
const initCountdown = () => {
  const countdown = () => {
    const now = new Date().getTime();
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59).getTime();
    const diff = endOfMonth - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (document.getElementById('days')) document.getElementById('days').innerText = d < 10 ? '0' + d : d;
    if (document.getElementById('hours')) document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
    if (document.getElementById('mins')) document.getElementById('mins').innerText = m < 10 ? '0' + m : m;
  };
  setInterval(countdown, 1000);
  countdown();
};

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
  initLenis();
  initNavbar();
  initCounters();
  initReveals();
  initSplitting();
  initPortfolio();
  initFAQ();
  initAnnouncement();
  initCursor();
  initSwiper();
  initCountdown();
});
