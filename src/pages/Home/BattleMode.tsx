import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

import bgBattle from 'src/assests/imgBattle/bgBattle.webp';
import title from 'src/assests/imgBattle/title.webp';

const Wrapper = styled.section`
  position: relative;
`;

const BgBattle = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  @media screen and (min-width: 1320px) {
    .container {
      max-width: 1600px;
    }
  }
`;

const Detail = styled.div`
  width: 30%;
  padding-top: 100px;
  padding-left: 52px;
  @media screen and (max-width: 1024px) {
    padding-top: 50px;
    padding-left: 0;
  }
  @media screen and (max-width: 500px) {
    padding-top: 30px;
    padding-left: 0;
  }
`;

const ImgTitle = styled.img`
  width: 100%;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 900;
  line-height: 23px;
  padding: 0 7px;
  @media screen and (min-width: 1320px) {
    font-size: 30px;
    line-height: 30px;
    padding: 0 15px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 18px;
    line-height: 20px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 766px) {
    font-size: 10px;
    line-height: 16px;
  }
  @media screen and (max-width: 600px) {
    font-size: 8px;
    line-height: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 7px;
    line-height: 10px;
  }
`;

const BattleMode: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id}>
      <Wrapper>
        <BgBattle src={bgBattle} alt="bgBattle" />
        <Content>
          <Container>
            <Detail>
              <ImgTitle src={title} alt="titleImg" />
              <Text>
                Players choose a hero to join a bomb battle with many other
                players. Users have to pay a certain amount of tokens to
                participate in battle mode, the final winner will receive the
                entire loser’s token amount. Bomber Hero will also lose a
                certain amount of energy when participating in battle mode.
              </Text>
            </Detail>
          </Container>
        </Content>
      </Wrapper>
    </section>
  );
};

export default BattleMode;
