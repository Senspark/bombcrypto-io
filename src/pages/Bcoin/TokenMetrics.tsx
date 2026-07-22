import React from 'react';
import styled from 'styled-components';
import bgTokenMetrics from 'src/assests/bcoin/vip-bg.jpeg';
import btnStake from 'src/assests/bcoin/btn-stake.png';
import vipRanking from 'src/assests/bcoin/vip_v2.png';

const SectionWrapper = styled.section`
  width: 100%;
  background: url(${bgTokenMetrics}) no-repeat center;
  background-size: cover;
  font-family: 'Montserrat', sans-serif;
  color: white;
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Title = styled.div`
  font-size: 41px;
  font-weight: 900;
  color: #ffea00;
  text-align: center;
`;

const SummaryWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

const SummaryItem = styled.div``;

const SummaryTitle = styled.p`
  font-size: 26px;
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;

const SummaryDesc = styled.p`
  font-size: 10px;
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
  font-size: 31px;
  color: #ffcc00;
  margin: 0;
`;

const VipInfoDesc = styled.p`
  font-size: 19px;
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
        <Title>Token Metrics</Title>
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
      </Container>
    </SectionWrapper>
  );
};

export default TokenMetrics;
