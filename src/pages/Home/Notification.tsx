import React, { useCallback, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import styled from 'styled-components';

import bg from 'src/assests/images/noticeBg.png';
import { notifications } from 'src/data/notification';
import bgNew from 'src/assests/images/notification/new.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

const Wrapper = styled.div`
  background-color: #1697d9;
  padding: 50px 0 100px 0;
  @media screen and (max-width: 500px) {
    padding: 50px 0;
  }
  .tab-content {
    min-height: 180px;
  }
`;

const Round = styled(Col)`
  background: url(${bg}) center no-repeat;
  background-position: top center;
  background-size: 100% 100%;
`;

const ContentImg = styled.div`
  padding: 15px 5px;
  img {
    width: 100%;
  }
`;

const Content = styled.div`
  padding: 20px 15px 20px 30px;
  .nav-link {
    color: #af7c71;
    font-weight: 900;
    font-size: 14px;
    padding-left: 0px;
    padding-right: 1rem;
  }
  .nav-tabs {
    border-bottom: none;
  }
  .nav-tabs .nav-link.active {
    background: transparent;
    border-color: transparent;
    color: #1697d9;
  }
  .nav-tabs .nav-link {
    &:hover {
      border-color: transparent;
      outline: none;
    }
  }
  @media screen and (max-width: 500px) {
    padding-left: 5px;
  }
`;

const ContentTab = styled(Row)`
  justify-content: space-between !important;
  align-items: baseline;
  border-bottom: 1px solid #af7c71;
  margin: 5px 0px 5px 2px;
`;

const ContentTabDetail = styled.a`
  color: #af7c71;
  font-size: 14px;
  text-decoration: none;
  font-weight: 700;

  &:hover {
    color: #1697d9;
  }
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Time = styled(Col)`
  color: #af7c71;
  font-size: 14px;
  font-weight: 700;
  @media screen and (max-width: 500px) {
    font-size: 10px;
  }
`;

const Title = styled.div`
  font-size: 45px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 30px;
  @media screen and (max-width: 768px) {
    font-size: 35px !important;
  }
`;

const Notification: React.FC<{ id: string }> = ({ id }) => {
  const [img, setImg] = useState<any>(bgNew);

  const handleOnchangeBackground = useCallback((event) => {
    let newValue = notifications.find((v) => v.eventKey === event);
    if (newValue) setImg(newValue.img);
  }, []);

  return (
    <section id={id}>
      <Wrapper>
        <Container>
          <Title>ANNOUNCEMENTS</Title>
          <Row className="justify-content-center rowContent">
            <Round xs={12} xl={5} className="mb-3 mb-xl-0 mx-xl-2">
              <ContentImg>
                <img src={img} alt="" />
              </ContentImg>
            </Round>
            <Round xs={12} xl={5} className="mx-xl-2">
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
            </Round>
          </Row>
        </Container>
      </Wrapper>
    </section>
  );
};

export default Notification;
