Gauntlet = function() {

  'use strict';

  //===========================================================================
  // CONFIGURATION CONSTANTS and ENUM's
  //===========================================================================

  var VERSION  = "1.0.0",
      FPS      = 60,
      TILE     = 32,
      STILE    = 32,
      VIEWPORT = { TW: 24, TH: 24 },
      DIR      = { UP: 0, UPRIGHT: 1, RIGHT: 2, DOWNRIGHT: 3, DOWN: 4, DOWNLEFT: 5, LEFT: 6, UPLEFT: 7 },
      PLAYER = {
        WARRIOR:  { sx: 0, sy: 0, frames: 3, fpf: FPS/10, health: 500, speed: 200/FPS, damage: 50/FPS, armor: 3, magic: 16, weapon: { speed: 600/FPS, reload: 0.40*FPS, damage: 4, rotate: true,  sx: 24, sy: 0, fpf: FPS/10, player: true }, sex: "male",   name: "warrior"  }, // Thor
        VALKYRIE: { sx: 0, sy: 1, frames: 3, fpf: FPS/10, health: 500, speed: 220/FPS, damage: 40/FPS, armor: 2, magic: 16, weapon: { speed: 620/FPS, reload: 0.35*FPS, damage: 4, rotate: false, sx: 24, sy: 1, fpf: FPS/10, player: true }, sex: "female", name: "valkyrie" }, // Thyra
        WIZARD:   { sx: 0, sy: 2, frames: 3, fpf: FPS/10, health: 500, speed: 240/FPS, damage: 30/FPS, armor: 1, magic: 32, weapon: { speed: 640/FPS, reload: 0.30*FPS, damage: 6, rotate: false, sx: 24, sy: 2, fpf: FPS/10, player: true }, sex: "male",   name: "wizard"   }, // Merlin
        ELF:      { sx: 0, sy: 3, frames: 3, fpf: FPS/10, health: 500, speed: 260/FPS, damage: 20/FPS, armor: 1, magic: 24, weapon: { speed: 660/FPS, reload: 0.25*FPS, damage: 6, rotate: false, sx: 24, sy: 3, fpf: FPS/10, player: true }, sex: "male",   name: "elf"      }  // Questor
      },
      MONSTER = {
        GHOST:  { sx: 0, sy: 4, frames: 3, fpf: FPS/10, score:  10, health:  4, speed: 140/FPS, damage: 100/FPS, selfharm: 30/FPS, canbeshot: true,  canbehit: false, invisibility: false,                     travelling: 0.5*FPS, thinking: 0.5*FPS, generator: { health:  8, speed: 2.5*FPS, max: 40, score: 100, sx: 32, sy: 4 }, name: "ghost",  weapon: null                                                                                     },
        DEMON:  { sx: 0, sy: 5, frames: 3, fpf: FPS/10, score:  20, health:  4, speed:  80/FPS, damage:  60/FPS, selfharm: 0,      canbeshot: true,  canbehit: true,  invisibility: false,                     travelling: 0.5*FPS, thinking: 0.5*FPS, generator: { health: 16, speed: 3.0*FPS, max: 40, score: 200, sx: 32, sy: 5 }, name: "demon",  weapon: { speed: 240/FPS, reload: 2*FPS, damage: 10, sx: 24, sy: 5, fpf: FPS/10, monster: true } },
        GRUNT:  { sx: 0, sy: 6, frames: 3, fpf: FPS/10, score:  30, health:  8, speed: 120/FPS, damage:  60/FPS, selfharm: 0,      canbeshot: true,  canbehit: true,  invisibility: false,                     travelling: 0.5*FPS, thinking: 0.5*FPS, generator: { health: 16, speed: 3.5*FPS, max: 40, score: 300, sx: 32, sy: 6 }, name: "grunt",  weapon: null                                                                                     },
        WIZARD: { sx: 0, sy: 7, frames: 3, fpf: FPS/10, score:  30, health:  8, speed: 120/FPS, damage:  60/FPS, selfharm: 0,      canbeshot: true,  canbehit: true,  invisibility: { on: 3*FPS, off: 6*FPS }, travelling: 0.5*FPS, thinking: 0.5*FPS, generator: { health: 24, speed: 4.0*FPS, max: 20, score: 400, sx: 32, sy: 8 }, name: "wizard", weapon: null                                                                                     },
        DEATH:  { sx: 0, sy: 8, frames: 3, fpf: FPS/10, score: 500, health: 12, speed: 180/FPS, damage: 120/FPS, selfharm: 6/FPS,  canbeshot: false, canbehit: false, invisibility: false,                     travelling: 0.5*FPS, thinking: 0.5*FPS, generator: { health: 16, speed: 5.0*FPS, max: 10, score: 500, sx: 32, sy: 9 }, name: "death",  weapon: null                                                                                     }
      },
      TREASURE = {
        HEALTH:  { sx: 0, sy: 9, frames: 1, fpf: FPS/10, score:  10, health:  50,   sound: 'potion' },
        POISON:  { sx: 1, sy: 9, frames: 1, fpf: FPS/10, score:   0, damage:  50,   sound: 'potion' },
        FOOD1:   { sx: 2, sy: 9, frames: 1, fpf: FPS/10, score:  10, health:  20,   sound: 'food'   },
        FOOD2:   { sx: 3, sy: 9, frames: 1, fpf: FPS/10, score:  10, health:  30,   sound: 'food'   },
        FOOD3:   { sx: 4, sy: 9, frames: 1, fpf: FPS/10, score:  10, health:  40,   sound: 'food'   },
        KEY:     { sx: 5, sy: 9, frames: 1, fpf: FPS/10, score:  20, key:    true,  sound: 'key'    },
        POTION:  { sx: 6, sy: 9, frames: 1, fpf: FPS/10, score:  50, potion: true,  sound: 'potion' },
        GOLD:    { sx: 7, sy: 9, frames: 3, fpf: FPS/10, score: 100,                sound: 'gold'   }
      },
      DOOR = {
        HORIZONTAL: { sx: 10, sy: 9, speed: 0.05*FPS, horizontal: true,  vertical: false, dx: 2, dy: 0 },
        VERTICAL:   { sx: 11, sy: 9, speed: 0.05*FPS, horizontal: false, vertical: true,  dx: 0, dy: 8 },
        EXIT:       { sx: 12, sy: 9, speed: 3*FPS, fpf: FPS/30 },
      },
      FX = {
        GENERATOR_DEATH: { sx: 13, sy: 9, frames: 6, fpf: FPS/10 },
        MONSTER_DEATH:   { sx: 13, sy: 9, frames: 6, fpf: FPS/20 },
        WEAPON_HIT:      { sx: 19, sy: 9, frames: 2, fpf: FPS/20 },
        PLAYER_GLOW:     { frames: FPS/2, border: 5 }
      },
      PLAYERS   = [ PLAYER.WARRIOR, PLAYER.VALKYRIE, PLAYER.WIZARD, PLAYER.ELF ],
      MONSTERS  = [ MONSTER.GHOST, MONSTER.DEMON, MONSTER.GRUNT, MONSTER.WIZARD, MONSTER.DEATH ],
      TREASURES = [ TREASURE.HEALTH, TREASURE.POISON, TREASURE.FOOD1, TREASURE.FOOD2, TREASURE.FOOD3, TREASURE.KEY, TREASURE.POTION, TREASURE.GOLD ],
      CBOX = {
        FULL:    { x: 0,      y: 0,      w: TILE,   h: TILE          },
        PLAYER:  { x: TILE/4, y: TILE/4, w: TILE/2, h: TILE - TILE/4 },
        WEAPON:  { x: TILE/3, y: TILE/3, w: TILE/3, h: TILE/3        },
        MONSTER: { x: 1,      y: 1,      w: TILE-2, h: TILE-2        }, // give monsters 1px wiggle room to get through tight corridors
      },
      PIXEL = {
        NOTHING:        0x000000, // BLACK
        DOOR:           0xC0C000, // YELLOW
        WALL:           0x404000, // DARK YELLOW
        GENERATOR:      0xF00000, // RED
        MONSTER:        0x400000, // DARK RED
        START:          0x00F000, // GREEN
        TREASURE:       0x008000, // MEDIUM GREEN
        EXIT:           0x004000, // DARK GREEN
        MASK: {
          TYPE:         0xFFFF00,
          EXHIGH:       0x0000F0,
          EXLOW:        0x00000F
        }
      },
      FLOOR = { BROWN_BOARDS: 1, LIGHBROWN_BOARDS: 2, GREEN_BOARDS: 3, GREY_BOARDS: 4, WOOD: 5, LIGHT_STONE: 6, DARK_STONE: 7, BROWN_LAMINATE: 8, PURPLE_LAMINATE: 9, MIN: 1, MAX: 9 },
      WALL  = { BLUE: 1, BLUE_BRICK: 2, PURPLE_TILE: 3, BLUE_COBBLE: 4, PURPLE_COBBLE: 5, CONCRETE: 6, MIN: 1, MAX: 6 },
      EVENT = {
        START_LEVEL:         0,
        PLAYER_JOIN:         1,
        PLAYER_LEAVE:        2,
        PLAYER_EXITING:      3,
        PLAYER_EXIT:         4,
        PLAYER_DEATH:        5,
        PLAYER_NUKE:         6,
        PLAYER_FIRE:         7,
        PLAYER_HURT:         8,
        PLAYER_HEAL:         9,
        MONSTER_DEATH:      10,
        MONSTER_FIRE:       11,
        GENERATOR_DEATH:    12,
        DOOR_OPENING:       13,
        DOOR_OPEN:          14,
        TREASURE_COLLECTED: 15,
        PLAYER_COLLIDE:     16,
        MONSTER_COLLIDE:    17,
        WEAPON_COLLIDE:     18,
        FX_FINISHED:        19,
        HIGH_SCORE:         20
      },
      STORAGE = {
        VERSION: "gauntlet.version",
        NLEVEL:  "gauntlet.nlevel",
        SCORE:   "gauntlet.score",
        WHO:     "gauntlet.who"
      },
      DEBUG = {
        RESET:      Game.qsBool("reset"),
        GRID:       Game.qsBool("grid"),
        NOMONSTERS: Game.qsBool("nomonsters"),
        NODAMAGE:   Game.qsBool("nodamage"),
        NOAUTOHURT: Game.qsBool("noautohurt"),
        POTIONS:    Game.qsNumber("potions"),
        KEYS:       Game.qsNumber("keys"),
        LEVEL:      Game.qsNumber("level"),
        PLAYER:     (Game.qsValue("player") || "warrior").toUpperCase(),
        WALL:       Game.qsNumber("wall"),
        FLOOR:      Game.qsNumber("floor"),
        MUSIC:      Game.qsValue("music"),
        HEAP:       Game.qsBool("heap"),
        DEMO:       Game.qsBool("demo"),
        ALLIES:     ((/[?&]allies=([^&]*)/.exec(window.location.search) || [])[1] || "").replace(/%2C/gi, ",") // e.g. ?allies=valkyrie,wizard,elf
      },
      DIRV = [ [0,-1], [0.7071,-0.7071], [1,0], [0.7071,0.7071], [0,1], [-0.7071,0.7071], [-1,0], [-0.7071,-0.7071] ], // unit vector for each DIR
      AUTO = { RANGE: 7, AIM: 14, REPLAN: 20, LANE: 4, TRAIL_GAP: 14, SLOTS: [ { back: 44, side: 44 }, { back: 44, side: -44 }, { back: 88, side: 0 } ] };

  //---------------------------------------------------------------------------

  var PREFERRED_DIRECTIONS = {};
  PREFERRED_DIRECTIONS[DIR.UPLEFT]    = [ DIR.UPLEFT,    DIR.LEFT,     DIR.UP,        DIR.UPRIGHT,  DIR.DOWNLEFT  ];
  PREFERRED_DIRECTIONS[DIR.UPRIGHT]   = [ DIR.UPRIGHT,   DIR.RIGHT,    DIR.UP,        DIR.UPLEFT,   DIR.DOWNRIGHT ];
  PREFERRED_DIRECTIONS[DIR.DOWNLEFT]  = [ DIR.DOWNLEFT,  DIR.LEFT,     DIR.DOWN,      DIR.UPLEFT,   DIR.DOWNRIGHT ];
  PREFERRED_DIRECTIONS[DIR.DOWNRIGHT] = [ DIR.DOWNRIGHT, DIR.RIGHT,    DIR.DOWN,      DIR.DOWNLEFT, DIR.UPRIGHT   ];
  PREFERRED_DIRECTIONS[DIR.UP]        = [ DIR.UP,        DIR.UPLEFT,   DIR.UPRIGHT,   DIR.LEFT,     DIR.RIGHT     ];
  PREFERRED_DIRECTIONS[DIR.DOWN]      = [ DIR.DOWN,      DIR.DOWNLEFT, DIR.DOWNRIGHT, DIR.LEFT,     DIR.RIGHT     ];
  PREFERRED_DIRECTIONS[DIR.LEFT]      = [ DIR.LEFT,      DIR.UPLEFT,   DIR.DOWNLEFT,  DIR.UP,       DIR.DOWN      ];
  PREFERRED_DIRECTIONS[DIR.RIGHT]     = [ DIR.RIGHT,     DIR.UPRIGHT,  DIR.DOWNRIGHT, DIR.UP,       DIR.DOWN      ];

  var SLIDE_DIRECTIONS = {};
  SLIDE_DIRECTIONS[DIR.UPLEFT]    = [ DIR.UPLEFT,    DIR.UP,   DIR.LEFT  ];
  SLIDE_DIRECTIONS[DIR.UPRIGHT]   = [ DIR.UPRIGHT,   DIR.UP,   DIR.RIGHT ];
  SLIDE_DIRECTIONS[DIR.DOWNLEFT]  = [ DIR.DOWNLEFT,  DIR.DOWN, DIR.LEFT  ];
  SLIDE_DIRECTIONS[DIR.DOWNRIGHT] = [ DIR.DOWNRIGHT, DIR.DOWN, DIR.RIGHT ];
  SLIDE_DIRECTIONS[DIR.UP]        = [ DIR.UP    ];
  SLIDE_DIRECTIONS[DIR.DOWN]      = [ DIR.DOWN  ];
  SLIDE_DIRECTIONS[DIR.LEFT]      = [ DIR.LEFT  ];
  SLIDE_DIRECTIONS[DIR.RIGHT]     = [ DIR.RIGHT ];

  //===========================================================================
  // CONFIGURATION
  //===========================================================================

  var cfg = {

    runner: {
      fps:   FPS,
      stats: true
    },

    state: {
      initial: 'booting',
      events: [
        { name: 'ready',  from: 'booting',               to: 'menu'     }, // initial page loads images and sounds then transitions to 'menu'
        { name: 'start',  from: 'menu',                  to: 'starting' }, // start a new game from the menu
        { name: 'load',   from: ['starting', 'playing'], to: 'loading'  }, // start loading a new level (either to start a new game, or next level while playing)
        { name: 'play',   from: 'loading',               to: 'playing'  }, // play the level after loading it
        { name: 'help',   from: ['loading', 'playing'],  to: 'help'     }, // pause the game to show a help topic
        { name: 'resume', from: 'help',                  to: 'playing'  }, // resume playing after showing a help topic
        { name: 'lose',   from: 'playing',               to: 'lost'     }, // player died
        { name: 'quit',   from: 'playing',               to: 'lost'     }, // player quit
        { name: 'win',    from: 'playing',               to: 'won'      }, // player won
        { name: 'finish', from: ['won', 'lost'],         to: 'menu'     }  // back to menu
      ]
    },

    pubsub: [
      { event: EVENT.MONSTER_DEATH,      action: function(monster, by, nuke) { this.onMonsterDeath(monster, by, nuke);     } },
      { event: EVENT.GENERATOR_DEATH,    action: function(generator, by)     { this.onGeneratorDeath(generator, by);       } },
      { event: EVENT.DOOR_OPENING,       action: function(door, speed)       { this.onDoorOpening(door, speed);            } },
      { event: EVENT.DOOR_OPEN,          action: function(door)              { this.onDoorOpen(door);                      } },
      { event: EVENT.TREASURE_COLLECTED, action: function(treasure, player)  { this.onTreasureCollected(treasure, player); } },
      { event: EVENT.WEAPON_COLLIDE,     action: function(weapon, entity)    { this.onWeaponCollide(weapon, entity);       } },
      { event: EVENT.PLAYER_COLLIDE,     action: function(player, entity)    { this.onPlayerCollide(player, entity);       } },
      { event: EVENT.MONSTER_COLLIDE,    action: function(monster, entity)   { this.onMonsterCollide(monster, entity);     } },
      { event: EVENT.PLAYER_NUKE,        action: function(player)            { this.onPlayerNuke(player);                  } },
      { event: EVENT.PLAYER_FIRE,        action: function(player)            { this.onPlayerFire(player);                  } },
      { event: EVENT.MONSTER_FIRE,       action: function(monster)           { this.onMonsterFire(monster);                } },
      { event: EVENT.PLAYER_EXITING,     action: function(player, exit)      { this.onPlayerExiting(player, exit);         } },
      { event: EVENT.PLAYER_EXIT,        action: function(player)            { this.onPlayerExit(player);                  } },
      { event: EVENT.FX_FINISHED,        action: function(fx)                { this.onFxFinished(fx);                      } },
      { event: EVENT.PLAYER_DEATH,       action: function(player)            { this.onPlayerDeath(player);                 } }
    ],

    images: [
      { id: 'backgrounds', url: "images/backgrounds.png" }, // http://opengameart.org/content/gauntlet-like-tiles
      { id: 'entities',    url: "images/entities.png"    }  // http://opengameart.org/forumtopic/request-for-tileset-spritesheet-similar-to-gauntlet-ii 
    ],

    sounds: [
      { id: 'lostcorridors',   name: 'sounds/music.lostcorridors',   formats: ['mp3', 'ogg'], volume: 1.0, loop: true             }, // http://luckylionstudios.com/
      { id: 'bloodyhalo',      name: 'sounds/music.bloodyhalo',      formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, // (ditto)
      { id: 'citrinitas',      name: 'sounds/music.citrinitas',      formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, //
      { id: 'fleshandsteel',   name: 'sounds/music.fleshandsteel',   formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, //
      { id: 'mountingassault', name: 'sounds/music.mountingassault', formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, //
      { id: 'phantomdrone',    name: 'sounds/music.phantomdrone',    formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, //
      { id: 'thebeginning',    name: 'sounds/music.thebeginning',    formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, //
      { id: 'warbringer',      name: 'sounds/music.warbringer',      formats: ['mp3', 'ogg'], volume: 0.5, loop: true             }, //
      { id: 'gameover',        name: 'sounds/gameover',              formats: ['mp3', 'ogg'], volume: 0.5                         }, //
      { id: 'victory',         name: 'sounds/victory',               formats: ['mp3', 'ogg'], volume: 1.0                         }, //
      { id: 'femalepain1',     name: 'sounds/femalepain1',           formats: ['mp3', 'ogg'], volume: 0.3                         }, // http://www.premiumbeat.com/sfx/
      { id: 'femalepain2',     name: 'sounds/femalepain2',           formats: ['mp3', 'ogg'], volume: 0.3                         }, // (ditto)
      { id: 'malepain1',       name: 'sounds/malepain1',             formats: ['mp3', 'ogg'], volume: 0.3                         }, //
      { id: 'malepain2',       name: 'sounds/malepain2',             formats: ['mp3', 'ogg'], volume: 0.3                         }, //
      { id: 'exitlevel',       name: 'sounds/exitlevel',             formats: ['mp3', 'ogg'], volume: 1.0,                        }, //
      { id: 'highscore',       name: 'sounds/highscore',             formats: ['mp3', 'ogg'], volume: 1.0,                        }, //
      { id: 'firewarrior',     name: 'sounds/firewarrior',           formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //   NOTE: ie has limit of 40 <audio> so be careful with pool amounts
      { id: 'firevalkyrie',    name: 'sounds/firevalkyrie',          formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'firewizard',      name: 'sounds/firewizard',            formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'fireelf',         name: 'sounds/fireelf',               formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'collectgold',     name: 'sounds/collectgold',           formats: ['mp3', 'ogg'], volume: 0.5, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'collectpotion',   name: 'sounds/collectpotion',         formats: ['mp3', 'ogg'], volume: 0.5, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'collectkey',      name: 'sounds/collectkey',            formats: ['mp3', 'ogg'], volume: 0.5, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'collectfood',     name: 'sounds/collectfood',           formats: ['mp3', 'ogg'], volume: 0.5, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'generatordeath',  name: 'sounds/generatordeath',        formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'monsterdeath1',   name: 'sounds/monsterdeath1',         formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'monsterdeath2',   name: 'sounds/monsterdeath2',         formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'monsterdeath3',   name: 'sounds/monsterdeath3',         formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 }, //
      { id: 'opendoor',        name: 'sounds/opendoor',              formats: ['mp3', 'ogg'], volume: 0.3, pool: ua.is.ie ? 2 : 4 } //
    ],

    levels: [
      { name: 'Test Level',     url: "levels/testlevel.png", floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: null }, 
      { name: 'Training',       url: "levels/trainer1.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Shoot ghosts and find the exit" },
      { name: 'Training Two',   url: "levels/trainer2.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Watch out for demon fire" },
      { name: 'Training Three', url: "levels/trainer3.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Find keys to open doors" },
      { name: 'Training Four',  url: "levels/trainer4.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Eat and drink to restore health" },
      { name: 'Training Five',  url: "levels/trainer5.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Collect treasure for high score" },
      { name: 'Training Six',   url: "levels/trainer6.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Destroy monster generators" },
      { name: 'Training Seven', url: "levels/trainer7.png",  floor: FLOOR.LIGHT_STONE,      wall: WALL.BLUE_COBBLE,      music: 'bloodyhalo',      score:  1000, help: "Use potions to destroy all monsters" },
      { name: 'Dungeon One',    url: "levels/level1.png",    floor: FLOOR.WOOD,             wall: WALL.CONCRETE,         music: 'citrinitas',      score:  1000, help: "Training is over!<br><br> Welcome to the Dungeon!" },
      { name: 'Dungeon Two',    url: "levels/level2.png",    floor: FLOOR.WOOD,             wall: WALL.CONCRETE,         music: 'citrinitas',      score:  2000, help: null },
      { name: 'Dungeon Three',  url: "levels/level3.png",    floor: FLOOR.DARK_STONE,       wall: WALL.BLUE,             music: 'fleshandsteel',   score:  3000, help: null },
      { name: 'Dungeon Four',   url: "levels/level4.png",    floor: FLOOR.DARK_STONE,       wall: WALL.BLUE,             music: 'fleshandsteel',   score:  4000, help: null },
      { name: 'Dungeon Five',   url: "levels/level5.png",    floor: FLOOR.BROWN_LAMINATE,   wall: WALL.CONCRETE,         music: 'phantomdrone',    score:  5000, help: null },
      { name: 'Dungeon Six',    url: "levels/level6.png",    floor: FLOOR.BROWN_LAMINATE,   wall: WALL.CONCRETE,         music: 'phantomdrone',    score:  6000, help: null },
      { name: 'Dungeon Seven',  url: "levels/level7.png",    floor: FLOOR.PURPLE_LAMINATE,  wall: WALL.PURPLE_COBBLE,    music: 'thebeginning',    score:  7000, help: null },
      { name: 'Dungeon Eight',  url: "levels/level8.png",    floor: FLOOR.WOOD,             wall: WALL.BLUE_BRICK,       music: 'mountingassault', score:  8000, help: null },
      { name: 'Dungeon Nine',   url: "levels/level9.png",    floor: FLOOR.PURPLE_LAMINATE,  wall: WALL.CONCRETE,         music: 'fleshandsteel',   score:  9000, help: null },
      { name: 'Dungeon Ten',    url: "levels/level10.png",   floor: FLOOR.WOOD,             wall: WALL.BLUE_BRICK,       music: 'warbringer',      score: 10000, help: "Final Level<br><br>Good Luck!" }
    ],

    keys: [
      { key: Game.Key.ONE,    mode: 'up',   state: 'menu',    action: function()    { this.start(PLAYER.WARRIOR);      } },
      { key: Game.Key.TWO,    mode: 'up',   state: 'menu',    action: function()    { this.start(PLAYER.VALKYRIE);     } },
      { key: Game.Key.THREE,  mode: 'up',   state: 'menu',    action: function()    { this.start(PLAYER.WIZARD);       } },
      { key: Game.Key.FOUR,   mode: 'up',   state: 'menu',    action: function()    { this.start(PLAYER.ELF);          } },
      { key: Game.Key.M,      mode: 'up',                     action: function()    { this.toggleSound();              } },
      { key: Game.Key.T,      mode: 'up',   state: 'menu',    action: function()    { this.startDemo();                } },
      { key: Game.Key.T,      mode: 'up',   state: ['playing', 'help'], action: function() { this.setDemo(!this.demo); } },
      { key: Game.Key.ESC,    mode: 'up',   state: 'playing', action: function()    { this.quit();                     } },
      { key: Game.Key.LEFT,   mode: 'down', state: 'playing', action: function()    { this.setDemo(false); this.player.moveLeft(true);  } },
      { key: Game.Key.RIGHT,  mode: 'down', state: 'playing', action: function()    { this.setDemo(false); this.player.moveRight(true); } },
      { key: Game.Key.UP,     mode: 'down', state: 'playing', action: function()    { this.setDemo(false); this.player.moveUp(true);    } },
      { key: Game.Key.DOWN,   mode: 'down', state: 'playing', action: function()    { this.setDemo(false); this.player.moveDown(true);  } },
      { key: Game.Key.LEFT,   mode: 'up',   state: 'playing', action: function()    { this.player.moveLeft(false);     } },
      { key: Game.Key.RIGHT,  mode: 'up',   state: 'playing', action: function()    { this.player.moveRight(false);    } },
      { key: Game.Key.UP,     mode: 'up',   state: 'playing', action: function()    { this.player.moveUp(false);       } },
      { key: Game.Key.DOWN,   mode: 'up',   state: 'playing', action: function()    { this.player.moveDown(false);     } },
      { key: Game.Key.SPACE,  mode: 'down', state: 'playing', action: function()    { this.setDemo(false); this.player.fire(true);      } },
      { key: Game.Key.SPACE,  mode: 'up',   state: 'playing', action: function()    { this.player.fire(false);         } },
      { key: Game.Key.SLASH,  mode: 'up',   state: 'playing', action: function()    { this.toggleFire();               } },
      { key: Game.Key.RETURN, mode: 'up',   state: 'playing', action: function()    { this.togglePause();              } },
      { key: Game.Key.P,      mode: 'up',   state: 'playing', action: function()    { this.setDemo(false); this.player.nuke();          } },
      { key: Game.Key.ESC,    mode: 'up',   state: 'help',    action: function()    { this.resume();                   } },
      { key: Game.Key.RETURN, mode: 'up',   state: 'help',    action: function()    { this.resume();                   } },
      { key: Game.Key.SPACE,  mode: 'up',   state: 'help',    action: function()    { this.resume();                   } }
    ]

  };

  //===========================================================================
  // UTILITY METHODS
  //===========================================================================

  function publish()   { game.publish.apply(game, arguments);   } // cosmetic short-hand
  function subscribe() { game.subscribe.apply(game, arguments); } // cosmetic short-hand

  function p2t(n) { return Math.floor(n/TILE); }; // pixel-to-tile conversion
  function t2p(n) { return (n * TILE);         }; // tile-to-pixel conversion

  function countdown(n, dn)  { return n ? Math.max(0, n - (dn || 1)) : 0; } // decrement by 1, but always stop at zero, even for floating point numbers

  function isUp(dir)         { return (dir === DIR.UP)     || (dir === DIR.UPLEFT)   || (dir === DIR.UPRIGHT);   };
  function isDown(dir)       { return (dir === DIR.DOWN)   || (dir === DIR.DOWNLEFT) || (dir === DIR.DOWNRIGHT); };
  function isLeft(dir)       { return (dir === DIR.LEFT)   || (dir === DIR.UPLEFT)   || (dir === DIR.DOWNLEFT);  };
  function isRight(dir)      { return (dir === DIR.RIGHT)  || (dir === DIR.UPRIGHT)  || (dir === DIR.DOWNRIGHT); };
  function isHorizontal(dir) { return (dir === DIR.LEFT)   || (dir === DIR.RIGHT);                               };
  function isVertical(dir)   { return (dir === DIR.UP)     || (dir === DIR.DOWN);                                };
  function isDiagonal(dir)   { return (dir === DIR.UPLEFT) || (dir === DIR.UPRIGHT) || (dir === DIR.DOWNLEFT) || (dir === DIR.DOWNRIGHT); };

  function animate(frame, fpf, frames) { return Math.round(frame/fpf)%frames; }

  function overlapEntity(x, y, w, h, entity) {
    return Game.Math.overlap(x, y, w, h, entity.x + entity.cbox.x,
                                         entity.y + entity.cbox.y,
                                         entity.cbox.w,
                                         entity.cbox.h);
  }

  //=========================================================================
  // PERFORMANCE - using arrays for (small) sets
  //=========================================================================

  function set_contains(arr, entity) { return arr.indexOf(entity) >= 0;    }
  function set_add(arr, entity)      { arr.push(entity);                   }
  function set_remove(arr, entity)   { arr.splice(arr.indexOf(entity), 1); }
  function set_clear(arr)            { arr.length = 0;                     }
  function set_copy(arr, source) {
    set_clear(arr);
    for(var n = 0, max = source.length ; n < max ; n++)
      arr.push(source[n]);
  }

  //=========================================================================
  // MINIMIZE GARBAGE COLLECTION
  //  - as long as its either self contained within a single method, or the
  //    caller doesn't hold onto a reference, we can re-use the same array
  //    repeatedly for the results of frequently called helper methods
  //=========================================================================

  var _overlappingCells = { cells:   [], getcells:   function() { set_clear(this.cells);   return this.cells;   } },
      _occupied         = { checked: [], getchecked: function() { set_clear(this.checked); return this.checked; } };

  //===========================================================================
  // THE GAME ENGINE
  //===========================================================================

  var game = {

    cfg: cfg,

    run: function(runner) {

      StateMachine.create(cfg.state, this);
      Game.PubSub.enable(cfg.pubsub, this);
      Game.Key.map(cfg.keys, this);

      Game.loadResources(cfg.images, cfg.sounds, function(resources) {
        this.runner      = runner;
        this.storage     = this.clean(Game.storage());
        this.images      = resources.images;
        this.player      = new Player();
        this.allies      = [];
        this.trail       = [];
        this.heading     = { x: 0, y: 1 };
        this.demo        = false;
        this.paused      = false;
        this.fireLatched = false;
        this.pilot       = new Autopilot();
        this.viewport    = new Viewport();
        this.scoreboard  = new Scoreboard(cfg.levels[this.loadLevel()], this.loadHighScore(), this.loadHighWho());
        this.render      = new Render(resources.images);
        this.sounds      = new Sounds(resources.sounds);
        $('demoBtn').on('click', this.onClickDemo.bind(this));
        $('soundBtn').on('click', this.toggleSound.bind(this));
        this.setupLevelSelect();
        this.ready();
      }.bind(this));

    },

    //---------------------------
    // STATE MACHINE TRANSITIONS
    //---------------------------

    onready: function() {
      $('booting').hide();
      this.runner.start();
      if (DEBUG.ALLIES)
        DEBUG.ALLIES.split(',').forEach(function(name) { this.addAlly(PLAYER[name.toUpperCase()]); }, this);
      if (DEBUG.DEMO)
        this.demo = true;
      if (Game.Math.between(DEBUG.LEVEL, 0, cfg.levels.length-1))
        this.start(PLAYER[DEBUG.PLAYER], DEBUG.LEVEL); 
      else if (DEBUG.DEMO)
        this.start(PLAYER.WARRIOR);
      this.refreshDemo();
    },

    onmenu: function(event, previous, current) {
      this.sounds.playMenuMusic();
      if (this.pendingLevel !== undefined) {
        var n = this.pendingLevel;
        this.pendingLevel = undefined;
        this.start(this.player.type || PLAYER.WARRIOR, n);
      }
    },

    onstart: function(event, previous, current, type, nlevel) {
      this.fireLatched = false;
      this.dropAlly(type); // you can't be your own ally
      this.player.join(type);
      this.load(to.number(nlevel, this.loadLevel()));
    },

    onload: function(event, previous, current, nlevel) {
      var level    = cfg.levels[nlevel],
          self     = this,
          onloaded = function() { $('booting').hide(); self.play(new Map(nlevel)); };
      if (level.source) {
        onloaded();
      }
      else {
        $('booting').show();
        var seq = this.loadSeq = (this.loadSeq || 0) + 1, // a forced load makes any earlier, still-pending load obsolete
            tries = 0, done = false, attempt = function() { // retry if the request stalls or fails, rather than sit on the spinner forever
          var image = Game.createImage(level.url + "?cachebuster=" + VERSION + (tries ? "-retry" + tries : ""), { onload: function() {
            if (!done && (seq === self.loadSeq) && self.is('loading')) {
              done = true;
              level.source = image;
              onloaded();
            }
          } });
          image.on('error', function() { if (!done && (seq === self.loadSeq) && (++tries < 4)) setTimeout(attempt, 500); });
          setTimeout(function() { if (!done && (seq === self.loadSeq) && (++tries < 4)) attempt(); }, 4000);
        };
        attempt();
      }
    },

    onplay: function(event, previous, current, map) {
      this.map = map;
      this.saveLevel(map.nlevel);
      document.getElementById('levelSelect').value = map.nlevel;
      this.saveHighScore(); // a convenient place to save in-progress high scores without writing to local storage at 60fps
      publish(EVENT.START_LEVEL, map);
      this.resetAllies(map);
      if (map.level.help)
        this.help(map.level.help);
    },

    onwin:  function(event, previous, current) { this.winlosefade(15000); this.saveLevel(8); },
    onlose: function(event, previous, current) { this.winlosefade(10000); },

    winlosefade: function(duration) {
      var finish   = function()      { game.runner.canvas.fade(1);  game.finish(); },
          animate  = function(value) { game.runner.canvas.fade(1 - value);         },
          animator = new Animator({ duration: duration, transition: Animator.tx.easeOut, onComplete: finish }).addSubject(animate);
      this.fader = animator;
      animator.play();
      game.viewport.zoomout(true);
    },

    onbeforequit: function(event, previous, current) {
      if (!confirm('Quit Game?'))
        return false;
    },

    onquit: function(event, previous, current) {
      this.finish();
    },

    onfinish: function(event, previous, current) {
      this.setDemo(false);
      this.fireLatched = false;
      this.saveHighScore();
      this.player.leave();
    },

    onenterhelp: function(event, previous, current, msg) { $('help').update(msg).show(); setTimeout(this.autoresume.bind(this), 4000); },
    onleavehelp: function(event, previous, current)      { $('help').hide();                                                           },

    autoresume: function() {
      if (this.is('help'))
        this.resume();
    },

    onenterstate: function(event, previous, current) {
      $('gauntlet').setClassName(current); // allow css switching based on FSM state
      this.paused    = false;
      this.canUpdate = this.is('playing') || this.is('lost') || this.is('won');
      this.canDraw   = this.is('playing') || this.is('lost') || this.is('won') || this.is('help');
    },

    //-----------------------
    // UPDATE/DRAW GAME LOOP
    //-----------------------

    update: function(frame) {
      if (this.canUpdate && !this.paused) {
        if (this.demo && this.is('playing'))
          this.pilot.step(frame, this.player, this.map);
        this.player.update(   frame, this.player, this.map, this.viewport);
        this.map.update(      frame, this.player, this.map, this.viewport);
        this.updateAllies(    frame);
        this.viewport.update( frame, this.player, this.map, this.viewport);
      }
    },

    draw: function(ctx, frame) {
      if (this.canDraw) {
        this.render.map(     ctx, frame, this.viewport, this.map);
        this.render.entities(ctx, frame, this.viewport, this.map.entities);
        this.render.allies(  ctx, frame, this.viewport, this.allies);
        this.render.player(  ctx, frame, this.viewport, this.player);
        if (this.demo)
          this.render.demo(  ctx, frame, this.viewport);
        if (this.fireLatched && this.is('playing'))
          this.render.banner(ctx, "AUTO-FIRE ON  ( / to stop )", 8, this.viewport.h - 10, "#F5FC00");
        if (this.paused)
          this.render.paused(ctx, this.viewport);
        this.scoreboard.refreshPlayer(this.player);
        this.scoreboard.refreshAllies(this.allies);
      }
      this.debugHeap(frame);
    },

    //------------------------
    // PUB/SUB EVENT HANDLING
    //------------------------

    onPlayerDeath:  function()       { this.lose(); },
    onPlayerNuke:   function(player) { this.map.nuke(this.viewport, player); },
    onFxFinished:   function(fx)     { this.map.remove(fx); },

    onPlayerFire: function(player) {
      this.map.addWeapon(player.x, player.y, player.type.weapon, player.dir, player);
    },

    onMonsterFire: function(monster) {
      this.map.addWeapon(monster.x, monster.y, monster.type.weapon, monster.dir, monster);
    },

    onPlayerExiting: function(player, exit) {
      player.addscore(this.map.level.score);
      if (this.map.last)
        this.win();
    },

    onPlayerExit: function(player) {
      if (!this.map.last)
        this.nextLevel();
    },

    onDoorOpening: function(door, speed) {
      var nextdoor;
      if (nextdoor = this.map.door(door.x-TILE, door.y))
        nextdoor.open(speed);
      if (nextdoor = this.map.door(door.x+TILE, door.y))
        nextdoor.open(speed);
      if (nextdoor = this.map.door(door.x, door.y-TILE))
        nextdoor.open(speed);
      if (nextdoor = this.map.door(door.x, door.y+TILE))
        nextdoor.open(speed);
    },

    onDoorOpen: function(door) {
      this.map.remove(door);
    },

    onTreasureCollected: function(treasure, player) {
      this.map.remove(treasure);
    },

    onWeaponCollide: function(weapon, entity) {
      var x = weapon.x + (entity.x ? (entity.x - weapon.x)/2 : 0),
          y = weapon.y + (entity.y ? (entity.y - weapon.y)/2 : 0);

      if (weapon.type.player && (entity.monster || entity.generator))
        entity.hurt(weapon.type.damage, weapon);
      else if (weapon.type.monster && entity.player)
        entity.hurt(weapon.type.damage, weapon);
      else if (weapon.type.monster && entity.monster)
        entity.hurt(1, weapon);

      this.map.addFx(x, y, FX.WEAPON_HIT);
      this.map.remove(weapon);
    },

    onPlayerCollide: function(player, entity) {
      if (entity.monster || entity.generator)
        entity.hurt(player.type.damage, player);
      else if (entity.treasure)
        player.collect(entity);
      else if (entity.door && player.keys && entity.open())
        player.keys--;
      else if (entity.exit)
        player.exit(entity);
    },

    onMonsterCollide: function(monster, entity) {
      if (entity.player) {
        entity.hurt(monster.type.damage, monster);
        if (monster.type.selfharm)
          monster.hurt(monster.type.selfharm, monster);
      }
    },

    onMonsterDeath: function(monster, by, nuke) {
      if (by)
        by.addscore(monster.type.score);
      this.map.addMultipleFx(3, monster, FX.MONSTER_DEATH, TILE/2, nuke ? FPS/2 : FPS/6);
      this.map.remove(monster);
    },

    onGeneratorDeath: function(generator, by) {
      if (by)
        by.addscore(generator.type.score);
      this.map.addMultipleFx(20, generator, FX.GENERATOR_DEATH, TILE, FPS/2);
      this.map.remove(generator);
    },

    //-------------------------
    // DEMO MODE (autopilot)
    //-------------------------

    startDemo: function() {
      this.demo = true;
      this.start(PLAYER.WARRIOR);
      this.refreshDemo();
    },

    setDemo: function(on) {
      if (this.demo === on)
        return;
      this.demo = on;
      if (!on)
        this.pilot.release(this.player);
      this.refreshDemo();
    },

    refreshDemo: function() {
      var btn = $('demoBtn');
      btn.update(this.demo ? 'DEMO ON (T)' : 'DEMO (T)');
      btn.toggleClassName('on', this.demo);
    },

    setupLevelSelect: function() {
      var select = document.getElementById('levelSelect'), n;
      for(n = 0 ; n < cfg.levels.length ; n++)
        select.options[n] = new Option((n === 0 ? "" : n + ". ") + cfg.levels[n].name, n);
      select.value = this.loadLevel();
      document.getElementById('forceBtn').onclick = function() {
        document.getElementById('forceBtn').blur();
        game.forceLevel(parseInt(select.value, 10));
      };
      select.onchange = function() {
        select.blur(); // just choose - the level only loads when FORCE LOAD is clicked (and blur so the arrow keys don't keep changing it)
      };
    },

    // the escape hatch: throw away whatever state the game is in (stuck loading, half-finished transition, game over fade...) and load level n
    forceLevel: function(n) {
      this.loadSeq = (this.loadSeq || 0) + 1;                // abandon any load still in flight
      if (this.fader) { this.fader.stop(); this.fader = null; }
      game.runner.canvas.fade(1);
      this.viewport.zoomingout = false;
      this.paused = false;
      $('help').hide();
      $('booting').hide();
      this.transition = null;                                // a callback that threw leaves the state machine 'mid-transition' forever
      var type = this.player.type || PLAYER.WARRIOR;
      if (!this.player.active() || !this.map || this.is(['menu', 'lost', 'won', 'booting'])) {
        this.current = 'starting';
        this.player.join(type);                              // fresh hero (health, score) when the old one was dead or the game was over
      }
      else {
        this.current = 'playing';                            // keep the current hero as is
      }
      this.fireLatched = false;
      this.load(n);
    },

    togglePause: function() {
      this.paused = !this.paused;
    },

    toggleFire: function() { // '/' latches the fire button on/off, like holding SPACE
      this.setDemo(false);
      this.fireLatched = !this.fireLatched;
      this.player.autofire = this.fireLatched; // unlike HOLD SPACE (which roots you to the spot), auto-fire keeps shooting while you move
    },

    toggleSound: function() {
      document.getElementById('soundBtn').blur();
      this.sounds.onClickMute();
    },

    onClickDemo: function() {
      document.getElementById('demoBtn').blur(); // dont let SPACE/ENTER re-click the button
      if (this.is('menu'))
        this.startDemo();
      else if (this.is('playing') || this.is('help'))
        this.setDemo(!this.demo);
    },

    //-----------------------------------------
    // ALLIES - click a 'multiplayer' panel to
    // add that hero as an AI team-mate who
    // trails the lead hero and fires at monsters
    //-----------------------------------------

    findAlly: function(type) {
      for(var n = 0 ; n < this.allies.length ; n++)
        if (this.allies[n].type === type)
          return this.allies[n];
    },

    toggleAlly: function(type) {
      if (this.findAlly(type))
        this.dropAlly(type);
      else
        this.addAlly(type);
    },

    addAlly: function(type) {
      if (!type || this.findAlly(type) || (this.player.type === type && !this.is('menu')))
        return;
      var ally = new Ally(type);
      this.allies.push(ally);
      if (this.map)
        this.placeAlly(ally);
      this.scoreboard.refreshAllyPanel(type, true);
    },

    dropAlly: function(type) {
      var ally = this.findAlly(type);
      if (ally) {
        set_remove(this.allies, ally);
        this.scoreboard.refreshAllyPanel(type, false);
      }
    },

    placeAlly: function(ally) {
      var pos = this.trail.length ? this.trail[0] : this.map.start;
      ally.place(pos.x, pos.y);
    },

    resetAllies: function(map) {
      this.trail.length = 0;
      this.trail.push({ x: map.start.x, y: map.start.y });
      for(var n = 0 ; n < this.allies.length ; n++)
        this.placeAlly(this.allies[n]);
    },

    updateAllies: function(frame) {
      var p = this.player, t = this.trail, last = t[t.length-1], h = this.heading, n, ref, dx, dy, d;
      if (!last || last.x !== p.x || last.y !== p.y) {
        t.push({ x: p.x, y: p.y });
        if (t.length > 600)
          t.splice(0, 200);
        ref = t[Math.max(0, t.length - 10)]; // which way is the lead hero heading? (smoothed)
        dx  = p.x - ref.x;
        dy  = p.y - ref.y;
        d   = Math.sqrt(dx*dx + dy*dy);
        if (d > 4) {
          h.x = h.x*0.9 + dx/d*0.1;
          h.y = h.y*0.9 + dy/d*0.1;
          d   = Math.sqrt(h.x*h.x + h.y*h.y) || 1;
          h.x /= d;
          h.y /= d;
        }
      }
      if (!p.dead) {
        for(n = 0 ; n < this.allies.length ; n++)
          this.allies[n].update(frame, n, t, this.map, p, h);
      }
    },

    //------
    // MISC
    //------

    saveLevel: function(nlevel) { this.storage[STORAGE.NLEVEL] = nlevel;             },
    loadLevel: function()       { return to.number(this.storage[STORAGE.NLEVEL], 1); },
    nextLevel: function()       { var n = this.map.nlevel + 1; this.load(n >= cfg.levels.length ? 1                     : n); },
    prevLevel: function()       { var n = this.map.nlevel - 1; this.load(n <= 0                 ? cfg.levels.length - 1 : n); },

    loadHighScore: function() { return to.number(this.storage[STORAGE.SCORE], 10000); },
    loadHighWho:   function() { return this.storage[STORAGE.WHO];                     },

    saveHighScore: function() {
      if (this.player.score > this.loadHighScore()) {
        this.storage[STORAGE.SCORE] = this.player.score;
        this.storage[STORAGE.WHO]   = this.player.type.name;
      }
    },

    debugWall:  function(back) { DEBUG.WALL  = (DEBUG.WALL  || this.map.level.wall)  + (back ? -1 : 1); if (DEBUG.WALL  > WALL.MAX)  DEBUG.WALL  = WALL.MIN;  if (DEBUG.WALL  < WALL.MIN)  DEBUG.WALL  = WALL.MAX;  console.log("WALL = "  + DEBUG.WALL);  this.map.background = null; },
    debugFloor: function(back) { DEBUG.FLOOR = (DEBUG.FLOOR || this.map.level.floor) + (back ? -1 : 1); if (DEBUG.FLOOR > FLOOR.MAX) DEBUG.FLOOR = FLOOR.MIN; if (DEBUG.FLOOR < FLOOR.MIN) DEBUG.FLOOR = FLOOR.MAX; console.log("FLOOR = " + DEBUG.FLOOR); this.map.background = null; },
    debugGrid:  function()     { DEBUG.GRID = !DEBUG.GRID;  this.map.background = null; },

    debugHeap: function(frame) {
      if (DEBUG.HEAP && window.performance && window.performance.memory && window.performance.memory.usedJSHeapSize) {
        var mb = Math.round(window.performance.memory.usedJSHeapSize/(1024*1024));
        if (mb < this.lastmb) {
          console.log("garbage collected from " + this.lastmb + " to " + mb + " = " + (this.lastmb - mb) + " MB in " + (frame - (this.lastgb||0)) + " frames");
          this.lastgb = frame;
        }
        this.lastmb = mb;
      }
    },

    clean: function(storage) {
      if (DEBUG.RESET || (storage[STORAGE.VERSION] != VERSION)) {
        for(var key in STORAGE)
          delete storage[STORAGE[key]];
        storage[STORAGE.VERSION] = VERSION;
      }
      return storage;
    }

  };

  //===========================================================================
  // THE MAP
  //===========================================================================

  var Map = Class.create({

    initialize: function(nlevel) {
      this.setupLevel(nlevel);
    },

    cell: function(x, y) {
      return this.cells[p2t(x) + (p2t(y) * this.tw)];
    },

    door: function(x, y) {
      var obj = this.cell(x,y).occupied[0];  // optimization - we know doors will always be first (and only) entity in a cell
      return obj && obj.door ? obj : null;
    },

    tpos: { }, // a persistent intermediate object to avoid GC allocations (caller is responsible for using result immediately and not hanging on to a reference)

    trymove: function(entity, dir, speed, ignore, dryrun) {
      var collision;
      this.tpos.x = entity.x + (isLeft(dir) ? -speed : isRight(dir) ? speed : 0);
      this.tpos.y = entity.y + (isUp(dir)   ? -speed : isDown(dir)  ? speed : 0);
      collision = this.occupied(this.tpos.x + entity.cbox.x, this.tpos.y + entity.cbox.y, entity.cbox.w, entity.cbox.h, ignore || entity);
      if (!collision && !dryrun) {
        this.occupy(this.tpos.x, this.tpos.y, entity);
      }
      return collision;
    },

    trymoveXY: function(entity, dx, dy, ignore) { // free-angle version of trymove (used by ally shots)
      var x = entity.x + dx, y = entity.y + dy,
          collision = this.occupied(x + entity.cbox.x, y + entity.cbox.y, entity.cbox.w, entity.cbox.h, ignore || entity);
      if (!collision)
        this.occupy(x, y, entity);
      return collision;
    },

    canmove: function(entity, dir, speed, ignore) {
      if (false === this.trymove(entity, dir, speed, ignore, true))
        return this.tpos; // caller is responsible for using result immediately and NOT holding a reference to the object
      else
        return false;
    },

    occupy: function(x, y, obj) {

      // always move, assume caller took care to avoid collisions
      obj.x = x;
      obj.y = y;

      // for temporal objects (weapons, fx, etc) that dont need collision detection we're done.
      if (obj.temporal)
        return;

      var c, max, cell, before = obj.cells, after = this.overlappingCells(x, y, TILE, TILE);

      // optimization - if overlapping cells are same as they were before then bail out early
      if ((before.length === after.length)                  && 
          (                       (before[0] === after[0])) &&
          ((before.length < 2) || (before[1] === after[1])) &&
          ((before.length < 3) || (before[2] === after[2])) &&
          ((before.length < 4) || (before[3] === after[3]))) {
        return;
      }

      // otherwise remove object from previous cells that are no longer occupied
      for(c = 0, max = before.length ; c < max ; c++) {
        cell = before[c];
        if (!set_contains(after, cell))
          set_remove(cell.occupied, obj);
      }

      // and add object to new cells that were not previously occupied
      for(c = 0, max = after.length ; c < max ; c++) {
        cell = after[c];
        if (!set_contains(before, cell))
          set_add(cell.occupied, obj);
      }

      // and remember for next time
      set_copy(before, after);

      return obj;
    },

    overlappingCells: function(x, y, w, h) {

      var cells = _overlappingCells.getcells();

      if ((x === null) || (y === null))
        return cells;

      x = Math.floor(x); // ensure working in integer math in this function to avoid floating point errors giving us the wrong cells
      y = Math.floor(y);

      var nx = ((x%TILE) + w) > TILE ? 1 : 0,
          ny = ((y%TILE) + h) > TILE ? 1 : 0;

      set_add(cells,   this.cell(x,        y));
      if (nx > 0)
        set_add(cells, this.cell(x + TILE, y));
      if (ny > 0)
        set_add(cells, this.cell(x,        y + TILE));
      if ((nx > 0) && (ny > 0))
        set_add(cells, this.cell(x + TILE, y + TILE));

      return cells;

    },

    occupied: function(x, y, w, h, ignore) {

      var cells   = this.overlappingCells(x, y, w, h),
          checked = _occupied.getchecked(), // avoid checking against the same item multiple times (if that item spans multiple cells)
          cell, item,
          c, nc = cells.length,
          i, ni;

      // have to check for any player FIRST, so even if player is near a wall or other monster he will still get hit (otherwise its possible to use monsters as semi-shields against other monsters)
      if ((game.player != ignore) && !(ignore && ignore.ally) && overlapEntity(x, y, w, h, game.player)) // ally shots pass through the lead hero
        return game.player;

      // now loop again checking for walls and other entities
      for(c = 0 ; c < nc ; c++) {
        cell = cells[c];
        if (cell.wall !== undefined)
          return true;
        for(i = 0, ni = cell.occupied.length ; i < ni ; i++) {
          item = cell.occupied[i];
          if ((item != ignore) && !set_contains(checked, item)) {
            set_add(checked, item);
            if (overlapEntity(x, y, w, h, item))
              return item;
          }
        }
      }

      return false;
    },

    //-------------------------------------------------------------------------

    nuke: function(viewport, player) {
      var n, max, entity, distance, limit = TILE*player.type.magic;
      for(n = 0, max = this.entities.length ; n < max ; n++) {
        entity = this.entities[n];
        if (entity.monster && entity.active) {
          distance = Math.max(Math.abs(player.x - entity.x), Math.abs(player.y - entity.y)); // rough, but fast, approximation for slower, sqrt(x*x + y*y)
          if (distance < limit)
            entity.hurt(player.type.magic * (1 - distance/limit), player, true);
        }
      }
    },

    //-------------------------------------------------------------------------

    update: function(frame, player, map, viewport) {
      var n, max, entity;
      for(n = 0, max = this.entities.length ; n < max ; n++) {
        entity = this.entities[n];
        if (entity.active && entity.update)
          entity.update(frame, player, map, viewport);
      }
    },

    //-------------------------------------------------------------------------

    setupLevel: function(nlevel) {

      var level  = cfg.levels[nlevel],
          source = level.source,
          tw     = source.width,
          th     = source.height,
          self   = this;

      this.nlevel   = nlevel;
      this.level    = level;
      this.last     = nlevel === (cfg.levels.length-1);
      this.tw       = tw;
      this.th       = th;
      this.w        = tw * TILE;
      this.h        = th * TILE;
      this.start    = null;
      this.cells    = [];
      this.entities = [];
      this.pool     = { weapons: [], monsters: [], fx: [] }

      function is(pixel, type) { return ((pixel & PIXEL.MASK.TYPE) === type); };
      function type(pixel)     { return  (pixel & PIXEL.MASK.EXHIGH) >> 4;    };

      function isnothing(pixel)      { return is(pixel, PIXEL.NOTHING);   };
      function iswall(pixel)         { return is(pixel, PIXEL.WALL);      };
      function isstart(pixel)        { return is(pixel, PIXEL.START);     };
      function isdoor(pixel)         { return is(pixel, PIXEL.DOOR);      }; 
      function isexit(pixel)         { return is(pixel, PIXEL.EXIT);      };
      function isgenerator(pixel)    { return is(pixel, PIXEL.GENERATOR); };
      function ismonster(pixel)      { return is(pixel, PIXEL.MONSTER);   };
      function istreasure(pixel)     { return is(pixel, PIXEL.TREASURE);  };
      function walltype(tx,ty,map)   { return (iswall(map.pixel(tx,   ty-1)) ? 1 : 0) | (iswall(map.pixel(tx+1, ty))   ? 2 : 0) | (iswall(map.pixel(tx,   ty+1)) ? 4 : 0) | (iswall(map.pixel(tx-1, ty))   ? 8 : 0); };
      function shadowtype(tx,ty,map) { return (iswall(map.pixel(tx-1, ty))   ? 1 : 0) | (iswall(map.pixel(tx-1, ty+1)) ? 2 : 0) | (iswall(map.pixel(tx,   ty+1)) ? 4 : 0); };
      function doortype(tx,ty,map)   { return iswall(map.pixel(tx, ty-1)) || isdoor(map.pixel(tx, ty-1)) ? DOOR.VERTICAL : DOOR.HORIZONTAL; };

      Game.parseImage(source, function(tx, ty, pixel, map) {

        var cell, x = t2p(tx),
                  y = t2p(ty),
                  n = tx + (ty * tw);

        self.cells[n] = cell = { occupied: [] };

        if (isstart(pixel))
          self.start = { x: x, y: y }

        if (iswall(pixel))
          cell.wall = walltype(tx, ty, map);
        else if (isnothing(pixel))
          cell.nothing = true;
        else
          cell.shadow = shadowtype(tx, ty, map);

        if (isexit(pixel))
          self.addExit(x, y, DOOR.EXIT);
        else if (isdoor(pixel))
          self.addDoor(x, y, doortype(tx,ty,map));
        else if (isgenerator(pixel))
          self.addGenerator(x, y, MONSTERS[type(pixel) < MONSTERS.length ? type(pixel) : 0]);
        else if (istreasure(pixel))
          self.addTreasure(x, y, TREASURES[type(pixel) < TREASURES.length ? type(pixel) : 0]);
        else if (ismonster(pixel))
          self.addMonster(x, y, MONSTERS[type(pixel) < MONSTERS.length ? type(pixel) : 0]);
      });

    },

    //-------------------------------------------------------------------------

    addGenerator: function(x, y, type)             { return DEBUG.NOGENERATORS ? null : this.add(x, y, Generator, null,               type);             },
    addTreasure:  function(x, y, type)             { return DEBUG.NOTREASURE   ? null : this.add(x, y, Treasure,  null,               type);             },
    addDoor:      function(x, y, type)             { return DEBUG.NODOORS      ? null : this.add(x, y, Door,      null,               type);             },
    addExit:      function(x, y, type)             { return DEBUG.NOEXITS      ? null : this.add(x, y, Exit,      null,               type);             },
    addWeapon:    function(x, y, type, dir, owner, vx, vy) { return DEBUG.NOWEAPONS ? null : this.add(x, y, Weapon, this.pool.weapons, type, dir, owner, vx, vy); },
    addMonster:   function(x, y, type, generator)  { return DEBUG.NOMONSTERS   ? null : this.add(x, y, Monster,   this.pool.monsters, type, generator);  },
    addFx:        function(x, y, type, delay)      { return DEBUG.NOFX         ? null : this.add(x, y, Fx,        this.pool.fx,       type, delay);      },

    add: function(x, y, klass, pool) {
      var cfunc, entity, args = [].slice.call(arguments, 4);
      if (pool && pool.length) {
        entity = pool.pop();
        entity.initialize.apply(entity, args);
      }
      else {
        cfunc  = klass.bind.apply(klass, [null].concat(args)); // sneaky way to use Function.apply(args) on a constructor
        entity = new cfunc();
        entity.pool  = pool;           // entities track which pool they belong to (if any)
        entity.cells = [];             // entities track which cells they currently occupy
        this.entities.push(entity);
      }
      this.occupy(x, y, entity);
      entity.active = true;
      return entity;
    },

    remove: function(obj) {
      obj.active = false;
      this.occupy(null, null, obj);
      if (obj.pool)
        obj.pool.push(obj);
    },

    addMultipleFx: function(count, target, type, d, dt) {
      var n, x, y, collision;
      this.addFx(target.x, target.y, type);
      for(n = 0 ; n < 1000 ; n++) {
        x = target.x + Game.Math.randomInt(-d, d);
        y = target.y + Game.Math.randomInt(-d, d);
        collision = this.occupied(x, y, TILE, TILE, target);
        if (collision !== true) { // allow it unless its explicitly a wall
          this.addFx(x, y, type, Game.Math.randomInt(0, dt));
          if (--count === 0)
            break;
        }
      }
    }

  }); // Map

  //===========================================================================
  // MONSTERS
  //===========================================================================

  var Monster = Class.create({

    initialize: function(type, generator) {
      this.generator  = generator;
      this.type       = type;
      this.dir        = Game.Math.randomInt(0, 7); // start off in random direction, will quickly target player instead
      this.health     = type.health;
      this.thinking   = 0;
      this.travelling = 0;
      this.reloading  = 0;
      this.dx         = Game.Math.randomInt(-2, 2);  // a little random offset to break up lines of monsters
      this.dy         = Game.Math.randomInt(-4, 0);  // (ditto)
      this.df         = Game.Math.randomInt(0, 100); // a little random frame offset to keep monster animations out-of-sync
    },

    monster: true,
    cbox:    CBOX.MONSTER,

    update: function(frame, player, map, viewport) {

      // dont bother trying to update monsters that are far away (a double viewport away)
      if (viewport.outside(this.x - viewport.w, this.y - viewport.h, 2*viewport.w, 2*viewport.h))
        return;

      // keep reloading (if applicable)
      this.reloading = countdown(this.reloading);

      // dont bother trying to update a monster that is still 'thinking'
      if (this.thinking && --this.thinking)
        return;

      // am i going towards a live player, or AWAY from a dead one, if away, my speed should be slow (the player is dead, I'm no longer interested in him)
      var away  = !player.active(),
          speed = away ? 1 : this.type.speed;

      // let travelling monsters travel
      if (this.travelling > 0)
        return this.step(map, player, this.dir, speed, countdown(this.travelling), !away);

      // otherwise find a new direction
      var dirs, n, max;
      dirs = PREFERRED_DIRECTIONS[this.directionTo(player, away)];
      for(n = 0, max = dirs.length ; n < max ; n++) {
        if (this.step(map, player, dirs[n], speed, n < 2 ? 0 : this.type.travelling * (n-2), !away))
          return;
      }

    },

    step: function(map, player, dir, speed, travelling, allowfire) {
      var collision = map.trymove(this, dir, speed);
      if (!collision) {
        this.dir = dir;
        if (allowfire && this.type.weapon && this.fire(map, player)) {
          this.thinking   = this.type.thinking;
          this.travelling = 0;
        }
        else {
          this.thinking   = 0;
          this.travelling = travelling;
        }
        return true;
      }
      else if (collision.player) {
        publish(EVENT.MONSTER_COLLIDE, this, collision);
        return true;
      }

      // if we couldn't move in that direction at full speed, try a baby step before giving up
      if (speed > 1)
        return this.step(map, player, dir, 1, travelling, allowfire);

      this.thinking   = this.type.thinking;
      this.travelling = 0;
      return false;
    },

    fire: function(map, player) {
      var dx, dy, dd;
      if (this.type.weapon) {
        if (!this.reloading) {
          dx = Math.abs(p2t(this.x) - p2t(player.x));
          dy = Math.abs(p2t(this.y) - p2t(player.y));
          dd = Math.abs(dx-dy);
          if (((dx < 2) && isVertical(this.dir))   ||
              ((dy < 2) && isHorizontal(this.dir)) ||
              ((dd < 2) && isDiagonal(this.dir))) {
            this.reloading = this.type.weapon.reload;
            publish(EVENT.MONSTER_FIRE, this);
            return true;
          }
        }
      }
      return false;
    },

    hurt: function(damage, by, nuke) {
      if ((by.weapon && this.type.canbeshot) || (by.player && this.type.canbehit) || (by == this) || nuke) {
        this.health = Math.max(0, this.health - damage);
        if (this.health === 0)
          this.die(by.player ? by : by.weapon && by.type.player ? by.owner : null, nuke);
      }
    },

    die: function(by, nuke) {
      if (this.generator)
        this.generator.remove(this);
      publish(EVENT.MONSTER_DEATH, this, by, nuke);
    },

    directionTo: function(target, away) {

      var up    = target.y < this.y - this.type.speed,
          down  = target.y > this.y + this.type.speed,
          left  = target.x < this.x - this.type.speed,
          right = target.x > this.x + this.type.speed;

      if (up && left)
        return away ? DIR.DOWNRIGHT : DIR.UPLEFT;
      else if (up && right)
        return away ? DIR.DOWNLEFT : DIR.UPRIGHT;
      else if (down && left)
        return away ? DIR.UPRIGHT : DIR.DOWNLEFT;
      else if (down && right)
        return away ? DIR.UPLEFT : DIR.DOWNRIGHT;
      else if (up)
        return away ? DIR.DOWN : DIR.UP;
      else if (down)
        return away ? DIR.UP : DIR.DOWN;
      else if (left)
        return away ? DIR.RIGHT : DIR.LEFT;
      else if (right)
        return away ? DIR.LEFT : DIR.RIGHT;
      else
        return this.dir;
    },

    onrender: function(frame) {
      if (this.type.invisibility && ((frame+this.df)%(this.type.invisibility.on + this.type.invisibility.off) < this.type.invisibility.on))
        return false;

      this.frame = this.dir + (8 * animate(frame + this.df, this.type.fpf, this.type.frames));
    }

  });

  //===========================================================================
  // GENERATORS
  //===========================================================================

  var Generator = Class.create({

    initialize: function(mtype) {
      this.mtype   = mtype;
      this.type    = mtype.generator;
      this.health  = this.type.health;
      this.pending = 0;
      this.count   = 0;
    },

    generator: true,
    cbox:      CBOX.FULL,

    update: function(frame, player, map, viewport) {
      var pos;
      if ((this.count < this.type.max) && (--this.pending <= 0)) {
        pos = map.canmove(this, Game.Math.randomInt(0,7), TILE);
        if (pos) {
          map.addMonster(pos.x, pos.y, this.mtype, this);
          this.count++;
          this.pending = Game.Math.randomInt(1, this.type.speed);
        }
      }
    },

    hurt: function(damage, by) {
      this.health = Math.max(0, this.health - damage);
      if (this.health === 0)
        this.die(by.player ? by : by.weapon && by.type.player ? by.owner : null);
    },

    die: function(by) {
      publish(EVENT.GENERATOR_DEATH, this, by);
    },

    remove: function(monster) {
      this.count--;
    },

    onrender: function(frame) {
      this.frame = (2 - Math.floor(3 * (this.health / (this.type.health + 1))));
    }

  });

  //===========================================================================
  // WEAPONS
  //===========================================================================

  var Weapon = Class.create({

    initialize: function(type, dir, owner, vx, vy) {
      this.type  = type;
      this.dir   = dir;
      this.owner = owner;
      this.vx    = vx; // optional free-angle velocity (ally shots), otherwise 8-way by dir
      this.vy    = vy;
    },

    weapon:   true,
    temporal: true,
    cbox:     CBOX.WEAPON,

    update: function(frame, player, map, viewport) {
      var collision = (this.vx !== undefined) ? map.trymoveXY(this, this.vx, this.vy, this.owner) : map.trymove(this, this.dir, this.type.speed, this.owner);
      if (collision) {
        this.owner.reloading = countdown(this.owner.reloading, this.type.reload/2); // speed up reloading process if previous weapon hit something, makes player feel powerful
        publish(EVENT.WEAPON_COLLIDE, this, collision);
      }
    },

    onrender: function(frame) {
      this.frame = this.type.rotate ? animate(frame, this.type.fpf, 8) : this.dir;
    }

  });

  //===========================================================================
  // TREASURE
  //===========================================================================

  var Treasure = Class.create({

    initialize: function(type) {
      this.type = type;
    },

    treasure: true,
    cbox: CBOX.FULL,

    onrender: function(frame) {
      this.frame = animate(frame, this.type.fpf, this.type.frames);
    }

  });

  //===========================================================================
  // DOOR
  //===========================================================================

  var Door = Class.create({

    initialize: function(type) {
      this.type =  type;
      this.dx   = -type.dx;
      this.dy   = -type.dy;
      this.dw   =  type.dx*3;
      this.dh   =  type.dy;
    },

    door:  true,
    cbox:  CBOX.FULL,

    update: function(frame, player, map, viewport) {
      if (this.opening && (--this.opening === 0)) {
        publish(EVENT.DOOR_OPEN, this);
      }
    },

    open: function(speed) {
      if (!this.opening) {
        this.opening = (speed || 0) + this.type.speed;
        publish(EVENT.DOOR_OPENING, this, this.opening);
        return true;
      }
    }

  });

  //===========================================================================
  // EXIT
  //===========================================================================

  var Exit = Class.create({

    initialize: function(type) {
      this.type = type;
    },

    exit: true,
    cbox: CBOX.FULL

  });

  //===========================================================================
  // FX
  //===========================================================================

  var Fx = Class.create({

    initialize: function(type, delay) {
      this.type  = type;
      this.start = null;
      this.delay = delay || 0;
    },

    fx:       true,
    temporal: true,

    update: function(frame, player, map, viewport) {
      if (this.delay && --this.delay)
        return;
      this.start = this.start || frame; 
      this.frame = animate(frame - this.start, this.type.fpf, this.type.frames + 1);
      if (this.frame === this.type.frames)
        publish(EVENT.FX_FINISHED, this);
    },

    onrender: function(frame) {
      if (this.delay)
        return false;
    }

  });

  //===========================================================================
  // THE PLAYER
  //===========================================================================

  var Player = Class.create({

    initialize: function() {
      subscribe(EVENT.START_LEVEL, this.onStartLevel.bind(this));

      this.canvas = Game.createCanvas(STILE + 2*FX.PLAYER_GLOW.border, STILE + 2*FX.PLAYER_GLOW.border);
      this.ctx    = this.canvas.getContext('2d');
      this.cells  = []; // entities track which cells they currently occupy
    },

    player: true,
    cbox:   CBOX.PLAYER,

    active: function() { return !this.dead && !this.exiting; },

    join: function(type) {
      this.type      = type;
      this.dead      = false;
      this.exiting   = false;
      this.firing    = false;
      this.autofire  = false;
      this.moving    = {};
      this.reloading = 0;
      this.hurting   = 0;
      this.healing   = 0;
      this.keys      = DEBUG.KEYS    || 0;
      this.potions   = DEBUG.POTIONS || 0;
      this.score     = 0;
      this.dir       = Game.Math.randomInt(0, 7);
      this.health    = type.health;
      publish(EVENT.PLAYER_JOIN, this);
    },

    leave: function() {
      publish(EVENT.PLAYER_LEAVE, this);
    },

    onStartLevel: function(map) {
      map.occupy(map.start.x, map.start.y, this);
      this.keys    = DEBUG.KEYS || 0;
      this.dead    = false;
      this.exiting = false;
    },

    update: function(frame, player, map, viewport) {

      if (this.dead)
        return;

      if (this.exiting) {
        if (--this.exiting.count === 0)
          publish(EVENT.PLAYER_EXIT, this);
        return;
      }

      this.autohurt(frame);

      this.hurting   = countdown(this.hurting);
      this.healing   = countdown(this.healing);
      this.reloading = countdown(this.reloading);

      if (this.autofire && !this.reloading) {
        this.reloading = this.type.weapon.reload;
        publish(EVENT.PLAYER_FIRE, this);
      }

      if (this.firing) {
        if (!this.reloading) {
          this.reloading = this.type.weapon.reload;
          publish(EVENT.PLAYER_FIRE, this);
        }
        return; // can't fire and move at same time
      }

      if (is.invalid(this.moving.dir))
        return;

      var d, dmax, dir, collision,
          directions = SLIDE_DIRECTIONS[this.moving.dir];

      for(d = 0, dmax = directions.length ; d < dmax ; d++) {
        dir = directions[d];
        collision = map.trymove(this, dir, this.type.speed);
        if (collision)
          publish(EVENT.PLAYER_COLLIDE, this, collision); // if we collided with something, publish event and then try next available direction...
        else
          return; // ... otherwise we moved, so we're done trying
      }

    },

    collect: function(treasure) {
      this.addscore(treasure.type.score);
      if (treasure.type.potion)
        this.potions++;
      else if (treasure.type.key)
        this.keys++;
      else if (treasure.type.health)
        this.heal(treasure.type.health);
      else if (treasure.type.damage)
        this.hurt(treasure.type.damage);
      publish(EVENT.TREASURE_COLLECTED, treasure, this);
    },

    exit: function(exit) {
      if (!this.exiting) {
        this.health  = this.health + (this.health < this.type.health ? 100 : 0);
        this.exiting = { max: exit.type.speed, count: exit.type.speed, fpf: exit.type.fpf, dx: (exit.x - this.x), dy: (exit.y - this.y) };
        publish(EVENT.PLAYER_EXITING, this, exit);
      }
    },

    fire:      function(on) { this.firing       = on;                 },
    moveUp:    function(on) { this.moving.up    = on;  this.setDir(); },
    moveDown:  function(on) { this.moving.down  = on;  this.setDir(); },
    moveLeft:  function(on) { this.moving.left  = on;  this.setDir(); },
    moveRight: function(on) { this.moving.right = on;  this.setDir(); },

    setDir: function() {
      if (this.moving.up && this.moving.left)
        this.dir = this.moving.dir = DIR.UPLEFT;
      else if (this.moving.up && this.moving.right)
        this.dir = this.moving.dir = DIR.UPRIGHT;
      else if (this.moving.down && this.moving.left)
        this.dir = this.moving.dir = DIR.DOWNLEFT;
      else if (this.moving.down && this.moving.right)
        this.dir = this.moving.dir = DIR.DOWNRIGHT;
      else if (this.moving.up)
        this.dir = this.moving.dir = DIR.UP;
      else if (this.moving.down)
        this.dir = this.moving.dir = DIR.DOWN;
      else if (this.moving.left)
        this.dir = this.moving.dir = DIR.LEFT;
      else if (this.moving.right)
        this.dir = this.moving.dir = DIR.RIGHT;
      else
        this.moving.dir = null; // no moving.dir, but still facing this.dir
    },

    addscore: function(n) { this.score = this.score + (n||0); },

    heal: function(health) {
      this.health  = this.health + health;
      this.healing = FX.PLAYER_GLOW.frames;
      publish(EVENT.PLAYER_HEAL, this, health);
    },

    hurt: function(damage, by, automatic) {
      if (this.active() && !DEBUG.NODAMAGE) {
        damage = automatic ? damage : damage/this.type.armor;
        this.health = Math.max(0, this.health - damage);
        if (!automatic) {
          this.hurting = FX.PLAYER_GLOW.frames;
          publish(EVENT.PLAYER_HURT, this, damage);
        }
        if (this.health === 0)
          this.die();
      }
    },

    autohurt: function(frame) {
      if (!DEBUG.NOAUTOHURT && (frame % (FPS/2)) === 0) // players automatically lose 1 health every 1/2 second
        this.hurt(1, this, true);
    },

    weak: function() {
      return this.health < 100;
    },

    die: function() {
      this.dead = true;
      publish(EVENT.PLAYER_DEATH, this);
    },

    nuke: function() {
      if (this.potions) {
        this.potions--;
        publish(EVENT.PLAYER_NUKE, this);
      }
    },

    onrender: function(frame) {
      if (this.dead)
        this.frame = 32;
      else if (this.exiting)
        this.frame = this.type.sx + animate(this.exiting.count, this.exiting.fpf, 8);
      else if (is.valid(this.moving.dir) || this.firing)
        this.frame = this.type.sx + this.dir + (8 * animate(frame, this.type.fpf, this.type.frames));
      else
        this.frame = this.type.sx + this.dir;
    }

  });

  //===========================================================================
  // ALLY - an AI team-mate. Trails the lead hero along his footsteps, never
  // collects, levels up or exits (the lead hero does that) and can't be hurt,
  // but fires at any monster or generator in range with a clear line of sight.
  //===========================================================================

  function clearLine(map, x0, y0, x1, y1) { // true if no wall or closed door between the 2 points
    var dx = x1 - x0, dy = y1 - y0, steps = Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 12), s, cell, o;
    for(s = 1 ; s < steps ; s++) {
      cell = map.cell(x0 + dx*s/steps, y0 + dy*s/steps);
      if (!cell || cell.wall !== undefined)
        return false;
      o = cell.occupied[0];
      if (o && o.door)
        return false;
    }
    return true;
  }

  function vectorToDir(dx, dy) { return (Math.round(Math.atan2(dy, dx) / (Math.PI/4)) + 10) % 8; } // screen coords: angle 0 = RIGHT(2), +90 = DOWN(4)

  var Ally = Class.create({

    initialize: function(type) {
      this.type      = type;
      this.score     = 0;
      this.vscore    = null;
      this.reloading = 0;
      this.dir       = DIR.DOWN;
      this.moving    = false;
      this.stuck     = 0;
      this.x         = 0;
      this.y         = 0;
      this.slot      = { x: 0, y: 0 };
    },

    ally: true,        // NOTE: deliberately not 'player', so monsters and weapons ignore him
    cbox: CBOX.PLAYER,

    place: function(x, y) {
      this.x = x;
      this.y = y;
      this.stuck = 0;
    },

    addscore: function(n) { this.score = this.score + (n||0); },

    blocked: function(map, x, y) { // walls and closed doors/generators only - allies walk through monsters
      var cells = map.overlappingCells(x + this.cbox.x, y + this.cbox.y, this.cbox.w, this.cbox.h), c, i, o, occ;
      for(c = 0 ; c < cells.length ; c++) {
        if (!cells[c] || cells[c].wall !== undefined)
          return true;
        occ = cells[c].occupied;
        for(i = 0 ; i < occ.length ; i++) {
          o = occ[i];
          if ((o.door || o.generator) && overlapEntity(x + this.cbox.x, y + this.cbox.y, this.cbox.w, this.cbox.h, o))
            return true;
        }
      }
      return false;
    },

    // fan out behind the lead hero (one left, one right, one further back) so nobody stands in anybody's line of fire.
    // in a tight corridor the slot is inside a wall, so fall back to following his footsteps in single file.
    target: function(rank, trail, map, lead, heading) {
      var slot = AUTO.SLOTS[rank % AUTO.SLOTS.length],
          x    = lead.x - heading.x * slot.back - heading.y * slot.side,
          y    = lead.y - heading.y * slot.back + heading.x * slot.side;
      if (!this.blocked(map, x, y) && clearLine(map, lead.x + TILE/2, lead.y + TILE/2, x + TILE/2, y + TILE/2)) {
        this.slot.x = x;
        this.slot.y = y;
        return this.slot;
      }
      return trail[Math.max(0, trail.length - 1 - AUTO.TRAIL_GAP * (rank + 1))];
    },

    update: function(frame, rank, trail, map, lead, heading) {

      this.reloading = countdown(this.reloading);

      var target = this.target(rank, trail, map, lead, heading),
          dx = target.x - this.x, dy = target.y - this.y, d = Math.sqrt(dx*dx + dy*dy), sp, mx, my, ox = this.x, oy = this.y;

      this.moving = false;
      if (d > 2) {
        sp = Math.min(d, this.type.speed * (d > 3*TILE ? 1.6 : 1)); // hurry if lagging
        mx = dx/d * sp;
        my = dy/d * sp;
        if (!this.blocked(map, this.x + mx, this.y)) this.x += mx;
        if (!this.blocked(map, this.x, this.y + my)) this.y += my;
        this.moving = (this.x !== ox) || (this.y !== oy);
        if (this.moving)
          this.dir = vectorToDir(mx, my);
        this.stuck = this.moving ? 0 : this.stuck + 1;
        if ((this.stuck > 45) || (d > 10*TILE))
          this.place(target.x, target.y);
      }

      this.shoot(map, lead);
    },

    friendInWay: function(map, lead, tx, ty) { // would the shot pass through the lead hero or another ally?
      var friends = game.allies, f, n, fx, fy, ax = this.x, ay = this.y, dx = tx - ax, dy = ty - ay, len2 = dx*dx + dy*dy || 1, t, px, py;
      for(n = -1 ; n < friends.length ; n++) {
        f = (n < 0) ? lead : friends[n];
        if (f === this)
          continue;
        t = ((f.x - ax)*dx + (f.y - ay)*dy) / len2;
        if (t <= 0 || t >= 1)
          continue;
        px = ax + dx*t - f.x;
        py = ay + dy*t - f.y;
        if (px*px + py*py < 18*18)
          return true;
      }
      return false;
    },

    shoot: function(map, lead) {
      if (this.reloading)
        return;
      var range = AUTO.RANGE * TILE, best = null, bestd = range*range, ents = map.entities, n, e, dx, dy, dd, speed, aim;
      for(n = 0 ; n < ents.length ; n++) {
        e = ents[n];
        if (!e.active || !(e.monster || e.generator) || (e.monster && !e.type.canbeshot))
          continue;
        dx = e.x - this.x;
        dy = e.y - this.y;
        dd = dx*dx + dy*dy;
        if ((dd < bestd) && clearLine(map, this.x + TILE/2, this.y + TILE/2, e.x + TILE/2, e.y + TILE/2) && !this.friendInWay(map, lead, e.x, e.y)) {
          best  = e;
          bestd = dd;
        }
      }
      if (best) {
        dx    = best.x - this.x;
        dy    = best.y - this.y;
        dd    = Math.sqrt(bestd) || 1;
        speed = this.type.weapon.speed;
        this.dir       = vectorToDir(dx, dy);
        this.reloading = this.type.weapon.reload;
        game.map.addWeapon(this.x, this.y, this.type.weapon, this.dir, this, dx/dd * speed, dy/dd * speed);
        if (this.type === game.allies[0].type) // only the first ally makes noise, otherwise it's a cacophony
          game.sounds.play(game.sounds.sounds["fire" + this.type.name]);
      }
    },

    onrender: function(frame) {
      this.frame = this.dir + (this.moving ? 8 * animate(frame, this.type.fpf, this.type.frames) : 0);
    }

  });

  //===========================================================================
  // AUTOPILOT - plays the lead hero in demo mode: plans a route (Dijkstra over
  // the tile grid) to the nearest worthwhile treasure or the exit, fetches keys
  // when the exit is behind a door, stops to shoot anything lined up in range,
  // drinks a potion when swamped (or when Death shows up), and nudges itself
  // free if it gets jammed.
  //===========================================================================

  var Autopilot = Class.create({

    initialize: function() {
      this.reset(null);
    },

    reset: function(map) {
      this.map       = map;
      this.path      = [];
      this.replan    = 0;
      this.lx        = null;
      this.ly        = null;
      this.stuck     = 0;
      this.nudge     = 0;
      this.nudgeDir  = 0;
      this.firing    = 0;
      this.hold      = 0;
      this.nukeWait  = 0;
      this.clear     = 0;
      this.faceDir   = undefined;
    },

    setMove: function(player, up, down, left, right) {
      player.moving.up = up; player.moving.down = down; player.moving.left = left; player.moving.right = right;
      player.setDir();
    },

    release: function(player) { // hand the controls back to the keyboard
      this.setMove(player, false, false, false, false);
      player.firing = false;
    },

    step: function(frame, player, map) {

      if (this.map !== map)
        this.reset(map);

      if (player.dead || player.exiting) {
        this.release(player);
        return;
      }

      // potion?
      if (player.potions && (frame >= this.nukeWait) && this.shouldNuke(player, map)) {
        this.nukeWait = frame + 90;
        player.nuke();
      }

      // shoot whatever is lined up (but never stand and shoot forever)
      if (this.hold > 0) {
        this.hold--;
      }
      else {
        var aim = this.aim(player, map);
        if (aim >= 0) {
          this.setMove(player, false, false, false, false);
          player.dir    = aim;
          player.firing = true;
          this.stuck    = 0;
          if (++this.firing > 240) { // 4 seconds of shooting and still not resolved - get moving for a bit
            this.firing = 0;
            this.hold   = 90;
          }
          return;
        }
      }
      this.firing   = 0;
      player.firing = false;

      // jammed? wiggle free
      if ((player.x === this.lx) && (player.y === this.ly))
        this.stuck++;
      else
        this.stuck = 0;
      this.lx = player.x;
      this.ly = player.y;
      if (is.valid(player.moving.dir))
        this.faceDir = player.moving.dir;
      if ((this.stuck === 15) && (this.faceDir !== undefined))
        this.clear = 45;                 // pinned by a pack of monsters? shoot our way through them
      if (this.clear > 0) {
        this.clear--;
        this.setMove(player, false, false, false, false);
        player.dir    = this.faceDir;
        player.firing = true;
        return;
      }
      if (this.stuck > 40) {
        this.stuck    = 0;
        this.nudge    = 24;
        this.nudgeDir = Game.Math.randomInt(0, 3);
        this.replan   = 0;
      }
      if (this.nudge > 0) {
        this.nudge--;
        this.setMove(player, this.nudgeDir === 0, this.nudgeDir === 1, this.nudgeDir === 2, this.nudgeDir === 3);
        return;
      }

      // follow the planned route
      var tx = p2t(player.x + TILE/2), ty = p2t(player.y + 20), here = tx + ty*map.tw, i = this.path.indexOf(here);
      if ((frame >= this.replan) || (i < 0)) {
        this.plan(player, map, tx, ty);
        this.replan = frame + AUTO.REPLAN;
        i = this.path.indexOf(here);
      }
      if ((i < 0) || (i + 1 >= this.path.length)) {
        this.setMove(player, false, false, false, false);
        return;
      }

      var next = this.path[i+1], nx = next % map.tw, ny = (next / map.tw) | 0,
          sp   = player.type.speed * 0.75,
          ex   = nx*TILE - player.x,
          ey   = ny*TILE - AUTO.LANE - player.y; // the hitbox hangs off the bottom of the sprite, so ride 4px high in the lane
      if (nx !== tx) {                                    // horizontal step: first get into the lane vertically
        if (Math.abs(ey) > sp) this.setMove(player, ey < 0, ey > 0, false, false);
        else                   this.setMove(player, false, false, ex < 0, ex > 0);
      }
      else {                                              // vertical step: first get into the lane horizontally
        if (Math.abs(ex) > sp) this.setMove(player, false, false, ex < 0, ex > 0);
        else                   this.setMove(player, ey < 0, ey > 0, false, false);
      }
    },

    // direction (0-7) of the nearest monster/generator lined up with the hero's shot, or -1
    aim: function(player, map) {
      var range = AUTO.RANGE * TILE, best = -1, bestAlong = Infinity, ents = map.entities, n, e, dx, dy, d, v, along;
      for(n = 0 ; n < ents.length ; n++) {
        e = ents[n];
        if (!e.active || !(e.monster || e.generator) || (e.monster && !e.type.canbeshot))
          continue;
        dx = e.x - player.x;
        dy = e.y - player.y;
        if ((Math.abs(dx) > range) || (Math.abs(dy) > range))
          continue;
        for(d = 0 ; d < 8 ; d++) {
          v     = DIRV[d];
          along = dx*v[0] + dy*v[1];
          if ((along <= 0) || (along >= bestAlong) || (Math.abs(dx*v[1] - dy*v[0]) > AUTO.AIM))
            continue;
          if (clearLine(map, player.x + TILE/2, player.y + TILE/2, e.x + TILE/2, e.y + TILE/2)) {
            best      = d;
            bestAlong = along;
          }
        }
      }
      return best;
    },

    shouldNuke: function(player, map) {
      var ents = map.entities, near = 0, close = 0, death = false, n, e, d;
      for(n = 0 ; n < ents.length ; n++) {
        e = ents[n];
        if (e.active && e.monster) {
          d = Math.max(Math.abs(e.x - player.x), Math.abs(e.y - player.y));
          if (d < 5*TILE) near++;
          if (d < 3*TILE) close++;
          if ((d < 4*TILE) && !e.type.canbeshot) death = true;
        }
      }
      return death || (near >= 6) || ((player.health < 150) && (close >= 2));
    },

    // cost of stepping onto a cell, or -1 if it can't be entered
    stepCost: function(cell, keys) {
      if (!cell || (cell.wall !== undefined) || cell.nothing)
        return -1;
      var cost = 1, occ = cell.occupied, i, o;
      for(i = 0 ; i < occ.length ; i++) {
        o = occ[i];
        if (o.door)           { if (keys < 1) return -1; cost += 6; }
        else if (o.generator) cost += 25;                        // would have to shoot it down first
        else if (o.treasure && o.type.damage) cost += 30;        // poison
      }
      return cost;
    },

    plan: function(player, map, sx, sy) {

      var tw = map.tw, N = tw * map.th, INF = 1000000000, MAXD = 4000, keys = player.keys,
          dist, prev, buckets = [], pending = 1, d, k, cur, n, x, y, nn, c, nd, i, e, ents = map.entities;

      if (!this.dist || (this.dist.length !== N)) {
        this.dist = new Int32Array(N);
        this.prev = new Int32Array(N);
      }
      dist = this.dist;
      prev = this.prev;
      for(i = 0 ; i < N ; i++) { dist[i] = INF; prev[i] = -1; }

      n = sx + sy*tw;
      dist[n] = 0;
      buckets[0] = [n];
      for(d = 0 ; (pending > 0) && (d <= MAXD) ; d++) {
        cur = buckets[d];
        if (!cur)
          continue;
        for(k = 0 ; k < cur.length ; k++) {
          n = cur[k];
          pending--;
          if (dist[n] !== d)
            continue;
          x = n % tw;
          y = (n / tw) | 0;
          for(i = 0 ; i < 4 ; i++) {
            var cx = x + (i === 0 ? 1 : i === 1 ? -1 : 0), cy = y + (i === 2 ? 1 : i === 3 ? -1 : 0);
            if ((cx < 0) || (cy < 0) || (cx >= tw) || (cy >= map.th))
              continue;
            nn = cx + cy*tw;
            c  = this.stepCost(map.cells[nn], keys);
            if (c < 0)
              continue;
            nd = d + c;
            if (nd < dist[nn]) {
              dist[nn] = nd;
              prev[nn] = n;
              (buckets[nd] = buckets[nd] || []).push(nn);
              pending++;
            }
          }
        }
        buckets[d] = null;
      }

      // pick a destination: treasure worth the detour, else the exit
      var exitAt = -1, exitD = INF, want = -1, wantD = INF, t, tn, td, limit, h = player.health;
      for(i = 0 ; i < ents.length ; i++) {
        e = ents[i];
        if (e.active && e.exit) {
          tn = p2t(e.x + TILE/2) + p2t(e.y + TILE/2) * tw;
          if (dist[tn] < exitD) { exitD = dist[tn]; exitAt = tn; }
        }
      }
      for(i = 0 ; i < ents.length ; i++) {
        e = ents[i];
        if (!e.active || !e.treasure || e.type.damage) // (never poison)
          continue;
        tn = p2t(e.x + TILE/2) + p2t(e.y + TILE/2) * tw;
        td = dist[tn];
        t  = e.type;
        if (t.key)          limit = ((exitD >= INF) && (keys < 1)) ? 400 : 14; // a key is essential if the exit is walled off
        else if (t.health)  limit = h < 300 ? 80 : h < 450 ? 14 : 0;
        else if (t.potion)  limit = 18;
        else                limit = 16;                                        // gold and the like
        if ((td < INF) && (td <= limit) && (td < wantD)) { want = tn; wantD = td; }
      }

      var goal = (want >= 0) ? want : exitAt;

      if (goal < 0) { // nothing reachable: wander somewhere reachable-ish
        var seen = 0;
        for(i = 0 ; i < N ; i++) {
          if ((dist[i] > 6) && (dist[i] < 60) && (Math.random() * ++seen < 1))
            goal = i;
        }
      }

      this.path = [];
      if (goal >= 0) {
        for(n = goal ; n >= 0 ; n = prev[n])
          this.path.push(n);
        this.path.reverse();
      }
    }

  });

  //===========================================================================
  // THE SCOREBOARD
  //===========================================================================

  var Scoreboard = Class.create({

    active: "active",

    initialize: function(level, score, who) {

      subscribe(EVENT.PLAYER_JOIN,  this.onPlayerJoin.bind(this));
      subscribe(EVENT.PLAYER_LEAVE, this.onPlayerLeave.bind(this));
      subscribe(EVENT.START_LEVEL,  this.onStartLevel.bind(this));

      this.dom      = $('scoreboard');
      this.level    = this.dom.down('.level');
      this.warrior  = this.playerDom(PLAYER.WARRIOR,  $('warrior'));
      this.valkyrie = this.playerDom(PLAYER.VALKYRIE, $('valkyrie')),
      this.wizard   = this.playerDom(PLAYER.WIZARD,   $('wizard')),
      this.elf      = this.playerDom(PLAYER.ELF,      $('elf'))
      this.high     = { dom: this.highScoreDom() };

      var p1 = this.warrior.down('.press b'),
          p2 = this.valkyrie.down('.press b'),
          p3 = this.wizard.down('.press b'),
          p4 = this.elf.down('.press b'),
          pressN = new Animator({ repeat: 'toggle', duration: 500 }).addSubject(function(value) {
            p1.fade(value);
            p2.fade(value);
            p3.fade(value);
            p4.fade(value);
          });
      pressN.play();

      [ PLAYER.WARRIOR, PLAYER.VALKYRIE, PLAYER.WIZARD, PLAYER.ELF ].forEach(function(type) { // clicking 'multiplayer' adds that hero as an AI ally
        type.dom.multi = type.dom.root.down('.multi');
        type.dom.multi.on('click', function() { game.toggleAlly(type); });
        this.refreshAllyPanel(type, false);
      }, this);

      this.refreshHighScore(score, who);
      this.refreshLevel(level);

    },

    refreshAllyPanel: function(type, on) {
      type.dom.root.toggleClassName('ally', on);
      type.dom.multi.update(on ? 'ALLY - click to dismiss' : 'click to join as ally');
      if (on)
        type.dom.score.update(this.formatScore(0));
    },

    refreshAllies: function(allies) {
      for(var n = 0 ; n < allies.length ; n++) {
        if (allies[n].score !== allies[n].vscore)
          allies[n].type.dom.score.update(this.formatScore(allies[n].vscore = allies[n].score));
      }
    },

    playerDom: function(type, root) {
      type.dom = {
        root:    root,
        score:   root.down('.score .value'),
        health:  root.down('.health .value'),
        keys:    root.select('.treasure .key'),
        potions: root.select('.treasure .potion'),
        weak:    new Animator({ repeat: 'toggle', duration: 500, onComplete: function() { root.removeAttribute('style'); } }).addSubject(new CSSStyleSubject(root, "weak", "background-color: #000000; border-color: #000000;"))
      }
      return root;
    },

    highScoreDom: function() {
      var score = this.dom.down('.high .value'),
          who   = this.dom.down('.high'),
          flash = new Animator({ repeat: 'toggle', duration: 500, onComplete: function() { who.fade(1); } }).addSubject(function(value) { who.fade(1 - value*0.8); });
      return { score: score, who: who, flash: flash };
    },

    onStartLevel: function(map) {
      this.refreshLevel(map.level);
    },

    onPlayerJoin: function(player) {
      player.vhealth = player.vweak = player.vscore = player.vkeys = player.vpotions = null; // reset any cached 'visual' values
      player.type.dom.root.toggleClassName(this.active, true);
      player.type.dom.score.update(this.formatScore(0));
      player.type.dom.health.update(this.formatHealth(0));
      this.refreshTreasure(player.type.dom.keys, 0);
      this.refreshTreasure(player.type.dom.potions, 0);
    },

    onPlayerLeave: function(player) {
      player.type.dom.root.toggleClassName(this.active, false);
      player.type.dom.weak.stop();
      this.deactivateHighScore();
    },

    formatHealth: function(n) { return to.string(Math.floor(n)); },
    formatScore:  function(n) { return ("000000" + Math.floor(n)).slice(-6); },

    inc: function(previous, current) {
      previous = previous || 0;
      return (current > previous) ?
        Math.min(current, previous + Math.ceil((current - previous)/10)) :
        Math.max(current, previous + Math.floor((current - previous)/10));
    },

    refreshLevel: function(level) {
      this.level.update(level.name);
    },

    refreshHighScore: function(score, who) {
      if (score != this.high.score)
        this.high.dom.score.update(this.formatScore(this.high.score = score));
      if (who != this.high.who)
        this.high.dom.who.setClassName("high " + (this.high.who = who));
    },

    activateHighScore:   function() { this.high.active = true;  this.high.dom.flash.play(); },
    deactivateHighScore: function() { this.high.active = false; this.high.dom.flash.stop(); },

    refreshPlayer: function(player) {
      this.refreshPlayerHealth(player);
      this.refreshPlayerWeak(player);
      this.refreshPlayerScore(player);
      this.refreshPlayerKeys(player);
      this.refreshPlayerPotions(player);
    },

    refreshPlayerScore: function(player) {
      if (player.score != player.vscore) {
        player.type.dom.score.update(this.formatScore(player.vscore = this.inc(player.vscore, player.score)));
        if (player.vscore > this.high.score) {
          this.refreshHighScore(player.vscore, player.type.name);
          if (!this.high.active) {
            this.activateHighScore();
            publish(EVENT.HIGH_SCORE, player);
          }
        }
      }
    },

    refreshPlayerHealth: function(player) {
      if (player.health != player.vhealth)
        player.type.dom.health.update(this.formatHealth(player.vhealth = this.inc(player.vhealth, player.health)));
    },

    refreshPlayerWeak: function(player) {
      if (player.weak() != player.vweak) {
        if (player.vweak = player.weak())
          player.type.dom.weak.play();
        else
          player.type.dom.weak.stop();
      }
    },

    refreshPlayerKeys: function(player) {
      if (player.keys != player.vkeys)
        this.refreshTreasure(player.type.dom.keys, player.vkeys = player.keys);
    },

    refreshPlayerPotions: function(player) {
      if (player.potions != player.vpotions)
        this.refreshTreasure(player.type.dom.potions, player.vpotions = player.potions);
    },

    refreshTreasure: function(elements, n) {
      var k, max;
      for(k = 0, max = elements.length ; k < max ; k++)
        elements[k].showIf(k < n);
    }

  });

  //===========================================================================
  // THE VIEWPORT
  //===========================================================================

  var Viewport = Class.create({

    initialize: function() {
      subscribe(EVENT.START_LEVEL, this.onStartLevel.bind(this));
    },

    onStartLevel: function(map) {
      this.size(VIEWPORT.TW, map);
      this.center(map.start, map);
      this.zoomingout = false;
    },

    outside: function(x, y, w, h) {
      return !Game.Math.overlap(x, y, w, h, this.x, this.y, this.w, this.h);
    },

    center: function(pos, map) {
      this.move(pos.x - this.w/2, pos.y - this.h/2, map);
    },

    move: function(x, y, map) {
      this.x = Game.Math.minmax(x, 0, map.w - this.w - 1);
      this.y = Game.Math.minmax(y, 0, map.h - this.h - 1);
    },

    size: function(tw, map) {
      this.tw = Game.Math.minmax(tw, 18, map.th < map.tw ? map.tw : map.th * (VIEWPORT.TW/VIEWPORT.TH));
      this.th = this.tw * (VIEWPORT.TH / VIEWPORT.TW);
      this.w  = this.tw * TILE;
      this.h  = this.th * TILE;
      game.runner.setSize(this.w, this.h);
    },

    zoom: function(tx, pos, map) {
      this.size(this.tw + tx, map);
      this.center(pos, map);
    },

    zoomout: function(on) {
      this.zoomingout = on
    },

    update: function(frame, player, map, viewport) {
      this.center(player, map);
      if (this.zoomingout)
        this.zoom(1/TILE, player, map);
    }

  });

  //===========================================================================
  // RENDERING CODE
  //===========================================================================

  var Render = Class.create({

    initialize: function(sprites) {
      this.sprites = sprites;
    },

    sprite: function(ctx, sprites, viewport, sx, sy, x, y, w, h) {
      ctx.drawImage(sprites, sx * STILE, sy * STILE, STILE, STILE, x - viewport.x, y - viewport.y, w || TILE, h || TILE);
    },

    tile: function(ctx, sprites, sx, sy, tx, ty) {
      ctx.drawImage(sprites, sx * STILE, sy * STILE, STILE, STILE, tx * TILE, ty * TILE, TILE, TILE);
    },

    map: function(ctx, frame, viewport, map) {
      var w = Math.min(map.w, viewport.w),
          h = Math.min(map.h, viewport.h);
      map.background = map.background || Game.renderToCanvas(map.w, map.h, this.maptiles.bind(this, map));
      ctx.drawImage(map.background, viewport.x, viewport.y, w, h, 0, 0, w, h);
    },

    maptiles: function(map, ctx) {
      var n, cell, tx, ty, tw, th, sprites = this.sprites.backgrounds;
      for(ty = 0, th = map.th ; ty < th ; ty++) {
        for(tx = 0, tw = map.tw ; tx < tw ; tx++) {
          cell = map.cell(tx * TILE, ty * TILE);
          if (is.valid(cell.wall))
            this.tile(ctx, sprites, cell.wall, DEBUG.WALL || map.level.wall, tx, ty);
          else if (cell.nothing)
            this.tile(ctx, sprites, 0, 0, tx, ty);
          else
            this.tile(ctx, sprites, DEBUG.FLOOR || map.level.floor, 0, tx, ty);
          if (cell.shadow)
            this.tile(ctx, sprites, cell.shadow, WALL.MAX+1, tx, ty);
        }
      }
      if (DEBUG.GRID)
        this.grid(ctx, map);
    },

    grid: function(ctx, map) {
      var tx, ty, tw, th;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      for(ty = 0, th = map.th ; ty < th ; ty++) {
        ctx.moveTo( 0,     ty * TILE);
        ctx.lineTo( map.w, ty * TILE);
      }
      for(tx = 0, tw = map.tw ; tx < tw ; tx++) {
        ctx.moveTo( tx * TILE, 0     );
        ctx.lineTo( tx * TILE, map.h );
      }
      ctx.stroke();
    },

    player: function(ctx, frame, viewport, player) {

      if (player.onrender(frame) !== false) {

        var sprites = this.sprites.entities,
            sx      = player.type.sx + player.frame,
            sy      = player.type.sy,
            x       = player.x,
            y       = player.y - 2, // wiggle, wiggle, wiggle
            exiting = player.exiting ? (player.exiting.max - player.exiting.count) / player.exiting.max : 0,
            dx      = player.exiting ? (exiting * 2 * player.exiting.dx) : 0,
            dy      = player.exiting ? (exiting * 2 * player.exiting.dy) : 0,
            shrink  = player.exiting ? (exiting * 2 * TILE)              : 0,
            weak    = player.weak(),
            hurt    = player.hurting,
            heal    = player.healing,
            border  = 0,
            maxglow = FX.PLAYER_GLOW.border;

        if (exiting > 0.5) // player is 'gone' once halfway through exit
          return;

        if (hurt || heal) {
          border = Math.ceil(maxglow * ((hurt || heal) / FX.PLAYER_GLOW.frames));
          player.ctx.fillStyle = hurt ? 'red' : 'green';
          player.ctx.fillRect(0, 0, player.canvas.width, player.canvas.height);
          player.ctx.globalCompositeOperation = 'destination-in';
          player.ctx.drawImage(sprites, sx * STILE, sy * STILE, STILE, STILE, maxglow - border, maxglow - border, STILE + 2*border, STILE + 2*border);
          player.ctx.globalCompositeOperation = 'source-over';
        }
        else {
          player.ctx.clearRect(0, 0, player.canvas.width, player.canvas.height);
        }

        player.ctx.globalAlpha = 1 - (weak ? player.type.dom.weak.state*0.9 : 0); // piggy back the DOM scoreboard animator (but dont go completely transparent)
        player.ctx.drawImage(sprites, sx * STILE, sy * STILE, STILE, STILE, maxglow, maxglow, STILE, STILE);

        ctx.drawImage(player.canvas, 0, 0, STILE + 2*maxglow, STILE + 2*maxglow, x + dx - maxglow + shrink/2 - viewport.x, y + dy - maxglow + shrink/2 - viewport.y, TILE + 2*maxglow - shrink, TILE + 2*maxglow - shrink);
      }
    },

    allies: function(ctx, frame, viewport, allies) {
      var n, a, sprites = this.sprites.entities;
      for(n = allies.length - 1 ; n >= 0 ; n--) { // furthest-back ally first
        a = allies[n];
        a.onrender(frame);
        if (!viewport.outside(a.x, a.y, TILE, TILE))
          this.sprite(ctx, sprites, viewport, a.type.sx + a.frame, a.type.sy, a.x, a.y - 2);
      }
    },

    banner: function(ctx, text, x, y, color) {
      ctx.save();
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      ctx.restore();
    },

    paused: function(ctx, viewport) {
      ctx.save();
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, viewport.w, viewport.h);
      ctx.textAlign = "center";
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 40px monospace";
      ctx.fillText("PAUSED", viewport.w/2, viewport.h/2);
      ctx.font = "bold 16px monospace";
      ctx.fillText("press ENTER to resume", viewport.w/2, viewport.h/2 + 30);
      ctx.restore();
    },

    demo: function(ctx, frame, viewport) {
      ctx.save();
      ctx.font = "bold 14px monospace";
      ctx.fillStyle = (Math.floor(frame/30) % 2) ? "#FFFFFF" : "#F90503";
      ctx.fillText("DEMO - press T or any arrow key to play", 8, 20);
      ctx.restore();
    },

    entities: function(ctx, frame, viewport, entities) {
      var n, max, entity, sf, sprites = this.sprites.entities;
      for(n = 0, max = entities.length ; n < max ; n++) {
        entity = entities[n];
        if (entity.active && (!entity.onrender || entity.onrender(frame) !== false) && !viewport.outside(entity.x, entity.y, TILE, TILE)) {
          this.sprite(ctx, sprites, viewport, entity.type.sx + (entity.frame || 0), entity.type.sy, entity.x + (entity.dx || 0), entity.y + (entity.dy || 0), TILE + (entity.dw || 0), TILE + (entity.dh || 0));
        }
      }
    }

  });

  //===========================================================================
  // SOUND FX and MUSIC
  //===========================================================================

  var Sounds = Class.create({

    initialize: function(sounds) {
      this.sounds      = sounds;
      this.sounds.menu = this.sounds.lostcorridors;
      this.sounds.game = this.sounds.thebeginning;
      this.sounds.fire = this.sounds.firewizard;     // re-use wizard firing sound for monster (demon) fire
      this.sounds.nuke = this.sounds.generatordeath; // TODO: find a big bang explosion
      this.toggleMute(this.isMute());

      $('sound').on('click', this.onClickMute.bind(this)).show();

      subscribe(EVENT.START_LEVEL,        this.onStartLevel.bind(this));
      subscribe(EVENT.PLAYER_FIRE,        this.onPlayerFire.bind(this));
      subscribe(EVENT.MONSTER_FIRE,       this.onMonsterFire.bind(this));
      subscribe(EVENT.PLAYER_EXITING,     this.onPlayerExiting.bind(this));
      subscribe(EVENT.PLAYER_HURT,        this.onPlayerHurt.bind(this));
      subscribe(EVENT.PLAYER_NUKE,        this.onPlayerNuke.bind(this));
      subscribe(EVENT.DOOR_OPEN,          this.onDoorOpen.bind(this));
      subscribe(EVENT.TREASURE_COLLECTED, this.onTreasureCollected.bind(this));
      subscribe(EVENT.MONSTER_DEATH,      this.onMonsterDeath.bind(this));
      subscribe(EVENT.GENERATOR_DEATH,    this.onGeneratorDeath.bind(this));
      subscribe(EVENT.HIGH_SCORE,         this.onHighScore.bind(this));
      subscribe(EVENT.PLAYER_DEATH,       this.onPlayerDeath.bind(this));
    },

    onStartLevel:        function(map)               { this.playGameMusic(this.sounds[DEBUG.MUSIC || map.level.music]); this.nlevel = map.nlevel;             },
    onPlayerFire:        function(player)            { this.play(this.sounds["fire" + player.type.name]);                                                     },
    onMonsterFire:       function(monster)           { this.play(this.sounds.fire);                                                                           },
    onDoorOpen:          function(door)              { this.play(this.sounds.opendoor);                                                                       },
    onTreasureCollected: function(treasure, player)  { this.play(this.sounds["collect" + treasure.type.sound]);                                               },
    onMonsterDeath:      function(monster, by, nuke) { this.play(nuke ? this.sounds.generatordeath : this.sounds["monsterdeath" + Game.Math.randomInt(1,3)]); },
    onGeneratorDeath:    function(generator, by)     { this.play(this.sounds.generatordeath);                                                                 },
    onHighScore:         function(player)            { this.play(this.sounds.highscore);                                                                      },
    onPlayerNuke:        function(player)            { this.play(this.sounds.nuke);                                                                           },
    onPlayerDeath:       function(player)            { this.stopAllMusic(); this.play(this.sounds.gameover); },

    onPlayerExiting: function(player, exit) {
      this.play(this.sounds.exitlevel);
      if (this.nlevel === (cfg.levels.length-1)) {
        this.sounds.game.stop();
        this.play(this.sounds.victory);
      }
      else if (cfg.levels[this.nlevel].music != cfg.levels[this.nlevel+1].music) {
        this.sounds.game.fade(3000);
      }
    },

    onPlayerHurt: function(player, damage) {
      if (!player.hurtSound || player.hurtSound.ended) // only play 1 at a time
        player.hurtSound = this.play(this.sounds[player.type.sex + "pain" + Game.Math.randomInt(1,2)]);
    },

    onClickMute: function(event) {
      this.toggleMute(this.isNotMute());
      this.toggleMusic();
    },

    toggleMute: function(on) {
      AudioFX.mute = game.storage.mute = on;
      $('soundBtn').update(on ? 'SOUND OFF (M)' : 'SOUND ON (M)');
      $('soundBtn').toggleClassName('off', on);
      $('sound').setClassName(AudioFX.mute ? 'off' : 'on');
    },

    toggleMusic: function() {
      if (AudioFX.mute)
        this.stopAllMusic();
      else if (game.is('menu'))
        this.playMenuMusic();
      else if (game.is('loading') || game.is('playing') || game.is('lost'))
        this.playGameMusic();
    },

    isMute:    function()  { return to.bool(game.storage.mute);     },
    isNotMute: function()  { return !this.isMute();                 },
    play:      function(s) { if (this.isNotMute()) return s.play(); },

    stopAllMusic: function() {
      this.sounds.menu.stop();
      this.sounds.game.stop();
    },

    playMenuMusic: function() {
      this.stopAllMusic();
      this.play(this.sounds.menu);
    },

    playGameMusic: function(sound) {
      if (!sound || (sound !== this.sounds.game) || sound.audio.ended || sound.audio.paused) { // skip if specified game sound is already playing (leave it playing, dont restart it)
        this.stopAllMusic();
        this.play(this.sounds.game = sound || this.sounds.game);
      }
    }

  });

  //===========================================================================
  // FINALLY, return the game to the Game.Runner
  //===========================================================================

  return game;

  //===========================================================================

}

