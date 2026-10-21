"use client";

import { useState } from "react";
import VillaScene from "./VillaScene";
import "../villa.css";

type Mode = "Welcome" | "Relax" | "Movie" | "Away";

const modes: { name: Mode; description: string }[] = [
  { name: "Welcome", description: "Entrance and welcome lighting" },
  { name: "Relax", description: "Warm garden and living lights" },
  { name: "Movie", description: "Reduced ambient lighting" },
  { name: "Away", description: "Lights off and gate secured" },
];

export default function VillaExperience() {
  const [gateOpen, setGateOpen] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [securityOn, setSecurityOn] = useState(true);
  const [mode, setMode] = useState<Mode>("Welcome");
  const [showInfo, setShowInfo] = useState(true);

  function selectMode(nextMode: Mode) {
    setMode(nextMode);
    if (nextMode === "Welcome") {
      setGateOpen(true);
      setLightsOn(true);
      setSecurityOn(false);
    } else if (nextMode === "Relax") {
      setGateOpen(false);
      setLightsOn(true);
      setSecurityOn(false);
    } else if (nextMode === "Movie") {
      setGateOpen(false);
      setLightsOn(true);
      setSecurityOn(false);
    } else {
      setGateOpen(false);
      setLightsOn(false);
      setSecurityOn(true);
    }
  }

  return (
    <main className="villa-app">
      <div className="villa-stage">
        <VillaScene gateOpen={gateOpen} lightsOn={lightsOn} sceneMode={mode} />

        <header className="villa-topbar">
          <a className="villa-brand" href="/">
            <span className="villa-brand-mark">S</span>
            <span>
              <strong>SMARTNEST</strong>
              <small>INTELLIGENT LIVING</small>
            </span>
          </a>
          <div className="villa-top-label">
            <span className="villa-live-dot" />
            3D SMART VILLA DEMO
          </div>
          <a className="villa-back-link" href="/">Back to showroom ↗</a>
        </header>

        <section className="villa-intro">
          <span className="villa-eyebrow">A HOME THAT RESPONDS TO YOU</span>
          <h1>Experience intelligent living.</h1>
          <p>Explore the villa. Open the gate. Control the atmosphere.</p>
          <div className="villa-hint"><span>↗</span> Drag to orbit <i /> Scroll to zoom</div>
        </section>

        <aside className="villa-controls">
          <div className="villa-panel-heading">
            <div>
              <span className="villa-eyebrow">SMARTNEST CONTROL</span>
              <h2>Villa automation</h2>
            </div>
            <span className="villa-status">DEMO</span>
          </div>

          <div className="villa-mode-list">
            {modes.map((item) => (
              <button
                type="button"
                key={item.name}
                className={`villa-mode ${mode === item.name ? "active" : ""}`}
                onClick={() => selectMode(item.name)}
              >
                <span className="villa-mode-icon">
                  {item.name === "Welcome" ? "⌂" : item.name === "Relax" ? "☼" : item.name === "Movie" ? "◐" : "◈"}
                </span>
                <span className="villa-mode-copy">
                  <strong>{item.name === "Movie" ? "Movie night" : item.name}</strong>
                  <small>{item.description}</small>
                </span>
                <span className="villa-mode-arrow">{mode === item.name ? "●" : "○"}</span>
              </button>
            ))}
          </div>

          <div className="villa-control-divider" />

          <div className="villa-device-row">
            <span className="villa-device-icon">↔</span>
            <span className="villa-device-copy">
              <strong>Entrance gate</strong>
              <small>{gateOpen ? "Opening / open" : "Closed and secured"}</small>
            </span>
            <button
              type="button"
              className={`villa-toggle ${gateOpen ? "on" : ""}`}
              aria-label={gateOpen ? "Close entrance gate" : "Open entrance gate"}
              aria-pressed={gateOpen}
              onClick={() => {
                setGateOpen(!gateOpen);
                setMode("Welcome");
              }}
            ><span /></button>
          </div>

          <div className="villa-device-row">
            <span className="villa-device-icon">☼</span>
            <span className="villa-device-copy">
              <strong>Lighting</strong>
              <small>{lightsOn ? "Ambient lights enabled" : "Lights switched off"}</small>
            </span>
            <button
              type="button"
              className={`villa-toggle ${lightsOn ? "on" : ""}`}
              aria-label={lightsOn ? "Switch lights off" : "Switch lights on"}
              aria-pressed={lightsOn}
              onClick={() => {
                setLightsOn(!lightsOn);
                setMode("Relax");
              }}
            ><span /></button>
          </div>

          <div className="villa-device-row">
            <span className="villa-device-icon">◇</span>
            <span className="villa-device-copy">
              <strong>Security mode</strong>
              <small>{securityOn ? "Perimeter secured" : "Home mode"}</small>
            </span>
            <button
              type="button"
              className={`villa-toggle ${securityOn ? "on" : ""}`}
              aria-label={securityOn ? "Disable demo security mode" : "Enable demo security mode"}
              aria-pressed={securityOn}
              onClick={() => setSecurityOn(!securityOn)}
            ><span /></button>
          </div>

          <div className="villa-panel-note">
            <span>ⓘ</span>
            Interactive visual demo — no physical devices are connected.
          </div>
        </aside>

        <div className="villa-bottom-left">
          <span className="villa-bottom-dot" />
          <span>SMART HOME / PRIVATE RESIDENCE</span>
        </div>

        <button
          type="button"
          className="villa-info-button"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          {showInfo ? "Hide details −" : "Villa details +"}
        </button>

        {showInfo && (
          <div className="villa-details">
            <strong>Designed around your lifestyle.</strong>
            <span>Lighting · Gate control · Security · Scene automation</span>
          </div>
        )}
      </div>
    </main>
  );
}
