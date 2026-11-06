import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import logo from 'src/assests/event/worldCup/logo.png';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  breakpoint,
} from 'src/theme/arcade';
import { ArcadeContainer } from 'src/components/ui';
import { spriteDataUrl } from 'src/game/atlas';
import { defineText, useText } from 'src/i18n';

const TEXT = defineText(
  {
    tagline:
      'Plant bombs, explore the map and earn rewards playing BombCrypto.',
    game: 'Game',
    home: 'Home',
    play: 'Play Now',
    metaverse: 'Metaverse',
    resources: 'Resources',
    whitepaper: 'Whitepaper',
    database: 'Database',
    mediaKit: 'Media Kit',
    guide: 'Guide',
    legal: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms Of Service',
    rights: 'All rights reserved.',
  },
  {
    tagline:
      'Plante bombas, explore o mapa e ganhe recompensas jogando BombCrypto.',
    game: 'Jogo',
    home: 'Início',
    play: 'Jogar agora',
    metaverse: 'Metaverso',
    resources: 'Recursos',
    whitepaper: 'Whitepaper',
    database: 'Banco de dados',
    mediaKit: 'Kit de mídia',
    guide: 'Guia',
    legal: 'Legal',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    rights: 'Todos os direitos reservados.',
  },
);

/* Muro do templo que cerca o mapa do jogo (BorderBG1), repetido na largura. */
const Wall = styled.div<{ $src: string }>`
  height: 64px;
  background-color: #5d6b4a;
  background-image: ${({ $src }) => ($src ? `url(${$src})` : 'none')};
  background-repeat: repeat-x;
  background-size: auto 64px;
  image-rendering: pixelated;
  border-top: ${arcadeBorder.thick};
  border-bottom: ${arcadeBorder.thick};

  @media ${breakpoint.sm} {
    height: 44px;
    background-size: auto 44px;
  }
`;

function useTempleWall() {
  const [src, setSrc] = useState('');
  useEffect(() => {
    let alive = true;
    spriteDataUrl('t0_border_top').then((u) => alive && setSrc(u));
    return () => {
      alive = false;
    };
  }, []);
  return src;
}

const Wrapper = styled.footer`
  background: ${arcadeColors.nightDeep};
  color: ${arcadeColors.cloud};
  font-family: ${arcadeFonts.body};
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  gap: 48px;
  padding: 56px 0 40px;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
    gap: 32px;
    padding: 40px 0 28px;
    text-align: center;
  }
`;

const LogoFooterImg = styled.img`
  width: 180px;
  cursor: pointer;

  @media ${breakpoint.md} {
    margin: 0 auto;
  }
`;

const Tagline = styled.p`
  margin-top: 16px;
  font-size: 15px;
  line-height: 1.6;
  color: ${arcadeColors.smoke};
  max-width: 320px;

  @media ${breakpoint.md} {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media ${breakpoint.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ColumnTitle = styled.h3`
  font-family: ${arcadeFonts.display};
  font-size: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.yellow};
  margin-bottom: 16px;
`;

const linkStyles = `
  display: block;
  font-size: 16px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.75);
  cursor: pointer;
  text-decoration: none;
  transition: color 0.15s ease;

  &:hover {
    color: ${arcadeColors.yellow};
    text-decoration: none;
  }
`;

const Text = styled.a`
  ${linkStyles}
`;

const LinkText = styled(Link)`
  ${linkStyles}
`;

const Bottom = styled.div`
  border-top: ${arcadeBorder.thin};
  padding: 20px 0;
  font-size: 14px;
  color: ${arcadeColors.smoke};
  text-align: center;
`;

const Footer: React.FC<{ id: string }> = ({ id }) => {
  const wall = useTempleWall();
  const t = useText(TEXT);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper id={id}>
      <Wall $src={wall} aria-hidden="true" />
      <ArcadeContainer>
        <Inner>
          <div>
            <LogoFooterImg onClick={scrollToTop} src={logo} alt="logo footer" />
            <Tagline>{t.tagline}</Tagline>
          </div>

          <Columns>
            <div>
              <ColumnTitle>{t.game}</ColumnTitle>
              <Text onClick={scrollToTop}>{t.home}</Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://game.bombcrypto.io/"
                onClick={() => logTrackClickEventAnalytics('play_click')}
              >
                {t.play}
              </Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://senspark.com/"
                onClick={() => logTrackClickEventAnalytics('Metaverse_click')}
              >
                {t.metaverse}
              </Text>
            </div>

            <div>
              <ColumnTitle>{t.resources}</ColumnTitle>
              <Text
                as="a"
                target={'_blank'}
                href="https://whitepaper.bombcrypto.io/"
                onClick={() => logTrackClickEventAnalytics('whiterpaper_click')}
              >
                {t.whitepaper}
              </Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://database.bombcrypto.io/index.html"
                onClick={() => logTrackClickEventAnalytics('database_click')}
              >
                {t.database}
              </Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://bombcrypto.substack.com/p/bomb-cryptosenspark-media-kit"
                onClick={() => logTrackClickEventAnalytics('mediakit_click')}
              >
                {t.mediaKit}
              </Text>
              <LinkText to="/guide" onClick={scrollToTop}>
                {t.guide}
              </LinkText>
            </div>

            <div>
              <ColumnTitle>{t.legal}</ColumnTitle>
              <LinkText to="/privacy-policy" onClick={scrollToTop}>
                {t.privacy}
              </LinkText>
              <LinkText to="/term-of-service" onClick={scrollToTop}>
                {t.terms}
              </LinkText>
            </div>
          </Columns>
        </Inner>
      </ArcadeContainer>
      <Bottom>
        © {new Date().getFullYear()} BombCrypto — Senspark. {t.rights}
      </Bottom>
    </Wrapper>
  );
};

export default Footer;
