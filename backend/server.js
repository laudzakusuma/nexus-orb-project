// Memuat variabel dari file .env yang ada di folder root proyek
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');

// Mengimpor ABI (Application Binary Interface) dari kontrak kita.
const contractABI = require('../artifacts/contracts/NexusOrb.sol/NexusOrb.json').abi;

const app = express();
app.use(cors());

// Mengambil alamat kontrak dari file .env
const contractAddress = process.env.CONTRACT_ADDRESS;

// Memastikan alamat kontrak ada sebelum melanjutkan
if (!contractAddress) {
    console.error("Kesalahan Kritis: CONTRACT_ADDRESS tidak ditemukan. Pastikan file .env Anda sudah benar dan tersimpan.");
    process.exit(1); 
}

// Menyiapkan koneksi ke blockchain lokal
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
// Membuat objek kontrak yang bisa kita gunakan
const nexusOrbContract = new ethers.Contract(contractAddress, contractABI, provider);

const PORT = process.env.PORT || 3001;

// Endpoint untuk pengujian
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the Nexus Backend!' });
});

// Endpoint untuk mengambil data dari smart contract
app.get('/api/total-orbs', async (req, res) => {
    console.log("Menerima permintaan ke /api/total-orbs...");
    try {
        const totalOrbs = await nexusOrbContract.getTotalMinted();
        res.json({ totalOrbs: totalOrbs.toString() });
        console.log("Berhasil mengirim data. Total orbs:", totalOrbs.toString());
    } catch (error) {
        console.error("Gagal mengambil data dari kontrak:", error);
        res.status(500).json({ error: "Gagal mengambil data dari kontrak." });
    }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running on http://localhost:${PORT}`);
});