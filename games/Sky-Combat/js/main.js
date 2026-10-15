// js/main.js — Game initialization, state machine, and main loop

let scene, camera, renderer;
let clock;
let gameState = 'menu'; // menu, countdown, playing, paused, won, lost

let playerHP = PLAYER_MAX_HP;

// Sky background GLB mesh — follows camera each frame
let skyMesh = null;
let _lastFrameTime = 0; // FPS limiter

// Camera shake
let cameraShake = 0;
let enemyDroneTemplate    = null;
let enemyJetTemplate      = null;
let playerBulletTemplate  = null;
let playerMissileTemplate = null;
let enemyMissileTemplate  = null;

function loadGameAssets() {
    const loader = new THREE.GLTFLoader();
    let loaded = 0;
    const total = 6; // player jet + enemy drone + enemy jet + player bullet + 2 missile templates

    function onProgress(label) {
        loaded++;
        const pct = Math.round((loaded / total) * 100);
        const bar = document.getElementById('loadingBar');
        const text = document.getElementById('loadingText');
        if (bar) bar.style.width = pct + '%';
        if (text) text.textContent = 'Loaded: ' + label;
    }

    function finishLoading(droneGLTF, enemyDroneGLTF, enemyJetGLTF) {
        createDrone(scene, droneGLTF);
        enemyDroneTemplate = enemyDroneGLTF;
        enemyJetTemplate   = enemyJetGLTF;

        initEffects(scene);
        initWeapons(scene);
        createTerrain(scene);
        createWorldEnvironment();
        createContrails(scene);
        initUI();
        loadSkybox(scene);
        loadLevels(renderLevelSelect); // render level grid once JSON is ready

        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s';
            setTimeout(() => loadingScreen.style.display = 'none', 500);
        }
        const startScreen = document.getElementById('startScreen');
        if (startScreen) {
            startScreen.classList.remove('hidden');
            startScreen.style.display = 'flex';
        }
    }

    let droneGLTF         = undefined;
    let enemyDroneGLTF    = undefined;
    let enemyJetGLTF      = undefined;
    let playerBulletGLTF  = undefined;
    let playerMissileGLTF = undefined;
    let enemyMissileGLTF  = undefined;
    function tryFinish() {
        if (droneGLTF !== undefined && enemyDroneGLTF !== undefined && enemyJetGLTF !== undefined
            && playerBulletGLTF !== undefined && playerMissileGLTF !== undefined
            && enemyMissileGLTF !== undefined) {
            finishLoading(droneGLTF, enemyDroneGLTF, enemyJetGLTF);
        }
    }

    loader.load('assets/models/player/player-jet.glb',
        (gltf) => { droneGLTF = gltf; onProgress('player jet'); tryFinish(); },
        undefined,
        (err) => { console.warn('player-jet.glb failed:', err); droneGLTF = null; onProgress('player jet (fallback)'); tryFinish(); }
    );

    loader.load('assets/models/enemies/drone.glb',
        (gltf) => { enemyDroneGLTF = gltf; onProgress('enemy drone'); tryFinish(); },
        undefined,
        (err) => { console.warn('enemies/drone.glb failed:', err); enemyDroneGLTF = null; onProgress('enemy drone (fallback)'); tryFinish(); }
    );

    loader.load('assets/models/enemies/enemy-jet.glb',
        (gltf) => { enemyJetGLTF = gltf; onProgress('enemy jet'); tryFinish(); },
        undefined,
        (err) => { console.warn('enemy-jet.glb failed:', err); enemyJetGLTF = null; onProgress('enemy jet (fallback)'); tryFinish(); }
    );

    loader.load('assets/models/player/player_bullet.glb',
        (gltf) => { playerBulletTemplate = gltf; playerBulletGLTF = gltf; onProgress('player bullet'); tryFinish(); },
        undefined,
        (err) => { console.warn('player_bullet.glb failed:', err); playerBulletTemplate = null; playerBulletGLTF = null; onProgress('player bullet (fallback)'); tryFinish(); }
    );

    loader.load('assets/models/player/player_missile.glb',
        (gltf) => { playerMissileTemplate = gltf; playerMissileGLTF = gltf; onProgress('player missile'); tryFinish(); },
        undefined,
        (err) => { console.warn('player_missile.glb failed:', err); playerMissileTemplate = null; playerMissileGLTF = null; onProgress('player missile (fallback)'); tryFinish(); }
    );

    loader.load('assets/models/enemies/enemy-missile.glb',
        (gltf) => { enemyMissileTemplate = gltf; enemyMissileGLTF = gltf; onProgress('enemy missile'); tryFinish(); },
        undefined,
        (err) => { console.warn('enemy-missile.glb failed:', err); enemyMissileTemplate = null; enemyMissileGLTF = null; onProgress('enemy missile (fallback)'); tryFinish(); }
    );

}

