// ── Tipe data ────────────────────────────────────────────────
export interface HppComponent {
  [key: string]: number;
}

export interface Product {
  sku: string;
  slug: string;
  nama: string;
  nama_pendek: string;
  satuan: string;
  harga_jual: number;
  hpp_components: HppComponent;
  hpp_total: number;
  laba: number;
  margin_pct: number;
  berat_kg: number;
  emoji: string;
  zona: string;
  deskripsi_pendek: string;
  deskripsi_panjang: string;
  manfaat: string[];
  cara_pakai: string[];
  catatan?: string;
  tersedia: boolean;
  shopee_url: string;
  whatsapp_number: string;
  min_order: number;
  foto_url: string;
}

// ── Helper ────────────────────────────────────────────────────
function calcHPP(c: HppComponent) {
  return Object.values(c).reduce((s, v) => s + v, 0);
}

function rp(n: number): string {
  return "Rp " + n.toLocaleString("id-ID");
}

const WA = process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX";

// ── Data Produk ───────────────────────────────────────────────
const RAW = [
  {
    sku: "KBK-SM",
    slug: "sekam-mentah",
    nama: "Sekam Padi Mentah",
    nama_pendek: "Sekam Mentah",
    satuan: "karung",
    harga_jual: 15000,
    hpp_components: { karung: 2000, label: 200, tenaga: 500 },
    berat_kg: 15,
    emoji: "🌾",
    zona: "Zona A",
    deskripsi_pendek: "Sekam padi segar dari RMU Cepiring. Bersih, kering, siap pakai.",
    deskripsi_panjang:
      "Sekam padi mentah berkualitas langsung dari penggilingan padi Cepiring, Kendal. " +
      "Dipilih dari sekam yang bersih, kering, dan bebas dari kotoran berlebih. " +
      "Cocok sebagai bahan campuran media tanam, mulsa organik, atau bahan baku " +
      "pembuatan arang sekam sendiri di rumah.",
    manfaat: [
      "Memperbaiki aerasi dan drainase tanah",
      "Menambah bahan organik ke tanah",
      "Media tanam untuk cangkok dan stek",
      "Bahan baku pembuatan arang sekam",
      "Mulsa alami di sekitar tanaman",
    ],
    cara_pakai: [
      "Media tanam: campurkan 30–40% sekam ke tanah/kompos",
      "Mulsa: sebarkan 3–5 cm di sekitar pangkal tanaman",
      "Campuran pot: 1 bagian sekam + 2 bagian tanah",
    ],
    catatan: "⚠️ Sekam sangat ringan! 1 karung ≈ 15 kg namun bervolume besar (~50 liter)",
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
  {
    sku: "KBK-SB",
    slug: "sekam-bakar",
    nama: "Arang Sekam — Sekam Bakar Premium",
    nama_pendek: "Arang Sekam",
    satuan: "karung",
    harga_jual: 22000,
    hpp_components: { bahan_bakar: 2000, karung: 2000, label: 200, tenaga: 1500 },
    berat_kg: 8,
    emoji: "🔥",
    zona: "Zona B",
    deskripsi_pendek:
      "Media tanam ringan dan porous — bikin akar tanaman lebih napas, anti becek, anti busuk.",
    deskripsi_panjang:
      "Arang sekam hasil pembakaran terkontrol dari sekam padi pilihan. " +
      "Warna hitam merata menandakan pembakaran sempurna — tidak gosong, tidak mentah. " +
      "Steril dari hama dan patogen, pH netral (6–7), dan memiliki struktur berpori " +
      "yang sangat baik untuk aerasi akar dan penyerapan air.",
    manfaat: [
      "Memperbaiki struktur dan aerasi tanah jangka panjang",
      "Menyerap kelebihan air, mencegah busuk akar",
      "Mengandung silika dan karbon aktif",
      "pH media tanam lebih stabil",
      "Steril — bebas hama dan penyakit tanah",
    ],
    cara_pakai: [
      "Campurkan 20–40% ke media tanam atau potting mix",
      "Ideal untuk anggrek, adenium, sukulen, sayuran",
      "Formula KBK: 40% arang sekam + 40% kohe + 20% tanah",
    ],
    catatan: "⚠️ Lebih ringan dari sekam mentah. 1 karung ≈ 8 kg (~40 liter)",
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
  {
    sku: "KBK-KK-M",
    slug: "kohe-mentah",
    nama: "Kohe Kambing Mentah Kering",
    nama_pendek: "Kohe Mentah",
    satuan: "kg",
    harga_jual: 3000,
    hpp_components: { bahan_baku: 1500, jemur: 300, karung: 200, label: 100 },
    berat_kg: 1,
    emoji: "🐐",
    zona: "Zona C",
    deskripsi_pendek: "Kotoran kambing kering alami dari peternak lokal Botomulyo.",
    deskripsi_panjang:
      "Kotoran kambing dari peternak lokal Botomulyo, Cepiring. " +
      "Dikeringkan alami di bawah sinar matahari, bebas bau menyengat, " +
      "dan kaya kandungan N-P-K organik. Cocok untuk pupuk dasar atau " +
      "bahan baku fermentasi EM4.",
    manfaat: [
      "Kaya N-P-K organik alami",
      "Memperbaiki kesuburan dan struktur tanah",
      "Bahan baku fermentasi pupuk organik",
      "Lebih aman dari pupuk kimia sintetis",
    ],
    cara_pakai: [
      "Pupuk dasar: taburkan 2–3 kg per m² sebelum tanam",
      "Atau gunakan sebagai bahan fermentasi EM4",
    ],
    catatan: "💡 Minimum pembelian 5 kg. Hubungi kami via WhatsApp untuk konfirmasi stok.",
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 5,
    foto_url: "",
  },
  {
    sku: "KBK-KK-F1",
    slug: "kohe-fermentasi-1kg",
    nama: "Kohe Kambing Fermentasi EM4 — 1 kg",
    nama_pendek: "Kohe Fermentasi 1kg",
    satuan: "pack",
    harga_jual: 10000,
    hpp_components: { kohe: 2500, em4: 150, tenaga: 300, kemasan: 700, label: 150 },
    berat_kg: 1,
    emoji: "🧪",
    zona: "Zona D",
    deskripsi_pendek: "Fermentasi 21 hari dengan EM4. Matang, tidak panas, tidak bau.",
    deskripsi_panjang:
      "Pupuk kandang kambing difermentasi selama 21 hari menggunakan EM4 probiotik. " +
      "Proses fermentasi memastikan pupuk matang sempurna — tidak akan membakar akar, " +
      "tidak berbau tajam, dan langsung tersedia nutrisinya untuk tanaman. " +
      "Dikemas rapat dalam ziplock 1 kg, siap kirim.",
    manfaat: [
      "N (Nitrogen): menyuburkan daun, menjaga warna hijau segar",
      "P (Fosfor): merangsang perkembangan akar dan bunga",
      "K (Kalium): memperkuat batang dan meningkatkan kualitas buah",
      "Mikroba EM4: memperbaiki ekosistem tanah jangka panjang",
      "Tidak membakar akar — aman untuk semua tanaman",
    ],
    cara_pakai: [
      "Pot kecil (<20 cm): 2–3 sendok makan per minggu",
      "Pot besar (>30 cm): 1–2 genggam per minggu",
      "Bedengan/kebun: 2–3 kg per m² per musim tanam",
      "Pupuk cair: larutkan 1:10 dengan air, semprot/siram",
    ],
    catatan: "💡 Simpan di tempat sejuk, hindari paparan sinar matahari langsung.",
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
  {
    sku: "KBK-KK-F5",
    slug: "kohe-fermentasi-5kg",
    nama: "Kohe Kambing Fermentasi EM4 — 5 kg",
    nama_pendek: "Kohe Fermentasi 5kg",
    satuan: "pack",
    harga_jual: 40000,
    hpp_components: { kohe: 12500, em4: 700, tenaga: 1000, kemasan: 1500, label: 200 },
    berat_kg: 5,
    emoji: "🧪",
    zona: "Zona D",
    deskripsi_pendek: "Kemasan ekonomis 5 kg. Lebih hemat untuk kebun dan ladang.",
    deskripsi_panjang:
      "Varian ekonomis dari Kohe Fermentasi KBK — kemasan 5 kg untuk " +
      "kebutuhan kebun yang lebih luas. Proses fermentasi sama: 21 hari dengan EM4, " +
      "matang sempurna, tidak panas, siap pakai. Dikemas dalam karung mini tertutup.",
    manfaat: [
      "Lebih hemat untuk kebun luas",
      "Sama kualitas dengan kemasan 1 kg",
      "Nutrisi NPK organik tinggi",
      "Ramah lingkungan, bebas kimia sintetis",
    ],
    cara_pakai: [
      "Sayuran: 2–3 kg per m² per musim",
      "Tanaman buah: 3–5 kg per pohon per musim",
      "Campuran media tanam: 40% kohe + 40% arang sekam + 20% tanah",
    ],
    catatan: "💡 Simpan di tempat sejuk dan kering. Hindari kontak langsung dengan air hujan.",
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
  {
    sku: "KBK-MT5",
    slug: "media-tanam-5kg",
    nama: "Media Tanam Komplit 5 kg",
    nama_pendek: "Media Tanam 5kg",
    satuan: "pack",
    harga_jual: 28000,
    hpp_components: {
      sekam_bakar: 700,
      kohe: 4500,
      top_soil: 500,
      tenaga: 500,
      kemasan: 1500,
      label: 200,
    },
    berat_kg: 5,
    emoji: "🌱",
    zona: "Zona D",
    deskripsi_pendek:
      "Formula KBK: 40% arang sekam + 40% kohe + 20% top soil. Langsung tanam.",
    deskripsi_panjang:
      "Media tanam siap pakai hasil racikan KBK AgroEduLabs. " +
      "Formula terukur: 40% arang sekam (aerasi & drainase), " +
      "40% kohe kambing fermentasi (nutrisi & mikroba), " +
      "20% top soil pilihan (struktur). " +
      "pH ideal 6–7, gembur, subur, langsung bisa ditanam. " +
      "Tidak perlu tambah pupuk 1–2 bulan pertama.",
    manfaat: [
      "Siap pakai — langsung masukkan ke pot dan tanam",
      "pH ideal 6–7 untuk mayoritas tanaman",
      "Aerasi dan drainase optimal",
      "Kaya nutrisi NPK + mikroba hidup",
      "Tidak perlu pupuk tambahan 1–2 bulan pertama",
    ],
    cara_pakai: [
      "Langsung masukkan ke pot/polybag, siram merata",
      "Tanam langsung tanpa pengkondisian",
      "Cocok untuk sayuran, buah dalam pot, tanaman hias",
      "Semprot EM4 (1 ml/L air) tiap 2 minggu untuk menjaga mikroba",
    ],
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
  {
    sku: "KBK-AZ5",
    slug: "pupuk-azolla-500g",
    nama: "Pupuk Azolla Organik — 500 g",
    nama_pendek: "Azolla 500g",
    satuan: "pack",
    harga_jual: 10000,
    hpp_components: {
      bahan_baku: 1500,
      jemur: 300,
      kemasan: 700,
      label: 200,
      tenaga: 800,
    },
    berat_kg: 0.5,
    emoji: "🌿",
    zona: "Zona C",
    deskripsi_pendek:
      "Azolla kering dari kolam KBK — kaya nitrogen alami, cocok untuk padi, sayuran, dan tanaman pot.",
    deskripsi_panjang:
      "Azolla pinnata dibudidayakan di kolam KBK AgroEduLabs, dipanen segar lalu dikeringkan " +
      "alami di bawah sinar matahari. Azolla mengandung Nitrogen (N) 3–5% bobot kering — " +
      "lebih tinggi dari banyak pupuk hijau lainnya — serta P, K, Ca, dan Mg alami. " +
      "Sebagai pupuk hijau yang dikeringkan, Azolla terurai cepat di tanah dan langsung " +
      "melepaskan nutrisinya. Cocok untuk sayuran, padi, dan tanaman dalam pot.",
    manfaat: [
      "Kandungan N 3–5% — setara urea organik untuk sayuran",
      "Mengandung P, K, Ca, Mg dari bahan alami",
      "Terurai cepat — nutrisi tersedia dalam 7–14 hari",
      "Aman untuk tanaman pangan, 100% bebas kimia",
      "Meningkatkan aktivitas mikroba tanah",
    ],
    cara_pakai: [
      "Taburkan 50–100 g per m² bedengan, campur ringan ke tanah",
      "Pot besar: 1–2 sendok makan per minggu di permukaan",
      "Rendam 1 genggam dalam 1 liter air 24 jam → pupuk cair",
      "Campur ke kompos sebagai akselerator nitrogen alami",
    ],
    catatan: "💡 Simpan di tempat kering dan sejuk. Hindari paparan kelembaban tinggi.",
    tersedia: true,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
  {
    sku: "KBK-BT",
    slug: "bibit-kbk",
    nama: "Bibit Sayuran & Tanaman KBK",
    nama_pendek: "Bibit KBK",
    satuan: "polybag",
    harga_jual: 15000,
    hpp_components: { benih: 3000, polybag: 1000, media: 500, tenaga: 1500, label: 200 },
    berat_kg: 0.3,
    emoji: "🌱",
    zona: "Zona D",
    deskripsi_pendek:
      "Bibit tanaman dari kebun KBK — sayuran, herbal, dan tanaman produktif pilihan. Segera hadir.",
    deskripsi_panjang:
      "KBK AgroEduLabs sedang menyiapkan lini bibit tanaman lokal unggul: " +
      "sayuran konsumsi (cabai, tomat, terong, kangkung), herbal (kemangi, jahe, kunyit), " +
      "dan tanaman produktif lainnya yang cocok untuk kebun rumah di iklim Jawa Tengah. " +
      "Semua bibit disemai dari benih pilihan, diperkuat dengan media tanam KBK sendiri, " +
      "dan dirawat organik tanpa pestisida kimia. " +
      "Hubungi kami via WhatsApp untuk daftar bibit yang sedang tersedia.",
    manfaat: [
      "Bibit lokal — terbiasa iklim Kendal dan sekitarnya",
      "Disemai organik tanpa pupuk kimia",
      "Siap tanam dalam polybag atau pot",
      "Tersedia edukasi cara rawat dari tim KBK",
    ],
    cara_pakai: [
      "Siram 1–2 kali sehari, hindari genangan",
      "Taruh di tempat dengan sinar matahari minimal 4 jam",
      "Pindah tanam ke lahan setelah tinggi 15–20 cm",
      "Gunakan Media Tanam KBK-MT5 untuk hasil terbaik",
    ],
    catatan: "📅 Stok bibit bersifat musiman. Hubungi WhatsApp untuk ketersediaan terkini.",
    tersedia: false,
    shopee_url: "https://shopee.co.id",
    whatsapp_number: WA,
    min_order: 1,
    foto_url: "",
  },
];

// Build produk dengan kalkulasi otomatis
export const PRODUCTS: Product[] = RAW.map((p) => {
  const components: HppComponent = Object.fromEntries(
    Object.entries(p.hpp_components).filter(([, v]) => v !== undefined)
  );
  const hpp_total = calcHPP(components);
  const laba = p.harga_jual - hpp_total;
  const margin_pct = Math.round((laba / p.harga_jual) * 1000) / 10;
  return { ...p, hpp_components: components, hpp_total, laba, margin_pct };
});

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function rpFormat(n: number): string {
  return rp(n);
}

export function generateWhatsAppURL(product: Product, qty: number): string {
  const safeQty = Math.max(qty, product.min_order);
  const totalHarga = safeQty * product.harga_jual;
  const number = product.whatsapp_number.replace(/\D/g, "");

  const lines = [
    "Assalamu'alaikum, Kak Arief 🌿",
    "",
    "Saya ingin pesan produk KBK AgroStore:",
    "",
    `📦 Produk : ${product.nama}`,
    `🔖 SKU    : ${product.sku}`,
    `🔢 Jumlah : ${safeQty} ${product.satuan}`,
    `💰 Total  : ${totalHarga.toLocaleString("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 })}`,
    "",
    "Mohon konfirmasi ketersediaan stok dan info pengiriman.",
    "Terima kasih 🙏",
    "",
    "_(Pesan dari: store.agroedulabs.id)_",
  ];

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}
