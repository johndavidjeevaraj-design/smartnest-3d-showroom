
"use client";

import { useMemo } from "react";
import { Bounds, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { FloorId, ShowroomMaterial } from "./catalog";

const MODEL_PATHS: Record<FloorId, string> = {
  "ground-floor": "/models/icg-ground-floor.glb",
  "first-floor": "/models/icg-first-floor.glb",
  underground: "/models/icg-underground.glb",
  "pop-up-window": "/models/icg-pop-up-window.glb",
};

type Props = {
  floorId: FloorId;
  floorMaterial: ShowroomMaterial;
  featureMaterial: ShowroomMaterial;
};

export default function ICGGroundFloor({
  floorId,
  floorMaterial,
  featureMaterial,
}: Props) {
  const modelPath = MODEL_PATHS[floorId];
  const { scene } = useGLTF(modelPath);

  const model = useMemo(() => {
    const clonedScene = scene.clone(true);

    // Preserve the original materials and textures on every floor.
    // Keep the existing ground-floor material preview temporarily.
    if (floorId === "ground-floor") {
      clonedScene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;

        const originals = Array.isArray(object.material)
          ? object.material
          : [object.material];

        const updated = originals.map((original) => {
          const material = original.clone();

          if (
            object.name === "gf_split-006_floor-001"
            || object.name === "gf_split-007_floor-001"
          ) {
            material.color.set(floorMaterial.color);
          }

          if (
            object.name === "gf_split-006_wall-001"
            || object.name === "gf_split-007_wall-002"
          ) {
            material.color.set(featureMaterial.color);
          }

          return material;
        });

        object.material = Array.isArray(object.material)
          ? updated
          : updated[0];
      });
    }

    return clonedScene;
  }, [scene, floorId, floorMaterial.color, featureMaterial.color]);

  return (
    <Bounds key={floorId} fit clip observe margin={0.65}>
      <primitive object={model} />
    </Bounds>
  );
}

Object.values(MODEL_PATHS).forEach((path) => useGLTF.preload(path));
