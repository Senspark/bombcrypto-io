import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import bg from 'src/assests/event/worldCupPage/Frame 2 Grolypass/BG.png';
import titleIcon from 'src/assests/event/worldCupPage/Frame 2 Grolypass/Title.png';
import buttonDetail from 'src/assests/event/worldCupPage/Frame 2 Grolypass/Button more detail.png';
import textDefini from 'src/assests/event/worldCupPage/Frame 2 Grolypass/1-Definition/Definition_.png';
import textHow from 'src/assests/event/worldCupPage/Frame 2 Grolypass/2-How to get/2-howtoget.png';
import textUsecase from 'src/assests/event/worldCupPage/Frame 2 Grolypass/3-usecase/Usecase.png';
import textClaim from 'src/assests/event/worldCupPage/Frame 2 Grolypass/4-claim/Claim.png';
import claim1 from 'src/assests/event/worldCupPage/Frame 2 Grolypass/4-claim/Claim button 1.png';
import claim2 from 'src/assests/event/worldCupPage/Frame 2 Grolypass/4-claim/Claim button 2.png';
import claim3 from 'src/assests/event/worldCupPage/Frame 2 Grolypass/4-claim/Claim button 3.png';
import textNote from 'src/assests/event/worldCupPage/Frame 2 Grolypass/5-note/5-note.png';
import contentHow from 'src/assests/event/worldCupPage/Frame 2 Grolypass/2-How to get/Event.png';
import { RoundContent, Content } from './styles';
import { FooterRound, Wrapper } from '../commonStyles';
import footerIcon from 'src/assests/event/worldCup/Thanh ngăn.png';
import useBreakpoint from 'src/hooks/useBreakpoint';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

const Glory: React.FC<{ id: string }> = ({ id }) => {
  const { xs } = useBreakpoint();

  return (
    <Wrapper id={id} bg={bg}>
      <div className="round">
        <Container>
          <div className="text-center pb-4">
            <img src={titleIcon} width={xs ? 200 : 300} />
          </div>
          <Row className="justify-content-center">
            <Col lg={9}>
              <RoundContent>
                <div className="round-content">
                  <Content className="justify-content-between">
                    <Col xs={12} sm={8}>
                      <img src={textDefini} className="w-100" />
                    </Col>
                    {!xs && (
                      <Col xs={2}>
                        <img
                          src={buttonDetail}
                          className="w-75 pointer"
                          onClick={() => {
                            logTrackClickEventAnalytics('community_click');
                            window.open(
                              'https://bombcrypto.substack.com/p/bomb-crypto-x-bnb-chain-football',
                            );
                          }}
                        />
                      </Col>
                    )}
                  </Content>
                  <Content className="mt-4">
                    <Col xs={12} sm={8}>
                      <img src={textHow} style={{ width: '60%' }} />
                    </Col>
                    <Col xs={12} className="text-center">
                      <img
                        src={contentHow}
                        className={`${!xs ? 'w-50' : 'w-100'} w-50 mt-2`}
                      />
                    </Col>
                  </Content>
                  <Content className="mt-4">
                    <Col xs={12}>
                      <img
                        src={textUsecase}
                        style={{ width: !xs ? '80%' : '100%' }}
                      />
                    </Col>
                  </Content>
                  <Content className="mt-4">
                    <Col xs={12}>
                      <img
                        src={textClaim}
                        style={{ width: !xs ? '50%' : '70%' }}
                      />
                    </Col>
                    <Col xs={12}>
                      <Row className="justify-content-center justify-content-sm-start">
                        <Col xs={8} sm={4}>
                          <img src={claim1} className="w-100" />
                        </Col>
                        <Col xs={8} sm={4}>
                          <img
                            src={claim2}
                            className="w-100 pointer"
                            onClick={() =>
                              window.open('https://forms.gle/m8Qo1WzmdYrYLzGLA')
                            }
                          />
                        </Col>
                        <Col xs={8} sm={4}>
                          <img
                            src={claim3}
                            className="w-100 pointer"
                            onClick={() =>
                              window.open(
                                'https://galxe.com/bnbchain/campaign/GCRTUUwuVg',
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Content>
                  <Content
                    className="mt-4"
                    style={{
                      border: 'none',
                    }}
                  >
                    <Col xs={12} sm={11}>
                      <img src={textNote} className="w-100" />
                    </Col>
                  </Content>
                  {xs && (
                    <Content
                      style={{
                        border: 'none',
                      }}
                      className="justify-content-center"
                    >
                      <Col xs={4}>
                        <img
                          src={buttonDetail}
                          className="w-100 pointer"
                          onClick={() => {
                            logTrackClickEventAnalytics('community_click');
                            window.open(
                              'https://bombcrypto.substack.com/p/bomb-crypto-x-bnb-chain-football',
                            );
                          }}
                        />
                      </Col>
                    </Content>
                  )}
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

export default Glory;
