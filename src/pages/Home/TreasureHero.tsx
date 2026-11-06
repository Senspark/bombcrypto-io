import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import logo from 'src/assests/event/worldCup/logo.png';
import { spriteStyle } from 'src/game/atlas';
import { createTreasureMap, TreasureHud } from 'src/game/treasureMap';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { defineText, useText } from 'src/i18n';

const TEXT = defineText(
  {
    region: 'Live Treasure Hunt map',
    canvas: 'Animated Treasure Hunt map. Click it to drop a bomb.',
    title: 'Plant bombs. Break chests.',
    titleEm: 'Earn BCOIN.',
    sub: 'The pixel Bomberman where your heroes farm on their own. Watch them work, then drop a bomb yourself.',
    play: 'Play now',
    heroes: 'Meet the heroes',
    chests: 'chests',
    tap: 'Tap the map to drop a bomb',
    click: 'Click the map to drop a bomb',
  },
  {
    region: 'Mapa do Treasure Hunt ao vivo',
    canvas: 'Mapa animado do Treasure Hunt. Clique nele para soltar uma bomba.',
    title: 'Plante bombas. Quebre baús.',
    titleEm: 'Ganhe BCOIN.',
    sub: 'O Bomberman em pixel art em que seus heróis farmam sozinhos. Veja eles trabalhando e depois solte uma bomba você também.',
    play: 'Jogar agora',
    heroes: 'Conheça os heróis',
    chests: 'baús',
    tap: 'Toque no mapa para soltar uma bomba',
    click: 'Clique no mapa para soltar uma bomba',
  },
);
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
  pixelTextShadow,
} from 'src/theme/arcade';
import { ArcadeButton } from 'src/components/ui';

/*
 * Topo da home: o mapa do Treasure Hunt rodando de fundo (src/game/treasureMap)
 * com o logo, a frase e os botões por cima. Clicar numa casa livre do mapa
 * solta uma bomba. O carrossel de vídeos que abria o site vem logo depois.
 */

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  height: clamp(520px, 62vw, 720px);
  background: #2f5a24;

  @media ${breakpoint.sm} {
    height: 640px;
  }
  border-bottom: ${arcadeBorder.thick};

  canvas {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    image-rendering: pixelated;
    cursor: crosshair;
  }
`;

/* escurece o centro para o texto ler bem, sem esconder o mapa nas bordas */
const Shade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 46% 52% at 50% 52%,
    rgba(8, 10, 31, 0.82),
    rgba(8, 10, 31, 0.5) 55%,
    rgba(8, 10, 31, 0.05) 100%
  );

  @media ${breakpoint.sm} {
    background: radial-gradient(
      ellipse 80% 55% at 50% 52%,
      rgba(8, 10, 31, 0.85),
      rgba(8, 10, 31, 0.45) 70%,
      rgba(8, 10, 31, 0.1) 100%
    );
  }
`;

const Over = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  /* o header é fixo por cima do topo */
  padding: 90px 16px 56px;
  pointer-events: none;
`;

const Box = styled.div`
  display: grid;
  justify-items: center;
  gap: 16px;
  max-width: 660px;
  text-align: center;
`;

const Logo = styled.img`
  width: min(340px, 70vw);
  height: auto;

  @media ${breakpoint.sm} {
    width: min(240px, 60vw);
  }
  filter: drop-shadow(6px 6px 0 ${arcadeColors.ink});
`;

const Title = styled.h1`
  margin: 0;
  font-family: ${arcadeFonts.display};
  font-weight: normal;
  font-size: clamp(22px, 3.4vw, 38px);
  line-height: 1.2;
  letter-spacing: 1px;
  color: ${arcadeColors.white};
  text-shadow: ${pixelTextShadow()}, ${hardShadow(4)};
  text-wrap: balance;

  em {
    font-style: normal;
    color: ${arcadeColors.yellow};
  }
