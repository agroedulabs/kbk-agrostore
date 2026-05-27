import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang KBK AgroEduLabs",
  description: "KBK AgroEduLabs — Kebun Belajar Komunitas di Botomulyo, Cepiring, Kendal. Pertanian organik terpadu zero-waste.",
};

export default function TentangPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="text-hijau-600 font-semibold text-sm mb-1">Tentang Kami</div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">KBK AgroEduLabs</h1>
      </div>

      {/* Hero card */}
      <div className="bg-gradient-to-br from-hijau-800 to-hijau-600 text-white rounded-2xl p-8 mb-8">
        <div className="text-5xl mb-4">🌿</div>
        <blockquote className="text-xl font-semibold italic mb-2">
          "Pelan. Sabar. Mantap. Bismillah... Biidznillah..."
        </blockquote>
        <p className="text-hijau-200 text-sm">— Prinsip KBK AgroEduLabs</p>
      </div>

      {/* Konten */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">🏡 Siapa Kami</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            KBK (Kebun Belajar Komunitas) AgroEduLabs adalah inisiatif pertanian terpadu
            yang dikelola oleh Arief Rahman Hakim — ASN Dinas Pertanian Kendal yang
            mendedikasikan lahan 500 m² di Botomulyo, Cepiring untuk pertanian organik
            zero-waste berbasis edukasi komunitas.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">🎯 Visi</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Mewujudkan ekosistem pertanian organik lokal yang mandiri, zero-waste,
            dan dapat menjadi model percontohan bagi petani dan komunitas di Kendal
            dan sekitarnya. Data jujur dulu, baru scale.
          </p>
        </div>
      </div>

      {/* Tiga Pilar */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">⚓ Tiga Pilar KBK</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "🌱",
              judul: "Pertanian Terpadu",
              desc: "Integrasi tanaman, ternak, dan pengolahan limbah dalam satu ekosistem tertutup.",
            },
            {
              icon: "📚",
              judul: "Edukasi Komunitas",
              desc: "Berbagi ilmu dan praktik pertanian organik dengan petani dan warga sekitar.",
            },
            {
              icon: "🔄",
              judul: "Zero-Waste",
              desc: "Limbah RMU jadi sekam. Kohe jadi pupuk. Tidak ada yang terbuang sia-sia.",
            },
          ].map((p) => (
            <div key={p.judul} className="bg-hijau-50 rounded-xl p-4">
              <div className="text-2xl mb-2">{p.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{p.judul}</h3>
              <p className="text-gray-600 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Produk & asal bahan */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🏭 Sumber Bahan Baku</h2>
        <div className="space-y-3">
          {[
            {
              bahan: "Sekam Padi",
              asal: "RMU (Penggilingan Padi) Cepiring",
              note: "Bahan baku gratis — limbah jadi berkah",
            },
            {
              bahan: "Kotoran Kambing (Kohe)",
              asal: "Peternak lokal Botomulyo, Cepiring",
              note: "Kambing lokal dengan pakan alami",
            },
            {
              bahan: "EM4 Probiotik",
              asal: "Toko pertanian setempat",
              note: "Untuk proses fermentasi 21 hari",
            },
            {
              bahan: "Top Soil",
              asal: "Ladang KBK Botomulyo",
              note: "Tanah pilihan untuk media tanam komplit",
            },
          ].map((b) => (
            <div key={b.bahan} className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
              <span className="text-hijau-500 font-bold mt-0.5">•</span>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{b.bahan}</div>
                <div className="text-gray-600 text-xs">{b.asal}</div>
                <div className="text-hijau-600 text-xs italic mt-0.5">{b.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lokasi */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📍 Lokasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-sm text-gray-700 space-y-2">
            <p><strong>Alamat:</strong><br />Botomulyo, Cepiring<br />Kendal, Jawa Tengah</p>
            <p><strong>Luas lahan:</strong> 500 m²</p>
            <p><strong>Zona gudang:</strong></p>
            <ul className="text-xs text-gray-600 space-y-1 ml-3">
              <li>Zona A — Sekam Mentah (bulk)</li>
              <li>Zona B — Area Proses Bakar</li>
              <li>Zona C — Proses Kohe</li>
              <li>Zona D — Produk Jadi</li>
              <li>Zona E — Alat &amp; Supplies</li>
            </ul>
          </div>
          <div className="bg-hijau-50 rounded-xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">🗺️</div>
              <p className="text-sm text-gray-600">Cepiring, Kendal</p>
              <p className="text-xs text-gray-400 mt-1">Jawa Tengah, Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kontak */}
      <div className="bg-hijau-700 text-white rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">📬 Hubungi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-hijau-200 mb-1">Email:</p>
            <p>agroedulabs@gmail.com</p>
          </div>
          <div>
            <p className="text-hijau-200 mb-1">Pemesanan:</p>
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-hijau-200"
            >
              Shopee KBK AgroStore →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
