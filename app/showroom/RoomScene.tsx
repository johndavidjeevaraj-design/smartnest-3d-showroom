"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import type { ShowroomMaterial } from "./catalog";

function createTileMap(material: ShowroomMaterial) {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 768;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D is unavailable for material previews.");
  }

  const tileSize = canvas.width / 4;
  context.fillStyle = material.grout;
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      const left = column * tileSize + 5;
      const top = row * tileSize + 5;
      const width = tileSize - 10;
      const height = tileSize - 10;
      const variation = (row * 17 + column * 29) % 13;
      const tileColor = new THREE.Color(material.color)
        .offsetHSL(0, 0, (variation - 6) / 180)
        .getStyle();

      context.save();
      context.beginPath();
      context.rect(left, top, width, height);
      context.clip();
      context.fillStyle = tileColor;
      context.fillRect(left, top, width, height);

      const wash = context.createLinearGradient(left, top, left + width, top + height);
      wash.addColorStop(0, "rgba(255,255,255,0.16)");
      wash.addColorStop(0.48, "rgba(255,255,255,0.015)");
      wash.addColorStop(1, "rgba(25,22,18,0.12)");
      context.fillStyle = wash;
      context.fillRect(left, top, width, height);

      if (material.textureStyle === "veined" || material.textureStyle === "linear") {
        context.strokeStyle =
          material.textureStyle === "veined"
            ? "rgba(116,105,88,0.22)"
            : "rgba(91,91,86,0.2)";
        context.lineWidth = material.textureStyle === "veined" ? 2 : 3;
        for (let line = 0; line < 3; line += 1) {
          const offset = (line + 1) * (height / 4);
          context.beginPath();
          context.moveTo(left, top + offset);
          context.bezierCurveTo(
            left + width * 0.28,
            top + offset - 20 + line * 7,
            left + width * 0.68,
            top + offset + 18 - line * 8,
            left + width,
            top + offset - 4,
          );
          context.stroke();
        }
      }

      if (material.textureStyle === "speckled" || material.textureStyle === "clouded") {
        for (let fleck = 0; fleck < 140; fleck += 1) {
          const seed = row * 997 + column * 101 + fleck * 37;
          const x = left + ((seed * 17) % 997) / 997 * width;
          const y = top + ((seed * 31) % 991) / 991 * height;
          const radius = 0.5 + ((seed * 13) % 23) / 10;
          const opacity = 0.025 + ((seed * 7) % 8) / 100;
          context.fillStyle = `rgba(47,43,36,${opacity})`;
          context.beginPath();
          context.ellipse(x, y, radius * 1.5, radius, (seed % 8) / 4, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.restore();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Furniture() {
  return (
    <group>
      <group position={[-2.3, 0, -1.1]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <boxGeometry args={[3.3, 0.48, 1.05]} />
          <meshStandardMaterial color="#b9b2a8" roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.89, -0.39]} castShadow>
          <boxGeometry args={[3.3, 0.82, 0.28]} />
          <meshStandardMaterial color="#c9c1b6" roughness={0.94} />
        </mesh>
        {[-1.48, 1.48].map((x) => (
          <mesh key={x} position={[x, 0.58, 0.05]} castShadow>
            <boxGeometry args={[0.32, 0.62, 1.08]} />
            <meshStandardMaterial color="#b9b2a8" roughness={0.92} />
          </mesh>
        ))}
        {[-0.98, 0, 0.98].map((x) => (
          <mesh key={x} position={[x, 0.71, -0.03]} castShadow>
            <boxGeometry args={[0.87, 0.17, 0.72]} />
            <meshStandardMaterial color="#ded8ce" roughness={0.96} />
          </mesh>
        ))}
      </group>

      <group position={[1.2, 0, -1.3]}>
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.05, 0.12, 1.22]} />
          <meshPhysicalMaterial color="#4c514f" roughness={0.23} metalness={0.22} />
        </mesh>
        {[[-0.8, -0.43], [0.8, -0.43], [-0.8, 0.43], [0.8, 0.43]].map(
          ([x, z]) => (
            <mesh key={`${x}-${z}`} position={[x, 0.25, z]} castShadow>
              <boxGeometry args={[0.065, 0.43, 0.065]} />
              <meshStandardMaterial color="#373c3a" metalness={0.45} roughness={0.3} />
            </mesh>
          ),
        )}
      </group>

      <group position={[4.55, 0, -3.6]}>
        <mesh position={[0, 0.44, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.29, 0.82, 24]} />
          <meshStandardMaterial color="#766657" roughness={0.82} />
        </mesh>
        <mesh position={[0, 1.12, 0]} castShadow>
          <sphereGeometry args={[0.62, 20, 16]} />
          <meshStandardMaterial color="#61725d" roughness={0.92} />
        </mesh>
        <mesh position={[-0.24, 1.45, 0.03]} castShadow>
          <sphereGeometry args={[0.36, 18, 14]} />
          <meshStandardMaterial color="#7d8c70" roughness={0.92} />
        </mesh>
        <mesh position={[0.3, 1.52, -0.1]} castShadow>
          <sphereGeometry args={[0.32, 18, 14]} />
          <meshStandardMaterial color="#53694f" roughness={0.92} />
        </mesh>
      </group>

      <group position={[3.85, 0, -4.7]}>
        <mesh position={[0, 0.52, 0]} castShadow>
          <boxGeometry args={[2.2, 1.02, 0.48]} />
          <meshStandardMaterial color="#695b4c" roughness={0.72} />
        </mesh>
        <mesh position={[0, 1.05, 0.012]} castShadow>
          <boxGeometry args={[2.28, 0.055, 0.56]} />
          <meshStandardMaterial color="#d1c6b4" roughness={0.35} />
        </mesh>
        {[-0.72, 0, 0.72].map((x) => (
          <mesh key={x} position={[x, 0.52, 0.248]}>
            <boxGeometry args={[0.018, 0.78, 0.008]} />
            <meshStandardMaterial color="#887968" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function WindowWall() {
  return (
    <group>
      <mesh position={[-4.95, 2.22, -5.35]} receiveShadow>
        <boxGeometry args={[3.1, 4.45, 0.22]} />
        <meshStandardMaterial color="#d8d4cb" roughness={0.88} />
      </mesh>
      <mesh position={[4.95, 2.22, -5.35]} receiveShadow>
        <boxGeometry args={[3.1, 4.45, 0.22]} />
        <meshStandardMaterial color="#d8d4cb" roughness={0.88} />
      </mesh>
      <mesh position={[0, 4.03, -5.35]} receiveShadow>
        <boxGeometry args={[6.8, 0.82, 0.22]} />
        <meshStandardMaterial color="#d8d4cb" roughness={0.88} />
      </mesh>

      <mesh position={[0, 2.25, -5.49]}>
        <planeGeometry args={[6.7, 3.35]} />
        <meshPhysicalMaterial
          color="#b4c6c2"
          roughness={0.16}
          metalness={0.06}
          transmission={0.18}
          transparent
          opacity={0.72}
          side={THREE.DoubleSide}
        />
      </mesh>

      {[-3.34, 0, 3.34].map((x) => (
        <mesh key={x} position={[x, 2.25, -5.45]}>
          <boxGeometry args={[0.055, 3.48, 0.09]} />
          <meshStandardMaterial color="#4a514f" metalness={0.52} roughness={0.3} />
        </mesh>
      ))}
      {[-0.1, 1.53, 3.38].map((y) => (
        <mesh key={y} position={[0, y, -5.45]}>
          <boxGeometry args={[6.78, 0.055, 0.09]} />
          <meshStandardMaterial color="#4a514f" metalness={0.52} roughness={0.3} />
        </mesh>
      ))}

      <mesh position={[0, 0.8, -5.72]}>
        <planeGeometry args={[14, 8]} />
        <meshBasicMaterial color="#94a68f" />
      </mesh>
      {[-5.7, -4.6, 5.3, 6.1].map((x, index) => (
        <mesh key={x} position={[x, 0.45 + (index % 2) * 0.25, -5.85]}>
          <sphereGeometry args={[0.82, 14, 10]} />
          <meshBasicMaterial color={index % 2 ? "#657960" : "#788971"} />
        </mesh>
      ))}
    </group>
  );
}

export function RoomScene({
  floorMaterial,
  featureMaterial,
}: {
  floorMaterial: ShowroomMaterial;
  featureMaterial: ShowroomMaterial;
}) {
  const floorMap = useMemo(() => createTileMap(floorMaterial), [floorMaterial]);
  const wallMap = useMemo(() => createTileMap(featureMaterial), [featureMaterial]);

  useEffect(() => {
    return () => {
      floorMap.dispose();
      wallMap.dispose();
    };
  }, [floorMap, wallMap]);

  return (
    <>
      <color attach="background" args={["#c7cbc4"]} />
      <fog attach="fog" args={["#c7cbc4", 24, 46]} />
      <hemisphereLight args={["#eef1ec", "#7d7465", 1.8]} />
      <directionalLight
        position={[-4, 9, 5]}
        intensity={2.25}
        castShadow
        shadow-mapSize-width={1536}
        shadow-mapSize-height={1536}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 3.6, 1]} intensity={24} distance={15} color="#ffe4bc" />
      <pointLight position={[-4.4, 3.3, -1]} intensity={10} distance={9} color="#dce8dc" />

      <mesh name="floor_substrate" position={[0, -0.075, 0]} receiveShadow>
        <boxGeometry args={[14.4, 0.12, 11.6]} />
        <meshStandardMaterial color={floorMaterial.grout} roughness={0.95} />
      </mesh>
      <mesh
        name="floor_main"
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.002, 0]}
        receiveShadow
      >
        <planeGeometry args={[14.2, 11.4]} />
        <meshPhysicalMaterial
          map={floorMap}
          color="#ffffff"
          roughness={0.3}
          metalness={0.015}
          clearcoat={0.12}
          clearcoatRoughness={0.3}
        />
      </mesh>

      <WindowWall />

      <mesh position={[-7.05, 2.28, 0]} receiveShadow>
        <boxGeometry args={[0.18, 4.55, 11.3]} />
        <meshStandardMaterial color="#d4d0c7" roughness={0.9} />
      </mesh>
      <mesh position={[0, 2.28, 5.63]} receiveShadow>
        <boxGeometry args={[14.2, 4.55, 0.18]} />
        <meshStandardMaterial color="#d4d0c7" roughness={0.9} />
      </mesh>
      <mesh name="feature_wall" position={[-6.94, 2.23, -1.35]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.8, 3.55]} />
        <meshPhysicalMaterial
          map={wallMap}
          color="#ffffff"
          roughness={0.34}
          clearcoat={0.08}
        />
      </mesh>

      {Array.from({ length: 11 }, (_, index) => (
        <mesh
          key={index}
          position={[-6.6 + index * 1.32, 4.48, -2.6]}
          castShadow
        >
          <boxGeometry args={[0.13, 0.14, 5.8]} />
          <meshStandardMaterial color="#a99d8c" roughness={0.74} />
        </mesh>
      ))}

      <group position={[0, 4.34, -1.25]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[3.1, 0.11, 1.35]} />
          <meshStandardMaterial
            color="#eee8dc"
            emissive="#d5c19f"
            emissiveIntensity={0.45}
            roughness={0.35}
          />
        </mesh>
      </group>

      <Furniture />

      <mesh position={[0, -0.16, 0]} receiveShadow>
        <boxGeometry args={[200, 0.12, 200]} />
        <meshStandardMaterial color="#9a9b93" roughness={0.92} />
      </mesh>
    </>
  );
}
