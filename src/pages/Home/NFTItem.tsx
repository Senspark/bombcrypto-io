import React, { useCallback, useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';

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
import styled from 'styled-components';
import coppy from '../../assests/updateHome/Ô button/iconCoppy.png';
import { isMobileDevice } from '../../utils/helpers';
import bHeroicon from '../../assests/images/bhero.png';
import stats from '../../assests/images/stats.png';
import new_stats from '../../assests/images/stats_new.png';
import bomberHouse from '../../assests/images/BomberHouse.png';
import marketBtn from '../../assests/NFTItems/visit_market.png';
import rechart from '../../assests/NFTItems/recharge.png';
import screenShot from '../../assests/NFTItems/supervilla_screenshot.png';
import tonScreenShot from '../../assests/NFTItems/bombTON_house.png';
import solScreenShot from '../../assests/NFTItems/bombSOL_house.png';
import { NETWORK, NetworkType } from 'src/Contants/Contants';
import { LINK_SCAN } from 'src/Contants/Contants';

const Head = styled.div`
  text-align: center;
`;

const Title = styled.p`
  color: white;
  font-weight: 800;
  font-size: 50px;
  margin: 0;
`;

const TextTitle = styled.div`
  color: white;
  font-size: 20px;
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 50px 0;
`;

const Row = styled.div`
  display: grid;
  justify-content: center; /* 👉 canh giữa grid */
  gap: 60px;
`;

const ImgItem = styled.img`
  display: block;
  text-align: center;
  margin: 0 auto;
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
  background-color: white;
  width: 60%;
  padding: 3px 10px 5px 10px;
  border-radius: 20px;
  margin-left: 20%;
  position: relative;

  .wallet-address {
    font-size: 14px;
    font-weight: bold;
  }

  @media screen and (max-width: 990px) {
    width: 100%;
    margin-left: 0%;
  }

  .contract-title {
    font-size: 18px;
    font-weight: bold;
  }
`;

const MarketBtn = styled.img`
  position: absolute;
  width: 40%;
  left: 30%;
  cursor: pointer;
  top: 80%;
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

const RarityText = styled.div`
  color: white;
  font-size: 24px;
  text-align: center;
  white-space: pre-line;
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CursorPoint = styled.img`
  position: relative;
  cursor: pointer;
`;

const Glow = styled.img`
  position: absolute;
  transform: translate(-22%, -22%);
  font-size: 18px;
  text-align: center;
  text-weight: bold;
  text-space: 1px
  magrin: 50%;
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
      market:
        'https://market-polygon.bombcrypto.io/market/bhero?page=1&size=10&order_by=desc%3Ablock_timestamp',
    },
    house: {
      title: 'Bombcrypto House (POL)',
      symbol: 'BHOUSE',
      address: '0x2d5f4ba3e4a2d991bd72edbf78f607c174636618',
      market:
        'https://market-polygon.bombcrypto.io/market/bhouse?page=1&size=10&order_by=desc%3Ablock_timestamp',
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
      alert('Information not available.');
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
      alert('Information not available.');
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
      alert(`Address Copied!`);
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  }
  const Copy = useCallback((text) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        function () {
          alert(`Address Copied!`);
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
            <Title className="title">NFT ITEMS</Title>
            <TextTitle className="text">
              Earn your NFT items by playing the
              <br />
              game and sell it on the marketplace to make money
              <br />
            </TextTitle>
            <br />
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
                      style={{ cursor: hasHeroAddress ? 'pointer' : 'default' }}
                      onClick={() =>
                        hasHeroAddress && onClickAddress(hero.address)
                      }
                    >
                      {hasHeroAddress ? hero.address : 'Coming soon'}
                    </p>
                  </LeftText>
                </div>

                {/* Coppy icon (ẩn khi thiếu nhưng giữ layout) */}
                <div style={{ width: '30px' }}>
                  {!isMobile && hasHeroAddress && (
                    <CoppyIcon src={coppy} onClick={() => Copy(hero.address)} />
                  )}
                </div>
              </ContractContain>

              {hero.market && (
                <MarketBtn
                  src={marketBtn}
                  onClick={() => window.open(hero.market)}
                />
              )}
            </ContractInfo>
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
            style={{
              gridTemplateColumns: `repeat(${
                getRarityConfig(network).main.length
              }, 1fr)`,
              marginTop: '50px',
              width: 'fit-content', // 👈 RẤT QUAN TRỌNG
              marginLeft: 'auto', // 👈 canh giữa ngang
              marginRight: 'auto',
            }}
          >
            {getRarityConfig(network).main.map((v, i) => (
              <Col xs={4} className="col-lg" key={i}>
                {raritySelected == v.rarity ? (
                  <div>
                    <Glow src={v.glow} alt="layer glow" />
                  </div>
                ) : (
                  <CursorPoint
                    src={v.image}
                    alt="layer"
                    onClick={() => rarityClick(v.rarity)}
                  />
                )}
              </Col>
            ))}
          </Row>

          {/* Extra rarity row (optional) */}
          {getRarityConfig(network).extra && (
            <Row
              style={{
                gridTemplateColumns: `repeat(${
                  getRarityConfig(network).extra?.length
                }, 1fr)`,
                marginTop: '50px',
                width: 'fit-content', // 👈 RẤT QUAN TRỌNG
                marginLeft: 'auto', // 👈 canh giữa ngang
                marginRight: 'auto',
              }}
            >
              {getRarityConfig(network).extra?.map((v, i) => (
                <Col xs={4} className="col-lg" key={`extra-${i}`}>
                  {raritySelected == v.rarity ? (
                    <div>
                      <Glow src={v.glow} alt="layer glow" />
                    </div>
                  ) : (
                    <CursorPoint
                      src={v.image}
                      alt="layer"
                      onClick={() => rarityClick(v.rarity)}
                    />
                  )}
                </Col>
              ))}
            </Row>
          )}
          <Row
            style={{
              gridTemplateColumns: `repeat(5, 1fr)`,
              marginTop: '50px',
              width: 'fit-content', // 👈 RẤT QUAN TRỌNG
              marginLeft: 'auto', // 👈 canh giữa ngang
              marginRight: 'auto',
            }}
          >
            {getItemByNetworkAndRarity(network, raritySelected).map((v, i) => {
              return (
                <Col xs={4} className="col-lg" key={i}>
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
                </Col>
              );
            })}
          </Row>
          <RarityText>
            The higher the rarity the stronger stats
            <br />
            your BHero has
            <br />
          </RarityText>
          <ImgStats
            src={
              network === NETWORK.BINANCE || network === NETWORK.POLYGON
                ? stats
                : new_stats
            }
          />

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
                <p className="mb-0 text-black contract-title">{house.symbol}</p>
              </div>

              {/* Title + Address */}
              <div style={{ flexGrow: 1 }}>
                <LeftText>
                  <p className="mb-0 text-black contract-title">
                    {house.title}
                  </p>
                  <p
                    className="mb-0 text-blue wallet-address"
                    style={{ cursor: hasHouseAddress ? 'pointer' : 'default' }}
                    onClick={() =>
                      hasHouseAddress && onClickAddress(house.address)
                    }
                  >
                    {hasHouseAddress ? house.address : 'Coming soon'}
                  </p>
                </LeftText>
              </div>

              {/* Copy icon */}
              <div style={{ width: '30px' }}>
                {!isMobile && hasHouseAddress && (
                  <CoppyIcon src={coppy} onClick={() => Copy(house.address)} />
                )}
              </div>
            </ContractContain>

            {/* Visit Market button */}
            {hasHouseMarket && (
              <MarketBtn
                src={marketBtn}
                onClick={() => window.open(house.market)}
              />
            )}
          </ContractInfo>
          <RarityText>
            <br />
            BHouse is an NFT, serving as the homes of heroes within the game,
            aiding in the restoration of energy depleted after mining rewards.
            It comes with various stats and sizes and can be minted in limited
            quantities within the game or traded on the marketplace
            <br />
          </RarityText>
          <ImgHouse src={houseImage} />
          <RarityText>
            The higher the tier of the house the faster your{'\n'}BHero recharge
          </RarityText>
          <ImgHouse src={rechart} />
          <ImgsScreenShot src={getScreenshotByNetwork(network)} />
        </Content>
      </Container>
    </section>
  );
};

export default NFTItem;
