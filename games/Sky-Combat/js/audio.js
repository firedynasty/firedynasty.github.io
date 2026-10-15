// js/audio.js — Procedural audio via Web Audio API + WAV file playback

let audioCtx = null;
let masterGain = null;
let engineOsc1 = null;
let engineOsc2 = null;
let engineGain = null;
let boostNoiseSource = null;
let boostGain = null;
let musicPlaying = false;
let timerWarningInterval = null;
let _musicAudio         = null; // HTML Audio element for music.mp3
let _levelCompleteAudio = null; // HTML Audio element for level_complete.mp3
let _gameOverAudio      = null; // HTML Audio element for game_over.mp3

// WAV file cache: key → AudioBuffer
const _sfxBuffers = {};

// Looping engine WAV nodes (cross-faded by speed)
let _engineIdleNode  = null;
let _engineBoostNode = null;
let _engineIdleGain  = null;
let _engineBoostGain = null;

// Rate-limit missile alert (max once per 1.5 s)
let _missileAlertLastPlay = -10;

function _loadSfx(key, path) {
    fetch(path)
        .then(r => r.arrayBuffer())
        .then(ab => audioCtx.decodeAudioData(ab, buf => { _sfxBuffers[key] = buf; }))
        .catch(() => {}); // missing file silently ignored
}

// Returns true if WAV was found and played; false = caller should use procedural fallback
function _playSfx(key, vol) {
    if (!audioCtx || !_sfxBuffers[key]) return false;
    const src = audioCtx.createBufferSource();
    src.buffer = _sfxBuffers[key];
    const g = audioCtx.createGain();
    g.gain.value = vol !== undefined ? vol : 1.0;
    src.connect(g);
    g.connect(masterGain);
    src.start();
    return true;
}

function initAudio() {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = VOL_MASTER;
    masterGain.connect(audioCtx.destination);

    // Music file — use HTML Audio (streams progressively, no full decode needed)
    _musicAudio = new Audio('assets/sounds/music/music.mp3');
    _musicAudio.loop   = true;
    _musicAudio.volume = VOL_MUSIC;

    // End-screen music tracks (full songs, not SFX)
    _levelCompleteAudio = new Audio('assets/sounds/music/level_complete.mp3');
    _levelCompleteAudio.loop   = false;
    _levelCompleteAudio.volume = VOL_LEVEL_COMPLETE;

    _gameOverAudio = new Audio('assets/sounds/music/game_over.mp3');
    _gameOverAudio.loop   = false;
    _gameOverAudio.volume = VOL_GAME_OVER;

    // Load WAV assets that exist — missing files are silently ignored
    _loadSfx('missile_launch',  'assets/sounds/sfx/missile_launching.wav');
    _loadSfx('player_hit',      'assets/sounds/sfx/player_hit.wav');
    _loadSfx('jet_flyby',       'assets/sounds/sfx/rocket_fly_by.wav');
    // Future WAV hooks — add files to assets/sounds/sfx/ to activate:
    _loadSfx('bullet_fire',     'assets/sounds/sfx/bullet_fire.wav');
    _loadSfx('explosion_enemy', 'assets/sounds/sfx/explosion_enemy.wav');
    _loadSfx('barrel_roll',     'assets/sounds/sfx/barrel_roll.wav');
    _loadSfx('lock_on',         'assets/sounds/sfx/lock_on.wav');
    _loadSfx('wave_cleared',    'assets/sounds/sfx/wave_cleared.wav');
    _loadSfx('level_complete',  'assets/sounds/sfx/level_complete.wav');
    // game_over.wav — add file to enable; procedural fallback active until then
    // _loadSfx('game_over',    'assets/sounds/sfx/game_over.wav');
    _loadSfx('engine_idle',     'assets/sounds/sfx/engine_idle.wav');
    _loadSfx('engine_boost',    'assets/sounds/sfx/engine_boost.wav');
    _loadSfx('missile_alert',   'assets/sounds/sfx/missile_incoming_alert.wav');
    _loadSfx('wave_start',      'assets/sounds/sfx/wave_start.wav');
    _loadSfx('lock_lost',       'assets/sounds/sfx/lock_lost.wav');
}

