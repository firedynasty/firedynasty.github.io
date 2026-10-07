#!/usr/bin/env python3
"""Convert Thomas-was-a-clone level .txt files into tiny-platformer level JSON.

Usage: python3 convert_thomas.py [-i ../Thomas-was-a-clone/data/levels] [-o .]
Writes thomas-level-N.json for every levelN.txt, plus one per ascii-levels/NN-name.txt
(# wall, P spawn, * gold, M monster), and thomas-levels.js (the list).

Thomas format (positions are rectangle CENTERS, y points up):
  W width height x y                        wall
  P width height x y endX endY speed jump r g b isCurrent   character
Mapping: walls -> solid tiles, current character -> player spawn,
every character's exit position -> treasure to collect.
"""
import argparse, glob, json, math, os, re

UNIT = 40      # Thomas units per tile
MARGIN = 8     # empty tiles around the content
TILE_PX = 32


def parse(path):
    walls, players = [], []
    for line in open(path):
        parts = line.split()
        if not parts or parts[0].startswith('#'):
            continue
        k = parts[0]
        if k == 'W' and len(parts) >= 5:
            walls.append(tuple(float(v) for v in parts[1:5]))
        elif k == 'P' and len(parts) >= 13:
            v = [float(x) for x in parts[1:9]]
            players.append(dict(w=v[0], h=v[1], x=v[2], y=v[3], ex=v[4], ey=v[5],
                                current=parts[12] == '1'))
    return walls, players


def convert(path):
    walls, players = parse(path)
    # Thomas y is up, tiles y is down: flip y.
    rects = [(x - w / 2, -(y + h / 2), x + w / 2, -(y - h / 2)) for w, h, x, y in walls]
    pts = [(p['x'], -p['y']) for p in players]
    ends = [(p['ex'], -p['ey']) for p in players]

    xs = [r[0] for r in rects] + [r[2] for r in rects] + [p[0] for p in pts]
    ys = [r[1] for r in rects] + [r[3] for r in rects] + [p[1] for p in pts]
    minx, maxx, miny, maxy = min(xs), max(xs), min(ys), max(ys)
    tw = int(math.ceil((maxx - minx) / UNIT)) + 2 * MARGIN
    th = int(math.ceil((maxy - miny) / UNIT)) + 2 * MARGIN

    def tile_of(x, y):
        return (int(math.floor((x - minx) / UNIT)) + MARGIN,
                int(math.floor((y - miny) / UNIT)) + MARGIN)

    data = [0] * (tw * th)
    for x0, y0, x1, y1 in rects:
        tx0, ty0 = tile_of(x0, y0)
        tx1, ty1 = tile_of(x1 - 1e-6, y1 - 1e-6)
        for ty in range(max(ty0, 0), min(ty1, th - 1) + 1):
            for tx in range(max(tx0, 0), min(tx1, tw - 1) + 1):
                data[tx + ty * tw] = 1

    def lift(tx, ty):
        # move up out of solid tiles so spawns/exits are never buried
        while 0 < ty < th and 0 <= tx < tw and data[tx + ty * tw]:
            ty -= 1
        return tx, ty

    objects = []
    cur = next((p for p in players if p['current']), players[0])
    # spawn: bottom of the character rests on its start y
    sx, sy = lift(*tile_of(cur['x'], -cur['y'] + cur['h'] / 2 - UNIT / 2))
    objects.append(dict(name='player', type='player', x=sx * TILE_PX, y=sy * TILE_PX,
                        width=TILE_PX, height=TILE_PX, visible=True, properties={}))
    for p in players:
        tx, ty = lift(*tile_of(p['ex'], -p['ey'] + p['h'] / 2 - UNIT / 2))
        if 0 <= tx < tw and 0 <= ty < th:      # level4 has an exit far off the map
            objects.append(dict(name='treasure', type='treasure', x=tx * TILE_PX,
                                y=ty * TILE_PX, width=TILE_PX, height=TILE_PX,
                                visible=True, properties={}))
    layers = [
        dict(name='background', type='tilelayer', data=data, width=tw, height=th,
             x=0, y=0, opacity=1, visible=True),
        dict(name='Object Layer 1', type='objectgroup', objects=objects, x=0, y=0,
             opacity=1, visible=True),
    ]
    return dict(width=tw, height=th, tilewidth=TILE_PX, tileheight=TILE_PX,
                orientation='orthogonal', version=1, properties={}, tilesets=[],
                layers=layers)


