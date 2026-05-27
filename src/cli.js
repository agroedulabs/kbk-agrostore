#!/usr/bin/env node
// ============================================================
// KBK AGROSTORE — cli.js
// Entry point: node src/cli.js [perintah]
// KBK AgroEduLabs, Botomulyo, Cepiring, Kendal
// ============================================================

const {
  cmdSetup, cmdBantuan, cmdProduk, cmdUpdateHPP,
  cmdStok, cmdStokMasuk, cmdStokKeluar, cmdProses,
  cmdJual, cmdPesanan, cmdShopeeOrder,
  cmdShopeeListing, cmdShopeeChat,
  cmdRiset, cmdLaporan, cmdLaporanBulan,
  cmdExport, cmdChecklist, cmdBackup,
} = require('./router');

const perintah = process.argv[2];

(async () => {
  switch (perintah) {
    case 'setup':           cmdSetup();               break;
    case 'bantuan':
    case 'help':
    case '--help':          cmdBantuan();              break;
    case 'produk':          cmdProduk();               break;
    case 'update-hpp':      await cmdUpdateHPP();      break;
    case 'stok':            cmdStok();                 break;
    case 'stok-masuk':      await cmdStokMasuk();      break;
    case 'stok-keluar':     await cmdStokKeluar();     break;
    case 'proses':          await cmdProses();         break;
    case 'jual':            await cmdJual();           break;
    case 'pesanan':         cmdPesanan();              break;
    case 'shopee-order':    await cmdShopeeOrder();    break;
    case 'shopee-listing':  cmdShopeeListing();        break;
    case 'shopee-chat':     cmdShopeeChat();           break;
    case 'riset':           cmdRiset();                break;
    case 'laporan':         cmdLaporan();              break;
    case 'laporan-bulan':   cmdLaporanBulan();         break;
    case 'export':          cmdExport();               break;
    case 'checklist':       cmdChecklist();            break;
    case 'backup':          cmdBackup();               break;
    default:
      if (perintah) {
        console.log(`\n❌ Perintah tidak dikenal: "${perintah}"\n`);
      } else {
        console.log('\n🌿 KBK AgroStore — Sistem Manajemen Usaha Pertanian Organik\n');
      }
      console.log('Gunakan: node src/cli.js bantuan\n');
      break;
  }
})();
