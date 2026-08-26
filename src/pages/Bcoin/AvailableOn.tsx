import React from 'react';
import styled from 'styled-components';
import bgAvailable from 'src/assests/bcoin/Bcoin-Available.png';
import CoinMarketCap from 'src/assests/bcoin/coin-marketcap.png';
import Coingecko from 'src/assests/bcoin/Coingecko.png';
import DappRadar from 'src/assests/bcoin/DappRadar-1.png';
import Pancakeswap from 'src/assests/bcoin/pancakeswap.png';
import Bkex from 'src/assests/bcoin/bkex-2.png';
import ZTGlobal from 'src/assests/bcoin/ZT-Global-1.png';
import Mexc from 'src/assests/bcoin/MEXC-1.png';
import Biswap from 'src/assests/bcoin/biswap.png';
import Onus from 'src/assests/bcoin/onus.png';
import LaToken from 'src/assests/bcoin/latoken-1.png';
import PooCoin from 'src/assests/bcoin/poocoin.png';
import DexTools from 'src/assests/bcoin/dex-tools-1.png';
import { Col } from 'react-bootstrap';
import { arcadeColors, arcadeFonts } from 'src/theme/arcade';

/**
 * O fundo desta seção já contém os títulos e a moldura, e os blocos são
 * posicionados por margens calibradas com a imagem — por isso ele é mantido.
 */
const SectionWrapper = styled.section`
  width: 100%;
  background: url(${bgAvailable}) no-repeat center;
  background-size: cover;
  font-family: ${arcadeFonts.body};
  color: ${arcadeColors.white};
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 120px;
  .ranking_site {
    margin-top: 165px;
    @media (max-width: 576px) {
      flex-direction: row;
      gap: 5px;
    }
    @media screen and (min-width: 1500px) {
      margin-top: 200px;
    }
  }
  .exchanges {
    margin-top: 90px;
    @media (max-width: 576px) {
      margin-top: 100px;
      flex-direction: row;
      gap: 10px;
    }
    @media screen and (min-width: 1500px) {
      margin-top: 165px;
    }
  }
  .exchanges_2 {
    margin-top: 20px;
    @media (max-width: 576px) {
      margin-top: 20px;
      flex-direction: row;
      gap: 10px;
      @media screen and (min-width: 1500px) {
        margin-top: 30px;
      }
      @media screen and (min-width: 1600px) {
        margin-top: 40px;
      }
      @media screen and (min-width: 1700px) {
        margin-top: 50px;
      }
      @media screen and (min-width: 1800px) {
        margin-top: 60px;
      }
      @media screen and (min-width: 1900px) {
        margin-top: 70px;
      }
      @media screen and (min-width: 2000px) {
        margin-top: 80px;
      }
    }
  }
  .chart {
    margin-top: 100px;
    @media (max-width: 576px) {
      margin-top: 100px;
      flex-direction: row;
      gap: 10px;
    }
    @media screen and (min-width: 1500px) {
      margin-top: 120px;
    }
    @media screen and (min-width: 1600px) {
      margin-top: 140px;
    }
    @media screen and (min-width: 1700px) {
      margin-top: 160px;
    }
    @media screen and (min-width: 1800px) {
      margin-top: 180px;
    }
  }
`;

const CoinWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const CoinItem = styled.img`
  height: 52px;
  width: 100%;
  object-fit: contain;
  @media screen and (max-width: 500px) {
    width: 90%;
  }
`;

const AvailableOn: React.FC<{ id: string }> = ({ id }) => {
  const onClickIcon = React.useCallback((url) => {
    window.open(url);
  }, []);

  return (
    <SectionWrapper id={id}>
      <Container className="container">
        <CoinWrapper className="ranking_site">
          <Col xs={4}>
            <CoinItem
              src={CoinMarketCap}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon('https://coinmarketcap.com/currencies/bombcrypto/')
              }
            />
          </Col>
          <Col xs={4}>
            <CoinItem
              src={Coingecko}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon('https://www.coingecko.com/en/coins/bomber-coin')
              }
            />
          </Col>
          <Col xs={4}>
            <CoinItem
              src={DappRadar}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon(
                  'https://dappradar.com/binance-smart-chain/games/bomb-crypto',
                )
              }
            />
          </Col>
        </CoinWrapper>
        <CoinWrapper className="exchanges">
          <Col xs={3}>
            <CoinItem
              src={Pancakeswap}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon(
                  'https://pancakeswap.finance/swap?outputCurrency=0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
                )
              }
            />
          </Col>
          <Col xs={3}>
            <CoinItem
              src={Bkex}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon('https://www.bkex.com/trade/BCOIN_USDT')
              }
            />
          </Col>
          <Col xs={3}>
            <CoinItem
              src={ZTGlobal}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon('https://www.ztb.im/exchange?coin=BCOIN_USDT')
              }
            />
          </Col>
          <Col xs={3}>
            <CoinItem
              src={Mexc}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon('https://www.mexc.com/exchange/BCOIN_USDT')
              }
            />
          </Col>
        </CoinWrapper>
        <CoinWrapper className="exchanges_2">
          <Col xs={3}>
            <CoinItem
              src={Biswap}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon(
                  'https://exchange.biswap.org/#/swap?outputCurrency=0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
                )
              }
            />
          </Col>
          <Col xs={3}>
            <CoinItem
              src={Onus}
              className="cursor-pointer"
              onClick={() => onClickIcon('https://goonus.io/markets/BCOIN/')}
            />
          </Col>
          <Col xs={3}>
            <CoinItem
              src={LaToken}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon('https://latoken.com/exchange/BCOIN_USDT')
              }
            />
          </Col>
        </CoinWrapper>
        <CoinWrapper className="chart">
          <Col xs={4} sm={6}>
            <CoinItem
              src={PooCoin}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon(
                  'https://poocoin.app/tokens/0x00e1656e45f18ec6747f5a8496fd39b50b38396d',
                )
              }
            />
          </Col>
          <Col xs={4} sm={6}>
            <CoinItem
              src={DexTools}
              className="cursor-pointer"
              onClick={() =>
                onClickIcon(
                  'https://www.dextools.io/app/bsc/pair-explorer/0xd76026a78a2a9af2f9f57fe6337eed26bfc26aed',
                )
              }
            />
          </Col>
        </CoinWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default AvailableOn;
