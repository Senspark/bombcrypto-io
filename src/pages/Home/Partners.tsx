import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

import bgPartner from 'src/assests/imgPartner/bgPartner.png';
import { Partner } from 'src/data/partners';

const Wrapper = styled.section`
  background: url(${bgPartner}) no-repeat center;
  background-position: center;
  background-size: cover;
  padding: 15px 0;
  .col-other {
    &:nth-child(13) {
      img {
        padding: 0 40px !important;
        @media screen and (max-width: 998px) {
          padding: 0 20px !important;
        }
        @media screen and (max-width: 700px) {
          padding: 0 10px !important;
        }
      }
    }
    @media screen and (min-width: 600px) {
      flex: 0 0 20%;
    }
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  font-size: 50px;
  font-weight: 550;
  color: white;
  text-transform: uppercase;
  @media screen and (max-width: 1000px) {
    font-size: 30px;
  }
`;

const ImgIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const Partners: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <Container>
        <Title>Investors & Partners</Title>
        <Row className="justify-content-center align-items-center">
          {Partner.map((v, i) => {
            return (
              <Col xs={6} key={i} className="col-other px-4 py-4 my-2">
                <ImgIcon src={v.image} alt="iconPartner" />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Partners;
