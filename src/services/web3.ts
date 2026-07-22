import Web3 from 'web3';

const chainList = [
  {
    name: 'Binance Smart Chain Mainnet',
    chain: 'BSC',
    network: 'mainnet',
    rpc: [
      'https://bsc-dataseed1.binance.org',
      'https://bsc-dataseed2.binance.org',
      'https://bsc-dataseed3.binance.org',
      'https://bsc-dataseed4.binance.org',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
      'https://bsc-dataseed3.defibit.io',
      'https://bsc-dataseed4.defibit.io',
      'https://bsc-dataseed1.ninicoin.io',
      'https://bsc-dataseed2.ninicoin.io',
      'https://bsc-dataseed3.ninicoin.io',
      'https://bsc-dataseed4.ninicoin.io',
      'wss://bsc-ws-node.nariox.org',
    ],
    faucets: ['https://free-online-app.com/faucet-for-eth-evm-chains/'],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'BNB',
      decimals: 18,
    },
    infoURL: 'https://www.binance.org',
    shortName: 'bnb',
    chainId: 56,
    networkId: 56,
    slip44: 714,
    explorers: [
      {
        name: 'bscscan',
        url: 'https://bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
  {
    name: 'Binance Smart Chain Testnet',
    chain: 'BSC',
    network: 'Chapel',
    rpc: [
      'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://data-seed-prebsc-2-s1.binance.org:8545',
      'https://data-seed-prebsc-1-s2.binance.org:8545',
      'https://data-seed-prebsc-2-s2.binance.org:8545',
      'https://data-seed-prebsc-1-s3.binance.org:8545',
      'https://data-seed-prebsc-2-s3.binance.org:8545',
    ],
    faucets: ['https://testnet.binance.org/faucet-smart'],
    nativeCurrency: {
      name: 'Binance Chain Native Token',
      symbol: 'tBNB',
      decimals: 18,
    },
    infoURL: 'https://testnet.binance.org/',
    shortName: 'bnbt',
    chainId: 97,
    networkId: 97,
    explorers: [
      {
        name: 'bscscan-testnet',
        url: 'https://testnet.bscscan.com',
        standard: 'EIP3091',
      },
    ],
  },
];

export const enableEthereum = async () => {
  if (window.ethereum) {
    await window.ethereum.enable();
    return true;
  } else {
    return false;
  }
};

export const getNetwork = (chainId: number) => {
  return chainList.find((item) => item.chainId === chainId);
};

export const changeNetwork = async (chainId: number) => {
  const { ethereum } = window;

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: Web3.utils?.toHex(chainId) }],
    });
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        const network = getNetwork(chainId);
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: Web3.utils?.toHex(chainId),
              chainName: network?.name,
              nativeCurrency: network?.nativeCurrency,
              rpcUrls: network?.rpc,
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
        // handle "add" error
      }
    }

    throw new Error(switchError.message);
  }
};

export const getCurrentWeb3Provider = () => {
  const { web3Provider } = window as any;

  if (web3Provider) {
    return web3Provider;
  }

  throw new Error('No provider was found');
};

export const sign = async (message: string, address: string) => {
  const web3 = await new Web3(window.ethereum);

  return web3.eth.personal.sign(Web3.utils?.utf8ToHex(message), address, '');
};
