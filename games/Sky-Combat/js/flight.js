// js/flight.js — 3D arcade flight model
//
// Control mapping:
//   W / S        = throttle up / down (no input: speed drifts back to cruise)
//   A / D        = bank and turn left / right
//   Arrow Up/Down= nose up / nose down (auto-levels when released)
//   Mouse        = lock-on cursor (see ui.js / weapons.js)
//   R            = barrel roll
//
// Diving speeds the jet up, climbing bleeds speed. The terrain (terrain.js) is solid:
// a PULL UP warning shows when you are about to hit it, and the jet auto-pulls up at the last moment.

let droneSpeed    = 0;   // initialised to CRUISE_SPEED in resetGame()
let flipCooldown  = 0;   // seconds until next barrel roll allowed
let flipTimer     = 0;   // seconds remaining in current roll
let flipDir       = 1;   // +1 roll right, -1 roll left
let droneFlipRoll = 0;   // roll angle used by drone.js visual override
let _dodgeVelX    = 0;   // lateral dodge velocity (decays each frame)
let _dodgeVelZ    = 0;
let _yawVelocity  = 0;   // current yaw rate — smoothed toward target to prevent snap-turns
let _pitchVelocity = 0;  // current pitch rate
let groundWarning = 0;   // 0 = clear, 1 = terrain ahead, 2 = imminent (auto pull-up active)
let groundCrashTimer = 0;
let droneAGL = 999;      // altitude above ground level (for the HUD)

const _flightFwd = new THREE.Vector3();

// Ground collision + lookahead warning. Shared by flight and the won/lost coast.
function updateGroundSafety(delta) {
    if (!drone || typeof terrainHeight !== 'function') return;
    if (groundCrashTimer > 0) groundCrashTimer -= delta;
    const groundY = terrainHeight(drone.position.x, drone.position.z);
    droneAGL = drone.position.y - groundY;
    if (drone.position.y < groundY + GROUND_CLEARANCE) {
        drone.position.y = groundY + GROUND_CLEARANCE;
        dronePitch = Math.max(dronePitch, 0.3);
        if (groundCrashTimer <= 0 && gameState === 'playing') {
            groundCrashTimer = 1.0;
            droneSpeed *= 0.75;
            applyDamageToPlayer(CRASH_DAMAGE);
            if (typeof bigExplosion === 'function') bigExplosion(drone.position.clone(), 0.7, { debris: 6 });
        }
    }
}

function _lookaheadGround() {
    const fx = -Math.sin(droneYaw) * Math.cos(dronePitch), fy = Math.sin(dronePitch), fz = -Math.cos(droneYaw) * Math.cos(dronePitch);
    let level = 0;
    for (let t = 0.3; t <= PULLUP_LOOKAHEAD; t += 0.3) {
        const x = drone.position.x + fx * droneSpeed * t, y = drone.position.y + fy * droneSpeed * t, z = drone.position.z + fz * droneSpeed * t;
        if (y < terrainHeight(x, z) + 22) { level = Math.max(level, t < PULLUP_AUTO_T ? 2 : 1); }
    }
    return level;
}

