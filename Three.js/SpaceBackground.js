import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const canvas = document.querySelector('#bg');

// シーン（空間）を作る
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // 黒い宇宙空間

// カメラを設定
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.z = 50;

// レンダラーを作成（描画装置）
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// 星を生成する関数
function addStar() {
  const geometry = new THREE.SphereGeometry(0.3, 3, 3 ); // 小さな球
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => (Math.random() - 0.5) * 500);
  star.position.set(x, y, z);
  scene.add(star);
}

// 星をたくさん追加
Array.from({ length: 500 }).forEach(addStar);

// アニメーション関数
function animate() {
  requestAnimationFrame(animate);

  // カメラをゆっくり回転させると奥行き感が出る
  camera.rotation.y += 0.001;
  camera.rotation.x += 0.0008;

  renderer.render(scene, camera);
}

animate();

// ウィンドウサイズに合わせてリサイズ
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});