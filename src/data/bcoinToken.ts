import Pancake from 'src/assests/bcoin-token/Logo_0000_Pancake.png';
import BKex from 'src/assests/bcoin-token/bkex-mobile.png';
import Onus from 'src/assests/bcoin-token/sàn-onus-mobile.png';
import LaToken from 'src/assests/bcoin-token/latoken.png';
import BiSwap from 'src/assests/bcoin-token/biswap-1.png';
import Mexc from 'src/assests/bcoin-token/MEXC-1.png';
import ZTGlobal from 'src/assests/bcoin-token/ZT-Global-1.png';
import CoinMarketCap from 'src/assests/bcoin-token/Logo_0003_CoinMarket.png';
import dappbay from 'src/assests/bcoin-token/dappbay-logo-group.png';
import CoinCecks from 'src/assests/bcoin-token/Logo_0004_CoinCecks.png';
import DappRadar from 'src/assests/bcoin-token/DappRadar-1.png';
import PooCoin from 'src/assests/bcoin-token/Logo_0001_PooCoin.png';
import Dex from 'src/assests/bcoin-token/dex-tools-1.png';
import wallet1 from 'src/assests/bcoin-token/image (15).png';
import wallet2 from 'src/assests/bcoin-token/image (17).png';
import wallet3 from 'src/assests/bcoin-token/coinbase 1.png';
import wallet4 from 'src/assests/bcoin-token/image (4).png';

interface Exchanges {
  image: any;
  link?: string;
  target: string;
  button_name: string;
}

type RankingSite = Partial<Exchanges>;
type Chart = Partial<Exchanges>;
type Wallet = Partial<Omit<Exchanges, 'button_name'>>;

export const exchanges: Exchanges[] = [
  {
    image: Pancake,
    link: 'https://pancakeswap.finance/swap?outputCurrency=0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
    target: '_blank',
    button_name: 'pancake_swap',
  },
  {
    image: BKex,
    link: 'https://www.bkex.com/trade/BCOIN_USDT',
    target: '_blank',
    button_name: 'bkex',
  },
  {
    image: Onus,
    link: 'https://goonus.io/markets/BCOIN/',
    target: '_blank',
    button_name: 'onus',
  },
  {
    image: LaToken,
    link: 'https://latoken.com/exchange/BCOIN_USDT',
    target: '_blank',
    button_name: 'latoken',
  },
  {
    image: BiSwap,
    link: 'https://exchange.biswap.org/#/swap?outputCurrency=0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
    target: '_blank',
    button_name: 'biswap',
  },
  {
    image: Mexc,
    link: 'https://www.mexc.com/exchange/BCOIN_USDT',
    target: '_blank',
    button_name: 'mexc',
  },
  {
    image: ZTGlobal,
    link: 'https://www.ztb.im/exchange?coin=BCOIN_USDT',
    target: '_blank',
    button_name: 'zt_global',
  },
];

export const rankingSite: RankingSite[] = [
  {
    image: CoinMarketCap,
    target: '_blank',
    link: 'https://coinmarketcap.com/currencies/bombcrypto/',
    button_name: 'coin_market_cap',
  },
  {
    image: CoinCecks,
    target: '_blank',
    link: 'https://www.coingecko.com/en/coins/bomber-coin',
    button_name: 'coin_gecko',
  },
  {
    image: DappRadar,
    target: '_blank',
    link: 'https://dappradar.com/binance-smart-chain/games/bomb-crypto',
    button_name: 'dapp_radar',
  },
  {
    image: dappbay,
    target: '_blank',
    link: 'https://dappbay.bnbchain.org/',
    button_name: 'dapp_bay',
  },
];

export const chart: Chart[] = [
  {
    image: PooCoin,
    target: '_blank',
    link: 'https://poocoin.app/tokens/0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
    button_name: 'poocoin',
  },
  {
    image: Dex,
    target: '_blank',
    link: 'https://www.dextools.io/app/bsc/pair-explorer/0xd76026a78a2a9af2f9f57fe6337eed26bfc26aed',
    button_name: 'dex_tools',
  },
];

export const wallet: Wallet[] = [
  { image: wallet1, target: '_blank', link: 'https://twitter.com/MetaMask' },
  { image: wallet2, target: '_blank', link: 'https://twitter.com/TrustWallet' },
  { image: wallet3, target: '_blank', link: 'https://twitter.com/coinbase' },
  { image: wallet4, target: '_blank', link: 'https://twitter.com/opera' },
];
