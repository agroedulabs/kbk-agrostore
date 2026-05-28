import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { buildWAUrlGeneral } from "@/lib/whatsapp";
import ProductCard from "@/components/ProductCard";
import TrustBadges from "@/components/TrustBadges";
import CaraPesanSection from "@/components/CaraPesanSection";

export default function Home() {
  const featured = PRODUCTS.filter((p) =>
    ["KBK-SB", "KBK-AZ5", "KBK-MT5"].includes(p.sku)
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-hijau-800 via-hijau-700 to-hijau-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-hijau-600/50 text-hijau-100 text-sm font-medium px-3 py-1.5 rounded-full mb-6 border border-hijau-500/40">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Botomulyo, Cepiring, Kendal — Lahan 500 m²
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Pupuk Organik Lokal,{" "}
              <span className="text-tanah-300">Panen Makin Mantap</span>
            </h1>
            <p className="text-hijau-100 text-lg leading-relaxed mb-8 max-w-xl">
              Dari lahan 500 m² di Botomulyo, kami olah sekam dan kohe kambing jadi pupuk
              organik siap pakai. Langsung dari petani Kendal, untuk petani Kendal.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/produk"
                className="bg-white text-hijau-800 hover:bg-hijau-50 font-bold px-6 py-3 rounded-xl transition-colors shadow"
              >
                Lihat Produk Kami →
              </Link>
              <a
                href={buildWAUrlGeneral()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Pesan via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <TrustBadges />

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "8", label: "SKU Produk" },
              { val: "500m²", label: "Lahan KBK" },
              { val: "100%", label: "Organik" },
              { val: "COD Tersedia", label: "Area Kendal" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-hijau-700">{s.val}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pengelola ────────────────────────────────────────── */}
      <section className="bg-hijau-50 border-b border-hijau-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-hijau-700 text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
              A
            </div>
            <div>
              <div className="font-bold text-gray-900">Arief Rahman Hakim</div>
              <div className="text-sm text-gray-600">
                Pengelola KBK AgroEduLabs · Staf Dinas Pertanian Kabupaten Kendal
              </div>
              <div className="text-xs text-hijau-700 mt-0.5">
                Botomulyo, Cepiring, Kendal, Jawa Tengah
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Produk Unggulan ────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-hijau-600 font-semibold text-sm mb-1">Pilihan Populer</div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Produk Unggulan</h2>
          </div>
          <Link
            href="/produk"
            className="text-hijau-600 hover:text-hijau-800 font-semibold text-sm hidden sm:block"
          >
            Semua produk →
          </Link>
        </div>
        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">Produk unggulan segera hadir.</p>
        )}
        <div className="text-center mt-8">
          <Link href="/produk" className="btn-outline">
            Lihat Semua 8 Produk
          </Link>
        </div>
      </section>

      {/* ── Cara Pesan ───────────────────────────────────────── */}
      <CaraPesanSection />

      {/* ── Keunggulan ────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 text-center mb-10">
            Kenapa KBK AgroStore?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🌿",
                title: "100% Organik",
                desc: "Tidak ada bahan kimia sintetis. Semua proses alami dari bahan baku lokal Kendal.",
              },
              {
                icon: "♻️",
                title: "Zero-Waste",
                desc: "Sekam dari penggilingan padi, kohe dari peternak lokal. Limbah jadi berkah.",
              },
              {
                icon: "🧪",
                title: "Fermentasi EM4",
                desc: "Kohe difermentasi 21 hari. Matang sempurna, tidak membakar akar, nutrisi langsung tersedia.",
              },
              {
                icon: "📍",
                title: "Produk Lokal Kendal",
                desc: "Langsung dari Botomulyo, Cepiring. Segar, bukan barang titipan dari luar daerah.",
              },
              {
                icon: "💰",
                title: "Harga Langsung Petani",
                desc: "HPP rendah karena bahan baku lokal. Harga bersaing tanpa mengorbankan kualitas.",
              },
              {
                icon: "💬",
                title: "Order via WhatsApp",
                desc: "Chat langsung dengan pengelola. Bisa COD area Kendal atau kirim ke seluruh Indonesia.",
              },
            ].map((f) => (
              <div key={f.title} className="card p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
          Siap mulai berkebun organik?
        </h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Chat langsung via WhatsApp atau cek toko Shopee kami. Pengiriman dari Cepiring,
          Kendal ke seluruh Indonesia. COD tersedia untuk area Kendal.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={buildWAUrlGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Pesan Sekarang via WhatsApp
          </a>
          <a
            href="https://shopee.co.id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
          >
            🛒 Buka Toko Shopee
          </a>
        </div>
      </section>
    </>
  );
}
