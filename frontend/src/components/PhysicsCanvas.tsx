import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface PhysicsCanvasProps {
  simulationType: 'projectile' | 'collision' | 'circular';
  params: {
    velocity: number;
    angle: number;
    mass?: number;
  };
  isPlaying: boolean;
  onAnimationComplete?: () => void;
}

export default function PhysicsCanvas({
  simulationType,
  params,
  isPlaying,
  onAnimationComplete,
}: PhysicsCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const projectileRef = useRef<THREE.Mesh | null>(null);
  const trailRef = useRef<THREE.LineSegments | null>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);
  const [stats, setStats] = useState({
    maxHeight: 0,
    range: 0,
    timeOfFlight: 0,
  });

  // Physics Constants
  const G = 9.8; // gravity
  const SCALE = 0.05; // Scale factor for visualization

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f4ff);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 1);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x90ee90 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Projectile
    const projectileGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const projectileMaterial = new THREE.MeshStandardMaterial({ color: 0xff6b6b });
    const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);
    projectile.castShadow = true;
    projectile.position.set(0, 0, 0);
    scene.add(projectile);
    projectileRef.current = projectile;

    // Trail line
    const trailGeometry = new THREE.BufferGeometry();
    const trailMaterial = new THREE.LineBasicMaterial({ color: 0x4f46e5, linewidth: 2 });
    const trail = new THREE.LineSegments(trailGeometry, trailMaterial);
    scene.add(trail);
    trailRef.current = trail;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update animation based on params and playing state
  useEffect(() => {
    if (!isPlaying || !projectileRef.current || !sceneRef.current) return;

    timeRef.current = 0;

    const velocityMs = params.velocity;
    const angleRad = (params.angle * Math.PI) / 180;
    const vx = velocityMs * Math.cos(angleRad);
    const vy = velocityMs * Math.sin(angleRad);

    // Calculate physics
    const timeOfFlight = (2 * vy) / G;
    const maxHeightMeters = (vy * vy) / (2 * G);
    const rangeMeters = vx * timeOfFlight;

    setStats({
      maxHeight: parseFloat(maxHeightMeters.toFixed(2)),
      range: parseFloat(rangeMeters.toFixed(2)),
      timeOfFlight: parseFloat(timeOfFlight.toFixed(2)),
    });

    // Trail points
    const trailPoints: THREE.Vector3[] = [];

    const animationFrame = () => {
      if (timeRef.current > timeOfFlight) {
        if (onAnimationComplete) onAnimationComplete();
        return;
      }

      const t = timeRef.current;
      const x = vx * t;
      const y = Math.max(0, vy * t - 0.5 * G * t * t);

      if (projectileRef.current) {
        projectileRef.current.position.x = x * SCALE;
        projectileRef.current.position.y = y * SCALE;
      }

      // Add trail point
      if (trailPoints.length === 0 || t % 0.05 < 0.02) {
        trailPoints.push(new THREE.Vector3(x * SCALE, y * SCALE, 0));
      }

      // Update trail
      if (trailRef.current) {
        const geometry = new THREE.BufferGeometry().setFromPoints(trailPoints);
        trailRef.current.geometry.dispose();
        trailRef.current.geometry = geometry;
      }

      timeRef.current += 0.016; // ~60fps

      animationRef.current = requestAnimationFrame(animationFrame);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animationFrame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, params, onAnimationComplete]);

  return (
    <div className="w-full h-full">
      <div ref={containerRef} className="w-full h-full min-h-96 rounded-lg overflow-hidden" />
      {isPlaying && (
        <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg text-sm space-y-2 z-10">
          <p className="font-semibold text-gray-900">Simulation Stats</p>
          <p className="text-gray-700">Max Height: {stats.maxHeight.toFixed(2)}m</p>
          <p className="text-gray-700">Range: {stats.range.toFixed(2)}m</p>
          <p className="text-gray-700">Flight Time: {stats.timeOfFlight.toFixed(2)}s</p>
        </div>
      )}
    </div>
  );
}
