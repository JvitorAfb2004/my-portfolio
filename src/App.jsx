import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Terminal,
  Code,
  Cpu,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Zap,
  Database,
  Layout,
  Send,
  MessageCircle,
  Star,
  X,
  Menu,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const DevPortfolio = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Estados do Formulário
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
  const [formMessage, setFormMessage] = useState("");
  const [formData, setFormData] = useState({
    from_name: "",
    reply_to: "",
    message: "",
  });

  const modalRef = useRef(null);

  // SEO & Schema Data
  const personalData = {
    name: "JOÃO VITOR",
    role: "FULLSTACK DEV",
    title: "João Vitor | Desenvolvedor Fullstack React, Vue e Node.js",
    description:
      "Desenvolvedor Fullstack freelancer especializado em React, Vue, Node.js e automações com IA. Crio sistemas web escaláveis e apps de alta performance.",
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
    description: personalData.description,
  };

  // Atualiza Título, Meta Description e Favicon dinamicamente
  useEffect(() => {
    // 1. Title
    document.title = personalData.title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", personalData.description);

    // 3. Favicon Injection
    // Procura links de ícone existentes e remove para evitar duplicatas
    const existingIcons = document.querySelectorAll("link[rel*='icon']");
    existingIcons.forEach((icon) => icon.remove());

    // Cria o novo link do favicon
    const link = document.createElement("link");
    link.type = "image/png";
    link.rel = "shortcut icon";
    link.href = "/favicon.png"; // Certifique-se que o arquivo está na pasta public
    document.head.appendChild(link);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Stack", id: "stack" },
    { label: "Projetos", id: "projects" },
    { label: "Depoimentos", id: "testimonials" },
    { label: "Contato", id: "contact" },
  ];

  const projects = [
    {
      id: 1,
      title: "VET ANESTHESIA PRO",
      description:
        "SaaS para clínicas veterinárias. Gestão completa de anestesias com alta precisão.",
      longDescription:
        "Este projeto foi desenvolvido para resolver a complexidade do cálculo e monitoramento de anestesias em procedimentos veterinários. A plataforma oferece uma interface intuitiva para os anestesistas registrarem sinais vitais em tempo real, calcularem dosagens de fármacos com base em protocolos pré-definidos e gerarem relatórios detalhados.",
      tags: ["React", "Supabase", "Vercel", "Tailwind"],
      status: "CONCLUÍDO",
      type: "SAAS",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "DELIBOT AI",
      description:
        "Bot de WhatsApp com IA para automação de delivery e atendimento ao cliente.",
      longDescription:
        "Solução de automação de atendimento para delivery via WhatsApp. Utiliza IA para entender pedidos, responder dúvidas e finalizar compras autonomamente. Integrado com Evolution API e Docker.",
      tags: ["Astro", "Node.js", "Docker", "AI", "Evolution API"],
      status: "EM DESENVOLVIMENTO",
      type: "BOT/AI",
      color: "bg-yellow-500",
    },
    {
      id: 3,
      title: "CARRO DIGITAL",
      description:
        "Ecossistema com Loja Virtual e consultas veiculares em tempo real.",
      longDescription:
        "Ecossistema que une loja virtual de autopeças a serviço de consulta veicular. App em React Native para experiência nativa e versão web em Vue.js. Backend robusto em Node.js.",
      tags: ["React Native", "Vue", "Node.js", "MySQL"],
      status: "CONCLUÍDO",
      type: "MOBILE/WEB",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "GESTÃO LAVANDERIAS",
      description:
        "Plataforma operacional para lavanderias com controle de fluxo financeiro.",
      longDescription:
        "Sistema de gestão completo para lavanderias, otimizando o fluxo desde a recepção até a entrega. Controle de estoque, clientes e notas fiscais. Dashboard financeiro detalhado.",
      tags: ["React", "Postgres", "Node.js", "Vite"],
      status: "CONCLUÍDO",
      type: "SISTEMA",
      color: "bg-emerald-500",
    },
    {
      id: 5,
      title: "BRICOIN",
      description:
        "Sistema completo de investimento integrado com gateway de pagamento.",
      longDescription:
        "Plataforma de investimentos segura e escalável, com integração completa de pagamentos via Mercado Pago. Desenvolvida para alta performance financeira.",
      tags: ["Node.js", "Vue", "Mercado Pago", "MySQL"],
      status: "CONCLUÍDO",
      type: "FINTECH",
      color: "bg-indigo-500",
    },
    {
      id: 6,
      title: "VIAPET MARKETPLACE",
      description: "Marketplace para venda de produtos e serviços para pets.",
      longDescription:
        "Plataforma multivendor para o nicho pet, permitindo que diversos lojistas vendam produtos e serviços. Integração com API do PagBank para split de pagamentos.",
      tags: ["Vue", "Node.js", "PagBank API", "MySQL"],
      status: "CONCLUÍDO",
      type: "MARKETPLACE",
      color: "bg-orange-500",
    },
    {
      id: 7,
      title: "ACHEICASA.NET",
      description: "Portal de busca e anúncios de imóveis.",
      longDescription:
        "Portal imobiliário completo com filtros avançados de busca, mapas interativos e integração com Mercado Pago para destaque de anúncios.",
      tags: ["Vue.js", "Node.js", "Mercado Pago", "MySQL"],
      status: "CONCLUÍDO",
      type: "REAL ESTATE",
      color: "bg-cyan-500",
    },
    {
      id: 8,
      title: "GYMSOFTWARE",
      description:
        "Gestão de academias integrado com controle de acesso (catraca).",
      longDescription:
        "Sistema de gerenciamento para academias que controla planos, pagamentos e libera automaticamente o acesso na catraca física.",
      tags: ["Vue", "C#", "Firebase"],
      status: "CONCLUÍDO",
      type: "SISTEMA",
      color: "bg-red-500",
    },
    {
      id: 9,
      title: "BOTYT",
      description:
        "Bot para publicação automática com interface e múltiplos canais.",
      longDescription:
        "Ferramenta de automação para criadores de conteúdo, permitindo agendamento e publicação automática em múltiplos canais simultaneamente.",
      tags: ["Vue", "Node.js", "MySQL"],
      status: "CONCLUÍDO",
      type: "AUTOMATION",
      color: "bg-pink-500",
    },
    {
      id: 10,
      title: "COPLANNER",
      description: "Controle de vendas e estoque multiplataforma.",
      longDescription:
        "Aplicação para controle rigoroso de vendas e inventário, desenvolvida para ser rápida e acessível em qualquer dispositivo.",
      tags: ["FlutterFlow", "Supabase", "MySQL"],
      status: "CONCLUÍDO",
      type: "MOBILE/WEB",
      color: "bg-teal-500",
    },
    {
      id: 11,
      title: "BLOG CIENCIAETECH",
      description: "Blog de ciências e tecnologia com CMS próprio.",
      longDescription:
        "Plataforma de conteúdo focada em ciência e tecnologia, com um gerenciador de conteúdo (CMS) customizado para os editores.",
      tags: ["Node.js", "Vue.js", "MySQL"],
      status: "CONCLUÍDO",
      type: "CONTENT",
      color: "bg-gray-500",
    },
    {
      id: 12,
      title: "ALERTAS FUTEBOL",
      description: "Backend para alertas em tempo real de partidas de futebol.",
      longDescription:
        "Serviço de backend de alta performance que monitora partidas de futebol e envia notificações push em tempo real via Redis.",
      tags: ["Node.js", "Redis", "PostgreSQL"],
      status: "CONCLUÍDO",
      type: "BACKEND",
      color: "bg-green-600",
    },
    {
      id: 13,
      title: "ALUGMOTOS (LP)",
      description: "Landing page dinâmica para locação de motos.",
      longDescription:
        "Página de conversão com dados dinâmicos baseados na localização e configuração das unidades de locação.",
      tags: ["Angular", "Node.js", "Postgres", "Redis"],
      status: "CONCLUÍDO",
      type: "WEB",
      color: "bg-yellow-600",
    },
    {
      id: 14,
      title: "APP ALUGMOTOS",
      description: "App para locatário, admin e vistoriador.",
      longDescription:
        "Aplicativo complexo para gestão completa de frota de motos, incluindo vistorias, pagamentos recorrentes e manutenção.",
      tags: ["Angular", "Node.js", "Docker", "Evolution API"],
      status: "CONCLUÍDO",
      type: "APP/SISTEMA",
      color: "bg-blue-600",
    },
    {
      id: 15,
      title: "CARDAPIU",
      description: "Sistema de delivery para estabelecimentos.",
      longDescription:
        "Plataforma de delivery estilo iFood para restaurantes, com painel administrativo Desktop em Electron.",
      tags: ["Next.js", "Node.js", "Postgres", "Electron"],
      status: "CONCLUÍDO",
      type: "DELIVERY",
      color: "bg-orange-600",
    },
    {
      id: 16,
      title: "ENTREGU",
      description: "Sistema para entregadores e lojistas.",
      longDescription:
        "Plataforma de logística last-mile conectando entregadores a lojistas locais, com rastreamento em tempo real.",
      tags: ["Vue", "Node.js", "Postgres", "Redis"],
      status: "EM DESENVOLVIMENTO",
      type: "LOGÍSTICA",
      color: "bg-red-600",
    },
    {
      id: 17,
      title: "MARKETING CAMPAIGNS",
      description: "Plataforma para automação de campanhas multicanal.",
      longDescription:
        "Ferramenta robusta para criação e disparo de campanhas de marketing via WhatsApp, E-mail e SMS.",
      tags: ["Node.js", "Next.js", "Redis", "Evolution API"],
      status: "EM DESENVOLVIMENTO",
      type: "MARKETING",
      color: "bg-purple-600",
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: "Excelente profissional!!! Conhecimento e domínio incrível. Pontual, dedicado, compreende o projeto e executa com agilidade.",
      role: "Portal Imobiliário",
      stars: 5,
    },
    {
      id: 2,
      text: "Excelente programador! Entregou antes do prazo final, muito comprometido e tem ótima comunicação.",
      role: "App Veterinário",
      stars: 5,
    },
    {
      id: 3,
      text: "Recomendo. Prestativo e tudo de acordo com o combinado.",
      role: "App WebSocket",
      stars: 5,
    },
    {
      id: 4,
      text: "Profissional muito prestativo e competente.",
      role: "Sistema de Gestão",
      stars: 5,
    },
    {
      id: 5,
      text: "Super prestativo. Entendeu exatamente o que eu precisava.",
      role: "Site e App Mobile",
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
      setScrolled(window.scrollY > 50);
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
  }, []);

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
      setFormMessage("Por favor, preencha todos os campos.");
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
        setFormMessage(
          "Mensagem enviada com sucesso! Entrarei em contato em breve."
        );
        setFormData({ from_name: "", reply_to: "", message: "" }); // Limpa o formulário

        // Remove mensagem de sucesso após 5 segundos
        setTimeout(() => {
          setFormStatus("idle");
          setFormMessage("");
        }, 5000);
      } else {
        setFormStatus("error");
        setFormMessage("Erro ao enviar mensagem. Tente novamente mais tarde.");
      }
    } catch (error) {
      setFormStatus("error");
      setFormMessage("Erro de conexão. Verifique sua internet.");
    }
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${
          scrolled
            ? "bg-neutral-900/95 backdrop-blur-sm border-lime-400 py-3"
            : "bg-transparent border-transparent py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-2 group cursor-pointer z-50"
            onClick={() => scrollTo("home")}
          >
            <div className="bg-lime-400 text-black p-1 border-2 border-black group-hover:rotate-12 transition-transform duration-300">
              <Terminal size={20} />
            </div>
            <motion.span
              animate={{ opacity: [1, 0.5, 1, 1], x: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 5, repeatDelay: 3 }}
            >
              JV_DEV
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
                className={`uppercase tracking-widest text-sm hover:text-lime-400 transition-colors relative group
                  ${
                    activeSection === item.id
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
              className="bg-neutral-100 text-black px-4 py-2 font-bold border-2 border-lime-400 flex items-center gap-2 text-sm"
            >
              <MessageCircle size={16} /> WHATSAPP
            </motion.button>
          </motion.div>

          <button
            className="md:hidden z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
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
                className="text-2xl font-black uppercase text-white hover:text-lime-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() =>
                window.open(`https://wa.me/${personalData.whatsapp}`, "_blank")
              }
              className="mt-8 bg-lime-400 text-black px-8 py-3 font-black text-xl border-2 border-white"
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
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              className="lg:col-span-8 z-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-block bg-lime-400 text-black px-2 py-1 text-xs font-bold mb-6 border-2 border-black transform -rotate-1"
              >
                DISPONÍVEL PARA PROJETOS
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter"
              >
                JOÃO VITOR
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600 relative">
                  FULLSTACK
                  <span className="absolute -inset-1 border-2 border-lime-400 opacity-20 blur-sm"></span>
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-2xl text-neutral-400 max-w-2xl mb-10 border-l-4 border-lime-400 pl-6"
              >
                Especialista em React, Vue e Node.js. Crio sistemas web e apps
                sob medida, escaláveis e de alta performance.
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
                  className="px-8 py-4 bg-lime-400 text-black font-black text-lg border-2 border-lime-400 flex items-center justify-center gap-2 group transition-colors"
                >
                  VER PORTFÓLIO
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
                  className="px-8 py-4 bg-transparent text-white font-bold text-lg border-2 border-white transition-colors"
                >
                  ORÇAMENTO
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Stats Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="lg:col-span-4 relative hidden lg:block"
            >
              <motion.div
                whileHover={{
                  y: -5,
                  boxShadow: "8px 8px 0px 0px rgba(163,230,53,1)",
                  borderColor: "#A3E635",
                }}
                className="bg-neutral-800 border-2 border-neutral-700 p-6 relative transition-colors"
              >
                <div className="absolute -top-3 -right-3 bg-lime-400 text-black px-2 font-bold border-2 border-black text-xs">
                  SYSTEM: ACTIVE
                </div>

                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-500">CLIENTES</span>
                    <span className="text-lime-400">15+ SATISFEITOS</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-700 pb-2">
                    <span className="text-neutral-500">RATING</span>
                    <div className="flex text-lime-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-neutral-500">ENTREGAS</span>
                    <span className="animate-pulse text-lime-400 font-bold">
                      100% NO PRAZO
                    </span>
                  </div>
                </div>

                <div className="mt-6 h-32 bg-black border border-neutral-700 p-2 flex items-end gap-1">
                  {[40, 70, 45, 90, 60, 85, 50, 75, 95, 60, 80, 50].map(
                    (h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.05, duration: 0.5 }}
                        whileHover={{ backgroundColor: "#ffffff" }}
                        className="flex-1 bg-lime-400"
                      />
                    )
                  )}
                </div>
                <p className="text-xs text-neutral-500 mt-2 text-center">
                  ATIVIDADE GITHUB
                </p>
              </motion.div>
              <div className="absolute top-4 left-4 w-full h-full border-2 border-dashed border-neutral-700 -z-10"></div>
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

        {/* Stack Section */}
        <section id="stack" className="py-24 bg-neutral-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-end justify-between mb-16 border-b border-neutral-800 pb-4"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white">
                TECH_<span className="text-neutral-600">ARSENAL</span>
              </h2>
              <span className="hidden md:block text-lime-400 font-bold text-xl">
                FULLSTACK
              </span>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ y: -5, borderColor: "#A3E635" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="col-span-1 lg:col-span-2 bg-neutral-800 p-8 border-2 border-transparent transition-colors group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Layout size={100} />
                </div>
                <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300 relative z-10">
                  <Layout size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">
                  Frontend & Mobile
                </h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {[
                    "React",
                    "Vue",
                    "React Native",
                    "Next.js",
                    "Tailwind",
                    "Astro",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="bg-black border border-neutral-700 px-3 py-1 text-sm text-lime-400 hover:bg-lime-400 hover:text-black transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, borderColor: "#A3E635" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="col-span-1 lg:col-span-1 bg-neutral-800 p-8 border-2 border-transparent transition-colors group"
              >
                <div className="bg-black w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-lime-400 group-hover:text-black transition-colors duration-300">
                  <Database size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Backend & DB</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm border-b border-neutral-700 py-1">
                    <span>Node.js / Express</span>{" "}
                    <span className="text-lime-400">Expert</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-neutral-700 py-1">
                    <span>PostgreSQL</span>{" "}
                    <span className="text-lime-400">Advanced</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-neutral-700 py-1">
                    <span>Supabase</span>{" "}
                    <span className="text-lime-400">Advanced</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, backgroundColor: "#171717" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="col-span-1 lg:col-span-1 bg-neutral-900 border-2 border-dashed border-neutral-700 p-8 flex flex-col justify-between"
              >
                <div>
                  <Cpu size={40} className="text-neutral-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">DevOps</h3>
                  <p className="text-xs text-neutral-400 mb-4">
                    Docker, Vercel & Gateways de Pagamento.
                  </p>
                </div>
                <div className="w-full h-32 bg-black border border-neutral-700 relative overflow-hidden flex items-center justify-center">
                  <div className="text-center">
                    <span className="block text-2xl font-black text-lime-400">
                      24h
                    </span>
                    <span className="text-[10px] text-neutral-500 uppercase">
                      Tempo de Resposta
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-24 bg-neutral-950 border-t-2 border-neutral-800"
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
                  // PORTFÓLIO COMPLETO
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white">
                  PROJETOS
                </h2>
              </div>
              <motion.a
                whileHover={{ x: 5, color: "#A3E635" }}
                href={`https://github.com/${personalData.github}`}
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 text-white font-bold uppercase"
              >
                Ver GitHub <Github size={18} />
              </motion.a>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-neutral-900 border-2 border-neutral-800 hover:border-lime-400 transition-colors duration-300 flex flex-col h-full"
                >
                  <div className="p-6 border-b-2 border-neutral-800 bg-neutral-800/50 flex justify-between items-start">
                    <div className="flex gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${project.color}`}
                      ></div>
                      <span className="text-xs font-bold text-neutral-400">
                        {project.type}
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 border ${
                        project.status === "CONCLUÍDO"
                          ? "border-lime-400 text-lime-400"
                          : "border-yellow-500 text-yellow-500"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="p-8 relative flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-black mb-4 group-hover:text-lime-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 mb-6 font-sans leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono text-neutral-500 border border-neutral-800 px-2 py-1 bg-black"
                          >
                            #{t}
                          </span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="text-xs font-mono text-neutral-500 px-2 py-1">
                            ...
                          </span>
                        )}
                      </div>

                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest hover:text-lime-400"
                      >
                        Ver Detalhes <ExternalLink size={14} />
                      </motion.button>
                    </div>
                  </div>
                  {/* Hard Shadow for brutalist feel */}
                  <motion.div
                    className="absolute inset-0 border-2 border-lime-400 opacity-0 pointer-events-none"
                    whileHover={{ opacity: 1, x: 8, y: 8 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="py-24 bg-neutral-900 border-t-2 border-neutral-800"
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
                  FEEDBACKS <span className="text-lime-400">REAIS</span>
                </h2>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-black border border-neutral-700 p-6 group hover:border-lime-400 transition-colors duration-300"
                >
                  <div className="text-5xl font-black text-lime-400 mb-2">
                    4.8<span className="text-lg text-white">/5</span>
                  </div>
                  <p className="text-neutral-400 text-sm mb-4">
                    Média baseada em avaliações de clientes no 99Freelas.
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
                    VER PERFIL COMPLETO <ExternalLink size={12} />
                  </a>
                </motion.div>
              </motion.div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((t, i) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, backgroundColor: "#262626" }}
                      className="bg-neutral-800 p-6 border-l-4 border-lime-400"
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
                        "{t.text}"
                      </p>
                      <p className="text-lime-400 font-bold text-xs uppercase tracking-wider">
                        // {t.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-lime-400 text-black relative">
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[40px] fill-neutral-900"
            >
              <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z"></path>
            </svg>
          </div>

          <div className="container mx-auto px-4 mt-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-black mb-8 leading-none">
                  VAMOS CRIAR
                  <br />O PRÓXIMO NÍVEL?
                </h2>
                <p className="text-xl font-bold mb-12 max-w-md">
                  Entre em contato para conversarmos sobre seu próximo projeto.
                  Respondo em até 24h.
                </p>

                <div className="space-y-6">
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`mailto:${personalData.email}`}
                    className="flex items-center gap-4 text-xl md:text-2xl font-black group"
                  >
                    <Mail className="border-2 border-black p-2 w-12 h-12 bg-white group-hover:bg-black group-hover:text-lime-400 transition-colors duration-300" />
                    {personalData.email}
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`https://linkedin.com/in/${personalData.linkedin}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-xl md:text-2xl font-black group"
                  >
                    <Linkedin className="border-2 border-black p-2 w-12 h-12 bg-white group-hover:bg-black group-hover:text-lime-400 transition-colors duration-300" />
                    /in/{personalData.linkedin}
                  </motion.a>
                  <motion.a
                    whileHover={{ x: 10 }}
                    href={`https://github.com/${personalData.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 text-xl md:text-2xl font-black group"
                  >
                    <Github className="border-2 border-black p-2 w-12 h-12 bg-white group-hover:bg-black group-hover:text-lime-400 transition-colors duration-300" />
                    @{personalData.github}
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{
                  boxShadow: "12px 12px 0px 0px #ffffff",
                  translate: "4px 4px",
                }}
                className="bg-black p-8 border-2 border-white shadow-[8px_8px_0px_0px_#ffffff] transition-all"
              >
                <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-lime-400" /> INICIAR
                  TRANSMISSÃO
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-lime-400 text-xs font-bold block mb-1">
                      IDENTIDADE // NOME
                    </label>
                    <input
                      type="text"
                      name="from_name" // Nome original para compatibilidade
                      value={formData.from_name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-900 border border-neutral-700 text-white p-4 focus:border-lime-400 focus:outline-none focus:bg-neutral-800 transition-colors font-mono"
                      placeholder="João Silva"
                    />
                  </div>
                  <div>
                    <label className="text-lime-400 text-xs font-bold block mb-1">
                      FREQUÊNCIA // EMAIL
                    </label>
                    <input
                      type="email"
                      name="reply_to" // Nome original para compatibilidade
                      value={formData.reply_to}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-neutral-900 border border-neutral-700 text-white p-4 focus:border-lime-400 focus:outline-none focus:bg-neutral-800 transition-colors font-mono"
                      placeholder="joao@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="text-lime-400 text-xs font-bold block mb-1">
                      PAYLOAD // MENSAGEM
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      required
                      className="w-full bg-neutral-900 border border-neutral-700 text-white p-4 focus:border-lime-400 focus:outline-none focus:bg-neutral-800 transition-colors font-mono"
                      placeholder="Descreva sua missão..."
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full bg-lime-400 text-black font-black py-4 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        ENVIANDO DADOS...{" "}
                        <Loader2 className="animate-spin" size={18} />
                      </>
                    ) : (
                      <>
                        ENVIAR MENSAGEM <Send size={18} />
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
                        className="bg-green-500/10 border border-green-500 text-green-500 p-3 flex items-center gap-2 text-sm font-bold mt-2"
                      >
                        <CheckCircle size={16} /> {formMessage}
                      </motion.div>
                    )}
                    {formStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500 text-red-500 p-3 flex items-center gap-2 text-sm font-bold mt-2"
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
      <footer className="bg-black text-neutral-500 py-8 text-center text-xs border-t border-neutral-800">
        <p>Desenvolvido com ódio e cafeína. © 2025 JOÃO VITOR.</p>
        <p className="mt-1 opacity-50">CNPJ: 51.856.846/0001-69</p>
        <div className="flex justify-center gap-4 mt-4 text-lime-400 font-bold">
          <span className="hover:underline cursor-pointer">REACT</span>
          <span>//</span>
          <span className="hover:underline cursor-pointer">FRAMER MOTION</span>
          <span>//</span>
          <span className="hover:underline cursor-pointer">NEO-BRUTALISM</span>
        </div>
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
              className="bg-neutral-900 border-2 border-lime-400 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-[8px_8px_0px_0px_rgba(163,230,53,1)]"
            >
              <div className="sticky top-0 bg-neutral-900/95 backdrop-blur border-b-2 border-neutral-800 p-4 flex justify-between items-center z-10">
                <h3 className="text-xl md:text-2xl font-black text-lime-400">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-neutral-400 hover:text-white transition-colors bg-black border-2 border-transparent hover:border-lime-400 p-1"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 border ${
                      selectedProject.status === "CONCLUÍDO"
                        ? "border-lime-400 text-lime-400"
                        : "border-yellow-500 text-yellow-500"
                    }`}
                  >
                    {selectedProject.status}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 border border-neutral-700 text-neutral-400">
                    {selectedProject.type}
                  </span>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-bold mb-4 text-white block border-b border-neutral-800 pb-2">
                    <span className="text-lime-400">//</span> SOBRE O PROJETO
                  </h4>
                  <p className="text-neutral-300 font-sans leading-relaxed whitespace-pre-line text-sm md:text-base">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-4 text-white block border-b border-neutral-800 pb-2">
                    <span className="text-lime-400">//</span> TECNOLOGIAS
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="text-sm font-mono text-lime-400 border border-lime-400 px-3 py-1 bg-black"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800 flex justify-end">
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedProject(null)}
                    className="text-white font-bold flex items-center gap-2 hover:text-lime-400"
                  >
                    FECHAR <ArrowRight size={16} />
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
