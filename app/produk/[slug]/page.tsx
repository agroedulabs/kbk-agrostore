import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProduct } from "@/lib/products";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getProduct(params.slug);
  if (!p) return { title: "Produk tidak ditemukan" };
  return {
    title: p.nama,
    description: p.deskripsi_pendek,
  };
}

export default function ProdukDetailPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-hijau-600">Beranda</Link>
        <span>/</span>
        <Link href="/produk" className="hover:text-hijau-600">Produk</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{p.nama_pendek}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Info utama */}
        <div>
          <div className="bg-gradient-to-br from-hijau-50 to-hijau-100 rounded-2xl p-10 flex items-center justify-center mb-6">
            <span className="text-8xl">{p.emoji}</span>
          </div>
          <div className="card p-5">
            <div className="text-xs font-mono text-hijau-600 font-bold mb-1">{p.sku}</div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{p.nama}</h1>
            <p className="text-gray-500 text-sm mb-4">{p.deskripsi_pendek}</p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <div>
                <div className="text-3xl font-extrabold text-hijau-700">
                  {p.harga_jual.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                </div>
                <div className="text-sm text-gray-500">per {p.satuan} • ±{p.berat_kg} kg</div>
              </div>
              <div className="text-right">
                <div className="badge bg-hijau-100 text-hijau-800 text-sm">{p.margin_pct}% margin</div>
                <div className="text-xs text-gray-400 mt-1">{p.zona}</div>
              </div>
            </div>
            <a
              href={p.shopee_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors"
            >
              🛒 Beli di Shopee
            </a>
          </div>
        </div>

        {/* Right: Detail */}
        <div className="space-y-5">
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-3">📖 Deskripsi</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{p.deskripsi_panjang}</p>
            {p.catatan && (
              <div className="mt-3 bg-tanah-50 border border-tanah-200 rounded-xl p-3 text-sm text-tanah-800">
                {p.catatan}
              </div>
            )}
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-3">✅ Manfaat</h2>
            <ul className="space-y-2">
              {p.manfaat.map((m, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-hijau-500 mt-0.5 font-bold">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-3">💧 Cara Pakai</h2>
            <ol className="space-y-2">
              {p.cara_pakai.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-hijau-100 text-hijau-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {c}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-hijau-50 border border-hijau-200 rounded-2xl p-4 text-sm text-hijau-800">
            <p className="font-semibold mb-1">📍 Asal Produk</p>
            <p>Botomulyo, Cepiring, Kendal, Jawa Tengah</p>
            <p className="mt-1">Diolah sendiri di ladang KBK AgroEduLabs 500 m²</p>
          </div>
        </div>
      </div>

      {/* Produk lain */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Produk Lainnya</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PRODUCTS.filter((x) => x.sku !== p.sku).slice(0, 3).map((x) => (
            <Link
              key={x.sku}
              href={`/produk/${x.slug}`}
              className="card p-4 hover:shadow-md transition-all flex items-center gap-3"
            >
              <span className="text-2xl">{x.emoji}</span>
              <div>
                <div className="font-semibold text-gray-900 text-sm leading-tight">{x.nama_pendek}</div>
                <div className="text-xs text-hijau-700 font-medium">
                  {x.harga_jual.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
