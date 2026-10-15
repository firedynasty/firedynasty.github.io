# Player Model

Place the player jet GLB here (currently loaded from `assets/models/drone.glb`).

| File | Notes |
|---|---|
| `drone.glb` | Player F-35 jet — auto-scaled to DRONE_WINGSPAN (8 units) in `js/drone.js` |

GLB export conventions:
- Nose should point toward +Z (game will rotate it Y+π to face -Z forward)
- Animations are supported (AnimationMixer in drone.js)
- Ideally under 2 MB
