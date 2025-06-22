// Mengimpor 'hre' (Hardhat Runtime Environment) untuk mengakses semua fungsionalitas Hardhat.
const hre = require("hardhat");

async function main() {
  // 1. Mengambil 'cetak biru' dan 'pabrik' untuk kontrak NexusOrb.
  // Hardhat tahu cara menemukannya dari nama kontrak.
  console.log("Preparing to deploy NexusOrb...");
  const NexusOrbFactory = await hre.ethers.getContractFactory("NexusOrb");

  // 2. Memerintahkan 'pabrik' untuk mendeploy kontrak.
  // Ini mengirimkan transaksi ke blockchain.
  console.log("Deploying NexusOrb contract...");
  const nexusOrb = await NexusOrbFactory.deploy();

  // 3. Menunggu hingga proses deployment selesai sepenuhnya.
  await nexusOrb.waitForDeployment();
  const contractAddress = await nexusOrb.getAddress();
  console.log("✅ NexusOrb deployed successfully to:", contractAddress);

  // --- INTERAKSI PERTAMA ---
  // Sekarang kontraknya sudah hidup, mari kita berinteraksi dengannya!

  // 4. Mengambil alamat dompet yang mendeploy kontrak (ini adalah alamat Anda di blockchain lokal).
  const [deployer] = await hre.ethers.getSigners();
  console.log("\nMinting a new Orb for a good cause to:", deployer.address);
  
  // 5. Memanggil fungsi 'safeMint' dari kontrak kita.
  // Kita memberitahu fungsi untuk mencetak NFT baru ke alamat 'deployer'.
  const mintTx = await nexusOrb.safeMint(deployer.address);

  // 6. Menunggu transaksi minting selesai.
  await mintTx.wait();
  console.log("✅ New Orb NFT minted successfully! Transaction hash:", mintTx.hash);
}

// Pola standar untuk menangani error dan menjalankan fungsi main.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});