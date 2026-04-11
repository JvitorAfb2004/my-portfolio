import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight2,
  Global,
  Link21,
  LinkSquare,
  Sms,
  Whatsapp,
} from "@fadilmartias/iconsax-react";

void motion;

const personalData = {
  name: "João Vitor Alves Fernandes Barros",
  shortName: "João Vitor",
  role: "Desenvolvedor fullstack",
  email: "jvitorafb@gmail.com",
  github: "JvitorAfb2004",
  linkedin: "jvitorafb",
  whatsapp: "55749999425993",
};

const highlights = [
  "Sites institucionais e páginas de conversão",
  "Sistemas internos, painéis e operações digitais",
  "Integrações, automações e produtos sob medida",
];

const scenarios = [
  {
    title: "Seu negócio já existe, mas a presença digital ainda não acompanha.",
    description:
      "Quando o visual, a navegação ou a clareza da mensagem passam menos confiança do que a empresa realmente entrega.",
  },
  {
    title: "A operação depende demais de improviso.",
    description:
      "Planilha, WhatsApp e processo manual resolvem por um tempo. Depois viram custo, retrabalho e lentidão.",
  },
  {
    title: "Você quer lançar algo útil sem cair num projeto eterno.",
    description:
      "A ideia é colocar no ar o que faz diferença primeiro, com base boa para continuar evoluindo.",
  },
];

const featuredProjects = [
  {
    title: "Vet Anesthesia Pro",
    label: "SaaS clínico",
    description:
      "Software para anestesia veterinária com cálculo, monitoramento e rastreabilidade do procedimento.",
    href: "https://vetanesthesiapro.com/",
  },
  {
    title: "Nexo Delivery",
    label: "Plataforma operacional",
    description:
      "Ecossistema de delivery com tracking em tempo real, painéis e automação de repasse.",
    href: "https://nexodelivery.app/",
  },
  {
    title: "GlowApp",
    label: "Marketplace",
    description:
      "Produto internacional para profissionais de beleza com booking, chat e fluxo completo de operação.",
    href: "https://yourglowapp.co/",
  },
  {
    title: "AcheiCasa.net",
    label: "Portal imobiliário",
    description:
      "Plataforma com busca avançada, mapas, painel completo e fluxo de publicação com apoio de IA.",
    href: "https://acheicasa.net/",
  },
  {
    title: "Currículo Pro IA",
    label: "Produto com IA",
    description:
      "Ferramenta para criação e melhoria de currículo com apoio de inteligência artificial e foco em clareza profissional.",
    href: "https://curriculoproia.com/",
  },
];

const process = [
  {
    step: "1. Entendimento",
    description:
      "Eu começo pelo problema real, não pela tecnologia da moda. O objetivo é entender onde a entrega precisa ajudar o negócio.",
  },
  {
    step: "2. Construção",
    description:
      "Desenho e implemento a solução com foco em clareza, performance e uso real. Sem enfeite desnecessário.",
  },
  {
    step: "3. Ajuste fino",
    description:
      "Depois de subir, o trabalho continua no que importa: corrigir atrito, melhorar experiência e apoiar a próxima etapa.",
  },
];

