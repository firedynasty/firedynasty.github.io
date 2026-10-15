// js/explosions.js — Big combat explosions
//
//   bigExplosion(pos, size, opts)  flash + fireball + rising smoke + shockwave ring + tumbling debris
//   wreckEnemy(enemy)              destroyed jet keeps flying as a burning wreck, falls, and blows up again on the ground
//   updateExplosions(delta)        called every frame from updateEffects()
//
// size 1 ~ a jet blowing up (about 60 units across). Everything is sprites / small meshes, no extra assets.

const _xSprites = [];   // { s, vel, life, max, s0, s1, o0, drag, rise, delay, fade }
const _xDebris  = [];   // { m, vel, spin, life, trailT, size }
const _xWrecks  = [];   // { mesh, vel, spin, life, trailT }
let _fireTex = null, _smokeTex = null, _ringTex = null;

function _xTex(kind) {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    if (kind === 'ring') {
        const r = g.createRadialGradient(64, 64, 40, 64, 64, 62);
        r.addColorStop(0, 'rgba(255,255,255,0)'); r.addColorStop(0.7, 'rgba(255,230,180,0.9)'); r.addColorStop(1, 'rgba(255,200,120,0)');
        g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    } else if (kind === 'smoke') {
        for (let i = 0; i < 7; i++) {   // lumpy cloud: several overlapping soft blobs
            const x = 64 + (Math.random() - 0.5) * 40, y = 64 + (Math.random() - 0.5) * 40, rad = 26 + Math.random() * 22;
            const r = g.createRadialGradient(x, y, 0, x, y, rad);
            r.addColorStop(0, 'rgba(255,255,255,0.55)'); r.addColorStop(1, 'rgba(255,255,255,0)');
            g.fillStyle = r; g.fillRect(0, 0, 128, 128);
        }
    } else {
        const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
        r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.25, 'rgba(255,220,120,0.95)');
        r.addColorStop(0.6, 'rgba(255,110,20,0.6)'); r.addColorStop(1, 'rgba(120,20,0,0)');
        g.fillStyle = r; g.fillRect(0, 0, 128, 128);
    }
    const t = new THREE.CanvasTexture(c);
    return t;
}

function _xInit() {
    if (_fireTex) return;
    _fireTex = _xTex('fire'); _smokeTex = _xTex('smoke'); _ringTex = _xTex('ring');
}

function _xSprite(tex, additive, color) {
    const mat = new THREE.SpriteMaterial({ map: tex, color, transparent: true, depthWrite: false, fog: !additive,
        blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending });
    const s = new THREE.Sprite(mat);
    s.frustumCulled = false;
    scene.add(s);
    return s;
}

function _xAdd(o) {
    if (_xSprites.length > 420) return;     // hard cap so a big battle can't tank the frame rate
    const s = _xSprite(o.tex, o.additive, o.color);
    s.position.copy(o.pos);
    s.scale.setScalar(o.s0);
    s.material.opacity = o.delay > 0 ? 0 : o.o0;
    s.material.rotation = Math.random() * 6.28;
    _xSprites.push({ s, vel: o.vel || new THREE.Vector3(), life: o.life, max: o.life, s0: o.s0, s1: o.s1, o0: o.o0,
        drag: o.drag === undefined ? 1.5 : o.drag, rise: o.rise || 0, delay: o.delay || 0, spinRate: (Math.random() - 0.5) * 1.2, flash: !!o.flash });
}

function _xPuff(pos, size, fire) {
    if (fire) _xAdd({ tex: _fireTex, additive: true, color: 0xff9030, pos, s0: size * 0.9, s1: size * 0.3, o0: 0.9, life: 0.35, drag: 0 });
    _xAdd({ tex: _smokeTex, additive: false, color: 0x222222, pos, s0: size, s1: size * 3.2, o0: 0.65, life: 1.6 + Math.random(), drag: 0.5, rise: 4,
        vel: new THREE.Vector3((Math.random() - 0.5) * 6, Math.random() * 4, (Math.random() - 0.5) * 6) });
}

function bigExplosion(pos, size, opts) {
    _xInit();
    size = size || 1; opts = opts || {};
    const inherit = opts.vel ? opts.vel.clone().multiplyScalar(0.5) : new THREE.Vector3();
    const p = pos.clone();

    // 1. White-hot flash
    _xAdd({ tex: _fireTex, additive: true, color: 0xffffff, pos: p, s0: 25 * size, s1: 120 * size, o0: 1, life: 0.22, drag: 0, flash: true });
    // 2. Expanding fireball: many hot blobs thrown outward, carrying the jet's momentum
    for (let i = 0; i < 12; i++) {
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.35, Math.random() - 0.5).normalize().multiplyScalar((25 + Math.random() * 70) * size).add(inherit);
        _xAdd({ tex: _fireTex, additive: true, color: i % 3 ? 0xff8a2a : 0xffd060, pos: p.clone(), vel: dir, s0: 22 * size, s1: 60 * size, o0: 1, life: 0.7 + Math.random() * 0.7, drag: 2.2 });
    }
    // 3. Dark smoke that lingers and drifts up — you can fly through it
    for (let i = 0; i < 16; i++) {
        const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.4, Math.random() - 0.5).normalize().multiplyScalar((10 + Math.random() * 35) * size).add(inherit.clone().multiplyScalar(0.5));
        _xAdd({ tex: _smokeTex, additive: false, color: i % 2 ? 0x1a1a1a : 0x3a3633, pos: p.clone(), vel: dir, s0: 20 * size, s1: 80 * size, o0: 0.8,
            life: 2.5 + Math.random() * 2.5, drag: 1.2, rise: 9, delay: 0.1 + Math.random() * 0.25 });
    }
    // 4. Shockwave ring
    _xAdd({ tex: _ringTex, additive: true, color: 0xffe0b0, pos: p.clone(), s0: 10 * size, s1: 170 * size, o0: 0.8, life: 0.55, drag: 0 });
    // 5. Debris chunks, each trailing smoke and fire
    const n = opts.debris === undefined ? Math.round(14 * size) : opts.debris;
    const mats = [0x555a60, 0x2a2a2e, 0x8a8f96, 0x6b2a20].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.7, metalness: 0.5, flatShading: true }));
    for (let i = 0; i < n; i++) {
        const w = (0.8 + Math.random() * 2.6) * size, h = (0.3 + Math.random() * 1.2) * size, d = (0.8 + Math.random() * 3.2) * size;
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mats[i % mats.length]);
        m.position.copy(p);
        scene.add(m);
        const vel = new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.8 - 0.2, Math.random() - 0.5).normalize().multiplyScalar((40 + Math.random() * 110) * size).add(inherit);
        _xDebris.push({ m, vel, spin: new THREE.Vector3((Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14, (Math.random() - 0.5) * 14), life: 3 + Math.random() * 2.5, trailT: 0, size });
    }
    // 6. Game feel: shake scaled by distance, layered sound
    const dist = (typeof drone !== 'undefined' && drone) ? drone.position.distanceTo(p) : 0;
    if (typeof cameraShake !== 'undefined') cameraShake = Math.max(cameraShake, 1.4 * size * Math.max(0.08, 1 - dist / 900));
    if (typeof playBigExplosion === 'function') playBigExplosion(dist, size);
}

