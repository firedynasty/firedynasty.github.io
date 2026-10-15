// js/weapons.js — Player and enemy bullets + missiles
//
// Two object pools: bulletPool[] (BULLET_POOL_SIZE) and missilePool[] (MISSILE_POOL_SIZE)
// Pool entry: { mesh, active, velocity, life, maxLife, owner, damage, homing, target }
//
// Player fires:
//   Space held  → bullets (auto-fire at BULLET_FIRE_RATE rounds/s)
//   LMB click   → missile (homing, MISSILE_COOLDOWN between shots)
// Enemy jets fire:
//   fireEnemyBulletBurst(pos, targetPos) — called by enemies.js
//   fireEnemyMissile(pos, targetPos)     — called by enemies.js

const bulletPool       = [];
const missilePool      = []; // player missiles
const enemyMissilePool = []; // enemy missiles (separate pool for distinct GLB model)

let bulletFireTimer  = 0;     // seconds until next player bullet allowed
let missileCooldown  = 0;     // seconds until next player missile allowed
let bulletHeat       = 0.0;   // 0 = cool, 1.0 = fully overheated
let bulletOverloaded = false; // true = gun locked out until fully cooled

// Set by ui.js each frame from mouse-hover enemy detection
let lockedTarget = null;

// Set true each frame when an enemy missile is within INCOMING_MISSILE_DIST of player
let incomingMissileWarning = false;

// ---------------------------------------------------------------------------
// Init — call once from finishLoading()
// ---------------------------------------------------------------------------

function initWeapons(scene) {
    _buildBulletPool(scene);
    _buildPlayerMissilePool(scene);
    _buildEnemyMissilePool(scene);
}

function _buildBulletPool(scene) {
    if (typeof playerBulletTemplate !== 'undefined' && playerBulletTemplate) {
        for (let i = 0; i < BULLET_POOL_SIZE; i++) {
            const mesh = playerBulletTemplate.scene.clone(true);
            _autoScaleMesh(mesh, BULLET_SIZE * 5); // scale GLB to match BULLET_SIZE
            mesh.visible = false;
            scene.add(mesh);
            bulletPool.push({ mesh, active: false, velocity: new THREE.Vector3(),
                life: 0, maxLife: BULLET_LIFETIME, owner: 'player',
                damage: BULLET_DAMAGE, homing: false, target: null });
        }
        return;
    }
    // Fallback: yellow sphere
    const geo = new THREE.SphereGeometry(BULLET_SIZE, 4, 4);
    for (let i = 0; i < BULLET_POOL_SIZE; i++) {
        const mat  = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const mesh = new THREE.Mesh(geo.clone(), mat);
        mesh.visible = false;
        scene.add(mesh);
        bulletPool.push({ mesh, active: false, velocity: new THREE.Vector3(),
            life: 0, maxLife: BULLET_LIFETIME, owner: 'player',
            damage: BULLET_DAMAGE, homing: false, target: null });
    }
}

function _buildPlayerMissilePool(scene) {
    if (typeof playerMissileTemplate !== 'undefined' && playerMissileTemplate) {
        for (let i = 0; i < MISSILE_POOL_SIZE; i++) {
            // Player missile GLB is already oriented correctly — no axis rotation needed.
            const mesh = playerMissileTemplate.scene.clone(true);
            _autoScaleMesh(mesh, 12.0);
            mesh.visible = false;
            scene.add(mesh);
            missilePool.push({ mesh, active: false, velocity: new THREE.Vector3(),
                life: 0, maxLife: MISSILE_LIFETIME, owner: 'player',
                damage: MISSILE_DAMAGE, homing: true, target: null });
        }
        return;
    }
    // Fallback: large unlit cylinder — original rotation preserved (was correct)
    const geo = new THREE.CylinderGeometry(1.2, 1.8, 14, 8);
    geo.rotateX(Math.PI / 2);
    for (let i = 0; i < MISSILE_POOL_SIZE; i++) {
        const mat  = new THREE.MeshBasicMaterial({ color: 0xff8800 });
        const mesh = new THREE.Mesh(geo.clone(), mat);
        mesh.visible = false;
        scene.add(mesh);
        missilePool.push({ mesh, active: false, velocity: new THREE.Vector3(),
            life: 0, maxLife: MISSILE_LIFETIME, owner: 'player',
            damage: MISSILE_DAMAGE, homing: true, target: null });
    }
}

