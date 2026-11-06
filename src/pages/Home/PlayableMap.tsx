import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import atlasSrc from 'src/assests/game/treasure-atlas.webp';
import atlasMeta from 'src/assests/game/treasure-atlas.json';
import rarityCommon from 'src/assests/Raritys/rarity_common.png';
import rarityRare from 'src/assests/Raritys/rarity_rare.png';
import raritySuperRare from 'src/assests/Raritys/rarity_super_rare.png';
import rarityEpic from 'src/assests/Raritys/rarity_epic.png';
import rarityLegend from 'src/assests/Raritys/rarity_legend.png';
import raritySuperLegend from 'src/assests/Raritys/rarity_super_legend.png';
import rarityMega from 'src/assests/Raritys/07_Mega.png';
import raritySuperMega from 'src/assests/Raritys/08_Super_Mega.png';
import rarityMystic from 'src/assests/Raritys/09_Mystic.png';
import raritySuperMystic from 'src/assests/Raritys/10_Super_Mystic.png';
import skillSpeed from 'src/assests/game/skills/skill_speed.webp';
import skillPower from 'src/assests/game/skills/skill_power.webp';
import skillRange from 'src/assests/game/skills/skill_range.webp';
import skillBombs from 'src/assests/game/skills/skill_bombs.webp';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
} from 'src/theme/arcade';
import {
  ArcadeButton,
  ArcadeContainer,
  ArcadeSection,
  BlinkText,
  Reveal,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';

/*
 * Mapa jogável do topo da home: o Treasure Hunt rodando no navegador, desenhado
 * do mesmo jeito que o cliente oficial desenha (arte "Amazon" do TH V2):
 *
 *  - mapa 35x17, chão e pedras sorteados entre as duas variantes de cada tema
 *    (MapHelper.ConvertTileTypeToID), arbusto como bloco comum e a moldura do
 *    tema (BorderBG1..3, nas posições do prefab LevelViewPveAmazon);
 *  - baús com a barra de vida do HealthBar.prefab (só aparece com dano) e a
 *    quebra de 8 quadros do prefab Brick;
 *  - bomba com o pavio do BombFrame.anim e a "respiração" do Bomb.anim;
 *  - fogo de 4 quadros a 96 ms (BombExplosion);
 *  - heróis com as artes reais, por raridade, 3 quadros a cada 160 ms.
 *
 * Toda a arte sai de scripts/build-map-atlas.py. Nada aqui fala com servidor.
 */

type Frame = [number, number, number, number];
const ATLAS = atlasMeta.frames as unknown as Record<string, Frame>;
const ATLAS_W = atlasMeta.w;
const ATLAS_H = atlasMeta.h;

/** Mapa do Treasure Hunt: 35 colunas x 17 linhas, como no jogo. */
const COLS = 35;
const ROWS = 17;
const TILE = 16; // px de arte por casa (spritePixelsToUnits do cliente)

type HeroId =
  | 'frog'
  | 'knight'
  | 'ninja'
  | 'witch'
  | 'pepe'
  | 'doge'
  | 'vampire'
  | 'king'
  | 'cowboy';
type Rarity =
  | 'common'
  | 'rare'
  | 'superrare'
  | 'epic'
  | 'legend'
  | 'superlegend'
  | 'mega'
  | 'supermega'
  | 'mystic'
  | 'supermystic';
type Chest = 'wooden' | 'silver' | 'gold' | 'diamond' | 'legend' | 'key';
type Kind = 'brick' | Chest;
type Coin = 'bcoin' | 'sen';

const HEROES: { id: HeroId; name: string }[] = [
  { id: 'frog', name: 'Frog' },
  { id: 'knight', name: 'Knight' },
  { id: 'ninja', name: 'Ninja' },
  { id: 'witch', name: 'Witch' },
  { id: 'pepe', name: 'Pepe' },
  { id: 'doge', name: 'Doge' },
  { id: 'vampire', name: 'Vampire' },
  { id: 'king', name: 'King' },
  { id: 'cowboy', name: 'Cowboy' },
];

const RARITIES: { id: Rarity; name: string; icon: string }[] = [
  { id: 'common', name: 'Common', icon: rarityCommon },
  { id: 'rare', name: 'Rare', icon: rarityRare },
  { id: 'superrare', name: 'Super Rare', icon: raritySuperRare },
  { id: 'epic', name: 'Epic', icon: rarityEpic },
  { id: 'legend', name: 'Legend', icon: rarityLegend },
  { id: 'superlegend', name: 'Super Legend', icon: raritySuperLegend },
  { id: 'mega', name: 'Mega', icon: rarityMega },
  { id: 'supermega', name: 'Super Mega', icon: raritySuperMega },
  { id: 'mystic', name: 'Mystic', icon: rarityMystic },
  { id: 'supermystic', name: 'Super Mystic', icon: raritySuperMystic },
];

/**
 * Temas do Treasure Hunt (tileset_pve_v2): chão, pedra, arbusto e moldura.
 * `border` = centro de cada peça da moldura em casas, relativo ao centro do
 * mapa, com o y para CIMA (Unity) — valores do prefab BorderBG de cada tema.
 */
const THEMES: {
  name: string;
  border: Record<'left' | 'right' | 'top' | 'bottom', [number, number]>;
}[] = [
  {
    name: 'Temple',
    border: {
      left: [-18.44, 0],
      right: [18.44, 0],
      top: [0, 9.5],
      bottom: [0, -9.5],
    },
  },
  {
    name: 'Jungle',
    border: {
      left: [-19.2, 0],
      right: [19.2, 0],
      top: [0, 10.57],
      bottom: [0, -10.62],
    },
  },
  {
    name: 'Ruins',
    border: {
      left: [-18.5, 0],
      right: [18.5, 0],
      top: [0, 10.5],
      bottom: [0, -10.5],
    },
  },
];

/** Chance (peso) de cada baú quando o bloco sorteado não é o arbusto. */
const CHEST_WEIGHTS: [Chest, number][] = [
  ['wooden', 46],
  ['silver', 22],
  ['gold', 14],
  ['diamond', 8],
  ['key', 5],
  ['legend', 3],
];
const REWARD: Partial<Record<Kind, [number, number, Coin]>> = {
  wooden: [0.01, 0.03, 'bcoin'],
  silver: [0.3, 0.9, 'sen'],
  gold: [0.04, 0.08, 'bcoin'],
  diamond: [0.1, 0.2, 'bcoin'],
  key: [0.6, 1.4, 'sen'],
  legend: [0.25, 0.5, 'bcoin'],
};
const HP: Record<Kind, number> = {
  brick: 1,
  wooden: 3,
  silver: 5,
  gold: 7,
  diamond: 10,
  key: 8,
  legend: 14,
};

const FUSE = 3000; // pavio do map-service (AutoPlay.fuseMs)
const FIRE_FRAME = 96; // spritePerFrame 6 x 16 ms (BombExplosion/Brick)
const FLAME = FIRE_FRAME * 4;
const BREAK = FIRE_FRAME * 8;
const HERO_FRAME = 160;
const NPC_COUNT = 9;

/*
 * Atributos por raridade (BHeroDesign.rarityStats e, de Mega a Super Mystic,
 * ServerHeroDetails do servidor): speed e power sorteados na faixa; alcance e
 * número de bombas = raridade + 1.
 * O servidor anda uma casa a cada 1000/speed ms (AutoPlay.stepMs), ou seja,
 * speed = casas por segundo.
 */
const STAT_RANGE: [number, number][] = [
  [1, 3],
  [3, 6],
  [6, 9],
  [9, 12],
  [12, 15],
  [15, 18],
  [18, 21],
  [21, 24],
  [24, 27],
  [27, 30],
];
type Stats = { speed: number; power: number; range: number; bombs: number };
const randInt = (a: number, b: number) =>
  a + Math.floor(Math.random() * (b - a + 1));
const rollStats = (r: Rarity): Stats => {
  const lv = rarityLevel(r);
  const [a, b] = STAT_RANGE[lv];
  return {
    speed: randInt(a, b),
    power: randInt(a, b),
    range: lv + 1,
    bombs: lv + 1,
  };
};
const DIRS: [number, number, number][] = [
  [1, 0, 0],
  [-1, 0, 180],
  [0, -1, -90],
  [0, 1, 90],
];

/* Bomb.anim: escala x/y nos tempos 0, .217, .417, .633, .833 s (laço). */
const BOMB_T = [0, 0.2167, 0.4167, 0.6333, 0.8333];
const BOMB_SX = [0.85, 1, 1.25, 1, 0.85];
const BOMB_SY = [0.9, 1, 1.1, 1, 0.9];
/* BombFrame.anim: pavio bom_00 → 01 → 02 → 01, 1 s por volta. */
const FUSE_FRAMES: [number, number][] = [
  [0, 0],
  [0.25, 1],
  [0.4833, 2],
  [0.75, 1],
];

type Tile =
  | { t: 'floor' }
  | { t: 'rock' }
  | { t: 'block'; kind: Kind; hp: number; max: number };
type Step = { c: number; r: number };
type Hero = {
  look: HeroId;
  rarity: Rarity;
  x: number;
  y: number;
  path: Step[];
  dir: 'front' | 'back' | 'right';
  flip: boolean;
  task: 'plant' | 'flee' | null;
  wait: number;
  phase: number;
  player: boolean;
} & Stats;
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

type Hud = {
  bcoin: number;
  sen: number;
  chests: number;
  bombs: number;
  maps: number;
};

const rnd = (a: number, b: number) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
const rarityLevel = (r: Rarity) => RARITIES.findIndex((x) => x.id === r);
/*
 * O cliente só tem arte Skin/<raridade> até Super Legend; de Mega para cima o
 * HeroSpriteLoader cai na cor padrão (White) e o que diferencia é o brilho.
 */
const artRarity = (r: Rarity) => (rarityLevel(r) > 5 ? 'common' : r);
/* Brilho atrás do herói (Player.prefab → backlight): 55x72 px a 100 ppu,
   escala 3, 0,2 casa acima do centro; só da Rare para cima. */
const GLOW_W = ((55 * 3) / 100) * 16;
const GLOW_H = ((72 * 3) / 100) * 16;

/* ------------------------------------------------------------------ */
/*  Estilos                                                             */
/* ------------------------------------------------------------------ */

const FrameBox = styled.div`
  position: relative;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.chunky};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(10)};
  overflow: hidden;

  @media ${breakpoint.sm} {
    border-width: 4px;
    box-shadow: ${hardShadow(6)};
  }
`;

const HudBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  background: linear-gradient(
    180deg,
    ${arcadeColors.panelLight},
    ${arcadeColors.panel}
  );
  border-bottom: ${arcadeBorder.thick};

  @media ${breakpoint.sm} {
    gap: 6px;
    padding: 10px;
  }
`;

const bump = keyframes`
  0% { transform: scale(1); }
  40% { transform: scale(1.18) rotate(-3deg); }
  100% { transform: scale(1); }
`;

const Chip = styled.span<{ $bump?: number }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px 6px 6px;
  font-family: ${arcadeFonts.display};
  font-size: 16px;
  color: ${arcadeColors.white};
  background: ${arcadeColors.nightDeep};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.pill};
  box-shadow: ${hardShadow(3)};
  ${({ $bump }) =>
    $bump
      ? css`
          animation: ${bump} 0.35s ease;
        `
      : ''}

  small {
    font-size: 11px;
    color: ${arcadeColors.smoke};
    letter-spacing: 1px;
  }

  @media ${breakpoint.sm} {
    font-size: 13px;
    gap: 6px;
    padding: 4px 10px 4px 4px;
    small {
      display: none;
    }
    &.map {
      display: none;
    }
  }
`;

/* Recorte do atlas como ícone; o quadro tem a proporção do sprite. */
const Sprite = styled.span<{ $key: string; $size?: number }>`
  flex: 0 0 auto;
  display: inline-block;
  image-rendering: pixelated;
  background-image: url(${atlasSrc});
  background-repeat: no-repeat;
  ${({ $key, $size = 24 }) => {
    const [x, y, w, h] = ATLAS[$key];
    const s = $size / Math.max(w, h);
    return css`
      width: ${w * s}px;
      height: ${h * s}px;
      background-size: ${ATLAS_W * s}px ${ATLAS_H * s}px;
      background-position: ${-x * s}px ${-y * s}px;
    `;
  }}
`;

const HudSpacer = styled.span`
  flex: 1;

  @media ${breakpoint.sm} {
    display: none;
  }
`;

const DemoTag = styled.span`
  font-family: ${arcadeFonts.display};
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.cyan};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.sm};
  padding: 4px 8px;

  @media ${breakpoint.sm} {
    display: none;
  }
`;

/* No celular o mapa inteiro não cabe com as casas legíveis: rola de lado. */
const Stage = styled.div`
  position: relative;
  background: #1d3b1a;
  line-height: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${arcadeColors.yellow} ${arcadeColors.nightDeep};
  -webkit-overflow-scrolling: touch;

  canvas {
    display: block;
    cursor: crosshair;
    outline: none;
    image-rendering: pixelated;
  }
`;

const floatHint = keyframes`
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, -6px); }
`;

const StageWrap = styled.div`
  position: relative;
`;

const Hint = styled.div<{ $gone: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 18px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  font-family: ${arcadeFonts.display};
  font-size: 15px;
  line-height: 1;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(4)};
  padding: 10px 16px;
  pointer-events: none;
  animation: ${floatHint} 1.6s ease-in-out infinite;
  opacity: ${({ $gone }) => ($gone ? 0 : 1)};
  transition: opacity 0.4s ease;

  @media ${breakpoint.sm} {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

const Controls = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 14px 24px;
  padding: 14px;
  background: ${arcadeColors.panel};
  border-top: ${arcadeBorder.thick};

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;

const Picker = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const PickerLabel = styled.span`
  font-family: ${arcadeFonts.display};
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.smoke};
  min-width: 70px;
`;

const OptionButton = styled.button<{ $active: boolean; $w?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: ${({ $w }) => $w || 46}px;
  height: 46px;
  padding: 0 8px;
  cursor: pointer;
  font-family: ${arcadeFonts.display};
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? arcadeColors.ink : arcadeColors.white)};
  background: ${({ $active }) =>
    $active ? arcadeColors.yellow : arcadeColors.nightDeep};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${({ $active }) => hardShadow($active ? 2 : 4)};
  transform: ${({ $active }) => ($active ? 'translate(2px, 2px)' : 'none')};
  transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.15s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? arcadeColors.yellow : arcadeColors.panelLight};
  }

  &:focus-visible {
    outline: 3px solid ${arcadeColors.cyan};
    outline-offset: 2px;
  }

  img {
    width: 22px;
    height: 22px;
    image-rendering: pixelated;
  }

  @media ${breakpoint.sm} {
    min-width: ${({ $w }) => ($w ? $w - 6 : 40)}px;
    height: 40px;
  }
