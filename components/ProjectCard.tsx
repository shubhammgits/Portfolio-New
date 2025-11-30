'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';

// Custom Liquid Distortion Shader
const liquidShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uHover;
    varying vec2 vUv;

    // Liquid ripple effect
    vec2 ripple(vec2 uv, vec2 center, float time) {
      vec2 dist = uv - center;
      float distance = length(dist);
      float rippleEffect = sin(distance * 20.0 - time * 5.0) * 0.01 * uHover;
      return uv + normalize(dist) * rippleEffect;
    }

    // Chromatic aberration
    vec3 chromaticAberration(sampler2D tex, vec2 uv, float amount) {
      float r = texture2D(tex, uv + vec2(amount, 0.0)).r;
      float g = texture2D(tex, uv).g;
      float b = texture2D(tex, uv - vec2(amount, 0.0)).b;
      return vec3(r, g, b);
    }

    void main() {
      vec2 uv = vUv;
      
      // Apply ripple distortion
      uv = ripple(uv, uMouse, uTime);
      
      // Chromatic aberration on hover
      vec3 color = chromaticAberration(uTexture, uv, 0.003 * uHover);
      
      // Slight brightness boost on hover
      color += 0.1 * uHover;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

interface ProjectCardProps {
  position: [number, number, number];
  imagePath: string;
  index: number;
  title: string;
  onClick?: () => void;
}

export default function ProjectCard({
  position,
  imagePath,
  index,
  title,
  onClick,
}: ProjectCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const scrollProgress = useSceneStore((state) => state.scrollProgress);
  const focusedProject = useSceneStore((state) => state.focusedProject);
  const setFocusedProject = useSceneStore((state) => state.setFocusedProject);

  // Create a placeholder texture
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Create gradient placeholder
      const gradient = ctx.createLinearGradient(0, 0, 512, 512);
      gradient.addColorStop(0, '#44444E');
      gradient.addColorStop(1, '#333446');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '48px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, 256, 256);
    }
    return new THREE.CanvasTexture(canvas);
  }, [title]);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 0 },
    }),
    [texture]
  );

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    // Update time uniform
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth hover transition
    const targetHover = hovered ? 1 : 0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      0.1
    );

    // Z-axis parallax based on scroll
    const baseZ = position[2];
    const scrollOffset = (scrollProgress - 0.3) * 20; // Start after hero section
    meshRef.current.position.z = baseZ + scrollOffset - index * 2;

    // Rotate slightly as it passes
    meshRef.current.rotation.y = (scrollProgress - 0.3) * 0.2 - index * 0.1;

    // Focus Mode Animation
    if (focusedProject === index) {
      // Move camera close to card
      const targetPos = new THREE.Vector3(
        meshRef.current.position.x,
        meshRef.current.position.y,
        meshRef.current.position.z + 3
      );
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(meshRef.current.position);
    }

    // Floating animation
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
  });

  const handleClick = () => {
    setFocusedProject(focusedProject === index ? null : index);
    onClick?.();
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={focusedProject === index ? [1.2, 1.2, 1.2] : [1, 1, 1]}
    >
      <planeGeometry args={[4, 2.5]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={liquidShader.vertexShader}
        fragmentShader={liquidShader.fragmentShader}
        uniforms={uniforms}
      />

      {/* Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.1, 2.6]} />
        <meshBasicMaterial color="#333446" />
      </mesh>
    </mesh>
  );
}

// Projects Gallery Container
export function ProjectsGallery() {
  const projects = [
    { id: 0, title: 'Project Alpha', image: '/images/project1.jpg' },
    { id: 1, title: 'Project Beta', image: '/images/project2.jpg' },
    { id: 2, title: 'Project Gamma', image: '/images/project3.jpg' },
    { id: 3, title: 'Project Delta', image: '/images/project4.jpg' },
  ];

  return (
    <group position={[0, 0, -30]}>
      {projects.map((project, i) => (
        <ProjectCard
          key={project.id}
          position={[
            (i % 2 === 0 ? -3 : 3),
            Math.floor(i / 2) * -4,
            i * -3,
          ]}
          imagePath={project.image}
          index={i}
          title={project.title}
        />
      ))}
    </group>
  );
}
