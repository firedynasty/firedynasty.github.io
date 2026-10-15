// js/config.js — All tunable game constants
// Change a value here, save, refresh — no other file needs touching.

// =============================================================================
// FLIGHT — throttle-and-turn model (W/S = speed, A/D = yaw, fixed altitude)
// =============================================================================
const CRUISE_SPEED      = 100;    // Starting forward speed (units/s)
const MIN_SPEED         = 45;    // Minimum forward speed — a jet can't hover
const MAX_SPEED         = 200;   // Hard speed cap (units/s)
const THROTTLE_ACCEL    = 55;    // W/S speed change rate (units/s²)
const THROTTLE_DECEL    = 5;    // Passive speed bleed-off when W is not held (units/s²)
const YAW_SPEED         = 1.8;   // A/D max turn rate (radians/s)
const YAW_ACCEL         = 2.5;   // How fast yaw builds to full rate — higher = snappier (radians/s²)
const START_ALTITUDE    = 260;   // Where each level starts (above the flat start valley)
const FIXED_ALTITUDE    = START_ALTITUDE; // Legacy name — enemies now follow the player's real altitude
const ALT_CEILING       = 1700;  // Above this the jet is pushed back down
const PITCH_RATE        = 1.15;  // Max pitch rate with arrow keys (radians/s)
const PITCH_ACCEL       = 4.0;   // How fast pitch rate builds
const PITCH_MAX         = 1.15;  // Max nose angle up/down (radians, ~66 deg)
const PITCH_AUTOLEVEL   = 0.45;  // Rate the nose returns to level when no key is held (radians/s)
const PITCH_GRAVITY     = 75;    // Speed gained diving / lost climbing (units/s^2 at 90 deg)
const GROUND_CLEARANCE  = 7;     // Jet crashes (damage + bounce) below this height over terrain
const CRASH_DAMAGE      = 30;    // HP lost when you hit the ground
const PULLUP_LOOKAHEAD  = 2.6;   // Seconds ahead scanned for terrain (PULL UP warning)
const PULLUP_AUTO_T     = 0.9;   // Terrain closer than this many seconds -> automatic pull-up
const BANK_ANGLE        = 0.85;  // Max visual roll (radians) when turning A/D
const BANK_LERP         = 0.08;  // Bank angle smoothing

// Legacy — kept so audio/effects code that references them doesn't break
const FORWARD_THRUST    = 40;
const STRAFE_FORCE      = 60;
const DRAG              = 0.96;
const MOUSE_SENSITIVITY = 0.003;
const PITCH_LIMIT       = Math.PI * 0.44;

// =============================================================================
// BOUNDARY — keeps action from drifting infinitely far from origin
// =============================================================================
const BOUNDARY_RADIUS   = 4100;  // Distance before restoring force kicks in (units)
const BOUNDARY_FORCE    = 20;    // Restoring acceleration when outside boundary (units/s²)

// =============================================================================
// CAMERA
// =============================================================================
const FOV_NORMAL        = 75;    // Field of view during normal flight (degrees)
const FOV_BOOST         = 90;    // FOV at high speed (stretching effect)
const FOV_LERP          = 0.05;  // Speed of FOV transition
const CAMERA_LERP       = 0.08;  // Chase camera follow smoothness (0=instant)
const CAMERA_CHASE_OFFSET = new THREE.Vector3(0, 6, 14); // Behind/above jet
const CAMERA_SHAKE_INTENSITY = 0.4; // Max shake displacement on hit (units)
const CAMERA_SHAKE_DECAY     = 0.88; // Shake damping per frame

// =============================================================================
// PLAYER — health and damage feedback
// =============================================================================
const PLAYER_MAX_HP         = 150; // Full HP at level start
const PLAYER_INVINCIBLE_MS  = 800; // Invincibility window after taking a hit (ms)
const HIT_FLASH_DURATION_MS = 200; // Duration of red screen flash on hit (ms)

// =============================================================================
// WEAPONS — bullets (Space key, auto-fire)
// =============================================================================
const BULLET_SPEED      = 800;   // Bullet travel speed (units/s)
const BULLET_LIFETIME   = 1.5;   // Seconds before bullet disappears
const BULLET_POOL_SIZE  = 60;    // Pre-allocated bullet meshes — increase if fire gaps appear
const BULLET_FIRE_RATE  = 8;     // Rounds per second while Space held
const BULLET_DAMAGE     = 1;     // HP removed per bullet hit (drone has 1 HP = 1 shot)
const BULLET_SIZE       = 0.3;   // Visual radius of bullet sphere (units)
const BULLET_HEAT_FILL_TIME    = 1.5;  // Seconds of continuous fire to overheat
const BULLET_HEAT_COOL_TIME    = 2.0;  // Seconds to cool from full overheat to ready
const BULLET_PASSIVE_COOL_RATE = 0.7; // Heat fraction lost per second when not firing

