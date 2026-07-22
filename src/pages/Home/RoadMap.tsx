import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import imgTitle from 'src/assests/imgRoadMap/title.webp';
import blockPink from 'src/assests/imgRoadMap/blockPink.webp';
import { infoDate, phaseMap } from 'src/data/roadMap';

const Wrapper = styled.section`
  background-color: #4d193a;
  padding: 85px 0;
  font-family: barlow condensed, sans-serif !important;
`;

const Title = styled.div`
  width: 30%;
  margin: 0 auto;
  padding-bottom: 40px;
  img {
    width: 100%;
  }
`;

const PhaseMap = styled.div`
  position: relative;
  display: flex;
  padding-bottom: 30px;
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #ff0072;
    z-index: 9;
  }
  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    width: 100%;
    height: 5px;
    background-color: #3faed2;
  }
`;

const BlockPinkImg = styled.div`
  background: url(${blockPink}) top center no-repeat;
  background-size: cover;
  width: 35px;
  height: 35px;
  margin: 0 auto;
`;

const BlockBlueImg = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 auto;
  display: block;
  z-index: 8;
`;

const Date = styled.div`
  text-align: center;
  color: #fff;
  background: #ff0072;
  padding: 5px 0 7px;
  margin-bottom: 20px;
  font-size: 23px;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

const Text = styled.p`
  margin: 3px 0;
  span {
    font-weight: 400;
    color: #fff;
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
    @media screen and (max-width: 600px) {
      margin: 6px 0;
    }
  }
`;

const RoadMap: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <Container>
        <Title>
          <img src={imgTitle} alt="imgTitle" className="w-100" />
        </Title>
        <PhaseMap>
          <BlockPinkImg />
          {phaseMap.map((v, i) => {
            return <BlockBlueImg src={v.image} alt="blockBlue" key={i} />;
          })}
        </PhaseMap>
        <Row>
          {infoDate.map((v, i) => {
            return (
              <Col xs={6} md={2} key={i} className="mt-2 mt-sm-0">
                <Date>{v.date}</Date>
                {v.info.map((text, index) => {
                  return (
                    <Text key={index}>
                      <span>{text}</span>
                    </Text>
                  );
                })}
              </Col>
            );
          })}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default RoadMap;
