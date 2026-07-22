import WorldcupABI from 'src/contracts/WorldcupABI.json';
import BheroABI from 'src/contracts/BheroABI.json';
import BcoinABI from 'src/contracts/BcoinABI.json';
import SENABI from 'src/contracts/SENABI.json';

const isProduction = true;

export const SmartContracts = {
  chainId: isProduction ? 56 : 97,
  apiUrl: isProduction
    ? 'https://api.bombcrypto.io'
    : 'https://api-test.bombcrypto.io',
  explorer: isProduction
    ? 'https://bscscan.com'
    : 'https://testnet.bscscan.com',
  bcoin: {
    address: isProduction
      ? '0x00e1656e45f18ec6747F5a8496Fd39B50b38396D'
      : '0x648a9CF8E95c73110D28E7e2329b2D0910Bd36B8',
    abi: BcoinABI,
  },
  sen: {
    address: isProduction
      ? '0xb43Ac9a81eDA5a5b36839d5b6FC65606815361b0'
      : '0x4B5828F31550aFe15C61D7a765D9597ad4282325',
    abi: SENABI,
  },
  worldcup: {
    address: isProduction
      ? '0x65FDF6550C422a80222E9343a0D12C223c3EE4c5'
      : '0x191d3C5bf11f993eB7a0DbB75b214824dff2AB0a',
    abi: WorldcupABI,
  },
  bhero: {
    address: isProduction
      ? '0x30cc0553f6fa1faf6d7847891b9b36eb559dc618'
      : '0xC1A4C06426B4Df799E455964A20FDe866E86fbd1',
    abi: BheroABI,
  },
};
