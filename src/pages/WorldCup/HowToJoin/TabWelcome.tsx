import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import prizeText from 'src/assests/event/worldCupPage/Frame4/Prize.png';
import howToJoinText from 'src/assests/event/worldCupPage/Frame4/text How to join.png';
import detailImg from 'src/assests/event/worldCupPage/Frame4/More detail button.png';
import detailImgMobile from 'src/assests/event/worldCupPage/Mobile/4-How to join/More Detail Button.png';
import join1 from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Step 1.png';
import join2 from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Step 2.png';
import buttonJoin1 from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Step 1 button.png';
import buttonJoin2 from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Step 2 button.png';
import prizeDetail from 'src/assests/event/worldCupPage/Frame4/1 - Welcome to Bombcrypto/Prize.png';
import { Board } from './styles';
import PopupBuyHero from './PopupBuyHero';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

type Props = {
  isMobile: boolean;
};

const TabWelcome: React.FC<Props> = ({ isMobile }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  return (
    <div className="mt-4">
      <Row>
        <Col xs={12}>
          <img src={prizeText} width={100} />
        </Col>
        <Col xs={12}>
          <img
            src={prizeDetail}
            className={`d-block ${isMobile ? 'w-100 my-2' : 'w-75 ms-4'} `}
          />
        </Col>
      </Row>
      <Row className="justify-content-between align-items-center mb-3">
        <Col xs={10}>
          <img src={howToJoinText} width={150} />
        </Col>
        <Col xs={2} className="d-none d-sm-block">
          <img
            src={detailImg}
            className="w-100 pointer"
            style={{
              height: '40px',
            }}
            onClick={() => {
              logTrackClickEventAnalytics('community_click');
              window.open(
                'https://bombcrypto.substack.com/p/special-offer-for-users',
              );
            }}
          />
        </Col>
      </Row>
      <Row className="w-100 m-0 m-sm-auto">
        <Col xs={12} className="px-0 px-sm-2 mx-sm-4">
          <Board>
            <div className="round-board">
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={join1} className="w-100" />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonJoin1}
                    className="w-100 pointer"
                    onClick={() => setIsShow(true)}
                  />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={join2} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonJoin2}
                    className="w-100 pointer"
                    onClick={() =>
                      window.open(
                        'https://docs.google.com/spreadsheets/d/1wIvyElA-Ta04kiGg843odEhiMe7w-mfTRclKMEDV_p0/edit?usp=sharing',
                      )
                    }
                  />
                </Col>
              </Row>
            </div>
          </Board>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5 d-flex d-sm-none">
        <Col xs={4}>
          <img
            src={detailImgMobile}
            className="w-100 pointer"
            style={{
              height: '40px',
            }}
            onClick={() => {
              logTrackClickEventAnalytics('community_click');
              window.open(
                'https://bombcrypto.substack.com/p/special-offer-for-users',
              );
            }}
          />
        </Col>
      </Row>
      <PopupBuyHero isShowing={isShow} setIsShowing={setIsShow} />
    </div>
  );
};

export default TabWelcome;
