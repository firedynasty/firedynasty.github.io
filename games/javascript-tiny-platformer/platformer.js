(function() { // module pattern

  //-------------------------------------------------------------------------
  // POLYFILLS
  //-------------------------------------------------------------------------
  
  if (!window.requestAnimationFrame) { // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    window.requestAnimationFrame = window.webkitRequestAnimationFrame || 
                                   window.mozRequestAnimationFrame    || 
                                   window.oRequestAnimationFrame      || 
                                   window.msRequestAnimationFrame     || 
                                   function(callback, element) {
                                     window.setTimeout(callback, 1000 / 60);
                                   }
  }

  //-------------------------------------------------------------------------
  // UTILITIES
  //-------------------------------------------------------------------------
  
  function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
  }
  
  function bound(x, min, max) {
    return Math.max(min, Math.min(max, x));
  }

  function get(url, onsuccess) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if ((request.readyState == 4) && (request.status == 200))
        onsuccess(request);
    }
    request.open("GET", url, true);
    request.send();
  }

  function overlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    return !(((x1 + w1 - 1) < x2) ||
             ((x2 + w2 - 1) < x1) ||
             ((y1 + h1 - 1) < y2) ||
             ((y2 + h2 - 1) < y1))
  }
  
  //-------------------------------------------------------------------------
  // GAME CONSTANTS AND VARIABLES
  //-------------------------------------------------------------------------
  
  var MAP      = { tw: 64, th: 48 },
      TILE     = 32,
      METER    = TILE,
      GRAVITY  = 9.8 * 6, // default (exagerated) gravity
      MAXDX    = 15,      // default max horizontal speed (15 tiles per second)
      MAXDY    = 60,      // default max vertical speed   (60 tiles per second)
      ACCEL    = 1/2,     // default take 1/2 second to reach maxdx (horizontal acceleration)
      FRICTION = 1/6,     // default take 1/6 second to stop from maxdx (horizontal friction)
      IMPULSE  = 1500,    // default player jump impulse
      COLOR    = { BLACK: '#000000', YELLOW: '#ECD078', BRICK: '#D95B43', PINK: '#C02942', PURPLE: '#542437', GREY: '#333', SLATE: '#53777A', GOLD: 'gold' },
      COLORS   = [ COLOR.YELLOW, COLOR.BRICK, COLOR.PINK, COLOR.PURPLE, COLOR.GREY ],
      KEY      = { ENTER: 13, ESC: 27, R: 82, T: 84, SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
      
  var fps      = 60,
      step     = 1/fps,
      canvas   = document.getElementById('canvas'),
      ctx      = canvas.getContext('2d'),
      width    = canvas.width  = MAP.tw * TILE,
      height   = canvas.height = MAP.th * TILE,
      levelArg = (/[?&]level=(\d+)/.exec(window.location.search) || [])[1],
      levelUrl = levelArg ? "thomas-level-" + levelArg + ".json" : "level.json",
      player   = {},
      monsters = [],
      treasure = [],
      cells    = [],
      paused   = false,
      demo     = false;
  
  var t2p      = function(t)     { return t*TILE;                  },
      p2t      = function(p)     { return Math.floor(p/TILE);      },
      cell     = function(x,y)   { return tcell(p2t(x),p2t(y));    },
      tcell    = function(tx,ty) { return cells[tx + (ty*MAP.tw)]; };
  
  
  //-------------------------------------------------------------------------
  // UPDATE LOOP
  //-------------------------------------------------------------------------

  function onkey(ev, key, down) {
    if (demo && down && ev.isTrusted && (key == KEY.LEFT || key == KEY.RIGHT || key == KEY.SPACE))
      setDemo(false); // taking the controls ends the demo
    if (down && !ev.repeat) {
      switch(key) {
        case KEY.ENTER:
        case KEY.ESC: togglePause(); ev.preventDefault(); return false;
        case KEY.T:   setDemo(!demo); ev.preventDefault(); return false;
        case KEY.R:   restart();      ev.preventDefault(); return false;
      }
    }
    if (demo)
      return;
    switch(key) {
      case KEY.LEFT:  player.left  = down; ev.preventDefault(); return false;
      case KEY.RIGHT: player.right = down; ev.preventDefault(); return false;
      case KEY.SPACE: player.jump  = down; ev.preventDefault(); return false;
    }
  }
  
  //-------------------------------------------------------------------------
  // PAUSE AND DEMO MODE
  //-------------------------------------------------------------------------

  function togglePause(force) {
    paused = (typeof force === 'boolean') ? force : !paused;
    document.getElementById('pauseBtn').innerHTML = paused ? 'RESUME' : 'PAUSE';
    document.getElementById('pauseMsg').style.display = paused ? 'block' : 'none';
  }

  function setDemo(on) {
    demo = on;
    player.left = player.right = player.jump = false;
    document.getElementById('demoBtn').innerHTML = demo ? 'STOP DEMO' : 'DEMO';
    if (demo && paused)
      togglePause(false);
  }

  // Autopilot: plan a route over the tile map (walk, drop, jump) to the nearest
  // reachable gold, then steer along it. If no route exists it falls back to
  // heading straight for the gold and hopping over whatever is in the way.
  var JUMP_UP = 5, JUMP_ACROSS = 7;
  var plan = [], planKey = "", apLastX = 0, apCheck = 0, apEscape = 0, apDir = 1;
  var runCommit = null, runCommitCooldown = 0;

  function solid(tx, ty)    { return tx < 0 || tx >= MAP.tw || ty < 0 ? true : !!tcell(tx, ty); }
  function standable(tx, ty){ return tx >= 0 && tx < MAP.tw && ty >= 0 && ty < MAP.th - 1 && !solid(tx, ty) && solid(tx, ty + 1); }

  function emptyBox(x0, x1, y0, y1) {   // true if no solid tile in the inclusive box
    var x, y;
    for(x = Math.min(x0, x1) ; x <= Math.max(x0, x1) ; x++)
      for(y = y0 ; y <= y1 ; y++)
        if (solid(x, y)) return false;
    return true;
  }

  function neighbours(tx, ty) {
    var out = [], d, dx, dy, y, top, nx;
    for(d = -1 ; d <= 1 ; d += 2) {
      nx = tx + d;
      if (solid(nx, ty)) continue;
      if (standable(nx, ty)) { out.push([nx, ty, 1]); continue; }
      for(y = ty + 1 ; y < MAP.th - 1 ; y++) {          // walk off the edge and drop
        if (solid(nx, y)) break;
        if (standable(nx, y)) { out.push([nx, y, 1]); break; }
      }
    }
    for(dx = -JUMP_ACROSS ; dx <= JUMP_ACROSS ; dx++) {
      if (!dx) continue;
      for(dy = -JUMP_UP ; dy <= 6 ; dy++) {
        nx = tx + dx; y = ty + dy;
        if (!standable(nx, y)) continue;
        top = Math.min(ty, y) - 1;
        if (!emptyBox(tx, nx, top, Math.min(ty, y))) continue;
        if (dy < 0 && !emptyBox(tx, tx, y, ty)) continue;
        if (dy > 0 && !emptyBox(nx, nx, ty, y)) continue;
        out.push([nx, y, 3 + 2 * Math.abs(dx) + (dy <= -5 ? 25 : 0)]);   // 5-tile climbs barely clear: last resort   // prefer short jumps from the very edge
      }
    }
    return out;
  }

  function findPlan(sx, sy) {
    var goals = {}, n, t, gx, gy, k, y, buckets = [[[sx, sy]]], dist = {}, prev = {}, c, b, cur, nb, nd, key, path;
    for(n = 0 ; n < treasure.length ; n++) {
      t = treasure[n];
      if (t.collected) continue;
      gx = p2t(t.x + TILE/2); gy = p2t(t.y + TILE/2);
      for(k = -1 ; k <= 1 ; k++)
        for(y = gy ; y <= gy + JUMP_UP ; y++)
          if (emptyBox(gx + k, gx + k, gy, y) && emptyBox(gx, gx + k, gy, gy))   // no ceiling in the way
            goals[(gx + k) + "," + y] = gx;
    }
    dist[sx + "," + sy] = 0;
    prev[sx + "," + sy] = null;
    for(c = 0 ; c < buckets.length ; c++) {          // Dijkstra with small integer costs
      b = buckets[c] || [];
      for(n = 0 ; n < b.length ; n++) {
        cur = b[n];
        key = cur[0] + "," + cur[1];
        if (dist[key] !== c) continue;
        if (goals[key] !== undefined) {
          path = [];
          for( ; cur ; cur = prev[cur[0] + "," + cur[1]]) path.unshift(cur);
          return path;
        }
        nb = neighbours(cur[0], cur[1]);
        for(k = 0 ; k < nb.length ; k++) {
          nd  = c + nb[k][2];
          key = nb[k][0] + "," + nb[k][1];
          if (!(key in dist) || nd < dist[key]) {
            dist[key] = nd;
            prev[key] = cur;
            (buckets[nd] = buckets[nd] || []).push(nb[k]);
          }
        }
      }
    }
    return [];
  }

  function nearestTreasure() {
    var n, t, best, bestd = Infinity, d;
    for(n = 0 ; n < treasure.length ; n++) {
      t = treasure[n];
      d = Math.abs(t.x - player.x) + Math.abs(t.y - player.y);
      if (!t.collected && d < bestd) { best = t; bestd = d; }
    }
    return best;
  }

  var apGot = -1, apIdle = 0, apMinX = 0, apMaxX = 0, apMinY = 0, apMaxY = 0, apStill = 0, apNudge = 0, apNudgeN = 0, apNudgeDir = 1;

  function autopilot() {
    var got = 0;
    for(var g = 0 ; g < treasure.length ; g++)
      if (treasure[g].collected) got++;
    if (got !== apGot) { apGot = got; apIdle = 0; }
    else if (++apIdle > 60 * 45) {     // no new gold for 45 seconds: the demo is stuck, start the level over
      apIdle = 0; apGot = -1;
      restart();
      return;
    }
    // rocking back and forth in a small area for ~2.5s: nudge sideways (toward the next waypoint, then right,
    // then left) and re-plan
    if (!apStill) { apMinX = apMaxX = player.x; apMinY = apMaxY = player.y; }
    apMinX = Math.min(apMinX, player.x); apMaxX = Math.max(apMaxX, player.x);
    apMinY = Math.min(apMinY, player.y); apMaxY = Math.max(apMaxY, player.y);
    if (++apStill >= 150) {
      var cramped = (apMaxX - apMinX) < TILE * 2 && (apMaxY - apMinY) < TILE * 2;
      apStill = 0;
      if (cramped && !apNudge) {
        apNudgeN++;
        apNudge = 30;
        apNudgeDir = apNudgeN % 3 == 1 && plan.length > 1 && plan[1][0] != plan[0][0] ? (plan[1][0] > plan[0][0] ? 1 : -1)
                   : apNudgeN % 3 == 2 ? 1 : -1;
        runCommit = null; plan = []; planKey = "";
      }
    }
    if (apNudge > 0) {
      apNudge--;
      player.left  = apNudgeDir < 0;
      player.right = apNudgeDir > 0;
      player.jump  = !player.falling && apNudge % 12 == 0;
      return;
    }

    var n, best = nearestTreasure(), dir, tx, ty, ahead, gap, wall, danger, next, here, key;

    if (!best) {                       // everything collected: start over
      for(n = 0 ; n < treasure.length ; n++)
        treasure[n].collected = false;
      player.collected = 0;
      killPlayer(player);
      plan = []; planKey = "";
      return;
    }

    tx = p2t(player.x + TILE/2);
    ty = Math.round(player.y / TILE);
    if (!standable(tx, ty)) {          // straddling two tiles: use the one with floor under it
      if (standable(p2t(player.x), ty))               tx = p2t(player.x);
      else if (standable(p2t(player.x + TILE - 1), ty)) tx = p2t(player.x + TILE - 1);
    }
    player.left = player.right = player.jump = false;

    if (!player.falling && standable(tx, ty)) {   // on the ground: (re)plan when the situation changes
      key = tx + "," + ty + "," + treasure.filter(function(t) { return t.collected; }).length;
      if (key !== planKey) {
        planKey = key;
        plan = findPlan(tx, ty);
      }
    }

    if (runCommitCooldown > 0)
      runCommitCooldown--;
    if (player.falling || (runCommit && (Math.round(player.y / TILE) !== runCommit.hy || ++runCommit.t > 150))) {
      if (runCommit && runCommit.t > 150)
        runCommitCooldown = 300;       // the run-up isn't working here: fall back to standing jumps for a while
      runCommit = null;
    }
    if (runCommit && plan.length > 1) {   // committed to a run-up: ignore the route until we jump
      var rc = runCommit, bx = t2p(rc.hx - rc.sgn * rc.back);
      if (rc.phase == 1 && Math.abs(player.x - bx) <= 8)
        rc.phase = 2;
      if (rc.phase == 1)
        dir = bx > player.x ? 1 : -1;
      else {
        dir = rc.sgn;
        if ((player.x - t2p(rc.hx)) * rc.sgn >= -6) {
          player.jump = true;
          runCommit = null;
        }
      }
      player.left  = dir < 0;
      player.right = dir > 0;
      return;
    }

    if (plan.length > 1) {
      next = plan[1];
      dir  = (t2p(next[0]) - player.x) > TILE/6 ? 1 : (t2p(next[0]) - player.x) < -TILE/6 ? -1 : 0;
      here = plan[0];
      if (next[1] > here[1] && next[0] != here[0])    // dropping off an edge: keep walking until we fall
        dir = next[0] > here[0] ? 1 : -1;
      if (player.falling) {            // in the air: brake so we land on the target tile
        var dist = t2p(next[0]) - player.x, v = player.dx;
        if (v * dist > 0 && v * v / (2 * 1900) >= Math.abs(dist) - 4)
          dir = -(v > 0 ? 1 : -1);
        else
          dir = Math.abs(dist) > 4 ? (dist > 0 ? 1 : -1) : 0;
        if (dir && player.dy < 0) {    // rising: don't push into a ledge face, we would bump our head on it
          var col = dir > 0 ? p2t(player.x + TILE + 6) : p2t(player.x - 7), r;
          for(r = p2t(player.y - 14) ; r <= p2t(player.y + TILE - 1) ; r++)
            if (solid(col, r)) { dir = (player.dx * dir > 0) ? -dir : 0; break; }   // blocked: cancel any drift into it
        }
      }
      var isJump = next[1] < here[1] || Math.abs(next[0] - here[0]) > 1 ||
            (next[1] == here[1] && !standable(here[0] + (next[0] > here[0] ? 1 : -1), here[1]));
      var running = false;
      if (isJump && !player.falling && Math.abs(next[0] - here[0]) >= 5) {
        var sgn = next[0] > here[0] ? 1 : -1, back = 0;
        if (player.dx * sgn >= 300) {
          // already at a run: just keep going and jump as we reach the edge
          running = true;
          dir = sgn;
          if ((player.x - t2p(here[0])) * sgn < -6)
            isJump = false;
        }
        else if (!runCommit && !runCommitCooldown) {
          // long jump from a standstill: commit to backing up for a run-up
          while (back < 6 && standable(here[0] - sgn * (back + 1), here[1])) back++;
          runCommit = { t: 0, hx: here[0], hy: here[1], sgn: sgn, back: back, phase: back >= 2 ? 1 : 2 };
          isJump = false;                // the run-up starts next frame
          running = true;
        }
      }
      if (runCommit)
        running = true;
      if (isJump && !player.falling && !running) {   // line up with the launch tile first, so we don't bump a ledge overhead
        // aim a hair away from the ledge we are jumping to, so we don't clip its corner on the way up
        var bias = next[0] < here[0] ? 2 : next[0] > here[0] ? -2 : 0;
        if (bias && solid(here[0] + (bias > 0 ? 1 : -1), here[1]))
          bias = 0;                      // wall on that side: can't lean that way
        var off = t2p(here[0]) + bias - player.x;
        if (Math.abs(off) > 1.5) {
          var v0 = player.dx;
          // coast to a stop on the launch tile instead of overshooting the ledge edge
          var want = off > 0 ? 1 : -1;
          if (Math.abs(off) <= 8)        // close: nudge in tiny pulses so we never overshoot
            dir = Math.abs(v0) < 12 ? want : 0;
          else
            dir = (v0 * off > 0 && v0 * v0 / (2 * 2880) >= Math.abs(off) - 4) ? 0 : want;
          isJump = false;
        }
        else if (Math.abs(player.dx) > 20 && Math.abs(next[0] - here[0]) <= 2) {
          dir = 0;                       // lined up, but still drifting: wait to stop, or we clip the ledge corner
          isJump = false;
        }
      }
      player.left  = dir < 0;
      player.right = dir > 0;
      if (isJump && !player.falling) {
        player.jump = true;
        if (next[1] < here[1] && Math.abs(next[0] - here[0]) <= 2)
          player.left = player.right = false;   // short hop up a ledge: go straight up first
      }
    }
    else {                             // no route: head straight for the gold
      dir = Math.abs(best.x - player.x) < TILE/2 ? 0 : (best.x > player.x ? 1 : -1);
      if (apEscape > 0) { apEscape--; dir = -apDir; }
      else if (++apCheck >= 120) {
        apCheck = 0;
        if (dir && Math.abs(player.x - apLastX) < TILE) { apEscape = 45; apDir = dir; }
        apLastX = player.x;
      }
      player.left  = dir < 0;
      player.right = dir > 0;
      if (!player.falling) {
        ahead = tx + (dir || 1);
        wall  = solid(ahead, ty);
        gap   = !solid(ahead, ty + 1) && !solid(ahead, ty + 2);
        if (dir && (wall || (gap && best.y <= player.y + TILE*2)))
          player.jump = true;
        else if (best.y < player.y - 2 && (!dir || apCheck % 30 == 0))
          player.jump = true;
        else if (apEscape > 0)
          player.jump = true;
      }
    }

    if (!player.falling) {             // hop over monsters
      danger = false;
      for(n = 0 ; n < monsters.length ; n++)
        if (Math.abs(monsters[n].y - player.y) < TILE && Math.abs(monsters[n].x - player.x) < TILE*3)
          danger = true;
      if (danger)
        player.jump = true;
    }
  }

  function update(dt) {
    updatePlayer(dt);
    updateMonsters(dt);
    checkTreasure();
  }

  function updatePlayer(dt) {
    updateEntity(player, dt);
    if (player.y > height)   // fell out of the map (Thomas levels have open pits)
      killPlayer(player);
  }

  function updateMonsters(dt) {
    var n, max;
    for(n = 0, max = monsters.length ; n < max ; n++)
      updateMonster(monsters[n], dt);
  }

  function updateMonster(monster, dt) {
    if (!monster.dead) {
      updateEntity(monster, dt);
      if (overlap(player.x, player.y, TILE, TILE, monster.x, monster.y, TILE, TILE)) {
        if ((player.dy > 0) && (monster.y - player.y > TILE/2))
          killMonster(monster);
        else
          killPlayer(player);
      }
    }
  }

  function checkTreasure() {
    var n, max, t;
    for(n = 0, max = treasure.length ; n < max ; n++) {
      t = treasure[n];
      if (!t.collected && overlap(player.x, player.y, TILE, TILE, t.x, t.y, TILE, TILE))
        collectTreasure(t);
    }
  }

  function killMonster(monster) {
    player.killed++;
    monster.dead = true;
  }

  function killPlayer(player) {
    player.x = player.start.x;
    player.y = player.start.y;
    player.dx = player.dy = 0;
  }

  function collectTreasure(t) {
    player.collected++;
    t.collected = true;
  }

  function updateEntity(entity, dt) {
    var wasleft    = entity.dx  < 0,
        wasright   = entity.dx  > 0,
        falling    = entity.falling,
        friction   = entity.friction * (falling ? 0.5 : 1),
        accel      = entity.accel    * (falling ? 0.5 : 1);
  
    entity.ddx = 0;
    entity.ddy = entity.gravity;
  
    if (entity.left)
      entity.ddx = entity.ddx - accel;
    else if (wasleft)
      entity.ddx = entity.ddx + friction;
  
    if (entity.right)
      entity.ddx = entity.ddx + accel;
    else if (wasright)
      entity.ddx = entity.ddx - friction;
  
    if (entity.jump && !entity.jumping && !falling) {
      entity.ddy = entity.ddy - entity.impulse; // an instant big force impulse
      entity.jumping = true;
    }
  
    entity.x  = entity.x  + (dt * entity.dx);
    entity.y  = entity.y  + (dt * entity.dy);
    entity.dx = bound(entity.dx + (dt * entity.ddx), -entity.maxdx, entity.maxdx);
    entity.dy = bound(entity.dy + (dt * entity.ddy), -entity.maxdy, entity.maxdy);
  
    if ((wasleft  && (entity.dx > 0)) ||
        (wasright && (entity.dx < 0))) {
      entity.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
    }
  
    var tx        = p2t(entity.x),
        ty        = p2t(entity.y),
        nx        = entity.x%TILE,
        ny        = entity.y%TILE,
        cell      = tcell(tx,     ty),
        cellright = tcell(tx + 1, ty),
        celldown  = tcell(tx,     ty + 1),
        celldiag  = tcell(tx + 1, ty + 1);
  
    if (entity.dy > 0) {
      if ((celldown && !cell) ||
          (celldiag && !cellright && nx)) {
        entity.y = t2p(ty);
        entity.dy = 0;
        entity.falling = false;
        entity.jumping = false;
        ny = 0;
      }
    }
    else if (entity.dy < 0) {
      if ((cell      && !celldown) ||
          (cellright && !celldiag && nx)) {
        entity.y = t2p(ty + 1);
        entity.dy = 0;
        cell      = celldown;
        cellright = celldiag;
        ny        = 0;
      }
    }
  
    if (entity.dx > 0) {
      if ((cellright && !cell) ||
          (celldiag  && !celldown && ny)) {
        entity.x = t2p(tx);
        entity.dx = 0;
      }
    }
    else if (entity.dx < 0) {
      if ((cell     && !cellright) ||
          (celldown && !celldiag && ny)) {
        entity.x = t2p(tx + 1);
        entity.dx = 0;
      }
    }

    if (entity.monster) {
      if (entity.left && (cell || !celldown)) {
        entity.left = false;
        entity.right = true;
      }      
      else if (entity.right && (cellright || !celldiag)) {
        entity.right = false;
        entity.left  = true;
      }
    }
  
    entity.falling = ! (celldown || (nx && celldiag));
  
  }

  //-------------------------------------------------------------------------
  // RENDERING
  //-------------------------------------------------------------------------
  
  function render(ctx, frame, dt) {
    ctx.clearRect(0, 0, width, height);
    renderMap(ctx);
    renderTreasure(ctx, frame);
    renderPlayer(ctx, dt);
    renderMonsters(ctx, dt);
  }

  function renderMap(ctx) {
    var x, y, cell;
    for(y = 0 ; y < MAP.th ; y++) {
      for(x = 0 ; x < MAP.tw ; x++) {
        cell = tcell(x, y);
        if (cell) {
          ctx.fillStyle = COLORS[cell - 1];
          ctx.fillRect(x * TILE, y * TILE, TILE, TILE);
        }
      }
    }
  }

  function renderPlayer(ctx, dt) {
    ctx.fillStyle = COLOR.YELLOW;
    ctx.fillRect(player.x + (player.dx * dt), player.y + (player.dy * dt), TILE, TILE);

    var n, max;

    ctx.fillStyle = COLOR.GOLD;
    for(n = 0, max = player.collected ; n < max ; n++)
      ctx.fillRect(t2p(2 + n), t2p(2), TILE/2, TILE/2);

    ctx.fillStyle = COLOR.SLATE;
    for(n = 0, max = player.killed ; n < max ; n++)
      ctx.fillRect(t2p(2 + n), t2p(3), TILE/2, TILE/2);
  }

  function renderMonsters(ctx, dt) {
    ctx.fillStyle = COLOR.SLATE;
    var n, max, monster;
    for(n = 0, max = monsters.length ; n < max ; n++) {
      monster = monsters[n];
      if (!monster.dead)
        ctx.fillRect(monster.x + (monster.dx * dt), monster.y + (monster.dy * dt), TILE, TILE);
    }
  }

  function renderTreasure(ctx, frame) {
    ctx.fillStyle   = COLOR.GOLD;
    ctx.globalAlpha = 0.25 + tweenTreasure(frame, 60);
    var n, max, t;
    for(n = 0, max = treasure.length ; n < max ; n++) {
      t = treasure[n];
      if (!t.collected)
        ctx.fillRect(t.x, t.y + TILE/3, TILE, TILE*2/3);
    }
    ctx.globalAlpha = 1;
  }

  function tweenTreasure(frame, duration) {
    var half  = duration/2
        pulse = frame%duration;
    return pulse < half ? (pulse/half) : 1-(pulse-half)/half;
  }

  //-------------------------------------------------------------------------
  // LOAD THE MAP
  //-------------------------------------------------------------------------
  
  var currentMap = null;

  function restart() {
    var wasDemo = demo;
    monsters = [];
    treasure = [];
    plan = []; planKey = ""; apEscape = 0; runCommit = null;
    setup(JSON.parse(currentMap));
    if (wasDemo)
      setDemo(true);
  }

  function setup(map) {
    var data    = map.layers[0].data,
        objects = map.layers[1].objects,
        n, obj, entity;

    MAP.tw = map.width;
    MAP.th = map.height;
    width  = canvas.width  = MAP.tw * TILE;
    height = canvas.height = MAP.th * TILE;

    for(n = 0 ; n < objects.length ; n++) {
      obj = objects[n];
      entity = setupEntity(obj);
      switch(obj.type) {
      case "player"   : player = entity; break;
      case "monster"  : monsters.push(entity); break;
      case "treasure" : treasure.push(entity); break;
      }
    }

    cells = data;
  }

  function setupEntity(obj) {
    var entity = {};
    entity.x        = obj.x;
    entity.y        = obj.y;
    entity.dx       = 0;
    entity.dy       = 0;
    entity.gravity  = METER * (obj.properties.gravity || GRAVITY);
    entity.maxdx    = METER * (obj.properties.maxdx   || MAXDX);
    entity.maxdy    = METER * (obj.properties.maxdy   || MAXDY);
    entity.impulse  = METER * (obj.properties.impulse || IMPULSE);
    entity.accel    = entity.maxdx / (obj.properties.accel    || ACCEL);
    entity.friction = entity.maxdx / (obj.properties.friction || FRICTION);
    entity.monster  = obj.type == "monster";
    entity.player   = obj.type == "player";
    entity.treasure = obj.type == "treasure";
    entity.left     = obj.properties.left;
    entity.right    = obj.properties.right;
    entity.start    = { x: obj.x, y: obj.y }
    entity.killed = entity.collected = 0;
    return entity;
  }

  //-------------------------------------------------------------------------
  // THE GAME LOOP
  //-------------------------------------------------------------------------
  
  var counter = 0, dt = 0, now,
      last = timestamp(),
      fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });
  
  function frame() {
    fpsmeter.tickStart();
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    if (paused)
      dt = 0;
    while(dt > step) {
      dt = dt - step;
      if (demo)
        autopilot();
      update(step);
    }
    render(ctx, counter, dt);
    last = now;
    counter++;
    fpsmeter.tick();
    requestAnimationFrame(frame, canvas);
  }
  
  document.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, false);
  document.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

  document.getElementById('pauseBtn').addEventListener('click', function() { togglePause(); this.blur(); }, false);
  document.getElementById('demoBtn').addEventListener('click',  function() { setDemo(!demo); this.blur(); }, false);

  get(levelUrl, function(req) {
    currentMap = req.responseText;
    setup(JSON.parse(currentMap));
    if (/[?&]demo=1/.test(window.location.search))
      setDemo(true);
    frame();
  });

})();

