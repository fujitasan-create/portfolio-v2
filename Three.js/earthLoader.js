import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

const canvas = document.querySelector('#loading-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(600, 600);
renderer.setPixelRatio(window.devicePixelRatio);

// 地球球体
const geometry = new THREE.SphereGeometry(1, 128, 128);
const texture = new THREE.TextureLoader().load('./static/img/earth.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);


const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(5, 5, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 0.5);
light2.position.set(-5, -5, -5);
scene.add(light2);

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();

let progress = 0;
const loadingBar = document.getElementById("loading-bar");
const loaderElement = document.getElementById("loader");

const interval = setInterval(() => {
  progress += 1;
  loadingBar.style.width = `${progress}%`;

  if (progress >= 100) {
    clearInterval(interval);
    setTimeout(() => {
      loaderElement.classList.add("hidden");
      document.body.classList.add("loaded");
    }, 50);
  }
}, 15);