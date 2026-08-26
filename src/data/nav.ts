import home from 'src/assests/imgHeader/home.png';
import bcoin from 'src/assests/imgHeader/bcoin.png';
import report from 'src/assests/imgHeader/report.png';
import guide from 'src/assests/imgHeader/guide.png';
import marketplace from 'src/assests/imgHeader/marketplace.webp';
import faq from 'src/assests/imgHeader/faq.png';
import stake from 'src/assests/images/stake.png';

import homeIcon from 'src/assests/updateHome/Thanh menu/home.png';
import homeIconActive from 'src/assests/updateHome/Thanh menu/home1.png';
import marketplaceIcon from 'src/assests/updateHome/Thanh menu/marketplace.png';
import marketplaceIconActive from 'src/assests/updateHome/Thanh menu/marketplace1.png';
import stakeIcon from 'src/assests/updateHome/Thanh menu/stake.png';
import stakeIconActive from 'src/assests/updateHome/Thanh menu/stake1.png';
import guildIconActive from 'src/assests/updateHome/Thanh menu/guild1.png';
import guildIcon from 'src/assests/updateHome/Thanh menu/guild.png';

type NavImage = {
  image: any;
  link: string;
  linkPolygon?: string;
  target: string | null;
  button_name: string;
};

export type NavText = {
  text: string;
  link: string;
  linkPolygon?: string;
  target?: string | undefined;
  button_name: string;
  conversion?: string;
};

export const nav: NavImage[] = [
  { image: home, link: '/', target: null, button_name: 'home' },
  { image: bcoin, link: '/bcoin', target: null, button_name: 'bcoin' },
  {
    image: report,
    link: 'https://report.bombcrypto.io',
    target: '_blank',
    button_name: 'report',
  },
  { image: guide, link: '/guide', target: null, button_name: 'guide' },
  { image: faq, link: '/faq', target: null, button_name: 'faq' },
  {
    image: marketplace,
    link: 'https://market.bombcrypto.io/',
    target: '_blank',
    button_name: 'marketplace',
  },
  {
    image: stake,
    link: 'https://dapp.bombcrypto.io',
    target: '_blank',
    button_name: 'dapp',
  },
];

export const navText: NavText[] = [
  { text: 'HOME', link: '/', target: undefined, button_name: 'home' },
  /*{
    text: 'DAPPS',
    target: '_blank',
    link: 'https://dapp.bombcrypto.io',
    button_name: 'dapp',
    conversion: 'info_click',
  },*/
  //{ text: 'BCOIN', target: undefined, link: '/bcoin', button_name: 'bcoin' },
  /*{
    text: 'REPORT',
    target: '_blank',
    link: 'https://report.bombcrypto.io',
    button_name: 'report',
  },*/
  {
    text: 'PLAY',
    target: '_blank',
    link: 'https://game.bombcrypto.io/',
    button_name: 'play',
    conversion: 'play_click',
  },
  {
    text: 'DEMO',
    target: '_blank',
    link: 'https://demo.bombcrypto.io',
    button_name: 'demo',
    conversion: 'demo_click',
  },
  {
    text: 'MARKET',
    target: '_blank',
    link: 'https://market.bombcrypto.io',
    button_name: 'marketplace',
    conversion: 'market_click',
  },
  {
    text: 'GUIDE',
    target: undefined,
    link: '/guide',
    button_name: 'guide',
    conversion: 'info_click',
  },
  //{ text: 'FAQ', target: undefined, link: '/faq', button_name: 'faq' },
];

export const navTextWorldCup: NavText[] = [
  { text: 'HOME', link: '/', button_name: 'HOME' },
  { text: 'GLORY PASS', link: '#glory-pass', button_name: 'glory' },
  { text: 'TIMELINE', link: '#timeline', button_name: 'timeline' },
  {
    text: 'EVENT',
    link: '#event',
    button_name: 'event',
  },
  { text: 'REWARD', link: '#reward', button_name: 'reward' },
];

type UpdateNavbar = {
  link: string;
  icon: string;
  iconActive: string;
  target: string | null;
};

export const updateNavbar: UpdateNavbar[] = [
  { link: '/', icon: homeIcon, iconActive: homeIconActive, target: null },
  {
    link: 'https://market.bombcrypto.io',
    icon: marketplaceIcon,
    iconActive: marketplaceIconActive,
    target: '_blank',
  },
  {
    link: 'https://dapp.bombcrypto.io',
    icon: stakeIcon,
    iconActive: stakeIconActive,
    target: '_blank',
  },
  {
    link: '/guide',
    icon: guildIcon,
    iconActive: guildIconActive,
    target: null,
  },
];
