import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  BNB_CONFIG,
  POLYGON_CONFIG,
  TON_CONFIG,
  SOLANA_CONFIG,
} from 'src/configs/BToken';
import {
  LINK_SCAN,
  NETWORK,
  NetworkType,
  networkOptions,
} from 'src/Contants/Contants';
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
  ArcadeButton,
  ArcadeContainer,
  ArcadeSection,
  Reveal,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';
import { arcadeToast } from 'src/components/ui/toast';
import { defineText, useText } from 'src/i18n';

const TEXT = defineText(
  {
    sub: (net: string) =>
      `BCOIN and SEN on ${net}. Copy a contract, add it to your wallet or trade it. Switch the chain in the menu to see the others.`,
    day: '24h',
    week: 'Price over the last 7 days',
    liquidity: 'Liquidity',
    chart: 'chart',
    explorer: 'Open in the explorer',
    copy: 'Copy',
    copied: 'Address copied!',
    addMetaMask: 'Add to MetaMask',
    noMetaMask: 'MetaMask not installed. Please install MetaMask.',
    switchTo: (net: string) => `Please switch MetaMask to ${net}.`,
    audit: 'Audit',
    trade: 'Trade',
    tradeOn: (sym: string, where: string) => `Trade ${sym} on ${where}`,
    note: 'Prices from GeckoTerminal, updated when the page opens. Not financial advice.',
  },
  {
    sub: (net: string) =>
      `BCOIN e SEN na ${net}. Copie o contrato, adicione na sua carteira ou negocie. Troque a rede no menu para ver as outras.`,
    day: '24h',
    week: 'Preço nos últimos 7 dias',
    liquidity: 'Liquidez',
    chart: 'gráfico',
    explorer: 'Abrir no explorador',
    copy: 'Copiar',
    copied: 'Endereço copiado!',
    addMetaMask: 'Adicionar na MetaMask',
    noMetaMask: 'MetaMask não instalada. Instale a MetaMask para continuar.',
    switchTo: (net: string) => `Troque a rede da MetaMask para ${net}.`,
    audit: 'Auditoria',
    trade: 'Negociar',
    tradeOn: (sym: string, where: string) => `Negociar ${sym} na ${where}`,
    note: 'Preços da GeckoTerminal, atualizados quando a página abre. Não é recomendação de investimento.',
  },
);
type Text = typeof TEXT.en;

/*
 * Tokens em cards: preço, variação de 24 h, gráfico de 7 dias e liquidez ao
 * vivo, endereço com copiar, "Add to MetaMask" e onde negociar.
 *
 * O site é estático, então os números vêm direto do navegador da API pública
 * da GeckoTerminal (libera CORS; limite de ~30 chamadas/min POR VISITANTE).
 * São 1 chamada por rede + 1 por pool, guardadas 5 min no sessionStorage.
 * Sem resposta, o card mostra "—" e a liquidez fixa da config.
 */

type TokenCfg = Omit<typeof BNB_CONFIG.token_bcoin, 'audit'> & {
  audit: { icon: string; link: string } | null;
};
type Card = {
  network: NetworkType;
  networkName: string;
  gecko: string; // id da rede na GeckoTerminal
  pool: string; // pool de referência do preço (o mesmo do link do DEXTools)
  chainId: string;
  token: TokenCfg;
};

const CARDS: Card[] = [
  { network: NETWORK.BINANCE, networkName: 'BNB Chain', gecko: 'bsc', pool: '0x2eebe0c34da9ba65521e98cbaa7d97496d05f489', chainId: BNB_CONFIG.chainId, token: BNB_CONFIG.token_bcoin },
  { network: NETWORK.BINANCE, networkName: 'BNB Chain', gecko: 'bsc', pool: '0xc54aa5694cd8bd419ac3bba11ece94aa6c5f9b01', chainId: BNB_CONFIG.chainId, token: BNB_CONFIG.token_sen },
  { network: NETWORK.POLYGON, networkName: 'Polygon', gecko: 'polygon_pos', pool: '0x8b4e00810c927bb1c02dee73d714a31121689ab3', chainId: POLYGON_CONFIG.chainId, token: POLYGON_CONFIG.token_bcoin },
  { network: NETWORK.POLYGON, networkName: 'Polygon', gecko: 'polygon_pos', pool: '0x27cce65b017eb1522da7f20d6f4df003c446f744', chainId: POLYGON_CONFIG.chainId, token: POLYGON_CONFIG.token_sen },
  { network: NETWORK.TON, networkName: 'TON', gecko: 'ton', pool: 'EQAG8yfLCABKq19CNNrt_taMRoFpPR-wP6ZcMwbGJuFo1EMn', chainId: '', token: TON_CONFIG.token_bcoin },
  { network: NETWORK.SOLANA, networkName: 'Solana', gecko: 'solana', pool: 'ebMjqkL7qWwqjJzL6WihcGH2XPyyaDwKZucP5wX33Cw', chainId: '', token: SOLANA_CONFIG.token_bcoin },
]; // prettier-ignore

