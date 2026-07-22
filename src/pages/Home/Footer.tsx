import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import logo from 'src/assests/event/worldCup/logo.png';

const Wrapper = styled.footer`
  display: block;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: rgb(25, 42, 77);
  font-family: barlow condensed, sans-serif !important;
  a {
    text-decoration: none;
    color: #ffffffbf;
  }
`;

const LogoFooterImg = styled.img`
  width: 180px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    text-align: center;
    display: block;
    margin: 0 auto;
  }
`;

const Text = styled.a`
  color: rgb(255 255 255/75%);
  font-size: 21px;
  display: block;
  cursor: pointer;
  font-family: Retro;
  @media screen and (max-width: 760px) {
    margin: 20px 0;
    font-size: 18px;
  }
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const LinkText = styled(Link)`
  color: rgb(255 255 255/75%);
  font-size: 21px;
  display: block;
  cursor: pointer;
  font-family: Retro;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 760px) {
    margin: 20px 0;
    font-size: 18px;
  }
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const Footer: React.FC<{ id: string }> = ({ id }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper id={id}>
      <Container>
        <Row xs={12}>
          <Col md={3}>
            <LogoFooterImg onClick={scrollToTop} src={logo} alt="logo footer" />
          </Col>
          <Col md={9}>
            <Row>
              <Col xs={4} md={4}>
                <Text onClick={scrollToTop}>Home</Text>
                <Text
                  as="a"
                  target={'_blank'}
                  href="https://senspark.com/"
                  onClick={() => logTrackClickEventAnalytics('Metaverse_click')}
                >
                  Metaverse
                </Text>
              </Col>
              <Col xs={4} md={4}>
                <Text
                  as="a"
                  target={'_blank'}
                  href="https://whitepaper.bombcrypto.io/"
                  onClick={() =>
                    logTrackClickEventAnalytics('whiterpaper_click')
                  }
                >
                  Whitepaper
                </Text>
                <Text
                  as="a"
                  target={'_blank'}
                  href="https://bombcrypto.substack.com/p/bomb-cryptosenspark-media-kit"
                  onClick={() => logTrackClickEventAnalytics('mediakit_click')}
                >
                  Media Kit
                </Text>
              </Col>
              <Col xs={4} md={4}>
                <div onClick={scrollToTop}>
                  <LinkText to="/privacy-policy">Privacy Policy</LinkText>
                </div>
                <div>
                  <LinkText to="/term-of-service">Terms Of Service</LinkText>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Footer;
