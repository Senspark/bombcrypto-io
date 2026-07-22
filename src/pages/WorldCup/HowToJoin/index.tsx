import React, { useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import bg from 'src/assests/event/worldCupPage/Frame4/BG.png';
import titleIcon from 'src/assests/event/worldCupPage/Frame4/title.png';
import buttonIcon from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Button0.png';
import activeButtonIcon from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Button1.png';
import tab1 from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Button-text.png';
import tab2 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Button-text.png';
import tab3 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Button-text.png';
import tab4 from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Button-text.png';
import tab1MobileActive from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event1/active.png';
import tab1Mobile from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event1/Inactive.png';
import tab2MobileActive from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event2/Active.png';
import tab2Mobile from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event2/Inactive.png';
import tab3MobileActive from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event3/active.png';
import tab3Mobile from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event3/inactive.png';
import tab4MobileActive from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event4/active.png';
import tab4Mobile from 'src/assests/event/worldCupPage/Mobile/4-How to join/Event4/inactive.png';
import { RoundContent } from './styles';
import { FooterRound, Wrapper } from '../commonStyles';
import footerIcon from 'src/assests/event/worldCup/Thanh ngăn.png';
import TabWelcome from './TabWelcome';
import TabCelebrate from './TabCelebrate';
import TabPlay from './TabPlay';
import TabPrediction from './TabPrediction';
import useBreakpoint from '../../../hooks/useBreakpoint';

const Tab = {
  CELE: 1,
  PLAY: 2,
  PRE: 3,
};

const HowToJoin: React.FC<{ id: string }> = ({ id }) => {
  const [tab, setTab] = useState<number>(0);
  const { xs } = useBreakpoint();

  const renderTab = useMemo(() => {
    switch (tab) {
      case Tab.CELE:
        return <TabCelebrate isMobile={xs} />;
      case Tab.PLAY:
        return <TabPlay isMobile={xs} />;
      case Tab.PRE:
        return <TabPrediction isMobile={xs} />;
      default:
        return <TabWelcome isMobile={xs} />;
    }
  }, [tab]);

  return (
    <Wrapper id={id} bg={bg}>
      <div className="round">
        <Container>
          <div className="text-center pb-4">
            <img src={titleIcon} width={xs ? 150 : 300} />
          </div>
          <Row className="justify-content-center">
            <Col lg={9}>
              <RoundContent>
                <div className="round-content">
                  {!xs ? (
                    <Row>
                      <Col xs={3}>
                        <BgTab isActive={tab === 0} onClick={() => setTab(0)}>
                          <img src={tab1} className=" mx-auto w-75" />
                        </BgTab>
                      </Col>
                      <Col xs={3}>
                        <BgTab isActive={tab === 1} onClick={() => setTab(1)}>
                          <img
                            src={tab2}
                            className=" mx-auto"
                            style={{
                              width: '85%',
                            }}
                          />
                        </BgTab>
                      </Col>
                      <Col xs={3}>
                        <BgTab isActive={tab === 2} onClick={() => setTab(2)}>
                          <img
                            src={tab3}
                            className=" mx-auto"
                            style={{
                              width: '87%',
                            }}
                          />
                        </BgTab>
                      </Col>
                      <Col xs={3}>
                        <BgTab isActive={tab === 3} onClick={() => setTab(3)}>
                          <img
                            src={tab4}
                            className=" mx-auto"
                            style={{
                              width: '65%',
                            }}
                          />
                        </BgTab>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col xs={3} className="px-1">
                        <img
                          alt=""
                          src={tab === 0 ? tab1MobileActive : tab1Mobile}
                          className="img-fluid"
                          onClick={() => setTab(0)}
                        />
                      </Col>
                      <Col xs={3} className="px-1">
                        <img
                          alt=""
                          src={tab === 1 ? tab2MobileActive : tab2Mobile}
                          className="img-fluid"
                          onClick={() => setTab(1)}
                        />
                      </Col>
                      <Col xs={3} className="px-1">
                        <img
                          src={tab === 2 ? tab3MobileActive : tab3Mobile}
                          className="img-fluid"
                          onClick={() => setTab(2)}
                          alt=""
                        />
                      </Col>
                      <Col xs={3} className="px-1">
                        <img
                          alt=""
                          src={tab === 3 ? tab4MobileActive : tab4Mobile}
                          className="img-fluid"
                          onClick={() => setTab(3)}
                        />
                      </Col>
                    </Row>
                  )}

                  {renderTab}
                </div>
              </RoundContent>
            </Col>
          </Row>
        </Container>
      </div>
      <FooterRound src={footerIcon} />
    </Wrapper>
  );
};

const BgTab = styled.div<{ isActive?: boolean; iconHover?: string }>`
  background: url(${({ isActive }) =>
      isActive ? activeButtonIcon : buttonIcon})
    center no-repeat;
  width: 100%;
  background-size: 100% 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: url(${activeButtonIcon}) center no-repeat;
    background-size: 100% 100%;
    height: 40px;
    cursor: pointer;
  }
`;

export default HowToJoin;
