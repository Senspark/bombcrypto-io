import React from 'react';
import styled from 'styled-components';

import bgWhatIs from 'src/assests/bcoin/bg-2.png';
import starking from 'src/assests/bcoin/starking.png';
import hand from 'src/assests/bcoin/hand.png';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
  pixelTextShadow,
} from 'src/theme/arcade';
import { Reveal } from 'src/components/ui';

const SectionWrapper = styled.section`
  width: 100%;
  background: linear-gradient(
      180deg,
      rgba(14, 17, 48, 0.92) 0%,
      rgba(8, 10, 31, 0.94) 100%
    ),
    url(${bgWhatIs}) no-repeat center;
  background-size: cover;
  font-family: ${arcadeFonts.body};
  color: ${arcadeColors.cloud};
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Title = styled.div`
  font-family: ${arcadeFonts.display};
  font-size: 30px;
  text-align: center;
  color: ${arcadeColors.white};
  text-shadow: ${pixelTextShadow()};
  margin-bottom: 16px;

  .marked-yellow {
    color: ${arcadeColors.yellow};
  }

  @media screen and (max-width: 767px) {
    font-size: 22px;
  }
`;

const Description = styled.div`
  text-align: center;
  font-size: 16px;
  line-height: 1.7;
  color: ${arcadeColors.smoke};
  max-width: 780px;
  margin: 0 auto;
`;

const MetaWrapper = styled.div`
  margin-top: 40px;
  text-align: center;
`;

/** Cada bloco vira um card com borda grossa. */
const MetaItem = styled.div`
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(6)};
  padding: 24px 20px;
  margin: 0 12px 24px;
`;

const MetaImage = styled.img`
  width: 60px;
  height: 60px;
`;

/* div, não p: este bloco contém <p> dentro — <p> aninhado é HTML inválido e
   o navegador reestrutura a marcação, quebrando a hidratação */
const MetaTitle = styled.div`
  font-family: ${arcadeFonts.display};
  font-size: 17px;
  letter-spacing: 1px;
  color: ${arcadeColors.white};
  margin: 12px 0;

  p {
    margin: 0;
  }
  p.hint {
    font-size: 13px;
    color: ${arcadeColors.yellow};
  }
`;

const MetaDesc = styled.p`
  font-size: 15px;
  line-height: 1.7;
  color: ${arcadeColors.smoke};
  margin: 0;
`;

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
          <Reveal>
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
          </Reveal>
        </Container>
      </SectionWrapper>
    </section>
  );
};

export default WhatIsBcoin;
