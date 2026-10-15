# Sky Combat — what broke, how it was fixed, what to reuse

Written after getting Sky Combat (`games/Sky-Combat`) to a working prototype on a phone/foldable and desktop.
Use it as a checklist for the next game, especially anything with **touch controls**, **pointer lock**, or a
**3D view that has to share the screen with a control pad**.

Based on [Gallind/Sky-Combat](https://github.com/Gallind/Sky-Combat); flight/terrain ideas inspired by
[cedrickchee/vibe-jet](https://github.com/cedrickchee/vibe-jet). Reference implementations that already worked
on the phone and were copied from: **Pixel Racing** (pointer-event stick), **Gore Rush** (swipe look, device-based
pointer lock, Full button), **Rooftop Rumble** (controls in a footer, short-landscape overlay).

Final controls: footer on touch (floating stick left, Missile/Gun twin buttons next to it, diamond of
Missile/Gun/Roll/Thr on the right), swipe the view to look, auto-lock targeting, `+` fixed in the middle of the
view; desktop = trackpad/mouse flies the jet (pointer locked), WASD/arrows, Space gun, LMB/F missile.

---

## 1. Touch pad: the bugs, in the order they bit us

### 1.1 Mixing Touch Events and Pointer Events
- First version: stick/buttons on Pointer Events, "swipe the sky" on `touchstart/touchmove` with `preventDefault()`.
  Mixing the two models is a known way to get `pointercancel` (dead stick) on Android Chrome.
- **Fix:** use **Pointer Events for everything** (one finger = one `pointerId`), `setPointerCapture` on the
  element that owns the finger, and `touch-action:none` on `html, body`. This is exactly what Pixel Racing does,
  and it is the one that was known to work on the phone.
- Honest note: the original symptom ("stick can only move to the top-left", plane climbing to the ceiling while the
  debug line said `stick 0.0,0.8`) was **never conclusively diagnosed**. An early theory blamed
  `getBoundingClientRect()` drifting from the painted ring; that was a hypothesis, not a proof. What actually
  removed the risk was rebuilding the stick so it does not depend on that geometry (1.4).

### 1.2 Ring painted in the wrong place (a real, reproduced CSS bug)
- The floating stick ring was `position:absolute` inside a container that was `position:fixed; bottom:0; height:0`.
  Its `top:` offset was therefore measured from the *bottom* of the screen, so the ring appeared **one screen-height
  below the finger** (measured: 642 px error in a 642 px viewport).
- **Fix:** `position:fixed` for the ring, later replaced by a normal-flow footer (see section 2).
- **Lesson:** never put an absolutely-positioned child with `top` inside a zero-height box. Test by asserting
  `|ringCenter - touchPoint| < 2px` at several touch positions (see section 8).

### 1.3 `typeof` does not protect a `let` in the TDZ
- `touch.js` loaded before `main.js`, and read `typeof gameState`. `gameState` is a top-level `let` in `main.js`;
  `typeof` on a not-yet-initialised `let` **throws** (temporal dead zone), unlike `typeof undeclaredVar`.
- **Fix:** wrap it: `function isPlaying(){ try { return gameState === 'playing'; } catch(_) { return false; } }`.
  Or load order / `var`. Same trap applies to any cross-file global.

### 1.4 Floating joystick: measure from where the finger landed
- Fixed ring + `getBoundingClientRect()` math means any layout/visual-viewport mismatch silently skews input.
- **Fix:** the ring is created **at the touch point** and all deltas are measured from that origin, so the
  painted control and the maths cannot disagree.
- **Bias bug (found by testing):** I first nudged the ring inward when the touch started near the zone edge.
  The touch then started 17–20 px off the ring centre, giving asymmetric output (`0.73` one way, `0.24` the
  other). **Don't clamp the origin** — let the ring overhang the zone edge.

```js
function stickStart(e){
  const zr = zone.getBoundingClientRect();              // only used to PAINT the ring
  ring.style.left = (e.clientX - zr.left) + 'px';
  ring.style.top  = (e.clientY - zr.top)  + 'px';
  stick = { id: e.pointerId, x: e.clientX, y: e.clientY };  // origin = touch point (the maths)
}
// dx,dy = pointer - stick.x/y;   dead zone ~0.2R;   yaw = -dx/R,  pitch = -dy/R  (clamped, analog)
```

### 1.5 Multi-touch plumbing
- Stick on the footer zone (captured pointer), swipe on `document` `pointerdown` for **any other pointer that
  lands inside the game box**, ignore `pointerType === 'mouse'` for the swipe (desktop mouse keeps its own scheme).
- Verified together in a test: stick held + swipe + a button press all active at once.

### 1.6 Buttons that get stuck
- **Hiding the pad while a finger is down left the button "on"** (gun kept firing). The cleanup only ran when
  the stick/swipe was active. Fix: track held buttons and release them all when the pad hides.
- **Duplicate buttons** (Missile/Gun exist on both the left and right): use a per-action finger count so the action
  stays on until *every* copy is released, and keep a list of per-button release functions for the reset.

```js
const press   = () => { if (active) return; active = true;  if (++held[name] === 1) action.down(); };
const release = () => { if (!active) return; active = false; if (--held[name] <= 0) { held[name] = 0; action.up(); } };
// listen for pointerup, pointercancel AND lostpointercapture; reset via releasers.forEach(r => r())
```

### 1.7 Page-level touch hygiene (do this on every touch game)
- `<meta viewport ... maximum-scale=1, user-scalable=no, viewport-fit=cover>`
- `html, body { touch-action:none; user-select:none; -webkit-user-select:none }`
- `overflow:hidden` on `html`/`body` **while playing** (a scrolling page lets the picture and the controls drift).
- `contextmenu` → `preventDefault` on the pad (long-press menu).
- `env(safe-area-inset-*)` padding on the footer.

---

## 2. Layout: game box on top, controls in a footer (Rumble-style)

User wanted "screen like Gore Rush, controls in a footer like Rumble — not full screen".

- `body{display:flex;flex-direction:column;height:100vh;height:100dvh}`
- `#gameArea{position:relative;flex:1 1 auto;min-height:0;overflow:hidden}` holds the canvas, the HUD
  (`position:absolute; inset:0`, was `fixed`) and the small Pad/Pause/Full buttons.
- Footer `#padFooter{height:clamp(168px,36dvh,250px)}` (with a `vh` fallback line first). Stick size
  `--s: min(.8*footer, 170px)`, button size `--b: min(.36*footer, 84px)`; zone width `1.35*--s`.
- **The renderer and camera must follow the box, not the window:**

```js
function gameAreaSize(){ const a = document.getElementById('gameArea');
  return { w: Math.max(1, a.clientWidth), h: Math.max(1, a.clientHeight) }; }
function onResize(){ const s = gameAreaSize(); camera.aspect = s.w/s.h; camera.updateProjectionMatrix(); renderer.setSize(s.w, s.h); }
new ResizeObserver(onResize).observe(gameArea);   // also fires when the footer shows/hides
```
- Menus/overlays stay `position:fixed` full-screen; they don't care.
- **Short landscape phones** (`@media (max-height:470px) and (orientation:landscape)`): a footer would eat the
  picture, so the same footer becomes `position:fixed; height:0` and the pad floats over the corners (radar moves
  to the top-left so it doesn't sit under the buttons).
- Desktop with the pad off: footer hidden, game box = full window (unchanged behaviour).
- Pitfall seen in testing: the automation window sizes don't map 1:1 to viewport sizes; always read
  `innerWidth/innerHeight` instead of assuming.

---

## 3. Pointer lock ate the buttons ("I can't click Pad or Pause")

- The game called `requestPointerLock()` at level start/resume. A locked pointer **hides the cursor and sends every
  click to the game**, so on-screen Pad/Pause buttons are dead. (There was no actual fullscreen call; the
  "full screen" feeling was the mouse grab.)
- **Fix (Gore Rush's cleaner pattern):** decide by **device**, not by a toggle.

```js
const deviceHasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
function requestPointerLock(){
  if (deviceHasTouch || touchPadActive()) return;        // never grab the mouse on touch / while the pad shows
  try { const r = document.documentElement.requestPointerLock(); if (r && r.catch) r.catch(()=>{}); } catch(_) {}
}
```
- Turning the pad **off** during play calls `requestPointerLock()` from the click handler (that click is the user
  gesture the browser demands).
- Pause hygiene copied from Gore Rush: `Esc` and `P` pause/resume, **`visibilitychange` pauses when the tab is
  hidden** (switching apps on a phone), `pointerlockchange` unlock → pause (desktop only).
- Added a **Full** button (`requestFullscreen` + `screen.orientation.lock('landscape')` on Android Chrome, hidden
  where unsupported). Call `.blur()` after button clicks so Space/Enter don't re-trigger them.

---

## 4. Desktop controls: trackpad flies the jet, `+` is fixed

- User point: "I don't need the pointer to aim — the `+` should be at the middle of the screen."
- Locked-pointer `movementX/Y` feeds the **same channel as the touch swipe** (`touchLookYaw/Pitch`), applied once
  per frame in the flight code: mouse up = nose up, mouse left = turn left. Sensitivity `0.003 rad/px`.
- Crosshair is pinned to `50% / 50%` of the HUD box; **cursor-hover lock was removed** everywhere (a resting
  cursor kept stealing the auto-lock). Tab still cycles targets.
- While a swipe / mouse look is active (`lookHold` ~0.35 s) the auto-level and lock-steer assist are suspended,
  then resume — so manual input always wins and nothing fights it.

---

## 5. Flight model (3D, arcade)

- Pitch added to what was a fixed-altitude yaw-only game: `dronePitch` clamped to ±66°, forward vector
  `(-sin(yaw)cos(p), sin(p), -cos(yaw)cos(p))`, camera follows pitch (`0.8×`) and leans into turns.
- Diving gains speed, climbing bleeds it (`PITCH_GRAVITY`); no throttle input drifts back to cruise; minimum
  speed 45 so the jet can't hover. Pad: `THR` button = hold W.
- Auto-level when no pitch input; **lock-steer assist** swings nose (yaw + pitch) toward the locked target when
  there is no manual input.
- Terrain safety: look-ahead 2.6 s along the nose; warning "PULL UP" and an **automatic pull-up if terrain is
  <0.9 s away**; crash = 30 HP + bounce; camera is never allowed below the terrain.
- Enemies were spawned/flown on the player's old fixed altitude; they now follow the player's altitude and are
  clamped above the terrain.

## 6. Targeting that works on a phone

- **Auto-lock:** nearest enemy within a 40° cone of the nose; **sticky** until it leaves a wider 65° cone or range
  1400; `Tab` cycles. (Cone + break-cone hysteresis stops the ring flickering between targets.)
- **Aim assist:** bullets lead the locked target (predicted position) only when it is inside the cone; missiles
  home on every enemy type (drones used to be straight shots) and have a proximity fuse.
- **Swept hit test for bullets.** Bullets move ~13 units/frame; testing only the end point let them skip small
  targets. Test the ray from previous to new position against a slightly grown AABB.

## 7. Content that needed fixing

- **Terrain** (`terrain.js`): one `terrainHeight(x,z)` function is the single source of truth for the mesh, trees,
  collision, PULL UP, projectile checks, enemy clamping and the camera floor. Ridged-noise mountains, flat start
  valley, snow by height, rock by slope, ~9k instanced trees. Mountains stop bullets/missiles.
  - Vertex colours looked washed out → `color.convertSRGBToLinear()` before writing them (renderer is sRGB).
  - Raised/shrunk clouds so they stop blocking the view; fog and camera far plane widened for the big world.
- **Explosions** (`explosions.js`), layered like the reference text: white flash, fireball inheriting velocity,
  lingering dark smoke, shockwave ring, debris chunks with smoke trails, camera shake scaled by distance, layered
  audio (crack + boom + sub). **Shot-down jets keep flying as burning wrecks and explode again on the ground.**
  Cap sprites (~420) so a big fight can't tank the frame rate; clear them on level restart. Enemy missile hits on
  the player get a *small* puff (size 0.3, no debris) — asked for separately.
- **Levels too hard/short:** doubled the waves per level with a gentler ramp, 100→150 max HP, +75 HP per wave,
  weaker drone blast.

---

## 7b. Loops, inverted flight and a half-roll "turn-around" (added later)

Asked for: "instead of stopping at vertical, be able to go over / flip upside down; R should flip upside-down and
back upright". Pitch was clamped to +-66 deg. Lessons, all of which bit during testing:

- **Don't clamp pitch; wrap it** to (-PI, PI]. The forward vector `(-sin(yaw)cos(p), sin(p), -cos(yaw)cos(p))` is already
  correct past vertical (horizontal part flips sign), so loops "just work" in the flight/weapon/terrain code.
- **`sign(pitch)` is a trap.** My first "finish the loop when you let go" used `sign(pitch)` for the direction; pitch changes
  sign where it wraps at +-PI, so the jet oscillated and got stuck upside-down. Use a **wrapped error to a target**
  instead: level out to the *nearest level attitude* (`pitch 0` if `cos(p) >= 0`, else `pitch PI`) with
  `err = wrapPi(target - pitch)`. No jump, no oscillation. (Found by watching `pitch=-3.13, vel=-0.16` in a live probe.)
- **Left/right must swap when inverted** (`cos(pitch) < 0`) so the pilot's left stays screen-left. Verified numerically:
  heading change dotted with the camera's right vector is the same negative number upright, rolled, and looped.
  The visual bank uses the *pilot's* direction, so undo the swap there. Lock-steer yaw assist needs the heading
  `yaw + (inverted ? PI : 0)` and **no** swap; its pitch assist moves the opposite way when inverted.
- **"Pull up" means raise the nose elevation**, whose pitch direction is `sign(cos p)`. The automatic terrain pull-up must
  use that, and should stop short of straight-up or it throws the jet over the top by itself.
- **Half roll = an attitude identity.** Rotating 180 deg about the nose equals `(yaw + PI, pitch -> PI - pitch, roll same)`,
  so R flips the *state* instantly (same flight path) and the picture eases a visual roll from +-PI to 0. Pressing it again
  returns upright. Set `drone.rotation.x` and the visual roll in the same frame or you get a one-frame snap or the nose
  tilting through vertical. Loop up + level out inverted + R = a real **Immelmann turn-around** (heading reversed).
- **Lerp angles the short way**: `d = atan2(sin(a-b), cos(a-b))`, otherwise `+3.1 -> -3.1` swings the long way round.
- **Camera `up` must follow the jet's up**, and a plain vector lerp between `up` and `-up` passes through zero (NaN after
  normalize). Instead rotate the camera's up toward the target *about the view axis*:
  `ang = atan2(fwd . (up x upT), up . upT);  up.applyAxisAngle(fwd, ang * 0.12)`. Also project `up` perpendicular to the view
  first so `lookAt` never degenerates. Use full pitch for the chase-camera offset once inverted.
- The aim cone must use the **real 3D nose vector**, not a horizontal one, or an inverted jet locks onto enemies behind it.
- Crash handler must flip an inverted jet back upright *along the same flight path* (yaw + PI, pitch PI - p), not just
  set the pitch, or the jet reverses heading.

## 8. How the testing was done (reuse this)

Browser automation (Claude in Chrome) with **synthetic events**, plus numeric assertions instead of eyeballing:

```js
const ptr = (el,type,x,y,id) => el.dispatchEvent(new PointerEvent(type,
  { bubbles:true, cancelable:true, pointerId:id, pointerType:'touch', clientX:x, clientY:y }));
// start the game:   startLevel(2);  playerInvincible = true;  playerHP = 150;
// stick test:       pointerdown on the zone at several spots, pointermove +/-50px, read touchYaw/touchPitch
// assert ring under finger:  |ringCenter - touchPoint| < 2px     (caught the 642px bug and the clamp bias)
// assert symmetry:           yaw(right) == -yaw(left),  pitch(up) == -pitch(down)
// buttons:          dispatch on the button, check the key/flag, then release and check it clears
// pointer lock:     monkey-patch Element.prototype.requestPointerLock to count calls (0 with the pad on)
// locked mouse:     set the lock flag, dispatch MouseEvent('mousemove',{movementX,movementY}), run update(1/60) frames
```

Gotchas:
- The automation tab is often `document.visibilityState === 'hidden'`, so `requestAnimationFrame` is throttled:
  drive the game with `update(1/60)` loops when you need motion, and remember a visibility-pause handler will pause
  a "hidden" tab when the event fires.
- `document.elementFromPoint` returns `null` outside the viewport → fall back to `document.body` in test helpers.
- Release test touches **on the same element that got the pointerdown** (releasing on `document` left a stick
  "held" and looked like a bug; it was the test).
- Window sizes from the automation resize don't equal viewport sizes: read `innerWidth/innerHeight`.
- Screenshots to check the *look* (ring under the thumb, footer layout, short-landscape overlay) after the numbers pass.
- `?debug=1` shows a one-line readout of the last touch input (`stick start x,y`, `swipe dx,dy`, `gun down`,
  `stick CANCEL`). Add this to every touch game — it turns "it doesn't work on my phone" into one sentence.

## 9. Shipping / repo notes

- `games/Sky-Combat` arrived as a nested git clone. To commit it into the main repo its `.git` was moved to
  `~/Documents/technical/github/Sky-Combat-upstream.git-backup` (same pattern as the other `*-upstream.git-backup`
  folders). History is intact there.
- ~100 MB of models/sounds → the first push is slow (run it in the background and wait).
- GitHub Pages caches ~10 min. On Android without a keyboard: **Incognito tab** (empty cache), or site settings →
  Clear data, or Delete browsing data → Cached images and files. A plain reload often keeps cached script files.
- Credits live in the in-game Credits screen, the README and the games-page card.

## 10. Reuse checklist for the next game

1. Pointer Events only; `setPointerCapture`; `touch-action:none`; no Touch/Pointer mixing.
2. Floating stick measured from the touch origin; never clamp the origin.
3. Controls in a footer (or corner overlay on short landscape); renderer/camera size from a box via `ResizeObserver`.
4. Never `requestPointerLock` on touch devices or while on-screen controls are showing; pause on Esc, P and `visibilitychange`.
5. Guard cross-file `let` globals with try/catch; check load order.
6. Ref-count duplicate buttons; release everything when the pad hides; handle `pointercancel` and `lostpointercapture`.
7. Auto-target with hysteresis (lock cone vs break cone) and a swept hit test for fast projectiles.
8. One shared height/terrain function for everything that touches the ground.
9. Add `?debug=1` touch readout, and write numeric assertions (ring error, symmetry, button flags) before trusting a screenshot.
10. Cap particle/sprite counts and clear them on restart.

## Still unverified

- The behaviour on the actual Samsung Fold was only observed through one screenshot (stick events arriving with
  sensible values) and the user's reports; everything else above was exercised in desktop Chrome with synthetic
  touch events. Treat the footer sizes (36 % height, 168–250 px) and swipe sensitivities
  (`0.0045` yaw / `0.005` pitch rad/px) as tuned guesses.
- The root cause of the very first "stick only moves top-left" report was never reproduced.
