// js/input.js — Keyboard, mouse buttons, and cursor-position tracking
//
// Pointer lock is used during gameplay to confine the cursor to the window.
// When locked, the OS cursor is hidden and the centered #crosshair div serves as aim reticle.
// While locked, mouse / trackpad movement FLIES the jet: up/down = nose up/down, left/right = turn.
// Targeting is automatic (see ui.js), so the + crosshair stays fixed in the middle of the view.

const keys         = {};
const mouseButtons = {};

// Viewport-relative cursor position — locked to center during gameplay
let mouseScreenX = window.innerWidth  / 2;
let mouseScreenY = window.innerHeight / 2;

const MOUSE_LOOK_YAW   = 0.0030;   // radians of turn per pixel of mouse / trackpad movement
const MOUSE_LOOK_PITCH = 0.0030;   // radians of nose up/down per pixel

let _pointerLocked = false;
let lockCycleRequest = false; // Tab pressed — ui.js switches to the next target

function initInput() {
    // --- Keyboard ---
    window.addEventListener('keydown', (e) => {
        keys[e.code] = true;
        if (e.code === 'Space' || e.code.startsWith('Arrow')) e.preventDefault();
        if (e.code === 'Tab') { e.preventDefault(); if (!e.repeat) lockCycleRequest = true; }
    });
    window.addEventListener('keyup', (e) => { keys[e.code] = false; });

    // --- Mouse buttons ---
    document.addEventListener('mousedown', (e) => {
        mouseButtons[e.button] = true;
        if (e.button === 0) e.preventDefault();
    });
    document.addEventListener('mouseup', (e) => { mouseButtons[e.button] = false; });

    // --- Cursor position ---
    // Pointer-locked: accumulate movementX/Y to get a virtual cursor clamped to window.
    // Not locked (menu etc.): track raw clientX/Y as before.
    document.addEventListener('mousemove', (e) => {
        if (_pointerLocked) {
            // same channel the touch swipe uses (touch.js declares it, flight.js applies it each frame)
            if (typeof touchLookYaw !== 'undefined' && typeof gameState !== 'undefined' && gameState === 'playing') {
                touchLookYaw   += -e.movementX * MOUSE_LOOK_YAW;     // move left = turn left
                touchLookPitch += -e.movementY * MOUSE_LOOK_PITCH;   // move up = nose up
                touchLookHold = 0.35;
            }
        } else {
            mouseScreenX = e.clientX;
            mouseScreenY = e.clientY;
        }
    });

    // --- Pointer lock change ---
    document.addEventListener('pointerlockchange', () => {
        const wasLocked = _pointerLocked;
        _pointerLocked = !!document.pointerLockElement;
        if (_pointerLocked && !wasLocked) {
            // Just locked: start virtual cursor at screen center
            mouseScreenX = window.innerWidth  / 2;
            mouseScreenY = window.innerHeight / 2;
        }
        if (!_pointerLocked && wasLocked) {
            // Lock exited (ESC) during gameplay → pause, show menu with Continue button
            if (typeof gameState !== 'undefined' && gameState === 'playing') {
                if (typeof pauseGame === 'function') pauseGame();
            }
        }
    });
}

const deviceHasTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

function requestPointerLock() {
    // Like Gore Rush: never grab the mouse on a touch device, or while the touch pad is showing.
    // A locked pointer hides the cursor and swallows clicks, so Pad / Pause / the buttons would be dead.
    if (deviceHasTouch || (typeof touchPadActive === 'function' && touchPadActive())) return;
    try {
        const r = document.documentElement.requestPointerLock();
        if (r && r.catch) r.catch(() => {});
    } catch (_) {}
}

function exitPointerLock() {
    if (document.pointerLockElement) document.exitPointerLock();
}

function pollInput() { return { dx: 0, dy: 0 }; }
