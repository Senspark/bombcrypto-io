import React from 'react';
import styled from 'styled-components';
import bgIntro from 'src/assests/bcoin/bg-1.png';
import bcoinSlider from 'src/assests/bcoin/bcoin-slider.png';
import { Col, Row } from 'react-bootstrap';

const SectionWrapper = styled.section`
  width: 100%;
  background: url(${bgIntro}) no-repeat center;
  background-size: cover;
  font-family: 'Montserrat', sans-serif;
  padding-top: 120px;
  color: white;
`;

const BcoinSliderImage = styled.img`
  position: absolute;
  top: 0;
  right: 200px;
  width: 500px;
  @media screen and (max-width: 1024px) {
    right: 0;
  }
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 40px;
`;

const Title = styled.div`
  font-size: 33px;
  font-weight: 900;
  color: #ffea00;
`;

const Description = styled.div`
  font-size: 15px;
`;

const ContractAddress = styled.div`
  margin-top: 20px;
  .address {
    color: #ffea00;
    word-break: break-word;
  }
`;

const AuditReport = styled.a`
  margin-top: 15px;
  font-size: 17px;
  color: white;
`;

const Introduction: React.FC<{ id: string }> = ({ id }) => {
  return (
    <SectionWrapper id={id}>
      <Container className="container">
        <Row>
          <Col lg={7} className="text-md-center text-lg-start">
            <Title>BombCrypto token (BCOIN)</Title>
            <Description>
              BCOIN is the BEP-20 token which allows token holders to play,
              exchange, invest
              <br />
              and also be a part of the game ecosystem development. Taking
              advantage <br />
              of crypto currency assets, BCOIN has strong security manners, high
              liquidity, <br />
              and is easy to exchange. That can help users to play, enjoy, and
              make profits <br />
              from the game.
            </Description>
            <ContractAddress>
              Contract address:{' '}
              <span className="address">
                0x00e1656e45f18ec6747F5a8496Fd39B50b38396D
              </span>
            </ContractAddress>
            <AuditReport
              target="_blank"
              href="https://github.com/verichains/public-audit-reports/blob/main/Verichains%20Public%20Audit%20Report%20-%20BCoin%20Token%20-%20v1.1.pdf"
            >
              BCOIN Audit Report
            </AuditReport>
          </Col>
          <Col className="d-none d-lg-block">
            <BcoinSliderImage src={bcoinSlider} />
          </Col>
        </Row>
      </Container>
    </SectionWrapper>
  );
};

export default Introduction;
