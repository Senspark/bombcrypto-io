import React from 'react';
import styled from 'styled-components';
import bgTokenMetrics from 'src/assests/bcoin/vip-bg.jpeg';
import btnStake from 'src/assests/bcoin/btn-stake.png';
import vipRanking from 'src/assests/bcoin/vip_v2.png';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
  pixelTextShadow,
} from 'src/theme/arcade';
import { Reveal, SectionTitle } from 'src/components/ui';

const SectionWrapper = styled.section`
  width: 100%;
  background: linear-gradient(
      180deg,
      rgba(8, 10, 31, 0.9) 0%,
      rgba(14, 17, 48, 0.92) 100%
    ),
    url(${bgTokenMetrics}) no-repeat center;
  background-size: cover;
  font-family: ${arcadeFonts.body};
  color: ${arcadeColors.cloud};
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const SummaryWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

/** Cada número vira uma "placa de placar". */
const SummaryItem = styled.div`
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(5)};
  padding: 18px 10px;
  margin: 0 8px;
`;

const SummaryTitle = styled.p`
  font-family: ${arcadeFonts.display};
  font-size: 22px;
  color: ${arcadeColors.yellow};
  margin-bottom: 6px;

  @media screen and (max-width: 500px) {
    font-size: 15px;
  }
`;

const SummaryDesc = styled.p`
  font-size: 11px;
  letter-spacing: 1px;
  color: ${arcadeColors.smoke};
  margin: 0;
`;

const VipWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  .vip-left {
    margin-top: 100px;
    text-align: left;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    .vip-left {
      margin-top: 0px;
    }
  }
`;

const VipInfo = styled.div``;

const VipInfoTitle = styled.p`
  font-family: ${arcadeFonts.display};
  font-size: 26px;
  color: ${arcadeColors.yellow};
  text-shadow: ${pixelTextShadow()};
  margin: 0 0 12px;
`;

const VipInfoDesc = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${arcadeColors.smoke};
`;

const VipRanking = styled.img`
  width: 100%;
`;

const VipStakeBcoinButton = styled.img`
  cursor: pointer;
  width: 157px;
`;

const TokenMetrics: React.FC<{ id: string }> = ({ id }) => {
  return (
    <SectionWrapper id={id}>
      <Container className="container">
        <SectionTitle $center>Token Metrics</SectionTitle>
        <Reveal>
          <SummaryWrapper>
            <SummaryItem className="col-4 col-sm-3">
              <SummaryTitle>2,000,000</SummaryTitle>
              <SummaryDesc>SUPPLY AT PUBLIC SALE</SummaryDesc>
            </SummaryItem>
            <SummaryItem className="col-4 col-sm-3">
              <SummaryTitle>$0.1</SummaryTitle>
              <SummaryDesc>PUBLIC SALE PRICE</SummaryDesc>
            </SummaryItem>
            <SummaryItem className="col-4 col-sm-3">
              <SummaryTitle>100,000,000</SummaryTitle>
              <SummaryDesc>TOTAL SUPPLY</SummaryDesc>
            </SummaryItem>
          </SummaryWrapper>
        </Reveal>
        <Reveal delay={120}>
          <VipWrapper>
            <VipInfo className="col-sm-6 col-12 vip-left">
              <VipInfoTitle>Vip & Stake</VipInfoTitle>
              <VipInfoDesc>
                Users can stake Bcoin to upgrade their VIP rating.
                <br />
                The higher the VIP level, the more incentives the
                <br />
                player will receive.
              </VipInfoDesc>
              <VipStakeBcoinButton
                src={btnStake}
                onClick={() => window.open('https://dapp.bombcrypto.io')}
              />
            </VipInfo>
            <VipInfo className="col-sm-6 col-12">
              <VipRanking src={vipRanking} />
            </VipInfo>
          </VipWrapper>
        </Reveal>
      </Container>
    </SectionWrapper>
  );
};

export default TokenMetrics;
