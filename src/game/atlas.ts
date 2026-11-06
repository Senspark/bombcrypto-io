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

/*
 * Arte do jogo para os desenhos em canvas da home: um atlas só (gerado por
 * scripts/build-map-atlas.py a partir do bombcrypto-client-v2) e os dados de
 * heróis/raridades que a vitrine e o mapa do topo dividem.
 */

export type Frame = [number, number, number, number];
export const ATLAS = atlasMeta.frames as unknown as Record<string, Frame>;
export const ATLAS_W = atlasMeta.w;
export const ATLAS_H = atlasMeta.h;
export const ATLAS_SRC = atlasSrc;
export const TILE = 16; // px de arte por casa (spritePixelsToUnits do cliente)

let sheet: HTMLImageElement | null = null;
let ready: Promise<HTMLImageElement> | null = null;

/** Carrega a folha uma vez por página. */
export function loadAtlas(): Promise<HTMLImageElement> {
  if (ready) return ready;
  // Se a imagem falhar, a promessa resolve mesmo assim: os desenhos ficam
  // vazios (drawSprite não desenha sem folha), mas nada fica esperando.
  ready = new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      sheet = img;
      resolve(img);
    };
    img.onerror = () => resolve(img);
    img.src = atlasSrc;
  });
  return ready;
}

/** Desenha um recorte; (x, y, w, h) em px de arte. */
export function drawSprite(
  ctx: CanvasRenderingContext2D,
  key: string,
  x: number,
  y: number,
  w?: number,
  h?: number,
  opts?: { flip?: boolean; rot?: number },
) {
  const f = ATLAS[key];
  if (!f || !sheet) return;
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
}

/** Um recorte do atlas como imagem (data URL), para usar de fundo repetido em CSS. */
export async function spriteDataUrl(key: string): Promise<string> {
  await loadAtlas();
  const f = ATLAS[key];
  const cv = document.createElement('canvas');
  cv.width = f[2];
  cv.height = f[3];
  const ctx = cv.getContext('2d');
  if (!ctx) return '';
  drawSprite(ctx, key, 0, 0);
  return cv.toDataURL();
}

/** CSS de um recorte do atlas como ícone (proporção do sprite, lado maior = size). */
export function spriteStyle(key: string, size: number): Record<string, string> {
  const [x, y, w, h] = ATLAS[key];
  const s = size / Math.max(w, h);
  return {
    width: `${w * s}px`,
    height: `${h * s}px`,
    backgroundImage: `url(${atlasSrc})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${ATLAS_W * s}px ${ATLAS_H * s}px`,
    backgroundPosition: `${-x * s}px ${-y * s}px`,
    imageRendering: 'pixelated',
    display: 'inline-block',
    flex: '0 0 auto',
  };
}

/* ------------------------------------------------------------------ */

export type HeroId =
  | 'frog'
  | 'knight'
  | 'ninja'
  | 'witch'
  | 'pepe'
  | 'doge'
  | 'vampire'
  | 'king'
  | 'cowboy';

export const HEROES: { id: HeroId; name: string }[] = [
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

export type Rarity =
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

/**
 * As 10 raridades. `weight` = chance de mint em 10.000 e `stat` = faixa de
 * speed/power/stamina, ambos do servidor (ServerHeroDetails.kt); alcance e
 * número de bombas = nível + 1.
 */
export const RARITIES: {
  id: Rarity;
  name: string;
  icon: string;
  weight: number;
  stat: [number, number];
}[] = [
  { id: 'common', name: 'Common', icon: rarityCommon, weight: 8118, stat: [1, 3] },
  { id: 'rare', name: 'Rare', icon: rarityRare, weight: 962, stat: [3, 6] },
  { id: 'superrare', name: 'Super Rare', icon: raritySuperRare, weight: 481, stat: [6, 9] },
  { id: 'epic', name: 'Epic', icon: rarityEpic, weight: 240, stat: [9, 12] },
  { id: 'legend', name: 'Legend', icon: rarityLegend, weight: 112, stat: [12, 15] },
  { id: 'superlegend', name: 'Super Legend', icon: raritySuperLegend, weight: 51, stat: [15, 18] },
  { id: 'mega', name: 'Mega', icon: rarityMega, weight: 22, stat: [18, 21] },
  { id: 'supermega', name: 'Super Mega', icon: raritySuperMega, weight: 9, stat: [21, 24] },
  { id: 'mystic', name: 'Mystic', icon: rarityMystic, weight: 4, stat: [24, 27] },
  { id: 'supermystic', name: 'Super Mystic', icon: raritySuperMystic, weight: 1, stat: [27, 30] },
]; // prettier-ignore

export const rarityLevel = (r: Rarity) => RARITIES.findIndex((x) => x.id === r);

/*
 * O cliente só tem arte Skin/<raridade> até Super Legend; de Mega para cima o
 * HeroSpriteLoader cai na cor padrão (White) e o que diferencia é o brilho.
 */
export const artRarity = (r: Rarity): Rarity =>
  rarityLevel(r) > 5 ? 'common' : r;
export const heroKey = (
  hero: HeroId,
  r: Rarity,
  dir: 'front' | 'back' | 'right',
  frame: number,
) => `h_${hero}_${artRarity(r)}_${dir}_${frame}`;

/* Brilho atrás do herói (Player.prefab → backlight): 55x72 px a 100 ppu,
   escala 3, 0,2 casa acima do centro; só da Rare para cima. */
export const GLOW_W = ((55 * 3) / 100) * TILE;
export const GLOW_H = ((72 * 3) / 100) * TILE;

/** Sorteia uma raridade com as chances reais de mint. */
export function rollRarity(): Rarity {
  const total = RARITIES.reduce((a, r) => a + r.weight, 0);
  let roll = Math.random() * total;
  for (const r of RARITIES) if ((roll -= r.weight) < 0) return r.id;
  return 'common';
}
