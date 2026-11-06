import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import tinyHouse from 'src/assests/houses/TinyHouse.webp';
import miniHouse from 'src/assests/houses/MiniHouse.webp';
import luxHouse from 'src/assests/houses/LuxHouse.webp';
import pentHouse from 'src/assests/houses/PentHouse.webp';
import villa from 'src/assests/houses/Villa.webp';
import superVilla from 'src/assests/houses/SuperVilla.webp';
import { HEROES, spriteDataUrl, spriteStyle } from 'src/game/atlas';
import { LINK_SCAN, NETWORK } from 'src/Contants/Contants';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
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
import { arcadeToast } from 'src/components/ui/toast';
import { defineText, useLang, useText } from 'src/i18n';

const TEXT = defineText(
  {
    kicker: 'Rest & recharge',
    title: 'Houses',
    sub: 'Heroes spend energy breaking chests. A house lets them rest and recharge many times faster than sleeping outside. Bigger houses fit more heroes and recharge faster.',
    tier: 'TIER',
    fits: (n: number) => `Fits ${n} heroes`,
    perMin: (n: number) => `${n} energy / min`,
    energy: 'Energy',
    fullIn: (d: string) => `full in ${d}`,
    house: 'House',
    recharge: 'Recharge',
    slots: 'Slots',
    supply: 'Supply',
    stamina: 'Hero stamina',
    energyOf: (s: number, e: number) => `${s} · ${e} energy`,
    race: 'Time to fully recharge',
    noHouse: 'No house',
    isNew: 'New',
    rent: 'Rent extra houses for 7, 14 or 30 days with BNB or POL. Their slots add up to your active house.',
    copy: 'Copy',
    copied: 'Address copied!',
    market: 'Visit market',
  },
  {
    kicker: 'Descanso e recarga',
    title: 'Casas',
    sub: 'Os heróis gastam energia quebrando baús. Na casa eles descansam e recarregam muito mais rápido do que dormindo do lado de fora. Casas maiores cabem mais heróis e recarregam mais rápido.',
    tier: 'NÍVEL',
    fits: (n: number) => `Cabem ${n} heróis`,
    perMin: (n: number) => `${n} de energia / min`,
    energy: 'Energia',
    fullIn: (d: string) => `cheia em ${d}`,
    house: 'Casa',
    recharge: 'Recarga',
    slots: 'Vagas',
    supply: 'Existem',
    stamina: 'Stamina do herói',
    energyOf: (s: number, e: number) => `${s} · ${e} de energia`,
    race: 'Tempo para recarregar tudo',
    noHouse: 'Sem casa',
    isNew: 'Novo',
    rent: 'Alugue casas extras por 7, 14 ou 30 dias com BNB ou POL. As vagas delas somam com as da sua casa ativa.',
    copy: 'Copiar',
    copied: 'Endereço copiado!',
    market: 'Ver no mercado',
  },
);

/*
 * Casas (BHouse): o visitante escolhe uma das 6, vê quantos heróis cabem e
 * quanto ela recarrega, e compara a recarga de todas numa "corrida" para a
 * stamina que ele escolher.
 *
 * Números do jogo:
 *  - recarga e vagas: BHouseDesign.rarityStats (recovery por hora, capacity);
 *    na casa o herói recupera floor(recovery / 60) de energia por minuto;
 *  - fora de casa, dormindo, recupera 0,5 por minuto;
 *  - energia máxima do herói = stamina x 50;
 *  - limite de mint: BHouseDesign.mintLimits.
 */

const HOUSES = [
  { name: 'Tiny House', img: tinyHouse, recovery: 120, slots: 4, supply: 2500 },
  { name: 'Mini House', img: miniHouse, recovery: 300, slots: 6, supply: 1250 },
  { name: 'Lux House', img: luxHouse, recovery: 480, slots: 8, supply: 750 },
  { name: 'Penthouse', img: pentHouse, recovery: 660, slots: 10, supply: 250 },
  { name: 'Villa', img: villa, recovery: 840, slots: 12, supply: 200 },
  {
    name: 'Super Villa',
    img: superVilla,
    recovery: 1020,
    slots: 14,
    supply: 50,
  },
];
const SLEEP_RATE = 0.5;
const perMin = (recovery: number) => Math.floor(recovery / 60);

