# Effect Textures

Place sprite/texture assets for visual effects here.
All files should be **PNG with a transparent (alpha) background** unless noted otherwise.
Recommended sizes: 256×256 for one-shot FX, 512×512 for trails/loops, 64×64 for high-frequency particles.

Three PNG textures are already wired up in `js/effects.js`:
- **`spark.png`** — applied to the shared `Points` explosion/impact particle material via `PointsMaterial.map`
- **`smoke.png`** — drives a separate `smokeSystem` Points renderer used for thruster exhaust
- **`shockwave.png`** — expanding ring `THREE.Sprite` pool (4 slots); fires on every enemy death via `emitExplosionEffect()`

To wire up any additional texture, create a new `PointsMaterial` (particles) or `SpriteMaterial` (one-shot FX)
in `initEffects()`, load the PNG with `new THREE.TextureLoader().load(...)`, and add an emitter function.

---

## Currently Listed Files

| File | Used for |
|---|---|
| `smoke.png` | Smoke particle sprite — engine trails, explosion lingering smoke |
| `spark.png` | Spark/fire particle sprite — impacts, bullet hits, explosion debris |
| `shockwave.png` | Explosion shockwave ring — flat ring that scales outward on enemy death |

---

## All Supported Effect Textures

Drop any of these files into this folder and wire them up in `js/effects.js`.
No other files need changing. Organised by effect category.

---

### Explosions & Combat

> **Tags:** `explosion` `death` `impact` `hit` `bullet` `missile` `combat` `damage`

| File | Effect | Notes |
|---|---|---|
|V `smoke.png` | Soft smoke puff — lingers after explosion, engine damage trail | Greyscale with alpha fade at edges |
|V `spark.png` | Hot sparks / fire embers — short-lived, fly outward from impact | Bright yellow-orange core, fades to transparent |
|V `shockwave.png` | Circular shockwave ring — scales from 0 to ~80 units in ~0.3 s | Thin bright ring, transparent inside and outside |
| `fire.png` | Fire sprite — burning debris, engine fire on damaged jet | Warm orange-red gradient, strong alpha falloff |
| `ember.png` | Small glowing ember particles — float upward after explosion | Tiny, round, orange-white |
| `muzzle_flash.png` | Muzzle flash burst — 1-frame flash at bullet spawn point | Star/cross shaped bright white-yellow bloom |
| `hit_mark.png` | Hit impact flash — brief white flash where bullet strikes enemy | Soft circle or starburst, white with fast fade |
| `bullet_tracer.png` | Bullet tracer glow — thin elongated oval drawn along bullet path | Long narrow oval, cyan or yellow-white |
| `decal_scorch.png` | Scorch mark — burnt circle left on terrain after explosion | Dark charred ring, used as a flat decal on ground plane |

---

### Missile & Propulsion Trails

> **Tags:** `missile` `trail` `exhaust` `thruster` `engine` `afterburner` `smoke` `propulsion`

| File | Effect | Notes |
|---|---|---|
| `missile_trail.png` | Smoke/exhaust trail behind active missiles — ring-buffer particle stream | Soft grey-white puff, same as `smoke.png` but tighter |
| `afterburner.png` | Engine afterburner cone — glowing oval behind player jet at high throttle | Bright blue-white core, elongated, alpha fade to transparent |
| `thruster_glow.png` | Thruster exhaust glow — replaces procedural exhaust particles in `emitThrusterExhaust()` | Soft cyan-to-blue radial gradient |
| `wing_vapor.png` | Wingtip condensation streaks — appear above ~80% speed at each wingtip | Thin wispy streak, white semi-transparent |

---

### Glows & Light Flares

> **Tags:** `glow` `flare` `light` `bloom` `halo` `lens` `sun` `highlight` `neon`

| File | Effect | Notes |
|---|---|---|
| `glow.png` | Soft radial glow — used around missiles, engine exhaust, lock-on reticle | Pure white/cyan radial gradient, no hard edges |
| `lens_flare.png` | Camera lens flare — appears when looking toward sun direction | Multi-element flare strip (horizontal) or single hexagonal bloom |
| `corona.png` | Sun corona halo — placed at sun position as a background sprite | Large, very soft; rendered behind all geometry |
| `laser_glow.png` | Bullet laser glow overlay — cylindrical glow around each bullet | Narrow elongated oval, emissive cyan or orange |

---

### Environmental & Weather

> **Tags:** `weather` `cloud` `rain` `fog` `wind` `ambient` `sky` `atmosphere`

| File | Effect | Notes |
|---|---|---|
| `cloud_puff.png` | Cloud puff billboard — individual cloud chunk for procedural cloud bank | Soft white shape with feathered edges |
| `rain_streak.png` | Rain droplet streak — thin angled white lines, tilted ~15° for wind effect | Small, 16×64 or similar elongated |
| `turbulence.png` | Heat-haze / turbulence distortion — used as a displacement UV map | Greyscale noise pattern, tileable |
| `dust_particle.png` | Dust/debris particle — kicked up near terrain or after explosion | Tiny round brownish-grey, strong alpha fade |

---

### Player Feedback & HUD

> **Tags:** `hud` `ui` `feedback` `damage` `shield` `lock` `warning` `reticle` `crosshair`

| File | Effect | Notes |
|---|---|---|
| `hit_vignette.png` | Red screen vignette — full-screen overlay on player damage | Dark red at corners fading to transparent in center; stretch to cover viewport |
| `damage_smoke.png` | Dark smoke trail from player jet — emitted continuously when HP < 30% | Same as `smoke.png` but darker grey |
| `shield_pulse.png` | Shield/invincibility ring — expands around player during i-frames | Hexagonal or circular ring, blue-white, fades as it scales out |
| `lock_reticle.png` | Missile lock targeting ring — drawn at locked enemy position in world-space | Circle with tick marks; replaces or supplements the current CSS lock indicator |
| `warning_flash.png` | Incoming missile warning flash — full-screen edge flash | Bright orange at screen edges only |

---

### Speed & Motion

> **Tags:** `speed` `boost` `motion` `blur` `boost` `fast` `afterburner` `velocity`

| File | Effect | Notes |
|---|---|---|
| `speed_line.png` | Speed line streak — replaces the `LineSegments` speed-line system at high velocity | Thin white-to-transparent horizontal streak |
| `boost_ring.png` | Barrel-roll / boost ring — expands forward from player during a barrel roll | Thin ring or vortex, cyan or white |
| `motion_blur_ramp.png` | Screen-edge motion blur — 1D gradient mask applied at very high speed | Horizontal 1×256 greyscale gradient, used as screen overlay |

---

## Format Guidelines

- Format: **PNG** with alpha channel (transparent background required for sprites)
- Size: 256×256 general purpose · 512×512 large FX · 64×64 high-frequency particles
- One-shot FX: hard centre, soft alpha falloff to fully transparent edge
- Looping/trail FX: tileable in at least one axis
- Max file size: < 200 KB per texture to keep page-load fast
- Naming: `lowercase_with_underscores.png` — no spaces, no uppercase
