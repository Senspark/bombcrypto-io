import React from 'react';
import styled from 'styled-components';

import bombercityLogo from 'src/assests/community/bombercity.webp';
import bombanalyticsLogo from 'src/assests/community/bombanalytics.webp';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { defineText, Lang, useLang, useText } from 'src/i18n';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
} from 'src/theme/arcade';
import {
  ArcadeBadge,
  ArcadeButton,
  ArcadeContainer,
  ArcadeSection,
  Reveal,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';

/*
 * Vitrine de projetos feitos pela comunidade. Para incluir um novo, basta
 * acrescentar um item em COMMUNITY_TOOLS — o layout se ajusta sozinho.
 */

type Tone = 'yellow' | 'blue' | 'green' | 'red' | 'purple';

type ToolText = {
  tagline: string;
  description: string;
  features: string[];
  tags: string[];
};

type CommunityTool = {
  name: string;
  url: string;
  domain: string;
  logo: string;
  text: Record<Lang, ToolText>;
  tone: Tone;
  accent: string;
};

const COMMUNITY_TOOLS: CommunityTool[] = [
  {
    name: 'BomberCity',
    url: 'https://www.bombercity.com',
    domain: 'bombercity.com',
    logo: bombercityLogo,
    text: defineText(
      {
        tagline: 'Your whole farm on one screen',
        description:
          'A desktop dashboard for BombCrypto players: follow every account in real time, watch the live map and get alerts on your phone.',
        features: [
          'Multiple accounts side by side',
          'Live Treasure Hunt map and earnings per hour',
          'Telegram alerts and commands',
          'Windows, macOS, Linux and 24/7 server version',
        ],
        tags: ['Desktop app', 'Free'],
      },
      {
        tagline: 'Seu farm inteiro numa tela só',
        description:
          'Um painel para computador feito para quem joga BombCrypto: acompanhe todas as contas em tempo real, veja o mapa ao vivo e receba avisos no celular.',
        features: [
          'Várias contas lado a lado',
          'Mapa do Treasure Hunt ao vivo e ganhos por hora',
          'Avisos e comandos pelo Telegram',
          'Windows, macOS, Linux e versão de servidor 24h',
        ],
        tags: ['App para PC', 'Grátis'],
      },
    ),
    tone: 'yellow',
    accent: arcadeColors.yellow,
  },
  {
    name: 'BombAnalytics',
    url: 'https://bombanalytics.com',
    domain: 'bombanalytics.com',
    logo: bombanalyticsLogo,
    text: defineText(
      {
        tagline: 'On-chain insights, all in one place',
        description:
          'An analytics dashboard built on public BNB Chain and Polygon data, with context to help you make better in-game decisions.',
        features: [
          'BCOIN and SEN prices on both chains',
          'Stake rankings, claims and reward pools',
          'Marketplace listings and recent sales',
          'Hero supply, burns and rarity charts',
        ],
        tags: ['Web', 'On-chain data'],
      },
      {
        tagline: 'Dados on-chain, tudo num lugar só',
        description:
          'Um painel de análise feito com os dados públicos da BNB Chain e da Polygon, com explicações para ajudar você a decidir melhor no jogo.',
        features: [
          'Preços de BCOIN e SEN nas duas redes',
          'Ranking de stake, saques e pools de recompensa',
          'Anúncios e vendas recentes do Marketplace',
          'Gráficos de heróis existentes, queimados e por raridade',
        ],
        tags: ['Web', 'Dados on-chain'],
      },
    ),
    tone: 'blue',
    accent: arcadeColors.cyan,
  },
];

const TEXT = defineText(
  {
    badge: '★ Made by players',
    title: 'Community Tools',
    sub: 'The BombCrypto community builds amazing things. Here are some tools made by players, for players — take a look and level up your game.',
    logo: (name: string) => `${name} logo`,
    visit: (domain: string) => `Visit ${domain} ↗`,
    note: 'Community projects are made and run independently by players — they are not operated by the BombCrypto team. Never share your seed phrase or private key with anyone. Built something for the community? Show us on',
  },
  {
    badge: '★ Feito por jogadores',
    title: 'Ferramentas da comunidade',
    sub: 'A comunidade do BombCrypto cria coisas incríveis. Aqui estão algumas ferramentas feitas por jogadores, para jogadores. Dê uma olhada e melhore seu jogo.',
    logo: (name: string) => `Logo do ${name}`,
    visit: (domain: string) => `Visitar ${domain} ↗`,
    note: 'Os projetos da comunidade são feitos e mantidos de forma independente por jogadores, não pelo time do BombCrypto. Nunca passe sua frase de recuperação (seed) ou chave privada para ninguém. Fez algo para a comunidade? Mostre para a gente no',
  },
);

const Section = styled(ArcadeSection)`
  overflow: hidden;
  background: radial-gradient(
      ellipse 70% 60% at 50% 0%,
      rgba(123, 47, 247, 0.28),
      transparent 70%
    ),
    ${arcadeColors.nightDeep};
`;

const Head = styled.div`
  text-align: center;
  margin-bottom: 44px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const Card = styled.a<{ $accent: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${arcadeColors.cloud};
  text-decoration: none;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  overflow: hidden;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    color: ${arcadeColors.cloud};
    transform: translate(-3px, -3px);
    box-shadow: ${hardShadow(11)};
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: ${hardShadow(2)};
  }

  &:focus-visible {
    outline: 3px solid ${({ $accent }) => $accent};
    outline-offset: 4px;
  }
`;

const Banner = styled.div<{ $accent: string }>`
  position: relative;
  display: grid;
  place-items: center;
  height: 210px;
  border-bottom: ${arcadeBorder.thick};
  background-color: ${arcadeColors.night};
  background-image: radial-gradient(
      circle at 50% 60%,
      ${({ $accent }) => $accent}55,
      transparent 62%
    ),
    linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px);
  background-size: 100% 100%, 24px 24px, 24px 24px;

  img {
    height: 170px;
    width: auto;
    max-width: 80%;
    object-fit: contain;
    filter: drop-shadow(4px 4px 0 ${arcadeColors.ink});
    transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.06) rotate(-2deg);
  }

  @media ${breakpoint.sm} {
    height: 150px;
    img {
      height: 115px;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  margin-top: 14px;
  gap: 8px;
  flex-wrap: wrap;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 24px 26px 26px;

  @media ${breakpoint.sm} {
    padding: 18px;
  }
`;

const Name = styled.h3<{ $accent: string }>`
  font-family: ${arcadeFonts.display};
  font-size: 28px;
  line-height: 1.1;
  margin: 0 0 4px;
  color: ${({ $accent }) => $accent};
  text-shadow: 3px 3px 0 ${arcadeColors.ink};
`;

const Domain = styled.span`
  font-family: ${arcadeFonts.display};
  font-size: 13px;
  letter-spacing: 1px;
  color: ${arcadeColors.smoke};
`;

const Tagline = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${arcadeColors.white};
  margin: 16px 0 8px;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${arcadeColors.smoke};
  margin: 0 0 18px;
`;

const Features = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px;
  display: grid;
  gap: 10px;

  li {
    display: flex;
    align-items: baseline;
    gap: 10px;
    font-size: 15px;
    color: ${arcadeColors.cloud};
  }
`;

const Bullet = styled.span<{ $accent: string }>`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  background: ${({ $accent }) => $accent};
  border: 2px solid ${arcadeColors.ink};
  transform: translateY(1px) rotate(45deg);
`;

const Cta = styled(ArcadeButton)`
  margin-top: auto;
  align-self: flex-start;

  @media ${breakpoint.sm} {
    align-self: stretch;
  }
`;

const Note = styled.p`
  margin: 36px auto 0;
  max-width: 720px;
  text-align: center;
  font-size: 13px;
  line-height: 1.6;
  color: ${arcadeColors.smoke};

  a {
    color: ${arcadeColors.yellow};
  }
`;

const Community: React.FC<{ id: string }> = ({ id }) => {
  const t = useText(TEXT);
  const { lang } = useLang();
  return (
    <Section id={id}>
      <ArcadeContainer>
        <Reveal>
          <Head>
            <ArcadeBadge $tone="purple" style={{ marginBottom: 18 }}>
              {t.badge}
            </ArcadeBadge>
            <SectionTitle $center>{t.title}</SectionTitle>
            <SectionSubtitle $center>{t.sub}</SectionSubtitle>
          </Head>
        </Reveal>

        <Grid>
          {COMMUNITY_TOOLS.map((tool, i) => (
            <Reveal key={tool.name} delay={i * 120}>
              <Card
                href={tool.url}
                target="_blank"
                rel="noopener"
                $accent={tool.accent}
                onClick={() =>
                  logTrackClickEventAnalytics(
                    `community_${tool.name.toLowerCase()}_click`,
                  )
                }
              >
                <Banner $accent={tool.accent}>
                  <img src={tool.logo} alt={t.logo(tool.name)} loading="lazy" />
                </Banner>
                <Body>
                  <Name $accent={tool.accent}>{tool.name}</Name>
                  <Domain>{tool.domain}</Domain>
                  <Tags>
                    {tool.text[lang].tags.map((tag) => (
                      <ArcadeBadge key={tag} $tone="dark">
                        {tag}
                      </ArcadeBadge>
                    ))}
                  </Tags>
                  <Tagline>{tool.text[lang].tagline}</Tagline>
                  <Description>{tool.text[lang].description}</Description>
                  <Features>
                    {tool.text[lang].features.map((f) => (
                      <li key={f}>
                        <Bullet $accent={tool.accent} />
                        {f}
                      </li>
                    ))}
                  </Features>
                  <Cta as="span" $tone={tool.tone}>
                    {t.visit(tool.domain)}
                  </Cta>
                </Body>
              </Card>
            </Reveal>
          ))}
        </Grid>

        <Note>
          {t.note}{' '}
          <a
            href="https://discord.gg/wG75cP9TRh"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
          .
        </Note>
      </ArcadeContainer>
    </Section>
  );
};

export default Community;