const CONTRACTS: Record<string, string> = {
  [NETWORK.BINANCE]: '0xea3516fEB8F3e387eeC3004330Fd30Aff615496A',
  [NETWORK.POLYGON]: '0x2d5f4ba3e4a2d991bd72edbf78f607c174636618',
};
const SCAN: Record<string, string> = {
  [NETWORK.BINANCE]: LINK_SCAN.BINANCE,
  [NETWORK.POLYGON]: LINK_SCAN.POLYGON,
};
const MARKET =
  'https://market.bombcrypto.io/market/bhouse?page=1&size=10&order_by=desc%3Ablock_timestamp';

/** minutos → "4h 10m" / "36m" */
const duration = (min: number) => {
  const m = Math.ceil(min);
  const h = Math.floor(m / 60);
  return h ? `${h}h ${String(m % 60).padStart(2, '0')}m` : `${m}m`;
};

/* ------------------------------------------------------------------ */

const Section = styled(ArcadeSection)`
  background: radial-gradient(
      ellipse 70% 60% at 30% 0%,
      rgba(44, 187, 23, 0.16),
      transparent 70%
    ),
    ${arcadeColors.night};
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
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 28px;
  align-items: start;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;

const Stage = styled.div<{ $floor: string }>`
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 420px;
  overflow: hidden;
  background-color: #4f7d2c;
  background-image: ${({ $floor }) => ($floor ? `url(${$floor})` : 'none')};
  background-size: 48px 48px;
  image-rendering: pixelated;
  border: ${arcadeBorder.chunky};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(10)};

  @media ${breakpoint.sm} {
    min-height: 340px;
  }
`;

const pop = keyframes`
  0% { transform: translateY(14px) scale(.92); opacity: 0; }
  100% { transform: none; opacity: 1; }
`;

const HouseArt = styled.div`
  display: grid;
  place-items: end center;
  padding: 64px 24px 8px;

  img {
    max-width: 100%;
    max-height: 250px;
    width: auto;
    height: auto;
    image-rendering: pixelated;
    filter: drop-shadow(6px 6px 0 rgba(5, 6, 15, 0.55));
    animation: ${pop} 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media ${breakpoint.sm} {
    img {
      max-height: 170px;
    }
  }
`;

const Tag = styled.div`
  position: absolute;
  left: 14px;
  top: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${arcadeFonts.display};
  font-size: 18px;
  color: ${arcadeColors.white};
  background: rgba(5, 6, 15, 0.78);
  border: 2px solid ${arcadeColors.ink};
  border-radius: 10px;
  padding: 6px 12px;

  small {
    font-size: 11px;
    letter-spacing: 1px;
    color: ${arcadeColors.yellow};
  }
`;

const Porch = styled.div`
  display: grid;
  gap: 10px;
  padding: 14px 16px 16px;
  background: rgba(5, 6, 15, 0.82);
  border-top: ${arcadeBorder.thick};
`;

const Slots = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: flex-end;
`;

const Slot = styled.span`
  display: grid;
  place-items: end center;
  width: 30px;
  height: 34px;
  background: rgba(255, 255, 255, 0.06);
  border: 2px solid ${arcadeColors.ink};
  border-radius: 8px;
  padding-bottom: 2px;
`;

const fill = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const Energy = styled.div<{ $seconds: number }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${arcadeFonts.display};
  font-size: 12px;
  letter-spacing: 1px;
  color: ${arcadeColors.smoke};
  text-transform: uppercase;

  .bar {
    flex: 1;
    height: 14px;
    background: #372222;
    border: 2px solid ${arcadeColors.ink};
    border-radius: 6px;
    overflow: hidden;
  }
  .bar i {
    display: block;
    height: 100%;
    background: #17ec48;
    transform-origin: left;
    animation: ${fill} ${({ $seconds }) => $seconds}s linear infinite;
  }
  b {
    color: ${arcadeColors.yellow};
    font-weight: normal;
    white-space: nowrap;
  }
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
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-family: ${arcadeFonts.display};
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.smoke};
  margin-bottom: 8px;

  b {
    color: ${arcadeColors.yellow};
    font-weight: normal;
  }