const contactLinks = [
  {
    label: "WhatsApp",
    href: `https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
      "Olá, vim do seu site e queria conversar sobre um projeto."
    )}`,
    icon: Whatsapp,
  },
  {
    label: "E-mail",
    href: `mailto:${personalData.email}`,
    icon: Sms,
  },
  {
    label: "GitHub",
    href: `https://github.com/${personalData.github}`,
    icon: Link21,
  },
  {
    label: "LinkedIn",
    href: `https://linkedin.com/in/${personalData.linkedin}`,
    icon: Global,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

const seo = {
  title: "João Vitor | Sites e sistemas com clareza, presença e uso real",
  description:
    "João Vitor desenvolve sites, sistemas e produtos digitais para negócios que precisam transmitir mais confiança, organizar a operação e lançar com clareza.",
  url: "https://www.joaovitorafb.site/",
  image: "https://www.joaovitorafb.site/og-image.png",
};

const HomePage = () => {
  useEffect(() => {
    const ensureMeta = (selector, attributes) => {
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        document.head.appendChild(element);
      }

      return element;
    };

    const ensureLink = (selector, attributes) => {
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement("link");
        Object.entries(attributes).forEach(([key, value]) => {
          element.setAttribute(key, value);
        });
        document.head.appendChild(element);
      }

      return element;
    };

    document.title = seo.title;

    ensureMeta('meta[name="description"]', { name: "description" }).setAttribute(
      "content",
      seo.description
    );
    ensureMeta('meta[property="og:title"]', { property: "og:title" }).setAttribute(
      "content",
      seo.title
    );
    ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    }).setAttribute("content", seo.description);
    ensureMeta('meta[property="og:url"]', { property: "og:url" }).setAttribute(
      "content",
      seo.url
    );
    ensureMeta('meta[property="og:image"]', {
      property: "og:image",
    }).setAttribute("content", seo.image);
    ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
    }).setAttribute("content", seo.title);
    ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    }).setAttribute("content", seo.description);
    ensureMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
    }).setAttribute("content", seo.image);
    ensureLink('link[rel="canonical"]', { rel: "canonical" }).setAttribute(
      "href",
      seo.url
    );

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "GeniusWeb",
      url: seo.url,
      image: seo.image,
      description: seo.description,
      taxID: "66.107.006/0001-70",
      founder: {
        "@type": "Person",
        name: personalData.name,
      },
      sameAs: [
        `https://github.com/${personalData.github}`,
        `https://linkedin.com/in/${personalData.linkedin}`,
        "https://geniusweb.online/v2",
      ],
    };

    let schemaScript = document.querySelector("#structured-data-home");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.setAttribute("type", "application/ld+json");
      schemaScript.setAttribute("id", "structured-data-home");
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(structuredData);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0d0b] text-neutral-100 selection:bg-lime-300 selection:text-black">
      <div
        className="fixed inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(163,230,53,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(163,230,53,0.09) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.16),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(52,211,153,0.12),_transparent_30%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0d0b]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-lime-300/75">
              João Vitor
            </p>
            <p className="text-sm text-neutral-400">{personalData.role}</p>
          </div>

          <a
            href={`https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
              "Olá, vim do seu site e queria conversar sobre um projeto."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-lime-300 px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Conversar
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="border-b border-white/10">
          <div className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start lg:gap-10 lg:px-8 lg:py-14">
            <motion.div {...fadeInUp} className="max-w-3xl">
              <h1 className="max-w-4xl text-4xl font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-5xl lg:text-[4.35rem]">
                Faço presença digital e software com cara profissional e uso
                real.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 sm:text-lg">
                Sou {personalData.shortName}. Trabalho com negócios que precisam
                vender melhor, organizar a operação ou tirar uma ideia do papel
                sem transformar tudo num projeto confuso.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href={`https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
                    "Olá, vim do seu site e queria conversar sobre um projeto."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-300 px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.02]"
                >
                  Falar no WhatsApp
                  <Whatsapp size={18} variant="Bulk" color="#080c0a" />
                </a>

                <a
                  href="/v2"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-lime-300/40 hover:text-lime-200"
                >
                  Ver portfólio técnico
                  <ArrowRight2 size={18} variant="Bulk" color="#ffffff" />
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.08 }}
              className="flex h-fit flex-col border border-white/10 bg-white/[0.03] p-5 sm:p-6 lg:self-start"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-neutral-500">
                  O que eu entrego
                </p>
                <div className="mt-5 space-y-4">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-base leading-7 text-neutral-200">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    15+
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    clientes e projetos entregues
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                    24h
                  </p>
                  <p className="mt-1 text-sm text-neutral-400">
                    para primeira resposta
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <motion.div {...fadeInUp} className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-lime-300/80">
                Quando faz sentido me chamar
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Meu trabalho costuma entrar quando já ficou claro que improviso
                não escala.
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {scenarios.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.06 }}
                  className="border-t border-white/10 pt-5"
                >
                  <p className="text-xl font-medium leading-8 text-white">
                    {item.title}
                  </p>
                  <p className="mt-3 text-base leading-7 text-neutral-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <motion.div
              {...fadeInUp}
              className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.28em] text-lime-300/80">
                  Projetos em destaque
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Alguns trabalhos que ajudam a entender meu tipo de entrega.
                </h2>
              </div>

              <a
                href="/v2"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-300 transition-colors hover:text-lime-200"
              >
                Ver lista completa
                <ArrowRight2 size={18} variant="Bulk" color="#ffffff" />
              </a>
            </motion.div>

            <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
              {featuredProjects.map((project, index) => (
                <motion.a
                  key={project.title}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.05 }}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="grid gap-4 px-0 py-6 transition-colors hover:bg-white/[0.03] md:grid-cols-[0.9fr_1.6fr_auto] md:items-center"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-lime-300/75">
                      {project.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {project.title}
                    </p>
                  </div>

                  <p className="max-w-2xl text-base leading-7 text-neutral-400">
                    {project.description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-200">
                    Abrir projeto
                    <LinkSquare size={16} variant="Outline" color="#ffffff" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <motion.div {...fadeInUp} className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.28em] text-lime-300/80">
                Forma de trabalho
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Trabalho direto, com escopo claro e foco no que vai para uso.
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  {...fadeInUp}
                  transition={{ ...fadeInUp.transition, delay: index * 0.06 }}
                  className="border-t border-white/10 pt-5"
                >
                  <p className="text-sm uppercase tracking-[0.24em] text-lime-300/75">
                    {item.step}
                  </p>
                  <p className="mt-3 text-xl font-medium leading-8 text-white">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <motion.div
              {...fadeInUp}
              className="grid gap-10 border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-lime-300/80">
                  Contato
                </p>
                <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Se fizer sentido, me chama e eu te respondo sem enrolação.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
                  Dá para começar com uma conversa simples: o que você precisa,
                  onde está travando e o que já existe hoje. Se eu puder ajudar,
                  eu digo como.
                </p>
              </div>

              <div className="grid gap-3">
                {contactLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="flex items-center justify-between border border-white/10 px-4 py-4 text-neutral-200 transition-colors hover:border-lime-300/40 hover:bg-white/[0.03]"
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon size={18} variant="Outline" color="#ffffff" />
                        {item.label}
                      </span>
                      <ArrowRight2 size={16} variant="Outline" color="#ffffff" />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <a
        href={`https://wa.me/${personalData.whatsapp}?text=${encodeURIComponent(
          "Olá, vim do seu site e queria conversar sobre um projeto."
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir conversa no WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-lime-300 text-black shadow-[0_16px_40px_rgba(163,230,53,0.22)] transition-transform hover:scale-[1.04]"
      >
        <Whatsapp size={24} variant="Bulk" color="#080c0a" />
      </a>

      <footer className="border-t border-white/10 px-4 py-8 text-sm text-neutral-500 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p>
            By{" "}
            <a
              href="https://geniusweb.online/v2"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-lime-200"
            >
              GeniusWeb
            </a>{" "}
            · CNPJ: 66.107.006/0001-70
          </p>
          <div className="flex gap-5">
            <a href="/v2" className="transition-colors hover:text-lime-200">
              Versão técnica
            </a>
            <a
              href={`https://github.com/${personalData.github}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-lime-200"
            >
              GitHub
            </a>
            <a
              href={`https://linkedin.com/in/${personalData.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-lime-200"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