function loadSkybox(scene) {
    const loader = new THREE.GLTFLoader();
    loader.load(
        'assets/textures/skybox/sky_ocean_background.glb',
        (gltf) => {
            // Extract the sky texture from the GLB — try every common texture slot
            // because Sketchfab exports vary (some use map, some emissiveMap, etc.)
            let skyTexture = null;
            gltf.scene.traverse(child => {
                if (!skyTexture && child.isMesh && child.material) {
                    const m = child.material;
                    skyTexture = m.map || m.emissiveMap || m.lightMap || null;
                    if (skyTexture) console.log('Sky texture found in slot:', m.map ? 'map' : m.emissiveMap ? 'emissiveMap' : 'lightMap');
                }
            });

            // Build a clean Three.js sphere so we control geometry/UVs.
            // BackSide = render inner face (we're inside the sphere looking out).
            // color must be white (0xffffff) — MeshBasicMaterial multiplies map × color,
            // so inheriting the GLB's material color (often black) makes it pitch-black.
            const skyGeo = new THREE.SphereGeometry(900, 32, 32);
            const skyMat = new THREE.MeshBasicMaterial({
                map:        skyTexture,
                color:      skyTexture ? 0xffffff : SKY_BACKGROUND_COLOR,
                side:       THREE.BackSide,
                depthWrite: false,
                depthTest:  false,
                fog:        false,
            });
            skyMesh = new THREE.Mesh(skyGeo, skyMat);
            skyMesh.renderOrder = -100;
            skyMesh.frustumCulled = false;
            scene.add(skyMesh);
            // Null out scene.background so Three.js doesn't overwrite the sky mesh
            // with a gl.clear() solid fill every frame
            scene.background = null;
            console.log('Sky GLB loaded. Texture:', !!skyTexture);
        },
        undefined,
        (err) => {
            console.warn('Sky GLB not found — using solid colour fallback.', err);
            scene.background = new THREE.Color(SKY_BACKGROUND_COLOR);
        }
    );
}

function init() {
    // --- Scene ---
    scene = new THREE.Scene();
    scene.background = new THREE.Color(SKY_BACKGROUND_COLOR);
    scene.fog = new THREE.Fog(FOG_COLOR, FOG_NEAR, FOG_FAR);

    // --- Camera ---
    camera = new THREE.PerspectiveCamera(FOV_NORMAL, gameAreaSize().w / gameAreaSize().h, 0.5, 9000);
    camera.position.set(0, 30, 50);

    // --- Renderer ---
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(gameAreaSize().w, gameAreaSize().h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // cap at 1× — Retina 2× halves performance for minimal gain
    renderer.shadowMap.enabled = false; // no ground plane → shadows give nothing, kill the GPU cost
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputEncoding = THREE.sRGBEncoding;
    document.getElementById('gameArea').appendChild(renderer.domElement);
    // the view is a box (smaller than the window when the touch footer is showing): follow its size
    if (window.ResizeObserver) new ResizeObserver(() => onWindowResize()).observe(document.getElementById('gameArea'));

    // --- Lighting: daytime open sky ---
    const ambient = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(SUN_COLOR, SUN_INTENSITY);
    sun.position.set(200, 400, 100);
    scene.add(sun);

    // --- Clock ---
    clock = new THREE.Clock();

    // --- Input ---
    initInput();

    // --- Load 3D assets then create game objects ---
    loadGameAssets();

    // --- UI Buttons ---
    document.getElementById('retryBtn').addEventListener('click', () => {
        waveState = 'idle';
        startLevel(currentLevel);
    });

    document.getElementById('menuBtnOver').addEventListener('click', showMenu);

    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        const next = currentLevel + 1;
        if (getLevelData(next) && isLevelUnlocked(next)) {
            waveState = 'idle';
            startLevel(next);
        } else {
            showMenu();
        }
    });

    document.getElementById('levelSelectBtn').addEventListener('click', showMenu);
    document.getElementById('continueBtn')?.addEventListener('click', resumeGame);

    const _closeBtn = document.getElementById('customizeCloseBtn');
    if (_closeBtn) _closeBtn.addEventListener('click', () => {
        document.getElementById('customizeModal').classList.add('hidden');
        document.getElementById('customizeModal').style.display = 'none';
    });

    // How To Play / Credits modals
    function _openModal(id) {
        const m = document.getElementById(id);
        if (m) { m.classList.remove('hidden'); m.style.display = 'flex'; }
    }
    function _closeModal(id) {
        const m = document.getElementById(id);
        if (m) { m.classList.add('hidden'); m.style.display = 'none'; }
    }
    document.getElementById('howToPlayBtn')?.addEventListener('click', () => _openModal('howToPlayModal'));
    document.getElementById('creditsBtn')?.addEventListener('click', () => _openModal('creditsModal'));
    document.getElementById('howToPlayClose')?.addEventListener('click', () => _closeModal('howToPlayModal'));
    document.getElementById('creditsClose')?.addEventListener('click', () => _closeModal('creditsModal'));

    // --- Resize ---
    window.addEventListener('resize', onWindowResize);

    // --- ESC to pause (pointer lock exit also triggers pauseGame via input.js) ---
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && gameState === 'playing') pauseGame();
    });

    // --- Start render loop ---
    animate();
}

