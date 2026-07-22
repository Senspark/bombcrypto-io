import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import {
  data,
  data2,
  data3,
  data4,
  data5,
  // data6,
  PersonalData,
} from 'src/data/coreTeam';
import NextArrowIcon from 'src/assests/coreTeam/arrow-right.png';
import PrevArrowIcon from 'src/assests/coreTeam/arrow-left.png';

const PersonalWrapper = styled.div`
  display: inline-flex;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  margin-top: 20px;
  &:nth-child(1) {
    margin-top: 0;
  }
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
`;

const Information = styled.div`
  margin-left: 20px;
`;

const Name = styled.p`
  color: var(--color-yellow);
  font-weight: 900;
  font-size: 35px;
  margin: 0;
`;

const Position = styled.p`
  color: var(--color-white);
  font-size: 20px;
  font-family: 'Arial', serif;
  margin: 0 0 10px 0;
`;

const Quote = styled.p`
  color: var(--color-white);
  font-size: 14px;
  line-height: 18px;
  font-family: 'Arial', serif;
  margin: 0;
  &:before {
    content: '“';
    font-size: 20px;
  }
  &:after {
    content: '”';
    font-size: 20px;
  }
`;

const Reward = styled.p`
  color: var(--color-white);
  font-size: 14px;
  line-height: 18px;
  font-family: 'Arial', serif;
  margin: 0;
`;

const PersonalInfo: React.FC<PersonalData> = (props) => {
  return (
    <PersonalWrapper>
      <Avatar src={props.avatar} />
      <Information>
        <Name>{props.name}</Name>
        <Position>{props.position}</Position>
        <Quote>{props.quote}</Quote>
        <Reward dangerouslySetInnerHTML={{ __html: props.reward }} />
      </Information>
    </PersonalWrapper>
  );
};

const PrevArrow = (props) => {
  return (
    <img {...props} style={{ width: 40, height: 40 }} src={PrevArrowIcon} />
  );
};

const NextArrow = (props) => {
  return (
    <img {...props} style={{ width: 40, height: 40 }} src={NextArrowIcon} />
  );
};

const CoreTeamSlider = () => {
  const settings = {
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <div>
      <Slider {...settings}>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-6 col-12 ps-sm-5">
            <PersonalInfo {...data[0]} />
            <PersonalInfo {...data[1]} />
          </div>
          <div className="col-sm-6 col-12 pe-sm-4 d-flex flex-column justify-content-start">
            <PersonalInfo {...data2[0]} />
            <PersonalInfo {...data2[1]} />
          </div>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-6 col-12 ps-sm-5">
            <PersonalInfo {...data3[0]} />
            <PersonalInfo {...data3[1]} />
          </div>
          <div className="col-sm-6 col-12 pe-sm-4 d-flex flex-column justify-content-start">
            <PersonalInfo {...data4[0]} />
            <PersonalInfo {...data4[1]} />
          </div>
        </div>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-6 col-12 ps-sm-5">
            <PersonalInfo {...data5[0]} />
            <PersonalInfo {...data5[1]} />
          </div>
          <div className="col-sm-6 col-12 pe-sm-4 d-flex flex-column justify-content-start">
            {/*<PersonalInfo {...data6[0]} />*/}
          </div>
        </div>
      </Slider>
    </div>
  );
};

const Container = styled.div`
  padding-bottom: 20px;
`;

const Title = styled.p`
  color: var(--color-white);
  font-weight: 900;
  font-size: 50px;
  padding-top: 10px;
  text-align: center;
  margin: 0;
`;

const CoreTeam: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id}>
      <Container className="container">
        <Title>CORE TEAM</Title>
        <CoreTeamSlider />
      </Container>
    </section>
  );
};

export default CoreTeam;
