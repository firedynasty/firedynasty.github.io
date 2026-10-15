// js/enemies.js — Enemy types, AI, health, death
//
// Enemy entry format:
// {
//   mesh:           THREE.Group  — added to scene
//   box:            THREE.Box3   — updated each frame for hit detection
//   type:           'drone' | 'jet'
//   hp:             number
//   state:          'approach' | 'attack' | 'evade'
//   velocity:       THREE.Vector3
//   lastBulletTime: number   — jets only, seconds
//   lastMissileTime:number   — jets only
//   evadeTimer:     number   — jets only, seconds remaining in evade state
//   score:          number   — points awarded on death
// }

const enemies = [];

// Reusable dummy for smooth quaternion rotation — never added to scene
const _jetLookDummy = new THREE.Object3D();

let playerInvincible = false;
let playerScore = 0; // kept for compatibility (no longer displayed)

// ---------------------------------------------------------------------------
// Spawning
// ---------------------------------------------------------------------------

function spawnEnemy(type) {
    const spawnPos = _randomSpawnPosition();
    const mesh = type === 'drone' ? _buildDroneMesh() : _buildJetMesh();
    mesh.position.copy(spawnPos);
    scene.add(mesh);

    const entry = {
        mesh,
        box:             new THREE.Box3().setFromObject(mesh),
        type,
        hp:              type === 'drone' ? DRONE_HP : JET_HP,
        state:           type === 'jet' ? 'orbit' : 'approach',
        velocity:        new THREE.Vector3(),
        lastBulletTime:  0,
        lastMissileTime: 0,
        evadeTimer:      0,
        evadeCooldown:   0,  // seconds until next evade is allowed
        orbitAngle:      Math.random() * Math.PI * 2, // jets: starting angle in their orbit
        score:           type === 'drone' ? DRONE_SCORE : JET_SCORE,
    };

    enemies.push(entry);
    return entry;
}

// Enemies fly over the mountains, not through them
function _keepAboveTerrain(enemy) {
    const min = terrainHeight(enemy.mesh.position.x, enemy.mesh.position.z) + 25;
    if (enemy.mesh.position.y < min) { enemy.mesh.position.y = min; if (enemy.velocity.y < 0) enemy.velocity.y = 0; }
}

function _randomSpawnPosition() {
    // Horizontal ring around player — all combat happens near FIXED_ALTITUDE
    const angle = Math.random() * Math.PI * 2;
    const x = Math.sin(angle) * ENEMY_SPAWN_RADIUS;
    const z = Math.cos(angle) * ENEMY_SPAWN_RADIUS;
    const y = drone.position.y + (Math.random() - 0.3) * 80; // around the player's altitude

    return new THREE.Vector3(
        drone.position.x + x,
        Math.max(y, terrainHeight(drone.position.x + x, drone.position.z + z) + 60),
        drone.position.z + z
    );
}

