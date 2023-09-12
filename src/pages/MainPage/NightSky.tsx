import { useEffect, useRef } from "react";
import * as THREE from "three";
import "../../assets/css/MainPage.css";

function NightSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current! });
    renderer.setSize(width, height);

    const starsGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.005,
    }); // 조정된 크기

    const starsPositions = new Float32Array(1000 * 3); 

    for (let i = 0; i < 2000; i++) {
      const i3 = i * 3;
      starsPositions[i3] = THREE.MathUtils.randFloatSpread(10);
      starsPositions[i3 + 1] = THREE.MathUtils.randFloatSpread(10);
      starsPositions[i3 + 2] = THREE.MathUtils.randFloatSpread(10);
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starsPositions, 3)
    );

    const stars = new THREE.Points(starsGeometry, starMaterial);
    scene.add(stars);

    function handleResize() {
      width = container.clientWidth;
      height = Math.max(container.clientHeight, 900);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    window.addEventListener("resize", handleResize);

    function animate() {
      requestAnimationFrame(animate);

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      starsGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default NightSky;
