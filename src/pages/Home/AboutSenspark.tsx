import React from 'react';
import styled from 'styled-components';
import { game, summary } from '../../data/aboutSenspark';

const Container = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Title = styled.p`
  color: var(--color-white);
  text-align: center;
  font-family: bungee, serif;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 45px;
  margin-bottom: 50px;
  @media (max-width: 576px) {
    font-size: 25px;
  }
`;

const Wrapper = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  @media (max-width: 576px) {
    width: 100%;
    flex-direction: column;
  }
`;

const SummaryWrapper = styled.div`
  padding: 0;
`;

const SummaryTitle = styled.div`
  background: var(--color-pink);
  color: var(--color-white);
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  font-family: barlow condensed, sans-serif !important;
`;

const SummaryDesc = styled.div`
  font-size: 90px;
  font-weight: 700;
  text-align: center;
  color: #fc0;
  font-family: barlow condensed, sans-serif !important;
`;

const GameWrapper = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
`;

const TopGameHeader = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 40px;
  background: var(--color-pink);
  color: var(--color-white);
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  font-family: barlow condensed, sans-serif !important;
`;

const TopGameWrapper = styled.div`
  padding: 0;
`;

const GameImage = styled.img`
  padding: 0;
  width: 100%;
  margin-bottom: 1em;
`;

const GameTitle = styled.div`
  text-align: center;
  color: var(--color-white);
  font-size: 20px;
  font-weight: 700;
  font-family: barlow condensed, sans-serif !important;
`;

const GameDesc = styled.div`
  text-align: center;
  color: var(--color-white);
  font-size: 18px;
  font-weight: 400;
  font-family: barlow condensed, sans-serif !important;
`;

const GameDownload = styled.div`
  text-align: center;
  color: var(--color-white);
  font-size: 25px;
  font-weight: 700;
  font-family: barlow condensed, sans-serif !important;
`;

const AboutSenspark: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id}>
      <Container className="container">
        <Title>ABOUT SENSPARK</Title>
        <Wrapper className="row">
          {summary.map((item, index) => {
            return (
              <SummaryWrapper className="col-sm-2 col-6" key={index}>
                <SummaryTitle>{item.title}</SummaryTitle>
                <SummaryDesc>{item.desc}</SummaryDesc>
              </SummaryWrapper>
            );
          })}
        </Wrapper>
        <GameWrapper className="row">
          <TopGameHeader>Top Game</TopGameHeader>
          {game.map((item, index) => {
            return (
              <TopGameWrapper className="col-sm-2 col-5" key={index}>
                <GameImage src={item.image} />
                <GameTitle>{item.title}</GameTitle>
                <GameDesc>{item.desc}</GameDesc>
                <GameDownload>{item.download}</GameDownload>
              </TopGameWrapper>
            );
          })}
        </GameWrapper>
      </Container>
    </section>
  );
};

export default AboutSenspark;
