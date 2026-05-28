import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Semua produk organik KBK AgroStore: sekam, arang sekam, kohe kambing fermentasi, pupuk Azolla, dan media tanam.",
};

export default function ProdukPage() {
  const byCategory = [
    { label: "Sekam", skus: ["KBK-SM", "KBK-SB"] },
    { label: "Kohe Kambing", skus: ["KBK-KK-M", "KBK-KK-F1", "KBK-KK-F5"] },
    { label: "Media Tanam", skus: ["KBK-MT5"] },
    { label: "Pupuk Azolla", skus: ["KBK-AZ5"] },
    { label: "Bibit & Benih", skus: ["KBK-BT"] },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="text-hijau-600 font-semibold text-sm mb-1">KBK AgroStore</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Katalog Produk</h1>
        <p className="text-gray-600 max-w-xl">
          8 SKU produk organik dari ladang KBK Botomulyo. Pesan via WhatsApp atau beli di Shopee —
          dikirim dari Cepiring, Kendal.
        </p>
      </div>

      {/* COD banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-10 flex items-center gap-3 text-sm text-green-800">
        <span className="text-xl flex-shrink-0">🏍️</span>
        <span>
          <strong>Kamu di area Kendal?</strong> Bisa COD atau ambil langsung di Botomulyo, Cepiring.{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX"}?text=${encodeURIComponent("Halo KBK AgroStore, saya mau COD / ambil langsung di Botomulyo 🙏")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-green-700"
          >
            Chat WA →
          </a>
        </span>
      </div>

      {/* Kategori */}
      {byCategory.map((cat) => {
        const prods = PRODUCTS.filter((p) => cat.skus.includes(p.sku));
        if (prods.length === 0) return null;
        return (
          <section key={cat.label} id={cat.label.toLowerCase().replace(/\s+/g, "-")} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-hijau-500 rounded-full" />
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {prods.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </section>
        );
      })}

      {/* Info pengiriman */}
      <div className="bg-hijau-50 border border-hijau-200 rounded-2xl p-6 mt-4">
        <h3 className="font-bold text-hijau-900 mb-3">📦 Info Pengiriman &amp; COD Lokal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-hijau-800">
          <div>
            <p className="font-semibold mb-1">COD &amp; Ambil Sendiri:</p>
            <p>Tersedia untuk area Kendal &amp; sekitarnya. Chat WA untuk konfirmasi.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Dikirim dari:</p>
            <p>Botomulyo, Cepiring, Kendal, Jawa Tengah</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Ekspedisi nasional:</p>
            <p>J&amp;T, JNE, SiCepat — ke seluruh Indonesia</p>
          </div>
          <div>
            <p className="font-semibold mb-1">⚠️ Perhatian berat sekam:</p>
            <p>Sekam &amp; arang sekam sangat ringan tapi bervolume besar — ongkir bisa dihitung volumetrik.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