// =============================================================================
// WEAPONS — missiles (LMB, single shot with cooldown)
// =============================================================================
const MISSILE_SPEED         = 550;  // Missile travel speed (units/s)
const MISSILE_TURN_SPEED    = 4.5;  // Homing turn rate (radians/s) — higher = tighter tracking
const MISSILE_LIFETIME      = 4;    // Seconds before missile self-destructs
const MISSILE_DAMAGE        = 25;   // HP removed on direct missile hit
const MISSILE_COOLDOWN      = 3;    // Seconds between missile shots
const MISSILE_HOME_CONE     = 60;   // Half-angle of targeting cone ahead of player (degrees)
const MISSILE_POOL_SIZE            = 10;   // Max simultaneous active missiles
const MISSILE_TRAIL_LENGTH         = 20;   // Max retained trail particles per missile (ring buffer size)
const MISSILE_DRONE_SPLASH_RADIUS  = 30;   // Explosion radius for straight-shot drone missiles

// =============================================================================
// ENEMIES — kamikaze drone (drone1.glb)
// =============================================================================
const DRONE_SPEED           = 40;   // Approach speed (units/s)
const DRONE_HP              = 2;    // Hits to destroy
const DRONE_EXPLODE_RADIUS  = 25;   // Distance at which drone detonates (units)
const DRONE_EXPLODE_DAMAGE  = 20;   // Player HP lost on drone explosion
const DRONE_SCALE           = 2.5;  // GLB scale multiplier — larger = easier to shoot
const DRONE_SCORE           = 10;   // Points for destroying a drone

// =============================================================================
// ENEMIES — fighter jet (enemy-jet.glb)
// =============================================================================
const JET_SPEED             = 100;   // Approach/orbit speed (units/s)
const JET_HP                = 3;    // Bullet hits to destroy (missile = 3 HP so 1-shot)
const JET_BULLET_INTERVAL   = 3;    // Seconds between bullet bursts
const JET_BULLET_BURST      = 3;    // Bullets per burst
const JET_BULLET_SPEED      = 300;  // Enemy bullet speed — slower than player's 800
const JET_BULLET_DAMAGE     = 10;   // Player HP per enemy bullet
const JET_MISSILE_INTERVAL         = 10;    // Seconds between enemy missile shots
const JET_MISSILE_MIN_DIST         = 130;  // Jets won't fire missiles closer than this (break-off at 120)
const JET_MISSILE_DAMAGE           = 20;   // Player HP per enemy missile
const JET_MISSILE_SPEED_MULT       = 0.5;  // Enemy missile speed relative to MISSILE_SPEED (1.0 = same as player)
const JET_MISSILE_PROXIMITY_RADIUS = 10;   // Proximity detonation — bomb explodes within this distance
const JET_EVADE_DURATION    = 1.5;  // Seconds jet evades after player missile locks on
const JET_EVADE_COOLDOWN    = 4.0;  // Seconds before same jet can evade again (prevents constant dodging)
const JET_FLANK_CHANCE      = 0.05;  // Probability (0–1) jet breaks for a flanking approach
const JET_SCALE             = 1.0;  // GLB scale multiplier
const JET_SCORE             = 50;   // Points for destroying a jet

// =============================================================================
// ENEMY SPAWNING
// =============================================================================
const ENEMY_SPAWN_RADIUS    = 700;  // Sphere radius around player where enemies appear — jets need room to orbit
const ENEMY_FRONT_BIAS      = 0.7;  // 0=full sphere spawn, 1=front hemisphere only
const WAVE_START_DELAY_MS   = 2000; // Pause before first enemy appears in a wave (ms)
const WAVE_CLEAR_PAUSE_MS   = 3000; // "Wave cleared!" banner duration between waves (ms)

// Drone chase — drones only pursue player within this distance
const DRONE_CHASE_RANGE     = 300;  // Units — farther than this, drones hover in place

// Jet orbital flight — jets circle at distance, swoop in to attack
const JET_ORBIT_RADIUS        = 380;  // Units — radius of orbit around player (closer = more aggressive)
const JET_ORBIT_SPEED         = 0.18; // Radians/s — orbit angular speed (full lap ≈ 35s)
const JET_ENGAGE_RANGE        = 350;  // Units — jets switch to attack when orbit brings them within this distance
const JET_ATTACK_ORBIT_RADIUS = 190;  // Units — jets orbit at this range during attack state (circle, don't charge)

// Player barrel roll dodge
const FLIP_COOLDOWN              = 1.0;  // Seconds between barrel rolls
const FLIP_DURATION              = 0.8;  // Seconds to complete one roll animation (longer = smoother)
const FLIP_DODGE_FORCE           = 160;  // Lateral velocity kick during roll (units/s)

// Incoming missile threat — time-to-impact warning
const INCOMING_MISSILE_WARN_TIME = 2.0;  // Seconds of ETA before warning triggers

