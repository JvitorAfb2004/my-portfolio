/* ========================================================
   PORTFOLIO PREMIUM — JOÃO VITOR
   JavaScript Principal — GSAP + ScrollTrigger
   ======================================================== */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ============================================================
   1. LOADER CINEMATOGRÁFICO
   ============================================================ */

const initLoader = () => {
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const text = document.getElementById('loaderText');

  const messages = ['Carregando experiência...', 'Preparando animações...', 'Quase lá...'];
  let msgIndex = 0;

  gsap.set(loader, { opacity: 1 });

  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % messages.length;
    text.textContent = messages[msgIndex];
  }, 700);

  gsap.to(bar, {
    width: '100%',
    duration: 2,
    ease: 'power2.inOut',
    onComplete: () => {
      clearInterval(msgInterval);
      text.textContent = '✦ Bem-vindo';
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.3,
        onComplete: () => {
          loader.style.display = 'none';
          initAnimations();
        },
      });
    },
  });
};

/* ============================================================
   2. CURSOR PREMIUM
   ============================================================ */

const initCursor = () => {
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    gsap.set(cursor, { x: mouseX, y: mouseY });
  });

  const animateFollower = () => {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    gsap.set(follower, { x: followerX, y: followerY });
    requestAnimationFrame(animateFollower);
  };
  animateFollower();

  // Hover states
  const interactables = document.querySelectorAll('a, button, .service-card, .project-card, .btn-neon, .btn-ghost, .btn-neon-xl');
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { width: 20, height: 20, duration: 0.2 });
      gsap.to(follower, { width: 64, height: 64, opacity: 0.5, duration: 0.2 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { width: 8, height: 8, duration: 0.2 });
      gsap.to(follower, { width: 36, height: 36, opacity: 1, duration: 0.2 });
    });
  });
};

/* ============================================================
   3. PROGRESS BAR
   ============================================================ */

const initProgressBar = () => {
  const bar = document.getElementById('progressBar');

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      gsap.set(bar, { width: `${self.progress * 100}%` });
    },
  });
};

/* ============================================================
   4. NAVBAR SCROLL
   ============================================================ */

const initNavbar = () => {
  const navbar = document.getElementById('navbar');

  ScrollTrigger.create({
    start: 80,
    onEnter: () => navbar.classList.add('scrolled'),
    onLeaveBack: () => navbar.classList.remove('scrolled'),
  });

  // Smooth scroll para links internos
  document.querySelectorAll('.nav-link, [href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 80 },
            ease: 'power3.inOut',
          });
        }
      }
    });
  });
};

/* ============================================================
   5. HERO ANIMATIONS
   ============================================================ */

const initHeroAnimations = () => {
  // Split words
  const lines = document.querySelectorAll('.hero-line[data-split]');
  lines.forEach((line) => {
    const text = line.textContent;
    const words = text.split(' ');
    line.textContent = '';
    line.style.opacity = '1';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word + (i < words.length - 1 ? '\u00A0' : '');
      line.appendChild(span);
    });
  });

  const tl = gsap.timeline({ delay: 0.2 });

  // Words stagger
  tl.to('.hero-line .word', {
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.05,
  }, '-=0.2');

  // Sub headline
  tl.to('#heroSub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4');

  // CTAs
  tl.to('#heroCtas', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');



  // Scroll indicator
  tl.to('#scrollIndicator', { opacity: 1, duration: 0.5 }, '+=0.3');

  // Hero parallax mouse
  const heroGlow = document.querySelector('.hero-glow');
  const heroGrid = document.querySelector('.hero-grid');

  document.addEventListener('mousemove', (e) => {
    const xPct = (e.clientX / window.innerWidth - 0.5) * 2;
    const yPct = (e.clientY / window.innerHeight - 0.5) * 2;

    gsap.to(heroGlow, {
      x: xPct * 30,
      y: yPct * 30,
      duration: 1.2,
      ease: 'power2.out',
    });

    gsap.to(heroGrid, {
      x: xPct * 12,
      y: yPct * 12,
      duration: 2,
      ease: 'power1.out',
    });
  });

  // Hero desmonta ao scroll
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
    onUpdate: (self) => {
      const p = self.progress;
      gsap.set('.hero-content', { y: p * 80, opacity: 1 - p * 1.5 });
      gsap.set('.hero-grid', { y: p * 60 });
    },
  });
};

/* ============================================================
   6. SCROLL REVEAL GENÉRICO
   ============================================================ */

const initScrollReveal = () => {
  const reveals = document.querySelectorAll('[data-reveal]');

  reveals.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
};

/* ============================================================
   7. SERVICES CARDS — STAGGER + 3D TILT
   ============================================================ */

