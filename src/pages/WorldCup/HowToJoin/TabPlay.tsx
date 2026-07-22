import React from 'react';
import { Col, Row } from 'react-bootstrap';

import prizeText from 'src/assests/event/worldCupPage/Frame4/Prize.png';
import howToJoinText from 'src/assests/event/worldCupPage/Frame4/text How to join.png';
import detailImg from 'src/assests/event/worldCupPage/Frame4/More detail button.png';
import play1 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 1.png';
import play2 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 2.png';
import buttonAndroid from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 1 button android.png';
import buttonIos from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 1 button ios.png';
import buttonPlay2 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 2 button.png';
import play3 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 3.png';
import play4 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 4.png';
import buttonPlay3 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 3 button.png';
import buttonPlay4 from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Step 4 button.png';
import prizeDetail from 'src/assests/event/worldCupPage/Frame4/3 - Play together, Win together/Prize.png';
import { Board } from './styles';
import detailImgMobile from '../../../assests/event/worldCupPage/Mobile/4-How to join/More Detail Button.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

type Props = {
  isMobile: boolean;
};

const TabPlay: React.FC<Props> = ({ isMobile }) => {
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
        {!isMobile && (
          <Col xs={2}>
            <img
              src={detailImg}
              className="w-100 pointer"
              style={{
                height: '40px',
              }}
              onClick={() => {
                logTrackClickEventAnalytics('community_click');
                window.open(
                  'https://bombcrypto.substack.com/p/play-together-win-together',
                );
              }}
            />
          </Col>
        )}
      </Row>
      <Row className="w-100 m-0 m-sm-auto">
        <Col xs={12} className="px-0 px-sm-2 mx-sm-4">
          <Board>
            <div className="round-board">
              <Row className="justify-content-between align-items-center mb-4">
                <Col xs={9} sm={8}>
                  <img src={play1} className="w-100" />
                </Col>
                <Col
                  xs={3}
                  sm={4}
                  className="px-0  d-flex align-items-baseline "
                >
                  <img
                    src={buttonIos}
                    className="pointer me-1"
                    style={{
                      height: isMobile ? '30px' : '63px',
                      width: isMobile ? '40%' : '50%',
                    }}
                  />
                  <img
                    src={buttonAndroid}
                    className=" pointer ms-1 "
                    style={{
                      height: isMobile ? '30px' : '63px',
                      width: isMobile ? '40%' : '50%',
                    }}
                  />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={play2} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img src={buttonPlay2} className="w-100 pointer" />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={play3} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonPlay3}
                    className="w-100 pointer"
                    onClick={() =>
                      window.open(
                        'https://docs.google.com/spreadsheets/d/1wIvyElA-Ta04kiGg843odEhiMe7w-mfTRclKMEDV_p0/edit?usp=sharing',
                      )
                    }
                  />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={play4} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonPlay4}
                    className="w-100 pointer"
                    onClick={() =>
                      window.open('https://forms.gle/6Uyhi6oeUV1iGZNx6')
                    }
                  />
                </Col>
              </Row>
            </div>
          </Board>
        </Col>
      </Row>
      {isMobile && (
        <Row className="justify-content-center mt-3">
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
                  'https://bombcrypto.substack.com/p/play-together-win-together',
                );
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TabPlay;
