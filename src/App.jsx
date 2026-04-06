import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
void motion;
import {
  Terminal,
  Code,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Zap,
  Send,
  MessageCircle,
  Star,
  X,
  Menu,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  Globe,
} from "lucide-react";

const DevPortfolio = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [language, setLanguage] = useState("en");
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const projectsSectionRef = useRef(null);
  const projectsScrollRef = useRef(null);
  const panelClass =
    "rounded-[2rem] border border-neutral-800 bg-neutral-900/40 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.28)]";

  // Estados do Formulário
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
  const [formMessage, setFormMessage] = useState("");
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const modalRef = useRef(null);

  const translations = {
    en: {
      nav: {
        home: "Home",
        stack: "Stack",
        projects: "Projects",
        testimonials: "Testimonials",
        contact: "Contact",
      },
      hero: {
        available: "AVAILABLE FOR PROJECTS",
        role: "FULLSTACK DEV",
        description:
          "Specialist in React, Vue and Node.js. I create custom, scalable and high-performance web systems and apps.",
        viewPortfolio: "VIEW PORTFOLIO",
        quote: "GET A QUOTE",
        systemActive: "SYSTEM: ACTIVE",
        clients: "CLIENTS",
        satisfied: "15+ SATISFIED",
        rating: "RATING",
        deliveries: "DELIVERIES",
        onTime: "100% ON TIME",
        githubActivity: "GITHUB ACTIVITY",
      },
      stack: {
        titlePrefix: "TECH_",
        titleSuffix: "ARSENAL",
        fullstack: "FULLSTACK",
        frontend: "Frontend & Mobile",
        backend: "Backend & DB",
        devops: "DevOps",
        devopsDesc: "Docker, Vercel & Payment Gateways.",
        responseTime: "Response Time",
        timeUnit: "24h",
      },
      positioning: {
        label: "// WHAT I BUILD",
        title1: "SERVICES",
        title2: "& PROCESS",
        intro:
          "I build products that need real operation, not just pretty screens. End-to-end delivery focused on product clarity, performance and maintenance.",
        servicesTitle: "MAIN OFFERS",
        processTitle: "HOW I WORK",
        services: [
          {
            title: "SaaS & Platforms",
            description:
              "Complete products with authentication, business rules, dashboards, subscriptions and continuous evolution.",
          },
          {
            title: "Apps & Admin Panels",
            description:
              "Web and mobile applications connected to real operation, from customer flow to internal backoffice.",
          },
          {
            title: "Integrations & Automation",
            description:
              "Payments, notifications, third-party APIs, operational automations and critical system connections.",
          },
        ],
        process: [
          {
            title: "Diagnosis",
            description:
              "I map the real problem, the product flow and the technical constraints before building anything.",
          },
          {
            title: "Build",
            description:
              "I implement the core delivery with focus on stable architecture, clean UI and business logic that holds up in production.",
          },
          {
            title: "Evolution",
            description:
              "After launch, I keep refining the product with maintenance, new features and technical direction.",
          },
        ],
      },
      cases: {
        label: "// SUCCESS CASES",
        title1: "REAL",
        title2: "OUTCOMES",
        intro:
          "Selected products where the value is not just in the stack, but in solving real operational problems with software that holds up in production.",
        problem: "Problem",
        solution: "Solution",
        result: "Result",
      },
      projects: {
        label: "// FULL PORTFOLIO",
        title: "PROJECTS",
        otherLabel: "// OTHER PROJECTS",
        accordionSummary: "VIEW OTHER PROJECTS",
        viewGithub: "View GitHub",
        viewDetails: "View Details",
        statusCompleted: "COMPLETED",
        statusDev: "IN DEVELOPMENT",
        about: "// ABOUT THE PROJECT",
        tech: "// TECHNOLOGIES",
        close: "CLOSE",
        visit: "VISIT PROJECT",
        wantOne: "I WANT ONE LIKE THIS",
      },
      testimonials: {
        titlePrefix: "REAL",
        titleSuffix: "FEEDBACK",
        subtitle: "Average based on client reviews on 99Freelas.",
        viewProfile: "VIEW FULL PROFILE",
      },
      contact: {
        title1: "LET'S CREATE",
        title2: "THE NEXT LEVEL?",
        subtitle:
          "Get in touch to discuss your next project. I reply within 24h.",
        startTransmission: "SEND YOUR MESSAGE",
        nameLabel: "NAME",
        emailLabel: "EMAIL",
        msgLabel: "MESSAGE",
        sending: "SENDING DATA...",
        send: "SEND MESSAGE",
        success: "Message sent successfully! I will contact you soon.",
        error: "Error sending message. Please try again later.",
        connError: "Connection error. Check your internet.",
        fillFields: "Please fill in all fields.",
        placeholderName: "John Doe",
        placeholderEmail: "john@example.com",
        placeholderMsg: "Describe your mission...",
      },
      footer: {
        text: "Developed with hate and caffeine. © 2026 JOÃO VITOR.",
      },
      meta: {
        title: "João Vitor Alves Fernandes Barros | JvitorAFB Fullstack Developer",
        description:
          "João Vitor Alves Fernandes Barros, also known as Jvitor and JvitorAFB, is a fullstack developer specialized in React, Vue, Node.js, TypeScript and scalable web applications.",
      },
    },
    pt: {
      nav: {
        home: "Home",
        stack: "Stack",
        projects: "Projetos",
        testimonials: "Depoimentos",
        contact: "Contato",
      },
      hero: {
        available: "DISPONÍVEL PARA PROJETOS",
        role: "FULLSTACK DEV",
        description:
          "Especialista em React, Vue e Node.js. Crio sistemas web e apps sob medida, escaláveis e de alta performance.",
        viewPortfolio: "VER PORTFÓLIO",
        quote: "ORÇAMENTO",
        systemActive: "SYSTEM: ACTIVE",
        clients: "CLIENTES",
        satisfied: "15+ SATISFEITOS",
        rating: "RATING",
        deliveries: "ENTREGAS",
        onTime: "100% NO PRAZO",
        githubActivity: "ATIVIDADE GITHUB",
      },
      stack: {
        titlePrefix: "TECH_",
        titleSuffix: "ARSENAL",
        fullstack: "FULLSTACK",
        frontend: "Frontend & Mobile",
        backend: "Backend & DB",
        devops: "DevOps",
        devopsDesc: "Docker, Vercel & Gateways de Pagamento.",
        responseTime: "Tempo de Resposta",
        timeUnit: "24h",
      },
      positioning: {
        label: "// O QUE EU CONSTRUO",
        title1: "SERVIÇOS",
        title2: "& PROCESSO",
        intro:
          "Construo produtos que precisam operar de verdade, não só telas bonitas. Entrega ponta a ponta com foco em clareza de produto, performance e manutenção.",
        servicesTitle: "PRINCIPAIS ENTREGAS",
        processTitle: "COMO EU TRABALHO",
        services: [
          {
            title: "SaaS & Plataformas",
            description:
              "Produtos completos com autenticação, regras de negócio, dashboards, assinaturas e evolução contínua.",
          },
          {
            title: "Apps & Painéis",
            description:
              "Aplicações web e mobile conectadas à operação real, do fluxo do cliente ao backoffice interno.",
          },
          {
            title: "Integrações & Automação",
            description:
              "Pagamentos, notificações, APIs de terceiros, automações operacionais e conexões críticas entre sistemas.",
          },
        ],
        process: [
          {
            title: "Diagnóstico",
            description:
              "Mapeio o problema real, o fluxo do produto e as restrições técnicas antes de construir qualquer coisa.",
          },
          {
            title: "Construção",
            description:
              "Implemento a entrega principal com foco em arquitetura estável, interface limpa e regra de negócio que aguenta produção.",
          },
          {
            title: "Evolução",
            description:
              "Depois do lançamento, sigo refinando o produto com manutenção, novas features e direção técnica.",
          },
        ],
      },
      cases: {
        label: "// CASES DE SUCESSO",
        title1: "RESULTADOS",
        title2: "REAIS",
        intro:
          "Produtos selecionados em que o valor não está só na stack, mas na resolução de problemas operacionais reais com software que sustenta produção.",
        problem: "Problema",
        solution: "Solução",
        result: "Resultado",
      },
      projects: {
        label: "// PORTFÓLIO COMPLETO",
        title: "PROJETOS",
        otherLabel: "// OUTROS PROJETOS",
        accordionSummary: "VER OUTROS PROJETOS",
        viewGithub: "Ver GitHub",
        viewDetails: "Ver Detalhes",
        statusCompleted: "CONCLUÍDO",
        statusDev: "EM DESENVOLVIMENTO",
        about: "// SOBRE O PROJETO",
        tech: "// TECNOLOGIAS",
        close: "FECHAR",
        visit: "VISITAR PROJETO",
        wantOne: "QUERO UM IGUAL",
      },
      testimonials: {
        titlePrefix: "FEEDBACKS",
        titleSuffix: "REAIS",
        subtitle: "Média baseada em avaliações de clientes no 99Freelas.",
        viewProfile: "VER PERFIL COMPLETO",
      },
      contact: {
        title1: "VAMOS CRIAR",
        title2: "O PRÓXIMO NÍVEL?",
        subtitle:
          "Entre em contato para conversarmos sobre seu próximo projeto. Respondo em até 24h.",
        startTransmission: "ENVIE SUA MENSAGEM",
        nameLabel: "NOME",
        emailLabel: "EMAIL",
        msgLabel: "MENSAGEM",
        sending: "ENVIANDO DADOS...",
        send: "ENVIAR MENSAGEM",
        success: "Mensagem enviada com sucesso! Entrarei em contato em breve.",
        error: "Erro ao enviar mensagem. Tente novamente mais tarde.",
        connError: "Erro de conexão. Verifique sua internet.",
        fillFields: "Por favor, preencha todos os campos.",
        placeholderName: "João Silva",
        placeholderEmail: "joao@exemplo.com",
        placeholderMsg: "Descreva sua missão...",
      },
      footer: {
        text: "Desenvolvido com ódio e cafeína. © 2026 JOÃO VITOR.",
      },
      meta: {
        title: "João Vitor Alves Fernandes Barros | JvitorAFB Desenvolvedor Fullstack",
        description:
          "João Vitor Alves Fernandes Barros, também conhecido como Jvitor e JvitorAFB, é desenvolvedor fullstack especializado em React, Vue, Node.js, TypeScript e aplicações web escaláveis.",
      },
    },
  };

  const t = translations[language];

  // SEO & Schema Data
  const personalData = {
    name: "João Vitor Alves Fernandes Barros",
    role: "FULLSTACK DEV",
    url: "https://www.joaovitorafb.site",
    image: "https://www.joaovitorafb.site/assets/3394.jpg",
    email: "jvitorafb@gmail.com",
    github: "JvitorAfb2004",
    linkedin: "jvitorafb",
    whatsapp: "5574999835227",
    formAction: "https://formspree.io/f/movdqyyo",
  };

  // Structured Data (JSON-LD) para Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalData.name,
    alternateName: [
      "João Vitor Alves",
      "Joao Vitor Alves",
      "Jvitor",
      "JvitorAFB",
      "jooa vitor alves fernandes barros",
    ],
    jobTitle: "Fullstack Developer",
    url: personalData.url,
    sameAs: [
      `https://github.com/${personalData.github}`,
      `https://linkedin.com/in/${personalData.linkedin}`,
    ],
    knowsAbout: [
      "React",
      "Vue.js",
      "Node.js",
      "TypeScript",
      "DevOps",
      "AI Automation",
    ],
    description: t.meta.description,
  };

  // Atualiza Título, Meta Description e Favicon dinamicamente
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsBooting(false);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // 1. Title
    // eslint-disable-next-line react-hooks/immutability
    document.title = t.meta.title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", t.meta.description);

    // 3. Favicon Injection
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach((icon) => icon.remove());

    const link = document.createElement("link");
    link.type = "image/png";
    link.rel = "shortcut icon";
    link.href = "/favicon.png";
    document.head.appendChild(link);
  }, [language, t.meta.title, t.meta.description]); // Update when language changes

  const navItems = useMemo(
    () => [
      { label: t.nav.home, id: "home" },
      { label: t.nav.projects, id: "projects" },
      { label: t.nav.testimonials, id: "testimonials" },
      { label: t.nav.contact, id: "contact" },
    ],
    [t.nav.contact, t.nav.home, t.nav.projects, t.nav.testimonials]
  );

  const projectsData = [
    {
      id: 21,
      title: "GLOWAPP",
      link: "https://yourglowapp.co/",
      description: {
        pt: "Marketplace internacional de beleza com serviços, chat, booking e fluxos para profissionais e clientes.",
        en: "International beauty marketplace with services, chat, booking and dedicated flows for professionals and clients.",
      },
      longDescription: {
        pt: "Marketplace internacional de beleza, em desenvolvimento para o mercado europeu, com suporte a PT-PT e EN. A plataforma centraliza descoberta de profissionais, vitrine de serviços avulsos, chat interno, fluxo de booking, feed de publicações, vagas, eventos e espaços comerciais para locação dentro do mesmo ecossistema. Atuo como desenvolvedor fullstack responsável pela construção da aplicação e pela condução das principais entregas técnicas do produto.",
        en: "International beauty marketplace in development for the European market, with PT-PT and EN support. The platform centralizes professional discovery, service listings, in-app chat, booking flows, a social feed, job opportunities, events and rentable commercial spaces within the same ecosystem. I work as the fullstack developer responsible for building the application and leading the product's main technical deliveries.",
      },
      tags: ["Vue", "Firebase", "TypeScript"],
      status: "dev",
      type: { pt: "APP", en: "APP" },
      color: "bg-fuchsia-500",
    },
    {
      id: 1,
      title: "VET ANESTHESIA PRO",
      link: "https://vetanesthesiapro.com/",
      saas: true,
      description: {
        pt: "Software clínico veterinário para anestesia, com cálculo, monitoramento e rastreabilidade do procedimento.",
        en: "Veterinary clinical software for anesthesia, with dosage calculation, monitoring and procedure traceability.",
      },
      longDescription: {
        pt: "Software clínico veterinário desenvolvido para atender anestesistas, clínicas e hospitais em toda a jornada anestésica. A plataforma cobre cálculo de dosagens, monitoramento intraoperatório, padronização de protocolos, geração de relatórios clínicos e rastreabilidade completa das informações do procedimento. Atuei na construção completa do produto, consolidando uma solução SaaS especializada para um nicho com exigência alta de precisão e segurança.",
        en: "Veterinary clinical software built for anesthetists, clinics and hospitals across the entire anesthesia workflow. The platform covers dosage calculation, intraoperative monitoring, protocol standardization, clinical reporting and full traceability of procedure data. I worked on the complete product delivery, shaping a specialized SaaS solution for a niche with high demands for precision and safety.",
      },
      tags: ["React", "Supabase", "Vercel", "Tailwind"],
      status: "completed",
      type: { pt: "SAAS", en: "SAAS" },
      color: "bg-blue-500",
    },
    {
      id: 20,
      title: "NEXO DELIVERY",
      link: "https://nexodelivery.app/",
      saas: true,
      description: {
        pt: "Plataforma de delivery para restaurantes com tracking em tempo real, backend central e repasse automatizado.",
        en: "Delivery platform for restaurants with real-time tracking, a central backend and automated payment transfers.",
      },
      longDescription: {
        pt: "Plataforma de delivery desenvolvida para centralizar a operação de restaurantes, com backend central, app mobile para lojistas e entregadores, painel web operacional e painel administrativo. O sistema cobre simulação, criação, aceite, coleta, conclusão, tracking público em tempo real e repasse automatizado, melhorando a gestão do lojista e facilitando a rotina dos entregadores sem o peso das taxas abusivas de plataformas tradicionais.",
        en: "Delivery platform built to centralize restaurant operations, with a central backend, mobile apps for merchants and couriers, a web operations dashboard and an admin panel. The system covers simulation, creation, acceptance, pickup, completion, public real-time tracking and automated payment transfers, improving management for merchants and simplifying the daily workflow for couriers without the burden of abusive fees from traditional platforms.",
      },
      tags: ["React Native", "Next.js", "Node.js", "Redis", "PostgreSQL", "AbacatePay", "Docker"],
      status: "completed",
      type: { pt: "DELIVERY", en: "DELIVERY" },
      color: "bg-lime-500",
    },
    {
      id: 7,
      title: "ACHEICASA.NET",
      link: "https://acheicasa.net/",
      description: {
        pt: "Portal imobiliário com busca avançada, painel completo, mapas e apoio de IA na publicação.",
        en: "Real estate platform with advanced search, a full management panel, maps and AI-assisted listing creation.",
      },
      longDescription: {
        pt: "Portal imobiliário completo para compra, aluguel e leilão, reunindo busca avançada, páginas de anúncio com mídia rica, mapa, street view, tour 360 e painel completo para publicação, edição, destaque e gestão dos imóveis. O fluxo de publicação conta com apoio de IA para estruturar título e descrição a partir de texto livre, enquanto a monetização via assinaturas roda em produção com Banco Efí. Fui responsável por toda a construção do produto, incluindo front-end, back-end, integrações, infraestrutura e manutenção contínua.",
        en: "Complete real estate platform for sales, rentals and auctions, combining advanced search, rich media property pages, maps, street view, 360 tours and a full dashboard for publishing, editing, highlighting and managing listings. The publishing flow uses AI support to structure titles and descriptions from free-form text, while subscription monetization runs in production through Banco Efi. I was responsible for the entire product build, including front-end, back-end, integrations, infrastructure and ongoing maintenance.",
      },
      tags: [
        "Nuxt SSR",
        "Node.js",
        "Banco Efí",
        "Postgres",
        "Docker",
        "Easypanel",
      ],
      status: "completed",
      type: { pt: "REAL ESTATE", en: "REAL ESTATE" },
      color: "bg-cyan-500",
    },
    {
      id: 4,
      title: "GESTÃO LAVANDERIAS",
      description: {
        pt: "Plataforma operacional para lavanderias com controle de fluxo financeiro.",
        en: "Operational platform for laundries with financial flow control.",
      },
      longDescription: {
        pt: "Sistema de gestão completo para lavanderias, otimizando o fluxo desde a recepção até a entrega. Controle de estoque, clientes e notas fiscais. Dashboard financeiro detalhado.",
        en: "Complete management system for laundries, optimizing flow from reception to delivery. Inventory, customer and invoice control. Detailed financial dashboard.",
      },
      tags: ["React", "Postgres", "Node.js", "Vite", "WhatsApp Cloud API"],
      status: "completed",
      type: { pt: "SISTEMA", en: "SYSTEM" },
      color: "bg-emerald-500",
    },

    {
      id: 6,
      title: "VIAPET.SHOP",
      link: "https://viapet.shop/",
      description: {
        pt: "Marketplace para venda de produtos e serviços para pets.",
        en: "Marketplace for selling pet products and services.",
      },
      longDescription: {
        pt: "Plataforma multivendor para o nicho pet, permitindo que diversos lojistas vendam produtos e serviços. Integração com Mercado Pago para pagamentos.",
        en: "Multivendor platform for the pet niche, allowing various shopkeepers to sell products and services. Integration with Mercado Pago for payments.",
      },
      tags: ["Vue", "Node.js", "Mercado Pago", "MySQL"],
      status: "completed",
      type: { pt: "MARKETPLACE", en: "MARKETPLACE" },
      color: "bg-orange-500",
    },
    {
      id: 8,
      title: "GYMSOFTWARE",
      description: {
        pt: "Gestão de academias integrado com controle de acesso (catraca).",
        en: "Gym management integrated with access control (turnstile).",
      },
      longDescription: {
        pt: "Sistema de gerenciamento para academias que controla planos, pagamentos e libera automaticamente o acesso na catraca física.",
        en: "Management system for gyms that controls plans, payments and automatically releases access on the physical turnstile.",
      },
      tags: ["Vue", "C#", "Firebase"],
      status: "completed",
      type: { pt: "SISTEMA", en: "SYSTEM" },
      color: "bg-red-500",
    },
    {
      id: 19,
      title: "FORUM VET ANESTHESIA",
      link: "https://forum.vetanesthesiapro.com/",
      description: {
        pt: "Fórum dedicado à comunidade veterinária para discussão de casos e protocolos.",
        en: "Forum dedicated to the veterinary community for discussing cases and protocols.",
      },
      longDescription: {
        pt: "Plataforma de comunidade para veterinários trocarem experiências, discutirem casos complexos de anestesia e compartilharem protocolos. Em desenvolvimento constante.",
        en: "Community platform for veterinarians to exchange experiences, discuss complex anesthesia cases and share protocols. Under constant development.",
      },
      tags: ["Next.js", "Supabase", "Redis", "Postgres", "Google OAuth"],
      status: "completed",
      type: { pt: "COMMUNITY", en: "COMMUNITY" },
      color: "bg-blue-400",
    },
    {
      id: 13,
      title: "ALUGMOTOS (LP)",
      link: "https://alugmotos.com.br/",
      description: {
        pt: "Landing page dinâmica para locação de motos.",
        en: "Dynamic landing page for motorcycle rental.",
      },
      longDescription: {
        pt: "Página de conversão com dados dinâmicos baseados na localização e configuração das unidades de locação.",
        en: "Conversion page with dynamic data based on location and rental unit configuration.",
      },
      tags: ["Next.js", "Node.js", "Postgres", "Redis"],
      status: "completed",
      type: { pt: "WEB", en: "WEB" },
      color: "bg-yellow-600",
    },
    {
      id: 14,
      title: "APP ALUGMOTOS",
      description: {
        pt: "App para locatário, admin e vistoriador.",
        en: "App for renter, admin and surveyor.",
      },
      longDescription: {
        pt: "Aplicativo complexo para gestão completa de frota de motos, incluindo vistorias, pagamentos recorrentes e manutenção.",
        en: "Complex application for complete motorcycle fleet management, including inspections, recurring payments and maintenance.",
      },
      tags: ["Next.js", "Node.js", "Docker"],
      status: "completed",
      type: { pt: "APP/SISTEMA", en: "APP/SYSTEM" },
      color: "bg-blue-600",
    },
    {
      id: 15,
      title: "CARDAPIU",
      link: "https://cardapiu.shop/",
      saas: true,
      description: {
        pt: "Sistema de delivery para estabelecimentos.",
        en: "Delivery system for establishments.",
      },
      longDescription: {
        pt: "Plataforma de delivery estilo iFood para restaurantes, com painel administrativo Desktop em .NET.",
        en: "iFood-style delivery platform for restaurants, with Desktop administrative panel in .NET.",
      },
      tags: ["Next.js", "Node.js", "Postgres", ".NET"],
      status: "completed",
      type: { pt: "DELIVERY", en: "DELIVERY" },
      color: "bg-orange-600",
    },
    {
      id: 16,
      title: "ENTREGU",
      link: "https://www.entregu.com.br/",
      description: {
        pt: "Sistema para entregadores e lojistas.",
        en: "System for couriers and shopkeepers.",
      },
      longDescription: {
        pt: "Plataforma de logística last-mile conectando entregadores a lojistas locais, com rastreamento em tempo real.",
        en: "Last-mile logistics platform connecting couriers to local shopkeepers, with real-time tracking.",
      },
      tags: ["React", "Next.js", "React Native", "Node.js", "Postgres", "Redis"],
      status: "completed",
      type: { pt: "LOGÍSTICA", en: "LOGISTICS" },
      color: "bg-red-600",
    },

    {
      id: 18,
      title: "LORYS MODA CRISTA",
      link: "https://lorysmodacrista.com.br/",
      saas: true,
      description: {
        pt: "E-commerce de moda cristã completo.",
        en: "Complete Christian fashion e-commerce.",
      },
      longDescription: {
        pt: "Loja virtual completa com sistema de gestão de pedidos, integração com Melhor Envio para fretes e Mercado Pago para pagamentos. Painel administrativo intuitivo.",
        en: "Complete virtual store with order management system, integration with Melhor Envio for shipping and Mercado Pago for payments. Intuitive administrative panel.",
      },
      tags: ["React", "Next.js", "Supabase", "Melhor Envio", "Mercado Pago", "shadcn"],
      status: "completed",
      type: { pt: "E-COMMERCE", en: "E-COMMERCE" },
      color: "bg-pink-600",
    },
  ];

  const testimonialsData = [
    {
      id: 1,
      text: {
        pt: "Excelente profissional!!! Conhecimento e domínio incrível. Pontual, dedicado, compreende o projeto e executa com agilidade.",
        en: "Excellent professional!!! Incredible knowledge and mastery. Punctual, dedicated, understands the project and executes with agility.",
      },
      role: { pt: "Portal Imobiliário", en: "Real Estate Portal" },
      stars: 5,
    },
    {
      id: 2,
      text: {
        pt: "Excelente programador! Entregou antes do prazo final, muito comprometido e tem ótima comunicação.",
        en: "Excellent programmer! Delivered before the deadline, very committed and has great communication.",
      },
      role: { pt: "App Veterinário", en: "Veterinary App" },
      stars: 5,
    },
    {
      id: 3,
      text: {
        pt: "Recomendo. Prestativo e tudo de acordo com o combinado.",
        en: "Recommend. Helpful and everything according to the agreement.",
      },
      role: { pt: "App WebSocket", en: "WebSocket App" },
      stars: 5,
    },
    {
      id: 4,
      text: {
        pt: "Profissional muito prestativo e competente.",
        en: "Very helpful and competent professional.",
      },
      role: { pt: "Sistema de Gestão", en: "Management System" },
      stars: 5,
    },
    {
      id: 5,
      text: {
        pt: "Super prestativo. Entendeu exatamente o que eu precisava.",
        en: "Super helpful. Understood exactly what I needed.",
      },
      role: { pt: "Site e App Mobile", en: "Website and Mobile App" },
      stars: 5,
    },
  ];

  const successCases = [
    {
      id: "glowapp-case",
      title: "GLOWAPP",
      problem: {
        pt: "Profissionais e clientes de beleza precisavam de uma plataforma única para descoberta de serviços, comunicação e booking em um contexto internacional.",
        en: "Beauty professionals and clients needed a single platform for service discovery, communication and booking in an international context.",
      },
      solution: {
        pt: "Desenvolvimento de um marketplace multilíngue com perfis distintos para profissionais e clientes, vitrine de serviços, chat interno, booking, jobs, eventos e spaces dentro do mesmo ecossistema.",
        en: "Built a multilingual marketplace with dedicated flows for professionals and clients, combining service listings, in-app chat, booking, jobs, events and spaces within the same ecosystem.",
      },
      result: {
        pt: "Base digital centralizada para operar múltiplos fluxos do mercado de beleza em uma única plataforma internacional.",
        en: "A centralized digital foundation to operate multiple beauty-market workflows inside a single international platform.",
      },
    },
    {
      id: "nexo-case",
      title: "NEXO DELIVERY",
      problem: {
        pt: "Restaurantes precisavam centralizar a gestão das entregas e reduzir o atrito operacional sem depender de plataformas com taxas pesadas.",
        en: "Restaurants needed to centralize delivery management and reduce operational friction without relying on platforms with heavy fees.",
      },
      solution: {
        pt: "Construção de uma plataforma completa com backend central, app para lojistas e entregadores, painel web operacional, tracking em tempo real e repasse automatizado.",
        en: "Built a complete platform with a central backend, apps for merchants and couriers, a web operations dashboard, real-time tracking and automated payment transfers.",
      },
      result: {
        pt: "Operação mais centralizada para o lojista, rotina mais simples para os entregadores e modelo mais viável para restaurantes sem taxas abusivas.",
        en: "A more centralized operation for merchants, a simpler workflow for couriers and a more viable model for restaurants without abusive fees.",
      },
    },
    {
      id: "acheicasa-case",
      title: "ACHEICASA.NET",
      problem: {
        pt: "O mercado precisava de uma experiência mais robusta para publicar, gerenciar e encontrar imóveis, sem fluxos limitados ou publicação manual desorganizada.",
        en: "The market needed a stronger experience to publish, manage and discover properties without limited flows or disorganized manual publishing.",
      },
      solution: {
        pt: "Desenvolvimento fullstack completo da plataforma, com busca avançada, painel de gestão, páginas de anúncio ricas em mídia, integração com mapas, IA na publicação e assinaturas com Banco Efí.",
        en: "Delivered the platform end-to-end, with advanced search, management dashboards, rich media listing pages, map integrations, AI-assisted publishing and Banco Efi subscriptions.",
      },
      result: {
        pt: "Plataforma imobiliária em produção com operação centralizada para anunciantes, experiência de busca mais rica e fluxo de publicação mais eficiente.",
        en: "A production real estate platform with centralized operations for advertisers, richer search experiences and a more efficient publishing flow.",
      },
    },
  ];

  // Configuração de Animações Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } },
  };

  // Scroll detection
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 400) setActiveSection(sectionId);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // --- Lógica de Envio de Formulário (Integrado com Formspree) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");
    setFormMessage("");

    if (!formData.from_name || !formData.reply_to || !formData.message) {
      setFormStatus("error");
      setFormMessage(t.contact.fillFields);
      return;
    }

    try {
      const response = await fetch(personalData.formAction, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setFormStatus("success");
        setFormMessage(t.contact.success);
        setFormData({ from_name: "", reply_to: "", message: "" }); // Limpa o formulário

        // Remove mensagem de sucesso após 5 segundos
        setTimeout(() => {
          setFormStatus("idle");
          setFormMessage("");
        }, 5000);
      } else {
        setFormStatus("error");
        setFormMessage(t.contact.error);
      }
    } catch {
      setFormStatus("error");
      setFormMessage(t.contact.connError);
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  };

  const scrollProjects = (direction) => {
    const container = projectsScrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction * 360,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const services = t.positioning.services;
    if (!services?.length) return;

    const intervalId = window.setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % services.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [t.positioning.services]);

  useEffect(() => {
    setActiveServiceIndex(0);
  }, [language]);

  const handleServiceNavigation = (direction) => {
    const services = t.positioning.services;
    if (!services?.length) return;

    setActiveServiceIndex((prev) => {
      if (direction > 0) return (prev + 1) % services.length;
      return (prev - 1 + services.length) % services.length;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono selection:bg-lime-400 selection:text-black overflow-x-hidden relative">
      <AnimatePresence>
        {isBooting && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-neutral-950"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                rotate: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
              }}
              className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-lime-400/30 bg-lime-400 text-black shadow-[0_24px_70px_rgba(163,230,53,0.18)]"
            >
              <Terminal size={40} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* JSON-LD Script para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Barra de Progresso de Leitura */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 bg-lime-400 origin-left z-[60]"
      />

      {/* Background Pattern */}
      <div
        className="fixed inset-0 z-0 opacity-[0.14] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#27272a 1px, transparent 1px), linear-gradient(90deg, #27272a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Navbar */}
      <nav
        className="fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-300"
      >
        <div className={`${panelClass} container mx-auto px-4 flex justify-between items-center py-3`}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer z-50"
            onClick={() => scrollTo("home")}
          >
            <div className="rounded-2xl bg-lime-400 text-black p-2 border border-lime-400/40 group-hover:rotate-12 transition-transform duration-300">
              <Terminal size={20} />
            </div>
            <motion.span
              animate={{ opacity: [1, 0.5, 1, 1], x: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, repeatDelay: 3 }}
            >
              JVitor
            </motion.span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 font-bold">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.id)}
                className={`cursor-pointer uppercase tracking-widest text-sm hover:text-lime-400 transition-colors relative group
                  ${activeSection === item.id
                    ? "text-lime-400"
                    : "text-neutral-400"
                  }
                `}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeDot"
                    className="absolute -left-3 top-0 text-lime-400"
                  >
                    &gt;
                  </motion.span>
                )}
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-400 transition-all group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex gap-4"
          >
            {/* Language Switcher */}
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "4px 4px 0px 0px #ffffff",
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 0px 0px 0px #ffffff",
              }}
              onClick={toggleLanguage}
              className="cursor-pointer rounded-full bg-black/40 text-white px-3 py-2 font-bold border border-neutral-700 flex items-center gap-2 text-xs"
            >
              {language === 'en' ? 'PT-BR' : 'EN'}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "4px 4px 0px 0px rgba(163,230,53,1)",
              }}
              whileTap={{
                scale: 0.95,
                boxShadow: "0px 0px 0px 0px rgba(163,230,53,1)",
              }}
              onClick={() =>
                window.open(`https://wa.me/${personalData.whatsapp}`, "_blank")
              }
              className="cursor-pointer rounded-full bg-neutral-100 text-black px-4 py-2 font-bold border border-lime-400 flex items-center gap-2 text-sm"
            >
              <MessageCircle size={16} /> WHATSAPP
            </motion.button>
          </motion.div>

          <div className="flex items-center gap-4 md:hidden z-50">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="cursor-pointer rounded-full bg-black/40 text-white px-2 py-1 font-bold border border-neutral-700 text-xs"
            >
              {language === 'en' ? 'PT' : 'EN'}
            </button>
            <button
              className="cursor-pointer text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-neutral-900 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="cursor-pointer text-2xl font-black uppercase text-white hover:text-lime-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() =>
                window.open(`https://wa.me/${personalData.whatsapp}`, "_blank")
              }
              className="cursor-pointer mt-8 rounded-full bg-lime-400 text-black px-8 py-3 font-black text-xl border border-white"
            >
              WHATSAPP
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative pt-32 pb-20 min-h-screen flex items-center border-b-2 border-neutral-800"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.3)_0%,_transparent_40%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.2)_0%,_transparent_40%)]"></div>
          </div>
          <div className="container mx-auto px-4 grid grid-cols-1 gap-12 items-center relative z-10">
            <motion.div
              className="z-10 max-w-4xl"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center rounded-full border border-lime-400/40 bg-lime-400/10 px-3 py-1 text-xs font-bold mb-6 text-lime-400"
              >
                {t.hero.available}
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7.2rem] font-black leading-none mb-6 tracking-tighter"
              >
                JOAO VITOR
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600 relative">
                  FULLSTACK
                  <span className="absolute -inset-1 border-2 border-lime-400 opacity-20 blur-sm"></span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-[1.7rem] text-neutral-400 max-w-2xl mb-10"
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  onClick={() => scrollTo("projects")}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "transparent",
                    color: "#A3E635",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-full px-8 py-4 bg-lime-400 text-black font-black text-lg border border-lime-400 flex items-center justify-center gap-2 group transition-colors"
                >
                  {t.hero.viewPortfolio}
                  <ExternalLink
                    size={20}
                    className="group-hover:rotate-45 transition-transform duration-300"
                  />
                </motion.button>

                <motion.button
                  onClick={() => scrollTo("contact")}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-full px-8 py-4 bg-black/20 text-white font-bold text-lg border border-neutral-700 transition-colors"
                >
                  {t.hero.quote}
                </motion.button>

              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* Marquee */}
        <div className="bg-lime-400 text-black py-3 overflow-hidden border-y-2 border-black rotate-1 scale-105 z-20 relative select-none">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="whitespace-nowrap inline-block font-black text-xl"
          >
            REACT // VUE.JS // NODE.JS // TYPESCRIPT // REACT NATIVE // TAILWIND
            // DOCKER // POSTGRESQL // NEXT.JS // SUPABASE // REACT // VUE.JS //
            NODE.JS // TYPESCRIPT // REACT NATIVE // TAILWIND // DOCKER //
            POSTGRESQL // NEXT.JS // SUPABASE //
          </motion.div>
        </div>

        <section className="py-24 bg-neutral-900 border-t-2 border-neutral-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 max-w-4xl"
            >
              <span className="text-lime-400 font-bold block mb-3">
                {t.positioning.label}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-6">
                {t.positioning.title1}
                <br />
                <span className="text-neutral-400">{t.positioning.title2}</span>
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-3xl">
                {t.positioning.intro}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${panelClass} p-6 md:p-8`}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 className="text-xl md:text-2xl font-black text-white">
                    {t.positioning.servicesTitle}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleServiceNavigation(-1)}
                      aria-label="Previous service"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-black/20 text-neutral-400 transition-colors hover:border-lime-400 hover:text-lime-400"
                    >
                      <ArrowRight size={16} className="rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleServiceNavigation(1)}
                      aria-label="Next service"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-black/20 text-neutral-400 transition-colors hover:border-lime-400 hover:text-lime-400"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-neutral-800 bg-black/20 p-6 md:p-8 min-h-[280px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${language}-${activeServiceIndex}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex-1"
                    >
                      <div className="text-lime-400 text-xs font-black tracking-[0.25em] mb-4">
                        0{activeServiceIndex + 1}
                      </div>
                      <p className="text-white font-black text-2xl md:text-4xl mb-5 tracking-tight max-w-xl">
                        {t.positioning.services[activeServiceIndex].title}
                      </p>
                      <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-sans max-w-2xl">
                        {t.positioning.services[activeServiceIndex].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-8 flex items-center gap-2">
                    {t.positioning.services.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        aria-label={`Go to ${item.title}`}
                        onClick={() => setActiveServiceIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${
                          index === activeServiceIndex
                            ? "w-10 bg-lime-400"
                            : "w-2.5 bg-neutral-700 hover:bg-neutral-500"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`${panelClass} p-6 md:p-8`}
              >
                <h3 className="text-xl md:text-2xl font-black text-white mb-6">
                  {t.positioning.processTitle}
                </h3>
                <div className="space-y-4">
                  {t.positioning.process.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-[1.5rem] border border-neutral-800 bg-black/20 p-5"
                    >
                      <div className="text-lime-400 text-xs font-black tracking-[0.25em] mb-2">
                        0{index + 1}
                      </div>
                      <p className="text-white font-black text-lg mb-2 tracking-tight">
                        {item.title}
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed font-sans">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-neutral-950 border-t-2 border-neutral-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 max-w-4xl"
            >
              <span className="text-lime-400 font-bold block mb-3">
                {t.cases.label}
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-6">
                {t.cases.title1}
                <br />
                <span className="text-neutral-400">{t.cases.title2}</span>
              </h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-3xl">
                {t.cases.intro}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {successCases.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`${panelClass} p-6 md:p-7 flex flex-col gap-6`}
                >
                  <div>
                    <div className="text-lime-400 text-xs font-black tracking-[0.25em] mb-3">
                      CASE 0{index + 1}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className="rounded-[1.5rem] border border-neutral-800 bg-black/20 p-5">
                    <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] font-black mb-3">
                      {t.cases.problem}
                    </p>
                    <p className="text-neutral-300 font-sans text-sm leading-relaxed">
                      {item.problem[language]}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-neutral-800 bg-black/20 p-5">
                    <p className="text-neutral-500 text-[11px] uppercase tracking-[0.25em] font-black mb-3">
                      {t.cases.solution}
                    </p>
                    <p className="text-neutral-300 font-sans text-sm leading-relaxed">
                      {item.solution[language]}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] border border-lime-400/30 bg-lime-400/5 p-5">
                    <p className="text-lime-400 text-[11px] uppercase tracking-[0.25em] font-black mb-3">
                      {t.cases.result}
                    </p>
                    <p className="text-white font-sans text-sm leading-relaxed">
                      {item.result[language]}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen py-24 bg-neutral-950 border-t-2 border-neutral-800"
          ref={projectsSectionRef}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-16"
            >
              <div>
                <span className="text-lime-400 font-bold block mb-2">
                  {t.projects.label}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white">
                  {t.projects.title}
                </h2>
              </div>
              <motion.a
                whileHover={{ x: 5, color: "#A3E635" }}
                href={`https://github.com/${personalData.github}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 text-white font-bold uppercase"
              >
                {t.projects.viewGithub} <Github size={18} />
              </motion.a>
            </motion.div>

            <div className="relative p-0 md:p-2">
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden md:block w-7 rounded-l-[2rem] bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent z-10"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden md:block w-7 rounded-r-[2rem] bg-gradient-to-l from-neutral-950 via-neutral-950/70 to-transparent z-10"></div>
              <button
                type="button"
                onClick={() => scrollProjects(-1)}
                aria-label="Scroll projects left"
                className="hidden md:flex cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/70 text-neutral-400 backdrop-blur-sm transition-colors hover:border-lime-400 hover:text-lime-400"
              >
                <ArrowRight size={16} className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => scrollProjects(1)}
                aria-label="Scroll projects right"
                className="hidden md:flex cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-20 h-11 w-11 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/70 text-neutral-400 backdrop-blur-sm transition-colors hover:border-lime-400 hover:text-lime-400"
              >
                <ArrowRight size={16} />
              </button>
              <div
                ref={projectsScrollRef}
                className="overflow-x-auto overflow-y-hidden w-full no-scrollbar pb-2"
              >
                <div className="flex gap-5 w-max pr-28">
                  {projectsData.map((project, index) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedProject(project)}
                      className="group relative overflow-hidden rounded-[1.75rem] bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col h-[24rem] min-w-[300px] md:min-w-[360px] snap-start shadow-[0_16px_50px_rgba(0,0,0,0.28)] cursor-pointer"
                    >
                      <div className="p-5 border-b border-neutral-800/80 bg-neutral-950/20 flex justify-between items-start">
                        <div className="flex gap-2">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${project.color} shadow-[0_0_0_4px_rgba(255,255,255,0.02)]`}
                          ></div>
                          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-400">
                            {project.type[language]}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${project.status === "completed"
                            ? "border-lime-400/40 text-lime-400 bg-lime-400/5"
                            : "border-yellow-500/40 text-yellow-500 bg-yellow-500/5"
                            }`}
                        >
                          {project.status === "completed"
                            ? t.projects.statusCompleted
                            : t.projects.statusDev}
                        </span>
                      </div>

                      <div className="p-7 md:p-8 relative flex-grow flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-black mb-4 tracking-tighter group-hover:text-lime-400 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-neutral-400 mb-6 font-sans leading-relaxed text-sm max-w-[28ch] min-h-[4.5rem]">
                            {project.description[language]}
                          </p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="text-[11px] font-mono text-neutral-400 border border-neutral-800/80 px-2.5 py-1 bg-black/40 rounded-full"
                              >
                                #{t}
                              </span>
                            ))}
                            {project.tags.length > 4 && (
                              <span className="text-[11px] font-mono text-neutral-500 px-2 py-1">
                                ...
                              </span>
                            )}
                          </div>

                        <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            whileHover={{ x: 3 }}
                            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-neutral-700 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white hover:border-lime-400 hover:text-lime-400 transition-colors"
                          >
                            {t.projects.viewDetails} <ExternalLink size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-24 bg-neutral-950 border-t-2 border-neutral-800"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-1"
              >
                <h2 className="text-4xl font-black text-white mb-6">
                  {t.testimonials.titlePrefix} <span className="text-lime-400">{t.testimonials.titleSuffix}</span>
                </h2>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`${panelClass} p-6 group hover:border-lime-400 transition-colors duration-300`}
                >
                  <div className="text-5xl font-black text-lime-400 mb-2">
                    4.8<span className="text-lg text-white">/5</span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4">
                    {t.testimonials.subtitle}
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={20}
                        className="text-lime-400 fill-lime-400"
                      />
                    ))}
                  </div>
                  <a
                    href="https://www.99freelas.com.br/user/jvitorafb"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-white text-xs font-bold hover:text-lime-400 transition-colors"
                  >
                    {t.testimonials.viewProfile} <ExternalLink size={12} />
                  </a>
                </motion.div>
              </motion.div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonialsData.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`${panelClass} p-6 border-l-4 border-lime-400`}
                    >
                      <div className="flex gap-1 mb-3">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className="text-lime-400 fill-lime-400"
                          />
                        ))}
                      </div>
                      <p className="text-neutral-300 italic mb-4 text-sm">
                        "{t.text[language]}"
                      </p>
                      <p className="text-lime-400 font-bold text-xs uppercase tracking-wider">
                        // {t.role[language]}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-neutral-950 text-white relative border-t-2 border-neutral-800">
          <div className="container mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 ${panelClass} p-6 md:p-10`}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none tracking-tighter">
                  {t.contact.title1}
                  <br />{t.contact.title2}
                </h2>
                <p className="text-xl text-neutral-400 mb-12 max-w-md">
                  {t.contact.subtitle}
                </p>

                <div className="space-y-6">
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`mailto:${personalData.email}`}
                    className="flex items-center gap-4 text-xl md:text-2xl font-black group cursor-pointer"
                  >
                    <Mail className="border border-neutral-700 p-2 w-12 h-12 rounded-2xl bg-black/40 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300" />
                    {personalData.email}
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`https://linkedin.com/in/${personalData.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-xl md:text-2xl font-black group cursor-pointer"
                  >
                    <Linkedin className="border border-neutral-700 p-2 w-12 h-12 rounded-2xl bg-black/40 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300" />
                    /in/{personalData.linkedin}
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`https://github.com/${personalData.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-xl md:text-2xl font-black group cursor-pointer"
                  >
                    <Github className="border border-neutral-700 p-2 w-12 h-12 rounded-2xl bg-black/40 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300" />
                    @{personalData.github}
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{
                  boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
                  translate: "0px 2px",
                }}
                className="p-0 transition-all"
              >
                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-lime-400" /> {t.contact.startTransmission}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-lime-400 text-xs font-bold block mb-1">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="from_name" // Nome original para compatibilidade
                      value={formData.from_name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-950 border border-neutral-700 text-white p-4 rounded-2xl focus:border-lime-400 focus:outline-none focus:bg-neutral-900 transition-colors font-mono"
                      placeholder={t.contact.placeholderName}
                    />
                  </div>
                  <div>
                    <label className="text-lime-400 text-xs font-bold block mb-1">
                      {t.contact.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="reply_to" // Nome original para compatibilidade
                      value={formData.reply_to}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-950 border border-neutral-700 text-white p-4 rounded-2xl focus:border-lime-400 focus:outline-none focus:bg-neutral-900 transition-colors font-mono"
                      placeholder={t.contact.placeholderEmail}
                    />
                  </div>
                  <div>
                    <label className="text-lime-400 text-xs font-bold block mb-1">
                      {t.contact.msgLabel}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      required
                    className="w-full bg-neutral-950 border border-neutral-700 text-white p-4 rounded-2xl focus:border-lime-400 focus:outline-none focus:bg-neutral-900 transition-colors font-mono"
                    placeholder={t.contact.placeholderMsg}
                  ></textarea>
                </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="cursor-pointer w-full bg-lime-400 text-black font-black py-4 flex items-center justify-center gap-2 mt-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        {t.contact.sending}{" "}
                        <Loader2 className="animate-spin" size={18} />
                      </>
                    ) : (
                      <>
                        {t.contact.send} <Send size={18} />
                      </>
                    )}
                  </motion.button>

                  {/* Feedback Messages */}
                  <AnimatePresence>
                    {formStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-green-500/10 border border-green-500 text-green-500 p-3 flex items-center gap-2 text-sm font-bold mt-2 rounded-2xl"
                      >
                        <CheckCircle size={16} /> {formMessage}
                      </motion.div>
                    )}
                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500 text-red-500 p-3 flex items-center gap-2 text-sm font-bold mt-2 rounded-2xl"
                      >
                        <AlertCircle size={16} /> {formMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <motion.a
        href={`https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
          language === "pt"
            ? "Olá, vim do seu portfólio e gostaria de conversar."
            : "Hello, I came from your portfolio and would like to talk."
        )}`}
        target="_blank"
        rel="noreferrer"
        whileHover={{
          scale: 1.06,
          boxShadow: "0 20px 45px rgba(163,230,53,0.28)",
        }}
        whileTap={{ scale: 0.96 }}
        aria-label="Abrir conversa no WhatsApp"
        className="fixed right-4 bottom-4 z-[70] flex h-14 w-14 items-center justify-center rounded-full border border-lime-400/50 bg-lime-400 text-black shadow-[0_18px_40px_rgba(163,230,53,0.2)] transition-colors hover:bg-lime-300 md:right-6 md:bottom-6"
      >
        <MessageCircle size={24} />
      </motion.a>

      {/* Footer */}
      <footer className="bg-black text-neutral-500 py-8 px-4 text-center text-[11px] sm:text-xs md:text-sm border-t border-neutral-800">
        <p className="mx-auto max-w-xs sm:max-w-md leading-relaxed">
          {t.footer.text}
        </p>
      </footer>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto relative rounded-[2rem] border border-neutral-800 bg-neutral-900/95 backdrop-blur-sm shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
            >
              <div className="sticky top-0 bg-neutral-950/90 backdrop-blur border-b border-neutral-800 p-4 md:p-5 flex justify-between items-center z-10 rounded-t-[2rem]">
                <h3 className="text-xl md:text-2xl font-black text-lime-400 tracking-tighter">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-black/40 text-neutral-400 hover:border-lime-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${selectedProject.status === "completed"
                      ? "border-lime-400/40 text-lime-400 bg-lime-400/5"
                      : "border-yellow-500/40 text-yellow-500 bg-yellow-500/5"
                      }`}
                  >
                    {selectedProject.status === "completed" ? t.projects.statusCompleted : t.projects.statusDev}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border border-neutral-700 text-neutral-400">
                    {selectedProject.type[language]}
                  </span>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-white block border-b border-neutral-800 pb-2 tracking-tight">
                    <span className="text-lime-400">//</span> {t.projects.about}
                  </h4>
                  <p className="text-neutral-300 font-sans leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {selectedProject.longDescription[language]}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-white block border-b border-neutral-800 pb-2 tracking-tight">
                    <span className="text-lime-400">//</span> {t.projects.tech}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="text-sm font-mono text-lime-400 border border-lime-400/40 px-3 py-1 rounded-full bg-lime-400/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800 flex flex-wrap gap-4 justify-end">
                  {selectedProject.link && (
                    <motion.a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer rounded-full bg-lime-400 text-black px-6 py-2 font-black uppercase flex items-center gap-2 border border-transparent hover:bg-lime-500 transition-colors text-sm"
                    >
                      {t.projects.visit} <Globe size={16} />
                    </motion.a>
                  )}

                  {selectedProject.saas && (
                    <motion.a
                      href={`https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
                        language === 'pt'
                          ? `Olá, vi o projeto ${selectedProject.title} no seu portfólio e gostaria de um igual.`
                          : `Hello, I saw the project ${selectedProject.title} in your portfolio and would like one like it.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="cursor-pointer rounded-full bg-neutral-100 text-black px-6 py-2 font-black uppercase flex items-center gap-2 border border-lime-400 hover:bg-white transition-colors text-sm"
                    >
                      {t.projects.wantOne} <MessageCircle size={16} />
                    </motion.a>
                  )}

                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedProject(null)}
                    className="cursor-pointer rounded-full border border-neutral-700 px-4 py-2 text-white font-bold flex items-center gap-2 hover:text-lime-400 ml-auto"
                  >
                    {t.projects.close} <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DevPortfolio;
