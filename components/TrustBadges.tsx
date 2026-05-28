const badges = [
  { icon: "🌿", label: "Produksi Lokal Kendal Asli" },
  { icon: "🚫", label: "Tanpa Bahan Kimia Tambahan" },
  { icon: "🤝", label: "Harga Langsung dari Petani" },
  { icon: "♻️", label: "Zero-Waste" },
  { icon: "✅", label: "Stok Segar, Proses Sendiri" },
  { icon: "🚚", label: "COD Tersedia — Area Kendal" },
];

export default function TrustBadges() {
  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">{b.icon}</span>
              <span className="font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
