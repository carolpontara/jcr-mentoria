// app/page.tsx  (Next.js App Router – CLIENT)
"use client";

// import type { Metadata } from "next"; // (opcional) mantenha comentado aqui
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Import dinâmico: evita problemas de SSR
const PdfViewer = dynamic(() => import("./components/PdfViewer"), { ssr: false });

// ➤ Defina aqui a URL pública do site após publicar (ajuste quando tiver o domínio final)
const siteUrl = "https://jcrmentoria.vercel.app"; // TODO: altere para o domínio real

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsapp = "https://wa.me/5511999384816";
  const instagram = "https://www.instagram.com/jcrmentoria/";

  // ⇩⇩⇩ caminho do PDF em /public
  const pdfSrc = "/apresentacao.pdf";

  // JSON-LD – Organization/Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JCR Mentoria",
    url: siteUrl,
    logo: "/logo-jcr-mentoria.png",
    sameAs: [instagram, whatsapp],
    founder: {
      "@type": "Person",
      name: "Judith da Cunha",
      image: "/judith.jpg",
      jobTitle: "Mentora de Negócios",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: ["Portuguese", "Spanish"],
      url: whatsapp,
    },
  } as const;

  return (
    <main className="min-h-screen bg-[#fff7f8] text-[#1f1f1f]">
      {/* SEO – JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Brush Background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-[38rem] -z-10"
        style={{
          background:
            "radial-gradient(100% 60% at 50% 0%, rgba(243,220,220,0.65) 0%, rgba(243,220,220,0.35) 35%, rgba(243,220,220,0.00) 70%)",
        }}
      />

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition duration-300 ${
          scrolled ? "backdrop-blur bg-white/70 shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo-jcr-mentoria.png"
              alt="JCR Mentoria logo"
              width={160}
              height={42}
              className="h-8 w-auto"
              priority
            />
            <span className="hidden md:inline text-sm tracking-wide text-[#6b6b6b]">
              Impulsionando Negócios e Projetos Pessoais
            </span>
          </div>

          <nav className="flex items-center gap-2 md:gap-6 text-sm">
            <a href="#proposito" className="hover:opacity-80">Propósito</a>
            <a href="#sobre" className="hover:opacity-80">Sobre mim</a>
            <a href="#servicos" className="hover:opacity-80">Serviços</a>
            {/* <a href="#portfolio" className="hover:opacity-80">Apresentação</a> */}
            <a href="#contato" className="hover:opacity-80">Contato</a>


          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#1f1f1f]">
              Mentoria estratégica para transformar ideias em negócios reais
            </h1>
            <p className="mt-5 text-lg text-[#3A3A3A] leading-relaxed">
              A JCR Mentoria ajuda empreendedores e profissionais a estruturarem
              seu modelo de negócio, criarem estratégias e alavancarem produtos e
              serviços com clareza e ação.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={whatsapp}
                className="rounded-2xl px-6 py-3 text-white font-medium shadow-md hover:shadow-lg transition text-center"
                style={{ backgroundColor: "#1f1f1f" }}
              >
                Agende uma sessão de alinhamento
              </Link>
              <Link
                href={instagram}
                className="rounded-2xl px-6 py-3 font-medium text-center"
                style={{ backgroundColor: "#F3DCDC", color: "#1f1f1f" }}
              >
                Ver Instagram @jcrmentoria
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-4 -z-10 rounded-[2rem]"
              style={{
                background:
                  "conic-gradient(from 120deg at 50% 50%, rgba(243,220,220,0.6), rgba(255,247,248,0.5), rgba(243,220,220,0.6))",
                filter: "blur(30px)",
              }}
            />
            <div className="rounded-[2rem] bg-white shadow-xl overflow-hidden">
              <Image
                src="/judith.jpg"
                alt="Judith da Cunha – JCR Mentoria"
                width={900}
                height={1200}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Propósito */}
      <section id="proposito" className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold">Propósito</h2>
            <p className="mt-3 text-[#3a3a3a] max-w-3xl">
              Guiar pessoas e negócios com método e estratégia, ajudando a sair
              da ideia para a prática com foco em resultados. Acreditamos no
              aprendizado contínuo como ferramenta para navegar ciclos de vida e
              de mercado.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Clareza do modelo", d: "Estruturamos proposta de valor, público e oferta para cada etapa do negócio." },
              { t: "Estratégia prática", d: "Planos de ação objetivos, métricas e acompanhamento para tirar do papel." },
              { t: "Resultados sustentáveis", d: "Decisões orientadas a dados e experiência de +20 anos no mercado financeiro." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition border border-[#f0e2e4]">
                <h3 className="text-xl font-semibold mb-2">{c.t}</h3>
                <p className="text-[#4a4a4a]">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre mim */}
      <section id="sobre" className="py-20 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <div className="rounded-[1.5rem] bg-white shadow-md p-2">
              <Image src="/image.png" alt="Judith da Cunha – Mentora" width={900} height={1200} className="rounded-[1.25rem]" />
            </div>
          </div>
          <div className="md:col-span-7">
            <h2 className="text-3xl md:text-4xl font-semibold">Sobre mim</h2>
            <p className="mt-4 text-[#3a3a3a] leading-relaxed">
              Sou <strong>Judith da Cunha</strong>, administradora de empresas com mais de <strong>20 anos de experiência</strong> no mercado financeiro
              (Uruguai, Chile e Brasil). Atuo com foco em <em>estratégias de negócios</em> e práticas de gestão que conectam visão e execução.
              Gosto de ajudar pessoas a atingirem seus objetivos com estrutura e ação.
            </p>
            <p className="mt-4 text-[#3a3a3a]">
              Especialista em <strong>negócios digitais</strong>, desenho de ofertas, planejamento financeiro e posicionamento. Acredito em processos simples, comunicação clara e evolução contínua.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full px-4 py-2 text-sm border border-[#e9d5d7] bg-[#f7e8ea]">Estratégia & Modelo de Negócio</span>
              <span className="rounded-full px-4 py-2 text-sm border border-[#e9d5d7] bg-[#f7e8ea]">Planejamento & Acompanhamento</span>
              <span className="rounded-full px-4 py-2 text-sm border border-[#e9d5d7] bg-[#f7e8ea]">Negócios Digitais</span>
            </div>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-semibold">Serviços</h2>
          <p className="mt-3 text-[#3a3a3a] max-w-3xl">Mentoria individual e programas para empreendedores que desejam estruturar, validar e crescer seus negócios.</p>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { title: "Sessão de Alinhamento", desc: "Conversa inicial para entender seu momento e traçar próximos passos.", cta: "Agendar no WhatsApp", href: whatsapp },
              { title: "Mentoria 1:1", desc: "Acompanhamento personalizado: diagnóstico, plano de ação e métricas.", cta: "Quero saber mais", href: whatsapp },
              { title: "Plano Estratégico", desc: "Do posicionamento ao calendário de execução – foco em resultados.", cta: "Solicitar proposta", href: whatsapp },
            ].map((s, i) => (
              <div key={i} className="group rounded-2xl p-6 bg-white border border-[#f0e2e4] shadow-sm hover:shadow-md transition flex flex-col">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-[#4a4a4a] flex-1">{s.desc}</p>
                <Link href={s.href} className="mt-5 rounded-xl px-5 py-3 text-center font-medium shadow-sm group-hover:shadow transition" style={{ backgroundColor: "#F3DCDC", color: "#1f1f1f" }}>
                  {s.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apresentação (PDF – viewer bonito) */}
      <section id="portfolio" className="py-20 bg-white/70">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Apresentação</h2>
          <p className="text-[#3a3a3a] max-w-3xl mb-6">
            Veja a apresentação completa da JCR Mentoria, com detalhes sobre minha trajetória, serviços e metodologia de trabalho.
          </p>

          <PdfViewer src={pdfSrc} />
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-white/70">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Contato</h2>
          <p className="mt-3 text-[#3a3a3a]">Fale diretamente comigo pelos canais abaixo:</p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={whatsapp} className="rounded-2xl px-6 py-3 text-white font-medium shadow-md hover:shadow-lg transition" style={{ backgroundColor: "#1f1f1f" }}>
              WhatsApp
            </Link>
            <Link href={instagram} className="rounded-2xl px-6 py-3 font-medium shadow-md hover:shadow-lg transition" style={{ backgroundColor: "#F3DCDC", color: "#1f1f1f" }}>
              Instagram
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-jcr-mentoria.png" alt="JCR Mentoria logo" width={130} height={34} className="h-7 w-auto" />
            <p className="text-sm text-[#5a5a5a]">© {new Date().getFullYear()} JCR Mentoria</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="#proposito" className="hover:opacity-80">Propósito</Link>
            <Link href="#sobre" className="hover:opacity-80">Sobre</Link>
            <Link href="#servicos" className="hover:opacity-80">Serviços</Link>
            <Link href="#portfolio" className="hover:opacity-80">Apresentação</Link>
            <Link href="#contato" className="hover:opacity-80">Contato</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
