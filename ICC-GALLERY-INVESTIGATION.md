# ICC Gallery investigation

**Date:** 2026-10-20  
**Scope:** Read-only reverse-engineering evidence for a separate recreation in this project. No reference assets were downloaded or copied.

## Findings

- The Gallery bundle evidence identifies Three.js r169, floor model references `/webgl/models/gf_pov.glb`, `/webgl/models/ff_pov.glb`, `/webgl/models/uf_pov.glb`, `/webgl/models/pu_pov.glb`, floor-specific material sets, and material-transition logic. These are static implementation findings, not authorization to reuse the assets.
- The Material Library capture shows a stone preview and a product-detail panel for **Ceppo Alpino - Theke Pietre**, including format, thickness, finish and slip-rating details. Its bundle includes search/filter UI text, a `POST` products-endpoint reference, and state fields `currentProduct` and `currentFilters` (`effetto`, `finiture`, `colore`). These do not establish server responses or working UI behavior.
- The Material Library bundle includes a “Visit Gallery” label/link component. No evidence establishes its resolved destination, any product identifier or selection state transfer, or application of that product to a Gallery surface.
- One documented scenario click was attempted on the existing Material Library target’s observed **Menu** button. It timed out after 5 seconds: `.loader__bg` from `.a-loader` intercepted pointer events, and the button later became invisible. The scenario recorded successful HTTP 200 responses for the page and several scripts. No search, filter, texture, or Gallery-link interaction was tested after this timeout.
- No documented pointer-drag or wheel action was used. Actual Gallery camera behavior, room navigation, and product-to-room application remain unverified.

## Evidence

| Evidence | What it supports |
|---|---|
| `ev_faadbacf3e5b2d3fe3bc70fbacb048d5f633e55e3d18167bd8d9d078eb0ead39` | Existing Gallery bundle-analysis evidence, including renderer/model/material implementation references. |
| `ev_fb8fafaa2b69d0467c6f5968fc8205e1f9f733a24005795cf271b661c9496b4f` | Existing Gallery page inspection. |
| `ev_27d07ebbf9c6ce4fa063f0732315459c2d03100ab37e2e085124229fac859258` | Existing post-Discover Gallery visual baseline. |
| `ev_754aaf725caa8e560078704cc1de9a3ca1d465199804dcff6cc5ab4d253d4486` | Material Library page inspection and visible product details. |
| `ev_7e3fab67aa48ad691e6937d8a9dd31f667db75d8b37aaa4fc6bb197d60176bf4` | Material Library screenshot. |
| `ev_a42fac71b16467666c8412c7e087388e5eb3cc70ec952b73a42188fd685f4e93` | Material Library static bundle analysis. |
| `ev_4369ede12d81d1a371ca6a568232fa31eabd1ce2cd0171881987a59d8fd0fcdc` | One bounded Menu-click attempt; timeout and loader-overlay interception. |

## Local project inspection

The verified project is a Next.js 16.4.2 / React 19.3 app with React Three Fiber 9.8, Drei 10.7, and Three.js 0.186 already declared. The existing `app/page.tsx` contains a procedural generic room, solid-color sample finishes, an R3F `Canvas`, and Drei `OrbitControls`; it does not establish the reference Gallery's scene or controls. Its responsive UI and application files are already modified in the worktree. Those changes, `package.json`, `package-lock.json`, and `.gitignore` were left untouched. `~/Desktop/smartnest` was not inspected or modified.

## Unresolved

- Exact ground-floor geometry, furnishings, room map, object naming and material-to-mesh assignments.
- Runtime camera bounds and gestures; precise floor/room transition behavior.
- Search/filter values, result ordering, API request/response schema, and texture-selection behavior.
- “Visit Gallery” destination and any cross-site product-selection transfer.
- Whether the Material Library can apply a selected product to the Gallery scene.

The next implementation step is in [ICC-GALLERY-IMPLEMENTATION-BLUEPRINT.md](./ICC-GALLERY-IMPLEMENTATION-BLUEPRINT.md).
