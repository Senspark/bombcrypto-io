import React from 'react';
import styled from 'styled-components';

import { notifications } from 'src/data/notification';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { defineText, useText } from 'src/i18n';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
} from 'src/theme/arcade';
import {
  ArcadeContainer,
  ArcadeSection,
  Reveal,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';

/*
 * Anúncios em cards: o mais recente de cada aba (News, Events, Features) vira
 * um card com a imagem da aba; o resto entra numa lista logo abaixo, do mais
 * novo para o mais velho. Os dados continuam em src/data/notification.ts.
 * (A versão antiga, com abas, segue em Notification.tsx.)
 */

const TAG_COLOR: Record<string, string> = {
  new: arcadeColors.yellow,
  event: arcadeColors.cyan,
  feature: '#FF7FA8',
};
const TEXT = defineText(
  {
    title: 'Announcements',
    sub: 'News, events and features from the BombCrypto team.',
    tags: { new: 'News', event: 'Event', feature: 'Feature' } as Record<
      string,
      string
    >,
  },
  {
    title: 'Anúncios',
    sub: 'Novidades, eventos e recursos do time do BombCrypto. Os artigos estão em inglês.',
    tags: { new: 'Novidade', event: 'Evento', feature: 'Recurso' } as Record<
      string,
      string
    >,
  },
);

/** "dd/mm/aa" → número comparável (aaaammdd). */
const dateKey = (d: string) => {
  const [dd, mm, yy] = d.split('/').map(Number);
  return (2000 + yy) * 10000 + mm * 100 + dd;
};

type Item = {
  des: string;
  date: string;
  href: string;
  kind: string;
  img?: string;
};

const all: Item[] = notifications.flatMap((tab) =>
  tab.content.map((c) => ({ ...c, kind: tab.eventKey, img: tab.img })),
);
const byDate = (a: Item, b: Item) => dateKey(b.date) - dateKey(a.date);
const featured = notifications
  .map((tab) => all.filter((x) => x.kind === tab.eventKey).sort(byDate)[0])
  .filter(Boolean);
const rest = all.filter((x) => !featured.includes(x)).sort(byDate);

const Cards = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 22px;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  text-decoration: none;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translate(-3px, -3px);
    box-shadow: ${hardShadow(11)};
  }
  &:active {
    transform: translate(4px, 4px);
    box-shadow: ${hardShadow(2)};
  }

  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    border-bottom: ${arcadeBorder.thick};
  }
`;

const Body = styled.div`
  display: grid;
  gap: 8px;
  padding: 16px 18px 18px;

  h3 {
    margin: 0;
    font-family: ${arcadeFonts.body};
    font-size: 18px;
    font-weight: bold;
    line-height: 1.3;
    color: ${arcadeColors.white};
  }
  time {
    font-size: 13px;
    color: ${arcadeColors.smoke};
    font-variant-numeric: tabular-nums;
  }
`;

const Tag = styled.span<{ $c: string }>`
  justify-self: start;
  font-family: ${arcadeFonts.display};
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.ink};
  background: ${({ $c }) => $c};
  border: 2px solid ${arcadeColors.ink};
  border-radius: ${arcadeRadius.pill};
  padding: 3px 10px;
`;

const More = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 28px;
  margin-top: 22px;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }

  a {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 11px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    font-size: 15px;
    color: ${arcadeColors.cloud};
    text-decoration: none;
    transition: color 0.15s ease;
  }
  a:hover {
    color: ${arcadeColors.yellow};
  }
  time {
    flex: 0 0 auto;
    font-size: 13px;
    color: ${arcadeColors.smoke};
    font-variant-numeric: tabular-nums;
  }
`;

const track = () => logTrackClickEventAnalytics('community_click');

const Announcements: React.FC<{ id: string }> = ({ id }) => {
  const t = useText(TEXT);
  return (
    <ArcadeSection id={id}>
      <ArcadeContainer>
        <Reveal>
          <SectionTitle>{t.title}</SectionTitle>
          <SectionSubtitle>{t.sub}</SectionSubtitle>
        </Reveal>
        <Cards>
          {featured.map((n, i) => (
            <Reveal key={n.href} delay={i * 100}>
              <Card
                href={n.href}
                target="_blank"
                rel="noreferrer"
                onClick={track}
              >
                {n.img && <img src={n.img} alt="" loading="lazy" />}
                <Body>
                  <Tag $c={TAG_COLOR[n.kind] ?? arcadeColors.yellow}>
                    {t.tags[n.kind] ?? n.kind}
                  </Tag>
                  <h3>{n.des}</h3>
                  <time>{n.date}</time>
                </Body>
              </Card>
            </Reveal>
          ))}
        </Cards>
        {rest.length > 0 && (
          <More>
            {rest.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                onClick={track}
              >
                <span>{n.des}</span>
                <time>{n.date}</time>
              </a>
            ))}
          </More>
        )}
      </ArcadeContainer>
    </ArcadeSection>
  );
};

export default Announcements;
