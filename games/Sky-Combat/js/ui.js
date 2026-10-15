// js/ui.js — Combat HUD: HP bar, wave counter, missile cooldown, hit flash, sonar radar

let radarCtx = null;
let radarSweepAngle = 0;
// dots[i] = { enemy, fadeTimer } — fading enemy dots on radar
let radarDots = [];

let controlsHintTimer = 5;
let hitMarkerTimer    = 0;

function initUI() {
    const canvas = document.getElementById('radar');
    if (canvas) {
        radarCtx = canvas.getContext('2d');
    }
}

function showHUD() {
    document.getElementById('hud').classList.remove('hidden');
    controlsHintTimer = 5;
    const hint = document.getElementById('controlsHint');
    if (hint) hint.style.opacity = '1';
}

function hideHUD() {
    const hud = document.getElementById('hud');
    if (hud) hud.classList.add('hidden');
}

function updateHUD(delta) {
    _updateHPBar();
    _updateWaveCounter();
    _updateEnemyCounter();
    _updateMissileCooldown();
    _updateControlsHint(delta);
    _updateHitMarker(delta);
    updateRadar(delta);
    _updateLockIndicator();
    _updateMissileWarning();
    _updateFlipBar();
    _updateSpeedHUD();
    _updateBulletHeatBar();
    _updateCrosshairPosition();
    _updateAimDot();
    _updateFlightHUD();
}

function _updateFlightHUD() {
    const pu = document.getElementById('pullUp'), alt = document.getElementById('altReadout');
    if (pu) pu.style.display = (typeof groundWarning !== 'undefined' && groundWarning > 0) ? 'block' : 'none';
    if (alt && typeof drone !== 'undefined') alt.innerHTML = 'ALT ' + Math.round(drone.position.y) + ' m<br>AGL ' + Math.max(0, Math.round(droneAGL)) + ' m';
}

function _updateCrosshairPosition() {
    // The + is always in the middle of the view (the #hud box is the game view), never following the mouse.
    const ch = document.getElementById('crosshair');
    if (!ch) return;
    ch.style.left      = '50%';
    ch.style.top       = '50%';
    ch.style.transform = 'translate(-50%, -50%)';
}

function _updateAimDot() {
    const dot = document.getElementById('aimDot');
    if (!dot || !camera || !renderer || typeof drone === 'undefined') return;
    // Project a point 180 units ahead of the jet along its forward vector
    const sy = Math.sin(droneYaw), cy = Math.cos(droneYaw);
    const sp = Math.sin(dronePitch), cp = Math.cos(dronePitch);
    const fwdPoint = new THREE.Vector3(
        drone.position.x - sy * cp * 180,
        drone.position.y + sp * 180,
        drone.position.z - cy * cp * 180
    );
    fwdPoint.project(camera);
    if (fwdPoint.z > 1) { dot.style.display = 'none'; return; } // behind camera
    const rect = renderer.domElement.getBoundingClientRect();
    const sx = (fwdPoint.x + 1) / 2 * rect.width  + rect.left;
    const sy2 = (-fwdPoint.y + 1) / 2 * rect.height + rect.top;
    dot.style.display  = 'block';
    dot.style.left     = sx + 'px';
    dot.style.top      = sy2 + 'px';
}

let _speedGaugeCtx = null;
let _lastHP = null; // for smooth heal animation detection

