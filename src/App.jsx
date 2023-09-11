import React, { useEffect } from "react";
import * as THREE from "three";

import Landing from "./Pages/Landing/Landing";

export default function App() {
  useEffect((_) => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );

    camera.position.y = 0;
    camera.position.z = 10;
    camera.rotation.x = 0;

    const canvas = document.getElementById("scene");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xf0f0f0);
    scene.add(light);

    const sunlight = new THREE.DirectionalLight(0xffffff);
    sunlight.position.set(0, 2, 8);
    scene.add(sunlight);

    const wall = new THREE.PlaneGeometry(100, 250);
    const wallMesh = new THREE.Mesh(
      wall,
      new THREE.MeshStandardMaterial({ color: 0x1d2731 }),
    );
    wallMesh.castShadow = false;
    wallMesh.receiveShadow = true;
    wallMesh.position.set(0, 50, 0);
    scene.add(wallMesh);

    const cube = new THREE.BoxGeometry(1, 1, 1);
    const cubeMesh = new THREE.Mesh(
      cube,
      new THREE.MeshStandardMaterial({ color: 0xe5f2ff }),
    );
    cubeMesh.castShadow = true;
    cubeMesh.position.set(0, 0, 2);
    cubeMesh.rotation.x = -Math.PI / 4;
    cubeMesh.rotation.y = -Math.PI / 4;
    scene.add(cubeMesh);

    const animate = (_) => {
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", (_) => {
      const w = window.innerWidth,
        h = window.innerHeight;

      canvas.width = w;
      canvas.height = h;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    });
  });

  return (
    <div className="max-w-screen h-full min-h-screen w-screen overflow-x-hidden">
      <canvas
        id="scene"
        className="absolute left-0 top-0 -z-10 h-screen w-screen"
      />
      <Landing />
    </div>
  );
}
