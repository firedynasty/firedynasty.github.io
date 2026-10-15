// js/touch.js — On-screen pad: analog joystick on the left, action buttons on the right,
// and a Gore Rush-style swipe anywhere on the sky to look. ALL input uses Pointer Events
// (each finger is its own pointerId, no touch/pointer mixing) — the same approach as the
// Pixel Racing pad, which is known to work on phones.
//
//   Joystick  -> analog: left/right = bank + turn, up = nose up (climb), down = nose down (dive)
//   MISSILE   -> missile at the lock (like LMB / F)
//   GUN       -> hold to fire bullets (like Space)
//   ROLL      -> barrel roll (like R)
//   THR       -> hold to speed up (like W); release and speed drifts back to cruise
//   Swipe     -> anywhere except the pad: the jet follows your finger — up/down = nose up/down,
//                left/right = turn. Quick tap = lock the plane you tapped.
//   PAD / ||  -> show or hide the pad, pause

let touchPitch = 0;   // -1..1 analog pitch from the joystick, read by flight.js
let touchYaw   = 0;   // -1..1 analog turn from the joystick, read by flight.js
// Swipe deltas waiting to be applied by flight.js (radians). The jet follows your finger.
let touchLookYaw = 0, touchLookPitch = 0, touchLookHold = 0;

