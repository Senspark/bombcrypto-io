import {
  ATLAS,
  GLOW_H,
  GLOW_W,
  HEROES,
  HeroId,
  RARITIES,
  TILE,
  drawSprite,
  heroKey,
  loadAtlas,
} from './atlas';

/*
 * O Treasure Hunt rodando de fundo no topo da home (item "mapa ao vivo"):
 * mapa 35x17 do tema Temple com a moldura do jogo, heróis que andam "speed"
 * casas por segundo (AutoPlay.stepMs do servidor), bomba com pavio de 3 s,
 * fogo de 4 quadros a 96 ms, baús com a barra de vida do cliente e o brilho
 * de raridade atrás de cada herói. O visitante solta bomba com um clique.
 *
 * Diferente do mapa jogável completo (PlayableMap): cada herói segura no
 * máximo 2 bombas e o alcance vai até 4, para o fundo não virar um tapete de
 * bombas por trás do texto. Nada aqui fala com servidor.
 */

const COLS = 35;
const ROWS = 17;
const FUSE = 3000;
const FIRE_FRAME = 96;
const MIN_TILE_PX = 20;

/* Centro de cada peça da moldura do Temple (BorderBG1), em casas, y para cima. */
const BORDER: Record<'left' | 'right' | 'top' | 'bottom', [number, number]> = {
  left: [-18.44, 0],
  right: [18.44, 0],
  top: [0, 9.5],
  bottom: [0, -9.5],
};

type Chest = 'wooden' | 'silver' | 'gold' | 'diamond' | 'key' | 'legend';
type Kind = 'brick' | Chest;
type Coin = 'bcoin' | 'sen';
/* [baú, peso, vida, ganho mín, ganho máx, moeda] */
const CHESTS: [Chest, number, number, number, number, Coin][] = [
  ['wooden', 46, 3, 0.01, 0.03, 'bcoin'],
  ['silver', 22, 5, 0.3, 0.9, 'sen'],
  ['gold', 14, 7, 0.04, 0.08, 'bcoin'],
  ['diamond', 8, 10, 0.1, 0.2, 'bcoin'],
  ['key', 5, 8, 0.6, 1.4, 'sen'],
  ['legend', 3, 14, 0.25, 0.5, 'bcoin'],
];
const DIRS: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 180],
  [0, -1, -90],
  [0, 1, 90],
];

type Tile =
  | { t: 'floor' }
  | { t: 'rock' }
  | { t: 'block'; kind: Kind; hp: number; max: number };
type Step = { c: number; r: number };
type Hero = {
  look: HeroId;
  lv: number;
  x: number;
  y: number;
  path: Step[];
  dir: 'front' | 'back' | 'right';
  flip: boolean;
  task: 'plant' | null;
  wait: number;
  phase: number;
  speed: number;
  power: number;
  range: number;
  cap: number;
};
type Bomb = {
  c: number;
  r: number;
  t0: number;
  owner: Hero | null;
  range: number;
  power: number;
};
type Flame = {
  c: number;
  r: number;
  part: 'center' | 'middle' | 'end';
  rot: number;
  flip?: boolean;
  t0: number;
};

export type TreasureHud = { bcoin: number; sen: number; chests: number };

