import senTokenBNBIcon from 'src/assests/images/SEN BNB.png';
import senTokenPolygonIcon from 'src/assests/images/SEN Polygon.png';
import bcoinBNBIcon from 'src/assests/images/Bomb_Crypto_BNB.png';
import bcoinPolygonIcon from 'src/assests/images/Bomb_Crypto_MATIC.png';
import bcoinTonIcon from 'src/assests/images/Bomb_Crypto_TON.png';
import bcoinSolanaIcon from 'src/assests/images/Bomb_Crypto_SOL.png';
import peckShieldLogo from 'src/assests/images/peckshield_logo.png';
import verichainsLogo from 'src/assests/images/verichains_logo.png';
import kyper from 'src/assests/images/icon-kyber.png';
import pancake from 'src/assests/images/icon-pancakeswap.png';
import quickSwap from 'src/assests/images/icon-quickswap.png';
import coinstore from 'src/assests/images/Icon_Coinstore.png';
import onus from 'src/assests/images/onus.png';
import icon_Coinw from 'src/assests/images/icon_coinw.png';
import iconStonfiv2 from 'src/assests/images/Logo_stonfiv2.png';
import iconRaydium from 'src/assests/images/icon_raydium.png';

interface Trade {
  icon: any;
  link: string;
}

const tradeBcoinBnb: Trade[] = [
  {
    icon: pancake,
    link: 'https://pancakeswap.finance/swap?inputCurrency=0x00e1656e45f18ec6747F5a8496Fd39B50b38396D&outputCurrency=BNB',
  },
  { icon: kyper, link: 'https://kyberswap.com/swap/bnb/bcoin-to-bnb' },
  { icon: onus, link: 'https://goonus.io/markets/bcoin_usd' },
  {
    icon: coinstore,
    link: 'https://www.coinstore.com/#/spot/BCOINUSDT?ts=1715166508239',
  },
  {
    icon: icon_Coinw,
    link: 'https://www.coinw.com/frontweb/en_US/spot?symbol=1799',
  },
];

const tradeSenBnb: Trade[] = [
  {
    icon: pancake,
    link: 'https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0x23383e18dEedF460EbB918545C8b0588038B7998&outputCurrency=0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  },
  {
    icon: kyper,
    link: 'https://kyberswap.com/swap/bnb/sen-to-bnb',
  },
  { icon: onus, link: 'https://goonus.io/en/markets/sen_usd' },
  {
    icon: coinstore,
    link: 'https://www.coinstore.com/#/spot/SENUSDT?ts=1715756193374',
  },
];

const tradeBcoinPolygon: Trade[] = [
  {
    icon: quickSwap,
    link: 'https://quickswap.exchange/#/swap?currency0=0xB2C63830D4478cB331142FAc075A39671a5541dC&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F&swapIndex=0',
  },
  { icon: kyper, link: 'https://kyberswap.com/swap/polygon/bomb-to-usdt' },
];

const tradeSenPolygon: Trade[] = [
  {
    icon: quickSwap,
    link: 'https://quickswap.exchange/#/swap?swapIndex=0&currency0=0xFe302B8666539d5046cd9aA0707bB327F5f94C22&currency1=0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
  },
  {
    icon: kyper,
    link: 'https://kyberswap.com/swap/polygon/sen-to-usdt',
  },
];

const tradeBcoinTon: Trade[] = [
  {
    icon: iconStonfiv2,
    link: 'https://app.ston.fi/swap?ft=BCOIN&tt=TON&chartVisible=true&chartInterval=1w',
  },
];

const tradeBcoinSolana: Trade[] = [
  {
    icon: iconRaydium,
    link: 'https://raydium.io/swap/?inputMint=VWuKbCVXQbw1Rqvw6YzczfD85u5fDbBv9b7eWSiY3BL&outputMint=sol',
  },
];

export const BNB_CONFIG = {
  chainId: '0x38',
  networkParams: {
    chainId: '0x38',
    chainName: 'Binance Smart Chain',
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com'],
    nativeCurrency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18,
    },
  },
  token_bcoin: {
    title: 'Bomb Crypto (BNB)',
    address: '0x00e1656e45f18ec6747F5a8496Fd39B50b38396D',
    symbol: 'BCOIN',
    decimals: 18,
    icon: bcoinBNBIcon,
    pool: {
      name: 'Pancakeswap V2',
      link: 'https://www.dextools.io/app/en/bnb/pair-explorer/0x2eebe0c34da9ba65521e98cbaa7d97496d05f489?t=1710211244427',
    },
    pair: {
      name: 'WBNB',
      address: '0x2eebe0c34da9ba65521e98cbaa7d97496d05f489',
      liq: '$379.32K',
    },
    trade: tradeBcoinBnb,
    audit: {
      icon: verichainsLogo,
      link: 'https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20BCoin%20Token%20-%20v1.1.pdf',
    },
    Description:
      'BCOIN is an ERC20 token, as well as an in-game currency in the Bomb Crypto game, enabling users to unlock all on-chain features and participate in the token economy.',
  },

  token_sen: {
    title: 'Senspark (BNB)',
    address: '0xb43Ac9a81eDA5a5b36839d5b6FC65606815361b0',
    symbol: 'SEN',
    decimals: 18,
    icon: senTokenBNBIcon,
    pool: {
      name: 'Pancakeswap V2',
      link: 'https://www.dextools.io/app/en/bnb/pair-explorer/0xc54aa5694cd8bd419ac3bba11ece94aa6c5f9b01?t=1711076114511',
    },
    pair: {
      name: 'WBNB',
      address: '0xc54aa5694cd8bd419ac3bba11ece94aa6c5f9b01',
      liq: '$102.84K',
    },
    trade: tradeSenBnb,
    audit: {
      icon: verichainsLogo,
      link: 'https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20Senspark%20Token%20-%20v1.0.pdf',
    },
    Description:
      'SEN is an ERC20 token, also serving as an additional token within games of the ecosystem and as a utility token in the Senspark Metaverse. It enables the next billion users to fully engage in the on-chain metaverse, offering entertainment, finance, and spirituality.',
  },
};