function updateFlight(delta) {
    // --- Throttle: W accelerates, S brakes, neither = drift back to cruise speed ---
    if (keys['KeyW']) {
        const accelFactor = 1 - (droneSpeed / MAX_SPEED) * 0.65;
        droneSpeed = Math.min(droneSpeed + THROTTLE_ACCEL * accelFactor * delta, MAX_SPEED);
    } else if (keys['KeyS']) {
        droneSpeed = Math.max(droneSpeed - THROTTLE_ACCEL * delta, MIN_SPEED);
    } else {
        const d = CRUISE_SPEED - droneSpeed;
        droneSpeed += Math.sign(d) * Math.min(Math.abs(d), THROTTLE_DECEL * 4 * delta);
    }
    // Gravity: dive = faster, climb = slower
    droneSpeed = Math.max(MIN_SPEED, Math.min(MAX_SPEED * 1.15, droneSpeed - Math.sin(dronePitch) * PITCH_GRAVITY * delta));

    // --- Yaw (bank turn): A left, D right ---
    let _targetYawVel = Math.max(-1, Math.min(1, (keys['KeyA'] ? 1 : keys['KeyD'] ? -1 : 0) + (typeof touchYaw !== 'undefined' ? touchYaw : 0))) * YAW_SPEED;
    // --- Pitch: arrows ---
    const pitchInput = Math.max(-1, Math.min(1, (keys['ArrowUp'] ? 1 : 0) - (keys['ArrowDown'] ? 1 : 0) + (typeof touchPitch !== 'undefined' ? touchPitch : 0)));
    let _targetPitchVel = pitchInput * PITCH_RATE;

    // Lock-on steering assist: with a target locked and no manual input, swing the nose onto it
    if (typeof lockedTarget !== 'undefined' && lockedTarget && gameState === 'playing') {
        const dx = lockedTarget.mesh.position.x - drone.position.x;
        const dy = lockedTarget.mesh.position.y - drone.position.y;
        const dz = lockedTarget.mesh.position.z - drone.position.z;
        if (_targetYawVel === 0) {
            let diff = Math.atan2(-dx, -dz) - droneYaw;
            diff = Math.atan2(Math.sin(diff), Math.cos(diff));
            if (Math.abs(diff) < LOCK_STEER_CONE * Math.PI / 180)
                _targetYawVel = Math.max(-1, Math.min(1, diff * LOCK_STEER_GAIN)) * YAW_SPEED;
        }
        if (pitchInput === 0) {
            const diff = Math.atan2(dy, Math.hypot(dx, dz)) - dronePitch;
            if (Math.abs(diff) < LOCK_STEER_CONE * Math.PI / 180)
                _targetPitchVel = Math.max(-1, Math.min(1, diff * LOCK_STEER_GAIN)) * PITCH_RATE;
        }
    } else if (pitchInput === 0) {
        _targetPitchVel = -dronePitch * PITCH_AUTOLEVEL * 3;   // gentle auto-level
        _targetPitchVel = Math.max(-PITCH_AUTOLEVEL, Math.min(PITCH_AUTOLEVEL, _targetPitchVel));
    }

    // Terrain avoidance: warning ahead, forced pull-up when it is about to hit
    groundWarning = _lookaheadGround();
    if (groundWarning === 2) _targetPitchVel = PITCH_RATE;
    if (drone.position.y > ALT_CEILING) _targetPitchVel = -PITCH_RATE * 0.7;

    _yawVelocity   = THREE.MathUtils.lerp(_yawVelocity, _targetYawVel, Math.min(1, YAW_ACCEL * delta));
    _pitchVelocity = THREE.MathUtils.lerp(_pitchVelocity, _targetPitchVel, Math.min(1, PITCH_ACCEL * delta));
    droneYaw   += _yawVelocity * delta;
    dronePitch  = Math.max(-PITCH_MAX, Math.min(PITCH_MAX, dronePitch + _pitchVelocity * delta));

    // --- Barrel roll dodge (R key) ---
    if (flipCooldown > 0) flipCooldown -= delta;

    if (flipTimer > 0) {
        flipTimer -= delta;
        const t = Math.min(1, 1 - flipTimer / FLIP_DURATION);
        // Cubic ease-in-out: fast in the middle, smooth start and end
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        droneFlipRoll = flipDir * eased * Math.PI * 2; // full 360° roll
        if (flipTimer <= 0) droneFlipRoll = 0;
    } else {
        droneFlipRoll = 0;
    }

    if (keys['KeyR'] && flipCooldown <= 0 && flipTimer <= 0 && gameState === 'playing') {
        flipDir = Math.random() < 0.5 ? 1 : -1;
        flipTimer = FLIP_DURATION;
        flipCooldown = FLIP_COOLDOWN;
        // Perpendicular velocity kick — right vector in XZ plane
        const rightX =  Math.cos(droneYaw);
        const rightZ = -Math.sin(droneYaw);
        _dodgeVelX = rightX * flipDir * FLIP_DODGE_FORCE;
        _dodgeVelZ = rightZ * flipDir * FLIP_DODGE_FORCE;
        // Destroy all enemy missiles in flight — barrel roll always dodges incoming missiles
        if (typeof dodgeIncomingMissiles === 'function') dodgeIncomingMissiles();
        if (typeof playBarrelRoll === 'function') playBarrelRoll();
        keys['KeyR'] = false; // consume key — prevent re-trigger same frame
    }

    // Apply and decay dodge velocity (fast exponential falloff)
    drone.position.x += _dodgeVelX * delta;
    drone.position.z += _dodgeVelZ * delta;
    _dodgeVelX *= Math.pow(0.05, delta);
    _dodgeVelZ *= Math.pow(0.05, delta);

    // --- Forward motion along the 3D nose vector ---
    const cp = Math.cos(dronePitch);
    const fx = -Math.sin(droneYaw) * cp, fy = Math.sin(dronePitch), fz = -Math.cos(droneYaw) * cp;
    drone.position.x += fx * droneSpeed * delta;
    drone.position.y += fy * droneSpeed * delta;
    drone.position.z += fz * droneSpeed * delta;
    updateGroundSafety(delta);

    // Update droneVelocity for effects (speed lines, audio pitch)
    droneVelocity.set(fx * droneSpeed, fy * droneSpeed, fz * droneSpeed);

    // --- Soft boundary: steer back toward origin if too far ---
    const dist2d = Math.sqrt(drone.position.x * drone.position.x + drone.position.z * drone.position.z);
    if (dist2d > BOUNDARY_RADIUS) {
        const ox = drone.position.x / dist2d;
        const oz = drone.position.z / dist2d;
        drone.position.x -= ox * BOUNDARY_FORCE * delta * 3;
        drone.position.z -= oz * BOUNDARY_FORCE * delta * 3;
    }
}

// updateMouseLook kept as a no-op stub — called from old main.js paths
function updateMouseLook(mouseDelta) { /* no-op: mouse is now for targeting */ }