// =============================================================================
// RADAR — sonar-style minimap
// =============================================================================
// =============================================================================
// TARGETING — mouse-hover enemy lock system
// =============================================================================
const AUTO_LOCK_CONE    = 40;   // Degrees from nose within which enemies are auto-locked
const AUTO_LOCK_BREAK   = 65;   // Lock is kept until the target leaves this cone (degrees)
const AUTO_LOCK_RANGE   = 1400; // Max auto-lock distance
const LOCK_STEER_GAIN   = 2.2;  // How hard the jet turns toward its lock when you aren't pressing A/D
const LOCK_STEER_CONE   = 80;   // Degrees — steering assist only works within this angle
const LOCK_RADIUS_PX    = 70;   // Pixel radius around cursor that triggers enemy lock

const RADAR_SIZE            = 160;  // Canvas diameter (pixels)
const RADAR_RANGE           = 1200; // World units represented by full radar radius
const RADAR_SWEEP_SPEED     = 1.2;  // Rotations per second of sweep line
const RADAR_DOT_SIZE        = 4;    // Enemy dot radius (pixels)
const RADAR_DOT_FADE        = 3.0;  // Seconds for dot to fade after sweep passes it

// =============================================================================
// VISUAL EFFECTS
// =============================================================================
const PARTICLE_POOL_SIZE           = 500; // Total particle pool (shared across all effects)
const SPEED_LINE_COUNT             = 80;  // Speed line segments at high velocity
const SPEED_LINE_THRESHOLD         = 0.6; // Fraction of MAX_SPEED at which speed lines appear (0–1)
const SPEED_DISPLAY_MAX            = 250; // Max value shown on speed gauge (visual scale only)
const EXPLOSION_PARTICLE_COUNT     = 40;  // Particles per enemy death explosion
const MISSILE_TRAIL_PARTICLE_COUNT = 5;   // Particles per frame per active missile

// =============================================================================
// PERFORMANCE
// =============================================================================
const TARGET_FPS            = 60;   // Hard frame-rate cap — prevents overheating on fast monitors

// =============================================================================
// SCENE & ENVIRONMENT
// =============================================================================
const SKY_BACKGROUND_COLOR    = 0x87ceeb; // Fallback sky colour if skybox asset fails
const AMBIENT_LIGHT_COLOR     = 0xffffff; // White ambient — neutral daylight fill
const AMBIENT_LIGHT_INTENSITY = 1.2;      // Daytime — brighter than old cyberpunk scene
const SUN_COLOR               = 0xfff4e0; // Warm directional light (sun)
const SUN_INTENSITY           = 1.5;
const FOG_COLOR               = 0xc9e8f0; // Atmospheric haze (pale sky blue)
const FOG_NEAR                = 1200;      // Fog begins at this distance (units)
const FOG_FAR                 = 6500;     // Fully opaque fog at this distance

// =============================================================================
// AUDIO VOLUMES (0.0 – 1.0)
// =============================================================================
const VOL_MASTER         = 0.8;  // Global output level — scales everything
const VOL_MUSIC          = 0.8; // Background music loop
const VOL_ENGINE         = 0.2;  // Player jet engine hum (looping, cross-fades idle↔boost)
const VOL_BULLET_FIRE    = 0.5;  // Bullet fire click (fires 8×/sec — keep modest)
const VOL_MISSILE_LAUNCH = 0.7;  // Player missile whoosh
const VOL_EXPLOSION      = 0.8;  // Enemy death explosion
const VOL_PLAYER_HIT     = 1.0;  // Impact when player takes damage — loud and noticeable
const VOL_JET_FLYBY      = 0.55; // Enemy jet passes close (Doppler whoosh)
const VOL_BARREL_ROLL    = 0.9;  // R key barrel roll dodge
const VOL_LOCK_ON        = 0.5;  // Missile lock acquired on enemy
const VOL_LOCK_LOST      = 0.4;  // Missile lock lost
const VOL_MISSILE_ALERT  = 0.9;  // Incoming missile warning — loud, safety-critical
const VOL_WAVE_START     = 0.8;  // New wave begins
const VOL_WAVE_CLEARED   = 0.7;  // All wave enemies defeated
const VOL_LEVEL_COMPLETE = 1.0;  // All waves cleared — level complete
const VOL_GAME_OVER      = 1.0;  // Player HP reaches 0

// =============================================================================
// JET APPEARANCE (reused from drone.js createDrone)
// =============================================================================
const DRONE_WINGSPAN    = 10;   // Target wingspan used for auto-scaling GLB (×DRONE_SCALE for effective size)

// Jet colour presets — selected in Customize modal, saved to localStorage as 'dronePreset'
const DRONE_PRESETS = {
    cyan:   { name: 'Cyan',   accent: 0x00ffff, particle: 0x00cccc },
    red:    { name: 'Red',    accent: 0xff2200, particle: 0xff4400 },
    green:  { name: 'Green',  accent: 0x00ff44, particle: 0x00cc33 },
    orange: { name: 'Orange', accent: 0xff8800, particle: 0xff6600 },
};