// --- Engine Hum ---
function startEngine() {
    if (!audioCtx || engineOsc1) return;

    engineGain = audioCtx.createGain();
    engineGain.gain.value = 0.12;
    engineGain.connect(masterGain);

    // Primary oscillator
    engineOsc1 = audioCtx.createOscillator();
    engineOsc1.type = 'sawtooth';
    engineOsc1.frequency.value = 80;
    engineOsc1.connect(engineGain);
    engineOsc1.start();

    // Overtone for richness
    engineOsc2 = audioCtx.createOscillator();
    engineOsc2.type = 'sawtooth';
    engineOsc2.frequency.value = 120;
    const overtoneGain = audioCtx.createGain();
    overtoneGain.gain.value = 0.06;
    engineOsc2.connect(overtoneGain);
    overtoneGain.connect(masterGain);
    engineOsc2.start();

    // WAV engine loops are started lazily in updateEngine() to handle async load timing
}

function stopEngine() {
    if (engineOsc1) { engineOsc1.stop(); engineOsc1 = null; }
    if (engineOsc2) { engineOsc2.stop(); engineOsc2 = null; }
    engineGain = null;
    if (_engineIdleNode)  { try { _engineIdleNode.stop();  } catch(e){} _engineIdleNode  = null; _engineIdleGain  = null; }
    if (_engineBoostNode) { try { _engineBoostNode.stop(); } catch(e){} _engineBoostNode = null; _engineBoostGain = null; }
}

function updateEngine(speed) {
    if (!engineOsc1) return;
    // Pitch rises 80→200 Hz with speed
    const freq = 80 + (speed / MAX_SPEED) * 120;
    engineOsc1.frequency.setTargetAtTime(freq, audioCtx.currentTime, 0.1);
    engineOsc2.frequency.setTargetAtTime(freq * 1.5, audioCtx.currentTime, 0.1);

    // Volume rises slightly with speed
    if (engineGain) {
        engineGain.gain.setTargetAtTime(0.08 + (speed / MAX_SPEED) * 0.1, audioCtx.currentTime, 0.1);
    }

    // Lazy-start WAV engine loops — buffers may not have been ready when startEngine() ran
    if (_sfxBuffers['engine_idle'] && !_engineIdleNode) {
        _engineIdleGain = audioCtx.createGain();
        _engineIdleGain.gain.value = 0;
        _engineIdleGain.connect(masterGain);
        _engineIdleNode = audioCtx.createBufferSource();
        _engineIdleNode.buffer = _sfxBuffers['engine_idle'];
        _engineIdleNode.loop = true;
        _engineIdleNode.connect(_engineIdleGain);
        _engineIdleNode.start();
    }
    if (_sfxBuffers['engine_boost'] && !_engineBoostNode) {
        _engineBoostGain = audioCtx.createGain();
        _engineBoostGain.gain.value = 0;
        _engineBoostGain.connect(masterGain);
        _engineBoostNode = audioCtx.createBufferSource();
        _engineBoostNode.buffer = _sfxBuffers['engine_boost'];
        _engineBoostNode.loop = true;
        _engineBoostNode.connect(_engineBoostGain);
        _engineBoostNode.start();
    }

    // Cross-fade WAV engine layers: idle fades out, boost fades in as speed increases
    const t = Math.min(1, speed / MAX_SPEED);
    if (_engineIdleGain)  _engineIdleGain.gain.setTargetAtTime(VOL_ENGINE * Math.max(0, 1 - t * 2.0), audioCtx.currentTime, 0.2);
    if (_engineBoostGain) _engineBoostGain.gain.setTargetAtTime(VOL_ENGINE * Math.min(1, t * 1.5),    audioCtx.currentTime, 0.2);
}

