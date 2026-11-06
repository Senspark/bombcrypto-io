import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import skillSpeed from 'src/assests/game/skills/skill_speed.webp';
import skillPower from 'src/assests/game/skills/skill_power.webp';
import skillRange from 'src/assests/game/skills/skill_range.webp';
import skillBombs from 'src/assests/game/skills/skill_bombs.webp';
import {
  ATLAS,
  GLOW_H,
  GLOW_W,
  HEROES,
  HeroId,
  RARITIES,
  Rarity,
  TILE,
  drawSprite,
  heroKey,
  loadAtlas,
  rarityLevel,
  rollRarity,
  spriteStyle,
} from 'src/game/atlas';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { defineText, Lang, useLang, useText } from 'src/i18n';

const TEXT = defineText(
  {
    kicker: 'The heroes',
    title: 'Meet your squad',
    sub: 'Nine heroes and ten rarities, from Common to Super Mystic. Pick one, or press Mint to roll a rarity with the real odds.',
    mint: 'Mint',
    hero: 'Hero',
    rarity: 'Rarity',
    stats: 'Stats range',
    speed: 'Speed',
    power: 'Power',
    range: 'Range',
    bombs: 'Bombs',
    odds: 'Mint odds',
    source: 'Odds and stat ranges from the game server, per 10,000 mints.',
  },
  {
    kicker: 'Os heróis',
    title: 'Monte seu time',
    sub: 'Nove heróis e dez raridades, de Common a Super Mystic. Escolha um ou aperte Mintar para sortear uma raridade com as chances reais.',
    mint: 'Mintar',
    hero: 'Herói',
    rarity: 'Raridade',
    stats: 'Atributos',
    speed: 'Velocidade',
    power: 'Poder',
    range: 'Alcance',
    bombs: 'Bombas',
    odds: 'Chance de mint',
    source: 'Chances e atributos do servidor do jogo, a cada 10.000 mints.',
  },
);
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
} from 'src/theme/arcade';
import {
  ArcadeButton,
  ArcadeContainer,
  ArcadeSection,
  Reveal,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';

/*
 * Vitrine de heróis: o visitante escolhe herói e raridade e vê o sprite real
 * andando nas 4 direções, com o brilho de raridade do jogo, as faixas de
 * atributos e a chance de mint de cada uma das 10 raridades. "Mint" sorteia
 * com as chances reais (dados em src/game/atlas.ts).
 */

const TOTAL_WEIGHT = RARITIES.reduce((a, r) => a + r.weight, 0);
const DIRS: ['front' | 'back' | 'right', boolean][] = [
  ['front', false],
  ['right', false],
  ['back', false],
  ['right', true],
];
// tamanho do palco em px de arte (16 x 12 casas)
const STAGE_W = 16 * TILE;
const STAGE_H = 12 * TILE;
const HERO_SCALE = 3.2;

const Section = styled(ArcadeSection)`
  background-color: ${arcadeColors.night};
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.035) 2px,
      transparent 2px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 2px, transparent 2px);
  background-size: 48px 48px;
`;

const Kicker = styled.span`
  display: block;
  font-family: ${arcadeFonts.display};
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${arcadeColors.cyan};
  margin-bottom: 10px;
`;

const Lab = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 28px;
  align-items: start;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;

const Stage = styled.div`
  position: relative;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.chunky};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(10)};
  overflow: hidden;

  canvas {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 4 / 3;
    image-rendering: pixelated;
  }
`;

const NameTag = styled.div`
  position: absolute;
  left: 14px;
  top: 12px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: ${arcadeFonts.display};
  font-size: 16px;
  color: ${arcadeColors.white};
  background: rgba(5, 6, 15, 0.72);
  border: 2px solid ${arcadeColors.ink};
  border-radius: 10px;
  padding: 5px 10px;

  img {
    width: 20px;
    height: 20px;
    image-rendering: pixelated;
  }
`;

const MintSlot = styled.div`
  position: absolute;
  right: 14px;
  bottom: 14px;
`;

const Panel = styled.div`
  display: grid;
  gap: 18px;
  min-width: 0;
  padding: 20px;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
`;

const Label = styled.div`
  font-family: ${arcadeFonts.display};
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.smoke};
  margin-bottom: 8px;
`;

const Opts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Opt = styled.button<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  padding: 0;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? arcadeColors.yellow : arcadeColors.nightDeep};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${({ $active }) => hardShadow($active ? 2 : 4)};
  transform: ${({ $active }) => ($active ? 'translate(2px, 2px)' : 'none')};
  transition: transform 0.08s ease, box-shadow 0.08s ease, background 0.15s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? arcadeColors.yellow : arcadeColors.panelLight};
  }
  &:focus-visible {
    outline: 3px solid ${arcadeColors.cyan};
    outline-offset: 2px;
  }
  img {
    width: 26px;
    height: 26px;
    image-rendering: pixelated;
  }

  @media ${breakpoint.sm} {
    width: 42px;
    height: 42px;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: ${arcadeColors.nightDeep};
  border: 2px solid ${arcadeColors.ink};
  border-radius: ${arcadeRadius.md};

  img {
    width: 26px;
    height: 26px;
  }
  .k {
    font-family: ${arcadeFonts.display};
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${arcadeColors.smoke};
  }
  .v {
    font-family: ${arcadeFonts.display};
    font-size: 18px;
    color: ${arcadeColors.yellow};
    font-variant-numeric: tabular-nums;
  }
`;

const Odds = styled.div`
  display: grid;
  gap: 4px;
`;

const Odd = styled.button<{ $active: boolean }>`
  display: grid;
  grid-template-columns: 22px 110px minmax(0, 1fr) 58px;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 3px 6px;
  font-family: ${arcadeFonts.body};
  font-size: 13px;
  text-align: left;
  color: ${arcadeColors.cloud};
  font-variant-numeric: tabular-nums;
  background: ${({ $active }) =>
    $active ? 'rgba(255, 210, 63, 0.12)' : 'transparent'};
  border: 0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  img {
    width: 20px;
    height: 20px;
    image-rendering: pixelated;
  }
  .bar {
    height: 10px;
    background: ${arcadeColors.nightDeep};
    border: 2px solid ${arcadeColors.ink};
    border-radius: 6px;
    overflow: hidden;
  }
  .bar i {
    display: block;
    height: 100%;
    background: ${arcadeColors.yellow};
  }
  .pct {
    text-align: right;
    color: ${arcadeColors.smoke};
  }
`;

const Source = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: ${arcadeColors.smoke};
`;

const pct = (w: number, lang: Lang) => {
  const p = (w / TOTAL_WEIGHT) * 100;
  const digits = p >= 1 ? 1 : 2;
  return `${p.toLocaleString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}%`;
};

const HeroShowcase: React.FC<{ id: string }> = ({ id }) => {
  const [hero, setHero] = useState<HeroId>('frog');
  const t = useText(TEXT);
  const { lang } = useLang();
  const [rarity, setRarity] = useState<Rarity>('legend');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lookRef = useRef({ hero, rarity, mintedAt: 0 });
  const drawRef = useRef<(t: number) => void>(() => undefined);
  lookRef.current.hero = hero;
  lookRef.current.rarity = rarity;

  const lv = rarityLevel(rarity);
  const info = RARITIES[lv];
  const heroName = HEROES.find((h) => h.id === hero)?.name ?? '';

  const mint = () => {
    setRarity(rollRarity());
    setHero(HEROES[Math.floor(Math.random() * HEROES.length)].id);
    lookRef.current.mintedAt = performance.now();
    logTrackClickEventAnalytics('showcase_mint');
  };

  useEffect(() => {
    const cv = canvasRef.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const reduceMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const k = 3; // resolução interna: 3 px por px de arte
    cv.width = STAGE_W * k;
    cv.height = STAGE_H * k;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    ctx.imageSmoothingEnabled = false;

    let raf = 0;
    let visible = true;
    let alive = true;
    const draw = (t: number) => {
      for (let r = 0; r < 12; r++)
        for (let c = 0; c < 16; c++) {
          drawSprite(
            ctx,
            `t0_floor_${(c * 5 + r * 3) % 7 < 4 ? 'a' : 'b'}`,
            c * TILE,
            r * TILE,
          );
          const edge = r < 2 || r > 9 || c < 1 || c > 14;
          if (edge && (c + r) % 2 === 0 && r !== 5 && r !== 6)
            drawSprite(
              ctx,
              (c * r) % 3 ? 't0_brick' : `t0_wall_${c % 2 ? 'a' : 'b'}`,
              c * TILE,
              r * TILE,
            );
        }
      const { hero: h, rarity: rr, mintedAt } = lookRef.current;
      const [dir, flip] = DIRS[Math.floor(t / 1600) % 4];
      const key = heroKey(h, rr, dir, Math.floor(t / 160) % 3);
      const f = ATLAS[key];
      if (!f) return;
      const cx = STAGE_W / 2;
      const foot = 128;
      if (rarityLevel(rr) > 0) {
        const gw = GLOW_W * HERO_SCALE;
        const gh = GLOW_H * HERO_SCALE;
        drawSprite(
          ctx,
          `glow_${rr}`,
          cx - gw / 2,
          foot - 0.35 * TILE * HERO_SCALE - gh / 2,
          gw,
          gh,
        );
      }
      const pop =
        mintedAt && t - mintedAt < 450
          ? 1 + 0.25 * Math.sin(((t - mintedAt) / 450) * Math.PI)
          : 1;
      const w = f[2] * HERO_SCALE * pop;
      const hh = f[3] * HERO_SCALE * pop;
      drawSprite(
        ctx,
        key,
        Math.round(cx - w / 2),
        Math.round(foot - hh),
        w,
        hh,
        { flip },
      );
    };
    drawRef.current = (t: number) => alive && draw(t);
    const frame = (t: number) => {
      raf = 0;
      if (!alive || !visible || document.hidden) return;
      draw(t);
      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (alive && !raf && visible && !document.hidden)
        raf = requestAnimationFrame(frame);
    };
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            start();
          })
        : null;
    io?.observe(cv);
    document.addEventListener('visibilitychange', start);
    loadAtlas().then(start);
    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
      document.removeEventListener('visibilitychange', start);
    };
  }, []);

  // com movimento reduzido o laço não roda: redesenha a cada escolha
  useEffect(() => {
    drawRef.current(performance.now());
  }, [hero, rarity]);

  const [a, b] = info.stat;
  return (
    <Section id={id}>
      <ArcadeContainer>
        <Reveal>
          <Kicker>{t.kicker}</Kicker>
          <SectionTitle>{t.title}</SectionTitle>
          <SectionSubtitle>{t.sub}</SectionSubtitle>
        </Reveal>
        <Reveal delay={120}>
          <Lab>
            <Stage>
              <canvas ref={canvasRef} aria-label={`${info.name} ${heroName}`} />
              <NameTag>
                <img src={info.icon} alt="" />
                {info.name} {heroName}
              </NameTag>
              <MintSlot>
                <ArcadeButton type="button" $tone="red" onClick={mint}>
                  {t.mint}
                </ArcadeButton>
              </MintSlot>
            </Stage>
            <Panel>
              <div>
                <Label>{t.hero}</Label>
                <Opts role="radiogroup" aria-label={t.hero}>
                  {HEROES.map((h) => (
                    <Opt
                      key={h.id}
                      type="button"
                      role="radio"
                      aria-checked={hero === h.id}
                      aria-label={h.name}
                      title={h.name}
                      $active={hero === h.id}
                      onClick={() => setHero(h.id)}
                    >
                      <span
                        style={spriteStyle(
                          heroKey(h.id, rarity, 'front', 0),
                          32,
                        )}
                      />
                    </Opt>
                  ))}
                </Opts>
              </div>
              <div>
                <Label>{t.rarity}</Label>
                <Opts role="radiogroup" aria-label={t.rarity}>
                  {RARITIES.map((r) => (
                    <Opt
                      key={r.id}
                      type="button"
                      role="radio"
                      aria-checked={rarity === r.id}
                      aria-label={r.name}
                      title={r.name}
                      $active={rarity === r.id}
                      onClick={() => setRarity(r.id)}
                    >
                      <img src={r.icon} alt="" />
                    </Opt>
                  ))}
                </Opts>
              </div>
              <div>
                <Label>{t.stats}</Label>
                <Stats>
                  {(
                    [
                      [skillSpeed, t.speed, `${a}–${b}`],
                      [skillPower, t.power, `${a}–${b}`],
                      [skillRange, t.range, lv + 1],
                      [skillBombs, t.bombs, lv + 1],
                    ] as [string, string, string | number][]
                  ).map(([icon, k, v]) => (
                    <Stat key={k}>
                      <img src={icon} alt="" />
                      <div>
                        <div className="k">{k}</div>
                        <div className="v">{v}</div>
                      </div>
                    </Stat>
                  ))}
                </Stats>
              </div>
              <div>
                <Label>{t.odds}</Label>
                <Odds>
                  {RARITIES.map((r) => (
                    <Odd
                      key={r.id}
                      type="button"
                      $active={rarity === r.id}
                      onClick={() => setRarity(r.id)}
                    >
                      <img src={r.icon} alt="" />
                      <span>{r.name}</span>
                      <span className="bar">
                        {/* escala logarítmica: 1 em 10.000 ainda aparece */}
                        <i
                          style={{
                            width: `${Math.max(
                              1.5,
                              (Math.log10(r.weight) / Math.log10(8118)) * 100,
                            )}%`,
                          }}
                        />
                      </span>
                      <span className="pct">{pct(r.weight, lang)}</span>
                    </Odd>
                  ))}
                </Odds>
                <Source>{t.source}</Source>
              </div>
            </Panel>
          </Lab>
        </Reveal>
      </ArcadeContainer>
    </Section>
  );
};

export default HeroShowcase;
