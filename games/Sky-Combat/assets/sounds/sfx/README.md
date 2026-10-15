# SFX Assets

Place sound effect files here. All files are in `.wav` format.
Referenced and loaded in `js/audio.js` — each entry falls back to a procedural
sound if the file is missing, so you can add files incrementally.

---

## Currently Loaded Files

All files below are loaded automatically at game start. Missing files silently
fall back to a procedural synth.

| File | Trigger |
|---|---|
| `bullet_fire.wav` | Player fires bullet (Space) |
| `missile_launching.wav` | Player fires homing missile (LMB) |
| `explosion_enemy.wav` | Enemy destroyed |
| `player_hit.wav` | Player takes damage |
| `rocket_fly_by.wav` | Enemy jet / missile passes close |
| `barrel_roll.wav` | R key barrel roll dodge |
| `engine_idle.wav` | Engine loop — low speed |
| `engine_boost.wav` | Engine loop — high speed (cross-fades with idle) |
| `lock_on.wav` | Missile lock acquired |
| `lock_lost.flac` | Missile lock lost ⚠ FLAC — Chrome only; rename to `.wav` for all browsers |
| `missile_incoming_alert.wav` | Enemy missile ETA < 2 s |
| `wave_start.wav` | New wave begins |
| `wave_cleared.wav` | All wave enemies defeated |
| `level_complete.wav` | All waves cleared |

---

## All Supported Sound Effects

Drop any of these files into this folder and they will be picked up automatically
on the next page load. No code changes required.

### Combat

| File | Trigger | Suggested sound |
|---|---|---|
|V `bullet_fire.wav` | Player fires bullet (Space — 8/sec) | Short metallic pop or laser blip |
|V `missile_launching.wav` | Player fires homing missile (LMB) | Rocket ignition whoosh |
|V `explosion_enemy.wav` | Enemy drone or jet destroyed | Low-frequency boom with crackling debris |
|V `player_hit.wav` | Player jet takes a hit | Metallic impact with low thud |
|V `rocket_fly_by.wav` | Enemy jet passes within close range | High-to-low Doppler sweep |

### Flight

| File | Trigger | Suggested sound |
|---|---|---|
|V `barrel_roll.wav` | R key barrel roll dodge | Spinning air whoosh, 0.8 s |
|V `engine_idle.wav` | Engine hum at low speed (loop) | Steady turbine hum |
|V `engine_boost.wav` | Engine roar at high speed (loop) | Full-throttle afterburner roar |
| `wind_ambient.wav` | Ambient wind while flying (loop) | Soft rushing air |

### Targeting

| File | Trigger | Suggested sound |
|---|---|---|
|V `lock_on.wav` | Missile lock acquired on enemy | Two ascending electronic beeps |
|V `lock_lost.wav` | Target leaves lock range | Single descending beep |
|V `missile_incoming_alert.wav` | Enemy missile ETA < 2 s | Rapid warning tone |
| `missile_dodged.wav` | Barrel roll successfully dodges missile | Quick confirmation chime |

### Waves & Game State

| File | Trigger | Suggested sound |
|---|---|---|
|V `wave_start.wav` | New wave begins (countdown ends) | Short military fanfare or air horn |
|V `wave_cleared.wav` | All enemies in wave defeated | 4-note ascending chime |
|V `level_complete.wav` | All waves cleared — level complete | 6-note victory fanfare |
| `game_over.wav` | Player HP reaches 0 | Descending minor chord |
| `countdown_beep.wav` | 3-2-1 countdown tick | Short electronic beep |
| `countdown_go.wav` | GO! sound at wave start | Higher-pitch "GO" chime |

---

## Format Guidelines

- Format: `.wav` (required — files with other extensions won't be loaded)
- Max file size: keep under 200 KB each to avoid slowing page load
- Sample rate: 44 100 Hz or 48 000 Hz
- Bit depth: 16-bit stereo or mono
- Short one-shot sounds (< 1 s): use high-quality 44 100 Hz
- Looping sounds (engine, wind): trim carefully so the loop point is seamless
