import common from 'src/assests/Raritys/rarity_common.png';
import rare from 'src/assests/Raritys/rarity_rare.png';
import superRate from 'src/assests/Raritys/rarity_super_rare.png';
import epic from 'src/assests/Raritys/rarity_epic.png';
import legend from 'src/assests/Raritys/rarity_legend.png';
import superLegend from 'src/assests/Raritys/rarity_super_legend.png';
import s from 'src/assests/Raritys/s.png';

import mega from 'src/assests/Raritys/07_Mega.png';
import supermega from 'src/assests/Raritys/08_Super_Mega.png';
import mystic from 'src/assests/Raritys/09_Mystic.png';
import supermystic from 'src/assests/Raritys/10_Super_Mystic.png';

import commonGlow from 'src/assests/Raritys/common_glow.png';
import rareGlow from 'src/assests/Raritys/rare_glow.png';
import supperRateGlow from 'src/assests/Raritys/sr_glow.png';
import epicGlow from 'src/assests/Raritys/epic_glow.png';
import legendGlow from 'src/assests/Raritys/legend_glow.png';
import superLegendGlow from 'src/assests/Raritys/sl_glow.png';
import sGlow from 'src/assests/Raritys/s_glow.png';

import megaGlow from 'src/assests/Raritys/select_mega.png';
import supermegaGlow from 'src/assests/Raritys/select_spmega.png';
import mysticGlow from 'src/assests/Raritys/select_mystic.png';
import supermysticGlow from 'src/assests/Raritys/select_spmystic.png';

export type RarityImage = {
  rarity: string;
  glow: any;
  image: any;
};

type RarityConfigType = {
  [key: string]: {
    main: RarityImage[];
    extra: RarityImage[] | null;
  };
};

export const RARITYDEFINE = {
  COMMON: 'COMMON',
  RARE: 'RARE',
  SUPER_RARE: 'SUPER_RARE',
  EPIC: 'EPIC',
  LEGEND: 'LEGEND',
  SUPER_LEGEND: 'SUPER_LEGEND',
  S: 'S',
  MEGA: 'MEGA',
  SUPER_MEGA: 'SUPER_MEGA',
  MYSTIC: 'MYSTIC',
  SUPER_MYSTIC: 'SUPER_MYSTIC',
};

export type RarityType = typeof RARITYDEFINE[keyof typeof RARITYDEFINE];

export const rarity: RarityImage[] = [
  { rarity: RARITYDEFINE.COMMON, image: common, glow: commonGlow },
  { rarity: RARITYDEFINE.RARE, image: rare, glow: rareGlow },
  { rarity: RARITYDEFINE.SUPER_RARE, image: superRate, glow: supperRateGlow },
  { rarity: RARITYDEFINE.EPIC, image: epic, glow: epicGlow },
  { rarity: RARITYDEFINE.LEGEND, image: legend, glow: legendGlow },
  {
    rarity: RARITYDEFINE.SUPER_LEGEND,
    image: superLegend,
    glow: superLegendGlow,
  },
  { rarity: RARITYDEFINE.S, image: s, glow: sGlow },
];

export const rarityWithoutS: RarityImage[] = rarity.filter(
  (r) => r.rarity !== RARITYDEFINE.S,
);

export const rarityExtra: RarityImage[] = [
  { rarity: RARITYDEFINE.MEGA, image: mega, glow: megaGlow },
  { rarity: RARITYDEFINE.SUPER_MEGA, image: supermega, glow: supermegaGlow },
  { rarity: RARITYDEFINE.MYSTIC, image: mystic, glow: mysticGlow },
  {
    rarity: RARITYDEFINE.SUPER_MYSTIC,
    image: supermystic,
    glow: supermysticGlow,
  },
];

export const RarityConfig: RarityConfigType = {
  BINANCE: {
    main: rarity,
    extra: null,
  },
  POLYGON: {
    main: rarity,
    extra: null,
  },
  TON: {
    main: rarityWithoutS,
    extra: rarityExtra,
  },
  SOLANA: {
    main: rarityWithoutS,
    extra: rarityExtra,
  },
};
