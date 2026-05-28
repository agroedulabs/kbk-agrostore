import type { Metadata } from "next";
import { buildWAUrlGeneral, WA_DISPLAY } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tentang KBK AgroEduLabs",
  description:
    "KBK AgroEduLabs — Kebun Belajar Komunitas di Botomulyo, Cepiring, Kendal. Pertanian organik terpadu zero-waste.",
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
          &ldquo;Pelan. Sabar. Mantap. Bismillah... Biidznillah...&rdquo;
        </blockquote>
        <p className="text-hijau-200 text-sm">— Prinsip KBK AgroEduLabs</p>
      </div>

      {/* Cerita KBK */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🏡 Cerita KBK AgroStore</h2>
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            KBK AgroStore lahir dari lahan kecil 500&nbsp;m² di Botomulyo, Cepiring, Kendal.
            Bukan lahan yang besar — tapi di sinilah kami belajar bahwa dari hal-hal yang biasa
            dianggap limbah, bisa lahir sesuatu yang benar-benar berguna. Sekam padi yang biasanya
            dibuang, kami bakar jadi arang sekam. Kotoran kambing yang bau, kami fermentasi jadi
            pupuk kaya nutrisi. Dari prinsip sederhana: tidak ada yang terbuang sia-sia.
          </p>
          <p>
            Dikelola oleh Arief Rahman Hakim — Staf Dinas Pertanian Kabupaten Kendal yang memilih
            pulang ke lahan sendiri dan membuktikan bahwa pertanian terpadu zero-waste bisa jalan
            di skala kecil sekalipun. Semua produk dibuat manual, diproses dengan teliti, dan
            dijual jujur — tanpa lebay, tanpa pemanis harga. Harga petani, untuk petani.
          </p>
          <p>
            Kami tidak sedang membangun brand besar. Kami sedang membangun kepercayaan — pelan,
            sabar, mantap. Kalau produk kami bisa bantu tanah Anda lebih subur dan panen Anda
            lebih baik, itu sudah lebih dari cukup. Bismillah, biidznillah.
          </p>
        </div>
      </div>

      {/* Pengelola */}
      <div className="card p-6 mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">👤 Pengelola</h2>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-hijau-700 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
            A
          </div>
          <div>
            <div className="font-bold text-gray-900 text-base">Arief Rahman Hakim</div>
            <div className="text-sm text-gray-600 mt-0.5">
              Staf Dinas Pertanian Kabupaten Kendal
            </div>
            <div className="text-xs text-hijau-700 mt-1">
              Botomulyo, Cepiring, Kendal, Jawa Tengah
            </div>
          </div>
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
              desc: "Limbah RMU jadi sekam. Kohe jadi pupuk. Azolla jadi pupuk hijau. Tidak ada yang terbuang sia-sia.",
            },
          ].map((pilar) => (
            <div key={pilar.judul} className="bg-hijau-50 rounded-xl p-4">
              <div className="text-2xl mb-2">{pilar.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{pilar.judul}</h3>
              <p className="text-gray-600 text-xs leading-relaxed">{pilar.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sumber Bahan Baku */}
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
              bahan: "Azolla pinnata",
              asal: "Kolam budidaya KBK AgroEduLabs",
              note: "Pupuk hijau nitrogen tinggi, tumbuh sendiri di lahan",
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
            <div
              key={b.bahan}
              className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
            >
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
            <p>
              <strong>Alamat:</strong>
              <br />
              Botomulyo, Cepiring
              <br />
              Kendal, Jawa Tengah
            </p>
            <p>
              <strong>Luas lahan:</strong> 500 m²
            </p>
          </div>
          <div className="bg-hijau-50 rounded-xl p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-3">🗺️</div>
              <p className="text-sm font-medium text-gray-700">Botomulyo, Cepiring, Kendal</p>
              <p className="text-xs text-gray-400 mt-1">Jawa Tengah, Indonesia</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kontak */}
      <div className="bg-hijau-700 text-white rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">📬 Hubungi Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p className="text-hijau-200 mb-1">WhatsApp:</p>
            <a
              href={buildWAUrlGeneral()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-hijau-200"
            >
              {WA_DISPLAY}
            </a>
          </div>
          <div>
            <p className="text-hijau-200 mb-1">Email:</p>
            <p>agroedulabs@gmail.com</p>
          </div>
          <div>
            <p className="text-hijau-200 mb-1">Toko Shopee:</p>
            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-hijau-200"
            >
              Segera hadir di Shopee →
            </a>
          </div>
          <div>
            <p className="text-hijau-200 mb-1">COD &amp; Ambil Sendiri:</p>
            <p>Tersedia area Kendal — konfirmasi via WA</p>
          </div>
        </div>
        <a
          href={buildWAUrlGeneral()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Chat WhatsApp Sekarang
        </a>
      </div>
    </div>
  );
}
