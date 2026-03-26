import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const PARTICLE_COUNT = 200;

function buildParticles() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    const t = Math.random();
    if (t < 0.4) {
      colors[i * 3] = 0.39; colors[i * 3 + 1] = 0.40; colors[i * 3 + 2] = 0.95;
    } else if (t < 0.7) {
      colors[i * 3] = 0.13; colors[i * 3 + 1] = 0.83; colors[i * 3 + 2] = 0.93;
    } else {
      colors[i * 3] = 0.66; colors[i * 3 + 1] = 0.33; colors[i * 3 + 2] = 0.97;
    }
  }
  return { positions, colors };
}

const { positions: POSITIONS, colors: COLORS } = buildParticles();

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = { positions: POSITIONS, colors: COLORS };

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.elapsedTime * 0.025;
    pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.018) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <Stars radius={90} depth={60} count={4000} factor={3} saturation={0} fade speed={0.4} />
        <ParticleField />
      </Suspense>
    </Canvas>
  );
}
