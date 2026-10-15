// js/effects.js — Particle effects and visual feedback

// Particle pool
const MAX_PARTICLES = 500;
let particlePositions, particleColors, particleSizes;
let particleVelocities = [];
let particleLives = [];
let particleSystem = null;

// Speed lines (separate system, attached to camera)
let speedLineSystem = null;
let speedLinePositions;
const NUM_SPEED_LINES = 80;

// Smoke particle system — thruster exhaust (smoke.png texture)
const MAX_SMOKE_PARTICLES = 150;
let smokePositions, smokeSizes, smokeColors;
const smokeVelocities = [];
const smokeLives = [];
let smokeSystem = null;
let nextSmoke = 0;

// Shockwave sprite pool — expanding ring on enemy death (shockwave.png texture)
const SHOCKWAVE_POOL_SIZE = 4;
const _shockwaves = []; // { sprite, life, maxLife }

function initEffects(scene) {
    // --- Main particle system ---
    const geo = new THREE.BufferGeometry();
    particlePositions = new Float32Array(MAX_PARTICLES * 3);
    particleColors = new Float32Array(MAX_PARTICLES * 3);
    particleSizes = new Float32Array(MAX_PARTICLES);

    for (let i = 0; i < MAX_PARTICLES; i++) {
        particlePositions[i * 3] = 0;
        particlePositions[i * 3 + 1] = -1000; // hidden below ground
        particlePositions[i * 3 + 2] = 0;
        particleColors[i * 3] = 1;
        particleColors[i * 3 + 1] = 0.5;
        particleColors[i * 3 + 2] = 0;
        particleSizes[i] = 0;
        particleVelocities.push(new THREE.Vector3());
        particleLives.push(0);
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(particlePositions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(particleSizes, 1));

    const mat = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    particleSystem = new THREE.Points(geo, mat);
    scene.add(particleSystem);

    // Load effect textures -----------------------------------------------
    const _texLoader = new THREE.TextureLoader();

    // spark.png → applied to the main explosion/impact particle system
    _texLoader.load('assets/textures/effects/spark.png', tex => {
        particleSystem.material.map = tex;
        particleSystem.material.needsUpdate = true;
    });

    // --- Smoke particle system (thruster exhaust) ---
    const smokeGeo = new THREE.BufferGeometry();
    smokePositions = new Float32Array(MAX_SMOKE_PARTICLES * 3);
    smokeSizes     = new Float32Array(MAX_SMOKE_PARTICLES);
    smokeColors    = new Float32Array(MAX_SMOKE_PARTICLES * 3);
    for (let i = 0; i < MAX_SMOKE_PARTICLES; i++) {
        smokePositions[i * 3 + 1] = -1000;
        smokeSizes[i] = 0;
        smokeColors[i * 3] = 0.8; smokeColors[i * 3 + 1] = 0.8; smokeColors[i * 3 + 2] = 0.8;
        smokeVelocities.push(new THREE.Vector3());
        smokeLives.push(0);
    }
    smokeGeo.setAttribute('position', new THREE.Float32BufferAttribute(smokePositions, 3));
    smokeGeo.setAttribute('size',     new THREE.Float32BufferAttribute(smokeSizes, 1));
    smokeGeo.setAttribute('color',    new THREE.Float32BufferAttribute(smokeColors, 3));
    const smokeMat = new THREE.PointsMaterial({
        size: 5.0,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        sizeAttenuation: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
    });
    _texLoader.load('assets/textures/effects/smoke.png', tex => {
        smokeMat.map = tex;
        smokeMat.needsUpdate = true;
    });
    smokeSystem = new THREE.Points(smokeGeo, smokeMat);
    scene.add(smokeSystem);

    // --- Shockwave sprite pool (explosion ring) ---
    const shockwaveTex = _texLoader.load('assets/textures/effects/shockwave.png');
    for (let i = 0; i < SHOCKWAVE_POOL_SIZE; i++) {
        const spriteMat = new THREE.SpriteMaterial({
            map: shockwaveTex,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            color: new THREE.Color(1.0, 0.5, 0.1),
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.visible = false;
        scene.add(sprite);
        _shockwaves.push({ sprite, life: 0, maxLife: 0.4 });
    }

    // --- Speed lines system ---
    initSpeedLines(scene);
}

let nextParticle = 0;

function emitParticle(x, y, z, vx, vy, vz, r, g, b, life, size) {
    const i = nextParticle;
    nextParticle = (nextParticle + 1) % MAX_PARTICLES;

    particlePositions[i * 3] = x;
    particlePositions[i * 3 + 1] = y;
    particlePositions[i * 3 + 2] = z;
    particleVelocities[i].set(vx, vy, vz);
    particleColors[i * 3] = r;
    particleColors[i * 3 + 1] = g;
    particleColors[i * 3 + 2] = b;
    particleLives[i] = life;
    particleSizes[i] = size || 0.5;
}

function emitSmokeParticle(x, y, z, vx, vy, vz, r, g, b, life, size) {
    if (!smokeSystem) return;
    const i = nextSmoke;
    nextSmoke = (nextSmoke + 1) % MAX_SMOKE_PARTICLES;
    smokePositions[i * 3]     = x;
    smokePositions[i * 3 + 1] = y;
    smokePositions[i * 3 + 2] = z;
    smokeVelocities[i].set(vx, vy, vz);
    smokeColors[i * 3]     = r;
    smokeColors[i * 3 + 1] = g;
    smokeColors[i * 3 + 2] = b;
    smokeLives[i] = life;
    smokeSizes[i] = size || 5.0;
}

function updateEffects(delta) {
    if (typeof updateExplosions === 'function') updateExplosions(delta);
    if (!particleSystem) return;

    // Update all particles
    for (let i = 0; i < MAX_PARTICLES; i++) {
        if (particleLives[i] <= 0) {
            particleSizes[i] = 0;
            continue;
        }

        particleLives[i] -= delta;

        // Move
        particlePositions[i * 3] += particleVelocities[i].x * delta;
        particlePositions[i * 3 + 1] += particleVelocities[i].y * delta;
        particlePositions[i * 3 + 2] += particleVelocities[i].z * delta;

        // Fade size with life
        particleSizes[i] = Math.max(0, particleSizes[i] * 0.97);
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.geometry.attributes.color.needsUpdate = true;
    particleSystem.geometry.attributes.size.needsUpdate = true;

    // Update smoke particles
    if (smokeSystem) {
        for (let i = 0; i < MAX_SMOKE_PARTICLES; i++) {
            if (smokeLives[i] <= 0) { smokeSizes[i] = 0; continue; }
            smokeLives[i] -= delta;
            smokePositions[i * 3]     += smokeVelocities[i].x * delta;
            smokePositions[i * 3 + 1] += smokeVelocities[i].y * delta;
            smokePositions[i * 3 + 2] += smokeVelocities[i].z * delta;
            smokeSizes[i] = Math.max(0, smokeSizes[i] * 0.985); // gradually shrink as it dissipates
        }
        smokeSystem.geometry.attributes.position.needsUpdate = true;
        smokeSystem.geometry.attributes.size.needsUpdate = true;
        smokeSystem.geometry.attributes.color.needsUpdate = true;
    }

    // Update shockwave sprites
    for (let i = 0; i < _shockwaves.length; i++) {
        const sw = _shockwaves[i];
        if (sw.life <= 0) continue;
        sw.life -= delta;
        if (sw.life <= 0) {
            sw.sprite.visible = false;
            sw.sprite.material.opacity = 0;
            continue;
        }
        const t = 1 - (sw.life / sw.maxLife); // 0 = just spawned → 1 = fading out
        const scale = 4 + t * 72;              // expands from ~4 to ~76 world units
        sw.sprite.scale.set(scale, scale, 1);
        sw.sprite.material.opacity = Math.max(0, 0.85 * (1 - t * 1.1));
    }

    // Continuous effects
    if (drone && gameState === 'playing') {
        emitThrusterExhaust();
        updateSpeedLines(delta);
    }
}

// --- Thruster Exhaust ---
function emitThrusterExhaust() {
    if (!drone) return;

    const thrustActive = keys['Space'];
    const rate = thrustActive ? 3 : 1; // more particles when thrusting

    // Motor positions relative to drone (4 motors)
    const motorOffsets = [
        new THREE.Vector3(1, -0.2, 0.7),
        new THREE.Vector3(-1, -0.2, 0.7),
        new THREE.Vector3(-1, -0.2, -0.7),
        new THREE.Vector3(1, -0.2, -0.7)
    ];

    for (let m = 0; m < motorOffsets.length; m++) {
        if (Math.random() > 0.3 * rate) continue;

        const offset = motorOffsets[m].clone();
        offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), droneYaw);
        const worldPos = drone.position.clone().add(offset);

        const spread = 0.6;
        const sr = isBoosting ? 0.6 : 0.80;
        const sg = isBoosting ? 0.75 : 0.68;
        const sb = isBoosting ? 0.95 : 0.58;

        emitSmokeParticle(
            worldPos.x + (Math.random() - 0.5) * spread,
            worldPos.y,
            worldPos.z + (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * 3,
            -1.2 - Math.random() * 1.8, // gentle downward drift
            (Math.random() - 0.5) * 3,
            sr, sg, sb,
            0.35 + Math.random() * 0.2,  // longer life than old sparks
            4.0 + Math.random() * 3.5    // large smoke puff
        );
    }
}

// --- Gate Burst ---
function emitGateBurst(position) {
    const count = 40;
    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = 8 + Math.random() * 12;
        emitParticle(
            position.x,
            position.y,
            position.z,
            Math.cos(angle) * speed,
            (Math.random() - 0.5) * 4,
            Math.sin(angle) * speed,
            1.0, 0.4 + Math.random() * 0.3, 0.7, // pink-white
            0.4 + Math.random() * 0.2,
            0.6 + Math.random() * 0.4
        );
    }
}

// --- Collision Sparks ---
function emitCollisionSparks(position, normal) {
    const count = 15;
    for (let i = 0; i < count; i++) {
        const spread = 5;
        emitParticle(
            position.x,
            position.y,
            position.z,
            (normal ? normal.x : (Math.random() - 0.5)) * spread + (Math.random() - 0.5) * 3,
            Math.random() * 5,
            (normal ? normal.z : (Math.random() - 0.5)) * spread + (Math.random() - 0.5) * 3,
            1.0, 0.8, 0.2, // yellow-orange
            0.2 + Math.random() * 0.15,
            0.3 + Math.random() * 0.3
        );
    }
}

// --- Speed Lines ---
function initSpeedLines(scene) {
    const geo = new THREE.BufferGeometry();
    speedLinePositions = new Float32Array(NUM_SPEED_LINES * 6); // 2 points per line
    geo.setAttribute('position', new THREE.Float32BufferAttribute(speedLinePositions, 3));

    const mat = new THREE.LineBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
    });

    speedLineSystem = new THREE.LineSegments(geo, mat);
    scene.add(speedLineSystem);
}