(function () {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let padOn = coarse || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    try { const sv = localStorage.getItem('sc-pad'); if (sv !== null) padOn = sv === '1'; } catch (_) {}

    const $ = id => document.getElementById(id);
    const touchEl = $('touch'), stick = $('stick'), knob = $('knob'), padBtn = $('padBtn'), pauseBtn = $('padPause');
    const dragUI = $('dragUI'), dragDot = $('dragDot'), dbg = $('padDbg');
    if (!touchEl) return;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    // gameState is a `let` in main.js, which loads after this file — a bare reference throws
    // (temporal dead zone) if touched too early, so always go through this guard.
    function isPlaying() { try { return gameState === 'playing'; } catch (_) { return false; } }

    const LOOK_YAW   = 0.0045;   // radians of turn per pixel of swipe
    const LOOK_PITCH = 0.005;    // radians of nose up/down per pixel of swipe

    let dbgLast = 0;
    function padDebug(msg) {
        if (!dbg) return;
        const n = performance.now();
        if (n - dbgLast < 120) return;
        dbgLast = n; dbg.textContent = msg;
    }

    // ---- joystick: analog turn (X) and pitch (Y), pointer capture like Pixel Racing ----
    let stickId = null;
    function dead(v) { return Math.abs(v) < 0.25 ? 0 : (v - Math.sign(v) * 0.25) / 0.75; }
    function moveStick(e) {
        const r = stick.getBoundingClientRect(), R = r.width / 2;
        let dx = e.clientX - (r.left + R), dy = e.clientY - (r.top + R);
        const len = Math.hypot(dx, dy), lim = R - 10;
        if (len > lim) { dx *= lim / len; dy *= lim / len; }
        knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        touchYaw   = clamp(dead(-dx / R), -1, 1);       // stick left = turn left
        touchPitch = clamp(dead(-dy / R), -1, 1);       // stick up = nose up (climb)
        padDebug('stick ' + touchYaw.toFixed(1) + ',' + touchPitch.toFixed(1));
    }
    function releaseStick() {
        stickId = null; knob.style.transform = '';
        touchYaw = 0; touchPitch = 0;
    }
    stick.addEventListener('pointerdown', e => {
        e.preventDefault();
        stickId = e.pointerId;
        try { stick.setPointerCapture(e.pointerId); } catch (_) {}
        padDebug('stick down ' + e.pointerType);
        moveStick(e);
    });
    stick.addEventListener('pointermove', e => { if (e.pointerId === stickId) { e.preventDefault(); moveStick(e); } });
    stick.addEventListener('pointerup', e => { if (e.pointerId === stickId) releaseStick(); });
    stick.addEventListener('pointercancel', e => { if (e.pointerId === stickId) { padDebug('stick CANCEL'); releaseStick(); } });

    // ---- action buttons ----
    const actions = {
        missile: { down() { mouseButtons[0] = true; },  up() { mouseButtons[0] = false; } },
        gun:     { down() { keys['Space'] = true; },     up() { keys['Space'] = false; } },
        roll:    { down() { keys['KeyR'] = true; },      up() { keys['KeyR'] = false; } },
        thr:     { down() { keys['KeyW'] = true; },      up() { keys['KeyW'] = false; } },
    };
    document.querySelectorAll('#touch [data-t]').forEach(b => {
        const a = actions[b.dataset.t];
        b.addEventListener('pointerdown', e => {
            e.preventDefault();
            try { b.setPointerCapture(e.pointerId); } catch (_) {}
            a.down(); b.classList.add('on');
            padDebug(b.dataset.t + ' down');
        });
        const up = () => { a.up(); b.classList.remove('on'); };
        b.addEventListener('pointerup', up);
        b.addEventListener('pointercancel', up);
        b.addEventListener('lostpointercapture', up);
    });
    [stick, touchEl].forEach(el => el.addEventListener('contextmenu', e => e.preventDefault()));

    // ---- swipe the sky: the jet follows your finger (both axes); quick tap = lock ----
    // Touch/pen only, anywhere except the pad. No preventDefault and no capture needed:
    // html/body have touch-action:none, so the browser never steals the gesture to scroll.
    let drag = null;   // { id, x, y, lx, ly, t, moved }
    const onPad = el => !!(el && el.closest && el.closest('#touch,.padtop'));
    document.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' || drag || !padOn || !isPlaying()) return;
        if (onPad(e.target)) return;
        drag = { id: e.pointerId, x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, t: performance.now(), moved: 0 };
        dragUI.style.cssText = 'display:block;left:' + e.clientX + 'px;top:' + e.clientY + 'px';
        dragDot.style.transform = 'translate(0,0)';
        padDebug('swipe start');
    });
    document.addEventListener('pointermove', e => {
        if (!drag || e.pointerId !== drag.id) return;
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
        // apply how far the finger moved since the last event (finger up = nose up, finger left = turn left)
        touchLookYaw   += -(e.clientX - drag.lx) * LOOK_YAW;
        touchLookPitch += -(e.clientY - drag.ly) * LOOK_PITCH;
        touchLookHold = 0.35;
        drag.lx = e.clientX; drag.ly = e.clientY;
        dragDot.style.transform = 'translate(' + clamp(dx, -60, 60) + 'px,' + clamp(dy, -60, 60) + 'px)';
        padDebug('swipe ' + Math.round(dx) + ',' + Math.round(dy));
    });
    function endDrag(e) {
        if (!drag || e.pointerId !== drag.id) return;
        if (drag.moved < 12 && performance.now() - drag.t < 300) { mouseScreenX = e.clientX; mouseScreenY = e.clientY; } // tap = manual lock
        drag = null;
        dragUI.style.display = 'none';
    }
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);

    // ---- pad toggle + pause ----
    function applyPad() {
        const playing = isPlaying();
        document.body.classList.toggle('padon', padOn && playing);
        padBtn.setAttribute('aria-pressed', String(padOn));
        padBtn.hidden = !playing;
        pauseBtn.hidden = !playing;
        touchEl.hidden = !(padOn && playing);
        if (touchEl.hidden && (drag || stickId !== null || touchYaw || touchPitch)) {
            releaseStick();
            for (const k in actions) actions[k].up();
            touchLookYaw = touchLookPitch = 0;
            drag = null; dragUI.style.display = 'none';
            if (dbg) dbg.textContent = '';
        }
    }
    padBtn.addEventListener('click', () => { padOn = !padOn; try { localStorage.setItem('sc-pad', padOn ? '1' : '0'); } catch (_) {} applyPad(); });
    pauseBtn.addEventListener('click', () => { if (isPlaying()) pauseGame(); });
    setInterval(applyPad, 150);
    applyPad();
})();
