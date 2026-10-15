// js/course.js — World objects for sky combat (clouds, ocean plane)

// These globals are referenced by main.js and ui.js — keep them defined.
let buildings = [];
let checkpoints = [];
let dynamicObstacles = [];

function generateCity()          { /* replaced by combat.js */ }
function placeCheckpoints()      { /* replaced by combat.js */ }
function createDynamicObstacles(){ /* removed */ }
function updateCityChunks()      { /* removed */ }
function updateDynamicObstacles(){ /* removed */ }
function checkBuildingCollisions(){ return false; }
function checkDynamicObstacleCollisions(){ return false; }
function updateCheckpointVisuals(){ /* removed */ }
function checkCheckpointPass()   { return null; }

// ---------------------------------------------------------------------------
// createWorldEnvironment() — clouds + ocean plane for sense-of-motion reference
// Call once from main.js after scene is created.
// ---------------------------------------------------------------------------
function createWorldEnvironment() {
    // Ocean plane removed — skybox GLB provides the ocean/horizon background.

    // --- Floating clouds (GLB models) ---
    // Load both cloud variants then scatter them through the sky.
    const cloudLoader = new THREE.GLTFLoader();
    const cloudPaths  = [
        'assets/textures/idle_objects/cloud1.glb',
        'assets/textures/idle_objects/cloud2.glb',
    ];
    const cloudTemplates = [];
    let cloudLoadCount   = 0;

    function onCloudLoaded(gltf) {
        if (gltf) cloudTemplates.push(gltf.scene);
        cloudLoadCount++;
        if (cloudLoadCount === cloudPaths.length) _placeGLBClouds(cloudTemplates);
    }

    cloudPaths.forEach(path => {
        cloudLoader.load(path, onCloudLoaded, undefined, (err) => {
            console.warn('Cloud GLB failed:', path, err);
            onCloudLoaded(null); // still count as "done" so placement runs
        });
    });
}

function _placeGLBClouds(templates) {
    if (templates.length === 0) return; // all loads failed — skip

    for (let c = 0; c < 26; c++) {
        const tpl   = templates[Math.floor(Math.random() * templates.length)];
        const cloud = tpl.clone(true);

        // Replace PBR material with MeshBasicMaterial (no lighting cost) while
        // preserving the original model's color and texture map.
        cloud.traverse(child => {
            if (!child.isMesh) return;
            const orig  = child.material;
            const color = (orig && orig.color) ? orig.color.clone() : new THREE.Color(0xffffff);
            // Check all common texture slots — GLB exporters vary (map, emissiveMap, lightMap)
            const map = orig ? (orig.map || orig.emissiveMap || orig.lightMap || null) : null;
            if (map) { map.encoding = THREE.sRGBEncoding; map.needsUpdate = true; }
            child.material = new THREE.MeshBasicMaterial({
                color:       map ? 0xffffff : color,
                map:         map,
                side:        THREE.DoubleSide,
                transparent: false,
                fog:         true,
            });
        });

        // Scale to absolute size (60–160 units) so clouds are always legible
        // regardless of the original GLB coordinate units.
        const box    = new THREE.Box3().setFromObject(cloud);
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
            const targetSize = 120 + Math.random() * 200; // 60–160 units wide
            cloud.scale.setScalar(targetSize / maxDim);
        }

        // Random position — y=60–120 keeps clouds close to player altitude (50)
        // so they're visible on screen. Radius 200–1400 fills the arena.
        const angle  = Math.random() * Math.PI * 2;
        const radius = 200 + Math.random() * 3600;
        cloud.position.set(
            Math.cos(angle) * radius,
            700 + Math.random() * 700,
            Math.sin(angle) * radius
        );

        // Random Y rotation for variety
        cloud.rotation.y = Math.random() * Math.PI * 2;

        scene.add(cloud);
    }
}