// --- Explosion Effect — shockwave ring sprite ---
function emitExplosionEffect(position) {
    for (let i = 0; i < _shockwaves.length; i++) {
        const sw = _shockwaves[i];
        if (sw.life > 0) continue;
        sw.sprite.position.copy(position);
        sw.sprite.scale.set(4, 4, 1);
        sw.sprite.material.opacity = 0.85;
        sw.sprite.visible = true;
        sw.life = sw.maxLife;
        break;
    }
}

// --- Explosion Burst ---
function emitExplosion(position, count) {
    // Fires particles in random directions from position using the existing flat particle pool.
    for (let i = 0; i < count; i++) {
        const speed = 20 + Math.random() * 60;
        const dir = new THREE.Vector3(
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
        ).normalize().multiplyScalar(speed);

        const isOrange = Math.random() > 0.5;
        const r = 1.0;
        const g = isOrange ? 0.27 : 0.67;
        const b = 0.0;

        emitParticle(
            position.x, position.y, position.z,
            dir.x, dir.y, dir.z,
            r, g, b,
            0.6 + Math.random() * 0.6,
            0.4 + Math.random() * 0.4
        );
    }
    emitExplosionEffect(position);
}

function updateSpeedLines(delta) {
    if (!speedLineSystem || !drone) return;

    const speed = droneVelocity.length();
    const threshold = MAX_SPEED * SPEED_LINE_THRESHOLD;

    if (speed < threshold) {
        speedLineSystem.material.opacity = 0;
        return;
    }

    // Opacity scales with speed
    const intensity = (speed - threshold) / (MAX_SPEED - threshold);
    speedLineSystem.material.opacity = Math.min(intensity * 0.4, 0.4);
    speedLineSystem.material.color.setHex(isBoosting ? 0x00ffff : 0xffffff);

    // Position speed lines around camera
    const camPos = camera.position;
    for (let i = 0; i < NUM_SPEED_LINES; i++) {
        const i6 = i * 6;
        // Random position in a cylinder around camera
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 15;
        const x = camPos.x + Math.cos(angle) * radius;
        const y = camPos.y + (Math.random() - 0.5) * 20;
        const z = camPos.z + Math.sin(angle) * radius;

        const lineLen = 1 + speed * 0.05;
        const velDir = droneVelocity.clone().normalize();

        speedLinePositions[i6] = x;
        speedLinePositions[i6 + 1] = y;
        speedLinePositions[i6 + 2] = z;
        speedLinePositions[i6 + 3] = x - velDir.x * lineLen;
        speedLinePositions[i6 + 4] = y - velDir.y * lineLen;
        speedLinePositions[i6 + 5] = z - velDir.z * lineLen;
    }

    speedLineSystem.geometry.attributes.position.needsUpdate = true;
}
