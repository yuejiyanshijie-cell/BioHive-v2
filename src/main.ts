import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

const scene = new Scene(engine);
scene.clearColor = new Color4(0.529, 0.808, 0.922, 1); // sky blue

// Camera
const camera = new FreeCamera("camera", new Vector3(0, 30, 60), scene);
camera.attachControl(canvas, true);
camera.setTarget(new Vector3(0, 0, 0));

// Lights
const ambient = new HemisphericLight("ambient", new Vector3(0, 1, 0), scene);
ambient.intensity = 0.7;

const sun = new DirectionalLight("sun", new Vector3(-0.5, -0.8, -0.5), scene);
sun.intensity = 1.2;
sun.position = new Vector3(100, 150, 80);

// Shadow generator
const shadowGen = new ShadowGenerator(2048, sun);
shadowGen.useBlurExponentialShadowMap = true;

// Ground
const ground = MeshBuilder.CreateGround("ground", { width: 500, height: 500 }, scene);
const groundMat = new StandardMaterial("groundMat", scene);
groundMat.diffuseColor = new Color3(0.29, 0.54, 0.23);
groundMat.specularColor = Color3.Black();
ground.material = groundMat;
ground.receiveShadows = true;

// Simple trees and rocks to confirm rendering
for (let i = 0; i < 50; i++) {
  const x = (Math.random() - 0.5) * 480;
  const z = (Math.random() - 0.5) * 480;

  // Trunk
  const trunk = MeshBuilder.CreateCylinder("trunk" + i, { height: 2.5, diameterTop: 0.5, diameterBottom: 0.9 }, scene);
  trunk.position.set(x, 1.25, z);
  const trunkMat = new StandardMaterial("trunkMat" + i, scene);
  trunkMat.diffuseColor = new Color3(0.29, 0.18, 0.11);
  trunk.material = trunkMat;
  shadowGen.addShadowCaster(trunk);

  // Foliage
  const leaves = MeshBuilder.CreateSphere("leaves" + i, { diameter: 3.6, segments: 6 }, scene);
  leaves.position.set(x, 3.5, z);
  const leafMat = new StandardMaterial("leafMat" + i, scene);
  leafMat.diffuseColor = new Color3(0.18, 0.35, 0.18);
  leaves.material = leafMat;
  shadowGen.addShadowCaster(leaves);
}

// Render loop
engine.runRenderLoop(() => {
  scene.render();
});

window.addEventListener("resize", () => {
  engine.resize();
});

console.log("BioHive Evolution — Babylon.js renderer initialized");