export function createTreasureMap(opts: {
  host: HTMLElement;
  canvas: HTMLCanvasElement;
  onHud?: (hud: TreasureHud) => void;
  onBomb?: () => void;
}) {
  const { host, canvas: cv } = opts;
  const ctx = cv.getContext('2d');
  if (!ctx) return { destroy: () => undefined };
  const reduceMotion = window.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  ).matches;
  const spr = (
    k: string,
    x: number,
    y: number,
    w?: number,
    h?: number,
    o?: { flip?: boolean; rot?: number },
  ) => drawSprite(ctx, k, x, y, w, h, o);

  const pieces = (Object.keys(BORDER) as (keyof typeof BORDER)[]).map(
    (side) => {
      const key = `t0_border_${side}`;
      const [, , w, h] = ATLAS[key];
      const [ux, uy] = BORDER[side];
      return {
        key,
        x: (ux + COLS / 2) * TILE - w / 2,
        y: (ROWS / 2 - uy) * TILE - h / 2,
        w,
        h,
      };
    },
  );
  let bx0 = 0;
  let by0 = 0;
  let bx1 = COLS * TILE;
  let by1 = ROWS * TILE;
  pieces.forEach((p) => {
    bx0 = Math.min(bx0, p.x);
    by0 = Math.min(by0, p.y);
    bx1 = Math.max(bx1, p.x + p.w);
    by1 = Math.max(by1, p.y + p.h);
  });
  const BW = bx1 - bx0;
  const BH = by1 - by0;
  const WSUM = CHESTS.reduce((a, c) => a + c[1], 0);

  let grid: Tile[][] = [];
  let floorVar: boolean[][] = [];
  let wallVar: boolean[][] = [];
  let bombs: Bomb[] = [];
  let flames: Flame[] = [];
  let breaks: { c: number; r: number; kind: Kind; t0: number }[] = [];
  let floats: { x: number; y: number; text: string; coin: Coin; t0: number }[] =
    [];
  let heroes: Hero[] = [];
  let hover: Step | null = null;
  let now = performance.now();
  let regenAt = 0;
  let banner = 0;
  let blocksAtStart = 1;
  const score = { bcoin: 0, sen: 0 };
  let lastHud = '';

  const key = (c: number, r: number) => r * 1000 + c;
  const inside = (c: number, r: number) =>
    c >= 0 && r >= 0 && c < COLS && r < ROWS;
  const cell = (c: number, r: number) => (inside(c, r) ? grid[r][c] : null);
  const bombAt = (c: number, r: number) =>
    bombs.find((b) => b.c === c && b.r === r);
  const walkable = (c: number, r: number) => {
    const g = cell(c, r);
    return !!g && g.t === 'floor' && !bombAt(c, r);
  };
  const randInt = (a: number, b: number) =>
    a + Math.floor(Math.random() * (b - a + 1));
  const statsOf = (lv: number) => {
    const [a, b] = RARITIES[lv].stat;
    return {
      speed: randInt(a, b),
      power: randInt(a, b),
      range: Math.min(lv + 1, 4),
      cap: Math.min(lv + 1, 2),
    };
  };

  function newMap() {
    bombs = [];
    flames = [];
    breaks = [];
    floats = [];
    grid = [];
    floorVar = [];
    wallVar = [];
    for (let r = 0; r < ROWS; r++) {
      grid.push([]);
      floorVar.push([]);
      wallVar.push([]);
      for (let c = 0; c < COLS; c++) {
        grid[r].push(
          c % 2 === 1 && r % 2 === 1 ? { t: 'rock' } : { t: 'floor' },
        );
        floorVar[r].push(Math.random() < 0.5);
        wallVar[r].push(Math.random() < 0.5);
      }
    }
    const spots: [number, number][] = [];
    const n = 10;
    for (let i = 0; i < n; i++) {
      let c = Math.round(((i + 0.5) / n) * (COLS - 1));
      if (c % 2 === 1) c--;
      spots.push([c, [0, ROWS - 1, 8][i % 3]]);
    }
    const keep = new Set<number>();
    spots.forEach(([c, r]) =>
      [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].forEach(([a, b]) => keep.add(key(c + a, r + b))),
    );
    blocksAtStart = 0;
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        if (
          grid[r][c].t !== 'floor' ||
          keep.has(key(c, r)) ||
          Math.random() > 0.48
        )
          continue;
        let kind: Kind = 'brick';
        let hp = 1;
        if (Math.random() < 0.38) {
          let roll = Math.random() * WSUM;
          for (const ch of CHESTS)
            if ((roll -= ch[1]) < 0) {
              kind = ch[0];
              hp = ch[2];
              break;
            }
        }
        grid[r][c] = { t: 'block', kind, hp, max: hp };
        blocksAtStart++;
      }
    // uma raridade de cada, das mais altas às comuns, para o brilho variar
    const levels = [9, 7, 5, 4, 3, 2, 6, 1, 8, 0];
    heroes = spots.map(([c, r], i) => ({
      look: HEROES[i % HEROES.length].id,
      lv: levels[i],
      x: c,
      y: r,
      path: [],
      dir: 'front',
      flip: false,
      task: null,
      wait: now + 300 + Math.random() * 1000,
      phase: Math.random() * 1000,
      ...statsOf(levels[i]),
    }));
    banner = regenAt ? now : 0;
    regenAt = 0;
  }

  function blast(c: number, r: number, range: number) {
    const cells: Omit<Flame, 't0'>[] = [{ c, r, part: 'center', rot: 0 }];
    const hits: Step[] = [];
    for (const [dc, dr, rot] of DIRS)
      for (let i = 1; i <= range; i++) {
        const nc = c + dc * i;
        const nr = r + dr * i;
        const g = cell(nc, nr);
        if (!g || g.t === 'rock') break;
        if (g.t === 'block') {
          hits.push({ c: nc, r: nr });
          break;
        }
        const last = i === range || cell(nc + dc, nr + dr)?.t !== 'floor';
        // só há arte do fogo apontando para a direita: o resto é giro/espelho
        cells.push({
          c: nc,
          r: nr,
          part: last ? 'end' : 'middle',
          rot: rot === 180 ? 0 : rot,
          flip: rot === 180,
        });
      }
    return { cells, hits };
  }
  function danger(extra?: Step & { range: number }) {
    const d = new Set<number>();
    bombs.forEach((b) =>
      blast(b.c, b.r, b.range).cells.forEach((x) => d.add(key(x.c, x.r))),
    );
    if (extra)
      blast(extra.c, extra.r, extra.range).cells.forEach((x) =>
        d.add(key(x.c, x.r)),
      );
    return d;
  }
  function bfs(
    c0: number,
    r0: number,
    goal: (c: number, r: number) => boolean,
    limit = 600,
  ) {
    const seen = new Map<number, number | null>([[key(c0, r0), null]]);
    const q: [number, number][] = [[c0, r0]];
    while (q.length && seen.size < limit) {
      const [c, r] = q.shift()!;
      if (goal(c, r)) {
        const path: Step[] = [];
        let k = key(c, r);
        while (k !== key(c0, r0)) {
          path.unshift({ c: k % 1000, r: Math.floor(k / 1000) });
          k = seen.get(k)!;
        }
        return path;
      }
      for (const [dc, dr] of DIRS) {
        const nc = c + dc;
        const nr = r + dr;
        const k = key(nc, nr);
        if (!seen.has(k) && walkable(nc, nr)) {
          seen.set(k, key(c, r));
          q.push([nc, nr]);
        }
      }
    }
    return null;
  }
  const nextToBlock = (c: number, r: number) =>
    DIRS.some(([dc, dr]) => cell(c + dc, r + dr)?.t === 'block');

  function explode(b: Bomb) {
    bombs = bombs.filter((x) => x !== b);
    const { cells, hits } = blast(b.c, b.r, b.range);
    cells.forEach((f) => {
      flames.push({ ...f, t0: now });
      const other = bombAt(f.c, f.r);
      if (other && other !== b) other.t0 = Math.min(other.t0, now - FUSE + 90);
    });
    hits.forEach((h) => hitBlock(h.c, h.r, b.power));
  }
  function hitBlock(c: number, r: number, power: number) {
    const g = cell(c, r);
    if (!g || g.t !== 'block') return;
    g.hp = Math.max(0, g.hp - power);
    if (g.hp > 0) return;
    breaks.push({ c, r, kind: g.kind, t0: now });
    grid[r][c] = { t: 'floor' };
    const ch = CHESTS.find((x) => x[0] === g.kind);
    if (ch) {
      const v = ch[3] + Math.random() * (ch[4] - ch[3]);
      score[ch[5]] += v;
      floats.push({
        x: (c + 0.5) * TILE,
        y: r * TILE + 2,
        text: `+${v.toFixed(2)}`,
        coin: ch[5],
        t0: now,
      });
    }
    const left = grid.reduce(
      (n, row) => n + row.filter((x) => x.t === 'block').length,
      0,
    );
    const chests = grid.some((row) =>
      row.some((x) => x.t === 'block' && x.kind !== 'brick'),
    );
    if (!regenAt && (!chests || left < blocksAtStart * 0.08))
      regenAt = now + 1600;
  }

  function think(h: Hero) {
    const c = Math.round(h.x);
    const r = Math.round(h.y);
    const D = danger();
    if (D.has(key(c, r))) {
      const p = bfs(c, r, (x, y) => !D.has(key(x, y)));
      if (p && p.length) h.path = p;
      return;
    }
    if (now < h.wait) return;
    if (
      h.task === 'plant' &&
      nextToBlock(c, r) &&
      !bombAt(c, r) &&
      bombs.filter((b) => b.owner === h).length < h.cap
    ) {
      bombs.push({ c, r, t0: now, owner: h, range: h.range, power: h.power });
      h.task = null;
      h.wait = now + 300;
      return;
    }
    // casa ao lado de um bloco, de onde dê para fugir da própria bomba
    const cands: [number, number][] = [];
    bfs(c, r, (x, y) => {
      if (!D.has(key(x, y)) && nextToBlock(x, y) && !bombAt(x, y)) {
        const D2 = danger({ c: x, r: y, range: h.range });
        if (bfs(x, y, (a, b) => !D2.has(key(a, b)), 160)) cands.push([x, y]);
      }
      return cands.length >= 4;
    });
    if (cands.length) {
      const [tx, ty] = cands[Math.floor(Math.random() * cands.length)];
      h.path = bfs(c, r, (x, y) => x === tx && y === ty) || [];
      h.task = 'plant';
    } else {
      h.path = (
        bfs(c, r, (x, y) => !D.has(key(x, y)) && Math.random() < 0.08) || []
      ).slice(0, 4);
      h.task = null;
      h.wait = now + 400 + Math.random() * 500;
    }
  }

  function move(h: Hero, dt: number) {
    const p = h.path[0];
    const atC = Math.round(h.x) === p.c && Math.round(h.y) === p.r;
    if (!atC && !walkable(p.c, p.r)) {
      h.x = Math.round(h.x);
      h.y = Math.round(h.y);
      h.path = [];
      return;
    }
    const dx = p.c - h.x;
    const dy = p.r - h.y;
    const d = Math.hypot(dx, dy);
    const step = h.speed * dt; // speed = casas por segundo
    if (Math.abs(dx) > 0.01) {
      h.dir = 'right';
      h.flip = dx < 0;
    } else if (Math.abs(dy) > 0.01) h.dir = dy < 0 ? 'back' : 'front';
    if (d <= step) {
      h.x = p.c;
      h.y = p.r;
      h.path.shift();
    } else {
      h.x += (dx / d) * step;
      h.y += (dy / d) * step;
    }
  }

  /** Tira da tela o fogo, as quebras e os ganhos que já acabaram; abre o mapa novo. */
  function expire() {
    flames = flames.filter((f) => now - f.t0 < FIRE_FRAME * 4);
    breaks = breaks.filter((b) => now - b.t0 < FIRE_FRAME * 8);
    floats = floats.filter((f) => now - f.t0 < 1200);
    if (regenAt && now >= regenAt) newMap();
  }
  const effectsRunning = () =>
    flames.length + breaks.length + floats.length > 0 || regenAt > 0;

  function update(dt: number) {
    [...bombs].forEach((b) => {
      if (now - b.t0 >= FUSE) explode(b);
    });
    expire();
    heroes.forEach((h) => (h.path.length ? move(h, dt) : think(h)));
  }

  function text(
    s: string,
    x: number,
    y: number,
    px: number,
    fill: string,
    lw: number,
  ) {
    ctx!.font = `${px}px Retro, Bungee, monospace`;
    ctx!.lineJoin = 'round';
    ctx!.lineWidth = lw;
    ctx!.strokeStyle = '#05060F';
    ctx!.strokeText(s, x, y);
    ctx!.fillStyle = fill;
    ctx!.fillText(s, x, y);
  }

  function draw() {
    for (let r = -6; r < ROWS + 6; r++)
      for (let c = -8; c < COLS + 8; c++) {
        const v = inside(c, r) ? floorVar[r][c] : (c + r) % 3 !== 0;
        spr(`t0_floor_${v ? 'a' : 'b'}`, c * TILE, r * TILE);
      }
    if (hover && walkable(hover.c, hover.r)) {
      ctx!.fillStyle = 'rgba(255,210,63,.28)';
      ctx!.fillRect(hover.c * TILE, hover.r * TILE, TILE, TILE);
      ctx!.strokeStyle = '#FFD23F';
      ctx!.lineWidth = 1;
      ctx!.strokeRect(
        hover.c * TILE + 0.5,
        hover.r * TILE + 0.5,
        TILE - 1,
        TILE - 1,
      );
    }
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const g = grid[r][c];
        if (g.t === 'rock')
          spr(`t0_wall_${wallVar[r][c] ? 'a' : 'b'}`, c * TILE, r * TILE);
        else if (g.t === 'block')
          spr(
            g.kind === 'brick' ? 't0_brick' : `chest_${g.kind}_0`,
            c * TILE,
            r * TILE,
          );
      }
    breaks.forEach((b) => {
      const f = Math.min(7, Math.floor((now - b.t0) / FIRE_FRAME));
      spr(
        b.kind === 'brick' ? `t0_break_${f}` : `chest_${b.kind}_${f}`,
        b.c * TILE,
        b.r * TILE,
      );
    });
    pieces.forEach((p) => spr(p.key, p.x, p.y));
    // barra de vida do HealthBar.prefab: só com dano
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const g = grid[r][c];
        if (g.t !== 'block' || g.hp >= g.max) continue;
        const cx = (c + 0.5) * TILE;
        const cy = (r + 0.5) * TILE;
        ctx!.fillStyle = '#372222';
        ctx!.fillRect(
          cx - 0.45 * TILE,
          cy - 0.1 * TILE,
          0.9 * TILE,
          0.2 * TILE,
        );
        ctx!.fillStyle = '#17EC48';
        ctx!.fillRect(
          cx - 0.4 * TILE,
          cy - 0.05 * TILE,
          0.8 * TILE * (g.hp / g.max),
          0.1 * TILE,
        );
      }
    for (let r = 0; r < ROWS; r++) {
      bombs.forEach((b) => {
        if (b.r !== r) return;
        // pavio do BombFrame.anim + a "respiração" do Bomb.anim
        const t = ((now - b.t0) / 1000) % 0.8333;
        const k = Math.sin((t / 0.8333) * Math.PI * 2 - Math.PI / 2);
        const sx = 1.05 + 0.2 * k;
        const sy = 1 + 0.1 * k;
        const fr = [0, 1, 2, 1][Math.floor(((now - b.t0) / 250) % 4)];
        spr(
          `bomb_${fr}`,
          (b.c + 0.5) * TILE - 8 * sx,
          (b.r + 0.5) * TILE - 8 * sy,
          16 * sx,
          16 * sy,
        );
      });
      heroes
        .filter((h) => Math.round(h.y) === r)
        .sort((a, b) => a.x - b.x)
        .forEach((h) => {
          const fr = Math.floor((now + h.phase) / 160) % 3;
          const k2 = heroKey(h.look, RARITIES[h.lv].id, h.dir, fr);
          const f = ATLAS[k2];
          if (!f) return;
          if (h.lv > 0)
            spr(
              `glow_${RARITIES[h.lv].id}`,
              (h.x + 0.5) * TILE - GLOW_W / 2,
              (h.y + 0.3) * TILE - GLOW_H / 2,
              GLOW_W,
              GLOW_H,
            );
          spr(
            k2,
            Math.round((h.x + 0.5) * TILE - f[2] / 2),
            Math.round((h.y + 0.85) * TILE - f[3]),
            f[2],
            f[3],
            {
              flip: h.dir === 'right' && h.flip,
            },
          );
        });
    }
    flames.forEach((f) => {
      const fr = Math.min(3, Math.floor((now - f.t0) / FIRE_FRAME));
      spr(`${f.part}_${fr}`, f.c * TILE, f.r * TILE, TILE, TILE, {
        rot: f.rot,
        flip: f.flip,
      });
    });
    ctx!.textAlign = 'left';
    ctx!.textBaseline = 'middle';
    floats.forEach((f) => {
      const p = (now - f.t0) / 1200;
      const y = f.y - p * 14;
      ctx!.globalAlpha = p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3;
      ctx!.font = '7px Retro, Bungee, monospace';
      const tw = ctx!.measureText(f.text).width;
      const x = f.x - (tw + 10) / 2;
      spr(f.coin, x, y - 4, 8, 8);
      text(f.text, x + 10, y, 7, f.coin === 'sen' ? '#FF7FA8' : '#FFD23F', 2.5);
      ctx!.globalAlpha = 1;
    });
    if (banner && now - banner < 1400) {
      const p = (now - banner) / 1400;
      ctx!.globalAlpha = p < 0.15 ? p / 0.15 : p > 0.75 ? (1 - p) / 0.25 : 1;
      ctx!.textAlign = 'center';
      text('NEW MAP!', (COLS * TILE) / 2, 30, 22, '#FFD23F', 5);
      ctx!.globalAlpha = 1;
    }
    const chests = grid.reduce(
      (n, row) =>
        n + row.filter((x) => x.t === 'block' && x.kind !== 'brick').length,
      0,
    );
    const sig = `${score.bcoin.toFixed(2)}|${score.sen.toFixed(2)}|${chests}`;
    if (sig !== lastHud) {
      lastHud = sig;
      opts.onHud?.({ bcoin: score.bcoin, sen: score.sen, chests });
    }
  }

  // cobre a faixa inteira (como background-size: cover), casa com no mínimo 20 px
  // Escala que cobre a faixa inteira (como background-size: cover), com a
  // casa em no mínimo 20 px. O canvas tem o tamanho da faixa — só a parte
  // visível é desenhada — e o mundo fica centralizado dentro dele.
  let scale = 1;
  let offX = 0;
  let offY = 0;
  function layout() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    scale = Math.max(w / BW, h / BH, MIN_TILE_PX / TILE);
    offX = (w - BW * scale) / 2 - bx0 * scale;
    offY = (h - BH * scale) / 2 - by0 * scale;
    // tela muito grande: densidade 1 para não redesenhar dezenas de megapixels
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    if (w * h * dpr * dpr > 6_000_000) dpr = 1;
    cv.style.width = `${w}px`;
    cv.style.height = `${h}px`;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    ctx!.setTransform(scale * dpr, 0, 0, scale * dpr, offX * dpr, offY * dpr);
    ctx!.imageSmoothingEnabled = false;
    draw();
  }

  const cellAt = (e: MouseEvent): Step => {
    const r = cv.getBoundingClientRect();
    return {
      c: Math.floor((e.clientX - r.left - offX) / scale / TILE),
      r: Math.floor((e.clientY - r.top - offY) / scale / TILE),
    };
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType === 'mouse') hover = cellAt(e);
  };
  const onLeave = () => {
    hover = null;
  };
  // "click" e não "pointerdown": rolar a página no celular não solta bomba
  const onClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest('a,button')) return;
    const p = cellAt(e);
    if (!walkable(p.c, p.r)) return;
    bombs.push({ c: p.c, r: p.r, t0: now, owner: null, range: 3, power: 6 });
    opts.onBomb?.();
    if (reduceMotion) {
      // sem animação: a bomba estoura na hora e o laço roda só até o fogo sumir
      explode(bombs[bombs.length - 1]);
      start();
    }
  };
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);
  host.addEventListener('click', onClick);

  let raf = 0;
  let last = 0;
  let visible = true;
  let alive = true;
  const frame = (ts: number) => {
    raf = 0;
    if (!alive || !visible || document.hidden) return;
    now = ts;
    const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
    last = ts;
    if (reduceMotion) {
      expire();
      draw();
      if (!effectsRunning()) return; // quadro parado: nada a animar
    } else {
      update(dt);
      draw();
    }
    raf = requestAnimationFrame(frame);
  };
  const start = () => {
    if (alive && !raf && visible && !document.hidden) {
      last = 0;
      raf = requestAnimationFrame(frame);
    }
  };
  // só anima com o topo na tela — fora dela não gasta CPU
  const io =
    typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          start();
        })
      : null;
  io?.observe(host);
  const onVis = () => start();
  document.addEventListener('visibilitychange', onVis);
  const ro =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => layout())
      : null;
  ro?.observe(host);

  newMap();
  loadAtlas().then(() => {
    if (!alive) return;
    layout();
    start();
  });

  return {
    destroy() {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('click', onClick);
    },
  };
}
