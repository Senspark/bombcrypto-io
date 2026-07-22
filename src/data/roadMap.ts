// import blockBlue from 'src/assests/imgRoadMap/blockBlue.webp';
import blockPink from 'src/assests/imgRoadMap/blockPink.webp';

type PhaseMap = {
  image: any;
};

type InfoDate = {
  date: string;
  info: string[];
};

export const phaseMap: PhaseMap[] = [
  { image: blockPink },
  { image: blockPink },
  { image: blockPink },
  { image: blockPink },
  { image: blockPink },
];

export const infoDate: InfoDate[] = [
  {
    date: 'Q3/2021',
    info: [
      'Buy hero',
      'Hero stats & upgrade',
      'Hero rescue',
      'Buy house',
      'Treasure hunt mode',
    ],
  },
  {
    date: 'Q4/2021',
    info: ['Add marketplace', 'Add story mode', 'Add new skins'],
  },
  {
    date: 'Q1/2022',
    info: ['VIP & stake', 'New story mode level'],
  },
  {
    date: 'Q2/2022',
    info: [
      'Add new battle mode',
      'Add leaderboard',
      'Add Amazon Survival mode',
    ],
  },
  {
    date: 'Q3/2022',
    info: ['Add vote', 'Add auto mine'],
  },
  {
    date: 'Q4/2022',
    info: ['Add NTF drop in PVP', 'Add market NFT in game'],
  },
];
