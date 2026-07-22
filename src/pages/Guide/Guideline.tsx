import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bgGuide from 'src/assests/imgRouteGuide/bgGuide.png';
// import button from 'src/assests/imgRouteGuide/button.webp';
import { listGuide } from 'src/data/guideline/listGuideline';
import ModalAdvertisement from 'src/components/ModalComingSoon';
// import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import YouTubeVideoModal from 'src/components/YouTubeVideoModal';

const Wrapper = styled.section`
  width: 100%;
  background: url(${bgGuide}) no-repeat center;
  background-position: center;
  background-size: cover;
  padding: 130px 0;
  font-family: 'Lato', sans-serif;
`;

const Title = styled.strong`
  font-size: 80px;
  color: #fff;
  font-weight: bolder;
  text-align: center;
  display: block;
  @media screen and (max-width: 600px) {
    font-size: 50px;
  }
`;

const ContentDetail = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  line-height: normal;
  margin: 10px 0;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const LinkYoutube = styled.a`
  text-decoration: none;
  width: 100%;
`;

// const ButtonGuide = styled.div`
//   margin: 0 auto;
//   width: 450px;
//   @media screen and (max-width: 768px) {
//     width: 350px;
//   }
//   @media screen and (max-width: 600px) {
//     width: 200px;
//   }
// `;

const Guideline: React.FC<{ id: string }> = ({ id }) => {
  const [show, setShowComingSoon] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [url, setUrl] = useState('');

  const OnClick = (index: number) => {
    let link = listGuide[index];
    setUrl(link?.href);
    setShowVideo(true);
  };

  return (
    <Wrapper id={id}>
      <Container>
        <Title>GUIDELINE</Title>
        <Row className="my-5">
          {listGuide.map((v, i) => {
            return (
              <Col key={i} sm={6} md={4}>
                <LinkYoutube target={v.target}>
                  <img
                    src={v.image}
                    alt="imgGuide"
                    className="w-100"
                    style={{ cursor: 'pointer' }}
                    onClick={() => OnClick(i)}
                  />
                  <ContentDetail>{v.detail}</ContentDetail>
                </LinkYoutube>
              </Col>
            );
          })}
        </Row>
        {/* <ButtonGuide>
          <Link
            to="/getting-started"
            onClick={() => logTrackClickEventAnalytics('info_click')}
          >
            <img src={button} alt="buttonGuide" className="w-100" />
          </Link>
        </ButtonGuide> */}
      </Container>
      <ModalAdvertisement isShow={show} onShow={setShowComingSoon} />
      <YouTubeVideoModal isShow={showVideo} url={url} onShow={setShowVideo} />
    </Wrapper>
  );
};

export default Guideline;