function _buildDroneMesh() {
    if (typeof enemyDroneTemplate !== 'undefined' && enemyDroneTemplate) {
        const clone = enemyDroneTemplate.scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const target = DRONE_WINGSPAN * DRONE_SCALE;
        clone.scale.setScalar(target / (maxDim || 1));
        const box2 = new THREE.Box3().setFromObject(clone);
        const center = box2.getCenter(new THREE.Vector3());
        clone.position.sub(center);
        const group = new THREE.Group();
        group.add(clone);
        return group;
    }
    // Fallback: red octahedron
    const geo = new THREE.OctahedronGeometry(2);
    const mat = new THREE.MeshStandardMaterial({ color: 0xff2200, emissive: 0xff0000, emissiveIntensity: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    const group = new THREE.Group();
    group.add(mesh);
    return group;
}

function _buildJetMesh() {
    if (typeof enemyJetTemplate !== 'undefined' && enemyJetTemplate) {
        const clone = enemyJetTemplate.scene.clone(true);
        const box = new THREE.Box3().setFromObject(clone);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.z);
        const target = DRONE_WINGSPAN * 2 * JET_SCALE;
        clone.scale.setScalar(target / (maxDim || 1));
        const box2 = new THREE.Box3().setFromObject(clone);
        const center = box2.getCenter(new THREE.Vector3());
        clone.position.sub(center);
        const group = new THREE.Group();
        group.add(clone);
        return group;
    }
    // Fallback: red box
    const geo = new THREE.BoxGeometry(4, 0.8, 2);
    const mat = new THREE.MeshStandardMaterial({ color: 0xcc0000, emissive: 0xff0000, emissiveIntensity: 0.2 });
    const mesh = new THREE.Mesh(geo, mat);
    const group = new THREE.Group();
    group.add(mesh);
    return group;
}

// Test helper — call from browser console: spawnTestWave()
function spawnTestWave() {
    for (let i = 0; i < 4; i++) spawnEnemy('drone');
    spawnEnemy('jet');
    console.log('Test wave spawned: 4 drones + 1 jet. enemies.length =', enemies.length);
}

// ---------------------------------------------------------------------------
// Drone AI — kamikaze: fly toward player, explode on proximity
// ---------------------------------------------------------------------------

function _updateDrone(enemy, delta) {
    const toPlayer = drone.position.clone().sub(enemy.mesh.position);
    const dist = toPlayer.length();

    // Detonate on proximity
    if (dist < DRONE_EXPLODE_RADIUS) {
        _killEnemy(enemy, true);
        return;
    }

    if (dist < DRONE_CHASE_RANGE) {
        // Close enough — chase player
        const dir = toPlayer.normalize();
        enemy.velocity.x += dir.x * DRONE_SPEED * delta * 3;
        enemy.velocity.y += dir.y * DRONE_SPEED * delta * 3;
        enemy.velocity.z += dir.z * DRONE_SPEED * delta * 3;

        const speed = enemy.velocity.length();
        if (speed > DRONE_SPEED) enemy.velocity.multiplyScalar(DRONE_SPEED / speed);

        enemy.mesh.lookAt(drone.position);
    } else {
        // Too far — hover; bleed off velocity quickly
        enemy.velocity.multiplyScalar(Math.pow(0.05, delta));
    }

    enemy.mesh.position.x += enemy.velocity.x * delta;
    enemy.mesh.position.y += enemy.velocity.y * delta;
    enemy.mesh.position.z += enemy.velocity.z * delta;
    _keepAboveTerrain(enemy);
}

// ---------------------------------------------------------------------------
// Jet AI — approach → attack (bullets + missiles) → evade
// ---------------------------------------------------------------------------

function _updateJet(enemy, delta, now) {
    const toPlayer = drone.position.clone().sub(enemy.mesh.position);
    const dist = toPlayer.length();
    const dir = toPlayer.clone().normalize();

    // Decrement cooldowns
    if (enemy.evadeCooldown > 0) enemy.evadeCooldown -= delta;

    // --- State transitions ---
    if (enemy.state === 'evade') {
        enemy.evadeTimer -= delta;
        if (enemy.evadeTimer <= 0) enemy.state = 'orbit'; // peel off back into orbit
    } else if (enemy.state === 'orbit') {
        if (dist < JET_ENGAGE_RANGE) {
            enemy.state = 'attack';
            if (Math.random() < JET_FLANK_CHANCE) {
                const sideways = new THREE.Vector3(-dir.z, 0, dir.x);
                enemy.velocity.addScaledVector(sideways, JET_SPEED * 0.8);
            }
        }
    } else if (enemy.state === 'attack') {
        if (dist > JET_ENGAGE_RANGE * 1.6) {
            enemy.state = 'orbit'; // too far — circle back out
        } else if (dist < 80) {
            // Too close — break off
            enemy.state = 'orbit';
            enemy.orbitAngle += Math.PI;
        }
    }

    // --- Movement ---
    if (enemy.state === 'orbit') {
        // Fly in a large circle around the player using an advancing orbit angle
        enemy.orbitAngle += JET_ORBIT_SPEED * delta;

        const targetX = drone.position.x + Math.cos(enemy.orbitAngle) * JET_ORBIT_RADIUS;
        const targetZ = drone.position.z + Math.sin(enemy.orbitAngle) * JET_ORBIT_RADIUS;
        const targetY = drone.position.y + 30; // orbit slightly above player

        const toOrbit = new THREE.Vector3(
            targetX - enemy.mesh.position.x,
            targetY - enemy.mesh.position.y,
            targetZ - enemy.mesh.position.z
        ).normalize();

        enemy.velocity.addScaledVector(toOrbit, JET_SPEED * delta * 4);
        const spd = enemy.velocity.length();
        if (spd > JET_SPEED) enemy.velocity.multiplyScalar(JET_SPEED / spd);

        // Smooth rotation toward direction of travel — slerp prevents per-frame jitter
        if (enemy.velocity.lengthSq() > 0.1) {
            _jetLookDummy.position.copy(enemy.mesh.position);
            _jetLookDummy.lookAt(enemy.mesh.position.clone().add(enemy.velocity));
            enemy.mesh.quaternion.slerp(_jetLookDummy.quaternion, Math.min(1, 5 * delta));
        }
    } else if (enemy.state === 'evade') {
        // Horizontal-only evade — stays at player altitude, no wild vertical escape
        const evadeDir = new THREE.Vector3(
            Math.random() - 0.5,
            0,
            Math.random() - 0.5
        ).normalize();
        enemy.velocity.addScaledVector(evadeDir, JET_SPEED * delta * 4);
        const spd = enemy.velocity.length();
        if (spd > JET_SPEED) enemy.velocity.multiplyScalar(JET_SPEED / spd);
    } else {
        // attack — orbit at closer range instead of charging directly at player
        // This keeps jets at a strategic distance where player can actually fight back
        enemy.orbitAngle += JET_ORBIT_SPEED * delta * 1.8; // tighter, faster orbit when attacking

        const targetX = drone.position.x + Math.cos(enemy.orbitAngle) * JET_ATTACK_ORBIT_RADIUS;
        const targetZ = drone.position.z + Math.sin(enemy.orbitAngle) * JET_ATTACK_ORBIT_RADIUS;
        const targetY = drone.position.y + 10;

        const toOrbit = new THREE.Vector3(
            targetX - enemy.mesh.position.x,
            targetY - enemy.mesh.position.y,
            targetZ - enemy.mesh.position.z
        ).normalize();

        enemy.velocity.addScaledVector(toOrbit, JET_SPEED * delta * 4);
        const spd = enemy.velocity.length();
        if (spd > JET_SPEED) enemy.velocity.multiplyScalar(JET_SPEED / spd);

        if (enemy.velocity.lengthSq() > 0.1) {
            _jetLookDummy.position.copy(enemy.mesh.position);
            _jetLookDummy.lookAt(enemy.mesh.position.clone().add(enemy.velocity));
            enemy.mesh.quaternion.slerp(_jetLookDummy.quaternion, Math.min(1, 8 * delta));
        }
    }

    enemy.mesh.position.x += enemy.velocity.x * delta;
    enemy.mesh.position.y += enemy.velocity.y * delta;
    enemy.mesh.position.z += enemy.velocity.z * delta;
    _keepAboveTerrain(enemy);

    // --- Fire weapons: missiles when in attack OR orbit (keeps pressure on player) ---
    // Min dist prevents point-blank shots; max dist of 700 keeps combat in visual range
    if ((enemy.state === 'attack' || enemy.state === 'orbit') &&
        dist >= JET_MISSILE_MIN_DIST && dist < 700) {
        if (now - enemy.lastMissileTime > JET_MISSILE_INTERVAL) {
            enemy.lastMissileTime = now;
            _fireEnemyMissile(enemy);
        }
    }
}

// Stubs — real implementations provided by weapons.js (Plan 03)
function _fireEnemyBullets(enemy) {
    if (typeof fireEnemyBulletBurst === 'function') {
        fireEnemyBulletBurst(enemy.mesh.position, drone.position);
    }
}

function _fireEnemyMissile(enemy) {
    if (typeof fireEnemyMissile === 'function') {
        fireEnemyMissile(enemy.mesh.position, drone.position);
    }
}

// Called by weapons.js when a player missile targets a jet
function triggerJetEvade(enemy) {
    if (!enemy || enemy.type !== 'jet') return;
    if (enemy.evadeCooldown > 0) return; // cooldown — jet can't evade again so soon
    enemy.state = 'evade';
    enemy.evadeTimer = JET_EVADE_DURATION;
    enemy.evadeCooldown = JET_EVADE_COOLDOWN;
}

// ---------------------------------------------------------------------------
// Damage + death
// ---------------------------------------------------------------------------

// kamikazeDeath: true = drone proximity explode (deals player damage)
// false = killed by bullet/missile (explosion still fires, no extra player damage)
function _killEnemy(enemy, kamikazeDeath) {
    // Shot-down jets keep falling as a burning wreck (explosions.js); drones blow apart on the spot
    if (enemy.type === 'jet' && !kamikazeDeath && typeof wreckEnemy === 'function') {
        wreckEnemy(enemy);
    } else {
        scene.remove(enemy.mesh);
        enemy.mesh.traverse(child => {
            if (child.isMesh) {
                if (child.geometry) child.geometry.dispose();
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach(m => { if (m) m.dispose(); });
            }
        });
        if (typeof bigExplosion === 'function') bigExplosion(enemy.mesh.position, enemy.type === 'jet' ? 1.0 : 0.7, { vel: enemy.velocity });
        else if (typeof emitExplosion === 'function') emitExplosion(enemy.mesh.position, EXPLOSION_PARTICLE_COUNT);
    }

    // Deal player damage only for kamikaze proximity death
    if (kamikazeDeath && enemy.type === 'drone') {
        applyDamageToPlayer(DRONE_EXPLODE_DAMAGE);
    }

    const idx = enemies.indexOf(enemy);
    if (idx !== -1) enemies.splice(idx, 1);
}

function applyDamageToPlayer(amount) {
    if (playerInvincible) return;
    playerHP -= amount;
    if (playerHP < 0) playerHP = 0;

    triggerCameraShake();
    if (typeof showHitFlash === 'function') showHitFlash();

    if (playerHP <= 0) {
        showGameOver();
        return;
    }

    playerInvincible = true;
    setTimeout(() => { playerInvincible = false; }, PLAYER_INVINCIBLE_MS);
}

// ---------------------------------------------------------------------------
// Main update — called from main.js every frame
// ---------------------------------------------------------------------------

function updateEnemies(delta) {
    const now = performance.now() / 1000;

    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];

        if (enemy.type === 'drone') {
            _updateDrone(enemy, delta);
        } else if (enemy.type === 'jet') {
            _updateJet(enemy, delta, now);
        }

        // Update bounding box after movement (guard: _killEnemy may have removed it)
        if (enemies[i]) {
            enemies[i].box.setFromObject(enemies[i].mesh);
        }
    }
}