`;

const STAT_ICONS: [keyof Stats, string, string][] = [
  ['speed', 'Speed', skillSpeed],
  ['power', 'Power', skillPower],
  ['range', 'Range', skillRange],
  ['bombs', 'Bombs', skillBombs],
];

const StatChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 12px 0 8px;
  font-family: ${arcadeFonts.display};
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.smoke};
  background: ${arcadeColors.nightDeep};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.pill};

  img {
    width: 20px;
    height: 20px;
  }
  b {
    font-size: 15px;
    font-weight: normal;
    color: ${arcadeColors.yellow};
  }

  @media ${breakpoint.sm} {
    span {
      display: none;
    }
  }
`;

const Keys = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${arcadeColors.smoke};
  justify-self: end;

  @media (hover: none) {
    display: none;
  }
`;

const Key = styled.kbd`
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 28px;
  padding: 0 6px;
  font-family: ${arcadeFonts.display};
  font-size: 12px;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.cloud};
  border: 2px solid ${arcadeColors.ink};
  border-radius: ${arcadeRadius.sm};
  box-shadow: 0 3px 0 ${arcadeColors.ink};
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;

  @media ${breakpoint.md} {
    flex-direction: column;
    align-items: flex-start;
  }

  ${SectionSubtitle} {
    margin-bottom: 0;
  }

  > a {
    flex: 0 0 auto;
    white-space: nowrap;
  }