type Market = {
  price: number;
  change: number;
  liquidity: number;
  week: number[];
};

const API = 'https://api.geckoterminal.com/api/v2/networks';
const CACHE_KEY = 'bc-token-markets';
const CACHE_MS = 5 * 60 * 1000;

async function getJson(url: string) {
  const r = await fetch(url, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
}

async function loadMarkets(cards: Card[]): Promise<Record<string, Market>> {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (raw) {
      const cached = JSON.parse(raw);
      if (Date.now() - cached.at < CACHE_MS) return cached.data;
    }
  } catch (e) {
    // sem storage (aba privada): só busca de novo
  }
  const out: Record<string, Market> = {};
  const byNet = new Map<string, string[]>();
  cards.forEach((c) =>
    byNet.set(c.gecko, [...(byNet.get(c.gecko) ?? []), c.pool]),
  );
  await Promise.all(
    [...byNet.entries()].map(async ([net, pools]) => {
      const res = await getJson(
        `${API}/${net}/pools/multi/${pools.join(',')}`,
      ).catch(() => null);
      res?.data?.forEach((p: any) => {
        const a = p.attributes;
        out[a.address.toLowerCase()] = {
          price: Number(a.base_token_price_usd),
          change: Number(a.price_change_percentage?.h24 ?? 0),
          liquidity: Number(a.reserve_in_usd),
          week: [],
        };
      });
    }),
  );
  await Promise.all(
    cards.map(async (c) => {
      const m = out[c.pool.toLowerCase()];
      if (!m) return;
      const res = await getJson(
        `${API}/${c.gecko}/pools/${c.pool}/ohlcv/day?limit=7`,
      ).catch(() => null);
      // a lista vem do mais novo para o mais velho: [tempo, abre, máx, mín, fecha, volume]
      const list: number[][] = res?.data?.attributes?.ohlcv_list ?? [];
      m.week = list.map((x) => x[4]).reverse();
    }),
  );
  // guarda só a resposta completa (preço e gráfico de todos os pools): uma
  // rede que falhou não fica presa em "—" pelos próximos 5 minutos
  const complete = cards.every((c) => out[c.pool.toLowerCase()]?.week.length);
  try {
    if (complete)
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ at: Date.now(), data: out }),
      );
  } catch (e) {
    // idem
  }
  return out;
}

const usd = (v: number) =>
  v >= 1000
    ? `$${(v / 1000).toFixed(v >= 100000 ? 0 : 1)}K`
    : v < 0.01
    ? `$${v.toFixed(5)}`
    : `$${v.toFixed(4)}`;

/* ------------------------------------------------------------------ */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;

  @media ${breakpoint.md} {
    grid-template-columns: 1fr;
  }
