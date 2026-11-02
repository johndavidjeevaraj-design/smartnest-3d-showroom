# SmartNest 3D Showroom

An interactive, browser-based interior material study built with Next.js, React Three Fiber and Three.js. Visitors can inspect a procedural room scene, orbit and zoom the camera, browse a material catalogue, filter samples and apply selected finishes to supported surfaces.

> This repository is a material-selection / 3D showroom experience. It is distinct from a live smart-home device-control system.

## Current experience

- Interactive 3D scene loaded client-side.
- Ground-floor scene study with orbit and zoom controls.
- Material library with search and category filters.
- Apply selected materials to the main floor or feature wall.
- Resettable experience state and loading feedback.
- Explicit placeholder messaging for floors that have not yet been modelled.

## Technology

- Next.js 16 App Router
- React 19 and TypeScript
- Three.js
- React Three Fiber and Drei
- Tailwind CSS 4

## Local development

Requirements: Node.js version supported by the installed Next.js release.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality checks

```bash
npm run lint
npm run build
npm start
```

## Engineering notes

The 3D viewer is dynamically imported with server-side rendering disabled, keeping browser/WebGL work on the client. Preserve the loading and placeholder states when extending the scene. Test WebGL availability, lower-powered devices, touch controls, keyboard access and reduced-motion preferences.

## Roadmap

See [Engineering roadmap](docs/ENGINEERING_ROADMAP.md) for scene coverage, accessibility, performance and testing priorities.