`;

const Sub = styled.p`
  margin: 0;
  max-width: 46ch;
  font-family: ${arcadeFonts.body};
  font-size: 18px;
  line-height: 1.5;
  color: ${arcadeColors.cloud};
  text-shadow: 0 2px 0 ${arcadeColors.ink};

  @media ${breakpoint.sm} {
    font-size: 15px;
  }
`;

const Ctas = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
  pointer-events: auto;
`;

const Hud = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: flex;
  gap: 8px;
  pointer-events: none;

  @media ${breakpoint.sm} {
    display: none;
  }
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px 4px 5px;
  font-family: ${arcadeFonts.display};
  font-size: 14px;
  color: ${arcadeColors.white};
  background: rgba(8, 10, 31, 0.85);
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.pill};
  font-variant-numeric: tabular-nums;

  small {
    font-size: 10px;
    color: ${arcadeColors.smoke};
  }
`;

const bob = keyframes`
  50% { transform: translate(-50%, -6px); }
`;

const Hint = styled.span<{ $gone: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  font-family: ${arcadeFonts.display};
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(4)};
  padding: 9px 14px;
  pointer-events: none;
  animation: ${bob} 1.6s ease-in-out infinite;
  opacity: ${({ $gone }) => ($gone ? 0 : 1)};
  transition: opacity 0.4s ease;

  /* no celular o texto do topo já convida a soltar bomba */
  @media ${breakpoint.sm} {
    display: none;
  }
`;

/* A fonte pixelada desenha as maiúsculas ~0,15em acima do meio da linha
   (o espaço de letras como g/p fica vazio): desce o texto para centralizar. */
const HintText = styled.span`
  position: relative;
  top: 0.15em;
`;

const TreasureHero: React.FC<{ id: string }> = ({ id }) => {
  const hostRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hud, setHud] = useState<TreasureHud>({ bcoin: 0, sen: 0, chests: 0 });
  const [hintGone, setHintGone] = useState(false);
  const t = useText(TEXT);
  const [isTouch] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(hover: none)').matches,
  );

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return;
    const map = createTreasureMap({
      host: hostRef.current,
      canvas: canvasRef.current,
      onHud: setHud,
      onBomb: () => {
        setHintGone(true);
        logTrackClickEventAnalytics('hero_map_bomb');
      },
    });
    return () => map.destroy();
  }, []);

  return (
    <Wrapper id={id} ref={hostRef} aria-label={t.region}>
      <canvas ref={canvasRef} role="img" aria-label={t.canvas} />
      <Shade />
      <Over>
        <Box>
          <Logo src={logo} alt="Bomb Crypto" />
          <Title>
            {t.title} <em>{t.titleEm}</em>
          </Title>
          <Sub>{t.sub}</Sub>
          <Ctas>
            <ArcadeButton
              as="a"
              href="https://game.bombcrypto.io/"
              target="_blank"
              rel="noreferrer"
              $tone="red"
              onClick={() => logTrackClickEventAnalytics('play_click')}
            >
              {t.play}
            </ArcadeButton>
            <ArcadeButton
              as="a"
              href="#heroes"
              $tone="dark"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                document
                  .getElementById('heroes')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t.heroes}
            </ArcadeButton>
          </Ctas>
        </Box>
      </Over>
      <Hud>
        <Chip>
          <span style={spriteStyle('bcoin', 20)} />
          {hud.bcoin.toFixed(2)} <small>BCOIN</small>
        </Chip>
        <Chip>
          <span style={spriteStyle('sen', 20)} />
          {hud.sen.toFixed(2)} <small>SEN</small>
        </Chip>
        <Chip>
          <span style={spriteStyle('chest_gold_0', 20)} />
          {hud.chests} <small>{t.chests}</small>
        </Chip>
      </Hud>
      <Hint $gone={hintGone}>
        <span style={spriteStyle('bomb_1', 18)} />
        <HintText>{isTouch ? t.tap : t.click}</HintText>
      </Hint>
    </Wrapper>
  );
};

export default TreasureHero;
