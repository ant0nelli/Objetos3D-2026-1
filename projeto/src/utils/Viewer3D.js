import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Viewer3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentModel = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf3f4f6);

        this.camera = new THREE.PerspectiveCamera(45, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;

        // Iluminação
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(10, 10, 10);
        this.scene.add(dirLight);

        this.isInitialized = true;
        this.animate();
        
        window.addEventListener('resize', () => this.onWindowResize());
    }

    displayModel(modelScene) {
        if (this.currentModel) this.scene.remove(this.currentModel);

        this.currentModel = modelScene;
        
        // Centralização e Ajuste de Câmera
        const box = new THREE.Box3().setFromObject(this.currentModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        this.currentModel.position.sub(center); // Centraliza no 0,0,0
        this.scene.add(this.currentModel);

        const maxDim = Math.max(size.x, size.y, size.z);
        this.camera.position.set(0, maxDim * 0.5, maxDim * 2.5);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if (this.controls) this.controls.update();
        if (this.renderer) this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        if (!this.isInitialized) return;
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }
}