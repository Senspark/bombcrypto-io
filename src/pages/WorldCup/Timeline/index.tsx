import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import { FooterRound, Wrapper } from '../commonStyles';
import bg from 'src/assests/event/worldCupPage/Frame 3 Timeline/BG.png';
import titleIcon from 'src/assests/event/worldCupPage/Frame 3 Timeline/Title.png';
import content from 'src/assests/event/worldCupPage/Frame 3 Timeline/Timeline.png';
import contentSp from 'src/assests/event/worldCupPage/Mobile/3-Timeline/Timeline.png';
import footerIcon from 'src/assests/event/worldCup/Thanh ngăn.png';
import useBreakpoint from 'src/hooks/useBreakpoint';

const Timeline: React.FC<{ id: string }> = ({ id }) => {
  const { xs } = useBreakpoint();

  return (
    <Wrapper bg={bg} id={id}>
      <div className="round">
        <Container>
          <div className="text-center pb-4">
            <img src={titleIcon} width={xs ? 150 : 300} />
          </div>
          <Row className="justify-content-center">
            <Col xs={11} lg={9}>
              <img src={xs ? contentSp : content} className="w-100" />
            </Col>
          </Row>
        </Container>
      </div>
      <FooterRound src={footerIcon} />
    </Wrapper>
  );
};

export default Timeline;
