import bgNew from 'src/assests/images/notification/new.png';
import event from 'src/assests/images/notification/event.png';
import feature from 'src/assests/images/notification/feature.png';

type Content = {
  des: string;
  date: string;
  href: string;
};

type Notifications = {
  title: string;
  eventKey: string;
  img?: any;
  content: Array<Content>;
};

export const notifications: Notifications[] = [
  {
    title: 'News',
    eventKey: 'new',
    img: bgNew,
    content: [
      {
        des: 'Official Discord: discord.gg/wG75cP9TRh',
        date: '23/02/26',
        href: 'https://discord.gg/wG75cP9TRh',
      },
      {
        des: 'Bomb Crypto: Major Updates On TON',
        date: '17/03/25',
        href: 'https://bombcrypto.substack.com/p/bomb-crypto-major-updates-on-ton',
      },
      {
        des: `March Recap and Planning Forward`,
        date: '31/03/25',
        href: 'https://bombcrypto.substack.com/p/march-recap-and-planning-forward',
      },
      {
        des: '90/90 TON Avatar NFTs sold out - Listing an additional 10,000 NFTs on Getgems',
        date: '13/03/25',
        href: 'https://getgems.io/bombcrypto',
      },
    ],
  },
  {
    title: 'Events',
    eventKey: 'event',
    img: event,
    content: [
      {
        des: 'Bomb Crypto Mini Game Contest 2025',
        date: '09/04/25',
        href: 'https://bombcrypto.substack.com/p/bomb-crypto-mini-game-contest-2025',
      },
      {
        des: 'Spring Tournament 2025 Playlist',
        date: '07/03/25',
        href: 'https://www.youtube.com/watch?v=N4WCQs6IDOw&list=PLBYwDOZEXGKzOiFVBF2HuKpwp-GmYNoyA&pp=0gcJCXcEOCosWNin',
      },
      {
        des: 'AMA about Bomb Crypto on Crypto Power',
        date: '14/06/24',
        href: 'https://binance.com/en/live/u/29808872',
      },
      {
        des: 'Market Insiders Community AMA on Coinstore channel',
        date: '14/06/24',
        href: 'https://youtube.com/watch?v=_nBehvG_AtE',
      },
      {
        des: 'Coinstore x BCOIN Bonanza Giveaway',
        date: '28/05/24',
        href: 'https://gleam.io/txCPk/-coinstore-bomb-crypto-bonanza-giveaway',
      },
    ],
  },
  {
    title: 'Features',
    img: feature,
    eventKey: 'feature',
    content: [
      {
        des: 'Bomb Crypto (TON) - Club Feature',
        date: '25/11/24',
        href: 'https://bombcrypto.substack.com/p/bomb-crypto-ton-club-feature',
      },
      {
        des: 'How To Use Legacy-Hero-Stake Feature',
        date: '16/04/24',
        href: 'https://bombcrypto.substack.com/p/how-to-use-legacy-hero-stake-feature?utm_source=publication-search',
      },
    ],
  },
];
