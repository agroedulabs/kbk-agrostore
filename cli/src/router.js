// ============================================================
// KBK AGROSTORE — router.js
// Semua logika bisnis, data, dan fungsi utility
// KBK AgroEduLabs, Botomulyo, Cepiring, Kendal
// ============================================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ── Path helpers ─────────────────────────────────────────────
// CLI ada di cli/src/, repo root ada dua level di atas
const ROOT = path.join(__dirname, '..', '..');
const DATA = path.join(ROOT, 'data');
const BACKUPS = path.join(ROOT, 'backups');

const FILE = {
  products:      path.join(DATA, 'products.json'),
  inventory:     path.join(DATA, 'inventory.json'),
  transactions:  path.join(DATA, 'transactions.json'),
  orders:        path.join(DATA, 'orders.json'),
  research:      path.join(DATA, 'market-research.json'),
  checklist:     path.join(DATA, 'checklist.json'),
};

// ── Utility: format Rupiah ────────────────────────────────────
function rp(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function pct(a, b) {
  if (!b) return '0%';
  return ((a / b) * 100).toFixed(1) + '%';
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function nowTs() {
  return new Date().toISOString();
}

function fmtDate(iso) {
  if (!iso) return '-';
  return iso.slice(0, 16).replace('T', ' ');
}

// ── Utility: read/write JSON ──────────────────────────────────
function readJSON(file) {
  try {
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}

function writeJSON(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ── Utility: readline prompt ─────────────────────────────────
function prompt(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function createRL() {
  return readline.createInterface({ input: process.stdin, output: process.stdout });
}

// ── Hitung total HPP dari object komponen ────────────────────
function calcHPP(components) {
  return Object.values(components).reduce((s, v) => s + Number(v), 0);
}

// ══════════════════════════════════════════════════════════════
// SEED DATA
// ══════════════════════════════════════════════════════════════

const SEED_PRODUCTS = [
  {
    sku: 'KBK-SM',
    nama: 'Sekam Mentah',
    satuan: 'karung',
    harga_jual: 15000,
    hpp_components: { karung: 2000, label: 200, tenaga: 500 },
    deskripsi: 'Sekam padi mentah segar dari RMU Cepiring, bersih, kering, siap pakai sebagai media tanam atau bahan campuran.',
    berat_bersih_kg: 15,
    catatan: 'Sekam sangat ringan! 1 karung ±15kg tapi volume besar ~50L',
  },
  {
    sku: 'KBK-SB',
    nama: 'Sekam Bakar / Arang Sekam',
    satuan: 'karung',
    harga_jual: 22000,
    hpp_components: { bahan_bakar: 2000, karung: 2000, label: 200, tenaga: 1500 },
    deskripsi: 'Arang sekam padi hasil pembakaran terkontrol, warna hitam merata, pH netral, steril, siap campur media tanam.',
    berat_bersih_kg: 8,
    catatan: 'Lebih ringan dari sekam mentah! 1 karung ±8kg',
  },
  {
    sku: 'KBK-KK-M',
    nama: 'Kohe Kambing Mentah Kering',
    satuan: 'kg',
    harga_jual: 3000,
    hpp_components: { bahan_baku: 1500, jemur: 300, karung: 200, label: 100 },
    deskripsi: 'Kotoran kambing kering alami, dijemur di bawah sinar matahari, bebas bau tajam, kaya N-P-K organik.',
    berat_bersih_kg: 1,
    catatan: 'Harga beli dari peternak lokal Botomulyo masih estimasi, perlu dikonfirmasi',
  },
  {
    sku: 'KBK-KK-F1',
    nama: 'Kohe Kambing Fermentasi EM4 — 1kg',
    satuan: 'pack',
    harga_jual: 10000,
    hpp_components: { kohe: 2500, em4: 150, tenaga: 300, kemasan: 700, label: 150 },
    deskripsi: 'Pupuk kandang kambing difermentasi 21 hari dengan EM4, matang sempurna, tidak panas, tidak bau, siap pakai.',
    berat_bersih_kg: 1,
    catatan: 'Pack plastik ziplock 1kg',
  },
  {
    sku: 'KBK-KK-F5',
    nama: 'Kohe Kambing Fermentasi EM4 — 5kg',
    satuan: 'pack',
    harga_jual: 40000,
    hpp_components: { kohe: 12500, em4: 700, tenaga: 1000, kemasan: 1500, label: 200 },
    deskripsi: 'Pupuk kandang kambing fermentasi EM4 ekonomis, kemasan 5kg, cocok untuk kebun rumahan atau pot besar.',
    berat_bersih_kg: 5,
    catatan: 'Pack karung mini 5kg',
  },
  {
    sku: 'KBK-MT5',
    nama: 'Media Tanam Komplit 5kg',
    satuan: 'pack',
    harga_jual: 28000,
    hpp_components: { sekam_bakar: 700, kohe: 4500, top_soil: 500, tenaga: 500, kemasan: 1500, label: 200 },
    deskripsi: 'Media tanam siap pakai: campuran arang sekam + kohe fermentasi + top soil pilihan. Gembur, subur, pH ideal 6-7.',
    berat_bersih_kg: 5,
    catatan: 'Komposisi: 40% sekam bakar + 40% kohe fermentasi + 20% top soil',
  },
];

const SEED_INVENTORY = {
  gudang: {
    nama: 'Gudang KBK Botomulyo',
    alamat: 'Botomulyo, Cepiring, Kendal, Jawa Tengah',
    luas: '500 m²',
  },
  zona: {
    A: { nama: 'Sekam Mentah (bulk)', items: [] },
    B: { nama: 'Area Proses Bakar (outdoor)', items: [] },
    C: { nama: 'Proses Kohe (pengeringan + fermentasi)', items: [] },
    D: { nama: 'Produk Jadi / Ready Ship', items: [] },
    E: { nama: 'Alat & Supplies', items: [] },
  },
  stok: {},  // { sku: qty }
  last_updated: null,
};

const SEED_TRANSACTIONS = [];

const SEED_ORDERS = [];

const SEED_RESEARCH = {
  updated: 'Mei 2026',
  catatan: 'Harga marketplace sebagai benchmark penetapan harga KBK AgroStore',
  data: {
    'KBK-SM': {
      produk: 'Sekam Mentah',
      harga_kompetitor: [
        { nama: 'Benih Fast Group',  platform: 'Tokopedia', lokasi: 'Bekasi',    harga: 15000, note: 'terendah' },
        { nama: 'Benih Baik Store',  platform: 'Tokopedia', lokasi: 'Bekasi',    harga: 17000 },
        { nama: 'Mr.Farmers',        platform: 'Tokopedia', lokasi: 'Depok',     harga: 20000 },
        { nama: 'FloraAlam',         platform: 'Tokopedia', lokasi: 'Jkt Utara', harga: 30000, note: 'premium' },
      ],
    },
    'KBK-SB': {
      produk: 'Sekam Bakar',
      harga_kompetitor: [
        { nama: 'Santri Farming',    platform: 'Shopee',    lokasi: 'Pangandaran', harga: 18300, note: 'terendah' },
        { nama: 'Benih Fast Group',  platform: 'Tokopedia', lokasi: 'Bekasi',      harga: 20000 },
        { nama: 'Sahabat Karung',    platform: 'Tokopedia', lokasi: 'Jkt Barat',   harga: 26000 },
        { nama: 'Kawan Beras',       platform: 'Tokopedia', lokasi: 'Jkt Barat',   harga: 27999 },
      ],
    },
    'KBK-KK-M': {
      produk: 'Kohe Kambing',
      harga_kompetitor: [
        { nama: 'Referensi pabrik',  platform: 'Direct',    lokasi: 'Salatiga',   harga: 5000,  note: 'per kg' },
        { nama: 'Manggrow Official', platform: 'Tokopedia', lokasi: '-',          harga: 10000, note: '1kg fermentasi halus' },
        { nama: 'Berbagai toko',     platform: 'Tokopedia', lokasi: '-',          harga: 40000, note: '5kg range 35-45rb' },
        { nama: 'Berbagai toko',     platform: 'Tokopedia', lokasi: '-',          harga: 75000, note: 'karung 50kg' },
      ],
    },
  },
  peringatan: 'Harga beli kohe dari peternak lokal Botomulyo BELUM dikonfirmasi. Update setelah survei lapangan.',
};

const SEED_CHECKLIST = {
  daily: [
    { id: 1, waktu: 'Pagi',  item: 'Cek kondisi gudang (kebersihan, hama, kelembaban)' },
    { id: 2, waktu: 'Pagi',  item: 'Cek stok produk jadi Zona D — ada yang perlu diisi?' },
    { id: 3, waktu: 'Pagi',  item: 'Cek notifikasi pesanan Shopee (buka app)' },
    { id: 4, waktu: 'Pagi',  item: 'Cek fermentasi kohe EM4 — suhu & kelembaban batch aktif' },
    { id: 5, waktu: 'Siang', item: 'Proses pesanan Shopee yang masuk — packing & label' },
    { id: 6, waktu: 'Siang', item: 'Input pesanan ke sistem: node src/cli.js shopee-order' },
    { id: 7, waktu: 'Siang', item: 'Balik/aduk batch kohe fermentasi (jika hari ke 7/14/21)' },
    { id: 8, waktu: 'Sore',  item: 'Catat penjualan hari ini: node src/cli.js jual' },
    { id: 9, waktu: 'Sore',  item: 'Cek bahan baku — perlu ambil sekam dari RMU?' },
    { id: 10, waktu: 'Sore', item: 'Lihat laporan harian: node src/cli.js laporan' },
    { id: 11, waktu: 'Sore', item: 'Backup data: node src/cli.js backup' },
    { id: 12, waktu: 'Sore', item: 'Cek chat Shopee — balas pertanyaan pembeli' },
  ],
  weekly: [
    { id: 1, item: 'Hitung stok fisik semua produk — cocokkan dengan sistem' },
    { id: 2, item: 'Ambil kohe mentah dari peternak lokal Botomulyo (jika stok <20kg)' },
    { id: 3, item: 'Mulai batch fermentasi baru jika kohe mentah cukup' },
    { id: 4, item: 'Foto produk jadi untuk update listing Shopee' },
    { id: 5, item: 'Review harga kompetitor — perlu adjust harga?' },
    { id: 6, item: 'Laporan mingguan: node src/cli.js laporan-bulan' },
  ],
};

// ══════════════════════════════════════════════════════════════
// COMMAND: setup
// ══════════════════════════════════════════════════════════════
function cmdSetup() {
  console.log('\n🌱 KBK AgroStore — Inisialisasi Sistem\n');
  fs.mkdirSync(DATA, { recursive: true });
  fs.mkdirSync(BACKUPS, { recursive: true });

  let created = 0, skipped = 0;

  function initFile(file, seed, label) {
    if (!fs.existsSync(file)) {
      writeJSON(file, seed);
      console.log(`  ✅ Dibuat: ${label}`);
      created++;
    } else {
      console.log(`  ⏩ Sudah ada: ${label}`);
      skipped++;
    }
  }

  initFile(FILE.products,     SEED_PRODUCTS,     'products.json (6 SKU)');
  initFile(FILE.inventory,    SEED_INVENTORY,    'inventory.json (5 zona)');
  initFile(FILE.transactions, SEED_TRANSACTIONS, 'transactions.json');
  initFile(FILE.orders,       SEED_ORDERS,       'orders.json');
  initFile(FILE.research,     SEED_RESEARCH,     'market-research.json');
  initFile(FILE.checklist,    SEED_CHECKLIST,    'checklist.json');

  // Init stok ke 0 jika inventory baru
  const inv = readJSON(FILE.inventory);
  const prods = readJSON(FILE.products);
  if (inv && prods && Object.keys(inv.stok).length === 0) {
    prods.forEach(p => { inv.stok[p.sku] = 0; });
    inv.last_updated = nowTs();
    writeJSON(FILE.inventory, inv);
    console.log('  ✅ Stok awal diset ke 0 untuk semua SKU');
  }

  console.log(`\n📁 Data tersimpan di: ${DATA}`);
  console.log(`\n✅ KBK AgroStore aktif. 6 SKU terdaftar.\n`);
  console.log('════════════════════════════════════════');
  cmdBantuan(true);
}

// ══════════════════════════════════════════════════════════════
// COMMAND: bantuan
// ══════════════════════════════════════════════════════════════
function cmdBantuan(short = false) {
  if (!short) console.log('\n📖 KBK AgroStore — Daftar Perintah\n');
  const cmds = [
    ['setup',          'Init sistem + buat semua file JSON'],
    ['bantuan',        'Tampilkan semua perintah ini'],
    ['produk',         'Katalog + HPP + margin semua SKU'],
    ['update-hpp',     'Update komponen HPP interaktif'],
    ['stok',           'Lihat stok gudang semua zona'],
    ['stok-masuk',     'Catat bahan/produk masuk (interaktif)'],
    ['stok-keluar',    'Catat keluar internal (pakai sendiri)'],
    ['proses',         'Catat konversi produksi (SM→SB, dll)'],
    ['jual',           'Catat penjualan + hitung laba otomatis'],
    ['pesanan',        'Lihat pesanan aktif Shopee'],
    ['shopee-order',   'Input pesanan masuk dari Shopee'],
    ['shopee-listing', 'Generate judul+deskripsi listing Shopee'],
    ['shopee-chat',    'Tampilkan 5 template auto-reply chat'],
    ['riset',          'Lihat data harga marketplace'],
    ['laporan',        'Ringkasan transaksi hari ini'],
    ['laporan-bulan',  'Laba/rugi + breakdown per produk'],
    ['export',         'Export semua transaksi ke CSV'],
    ['checklist',      'Daily checklist operasional gudang'],
    ['backup',         'Backup semua JSON ke folder backups/'],
  ];
  cmds.forEach(([cmd, desc]) => {
    console.log(`  node src/cli.js ${cmd.padEnd(16)} → ${desc}`);
  });
  if (!short) console.log('\n💡 Prinsip: "Pelan. Sabar. Mantap. Bismillah..."\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: produk
// ══════════════════════════════════════════════════════════════
function cmdProduk() {
  const prods = readJSON(FILE.products);
  if (!prods || prods.length === 0) {
    console.log('\n⚠️  Data produk kosong. Jalankan: node src/cli.js setup\n');
    return;
  }

  console.log('\n🌿 KBK AgroStore — Katalog Produk & Analisis HPP\n');
  console.log('═'.repeat(70));

  prods.forEach((p, i) => {
    const hpp = calcHPP(p.hpp_components);
    const laba = p.harga_jual - hpp;
    const margin = ((laba / p.harga_jual) * 100).toFixed(1);
    const markupPct = hpp > 0 ? ((laba / hpp) * 100).toFixed(1) : 0;

    console.log(`\n${i + 1}. [${p.sku}] ${p.nama}`);
    console.log(`   Satuan    : per ${p.satuan}  |  Berat bersih: ${p.berat_bersih_kg} kg`);
    console.log(`   Harga Jual: ${rp(p.harga_jual)}`);
    console.log(`   HPP Total : ${rp(hpp)}`);
    console.log(`   Laba/unit : ${rp(laba)}  (margin ${margin}%, markup ${markupPct}%)`);
    console.log('   Komponen HPP:');
    Object.entries(p.hpp_components).forEach(([k, v]) => {
      console.log(`     • ${k.replace(/_/g, ' ').padEnd(15)}: ${rp(v)}`);
    });
    if (p.catatan) console.log(`   ⚠️  ${p.catatan}`);
    console.log('   ' + '─'.repeat(65));
  });

  // Ringkasan
  const totalSkus = prods.length;
  const avgMargin = (prods.reduce((s, p) => {
    const hpp = calcHPP(p.hpp_components);
    return s + ((p.harga_jual - hpp) / p.harga_jual) * 100;
  }, 0) / totalSkus).toFixed(1);

  console.log(`\n📊 Total SKU: ${totalSkus}  |  Rata-rata margin: ${avgMargin}%`);
  console.log('💡 Gunakan: node src/cli.js update-hpp → untuk edit komponen HPP\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: update-hpp (interaktif)
// ══════════════════════════════════════════════════════════════
async function cmdUpdateHPP() {
  const prods = readJSON(FILE.products);
  if (!prods) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const rl = createRL();
  console.log('\n🔧 Update HPP — Pilih SKU:\n');
  prods.forEach((p, i) => {
    const hpp = calcHPP(p.hpp_components);
    console.log(`  ${i + 1}. [${p.sku}] ${p.nama} — HPP: ${rp(hpp)}, Jual: ${rp(p.harga_jual)}`);
  });

  const pilihan = await prompt(rl, '\nNomor SKU (atau 0 untuk batal): ');
  const idx = parseInt(pilihan) - 1;
  if (isNaN(idx) || idx < 0 || idx >= prods.length) {
    console.log('Dibatalkan.\n');
    rl.close(); return;
  }

  const p = prods[idx];
  console.log(`\n📦 ${p.nama} [${p.sku}]`);
  console.log('Komponen HPP saat ini:');
  Object.entries(p.hpp_components).forEach(([k, v]) => {
    console.log(`  ${k}: ${rp(v)}`);
  });

  console.log('\nMasukkan nilai baru (Enter = tidak berubah):');
  for (const k of Object.keys(p.hpp_components)) {
    const inp = await prompt(rl, `  ${k} [${rp(p.hpp_components[k])}]: `);
    if (inp.trim() !== '' && !isNaN(Number(inp))) {
      p.hpp_components[k] = Number(inp);
    }
  }

  const hargaInp = await prompt(rl, `\nHarga jual [${rp(p.harga_jual)}]: `);
  if (hargaInp.trim() !== '' && !isNaN(Number(hargaInp))) {
    p.harga_jual = Number(hargaInp);
  }

  const newHPP = calcHPP(p.hpp_components);
  const newLaba = p.harga_jual - newHPP;
  const newMargin = ((newLaba / p.harga_jual) * 100).toFixed(1);

  console.log(`\n✅ Update preview:`);
  console.log(`   HPP baru   : ${rp(newHPP)}`);
  console.log(`   Harga jual : ${rp(p.harga_jual)}`);
  console.log(`   Laba/unit  : ${rp(newLaba)} (${newMargin}%)`);

  const konfirm = await prompt(rl, '\nSimpan? (y/n): ');
  if (konfirm.toLowerCase() === 'y') {
    prods[idx] = p;
    writeJSON(FILE.products, prods);
    console.log('✅ HPP tersimpan.\n');
  } else {
    console.log('Dibatalkan.\n');
  }
  rl.close();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: stok
// ══════════════════════════════════════════════════════════════
function cmdStok() {
  const inv = readJSON(FILE.inventory);
  const prods = readJSON(FILE.products);
  if (!inv) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  console.log('\n🏚  KBK AgroStore — Stok Gudang\n');
  console.log(`📍 ${inv.gudang.nama}`);
  console.log(`   ${inv.gudang.alamat}\n`);

  // Tabel stok per SKU
  console.log('┌─────────────┬────────────────────────────┬────────┬───────┐');
  console.log('│ SKU         │ Nama Produk                 │ Satuan │ Stok  │');
  console.log('├─────────────┼────────────────────────────┼────────┼───────┤');

  const prodMap = {};
  if (prods) prods.forEach(p => { prodMap[p.sku] = p; });

  let adaStok = false;
  Object.entries(inv.stok).forEach(([sku, qty]) => {
    const p = prodMap[sku];
    const nama = p ? p.nama.slice(0, 28).padEnd(28) : sku.padEnd(28);
    const sat = p ? p.satuan.padEnd(6) : '?'.padEnd(6);
    const stokStr = String(qty).padStart(5);
    const warn = qty <= 0 ? ' ⚠️' : qty <= 5 ? ' 📉' : '';
    console.log(`│ ${sku.padEnd(11)} │ ${nama} │ ${sat} │ ${stokStr}${warn.padEnd(2)} │`);
    if (qty > 0) adaStok = true;
  });
  console.log('└─────────────┴────────────────────────────┴────────┴───────┘');

  if (!adaStok) console.log('\n  💡 Stok masih 0. Gunakan: node src/cli.js stok-masuk\n');

  // Tampilkan zona
  console.log('\n📦 Zona Gudang:');
  Object.entries(inv.zona).forEach(([z, data]) => {
    const items = data.items && data.items.length ? data.items.join(', ') : '(kosong)';
    console.log(`  Zona ${z}: ${data.nama}`);
    console.log(`         Items: ${items}`);
  });

  if (inv.last_updated) {
    console.log(`\n🕐 Terakhir update: ${fmtDate(inv.last_updated)}`);
  }
  console.log();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: stok-masuk (interaktif)
// ══════════════════════════════════════════════════════════════
async function cmdStokMasuk() {
  const inv = readJSON(FILE.inventory);
  const prods = readJSON(FILE.products);
  if (!inv || !prods) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const rl = createRL();
  console.log('\n📥 Catat Stok Masuk\n');

  console.log('Pilih produk:');
  prods.forEach((p, i) => {
    const stok = inv.stok[p.sku] || 0;
    console.log(`  ${i + 1}. [${p.sku}] ${p.nama} — Stok: ${stok} ${p.satuan}`);
  });

  const pilihan = await prompt(rl, '\nNomor (atau 0 batal): ');
  const idx = parseInt(pilihan) - 1;
  if (isNaN(idx) || idx < 0 || idx >= prods.length) {
    console.log('Dibatalkan.\n'); rl.close(); return;
  }

  const p = prods[idx];
  const jumlahStr = await prompt(rl, `Jumlah masuk (${p.satuan}): `);
  const jumlah = Number(jumlahStr);
  if (isNaN(jumlah) || jumlah <= 0) {
    console.log('Jumlah tidak valid.\n'); rl.close(); return;
  }

  const sumber = await prompt(rl, 'Sumber/keterangan (Enter = "-"): ') || '-';
  const zona = await prompt(rl, 'Zona simpan (A/B/C/D/E, Enter = D): ') || 'D';

  inv.stok[p.sku] = (inv.stok[p.sku] || 0) + jumlah;
  inv.last_updated = nowTs();

  // Tambah ke zona items jika belum ada
  const zonaUpper = zona.toUpperCase();
  if (inv.zona[zonaUpper] && !inv.zona[zonaUpper].items.includes(p.sku)) {
    inv.zona[zonaUpper].items.push(p.sku);
  }

  writeJSON(FILE.inventory, inv);

  // Catat transaksi
  const tx = readJSON(FILE.transactions) || [];
  tx.push({
    id: 'TXN-' + Date.now(),
    tipe: 'MASUK',
    tanggal: today(),
    ts: nowTs(),
    sku: p.sku,
    nama: p.nama,
    jumlah,
    satuan: p.satuan,
    sumber,
    zona: zonaUpper,
    stok_setelah: inv.stok[p.sku],
  });
  writeJSON(FILE.transactions, tx);

  console.log(`\n✅ Stok masuk dicatat:`);
  console.log(`   ${p.nama}: +${jumlah} ${p.satuan}`);
  console.log(`   Stok sekarang: ${inv.stok[p.sku]} ${p.satuan}`);
  console.log(`   Zona: ${zonaUpper}\n`);
  rl.close();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: stok-keluar (interaktif)
// ══════════════════════════════════════════════════════════════
async function cmdStokKeluar() {
  const inv = readJSON(FILE.inventory);
  const prods = readJSON(FILE.products);
  if (!inv || !prods) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const rl = createRL();
  console.log('\n📤 Catat Stok Keluar (Pakai Sendiri / Internal)\n');

  console.log('Pilih produk:');
  prods.forEach((p, i) => {
    const stok = inv.stok[p.sku] || 0;
    console.log(`  ${i + 1}. [${p.sku}] ${p.nama} — Stok: ${stok} ${p.satuan}`);
  });

  const pilihan = await prompt(rl, '\nNomor (atau 0 batal): ');
  const idx = parseInt(pilihan) - 1;
  if (isNaN(idx) || idx < 0 || idx >= prods.length) {
    console.log('Dibatalkan.\n'); rl.close(); return;
  }

  const p = prods[idx];
  const stokAwal = inv.stok[p.sku] || 0;
  const jumlahStr = await prompt(rl, `Jumlah keluar (stok: ${stokAwal} ${p.satuan}): `);
  const jumlah = Number(jumlahStr);
  if (isNaN(jumlah) || jumlah <= 0) {
    console.log('Jumlah tidak valid.\n'); rl.close(); return;
  }
  if (jumlah > stokAwal) {
    console.log(`⚠️  Stok tidak cukup! Tersedia: ${stokAwal}\n`); rl.close(); return;
  }

  const keterangan = await prompt(rl, 'Keterangan (pakai sendiri/rusak/dll): ') || 'pemakaian internal';

  inv.stok[p.sku] = stokAwal - jumlah;
  inv.last_updated = nowTs();
  writeJSON(FILE.inventory, inv);

  const tx = readJSON(FILE.transactions) || [];
  tx.push({
    id: 'TXN-' + Date.now(),
    tipe: 'KELUAR-INTERNAL',
    tanggal: today(),
    ts: nowTs(),
    sku: p.sku,
    nama: p.nama,
    jumlah,
    satuan: p.satuan,
    keterangan,
    stok_setelah: inv.stok[p.sku],
  });
  writeJSON(FILE.transactions, tx);

  console.log(`\n✅ Stok keluar dicatat:`);
  console.log(`   ${p.nama}: -${jumlah} ${p.satuan}`);
  console.log(`   Stok sekarang: ${inv.stok[p.sku]} ${p.satuan}\n`);
  rl.close();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: proses (konversi produksi)
// ══════════════════════════════════════════════════════════════
async function cmdProses() {
  const inv = readJSON(FILE.inventory);
  const prods = readJSON(FILE.products);
  if (!inv || !prods) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const rl = createRL();
  console.log('\n⚙️  Catat Konversi Produksi\n');
  console.log('Contoh: SM (Sekam Mentah) → SB (Sekam Bakar)');
  console.log('        KKM (Kohe Mentah) → KKF1 (Kohe Fermentasi 1kg)\n');

  console.log('Bahan Baku (produk MASUK ke proses):');
  prods.forEach((p, i) => {
    const stok = inv.stok[p.sku] || 0;
    console.log(`  ${i + 1}. [${p.sku}] ${p.nama} — Stok: ${stok} ${p.satuan}`);
  });

  const idxBahanStr = await prompt(rl, '\nNomor bahan baku (0 batal): ');
  const idxBahan = parseInt(idxBahanStr) - 1;
  if (isNaN(idxBahan) || idxBahan < 0 || idxBahan >= prods.length) {
    console.log('Dibatalkan.\n'); rl.close(); return;
  }
  const bahan = prods[idxBahan];
  const jmlBahanStr = await prompt(rl, `Jumlah ${bahan.satuan} bahan baku yang diproses: `);
  const jmlBahan = Number(jmlBahanStr);
  if (isNaN(jmlBahan) || jmlBahan <= 0 || jmlBahan > (inv.stok[bahan.sku] || 0)) {
    console.log('Jumlah tidak valid atau stok kurang.\n'); rl.close(); return;
  }

  console.log('\nHasil Produksi (produk yang DIHASILKAN):');
  prods.forEach((p, i) => console.log(`  ${i + 1}. [${p.sku}] ${p.nama}`));

  const idxHasilStr = await prompt(rl, '\nNomor produk hasil: ');
  const idxHasil = parseInt(idxHasilStr) - 1;
  if (isNaN(idxHasil) || idxHasil < 0 || idxHasil >= prods.length) {
    console.log('Dibatalkan.\n'); rl.close(); return;
  }
  const hasil = prods[idxHasil];
  const jmlHasilStr = await prompt(rl, `Jumlah ${hasil.satuan} yang dihasilkan: `);
  const jmlHasil = Number(jmlHasilStr);
  if (isNaN(jmlHasil) || jmlHasil <= 0) {
    console.log('Jumlah tidak valid.\n'); rl.close(); return;
  }

  const catatan = await prompt(rl, 'Catatan proses (Enter = "-"): ') || '-';

  // Update stok
  inv.stok[bahan.sku] = (inv.stok[bahan.sku] || 0) - jmlBahan;
  inv.stok[hasil.sku] = (inv.stok[hasil.sku] || 0) + jmlHasil;
  inv.last_updated = nowTs();
  writeJSON(FILE.inventory, inv);

  // Catat transaksi
  const tx = readJSON(FILE.transactions) || [];
  const txId = 'PROC-' + Date.now();
  tx.push({
    id: txId,
    tipe: 'PROSES',
    tanggal: today(),
    ts: nowTs(),
    bahan_baku: { sku: bahan.sku, nama: bahan.nama, jumlah: jmlBahan, satuan: bahan.satuan },
    hasil_produksi: { sku: hasil.sku, nama: hasil.nama, jumlah: jmlHasil, satuan: hasil.satuan },
    catatan,
  });
  writeJSON(FILE.transactions, tx);

  console.log(`\n✅ Proses produksi dicatat:`);
  console.log(`   Bahan baku : ${bahan.nama} -${jmlBahan} ${bahan.satuan} → stok: ${inv.stok[bahan.sku]}`);
  console.log(`   Hasil      : ${hasil.nama} +${jmlHasil} ${hasil.satuan} → stok: ${inv.stok[hasil.sku]}\n`);
  rl.close();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: jual (catat penjualan)
// ══════════════════════════════════════════════════════════════
async function cmdJual() {
  const inv = readJSON(FILE.inventory);
  const prods = readJSON(FILE.products);
  if (!inv || !prods) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const rl = createRL();
  console.log('\n💰 Catat Penjualan\n');

  prods.forEach((p, i) => {
    const hpp = calcHPP(p.hpp_components);
    const stok = inv.stok[p.sku] || 0;
    console.log(`  ${i + 1}. [${p.sku}] ${p.nama} | Jual: ${rp(p.harga_jual)} | HPP: ${rp(hpp)} | Stok: ${stok}`);
  });

  const pilihan = await prompt(rl, '\nNomor produk (0 batal): ');
  const idx = parseInt(pilihan) - 1;
  if (isNaN(idx) || idx < 0 || idx >= prods.length) {
    console.log('Dibatalkan.\n'); rl.close(); return;
  }

  const p = prods[idx];
  const stokAda = inv.stok[p.sku] || 0;
  const jmlStr = await prompt(rl, `Jumlah terjual (stok: ${stokAda} ${p.satuan}): `);
  const jumlah = Number(jmlStr);
  if (isNaN(jumlah) || jumlah <= 0) {
    console.log('Jumlah tidak valid.\n'); rl.close(); return;
  }
  if (jumlah > stokAda) {
    console.log(`⚠️  Stok tidak cukup! Tersedia: ${stokAda}\n`); rl.close(); return;
  }

  const hargaInput = await prompt(rl, `Harga jual/unit [${rp(p.harga_jual)}]: `);
  const hargaJual = hargaInput.trim() && !isNaN(Number(hargaInput)) ? Number(hargaInput) : p.harga_jual;

  const channel = await prompt(rl, 'Channel penjualan (Shopee/Offline/WA, Enter=Shopee): ') || 'Shopee';
  const pembeli = await prompt(rl, 'Nama pembeli/ID Shopee (Enter = "-"): ') || '-';

  const hpp = calcHPP(p.hpp_components);
  const totalPendapatan = hargaJual * jumlah;
  const totalHPP = hpp * jumlah;
  const labaKotor = totalPendapatan - totalHPP;
  const marginPct = ((labaKotor / totalPendapatan) * 100).toFixed(1);

  // Update stok
  inv.stok[p.sku] = stokAda - jumlah;
  inv.last_updated = nowTs();
  writeJSON(FILE.inventory, inv);

  // Catat transaksi
  const tx = readJSON(FILE.transactions) || [];
  const txId = 'JUAL-' + Date.now();
  tx.push({
    id: txId,
    tipe: 'PENJUALAN',
    tanggal: today(),
    ts: nowTs(),
    sku: p.sku,
    nama: p.nama,
    jumlah,
    satuan: p.satuan,
    harga_jual: hargaJual,
    hpp_per_unit: hpp,
    total_pendapatan: totalPendapatan,
    total_hpp: totalHPP,
    laba_kotor: labaKotor,
    margin_pct: Number(marginPct),
    channel,
    pembeli,
    stok_setelah: inv.stok[p.sku],
  });
  writeJSON(FILE.transactions, tx);

  console.log(`\n✅ Penjualan dicatat!`);
  console.log('─'.repeat(45));
  console.log(`  Produk     : ${p.nama}`);
  console.log(`  Jumlah     : ${jumlah} ${p.satuan}`);
  console.log(`  Harga/unit : ${rp(hargaJual)}`);
  console.log(`  Total      : ${rp(totalPendapatan)}`);
  console.log(`  HPP total  : ${rp(totalHPP)}`);
  console.log(`  Laba kotor : ${rp(labaKotor)} (${marginPct}%)`);
  console.log(`  Channel    : ${channel}`);
  console.log(`  Stok sisa  : ${inv.stok[p.sku]} ${p.satuan}`);
  console.log('─'.repeat(45) + '\n');
  rl.close();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: pesanan
// ══════════════════════════════════════════════════════════════
function cmdPesanan() {
  const orders = readJSON(FILE.orders) || [];
  console.log('\n📦 Pesanan Aktif Shopee\n');

  const aktif = orders.filter(o => o.status !== 'SELESAI' && o.status !== 'BATAL');
  if (aktif.length === 0) {
    console.log('  Tidak ada pesanan aktif.\n');
    console.log('  💡 Input pesanan baru: node src/cli.js shopee-order\n');
    return;
  }

  aktif.forEach((o, i) => {
    const statusIcon = { 'BARU': '🆕', 'DIPROSES': '⚙️', 'DIKIRIM': '🚚', 'SELESAI': '✅', 'BATAL': '❌' }[o.status] || '📋';
    console.log(`${i + 1}. ${statusIcon} [${o.id_shopee}] ${o.nama_pembeli}`);
    console.log(`   ${o.produk_nama} x${o.jumlah} — ${rp(o.total)}`);
    console.log(`   Status: ${o.status} | Tgl: ${o.tanggal}`);
    if (o.catatan) console.log(`   Catatan: ${o.catatan}`);
    console.log();
  });

  const totalNilai = aktif.reduce((s, o) => s + (o.total || 0), 0);
  console.log(`📊 Total ${aktif.length} pesanan aktif | Nilai: ${rp(totalNilai)}\n`);
}

// ══════════════════════════════════════════════════════════════
// COMMAND: shopee-order (input pesanan)
// ══════════════════════════════════════════════════════════════
async function cmdShopeeOrder() {
  const prods = readJSON(FILE.products);
  const inv = readJSON(FILE.inventory);
  if (!prods || !inv) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const rl = createRL();
  console.log('\n🛒 Input Pesanan Shopee\n');

  prods.forEach((p, i) => {
    const stok = inv.stok[p.sku] || 0;
    console.log(`  ${i + 1}. [${p.sku}] ${p.nama} — Stok: ${stok} | ${rp(p.harga_jual)}`);
  });

  const pilihan = await prompt(rl, '\nNomor produk (0 batal): ');
  const idx = parseInt(pilihan) - 1;
  if (isNaN(idx) || idx < 0 || idx >= prods.length) {
    console.log('Dibatalkan.\n'); rl.close(); return;
  }

  const p = prods[idx];
  const jumlahStr = await prompt(rl, `Jumlah (${p.satuan}): `);
  const jumlah = Number(jumlahStr);
  if (isNaN(jumlah) || jumlah <= 0) {
    console.log('Tidak valid.\n'); rl.close(); return;
  }

  const idShopee = await prompt(rl, 'ID Pesanan Shopee: ') || 'ORD-' + Date.now();
  const namaPembeli = await prompt(rl, 'Nama pembeli: ') || 'Anonim';
  const alamat = await prompt(rl, 'Kota tujuan: ') || '-';
  const catatan = await prompt(rl, 'Catatan (Enter = "-"): ') || '-';

  const total = p.harga_jual * jumlah;
  const hpp = calcHPP(p.hpp_components) * jumlah;
  const laba = total - hpp;

  const orders = readJSON(FILE.orders) || [];
  orders.push({
    id: 'ORD-' + Date.now(),
    id_shopee: idShopee,
    tanggal: today(),
    ts: nowTs(),
    sku: p.sku,
    produk_nama: p.nama,
    jumlah,
    satuan: p.satuan,
    harga_satuan: p.harga_jual,
    total,
    hpp_total: hpp,
    laba_estimasi: laba,
    nama_pembeli: namaPembeli,
    kota_tujuan: alamat,
    catatan,
    status: 'BARU',
  });
  writeJSON(FILE.orders, orders);

  console.log(`\n✅ Pesanan dicatat!`);
  console.log(`   ${p.nama} x${jumlah} → ${rp(total)}`);
  console.log(`   Pembeli: ${namaPembeli} | Tujuan: ${alamat}`);
  console.log(`   Status: BARU | ID: ${idShopee}\n`);
  console.log('💡 Setelah packing, update status dengan: node src/cli.js jual\n');
  rl.close();
}

// ══════════════════════════════════════════════════════════════
// COMMAND: shopee-listing
// ══════════════════════════════════════════════════════════════
function cmdShopeeListing() {
  console.log('\n🏪 KBK AgroStore — Listing Shopee\n');
  console.log('Salin teks di bawah ke Shopee Seller Center:\n');
  console.log('═'.repeat(65));

  const listings = [
    {
      sku: 'KBK-SM',
      judul: '🌾 Sekam Padi Mentah 1 Karung | Media Tanam Organik | KBK Kendal',
      deskripsi: `🌿 SEKAM PADI MENTAH SEGAR — KBK AgroEduLabs Kendal

✅ Segar dari RMU Cepiring langsung
✅ Bersih, kering, bebas kotoran berlebih
✅ Cocok untuk media tanam, campuran tanah, mulsa

📦 ISI 1 KARUNG ± 15 kg (volume ±50 liter)
⚠️ Sekam sangat ringan! Volume besar tapi ringan — ongkir dihitung per kg

🌱 KANDUNGAN & MANFAAT:
• Memperbaiki aerasi & drainase tanah
• Menambah bahan organik ke tanah
• Media tanam untuk cangkok & stek
• Bahan baku pembuatan arang sekam

💧 CARA PAKAI:
• Media tanam: campurkan 30-40% sekam ke tanah
• Bisa dibakar sendiri jadi arang sekam
• Sebarkan sebagai mulsa di sekitar tanaman

📍 Dikirim dari Cepiring, Kendal, Jawa Tengah
Ekspedisi: J&T, JNE, SiCepat

#sekam #sekamdadi #mediatanam #pertanianorganik #pupukorganik #kendal #jawatengah`,
    },
    {
      sku: 'KBK-SB',
      judul: '🔥 Arang Sekam / Sekam Bakar 1 Karung | Steril Siap Pakai | KBK Kendal',
      deskripsi: `🌿 ARANG SEKAM / SEKAM BAKAR — KBK AgroEduLabs Kendal

✅ Dibakar secara terkontrol — warna hitam merata
✅ Steril, bebas hama & patogen
✅ pH netral, ramah akar tanaman
✅ Penyerapan air & udara optimal

📦 ISI 1 KARUNG ± 8 kg (volume ±40 liter)
⚠️ Arang sekam lebih ringan dari sekam mentah!

🌱 KANDUNGAN & MANFAAT:
• Memperbaiki struktur & aerasi tanah
• Menyerap kelebihan air, mencegah busuk akar
• Mengandung silika & karbon aktif
• pH media tanam lebih stabil

💧 CARA PAKAI:
• Campurkan 20-40% ke media tanam/potting mix
• Ideal untuk anggrek, adenium, sukulen, sayuran
• Komposisi KBK: 40% arang sekam + 40% kohe + 20% tanah

📍 Dikirim dari Cepiring, Kendal, Jawa Tengah

#arangsekam #sekamarang #sekambakar #mediatanam #organik #kendal`,
    },
    {
      sku: 'KBK-KK-F1',
      judul: '🐐 Pupuk Kandang Kambing Fermentasi EM4 1kg | Matang Siap Pakai | KBK Kendal',
      deskripsi: `🌿 KOHE KAMBING FERMENTASI EM4 — KBK AgroEduLabs Kendal

✅ Fermentasi 21 hari dengan EM4 probiotik
✅ Matang sempurna — tidak panas, tidak bau menyengat
✅ Kaya NPK organik + mikroorganisme baik
✅ Kambing lokal Botomulyo, pakan alami

📦 ISI 1 PACK ZIPLOCK RAPAT ± 1 kg

🌱 KANDUNGAN & MANFAAT:
• N (Nitrogen): menyuburkan daun, hijau segar
• P (Fosfor): merangsang akar & bunga
• K (Kalium): memperkuat batang & buah
• Mikroba EM4: memperbaiki struktur tanah jangka panjang

💧 CARA PAKAI & DOSIS:
• Pot kecil (<20cm): 2-3 sendok makan/minggu
• Pot besar (>30cm): 1-2 genggam/minggu
• Bedengan/kebun: 2-3 kg per m² per musim tanam
• Larutkan dengan air (1:10) untuk pupuk cair

📍 Dikirim dari Cepiring, Kendal, Jawa Tengah

#pupukkandang #kohekambing #pupukorganik #fermentasiem4 #berkebun`,
    },
    {
      sku: 'KBK-KK-F5',
      judul: '🐐 Pupuk Kandang Kambing Fermentasi EM4 5kg | Ekonomis | KBK Kendal',
      deskripsi: `🌿 KOHE KAMBING FERMENTASI EM4 EKONOMIS — KBK AgroEduLabs Kendal

✅ Fermentasi EM4 — matang, tidak bau
✅ Kemasan 5kg — lebih hemat untuk kebun luas
✅ Cocok untuk urban farming, sayuran, buah-buahan

📦 ISI 1 PACK KARUNG MINI ± 5 kg

💧 DOSIS:
• Sayuran: 2-3 kg per m²
• Tanaman buah: 3-5 kg per pohon
• Campuran media tanam: 40% kohe + 40% arang sekam + 20% tanah

📍 Dikirim dari Cepiring, Kendal, Jawa Tengah

#pupukkandang #kohekambing #pupukorganik #5kg #hemat`,
    },
    {
      sku: 'KBK-MT5',
      judul: '🌱 Media Tanam Komplit 5kg | Arang Sekam+Kohe+Tanah | Siap Pakai | KBK Kendal',
      deskripsi: `🌿 MEDIA TANAM KOMPLIT SIAP PAKAI — KBK AgroEduLabs Kendal

✅ Formula KBK: 40% arang sekam + 40% kohe kambing fermentasi + 20% top soil pilihan
✅ Gembur, subur, drainase optimal
✅ pH ideal 6-7, siap langsung tanam
✅ Tidak perlu tambah pupuk 1-2 bulan pertama

📦 ISI 1 PACK ± 5 kg

🌱 COCOK UNTUK:
• Sayuran daun (kangkung, bayam, pakcoy, selada)
• Buah dalam pot (cabe, tomat, terong)
• Tanaman hias (aglaonema, monstera, dll)
• Penyemaian benih

💧 CARA PAKAI:
• Langsung masukkan ke pot/polybag
• Siram merata sebelum tanam
• Semprot EM4 (1ml/L) setiap 2 minggu

📍 Produk hasil olahan sendiri KBK AgroEduLabs
📍 Dikirim dari Cepiring, Kendal, Jawa Tengah

#mediatanam #mediatanamkomplit #organik #berkebun #urbangarden`,
    },
  ];

  listings.forEach((l, i) => {
    const prods = readJSON(FILE.products) || [];
    const prod = prods.find(p => p.sku === l.sku);
    const hpp = prod ? calcHPP(prod.hpp_components) : 0;
    const harga = prod ? prod.harga_jual : 0;

    console.log(`\n📌 ${i + 1}. [${l.sku}]`);
    console.log(`\nJUDUL (copy ke Shopee):`);
    console.log(`${l.judul}`);
    console.log(`\nHARGA: ${rp(harga)} | HPP: ${rp(hpp)} | Margin: ${pct(harga - hpp, harga)}`);
    console.log(`\nDESKRIPSI:`);
    console.log(l.deskripsi);
    console.log('\n' + '═'.repeat(65));
  });

  console.log('\n✅ 5 listing siap. Sisa 1 SKU (KBK-KK-M) untuk penjualan offline/grosir.\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: shopee-chat (template auto-reply)
// ══════════════════════════════════════════════════════════════
function cmdShopeeChat() {
  console.log('\n💬 KBK AgroStore — Template Auto-Reply Chat Shopee\n');
  console.log('Salin sesuai kebutuhan:\n');

  const templates = [
    {
      kode: 'T1',
      judul: 'Sapaan & Stok Ready',
      teks: `Halo Kak! 😊 Terima kasih sudah mampir ke KBK AgroStore!

Produk kami ready stok:
🌾 Sekam Mentah — Rp 15.000/karung
🔥 Arang Sekam — Rp 22.000/karung
🐐 Kohe Fermentasi 1kg — Rp 10.000/pack
🐐 Kohe Fermentasi 5kg — Rp 40.000/pack
🌱 Media Tanam Komplit 5kg — Rp 28.000/pack

Semua produk organik alami dari Kendal, Jawa Tengah 🌿
Mau tanya apa Kak? Kami siap bantu!`,
    },
    {
      kode: 'T2',
      judul: 'Info Ongkir & Pengiriman',
      teks: `Halo Kak! 📦

Info pengiriman dari Cepiring, Kendal, Jateng:
🚚 Ekspedisi: J&T, JNE, SiCepat (sesuai pilihan Shopee)
📅 Proses kirim: 1-2 hari kerja setelah pembayaran
📦 Packing: rapat & aman, karung dijahit atau di-wrap plastik

⚠️ PERHATIAN ONGKIR:
Sekam & arang sekam sangat RINGAN tapi BERVOLUME BESAR.
Berat aktual karung ±8-15 kg, tapi ukuran besar.
Beberapa ekspedisi kenakan biaya volumetrik — mohon cek di app Shopee ya Kak 🙏

Kalau lokasi Kak dekat Kendal/Semarang bisa COD atau ambil langsung!`,
    },
    {
      kode: 'T3',
      judul: 'Cara Pakai Semua Produk',
      teks: `Halo Kak! 🌱 Panduan pemakaian produk KBK:

🌾 SEKAM MENTAH:
→ Campurkan 30-40% ke tanah pot/kebun
→ Bisa dijadikan mulsa di sekitar tanaman

🔥 ARANG SEKAM:
→ Campurkan 20-40% ke media tanam
→ Ideal untuk anggrek, adenium, sayuran
→ Menyerap air berlebih, cegah busuk akar

🐐 KOHE FERMENTASI:
→ Pot kecil: 2-3 sdm/minggu
→ Pot besar: 1-2 genggam/minggu
→ Kebun: 2-3 kg/m²
→ Bisa dilarutkan jadi pupuk cair 1:10 dengan air

🌱 MEDIA TANAM KOMPLIT:
→ Langsung masuk pot/polybag, siram, tanam!
→ Tidak perlu tambah pupuk 1-2 bulan pertama

Ada pertanyaan lain Kak? 😊`,
    },
    {
      kode: 'T4',
      judul: 'Penanganan Komplain',
      teks: `Halo Kak, mohon maaf atas ketidaknyamanannya 🙏

Kami sangat ingin menyelesaikan ini dengan baik.
Boleh ceritakan kendala yang Kakak alami?

Jika ada masalah dengan:
📦 Kondisi produk → Foto & kirim ke chat ini
⚖️ Berat kurang → Foto timbangan & struk ongkir
🚚 Pengiriman telat → Nomor resi akan kami cek

Kami berkomitmen melayani dengan jujur & bertanggung jawab.
Insya Allah kami carikan solusi terbaik Kak 🤝`,
    },
    {
      kode: 'T5',
      judul: 'Penawaran Grosir / Bulk',
      teks: `Halo Kak! 🌾 Tertarik pembelian grosir?

Harga khusus bulk KBK AgroStore:
Min. pembelian 10 karung/pack → diskon 5%
Min. pembelian 20+ karung/pack → diskon 10%
Min. pembelian 50+ karung/pack → hubungi kami untuk harga spesial

Untuk Kendal & sekitarnya:
🚗 Bisa antar langsung dari Botomulyo, Cepiring
📞 Konsultasi gratis untuk kebutuhan pertanian organik

Kami juga melayani:
✅ Petani & kelompok tani
✅ Nursery & toko pertanian
✅ Komunitas urban farming

WhatsApp/chat untuk info lebih lanjut ya Kak! 🙏`,
    },
  ];

  templates.forEach(t => {
    console.log(`${'─'.repeat(60)}`);
    console.log(`📝 [${t.kode}] ${t.judul}`);
    console.log(`${'─'.repeat(60)}`);
    console.log(t.teks);
    console.log();
  });
}

// ══════════════════════════════════════════════════════════════
// COMMAND: riset
// ══════════════════════════════════════════════════════════════
function cmdRiset() {
  const data = readJSON(FILE.research);
  const prods = readJSON(FILE.products);
  if (!data) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  console.log('\n📊 Riset Harga Marketplace\n');
  console.log(`📅 Data per: ${data.updated}`);
  if (data.peringatan) console.log(`⚠️  ${data.peringatan}\n`);

  Object.entries(data.data).forEach(([sku, info]) => {
    const prod = prods ? prods.find(p => p.sku === sku) : null;
    const hargaKbk = prod ? prod.harga_jual : 0;
    const hpp = prod ? calcHPP(prod.hpp_components) : 0;

    console.log(`\n🔸 ${info.produk} [${sku}]`);
    console.log(`   KBK AgroStore: ${rp(hargaKbk)} | HPP: ${rp(hpp)} | Margin: ${pct(hargaKbk - hpp, hargaKbk)}`);
    console.log('   Kompetitor:');

    const hargaList = info.harga_kompetitor.map(k => k.harga);
    const minH = Math.min(...hargaList);
    const maxH = Math.max(...hargaList);

    info.harga_kompetitor.forEach(k => {
      const tag = k.note ? ` [${k.note}]` : '';
      const posisi = k.harga <= hargaKbk ? '✅ di bawah KBK' : '⬆️ lebih mahal';
      console.log(`     • ${rp(k.harga).padEnd(12)} | ${k.nama.padEnd(20)} | ${k.platform} - ${k.lokasi}${tag}`);
    });

    console.log(`   Range pasar  : ${rp(minH)} — ${rp(maxH)}`);

    if (hargaKbk <= minH) {
      console.log(`   📌 Posisi KBK: TERENDAH di pasar → pertimbangkan naik harga?`);
    } else if (hargaKbk <= (minH + maxH) / 2) {
      console.log(`   📌 Posisi KBK: Di bawah rata-rata → kompetitif ✅`);
    } else {
      console.log(`   📌 Posisi KBK: Di atas rata-rata → pastikan nilai tambah jelas`);
    }
  });

  console.log('\n💡 Update data riset: edit data/market-research.json langsung\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: laporan (harian)
// ══════════════════════════════════════════════════════════════
function cmdLaporan() {
  const tx = readJSON(FILE.transactions) || [];
  const orders = readJSON(FILE.orders) || [];
  const tgl = today();

  console.log(`\n📋 Laporan Harian — ${tgl}\n`);

  const penjualanHari = tx.filter(t => t.tipe === 'PENJUALAN' && t.tanggal === tgl);
  const masukHari = tx.filter(t => t.tipe === 'MASUK' && t.tanggal === tgl);
  const prosesHari = tx.filter(t => t.tipe === 'PROSES' && t.tanggal === tgl);
  const pesananBaru = orders.filter(o => o.tanggal === tgl);

  // Penjualan
  console.log('💰 PENJUALAN HARI INI:');
  if (penjualanHari.length === 0) {
    console.log('   (belum ada penjualan hari ini)');
  } else {
    let totalPendapatan = 0, totalLaba = 0;
    penjualanHari.forEach(t => {
      console.log(`   • ${t.nama} x${t.jumlah} → ${rp(t.total_pendapatan)} (laba: ${rp(t.laba_kotor)})`);
      totalPendapatan += t.total_pendapatan;
      totalLaba += t.laba_kotor;
    });
    console.log(`   TOTAL: ${rp(totalPendapatan)} | Laba kotor: ${rp(totalLaba)}`);
  }

  // Stok masuk
  console.log('\n📥 STOK MASUK HARI INI:');
  if (masukHari.length === 0) {
    console.log('   (tidak ada)');
  } else {
    masukHari.forEach(t => console.log(`   • ${t.nama} +${t.jumlah} ${t.satuan} (dari: ${t.sumber})`));
  }

  // Proses produksi
  console.log('\n⚙️  PROSES PRODUKSI HARI INI:');
  if (prosesHari.length === 0) {
    console.log('   (tidak ada)');
  } else {
    prosesHari.forEach(t => {
      console.log(`   • ${t.bahan_baku.nama} -${t.bahan_baku.jumlah} → ${t.hasil_produksi.nama} +${t.hasil_produksi.jumlah}`);
    });
  }

  // Pesanan Shopee hari ini
  console.log('\n🛒 PESANAN SHOPEE HARI INI:');
  if (pesananBaru.length === 0) {
    console.log('   (tidak ada)');
  } else {
    pesananBaru.forEach(o => console.log(`   • ${o.produk_nama} x${o.jumlah} | ${o.nama_pembeli} | ${rp(o.total)} | ${o.status}`));
  }

  // Stok saat ini
  const inv = readJSON(FILE.inventory);
  if (inv) {
    console.log('\n📦 STOK SAAT INI:');
    const prods = readJSON(FILE.products) || [];
    Object.entries(inv.stok).forEach(([sku, qty]) => {
      const p = prods.find(x => x.sku === sku);
      const nama = p ? p.nama : sku;
      const warn = qty <= 0 ? ' ⚠️ HABIS' : qty <= 5 ? ' 📉 SEDIKIT' : '';
      console.log(`   ${sku.padEnd(12)}: ${qty} ${p ? p.satuan : ''}${warn}`);
    });
  }

  console.log('\n📌 Tips: Jangan lupa backup! → node src/cli.js backup\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: laporan-bulan
// ══════════════════════════════════════════════════════════════
function cmdLaporanBulan() {
  const tx = readJSON(FILE.transactions) || [];
  const prods = readJSON(FILE.products) || [];

  const now = new Date();
  const bulanIni = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  console.log(`\n📊 Laporan Bulan — ${bulanIni}\n`);

  const penjualan = tx.filter(t => t.tipe === 'PENJUALAN' && t.tanggal && t.tanggal.startsWith(bulanIni));

  if (penjualan.length === 0) {
    console.log('  Belum ada transaksi penjualan bulan ini.\n');
    return;
  }

  // Breakdown per produk
  const bySkU = {};
  penjualan.forEach(t => {
    if (!bySkU[t.sku]) bySkU[t.sku] = { nama: t.nama, qty: 0, pendapatan: 0, hpp: 0, laba: 0 };
    bySkU[t.sku].qty += t.jumlah;
    bySkU[t.sku].pendapatan += t.total_pendapatan;
    bySkU[t.sku].hpp += t.total_hpp;
    bySkU[t.sku].laba += t.laba_kotor;
  });

  console.log('┌───────────────┬────────────────────────────┬──────┬──────────────┬──────────────┬──────────────┬────────┐');
  console.log('│ SKU           │ Nama                        │  Qty │  Pendapatan  │    HPP       │  Laba Kotor  │ Margin │');
  console.log('├───────────────┼────────────────────────────┼──────┼──────────────┼──────────────┼──────────────┼────────┤');

  let totalPend = 0, totalHPP = 0, totalLaba = 0, totalQty = 0;
  Object.entries(bySkU).forEach(([sku, d]) => {
    const marginPct = ((d.laba / d.pendapatan) * 100).toFixed(1) + '%';
    console.log(`│ ${sku.padEnd(13)} │ ${d.nama.slice(0, 28).padEnd(28)} │ ${String(d.qty).padStart(4)} │ ${rp(d.pendapatan).padStart(12)} │ ${rp(d.hpp).padStart(12)} │ ${rp(d.laba).padStart(12)} │ ${marginPct.padStart(6)} │`);
    totalPend += d.pendapatan;
    totalHPP += d.hpp;
    totalLaba += d.laba;
    totalQty += d.qty;
  });

  console.log('├───────────────┼────────────────────────────┼──────┼──────────────┼──────────────┼──────────────┼────────┤');
  const totalMargin = ((totalLaba / totalPend) * 100).toFixed(1) + '%';
  console.log(`│ TOTAL         │                             │ ${String(totalQty).padStart(4)} │ ${rp(totalPend).padStart(12)} │ ${rp(totalHPP).padStart(12)} │ ${rp(totalLaba).padStart(12)} │ ${totalMargin.padStart(6)} │`);
  console.log('└───────────────┴────────────────────────────┴──────┴──────────────┴──────────────┴──────────────┴────────┘');

  console.log(`\n✅ Total transaksi: ${penjualan.length} | Laba bersih (estimasi): ${rp(totalLaba)}\n`);
  console.log('💡 Export ke CSV: node src/cli.js export\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: export CSV
// ══════════════════════════════════════════════════════════════
function cmdExport() {
  const tx = readJSON(FILE.transactions) || [];
  const tgl = today().replace(/-/g, '');
  const outFile = path.join(ROOT, `export-kbk-${tgl}.csv`);

  const header = ['ID', 'Tipe', 'Tanggal', 'SKU', 'Nama Produk', 'Jumlah', 'Satuan',
                   'Harga Jual', 'HPP/unit', 'Total Pendapatan', 'Total HPP', 'Laba Kotor', 'Margin%', 'Channel', 'Keterangan'];

  const rows = tx.map(t => {
    const margin = t.margin_pct ? t.margin_pct + '%' : '';
    const nama = t.tipe === 'PROSES'
      ? `${t.bahan_baku?.nama} → ${t.hasil_produksi?.nama}`
      : (t.nama || '');
    return [
      t.id, t.tipe, t.tanggal,
      t.sku || '', nama,
      t.jumlah || '', t.satuan || '',
      t.harga_jual || '', t.hpp_per_unit || '',
      t.total_pendapatan || '', t.total_hpp || '',
      t.laba_kotor || '', margin,
      t.channel || '', t.keterangan || t.sumber || t.catatan || '',
    ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
  });

  const csv = [header.join(','), ...rows].join('\n');
  fs.writeFileSync(outFile, csv, 'utf8');

  console.log(`\n✅ Export selesai!`);
  console.log(`   File: ${outFile}`);
  console.log(`   Baris data: ${rows.length}`);
  console.log('   Buka dengan Excel atau Google Sheets\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: checklist
// ══════════════════════════════════════════════════════════════
function cmdChecklist() {
  const cl = readJSON(FILE.checklist);
  if (!cl) { console.log('\n⚠️  Setup dulu: node src/cli.js setup\n'); return; }

  const now = new Date();
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'][now.getDay()];
  const tanggal = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  console.log(`\n✅ KBK AgroStore — Daily Checklist Operasional`);
  console.log(`   ${hari}, ${tanggal}\n`);

  console.log('📋 HARIAN:');
  const byWaktu = {};
  cl.daily.forEach(item => {
    if (!byWaktu[item.waktu]) byWaktu[item.waktu] = [];
    byWaktu[item.waktu].push(item);
  });

  Object.entries(byWaktu).forEach(([waktu, items]) => {
    console.log(`\n  🕐 ${waktu.toUpperCase()}:`);
    items.forEach(item => console.log(`    [ ] ${item.item}`));
  });

  console.log('\n📅 MINGGUAN:');
  cl.weekly.forEach(item => console.log(`  [ ] ${item.item}`));

  console.log('\n💡 Perintah berguna hari ini:');
  console.log('   node src/cli.js stok        → cek stok');
  console.log('   node src/cli.js pesanan     → cek pesanan Shopee');
  console.log('   node src/cli.js laporan     → laporan harian');
  console.log('   node src/cli.js backup      → backup data\n');
  console.log('"Pelan. Sabar. Mantap. Bismillah... Biidznillah..."\n');
}

// ══════════════════════════════════════════════════════════════
// COMMAND: backup
// ══════════════════════════════════════════════════════════════
function cmdBackup() {
  fs.mkdirSync(BACKUPS, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = path.join(BACKUPS, `backup-${ts}`);
  fs.mkdirSync(backupDir, { recursive: true });

  let count = 0;
  Object.entries(FILE).forEach(([name, src]) => {
    if (fs.existsSync(src)) {
      const dest = path.join(backupDir, path.basename(src));
      fs.copyFileSync(src, dest);
      console.log(`  ✅ ${path.basename(src)}`);
      count++;
    }
  });

  console.log(`\n✅ Backup selesai! ${count} file tersimpan di:`);
  console.log(`   ${backupDir}\n`);
}

// ══════════════════════════════════════════════════════════════
// EXPORTS
// ══════════════════════════════════════════════════════════════
module.exports = {
  cmdSetup, cmdBantuan, cmdProduk, cmdUpdateHPP,
  cmdStok, cmdStokMasuk, cmdStokKeluar, cmdProses,
  cmdJual, cmdPesanan, cmdShopeeOrder,
  cmdShopeeListing, cmdShopeeChat,
  cmdRiset, cmdLaporan, cmdLaporanBulan,
  cmdExport, cmdChecklist, cmdBackup,
};