// --- Boost Whoosh ---
function startBoostSound() {
    if (!audioCtx || boostNoiseSource) return;

    // White noise buffer
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    boostNoiseSource = audioCtx.createBufferSource();
    boostNoiseSource.buffer = buffer;
    boostNoiseSource.loop = true;

    // Bandpass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 800;
    filter.Q.value = 1;

    boostGain = audioCtx.createGain();
    boostGain.gain.value = 0;
    boostGain.gain.setTargetAtTime(0.25, audioCtx.currentTime, 0.1);

    boostNoiseSource.connect(filter);
    filter.connect(boostGain);
    boostGain.connect(masterGain);
    boostNoiseSource.start();

    // Sweep filter frequency up
    filter.frequency.setTargetAtTime(2000, audioCtx.currentTime, 0.5);
}

function stopBoostSound() {
    if (boostGain) {
        boostGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.1);
    }
    setTimeout(() => {
        if (boostNoiseSource) {
            try { boostNoiseSource.stop(); } catch(e) {}
            boostNoiseSource = null;
        }
        boostGain = null;
    }, 200);
}

// --- Gate Chime ---
function playGateChime() {
    if (!audioCtx) return;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.35;
    gain.connect(masterGain);

    // Two-tone ascending: C5 (523) → E5 (659)
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 523;
    osc1.connect(gain);
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.12);

    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 659;
    osc2.connect(gain);
    osc2.start(audioCtx.currentTime + 0.12);
    osc2.stop(audioCtx.currentTime + 0.25);

    gain.gain.setTargetAtTime(0, audioCtx.currentTime + 0.2, 0.05);
}

// --- Collision Impact ---
function playCollision() {
    if (!audioCtx) return;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.4;
    gain.connect(masterGain);

    // Noise burst
    const bufferSize = audioCtx.sampleRate * 0.05;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize); // decaying noise
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.connect(gain);
    noise.start();

    // Low thud
    const thud = audioCtx.createOscillator();
    thud.type = 'sine';
    thud.frequency.value = 60;
    const thudGain = audioCtx.createGain();
    thudGain.gain.value = 0.35;
    thud.connect(thudGain);
    thudGain.connect(masterGain);
    thud.start();
    thud.stop(audioCtx.currentTime + 0.1);
    thudGain.gain.setTargetAtTime(0, audioCtx.currentTime + 0.05, 0.03);
}

// --- Countdown Beep ---
function playCountdown(n) {
    if (!audioCtx) return;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.4;
    gain.connect(masterGain);

    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = n === 0 ? 880 : 440; // GO! is higher pitch
    osc.connect(gain);
    osc.start();
    const duration = n === 0 ? 0.2 : 0.1;
    osc.stop(audioCtx.currentTime + duration);
    gain.gain.setTargetAtTime(0, audioCtx.currentTime + duration * 0.8, 0.02);
}

// --- Timer Warning ---
function startTimerWarning() {
    if (!audioCtx || timerWarningInterval) return;
    let interval = 400;

    function beep() {
        const gain = audioCtx.createGain();
        gain.gain.value = 0.2;
        gain.connect(masterGain);

        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 600;
        osc.connect(gain);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);

        // Speed up as time runs out
        interval = Math.max(150, interval - 20);
        timerWarningInterval = setTimeout(beep, interval);
    }

    beep();
}

function stopTimerWarning() {
    if (timerWarningInterval) {
        clearTimeout(timerWarningInterval);
        timerWarningInterval = null;
    }
}

// --- Background Music ---
let musicOscs = [];

