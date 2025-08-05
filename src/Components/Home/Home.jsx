import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import styles from "./Home.module.css";

// Shaders
import simulationVertexShader from "../shaders/vertexShader.glsl?raw";
import simulationFragmentShader from "../shaders/simulationFragmentShader.glsl?raw";
import rendererVertexShader from "../shaders/vertexShader.glsl?raw";
import rendererFragmentShader from "../shaders/rendererFragmentShader.glsl?raw";

import backgroundImg from "../../images/sand.jpg";
import textImg from "../../images/text2.png";

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    // === Initialize Three.js ===
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const mouse = new THREE.Vector2();
    let frame = 0;

    let width = window.innerWidth * window.devicePixelRatio;
    let height = window.innerHeight * window.devicePixelRatio;
    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: true,
    };

    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const rendererMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null }, // This will be the combined background+text image
      },
      vertexShader: rendererVertexShader,
      fragmentShader: rendererFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const rendererQuad = new THREE.Mesh(plane, rendererMaterial);

    simScene.add(simQuad);
    scene.add(rendererQuad);

    // === Load background & text images ===
    const backgroundImgEl = new Image();
    const textImgEl = new Image();

    backgroundImgEl.crossOrigin = "";
    textImgEl.crossOrigin = "";

    let imagesLoaded = 0;
    const checkAndMerge = () => {
      if (++imagesLoaded === 2) {
        mergeImages();
      }
    };

    backgroundImgEl.onload = checkAndMerge;
    textImgEl.onload = checkAndMerge;

    backgroundImgEl.src = backgroundImg;
    textImgEl.src = textImg;

    // Create a canvas to merge both images (background + text)
    const combinedCanvas = document.createElement("canvas");
    combinedCanvas.width = width;
    combinedCanvas.height = height;
    const ctx = combinedCanvas.getContext("2d");

    const combinedTexture = new THREE.CanvasTexture(combinedCanvas);
    combinedTexture.minFilter = THREE.LinearFilter;
    combinedTexture.magFilter = THREE.LinearFilter;
    combinedTexture.format = THREE.RGBAFormat;

    const mergeImages = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(backgroundImgEl, 0, 0, width, height);
      ctx.drawImage(
        textImgEl,
        width / 2 - textImgEl.width / 2,
        height / 2 - textImgEl.height / 2
      );
      combinedTexture.needsUpdate = true;
    };

    rendererMaterial.uniforms.textureB.value = combinedTexture;

    // === Resize Handler ===
    const handleResize = () => {
      width = window.innerWidth * window.devicePixelRatio;
      height = window.innerHeight * window.devicePixelRatio;

      renderer.setSize(window.innerWidth, window.innerHeight);
      rtA.setSize(width, height);
      rtB.setSize(width, height);
      simMaterial.uniforms.resolution.value.set(width, height);

      combinedCanvas.width = width;
      combinedCanvas.height = height;
      mergeImages();
    };
    window.addEventListener("resize", handleResize);

    // === Mouse Events ===
    const handleMouseMove = (e) => {
      mouse.x = e.clientX * window.devicePixelRatio;
      mouse.y = (window.innerHeight - e.clientY) * window.devicePixelRatio;
    };
    const handleMouseLeave = () => mouse.set(0, 0);

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);

    // === Animation Loop ===
    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      rendererMaterial.uniforms.textureA.value = rtB.texture;
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      [rtA, rtB] = [rtB, rtA];

      requestAnimationFrame(animate);
    };
    animate();

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      simMaterial.dispose();
      rendererMaterial.dispose();
      combinedTexture.dispose();
    };
  }, []);

  return (
    <div className={styles.home}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <p className={styles.introText}>
        Find your perfect spot in the sand, where time slows down and the waves
        write your story
      </p>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.actionButton} ${styles.filled}`}
          onClick={() => navigate("/resort")}
        >
          resort
        </button>
        <button
          className={`${styles.actionButton} ${styles.outlined}`}
          onClick={() => navigate("/gallery")}
        >
          gallery
        </button>
      </div>
    </div>
  );
}
