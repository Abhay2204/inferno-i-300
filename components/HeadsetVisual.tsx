import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const HeadsetModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/assets/gaming+headset+3d+model.glb');
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    // Realistic black headphone with RGB glow
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const material = mesh.material as THREE.MeshStandardMaterial;
          
          // Check if material has emissive properties (RGB glow)
          const hasEmissive = material.emissive && material.emissive.getHex() !== 0;
          
          if (hasEmissive) {
            // Boost RGB aura lighting - make it vibrant and bright
            material.emissiveIntensity = 5;
            material.toneMapped = false;
          } else {
            // Check for speaker/driver parts to add RGB glow
            if (mesh.name.toLowerCase().includes('speaker') || 
                mesh.name.toLowerCase().includes('driver') || 
                mesh.name.toLowerCase().includes('light') ||
                mesh.name.toLowerCase().includes('led') ||
                mesh.name.toLowerCase().includes('glow')) {
              // Add RGB glow to speaker/LED areas - alternating red and blue
              const isLeft = mesh.position.x < 0;
              material.emissive = new THREE.Color(isLeft ? '#ff0000' : '#0000ff'); // Red left, Blue right
              material.emissiveIntensity = 5;
              material.toneMapped = false;
            } else if (mesh.name.includes('cushion') || mesh.name.includes('pad') || mesh.name.includes('foam')) {
              // Soft black leather for cushions
              material.color.set('#0d0d0d');
              material.metalness = 0.05;
              material.roughness = 0.9;
            } else if (mesh.name.includes('metal') || mesh.name.includes('frame') || mesh.name.includes('band')) {
              // Matte black metal for frame
              material.color.set('#1a1a1a');
              material.metalness = 0.6;
              material.roughness = 0.4;
            } else {
              // Matte black plastic for body
              material.color.set('#0a0a0a');
              material.metalness = 0.1;
              material.roughness = 0.7;
            }
          }
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set initial position immediately to prevent flicker
  useEffect(() => {
    if (groupRef.current) {
      // Responsive scale based on screen size
      const getResponsiveScale = () => {
        const width = window.innerWidth;
        if (width < 768) return 2; // Mobile
        if (width < 1024) return 2.5; // Tablet
        return 3.5; // Desktop
      };

      const scale = getResponsiveScale();
      groupRef.current.position.set(3, 0, 0);
      groupRef.current.scale.set(scale, scale, scale);
      groupRef.current.rotation.set(0, 0, 0);

      // Update scale on resize
      const handleResize = () => {
        if (groupRef.current) {
          const newScale = getResponsiveScale();
          gsap.to(groupRef.current.scale, { x: newScale, y: newScale, z: newScale, duration: 0.3 });
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-container",
          start: "top top",
          end: "bottom bottom",
          scrub: 2
        }
      });

      // Hero Section (0-20%) - Stay Right side
      tl.to(groupRef.current.position, { x: 3, y: 0, z: 0, duration: 2, ease: "none" }, 0);
      tl.to(groupRef.current.rotation, { y: Math.PI * 0.2, duration: 2, ease: "none" }, 0);

      // ANC Section (20-40%) - Move to Left and Stay
      tl.to(groupRef.current.position, { x: -3, y: 0, z: 0, duration: 2, ease: "power2.inOut" }, 2);
      tl.to(groupRef.current.rotation, { y: Math.PI * 0.7, duration: 2, ease: "power2.inOut" }, 2);

      // Absolute Silence Section (40-60%) - Move to Right and Stay
      tl.to(groupRef.current.position, { x: 3, y: 0, z: 0, duration: 2, ease: "power2.inOut" }, 4);
      tl.to(groupRef.current.rotation, { y: Math.PI * 1.3, duration: 2, ease: "power2.inOut" }, 4);

      // Spatial Awareness Section (60-80%) - Move to Center and Stay
      tl.to(groupRef.current.position, { x: 0, y: 0, z: 0, duration: 2, ease: "power2.inOut" }, 6);
      tl.to(groupRef.current.rotation, { y: Math.PI * 2, duration: 2, ease: "power2.inOut" }, 6);

      // Zero Latency Section (80-100%) - Stay Center then fade out
      tl.to(groupRef.current.position, { x: 0, y: 0, z: 0, duration: 1.8, ease: "none" }, 8);
      
      // Fade out at the end of Zero Latency (98-100%)
      tl.to(groupRef.current, { visible: false, duration: 0.2 }, 9.8);

    });

    return () => ctx.revert();
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const HeadsetVisual: React.FC = () => {
  // Responsive FOV
  const getFOV = () => {
    const width = window.innerWidth;
    if (width < 768) return 60; // Mobile - wider FOV
    if (width < 1024) return 55; // Tablet
    return 50; // Desktop
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={getFOV()} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} />
        
        {/* RGB Accent Lights for Glow Effect */}
        <pointLight position={[-2, 0, 2]} intensity={2.5} color="#ff0000" distance={5} />
        <pointLight position={[2, 0, 2]} intensity={2.5} color="#0000ff" distance={5} />
        <pointLight position={[0, 2, 2]} intensity={2} color="#00ffff" distance={4} />
        <pointLight position={[0, -1, 2]} intensity={1.5} color="#ff0000" distance={3} />
        
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.4} penumbra={1} />
        
        <Suspense fallback={null}>
          <HeadsetModel />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeadsetVisual;