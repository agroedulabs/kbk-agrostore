import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, getProduct, generateWhatsAppURL } from "@/lib/products";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = getProduct(params.slug);
  if (!p) return { title: "Produk tidak ditemukan" };
  return { title: p.nama, description: p.deskripsi_pendek };
}

export default function ProdukDetailPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();

  const waUrl = generateWhatsAppURL(p, p.min_order);

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
          <div className="bg-gradient-to-br from-hijau-50 to-hijau-100 rounded-2xl p-10 flex items-center justify-center mb-6 relative">
            <span className="text-8xl">{p.emoji}</span>
            {!p.tersedia && (
              <span className="absolute top-4 right-4 badge bg-gray-200 text-gray-600 text-xs">
                Segera Hadir
              </span>
            )}
          </div>
          <div className="card p-5">
            <div className="text-xs font-mono text-hijau-600 font-bold mb-1">{p.sku}</div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-1">{p.nama}</h1>
            <p className="text-gray-500 text-sm mb-4">{p.deskripsi_pendek}</p>
            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
              <div>
                {p.tersedia ? (
                  <>
                    <div className="text-3xl font-extrabold text-hijau-700">
                      {p.harga_jual.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      })}
                    </div>
                    <div className="text-sm text-gray-500">per {p.satuan} • ±{p.berat_kg} kg</div>
                    {p.min_order > 1 && (
                      <div className="text-xs text-tanah-700 mt-0.5">
                        Min. order: {p.min_order} {p.satuan}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-xl font-bold text-gray-400">Segera Hadir</div>
                )}
              </div>
              <div className="text-right">
                <div
                  className={`flex items-center gap-1.5 text-sm ${p.tersedia ? "text-green-600" : "text-gray-400"}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${p.tersedia ? "bg-green-500" : "bg-gray-400"}`}
                  />
                  {p.tersedia ? "Stok tersedia" : "Belum tersedia"}
                </div>
                <div className="text-xs text-gray-400 mt-1">{p.zona}</div>
              </div>
            </div>

            {/* CTA */}
            {p.tersedia ? (
              <div className="flex flex-col gap-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Pesan via WhatsApp
                </a>
                <a
                  href={p.shopee_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                >
                  🛒 Beli di Shopee
                </a>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-2">
                  Produk ini belum tersedia — hubungi kami untuk info stok.
                </p>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Tanya Ketersediaan via WA
                </a>
              </div>
            )}
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
                  <span className="text-hijau-500 mt-0.5 font-bold flex-shrink-0">•</span>
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {p.cara_pakai.length > 0 && (
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
          )}

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {PRODUCTS.filter((x) => x.sku !== p.sku && x.tersedia)
            .slice(0, 3)
            .map((x) => (
              <Link
                key={x.sku}
                href={`/produk/${x.slug}`}
                className="card p-4 hover:shadow-md transition-all flex items-center gap-3"
              >
                <span className="text-2xl">{x.emoji}</span>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 text-sm leading-tight truncate">
                    {x.nama_pendek}
                  </div>
                  <div className="text-xs text-hijau-700 font-medium">
                    {x.harga_jual.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      maximumFractionDigits: 0,
                    })}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