`;

const Picks = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;

  @media ${breakpoint.xs} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Pick = styled.button<{ $active: boolean }>`
  display: grid;
  place-items: center;
  height: 58px;
  padding: 4px;
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
    max-width: 100%;
    max-height: 44px;
    image-rendering: pixelated;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  > div {
    padding: 8px 12px;
    background: ${arcadeColors.nightDeep};
    border: 2px solid ${arcadeColors.ink};
    border-radius: ${arcadeRadius.md};
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
  .v small {
    font-size: 11px;
    color: ${arcadeColors.smoke};
  }

  @media ${breakpoint.xs} {
    gap: 6px;
    > div {
      padding: 6px 8px;
    }
  }
`;

const Slider = styled.input`
  width: 100%;
  accent-color: ${arcadeColors.yellow};
`;

const Race = styled.div`
  display: grid;
  gap: 6px;
`;

const Lane = styled.button<{ $active: boolean }>`
  display: grid;
  grid-template-columns: 98px minmax(0, 1fr) 68px;
  gap: 10px;
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

  &:disabled {
    cursor: default;
    color: ${arcadeColors.smoke};
  }
  &:not(:disabled):hover {
    background: rgba(255, 255, 255, 0.05);
  }
  .bar {
    height: 12px;
    background: ${arcadeColors.nightDeep};
    border: 2px solid ${arcadeColors.ink};
    border-radius: 6px;
    overflow: hidden;
  }
  .bar i {
    display: block;
    height: 100%;
    background: ${arcadeColors.yellow};
    transition: width 0.3s ease;
  }
  &:disabled .bar i {
    background: ${arcadeColors.smoke};
  }
  .t {
    text-align: right;
  }
`;

const Foot = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px 24px;
  align-items: center;
  margin-top: 28px;
  padding: 16px 18px;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(6)};

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }

  p {
    margin: 0;
    font-size: 15px;
    line-height: 1.5;
    color: ${arcadeColors.cloud};
  }
`;

const Addr = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  margin-top: 10px;
  padding: 6px 6px 6px 12px;
  font: 13px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
  background: ${arcadeColors.nightDeep};
  border: 2px solid ${arcadeColors.ink};
  border-radius: 10px;

  span {
    font-family: ${arcadeFonts.display};
    font-size: 11px;
    color: ${arcadeColors.smoke};
  }
  a {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${arcadeColors.cyan};
    text-decoration: none;
  }
  button {
    flex: 0 0 auto;
    font: 600 12px ${arcadeFonts.body};
    color: ${arcadeColors.ink};
    background: ${arcadeColors.cloud};
    border: 2px solid ${arcadeColors.ink};
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
  }
`;

/* ------------------------------------------------------------------ */

const HouseShowcase: React.FC<{ id: string; network: string }> = ({
  id,
  network,
}) => {
  const [sel, setSel] = useState(5);
  const t = useText(TEXT);
  const { lang } = useLang();
  const [stamina, setStamina] = useState(10);
  const [floor, setFloor] = useState('');
  useEffect(() => {
    let alive = true;
    spriteDataUrl('t0_floor_a').then((u) => alive && setFloor(u));
    return () => {
      alive = false;
    };
  }, []);

  const house = HOUSES[sel];
  const energy = stamina * 50;
  const rate = perMin(house.recovery);
  const fullMin = energy / rate;
  const lanes = [
    ...HOUSES.map((h, i) => ({
      i,
      name: h.name,
      min: energy / perMin(h.recovery),
    })),
    { i: -1, name: t.noHouse, min: energy / SLEEP_RATE },
  ];
  const longest = energy / SLEEP_RATE;
  const contract = CONTRACTS[network] ?? CONTRACTS[NETWORK.BINANCE];
  const scan = SCAN[network] ?? SCAN[NETWORK.BINANCE];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contract);
      arcadeToast(t.copied);
    } catch (e) {
      arcadeToast(contract);
    }
  };

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
            <Stage $floor={floor}>
              <Tag>
                {house.name}
                <small>
                  {t.tier} {sel + 1}/{HOUSES.length}
                </small>
              </Tag>
              <HouseArt>
                <img key={house.name} src={house.img} alt={house.name} />
              </HouseArt>
              <Porch>
                <Label>
                  {t.fits(house.slots)}
                  <b>{t.perMin(rate)}</b>
                </Label>
                <Slots aria-hidden="true">
                  {Array.from({ length: house.slots }, (_, i) => (
                    <Slot key={i}>
                      <span
                        style={spriteStyle(
                          `h_${HEROES[i % HEROES.length].id}_common_front_0`,
                          26,
                        )}
                      />
                    </Slot>
                  ))}
                </Slots>
                {/* a barra enche numa fração do tempo real: 1 s de animação = 10 min de jogo */}
                <Energy
                  $seconds={Math.max(1.2, fullMin / 10)}
                  key={`${sel}-${stamina}`}
                >
                  {t.energy}
                  <span className="bar">
                    <i />
                  </span>
                  <b>{t.fullIn(duration(fullMin))}</b>
                </Energy>
              </Porch>
            </Stage>

            <Panel>
              <div>
                <Label>{t.house}</Label>
                <Picks role="radiogroup" aria-label={t.house}>
                  {HOUSES.map((h, i) => (
                    <Pick
                      key={h.name}
                      type="button"
                      role="radio"
                      aria-checked={sel === i}
                      aria-label={h.name}
                      title={h.name}
                      $active={sel === i}
                      onClick={() => setSel(i)}
                    >
                      <img src={h.img} alt="" />
                    </Pick>
                  ))}
                </Picks>
              </div>
              <Stats>
                <div>
                  <div className="k">{t.recharge}</div>
                  <div className="v">
                    {rate} <small>/ min</small>
                  </div>
                </div>
                <div>
                  <div className="k">{t.slots}</div>
                  <div className="v">{house.slots}</div>
                </div>
                <div>
                  <div className="k">{t.supply}</div>
                  <div className="v">
                    {house.supply.toLocaleString(
                      lang === 'pt' ? 'pt-BR' : 'en-US',
                    )}
                  </div>
                </div>
              </Stats>
              <div>
                <Label as="label" htmlFor="house-stamina">
                  {t.stamina}
                  <b>{t.energyOf(stamina, energy)}</b>
                </Label>
                <Slider
                  id="house-stamina"
                  type="range"
                  min={1}
                  max={30}
                  value={stamina}
                  onChange={(e) => setStamina(Number(e.target.value))}
                />
              </div>
              <div>
                <Label>{t.race}</Label>
                <Race>
                  {lanes.map((l) => (
                    <Lane
                      key={l.name}
                      type="button"
                      disabled={l.i < 0}
                      $active={l.i === sel}
                      onClick={() => l.i >= 0 && setSel(l.i)}
                    >
                      <span>{l.name}</span>
                      <span className="bar">
                        <i
                          style={{
                            width: `${Math.max(2, (l.min / longest) * 100)}%`,
                          }}
                        />
                      </span>
                      <span className="t">{duration(l.min)}</span>
                    </Lane>
                  ))}
                </Race>
              </div>
            </Panel>
          </Lab>
        </Reveal>

        <Reveal>
          <Foot>
            <div>
              <ArcadeBadge $tone="green">{t.isNew}</ArcadeBadge>{' '}
              <p style={{ display: 'inline' }}>{t.rent}</p>
              <Addr>
                <span>BHOUSE</span>
                <a
                  href={`${scan}/address/${contract}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contract}
                </a>
                <button type="button" onClick={copy}>
                  {t.copy}
                </button>
              </Addr>
            </div>
            <ArcadeButton
              as="a"
              href={MARKET}
              target="_blank"
              rel="noreferrer"
              onClick={() => logTrackClickEventAnalytics('house_market_click')}
            >
              {t.market}
            </ArcadeButton>
          </Foot>
        </Reveal>
      </ArcadeContainer>
    </Section>
  );
};

export default HouseShowcase;
