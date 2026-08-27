import React, { useCallback, useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import {
  item,
  rareItem,
  spRareItem,
  epicItem,
  lgItem,
  splgItem,
} from 'src/data/item';
import { RarityConfig, RarityType, RARITYDEFINE } from 'src/data/rarity';
import houseImage from '../../assests/NFTItems/House.png';
import styled, { keyframes } from 'styled-components';
import coppy from '../../assests/updateHome/Ô button/iconCoppy.png';
import { isMobileDevice } from '../../utils/helpers';
import bHeroicon from '../../assests/images/bhero.png';
import stats from '../../assests/images/stats.png';
import new_stats from '../../assests/images/stats_new.png';
import bomberHouse from '../../assests/images/BomberHouse.png';
import rechart from '../../assests/NFTItems/recharge.png';
import screenShot from '../../assests/NFTItems/supervilla_screenshot.png';
import tonScreenShot from '../../assests/NFTItems/bombTON_house.png';
import solScreenShot from '../../assests/NFTItems/bombSOL_house.png';
import { NETWORK, NetworkType } from 'src/Contants/Contants';
import { LINK_SCAN } from 'src/Contants/Contants';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
} from 'src/theme/arcade';
import { Reveal, SectionTitle } from 'src/components/ui';
import { arcadeToast } from 'src/components/ui/toast';

const Head = styled.div`
  text-align: center;
`;

const TextTitle = styled.div`
  color: ${arcadeColors.smoke};
  font-size: 18px;
  line-height: 1.6;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 50px 0;
`;

/**
 * Linha de itens/raridades: uma coluna por item, na largura total do bloco.
 * O `gap` fixo de 60px somado às colunas passava da largura da tela no
 * celular — a grade era mais larga que o container e os primeiros ícones
 * saíam cortados pela esquerda.
 */
const Row = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  justify-items: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 60px;

  @media ${breakpoint.lg} {
    gap: 32px;
  }

  /* abaixo de 992px sete colunas não cabem: passa a três por linha */
  @media ${breakpoint.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  @media ${breakpoint.sm} {
    gap: 16px;
  }
`;

/** Uma casa da grade. Substitui o `Col` do bootstrap, cuja largura fixa
    brigava com o grid. */
const Cell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 0;
`;

const ImgItem = styled.img`
  display: block;
  text-align: center;
  margin: 0 auto;
  /* os sprites têm largura fixa e vazavam da coluna no celular; nas telas
     menores também encolhem um pouco para a grade respirar */
  max-width: 100%;
  height: auto;

  @media ${breakpoint.md} {
    max-width: 82%;
  }

  @media ${breakpoint.sm} {
    max-width: 70%;
  }
`;

const ImgStats = styled.img`
  display: flex;
  text-align: center;
  width: 70%;
  margin: 5% Auto 2% Auto;
`;
const ImgHouse = styled.img`
  display: flex;
  text-align: center;
  width: 85%;
  margin: 2% Auto 0 Auto;
`;
const ImgsScreenShot = styled.img`
  display: flex;
  text-align: center;
  width: 85%;
  margin: 5% Auto 0 Auto;
`;

const ContractInfo = styled.div`
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  width: 70%;
  padding: 18px 20px;
  margin: 0 auto;
  position: relative;
  text-align: left;

  .wallet-address {
    font-size: 14px;
    font-weight: bold;
    color: ${arcadeColors.cyan} !important;
    word-break: break-all;
  }

  .contract-title {
    font-size: 17px;
    font-weight: bold;
    color: ${arcadeColors.white} !important;
  }

  @media screen and (max-width: 990px) {
    width: 100%;
  }
`;

const MarketBtn = styled.button`
  display: inline-block;
  font-family: ${arcadeFonts.display};
  font-size: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(4)};
  padding: 10px 22px;
  margin-top: 16px;
  cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.08s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${hardShadow(6)};
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: ${hardShadow(0)};
  }

  /* No mobile o cartão vira coluna, então o botão fica centralizado
     em vez de encostado à esquerda. */
  @media screen and (max-width: 990px) {
    display: block;
    margin: 16px auto 0;
  }
`;

const ContractContain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 12px; /* khoảng cách giữa các khối */

  @media screen and (max-width: 990px) {
    flex-wrap: wrap;
  }
`;
const CoinIcon = styled.img`
  width: 60px;
  height: 60px;
`;
const CoppyIcon = styled.img`
  width: 25px;
  height: 25px;
  margin: 23px 2px 0px 0px;
  cursor: pointer;
`;

/**
 * Espaço do botão de copiar. Quando o cartão quebra em coluna, ele caía
 * sozinho numa linha própria à esquerda; nessa largura vai para o canto
 * superior direito, ao lado do endereço.
 */
const CopySlot = styled.div`
  width: 30px;
  flex-shrink: 0;

  @media screen and (max-width: 990px) {
    position: absolute;
    top: 6px;
    right: 14px;
    width: auto;

    ${CoppyIcon} {
      margin: 0;
    }
  }
`;

const RarityText = styled.div`
  color: ${arcadeColors.smoke};
  font-size: 17px;
  line-height: 1.6;
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
  white-space: pre-line;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * Célula de uma raridade. O brilho do item selecionado é posicionado sobre
 * ela; antes ele era `absolute` solto na coluna, que então colapsava para
 * largura zero e empurrava a linha inteira para o lado.
 */
const RarityCell = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* encolhe até a imagem para que o brilho, medido em %, acompanhe o ícone
     e não a largura da coluna */
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  cursor: pointer;
`;

/** Raridade não selecionada: pula ao passar o mouse. */
const CursorPoint = styled.img<{ $hidden?: boolean }>`
  position: relative;
  max-width: 100%;
  height: auto;
  cursor: pointer;

  /* na raridade selecionada quem aparece é a arte com brilho, que já traz o
     ícone desenhado — esta fica só reservando o espaço da célula, saindo
     por fade para a troca não dar um "salto" */
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  transition: transform 0.15s ease, opacity 0.2s ease;

  ${RarityCell}:hover & {
    transform: ${({ $hidden }) =>
      $hidden ? 'none' : 'translateY(-6px) scale(1.06)'};
  }
`;

/* o brilho entra por fade em vez de aparecer de uma vez */
const glowIn = keyframes`
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.88); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

