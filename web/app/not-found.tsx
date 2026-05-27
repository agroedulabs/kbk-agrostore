import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-6xl mb-4">🌾</div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Halaman tidak ditemukan</h2>
      <p className="text-gray-600 mb-6">
        Mungkin produk sedang dipindah ke zona lain. Cek katalog kami ya!
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/" className="btn-primary">Ke Beranda</Link>
        <Link href="/produk" className="btn-outline">Lihat Produk</Link>
      </div>
    </div>
  );
}