function _updateSpeedHUD() {
    if (!_speedGaugeCtx) {
        const canvas = document.getElementById('speedGauge');
        if (!canvas) return;
        _speedGaugeCtx = canvas.getContext('2d');
    }
    const ctx = _speedGaugeCtx;
    const W = ctx.canvas.width, H = ctx.canvas.height;
    const cx = W / 2, cy = H / 2 + 2;
    const R = Math.min(W, H) * 0.38;

    const spd = typeof droneSpeed !== 'undefined'
        ? Math.max(MIN_SPEED, Math.min(MAX_SPEED, droneSpeed))
        : MIN_SPEED;
    const t = (spd - MIN_SPEED) / (MAX_SPEED - MIN_SPEED);

    // Sweep 240° clockwise from 8-o'clock (150°) through 12 to 4-o'clock (30°)
    const START = 150 * Math.PI / 180;
    const SWEEP = 240 * Math.PI / 180;
    const needleAng = START + t * SWEEP;

    ctx.clearRect(0, 0, W, H);

    // Background circle
    ctx.beginPath();
    ctx.arc(cx, cy, R + 8, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fill();
    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, R + 6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,160,220,0.4)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Track arc (dim full sweep)
    ctx.beginPath();
    ctx.arc(cx, cy, R, START, START + SWEEP, false);
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Active arc (coloured up to needle)
    if (t > 0.01) {
        ctx.beginPath();
        ctx.arc(cx, cy, R, START, needleAng, false);
        ctx.strokeStyle = t > 0.85 ? '#ff4400' : t > 0.6 ? '#ffaa00' : '#00eeff';
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.stroke();
    }

    // Tick marks at 0%, 25%, 50%, 75%, 100%
    for (let i = 0; i <= 4; i++) {
        const a = START + (i / 4) * SWEEP;
        ctx.beginPath();
        ctx.moveTo(cx + (R - 7) * Math.cos(a), cy + (R - 7) * Math.sin(a));
        ctx.lineTo(cx + (R + 3) * Math.cos(a), cy + (R + 3) * Math.sin(a));
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    // Speed number — scaled to SPEED_DISPLAY_MAX (visual only, gameplay speed unchanged)
    const displaySpd = Math.round(spd * (typeof SPEED_DISPLAY_MAX !== 'undefined' ? SPEED_DISPLAY_MAX : MAX_SPEED) / MAX_SPEED);
    ctx.font = 'bold 16px monospace';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(displaySpd, cx, cy + 15);
    // Label
    ctx.font = '9px monospace';
    ctx.fillStyle = 'rgba(0,200,255,0.7)';
    ctx.fillText('KT', cx, cy + 26);

    // Needle (drawn after text so it renders on top)
    ctx.beginPath();
    ctx.moveTo(cx + 5 * Math.cos(needleAng + Math.PI), cy + 5 * Math.sin(needleAng + Math.PI));
    ctx.lineTo(cx + (R - 5) * Math.cos(needleAng), cy + (R - 5) * Math.sin(needleAng));
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    // Small center pivot dot (drawn last, tiny so it doesn't cover the number)
    ctx.beginPath();
    ctx.arc(cx, cy - 2, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ff4400';
    ctx.fill();
}

function updateScoreHUD(score) { /* score display removed */ }

function _updateHPBar() {
    const pct = Math.max(0, (playerHP / PLAYER_MAX_HP) * 100);
    const bar = document.getElementById('hudHPBar');
    const txt = document.getElementById('hudHPText');
    if (!bar || !txt) return;
    // Smooth heal: slow transition when HP goes up, fast when taking damage
    if (_lastHP !== null && playerHP > _lastHP) {
        bar.style.transition = 'width 0.9s, background 0.3s';
        setTimeout(() => { if (bar) bar.style.transition = 'width 0.15s, background 0.3s'; }, 1000);
    }
    _lastHP = playerHP;
    bar.style.width = pct + '%';
    bar.style.background = pct > 50 ? '#00ff66' : pct > 25 ? '#ffcc00' : '#ff3300';
    txt.textContent = Math.ceil(playerHP) + ' / ' + PLAYER_MAX_HP;
}

function _updateWaveCounter() {
    const el = document.getElementById('hudWave');
    if (!el) return;
    const level = getLevelData(currentLevel);
    const totalWaves = level ? level.waves.length : '?';
    el.textContent = 'WAVE ' + currentWave + ' / ' + totalWaves;
}

function _updateEnemyCounter() {
    const el = document.getElementById('hudEnemies');
    if (!el) return;
    const total = enemies.length + (typeof spawnQueue !== 'undefined' ? spawnQueue.length : 0);
    el.textContent = 'Enemies: ' + total;
}

let _prevMissileWarning = false;
function _updateMissileWarning() {
    const el = document.getElementById('missileWarning');
    if (!el) return;
    const active = typeof incomingMissileWarning !== 'undefined' && incomingMissileWarning;
    el.style.display = active ? 'block' : 'none';
    if (active && !_prevMissileWarning && typeof playMissileIncomingAlert === 'function') playMissileIncomingAlert();
    _prevMissileWarning = active;
}

function _updateFlipBar() {
    const bar = document.getElementById('hudFlipBar');
    if (!bar) return;
    const cd = typeof flipCooldown !== 'undefined' ? flipCooldown : 0;
    const ready = Math.max(0, 1 - cd / FLIP_COOLDOWN);
    bar.style.width = (ready * 100) + '%';
    bar.style.background = ready >= 1 ? '#00aaff' : '#335577';
}

function _updateMissileCooldown() {
    const bar = document.getElementById('hudMissileBar');
    if (!bar) return;
    const ready = Math.max(0, 1 - missileCooldown / MISSILE_COOLDOWN);
    bar.style.width = (ready * 100) + '%';
    bar.style.background = ready >= 1 ? '#00ff66' : '#ff6600';
}

function _updateBulletHeatBar() {
    const bar   = document.getElementById('hudBulletHeatBar');
    const label = document.getElementById('hudBulletHeatLabel');
    if (!bar) return;
    const heat = typeof bulletHeat      !== 'undefined' ? bulletHeat      : 0;
    const ovl  = typeof bulletOverloaded !== 'undefined' ? bulletOverloaded : false;
    bar.style.width      = Math.min(100, heat * 100) + '%';
    bar.style.background = ovl ? '#ff1100' : heat > 0.75 ? '#ff6600' : '#00ccff';
    bar.style.boxShadow  = ovl ? '0 0 8px 2px #ff2200' : 'none';
    if (label) label.textContent = ovl ? 'OVERLOAD' : 'GUN';
}

// Called from weapons.js every frame (no-op if HUD not visible)
function updateBulletHeatHUD(heat, overloaded) { /* driven by _updateBulletHeatBar via updateHUD */ }

function _updateControlsHint(delta) {
    if (controlsHintTimer > 0) {
        controlsHintTimer -= delta;
        if (controlsHintTimer <= 0) {
            const el = document.getElementById('controlsHint');
            if (el) el.style.opacity = '0';
        }
    }
}

function _updateHitMarker(delta) {
    if (hitMarkerTimer > 0) {
        hitMarkerTimer -= delta;
        if (hitMarkerTimer <= 0) {
            const el = document.getElementById('hitMarker');
            if (el) el.style.opacity = '0';
        }
    }
}

function showHitMarker() {
    const el = document.getElementById('hitMarker');
    if (!el) return;
    el.style.opacity = '1';
    hitMarkerTimer = 0.15;
}

function showHitFlash() {
    const el = document.getElementById('hitFlash');
    if (!el) return;
    el.style.background = 'rgba(255,0,0,0.35)';
    setTimeout(() => { el.style.background = 'rgba(255,0,0,0)'; }, HIT_FLASH_DURATION_MS);
}

function updateWaveHUD(wave, total) {
    const el = document.getElementById('hudWave');
    if (el) el.textContent = 'WAVE ' + wave + ' / ' + total;
}

function showWaveClearedBanner(wave, total) {
    const banner = document.getElementById('waveClearedBanner');
    const text   = document.getElementById('waveClearedText');
    const sub    = document.getElementById('waveClearedSub');
    const heal   = document.getElementById('waveClearedHeal');
    if (!banner || !text || !sub) return;

    if (wave < total) {
        text.textContent = 'WAVE ' + wave + ' CLEARED';
        sub.textContent  = 'Next wave incoming...';
    } else {
        text.textContent = 'FINAL WAVE CLEARED';
        sub.textContent  = '';
    }
    if (heal) heal.textContent = '+ 50 HP';

    banner.classList.remove('hidden');
    banner.style.display = 'flex';
    if (typeof playWaveCleared === 'function') playWaveCleared();
}

function hideWaveClearedBanner() {
    const banner = document.getElementById('waveClearedBanner');
    if (!banner) return;
    banner.classList.add('hidden');
    banner.style.display = 'none';
}

function showLevelComplete(levelId) {
    gameState = 'won';
    exitPointerLock();
    stopEngine();
    stopMusic();
    if (typeof playLevelComplete === 'function') playLevelComplete();

    const nextLevelData = getLevelData(levelId + 1);
    const nextBtn = document.getElementById('nextLevelBtn');
    if (nextBtn) {
        if (nextLevelData) {
            nextBtn.textContent = 'Next Level: ' + nextLevelData.name;
            nextBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'none';
        }
    }

    // Stay in game for 2s, then fade in the Level Complete screen
    setTimeout(() => {
        hideHUD();
        const win = document.getElementById('winScreen');
        if (win) {
            win.classList.remove('hidden');
            win.style.display = 'flex';
            requestAnimationFrame(() => { win.style.opacity = '1'; });
        }
    }, 2000);
}

// ---------------------------------------------------------------------------
// Enemy lock indicator — follows mouse, highlights closest enemy in range
// Sets the global `lockedTarget` used by weapons.js for missile targeting
// ---------------------------------------------------------------------------

let _autoTarget = null;   // sticky auto-lock target
const _lockFwd = new THREE.Vector3();
const _lockTmp = new THREE.Vector3();

// Angle (radians) between the jet's nose and an enemy
function _angleToEnemy(enemy) {
    _lockTmp.copy(enemy.mesh.position).sub(drone.position);
    const dist = _lockTmp.length();
    if (dist < 1) return { angle: 0, dist };
    return { angle: _lockFwd.angleTo(_lockTmp.multiplyScalar(1 / dist)), dist };
}

function _updateLockIndicator() {
    const indicator = document.getElementById('lockIndicator');
    if (!indicator || !camera || !renderer) return;

    const rect = renderer.domElement.getBoundingClientRect();
    const projPos = new THREE.Vector3();
    const toScreen = (enemy) => {
        projPos.copy(enemy.mesh.position).project(camera);
        if (projPos.z > 1) return null;
        return { x: (projPos.x + 1) / 2 * rect.width + rect.left, y: (-projPos.y + 1) / 2 * rect.height + rect.top };
    };

    // Targeting is automatic: no cursor-hover lock (the crosshair is fixed in the middle of the view).
    const hoverEnemy = null;

    // --- Auto lock: sticky target in front of the nose ---
    const sy = Math.sin(droneYaw), cy = Math.cos(droneYaw);
    _lockFwd.set(-sy, 0, -cy);
    const breakAng = AUTO_LOCK_BREAK * Math.PI / 180, coneAng = AUTO_LOCK_CONE * Math.PI / 180;
    if (_autoTarget) {
        const info = enemies.includes(_autoTarget) ? _angleToEnemy(_autoTarget) : null;
        if (!info || info.angle > breakAng || info.dist > AUTO_LOCK_RANGE) _autoTarget = null;
    }
    // Candidates sorted best-first (closest to the nose, nearer wins ties)
    const cands = [];
    for (let i = 0; i < enemies.length; i++) {
        const info = _angleToEnemy(enemies[i]);
        if (info.dist > AUTO_LOCK_RANGE) continue;
        cands.push({ e: enemies[i], angle: info.angle, score: info.angle + info.dist / 4000 });
    }
    cands.sort((p, q) => p.score - q.score);
    if (lockCycleRequest) {
        lockCycleRequest = false;
        const inView = cands.filter(c => c.angle < breakAng);
        if (inView.length) {
            const idx = inView.findIndex(c => c.e === _autoTarget);
            _autoTarget = inView[(idx + 1) % inView.length].e;
        }
    } else if (!_autoTarget && cands.length && cands[0].angle < coneAng) {
        _autoTarget = cands[0].e;
    }

    // Manual hover overrides the auto target (and becomes the sticky one)
    const bestEnemy = hoverEnemy || _autoTarget;
    if (hoverEnemy) _autoTarget = hoverEnemy;

    // Track target velocity (used by weapons.js to lead shots)
    const _prevLocked = lockedTarget;
    lockedTarget = bestEnemy;
    if (bestEnemy && !_prevLocked && typeof playLockOn === 'function') playLockOn();
    if (!bestEnemy && _prevLocked && typeof playLockLost === 'function') playLockLost();

    const pos = bestEnemy ? toScreen(bestEnemy) : null;
    if (pos) {
        indicator.style.display = 'block';
        indicator.style.left = pos.x + 'px';
        indicator.style.top  = pos.y + 'px';
    } else {
        indicator.style.display = 'none';
    }
}

function updateRadar(delta) {
    if (!radarCtx) return;
    const ctx  = radarCtx;
    const size = RADAR_SIZE;
    const cx   = size / 2;
    const cy   = size / 2;
    const r    = size / 2 - 4;

    // Background
    ctx.clearRect(0, 0, size, size);
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 10, 0, 0.75)';
    ctx.fill();

    // Grid circles
    ctx.strokeStyle = 'rgba(0,255,80,0.15)';
    ctx.lineWidth = 0.5;
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, r * (i / 3), 0, Math.PI * 2);
        ctx.stroke();
    }

    // Cross lines
    ctx.beginPath();
    ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r);
    ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy);
    ctx.stroke();

    // Advance sweep
    radarSweepAngle += RADAR_SWEEP_SPEED * delta * Math.PI * 2;
    if (radarSweepAngle > Math.PI * 2) radarSweepAngle -= Math.PI * 2;

    // Draw sweep line — angle 0 = ahead (top), increases clockwise
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(radarSweepAngle) * r, cy - Math.cos(radarSweepAngle) * r);
    ctx.strokeStyle = 'rgba(0,255,80,0.9)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Project world offset into player-local right/forward axes so that
    // turning left moves dots right (the correct direction) on the radar.
    // right   = (cos(yaw), -sin(yaw)) in xz  [from flight.js: rx=cos(yaw), rz=-sin(yaw)]
    // forward = (-sin(yaw), -cos(yaw)) in xz [from flight.js: fx=-sin(yaw), fz=-cos(yaw)]
    const cos_yaw = Math.cos(droneYaw);
    const sin_yaw = Math.sin(droneYaw);

    // Add/refresh dots for enemies swept by the line this frame
    const sweepWindow = RADAR_SWEEP_SPEED * delta * Math.PI * 2 * 2;
    for (let i = 0; i < enemies.length; i++) {
        const e  = enemies[i];
        const dx = e.mesh.position.x - drone.position.x;
        const dz = e.mesh.position.z - drone.position.z;

        const localRight   =  dx * cos_yaw - dz * sin_yaw;
        const localForward = -dx * sin_yaw - dz * cos_yaw;
        // angleRadar: 0=ahead, +π/2=right — matches sweep line convention
        let angleRadar = Math.atan2(localRight, localForward);
        if (angleRadar < 0) angleRadar += Math.PI * 2;

        let diff = radarSweepAngle - angleRadar;
        while (diff < 0) diff += Math.PI * 2;
        while (diff > Math.PI * 2) diff -= Math.PI * 2;

        if (diff < sweepWindow) {
            let found = false;
            for (let j = 0; j < radarDots.length; j++) {
                if (radarDots[j].enemy === e) {
                    radarDots[j].fadeTimer = RADAR_DOT_FADE;
                    found = true;
                    break;
                }
            }
            if (!found) radarDots.push({ enemy: e, fadeTimer: RADAR_DOT_FADE });
        }
    }

    // Remove dots for dead enemies or fully faded dots
    radarDots = radarDots.filter(d => d.fadeTimer > 0 && enemies.includes(d.enemy));

    // Draw enemy dots using local right/forward — consistent with sweep detection above
    for (let i = 0; i < radarDots.length; i++) {
        const dot = radarDots[i];
        dot.fadeTimer -= delta;
        if (dot.fadeTimer <= 0) continue;

        const e    = dot.enemy;
        const dx   = e.mesh.position.x - drone.position.x;
        const dz   = e.mesh.position.z - drone.position.z;
        const dy   = e.mesh.position.y - drone.position.y;
        const dist3d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const dist2d = Math.sqrt(dx * dx + dz * dz) || 0.001;

        const localRight   =  dx * cos_yaw - dz * sin_yaw;
        const localForward = -dx * sin_yaw - dz * cos_yaw;
        const distScale    = Math.min(dist3d / RADAR_RANGE, 1.0);
        const dotX = cx + (localRight   / dist2d) * distScale * r;
        const dotY = cy - (localForward / dist2d) * distScale * r;

        const alpha = dot.fadeTimer / RADAR_DOT_FADE;
        ctx.beginPath();
        ctx.arc(dotX, dotY, RADAR_DOT_SIZE, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,40,40,' + alpha + ')';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dotX, dotY, RADAR_DOT_SIZE * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,120,120,' + alpha + ')';
        ctx.fill();
    }

    // Player dot (center)
    ctx.beginPath();
    ctx.arc(cx, cy, 3, 0, Math.PI * 2);
    ctx.fillStyle = '#00ffff';
    ctx.fill();

    // Border
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,255,80,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function renderLevelSelect() {
    const grid = document.getElementById('levelSelectGrid');
    if (!grid) return;
    grid.innerHTML = '';

    for (let i = 1; i <= getTotalLevels(); i++) {
        const level    = getLevelData(i);
        const unlocked = isLevelUnlocked(i);
        if (!level) continue;

        const card = document.createElement('button');
        card.disabled = !unlocked;
        card.className = [
            'p-4 rounded-xl border-2 text-left transition-all w-full',
            unlocked
                ? 'border-cyan-600 hover:border-cyan-400 cursor-pointer bg-cyan-900/20'
                : 'border-gray-700 cursor-not-allowed opacity-40 bg-gray-900/20'
        ].join(' ');

        card.innerHTML =
            '<div class="flex justify-between items-center">' +
                '<span class="text-white font-bold text-base">' + i + '. ' + level.name + '</span>' +
                (unlocked ? '' : '<span class="text-gray-500 text-lg">🔒</span>') +
            '</div>' +
            '<div class="text-gray-400 text-sm mt-1">' + level.description + '</div>' +
            '<div class="text-gray-500 text-xs mt-1">' + level.waves.length + ' waves</div>';

        if (unlocked) {
            card.addEventListener('click', () => {
                currentLevel = i;
                waveState    = 'idle';
                startLevel(i);
            });
        }

        grid.appendChild(card);
    }

    // Show "Continue" button only when the game is paused mid-session
    const continueBtn = document.getElementById('continueBtn');
    if (continueBtn) {
        const paused = typeof gameState !== 'undefined' && gameState === 'paused';
        continueBtn.classList.toggle('hidden', !paused);
        continueBtn.style.display = paused ? 'block' : 'none';
    }
}

function renderCustomizationPresets() {
    const grid = document.getElementById('presetGrid');
    if (!grid) return;

    const saved = localStorage.getItem('dronePreset') || 'cyan';
    grid.innerHTML = '';

    Object.entries(DRONE_PRESETS).forEach(([key, preset]) => {
        const selected = key === saved;
        const colorHex = '#' + preset.accent.toString(16).padStart(6, '0');
        const btn = document.createElement('button');
        btn.className = `p-4 rounded-xl border-2 transition-all cursor-pointer ${selected ? 'border-white bg-white/10' : 'border-gray-700 hover:border-gray-500'}`;
        btn.innerHTML = `
            <div class="w-8 h-8 rounded-full mx-auto mb-2" style="background: ${colorHex}; box-shadow: 0 0 12px ${colorHex};"></div>
            <div class="text-white text-sm font-medium">${preset.name}</div>
        `;
        btn.addEventListener('click', () => {
            setDronePreset(key);
            renderCustomizationPresets(); // re-render to update selection
        });
        grid.appendChild(btn);
    });
}
