# Sky Combat

A 3D aerial combat game built with Three.js. Fly a fighter jet, shoot down drone swarms and enemy jets, survive every wave, and clear all five levels.

![Three.js](https://img.shields.io/badge/Three.js-r128-black) ![No Build](https://img.shields.io/badge/build-none-brightgreen) ![Vanilla JS](https://img.shields.io/badge/JS-vanilla-yellow)

---

## Play

### 🎮 Play Online

[**Play now on Netlify →**](https://eloquent-tulumba-7667c4.netlify.app/)

### 🏠 Run Locally

**No install, no build step.** Just open `index.html` in a browser.

For live-reload during development:

```bash
# Option A — VS Code: right-click index.html → "Open with Live Server"

# Option B — Python
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## Controls

| Input | Action |
|---|---|
| `W` | Throttle up (accelerate) |
| `S` | Throttle down (decelerate) |
| `A` / `D` | Bank and turn left / right |
| `Arrow Up` / `Arrow Down` | Nose up / nose down (auto-levels when released) |
| `Tab` | Switch lock-on target |
| `F` | Fire missile at lock (same as LMB) |
| `Mouse` / trackpad | Fly: up/down = nose up/down, left/right = turn. The `+` stays in the middle of the view; targeting is automatic (the pointer is captured while playing — Esc releases it and pauses) |
| `Space` (hold) | Fire bullets |
| `LMB` (click) | Fire missile |
| `R` | Barrel roll (destroys all incoming missiles) |
| `ESC` | Pause / resume |

### Touch (phones / foldables)

The game view sits in a box with the controls in a footer underneath (like Rooftop Rumble). The **Pad** button toggles the footer.

| Input | Action |
|---|---|
| Footer, left zone | Joystick — touch anywhere, ring appears under your thumb. Left/right = turn, up = climb, down = dive |
| `MISSILE` | Fire missile at the lock (there is a second pair of Missile / Gun buttons next to the joystick for the left hand) |
| `GUN` (hold) | Fire bullets |
| `ROLL` | Barrel roll |
| `THR` (hold) | Speed up |
| Swipe the game view | Jet follows your finger (up/down = nose, left/right = turn) |
| `Full` | Full screen on/off (also locks landscape on Android) |
| (automatic) | Planes in front of the nose are locked on their own; MISSILE fires at the lock |

Short landscape phones put the pad over the corners of the picture instead of in a footer. Add `?debug=1` to the URL for a touch-input readout.

**Missile targeting:** aim at an enemy and click LMB. Missiles fired at **jets** home automatically. Missiles fired at **drones** fly straight from your nose — use the aim dot for direction.

---

## Levels

| # | Name | Waves | Notes |
|---|---|---|---|
| 1 | First Contact | 3 | Mostly drones, 1–2 jets |
| 2 | Interceptors | 3 | Balanced drones + jets |
| 3 | Ace Squadron | 4 | Jet-heavy, elite AI |
| 4 | Full Assault | 5 | Large mixed swarms |
| 5 | Last Stand | 6 | Max enemies, no mercy |

Complete all waves in a level to unlock the next. Each level starts a countdown then drops you straight into the first wave.

---

## Enemies

**Drones** — slow, fragile (1 bullet = destroyed). Fire straight-shot missiles with a splash radius. Bigger hitbox, easier to see.

**Enemy Jets** — fast (~100 u/s), orbit the player, attack in bursts. Fire bullet sprays and homing missiles. Take multiple hits to destroy.

---

## Mechanics

- **Health** — 150 HP (+75 after each wave). Enemy bullets deal 10 HP each; enemy missiles deal 20 HP.
- **Bullets** — rapid fire but overheat after ~3 seconds of continuous firing. Cools automatically; full overheat locks the gun for 2 seconds.
- **Speed lines** — appear above 60% of max speed for visual feedback.
- **Terrain** — procedural mountains with snow caps and forest (`js/terrain.js`). Hitting the ground costs 30 HP; a PULL UP warning shows when terrain is ahead and the jet auto-pulls up at the last moment. Mountains stop bullets and missiles.
- **Flight** — diving gains speed, climbing loses it; wingtip contrails (`js/contrails.js`).
- **Camera** — chase cam follows the jet with yaw-adjusted offset and dynamic FOV (wider at high speed).
- **Aim dot** — static indicator above the jet nose shows where bullets will fly.
- **Flythrough** — after a level ends or the player dies, the jet keeps coasting while the result screen fades in over the scene.

---

## Project Structure

```
index.html          — HTML shell + UI overlays (Tailwind CSS)
js/
  config.js         — all tunable constants
  input.js          — keyboard + pointer lock + virtual cursor
  flight.js         — throttle, yaw, barrel roll
  drone.js          — player jet mesh and visuals
  enemies.js        — drone + jet AI state machines
  weapons.js        — bullet/missile pools, heat system, splash damage
  combat.js         — wave state machine, spawning, HP
  effects.js        — explosions, particles, speed lines
  audio.js          — Web Audio engine + HTML Audio music tracks
  levels.js         — level data loading (assets/levels.json)
  ui.js             — HUD, speed gauge, crosshair, aim dot, screens
  course.js         — sky environment (clouds, terrain decorations)
  main.js           — init, game loop, state machine wiring
assets/
  models/           — GLB meshes (player jet, enemy jet, drone, missiles)
  sounds/
    music/          — background loop, level-complete, game-over tracks
    sfx/            — WAV files for bullets, explosions, engine, alerts
  levels.json       — level + wave definitions
```

---

## Tech Stack

| Library | Version | Use |
|---|---|---|
| [Three.js](https://threejs.org) | r128 | 3D scene, meshes, camera, GLB loading |
| [Tailwind CSS](https://tailwindcss.com) | v4 (CDN) | UI overlays |

No bundler, no transpiler. All scripts loaded via `<script>` tags in dependency order.

---

## Credits

- **Original game:** [Gallind/Sky-Combat](https://github.com/Gallind/Sky-Combat) — the 3D aerial combat game this version is built on (MIT license, see `LICENSE`).
- **Inspiration:** [cedrickchee/vibe-jet](https://github.com/cedrickchee/vibe-jet) — a browser-based 3D multiplayer flying game; its free pitch/roll flight and terrain-with-trees approach inspired the flight and terrain changes here.
- **Changes in this version:** auto lock-on with aim assist, 3D pitch flight, procedural mountains with a PULL UP warning, big explosions with falling wrecks, longer waves, and an on-screen touch pad.

## Assignment Context

Exercise 4 (Free-style) — *From Idea to App*, Reichman University, Semester 4.
The base project was a 3D ball-runner game. This submission transforms it into a full aerial combat experience.
