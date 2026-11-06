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
import { defineText, useLang, useText } from 'src/i18n';

const TEXT = defineText(
  {
    titleBefore: 'What is',
    desc1:
      'is the utility token built into the core game system that powers all game progress and developments.',
    desc2:
      'owners can earn rewards through in-game by playing the game, and participating in key governance votes.',
    stakingTitle: 'Staking',
    stakingHint: '(Q1/2022)',
    stakingDesc: [
      'Players will be able to stake their tokens',
      'to receive powerful VIP privileges and rewards.',
    ],
    currencyTitle: 'In-game currency',
    currencyItems: [
      '- Upgrade',
      '- Speed up the process of opening',
      'the hero box to withdraw tokens.',
      '- Fast charging of energy.',
      '- Tickets to events like battle royale, Boss',
      '- Create a clan',
    ],
  },
  {
    titleBefore: 'O que é',
    desc1:
      'é o token de utilidade que faz parte do sistema principal do jogo e movimenta todo o progresso e as novidades do jogo.',
    desc2:
      'Quem tem BCOIN pode ganhar recompensas jogando e votar nas decisões importantes do jogo.',
    stakingTitle: 'Stake',
    stakingHint: '(1º tri/2022)',
    stakingDesc: [
      'Os jogadores poderão fazer stake dos seus tokens',
      'para receber vantagens VIP e recompensas.',
    ],
    currencyTitle: 'Moeda do jogo',
    currencyItems: [
      '- Evoluir',
      '- Acelerar a abertura',
      'da caixa de heróis para sacar tokens.',
      '- Recarga rápida de energia.',
      '- Ingressos para eventos como battle royale e Boss',
      '- Criar um clã',
    ],
  },
);

/** Linhas separadas por <br /> (mantém a quebra do layout original). */
const Lines: React.FC<{ lines: string[]; trailingBreak?: boolean }> = ({
  lines,
  trailingBreak,
}) => (
  <>
    {lines.map((line, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {line}
      </React.Fragment>
    ))}
    {trailingBreak && <br />}
  </>
);

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
  const { lang } = useLang();
  const t = useText(TEXT);
  return (
    <section id={id}>
      <SectionWrapper>
        <Container className="container">
          <Title>
            {t.titleBefore} <span className="marked-yellow">BCOIN?</span>
          </Title>
          <Description>
            <strong>BCOIN</strong> {t.desc1}
            <br />
            {/* em português a frase já começa com "Quem tem BCOIN" */}
            {lang === 'en' && <strong>BCOIN</strong>}
            {lang === 'en' ? ' ' : ''}
            {t.desc2}
          </Description>
          <Reveal>
            <MetaWrapper className="row d-flex justify-content-center">
              <MetaItem className="col-4">
                <MetaImage src={starking} alt="" />
                <MetaTitle>
                  <p>{t.stakingTitle}</p>
                  <p className="hint">{t.stakingHint}</p>
                </MetaTitle>
                <MetaDesc>
                  <Lines lines={t.stakingDesc} />
                </MetaDesc>
              </MetaItem>
              <MetaItem className="col-4">
                <MetaImage src={hand} alt="" />
                <MetaTitle>
                  <p>{t.currencyTitle}</p>
                </MetaTitle>
                <MetaDesc className="text-start">
                  <Lines lines={t.currencyItems} trailingBreak />
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
