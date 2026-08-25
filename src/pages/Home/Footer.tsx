import React from 'react';
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
import { ArcadeContainer, BrickDivider } from 'src/components/ui';

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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Wrapper id={id}>
      <BrickDivider />
      <ArcadeContainer>
        <Inner>
          <div>
            <LogoFooterImg onClick={scrollToTop} src={logo} alt="logo footer" />
            <Tagline>
              Plant bombs, explore the map and earn rewards playing BombCrypto.
            </Tagline>
          </div>

          <Columns>
            <div>
              <ColumnTitle>Game</ColumnTitle>
              <Text onClick={scrollToTop}>Home</Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://game.bombcrypto.io/"
                onClick={() => logTrackClickEventAnalytics('play_click')}
              >
                Play Now
              </Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://senspark.com/"
                onClick={() => logTrackClickEventAnalytics('Metaverse_click')}
              >
                Metaverse
              </Text>
            </div>

            <div>
              <ColumnTitle>Resources</ColumnTitle>
              <Text
                as="a"
                target={'_blank'}
                href="https://whitepaper.bombcrypto.io/"
                onClick={() => logTrackClickEventAnalytics('whiterpaper_click')}
              >
                Whitepaper
              </Text>
              <Text
                as="a"
                target={'_blank'}
                href="https://bombcrypto.substack.com/p/bomb-cryptosenspark-media-kit"
                onClick={() => logTrackClickEventAnalytics('mediakit_click')}
              >
                Media Kit
              </Text>
              <LinkText to="/guide" onClick={scrollToTop}>
                Guide
              </LinkText>
            </div>

            <div>
              <ColumnTitle>Legal</ColumnTitle>
              <LinkText to="/privacy-policy" onClick={scrollToTop}>
                Privacy Policy
              </LinkText>
              <LinkText to="/term-of-service" onClick={scrollToTop}>
                Terms Of Service
              </LinkText>
            </div>
          </Columns>
        </Inner>
      </ArcadeContainer>
      <Bottom>
        © {new Date().getFullYear()} BombCrypto — Senspark. All rights reserved.
      </Bottom>
    </Wrapper>
  );
};

export default Footer;
