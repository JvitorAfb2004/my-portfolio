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
  const [language, setLanguage] = useState("en");
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        downloadCV: "DOWNLOAD CV",
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
        startTransmission: "START TRANSMISSION",
        nameLabel: "IDENTITY // NAME",
        emailLabel: "FREQUENCY // EMAIL",
        msgLabel: "PAYLOAD // MESSAGE",
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
        title: "João Vitor | Fullstack Developer React, Vue and Node.js",
        description:
          "Freelance Fullstack Developer specialized in React, Vue, Node.js and AI automation. I create scalable web systems and high-performance apps.",
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
        downloadCV: "BAIXAR CV",
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
        startTransmission: "INICIAR TRANSMISSÃO",
        nameLabel: "IDENTIDADE // NOME",
        emailLabel: "FREQUÊNCIA // EMAIL",
        msgLabel: "PAYLOAD // MENSAGEM",
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
        title: "João Vitor | Desenvolvedor Fullstack React, Vue e Node.js",
        description:
          "Desenvolvedor Fullstack freelancer especializado em React, Vue, Node.js e automações com IA. Crio sistemas web escaláveis e apps de alta performance.",
      },
    },
  };

  const t = translations[language];

  // SEO & Schema Data
  const personalData = {
    name: "JOÃO VITOR",
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
      id: 1,
      title: "VET ANESTHESIA PRO",
      link: "https://vetanesthesiapro.com/",
      saas: true,
      description: {
        pt: "SaaS para clínicas veterinárias. Gestão completa de anestesias com alta precisão.",
        en: "SaaS for veterinary clinics. Complete anesthesia management with high precision.",
      },
      longDescription: {
        pt: "Este projeto foi desenvolvido para resolver a complexidade do cálculo e monitoramento de anestesias em procedimentos veterinários. A plataforma oferece uma interface intuitiva para os anestesistas registrarem sinais vitais em tempo real, calcularem dosagens de fármacos com base em protocolos pré-definidos e gerarem relatórios detalhados.",
        en: "This project was developed to solve the complexity of calculating and monitoring anesthesia in veterinary procedures. The platform offers an intuitive interface for anesthetists to register vital signs in real time, calculate drug dosages based on pre-defined protocols and generate detailed reports.",
      },
      tags: ["React", "Supabase", "Vercel", "Tailwind"],
      status: "completed",
      type: { pt: "SAAS", en: "SAAS" },
      color: "bg-blue-500",
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
      id: 20,
      title: "NEXO DELIVERY",
      link: "https://nexodelivery.app/",
      saas: true,
      description: {
        pt: "Sistema completo de delivery para restaurantes e marketplaces com app mobile e painéis web.",
        en: "Complete delivery system for restaurants and marketplaces with mobile app and web dashboards.",
      },
      longDescription: {
        pt: "Solução end-to-end para gestão de pedidos, rastreamento em tempo real e painel de administração para restaurante e lojistas. Stack integrada com React Native, Next.js, Node.js, Redis, PostgreSQL, AbacatePay e Docker.",
        en: "End-to-end platform for order management, real-time tracking and administrative dashboards for restaurants and merchants. Built with React Native, Next.js, Node.js, Redis, PostgreSQL, AbacatePay and Docker.",
      },
      tags: ["React Native", "Next.js", "Node.js", "Redis", "PostgreSQL", "AbacatePay", "Docker"],
      status: "completed",
      type: { pt: "DELIVERY", en: "DELIVERY" },
      color: "bg-lime-500",
    },

    {
      id: 3,
      title: "CARRO DIGITAL",
      description: {
        pt: "Ecossistema com Loja Virtual e consultas veiculares em tempo real.",
        en: "Ecosystem with Virtual Store and real-time vehicle consultations.",
      },
      longDescription: {
        pt: "Ecossistema que une loja virtual de autopeças a serviço de consulta veicular. App em React Native para experiência nativa e versão web em Vue.js. Backend robusto em Node.js.",
        en: "Ecosystem that unites auto parts virtual store with vehicle consultation service. React Native app for native experience and Vue.js web version. Robust Node.js backend.",
      },
      tags: ["React Native", "Vue", "Node.js", "MySQL"],
      status: "completed",
      type: { pt: "MOBILE/WEB", en: "MOBILE/WEB" },
      color: "bg-purple-500",
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
      id: 7,
      title: "ACHEICASA.NET",
      link: "https://acheicasa.net/",
      description: {
        pt: "Portal de busca e anúncios de imóveis.",
        en: "Real estate search and advertisement portal.",
      },
      longDescription: {
        pt: "Portal imobiliário completo com filtros avançados de busca, mapas interativos e integração com Mercado Pago para destaque de anúncios.",
        en: "Complete real estate portal with advanced search filters, interactive maps and Mercado Pago integration for ad highlighting.",
      },
      tags: [
        "Nuxt SSR",
        "Node.js",
        "Mercado Pago",
        "Postgres",
        "Docker",
        "Easypanel",
      ],
      status: "completed",
      type: { pt: "REAL ESTATE", en: "REAL ESTATE" },
      color: "bg-cyan-500",
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
      id: 9,
      title: "BOTYT",
      description: {
        pt: "Bot para publicação automática com interface e múltiplos canais.",
        en: "Bot for automatic publication with interface and multiple channels.",
      },
      longDescription: {
        pt: "Ferramenta de automação para criadores de conteúdo, permitindo agendamento e publicação automática em múltiplos canais simultaneamente.",
        en: "Automation tool for content creators, allowing scheduling and automatic publication on multiple channels simultaneously.",
      },
      tags: ["Vue", "Node.js", "MySQL"],
      status: "completed",
      type: { pt: "AUTOMATION", en: "AUTOMATION" },
      color: "bg-pink-500",
    },


    {
      id: 12,
      title: "ALERTAS FUTEBOL",
      description: {
        pt: "Backend para alertas em tempo real de partidas de futebol.",
        en: "Backend for real-time soccer match alerts.",
      },
      longDescription: {
        pt: "Serviço de backend de alta performance que monitora partidas de futebol e envia notificações push em tempo real via Redis.",
        en: "High-performance backend service that monitors soccer matches and sends push notifications in real time via Redis.",
      },
      tags: ["Node.js", "Redis", "PostgreSQL"],
      status: "completed",
      type: { pt: "BACKEND", en: "BACKEND" },
      color: "bg-green-600",
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

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-mono selection:bg-lime-400 selection:text-black overflow-x-hidden relative">
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
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#3f3f46 1px, transparent 1px), linear-gradient(90deg, #3f3f46 1px, transparent 1px)",
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
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter"
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
                className="text-lg md:text-2xl text-neutral-400 max-w-2xl mb-10"
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

                <motion.a
                  href="/Curriculo%20JOAO%20VITOR%20ALVES%20FERNANDES%20BARROS.pdf"
                  download="Curriculo-JoaoVitor.pdf"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#ffffff",
                    color: "#000000",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer rounded-full px-8 py-4 bg-black/20 text-white font-bold text-lg border border-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  {t.hero.downloadCV} <ExternalLink size={20} className="rotate-180" />
                </motion.a>
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

        {/* Stack Section (simplificado) */}
        <section className="py-4 bg-neutral-900 border-t-2 border-neutral-800"></section>

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
              <div className="pointer-events-none absolute inset-y-0 left-0 w-7 rounded-l-[2rem] bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent z-10"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-7 rounded-r-[2rem] bg-gradient-to-l from-neutral-950 via-neutral-950/70 to-transparent z-10"></div>
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
                      className="group relative overflow-hidden rounded-[1.75rem] bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 flex flex-col h-[24rem] min-w-[300px] md:min-w-[360px] snap-start shadow-[0_16px_50px_rgba(0,0,0,0.28)]"
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
                            onClick={() => setSelectedProject(project)}
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
