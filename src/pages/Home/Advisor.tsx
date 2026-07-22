import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import bg from 'src/assests/updateCoreTeam/bg.jpg';
import imgTitle from 'src/assests/updateCoreTeam/imgTitle.webp';
import advisorTitle from 'src/assests/updateCoreTeam/advisorTitle.webp';
import { advisor, coreTeam } from 'src/data/coreTeamUpdate';

const Wrapper = styled.section`
  background: url(${bg}) no-repeat center;
  background-size: cover;
  padding: 80px 0;
  .col-sm-3 {
    &:nth-child(4) {
      img {
        width: 82%;
      }
    }
    &:nth-child(6) {
      img {
        width: 75%;
      }
    }
    &:nth-child(7) {
      img {
        width: 75%;
      }
    }
  }
  .col-4 {
    @media screen and (max-width: 500px) {
      &:nth-child(1) {
        width: 100% !important;
        text-align: center;
        img {
          width: 20%;
        }
        a {
          width: 100%;
        }
      }
    }
  }
`;

const ImgCoreTeam = styled.img`
  width: 60%;
  height: auto;
`;

const Linkedin = styled.a`
  display: block;
  text-align: center;
  color: rgb(0, 122, 255);
  margin-bottom: 10px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    font-size: 8px;
  }
`;

const LinkedinAdvisor = styled.a`
  display: block;
  text-align: center;
  width: 75%;
  color: rgb(0, 122, 255);
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    font-size: 8px;
  }
`;

const Advisor: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <img src={imgTitle} alt="imgCoreTeam" className="w-100" />
      <Container>
        <Row className="justify-content-center my-4">
          {coreTeam.map((v, i) => {
            return (
              <Col key={i} xs={4} sm={3} className="text-center">
                <ImgCoreTeam src={v.image} alt="imgCoreTeam" />
                <Linkedin href={v.href} target={v.target}>
                  {v.label ? v.label : `Linkedin >>`}
                </Linkedin>
              </Col>
            );
          })}
        </Row>
      </Container>
      <img src={advisorTitle} alt="advisorImg" className="w-100" />
      <Container>
        <Row className="justify-content-around mt-4">
          {advisor.map((v, i) => {
            return (
              <Col key={i} xs={3}>
                <ImgCoreTeam src={v.image} alt="imgCoreTeam" className="w-75" />
                <LinkedinAdvisor
                  href={v.href}
                  target={v.target}
                >{`Linkedin >>`}</LinkedinAdvisor>
              </Col>
            );
          })}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Advisor;
