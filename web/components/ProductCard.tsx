import Link from "next/link";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  showHPP?: boolean;
}

export default function ProductCard({ product: p, showHPP = false }: Props) {
  return (
    <div className="card hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Header */}
      <div className="bg-gradient-to-br from-hijau-50 to-hijau-100 p-6 flex items-center gap-3">
        <span className="text-4xl">{p.emoji}</span>
        <div>
          <div className="text-xs font-mono text-hijau-600 font-semibold">{p.sku}</div>
          <h3 className="font-bold text-gray-900 leading-tight">{p.nama}</h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <p className="text-gray-600 text-sm leading-relaxed">{p.deskripsi_pendek}</p>

        {/* Harga */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-extrabold text-hijau-700">
              {p.harga_jual.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
            </div>
            <div className="text-xs text-gray-500">per {p.satuan} • ±{p.berat_kg} kg</div>
          </div>
          <div className="text-right">
            <div className="badge bg-hijau-100 text-hijau-800">{p.margin_pct}% margin</div>
            {showHPP && (
              <div className="text-xs text-gray-400 mt-1">
                HPP: Rp {p.hpp_total.toLocaleString("id-ID")}
              </div>
            )}
          </div>
        </div>

        {/* Ketersediaan */}
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${p.tersedia ? "bg-green-500" : "bg-red-400"}`} />
          <span className="text-xs text-gray-500">{p.tersedia ? "Stok tersedia" : "Stok habis"}</span>
          <span className="text-xs text-gray-400">• {p.zona}</span>
        </div>

        {/* CTA */}
        <div className="flex gap-2 mt-auto pt-2">
          <Link
            href={`/produk/${p.slug}`}
            className="flex-1 text-center btn-outline text-sm py-2"
          >
            Detail
          </Link>
          <a
            href={p.shopee_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm"
          >
            🛒 Shopee
          </a>
        </div>
      </div>
    </div>
  );
}
