// File: test-env.js
require('dotenv').config();

console.log("--- Memulai Tes Diagnostik .env ---");
console.log("Mencoba membaca variabel 'CONTRACT_ADDRESS'...");

const alamatKontrak = process.env.CONTRACT_ADDRESS;

console.log("Nilai yang terbaca adalah:", alamatKontrak);

if (alamatKontrak) {
    console.log("\n✅ BERHASIL! Node.js bisa menemukan dan membaca file .env Anda.");
} else {
    console.log("\n❌ GAGAL! Node.js TIDAK bisa membaca file .env Anda. Periksa kembali nama file (harus .env, bukan .env.txt) dan lokasinya (harus di folder utama).");
}

console.log("--- Tes Diagnostik Selesai ---");