function startMusic() {
    // Stop any end-screen music before starting the BG loop
    if (_levelCompleteAudio && !_levelCompleteAudio.paused) {
        _levelCompleteAudio.pause();
        _levelCompleteAudio.currentTime = 0;
    }
    if (_gameOverAudio && !_gameOverAudio.paused) {
        _gameOverAudio.pause();
        _gameOverAudio.currentTime = 0;
    }

    if (!audioCtx || musicPlaying) return;
    musicPlaying = true;

    // Use the MP3 file if available — skip procedural synth
    if (_musicAudio) {
        _musicAudio.currentTime = 0;
        _musicAudio.play().catch(() => {}); // autoplay policy: silently ignored if blocked
        return;
    }

    // Procedural fallback: synthwave bass + pad
    const bassGain = audioCtx.createGain();
    bassGain.gain.value = 0.06;
    bassGain.connect(masterGain);

    const bassNotes = [110, 130.81, 164.81, 196]; // A2, C3, E3, G3
    let noteIndex = 0;

    const bassOsc = audioCtx.createOscillator();
    bassOsc.type = 'square';
    bassOsc.frequency.value = bassNotes[0];
    bassOsc.connect(bassGain);
    bassOsc.start();
    musicOscs.push(bassOsc);

    const bassInterval = setInterval(() => {
        if (!musicPlaying) { clearInterval(bassInterval); return; }
        noteIndex = (noteIndex + 1) % bassNotes.length;
        bassOsc.frequency.setTargetAtTime(bassNotes[noteIndex], audioCtx.currentTime, 0.05);
    }, 500);

    const padGain = audioCtx.createGain();
    padGain.gain.value = 0.03;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.connect(padGain);
    padGain.connect(masterGain);

    const pad1 = audioCtx.createOscillator();
    pad1.type = 'sawtooth';
    pad1.frequency.value = 220;
    pad1.connect(filter);
    pad1.start();
    musicOscs.push(pad1);

    const pad2 = audioCtx.createOscillator();
    pad2.type = 'sawtooth';
    pad2.frequency.value = 223;
    pad2.connect(filter);
    pad2.start();
    musicOscs.push(pad2);
}

function stopMusic() {
    musicPlaying = false;
    if (_musicAudio) {
        _musicAudio.pause();
        _musicAudio.currentTime = 0;
    }
    musicOscs.forEach(osc => { try { osc.stop(); } catch(e) {} });
    musicOscs = [];
}

// ---------------------------------------------------------------------------
// Combat SFX
// ---------------------------------------------------------------------------

// Player fires a bullet (Space held — 8 rounds/sec — must be lightweight)
function playBulletFire() {
    if (_playSfx('bullet_fire', VOL_BULLET_FIRE)) return;
    if (!audioCtx) return;
    const g = audioCtx.createGain();
    g.gain.value = 0.06;
    g.connect(masterGain);
    const osc = audioCtx.createOscillator();
    osc.type = 'square';
    osc.frequency.value = 2200;
    osc.connect(g);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.03);
    g.gain.setTargetAtTime(0, audioCtx.currentTime, 0.01);
}

// Player fires homing missile (LMB)
function playMissileLaunch() {
    if (_playSfx('missile_launch', VOL_MISSILE_LAUNCH)) return;
    if (!audioCtx) return;
    const bufSize = Math.floor(audioCtx.sampleRate * 0.4);
    const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufSize * 0.3));
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    const filt = audioCtx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 1200;
    filt.Q.value = 0.8;
    const g = audioCtx.createGain();
    g.gain.value = 0.5;
    src.connect(filt);
    filt.connect(g);
    g.connect(masterGain);
    src.start();
}

// Enemy destroyed — low-frequency boom
function playExplosion() {
    if (_playSfx('explosion_enemy', VOL_EXPLOSION)) return;
    if (!audioCtx) return;
    const bufSize = Math.floor(audioCtx.sampleRate * 0.5);
    const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufSize, 2);
    }
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    const filt = audioCtx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 300;
    const g = audioCtx.createGain();
    g.gain.value = 0.6;
    src.connect(filt);
    filt.connect(g);
    g.connect(masterGain);
    src.start();

    const thud = audioCtx.createOscillator();
    thud.type = 'sine';
    thud.frequency.value = 50;
    thud.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.4);
    const tg = audioCtx.createGain();
    tg.gain.value = 0.5;
    tg.gain.setTargetAtTime(0, audioCtx.currentTime + 0.1, 0.08);
    thud.connect(tg);
    tg.connect(masterGain);
    thud.start();
    thud.stop(audioCtx.currentTime + 0.5);
}

