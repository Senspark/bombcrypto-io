import React from 'react';
import { Col, Row } from 'react-bootstrap';

import prizeText from 'src/assests/event/worldCupPage/Frame4/Prize.png';
import howToJoinText from 'src/assests/event/worldCupPage/Frame4/text How to join.png';
import detailImg from 'src/assests/event/worldCupPage/Frame4/More detail button.png';
import cele1 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 1.png';
import cele2 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 2.png';
import buttonCele1 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 1 button.png';
import buttonCele2 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 2 button.png';
import cele3 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 3.png';
import cele4 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 4.png';
import buttonCele3 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 3 button.png';
import buttonCele4 from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Step 4 button.png';
import prizeDetail from 'src/assests/event/worldCupPage/Frame4/2 - CELEBRATES WORLD CUP 2022/Prize.png';
import { Board } from './styles';
import detailImgMobile from '../../../assests/event/worldCupPage/Mobile/4-How to join/More Detail Button.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

type Props = {
  isMobile: boolean;
};

const TabCelebrate: React.FC<Props> = ({ isMobile }) => {
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
                  ' https://bombcrypto.substack.com/p/bomb-crypto-celebrates-world-cup',
                );
              }}
            />
          </Col>
        )}
      </Row>
      <Row className="w-100 m-0">
        <Col xs={12} className="px-0 px-sm-1 mx-sm-4">
          <Board>
            <div className="round-board">
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={cele1} className="w-100" />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonCele1}
                    className="w-100 pointer"
                    onClick={() =>
                      window.open(
                        'https://app.bombcrypto.io/polygon/index.html',
                      )
                    }
                  />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={cele2} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonCele2}
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
                  <img src={cele3} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonCele3}
                    className="w-100 pointer"
                    onClick={() =>
                      window.open('https://forms.gle/yYjNtVbdJGJM7RRZ7')
                    }
                  />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={cele4} className="w-100 " />
                </Col>
                <Col xs={3}>
                  <img src={buttonCele4} className="w-100 pointer" />
                </Col>
              </Row>
            </div>
          </Board>
        </Col>
      </Row>
      {isMobile && (
        <Row className="justify-content-center mt-4">
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
                  ' https://bombcrypto.substack.com/p/bomb-crypto-celebrates-world-cup',
                );
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TabCelebrate;
