// js/touch.js — On-screen pad (same layout as Rooftop Rumble): joystick left, action buttons right,
// drag anywhere else on the screen to pitch (finger up = nose up) and steer.
//
//   Joystick  -> acts like W / A / S / D  (up = speed up, down = slow down, left/right = bank + turn)
//   MISSILE   -> missile at the lock (like LMB / F)
//   GUN       -> hold to fire bullets (like Space)
//   ROLL      -> barrel roll (like R)
//   TGT       -> next lock target (like Tab)
//   Drag      -> up/down = nose up/down, left/right = extra turn. Quick tap = lock the plane you tapped.
//   PAD / ||  -> show or hide the pad, pause

let touchPitch = 0;   // -1..1, read by flight.js
let touchYaw   = 0;   // -1..1 (+ = left), read by flight.js

(function () {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let padOn = coarse || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    try { const sv = localStorage.getItem('sc-pad'); if (sv !== null) padOn = sv === '1'; } catch (_) {}

    const $ = id => document.getElementById(id);
    const touchEl = $('touch'), stick = $('stick'), knob = $('knob'), padBtn = $('padBtn'), pauseBtn = $('padPause');
    if (!touchEl) return;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    // ---- joystick -> WASD ----
    let stickId = null;
    function setKey(code, v) { keys[code] = v; }
    function moveStick(e) {
        const r = stick.getBoundingClientRect(), R = r.width / 2;
        let dx = e.clientX - (r.left + R), dy = e.clientY - (r.top + R);
        const len = Math.hypot(dx, dy), lim = R - 18;
        if (len > lim) { dx *= lim / len; dy *= lim / len; }
        knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        const nx = dx / R, ny = dy / R;
        setKey('KeyA', nx < -0.28); setKey('KeyD', nx > 0.28);
        setKey('KeyW', ny < -0.4);  setKey('KeyS', ny > 0.4);
    }
    function releaseStick() {
        stickId = null; knob.style.transform = '';
        for (const k of ['KeyA', 'KeyD', 'KeyW', 'KeyS']) setKey(k, false);
    }
    stick.addEventListener('pointerdown', e => { e.preventDefault(); stickId = e.pointerId; try { stick.setPointerCapture(e.pointerId); } catch (_) {} moveStick(e); });
    stick.addEventListener('pointermove', e => { if (e.pointerId === stickId) { e.preventDefault(); moveStick(e); } });
    stick.addEventListener('pointerup', e => { if (e.pointerId === stickId) releaseStick(); });
    stick.addEventListener('pointercancel', e => { if (e.pointerId === stickId) releaseStick(); });
    stick.addEventListener('contextmenu', e => e.preventDefault());

    // ---- action buttons ----
    const actions = {
        missile: { down() { mouseButtons[0] = true; },  up() { mouseButtons[0] = false; } },
        gun:     { down() { keys['Space'] = true; },     up() { keys['Space'] = false; } },
        roll:    { down() { keys['KeyR'] = true; },      up() { keys['KeyR'] = false; } },
        tgt:     { down() { lockCycleRequest = true; },  up() {} },
    };
    document.querySelectorAll('#touch [data-t]').forEach(b => {
        const a = actions[b.dataset.t];
        b.addEventListener('pointerdown', e => { e.preventDefault(); try { b.setPointerCapture(e.pointerId); } catch (_) {} a.down(); b.classList.add('on'); });
        const up = () => { a.up(); b.classList.remove('on'); };
        b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
        b.addEventListener('contextmenu', e => e.preventDefault());
    });

    // ---- drag on the sky: pitch + steer; quick tap: lock that enemy ----
    let dragId = null, sx = 0, sy = 0, st = 0, moved = 0;
    document.addEventListener('pointerdown', e => {
        if (!padOn || e.pointerType === 'mouse' || gameState !== 'playing') return;
        if (e.target.closest && e.target.closest('#touch')) return;
        dragId = e.pointerId; sx = e.clientX; sy = e.clientY; st = performance.now(); moved = 0;
    });
    document.addEventListener('pointermove', e => {
        if (e.pointerId !== dragId) return;
        const dx = e.clientX - sx, dy = e.clientY - sy;
        moved = Math.max(moved, Math.hypot(dx, dy));
        touchPitch = Math.abs(dy) < 8 ? 0 : clamp(-dy / 80, -1, 1);   // finger up = nose up
        touchYaw   = Math.abs(dx) < 8 ? 0 : clamp(-dx / 110, -1, 1);  // finger left = turn left
    });
    function endDrag(e) {
        if (e.pointerId !== dragId) return;
        dragId = null; touchPitch = 0; touchYaw = 0;
        if (moved < 12 && performance.now() - st < 300) { mouseScreenX = e.clientX; mouseScreenY = e.clientY; } // tap = manual lock
    }
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);

    // ---- pad toggle + pause ----
    function applyPad() {
        if (typeof gameState === 'undefined') return;   // main.js not loaded yet
        document.body.classList.toggle('padon', padOn && gameState === 'playing');
        padBtn.setAttribute('aria-pressed', String(padOn));
        padBtn.hidden = gameState !== 'playing';
        pauseBtn.hidden = gameState !== 'playing';
        touchEl.hidden = !(padOn && gameState === 'playing');
        if (touchEl.hidden) { releaseStick(); for (const k in actions) actions[k].up(); touchPitch = touchYaw = 0; }
    }
    padBtn.addEventListener('click', () => { padOn = !padOn; try { localStorage.setItem('sc-pad', padOn ? '1' : '0'); } catch (_) {} applyPad(); });
    pauseBtn.addEventListener('click', () => { if (gameState === 'playing') pauseGame(); });
    setInterval(applyPad, 150);
    applyPad();
})();
