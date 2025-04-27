import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export class SceneManager {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg') });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.position.setZ(30);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // Lighting
        const sunLight = new THREE.PointLight(0xffffff, 2, 1000);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);

        // Background
        const spaceTexture = new THREE.TextureLoader().load('/stars.jpg');
        this.scene.background = spaceTexture;

        // Planets
        this.addPlanets();

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    addPlanet(textureUrl, size, distance) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(`/` + textureUrl); // Correct path for vite/public
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshStandardMaterial({ map: texture });
  
      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = distance;
      this.scene.add(planet);
  }
  
  

    addPlanets() {
        this.addPlanet('/sun.jpg', 5, 0);        // Sun at the center

        this.addPlanet('/mercury.jpg', 0.5, 10); // Mercury
        this.addPlanet('/venus.jpg', 1, 15);     // Venus
        this.addPlanet('/earth.jpg', 1.2, 20);   // Earth
        this.addPlanet('/mars.jpg', 0.8, 25);    // Mars
        this.addPlanet('/jupiter.jpg', 2, 35);   // Jupiter
        this.addPlanet('/saturn.jpg', 1.7, 45);  // Saturn
        this.addPlanet('/uranus.jpg', 1.2, 55);  // Uranus
        this.addPlanet('/neptune.jpg', 1.2, 65); // Neptune
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}
