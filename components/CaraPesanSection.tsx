import { buildWAUrlGeneral } from "@/lib/whatsapp";

const steps = [
  {
    num: "1",
    icon: "🛍️",
    title: "Pilih Produk",
    desc: "Lihat katalog, pilih produk dan jumlah yang kamu butuhkan.",
  },
  {
    num: "2",
    icon: "💬",
    title: "Hubungi via WhatsApp",
    desc: "Klik Pesan via WhatsApp — langsung terhubung ke kami, tulis produk & alamat kirim.",
  },
  {
    num: "3",
    icon: "📦",
    title: "Terima Pesanan",
    desc: "Kami konfirmasi harga & ongkir, lalu kirim atau bisa ambil di Botomulyo, Cepiring.",
  },
];

export default function CaraPesanSection() {
  return (
    <section className="bg-hijau-50 border-y border-hijau-100 py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-hijau-600 font-semibold text-sm mb-1">Mudah &amp; Cepat</div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Cara Pesan</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {steps.map((s) => (
            <div key={s.num} className="card p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-hijau-600 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                {s.num}
              </div>
              <div className="text-3xl mb-2">{s.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
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
        </div>
      </div>
    </section>
  );
}
