import type { Metadata } from "next";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description: "Semua produk organik KBK AgroStore: sekam, arang sekam, kohe kambing fermentasi, dan media tanam.",
};

export default function ProdukPage() {
  const byCategory = [
    { label: "Sekam", skus: ["KBK-SM", "KBK-SB"] },
    { label: "Kohe Kambing", skus: ["KBK-KK-M", "KBK-KK-F1", "KBK-KK-F5"] },
    { label: "Media Tanam", skus: ["KBK-MT5"] },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="text-hijau-600 font-semibold text-sm mb-1">KBK AgroStore</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Katalog Produk</h1>
        <p className="text-gray-600 max-w-xl">
          6 SKU produk organik dari ladang KBK Botomulyo. Semua tersedia di Shopee,
          dikirim dari Cepiring, Kendal.
        </p>
      </div>

      {/* Kategori */}
      {byCategory.map((cat) => {
        const prods = PRODUCTS.filter((p) => cat.skus.includes(p.sku));
        return (
          <section key={cat.label} className="mb-12">
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
        <h3 className="font-bold text-hijau-900 mb-3">📦 Info Pengiriman</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-hijau-800">
          <div>
            <p className="font-semibold mb-1">Dikirim dari:</p>
            <p>Botomulyo, Cepiring, Kendal, Jawa Tengah</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Ekspedisi:</p>
            <p>J&amp;T, JNE, SiCepat (sesuai Shopee)</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Perhatian berat sekam:</p>
            <p>Sekam &amp; arang sekam sangat ringan tapi bervolume besar — ongkir bisa dihitung volumetrik.</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Kendal &amp; sekitarnya:</p>
            <p>Bisa COD atau ambil langsung di Botomulyo, Cepiring.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
