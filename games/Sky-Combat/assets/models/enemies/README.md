# Enemy Models

Place enemy GLB models here (currently loaded from `assets/models/`).

| File | Notes |
|---|---|
| `drone1.glb` | Kamikaze drone — auto-scaled to `DRONE_WINGSPAN * DRONE_SCALE` |
| `enemy-jet.glb` | Fighter jet — auto-scaled to `DRONE_WINGSPAN * 2 * JET_SCALE` |
| `missile.glb` | (Optional) Missile model — currently uses a built-in cone geometry |

GLB export conventions:
- Nose toward +Z (enemies use `mesh.lookAt(drone.position)` so orientation matters)
- Keep under 1 MB each
