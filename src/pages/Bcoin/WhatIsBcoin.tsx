import React from 'react';
import styled from 'styled-components';

import bgWhatIs from 'src/assests/bcoin/bg-2.png';
import starking from 'src/assests/bcoin/starking.png';
import hand from 'src/assests/bcoin/hand.png';

const SectionWrapper = styled.section`
  width: 100%;
  background: url(${bgWhatIs}) no-repeat center;
  background-size: cover;
  font-family: 'Montserrat', sans-serif;
  color: white;
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Title = styled.div`
  font-size: 33px;
  text-align: center;
  .marked-yellow {
    color: #ffea00;
  }
`;

const Description = styled.div`
  text-align: center;
  font-size: 15px;
`;

const MetaWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const MetaItem = styled.div`
  &:nth-child(1) {
    margin-right: 40px;
  }
`;

const MetaImage = styled.img`
  width: 60px;
  height: 60px;
`;

const MetaTitle = styled.p`
  font-size: 19px;
  font-weight: 500;
  p {
    margin: 0;
  }
  p.hint {
    font-size: 16px;
    color: #ffea00;
  }
`;
const MetaDesc = styled.p``;

const WhatIsBcoin: React.FC<{ id: string }> = ({ id }) => {
  return (
    <section id={id}>
      <SectionWrapper>
        <Container className="container">
          <Title>
            What is <span className="marked-yellow">BCOIN?</span>
          </Title>
          <Description>
            <strong>BCOIN</strong> is the utility token built into the core game
            system that powers all game progress and developments.
            <br />
            <strong>BCOIN</strong> owners can earn rewards through in-game by
            playing the game, and participating in key governance votes.
          </Description>
          <MetaWrapper className="row d-flex justify-content-center">
            <MetaItem className="col-4">
              <MetaImage src={starking} />
              <MetaTitle>
                <p>Staking</p>
                <p className="hint">(Q1/2022)</p>
              </MetaTitle>
              <MetaDesc>
                Players will be able to stake their tokens <br />
                to receive powerful VIP privileges and rewards.
              </MetaDesc>
            </MetaItem>
            <MetaItem className="col-4">
              <MetaImage src={hand} />
              <MetaTitle>
                <p>In-game currency</p>
              </MetaTitle>
              <MetaDesc className="text-start">
                - Upgrade
                <br />
                - Speed up the process of opening
                <br />
                the hero box to withdraw tokens.
                <br />
                - Fast charging of energy.
                <br />
                - Tickets to events like battle royale, Boss
                <br />
                - Create a clan
                <br />
              </MetaDesc>
            </MetaItem>
          </MetaWrapper>
        </Container>
      </SectionWrapper>
    </section>
  );
};

export default WhatIsBcoin;
