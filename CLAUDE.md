# KBK AGROSTORE — Referensi Cepat Claude Code

## Identitas Proyek
- **Nama**: KBK AgroStore
- **Lokasi**: Botomulyo, Cepiring, Kendal, Jawa Tengah
- **Pengelola**: Arief Rahman Hakim (ASN Dinas Pertanian Kendal)
- **Lahan**: 500m² pertanian terpadu zero-waste

## Entry Point
```
node src/cli.js [perintah]
```

## 6 SKU Produk
| SKU | Nama | Satuan | Harga Jual |
|-----|------|--------|------------|
| KBK-SM | Sekam Mentah | karung | Rp 15.000 |
| KBK-SB | Sekam Bakar | karung | Rp 22.000 |
| KBK-KK-M | Kohe Mentah Kering | kg | Rp 3.000 |
| KBK-KK-F1 | Kohe Fermentasi 1kg | pack | Rp 10.000 |
| KBK-KK-F5 | Kohe Fermentasi 5kg | pack | Rp 40.000 |
| KBK-MT5 | Media Tanam Komplit 5kg | pack | Rp 28.000 |

## Zona Gudang
- Zona A: Sekam Mentah (bulk)
- Zona B: Area Proses Bakar (outdoor)
- Zona C: Proses Kohe (pengeringan + fermentasi)
- Zona D: Produk Jadi / Ready Ship
- Zona E: Alat & Supplies

## Perintah Lengkap
```
node src/cli.js setup           → init sistem
node src/cli.js bantuan         → semua perintah
node src/cli.js produk          → katalog + HPP + margin
node src/cli.js update-hpp      → update komponen HPP
node src/cli.js stok            → lihat stok semua zona
node src/cli.js stok-masuk      → catat bahan masuk
node src/cli.js stok-keluar     → catat keluar internal
node src/cli.js proses          → catat konversi produksi
node src/cli.js jual            → catat penjualan
node src/cli.js pesanan         → lihat pesanan aktif Shopee
node src/cli.js shopee-order    → input pesanan Shopee
node src/cli.js shopee-listing  → generate listing Shopee
node src/cli.js shopee-chat     → template auto-reply
node src/cli.js riset           → data harga marketplace
node src/cli.js laporan         → ringkasan hari ini
node src/cli.js laporan-bulan   → laba/rugi bulanan
node src/cli.js export          → export CSV
node src/cli.js checklist       → daily checklist operasional
node src/cli.js backup          → backup semua JSON
```

## Prinsip
> "Pelan. Sabar. Mantap. Bismillah... Biidznillah..."
> Data jujur dulu, baru scale.

## Tech Stack
- Runtime: Node.js built-in ONLY (no npm install)
- Storage: JSON files di data/
- Interface: CLI readline
- OS: Windows
