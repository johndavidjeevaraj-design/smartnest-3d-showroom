# ICC Gallery ground-floor recreation blueprint

**Purpose:** Evidence-led implementation plan for this separate SmartNest showroom project. This is a blueprint only; no application code or dependencies were changed for this investigation.

## Evidence labels

- **CONFIRMED** — directly observed or present in captured static implementation evidence.
- **LIKELY** — reasonable recreation choice, but not established as reference behavior.
- **UNKNOWN** — evidence is insufficient; do not present as a reference fact.

## Current project starting point

**CONFIRMED:** The app uses Next.js 16.4.2, React 19.3, React Three Fiber 9.8, Drei 10.7, and Three.js 0.186. A first interactive milestone now exists: an original procedural ground-floor study, orbit/zoom controls, explicit placeholders for three unmodeled floors, and a local searchable sample catalog that applies generated tile previews to named `floor_main` and `feature_wall` meshes. This is not a faithful Gallery geometry or an original ICC product catalog. Sample patterns are generated locally and are labeled as placeholders.

The original worktree already contained uncommitted modifications to `app/page.tsx`, `app/globals.css`, package manifests, and `.gitignore` before this milestone. Those changes were reviewed and preserved where useful; the package manifests and `.gitignore` were not changed for this milestone. No dependency was installed.

### Milestone status — 2026-10-20

- **Implemented:** Ground-floor procedural architectural study; Drei orbit/zoom; loading and WebGL fallback; four-option floor selector with honest modeled/placeholder labeling; searchable/category-filtered sample materials; material application to explicitly named floor/wall surfaces; product details; reset, details toggle, keyboard-operable native buttons, and responsive layout.
- **Verified:** Three focused Node unit tests pass; changed TypeScript files pass TypeScript syntax/transpile diagnostics.
- **Blocked validation:** ESLint reported an `ETIMEDOUT` while reading a dependency file. TypeScript full/focused checks, Next build, and Next dev startup stalled during Node synchronous file reads with no compiler/server output; local server never bound. These are not reported as successful. Browser rendering could not be verified.
- **Still unknown:** Original floor geometry, exact lighting/camera behavior, real room/floor transitions, and any product transfer to or material application in the ICC Gallery.

## Feature plan

| Feature | Evidence status | Implementation direction |
|---|---|---|
| Framework / renderer | **CONFIRMED** | Keep the existing Next.js + React + R3F stack. Keep browser-only rendering inside the client boundary; isolate scene code from catalog/UI state. Read the installed Next.js guides before changing framework code. |
| Gallery engine | **CONFIRMED** | Captured Gallery evidence identifies Three.js r169. The project has Three.js 0.186. Recreate behavior and visual output rather than attempting to match engine version without a compatibility need. |
| Ground-floor model | **CONFIRMED / UNKNOWN** | The Gallery bundle references `/webgl/models/gf_pov.glb` and analogous files for other floors (**CONFIRMED** path references). The actual geometry, furnishing, scale and mapping are **UNKNOWN**. Create an original, licensed model or procedural scene; do not fetch, embed, or copy the reference GLB. |
| Scene composition | **CONFIRMED / UNKNOWN** | Existing post-Discover visual evidence (`ev_27…`) shows a furnished interior (**CONFIRMED** for that captured state). Detailed measurements, object inventory, materials and exact layout remain **UNKNOWN**. Use captures as observation, not as project assets. |
| Camera controls | **UNKNOWN** | Do not assume reference drag/wheel behavior or bounds. The current project uses `OrbitControls`; retain/tune only as a clearly labeled recreation decision. Configure sensible orbit, zoom, damping and polar limits after observing an authorized reference interaction or choosing an intentional approximation. |
| Floor navigation | **CONFIRMED / UNKNOWN** | Static Gallery evidence references Ground Floor, First Floor, Underground and Pop-up Window model paths and floor-specific material sets (**CONFIRMED**). Exact selector behavior, route transitions and preservation of camera state are **UNKNOWN**. Build a data-driven floor selector and make Ground Floor the default; label transition details as implementation choices until verified. |
| Room navigation | **UNKNOWN** | No reliable room list, room IDs, hotspots or selection effects are established. Keep room data separate from floor data; defer specific names and transition animations until evidence is available. |
| Material transitions | **CONFIRMED / UNKNOWN** | Gallery static evidence includes floor-specific material sets and transition logic (**CONFIRMED**). Exact shader, timing, mappings and target surfaces are **UNKNOWN**. Apply the chosen material to named, authored floor meshes and provide a short crossfade/material transition as a recreation decision. |
| Material catalog | **CONFIRMED / UNKNOWN** | The Material Library capture shows product details for **Ceppo Alpino - Theke Pietre** and labels for formats, thicknesses, finishes, slip ratings and other textures (**CONFIRMED**). Its bundle contains search/filter strings and state fields `currentProduct` and `currentFilters` with `effetto`, `finiture`, `colore` (**CONFIRMED as static source only**). Actual filtering, result order and complete catalog schema are **UNKNOWN**. Start with a local, authored catalog schema and avoid claiming it mirrors the remote API. |
| Preview textures | **CONFIRMED / UNKNOWN** | A stone preview and same-origin image/WebP resources were observed in the Material Library capture (**CONFIRMED**). Texture bytes were not retrieved. Whether selecting an “other texture” changes the active detail panel is **UNKNOWN**. Use original or properly licensed PBR maps. |
| Material-to-Gallery link | **UNKNOWN** | “Visit Gallery” text/link component exists in static bundle evidence, but resolved destination and product-state transfer are not established. Do not couple the catalog to a remote Gallery route until an identifier/transfer mechanism is verified. |
| Applying a product to a room | **UNKNOWN** | No observed selection changed a Gallery surface. Implement local selection state that updates the actual authored mesh material; keep product metadata and render material IDs connected by an explicit local mapping. Do not imply that this behavior was observed on the reference. |
| Product-detail panel | **CONFIRMED / UNKNOWN** | A detail panel with product name, descriptive text, technical-sheet link and product attributes is visible (**CONFIRMED**). Its open/close behavior and response to selecting another texture are **UNKNOWN**. Implement as a responsive, accessible side panel/drawer with a selected product summary. |
| Loading / failures | **CONFIRMED / LIKELY** | A loader overlay was observed intercepting the Menu interaction in the latest scenario (**CONFIRMED** for that capture). A dependable scene-ready signal and recovery behavior are **UNKNOWN**. Add explicit model/texture loading progress, ready state, timeout/error UI, retry and a non-white fallback scene. |
| UI / overlays | **CONFIRMED / UNKNOWN** | Material Library page capture showed a Menu button, product details and consent-preferences control. The click attempt failed because the loader intercepted it. Gallery screenshots have shown differing scene/panel states; their cause is unresolved. Preserve a clear canvas, floor selector, material panel, reset and information overlay as **LIKELY** recreation elements, and verify their exact placement against screenshots before polishing. |
| Responsive layout / accessibility | **LIKELY** | Use a full-bleed scene on desktop with compact overlaid controls and a side panel; on narrow screens move catalog/details into a bottom sheet or drawer. Provide labeled buttons, keyboard focus, Escape dismissal where appropriate, and a reduced-motion option. These are product-quality decisions, not confirmed reference details. |
| Lighting / rendering | **UNKNOWN** | Exact environment, color management, shadows, exposure and tone mapping are not established by the available evidence. Use restrained physically based lighting and calibrate by visual comparison; do not label a chosen preset as original. |
| Performance | **LIKELY** | Reuse one renderer, cap device pixel ratio, dispose replaced textures/materials, lazy-load non-default floor assets, keep mesh/material counts bounded, and expose loading progress. Prefer compressed original assets when the asset pipeline supports them. |
| Fonts / exact styling | **UNKNOWN** | Reference font files and measured spacing/colors are not established in this evidence summary. Inspect screenshots and use locally hosted/licensed fonts or close system-safe alternatives; do not import proprietary web fonts without rights. |

