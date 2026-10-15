// js/input.js — Keyboard, mouse buttons, and cursor-position tracking
//
// Pointer lock is used during gameplay to confine the cursor to the window.
// When locked, the OS cursor is hidden and the centered #crosshair div serves as aim reticle.
// mouseScreenX/Y are kept at window center while locked (targeting uses drone forward vector).

const keys         = {};
const mouseButtons = {};

// Viewport-relative cursor position — locked to center during gameplay
let mouseScreenX = window.innerWidth  / 2;
let mouseScreenY = window.innerHeight / 2;

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
            mouseScreenX = Math.max(0, Math.min(window.innerWidth,  mouseScreenX + e.movementX));
            mouseScreenY = Math.max(0, Math.min(window.innerHeight, mouseScreenY + e.movementY));
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

function requestPointerLock() {
    document.documentElement.requestPointerLock();
}

function exitPointerLock() {
    if (document.pointerLockElement) document.exitPointerLock();
}

function pollInput() { return { dx: 0, dy: 0 }; }
