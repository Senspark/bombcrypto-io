import BNBIcon from 'src/assests/images/Binance-network.png';
import PolygonIcon from 'src/assests/images/Polygon_network.png';
import TonIcon from 'src/assests/images/ton_logo.png';
import SolanaIcon from 'src/assests/images/logo_solana.png';

export const NETWORK = {
  BINANCE: 'Binance',
  POLYGON: 'Polygon',
  TON: 'Ton',
  SOLANA: 'Solana',
};

export type NetworkType = typeof NETWORK[keyof typeof NETWORK];

export const networkIcons: Record<NetworkType, string> = {
  [NETWORK.BINANCE]: BNBIcon,
  [NETWORK.POLYGON]: PolygonIcon,
  [NETWORK.TON]: TonIcon,
  [NETWORK.SOLANA]: SolanaIcon,
};

// redes exibidas no seletor do site (TON/Solana ficam fora por enquanto;
// as configs delas seguem existindo em BToken/rarity para reativar depois)
export const networkOptions: NetworkType[] = [NETWORK.BINANCE, NETWORK.POLYGON];

export const LINK_SCAN = {
  BINANCE: 'https://bscscan.com',
  POLYGON: 'https://polygonscan.com',
  TON: 'https://tonscan.org',
  SOLANA: 'https://solscan.io',
};
