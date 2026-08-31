import { MonitorSmartphone, Database, Bot, TrendingDown, Smartphone, LightbulbOff, ArrowRight, ArrowUp, MessageCircle, Star } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

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
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;

    setStyle({
      transform: `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`,
      transition: 'transform 0.1s ease',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0) rotateY(0)',
      transition: 'transform 0.5s ease',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={className}
      {...props}
    >
      <div style={{ transform: 'translateZ(10px)' }} className="h-full">
        {children}
      </div>
    </div>
  );
}

const testimonialsData = [
  {
    project: "App de anestesiologia veterinária",
    text: "Excelente programador! Entregou antes do prazo final, muito comprometido e tem ótima comunicação. Continuarei trabalhando com ele no meu app futuramente, e certamente recomendaria para colegas!",
    rating: 5.0,
  },
  {
    project: "Sistema de gestão de inscrições",
    text: "Profissional muito prestativo e competente.",
    rating: 4.8,
  },
  {
    project: "Site e app para cadastro e pesquisa",
    text: "Super prestativo",
    rating: 5.0,
  },
  {
    project: "App mobile com WebSocket",
    text: "Recomendo. Prestativo e tudo de acordo com o combinado",
    rating: 5.0,
  },
  {
    project: "Portal de anúncios imobiliários",
    text: "Excelente profissional!!! conhecimento e domínio incrível. Já trabalhei com diversos profissionais, mas o programador João se destaca. Pontual, dedicado, compreende o projeto, paciente e executa com agilidade e profissionalismo. Sem sombra de dúvida ganhou um cliente, espero seguir sempre com a parceria, não trocaria este profissional por nenhum da plataforma 99freelas.",
    rating: 5.0,
  },
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

export default function App() {
  const [activeSection, setActiveSection] = useState('servicos');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
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

      gsap.from('[data-hero]', {
        autoAlpha: 0,
        y: 28,
        filter: 'blur(8px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          autoAlpha: 0,
          y: 42,
          filter: 'blur(8px)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>('[data-stagger-item]', group);
        gsap.from(items, {
          autoAlpha: 0,
          y: 36,
          filter: 'blur(8px)',
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: group,
            start: 'top 78%',
            once: true,
          },
        });
      });

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
            element.textContent = `${prefix}${Math.round(value.current).toLocaleString('pt-BR')}${suffix}`;
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

      gsap.utils.toArray<HTMLElement>('[data-hover-lift]').forEach((element) => {
        const onEnter = () => gsap.to(element, { y: -8, scale: 1.01, duration: 0.28, ease: 'power2.out' });
        const onLeave = () => gsap.to(element, { y: 0, scale: 1, duration: 0.35, ease: 'power2.out' });
        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mouseleave', onLeave);
        hoverCleanups.push(() => {
          element.removeEventListener('mouseenter', onEnter);
          element.removeEventListener('mouseleave', onLeave);
        });
      });

      // Set up Timeline for the Method Section scroll animation
      if (methodSectionRef.current && timelineLineRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: methodSectionRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1, // smooth scroll timeline
          }
        });

        // Animate line height to 100%
        tl.to(timelineLineRef.current, {
          height: '100%',
          ease: 'none',
          duration: 1
        }, 0);

        if (step1Ref.current) {
          tl.to(step1Ref.current, { backgroundColor: '#BEF500', scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, 0);
        }
        if (step2Ref.current) {
          tl.to(step2Ref.current, { backgroundColor: '#BEF500', scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, 0.4);
        }
        if (step3Ref.current) {
          tl.to(step3Ref.current, { backgroundColor: '#BEF500', scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, 0.8);
        }
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
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1 font-display font-bold text-2xl tracking-tight text-white">
            JVITOR
            <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-normal text-white/50 mt-1 ml-1">
              DEV
            </span>
          </div>
          <nav ref={navRef} className="hidden md:flex items-center gap-6 relative">
            <div 
              ref={indicatorRef} 
              className="absolute bottom-0 h-[2px] bg-brand-lime"
              style={{ left: 0, width: 0 }}
            />
            <a href="#servicos" data-section="servicos" onClick={(e) => handleNavClick(e, 'servicos')} className={`pb-1 font-mono text-[13px] font-bold tracking-[0.65px] transition-colors ${activeSection === 'servicos' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Serviços</a>
            <a href="#projetos" data-section="projetos" onClick={(e) => handleNavClick(e, 'projetos')} className={`pb-1 font-mono text-[13px] font-medium tracking-[0.65px] transition-colors ${activeSection === 'projetos' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Projetos</a>
            <a href="#metodo" data-section="metodo" onClick={(e) => handleNavClick(e, 'metodo')} className={`pb-1 font-mono text-[13px] font-medium tracking-[0.65px] transition-colors ${activeSection === 'metodo' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Método</a>
            <a href="#contato" data-section="contato" onClick={(e) => handleNavClick(e, 'contato')} className={`pb-1 font-mono text-[13px] font-medium tracking-[0.65px] transition-colors ${activeSection === 'contato' ? 'text-white' : 'text-white/50 hover:text-white'}`}>Contato</a>
          </nav>
          <a href="#contato" onClick={(e) => handleNavClick(e, 'contato')} className="bg-brand-lime text-black px-6 py-3 rounded-xl font-mono text-[13px] font-medium tracking-[0.65px] hover:bg-brand-lime/90 transition-colors">
            Falar agora
          </a>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-6 pt-20 md:pt-32 pb-16 md:pb-24 flex flex-col items-center text-center">
          <h1 data-hero className="font-display font-[800] text-[48px] md:text-[64px] leading-[1.1] tracking-[-2.56px] w-full max-w-[982px] mb-6 bg-gradient-to-r from-white via-brand-lime to-white bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient">
            Crio sites, sistemas e automações que vendem, organizam e escalam.
          </h1>
            <p data-hero className="text-[18px] leading-[32px] text-white/50 max-w-[906px] mb-10">
            Sua empresa ainda depende de planilha, caderno ou WhatsApp para operar? Eu crio a solução digital que organiza, automatiza e faz seu negócio escalar. Entrego funcionando em dias, não meses.
            </p>
          <div data-hero className="flex flex-col sm:flex-row items-center gap-4">
            <a href="https://wa.me/5574999835227?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto" target="_blank" rel="noreferrer" data-hover-lift className="bg-brand-lime text-[#151F00] shadow-sm rounded-xl px-8 py-4 flex items-center gap-2 hover:bg-brand-lime/90 transition-colors">
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span className="font-mono text-[13px] font-bold uppercase tracking-[1.3px]">Falar no WhatsApp</span>
            </a>
            <a href="#projetos" onClick={(e) => handleNavClick(e, 'projetos')} data-hover-lift className="border border-white/20 rounded-xl px-8 py-4 flex items-center gap-2 hover:bg-white/5 transition-colors">
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-white">Ver Projetos</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-12 px-6">
          <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-0 divide-x-0 md:divide-x divide-white/[0.06]" data-stagger>
            <div className="flex flex-col items-center" data-stagger-item>
              <span className="font-display text-[16px] leading-[24px] text-white tabular-nums" data-counter="20" data-suffix="+">20+</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2">Projetos entregues com sucesso</span>
            </div>
            <div className="flex flex-col items-center" data-stagger-item>
              <span className="font-display text-[16px] leading-[24px] text-white tabular-nums" data-counter="400" data-prefix="R$" data-suffix=" mil +">R$400 mil +</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2 text-center">Movimentados em sistemas</span>
            </div>
            <div className="flex flex-col items-center" data-stagger-item>
              <span className="font-display text-[16px] leading-[24px] text-white tabular-nums" data-counter="2" data-suffix="+">2+</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2">Anos transformando processos</span>
            </div>
            <div className="flex flex-col items-center" data-stagger-item>
              <span className="font-display text-[16px] leading-[24px] text-white tabular-nums" data-counter="12" data-suffix="h">12h</span>
              <span className="font-mono text-[13px] uppercase tracking-[1.3px] font-medium text-white/40 mt-2">Resposta em até 12h</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="max-w-[1200px] mx-auto px-6 py-32 flex flex-col items-center">
          <h2 data-reveal className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white mb-16 text-center max-w-[768px]">
            Não vendo projeto. Vendo resultado.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" data-stagger>
            {/* Service 1 */}
            <TiltCard className="h-full" data-stagger-item>
              <div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-8 flex flex-col items-start gap-3 h-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-[16px] text-white/30">01</span>
                  <div className="bg-white/[0.06] rounded-xl w-12 h-12 flex items-center justify-center">
                    <MonitorSmartphone className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mt-2">
                  Sites que vendem
                </h3>
                <p className="font-sans text-[16px] leading-[26px] text-white/50 mt-1">
                  Landing pages, portfólios e lojas que convertem visitante em cliente. Visual premium, velocidade real.
                </p>
                <a href="https://wa.me/5574999835227?text=Olá,%20quero%20um%20site%20que%20venda" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[14px] font-medium text-white hover:text-brand-lime transition-colors mt-auto pt-4">
                  Quero um site que venda <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>

            {/* Service 2 */}
            <TiltCard className="h-full" data-stagger-item>
              <div className="glass-card shadow-[0_0_0_1px_rgba(190,245,0,0.15)] rounded-lg p-8 flex flex-col items-start gap-3 relative overflow-hidden group h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/[0.08] rounded-bl-[12px] -z-0" />
                <div className="flex items-center justify-between w-full mb-2 relative z-10">
                  <span className="font-mono text-[16px] text-white/30">02</span>
                  <div className="bg-brand-lime rounded-xl w-12 h-12 flex items-center justify-center">
                    <Database className="w-5 h-5 text-[#151F00]" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mt-2 relative z-10">
                  Sistemas internos
                </h3>
                <p className="font-sans text-[16px] leading-[26px] text-white/50 mt-1 relative z-10">
                  Dashboards, ERPs, CRMs e painéis que substituem planilha e WhatsApp. Operação que escala.
                </p>
                <a href="https://wa.me/5574999835227?text=Olá,%20quero%20organizar%20minha%20operação%20com%20um%20sistema" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[14px] font-medium text-white hover:text-brand-lime transition-colors mt-auto pt-4 relative z-10">
                  Quero organizar minha operação <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>

            {/* Service 3 */}
            <TiltCard className="h-full" data-stagger-item>
              <div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-8 flex flex-col items-start gap-3 h-full">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="font-mono text-[16px] text-white/30">03</span>
                  <div className="bg-white/[0.06] rounded-xl w-12 h-12 flex items-center justify-center">
                    <Bot className="w-[22px] h-[19px] text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mt-2">
                  Automação & IA
                </h3>
                <p className="font-sans text-[16px] leading-[26px] text-white/50 mt-1">
                  Processos repetitivos viram fluxos automáticos. IA integrada onde faz sentido. Tempo de volta pra você.
                </p>
                <a href="https://wa.me/5574999835227?text=Olá,%20quero%20automatizar%20processos%20no%20meu%20negócio" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[14px] font-medium text-white hover:text-brand-lime transition-colors mt-auto pt-4">
                  Quero automatizar processos <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
            <h2 data-reveal className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white max-w-[729px]">
              Meu trabalho entra quando o improviso para de funcionar.
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8" data-stagger>
              {/* Pain Point 1 */}
              <div className="flex flex-col" data-stagger-item>
                <div className="bg-[#FFDAD6] rounded-xl w-10 h-10 flex items-center justify-center mb-6">
                  <TrendingDown className="text-[#93000A] w-4 h-4" />
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-3">
                  Negócio cresce, operação trava
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-white/50 w-full max-w-[360px]">
                  Clientes chegam, tarefas aumentam e a equipe começa a perder tempo com controle manual retrabalho e falta de visibilidade.
                </p>
              </div>

              {/* Pain Point 2 */}
              <div className="flex flex-col" data-stagger-item>
                <div className="bg-[#FFDAD6] rounded-xl w-10 h-10 flex items-center justify-center mb-6">
                  <Smartphone className="text-[#93000A] w-4 h-5" />
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-3">
                  Tudo depende do WhatsApp
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-white/50 w-full max-w-[372px]">
                  Pedidos, pagamentos, aprovações e informações importantes ficam espalhados em conversas difíceis de controlar.
                </p>
              </div>

              {/* Pain Point 3 */}
              <div className="flex flex-col" data-stagger-item>
                <div className="bg-[#FFDAD6] rounded-xl w-10 h-10 flex items-center justify-center mb-6">
                  <LightbulbOff className="text-[#93000A] w-[18px] h-[18px]" />
                </div>
                <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-3">
                  Ideia boa sem execução
                </h3>
                <p className="font-sans text-[16px] leading-[24px] text-white/50 w-full max-w-[356px]">
                  Você sabe o que precisa construir, mas precisa de alguém que entenda o problema, organize o escopo e entregue funcionando.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="projetos" className="bg-brand-surface border-y border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
            <h2 data-reveal className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white">
              Projetos que deixaram marca.
            </h2>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-stagger>
              
              {/* Vet Anesthesia Pro - Large */}
              <div className="portfolio-card md:col-span-2 glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col" data-stagger-item data-hover-lift>
                <div className="portfolio-media portfolio-media-large bg-[#0A1628] w-full flex items-center justify-center overflow-hidden">
                  <img src="/vet.png" alt="Vet Anesthesia Pro" width="1920" height="937" loading="lazy" decoding="async" sizes="(min-width: 768px) 768px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8 flex flex-col">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px]">
                      SAAS · VETERINÁRIA
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">React</span>
                      <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Node.js</span>
                      <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">PostgreSQL</span>
                    </div>
                  </div>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    Vet Anesthesia Pro
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4">
                    Sistema de controlo anestésico para clínicas veterinárias. Substituiu fichas de papel.
                  </p>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    vetanesthesiapro.com <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Nexo Delivery - Medium */}
              <div className="portfolio-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-stagger-item data-hover-lift>
                 <div className="portfolio-media bg-[#0F1A0A] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/nexo.webp" alt="Nexo Delivery" width="1024" height="1024" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                 <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[14px] md:text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    PLATAFORMA · DELIVERY
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    Nexo Delivery
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    Plataforma de gestão para serviços de entrega. Do pedido ao motoboy em tempo real.
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
              </div>

              {/* GlowApp - Small */}
              <div className="portfolio-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full relative" data-stagger-item data-hover-lift>
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/[0.06] rounded-xl px-3 py-1 flex items-center gap-1.5 z-10 shadow-sm">
                   <div className="w-2.5 h-2.5 rounded-full bg-blue-300 border border-blue-900/10"></div>
                   <span className="font-mono text-[12px] text-white/80">Cliente fora do Brasil</span>
                </div>
                <div className="portfolio-media bg-[#1A0A1A] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/glowapp.webp" alt="GlowApp" width="1254" height="1254" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    APP · BELEZA
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    GlowApp
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    App de agendamento para salões de beleza com cliente internacional. Agendamentos que iam por DM, agora têm portal próprio.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">React Native</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Firebase</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    yourglowapp.co <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

               {/* AcheiCasa - Small */}
               <div className="portfolio-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-stagger-item data-hover-lift>
                <div className="portfolio-media bg-[#0A1A14] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/acheicasa.webp" alt="AcheiCasa" width="1254" height="1254" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    MARKETPLACE · IMÓVEIS
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    AcheiCasa.net
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    Marketplace de imóveis com filtros geográficos e tour virtual. Conecta corretor e comprador.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Next.js</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Maps API</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    acheicasa.net <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

               {/* AlugMotos - Small */}
               <div className="portfolio-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-stagger-item data-hover-lift>
                <div className="portfolio-media bg-[#050A1A] w-full flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/alugmotos.webp" alt="AlugMotos" width="3481" height="3481" loading="lazy" decoding="async" sizes="(min-width: 768px) 384px, calc(100vw - 48px)" data-parallax-img className="portfolio-image w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:flex md:flex-col md:flex-grow">
                  <span className="font-mono text-[14px] md:text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                    SAAS · ALUGUEL DE MOTOS
                  </span>
                  <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                    AlugMotos
                  </h3>
                  <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-4 md:flex-grow">
                    Sistema completo de gestão de reservas e frota de motos. Do checkout ao controle operacional em tempo real.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Angular</span>
                    <span className="bg-white/[0.06] text-white/70 font-mono text-[13px] font-medium px-3 py-1 rounded-full tracking-[0.65px]">Node.js</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                    alugmotos.com.br <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                 </div>
               </div>

               {/* EntregaBoy - Small */}
               <div className="portfolio-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-stagger-item data-hover-lift>
                 <div className="portfolio-media bg-[#111111] w-full flex items-center justify-center shrink-0 overflow-hidden">
                   <img src="/icons/entregaboy.png" alt="EntregaBoy" loading="lazy" decoding="async" className="w-32 h-32 object-contain" />
                 </div>
                 <div className="p-6 md:flex md:flex-col md:flex-grow">
                   <span className="font-mono text-[16px] text-white/40 uppercase tracking-[1.6px] mb-2 leading-tight">
                     PLATAFORMA · DELIVERY
                   </span>
                   <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                     EntregaBoy
                   </h3>
                   <a href="https://entregaboy.com.br" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-mono text-[16px] font-medium text-white hover:text-brand-lime transition-colors mt-4 md:mt-auto">
                     entregaboy.com.br <ArrowRight className="w-3.5 h-3.5" />
                   </a>
                 </div>
               </div>

               {/* AnunciCar - In development */}
               <div className="portfolio-card glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden md:flex md:flex-col md:h-full" data-stagger-item data-hover-lift>
                 <div className="portfolio-media bg-[#F0F0EE] w-full flex items-center justify-center shrink-0 overflow-hidden">
                   <span className="font-mono text-[13px] text-[#555555] uppercase tracking-[1.3px]">
                     EM DESENVOLVIMENTO
                   </span>
                 </div>
                 <div className="p-6 md:flex md:flex-col md:flex-grow">
                   <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-1">
                     AnunciCar
                   </h3>
                 </div>
               </div>

             </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
            <h2 data-reveal className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white max-w-[768px]">
              Quem já trabalhou comigo.
            </h2>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x" data-stagger>
              {testimonialsData.map((t, i) => (
                <TiltCard key={i} data-stagger-item className="min-w-[min(86vw,380px)] md:min-w-[380px] snap-start">
                  <div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-8 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-[14px] text-white/40 uppercase tracking-[1.4px] leading-tight pr-2">
                        {t.project}
                      </span>
                      <span className="font-mono text-[14px] font-medium text-white/40 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="font-sans text-[16px] leading-[26px] text-white/50 mb-6">
                      "{t.text}"
                    </p>
                    <StarRating rating={t.rating} />
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section className="bg-brand-surface border-y border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center" data-reveal>
            <h2 className="font-display font-[700] text-[36px] md:text-[44px] leading-[1.15] tracking-[-0.8px] text-white max-w-[680px] mb-6">
              Vamos tirar sua ideia do papel?
            </h2>
            <p className="font-sans text-[18px] leading-[32px] text-white/50 max-w-[560px] mb-10">
              Uma conversa rápida no WhatsApp já define o que precisa ser feito. Sem compromisso, sem rodeio.
            </p>
            <a href="https://wa.me/5574999835227?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto" target="_blank" rel="noreferrer" data-hover-lift className="bg-brand-lime text-black rounded-xl px-10 py-5 flex items-center gap-3 hover:bg-brand-lime/90 transition-colors">
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              <span className="font-mono text-[14px] font-bold uppercase tracking-[1.4px]">Falar no WhatsApp</span>
            </a>
          </div>
        </section>

        {/* Process Section */}
        <section id="metodo" ref={methodSectionRef} className="max-w-[1200px] mx-auto px-6 py-32 flex flex-col lg:flex-row items-start gap-16 lg:gap-32">
          <h2 data-reveal className="font-display font-[700] text-[40px] leading-[48px] tracking-[-0.8px] text-white w-full lg:w-[362px] shrink-0">
            Simples.<br/>Direto.<br/>Entregue.
          </h2>
          
          <div className="relative pl-12 space-y-16 ml-2 lg:ml-0" data-stagger>
            <div className="absolute left-0 top-2 bottom-4 w-[2px] bg-white/[0.06]">
              <div ref={timelineLineRef} className="w-full bg-brand-lime" style={{ height: "0%" }} />
            </div>

            {/* Step 1 */}
            <div className="relative flex flex-col" data-stagger-item>
              <div ref={step1Ref} className="absolute -left-[58px] top-1 w-6 h-6 rounded-full border-4 border-white/20 bg-black transition-colors duration-300" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-white/40 mb-2">Passo 01</span>
              <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-2">
                Descubro o gargalo real
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/50">
                Não começo a codar antes de entender o problema. Uma conversa rápida já define o que vai mudar o negócio de verdade.
              </p>
            </div>

             {/* Step 2 */}
             <div className="relative flex flex-col" data-stagger-item>
              <div ref={step2Ref} className="absolute -left-[58px] top-1 w-6 h-6 rounded-full border-4 border-white/20 bg-black transition-colors duration-300" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-white/40 mb-2">Passo 02</span>
              <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-2">
                Construo rápido
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/50">
                Sem burocracia. MVP funcionando em dias, não meses. Você vê e testa real, não slide de apresentação.
              </p>
            </div>

             {/* Step 3 */}
             <div className="relative flex flex-col" data-stagger-item>
              <div ref={step3Ref} className="absolute -left-[58px] top-1 w-6 h-6 rounded-full border-4 border-white/20 bg-black transition-colors duration-300" />
              <span className="font-mono text-[13px] font-medium uppercase tracking-[1.3px] text-brand-lime mb-2">Passo 03</span>
              <h3 className="font-display font-[600] text-[24px] leading-[31px] tracking-[-0.24px] text-white mb-2">
                Ajusto com dados reais
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/50">
                Depois do lançamento o trabalho continua. Analiso o que funciona e ajusto. Entrego resultado, não código.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="bg-brand-surface border-t border-white/[0.06] py-32 px-6">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-32">
            <div className="flex flex-col flex-1" data-reveal>
              <h2 className="font-display font-[800] text-[48px] md:text-[64px] leading-[1.1] tracking-[-2.56px] text-white mb-6">
                Tem uma ideia para tirar do papel?
              </h2>
              <p className="font-sans text-[18px] leading-[32px] text-white/50 mb-8 max-w-[568px]">
                Me chame no WhatsApp e eu te ajudo a transformar sua ideia ou processo travado em uma solução simples, funcional e pronta para uso.
              </p>
              
              <div className="flex flex-col gap-6">
                <a href="mailto:jvitorafb@gmail.com" className="flex items-center gap-4 group">
                  <div className="bg-white/[0.06] w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white group-hover:scale-110 transition-transform">
                      <path d="M2.00016 4C2.00016 2.89543 2.89559 2 4.00016 2H16.0002C17.1047 2 18.0002 2.89543 18.0002 4V12C18.0002 13.1046 17.1047 14 16.0002 14H4.00016C2.89559 14 2.00016 13.1046 2.00016 12V4Z" fill="currentColor"/>
                      <path d="M18.0002 4.54541L10.0002 9.4545L2.00016 4.54541" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="font-sans font-medium text-[16px] text-white/70 group-hover:underline">
                    jvitorafb@gmail.com
                  </span>
                </a>
                
                <a href="https://wa.me/5574999835227?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                  <div className="bg-white/[0.06] w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                    <WhatsAppIcon className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-sans font-medium text-[16px] text-white/70 group-hover:underline">
                    Falar no WhatsApp
                  </span>
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="glass-card shadow-[0_4px_20px_rgba(0,0,0,0.3)] rounded-lg p-12 flex flex-col items-center flex-1 max-w-[632px]" data-reveal data-hover-lift>
              <div className="bg-brand-lime/20 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                 <svg width="22" height="27" viewBox="0 0 22 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3333 1.33331L1.33333 14.6666H12L10.6667 25.3333L22.6667 12H12L13.3333 1.33331Z" fill="#BEF500" stroke="#BEF500" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-display font-[400] text-[16px] leading-[24px] text-white text-center mb-4">
                Pronto para começar?
              </h3>
              <p className="font-sans text-[16px] leading-[24px] text-white/50 text-center max-w-[476px] mb-8">
                Mande uma mensagem direta no WhatsApp para uma resposta mais rápida e alinhamento do seu projeto.
              </p>
              <a href="https://wa.me/5574999835227?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto" target="_blank" rel="noreferrer" data-hover-lift className="bg-brand-lime text-black w-full rounded py-4 flex items-center justify-center font-mono text-[13px] font-bold tracking-[1.3px] uppercase hover:bg-brand-lime/90 transition-colors">
                Iniciar Conversa
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp - mobile only */}
      <a
        href="https://wa.me/5574999835227?text=Olá,%20gostaria%20de%20falar%20sobre%20um%20projeto"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 md:hidden bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.20)] hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Falar no WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 fill-current" />
      </a>

      {/* Back to top */}
      <button
        onClick={() => lenisRef.current?.scrollTo(0)}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.3)] flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all duration-300 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Voltar ao topo"
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
