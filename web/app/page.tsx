import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = PRODUCTS.filter((p) => ["KBK-SB", "KBK-KK-F1", "KBK-MT5"].includes(p.sku));

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
              Pupuk &amp; Media Tanam{" "}
              <span className="text-tanah-300">Organik Lokal</span>
            </h1>
            <p className="text-hijau-100 text-lg leading-relaxed mb-8 max-w-xl">
              Langsung dari KBK AgroEduLabs — sekam, arang sekam, kohe kambing
              fermentasi EM4, dan media tanam komplit. Zero-waste, halal, terpercaya.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/produk" className="bg-white text-hijau-800 hover:bg-hijau-50 font-bold px-6 py-3 rounded-xl transition-colors shadow">
                Lihat Semua Produk →
              </Link>
              <a
                href="https://shopee.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow"
              >
                🛒 Beli di Shopee
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "6", label: "SKU Produk" },
              { val: "500m²", label: "Lahan KBK" },
              { val: "100%", label: "Organik" },
              { val: "Zero-waste", label: "Prinsip kerja" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-hijau-700">{s.val}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
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
          <Link href="/produk" className="text-hijau-600 hover:text-hijau-800 font-semibold text-sm hidden sm:block">
            Semua produk →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.sku} product={p} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/produk" className="btn-outline">
            Lihat Semua 6 Produk
          </Link>
        </div>
      </section>

      {/* ── Keunggulan ────────────────────────────────────────── */}
      <section className="bg-hijau-50 border-y border-hijau-100">
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
                title: "Harga Terjangkau",
                desc: "HPP rendah karena bahan baku lokal. Harga bersaing tanpa mengorbankan kualitas.",
              },
              {
                icon: "🛒",
                title: "Mudah Dipesan",
                desc: "Tersedia di Shopee. Pembayaran aman, pengiriman ke seluruh Indonesia.",
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
          Semua produk tersedia di Shopee. Dikirim dari Cepiring, Kendal ke seluruh Indonesia.
        </p>
        <a
          href="https://shopee.co.id"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg text-lg"
        >
          🛒 Buka Toko KBK di Shopee
        </a>
      </section>
    </>
  );
}
