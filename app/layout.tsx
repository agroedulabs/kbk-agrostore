import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: {
    default: "KBK AgroStore — Pupuk & Media Tanam Organik Kendal",
    template: "%s | KBK AgroStore",
  },
  description:
    "Produk pertanian organik dari KBK AgroEduLabs Botomulyo, Cepiring, Kendal. Sekam mentah, arang sekam, kohe kambing fermentasi EM4, dan media tanam komplit.",
  keywords: [
    "pupuk organik kendal",
    "sekam bakar",
    "arang sekam",
    "kohe kambing fermentasi",
    "media tanam organik",
    "KBK AgroEduLabs",
    "pertanian organik cepiring",
  ],
  openGraph: {
    title: "KBK AgroStore — Pupuk & Media Tanam Organik Kendal",
    description: "Produk organik berkualitas dari ladang KBK Botomulyo, langsung ke tangan Anda.",
    locale: "id_ID",
    type: "website",
    siteName: "KBK AgroStore",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
