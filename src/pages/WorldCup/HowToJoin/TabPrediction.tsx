import React from 'react';
import { Col, Row } from 'react-bootstrap';

import prizeText from 'src/assests/event/worldCupPage/Frame4/Prize.png';
import howToJoinText from 'src/assests/event/worldCupPage/Frame4/text How to join.png';
import detailImg from 'src/assests/event/worldCupPage/Frame4/More detail button.png';
import pre1 from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Step 1.png';
import pre2 from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Step 2.png';
import pre3 from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Step 3.png';
import buttonPre1 from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Step 1 button.png';
import buttonPre2 from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Step 2 button.png';
import prizeDetail from 'src/assests/event/worldCupPage/Frame4/4 - WC Prediction/Prize.png';
import { Board } from './styles';
import detailImgMobile from '../../../assests/event/worldCupPage/Mobile/4-How to join/More Detail Button.png';

type Props = {
  isMobile: boolean;
};

const TabPrediction: React.FC<Props> = ({ isMobile }) => {
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
              onClick={() =>
                window.open(
                  'https://www.bnbchain.org/en/blog/football-meets-web3-pick-your-football-fiesta-2022-winner-with-the-glory-pass/',
                )
              }
            />
          </Col>
        )}
      </Row>
      <Row className="w-100 m-0 m-sm-auto">
        <Col xs={12} className="px-0 px-sm-2 mx-sm-4">
          <Board>
            <div className="round-board">
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={pre1} className="w-100" />
                </Col>
                <Col xs={3}>
                  <img
                    src={buttonPre1}
                    className="w-100 pointer"
                    onClick={() =>
                      window.open(
                        'https://galxe.com/bnbchain/campaign/GCRTUUwuVg',
                      )
                    }
                  />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={pre2} className="w-100" />
                </Col>
                <Col xs={3}>
                  <img src={buttonPre2} className="w-100 pointer" />
                </Col>
              </Row>
              <Row className="justify-content-between mb-4">
                <Col xs={9} sm={8}>
                  <img src={pre3} className="w-100" />
                </Col>
              </Row>
            </div>
          </Board>
        </Col>
      </Row>
      {isMobile && (
        <Row className="justify-content-center mt-5">
          <Col xs={4}>
            <img
              src={detailImgMobile}
              className="w-100 pointer"
              style={{
                height: '40px',
              }}
              onClick={() =>
                window.open(
                  'https://www.bnbchain.org/en/blog/football-meets-web3-pick-your-football-fiesta-2022-winner-with-the-glory-pass/',
                )
              }
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TabPrediction;
