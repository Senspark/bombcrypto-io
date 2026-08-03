import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bgGuide from 'src/assests/imgRouteGuide/bgGuide.png';
// import button from 'src/assests/imgRouteGuide/button.webp';
import { listGuide } from 'src/data/guideline/listGuideline';
import ModalAdvertisement from 'src/components/ModalComingSoon';
// import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import YouTubeVideoModal from 'src/components/YouTubeVideoModal';
import {
  arcadeBorder,
  arcadeColors,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';
import {
  ArcadeContainer,
  Reveal,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';

const Wrapper = styled.section`
  width: 100%;
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(8, 10, 31, 0.88) 0%,
      rgba(14, 17, 48, 0.94) 100%
    ),
    url(${bgGuide}) no-repeat center;
  background-size: cover;
  padding: 140px 0 90px;

  @media screen and (max-width: 767px) {
    padding: 110px 0 60px;
  }
`;

/** Card de cada vídeo do guia. */
const GuideCard = styled.div`
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  overflow: hidden;
  margin-bottom: 28px;
  cursor: pointer;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  > a > img,
  > img {
    width: 100%;
    display: block;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: ${hardShadow(11)};
  }

  /* zoom suave na thumbnail, sem vazar do card */
  &:hover > img {
    transform: scale(1.05);
  }
`;

const ContentDetail = styled.p`
  color: ${arcadeColors.cloud};
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 14px 16px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const LinkYoutube = styled.a`
  text-decoration: none;
  width: 100%;
  display: block;
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
      <ArcadeContainer>
        <SectionTitle $center>Guideline</SectionTitle>
        <SectionSubtitle $center>
          Step-by-step videos to help you start playing and get the most out of
          the game.
        </SectionSubtitle>
        <Row className="mt-4">
          {listGuide.map((v, i) => {
            return (
              <Col key={i} sm={6} md={4}>
                <Reveal delay={(i % 3) * 120}>
                  <LinkYoutube target={v.target}>
                    <GuideCard onClick={() => OnClick(i)}>
                      <img src={v.image} alt="imgGuide" />
                      <ContentDetail>{v.detail}</ContentDetail>
                    </GuideCard>
                  </LinkYoutube>
                </Reveal>
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
      </ArcadeContainer>
      <ModalAdvertisement isShow={show} onShow={setShowComingSoon} />
      <YouTubeVideoModal isShow={showVideo} url={url} onShow={setShowVideo} />
    </Wrapper>
  );
};

export default Guideline;
