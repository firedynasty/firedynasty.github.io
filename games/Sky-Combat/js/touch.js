// js/touch.js — Touch controls. Layout like Rooftop Rumble: the game view is a box, the controls sit in a
// footer underneath it (#padFooter). All input uses Pointer Events (each finger = its own pointerId).
//
//   Footer, left   -> joystick zone: touch anywhere in it and the ring appears under your thumb.
//                     Drag: left/right = turn, up = climb, down = dive (analog)
//   Footer, middle -> (Pad 1 only) MISSILE + GUN again, so the left hand can shoot too. Pad 2 leaves them out.
//   Footer, right  -> MISSILE (at the lock) · GUN (hold) · ROLL (barrel roll) · THR (hold = speed up)
//   Game view      -> swipe: the jet follows your finger (up/down = nose up/down, left/right = turn).
//                     Targeting is automatic: planes in front of the nose get locked, MISSILE fires at the lock.
//   PAD / ||       -> Pad button cycles Off -> Pad 1 -> Pad 2 -> Off; || pauses
//
// Add ?debug=1 to the URL to see a one-line readout of the last touch input.

let touchPitch = 0;   // -1..1 analog pitch from the joystick, read by flight.js
let touchYaw   = 0;   // -1..1 analog turn from the joystick, read by flight.js
// Swipe deltas waiting to be applied by flight.js (radians). The jet follows your finger.
let touchLookYaw = 0, touchLookPitch = 0, touchLookHold = 0;

(function () {
    const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    // Pad layout: 0 = off (desktop controls), 1 = Pad 1 (extra Missile/Gun buttons by the stick), 2 = Pad 2 (without them)
    let padMode = (coarse || 'ontouchstart' in window || navigator.maxTouchPoints > 0) ? 1 : 0;
    try { const sv = localStorage.getItem('sc-pad'); if (sv === '0' || sv === '1' || sv === '2') padMode = +sv; } catch (_) {}
    let padOn = padMode > 0;

    const $ = id => document.getElementById(id);
    const area = $('gameArea'), footer = $('padFooter'), zone = $('stickZone'), stickEl = $('stick'), knob = $('knob');
    const padBtn = $('padBtn'), pauseBtn = $('padPause'), fullBtn = $('padFull'), dragUI = $('dragUI'), dragDot = $('dragDot'), dbg = $('padDbg');
    if (!footer || !area) return;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    // gameState is a `let` in main.js, which loads after this file — a bare reference throws
    // (temporal dead zone) if touched too early, so always go through this guard.
    function isPlaying() { try { return gameState === 'playing'; } catch (_) { return false; } }

    // input.js asks this before grabbing the mouse (pointer lock): never lock while the pad is on
    window.touchPadActive = () => padOn;

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

    // The crosshair lives in the game view, so keep it centred there.
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
        const zr = zone.getBoundingClientRect(), R = stickR();
        // ring centre = exactly the touch point (it may overhang the zone edge; that's fine)
        stickEl.style.left   = (e.clientX - zr.left - R) + 'px';
        stickEl.style.top    = (e.clientY - zr.top  - R) + 'px';
        stickEl.style.bottom = 'auto';
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
        stickEl.style.left = ''; stickEl.style.top = ''; stickEl.style.bottom = '';   // back to resting bottom-left
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
    // Missile and Gun exist twice (left hand next to the stick, right hand in the diamond). Both copies drive the
    // same action; it stays on until every finger is off every copy of that button.
    const held = {};       // action name -> fingers currently down on its buttons
    const releasers = [];  // one release function per button (used to reset everything)
    document.querySelectorAll('#padFooter [data-t]').forEach(b => {
        const name = b.dataset.t, a = actions[name];
        let active = false;
        const press = () => { if (active) return; active = true; held[name] = (held[name] || 0) + 1; if (held[name] === 1) a.down(); b.classList.add('on'); };
        const release = () => { if (!active) return; active = false; held[name]--; if (held[name] <= 0) { held[name] = 0; a.up(); } b.classList.remove('on'); };
        releasers.push(release);
        b.addEventListener('pointerdown', e => {
            e.preventDefault();
            try { b.setPointerCapture(e.pointerId); } catch (_) {}
            press();
            padDebug(name + ' down');
        });
        b.addEventListener('pointerup', release);
        b.addEventListener('pointercancel', release);
        b.addEventListener('lostpointercapture', release);
    });
    footer.addEventListener('contextmenu', e => e.preventDefault());

    // ---- swipe the game view: the jet follows your finger ----
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
        document.body.classList.toggle('pad2', show && padMode === 2);
        padBtn.setAttribute('aria-pressed', String(padOn));
        padBtn.textContent = padMode === 0 ? 'Pad' : 'Pad ' + padMode;
        padBtn.hidden = !playing;
        pauseBtn.hidden = !playing;
        fullBtn.hidden = !playing || !fsReq;
        footer.hidden = !show;
        document.documentElement.classList.toggle('noscroll', playing);
        if (show !== lastShow) { lastShow = show; centerCursor(); }
        const anyHeld = Object.keys(held).some(k => held[k] > 0);
        if (!show && (drag || stick || anyHeld || touchYaw || touchPitch)) {
            releaseStick();
            releasers.forEach(r => r());
            for (const k in actions) actions[k].up();
            touchLookYaw = touchLookPitch = 0;
            drag = null; dragUI.style.display = 'none';
            if (dbg) dbg.textContent = '';
        }
    }
    padBtn.addEventListener('click', e => {
        e.currentTarget.blur();
        padMode = (padMode + 1) % 3;                  // Pad -> Pad 1 -> Pad 2 -> off
        padOn = padMode > 0;
        try { localStorage.setItem('sc-pad', String(padMode)); } catch (_) {}
        releasers.forEach(r => r());                  // a finger may have been on a button that just disappeared
        applyPad();
        // pad off -> desktop controls: grab the mouse again (this click is the user gesture the browser requires)
        if (!padOn && isPlaying() && typeof requestPointerLock === 'function') requestPointerLock();
    });
    pauseBtn.addEventListener('click', e => { e.currentTarget.blur(); if (isPlaying()) pauseGame(); });

    // ---- full screen on and off (like Gore Rush); on Android Chrome it also locks landscape ----
    const root = document.documentElement;
    const fsReq = root.requestFullscreen || root.webkitRequestFullscreen;
    const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement;
    function lockLandscape() { try { const o = screen.orientation; if (o && o.lock) { const q = o.lock('landscape'); if (q && q.catch) q.catch(() => {}); } } catch (_) {} }
    function unlockOrientation() { try { if (screen.orientation && screen.orientation.unlock) screen.orientation.unlock(); } catch (_) {} }
    fullBtn.addEventListener('click', e => {
        e.currentTarget.blur();
        try {
            if (fsEl()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
            else { const q = fsReq.call(root); if (q && q.then) q.then(lockLandscape).catch(() => {}); else lockLandscape(); }
        } catch (_) {}
    });
    ['fullscreenchange', 'webkitfullscreenchange'].forEach(n => document.addEventListener(n, () => {
        if (!fsEl()) unlockOrientation();
        fullBtn.setAttribute('aria-pressed', String(!!fsEl()));
        fullBtn.textContent = fsEl() ? 'Exit' : 'Full';
    }));
    if (window.ResizeObserver) new ResizeObserver(() => { if (!drag && padOn) centerCursor(); }).observe(area);
    setInterval(applyPad, 150);
    applyPad();
})();