function _buildEnemyMissilePool(scene) {
    const ENEMY_MISSILE_POOL_SIZE = 6;
    if (typeof enemyMissileTemplate !== 'undefined' && enemyMissileTemplate) {
        for (let i = 0; i < ENEMY_MISSILE_POOL_SIZE; i++) {
            const inner = enemyMissileTemplate.scene.clone(true);
            _autoScaleMesh(inner, 12.0);
            inner.rotation.x = Math.PI / 2; // nose (+Y) → +Z so lookAt points nose at target
            // GLB materials are invisible in Three.js r128 (encoding issue) — force a
            // flat grey MeshBasicMaterial so the missile's geometry is always visible.
            inner.traverse(child => {
                if (child.isMesh) child.material = new THREE.MeshBasicMaterial({ color: 0xc8c8c8 });
            });
            const mesh = new THREE.Group();
            mesh.add(inner);
            mesh.visible = false;
            scene.add(mesh);
            enemyMissilePool.push({ mesh, active: false, velocity: new THREE.Vector3(),
                life: 0, maxLife: MISSILE_LIFETIME, owner: 'enemy',
                damage: JET_MISSILE_DAMAGE, homing: true, target: null });
        }
        return;
    }
    // Fallback: large unlit red cylinder, nose (+Y) → +Z for lookAt
    const geo = new THREE.CylinderGeometry(1.2, 1.8, 14, 8);
    geo.rotateX(Math.PI / 2);
    for (let i = 0; i < ENEMY_MISSILE_POOL_SIZE; i++) {
        const mat  = new THREE.MeshBasicMaterial({ color: 0xff3300 });
        const mesh = new THREE.Mesh(geo.clone(), mat);
        mesh.visible = false;
        scene.add(mesh);
        enemyMissilePool.push({ mesh, active: false, velocity: new THREE.Vector3(),
            life: 0, maxLife: MISSILE_LIFETIME, owner: 'enemy',
            damage: JET_MISSILE_DAMAGE, homing: true, target: null });
    }
}

// Override all child mesh materials with a bright emissive material (ensures GLB missiles are always visible)
function _overrideMissileMaterial(mesh, color, emissive) {
    mesh.traverse(child => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                color:            color,
                emissive:         emissive,
                emissiveIntensity: 0.7,
            });
        }
    });
}

// Scale a GLB scene to fit within targetLen on its longest axis
function _autoScaleMesh(mesh, targetLen) {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) mesh.scale.setScalar(targetLen / maxDim);
}

function _getFreeBullet() {
    for (let i = 0; i < bulletPool.length; i++) {
        if (!bulletPool[i].active) return bulletPool[i];
    }
    return null;
}

function _getFreeMissile() {
    for (let i = 0; i < missilePool.length; i++) {
        if (!missilePool[i].active) return missilePool[i];
    }
    return null;
}

function _getFreeEnemyMissile() {
    for (let i = 0; i < enemyMissilePool.length; i++) {
        if (!enemyMissilePool[i].active) return enemyMissilePool[i];
    }
    return null;
}

// ---------------------------------------------------------------------------
// Player weapons
// ---------------------------------------------------------------------------

