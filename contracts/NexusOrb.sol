// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Perhatikan, kita tidak lagi mengimpor Counters.sol
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexusOrb
 * @dev Versi 2.0 - Menggunakan pola modern tanpa Counters.sol
 */
contract NexusOrb is ERC721 {
    // --- PERUBAHAN UTAMA DI SINI ---
    // Kita tidak lagi menggunakan library Counters.
    // Sebagai gantinya, kita membuat variabel angka kita sendiri untuk melacak ID.
    // Kita mulai dari 0, jadi Orb pertama akan memiliki ID 0.
    uint256 private _nextTokenId;

    /**
     * @dev Constructor tetap sama.
     */
    constructor() ERC721("Nexus Orb", "ORB") {
    }

    /**
     * @dev Fungsi safeMint yang telah diperbarui.
     */
    function safeMint(address to) public {
        // 1. Ambil ID token saat ini dari variabel kita.
        uint256 tokenId = _nextTokenId;
        // 2. Naikkan nilai variabel untuk persiapan minting berikutnya.
        _nextTokenId++;
        // 3. Panggil fungsi _safeMint seperti sebelumnya dengan ID yang baru.
        _safeMint(to, tokenId);
    }
    /**
    * @dev Fungsi view untuk mendapatkan jumlah total Orb yang sudah di-mint.
    * 'view' berarti fungsi ini hanya membaca data dari blockchain.
    * 'returns (uint256)' berarti fungsi ini akan mengembalikan sebuah angka.
    */
    function getTotalMinted() public view returns (uint256) {
        // Mengembalikan nilai dari counter ID kita, yang sama dengan jumlah total.
        return _nextTokenId;
    }
}