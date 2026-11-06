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

import type { Lang } from 'src/i18n';

/** Imagens de cada passo (iguais nos dois idiomas). */
const steps = [
  {
    index: 1,
    number: number_1,
    active: active_1,
    left: create_left,
    right: create_right,
  },
  {
    index: 2,
    number: number_2,
    active: active_2,
    left: buy_coin_left,
    right: buy_coin_right,
  },
  {
    index: 3,
    number: number_3,
    active: active_3,
    left: login_left,
    right: login_right,
  },
  {
    index: 4,
    number: number_4,
    active: active_4,
    left: acvivehero_left,
    right: acvivehero_right,
  },
  {
    index: 5,
    number: number_5,
    active: active_5,
    left: buy_coin_left,
    right: buy_house_right,
  },
  {
    index: 6,
    number: number_6,
    active: active_6,
    left: upgrade_heroes_left,
    right: upgrade_heroes_right,
  },
];

type StepText = { label: string; title: string; content: string };

/** Textos dos passos, na mesma ordem de `steps`. */
const texts: Record<Lang, StepText[]> = {
  en: [
    {
      label: 'Create Metamask Wallet',
      title: 'Create Your Metamask Wallet',
      content: 'Metamask Wallet is your boarding pass to our digital nation',
    },
    {
      label: 'Buy BCOIN',
      title: 'Buy BCOIN to Start Playing',
      content: 'We have to swap BUSD to BCOIN',
    },
    { label: 'Login game', title: 'Login BombCrypto game', content: '' },
    {
      label: 'Buy / Active Bomber Heroes',
      title: 'Buy / Active Bomber Heroes',
      content: '',
    },
    {
      label: 'Buy House',
      title: 'Buy House',
      content:
        'House is the place where it can help bomber heroes recover stamina faster',
    },
    {
      label: 'Upgrade Bomber Heroes',
      title: 'Upgrade Heroes',
      content: "Upgrade hero will increase the character's damage by 1",
    },
  ],
  pt: [
    {
      label: 'Criar carteira MetaMask',
      title: 'Crie sua carteira MetaMask',
      content:
        'A carteira MetaMask é o seu passaporte para o nosso mundo digital',
    },
    {
      label: 'Comprar BCOIN',
      title: 'Compre BCOIN para começar a jogar',
      content: 'É preciso trocar BUSD por BCOIN',
    },
    { label: 'Entrar no jogo', title: 'Entre no jogo BombCrypto', content: '' },
    {
      label: 'Comprar / ativar heróis',
      title: 'Compre / ative seus heróis',
      content: '',
    },
    {
      label: 'Comprar casa',
      title: 'Compre uma casa',
      content: 'A casa ajuda os heróis a recuperar a energia mais rápido',
    },
    {
      label: 'Melhorar heróis',
      title: 'Melhore seus heróis',
      content: 'Melhorar o herói aumenta o dano dele em 1',
    },
  ],
};

export type Step = typeof steps[number] & StepText;

/** Passos do guia no idioma pedido. */
export function getSteps(lang: Lang): Step[] {
  return steps.map((step, i) => ({ ...step, ...texts[lang][i] }));
}

export default getSteps('en');