function firePlayerBullet() {
    const b = _getFreeBullet();
    if (!b) return;

    b.mesh.position.copy(drone.position);

    const sy = Math.sin(droneYaw),  cy = Math.cos(droneYaw);
    const sp = Math.sin(dronePitch), cp = Math.cos(dronePitch);
    let fx = -sy * cp, fy = sp, fz = -cy * cp;

    // Aim assist: with a lock inside the nose cone, bullets fly at the target's predicted position
    if (lockedTarget && enemies.includes(lockedTarget)) {
        const tp = lockedTarget.mesh.position;
        const dist = tp.distanceTo(drone.position);
        const t = dist / BULLET_SPEED;
        const aim = new THREE.Vector3(
            tp.x + lockedTarget.velocity.x * t - drone.position.x,
            tp.y + lockedTarget.velocity.y * t - drone.position.y,
            tp.z + lockedTarget.velocity.z * t - drone.position.z).normalize();
        const fwd = new THREE.Vector3(fx, fy, fz);
        if (fwd.angleTo(aim) < AUTO_LOCK_BREAK * Math.PI / 180) { fx = aim.x; fy = aim.y; fz = aim.z; }
    }

    b.velocity.set(fx * BULLET_SPEED, fy * BULLET_SPEED, fz * BULLET_SPEED);
    b.life   = BULLET_LIFETIME;
    b.owner  = 'player';
    b.damage = BULLET_DAMAGE;
    b.active = true;
    b.mesh.visible = true;
    // Orient GLB bullet along the direction of travel
    b.mesh.lookAt(b.mesh.position.clone().add(b.velocity));

    if (typeof playBulletFire === 'function') playBulletFire();
}

function firePlayerMissile() {
    if (!lockedTarget) return; // require a locked target
    const m = _getFreeMissile();
    if (!m) return;

    m.mesh.position.copy(drone.position);

    const isDrone = lockedTarget.type === 'drone';

    let initialDir;
    initialDir = lockedTarget.mesh.position.clone().sub(drone.position).normalize();
    m.velocity.set(initialDir.x * MISSILE_SPEED, initialDir.y * MISSILE_SPEED, initialDir.z * MISSILE_SPEED);

    m.life   = MISSILE_LIFETIME;
    m.owner  = 'player';
    m.damage = MISSILE_DAMAGE;
    m.homing = true;       // every missile tracks its lock
    m.active = true;
    m.target = lockedTarget;
    m.mesh.visible = true;
    // Orient mesh along initial flight direction (critical for non-homing missiles
    // since the per-frame lookAt in _iterateMissilePool only runs for homing missiles)
    m.mesh.lookAt(m.mesh.position.clone().add(m.velocity));

    if (!isDrone && typeof triggerJetEvade === 'function') {
        triggerJetEvade(lockedTarget);
    }

    if (typeof playMissileLaunch === 'function') playMissileLaunch();
}

function _findMissileTarget() {
    const coneAngle = MISSILE_HOME_CONE * (Math.PI / 180);
    const sy = Math.sin(droneYaw), cy = Math.cos(droneYaw);
    const sp = Math.sin(dronePitch), cp = Math.cos(dronePitch);
    const forward = new THREE.Vector3(-sy * cp, sp, -cy * cp);

    let nearest = null;
    let nearestDist = Infinity;

    for (let i = 0; i < enemies.length; i++) {
        const toEnemy = enemies[i].mesh.position.clone().sub(drone.position);
        const dist = toEnemy.length();
        const angle = forward.angleTo(toEnemy.normalize());
        if (angle < coneAngle && dist < nearestDist) {
            nearest = enemies[i];
            nearestDist = dist;
        }
    }
    return nearest;
}

// ---------------------------------------------------------------------------
// Enemy weapons — called by enemies.js jet AI
// ---------------------------------------------------------------------------