function startCountdown() {
    initAudio();
    startEngine();
    startMusic();
    resetGame();
    gameState = 'countdown';
    requestPointerLock();

    // Hide all screens (must also clear inline style — classList alone is overridden by style.display)
    const startScreen = document.getElementById('startScreen');
    startScreen.classList.add('hidden');
    startScreen.style.display = 'none';
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').classList.add('hidden');
    document.getElementById('winScreen').style.display = 'none';
    showHUD();

    // Show countdown
    const countdownEl = document.getElementById('countdownScreen');
    const textEl = document.getElementById('countdownText');
    countdownEl.classList.remove('hidden');
    countdownEl.style.display = 'flex';

    const steps = ['3', '2', '1', 'GO!'];
    let step = 0;

    textEl.textContent = steps[0];
    playCountdown(3);

    const interval = setInterval(() => {
        step++;
        if (step < steps.length) {
            textEl.textContent = steps[step];
            if (step === steps.length - 1) {
                textEl.style.color = '#00ffff';
            }
            if (step < steps.length - 1) {
                playCountdown(3 - step);
            } else {
                playCountdown(0); // GO! sound
            }
        } else {
            clearInterval(interval);
            countdownEl.classList.add('hidden');
            countdownEl.style.display = 'none';
            textEl.style.color = 'white';
            gameState = 'playing';
        }
    }, 600);
}

function resetGame() {
    drone.position.set(0, START_ALTITUDE, 0);
    _pitchVelocity = 0; _yawVelocity = 0; groundWarning = 0;
    if (typeof resetContrails === 'function') resetContrails();
    droneVelocity.set(0, 0, 0);
    droneYaw = 0;
    dronePitch = 0;
    droneSpeed = CRUISE_SPEED;
    drone.visible = true;
    drone.rotation.set(0, 0, 0);
    playerHP = PLAYER_MAX_HP;
    cameraShake = 0;
    camera.fov = FOV_NORMAL;
    camera.updateProjectionMatrix();
    // Reset bullet heat so player starts each level with a cool gun
    if (typeof bulletHeat !== 'undefined') { bulletHeat = 0; bulletOverloaded = false; }
}

function showMenu() {
    gameState = 'menu';
    exitPointerLock();
    hideHUD();
    renderLevelSelect();
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').classList.add('hidden');
    document.getElementById('winScreen').style.display = 'none';
}

function pauseGame() {
    gameState = 'paused';
    exitPointerLock();
    hideHUD();
    renderLevelSelect(); // also shows/hides continueBtn based on gameState === 'paused'
    document.getElementById('startScreen').classList.remove('hidden');
    document.getElementById('startScreen').style.display = 'flex';
}

function resumeGame() {
    if (gameState !== 'paused') return;
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('startScreen').style.display = 'none';
    showHUD();
    gameState = 'playing';
    requestPointerLock();
}

function showWin() {
    gameState = 'won';
    exitPointerLock();
    hideHUD();
    stopEngine();
    stopMusic();
    if (typeof playLevelComplete === 'function') playLevelComplete();

    // Let drone fly for a moment, then fade in overlay
    setTimeout(() => {
        const win = document.getElementById('winScreen');
        if (win) {
            win.classList.remove('hidden');
            win.style.display = 'flex';
            requestAnimationFrame(() => { win.style.opacity = '1'; });
        }
    }, 1200);
}

function showGameOver() {
    gameState = 'lost';
    exitPointerLock();
    stopEngine();
    stopMusic();
    if (typeof playGameOver === 'function') playGameOver();

    // Huge death explosion — particles + shockwaves at drone position
    if (drone) {
        const pos = drone.position.clone();
        if (typeof emitExplosion === 'function') emitExplosion(pos, 350);
        for (let i = 0; i < 4; i++) {
            if (typeof emitExplosionEffect === 'function') emitExplosionEffect(pos.clone());
        }
        drone.visible = false;
    }

    // Wait for explosion to play out, then smoothly fade in Game Over screen
    setTimeout(() => {
        hideHUD();
        const waveEl = document.getElementById('gameOverWave');
        if (waveEl) waveEl.textContent = 'Reached wave ' + currentWave;
        const over = document.getElementById('gameOverScreen');
        if (over) {
            over.classList.remove('hidden');
            over.style.display = 'flex';
            requestAnimationFrame(() => { over.style.opacity = '1'; });
        }
    }, 2500);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}


