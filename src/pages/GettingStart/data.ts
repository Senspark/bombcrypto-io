import number_1 from 'src/assests/getting_started/number-getstared_0000_1.webp';
import active_1 from 'src/assests/getting_started/hover-getstared_0000_1.webp';
import number_2 from 'src/assests/getting_started/number-getstared_0001_2.webp';
import active_2 from 'src/assests/getting_started/hover-getstared_0001_2.webp';
import number_3 from 'src/assests/getting_started/number-getstared_0002_3.webp';
import active_3 from 'src/assests/getting_started/hover-getstared_0002_3.webp';
import number_4 from 'src/assests/getting_started/number-getstared_0003_4.webp';
import active_4 from 'src/assests/getting_started/hover-getstared_0003_4.webp';
import number_5 from 'src/assests/getting_started/number-getstared_0004_5.webp';
import active_5 from 'src/assests/getting_started/hover-getstared_0004_5.webp';
import number_6 from 'src/assests/getting_started/number-getstared_0005_6.webp';
import active_6 from 'src/assests/getting_started/hover-getstared_0005_6.webp';

import create_left from 'src/assests/getting_started/create_left.webp';
import create_right from 'src/assests/getting_started/create_right.webp';
import buy_coin_left from 'src/assests/getting_started/buy_coin_left.webp';
import buy_coin_right from 'src/assests/getting_started/buy_coin_right.webp';
import login_left from 'src/assests/getting_started/login_left.webp';
import login_right from 'src/assests/getting_started/login_right.png';
import acvivehero_left from 'src/assests/getting_started/acvivehero_left.webp';
import acvivehero_right from 'src/assests/getting_started/acvivehero_right.png';
import buy_house_right from 'src/assests/getting_started/buy_house_right.png';
import upgrade_heroes_left from 'src/assests/getting_started/upgrade_heroes_left.webp';
import upgrade_heroes_right from 'src/assests/getting_started/upgrade_heroes_right.png';

export default [
  {
    index: 1,
    number: number_1,
    active: active_1,
    label: 'Create Metamask Wallet',
    title: 'Create Your Metamask Wallet',
    content: 'Metamask Wallet is your boarding pass to our digital nation',
    left: create_left,
    right: create_right,
  },
  {
    index: 2,
    number: number_2,
    active: active_2,
    label: 'Buy BCOIN',
    title: 'Buy BCOIN to Start Playing',
    content: 'We have to swap BUSD to BCOIN',
    left: buy_coin_left,
    right: buy_coin_right,
  },
  {
    index: 3,
    number: number_3,
    active: active_3,
    label: 'Login game',
    title: 'Login BombCrypto game',
    content: '',
    left: login_left,
    right: login_right,
  },
  {
    index: 4,
    number: number_4,
    active: active_4,
    label: 'Buy / Active Bomber Heroes',
    title: 'Buy / Active Bomber Heroes',
    content: '',
    left: acvivehero_left,
    right: acvivehero_right,
  },
  {
    index: 5,
    number: number_5,
    active: active_5,
    label: 'Buy House',
    title: 'Buy House',
    content:
      'House is the place where it can help bomber heroes recover stamina faster',
    left: buy_coin_left,
    right: buy_house_right,
  },
  {
    index: 6,
    number: number_6,
    active: active_6,
    label: 'Upgrade Bomber Heroes',
    title: 'Upgrade Heroes',
    content: "Upgrade hero will increase the character's damage by 1",
    left: upgrade_heroes_left,
    right: upgrade_heroes_right,
  },
];
