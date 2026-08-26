import React, { useCallback, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import { notifications } from 'src/data/notification';
import bgNew from 'src/assests/images/notification/new.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';
import { Reveal, SectionTitle } from 'src/components/ui';

const Wrapper = styled.div`
  background: ${arcadeColors.night};
  padding: 80px 0;
  font-family: ${arcadeFonts.body};

  @media screen and (max-width: 500px) {
    padding: 48px 0;
  }
  .tab-content {
    min-height: 180px;
  }
`;

/** Painel com borda grossa e sombra dura, no lugar da moldura em imagem. */
const Round = styled(Col)`
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  overflow: hidden;
  /* sem o padding padrão da coluna: a imagem cobre o quadro até a borda */
  padding: 0;

  /* o conteúdo (inclusive o wrapper do Reveal) ocupa o quadro inteiro,
     mesmo quando o card ao lado é mais alto */
  > div {
    height: 100%;
  }
`;

const ContentImg = styled.div`
  padding: 0;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Content = styled.div`
  padding: 20px 24px;

  .nav-tabs {
    border-bottom: 2px solid rgba(255, 255, 255, 0.12);
    gap: 4px;
  }
  .nav-link {
    font-family: ${arcadeFonts.display};
    color: ${arcadeColors.smoke};
    font-size: 13px;
    letter-spacing: 1px;
    padding: 8px 12px;
    border: none;
    border-radius: ${arcadeRadius.sm} ${arcadeRadius.sm} 0 0;
  }
  .nav-tabs .nav-link.active {
    background: ${arcadeColors.yellow};
    border-color: transparent;
    color: ${arcadeColors.ink};
  }
  .nav-tabs .nav-link:hover {
    border-color: transparent;
    outline: none;
    color: ${arcadeColors.yellow};
  }
  .nav-tabs .nav-link.active:hover {
    color: ${arcadeColors.ink};
  }

  @media screen and (max-width: 500px) {
    padding: 16px 14px;
  }
`;

const ContentTab = styled(Row)`
  justify-content: space-between !important;
  align-items: baseline;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  margin: 0;
  padding: 10px 0;
`;

const ContentTabDetail = styled.a`
  color: ${arcadeColors.cloud};
  font-size: 15px;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${arcadeColors.yellow};
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;

const Time = styled(Col)`
  color: ${arcadeColors.smoke};
  font-size: 13px;
  text-align: right;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Notification: React.FC<{ id: string }> = ({ id }) => {
  const [img, setImg] = useState<any>(bgNew);

  const handleOnchangeBackground = useCallback((event) => {
    let newValue = notifications.find((v) => v.eventKey === event);
    if (newValue?.img) setImg(newValue.img);
  }, []);

  return (
    <section id={id}>
      <Wrapper>
        <Container>
          <SectionTitle $center style={{ marginBottom: '36px' }}>
            Announcements
          </SectionTitle>
          <Row className="justify-content-center rowContent">
            <Round xs={12} xl={5} className="mb-3 mb-xl-0 mx-xl-2">
              <Reveal>
                <ContentImg>
                  <img src={img} alt="" />
                </ContentImg>
              </Reveal>
            </Round>
            <Round xs={12} xl={5} className="mx-xl-2">
              <Reveal delay={120}>
                <Content>
                  <Tabs
                    defaultActiveKey="new"
                    id="uncontrolled-tab-example"
                    className="mb-2"
                    onSelect={(e) => handleOnchangeBackground(e)}
                  >
                    {notifications.map((v, i) => {
                      return (
                        <Tab
                          eventKey={v.eventKey}
                          title={v.title}
                          key={`${v.title}${i}`}
                          style={
                            v.content.length > 5
                              ? { height: '180px', overflowY: 'scroll' }
                              : undefined
                          }
                        >
                          {v.content.map((item, index) => {
                            return (
                              <ContentTab key={index}>
                                <Col xs={10} className="px-0">
                                  <ContentTabDetail
                                    href={item.href}
                                    target="_blank"
                                    onClick={() =>
                                      logTrackClickEventAnalytics(
                                        'community_click',
                                      )
                                    }
                                  >
                                    {item.des}
                                  </ContentTabDetail>
                                </Col>
                                <Time xs={2}>{item.date}</Time>
                              </ContentTab>
                            );
                          })}
                        </Tab>
                      );
                    })}
                  </Tabs>
                </Content>
              </Reveal>
            </Round>
          </Row>
        </Container>
      </Wrapper>
    </section>
  );
};

export default Notification;