export const POLYGON_CONFIG = {
  chainId: '0x89',
  networkParams: {
    chainId: '0x89',
    chainName: 'Polygon Network',
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    nativeCurrency: {
      symbol: 'POL',
      name: 'POL',
      decimals: 18,
    },
  },
  token_bcoin: {
    title: 'Bomb Crypto (POL)',
    address: '0xB2C63830D4478cB331142FAc075A39671a5541dC',
    symbol: 'BCOIN',
    decimals: 18,
    icon: bcoinPolygonIcon,
    pool: {
      name: 'Pancakeswap V2',
      link: 'https://www.dextools.io/app/en/polygon/pair-explorer/0x8b4e00810c927bb1c02dee73d714a31121689ab3?t=1710212439388',
    },
    pair: {
      name: 'USDT',
      address: '0xc54aa5694cd8bd419ac3bba11ece94aa6c5f9b01',
      liq: '$93.38K',
    },
    trade: tradeBcoinPolygon,
    audit: {
      icon: peckShieldLogo,
      link: 'https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20BCoin%20Token%20-%20v1.1.pdf',
    },
    Description:
      'BCOIN is an ERC20 token, as well as an in-game currency in the Bomb Crypto game, enabling users to unlock all on-chain features and participate in the token economy.',
  },
  token_sen: {
    title: 'Senspark (POL)',
    address: '0xFe302B8666539d5046cd9aA0707bB327F5f94C22',
    symbol: 'SEN',
    decimals: 18,
    icon: senTokenPolygonIcon,
    pool: {
      name: 'Quickswap V3',
      link: 'https://www.dextools.io/app/en/polygon/pair-explorer/0x27cce65b017eb1522da7f20d6f4df003c446f744?t=1713239526769',
    },
    pair: {
      name: 'WBNB',
      address: '0x27cce65b017eb1522da7f20d6f4df003c446f744',
      liq: '$167.68K',
    },
    trade: tradeSenPolygon,
    audit: {
      icon: verichainsLogo,
      link: 'https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20Senspark%20Token%20v2%20-%20v1.0.pdf',
    },
    Description:
      'SEN is an ERC20 token, also serving as an additional token within games of the ecosystem and as a utility token in the Senspark Metaverse. It enables the next billion users to fully engage in the on-chain metaverse, offering entertainment, finance, and spirituality.',
  },
};

export const TON_CONFIG = {
  chainId: '', // TON không dùng chainId EVM
  networkParams: {}, // Bỏ trống hoặc không dùng
  token_bcoin: {
    title: 'Bomb Crypto (TON)',
    address: 'EQClyeWq9hiaPJRxtKRZhBNrznGNiDouXZy5TWs1QQ2DoiHn',
    symbol: 'BCOIN',
    decimals: 9, // Toncoin và Jetton thường dùng 9
    icon: bcoinTonIcon, // Đặt icon phù hợp
    pool: {
      name: 'STON.fi V2',
      link: 'https://www.dextools.io/app/en/ton/pair-explorer/EQAG8yfLCABKq19CNNrt_taMRoFpPR-wP6ZcMwbGJuFo1EMn?t=1747885078264',
    },
    pair: {
      name: 'TON',
      address: 'EQAG8yfLCABKq19CNNrt_taMRoFpPR-wP6ZcMwbGJuFo1EMn', // như trong ảnh, dùng rõ nếu có
      liq: '66.5K',
    },
    trade: tradeBcoinTon, // danh sách icon/link như các network khác
    audit: null, // không có audited
    Description:
      'BCOIN is a Jetton token, as well as an in-game currency in the Bomb Crypto game, enabling users to unlock features and participate in the token economy.',
  },
  token_sen: null,
};

export const SOLANA_CONFIG = {
  chainId: '', // Solana không dùng EVM
  networkParams: {},

  token_bcoin: {
    title: 'Bomb Crypto (SOL)',
    address: 'VWuKbCVXQbw1Rqvw6YzczfD85u5fDbBv9b7eWSiY3BL',
    symbol: 'BCOIN',
    decimals: 9,
    icon: bcoinSolanaIcon, // bạn đã import từ asset

    pool: {
      name: 'Raydium',
      link: 'https://www.dextools.io/app/en/solana/pair-explorer/ebMjqkL7qWwqjJzL6WihcGH2XPyyaDwKZucP5wX33Cw?t=1747885414312',
    },
    pair: {
      name: 'SOL',
      address: 'ebMjqkL7qWwqjJzL6WihcGH2XPyyaDwKZucP5wX33Cw',
      liq: '52.7K',
    },
    trade: tradeBcoinSolana,
    audit: null,
    Description:
      'BCOIN is a Jetton token, as well as an in-game currency in the Bomb Crypto game, enabling users to unlock features and participate in the token economy.',
  },
  token_sen: null,
};