`;

const CardBox = styled.article`
  display: grid;
  gap: 14px;
  min-width: 0;
  padding: 18px 20px;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > img {
    width: 46px;
    height: 46px;
    flex: 0 0 auto;
  }
  .nm {
    font-family: ${arcadeFonts.display};
    font-size: 20px;
    line-height: 1;
    color: ${arcadeColors.white};
  }
  .chain {
    font-size: 12px;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${arcadeColors.smoke};
  }
  .price {
    margin-left: auto;
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .price b {
    display: block;
    font-family: ${arcadeFonts.display};
    font-weight: normal;
    font-size: 20px;
    color: ${arcadeColors.yellow};
  }
  .price span {
    font-size: 13px;
  }
`;

const Change = styled.span<{ $up: boolean }>`
  color: ${({ $up }) => ($up ? '#5CF07A' : '#FF6B78')};
`;

const Spark = styled.svg`
  display: block;
  width: 100%;
  height: 64px;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
  color: ${arcadeColors.smoke};
  font-variant-numeric: tabular-nums;

  b {
    color: ${arcadeColors.cloud};
    font-weight: 500;
  }
  a {
    color: ${arcadeColors.cyan};
  }
`;

const Addr = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 6px 6px 6px 12px;
  font: 13px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace;
  background: ${arcadeColors.nightDeep};
  border: 2px solid ${arcadeColors.ink};
  border-radius: 10px;

  a {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${arcadeColors.cyan};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
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

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const SmallButton = styled(ArcadeButton)`
  font-size: 13px;
  padding: 8px 14px;
  border-width: 3px;
  box-shadow: ${hardShadow(4)};
`;

const Trade = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  font-size: 12px;
  color: ${arcadeColors.smoke};

  a {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    background: ${arcadeColors.nightDeep};
    border: 2px solid ${arcadeColors.ink};
    border-radius: 8px;
    transition: transform 0.08s ease;
  }
  a:hover {
    transform: translateY(-2px);
  }
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const Note = styled.p`
  margin: 18px 0 0;
  font-size: 12px;
  color: ${arcadeColors.smoke};
`;

/* ------------------------------------------------------------------ */

function Sparkline({
  week,
  up,
  id,
  label,
}: {
  week: number[];
  up: boolean;
  id: string;
  label: string;
}) {
  if (week.length < 2) return <Spark viewBox="0 0 300 64" aria-hidden="true" />;
  const min = Math.min(...week);
  const max = Math.max(...week);
  const span = max - min || 1;
  const pts = week
    .map(
      (v, i) =>
        `${((i / (week.length - 1)) * 300).toFixed(1)},${(
          58 -
          ((v - min) / span) * 52
        ).toFixed(1)}`,
    )
    .join(' ');
  const col = up ? '#5CF07A' : '#FF6B78';
  return (
    <Spark viewBox="0 0 300 64" preserveAspectRatio="none" aria-label={label}>
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={col} stopOpacity=".35" />
          <stop offset="1" stopColor={col} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon fill={`url(#spark-${id})`} points={`0,64 ${pts} 300,64`} />
      <polyline
        fill="none"
        stroke={col}
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        points={pts}
      />
    </Spark>
  );
}

function getProvider(): any {
  if (typeof window === 'undefined') return undefined;
  const w = window as any;
  return w.ethereum || w.web3?.currentProvider;
}

function addToMetaMask(card: Card, tx: Text) {
  logTrackClickEventAnalytics('addmask_click');
  const provider = getProvider();
  if (!provider) {
    arcadeToast(tx.noMetaMask);
    return;
  }
  if (provider.chainId !== card.chainId) {
    arcadeToast(tx.switchTo(card.networkName));
    return;
  }
  const { address, symbol, decimals } = card.token;
  provider
    .request({
      method: 'wallet_watchAsset',
      params: { type: 'ERC20', options: { address, symbol, decimals } },
    })
    .catch(console.error);
}

function explorer(card: Card) {
  const base = {
    [NETWORK.BINANCE]: LINK_SCAN.BINANCE,
    [NETWORK.POLYGON]: LINK_SCAN.POLYGON,
    [NETWORK.TON]: LINK_SCAN.TON,
    [NETWORK.SOLANA]: LINK_SCAN.SOLANA,
  }[card.network];
  if (card.network === NETWORK.SOLANA)
    return `${base}/token/${card.token.address}`;
  if (card.network === NETWORK.TON)
    return `${base}/jetton/${card.token.address}`;
  return `${base}/address/${card.token.address}`;
}

