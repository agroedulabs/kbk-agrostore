const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "628XXXXXXXXXX";
export const WA_DISPLAY = process.env.NEXT_PUBLIC_WA_DISPLAY ?? "0812-XXXX-XXXX";

export function buildWAUrl(productName: string, sku: string): string {
  const message = [
    "Assalamu'alaikum, Kak Arief 🌿",
    "",
    "Saya ingin pesan produk KBK AgroStore:",
    "",
    `📦 Produk : ${productName}`,
    `🔖 SKU    : ${sku}`,
    `🔢 Jumlah : ___ (mohon diisi sebelum kirim)`,
    "",
    "Mohon konfirmasi ketersediaan stok dan info pengiriman.",
    "Terima kasih 🙏",
    "",
    "_(Pesan dari: store.agroedulabs.id)_",
  ].join("\n");

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildWAUrlGeneral(): string {
  const message = [
    "Assalamu'alaikum, Kak Arief 🌿",
    "Saya ingin tanya produk KBK AgroStore.",
    "Terima kasih!",
  ].join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
