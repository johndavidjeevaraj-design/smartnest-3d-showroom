# Engineering Roadmap

## P0 — Scene stability

- [ ] Verify all geometries, materials, textures and renderers are disposed when scenes change or unmount.
- [ ] Handle WebGL unavailable/context-lost states with a useful fallback.
- [ ] Add loading, error and retry states for failed scene initialization.
- [ ] Ensure unsupported floors remain clearly marked as placeholders.

## P1 — Performance

- [ ] Profile draw calls, texture memory and frame rate on mid-range mobile devices.
- [ ] Compress and resize textures; use appropriate texture formats.
- [ ] Add device-aware quality settings and cap pixel ratio.
- [ ] Avoid unnecessary React state updates inside the render loop.
- [ ] Test touch orbit, pinch zoom and reduced-motion preferences.

## P1 — Accessibility

- [ ] Provide keyboard-accessible material selection and surface controls.
- [ ] Expose selected material and applied surface in accessible live regions.
- [ ] Provide a textual material list and non-WebGL fallback.

## P2 — Product direction

- [ ] Decide whether this remains an interior material configurator or becomes a smart-home demonstration.
- [ ] If adding smart-home controls, model each device state explicitly and label the experience as a simulation unless connected to real hardware.
- [ ] Add scene screenshots, architecture notes and a verified demo link.

## Acceptance criteria

- WebGL failure does not leave a blank page.
- Scene resources are released on teardown.
- Essential selection workflows work without pointer-only interaction.
- Mobile performance is measured and documented.
