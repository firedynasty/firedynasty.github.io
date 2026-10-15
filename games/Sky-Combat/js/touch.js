// js/touch.js — On-screen pad (same layout as Rooftop Rumble): joystick left, action buttons right,
// drag anywhere else on the screen to pitch (finger up = nose up) and steer.
//
//   Joystick  -> acts like W / A / S / D  (up = speed up, down = slow down, left/right = bank + turn)
//   MISSILE   -> missile at the lock (like LMB / F)
//   GUN       -> hold to fire bullets (like Space)
//   ROLL      -> barrel roll (like R)
//   TGT       -> next lock target (like Tab)
//   Swipe     -> (right side of the screen) the jet follows your finger up and down like Gore Rush: finger up = nose up (climb over terrain), finger down = nose down (dive). Quick tap = lock the plane you tapped.
//   PAD / ||  -> show or hide the pad, pause
//
// Stick and buttons use pointer events with pointer capture (same as Pixel Racing's pad, which works on phones);
// dragging the sky uses Touch Events. All three work at the same time.

let touchPitch = 0;   // -1..1, read by flight.js
let touchYaw   = 0;   // (unused now — swipes turn the jet directly, see touchLook below)
// Swipe deltas waiting to be applied by flight.js (radians). Like Gore Rush: the view follows your finger.
let touchLookYaw = 0, touchLookPitch = 0, touchLookHold = 0;

(function () {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let padOn = coarse || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    try { const sv = localStorage.getItem('sc-pad'); if (sv !== null) padOn = sv === '1'; } catch (_) {}

    const $ = id => document.getElementById(id);
    const touchEl = $('touch'), stick = $('stick'), knob = $('knob'), padBtn = $('padBtn'), pauseBtn = $('padPause');
    const dragUI = $('dragUI'), dragDot = $('dragDot');
    if (!touchEl) return;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

    const LOOK_YAW   = 0;       // swipe is up/down only; turning is the joystick's job (set e.g. 0.006 to also turn with a swipe)
    const LOOK_PITCH = 0.006;   // radians of nose up/down per pixel of swipe

    // ---- joystick -> WASD (pointer events + pointer capture, same as Pixel Racing's pad) ----
    let stickId = null;
    function moveStick(e) {
        const r = stick.getBoundingClientRect(), R = r.width / 2;
        let dx = e.clientX - (r.left + R), dy = e.clientY - (r.top + R);
        const len = Math.hypot(dx, dy), lim = R - 10;
        if (len > lim) { dx *= lim / len; dy *= lim / len; }
        knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        const nx = dx / R, ny = dy / R;
        keys['KeyA'] = nx < -0.25; keys['KeyD'] = nx > 0.25;
        keys['KeyW'] = ny < -0.3;  keys['KeyS'] = ny > 0.3;
    }
    function releaseStick() {
        stickId = null; knob.style.transform = '';
        keys['KeyA'] = keys['KeyD'] = keys['KeyW'] = keys['KeyS'] = false;
    }
    stick.addEventListener('pointerdown', e => { e.preventDefault(); stickId = e.pointerId; try { stick.setPointerCapture(e.pointerId); } catch (_) {} moveStick(e); });
    stick.addEventListener('pointermove', e => { if (e.pointerId === stickId) { e.preventDefault(); moveStick(e); } });
    stick.addEventListener('pointerup', e => { if (e.pointerId === stickId) releaseStick(); });
    stick.addEventListener('pointercancel', e => { if (e.pointerId === stickId) releaseStick(); });

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
    });
    [stick, touchEl].forEach(el => el.addEventListener('contextmenu', e => e.preventDefault()));

    // ---- drag on the sky: pitch + steer; quick tap: lock that enemy (Touch Events, like Pixel Racing's screen-half steering) ----
    let drag = null;   // { id, x, y, lx, ly, t, moved }
    const onPad = el => !!(el && el.closest && el.closest('#touch,.padtop'));
    document.addEventListener('touchstart', e => {
        if (!padOn || gameState !== 'playing' || drag) return;
        for (const t of e.changedTouches) {
            if (onPad(t.target)) continue;                       // stick / buttons handle their own touches
            if (t.clientX < window.innerWidth * 0.45) continue;  // left side is the joystick's; swipe the right side to look
            drag = { id: t.identifier, x: t.clientX, y: t.clientY, lx: t.clientX, ly: t.clientY, t: performance.now(), moved: 0 };
            dragUI.style.cssText = 'display:block;left:' + t.clientX + 'px;top:' + t.clientY + 'px';
            dragDot.style.transform = 'translate(0,0)';
            e.preventDefault();
            break;
        }
    }, { passive: false });
    document.addEventListener('touchmove', e => {
        if (!drag) return;
        for (const t of e.changedTouches) {
            if (t.identifier !== drag.id) continue;
            const dx = t.clientX - drag.x, dy = t.clientY - drag.y;
            drag.moved = Math.max(drag.moved, Math.hypot(dx, dy));
            // move by how far the finger moved since the last event (finger left = turn left, finger up = nose up)
            touchLookYaw   += -(t.clientX - drag.lx) * LOOK_YAW;
            touchLookPitch += -(t.clientY - drag.ly) * LOOK_PITCH;
            touchLookHold = 0.35;
            drag.lx = t.clientX; drag.ly = t.clientY;
            dragDot.style.transform = 'translate(' + clamp(dx, -60, 60) + 'px,' + clamp(dy, -60, 60) + 'px)';
            e.preventDefault();
        }
    }, { passive: false });
    function endDrag(e) {
        if (!drag) return;
        for (const t of e.changedTouches) {
            if (t.identifier !== drag.id) continue;
            if (drag.moved < 12 && performance.now() - drag.t < 300) { mouseScreenX = t.clientX; mouseScreenY = t.clientY; } // tap = manual lock
            drag = null; dragUI.style.display = 'none';
        }
    }
    document.addEventListener('touchend', endDrag);
    document.addEventListener('touchcancel', endDrag);

    // ---- pad toggle + pause ----
    function applyPad() {
        if (typeof gameState === 'undefined') return;   // main.js not loaded yet
        const playing = gameState === 'playing';
        document.body.classList.toggle('padon', padOn && playing);
        padBtn.setAttribute('aria-pressed', String(padOn));
        padBtn.hidden = !playing;
        pauseBtn.hidden = !playing;
        touchEl.hidden = !(padOn && playing);
        if (touchEl.hidden && (drag || stickId !== null)) {
            releaseStick(); for (const k in actions) actions[k].up();
            touchLookYaw = touchLookPitch = 0; drag = null; dragUI.style.display = 'none';
        }
    }
    padBtn.addEventListener('click', () => { padOn = !padOn; try { localStorage.setItem('sc-pad', padOn ? '1' : '0'); } catch (_) {} applyPad(); });
    pauseBtn.addEventListener('click', () => { if (gameState === 'playing') pauseGame(); });
    setInterval(applyPad, 150);
    applyPad();
})();