function update(delta) {
    if (gameState === 'menu') {
        const t = clock.elapsedTime * 0.15;
        camera.position.set(
            Math.sin(t) * 100,
            55 + Math.sin(t * 0.3) * 10,
            Math.cos(t) * 100
        );
        camera.lookAt(0, 40, 0);
        if (skyMesh) skyMesh.position.copy(camera.position);
        updateDroneVisuals(delta);
        return;
    }

    if (gameState !== 'playing') {
        updateEffects(delta);
        // won/lost: keep drone coasting and camera tracking for flythrough background effect
        if (gameState === 'won' || gameState === 'lost') {
            drone.position.addScaledVector(droneVelocity, delta);
            updateGroundSafety(delta);
            updateDroneVisuals(delta);
            updateContrails();
            updateCamera(delta);
        }
        return;
    }

    // --- Input + flight ---
    updateFlight(delta);

    // --- Audio ---
    updateEngine(droneVelocity.length());

    // --- Drone visuals ---
    updateDroneVisuals(delta);
    updateContrails();

    // --- Enemies ---
    if (typeof updateEnemies === 'function') updateEnemies(delta);

    // --- Weapons ---
    if (typeof updateWeapons === 'function') updateWeapons(delta);

    // --- Combat / wave state machine ---
    if (typeof updateCombat === 'function') updateCombat(delta);

    // --- Effects ---
    updateEffects(delta);

    // --- HUD ---
    updateHUD(delta);

    // --- Camera ---
    updateCamera(delta);
}

function updateCamera(delta) {
    {
        // Chase cam: behind and above, swung around with yaw AND pitch so you see the jet's belly when climbing
        const offset = CAMERA_CHASE_OFFSET.clone();
        offset.applyEuler(new THREE.Euler(dronePitch * 0.8, droneYaw, 0, 'YXZ'));
        const targetPos = drone.position.clone().add(offset);
        camera.position.lerp(targetPos, CAMERA_LERP);

        // Never let the camera dip inside the terrain
        if (typeof terrainHeight === 'function') {
            const floor = terrainHeight(camera.position.x, camera.position.z) + 4;
            if (camera.position.y < floor) camera.position.y = floor;
        }

        // Look ahead along the 3D nose vector
        const cp = Math.cos(dronePitch);
        const lookAhead = new THREE.Vector3(-Math.sin(droneYaw) * cp, Math.sin(dronePitch), -Math.cos(droneYaw) * cp);
        camera.lookAt(drone.position.clone().add(lookAhead.multiplyScalar(14)));
        // Lean the camera into turns
        camera.rotateZ((drone.rotation.z || 0) * 0.3);
    }

    // Dynamic FOV based on speed
    const speed = droneVelocity.length();
    const speedFraction = Math.min(speed / MAX_SPEED, 1);
    const targetFOV = FOV_NORMAL + (FOV_BOOST - FOV_NORMAL) * speedFraction;
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.05);
    camera.updateProjectionMatrix();

    // Sky mesh follows camera so it's always in the background
    if (skyMesh) skyMesh.position.copy(camera.position);

    // Camera shake decay
    if (cameraShake > 0.01) {
        camera.position.x += (Math.random() - 0.5) * cameraShake;
        camera.position.y += (Math.random() - 0.5) * cameraShake;
        cameraShake *= CAMERA_SHAKE_DECAY;
    }
}

function triggerCameraShake() {
    cameraShake = CAMERA_SHAKE_INTENSITY;
}

function animate(timestamp = 0) {
    requestAnimationFrame(animate);
    // Cap frame rate — prevents 120Hz+ monitors from cooking the CPU/GPU
    if (timestamp - _lastFrameTime < 1000 / TARGET_FPS) return;
    _lastFrameTime = timestamp;
    const delta = Math.min(clock.getDelta(), 0.1);
    update(delta);
    renderer.render(scene, camera);
}

function gameAreaSize() {
    const a = document.getElementById('gameArea');
    return { w: Math.max(1, (a && a.clientWidth) || window.innerWidth), h: Math.max(1, (a && a.clientHeight) || window.innerHeight) };
}

function onWindowResize() {
    if (!camera || !renderer) return;
    const s = gameAreaSize();
    camera.aspect = s.w / s.h;
    camera.updateProjectionMatrix();
    renderer.setSize(s.w, s.h);
}

// --- Start ---
init();
