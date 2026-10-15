// js/combat.js — Wave state machine and level flow
//
// Wave states:
//   'idle'           — not started
//   'wave-start'     — WAVE_START_DELAY_MS pause before enemies spawn
//   'wave-active'    — enemies alive, waiting for all to die
//   'wave-clear'     — WAVE_CLEAR_PAUSE_MS banner between waves
//   'level-complete' — all waves done

let waveState = 'idle';
let waveTimer = 0;
let currentWave  = 0;
let currentLevel = 1;

// Staggered spawn queue — enemies trickle in instead of arriving all at once
// Each entry: { type: 'drone'|'jet', timeLeft: seconds }
let spawnQueue = [];

function startLevel(levelId) {
    const level = getLevelData(levelId);
    if (!level) { console.error('No level data for id', levelId); return; }

    currentLevel = levelId;
    currentWave  = 0;
    waveState    = 'idle';

    playerHP    = PLAYER_MAX_HP;

    _clearAllEnemies();
    startCountdown();
}

function _clearAllEnemies() {
    spawnQueue = [];
    if (typeof clearExplosions === 'function') clearExplosions();
    for (let i = enemies.length - 1; i >= 0; i--) {
        scene.remove(enemies[i].mesh);
        enemies[i].mesh.traverse(child => {
            if (child.isMesh) {
                if (child.geometry) child.geometry.dispose();
                const mats = Array.isArray(child.material) ? child.material : [child.material];
                mats.forEach(m => { if (m) m.dispose(); });
            }
        });
        enemies.splice(i, 1);
    }
}

function _startNextWave() {
    const level = getLevelData(currentLevel);
    currentWave++;

    if (currentWave > level.waves.length) {
        waveState = 'level-complete';
        _onLevelComplete();
        return;
    }

    waveState = 'wave-start';
    waveTimer = WAVE_START_DELAY_MS / 1000;
    if (typeof playWaveStart === 'function') playWaveStart();

    if (typeof updateWaveHUD === 'function') {
        updateWaveHUD(currentWave, level.waves.length);
    }
}

function _spawnWave() {
    const level   = getLevelData(currentLevel);
    const waveDef = level.waves[currentWave - 1];

    // Build entries array then sort by timeLeft so queue drains in chronological order.
    // Jets are interleaved starting at ~20% of the drone spawn window — they arrive
    // alongside the drones rather than waiting for all drones to spawn first.
    const entries = [];
    let droneDelay = 0;
    for (let i = 0; i < waveDef.drones; i++) {
        entries.push({ type: 'drone', timeLeft: droneDelay });
        droneDelay += 1.5 + Math.random() * 1.0;
    }

    const jetBase = droneDelay * 0.2; // first jet after ~20% of drones have appeared
    for (let i = 0; i < waveDef.jets; i++) {
        entries.push({ type: 'jet', timeLeft: jetBase + i * (3.0 + Math.random() * 2.0) });
    }

    // Sort chronologically so _spawnWave drains them in correct order
    spawnQueue = entries.sort((a, b) => a.timeLeft - b.timeLeft);

    waveState = 'wave-active';
    console.log('Wave ' + currentWave + ': ' + waveDef.drones + ' drones + ' + waveDef.jets + ' jets, first jet at ~' + Math.round(jetBase) + 's');
}

function _onLevelComplete() {
    unlockLevel(currentLevel + 1);
    showLevelComplete(currentLevel);
}

function updateCombat(delta) {
    if (gameState !== 'playing') return;

    switch (waveState) {
        case 'idle':
            _startNextWave();
            break;

        case 'wave-start':
            waveTimer -= delta;
            if (waveTimer <= 0) _spawnWave();
            break;

        case 'wave-active':
            // Drain spawn queue — each entry counts down and spawns when ready
            for (let i = spawnQueue.length - 1; i >= 0; i--) {
                spawnQueue[i].timeLeft -= delta;
                if (spawnQueue[i].timeLeft <= 0) {
                    spawnEnemy(spawnQueue[i].type);
                    spawnQueue.splice(i, 1);
                }
            }
            // Wave clear only once ALL queued enemies have spawned AND been killed
            if (spawnQueue.length === 0 && enemies.length === 0) {
                waveState = 'wave-clear';
                waveTimer = WAVE_CLEAR_PAUSE_MS / 1000;
                const level = getLevelData(currentLevel);
                // Heal player 75 HP on wave clear (capped at max)
                playerHP = Math.min(playerHP + 75, PLAYER_MAX_HP);
                if (typeof showWaveClearedBanner === 'function') {
                    showWaveClearedBanner(currentWave, level.waves.length);
                }
            }
            break;

        case 'wave-clear':
            waveTimer -= delta;
            if (waveTimer <= 0) {
                if (typeof hideWaveClearedBanner === 'function') hideWaveClearedBanner();
                _startNextWave();
            }
            break;

        case 'level-complete':
            break;
    }
}

// Stubs — overridden by ui.js (Plan 05)
function showWaveClearedBanner(wave, total) {
    console.log('Wave ' + wave + '/' + total + ' cleared!');
}
function hideWaveClearedBanner() {}
function showLevelComplete(levelId) {
    console.log('Level ' + levelId + ' complete!');
    gameState = 'won';
    if (typeof showWin === 'function') showWin();
}