/* a raridade selecionada pulsa de leve */
const glowPulse = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.06); }
`;

const Glow = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: none;
  width: 165%;
  height: auto;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: ${glowIn} 0.25s ease-out both,
    ${glowPulse} 1.8s ease-in-out 0.25s infinite;
`;

const LeftText = styled.div`
  text-align: left;
  margin-top: 7px;
`;

const Shield1 = styled.img`
  margin-left: 60%;
  margin-top: -45%;
`;
const Shield2 = styled.img`
  margin-left: 60%;
  margin-top: -80%;
`;

const NFTCONFIG = {
  BNB: {
    hero: {
      title: 'Bombcrypto Hero (BNB)',
      symbol: 'BHERO',
      address: '0x30cc0553f6fa1faf6d7847891b9b36eb559dc618',
      market:
        'https://market.bombcrypto.io/market/bhero?page=1&size=10&order_by=desc%3Ablock_timestamp',
    },
    house: {
      title: 'Bombcrypto House (BNB)',
      symbol: 'BHOUSE',
      address: '0xea3516fEB8F3e387eeC3004330Fd30Aff615496A',
      market:
        'https://market.bombcrypto.io/market/bhouse?page=1&size=10&order_by=desc%3Ablock_timestamp',
    },
  },
  Polygon: {
    hero: {
      title: 'Bombcrypto Hero (POL)',
      symbol: 'BHERO',
      address: '0xd8a06936506379dbbe6e2d8ab1d8c96426320854',
      // market único, independente da rede
      market:
        'https://market.bombcrypto.io/market/bhero?page=1&size=10&order_by=desc%3Ablock_timestamp',
    },
    house: {
      title: 'Bombcrypto House (POL)',
      symbol: 'BHOUSE',
      address: '0x2d5f4ba3e4a2d991bd72edbf78f607c174636618',
      market:
        'https://market.bombcrypto.io/market/bhouse?page=1&size=10&order_by=desc%3Ablock_timestamp',
    },
  },
  Ton: {
    hero: {
      title: 'Bombcrypto Hero (TON)',
      symbol: 'BHERO',
      address: '',
      market: '',
    },
    house: {
      title: 'Bombcrypto House (TON)',
      symbol: 'BHOUSE',
      address: '',
      market: '',
    },
  },
  Solana: {
    hero: {
      title: 'Bombcrypto Hero (SOL)',
      symbol: 'BHERO',
      address: '',
      market: '',
    },
    house: {
      title: 'Bombcrypto House (SOL)',
      symbol: 'BHOUSE',
      address: '',
      market: '',
    },
  },
};

