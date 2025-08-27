import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JCR Mentoria – Mentoria Estratégica de Negócios",
  description: "Mentoria estratégica para transformar ideias em negócios reais.",
  openGraph: {
    title: "JCR Mentoria – Mentoria Estratégica de Negócios",
    description: "Estratégia, modelo de negócio e plano de ação.",
    url: "https://jcrmentoria.vercel.app",
    siteName: "JCR Mentoria",
    images: ["/og-jcr.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "JCR Mentoria – Mentoria Estratégica de Negócios",
    description: "Sessão de alinhamento gratuita, mentoria 1:1 e plano estratégico.",
    images: ["/og-jcr.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
