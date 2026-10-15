// js/contrails.js — White ribbons streaming from both wingtips (taper off toward the tail)

const CONTRAIL_LEN = 46;
let _contrails = [];
let _tipHalfSpan = 8, _tipBack = 2;

function createContrails(scene) {
    drone.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(drone), size = box.getSize(new THREE.Vector3()), ctr = box.getCenter(new THREE.Vector3());
    _tipHalfSpan = size.x * 0.46;
    _tipBack     = (ctr.z - drone.position.z) + size.z * 0.18;
    for (const side of [-1, 1]) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(CONTRAIL_LEN * 2 * 3), 3));
        const idx = [];
        for (let i = 0; i < CONTRAIL_LEN - 1; i++) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
        geo.setIndex(idx);
        const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.45, side: THREE.DoubleSide, depthWrite: false }));
        mesh.frustumCulled = false;
        scene.add(mesh);
        _contrails.push({ side, mesh, pts: [] });
    }
}

function updateContrails() {
    if (!_contrails.length || !drone || !drone.visible) return;
    drone.updateMatrixWorld(true);
    for (const t of _contrails) {
        const tip = drone.localToWorld(new THREE.Vector3(t.side * _tipHalfSpan, 0, _tipBack));
        const up  = new THREE.Vector3(0, 1, 0).applyQuaternion(drone.quaternion);
        t.pts.unshift({ p: tip, up });
        if (t.pts.length > CONTRAIL_LEN) t.pts.pop();
        const attr = t.mesh.geometry.attributes.position;
        for (let i = 0; i < CONTRAIL_LEN; i++) {
            const pt = t.pts[Math.min(i, t.pts.length - 1)];
            const w = 0.3 * Math.pow(1 - i / CONTRAIL_LEN, 1.4);
            attr.setXYZ(i * 2,     pt.p.x + pt.up.x * w, pt.p.y + pt.up.y * w, pt.p.z + pt.up.z * w);
            attr.setXYZ(i * 2 + 1, pt.p.x - pt.up.x * w, pt.p.y - pt.up.y * w, pt.p.z - pt.up.z * w);
        }
        attr.needsUpdate = true;
        const speedK = typeof droneSpeed !== 'undefined' ? Math.min(1, droneSpeed / (CRUISE_SPEED * 0.9)) : 1;
        t.mesh.material.opacity = 0.15 + 0.4 * speedK;
    }
}

function resetContrails() { for (const t of _contrails) t.pts.length = 0; }
