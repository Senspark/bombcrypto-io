import React, { createContext, useState, useContext } from 'react';
import Web3 from 'web3';

import { SmartContracts } from 'src/configs/smartcontract';
import { useAccount } from './account';
import { changeNetwork } from '../services/web3';

export const contextWeb3 = createContext<any>({});

let address: string = '';
let InstanceSen: Web3;
let InstanceWeb3: Web3;

function Contract({ children }: any) {
  const [loading, setLoading] = useState(false);
  const { sen, bhero } = SmartContracts;
  const { setAuth, auth } = useAccount();
  //
  const mapSMCtoWeb3 = async (web3: Web3, address: string) => {
    const option = {
      from: address,
    };

    // @ts-ignore
    InstanceSen = new web3.eth.Contract(sen.abi, sen.address, option);
  };

  const getBlockLatest = async () => {
    return await InstanceWeb3.eth.getBlock('latest');
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
    } else {
      alert('You have not installed or not connected to the metamask wallet');
      return;
    }

    setLoading(true);
    if (Number(window.ethereum.networkVersion) !== SmartContracts.chainId) {
      changeNetwork(SmartContracts.chainId);
    }
    try {
      const web3 = await new Web3(window.ethereum);
      InstanceWeb3 = web3;
      const accounts = await web3.eth.getAccounts();
      address = accounts[0];

      await mapSMCtoWeb3(web3, address);
      const token = await getSen();
      setAuth({
        ...auth,
        wallet: { sen: token },
        address: address,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getSen = async () => {
    // @ts-ignore
    return await InstanceSen.methods.balanceOf(address).call();
  };

  const senApproveWorldCup = async (userAddress: string) => {
    const approveAmount =
      '115792089237316195423570985008687907853269984665640564039457584007913129639935';

    // @ts-ignore
    return await InstanceSen.methods
      .approve(bhero.address, approveAmount)
      .send({ from: userAddress });
  };

  const senAllowanceWorldCup = async () => {
    // @ts-ignore
    return await InstanceSen.methods
      .allowance(auth?.address, bhero.address)
      .call();
  };

  const value = {
    connectWallet,
    setLoading,
    isGlobalLoading: loading,
    getBlockLatest,
    senApproveWorldCup,
    senAllowanceWorldCup,
  };

  return <contextWeb3.Provider value={value}>{children}</contextWeb3.Provider>;
}

export const useContract = () => {
  return useContext(contextWeb3);
};

export default Contract;