/** Nome do lugar de negociação a partir do link (pancakeswap.finance → Pancakeswap). */
function tradeName(link: string) {
  try {
    const host = new URL(link).hostname.replace(/^(www|app|exchange)\./, '');
    const name = host.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch (e) {
    return 'exchange';
  }
}

async function copy(text: string, tx: Text) {
  try {
    await navigator.clipboard.writeText(text);
    arcadeToast(tx.copied);
  } catch (e) {
    arcadeToast(text);
  }
}

const TokenCards: React.FC<{ id: string; networkSelected: string }> = ({
  id,
  networkSelected,
}) => {
  // só os tokens da rede escolhida no menu; os preços de todas as redes do
  // seletor vêm numa busca só, então trocar de rede não espera a API
  const cards = CARDS.filter((c) => c.network === networkSelected);
  const networkName = cards[0]?.networkName ?? networkSelected;
  const tx = useText(TEXT);
  const [markets, setMarkets] = useState<Record<string, Market> | null>(null);

  useEffect(() => {
    let alive = true;
    loadMarkets(CARDS.filter((c) => networkOptions.includes(c.network))).then(
      (m) => alive && setMarkets(m),
    );
    return () => {
      alive = false;
    };
  }, []);

  return (
    <ArcadeSection id={id} $bg={arcadeColors.nightDeep}>
      <ArcadeContainer>
        <Reveal>
          <SectionTitle>Tokens</SectionTitle>
          <SectionSubtitle>{tx.sub(networkName)}</SectionSubtitle>
        </Reveal>
        <Grid>
          {cards.map((c, i) => {
            const m = markets?.[c.pool.toLowerCase()];
            const up = (m?.change ?? 0) >= 0;
            return (
              <Reveal key={c.pool} delay={i * 80}>
                <CardBox>
                  <Head>
                    <img src={c.token.icon} alt="" />
                    <div>
                      <div className="nm">{c.token.symbol}</div>
                      <div className="chain">{c.networkName}</div>
                    </div>
                    <div className="price">
                      <b>{m ? usd(m.price) : '—'}</b>
                      {m && (
                        <Change $up={up}>
                          {up ? '▲' : '▼'} {Math.abs(m.change).toFixed(1)}% ·{' '}
                          {tx.day}
                        </Change>
                      )}
                    </div>
                  </Head>
                  <Sparkline
                    week={m?.week ?? []}
                    up={
                      m && m.week.length > 1
                        ? m.week[m.week.length - 1] >= m.week[0]
                        : up
                    }
                    id={c.pool}
                    label={tx.week}
                  />
                  <Meta>
                    <span>
                      {tx.liquidity}{' '}
                      <b>{m ? usd(m.liquidity) : c.token.pair?.liq ?? '—'}</b>
                    </span>
                    <span>
                      {c.token.pool?.name} ·{' '}
                      <a
                        href={c.token.pool?.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tx.chart}
                      </a>
                    </span>
                  </Meta>
                  <Addr>
                    <a
                      href={explorer(c)}
                      target="_blank"
                      rel="noreferrer"
                      title={tx.explorer}
                    >
                      {c.token.address}
                    </a>
                    <button
                      type="button"
                      onClick={() => copy(c.token.address, tx)}
                    >
                      {tx.copy}
                    </button>
                  </Addr>
                  <Actions>
                    {c.chainId && (
                      <SmallButton
                        type="button"
                        onClick={() => addToMetaMask(c, tx)}
                      >
                        {tx.addMetaMask}
                      </SmallButton>
                    )}
                    {c.token.audit && (
                      <SmallButton
                        as="a"
                        $tone="dark"
                        href={c.token.audit.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {tx.audit}
                      </SmallButton>
                    )}
                    <Trade>
                      {tx.trade}
                      {c.token.trade.map((t) => (
                        <a
                          key={t.link}
                          href={t.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={tx.tradeOn(
                            c.token.symbol,
                            tradeName(t.link),
                          )}
                          title={tradeName(t.link)}
                          onClick={() =>
                            logTrackClickEventAnalytics('trade_click')
                          }
                        >
                          <img src={t.icon} alt="" />
                        </a>
                      ))}
                    </Trade>
                  </Actions>
                </CardBox>
              </Reveal>
            );
          })}
        </Grid>
        <Note>{tx.note}</Note>
      </ArcadeContainer>
    </ArcadeSection>
  );
};

export default TokenCards;
