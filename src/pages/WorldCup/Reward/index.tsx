import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import bg from 'src/assests/event/worldCupPage/Frame 5 Reward/BG.png';
import bgMobile from 'src/assests/event/worldCupPage/Mobile/5-Reward/BG.png';
import titleIcon from 'src/assests/event/worldCupPage/Frame 5 Reward/Title.png';
import content1 from 'src/assests/event/worldCupPage/Frame 5 Reward/footbalskin-LEFT.gif';
import content2a from 'src/assests/event/worldCupPage/Frame 5 Reward/Prize Glorypass.png';
import content2b from 'src/assests/event/worldCupPage/Frame 5 Reward/Prize Special offer.png';
import content3 from 'src/assests/event/worldCupPage/Frame 5 Reward/footbalskin-Right.gif';
import contentMobile from 'src/assests/event/worldCupPage/Mobile/5-Reward/footbal-skins-mobile.gif';
import { Wrapper } from '../commonStyles';
import useBreakpoint from 'src/hooks/useBreakpoint';
import styled from 'styled-components';

const Reward: React.FC<{ id: string }> = ({ id }) => {
  const { xs } = useBreakpoint();

  return (
    <Wrapper bg={xs ? bgMobile : bg} id={id} className="overflow-hidden">
      <Container fluid className="px-0">
        <Row className="justify-content-center justify-content-sm-start">
          <Col xs={4} className="d-none d-sm-block">
            <img src={content1} className="w-100 h-100 object-cover" />
          </Col>
          <Col xs={10} sm={4} className="mb-4 mb-sm-0">
            <img
              src={titleIcon}
              className={`mt-3 px-4 ${
                xs ? 'w-50 d-block mx-auto mb-3' : 'w-100 mb-5'
              }`}
            />
            <RoundContentMobile isMobile={xs}>
              <img src={content2a} className="mt-3 px-4 w-100 mb-2 mb-sm-5" />
              <img src={content2b} className="mt-3 px-4 w-100 mb-2 mb-sm-5" />
            </RoundContentMobile>
          </Col>
          <Col xs={4} className="d-none d-sm-block">
            <img src={content3} className="w-100 h-100 object-cover" />
          </Col>
          <Col xs={12} className="d-block d-sm-none">
            <img src={contentMobile} className="w-100 h-100 object-cover" />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

const RoundContentMobile = styled.div<{ isMobile: boolean }>`
  background-color: ${({ isMobile }) =>
    isMobile ? 'rgba(0,0,0,0.4)' : 'transparent'};
  padding: 10px;
  border-radius: 10px;
`;

export default Reward;
