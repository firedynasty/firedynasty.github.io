// js/terrain.js — Procedural mountains, forest and snow caps
//
// terrainHeight(x, z) is the single source of truth: the mesh, trees, ground
// collision, the PULL UP warning and the projectile checks all call it.

const TERRAIN_SIZE      = 9000;  // World units across (centered on origin)
const TERRAIN_SEGMENTS  = 240;   // Grid resolution — ~37 units per cell
const TERRAIN_PEAK      = 950;   // Tallest mountain height
const TERRAIN_VALLEY_R0 = 450;   // Flat start valley: fully flat inside this radius
const TERRAIN_VALLEY_R1 = 1500;  // ...blends into mountains by this radius
const TERRAIN_SNOW_LINE = 520;
const TREE_COUNT        = 9000;

// ---- value noise -----------------------------------------------------------
function _hash2(ix, iz) {
    let h = (ix * 374761393 + iz * 668265263) | 0;
    h = (h ^ (h >>> 13)) * 1274126177 | 0;
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function _vnoise(x, z) {
    const ix = Math.floor(x), iz = Math.floor(z);
    const fx = x - ix, fz = z - iz;
    const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
    const a = _hash2(ix, iz),     b = _hash2(ix + 1, iz);
    const c = _hash2(ix, iz + 1), d = _hash2(ix + 1, iz + 1);
    return a + (b - a) * sx + (c - a) * sz + (a - b - c + d) * sx * sz;
}
function _fbm(x, z, oct) {
    let v = 0, amp = 0.5, f = 1, norm = 0;
    for (let i = 0; i < oct; i++) { v += _vnoise(x * f + i * 17.3, z * f - i * 9.1) * amp; norm += amp; amp *= 0.5; f *= 2.03; }
    return v / norm;
}
const _smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

function terrainHeight(x, z) {
    const r    = Math.sqrt(x * x + z * z);
    const mask = _smooth(TERRAIN_VALLEY_R0, TERRAIN_VALLEY_R1, r);
    const base = _fbm(x * 0.00042, z * 0.00042, 5);             // broad landmass
    const ridge = 1 - Math.abs(2 * _fbm(x * 0.0009 + 40, z * 0.0009 - 25, 4) - 1); // sharp ridgelines
    const m = base * 0.55 + ridge * ridge * 0.65;
    const mountains = Math.pow(Math.max(0, m - 0.42) / 0.58, 1.35) * TERRAIN_PEAK;
    const hills = (_fbm(x * 0.004, z * 0.004, 4) - 0.35) * 70;   // rolling forest hills
    return Math.max(-2, hills * (0.35 + 0.65 * mask) + mountains * mask);
}

function _terrainSlope(x, z) {
    const e = 14, dx = terrainHeight(x + e, z) - terrainHeight(x - e, z), dz = terrainHeight(x, z + e) - terrainHeight(x, z - e);
    return Math.sqrt(dx * dx + dz * dz) / (2 * e);   // rise over run
}

// ---- mesh ------------------------------------------------------------------
function createTerrain(scene) {
    const geo = new THREE.PlaneGeometry(TERRAIN_SIZE, TERRAIN_SIZE, TERRAIN_SEGMENTS, TERRAIN_SEGMENTS);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i)));
    geo.computeVertexNormals();

    const col = new Float32Array(pos.count * 3), nrm = geo.attributes.normal, c = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i), ny = nrm.getY(i);
        const n = _vnoise(x * 0.02, z * 0.02);
        if (y > TERRAIN_SNOW_LINE + n * 90 && ny > 0.5)      c.setRGB(0.93, 0.95, 0.98);          // snow cap
        else if (ny < 0.66 || y > 380 + n * 60)               c.setRGB(0.40 + n * 0.12, 0.40 + n * 0.1, 0.42 + n * 0.1); // bare rock
        else if (y < 14)                                      c.setRGB(0.26, 0.42, 0.18);           // valley grass
        else                                                  c.setRGB(0.10 + n * 0.06, 0.26 + n * 0.12, 0.10); // dark forest floor
        c.convertSRGBToLinear();
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1, metalness: 0 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    scene.add(mesh);
    _createTrees(scene);
    return mesh;
}

function _createTrees(scene) {
    const geo = new THREE.ConeGeometry(7, 36, 6);
    geo.translate(0, 18, 0);
    const trees = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true, roughness: 1 }), TREE_COUNT);
    const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3(), c = new THREE.Color();
    const half = TERRAIN_SIZE * 0.45;
    let n = 0;
    for (let tries = 0; tries < TREE_COUNT * 6 && n < TREE_COUNT; tries++) {
        const x = (Math.random() * 2 - 1) * half, z = (Math.random() * 2 - 1) * half;
        const y = terrainHeight(x, z);
        if (y < 8 || y > 400) continue;                          // no trees on the valley floor edge or high up
        if (_terrainSlope(x, z) > 0.75) continue;               // too steep
        if (_fbm(x * 0.0016, z * 0.0016, 3) < 0.42) continue;   // clearings
        const k = 0.7 + Math.random() * 0.9;
        p.set(x, y - 1, z);
        q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * 6.28);
        s.set(k, k * (0.9 + Math.random() * 0.5), k);
        m.compose(p, q, s);
        trees.setMatrixAt(n, m);
        c.setRGB(0.04 + Math.random() * 0.06, 0.20 + Math.random() * 0.16, 0.06 + Math.random() * 0.05);
        c.convertSRGBToLinear();
        trees.setColorAt(n, c);
        n++;
    }
    trees.count = n;
    trees.instanceMatrix.needsUpdate = true;
    if (trees.instanceColor) trees.instanceColor.needsUpdate = true;
    trees.frustumCulled = false;
    scene.add(trees);
}
