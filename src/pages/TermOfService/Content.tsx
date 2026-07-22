import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import { content } from 'src/data/termOfSevices/content';

const Wrapper = styled.section`
  padding: 100px 0;
  font-family: barlow condensed, sans-serif;
  color: #777;
`;

const Title = styled.strong`
  text-align: center;
  font-size: 2.25em;
  display: block;
  line-height: 1.6;
  font-weight: bolder;
`;

const ContentDetail = styled.div`
  padding-top: 30px;
`;

const Heading = styled.strong`
  line-height: 1.6;
  font-weight: bolder;
  padding-bottom: 50px;
  font-size: 1.25em;
`;

const Detail = styled.p`
  font-size: 1.25em;
  font-weight: 400;
  margin: 20px 0;
`;

const Content: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <Title>Terms Of Service – Bomb Crypto</Title>
      <Container>
        <ContentDetail>
          {content.map((v, i) => {
            return (
              <div key={i}>
                <Heading>{v.heading}</Heading>
                <Detail>{v.detail1}</Detail>
                <Detail>{v.detail2}</Detail>
                <Detail>{v.detail3 && v.detail3}</Detail>
                <Detail>{v.detail4 && v.detail4}</Detail>
              </div>
            );
          })}
        </ContentDetail>
      </Container>
    </Wrapper>
  );
};

export default Content;