def convert_ascii(path):
    """ASCII map: # wall, P spawn, * gold, M patrolling monster, . empty."""
    rows = [l.rstrip('\n') for l in open(path) if l.strip()]
    th, tw = len(rows), max(len(r) for r in rows)
    rows = [r.ljust(tw, '.') for r in rows]
    data, objects = [0] * (tw * th), []

    def solid(x, y):
        return 0 <= x < tw and 0 <= y < th and rows[y][x] == '#'

    for y in range(th):
        for x in range(tw):
            c = rows[y][x]
            if c == '#':
                if x in (0, tw - 1) or y in (0, th - 1):
                    data[x + y * tw] = 5                       # border
                elif not solid(x, y - 1):
                    data[x + y * tw] = 4                       # top surface
                elif not solid(x, y - 2):
                    data[x + y * tw] = 3
                else:
                    data[x + y * tw] = 2
            elif c in 'P*M':
                kind = {'P': 'player', '*': 'treasure', 'M': 'monster'}[c]
                props = {'maxdx': '5', 'right': 'true'} if c == 'M' else {}
                objects.append(dict(name=kind, type=kind, x=x * TILE_PX, y=y * TILE_PX,
                                    width=TILE_PX, height=TILE_PX, visible=True, properties=props))
    objects.sort(key=lambda o: o['type'] != 'player')          # player first
    layers = [
        dict(name='background', type='tilelayer', data=data, width=tw, height=th,
             x=0, y=0, opacity=1, visible=True),
        dict(name='Object Layer 1', type='objectgroup', objects=objects, x=0, y=0,
             opacity=1, visible=True),
    ]
    return dict(width=tw, height=th, tilewidth=TILE_PX, tileheight=TILE_PX,
                orientation='orthogonal', version=1, properties={}, tilesets=[],
                layers=layers)


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument('-i', default=os.path.join(here, '..', 'Thomas-was-a-clone', 'data', 'levels'))
    ap.add_argument('-a', default=os.path.join(here, 'ascii-levels'), help='folder of ASCII maps (NN-name.txt)')
    ap.add_argument('-o', default=here)
    a = ap.parse_args()
    names = []
    for f in sorted(glob.glob(os.path.join(a.i, 'level*.txt')),
                    key=lambda f: int(re.search(r'(\d+)', os.path.basename(f)).group(1))):
        n = re.search(r'(\d+)', os.path.basename(f)).group(1)
        out = 'thomas-level-%s.json' % n
        lvl = convert(f)
        json.dump(lvl, open(os.path.join(a.o, out), 'w'))
        names.append(dict(n=int(n), title='Thomas %s' % n))
        print('%s -> %s (%dx%d tiles)' % (os.path.basename(f), out, lvl['width'], lvl['height']))
    for f in sorted(glob.glob(os.path.join(a.a, '*.txt'))):
        n = int(re.match(r'(\d+)', os.path.basename(f)).group(1))
        title = os.path.basename(f)[:-4].split('-', 1)[1]
        out = 'thomas-level-%d.json' % n
        lvl = convert_ascii(f)
        json.dump(lvl, open(os.path.join(a.o, out), 'w'))
        names.append(dict(n=n, title=title.replace('-', ' ').title()))
        print('%s -> %s (%dx%d tiles)' % (os.path.basename(f), out, lvl['width'], lvl['height']))
    with open(os.path.join(a.o, 'thomas-levels.js'), 'w') as fh:
        fh.write('var THOMAS_LEVELS = %s;\n' % json.dumps(names))


if __name__ == '__main__':
    main()
