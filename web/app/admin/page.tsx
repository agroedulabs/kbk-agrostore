import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Admin Dashboard | KBK AgroStore",
  description: "Dashboard admin KBK AgroStore",
};

export default function AdminPage() {
  const totalSkus = PRODUCTS.length;
  const avgMargin = (PRODUCTS.reduce((s, p) => s + p.margin_pct, 0) / totalSkus).toFixed(1);
  const tersedia = PRODUCTS.filter((p) => p.tersedia).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-hijau-600 font-semibold text-sm mb-1">KBK AgroStore</div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
          </div>
          <div className="text-sm text-gray-500 bg-white border border-gray-200 rounded-xl px-4 py-2">
            📅 {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-tanah-50 border border-tanah-200 rounded-2xl p-5 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-tanah-900 mb-1">Mode Read-Only</p>
            <p className="text-sm text-tanah-700">
              Dashboard ini menampilkan data produk (HPP, margin, harga). Untuk operasional harian —
              catat stok masuk, penjualan, dan laporan — gunakan CLI lokal:
            </p>
            <code className="mt-2 inline-block bg-tanah-100 text-tanah-900 text-xs font-mono px-3 py-1.5 rounded-lg">
              node cli/src/cli.js bantuan
            </code>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { val: String(totalSkus), label: "Total SKU", icon: "📦", color: "bg-hijau-50 text-hijau-700" },
          { val: String(tersedia), label: "Tersedia", icon: "✅", color: "bg-green-50 text-green-700" },
          { val: avgMargin + "%", label: "Avg Margin", icon: "📊", color: "bg-blue-50 text-blue-700" },
          { val: "Mei 2026", label: "Data Riset", icon: "🔍", color: "bg-purple-50 text-purple-700" },
        ].map((s) => (
          <div key={s.label} className={`card p-4 ${s.color}`}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-extrabold">{s.val}</div>
            <div className="text-xs font-medium opacity-80">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabel Produk + HPP */}
      <div className="card overflow-hidden mb-8">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">📋 Katalog HPP & Margin</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">SKU</th>
                <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Nama</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Harga Jual</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">HPP</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Laba</th>
                <th className="text-right px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRODUCTS.map((p) => (
                <tr key={p.sku} className="hover:bg-gray-50">
                  <td className="px-5 py-3 font-mono text-xs text-hijau-700 font-semibold">{p.sku}</td>
                  <td className="px-5 py-3 text-gray-900 font-medium">
                    <span className="mr-1">{p.emoji}</span>
                    {p.nama_pendek}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-900 font-semibold">
                    {p.harga_jual.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-3 text-right text-gray-600">
                    {p.hpp_total.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-3 text-right text-hijau-700 font-semibold">
                    {p.laba.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className={`badge ${p.margin_pct >= 60 ? "bg-hijau-100 text-hijau-800" : p.margin_pct >= 40 ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"}`}>
                      {p.margin_pct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HPP Breakdown detail */}
      <div className="card p-5 mb-8">
        <h2 className="font-bold text-gray-900 mb-4">🔍 Breakdown Komponen HPP</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((p) => (
            <div key={p.sku} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-gray-900">
                  {p.emoji} {p.nama_pendek}
                </span>
                <span className="text-xs font-mono text-hijau-600">{p.sku}</span>
              </div>
              {Object.entries(p.hpp_components).map(([k, v]) => (
                <div key={k} className="flex justify-between text-xs text-gray-600 py-0.5">
                  <span className="capitalize">{k.replace(/_/g, " ")}</span>
                  <span className="font-medium">{Number(v).toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}</span>
                </div>
              ))}
              <div className="flex justify-between text-xs font-bold text-gray-900 border-t border-gray-200 mt-2 pt-2">
                <span>Total HPP</span>
                <span>{p.hpp_total.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links CLI */}
      <div className="card p-5">
        <h2 className="font-bold text-gray-900 mb-4">⌨️ Perintah CLI Harian</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            ["node cli/src/cli.js checklist", "Daily checklist pagi"],
            ["node cli/src/cli.js stok", "Lihat stok semua zona"],
            ["node cli/src/cli.js stok-masuk", "Catat bahan masuk"],
            ["node cli/src/cli.js jual", "Catat penjualan"],
            ["node cli/src/cli.js laporan", "Laporan hari ini"],
            ["node cli/src/cli.js backup", "Backup data JSON"],
          ].map(([cmd, desc]) => (
            <div key={cmd} className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <code className="text-xs font-mono text-hijau-700 font-semibold flex-1 leading-relaxed">{cmd}</code>
              <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">{desc}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-gray-400">
          * Jalankan dari folder: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">D:\Claude\kbk-agrostore</code>
        </p>
      </div>
    </div>
  );
}
