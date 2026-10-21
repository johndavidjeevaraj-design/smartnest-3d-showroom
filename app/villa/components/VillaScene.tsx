"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type SceneProps = {
  gateOpen: boolean;
  lightsOn: boolean;
  sceneMode: string;
};

function Box({
  position,
  size,
  color,
  roughness = 0.75,
  metalness = 0,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
}) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
      />
    </mesh>
  );
}

function Window({
  position,
  size = [1.25, 1.35, 0.12],
}: {
  position: [number, number, number];
  size?: [number, number, number];
}) {
  return (
    <group position={position}>
      <Box position={[0, 0, 0]} size={[size[0] + 0.14, size[1] + 0.14, size[2] + 0.06]} color="#202b36" metalness={0.45} />
      <Box position={[0, 0, 0.075]} size={[size[0], size[1], 0.035]} color="#263f52" roughness={0.18} metalness={0.35} />
      <Box position={[0, 0, 0.1]} size={[0.045, size[1], 0.04]} color="#c5d1d9" metalness={0.7} />
      <Box position={[0, 0, 0.1]} size={[size[0], 0.045, 0.04]} color="#c5d1d9" metalness={0.7} />
    </group>
  );
}

function Tree({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.2, 1.6, 8]} />
        <meshStandardMaterial color="#72503a" />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow>
        <sphereGeometry args={[0.9, 12, 10]} />
        <meshStandardMaterial color="#2e6849" roughness={0.95} />
      </mesh>
      <mesh position={[0.35, 2.25, 0.1]} castShadow>
        <sphereGeometry args={[0.55, 10, 8]} />
        <meshStandardMaterial color="#3e8055" roughness={0.95} />
      </mesh>
    </group>
  );
}

function Gate({
  open,
}: {
  open: boolean;
}) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const target = open ? 4.3 : 0;
    const step = Math.min(1, delta * 2.4);

    if (left.current) {
      left.current.position.x = THREE.MathUtils.damp(
        left.current.position.x,
        -2.1 - target,
        3,
        delta,
      );
    }

    if (right.current) {
      right.current.position.x = THREE.MathUtils.damp(
        right.current.position.x,
        2.1 + target,
        3,
        delta,
      );
    }
  });

  return (
    <group>
      <Box position={[-4.65, 1.15, 6.7]} size={[0.48, 2.4, 0.55]} color="#c8cbd0" />
      <Box position={[4.65, 1.15, 6.7]} size={[0.48, 2.4, 0.55]} color="#c8cbd0" />
      <Box position={[-4.65, 2.4, 6.7]} size={[0.72, 0.12, 0.78]} color="#1687ff" metalness={0.5} />
      <Box position={[4.65, 2.4, 6.7]} size={[0.72, 0.12, 0.78]} color="#1687ff" metalness={0.5} />

      <group ref={left} position={[-2.1, 0, 0]}>
        <Box position={[-0.95, 1.05, 6.7]} size={[2.05, 1.9, 0.16]} color="#202a38" metalness={0.65} />
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} position={[-1.82 + i * 0.25, 1.05, 6.59]} size={[0.055, 1.68, 0.08]} color="#8c9baa" metalness={0.8} />
        ))}
        <Box position={[-0.95, 1.05, 6.58]} size={[0.07, 1.9, 0.1]} color="#1687ff" metalness={0.7} />
      </group>

      <group ref={right} position={[2.1, 0, 0]}>
        <Box position={[0.95, 1.05, 6.7]} size={[2.05, 1.9, 0.16]} color="#202a38" metalness={0.65} />
        {Array.from({ length: 8 }, (_, i) => (
          <Box key={i} position={[0.08 + i * 0.25, 1.05, 6.59]} size={[0.055, 1.68, 0.08]} color="#8c9baa" metalness={0.8} />
        ))}
        <Box position={[0.95, 1.05, 6.58]} size={[0.07, 1.9, 0.1]} color="#1687ff" metalness={0.7} />
      </group>
    </group>
  );
}

