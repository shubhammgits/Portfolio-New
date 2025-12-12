'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/store/sceneStore';
import { portfolio } from '@/lib/portfolio';

type PointerMoveEventWithUv = {
  uv?: { x: number; y: number };
};

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
  index: number;
  title: string;
  href?: string;
  description?: string;
  stack?: string[];
  onClick?: () => void;
}

export default function ProjectCard({
  position,
  index,
  title,
  href,
  description,
  stack,
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
      gradient.addColorStop(0, '#6D28D9');
      gradient.addColorStop(1, '#2A0A4A');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);
      
      // Add text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';

      // Title
      ctx.fillText(title, 256, 240);

      // Subtext
      ctx.font = '24px sans-serif';
      ctx.globalAlpha = 0.8;
      ctx.fillText(description ? description.slice(0, 26) + (description.length > 26 ? '…' : '') : 'Double‑click to open', 256, 300);
      ctx.globalAlpha = 1;
    }
    return new THREE.CanvasTexture(canvas);
  }, [title, description]);

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

  const handleDoubleClick = () => {
    if (!href) return;
    window.open(href, '_blank', 'noreferrer');
  };

  const handlePointerMove = (e: PointerMoveEventWithUv) => {
    if (!materialRef.current) return;
    // R3F pointer events include UV on geometries that have it (planeGeometry does)
    const uv = e.uv;
    if (!uv) return;
    materialRef.current.uniforms.uMouse.value.set(uv.x, uv.y);
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onPointerMove={handlePointerMove}
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

      {/* Hover HUD (no new pages/modals; just an info tooltip) */}
      {hovered && (
        <Html
          position={[0, 0, 0.2]}
          transform
          center
          style={{ pointerEvents: 'none' }}
        >
          <div className="glass-morph rounded-2xl px-4 py-3 w-[280px]">
            <div className="text-sm text-dm-text font-semibold">{title}</div>
            {description && <div className="mt-1 text-xs text-body leading-snug">{description}</div>}
            {!!stack?.length && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {stack.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[11px] text-dm-text/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-2 text-[11px] text-body">Double‑click to open ↗</div>
          </div>
        </Html>
      )}

      {/* Frame Border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.1, 2.6]} />
        <meshBasicMaterial color="#2A0A4A" />
      </mesh>
    </mesh>
  );
}

// Projects Gallery Container
export function ProjectsGallery() {
  const projects = portfolio.projects.map((p, id) => ({
    id,
    title: p.title,
    href: p.href,
    description: p.description,
    stack: p.stack,
    image: '/images/project1.jpg',
  }));

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
          index={i}
          title={project.title}
          href={project.href}
          description={project.description}
          stack={project.stack}
        />
      ))}
    </group>
  );
}
