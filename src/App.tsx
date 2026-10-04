import { ArrowRight, ArrowUp, BrainCircuit, ChevronDown, Code2, Languages, Linkedin, Star } from 'lucide-react';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import 'lenis/dist/lenis.css';
import { getSavedLanguage, i18n, translate, type Language } from './i18n';

gsap.registerPlugin(ScrollTrigger);

const languageOptions: Array<{ code: Language; label: string }> = [
  { code: 'pt-BR', label: 'Português (Brasil)' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt-PT', label: 'Português (Portugal)' },
];

function LanguageFlag({ language }: { language: Language }) {
  const commonProps = { viewBox: '0 0 36 24', className: 'h-4 w-6 shrink-0 rounded-[2px]', 'aria-hidden': true as const };

  if (language === 'pt-BR') return (
    <svg {...commonProps}>
      <rect width="36" height="24" fill="#009739" />
      <path d="M18 3 32 12 18 21 4 12Z" fill="#FFDF00" />
      <circle cx="18" cy="12" r="5.2" fill="#002776" />
      <path d="M13 10.8c3.3-.8 6.6-.2 9.6 1.5" fill="none" stroke="#fff" strokeWidth=".8" />
    </svg>
  );

  if (language === 'en') return (
    <svg {...commonProps}>
      <rect width="36" height="24" fill="#012169" />
      <path d="m0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5" />
      <path d="m0 0 36 24M36 0 0 24" stroke="#C8102E" strokeWidth="2" />
      <path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="8" />
      <path d="M18 0v24M0 12h36" stroke="#C8102E" strokeWidth="4" />
    </svg>
  );

  if (language === 'es') return (
    <svg {...commonProps}>
      <rect width="36" height="24" fill="#AA151B" />
      <path d="M0 6h36v12H0z" fill="#F1BF00" />
    </svg>
  );

  return (
    <svg {...commonProps}>
      <rect width="14" height="24" fill="#046A38" />
      <rect x="14" width="22" height="24" fill="#DA291C" />
      <circle cx="14" cy="12" r="4.2" fill="#FFCD00" />
      <circle cx="14" cy="12" r="2.6" fill="#fff" />
      <path d="M11.8 10.5h4.4v2.1a2.2 2.2 0 0 1-4.4 0z" fill="#DA291C" />
    </svg>
  );
}

const revealVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type TiltCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

function TiltCard({ children, className, ...props }: TiltCardProps) {
  return (
    <div className={className} {...props}>{children}</div>
  );
}

const testimonialsData = [
  { rating: 5.0 },
  { rating: 4.8 },
  { rating: 5.0 },
  { rating: 5.0 },
  { rating: 5.0 },
];

function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating);
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < stars ? 'fill-brand-lime text-brand-lime' : 'text-white/15'}`}
            strokeWidth={1.5}
          />
        ))}
      </div>
      <span className="font-mono text-[13px] font-medium text-white/50">{rating.toFixed(1)}</span>
    </div>
  );
}

function TestimonialCard({
  text,
  project,
  rating,
  index,
  group,
  expanded,
  onToggle,
  language,
}: {
  text: string;
  project: string;
  rating: number;
  index: number;
  group: number;
  expanded: boolean;
  onToggle: () => void;
  language: Language;
  key?: React.Key;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [clamped, setClamped] = useState(false);
  const textId = `testimonial-${group}-${index}`;

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // With the clamp removed the text always fits, so only measure while collapsed.
    const measure = () => {
      if (expanded) return;
      setClamped(element.scrollHeight > element.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [expanded]);

  return (
    <div className="lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-8 flex flex-col w-[min(86vw,380px)] shrink-0">
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-[14px] text-white/40 uppercase tracking-[1.4px] leading-tight pr-2 line-clamp-2">
          {project}
        </span>
        <span className="font-mono text-[14px] font-medium text-white/40 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p
        ref={textRef}
        id={textId}
        className={`font-sans text-[16px] leading-[26px] text-white/50 ${expanded ? '' : 'line-clamp-4'}`}
      >
        “{text}”
      </p>
      {(expanded || clamped) && (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={textId}
          className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-brand-lime hover:text-brand-lime/70 transition-colors mt-1.5 py-1.5 self-start"
        >
          {translate(language, expanded ? 'testimonials.readLess' : 'testimonials.readMore')}
        </button>
      )}
      <div className="mt-auto pt-6">
        <StarRating rating={rating} />
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('servicos');
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [compactHeader, setCompactHeader] = useState(false);
  const [language, setLanguage] = useState<Language>(getSavedLanguage);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();
  const headerWidth = useTransform(scrollY, [0, 140], ['min(1200px, calc(100% - 2rem))', 'min(880px, calc(100% - 1.5rem))'], { clamp: true });
  const rootRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);
  const cursorHorizontalRef = useRef<SVGSVGElement>(null);
  const cursorVerticalRef = useRef<SVGSVGElement>(null);
  const turbulenceXRef = useRef<SVGFETurbulenceElement>(null);
  const turbulenceYRef = useRef<SVGFETurbulenceElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  
  const methodSectionRef = useRef<HTMLElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);

  // Held-drag on the testimonial marquee. Dragging scrubs the loop's phase with
  // animation-delay instead of adding a transform, so the track always stays wide
  // enough to cover the container no matter how far it is dragged.
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    let offset = 0; // drag position, expressed in seconds of loop time
    let speed = 0; // px per second, one loop travels half the track
    let duration = 20; // must match the CSS animation-duration
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startOffset = 0;

    const apply = () => {
      // A delay only matters modulo the duration, and it must stay negative so the
      // loop is already under way instead of waiting out a delay phase.
      const folded = ((offset % duration) + duration) % duration;
      track.style.animationDelay = `${-folded}s`;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      duration = parseFloat(getComputedStyle(track).animationDuration);
      if (!duration) return;
      dragging = true;
      moved = false;
      startX = event.clientX;
      startOffset = offset;
      speed = track.offsetWidth / 2 / duration;
      track.dataset.dragging = '';
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      const dx = event.clientX - startX;
      // A few pixels of slack, so a plain click on "Ler mais" is not a drag.
      if (!moved) {
        if (Math.abs(dx) < 4) return;
        moved = true;
      }
      event.preventDefault();
      offset = startOffset - dx / speed;
      apply();
    };

    const onPointerUp = () => {
      if (!dragging) return;
      dragging = false;
      delete track.dataset.dragging;
    };

    // A drag that ends over a card must not also fire that card's button.
    const onClickCapture = (event: MouseEvent) => {
      if (!moved) return;
      moved = false;
      event.preventDefault();
      event.stopPropagation();
    };

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('click', onClickCapture, true);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    return () => {
      track.removeEventListener('pointerdown', onPointerDown);
      track.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasFinePointer = window.matchMedia('(any-pointer: fine)').matches;

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.05, // Lower value = smoother/more delay
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const lenisTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(lenisTicker);

    gsap.ticker.lagSmoothing(0);

    const hoverCleanups: Array<() => void> = [];
    let cursorFrame = 0;
    let removeInitialMouseMove: (() => void) | undefined;
    const cursorLines = [cursorHorizontalRef.current, cursorVerticalRef.current].filter(Boolean) as SVGSVGElement[];

    if (!reduceMotion && hasFinePointer && cursorLines.length === 2) {
      document.documentElement.classList.add('has-crosshair-cursor');

      const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      const renderedMouse = { x: mouse.x, y: mouse.y };
      const setHorizontalY = gsap.quickSetter(cursorHorizontalRef.current, 'y', 'px');
      const setVerticalX = gsap.quickSetter(cursorVerticalRef.current, 'x', 'px');
      const turbulence = { value: 0 };

      gsap.set(cursorLines, { opacity: 0 });

      const cursorNoiseTimeline = gsap.timeline({
        paused: true,
        onStart: () => {
          if (cursorHorizontalRef.current && cursorVerticalRef.current) {
            cursorHorizontalRef.current.style.filter = 'url(#filter-noise-x)';
            cursorVerticalRef.current.style.filter = 'url(#filter-noise-y)';
          }
        },
        onUpdate: () => {
          const value = String(turbulence.value);
          turbulenceXRef.current?.setAttribute('baseFrequency', value);
          turbulenceYRef.current?.setAttribute('baseFrequency', value);
        },
        onComplete: () => {
          if (cursorHorizontalRef.current && cursorVerticalRef.current) {
            cursorHorizontalRef.current.style.filter = 'none';
            cursorVerticalRef.current.style.filter = 'none';
          }
        },
      }).to(turbulence, {
        value: 0,
        startAt: { value: 0.9 },
        duration: 0.5,
        ease: 'power1.out',
      });

      const updateMousePosition = (event: MouseEvent) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
      };

      const renderCursor = () => {
        renderedMouse.x += (mouse.x - renderedMouse.x) * 0.16;
        renderedMouse.y += (mouse.y - renderedMouse.y) * 0.16;
        setVerticalX(renderedMouse.x);
        setHorizontalY(renderedMouse.y);
        cursorFrame = requestAnimationFrame(renderCursor);
      };

      const startCursor = (event: MouseEvent) => {
        updateMousePosition(event);
        renderedMouse.x = mouse.x;
        renderedMouse.y = mouse.y;
        gsap.to(cursorLines, { opacity: 1, duration: 0.6, ease: 'power3.out' });
        renderCursor();
        window.removeEventListener('mousemove', startCursor);
      };

      const enterInteractive = () => cursorNoiseTimeline.restart();
      const leaveInteractive = () => cursorNoiseTimeline.progress(1).pause();

      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mousemove', startCursor);
      removeInitialMouseMove = () => window.removeEventListener('mousemove', startCursor);

      document.querySelectorAll<HTMLElement>('a, button, input, textarea, select, [role="button"], [data-hover-lift]').forEach((element) => {
        element.addEventListener('mouseenter', enterInteractive);
        element.addEventListener('mouseleave', leaveInteractive);
        hoverCleanups.push(() => {
          element.removeEventListener('mouseenter', enterInteractive);
          element.removeEventListener('mouseleave', leaveInteractive);
        });
      });

      hoverCleanups.push(() => {
        window.removeEventListener('mousemove', updateMousePosition);
        removeInitialMouseMove?.();
        cancelAnimationFrame(cursorFrame);
        cursorNoiseTimeline.kill();
        document.documentElement.classList.remove('has-crosshair-cursor');
      });
    }

    const ctx = gsap.context(() => {
      // Set up ScrollTrigger for nav sections
      const sections = ['servicos', 'projetos', 'metodo', 'contato'];
      
      sections.forEach(sec => {
        ScrollTrigger.create({
          trigger: `#${sec}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(sec),
          onEnterBack: () => setActiveSection(sec),
        });
      });

      if (reduceMotion) return;

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo('[data-hero-title]',
          { autoAlpha: 0, y: 34, clipPath: 'inset(0% 0% 100% 0%)' },
          { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 },
          0
        )
        .from('[data-hero-sub]', {
          autoAlpha: 0,
          y: 24,
          filter: 'blur(8px)',
          duration: 0.7,
        }, '-=0.55')
        .from('[data-hero-cta]', {
          autoAlpha: 0,
          y: 20,
          duration: 0.6,
        }, '-=0.45');

      gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((element) => {
        const target = Number(element.dataset.counter);
        if (Number.isNaN(target)) return;

        const value = { current: 0 };
        const prefix = element.dataset.prefix ?? '';
        const suffix = element.dataset.suffix ?? '';

        gsap.to(value, {
          current: target,
          duration: 1.6,
          ease: 'power2.out',
          snap: { current: 1 },
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
          onUpdate: () => {
            element.textContent = `${prefix}${Math.round(value.current).toLocaleString(document.documentElement.lang)}${suffix}`;
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-parallax-img]').forEach((image) => {
        gsap.fromTo(image,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: image.closest('.portfolio-card') ?? image,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      });

      // Deck shuffle: service cards start stacked and spread into the grid on scroll
      if (servicesGridRef.current) {
        const cards = gsap.utils.toArray<HTMLElement>(':scope > *', servicesGridRef.current);
        const firstCard = cards[0];

        if (firstCard && cards.length > 1) {
          const deck = gsap.timeline({
            scrollTrigger: {
              trigger: servicesGridRef.current,
              start: 'top 85%',
              end: 'top 35%',
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, i) => {
            gsap.set(card, { zIndex: cards.length - i, transformOrigin: 'center center' });
            deck.fromTo(card,
              {
                x: () => firstCard.offsetLeft - card.offsetLeft,
                y: () => firstCard.offsetTop - card.offsetTop,
                rotate: (i - 1) * 5,
                scale: 0.9,
                autoAlpha: i === 0 ? 1 : 0.85,
              },
              {
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: 'power2.out',
              },
              i * 0.18
            );
          });
        }
      }

        // Method section: line fill + dot glow remain scroll-scrubbed by GSAP.
      if (methodSectionRef.current && timelineLineRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: methodSectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1,
          }
        });

        tl.to(timelineLineRef.current, { height: '100%', ease: 'none', duration: 1 }, 0);

        const methodSteps = gsap.utils.toArray<HTMLElement>('.method-step', methodSectionRef.current);
        const stepDots = [step1Ref.current, step2Ref.current, step3Ref.current];

        methodSteps.forEach((step, i) => {
          const at = i * 0.33;

          const dot = stepDots[i];
          if (dot) {
            tl.to(dot, {
              borderColor: '#BEF500',
              boxShadow: '0 0 0 6px rgba(190, 245, 0, 0.18)',
              scale: 1.18,
              duration: 0.16,
              yoyo: true,
              repeat: 1,
            }, at + 0.2);
          }
        });
      }
    }, rootRef);

    return () => {
      hoverCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
      lenis.destroy();
      gsap.ticker.remove(lenisTicker);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    if (activeEl) {
      gsap.to(indicatorRef.current, {
        x: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [activeSection, language]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      setCompactHeader(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    void i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.title = translate(language, 'meta.title');
    document.querySelector('meta[name="description"]')?.setAttribute('content', translate(language, 'meta.description'));
  }, [language]);

  useEffect(() => {
    if (!showLanguageMenu) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!languageMenuRef.current?.contains(event.target as Node)) setShowLanguageMenu(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setShowLanguageMenu(false);
      languageTriggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [showLanguageMenu]);

  const t = (key: string, values?: Record<string, string>) => translate(language, key, values);
  const whatsappUrl = `https://wa.me/5574999835227?text=${encodeURIComponent(language === 'en' ? 'Hello, I would like to talk about a project' : language === 'es' ? 'Hola, me gustaría hablar sobre un proyecto' : language === 'pt-PT' ? 'Olá, gostaria de falar sobre um projeto' : 'Olá, gostaria de falar sobre um projeto')}`;
  const revealProps = shouldReduceMotion ? {} : {
    variants: revealVariants,
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true, margin: '0px 0px -12% 0px' },
  };
  const staggerProps = shouldReduceMotion ? {} : {
    variants: staggerVariants,
    initial: 'hidden' as const,
    whileInView: 'show' as const,
    viewport: { once: true, margin: '0px 0px -18% 0px' },
  };
  const staggerItemProps = shouldReduceMotion ? {} : { variants: staggerItemVariants };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${id}`, { offset: -80 }); // offset for header height
    }
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-brand-bg font-sans selection:bg-brand-lime selection:text-black relative z-10">
      {/* Glow orbs */}
      <div aria-hidden="true" className="fixed pointer-events-none inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-lime/[0.05] blur-[120px]" style={{ mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'] }} />
        <div className="absolute top-[40%] -left-40 w-[500px] h-[500px] rounded-full bg-brand-lime/[0.04] blur-[120px]" style={{ mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'] }} />
        <div className="absolute bottom-0 right-[20%] w-[400px] h-[400px] rounded-full bg-brand-lime/[0.03] blur-[100px]" style={{ mixBlendMode: 'screen' as React.CSSProperties['mixBlendMode'] }} />
      </div>
      <div className="crosshair-cursor" aria-hidden="true">
        <svg ref={cursorHorizontalRef} className="crosshair-cursor__line crosshair-cursor__line--horizontal" viewBox="0 0 200 20" preserveAspectRatio="none">
          <defs>
            <filter id="filter-noise-x" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
              <feTurbulence ref={turbulenceXRef} type="fractalNoise" baseFrequency="0" numOctaves="1" result="warp" />
              <feOffset dx="-30" result="warpOffset" />
              <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset" />
            </filter>
          </defs>
          <line className="crosshair-cursor__line-element" x1="0" y1="10" x2="200" y2="10" shapeRendering="crispEdges" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg ref={cursorVerticalRef} className="crosshair-cursor__line crosshair-cursor__line--vertical" viewBox="0 0 20 200" preserveAspectRatio="none">
          <defs>
            <filter id="filter-noise-y" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
              <feTurbulence ref={turbulenceYRef} type="fractalNoise" baseFrequency="0" numOctaves="1" result="warp" />
              <feOffset dy="-30" result="warpOffset" />
              <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warpOffset" />
            </filter>
          </defs>
          <line className="crosshair-cursor__line-element" x1="10" y1="0" x2="10" y2="200" shapeRendering="crispEdges" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      {/* Header */}
      <motion.header
        style={shouldReduceMotion ? undefined : { width: headerWidth }}
        className={`sticky z-50 mx-auto flex justify-center px-0 transition-[top] duration-300 ${compactHeader ? 'top-4' : 'top-0'}`}
      >
        <div className={`flex h-20 w-full items-center justify-between border border-white/[0.06] bg-black/70 px-3 backdrop-blur-md transition-[border-radius,box-shadow] duration-300 sm:px-6 ${compactHeader ? 'rounded-full shadow-lg' : 'rounded-none border-x-0 border-t-0'}`}>
          <div className="flex items-center gap-1 font-display font-bold text-2xl tracking-tight text-white">
            JVITOR
            <span className="hidden font-mono text-[13px] uppercase tracking-[1.3px] font-normal text-white/50 mt-1 ml-1 sm:inline">
              DEV
            </span>
          </div>
          <nav ref={navRef} className="hidden md:flex items-center gap-6 relative">
            <div 
              ref={indicatorRef} 
              className="absolute bottom-0 h-[2px] bg-brand-lime"
              style={{ left: 0, width: 0 }}
            />
            <a href="#servicos" data-section="servicos" onClick={(e) => handleNavClick(e, 'servicos')} className={`pb-1 font-mono text-[13px] font-bold tracking-[0.65px] transition-colors ${activeSection === 'servicos' ? 'text-white' : 'text-white/50 hover:text-white'}`}>{t('nav.services')}</a>
            <a href="#projetos" data-section="projetos" onClick={(e) => handleNavClick(e, 'projetos')} className={`pb-1 font-mono text-[13px] font-medium tracking-[0.65px] transition-colors ${activeSection === 'projetos' ? 'text-white' : 'text-white/50 hover:text-white'}`}>{t('nav.projects')}</a>
            <a href="#metodo" data-section="metodo" onClick={(e) => handleNavClick(e, 'metodo')} className={`pb-1 font-mono text-[13px] font-medium tracking-[0.65px] transition-colors ${activeSection === 'metodo' ? 'text-white' : 'text-white/50 hover:text-white'}`}>{t('nav.method')}</a>
            <a href="#contato" data-section="contato" onClick={(e) => handleNavClick(e, 'contato')} className={`pb-1 font-mono text-[13px] font-medium tracking-[0.65px] transition-colors ${activeSection === 'contato' ? 'text-white' : 'text-white/50 hover:text-white'}`}>{t('nav.contact')}</a>
          </nav>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          <div className="relative" ref={languageMenuRef}>
            <button
              ref={languageTriggerRef}
              type="button"
              aria-label={`${t('aria.language')}: ${languageOptions.find((option) => option.code === language)?.label}`}
              aria-expanded={showLanguageMenu}
              aria-controls="language-menu"
              onClick={() => setShowLanguageMenu((open) => !open)}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2 py-2 text-[11px] text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-lime md:gap-2 md:px-3 md:text-sm"
            >
              <LanguageFlag language={language} />
              <span>{language}</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>
            <AnimatePresence>
            {showLanguageMenu && (
              <motion.div
                id="language-menu"
                initial={shouldReduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.16, ease: 'easeOut' }}
                style={{ transformOrigin: 'top right' }}
                className="absolute right-0 top-full z-50 mt-2 min-w-52 overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 text-black shadow-xl"
                role="group"
                aria-label={t('aria.language')}
              >
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    aria-pressed={language === option.code}
                    onClick={() => {
                      setLanguage(option.code);
                      setShowLanguageMenu(false);
                      languageTriggerRef.current?.focus();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${language === option.code ? 'bg-black/[0.06] font-semibold' : 'hover:bg-black/[0.04]'}`}
                  >
                    <LanguageFlag language={option.code} />
                    <span className="flex-1">{option.label}</span>
                    {language === option.code && <span aria-hidden="true" className="text-brand-gray">✓</span>}
                  </button>
                ))}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')} className="bg-brand-lime text-black px-3 py-2 md:px-6 md:py-3 rounded-full font-mono text-[11px] md:text-[13px] font-medium tracking-[0.65px] hover:bg-brand-lime/90 transition-colors">
            {t('nav.cta')}
          </a>
          </div>
        </div>
      </motion.header>

      <main>
        {/* Hero Section */}
        <section className="relative isolate mx-auto flex max-w-[1200px] flex-col items-center px-6 pt-12 pb-16 text-center md:pt-16 md:pb-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden text-black/[0.06]">
            <Code2 className="absolute left-[8%] top-[12%] h-14 w-14 -rotate-12" strokeWidth={1.25} />
            <Languages className="absolute right-[9%] top-[22%] h-16 w-16 rotate-6" strokeWidth={1.1} />
            <BrainCircuit className="absolute left-[13%] bottom-[15%] h-[4.5rem] w-[4.5rem] rotate-6" strokeWidth={1.1} />
            <Linkedin className="absolute right-[13%] bottom-[19%] h-12 w-12 -rotate-6" strokeWidth={1.2} />
            <WhatsAppIcon className="absolute right-[32%] top-[9%] h-11 w-11 fill-current" />
          </div>
          <h1 data-hero-title className="font-display font-[800] text-[48px] md:text-[64px] leading-[1.1] tracking-[-2.56px] w-full max-w-[982px] mb-6 text-white">
            {t('hero.title')}
          </h1>
            <p data-hero-sub className="text-[18px] leading-[32px] text-white/50 max-w-[906px] mb-10">
            {t('hero.subtitle')}
            </p>
          <div data-hero-cta className="flex flex-col sm:flex-row items-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" data-hover-lift className="bg-brand-lime text-[#151F00] shadow-sm rounded-xl px-8 py-4 flex items-center gap-2 hover:bg-brand-lime/90 transition-colors">
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[1.3px]">{t('common.whatsapp')}</span>
            </a>
            <a href="#projetos" onClick={(e) => handleNavClick(e, 'projetos')} data-hover-lift className="border border-white/20 rounded-xl px-8 py-4 flex items-center gap-2 hover:bg-white/5 transition-colors">
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-white">{t('hero.projects')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-12 px-6">
          <motion.div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4 md:gap-0 divide-x-0 md:divide-x divide-white/[0.06]" {...staggerProps}>
            <motion.div className="flex flex-col items-center" {...staggerItemProps}>
              <span className="font-display text-[32px] leading-[40px] font-bold text-white tabular-nums" data-counter="20" data-suffix="+">20+</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2">{t('stats.projects')}</span>
            </motion.div>
            <motion.div className="flex flex-col items-center" {...staggerItemProps}>
              <span className="font-display text-[32px] leading-[40px] font-bold text-white tabular-nums" data-counter="400" data-prefix="R$" data-suffix={language === 'en' ? 'k+' : ' mil +'}>R$400 mil +</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2 text-center">{t('stats.volume')}</span>
            </motion.div>
            <motion.div className="flex flex-col items-center col-span-2 md:col-span-1" {...staggerItemProps}>
              <span className="font-display text-[32px] leading-[40px] font-bold text-white tabular-nums" data-counter="3" data-suffix="+">3+</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2">{t('stats.years')}</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="max-w-[1200px] mx-auto px-6 py-32 flex flex-col items-center">
          <motion.h2 className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white mb-16 text-center max-w-[768px]" {...revealProps}>
            {t('services.title')}
          </motion.h2>
          
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {/* Service 1 */}
            <TiltCard className="h-full">
              <div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-8 flex flex-col items-start gap-3 h-full">
                <div className="flex items-start justify-between w-full mb-2">
                  <img src="/icons/3d/computer.png" alt="" aria-hidden="true" width="96" height="96" loading="lazy" decoding="async" className="w-24 h-24 object-contain" />
                  <span className="font-mono text-[16px] text-white/30">01</span>
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mt-2">
                  {t('services.site.title')}
                </h3>
                <p className="font-sans text-[16px] leading-[26px] text-white/50 mt-1">
                  {t('services.site.body')}
                </p>
                <a href={`https://wa.me/5574999835227?text=${encodeURIComponent(t('services.site.cta'))}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[14px] font-medium text-white hover:text-brand-lime transition-colors mt-auto pt-4">
                  {t('services.site.cta')} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>

            {/* Service 2 */}
            <TiltCard className="h-full">
              <div className="glass-card shadow-[0_0_0_1px_rgba(190,245,0,0.15)] rounded-lg p-8 flex flex-col items-start gap-3 relative overflow-hidden group h-full">
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-lime/[0.10] rounded-full blur-2xl -z-0" />
                <div className="flex items-start justify-between w-full mb-2 relative z-10">
                  <img src="/icons/3d/chart.png" alt="" aria-hidden="true" width="96" height="96" loading="lazy" decoding="async" className="w-24 h-24 object-contain" />
                  <span className="font-mono text-[16px] text-white/30">02</span>
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mt-2 relative z-10">
                  {t('services.systems.title')}
                </h3>
                <p className="font-sans text-[16px] leading-[26px] text-white/50 mt-1 relative z-10">
                  {t('services.systems.body')}
                </p>
                <a href={`https://wa.me/5574999835227?text=${encodeURIComponent(t('services.systems.cta'))}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[14px] font-medium text-white hover:text-brand-lime transition-colors mt-auto pt-4 relative z-10">
                  {t('services.systems.cta')} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>

            {/* Service 3 */}
            <TiltCard className="h-full">
              <div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-8 flex flex-col items-start gap-3 h-full">
                <div className="flex items-start justify-between w-full mb-2">
                  <img src="/icons/3d/setting.png" alt="" aria-hidden="true" width="96" height="96" loading="lazy" decoding="async" className="w-24 h-24 object-contain" />
                  <span className="font-mono text-[16px] text-white/30">03</span>
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mt-2">
                  {t('services.automation.title')}
                </h3>
                <p className="font-sans text-[16px] leading-[26px] text-white/50 mt-1">
                  {t('services.automation.body')}
                </p>
                <a href={`https://wa.me/5574999835227?text=${encodeURIComponent(t('services.automation.cta'))}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[14px] font-medium text-white hover:text-brand-lime transition-colors mt-auto pt-4">
                  {t('services.automation.cta')} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
            <motion.h2 className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white max-w-[729px]" {...revealProps}>
              {t('pain.title')}
            </motion.h2>
            
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" {...staggerProps}>
              {/* Pain Point 1 */}
              <motion.div className="glass-card lift-card rounded-lg p-8 flex flex-col" {...staggerItemProps}>
                <img src="/icons/3d/calculator.png" alt="" aria-hidden="true" width="80" height="80" loading="lazy" decoding="async" className="w-20 h-20 object-contain mb-4" />
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-3">
                  {t('pain.growth.title')}
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-white/50">
                  {t('pain.growth.body')}
                </p>
              </motion.div>

              {/* Pain Point 2 */}
              <motion.div className="glass-card lift-card rounded-lg p-8 flex flex-col" {...staggerItemProps}>
                <img src="/icons/3d/chat-bubble.png" alt="" aria-hidden="true" width="80" height="80" loading="lazy" decoding="async" className="w-20 h-20 object-contain mb-4" />
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-3">
                  {t('pain.whatsapp.title')}
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-white/50">
                  {t('pain.whatsapp.body')}
                </p>
              </motion.div>

              {/* Pain Point 3 */}
              <motion.div className="glass-card lift-card rounded-lg p-8 flex flex-col" {...staggerItemProps}>
                <img src="/icons/3d/bulb.png" alt="" aria-hidden="true" width="80" height="80" loading="lazy" decoding="async" className="w-20 h-20 object-contain mb-4" />
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-3">
                  {t('pain.idea.title')}
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-white/50">
                  {t('pain.idea.body')}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="projetos" className="bg-brand-surface border-y border-white/[0.06] pt-32 pb-20 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
            <motion.h2 className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white" {...revealProps}>
              {t('projects.title')}
            </motion.h2>

            {/* Bento Grid */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" {...staggerProps}>
              
              {/* Vet Anesthesia Pro */}
              <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-hover-lift {...staggerItemProps}>
                <div className="portfolio-media bg-[#0A1628] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/vet.png" alt="Vet Anesthesia Pro" width="1920" height="937" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    {t('projects.vet.category')}
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    Vet Anesthesia Pro
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    {t('projects.vet.body')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">React</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Node.js</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">PostgreSQL</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    vetanesthesiapro.com <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* Nexo Delivery - Medium */}
              <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-hover-lift {...staggerItemProps}>
                 <div className="portfolio-media bg-[#0F1A0A] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/nexo.webp" alt="Nexo Delivery" width="1024" height="1024" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                 <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[14px] md:text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    {t('projects.delivery.category')}
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    Nexo Delivery
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    {t('projects.delivery.body')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Next.js</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Prisma</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Socket.io</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    nexodelivery.app <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

              {/* GlowApp - Small */}
              <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full relative" data-hover-lift {...staggerItemProps}>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/[0.06] rounded-xl px-3 py-1 flex items-center gap-1.5 z-10 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-blue-300 border border-blue-900/10"></div>
                   <span className="font-mono text-[12px] text-white/80">{t('projects.foreign')}</span>
                </div>
                <div className="portfolio-media bg-[#1A0A1A] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/glowapp.webp" alt="GlowApp" width="1254" height="1254" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    {t('projects.glow.category')}
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    GlowApp
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    {t('projects.glow.body')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">React Native</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Firebase</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    yourglowapp.co <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>

               {/* AcheiCasa - Small */}
               <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-hover-lift {...staggerItemProps}>
                <div className="portfolio-media bg-[#0A1A14] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/acheicasa.webp" alt="AcheiCasa" width="1254" height="1254" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    {t('projects.home.category')}
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    AcheiCasa.net
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    {t('projects.home.body')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Next.js</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Maps API</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    acheicasa.net <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
               </motion.div>

               {/* AlugMotos - Small */}
               <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-hover-lift {...staggerItemProps}>
                <div className="portfolio-media bg-[#050A1A] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/alugmotos.webp" alt="AlugMotos" width="3481" height="3481" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[14px] md:text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    {t('projects.moto.category')}
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    AlugMotos
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    {t('projects.moto.body')}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Angular</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Node.js</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    alugmotos.com.br <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                 </div>
               </motion.div>

               {/* EntregaBoy - Small */}
               <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-hover-lift {...staggerItemProps}>
                 <div className="portfolio-media bg-[#111111] w-full flex items-center justify-center shrink-0 overflow-hidden">
                   <img src="/icons/entregaboy.png" alt="EntregaBoy" loading="lazy" decoding="async" className="w-32 h-32 object-contain" />
                 </div>
                 <div className="p-6 md:flex md:flex-col md:flex-grow">
                   <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                      {t('projects.delivery.category')}
                   </span>
                    <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                      EntregaBoy
                    </h3>
                    <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                       {t('projects.eboy.body')}
                    </p>
                    <a href="https://entregaboy.com.br" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                     entregaboy.com.br <ArrowRight className="w-3.5 h-3.5" />
                   </a>
                 </div>
                </motion.div>

                {/* AnunciCar */}
                <motion.div className="portfolio-card lift-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-hover-lift {...staggerItemProps}>
                  <div className="portfolio-media bg-[#0E3A44] w-full flex items-center justify-center shrink-0 overflow-hidden">
                    <img src="/icons/anuncicar.png" alt="AnunciCar" loading="lazy" decoding="async" data-parallax-img className="portfolio-image w-full h-full object-cover" />
                  </div>
                  <div className="p-6 md:flex md:flex-col md:flex-grow">
                    <span className="font-mono text-[14px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                       {t('projects.car.category')}
                    </span>
                    <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                      AnunciCar
                    </h3>
                    <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                       {t('projects.car.body')}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">TanStack</span>
                      <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">React Native</span>
                    </div>
                    <a href="https://anuncicar.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                      anuncicar.com <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>

             </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-brand-surface border-y border-white/[0.06] pt-20 pb-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
            <motion.h2 className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white max-w-[768px]" {...revealProps}>
              {t('testimonials.title')}
            </motion.h2>
            <div className={`marquee focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-lime ${expandedTestimonial === null ? '' : 'marquee--paused'}`} role="region" aria-label={t('testimonials.title')} tabIndex={0}>
              <div className="marquee__track" ref={marqueeTrackRef}>
                {[0, 1].map((group) => (
                  <div
                    key={group}
                    className="marquee__group"
                    aria-hidden={group === 1 ? true : undefined}
                    inert={group === 1}
                  >
                    {testimonialsData.map((t, i) => (
                      <TestimonialCard
                        key={`${group}-${i}`}
                        text={translate(language, `testimonials.${i}.text`)}
                        project={translate(language, `testimonials.${i}.project`)}
                        rating={t.rating}
                        language={language}
                        index={i}
                        group={group}
                        expanded={expandedTestimonial === i}
                        onToggle={() => setExpandedTestimonial((current) => (current === i ? null : i))}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-32 px-6">
          <motion.div className="max-w-[1200px] mx-auto flex flex-col items-center text-center" {...revealProps}>
            <h2 className="font-display font-[700] text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.8px] text-white max-w-[680px] mb-6">
              {t('cta.title')}
            </h2>
            <p className="font-sans text-[18px] leading-[32px] text-white/50 max-w-[560px] mb-10">
              {t('cta.body')}
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" data-hover-lift className="bg-brand-lime text-black rounded-xl px-10 py-5 flex items-center gap-3 hover:bg-brand-lime/90 transition-colors">
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span className="font-mono text-[14px] font-bold uppercase tracking-[1.4px]">{t('common.whatsapp')}</span>
            </a>
          </motion.div>
        </section>

        {/* Process Section */}
        <section id="metodo" ref={methodSectionRef} className="max-w-[1200px] mx-auto px-6 py-32 flex flex-col lg:flex-row items-start gap-16 lg:gap-32">
          <motion.h2 className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white w-full lg:w-[362px] shrink-0" {...revealProps}>
            {t('method.title').split('|').map((word, index) => <React.Fragment key={word}>{index > 0 && <br />}{word}.</React.Fragment>)}
          </motion.h2>
          
          <div className="relative pl-12 space-y-16 ml-2 lg:ml-0">
            <div className="absolute left-0 top-2 bottom-4 w-[2px] bg-white/[0.06]">
              <div ref={timelineLineRef} className="w-full bg-brand-lime" style={{ height: "0%" }} />
            </div>

            {/* Step 1 */}
            <motion.div className="relative flex flex-col method-step" {...revealProps}>
              <div ref={step1Ref} className="absolute -left-[58px] top-1 w-6 h-6 rounded-full border-4 border-white/20 bg-black transition-colors duration-300" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-white/40 mb-2">{t('method.step', { number: '01' })}</span>
              <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-2">
                {t('method.discover.title')}
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/50">
                {t('method.discover.body')}
              </p>
            </motion.div>

             {/* Step 2 */}
             <motion.div className="relative flex flex-col method-step" {...revealProps}>
              <div ref={step2Ref} className="absolute -left-[58px] top-1 w-6 h-6 rounded-full border-4 border-white/20 bg-black transition-colors duration-300" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-white/40 mb-2">{t('method.step', { number: '02' })}</span>
              <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-2">
                {t('method.build.title')}
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/50">
                {t('method.build.body')}
              </p>
            </motion.div>

             {/* Step 3 */}
             <motion.div className="relative flex flex-col method-step" {...revealProps}>
              <div ref={step3Ref} className="absolute -left-[58px] top-1 w-6 h-6 rounded-full border-4 border-white/20 bg-black transition-colors duration-300" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-brand-lime mb-2">{t('method.step', { number: '03' })}</span>
              <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-2">
                {t('method.adjust.title')}
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/50">
                {t('method.adjust.body')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="bg-brand-surface border-t border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
            <motion.div className="flex flex-col flex-1" {...revealProps}>
              <h2 className="font-display font-[800] text-[48px] md:text-[64px] leading-[1.1] tracking-[-2.56px] text-white mb-6">
                {t('contact.title')}
              </h2>
              <p className="font-sans text-[18px] leading-[32px] text-white/50 mb-8 max-w-[568px]">
                {t('contact.body')}
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:jvitorafb@gmail.com" className="flex items-center gap-4 group">
                  <img src="/icons/3d/mail.png" alt="" aria-hidden="true" width="56" height="56" loading="lazy" decoding="async" className="w-14 h-14 object-contain group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-medium text-[16px] text-white/70 group-hover:underline">
                    jvitorafb@gmail.com
                  </span>
                </a>
                
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <WhatsAppIcon className="w-11 h-11 text-white fill-current group-hover:scale-110 transition-transform" />
                  <span className="font-sans font-medium text-[16px] text-white/70 group-hover:underline">
                    {t('common.whatsapp')}
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-12 flex flex-col items-center flex-1 max-w-[632px]" data-hover-lift {...revealProps}>
              <img src="/icons/3d/flash.png" alt="" aria-hidden="true" width="112" height="112" loading="lazy" decoding="async" className="w-28 h-28 object-contain mb-4" />
              <h3 className="font-display font-[400] text-[16px] leading-[24px] text-white text-center mb-4">
                {t('contact.ready')}
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-white/50 text-center max-w-[476px] mb-8">
                {t('contact.cardBody')}
              </p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" data-hover-lift className="bg-brand-lime text-black w-full rounded py-4 flex items-center justify-center font-mono text-[13px] font-bold tracking-[1.3px] uppercase hover:bg-brand-lime/90 transition-colors">
                {t('contact.start')}
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp - mobile only */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 md:hidden bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.20)] hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label={t('common.whatsapp')}
      >
        <WhatsAppIcon className="w-7 h-7 fill-current" />
      </a>

      {/* Back to top */}
      <button
        onClick={() => lenisRef.current?.scrollTo(0)}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label={t('common.backToTop')}
      >
        <ArrowUp className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Footer */}
      <footer className="bg-brand-surface border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
          <div className="font-display font-[700] text-[24px] tracking-[-0.24px] text-white">
            JVITOR
          </div>
          <div className="font-sans text-[16px] text-white/50">
            © 2026 <a href="https://geniusweb.online" target="_blank" rel="noreferrer" className="hover:underline">Genius Web</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/jvitorafb/" target="_blank" rel="noreferrer" className="font-mono text-[13px] font-medium tracking-[0.65px] text-white/50 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://www.instagram.com/jvitorafb/" target="_blank" rel="noreferrer" className="font-mono text-[13px] font-medium tracking-[0.65px] text-white/50 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="mailto:jvitorafb@gmail.com" className="font-mono text-[13px] font-medium tracking-[0.65px] text-white/50 hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