// A shot-down jet: mid-air blast now, then the burning fuselage tumbles toward the ground and detonates on impact
function wreckEnemy(enemy) {
    const mesh = enemy.mesh;
    bigExplosion(mesh.position, 1.0, { vel: enemy.velocity, debris: 8 });
    _xWrecks.push({ mesh, vel: enemy.velocity.clone().multiplyScalar(0.9), spin: new THREE.Vector3((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, (Math.random() < 0.5 ? -1 : 1) * (4 + Math.random() * 4)), life: 8, trailT: 0 });
}

function updateExplosions(delta) {
    // sprites
    for (let i = _xSprites.length - 1; i >= 0; i--) {
        const e = _xSprites[i];
        if (e.delay > 0) { e.delay -= delta; if (e.delay <= 0) e.s.material.opacity = e.o0; else continue; }
        e.life -= delta;
        if (e.life <= 0) { scene.remove(e.s); e.s.material.dispose(); _xSprites.splice(i, 1); continue; }
        const t = 1 - e.life / e.max;                         // 0 -> 1
        e.vel.multiplyScalar(Math.max(0, 1 - e.drag * delta));
        e.s.position.addScaledVector(e.vel, delta);
        e.s.position.y += e.rise * delta;
        e.s.scale.setScalar(e.s0 + (e.s1 - e.s0) * Math.sqrt(t));
        e.s.material.opacity = e.o0 * (e.flash ? 1 - t : Math.pow(1 - t, 1.3));
        e.s.material.rotation += e.spinRate * delta;
    }
    // debris
    for (let i = _xDebris.length - 1; i >= 0; i--) {
        const d = _xDebris[i];
        d.life -= delta;
        d.vel.y -= 45 * delta;
        d.m.position.addScaledVector(d.vel, delta);
        d.m.rotation.x += d.spin.x * delta; d.m.rotation.y += d.spin.y * delta; d.m.rotation.z += d.spin.z * delta;
        d.trailT -= delta;
        if (d.trailT <= 0) { d.trailT = 0.05; _xPuff(d.m.position.clone(), 3.5 * d.size, Math.random() < 0.5); }
        const hitGround = typeof terrainHeight === 'function' && d.m.position.y < terrainHeight(d.m.position.x, d.m.position.z) + 0.5;
        if (d.life <= 0 || hitGround) {
            if (hitGround) { _xPuff(d.m.position.clone(), 8 * d.size, true); }
            scene.remove(d.m); d.m.geometry.dispose(); _xDebris.splice(i, 1);
        }
    }
    // wrecks
    for (let i = _xWrecks.length - 1; i >= 0; i--) {
        const w = _xWrecks[i];
        w.life -= delta;
        w.vel.y -= 38 * delta;
        w.mesh.position.addScaledVector(w.vel, delta);
        w.mesh.rotation.x += w.spin.x * delta; w.mesh.rotation.y += w.spin.y * delta; w.mesh.rotation.z += w.spin.z * delta;
        w.trailT -= delta;
        if (w.trailT <= 0) { w.trailT = 0.035; _xPuff(w.mesh.position.clone(), 14, true); }
        const gy = typeof terrainHeight === 'function' ? terrainHeight(w.mesh.position.x, w.mesh.position.z) : -1e9;
        if (w.mesh.position.y < gy + 3 || w.life <= 0) {
            const at = w.mesh.position.clone(); at.y = Math.max(at.y, gy + 6);
            scene.remove(w.mesh);
            bigExplosion(at, 1.6, { vel: new THREE.Vector3(w.vel.x, 0, w.vel.z).multiplyScalar(0.4), debris: 16 });
            _xWrecks.splice(i, 1);
        }
    }
}

function clearExplosions() {
    for (const e of _xSprites) { scene.remove(e.s); e.s.material.dispose(); }
    for (const d of _xDebris) { scene.remove(d.m); d.m.geometry.dispose(); }
    for (const w of _xWrecks) scene.remove(w.mesh);
    _xSprites.length = 0; _xDebris.length = 0; _xWrecks.length = 0;
}
