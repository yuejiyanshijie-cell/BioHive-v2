# Build Babylon.js game from a description

- Keep durable project status in `README.md`: what is built, what is left, and an asset table.
- Generate visual assets with `cd asset-gen && python tools/asset_gen.py`. Confirm the spend with the user before the first paid generation.
- Read `babylon-guide.md` for engine guidance: stack, project layout, how to run, and how to capture.

## Task: Refactor BioHive Evolution into a Babylon.js project

**Existing game:** `index.html` — a 3D bio hive evolution RTS built with Three.js (single HTML file, ~25KB JS).

**Goal:** Rewrite it as a proper Vite + TypeScript + Babylon.js project with:

1. **Project structure:** Scaffold with `npm create vite@latest . -- --template vanilla-ts`, then install `@babylonjs/core`, `@babylonjs/loaders`, and set up the dev server (port 5173, host 0.0.0.0).

2. **Core game mechanics (preserve from the original):**
   - 4 unit types: Drone (collector), Infantry (melee), Rocket (ranged), Sniper (ranged)
   - 4 resource types: gold/food/crystal/rare, scattered on map, collected by drones returning to crystal
   - 3D terrain (500×500), trees, rocks, day sky
   - Player crystal at center with HP
   - Enemy hive at south with HP + phase defense triggers
   - Enemy squads (4×4 formations) marching toward player crystal
   - Wave system: progressive difficulty
   - Observer mode (free flight camera) + God mode (top-down placement)
   - Unit models with distinct 3D shapes per type

3. **New improvements (beyond the original):**
   - Use Babylon.js `Engine` + `Scene` with proper rendering loop
   - Use `scene.onBeforeRenderObservable` for game logic
   - Proper TypeScript modules in `src/`
   - Improve unit models with Babylon.js primitives
   - Add proper collision detection and projectile system
   - Make mobile-responsive with touch controls

4. **Workflow:**
   - `npm run dev` must work and show the game running
   - Keep the game playable at every step
   - Commit working state to git after each significant feature

## Delivery

Judge progress from the running game, never from a clean build. Decide from how the task is framed how to work — open-ended collaboration gets the live game early; a finished brief gets steady progress. Either way the result is proven, not claimed.