const NFTItem: React.FC<{ id: string; network: string }> = ({
  id,
  network,
}) => {
  const isMobile = isMobileDevice();
  const [raritySelected, setSelectRarity] = useState(RARITYDEFINE.COMMON);
  const rarityClick = (id) => {
    setSelectRarity(id);
  };

  useEffect(() => {
    setSelectRarity((prev) => validateRarityByNetwork(network, prev));
  }, [network]);

  const validateRarityByNetwork = (
    rarity: RarityType,
    network: string,
  ): RarityType => {
    const { main, extra } = getRarityConfig(network);

    const allRarities = [
      ...main.map((r) => r.rarity),
      ...(extra?.map((r) => r.rarity) || []),
    ];

    return allRarities.includes(rarity) ? rarity : RARITYDEFINE.COMMON;
  };

  const onClickAddress = (address: string) => {
    if (!address || address.trim() === '') {
      arcadeToast('Information not available.');
      return;
    }

    const scanMap: Record<NetworkType, string> = {
      [NETWORK.BINANCE]: LINK_SCAN.BINANCE,
      [NETWORK.POLYGON]: LINK_SCAN.POLYGON,
      [NETWORK.TON]: LINK_SCAN.TON,
      [NETWORK.SOLANA]: LINK_SCAN.SOLANA,
    };

    const scanUrl = scanMap[network]; // `network` phải là biến toàn cục hoặc prop

    if (!scanUrl || scanUrl.trim() === '') {
      arcadeToast('Information not available.');
      return;
    }

    const url =
      network === NETWORK.SOLANA
        ? `${scanUrl}/token/${address}`
        : network === NETWORK.TON
        ? `${scanUrl}/jetton/${address}`
        : `${scanUrl}/address/${address}`;

    window.open(url);
  };

  const getScreenshotByNetwork = (network: string) => {
    switch (network) {
      case NETWORK.TON:
        return tonScreenShot;
      case NETWORK.SOLANA:
        return solScreenShot;
      case NETWORK.BINANCE:
      case NETWORK.POLYGON:
      default:
        return screenShot;
    }
  };

  function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      arcadeToast('Address copied!');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }
  const Copy = useCallback((text) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        function () {
          arcadeToast('Address copied!');
          console.log('Async: Copying to clipboard was successful!');
        },
        function (err) {
          console.error('Async: Could not copy text: ', err);
        },
      );
    } else {
      unsecuredCopyToClipboard(text);
    }
  }, []);

  const getNFTConfig = (network: NetworkType) => {
    const configMap: Record<
      NetworkType,
      typeof NFTCONFIG[keyof typeof NFTCONFIG]
    > = {
      [NETWORK.BINANCE]: NFTCONFIG.BNB,
      [NETWORK.POLYGON]: NFTCONFIG.Polygon,
      [NETWORK.TON]: NFTCONFIG.Ton,
      [NETWORK.SOLANA]: NFTCONFIG.Solana,
    };

    return configMap[network] ?? NFTCONFIG.BNB; // fallback nếu sai network
  };

  const hero = getNFTConfig(network).hero;
  const hasHeroAddress = !!hero.address;

  const house = getNFTConfig(network).house;
  const hasHouseAddress = !!house.address;
  const hasHouseMarket = !!house.market;

  const getRarityConfig = (network: NetworkType) => {
    const configRarity: Record<
      NetworkType,
      typeof RarityConfig[keyof typeof RarityConfig]
    > = {
      [NETWORK.BINANCE]: RarityConfig.BINANCE,
      [NETWORK.POLYGON]: RarityConfig.POLYGON,
      [NETWORK.TON]: RarityConfig.TON,
      [NETWORK.SOLANA]: RarityConfig.SOLANA,
    };

    return configRarity[network] ?? RarityConfig.BINANCE; // fallback nếu sai network
  };

  const getItemByNetworkAndRarity = (
    network: NetworkType,
    rarity: RarityType,
  ) => {
    const isSpecialNetwork =
      network === NETWORK.TON || network === NETWORK.SOLANA;

    if (isSpecialNetwork) {
      switch (rarity) {
        case RARITYDEFINE.RARE:
          return rareItem;
        case RARITYDEFINE.SUPER_RARE:
          return spRareItem;
        case RARITYDEFINE.EPIC:
          return epicItem;
        case RARITYDEFINE.LEGEND:
          return lgItem;
        case RARITYDEFINE.SUPER_LEGEND:
          return splgItem;
        default:
          return item;
      }
    }

    return item;
  };

  return (
    <section id={id}>
      <Container>
        <Content className="detail">
          <Head>
            <SectionTitle $center className="title">
              NFT Items
            </SectionTitle>
            <TextTitle className="text">
              Earn your NFT items by playing the
              <br />
              game and sell it on the marketplace to make money
              <br />
            </TextTitle>
            <br />
            <Reveal>
              <ContractInfo className="mb-3">
                <ContractContain>
                  {/* Icon + Symbol */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: '60px',
                    }}
                  >
                    <CoinIcon src={bHeroicon} alt="bhero" />
                    <p className="mb-0 text-black contract-title">
                      {hero.symbol}
                    </p>
                  </div>

                  {/* Title + Address */}
                  <div style={{ flexGrow: 1 }}>
                    <LeftText>
                      <p className="mb-0 text-black contract-title">
                        {hero.title}
                      </p>
                      <p
                        className="mb-0 text-blue wallet-address"
                        style={{
                          cursor: hasHeroAddress ? 'pointer' : 'default',
                        }}
                        onClick={() =>
                          hasHeroAddress && onClickAddress(hero.address)
                        }
                      >
                        {hasHeroAddress ? hero.address : 'Coming soon'}
                      </p>
                    </LeftText>
                  </div>

                  {/* Coppy icon (ẩn khi thiếu nhưng giữ layout) */}
                  <CopySlot>
                    {!isMobile && hasHeroAddress && (
                      <CoppyIcon
                        src={coppy}
                        alt="Copy address"
                        onClick={() => Copy(hero.address)}
                      />
                    )}
                  </CopySlot>
                </ContractContain>

                {hero.market && (
                  <MarketBtn
                    type="button"
                    onClick={() => window.open(hero.market)}
                  >
                    Visit Market
                  </MarketBtn>
                )}
              </ContractInfo>
            </Reveal>
            <RarityText>
              <br />
              BHero is an NFT, serving as a hero within the game, with various
              attributes and rarities. It can be minted infinitely within the
              game or traded in the marketplace. Currently, BHero is used to
              mine reward tokens within the game, and in the future, it will be
              utilized in other on-chain features of the game.
              <br />
            </RarityText>
          </Head>
          {/* Main rarity row */}
          <Row
            $cols={getRarityConfig(network).main.length}
            style={{ marginTop: '50px' }}
          >
            {getRarityConfig(network).main.map((v, i) => (
              <Cell key={i}>
                <RarityCell onClick={() => rarityClick(v.rarity)}>
                  {raritySelected == v.rarity && (
                    <Glow src={v.glow} alt="layer" />
                  )}
                  <CursorPoint
                    src={v.image}
                    alt={raritySelected == v.rarity ? '' : 'layer'}
                    aria-hidden={raritySelected == v.rarity}
                    $hidden={raritySelected == v.rarity}
                  />
                </RarityCell>
              </Cell>
            ))}
          </Row>

          {/* Extra rarity row (optional) */}
          {getRarityConfig(network).extra && (
            <Row
              $cols={getRarityConfig(network).extra?.length || 1}
              style={{ marginTop: '50px' }}
            >
              {getRarityConfig(network).extra?.map((v, i) => (
                <Cell key={`extra-${i}`}>
                  <RarityCell onClick={() => rarityClick(v.rarity)}>
                    {raritySelected == v.rarity && (
                      <Glow src={v.glow} alt="layer" />
                    )}
                    <CursorPoint
                      src={v.image}
                      alt={raritySelected == v.rarity ? '' : 'layer'}
                      aria-hidden={raritySelected == v.rarity}
                      $hidden={raritySelected == v.rarity}
                    />
                  </RarityCell>
                </Cell>
              ))}
            </Row>
          )}
          <Row $cols={5} style={{ marginTop: '50px' }}>
            {getItemByNetworkAndRarity(network, raritySelected).map((v, i) => {
              return (
                <Cell key={i}>
                  <ImgItem src={v.new || ''} className="new" />
                  <ImgItem src={v.image} alt="layer" />
                  <div
                    style={{
                      visibility:
                        raritySelected == RARITYDEFINE.S ? 'visible' : 'hidden',
                    }}
                  >
                    {v.id === 0 || v.id === 1 || v.id === 2 ? (
                      <Shield1 src={v.shield} alt="shield" />
                    ) : (
                      <Shield2 src={v.shield} alt="shield" />
                    )}
                  </div>
                </Cell>
              );
            })}
          </Row>
          <RarityText>
            The higher the rarity the stronger stats
            <br />
            your BHero has
            <br />
          </RarityText>
          <Reveal>
            <ImgStats
              src={
                network === NETWORK.BINANCE || network === NETWORK.POLYGON
                  ? stats
                  : new_stats
              }
            />
          </Reveal>

          <Reveal>
            <ContractInfo className="mb-3">
              <ContractContain>
                {/* Icon + Symbol */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: '60px',
                  }}
                >
                  <CoinIcon src={bomberHouse} alt="bhouse" />
                  <p className="mb-0 text-black contract-title">
                    {house.symbol}
                  </p>
                </div>

                {/* Title + Address */}
                <div style={{ flexGrow: 1 }}>
                  <LeftText>
                    <p className="mb-0 text-black contract-title">
                      {house.title}
                    </p>
                    <p
                      className="mb-0 text-blue wallet-address"
                      style={{
                        cursor: hasHouseAddress ? 'pointer' : 'default',
                      }}
                      onClick={() =>
                        hasHouseAddress && onClickAddress(house.address)
                      }
                    >
                      {hasHouseAddress ? house.address : 'Coming soon'}
                    </p>
                  </LeftText>
                </div>

                {/* Copy icon */}
                <CopySlot>
                  {!isMobile && hasHouseAddress && (
                    <CoppyIcon
                      src={coppy}
                      alt="Copy address"
                      onClick={() => Copy(house.address)}
                    />
                  )}
                </CopySlot>
              </ContractContain>

              {/* Visit Market button */}
              {hasHouseMarket && (
                <MarketBtn
                  type="button"
                  onClick={() => window.open(house.market)}
                >
                  Visit Market
                </MarketBtn>
              )}
            </ContractInfo>
          </Reveal>
          <RarityText>
            <br />
            BHouse is an NFT, serving as the homes of heroes within the game,
            aiding in the restoration of energy depleted after mining rewards.
            It comes with various stats and sizes and can be minted in limited
            quantities within the game or traded on the marketplace
            <br />
          </RarityText>
          <Reveal>
            <ImgHouse src={houseImage} />
          </Reveal>
          <RarityText>
            The higher the tier of the house the faster your{'\n'}BHero recharge
          </RarityText>
          <Reveal>
            <ImgHouse src={rechart} />
          </Reveal>
          <Reveal>
            <ImgsScreenShot src={getScreenshotByNetwork(network)} />
          </Reveal>
        </Content>
      </Container>
    </section>
  );
};

export default NFTItem;
