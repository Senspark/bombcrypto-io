import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import titleImg from 'src/assests/imgBuild/titleImg.webp';
import house from 'src/assests/imgBuild/house.png';
import bgBuild from 'src/assests/imgBuild/bgBuild.webp';

const Wrapper = styled.section`
  position: relative;
  padding: 200px 0;
  background: url(${bgBuild}) no-repeat center;
  background-position: center;
  background-size: cover;
`;

const ImgTitle = styled.img`
  padding: 20px 220px 20px 0;
  width: 100%;
  @media (min-width: 1200px) {
    padding-right: 350px;
  }
  @media (max-width: 990px) {
    padding-right: 0px;
  }
  @media (max-width: 500px) {
    width: 80%;
  }
`;

const ImgHouse = styled.img`
  width: 100%;
`;

const Text = styled.p`
  color: rgb(255 255 255/88%);
  font-size: 25px;
  line-height: 1.3;
  font-family: barlow condense, sans-serif;
  padding-right: 100px;
  @media (min-width: 1200px) {
    padding-right: 170px;
  }
  @media (max-width: 990px) {
    padding-right: 20px;
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

const BuildHouse: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <Container>
        <Row>
          <Col sm={6}>
            <div>
              <ImgTitle src={titleImg} alt="titleImg" />
              <Text>
                Build a house for a bomber hero by hunting and placing
                decorative items for the room, the room has the function of
                storing the bomber hero and charging energy.
              </Text>
            </div>
          </Col>
          <Col sm={6}>
            <ImgHouse src={house} alt="houseImg" />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default BuildHouse;
