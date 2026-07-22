import BoomOnline from 'src/assests/aboutSenspark/cs.png';
import GoldMiner from 'src/assests/aboutSenspark/GM1.png';
import StickerMan from 'src/assests/aboutSenspark/s1.png';
import TankWar from 'src/assests/aboutSenspark/s3.png';
import TienLenMN from 'src/assests/aboutSenspark/tlmn.png';

export type SummaryData = {
  title: string;
  desc: string;
};

export const summary: SummaryData[] = [
  {
    title: 'Total Download',
    desc: '100M',
  },
  {
    title: 'Total Games',
    desc: '40+',
  },
  {
    title: 'Total Staff',
    desc: '50+',
  },
  {
    title: 'Global Hit',
    desc: '5+',
  },
  {
    title: 'Founded',
    desc: '2011',
  },
];

export type GameData = {
  image: string;
  title: string;
  desc: string;
  download: string;
};

export const game: GameData[] = [
  {
    image: StickerMan,
    title: 'Stickman Battle 2021',
    desc: 'Download',
    download: '>18M',
  },
  {
    image: GoldMiner,
    title: 'All Gold Miner Game',
    desc: 'Download',
    download: '>20M',
  },
  {
    image: TankWar,
    title: 'Tank 1990',
    desc: 'Download',
    download: '>6M',
  },
  {
    image: BoomOnline,
    title: 'Bomb Squad',
    desc: 'Download',
    download: '>1.5M',
  },
  {
    image: TienLenMN,
    title: 'All Card Game',
    desc: 'Download',
    download: '>7M',
  },
];