## Suggested architecture

1. **App shell:** Next.js page/layout for route and metadata; client-only `ShowroomExperience` owns user-facing UI state. Avoid placing catalog and viewer logic in one monolithic page component.
2. **Scene layer:** R3F `<Canvas>` with camera, lights, authored floor model, named surfaces, loading/error boundary, and controls. Maintain stable mesh names such as `floor_main` in the authored asset contract; map selected material IDs to those surfaces explicitly.
3. **Experience state:** A typed state model for `floorId`, optional `roomId`, `selectedMaterialId`, detail panel visibility, and loading/error state. Reset must restore the initial floor, camera, room and material without reloading the page.
4. **Catalog layer:** Local typed data first. A material record should include stable ID, display name, collection, filter attributes, format/thickness/finish/rating text, description, preview path, optional PBR map paths, and intended surface mapping. Search and filters operate on this catalog; do not call the observed external endpoint unless later authorized and its contract is verified.
5. **UI layer:** Search input, filter drawer, material grid with texture thumbnails, selected state, detail panel, floor selector, room navigation only when supported by scene data, camera/reset controls, and accessible loading/error status. All controls must have visible focus and meaningful labels.

## Asset requirements and boundary

- **Required for faithful geometry:** Original ground-floor architectural shell and furniture model, believable scale and named surface meshes. Prefer a commissioned, user-owned, or properly licensed GLB/glTF; otherwise author a procedural approximation and label the reduced fidelity.
- **Required for material realism:** Original/licensed albedo/base-color and, where available, normal and roughness maps with physical tile dimensions, UV scale, repeat and grout treatment.
- **Never use:** Reference-site GLBs, textures, image bytes, copied asset paths as fetch targets, or redistributed captures as production content.
- **Unknown:** The available evidence does not disclose complete source geometry, full catalog data, exact per-object material assignments, or original light rig.

## Incremental implementation sequence

1. **Protect existing work:** Continue preserving the original uncommitted project changes and avoid modifying the separate SmartNest project.
2. **Resolve the visual foundation:** Obtain or create an original/licensed ground-floor scene model using available screenshots as visual guidance. Record which details are modeled versus approximated.
3. **Stabilize and inspect the viewer:** Once the local Node/build environment is healthy, run build/lint/typecheck and verify loading, WebGL fallback, desktop/mobile resize, keyboard focus, search/filter, surface targeting and reset in a browser.
4. **Connect licensed materials:** Replace generated sample textures only when an original/licensed PBR catalog exists; selecting an item must update the mapped surface and detail UI together.
5. **Add additional floor/room scenes:** Replace each explicit placeholder only after original/licensed geometry and authored navigation data exist.
6. **Calibrate and validate:** Compare against evidence screenshots at matching viewport sizes. Tune camera/lighting only as documented design choices; do not claim pixel identity or verified reference behavior.

## Best next step

The first procedural interaction milestone is implemented, but is unverified in a running browser because Node tooling stalled during filesystem reads. The single highest-value next step is to diagnose the local Node/build-tool file-read stall and then run the lint/typecheck/build and browser checks. After that, secure or author original/licensed ground-floor geometry with named surface assignments; this remains the largest visual-fidelity blocker. Do not use reference-site assets.
