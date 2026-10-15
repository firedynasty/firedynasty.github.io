// js/drone.js — Drone mesh (GLB model) and flight model

let drone = null;
let droneVelocity = null;
let droneYaw = 0;
let dronePitch = 0;
let boostMeter = 0;
let isBoosting = false;
let fpvMode = false;

let droneAccent = DRONE_PRESETS.cyan.accent;
let droneAnimMixer = null;
let droneAnimActions = [];

function createDrone(scene, gltf) {
    droneVelocity = new THREE.Vector3(0, 0, 0);

    if (gltf) {
        drone = gltf.scene;

        // Auto-scale: normalize so bounding box fits DRONE_WINGSPAN * 2 width
        const box = new THREE.Box3().setFromObject(drone);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.z); // wingspan
        const targetSize = DRONE_WINGSPAN * 2.5;
        const scaleFactor = targetSize / (maxDim || 1);
        drone.scale.setScalar(scaleFactor);

        // Re-center after scaling: bottom of bounding box at y=0 relative to group
        const box2 = new THREE.Box3().setFromObject(drone);
        const center = box2.getCenter(new THREE.Vector3());
        drone.position.sub(center); // center on origin

        // Configure mesh properties
        drone.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = false;
                // Preserve original GLB materials — no color/emissive override.
                // Scene lighting (ambient 1.2 + sun 1.5 + fill PointLights) is enough.
            }
        });

        // Wrap in a group so we can position/rotate independently.
        // Rotate the model 180° around Y inside the group: GLB assets commonly export
        // with their nose pointing +Z, but the game's forward direction is -Z.
        // This bakes the flip into the model node so the group's rotation.y = droneYaw
        // always keeps the nose pointing in the correct direction of travel.
        const droneModel = drone; // keep reference to gltf.scene for AnimationMixer
        droneModel.rotation.y = Math.PI;
        const droneGroup = new THREE.Group();
        droneGroup.rotation.order = 'YXZ';
        droneGroup.add(droneModel);
        drone = droneGroup;

        // Accent light (underside glow, cyberpunk colour)
        const droneLight = new THREE.PointLight(droneAccent, 1.5, 30);
        droneLight.position.set(0, -1, 0);
        drone.add(droneLight);

        // Fill light above the drone so the model reads against the dark sky
        const droneFill = new THREE.PointLight(0xffffff, 2.5, 12);
        droneFill.position.set(0, 4, 0);
        drone.add(droneFill);

        // Wire up animations — target the model root (gltf.scene), not the wrapper group
        if (gltf.animations && gltf.animations.length > 0) {
            droneAnimMixer = new THREE.AnimationMixer(droneModel);
            gltf.animations.forEach(clip => {
                const action = droneAnimMixer.clipAction(clip);
                action.play();
                droneAnimActions.push(action);
            });
        }
    } else {
        // Fallback: simple box if GLB failed to load
        drone = new THREE.Group();
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(2, 0.4, 1.2),
            new THREE.MeshStandardMaterial({ color: 0x2c3e50 })
        );
        drone.add(body);
    }

    drone.position.set(0, 40, 0);
    scene.add(drone);
    return drone;
}

function updateDroneVisuals(delta) {
    if (!drone) return;
    if (droneAnimMixer) droneAnimMixer.update(delta);

    drone.rotation.order = 'YXZ';
    drone.rotation.y = droneYaw;
    // nose follows pitch, taking the SHORT way round the circle (pitch wraps at +-PI during a loop)
    const _pd = Math.atan2(Math.sin(dronePitch - (drone.rotation.x || 0)), Math.cos(dronePitch - (drone.rotation.x || 0)));
    drone.rotation.x = (drone.rotation.x || 0) + _pd * 0.25;
    // Visual bank — overridden by barrel roll animation when active
    if (typeof droneFlipRoll !== 'undefined' && Math.abs(droneFlipRoll) > 0.05) {
        drone.rotation.z = droneFlipRoll;
    } else {
        // bank follows the PILOT's turn direction, so undo the left/right swap used while inverted
        const _pilotSign = Math.cos(dronePitch) < 0 ? -1 : 1;
        const bankTarget = ((typeof _yawVelocity !== 'undefined' ? _yawVelocity * _pilotSign / YAW_SPEED : 0) + (typeof lookBank !== 'undefined' ? lookBank * 0.6 : 0)) * BANK_ANGLE;
        drone.rotation.z = THREE.MathUtils.lerp(drone.rotation.z || 0, bankTarget, BANK_LERP);
    }
}

function setDronePreset(presetKey) {
    const preset = DRONE_PRESETS[presetKey];
    if (!preset) return;
    droneAccent = preset.accent;
    localStorage.setItem('dronePreset', presetKey);
}
