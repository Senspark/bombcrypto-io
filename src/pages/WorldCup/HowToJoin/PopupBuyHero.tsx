import React, { useEffect, useState, useCallback, Fragment } from 'react';
import { BigNumber } from 'bignumber.js';
import _ from 'lodash';
import { useAccount } from 'src/context/account';
import { useContract } from 'src/context/smc';
import { minAddress } from 'src/utils/helpers';
import styled from 'styled-components';
import bgPopup from '../../../assests/event/worldCupPage/Popup/BG.png';
import titleImg from '../../../assests/event/worldCupPage/Popup/Buy hero title.png';
import cancelImg from '../../../assests/event/worldCupPage/Popup/Button close.png';
import approveButton from '../../../assests/event/worldCupPage/Popup/Approve.png';
import hero from '../../../assests/event/worldCupPage/Popup/Hero box.png';
import boughtIcon from '../../../assests/event/worldCupPage/Popup/Buy success.png';
import buyIcon from '../../../assests/event/worldCupPage/Popup/Buy NOW button.png';
import connectButton from '../../../assests/event/worldCupPage/Popup/Connect wallet.png';
import bgAddress from '../../../assests/event/worldCupPage/Popup/Wallet number.png';
import reclaimImg from '../../../assests/event/worldCup/Reclaim.png';
import WorldCupService from 'src/services/worldcup';

type Props = {
  isShowing: boolean;
  setIsShowing: (v: boolean) => void;
};

// @ts-ignore
const PopupBuyHero: React.FC<Props> = ({ isShowing, setIsShowing }) => {
  const {
    senApproveWorldCup,
    senAllowanceWorldCup,
    connectWallet,
    getBlockLatest,
  } = useContract();
  const { auth } = useAccount();
  const [canBuy, setCanBuy] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isApprove, setIsApprove] = useState<boolean>(false);
  const [hasPendingHero, setHasPendingHero] = useState<boolean>(false);

  const allowToken = async () => {
    try {
      const bcoinAllow = await senAllowanceWorldCup();
      const coinAllow = new BigNumber(bcoinAllow);
      const zeroAmount = new BigNumber(0);

      if (coinAllow.gt(zeroAmount)) {
        setIsApprove(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const checkPendingTokens = async () => {
    try {
      const pending = await WorldCupService.getPendingTokens(auth.address);
      const heroPending = _.get(pending, '0', 0);
      if (Number(heroPending) > 0) {
        setHasPendingHero(true);
      } else {
        setHasPendingHero(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const checkCanBuy = async () => {
    try {
      const isCanBuy = await WorldCupService.canBuy(auth.address);
      setCanBuy(isCanBuy);
    } catch (error: any) {
      console.log(error);
    }
  };

  const enableToken = useCallback(async () => {
    try {
      setLoading(true);
      await senApproveWorldCup(auth.address);
      await allowToken();
      // eslint-disable-next-line no-empty
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [auth]);

  const reclaim = async () => {
    try {
      setLoading(true);
      await WorldCupService.processTokenRequests(auth.address);
      checkPendingTokens();
      checkCanBuy();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const buyHero = async () => {
    try {
      setLoading(true);
      const { blockNumber } = await WorldCupService.buyHeroUseVoucher(
        auth.address,
      );

      let delay = 2000;
      let timerNext = setTimeout(async function request() {
        const { number } = await getBlockLatest();
        setLoading(true);
        // console.log('block', number);
        // console.log(blockNumber);
        if (Number(number) > Number(blockNumber) + 6) {
          try {
            const hero = await WorldCupService.processTokenRequests(
              auth.address,
            );
            console.log(hero);
            await checkCanBuy();
            setLoading(false);
            return clearTimeout(timerNext);
          } catch (e) {
            timerNext = setTimeout(request, delay);
            return;
          }
        }

        timerNext = setTimeout(request, delay);
      }, delay);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.address) {
      allowToken();
      checkPendingTokens();
      checkCanBuy();
    }
  }, [auth]);

  return (
    <Popup isShow={isShowing}>
      <TitleImg src={titleImg} />
      <CancelImg src={cancelImg} onClick={() => setIsShowing(false)} />
      {!_.isEmpty(auth.address) && !isApprove && (
        <ContentImg src={approveButton} onClick={enableToken} />
      )}
      {!_.isEmpty(auth.address) && isApprove && (
        <Fragment>
          <HeroIcon src={hero} />

          {hasPendingHero ? (
            <ButtonBuy
              src={reclaimImg}
              onClick={reclaim}
              style={{ width: '55%' }}
            />
          ) : (
            <ButtonBuy
              src={canBuy ? buyIcon : boughtIcon}
              onClick={() => canBuy && buyHero()}
            />
          )}
        </Fragment>
      )}
      {isLoading && <Spin className="spinner-border text-primary" />}
      {_.isEmpty(auth.address) && (
        <ContentImg src={connectButton} onClick={connectWallet} />
      )}
      {auth.address && (
        <AddressWallet>{minAddress(auth.address)}</AddressWallet>
      )}
    </Popup>
  );
};

const Popup = styled.div<{ isShow: boolean }>`
  background: url(${bgPopup}) center no-repeat;
  background-size: 100% 100%;
  visibility: ${({ isShow }) => (isShow ? 'visible' : 'hidden')};
  transform: scale(${({ isShow }) => (isShow ? 1 : 0)}) translate(-50%, -50%);
  transition: all 0.4s linear;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 300px;
  width: 500px;
  @media (max-width: 500px) {
    width: 350px;
  }
`;

const Spin = styled.div`
  position: absolute !important;
  top: 50% !important;
  left: 45% !important;
  width: 50px !important;
  height: 50px !important;
`;

const TitleImg = styled.img`
  display: block;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
`;

const CancelImg = styled.img`
  display: block;
  position: absolute;
  top: 5px;
  right: 0;
  width: 50px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 35px;
  }
`;

const ContentImg = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 300px;
  cursor: pointer;
  height: auto;
`;

const HeroIcon = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 45%;
  left: 50%;
  width: 300px;
  height: 130px;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 200px;
  }
`;

const ButtonBuy = styled.img`
  position: absolute;
  transform: translateX(-50%);
  bottom: 20px;
  left: 50%;
  width: 300px;
  cursor: pointer;
  height: auto;
  @media (max-width: 500px) {
    width: 200px;
  }
`;

const AddressWallet = styled.p`
  background: url(${bgAddress}) center no-repeat;
  background-size: 100% 100%;
  padding: 5px;
  font-size: 16px;
  font-weight: 700;
  position: absolute;
  color: white;
  left: 30px;
  top: 20px;
  @media (max-width: 500px) {
    left: 20px;
    top: 30px;
  }
`;

export default PopupBuyHero;
