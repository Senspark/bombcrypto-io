import React from 'react';
import styled from 'styled-components';
import bgIntro from 'src/assests/bcoin/bg-1.png';
import bcoinSlider from 'src/assests/bcoin/bcoin-slider.png';
import { Col, Row } from 'react-bootstrap';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
  pixelTextShadow,
} from 'src/theme/arcade';
import { floatY, Reveal } from 'src/components/ui';

const SectionWrapper = styled.section`
  width: 100%;
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(8, 10, 31, 0.9) 0%,
      rgba(14, 17, 48, 0.92) 100%
    ),
    url(${bgIntro}) no-repeat center;
  background-size: cover;
  font-family: ${arcadeFonts.body};
  padding-top: 150px;
  color: ${arcadeColors.cloud};
`;

const BcoinSliderImage = styled.img`
  position: absolute;
  top: 0;
  right: 200px;
  width: 500px;
  animation: ${floatY} 5s ease-in-out infinite;

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
  font-family: ${arcadeFonts.display};
  font-size: 32px;
  line-height: 1.3;
  color: ${arcadeColors.yellow};
  text-shadow: ${pixelTextShadow()};
  margin-bottom: 16px;

  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 1.7;
  color: ${arcadeColors.smoke};
`;

const ContractAddress = styled.div`
  margin-top: 20px;
  .address {
    color: ${arcadeColors.cyan};
    word-break: break-word;
  }
`;

const AuditReport = styled.a`
  display: inline-block;
  margin-top: 20px;
  font-family: ${arcadeFonts.display};
  font-size: 14px;
  letter-spacing: 1px;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(4)};
  padding: 10px 20px;
  text-decoration: none;
  transition: transform 0.08s ease, box-shadow 0.08s ease;

  &:hover {
    color: ${arcadeColors.ink};
    transform: translate(-2px, -2px);
    box-shadow: ${hardShadow(6)};
  }
`;

const Introduction: React.FC<{ id: string }> = ({ id }) => {
  return (
    <SectionWrapper id={id}>
      <Container className="container">
        <Row>
          <Col lg={7} className="text-md-center text-lg-start">
            <Reveal>
              <Title>BombCrypto token (BCOIN)</Title>
              <Description>
                BCOIN is the BEP-20 token which allows token holders to play,
                exchange, invest
                <br />
                and also be a part of the game ecosystem development. Taking
                advantage <br />
                of crypto currency assets, BCOIN has strong security manners,
                high liquidity, <br />
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
            </Reveal>
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
