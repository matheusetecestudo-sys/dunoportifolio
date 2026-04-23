// 1. SMOOTH SCROLL (Lenis.js)
let lenis;
const initLenis = () => {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
};

// 2. NAVBAR & SCROLL PROGRESS
const initNavbar = () => {
  const navbar = document.querySelector('.navbar');
  const scrollBar = document.querySelector('.scroll-progress-bar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    
    // Scrolled state
    navbar.classList.toggle('scrolled', current > 50);
    
    // Hide/Show on scroll
    if (current > lastScroll && current > 300) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
    
    // Progress bar logic
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (current / totalHeight) * 100;
    if (scrollBar) scrollBar.style.width = progress + '%';
    
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

// 4. GSAP REVEALS
const initReveals = () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('[data-reveal]').forEach(el => {
      gsap.fromTo(el, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true
          }
        }
      );
    });
  }
};

// 5. SPLITTING.JS
const initSplitting = () => {
  if (typeof Splitting !== 'undefined') {
    Splitting();
    if (typeof gsap !== 'undefined') {
      gsap.from('.char', {
        opacity: 0, y: '100%', rotateX: -90, stagger: 0.02, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2
      });
    }
  }
};

// 6. FAQ ACCORDION — Unified logic
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

// 7. ANNOUNCEMENT BAR
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

// 8. SWIPER
const initSwiper = () => {
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 }
      }
    });
  }
};

// 9. COUNTDOWN (Limited Slots urgency)
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
  initFAQ();
  initAnnouncement();
  initSwiper();
  initCountdown();
});
