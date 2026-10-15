// js/levels.js — Level data loader and unlock state helpers
// Fetches assets/levels.json at startup. Must be served over HTTP (not file://).
//
// API:
//   loadLevels()           — call once from finishLoading(); async via fetch
//   getLevelData(id)       — returns level object or null
//   isLevelUnlocked(id)    — true if unlocked
//   unlockLevel(id)        — save unlock to localStorage
//   getUnlockedLevels()    — array of unlocked level IDs
//   getTotalLevels()       — total number of levels

let levelsData = [];

const LEVELS_STORAGE_KEY = 'skyCombat_unlockedLevels';

function loadLevels(onReady) {
    fetch('assets/levels.json')
        .then(res => {
            if (!res.ok) throw new Error('levels.json HTTP ' + res.status);
            return res.json();
        })
        .then(data => {
            levelsData = data.levels;
            console.log('Levels loaded:', levelsData.length, 'levels');
            unlockLevel(1);
            if (typeof onReady === 'function') onReady();
        })
        .catch(err => {
            console.error('Failed to load levels.json — using fallback:', err);
            levelsData = _fallbackLevels();
            unlockLevel(1);
            if (typeof onReady === 'function') onReady();
        });
}

function getLevelData(id) {
    return levelsData.find(l => l.id === id) || null;
}

function isLevelUnlocked(id) {
    return getUnlockedLevels().includes(id);
}

function unlockLevel(id) {
    const unlocked = getUnlockedLevels();
    if (!unlocked.includes(id)) {
        unlocked.push(id);
        localStorage.setItem(LEVELS_STORAGE_KEY, JSON.stringify(unlocked));
    }
}

function getUnlockedLevels() {
    const data = localStorage.getItem(LEVELS_STORAGE_KEY);
    return data ? JSON.parse(data) : [1, 2];
}

function getTotalLevels() {
    return levelsData.length;
}

function _fallbackLevels() {
    return [
        { id: 1, name: 'First Contact', description: 'Drone swarms incoming.',
          waves: [
            { wave: 1, drones: 6,  jets: 0 },
            { wave: 2, drones: 10, jets: 0 },
            { wave: 3, drones: 14, jets: 0 }
          ]
        }
    ];
}
