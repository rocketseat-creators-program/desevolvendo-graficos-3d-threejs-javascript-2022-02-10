import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gladiator3dPath from './models/gladiator.glb'

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const CANVAS = document.querySelector(".webgl");
const SCENE = new THREE.Scene();
const AMBIENT_LIGHT = new THREE.AmbientLight(0x404040, 5);
const DIRECTIONAL_LIGHT = new THREE.DirectionalLight(0xffffff, 5);
const ASPECT_CAMERA = sizes.width / sizes.height;
const PERSPECTIVE_CAMERA = new THREE.PerspectiveCamera(
  120,
  ASPECT_CAMERA,
  0.5,
  100
);
const CONTROLS = new OrbitControls(PERSPECTIVE_CAMERA, CANVAS);
const GRID_HELPER = new THREE.GridHelper(20, 10);
const GLTF_LOADER = new GLTFLoader();
const RENDERER = new THREE.WebGLRenderer({
  canvas: CANVAS,
});

DIRECTIONAL_LIGHT.position.set(0, 1, 0);
PERSPECTIVE_CAMERA.position.set(0, 0, 2);

SCENE.add(DIRECTIONAL_LIGHT, AMBIENT_LIGHT, PERSPECTIVE_CAMERA, GRID_HELPER);

RenderSizePixel();

function importModels() {
  GLTF_LOADER.load(
    gladiator3dPath,
    (gltf) => {
        gltf.scene.position.set(0, 0, -2)
        SCENE.add(gltf.scene)
    },
    (progress) => {
        console.log(progress.loaded, progress.total)
    },
    (error) => {
        console.error(error)
    }
  );

  GLTF_LOADER.load(
    gladiator3dPath,
    (gltf) => {
        gltf.scene.position.set(2, 0, 0)
        SCENE.add(gltf.scene)
    },
    (progress) => {
        console.log(progress.loaded, progress.total)
    },
    (error) => {
        console.error(error)
    }
  );
}

function updateCanvas() {
  RENDERER.render(SCENE, PERSPECTIVE_CAMERA);
  window.requestAnimationFrame(updateCanvas);
}

function RenderSizePixel() {
  RENDERER.setSize(sizes.width, sizes.height);
  RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  PERSPECTIVE_CAMERA.aspect = ASPECT_CAMERA;
  PERSPECTIVE_CAMERA.updateProjectionMatrix();

  RENDERER.setSize(sizes.width, sizes.height);
  RENDERER.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  RenderSizePixel();
});

importModels();
updateCanvas();