function GardenLamp({
  position,
  lightsOn,
}: {
  position: [number, number, number];
  lightsOn: boolean;
}) {
  return (
    <group position={position}>
      <Box position={[0, 0.7, 0]} size={[0.09, 1.4, 0.09]} color="#303a47" metalness={0.7} />
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial
          color={lightsOn ? "#ffe2a0" : "#68717c"}
          emissive={lightsOn ? "#ffb84d" : "#000000"}
          emissiveIntensity={lightsOn ? 2.2 : 0}
        />
      </mesh>
      {lightsOn && (
        <pointLight position={[0, 1.45, 0]} intensity={1.5} distance={4} color="#ffd08a" />
      )}
    </group>
  );
}

function VillaModel({ gateOpen, lightsOn, sceneMode }: SceneProps) {
  const awayMode = sceneMode === "Away";
  const interiorGlow = lightsOn && !awayMode;

  return (
    <>
      <color attach="background" args={["#d9e5ef"]} />
      <fog attach="fog" args={["#d9e5ef", 28, 65]} />

      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#eaf4ff", "#62725d", 1.1]} />
      <directionalLight
        position={[8, 15, 7]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Site and lawn */}
      <Box position={[0, -0.22, 0]} size={[28, 0.4, 25]} color="#a6b39a" />
      <Box position={[0, -0.005, 0]} size={[19, 0.08, 18]} color="#668461" />

      {/* Street and entrance driveway */}
      <Box position={[0, -0.01, 10.1]} size={[28, 0.1, 4.1]} color="#555d66" />
      <Box position={[0, 0.015, 6.7]} size={[8.7, 0.07, 6.8]} color="#858b91" />
      {Array.from({ length: 9 }, (_, i) => (
        <Box key={i} position={[-3.8 + i * 0.95, 0.06, 6.8]} size={[0.025, 0.015, 6.2]} color="#c0c3c4" />
      ))}

      {/* Compound walls */}
      <Box position={[-9.3, 0.8, 0.5]} size={[0.42, 1.6, 13.3]} color="#d2d2ce" />
      <Box position={[9.3, 0.8, 0.5]} size={[0.42, 1.6, 13.3]} color="#d2d2ce" />
      <Box position={[0, 0.8, -6.1]} size={[18.6, 1.6, 0.42]} color="#d2d2ce" />
      <Box position={[-7.1, 0.8, 6.7]} size={[4.2, 1.6, 0.42]} color="#d2d2ce" />
      <Box position={[7.1, 0.8, 6.7]} size={[4.2, 1.6, 0.42]} color="#d2d2ce" />
      <Box position={[0, 1.65, -6.1]} size={[18.8, 0.12, 0.58]} color="#777f87" />
      <Box position={[-7.1, 1.65, 6.7]} size={[4.3, 0.12, 0.58]} color="#777f87" />
      <Box position={[7.1, 1.65, 6.7]} size={[4.3, 0.12, 0.58]} color="#777f87" />

      {/* Two-storey modern Indian villa */}
      <Box position={[0, 1.8, -2.2]} size={[11.2, 3.55, 6.5]} color="#e5e3dc" />
      <Box position={[0.8, 1.88, 1.12]} size={[4.4, 3.65, 0.22]} color="#f3f0e9" />
      <Box position={[-3.6, 1.75, 1.13]} size={[2.1, 3.25, 0.25]} color="#b8a58f" />
      <Box position={[0.1, 3.75, -2.15]} size={[11.8, 0.25, 7]} color="#333b45" />
      <Box position={[0.8, 4.95, -2.3]} size={[8.4, 2.45, 5.6]} color="#e6e4de" />
      <Box position={[0.8, 6.23, -2.3]} size={[9, 0.2, 6]} color="#303944" />
      <Box position={[0.8, 4.86, 0.55]} size={[5.1, 2.4, 0.22]} color="#f2f0e9" />

      {/* Architectural accent fins */}
      {[-3.6, -3.15, -2.7, -2.25, -1.8].map((x) => (
        <Box key={x} position={[x, 2.05, 1.28]} size={[0.09, 3.25, 0.18]} color="#5a5047" />
      ))}

      {/* Front glazing and windows */}
      <Window position={[-1.1, 1.85, 1.27]} size={[2.3, 2.45, 0.1]} />
      <Window position={[2.1, 1.95, 1.27]} size={[1.8, 2.4, 0.1]} />
      <Window position={[4.2, 1.95, 1.27]} size={[1.1, 2.4, 0.1]} />
      <Window position={[-1.15, 4.95, 0.7]} size={[2.6, 1.75, 0.1]} />
      <Window position={[2.1, 4.95, 0.7]} size={[2.1, 1.75, 0.1]} />
      <Window position={[4.2, 4.95, 0.7]} size={[1.2, 1.75, 0.1]} />

      {/* Main entrance and porch */}
      <Box position={[1.25, 1.15, 1.45]} size={[1.05, 2.25, 0.18]} color="#634936" />
      <Box position={[1.25, 2.32, 1.48]} size={[1.25, 0.12, 0.2]} color="#c6b59b" />
      <Box position={[1.15, 0.12, 2.1]} size={[4.4, 0.2, 2.1]} color="#c9c8c2" />
      <Box position={[1.15, 2.75, 2.1]} size={[4.5, 0.18, 2.2]} color="#343d47" />
      <Box position={[-0.7, 1.4, 2.05]} size={[0.14, 2.7, 0.14]} color="#d2d1ca" />
      <Box position={[3, 1.4, 2.05]} size={[0.14, 2.7, 0.14]} color="#d2d1ca" />

      {/* Balcony */}
      <Box position={[0.8, 3.8, 1.2]} size={[5.2, 0.12, 1.2]} color="#626c75" />
      <Box position={[0.8, 4.35, 1.7]} size={[5.2, 0.08, 0.08]} color="#bac5ce" metalness={0.7} />
      {Array.from({ length: 15 }, (_, i) => (
        <Box key={i} position={[-1.7 + i * 0.36, 4.08, 1.7]} size={[0.045, 0.55, 0.045]} color="#c2cbd2" metalness={0.75} />
      ))}

      {/* Side glazing and roof volume */}
      <Window position={[-5.66, 1.9, -2.3]} size={[0.1, 1.8, 2.2]} />
      <Window position={[5.66, 1.95, -2.3]} size={[0.1, 1.9, 2.2]} />
      <Box position={[-2.2, 6.38, -2.2]} size={[2.3, 0.16, 5.8]} color="#303943" />
      <Box position={[4.6, 6.38, -2.2]} size={[2.2, 0.16, 5.8]} color="#303943" />

      {/* Garden beds, trees and lighting */}
      <Box position={[-6.5, 0.1, 2.7]} size={[3.1, 0.18, 2.3]} color="#405e3f" />
      <Box position={[6.6, 0.1, 2.7]} size={[3.1, 0.18, 2.3]} color="#405e3f" />
      <Tree position={[-6.6, 0, 2.4]} scale={0.85} />
      <Tree position={[6.7, 0, 2.4]} scale={0.9} />
      <Tree position={[-7.3, 0, -3.9]} scale={1.1} />
      <Tree position={[7.2, 0, -3.8]} scale={1.05} />
      <Tree position={[-5.8, 0, -5.1]} scale={0.7} />
      <Tree position={[5.8, 0, -5.1]} scale={0.75} />

      <GardenLamp position={[-4.7, 0, 4.8]} lightsOn={interiorGlow} />
      <GardenLamp position={[4.7, 0, 4.8]} lightsOn={interiorGlow} />
      <GardenLamp position={[-8.3, 0, 0.8]} lightsOn={interiorGlow} />
      <GardenLamp position={[8.3, 0, 0.8]} lightsOn={interiorGlow} />

      {/* Low planting along the entry path */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[-3.5 + i * 1.15, 0.24, 4.25]} castShadow>
          <sphereGeometry args={[0.28, 10, 8]} />
          <meshStandardMaterial color={i % 2 ? "#477c4f" : "#588b59"} />
        </mesh>
      ))}

      {/* Animated entrance gate */}
      <Gate open={gateOpen} />

      {/* Simulated warm house lighting */}
      {interiorGlow && (
        <>
          <pointLight position={[-1, 2.2, 0.2]} intensity={2.3} distance={7} color="#ffd7a0" />
          <pointLight position={[2.8, 2.2, 0.2]} intensity={1.7} distance={6} color="#ffe1b5" />
          <pointLight position={[0.8, 5, 0.1]} intensity={1.6} distance={6} color="#c4e1ff" />
        </>
      )}
    </>
  );
}

export default function VillaScene(props: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      camera={{ position: [15, 11, 19], fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
    >
      <VillaModel {...props} />
      <OrbitControls
        makeDefault
        target={[0, 2.2, 0]}
        minDistance={10}
        maxDistance={34}
        maxPolarAngle={Math.PI / 2.02}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
