"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  filterMaterials,
  floors,
  materialCategories,
  materials,
} from "./catalog";
import type { FloorId, MaterialFilter } from "./catalog";

const SceneViewer = dynamic(() => import("./SceneViewer"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading" role="status" aria-live="polite">
      <span className="loading-mark" aria-hidden="true" />
      <span>Preparing the room</span>
    </div>
  ),
});

export default function ShowroomExperience() {
  const [floorId, setFloorId] = useState<FloorId>("ground-floor");
  const [selectedId, setSelectedId] = useState(materials[0].id);
  const [floorMaterialId, setFloorMaterialId] = useState(materials[0].id);
  const [featureMaterialId, setFeatureMaterialId] = useState(materials[2].id);
  const [applyTarget, setApplyTarget] = useState<"floor_main" | "feature_wall">(
    "floor_main",
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<MaterialFilter>("All materials");
  const [sceneReady, setSceneReady] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  const selectedMaterial =
    materials.find((material) => material.id === selectedId) ?? materials[0];
  const floorMaterial =
    materials.find((material) => material.id === floorMaterialId) ?? materials[0];
  const featureMaterial =
    materials.find((material) => material.id === featureMaterialId) ?? materials[2];
  const activeFloor = floors.find((floor) => floor.id === floorId) ?? floors[0];
  const filteredMaterials = useMemo(
    () => filterMaterials(query, category),
    [query, category],
  );
  const sceneStatus = activeFloor.implemented
    ? "Original procedural study"
    : "Scene placeholder";

  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  function selectMaterial(id: string) {
    setSelectedId(id);
    if (applyTarget === "floor_main") {
      setFloorMaterialId(id);
    } else {
      setFeatureMaterialId(id);
    }
  }

  function resetExperience() {
    setFloorId("ground-floor");
    setSelectedId(materials[0].id);
    setFloorMaterialId(materials[0].id);
    setFeatureMaterialId(materials[2].id);
    setApplyTarget("floor_main");
    setQuery("");
    setCategory("All materials");
    setDetailsOpen(true);
    setSceneReady(false);
    setResetKey((key) => key + 1);
  }

  return (
    <main className="showroom-app">
      <header className="topbar">
        <a className="brand" href="/" aria-label="SmartNest showroom home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>
            SMARTNEST
            <small>DESIGN STUDIO</small>
          </span>
        </a>

        <nav className="floor-nav" aria-label="Showroom floors">
          {floors.map((floor) => (
            <button
              key={floor.id}
              className={`floor-tab ${floorId === floor.id ? "active" : ""}`}
              type="button"
              onClick={() => setFloorId(floor.id)}
              aria-pressed={floorId === floor.id}
            >
              <span>{floor.label}</span>
              <small>{floor.implemented ? "STUDY" : "PLACEHOLDER"}</small>
            </button>
          ))}
        </nav>

        <button className="reset-button" type="button" onClick={resetExperience}>
          <span aria-hidden="true">↺</span>
          Reset view
        </button>
      </header>

      <div className="experience-layout">
        <section className="scene-column" aria-label={`${activeFloor.label} 3D preview`}>
          <div className="scene-heading">
            <div>
              <p className="eyebrow"><span /> MATERIAL STUDY / 01</p>
              <h1>{activeFloor.label}</h1>
            </div>
            <span className={`scene-status ${activeFloor.implemented ? "is-study" : ""}`}>
              <i aria-hidden="true" />
              {sceneStatus}
            </span>
          </div>

          <div className="viewport">
            <SceneViewer
              floorId={floorId}
              floorMaterial={floorMaterial}
              featureMaterial={featureMaterial}
              resetKey={resetKey}
              onReady={handleSceneReady}
            />

            <div className="viewport-caption">
              <span className="live-dot" aria-hidden="true" />
              {sceneReady ? "INTERACTIVE 3D STUDY" : "STARTING 3D STUDY"}
            </div>

            <button
              className="info-toggle"
              type="button"
              onClick={() => setDetailsOpen((open) => !open)}
              aria-expanded={detailsOpen}
              aria-controls="scene-material-card"
            >
              {detailsOpen ? "Hide details −" : "Material details +"}
            </button>

            {detailsOpen && (
              <aside className="material-float" id="scene-material-card" aria-live="polite">
                <span className="float-label">SELECTED MATERIAL</span>
                <strong>{selectedMaterial.name}</strong>
                <span>{selectedMaterial.category} · {selectedMaterial.finish}</span>
                <span className="applied-label">
                  Applied to {applyTarget === "floor_main" ? "main floor" : "feature wall"}
                </span>
              </aside>
            )}

            {!activeFloor.implemented && (
              <div className="placeholder-note" role="status">
                <strong>Floor scene not modeled yet</strong>
                <span>This view is a placeholder, not a reconstruction of this floor.</span>
              </div>
            )}

            <div className="camera-hint" aria-hidden="true">
              <span>Drag to orbit</span><i /><span>Scroll to zoom</span>
            </div>
          </div>

          <div className="scene-footnote">
            <span>Original procedural architecture</span>
            <span>Orbit · zoom · material preview</span>
          </div>
        </section>

        <aside className="catalog-panel" aria-label="Material library">
          <div className="catalog-header">
            <div>
              <p className="panel-kicker">SURFACE COLLECTION</p>
              <h2>Material library</h2>
            </div>
            <span className="count">{String(filteredMaterials.length).padStart(2, "0")}</span>
          </div>

          <p className="panel-description">
            Select an original sample to apply it to a named surface in the room.
          </p>

          <label className="search-field">
            <span className="search-icon" aria-hidden="true" />
            <span className="visually-hidden">Search materials</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.currentTarget.value)}
              placeholder="Search materials"
            />
            {query && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setQuery("")}
                aria-label="Clear material search"
              >
                ×
              </button>
            )}
          </label>

          <div className="category-list" aria-label="Filter by category">
            {materialCategories.map((item) => (
              <button
                key={item}
                type="button"
                className={`category-chip ${category === item ? "selected" : ""}`}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="surface-target">
            <span>Apply to</span>
            <div role="group" aria-label="Choose a surface for the selected material">
              <button
                type="button"
                className={applyTarget === "floor_main" ? "selected" : ""}
                onClick={() => setApplyTarget("floor_main")}
                aria-pressed={applyTarget === "floor_main"}
              >
                Main floor
              </button>
              <button
                type="button"
                className={applyTarget === "feature_wall" ? "selected" : ""}
                onClick={() => setApplyTarget("feature_wall")}
                aria-pressed={applyTarget === "feature_wall"}
              >
                Feature wall
              </button>
            </div>
          </div>

          <div className="material-list" aria-label="Materials">
            {filteredMaterials.length === 0 ? (
              <div className="empty-state" role="status">
                <strong>No materials found</strong>
                <span>Try another name or category.</span>
              </div>
            ) : (
              filteredMaterials.map((material, index) => (
                <button
                  key={material.id}
                  type="button"
                  className={`material-option ${selectedId === material.id ? "selected" : ""}`}
                  onClick={() => selectMaterial(material.id)}
                  aria-pressed={selectedId === material.id}
                >
                  <span
                    className={`material-swatch texture-${material.textureStyle}`}
                    style={{
                      "--swatch-color": material.color,
                      "--swatch-grout": material.grout,
                    } as CSSProperties & {
                      "--swatch-color": string;
                      "--swatch-grout": string;
                    }}
                    aria-hidden="true"
                  />
                  <span className="material-text">
                    <strong>{material.name}</strong>
                    <small>{material.category} · {material.finish}</small>
                  </span>
                  <span className="select-indicator" aria-hidden="true">
                    {selectedId === material.id ? "✓" : String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              ))
            )}
          </div>

          <section className="product-details" aria-live="polite">
            <div className="detail-topline">
              <span className="panel-kicker">SELECTED SAMPLE</span>
              <span className="sample-badge">ORIGINAL PLACEHOLDER</span>
            </div>
            <h3>{selectedMaterial.name}</h3>
            <p>{selectedMaterial.description}</p>
            <dl className="material-specs">
              <div><dt>Format</dt><dd>{selectedMaterial.format}</dd></div>
              <div><dt>Thickness</dt><dd>{selectedMaterial.thickness}</dd></div>
              <div><dt>Finish</dt><dd>{selectedMaterial.finish}</dd></div>
            </dl>
            <p className="disclaimer">
              Illustrative, procedurally generated material. Not an original ICC product or texture.
            </p>
          </section>
        </aside>
      </div>
    </main>
  );
}
