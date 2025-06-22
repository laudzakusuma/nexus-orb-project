// src/App.tsx

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

// Komponen ini merepresentasikan objek 3D kita yang bisa berputar
function SpinningBox() {
  // useRef digunakan untuk mendapatkan referensi langsung ke objek 3D di scene
  const meshRef = useRef<Mesh>(null!);

  // useFrame adalah sebuah 'hook' dari react-three-fiber.
  // Fungsi di dalamnya akan dijalankan di setiap frame (sekitar 60x per detik).
  // Ini adalah cara kita membuat animasi.
  useFrame((state, delta) => {
    // Kita putar mesh sedikit di setiap frame
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    // <mesh> adalah objek 3D dasar di Three.js
    <mesh ref={meshRef}>
      {/* Bentuk dari mesh kita adalah sebuah kotak */}
      <boxGeometry args={[2, 2, 2]} />
      {/* Bahan dari mesh kita adalah material standar berwarna oranye */}
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

// Ini adalah komponen utama aplikasi kita
export default function App() {
  return (
    // <Canvas> adalah komponen utama dari react-three-fiber.
    // Ia menyiapkan semua hal yang diperlukan untuk membuat adegan 3D (scene, camera, renderer).
    <Canvas>
      {/* Kita butuh cahaya untuk bisa melihat objek 3D */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[0, 1, 5]} intensity={1} />

      {/* Menempatkan komponen kotak berputar kita di dalam adegan */}
      <SpinningBox />
    </Canvas>
  );
}