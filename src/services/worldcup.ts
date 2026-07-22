import Web3 from 'web3';
import { SmartContracts } from 'src/configs/smartcontract';

class WorldCupContract {
  public instance: any | Web3;
  public bHeroInstance: any | Web3;

  constructor() {
    this.initial();
  }

  initial = async () => {
    const {
      worldcup: { abi, address },
      bhero,
    } = SmartContracts;
    const web3 = await new Web3(window.ethereum);

    // @ts-ignore
    this.instance = new web3.eth.Contract(abi, address);
    // @ts-ignore
    this.bHeroInstance = new web3.eth.Contract(bhero.abi, bhero.address);
  };

  getPendingTokens = async (address: string) => {
    if (!this.instance) return false;
    // @ts-ignore
    return await this.bHeroInstance.methods.getPendingTokensV2(address).call();
  };

  canBuy = async (userAddress: string) => {
    if (!this.instance) return false;
    // @ts-ignore
    return await this.instance.methods.userCanUseVoucher(1, userAddress).call();
  };

  processTokenRequests = async (userAddress: string) => {
    if (!this.bHeroInstance) return false;
    // @ts-ignore
    return await this.bHeroInstance.methods
      .processTokenRequests()
      .send({ from: userAddress });
  };

  buyHeroUseVoucher = async (userAddress: string) => {
    if (!this.instance) return false;

    const params = {
      eventType: 1,
      count: 10,
      category: 1,
    };
    // @ts-ignore
    return await this.instance.methods
      .buyHeroEvent(params.eventType, params.count, params.category)
      .send({ from: userAddress });
  };
}

const contract = new WorldCupContract();

export default contract;
