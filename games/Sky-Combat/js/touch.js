// js/touch.js — Touch controls. Layout like Rooftop Rumble: the game view is a box, the controls sit in a
// footer underneath it (#padFooter). All input uses Pointer Events (each finger = its own pointerId).
//
//   Footer, left   -> joystick zone: touch anywhere in it and the ring appears under your thumb.
//                     Drag: left/right = turn, up = climb, down = dive (analog)
//   Footer, right  -> MISSILE (at the lock) · GUN (hold) · ROLL (barrel roll) · THR (hold = speed up)
//   Game view      -> swipe: the jet follows your finger (up/down = nose up/down, left/right = turn).
//                     Quick tap = lock the plane you tapped.
//   PAD / ||       -> show or hide the footer, pause
//
// Add ?debug=1 to the URL to see a one-line readout of the last touch input.

let touchPitch = 0;   // -1..1 analog pitch from the joystick, read by flight.js
let touchYaw   = 0;   // -1..1 analog turn from the joystick, read by flight.js
// Swipe deltas waiting to be applied by flight.js (radians). The jet follows your finger.
let touchLookYaw = 0, touchLookPitch = 0, touchLookHold = 0;

(function () {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    let padOn = coarse || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    try { const sv = localStorage.getItem('sc-pad'); if (sv !== null) padOn = sv === '1'; } catch (_) {}

    const $ = id => document.getElementById(id);
    const area = $('gameArea'), footer = $('padFooter'), zone = $('stickZone'), stickEl = $('stick'), knob = $('knob');
    const padBtn = $('padBtn'), pauseBtn = $('padPause'), dragUI = $('dragUI'), dragDot = $('dragDot'), dbg = $('padDbg');
    if (!footer || !area) return;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    // gameState is a `let` in main.js, which loads after this file — a bare reference throws
    // (temporal dead zone) if touched too early, so always go through this guard.
    function isPlaying() { try { return gameState === 'playing'; } catch (_) { return false; } }

    const LOOK_YAW   = 0.0045;   // radians of turn per pixel of swipe
    const LOOK_PITCH = 0.005;    // radians of nose up/down per pixel of swipe

    const DEBUG = /[?&]debug\b/.test(location.search);
    if (dbg) dbg.style.display = DEBUG ? 'block' : 'none';
    let dbgLast = 0;
    function padDebug(msg) {
        if (!DEBUG || !dbg) return;
        const n = performance.now();
        if (n - dbgLast < 100) return;
        dbgLast = n; dbg.textContent = msg;
    }

    // The crosshair / manual-lock cursor lives in the game view, so keep it centred there
    // (it only moves when you tap a plane).
    let recenterTimer = 0;
    function centerCursor() {
        const r = area.getBoundingClientRect();
        mouseScreenX = r.left + r.width / 2;
        mouseScreenY = r.top + r.height / 2;
    }

    // ---- floating joystick (footer, left) ----
    // Everything is measured from where the stick started, so the drawn ring and the maths can't disagree.
    let stick = null;   // { id, x, y }  x,y = client coordinates of the ring centre
    function dead(v) { return Math.abs(v) < 0.2 ? 0 : (v - Math.sign(v) * 0.2) / 0.8; }
    function stickR() { return (stickEl.offsetWidth || 140) / 2; }
    function stickStart(e) {
        const zr = zone.getBoundingClientRect();
        // ring centre = exactly the touch point (it may overhang the zone edge; that's fine)
        stickEl.style.left = (e.clientX - zr.left) + 'px';
        stickEl.style.top  = (e.clientY - zr.top) + 'px';
        stick = { id: e.pointerId, x: e.clientX, y: e.clientY };
        padDebug('stick start ' + Math.round(e.clientX) + ',' + Math.round(e.clientY));
        stickMove(e);
    }
    function stickMove(e) {
        const R = stickR();
        let dx = e.clientX - stick.x, dy = e.clientY - stick.y;
        const len = Math.hypot(dx, dy), lim = R - 8;
        if (len > lim) { dx *= lim / len; dy *= lim / len; }
        knob.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        touchYaw   = clamp(dead(-dx / R), -1, 1);       // stick left = turn left
        touchPitch = clamp(dead(-dy / R), -1, 1);       // stick up = nose up (climb)
        padDebug('stick ' + touchYaw.toFixed(2) + ',' + touchPitch.toFixed(2));
    }
    function releaseStick() {
        stick = null; knob.style.transform = '';
        stickEl.style.left = ''; stickEl.style.top = '';   // back to the middle of the zone
        touchYaw = 0; touchPitch = 0;
    }
    zone.addEventListener('pointerdown', e => {
        if (stick) return;
        e.preventDefault();
        try { zone.setPointerCapture(e.pointerId); } catch (_) {}
        stickStart(e);
    });
    zone.addEventListener('pointermove', e => { if (stick && e.pointerId === stick.id) { e.preventDefault(); stickMove(e); } });
    const zoneEnd = e => { if (stick && e.pointerId === stick.id) releaseStick(); };
    zone.addEventListener('pointerup', zoneEnd);
    zone.addEventListener('pointercancel', zoneEnd);
    zone.addEventListener('lostpointercapture', zoneEnd);

    // ---- action buttons (footer, right) ----
    const actions = {
        missile: { down() { mouseButtons[0] = true; },  up() { mouseButtons[0] = false; } },
        gun:     { down() { keys['Space'] = true; },     up() { keys['Space'] = false; } },
        roll:    { down() { keys['KeyR'] = true; },      up() { keys['KeyR'] = false; } },
        thr:     { down() { keys['KeyW'] = true; },      up() { keys['KeyW'] = false; } },
    };
    document.querySelectorAll('#padFooter [data-t]').forEach(b => {
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
    footer.addEventListener('contextmenu', e => e.preventDefault());

    // ---- swipe the game view: the jet follows your finger; quick tap = lock ----
    // Touch/pen only (a mouse keeps its normal desktop controls). html/body have touch-action:none,
    // so the browser never steals the gesture to scroll.
    let drag = null;   // { id, x, y, lx, ly, t, moved }
    document.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse' || drag || !padOn || !isPlaying()) return;
        if (!area.contains(e.target) || (e.target.closest && e.target.closest('.padtop'))) return;
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
        if (drag.moved < 12 && performance.now() - drag.t < 300) {      // tap = manual lock on whatever is under the finger
            mouseScreenX = e.clientX; mouseScreenY = e.clientY;
            clearTimeout(recenterTimer);
            recenterTimer = setTimeout(centerCursor, 700);              // the picked plane stays locked; the crosshair goes home
        }
        drag = null;
        dragUI.style.display = 'none';
    }
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);

    // ---- pad toggle + pause ----
    let lastShow = null;
    function applyPad() {
        const playing = isPlaying(), show = padOn && playing;
        document.body.classList.toggle('padon', show);
        padBtn.setAttribute('aria-pressed', String(padOn));
        padBtn.hidden = !playing;
        pauseBtn.hidden = !playing;
        footer.hidden = !show;
        document.documentElement.classList.toggle('noscroll', playing);
        if (show !== lastShow) { lastShow = show; centerCursor(); }
        if (!show && (drag || stick || touchYaw || touchPitch)) {
            releaseStick();
            for (const k in actions) actions[k].up();
            touchLookYaw = touchLookPitch = 0;
            drag = null; dragUI.style.display = 'none';
            if (dbg) dbg.textContent = '';
        }
    }
    padBtn.addEventListener('click', () => { padOn = !padOn; try { localStorage.setItem('sc-pad', padOn ? '1' : '0'); } catch (_) {} applyPad(); });
    pauseBtn.addEventListener('click', () => { if (isPlaying()) pauseGame(); });
    if (window.ResizeObserver) new ResizeObserver(() => { if (!drag && padOn) centerCursor(); }).observe(area);
    setInterval(applyPad, 150);
    applyPad();
})();
