import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-hijau-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-hijau-500 rounded-xl flex items-center justify-center font-bold text-lg">K</div>
              <div>
                <div className="font-bold">KBK AgroStore</div>
                <div className="text-hijau-300 text-xs">AgroEduLabs Kendal</div>
              </div>
            </div>
            <p className="text-hijau-200 text-sm leading-relaxed">
              Produk pertanian organik terpadu dari ladang KBK Botomulyo, zero-waste, untuk masa depan pertanian yang berkelanjutan.
            </p>
            <p className="mt-3 text-hijau-300 text-xs italic">
              "Pelan. Sabar. Mantap. Bismillah... Biidznillah..."
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3 text-hijau-100">Produk</h3>
            <ul className="space-y-2 text-sm text-hijau-200">
              <li><Link href="/produk/sekam-mentah" className="hover:text-white transition-colors">🌾 Sekam Mentah</Link></li>
              <li><Link href="/produk/sekam-bakar" className="hover:text-white transition-colors">🔥 Arang Sekam</Link></li>
              <li><Link href="/produk/kohe-mentah" className="hover:text-white transition-colors">🐐 Kohe Mentah</Link></li>
              <li><Link href="/produk/kohe-fermentasi-1kg" className="hover:text-white transition-colors">🧪 Kohe Fermentasi 1kg</Link></li>
              <li><Link href="/produk/kohe-fermentasi-5kg" className="hover:text-white transition-colors">🧪 Kohe Fermentasi 5kg</Link></li>
              <li><Link href="/produk/media-tanam-5kg" className="hover:text-white transition-colors">🌱 Media Tanam 5kg</Link></li>
              <li><Link href="/produk/pupuk-azolla-500g" className="hover:text-white transition-colors">🌿 Pupuk Azolla</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold mb-3 text-hijau-100">Lokasi &amp; Kontak</h3>
            <div className="text-sm text-hijau-200 space-y-2">
              <p>📍 Botomulyo, Cepiring<br />Kendal, Jawa Tengah</p>
              <p>
                💬 WhatsApp:{" "}
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX"}`}
                  target="_blank"
                  rel="noopener"
                  className="underline hover:text-white"
                >
                  {process.env.NEXT_PUBLIC_WA_DISPLAY ?? "0812-XXXX-XXXX"}
                </a>
              </p>
              <p>📧 agroedulabs@gmail.com</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX"}?text=${encodeURIComponent("Assalamu'alaikum, saya mau tanya produk KBK AgroStore 🌿")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                💬 Chat WhatsApp
              </a>
              <a
                href="https://shopee.co.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                🛒 Shopee
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-hijau-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-hijau-400">
          <span>© 2026 KBK AgroEduLabs. Hak cipta dilindungi.</span>
          <span>Dibangun dengan 🌿 untuk pertanian organik Kendal</span>
        </div>
      </div>
    </footer>
  );
}
