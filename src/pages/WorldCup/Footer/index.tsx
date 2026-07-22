import React from 'react';
import styled from 'styled-components';
import { Col, Container, Row } from 'react-bootstrap';

import logo from 'src/assests/event/worldCupPage/Footer/logo.png';
import text from 'src/assests/event/worldCupPage/Footer/© Copyright Bomb Crypto.png';
import tw from 'src/assests/event/worldCupPage/Footer/twitter.png';
import tele from 'src/assests/event/worldCupPage/Footer/telegram.png';
import fb from 'src/assests/event/worldCupPage/Footer/facebook.png';
import discord from 'src/assests/event/worldCupPage/Footer/discord.png';
import yt from 'src/assests/event/worldCupPage/Footer/youtube.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

const Footer = () => {
  const trackClickComunity = () => {
    logTrackClickEventAnalytics('community_click');
  };
  return (
    <Wrapper>
      <Container>
        <Row className=" justify-content-sm-between align-items-baseline">
          <Col xl={3} className="text-center my-3 my-sm-0 text-sm-start">
            <img src={logo} width={130} />
            <img src={text} width={130} />
          </Col>
          <Col xl={4}>
            <Row>
              <Col className="text-center">
                <a
                  onClick={trackClickComunity}
                  target="_blank"
                  href="https://twitter.com/BombCryptoGame"
                  rel="noreferrer"
                >
                  <img className="pointer footer-img" src={tw} />
                </a>
              </Col>
              <Col className="text-center">
                <a
                  onClick={trackClickComunity}
                  target="_blank"
                  href=" https://t.me/BombCryptoGroup"
                  rel="noreferrer"
                >
                  <img className="pointer footer-img" src={tele} />
                </a>
              </Col>
              <Col className="text-center">
                <a
                  onClick={trackClickComunity}
                  target="_blank"
                  href="https://www.facebook.com/BombCryptoGame"
                  rel="noreferrer"
                >
                  <img className="pointer footer-img" src={fb} />
                </a>
              </Col>
              <Col className="text-center">
                <a
                  onClick={trackClickComunity}
                  target="_blank"
                  href="https://discord.gg/wG75cP9TRh"
                  rel="noreferrer"
                >
                  <img className="pointer footer-img" src={discord} />
                </a>
              </Col>
              <Col className="text-center">
                <a
                  onClick={trackClickComunity}
                  target="_blank"
                  href="https://www.youtube.com/channel/UCQGdoNOnb71PB4MvZa9upwg/featured"
                  rel="noreferrer"
                >
                  <img className="pointer footer-img" src={yt} />
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: black;
  padding: 5px 0;
  .footer-img {
    width: 50px;
    height: 50px;
  }
`;

export default Footer;