`;

const Kicker = styled.span`
  display: inline-block;
  font-family: ${arcadeFonts.display};
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${arcadeColors.cyan};
  margin-bottom: 10px;
`;

/* Grade de pixels bem sutil no fundo, lembrando o chão do mapa. */
const Backdrop = styled(ArcadeSection)`
  background-color: ${arcadeColors.night};
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.035) 2px,
      transparent 2px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 2px, transparent 2px);
  background-size: 48px 48px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(
      ellipse 60% 50% at 50% 55%,
      rgba(44, 187, 23, 0.18),
      transparent 70%
    );
  }
`;

/* ------------------------------------------------------------------ */
/*  Geometria da moldura                                               */
/* ------------------------------------------------------------------ */

type Placed = { key: string; x: number; y: number; w: number; h: number };

/** Peças da moldura em px de arte, com (0,0) no canto do mapa. */
function borderPieces(theme: number): Placed[] {
  const out: Placed[] = [];
  (['top', 'bottom', 'left', 'right'] as const).forEach((side) => {
    const key = `t${theme}_border_${side}`;
    const [, , w, h] = ATLAS[key];
    const [ux, uy] = THEMES[theme].border[side];
    // Unity: centro do mapa na origem e y para cima → canto do mapa e y para baixo
    const cx = (ux + COLS / 2) * TILE;
    const cy = (ROWS / 2 - uy) * TILE;
    out.push({ key, x: cx - w / 2, y: cy - h / 2, w, h });
  });
  return out;
}

/** Retângulo do mundo (mapa + moldura) em px de arte. */
function worldBox(theme: number) {
  let x0 = 0;
  let y0 = 0;
  let x1 = COLS * TILE;
  let y1 = ROWS * TILE;
  for (const p of borderPieces(theme)) {
    x0 = Math.min(x0, p.x);
    y0 = Math.min(y0, p.y);
    x1 = Math.max(x1, p.x + p.w);
    y1 = Math.max(y1, p.y + p.h);
  }
  return { x0, y0, w: x1 - x0, h: y1 - y0 };
}

/* ------------------------------------------------------------------ */
/*  Componente                                                          */
/* ------------------------------------------------------------------ */

const PlayableMap: React.FC<{ id: string }> = ({ id }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState<Stats>(() => rollStats('legend'));
  const lookRef = useRef<{
    hero: HeroId;
    rarity: Rarity;
    theme: number;
    stats: Stats;
  }>({
    hero: 'frog',
    rarity: 'legend',
    theme: 0,
    stats,
  });
  const [hero, setHero] = useState<HeroId>('frog');
  const [rarity, setRarity] = useState<Rarity>('legend');
  const [theme, setTheme] = useState(0);
  const [hud, setHud] = useState<Hud>({
    bcoin: 0,
    sen: 0,
    chests: 0,
    bombs: 0,
    maps: 1,
  });
  const [bumps, setBumps] = useState({ bcoin: 0, sen: 0 });
  const [hintGone, setHintGone] = useState(false);
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(hover: none)').matches,
  );
  const relayoutRef = useRef<() => void>(() => undefined);

  const chooseHero = (h: HeroId) => {
    lookRef.current.hero = h;
    setHero(h);
    logTrackClickEventAnalytics('playable_map_skin');
  };
  const chooseRarity = (r: Rarity) => {
    // herói novo da raridade: atributos sorteados de novo, como um mint
    const s = rollStats(r);
    lookRef.current.rarity = r;
    lookRef.current.stats = s;
    setRarity(r);
    setStats(s);
    logTrackClickEventAnalytics('playable_map_rarity');
  };
  const chooseTheme = (t: number) => {
    lookRef.current.theme = t;
    setTheme(t);
    relayoutRef.current();
    logTrackClickEventAnalytics('playable_map_theme');
  };

  useEffect(() => {
    const host = stageRef.current;
    const cv = canvasRef.current;
    if (!host || !cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const sheet = new Image();
    sheet.src = atlasSrc;

    /** Desenha um recorte; (x, y, w, h) em px de arte. */
    const spr = (
      key: string,
      x: number,
      y: number,
      w?: number,
      h?: number,
      opts?: { flip?: boolean; rot?: number },
    ) => {
      const f = ATLAS[key];
      if (!f || !sheet.complete) return;
      const dw = w ?? f[2];
      const dh = h ?? f[3];
      if (opts && (opts.flip || opts.rot)) {
        ctx.save();
        ctx.translate(x + dw / 2, y + dh / 2);
        if (opts.rot) ctx.rotate((opts.rot * Math.PI) / 180);
        if (opts.flip) ctx.scale(-1, 1);
        ctx.drawImage(sheet, f[0], f[1], f[2], f[3], -dw / 2, -dh / 2, dw, dh);
        ctx.restore();
      } else ctx.drawImage(sheet, f[0], f[1], f[2], f[3], x, y, dw, dh);
    };

    let scale = 2; // px de tela por px de arte
    let box = worldBox(0);
    let grid: Tile[][] = [];
    let floorVar: boolean[][] = [];
    let wallVar: boolean[][] = [];
    let bombs: Bomb[] = [];
    let flames: Flame[] = [];
    let breaks: {
      c: number;
      r: number;
      kind: Kind;
      theme: number;
      t0: number;
    }[] = [];
    let floats: {
      x: number;
      y: number;
      text: string;
      coin: Coin;
      t0: number;
    }[] = [];
    let heroes: Hero[] = [];
    let hover: Step | null = null;
    let banner = 0;
    let regenAt = 0;
    let maps = 1;
    let blocksAtStart = 1;
    let now = performance.now();
    const score = { bcoin: 0, sen: 0 };
    const keysDown = new Set<string>();
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
    const player = () => heroes.find((h) => h.player);
    const ownBombs = (h: Hero) => bombs.filter((b) => b.owner === h).length;

    function layout() {
      box = worldBox(lookRef.current.theme);
      const avail = host!.clientWidth;
      // casa com pelo menos 22 px de tela: abaixo disso o mapa rola de lado
      scale = Math.max(22 / TILE, avail / box.w);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cssW = Math.round(box.w * scale);
      const cssH = Math.round(box.h * scale);
      cv!.width = Math.round(cssW * dpr);
      cv!.height = Math.round(cssH * dpr);
      cv!.style.width = `${cssW}px`;
      cv!.style.height = `${cssH}px`;
      const k = scale * dpr;
      ctx!.setTransform(k, 0, 0, k, -box.x0 * k, -box.y0 * k);
      ctx!.imageSmoothingEnabled = false;
      // no celular começa centrado, onde está a ação
      host!.scrollLeft = (cssW - avail) / 2;
      draw();
    }
    relayoutRef.current = layout;

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
      // heróis espalhados, com um respiro em volta de cada um
      const spots: [number, number][] = [];
      const n = NPC_COUNT + 1;
      for (let i = 0; i < n; i++) {
        let c = Math.round(((i + 0.5) / n) * (COLS - 1));
        if (c % 2 === 1) c--;
        const r = [0, ROWS - 1, 8][i % 3];
        spots.push([c, r]);
      }
      const keep = new Set<number>();
      spots.forEach(([c, r]) =>
        [
          [0, 0],
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].forEach(([dc, dr]) => keep.add(key(c + dc, r + dr))),
      );
      const total = CHEST_WEIGHTS.reduce((a, [, w]) => a + w, 0);
      blocksAtStart = 0;
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          if (
            grid[r][c].t !== 'floor' ||
            keep.has(key(c, r)) ||
            Math.random() > 0.5
          )
            continue;
          let kind: Kind = 'brick';
          if (Math.random() < 0.4) {
            let roll = Math.random() * total;
            for (const [k, w] of CHEST_WEIGHTS)
              if ((roll -= w) < 0) {
                kind = k;
                break;
              }
          }
          grid[r][c] = { t: 'block', kind, hp: HP[kind], max: HP[kind] };
          blocksAtStart++;
        }
      const wasPlayer = heroes.some((h) => h.player);
      const others = HEROES.map((h) => h.id).filter(
        (h) => h !== lookRef.current.hero,
      );
      heroes = spots.map(([c, r], i) => {
        const rar: Rarity =
          i === 0 ? lookRef.current.rarity : pick(RARITIES).id;
        return {
          // o primeiro herói é sempre o escolhido pelo visitante
          look:
            i === 0 ? lookRef.current.hero : others[(i - 1) % others.length],
          rarity: rar,
          x: c,
          y: r,
          path: [],
          dir: 'front',
          flip: false,
          task: null,
          wait: now + rnd(200, 1200),
          phase: Math.random() * 1000,
          player: i === 0 && wasPlayer,
          ...(i === 0 ? lookRef.current.stats : rollStats(rar)),
        };
      });
      banner = regenAt ? now : 0;
      regenAt = 0;
    }

    function blast(c: number, r: number, range: number) {
      const out: Omit<Flame, 't0'>[] = [{ c, r, part: 'center', rot: 0 }];
      const hits: Step[] = [];
      for (const [dc, dr, rot] of DIRS) {
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
          // só há arte apontando para a direita: o resto é giro/espelho
          out.push({
            c: nc,
            r: nr,
            part: last ? 'end' : 'middle',
            rot: rot === 180 ? 0 : rot,
            flip: rot === 180,
          });
        }
      }
      return { cells: out, hits };
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
    // caminho mais curto até a primeira casa que satisfaz "goal"
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

    function plant(c: number, r: number, owner: Hero | null) {
      const onOwnCell =
        owner &&
        Math.round(owner.x) === c &&
        Math.round(owner.y) === r &&
        !bombAt(c, r);
      if (!walkable(c, r) && !onOwnCell) return false;
      const me = player();
      // bomba do visitante usa o alcance e o poder do herói dele
      const st = owner ?? me ?? lookRef.current.stats;
      bombs.push({ c, r, t0: now, owner, range: st.range, power: st.power });
      return true;
    }

    function explode(b: Bomb) {
      bombs = bombs.filter((x) => x !== b);
      const { cells, hits } = blast(b.c, b.r, b.range);
      for (const f of cells) {
        flames.push({ ...f, t0: now });
        // bomba no caminho do fogo estoura junto (corrente)
        const other = bombAt(f.c, f.r);
        if (other && other !== b)
          other.t0 = Math.min(other.t0, now - FUSE + 90);
      }
      for (const h of hits) hitBlock(h.c, h.r, b.power);
    }
    function hitBlock(c: number, r: number, power: number) {
      const g = cell(c, r);
      if (!g || g.t !== 'block') return;
      g.hp = Math.max(0, g.hp - power);
      if (g.hp > 0) return;
      breaks.push({
        c,
        r,
        kind: g.kind,
        theme: lookRef.current.theme,
        t0: now,
      });
      grid[r][c] = { t: 'floor' };
      const rw = REWARD[g.kind];
      if (rw) {
        const v = rnd(rw[0], rw[1]);
        score[rw[2]] += v;
        floats.push({
          x: (c + 0.5) * TILE,
          y: r * TILE + 2,
          text: `+${v.toFixed(2)}`,
          coin: rw[2],
          t0: now,
        });
        const coin = rw[2];
        setBumps((b) => ({ ...b, [coin]: b[coin] + 1 }));
      }
      const left = grid.reduce(
        (n, row) => n + row.filter((x) => x.t === 'block').length,
        0,
      );
      const chests = grid.some((row) =>
        row.some((x) => x.t === 'block' && x.kind !== 'brick'),
      );
      if (!regenAt && (!chests || left < blocksAtStart * 0.08)) {
        regenAt = now + 1600;
        maps++;
      }
    }

    function think(h: Hero) {
      const c = Math.round(h.x);
      const r = Math.round(h.y);
      const D = danger();
      if (D.has(key(c, r))) {
        const p = bfs(c, r, (x, y) => !D.has(key(x, y)));
        if (p && p.length) {
          h.path = p;
          h.task = 'flee';
        }
        return;
      }
      if (now < h.wait) return;
      if (h.task === 'plant' && nextToBlock(c, r) && ownBombs(h) < h.bombs) {
        if (plant(c, r, h)) {
          h.task = null;
          h.wait = now + 300;
          return;
        }
      }
      // procura uma casa ao lado de um bloco, de onde dê para fugir da própria bomba
      const cands: [number, number][] = [];
      bfs(c, r, (x, y) => {
        if (!D.has(key(x, y)) && nextToBlock(x, y) && !bombAt(x, y)) {
          const D2 = danger({ c: x, r: y, range: h.range });
          if (bfs(x, y, (a, b2) => !D2.has(key(a, b2)), 160))
            cands.push([x, y]);
        }
        return cands.length >= 4;
      });
      if (cands.length) {
        const [tx, ty] = pick(cands);
        h.path = bfs(c, r, (x, y) => x === tx && y === ty) || [];
        h.task = 'plant';
      } else {
        h.path = (
          bfs(c, r, (x, y) => !D.has(key(x, y)) && Math.random() < 0.08) || []
        ).slice(0, 4);
        h.task = null;
        h.wait = now + rnd(400, 900);
      }
    }

    function face(h: Hero, dx: number, dy: number) {
      if (Math.abs(dx) > 0.01) {
        h.dir = 'right';
        h.flip = dx < 0;
      } else if (Math.abs(dy) > 0.01) h.dir = dy < 0 ? 'back' : 'front';
    }

    function move(h: Hero, dt: number, speed: number) {
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
      const step = speed * dt;
      face(h, dx, dy);
      if (d <= step) {
        h.x = p.c;
        h.y = p.r;
        h.path.shift();
      } else {
        h.x += (dx / d) * step;
        h.y += (dy / d) * step;
      }
    }

    // Herói controlado pelo teclado: anda uma casa por vez na direção apertada.
    function drivePlayer(h: Hero) {
      if (h.path.length) return;
      const c = Math.round(h.x);
      const r = Math.round(h.y);
      let dc = 0;
      let dr = 0;
      if (keysDown.has('left')) dc = -1;
      else if (keysDown.has('right')) dc = 1;
      else if (keysDown.has('up')) dr = -1;
      else if (keysDown.has('down')) dr = 1;
      if (!dc && !dr) return;
      face(h, dc, dr);
      if (walkable(c + dc, r + dr)) h.path = [{ c: c + dc, r: r + dr }];
    }

    function update(dt: number) {
      for (const b of [...bombs]) if (now - b.t0 >= FUSE) explode(b);
      flames = flames.filter((f) => now - f.t0 < FLAME);
      breaks = breaks.filter((b) => now - b.t0 < BREAK);
      floats = floats.filter((f) => now - f.t0 < 1200);
      // a escolha de herói/raridade chega aqui sem recriar o mapa
      const me = heroes[0];
      if (
        me &&
        (me.look !== lookRef.current.hero ||
          me.rarity !== lookRef.current.rarity)
      ) {
        me.look = lookRef.current.hero;
        me.rarity = lookRef.current.rarity;
        Object.assign(me, lookRef.current.stats);
      }
      for (const h of heroes) {
        if (h.player) {
          drivePlayer(h);
          if (h.path.length) move(h, dt, h.speed);
        } else if (h.path.length) move(h, dt, h.speed);
        else think(h);
      }
      if (regenAt && now >= regenAt) newMap();
    }

    function text(
      str: string,
      x: number,
      y: number,
      px: number,
      fill: string,
      line: number,
    ) {
      ctx!.font = `${px}px Retro, Bungee, monospace`;
      ctx!.lineJoin = 'round';
      ctx!.lineWidth = line;
      ctx!.strokeStyle = '#05060F';
      ctx!.strokeText(str, x, y);
      ctx!.fillStyle = fill;
      ctx!.fillText(str, x, y);
    }

    function drawBomb(b: Bomb) {
      const t = ((now - b.t0) / 1000) % BOMB_T[BOMB_T.length - 1];
      let i = 0;
      while (i < BOMB_T.length - 2 && t > BOMB_T[i + 1]) i++;
      const k = (t - BOMB_T[i]) / (BOMB_T[i + 1] - BOMB_T[i]);
      const sx = BOMB_SX[i] + (BOMB_SX[i + 1] - BOMB_SX[i]) * k;
      const sy = BOMB_SY[i] + (BOMB_SY[i + 1] - BOMB_SY[i]) * k;
      const ft = ((now - b.t0) / 1000) % 1;
      let fr = 0;
      for (const [at, f] of FUSE_FRAMES) if (ft >= at) fr = f;
      const w = TILE * sx;
      const h = TILE * sy;
      spr(
        `bomb_${fr}`,
        (b.c + 0.5) * TILE - w / 2,
        (b.r + 0.5) * TILE - h / 2,
        w,
        h,
      );
    }

    function draw() {
      if (!sheet.complete) return;
      const th = lookRef.current.theme;
      // chão de fundo por baixo da moldura (o cliente pinta o tilemap externo)
      for (let r = -4; r < ROWS + 4; r++)
        for (let c = -6; c < COLS + 6; c++) {
          const v = inside(c, r) ? floorVar[r][c] : (c + r) % 3 === 0;
          spr(`t${th}_floor_${v ? 'a' : 'b'}`, c * TILE, r * TILE);
        }
      if (hover && walkable(hover.c, hover.r)) {
        ctx!.fillStyle = 'rgba(255,210,63,.25)';
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
            spr(`t${th}_wall_${wallVar[r][c] ? 'a' : 'b'}`, c * TILE, r * TILE);
          else if (g.t === 'block')
            spr(
              g.kind === 'brick' ? `t${th}_brick` : `chest_${g.kind}_0`,
              c * TILE,
              r * TILE,
            );
        }
      for (const b of breaks) {
        const f = Math.min(7, Math.floor((now - b.t0) / FIRE_FRAME));
        spr(
          b.kind === 'brick'
            ? `t${b.theme}_break_${f}`
            : `chest_${b.kind}_${f}`,
          b.c * TILE,
          b.r * TILE,
        );
      }
      // moldura do tema por cima das bordas do mapa
      for (const p of borderPieces(th)) spr(p.key, p.x, p.y);

      // barra de vida (HealthBar.prefab): só com dano
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
        for (const b of bombs) if (b.r === r) drawBomb(b);
        heroes
          .filter((h) => Math.round(h.y) === r)
          .sort((a, b) => a.x - b.x)
          .forEach((h) => {
            const fr = Math.floor((now + h.phase) / HERO_FRAME) % 3;
            const k2 = `h_${h.look}_${artRarity(h.rarity)}_${h.dir}_${fr}`;
            const f = ATLAS[k2];
            if (!f) return;
            if (rarityLevel(h.rarity) > 0)
              spr(
                `glow_${h.rarity}`,
                (h.x + 0.5) * TILE - GLOW_W / 2,
                (h.y + 0.5 - 0.2) * TILE - GLOW_H / 2,
                GLOW_W,
                GLOW_H,
              );
            // o cliente ancora o herói embaixo-no-meio, um pouco abaixo do centro da casa
            const x = Math.round((h.x + 0.5) * TILE - f[2] / 2);
            const y = Math.round((h.y + 0.85) * TILE - f[3]);
            spr(k2, x, y, f[2], f[3], { flip: h.dir === 'right' && h.flip });
            if (h.player) {
              // setinha amarela em cima do herói do visitante
              const ax = (h.x + 0.5) * TILE;
              const ay = y - 2 + Math.sin(now / 180) * 1.2;
              ctx!.fillStyle = '#FFD23F';
              ctx!.strokeStyle = '#05060F';
              ctx!.lineWidth = 1;
              ctx!.beginPath();
              ctx!.moveTo(ax - 4, ay - 5);
              ctx!.lineTo(ax + 4, ay - 5);
              ctx!.lineTo(ax, ay);
              ctx!.closePath();
              ctx!.fill();
              ctx!.stroke();
            }
          });
      }
      for (const f of flames) {
        const fr = Math.min(3, Math.floor((now - f.t0) / FIRE_FRAME));
        spr(`${f.part}_${fr}`, f.c * TILE, f.r * TILE, TILE, TILE, {
          rot: f.rot,
          flip: f.flip,
        });
      }
      ctx!.textAlign = 'left';
      ctx!.textBaseline = 'middle';
      for (const f of floats) {
        const p = (now - f.t0) / 1200;
        const y = f.y - p * 14;
        ctx!.globalAlpha = p < 0.7 ? 1 : 1 - (p - 0.7) / 0.3;
        ctx!.font = '7px Retro, Bungee, monospace';
        const tw = ctx!.measureText(f.text).width;
        const icon = 8;
        const x = f.x - (tw + icon + 2) / 2;
        spr(f.coin, x, y - icon / 2, icon, icon);
        text(
          f.text,
          x + icon + 2,
          y,
          7,
          f.coin === 'sen' ? '#FF7FA8' : '#FFD23F',
          2.5,
        );
        ctx!.globalAlpha = 1;
      }
      if (banner && now - banner < 1400) {
        const p = (now - banner) / 1400;
        const a = p < 0.15 ? p / 0.15 : p > 0.75 ? (1 - p) / 0.25 : 1;
        ctx!.globalAlpha = a;
        ctx!.fillStyle = 'rgba(8,10,31,.55)';
        ctx!.fillRect(box.x0, box.y0, box.w, box.h);
        ctx!.textAlign = 'center';
        text(
          'NEW MAP!',
          (COLS * TILE) / 2,
          (ROWS * TILE) / 2,
          28,
          '#FFD23F',
          6,
        );
        ctx!.globalAlpha = 1;
      }

      const chests = grid.reduce(
        (n, row) =>
          n + row.filter((x) => x.t === 'block' && x.kind !== 'brick').length,
        0,
      );
      const next: Hud = {
        bcoin: score.bcoin,
        sen: score.sen,
        chests,
        bombs: bombs.length,
        maps,
      };
      const sig = `${next.bcoin.toFixed(2)}|${next.sen.toFixed(2)}|${chests}|${
        next.bombs
      }|${maps}`;
      if (sig !== lastHud) {
        lastHud = sig;
        setHud(next);
      }
    }

    /* ----------------------------- entrada ----------------------------- */

    const cellAt = (e: MouseEvent): Step => {
      const r = cv.getBoundingClientRect();
      const ax = ((e.clientX - r.left) / r.width) * box.w + box.x0;
      const ay = ((e.clientY - r.top) / r.height) * box.h + box.y0;
      return { c: Math.floor(ax / TILE), r: Math.floor(ay / TILE) };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') hover = cellAt(e);
    };
    const onLeave = () => {
      hover = null;
    };
    // "click" e não "pointerdown": arrastar o mapa no celular não solta bomba
    const onClick = (e: MouseEvent) => {
      const p = cellAt(e);
      if (plant(p.c, p.r, null)) {
        setHintGone(true);
        logTrackClickEventAnalytics('playable_map_bomb');
        if (reduceMotion) {
          explode(bombs[bombs.length - 1]);
          draw();
        }
      }
    };

    const KEYMAP: Record<string, string> = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      ArrowDown: 'down',
      a: 'left',
      d: 'right',
      w: 'up',
      s: 'down',
      A: 'left',
      D: 'right',
      W: 'up',
      S: 'down',
    };
    // O teclado só vale com o mapa em foco (clicado ou com Tab), para nunca
    // roubar as setas da rolagem da página.
    const onKeyDown = (e: KeyboardEvent) => {
      const dir = KEYMAP[e.key];
      const isBomb = e.key === ' ' || e.key === 'Enter';
      if (!dir && !isBomb) return;
      e.preventDefault();
      if (heroes[0] && !heroes[0].player) {
        heroes[0].player = true;
        heroes[0].path = heroes[0].path.slice(0, 1);
        heroes[0].task = null;
      }
      setHintGone(true);
      if (dir) keysDown.add(dir);
      const h = player();
      if (isBomb && h) {
        const tc = Math.round(h.path[0]?.c ?? h.x);
        const tr = Math.round(h.path[0]?.r ?? h.y);
        if (!bombAt(tc, tr) && ownBombs(h) < h.bombs)
          bombs.push({
            c: tc,
            r: tr,
            t0: now,
            owner: h,
            range: h.range,
            power: h.power,
          });
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const dir = KEYMAP[e.key];
      if (dir) keysDown.delete(dir);
    };
    const onBlur = () => keysDown.clear();

    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerleave', onLeave);
    cv.addEventListener('click', onClick);
    cv.addEventListener('keydown', onKeyDown);
    cv.addEventListener('keyup', onKeyUp);
    cv.addEventListener('blur', onBlur);

    /* ------------------------------ laço ------------------------------- */

    let raf = 0;
    let visible = true;
    let last = 0;
    const frame = (ts: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      now = ts;
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
      last = ts;
      if (!reduceMotion) update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    };
    let alive = true;
    const start = () => {
      if (alive && !raf && visible && !document.hidden) {
        last = 0;
        raf = requestAnimationFrame(frame);
      }
    };

    // só anima com o mapa na tela — fora dela não gasta CPU
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) start();
          })
        : null;
    io?.observe(host);
    const onVis = () => start();
    document.addEventListener('visibilitychange', onVis);
    let lastW = 0;
    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (host.clientWidth !== lastW) {
              lastW = host.clientWidth;
              layout();
            }
          })
        : null;
    ro?.observe(host);

    newMap();
    layout();
    sheet.onload = () => {
      draw();
      start();
    };
    if (sheet.complete) start();

    return () => {
      // a folha pode terminar de carregar depois de a seção sair da tela
      alive = false;
      sheet.onload = null;
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      ro?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerleave', onLeave);
      cv.removeEventListener('click', onClick);
      cv.removeEventListener('keydown', onKeyDown);
      cv.removeEventListener('keyup', onKeyUp);
      cv.removeEventListener('blur', onBlur);
    };
  }, []);

  return (
    <Backdrop id={id}>
      <ArcadeContainer style={{ position: 'relative' }}>
        <Reveal>
          <Head>
            <div>
              <Kicker>▶ Try it now</Kicker>
              <SectionTitle>Drop a bomb!</SectionTitle>
              <SectionSubtitle>
                This is Treasure Hunt: heroes walk the map, plant bombs and
                break chests full of BCOIN and SEN. {isTouch ? 'Tap' : 'Click'}{' '}
                the map to drop a bomb yourself
                {isTouch
                  ? '.'
                  : ' — or click it and use the arrow keys to take control of your hero.'}
              </SectionSubtitle>
            </div>
            <ArcadeButton
              as="a"
              href="https://game.bombcrypto.io/"
              target="_blank"
              rel="noreferrer"
              $tone="red"
              onClick={() => logTrackClickEventAnalytics('play_click')}
            >
              Play the real game
            </ArcadeButton>
          </Head>
        </Reveal>

        <Reveal delay={120}>
          <FrameBox>
            <HudBar>
              <Chip $bump={bumps.bcoin} key={`b${bumps.bcoin}`}>
                <Sprite $key="bcoin" />
                {hud.bcoin.toFixed(2)} <small>BCOIN</small>
              </Chip>
              <Chip $bump={bumps.sen} key={`s${bumps.sen}`}>
                <Sprite $key="sen" />
                {hud.sen.toFixed(2)} <small>SEN</small>
              </Chip>
              <Chip>
                <Sprite $key="chest_gold_0" />
                {hud.chests} <small>chests</small>
              </Chip>
              <Chip>
                <Sprite $key="bomb_1" />
                {hud.bombs} <small>bombs</small>
              </Chip>
              <HudSpacer />
              <Chip className="map">
                <small>MAP</small> {hud.maps}
              </Chip>
              <DemoTag>Demo</DemoTag>
            </HudBar>

            <StageWrap>
              <Stage ref={stageRef}>
                <canvas
                  ref={canvasRef}
                  tabIndex={0}
                  aria-label="Animated BombCrypto Treasure Hunt map. Click to drop a bomb; focus it and use the arrow keys and space to play."
                />
              </Stage>
              <Hint $gone={hintGone}>
                <Sprite $key="bomb_1" $size={20} />
                <BlinkText>
                  {isTouch ? 'Tap to drop a bomb' : 'Click to drop a bomb'}
                </BlinkText>
              </Hint>
            </StageWrap>

            <Controls>
              <div style={{ display: 'grid', gap: 10 }}>
                <Picker role="radiogroup" aria-label="Choose your hero">
                  <PickerLabel>Hero</PickerLabel>
                  {HEROES.map((h) => (
                    <OptionButton
                      key={h.id}
                      type="button"
                      role="radio"
                      aria-checked={hero === h.id}
                      aria-label={h.name}
                      title={h.name}
                      $active={hero === h.id}
                      onClick={() => chooseHero(h.id)}
                    >
                      <Sprite
                        $key={`h_${h.id}_${artRarity(rarity)}_front_0`}
                        $size={32}
                      />
                    </OptionButton>
                  ))}
                </Picker>
                <Picker role="radiogroup" aria-label="Choose the rarity">
                  <PickerLabel>Rarity</PickerLabel>
                  {RARITIES.map((r) => (
                    <OptionButton
                      key={r.id}
                      type="button"
                      role="radio"
                      aria-checked={rarity === r.id}
                      aria-label={r.name}
                      title={r.name}
                      $active={rarity === r.id}
                      onClick={() => chooseRarity(r.id)}
                    >
                      <img src={r.icon} alt="" />
                    </OptionButton>
                  ))}
                </Picker>
                <Picker aria-label="Your hero stats">
                  <PickerLabel>Stats</PickerLabel>
                  {STAT_ICONS.map(([k, label, icon]) => (
                    <StatChip key={k} title={label}>
                      <img src={icon} alt="" />
                      <span>{label}</span>
                      <b>{stats[k]}</b>
                    </StatChip>
                  ))}
                </Picker>
                <Picker role="radiogroup" aria-label="Choose the map">
                  <PickerLabel>Map</PickerLabel>
                  {THEMES.map((t, i) => (
                    <OptionButton
                      key={t.name}
                      type="button"
                      role="radio"
                      aria-checked={theme === i}
                      $active={theme === i}
                      $w={96}
                      onClick={() => chooseTheme(i)}
                    >
                      <Sprite $key={`t${i}_brick`} $size={20} />
                      {t.name}
                    </OptionButton>
                  ))}
                </Picker>
              </div>
              <Keys>
                <Key>←</Key>
                <Key>↑</Key>
                <Key>↓</Key>
                <Key>→</Key>
                move
                <Key style={{ minWidth: 64 }}>Space</Key>
                bomb
              </Keys>
            </Controls>
          </FrameBox>
        </Reveal>
      </ArcadeContainer>
    </Backdrop>
  );
};

export default PlayableMap;