function fireEnemyBulletBurst(position, targetPos) {
    const toTarget = targetPos.clone().sub(position).normalize();
    for (let i = 0; i < JET_BULLET_BURST; i++) {
        const b = _getFreeBullet();
        if (!b) return;

        b.mesh.position.copy(position);

        const spread = 0.05;
        const dir = toTarget.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread
        )).normalize();

        b.velocity.set(dir.x * JET_BULLET_SPEED, dir.y * JET_BULLET_SPEED, dir.z * JET_BULLET_SPEED);
        b.life   = BULLET_LIFETIME;
        b.owner  = 'enemy';
        b.damage = JET_BULLET_DAMAGE;
        b.active = true;
        b.mesh.visible = true;
        // Guard: GLB bullet meshes are Groups with no direct .material
        if (b.mesh.material && b.mesh.material.color) b.mesh.material.color.setHex(0xff2200);
    }
}

function fireEnemyMissile(position, targetPos) {
    const m = _getFreeEnemyMissile();
    if (!m) return;

    m.mesh.position.copy(position);

    // Enemy missiles are faster than player missiles and home aggressively
    const dir = targetPos.clone().sub(position).normalize();
    const spd = MISSILE_SPEED * JET_MISSILE_SPEED_MULT;
    m.velocity.set(dir.x * spd, dir.y * spd, dir.z * spd);
    m.life   = MISSILE_LIFETIME;
    m.owner  = 'enemy';
    m.damage = JET_MISSILE_DAMAGE;
    m.homing = true;   // softly tracks player — handled separately in _updateMissiles
    m.target = null;
    m.active = true;
    m.mesh.visible = true;
    // No color override — mesh is a GLB Group (no direct .material) or pre-colored fallback
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function _deactivateBullet(b) {
    b.active = false;
    b.mesh.visible = false;
}

function _deactivateMissile(m) {
    m.active = false;
    m.target = null;
    m.mesh.visible = false;
    m.dodged = false; // reset for pool reuse
}

// Called from flight.js when player barrel rolls — marks all active enemy missiles as dodged.
// Dodged missiles keep flying on their current course but stop homing and deal no damage.
function dodgeIncomingMissiles() {
    for (let i = 0; i < enemyMissilePool.length; i++) {
        const m = enemyMissilePool[i];
        if (m.active) m.dodged = true;
    }
}

function _hitEnemy(enemy, damage) {
    enemy.hp -= damage;
    // White flash on hit
    enemy.mesh.traverse(child => {
        if (child.isMesh && child.material) {
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach(m => {
                if (!m.color) return;
                const origColor = m._origColor !== undefined ? m._origColor : m.color.getHex();
                m._origColor = origColor;
                m.color.setHex(0xffffff);
                setTimeout(() => { if (m.color) m.color.setHex(origColor); }, 80);
            });
        }
    });

    if (enemy.hp <= 0) {
        _killEnemy(enemy, false); // false = not kamikaze, still shows explosion
    }
}

// ---------------------------------------------------------------------------
// Main update — called from main.js every frame
// ---------------------------------------------------------------------------

function updateWeapons(delta) {
    // Reset missile warning each frame — set true inside _updateMissiles if threat detected
    incomingMissileWarning = false;

    // --- Bullet heat / overload system ---
    const firingNow = keys['Space'] && gameState === 'playing';
    if (!bulletOverloaded && firingNow) {
        bulletHeat = Math.min(bulletHeat + delta / BULLET_HEAT_FILL_TIME, 1.0);
        if (bulletHeat >= 1.0) bulletOverloaded = true;
    } else if (bulletOverloaded) {
        // Must cool all the way to 0 before re-enabling
        bulletHeat = Math.max(bulletHeat - delta / BULLET_HEAT_COOL_TIME, 0.0);
        if (bulletHeat <= 0.0) { bulletHeat = 0.0; bulletOverloaded = false; }
    } else {
        // Passive cooling when not firing
        bulletHeat = Math.max(bulletHeat - BULLET_PASSIVE_COOL_RATE * delta, 0.0);
    }
    if (typeof updateBulletHeatHUD === 'function') updateBulletHeatHUD(bulletHeat, bulletOverloaded);

    // --- Player bullet auto-fire (Space held, not overloaded) ---
    if (bulletFireTimer > 0) bulletFireTimer -= delta;
    if (firingNow && bulletFireTimer <= 0 && !bulletOverloaded) {
        firePlayerBullet();
        bulletFireTimer = 1 / BULLET_FIRE_RATE;
    }

    // --- Player missile (LMB — only fires when a target is locked) ---
    if (missileCooldown > 0) missileCooldown -= delta;
    if ((mouseButtons[0] || keys['KeyF']) && missileCooldown <= 0 && gameState === 'playing' && lockedTarget) {
        firePlayerMissile();
        missileCooldown = MISSILE_COOLDOWN;
        mouseButtons[0] = false; // consume click — don't re-fire same frame
    }

    // --- Move + hit-detect all active bullets ---
    for (let i = 0; i < bulletPool.length; i++) {
        const b = bulletPool[i];
        if (!b.active) continue;

        const _prev = b.mesh.position.clone();
        b.mesh.position.x += b.velocity.x * delta;
        b.mesh.position.y += b.velocity.y * delta;
        b.mesh.position.z += b.velocity.z * delta;
        b.life -= delta;

        if (b.life <= 0) { _deactivateBullet(b); continue; }
        if (b.mesh.position.y < terrainHeight(b.mesh.position.x, b.mesh.position.z)) { _deactivateBullet(b); continue; } // mountains stop bullets

        const bBox = new THREE.Box3().setFromCenterAndSize(
            b.mesh.position, new THREE.Vector3(0.4, 0.4, 0.4));

        if (b.owner === 'player') {
            // Swept test: bullets move ~13 units/frame, so check the whole path, not just the end point
            const _step = b.mesh.position.distanceTo(_prev);
            const _ray  = new THREE.Ray(_prev, b.velocity.clone().normalize());
            const _hp   = new THREE.Vector3();
            for (let j = enemies.length - 1; j >= 0; j--) {
                const _grown = enemies[j].box.clone().expandByScalar(1.5);
                if (bBox.intersectsBox(_grown) || (_ray.intersectBox(_grown, _hp) && _hp.distanceTo(_prev) <= _step)) {
                    _hitEnemy(enemies[j], b.damage);
                    _deactivateBullet(b);
                    if (typeof showHitMarker === 'function') showHitMarker();
                    break;
                }
            }
        } else {
            // Enemy bullet — check against player
            const playerBox = new THREE.Box3().setFromCenterAndSize(
                drone.position, new THREE.Vector3(3, 1, 3));
            if (bBox.intersectsBox(playerBox)) {
                applyDamageToPlayer(b.damage);
                _deactivateBullet(b);
            }
        }
    }

    // --- Move + hit-detect all active missiles ---
    _updateMissiles(delta);
}

function _updateMissiles(delta) {
    _iterateMissilePool(missilePool, delta);
    _iterateMissilePool(enemyMissilePool, delta);
}

function _iterateMissilePool(pool, delta) {
    for (let i = 0; i < pool.length; i++) {
        const m = pool[i];
        if (!m.active) continue;

        // Homing: player missile tracks enemy target
        if (m.homing && m.owner === 'player' && m.target && enemies.includes(m.target)) {
            const toTarget = m.target.mesh.position.clone().sub(m.mesh.position).normalize();
            const desired  = toTarget.multiplyScalar(MISSILE_SPEED);
            m.velocity.lerp(desired, MISSILE_TURN_SPEED * delta);
            m.velocity.setLength(MISSILE_SPEED);
            m.mesh.lookAt(m.mesh.position.clone().add(m.velocity));
        }

        // Enemy homing missile — perfect tracking unless dodged by barrel roll
        if (m.homing && m.owner === 'enemy') {
            if (!m.dodged) {
                // Perfect lock-on — re-aim directly at player every frame (guaranteed hit)
                const toPlayer = drone.position.clone().sub(m.mesh.position).normalize();
                m.velocity.copy(toPlayer).multiplyScalar(MISSILE_SPEED * JET_MISSILE_SPEED_MULT);
                m.mesh.lookAt(m.mesh.position.clone().add(m.velocity));
                // Warn player based on ETA
                const dist = drone.position.distanceTo(m.mesh.position);
                const eta  = dist / (MISSILE_SPEED * JET_MISSILE_SPEED_MULT);
                if (eta < INCOMING_MISSILE_WARN_TIME) incomingMissileWarning = true;
            }
            // If dodged: velocity unchanged, missile flies straight, no warning, no damage
        }

        m.mesh.position.x += m.velocity.x * delta;
        m.mesh.position.y += m.velocity.y * delta;
        m.mesh.position.z += m.velocity.z * delta;
        m.life -= delta;

        if (m.life <= 0) { _deactivateMissile(m); continue; }
        if (m.mesh.position.y < terrainHeight(m.mesh.position.x, m.mesh.position.z)) { // mountains stop missiles
            if (typeof bigExplosion === 'function') bigExplosion(m.mesh.position.clone(), 0.5, { debris: 4 });
            _deactivateMissile(m); continue;
        }

        const mBox = new THREE.Box3().setFromCenterAndSize(
            m.mesh.position, new THREE.Vector3(1, 1, 1));

        if (m.owner === 'player') {
            // Direct AABB hit
            for (let j = enemies.length - 1; j >= 0; j--) {
                if (mBox.intersectsBox(enemies[j].box)) {
                    _hitEnemy(enemies[j], m.damage);
                    if (typeof emitExplosion === 'function') emitExplosion(m.mesh.position, 20);
                    _deactivateMissile(m);
                    if (typeof showHitMarker === 'function') showHitMarker();
                    break;
                }
            }
            // Proximity fuse: a homing missile detonates when it gets close to its target
            if (m.active && m.homing && m.target && enemies.includes(m.target) &&
                m.mesh.position.distanceTo(m.target.mesh.position) < 9) {
                _hitEnemy(m.target, m.damage);
                if (typeof emitExplosion === 'function') emitExplosion(m.mesh.position, 25);
                if (typeof showHitMarker === 'function') showHitMarker();
                _deactivateMissile(m);
            }
            // Splash radius for straight-shot (non-homing) drone missiles
            if (m.active && !m.homing) {
                for (let j = enemies.length - 1; j >= 0; j--) {
                    if (m.mesh.position.distanceTo(enemies[j].mesh.position) < MISSILE_DRONE_SPLASH_RADIUS) {
                        _hitEnemy(enemies[j], m.damage);
                        if (typeof emitExplosion === 'function') emitExplosion(m.mesh.position, 35);
                        if (typeof showHitMarker === 'function') showHitMarker();
                        _deactivateMissile(m);
                        break;
                    }
                }
            }
        } else {
            // Dodged missiles fly straight through player with no damage
            if (!m.dodged) {
                // Proximity detonation — bomb explodes within radius even on near-miss
                const distToPlayer = m.mesh.position.distanceTo(drone.position);
                if (distToPlayer < JET_MISSILE_PROXIMITY_RADIUS) {
                    applyDamageToPlayer(m.damage);
                    if (typeof bigExplosion === 'function') bigExplosion(m.mesh.position.clone(), 0.3, { debris: 0 });
                    else if (typeof emitExplosion === 'function') emitExplosion(m.mesh.position, 30);
                    _deactivateMissile(m);
                    continue;
                }
                const playerBox = new THREE.Box3().setFromCenterAndSize(
                    drone.position, new THREE.Vector3(3, 1, 3));
                if (mBox.intersectsBox(playerBox)) {
                    applyDamageToPlayer(m.damage);
                    if (typeof bigExplosion === 'function') bigExplosion(m.mesh.position.clone(), 0.3, { debris: 0 });
                    else if (typeof emitExplosion === 'function') emitExplosion(m.mesh.position, 30);
                    _deactivateMissile(m);
                }
            }
        }
    }
}