const initServiceCards = () => {
  const cards = document.querySelectorAll('[data-reveal-card]');

  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.95, filter: 'blur(8px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        delay: i * 0.12,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );

    // 3D Tilt
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      gsap.to(card, {
        rotateY: dx * 6,
        rotateX: -dy * 4,
        transformPerspective: 800,
        duration: 0.3,
        ease: 'power1.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  });
};

/* ============================================================
   8. PAIN SECTION — MASK REVEAL
   ============================================================ */

const initPainSection = () => {
  const headline = document.querySelector('.pain-headline');
  if (headline) {
    gsap.fromTo(headline,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headline,
          start: 'top 80%',
        },
      }
    );
  }

  const blocks = document.querySelectorAll('[data-pain-reveal]');
  blocks.forEach((block, i) => {
    gsap.to(block, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: block,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Linha vertical crescendo
  const painLine = document.querySelector('.pain-bg-line');
  if (painLine) {
    ScrollTrigger.create({
      trigger: '#pain',
      start: 'top center',
      end: 'bottom center',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(painLine, { scaleY: self.progress, transformOrigin: 'top center' });
      },
    });
  }
};

/* ============================================================
   9. PROJECTS — DRAG TO SCROLL
   ============================================================ */

const initProjects = () => {
  const wrap = document.getElementById('projectsScrollWrap');
  const track = document.getElementById('projectsTrack');

  if (!wrap || !track) return;

  function getScrollAmount() {
    let trackWidth = track.scrollWidth;
    return -(trackWidth - window.innerWidth + 96);
  }

  const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: "none"
  });

  ScrollTrigger.create({
    trigger: "#projectsScrollWrap",
    start: "top top",
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
  });

  // Hover reveal para project cards
  const projCards = document.querySelectorAll('[data-project]');
  projCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.08,
        scrollTrigger: {
          trigger: ".projects-section",
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
};

/* ============================================================
   10. TIMELINE — LINHA DESENHANDO
   ============================================================ */

const initTimeline = () => {
  const line = document.getElementById('timelineLine');
  const items = document.querySelectorAll('[data-timeline]');

  if (line) {
    gsap.to(line, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 1,
      },
    });
  }

  items.forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: i * 0.15,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
};

/* ============================================================
   11. COUNTERS ANIMADOS
   ============================================================ */

const initCounters = () => {
  const items = document.querySelectorAll('[data-proof]');

  items.forEach((item, i) => {
    gsap.to(item, {
      opacity: 1,
      duration: 0.6,
      delay: i * 0.15,
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    const numEl = item.querySelector('[data-count]');
    if (!numEl) return;

    const target = parseInt(numEl.getAttribute('data-count'));
    const suffix = numEl.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            numEl.textContent = Math.round(this.targets()[0].val) + suffix;
          },
        });

        // Glow pulse no número
        gsap.fromTo(numEl,
          { textShadow: '0 0 0px rgba(198,255,0,0)' },
          {
            textShadow: '0 0 40px rgba(198,255,0,0.4)',
            duration: 1,
            ease: 'power2.out',
          }
        );
      },
    });
  });
};

/* ============================================================
   12. CTA SECTION — SPLIT TEXT + MAGNETIC
   ============================================================ */

const initCTA = () => {
  // Split CTA lines
  const ctaLines = document.querySelectorAll('[data-split-cta]');
  ctaLines.forEach((line) => {
    line.style.opacity = '1';
  });

  gsap.fromTo('[data-split-cta]',
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    }
  );
};

/* ============================================================
   13. MAGNETIC BUTTONS
   ============================================================ */

const initMagnetic = () => {
  const magnetics = document.querySelectorAll('.magnetic-btn');

  magnetics.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;

      gsap.to(btn, {
        x: dx,
        y: dy,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    });
  });
};

/* ============================================================
   14. FOOTER REVEAL
   ============================================================ */

const initFooter = () => {
  gsap.to('#footer', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#footer',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  });
};

/* ============================================================
   15. GLOW CURSOR TRAIL (Instagram viral moment)
   ============================================================ */

const initGlowTrail = () => {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9000;opacity:0.35;mix-blend-mode:screen;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const particles = [];

  document.addEventListener('mousemove', (e) => {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      life: 1,
      size: Math.random() * 6 + 2,
    });
  });

  const renderTrail = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.life -= 0.025;

      if (p.life <= 0) {
        particles.splice(i, 1);
        return;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.life * 3);
      gradient.addColorStop(0, `rgba(198, 255, 0, ${p.life * 0.6})`);
      gradient.addColorStop(1, 'rgba(198, 255, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fill();
    });

    requestAnimationFrame(renderTrail);
  };

  renderTrail();
};

/* ============================================================
   INIT MASTER
   ============================================================ */

const initAnimations = () => {
  initProgressBar();
  initNavbar();
  initHeroAnimations();
  initScrollReveal();
  initServiceCards();
  initPainSection();
  initProjects();
  initTimeline();
  initCounters();
  initCTA();
  initMagnetic();
  initFooter();
  initGlowTrail();
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initLoader();
});