// Layered big explosion: sharp crack + deep boom + sub-bass thump. Quieter when far from the player.
function playBigExplosion(dist, size) {
    if (!audioCtx || !masterGain) return;
    const vol = Math.max(0.2, Math.min(1, 1.15 - (dist || 0) / 1300)), t0 = audioCtx.currentTime;
    const noise = (dur) => {
        const n = Math.floor(audioCtx.sampleRate * dur), buf = audioCtx.createBuffer(1, n, audioCtx.sampleRate), d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
        const s = audioCtx.createBufferSource(); s.buffer = buf; return s;
    };
    // crack
    const c = noise(0.14), cf = audioCtx.createBiquadFilter(), cg = audioCtx.createGain();
    cf.type = 'highpass'; cf.frequency.value = 1800; cg.gain.value = 0.55 * vol;
    c.connect(cf); cf.connect(cg); cg.connect(masterGain); c.start(t0);
    // boom
    const b = noise(1.1 + size * 0.4), bf = audioCtx.createBiquadFilter(), bg = audioCtx.createGain();
    bf.type = 'lowpass'; bf.frequency.setValueAtTime(900, t0); bf.frequency.exponentialRampToValueAtTime(70, t0 + 1.2);
    bg.gain.value = 1.0 * vol; b.connect(bf); bf.connect(bg); bg.connect(masterGain); b.start(t0 + 0.02);
    // sub thump
    const o = audioCtx.createOscillator(), og = audioCtx.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(75, t0); o.frequency.exponentialRampToValueAtTime(24, t0 + 0.9);
    og.gain.setValueAtTime(0.9 * vol, t0); og.gain.exponentialRampToValueAtTime(0.001, t0 + 1.0);
    o.connect(og); og.connect(masterGain); o.start(t0); o.stop(t0 + 1.05);
}

// Player takes damage
function playPlayerHit() {
    if (_playSfx('player_hit', VOL_PLAYER_HIT)) return;
    playCollision(); // fallback to existing impact sound
}

// Enemy jet or missile passes close to player — Doppler whoosh
function playJetFlyby() {
    if (_playSfx('jet_flyby', VOL_JET_FLYBY)) return;
    if (!audioCtx) return;
    const bufSize = Math.floor(audioCtx.sampleRate * 0.8);
    const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    const filt = audioCtx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 1600;
    filt.frequency.setTargetAtTime(400, audioCtx.currentTime, 0.3);
    filt.Q.value = 1.5;
    const g = audioCtx.createGain();
    g.gain.value = 0;
    g.gain.setTargetAtTime(0.3, audioCtx.currentTime, 0.05);
    g.gain.setTargetAtTime(0, audioCtx.currentTime + 0.4, 0.1);
    src.connect(filt);
    filt.connect(g);
    g.connect(masterGain);
    src.start();
}

// ---------------------------------------------------------------------------
// Flight SFX
// ---------------------------------------------------------------------------

// R key barrel roll dodge
function playBarrelRoll() {
    if (_playSfx('barrel_roll', VOL_BARREL_ROLL)) return;
    if (!audioCtx) return;
    const bufSize = Math.floor(audioCtx.sampleRate * 0.8);
    const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
    const src = audioCtx.createBufferSource();
    src.buffer = buf;
    const filt = audioCtx.createBiquadFilter();
    filt.type = 'bandpass';
    filt.frequency.value = 400;
    filt.frequency.setTargetAtTime(2000, audioCtx.currentTime, 0.2);
    filt.Q.value = 2;
    const g = audioCtx.createGain();
    g.gain.value = 0.2;
    g.gain.setTargetAtTime(0, audioCtx.currentTime + 0.5, 0.1);
    src.connect(filt);
    filt.connect(g);
    g.connect(masterGain);
    src.start();
}

// ---------------------------------------------------------------------------
// UI / Event SFX
// ---------------------------------------------------------------------------

// Missile lock acquired on an enemy
function playLockOn() {
    if (_playSfx('lock_on', VOL_LOCK_ON)) return;
    if (!audioCtx) return;
    [880, 1100].forEach((freq, i) => {
        const g = audioCtx.createGain();
        g.gain.value = 0.25;
        g.connect(masterGain);
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(g);
        const t = audioCtx.currentTime + i * 0.08;
        osc.start(t);
        osc.stop(t + 0.06);
        g.gain.setTargetAtTime(0, t + 0.04, 0.01);
    });
}

