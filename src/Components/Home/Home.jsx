import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import styles from "./Home.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Shaders
import simulationVertexShader from "../shaders/vertexShader.glsl?raw";
import simulationFragmentShader from "../shaders/simulationFragmentShader.glsl?raw";
import rendererVertexShader from "../shaders/vertexShader.glsl?raw";
import rendererFragmentShader from "../shaders/rendererFragmentShader.glsl?raw";

import backgroundImg from "../../images/sand.jpg";
import textImg from "../../images/text2.png";

// Gallery images for CircularGallery

import resort6 from "../../images/dummy1.jpg";
import resort7 from "../../images/dummy2.jpg";
import resort8 from "../../images/dummy3.jpg";
import resort9 from "../../images/dummy4.jpg";
import resort10 from "../../images/dummy5.jpg";

const galleryItems = [
  {
    image: resort6,
    text: "Beach Paradise",
  },
  {
    image: resort7,
    text: "Sunset Views",
  },
  {
    image: resort8,
    text: "Ocean Breeze",
  },
  {
    image: resort9,
    text: "Tropical Dreams",
  },
  {
    image: resort10,
    text: "Island Life",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);
  const staticBgRef = useRef(null);
  const textImageRef = useRef(null);
  const galleryRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Track viewport size to disable Three.js on small screens
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const handleChange = (e) => setIsSmallScreen(e.matches);
    setIsSmallScreen(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", handleChange);
    } else {
      mql.addListener(handleChange);
    }
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handleChange);
      } else {
        mql.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen || !canvasRef.current) {
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

    // Listen on window so scrolling sections remain interactive
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

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
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      simMaterial.dispose();
      rendererMaterial.dispose();
      combinedTexture.dispose();
    };
  }, [isSmallScreen]);

  // === ScrollTrigger: Simple scroll behavior ===
  useEffect(() => {
    if (!heroRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const backgroundEl = isSmallScreen
      ? staticBgRef.current
      : canvasRef.current;
    const textEl = textRef.current;
    const buttonsEl = buttonsRef.current;
    const textPngEl = isSmallScreen ? textImageRef.current : null;
    const galleryEl = galleryRef.current;

    if (backgroundEl) gsap.set(backgroundEl, { opacity: 1 });
    if (textEl) gsap.set(textEl, { opacity: 1 });
    if (buttonsEl) gsap.set(buttonsEl, { opacity: 1 });
    if (textPngEl) gsap.set(textPngEl, { opacity: 1 });

    // Gallery scroll effect - simple direct transform approach
    if (galleryEl) {
      let lastScrollY = window.scrollY;
      let isInGallery = false;
      let currentPosition = 0; // Track current position: 0 = center, -1 = left, 1 = right
      let isAnimating = false; // Prevent multiple animations at once

      const handleScroll = () => {
        if (!galleryEl || !isInGallery) return;

        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > lastScrollY ? 1 : -1;

        console.log(
          `Scroll detected: ${
            scrollDirection === 1 ? "DOWN" : "UP"
          }, Position: ${currentPosition}, Animating: ${isAnimating}`
        );

        // Only move if we haven't reached the limits and not currently animating
        if (scrollDirection === 1 && currentPosition > -2 && !isAnimating) {
          // Scrolling down: move left
          currentPosition--;
          isAnimating = true;
          console.log(`Moving LEFT to position ${currentPosition}`);

          const galleryContainer = galleryEl.querySelector(
            `.${styles.gallery}`
          );
          if (galleryContainer) {
            // Calculate the new position
            const newPosition = currentPosition * 200; // 200px per step
            galleryContainer.style.transform = `translateX(${newPosition}px)`;

            // Reset animation flag after animation completes
            setTimeout(() => {
              isAnimating = false;
              console.log("Animation completed, can move again");
            }, 300);
          }
        } else if (
          scrollDirection === -1 &&
          currentPosition < 0 &&
          !isAnimating
        ) {
          // Scrolling up: move right
          currentPosition++;
          isAnimating = true;
          console.log(`Moving RIGHT to position ${currentPosition}`);

          const galleryContainer = galleryEl.querySelector(
            `.${styles.gallery}`
          );
          if (galleryContainer) {
            // Calculate the new position
            const newPosition = currentPosition * 200; // 200px per step
            galleryContainer.style.transform = `translateX(${newPosition}px)`;

            // Reset animation flag after animation completes
            setTimeout(() => {
              isAnimating = false;
              console.log("Animation completed, can move again");
            }, 300);
          }
        }

        lastScrollY = currentScrollY;
      };

      // Add scroll listener immediately for testing
      window.addEventListener("scroll", handleScroll);

      ScrollTrigger.create({
        trigger: galleryEl,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          isInGallery = true;
          console.log("Entered gallery section");
          // Reset position when entering
          currentPosition = 0;
          const galleryContainer = galleryEl.querySelector(
            `.${styles.gallery}`
          );
          if (galleryContainer) {
            galleryContainer.style.transform = "translateX(0px)";
          }
        },
        onLeave: () => {
          isInGallery = false;
          console.log("Left gallery section");
          // Reset position when leaving
          currentPosition = 0;
          const galleryContainer = galleryEl.querySelector(
            `.${styles.gallery}`
          );
          if (galleryContainer) {
            galleryContainer.style.transform = "translateX(0px)";
          }
        },
      });
    }

    // No pinning - let content scroll naturally
    return () => {
      // Cleanup if needed
    };
  }, [isSmallScreen]);

  return (
    <div className={styles.home}>
      <section ref={heroRef} className={styles.hero}>
        {isSmallScreen ? (
          <div
            ref={staticBgRef}
            className={styles.staticBg}
            style={{ backgroundImage: `url(${backgroundImg})` }}
          />
        ) : (
          <canvas ref={canvasRef} className={styles.canvas} />
        )}
        {isSmallScreen ? (
          <img
            ref={textImageRef}
            src={textImg}
            alt="Sand Bank Resort"
            className={styles.textImage}
          />
        ) : null}
        {/* 
        <p ref={textRef} className={styles.introText}>
          Find your perfect spot in the sand, where time slows down and the
          waves write your story
        </p>
        */}
        {/* <div ref={buttonsRef} className={styles.buttonContainer}>
          <button
            className={`${styles.actionButton} ${styles.filled}`}
            onClick={() => navigate("/gallery")}
          >
            Gallery
          </button>
          <button
            className={`${styles.actionButton} ${styles.outlined}`}
            onClick={() => navigate("/resort")}
          >
            Resort
          </button>
        </div> */}

        {/* Vertical Scroll Down Text 
        <div className={styles.scrollDownText}>
          <span className={styles.scrollLetter}>S</span>
          <span className={styles.scrollLetter}>c</span>
          <span className={styles.scrollLetter}>r</span>
          <span className={styles.scrollLetter}>o</span>
          <span className={styles.scrollLetter}>l</span>
          <span className={styles.scrollLetter}>&nbsp;</span>
          <span className={styles.scrollLetter}>d</span>
          <span className={styles.scrollLetter}>o</span>
          <span className={styles.scrollLetter}>w</span>
          <span className={styles.scrollLetter}>n</span>
        </div> */}
      </section>
      <section className={styles.subHero}>
        {/* SVG Definitions for gradient */}
        {/*
        <div className={styles.waveContainer}>
          <Wave
            fill="#1c5666"
            paused={false}
            className={styles.waveLayer1}
            options={{
              height: 0,
              amplitude: 40,
              speed: 0.15,
              points: 5,
            }}
          />
        </div>
        */}

        <div className={styles.subHeroInner}>
          <h2 className={styles.subheroIntro}>
            Find your perfect spot in the sand, where time slows down and the
            waves write your story
          </h2>

          <p>Enjoy your stay in our comfortable and clean rooms.</p>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section ref={galleryRef} className={styles.galleryWrapper}>
        <div className={styles.gallery}>
          {[...galleryItems, ...galleryItems].map((item, index) => (
            <div key={index} style={{ padding: "1rem" }}>
              <img
                src={item.image}
                alt={item.text || `Gallery ${index + 1}`}
                className={`${styles.galleryImage} ${
                  index % 2 === 0 ? styles.rotateLeft : styles.rotateRight
                }`}
                width="350"
                height="378"
              />
            </div>
          ))}
        </div>

        {/* Gallery Button - Positioned in top-right corner of gallery section */}
        <div className={styles.galleryButtonContainer}>
          <button
            className={styles.galleryButton}
            onClick={() => navigate("/gallery")}
          >
            GALLERY
          </button>
        </div>
      </section>

      {/* Scrolling About Text Section 
      <section className={styles.scrollingAboutSection}>
        <ScrollVelocity
          texts={["Dive into our offerings"]}
          className="custom-scroll-text"
        />
        <AmenitiesSection />
      </section>
      */}
    </div>
  );
}