// All enemies in a wave defeated
function playWaveCleared() {
    if (_playSfx('wave_cleared', VOL_WAVE_CLEARED)) return;
    if (!audioCtx) return;
    [523, 659, 784, 1047].forEach((freq, i) => {
        const g = audioCtx.createGain();
        g.gain.value = 0.3;
        g.connect(masterGain);
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(g);
        const t = audioCtx.currentTime + i * 0.12;
        osc.start(t);
        osc.stop(t + 0.15);
        g.gain.setTargetAtTime(0, t + 0.1, 0.02);
    });
}

// All waves cleared — level complete
function playLevelComplete() {
    if (_levelCompleteAudio) {
        _levelCompleteAudio.currentTime = 0;
        _levelCompleteAudio.play().catch(() => {});
        return;
    }
    if (_playSfx('level_complete', VOL_LEVEL_COMPLETE)) return;
    if (!audioCtx) return;
    [523, 659, 784, 659, 784, 1047].forEach((freq, i) => {
        const g = audioCtx.createGain();
        g.gain.value = 0.35;
        g.connect(masterGain);
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(g);
        const t = audioCtx.currentTime + i * 0.15;
        osc.start(t);
        osc.stop(t + 0.18);
        g.gain.setTargetAtTime(0, t + 0.12, 0.02);
    });
}

// Player HP hits 0
function playGameOver() {
    if (_gameOverAudio) {
        _gameOverAudio.currentTime = 0;
        _gameOverAudio.play().catch(() => {});
        return;
    }
    if (_playSfx('game_over', VOL_GAME_OVER)) return;
    if (!audioCtx) return;
    [440, 349, 294, 220].forEach((freq, i) => {
        const g = audioCtx.createGain();
        g.gain.value = 0.3;
        g.connect(masterGain);
        const osc = audioCtx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.value = freq;
        osc.connect(g);
        const t = audioCtx.currentTime + i * 0.25;
        osc.start(t);
        osc.stop(t + 0.4);
        g.gain.setTargetAtTime(0, t + 0.2, 0.05);
    });
}

// ---------------------------------------------------------------------------
// Targeting / Alert SFX
// ---------------------------------------------------------------------------

// Enemy missile ETA < 2s — rate-limited to avoid spam every frame
function playMissileIncomingAlert() {
    if (!audioCtx) return;
    if (audioCtx.currentTime - _missileAlertLastPlay < 1.5) return;
    _missileAlertLastPlay = audioCtx.currentTime;
    if (_playSfx('missile_alert', VOL_MISSILE_ALERT)) return;
    // Procedural: 3 rapid beeps
    for (let i = 0; i < 3; i++) {
        const g = audioCtx.createGain();
        g.gain.value = 0.3;
        g.connect(masterGain);
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 1600;
        osc.connect(g);
        const t = audioCtx.currentTime + i * 0.15;
        osc.start(t);
        osc.stop(t + 0.1);
        g.gain.setTargetAtTime(0, t + 0.08, 0.01);
    }
}

// Missile lock lost (target left range)
function playLockLost() {
    if (_playSfx('lock_lost', VOL_LOCK_LOST)) return;
    if (!audioCtx) return;
    const g = audioCtx.createGain();
    g.gain.value = 0.2;
    g.connect(masterGain);
    const osc = audioCtx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 660;
    osc.frequency.setTargetAtTime(330, audioCtx.currentTime, 0.08);
    osc.connect(g);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
    g.gain.setTargetAtTime(0, audioCtx.currentTime + 0.1, 0.02);
}

// New wave is about to start (WAVE_START_DELAY countdown)
function playWaveStart() {
    if (_playSfx('wave_start', VOL_WAVE_START)) return;
    if (!audioCtx) return;
    [440, 660].forEach((freq, i) => {
        const g = audioCtx.createGain();
        g.gain.value = 0.3;
        g.connect(masterGain);
        const osc = audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.connect(g);
        const t = audioCtx.currentTime + i * 0.12;
        osc.start(t);
        osc.stop(t + 0.12);
        g.gain.setTargetAtTime(0, t + 0.08, 0.02);
    });
}
