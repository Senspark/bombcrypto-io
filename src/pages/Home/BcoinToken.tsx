import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Container } from 'react-bootstrap';

//import logo from 'src/assests/bcoin-token/1-logo.png';
import BcoinTokenHero from 'src/assests/bcoin-token/BcoinTokenHero.png';
import { isMobileDevice } from 'src/utils/helpers';
import coppy from 'src/assests/updateHome/Ô button/iconCoppy.png';
import linkIcon from 'src/assests/images/link.png';
import { NETWORK, LINK_SCAN, NetworkType } from 'src/Contants/Contants';
import {
  BNB_CONFIG,
  POLYGON_CONFIG,
  TON_CONFIG,
  SOLANA_CONFIG,
} from 'src/configs/BToken';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';
import { Reveal, SectionTitle } from 'src/components/ui';
import { arcadeToast } from 'src/components/ui/toast';

const BcoinToken: React.FC<{ id: string; networkSelected: string }> = ({
  id,
  networkSelected,
}) => {
  const isMobile = isMobileDevice();

  function detectMetaMask() {
    // roda também no pré-render (SSG), onde não existe window
    if (typeof window === 'undefined') {
      return undefined;
    }
    if (
      typeof window.ethereum !== 'undefined' ||
      typeof window.web3 !== 'undefined'
    ) {
      // Web3 browser user detected. You can now use the provider.
      // @ts-ignore
      return window['ethereum'] || window.web3.currentProvider;
    }
  }

  const provider = detectMetaMask();

  function addToMetaMask(chainId, token) {
    if (!provider) {
      arcadeToast('MetaMask not installed. Please install MetaMask.');
      return;
    }

    if (provider.chainId !== chainId) {
      if (chainId === BNB_CONFIG.chainId) {
        arcadeToast('Please switch MetaMask to BNB Chain.');
        return;
      }

      if (chainId === POLYGON_CONFIG.chainId) {
        arcadeToast('Please switch MetaMask to Polygon.');
        return;
      }
      provider.request({
        method: 'wallet_switchEthereumChain',
        params: {
          chainId: chainId,
        },
      });
      return;
    }

    provider
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: token,
        },
      })
      .then((success) => {
        if (success) {
          console.log(`${token.symbol} successfully added to wallet!`);
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch(console.error);
  }

  const addMetamask = useCallback((chainId, tokenOption) => {
    logTrackClickEventAnalytics('addmask_click');
    addToMetaMask(chainId, tokenOption);
  }, []);

  const onClickAddress = (network: NetworkType, address: string) => {
    const scanMap: Record<NetworkType, string> = {
      [NETWORK.BINANCE]: LINK_SCAN.BINANCE,
      [NETWORK.POLYGON]: LINK_SCAN.POLYGON,
      [NETWORK.TON]: LINK_SCAN.TON,
      [NETWORK.SOLANA]: LINK_SCAN.SOLANA,
    };

    const scanUrl = scanMap[network];

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

  const onClickOpen = useCallback((link) => {
    if (!link || link.trim() === '' || link === '#') {
      arcadeToast('Information not available.');
      return;
    }

    window.open(link);
    window.open(link);
  }, []);

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
        },
        function (err) {
          console.error('Async: Could not copy text: ', err);
        },
      );
    } else {
      unsecuredCopyToClipboard(text);
    }
  }, []);

  const getFirstAddress = (text) => {
    if (text.length <= 4) {
      return text;
    }
    const firstThreeChars = text.slice(0, 4);
    return firstThreeChars;
  };

  const getTailAddress = (text) => {
    if (text.length <= 4) {
      return text;
    }
    const firstThreeChars = text.slice(4);
    return firstThreeChars;
  };

  const getConfig = () => {
    switch (networkSelected) {
      case NETWORK.BINANCE:
        return BNB_CONFIG;
      case NETWORK.POLYGON:
        return POLYGON_CONFIG;
      case NETWORK.TON:
        return TON_CONFIG;
      case NETWORK.SOLANA:
        return SOLANA_CONFIG;
      default:
        return BNB_CONFIG; // fallback
    }
  };

  const config = getConfig();
  const tokenBcoin = config?.token_bcoin;
  const tokenSen = config?.token_sen;

  return (
    <section id={id}>
      <HeroDecoration src={BcoinTokenHero} alt="" aria-hidden="true" />
      <Container style={{ position: 'relative' }}>
        <Contain className="detail">
          <SectionTitle $center>Tokens</SectionTitle>
          <Body>
            {tokenBcoin && (
              <Reveal>
                <BackgroundContract>
                  <ContractHeader className="mb-3">
                    <div style={{ position: 'absolute' }}>
                      <CoinIcon src={tokenBcoin.icon} alt="bcoin" />
                      <p className="mb-0 contract-title">
                        {tokenBcoin.symbol ?? '---'}
                      </p>
                    </div>
                    <ContractHeaderCenter isMobile={isMobile}>
                      <p className="mb-0 contract-title">
                        {tokenBcoin.title ?? '---'}
                      </p>
                      <Ellipsis
                        className="mb-0 text-blue wallet-address cursor-pointer"
                        style={{ lineHeight: '2' }}
                      >
                        <div
                          onClick={() =>
                            onClickAddress(
                              networkSelected,
                              tokenBcoin.address ?? '',
                            )
                          }
                        >
                          {tokenBcoin.address
                            ? getFirstAddress(tokenBcoin.address)
                            : 'Coming soon'}
                        </div>
                        <div
                          className="ellipsisRtl"
                          onClick={() =>
                            onClickAddress(
                              networkSelected,
                              tokenBcoin.address ?? '',
                            )
                          }
                        >
                          {getTailAddress(tokenBcoin.address ?? '')}
                        </div>
                        {!isMobile && tokenBcoin.address && (
                          <CoppyIcon
                            src={coppy}
                            onClick={() => Copy(tokenBcoin.address)}
                          />
                        )}
                      </Ellipsis>
                    </ContractHeaderCenter>
                    {!isMobile && config.chainId && (
                      <ButtonMetaMask
                        onClick={() => addMetamask(config.chainId, tokenBcoin)}
                        className="bg-blue border-0 text-white"
                      >
                        Add To <br /> MetaMask
                      </ButtonMetaMask>
                    )}
                  </ContractHeader>

                  <ContractBody style={{ margin: '15px ' }}>
                    <div className="text-blue contract-info">
                      <span className="text-white contract-title">Pool:</span>{' '}
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          onClickOpen(tokenBcoin.pool?.link ?? '#')
                        }
                      >
                        {tokenBcoin.pool?.name ?? '---'}
                      </span>
                    </div>

                    <div className="contract-info">
                      <span className="contract-title">
                        {tokenBcoin.symbol ?? '---'} /{' '}
                      </span>
                      <span className="extra-light">
                        {tokenBcoin.pair?.name ?? '---'}
                      </span>
                    </div>

                    <Ellipsis className="contract-info contract-title">
                      PAIR:
                      <div
                        className="extra-light"
                        style={{ marginLeft: '4px' }}
                      >
                        {tokenBcoin.pair?.address
                          ? getFirstAddress(tokenBcoin.pair.address)
                          : 'Coming soon'}
                      </div>
                      <div className="extra-light ellipsisRtl">
                        {getTailAddress(tokenBcoin.pair?.address ?? '')}
                      </div>
                      {!isMobile && tokenBcoin.pair?.address && (
                        <CoppyIcon
                          src={coppy}
                          onClick={() => Copy(tokenBcoin.pair.address)}
                        />
                      )}
                    </Ellipsis>

                    <div className="contract-info">
                      <span className="contract-title">Liq: </span>
                      <span className="extra-light">
                        {tokenBcoin.pair?.liq ?? '---'}
                      </span>
                    </div>
                  </ContractBody>

                  <ContractFooter>
                    <FooterContain>
                      <div className="left">
                        <div className="bigTitle tradeColor">
                          Trade at:
                          {tokenBcoin.trade?.map((v, index) => (
                            <TradeIcon
                              key={index}
                              src={v.icon}
                              onClick={() => onClickOpen(v.link)}
                            />
                          ))}
                        </div>
                      </div>
                      {tokenBcoin.audit?.link && (
                        <div className="right">
                          <div
                            className="bigTitle auditedColor"
                            onClick={() => onClickOpen(tokenBcoin.audit.link)}
                          >
                            Audited by:
                            <AuditedIcon src={tokenBcoin.audit.icon} />
                            <LinkIcon src={linkIcon} />
                          </div>
                        </div>
                      )}
                    </FooterContain>
                  </ContractFooter>
                </BackgroundContract>
              </Reveal>
            )}
            <RarityText>{tokenBcoin?.Description}</RarityText>
            {tokenSen && (
              <Reveal>
                <BackgroundContract>
                  <ContractHeader className="mb-3">
                    <div style={{ position: 'absolute' }}>
                      <CoinIcon src={tokenSen.icon} alt="sen" />
                      <p
                        className="mb-0 contract-title"
                        style={{ marginLeft: '8px' }}
                      >
                        {tokenSen.symbol}
                      </p>
                    </div>
                    <ContractHeaderCenter isMobile={isMobile}>
                      <p className="mb-0 contract-title">{tokenSen.title}</p>
                      <Ellipsis
                        className="mb-0 text-blue wallet-address cursor-pointer"
                        style={{ lineHeight: '2' }}
                      >
                        <div
                          onClick={() =>
                            onClickAddress(
                              networkSelected,
                              tokenSen.address ?? '',
                            )
                          }
                        >
                          {getFirstAddress(tokenSen.address ?? '')}
                        </div>
                        <div
                          className="ellipsisRtl"
                          onClick={() =>
                            onClickAddress(
                              networkSelected,
                              tokenSen.address ?? '',
                            )
                          }
                        >
                          {getTailAddress(tokenSen.address ?? '')}
                        </div>
                        {!isMobile && (
                          <CoppyIcon
                            src={coppy}
                            onClick={() => Copy(tokenSen.address ?? '')}
                          />
                        )}
                      </Ellipsis>
                    </ContractHeaderCenter>
                    {!isMobile && (
                      <ButtonMetaMask
                        onClick={() =>
                          addMetamask(
                            getConfig().chainId,
                            getConfig().token_sen,
                          )
                        }
                        className="bg-blue border-0 text-white"
                      >
                        Add To <br /> MetaMask
                      </ButtonMetaMask>
                    )}
                  </ContractHeader>
                  <ContractBody style={{ margin: '15px ' }}>
                    <div className="text-blue contract-info">
                      <span className="text-white contract-title">Pool:</span>{' '}
                      <span
                        className="cursor-pointer"
                        onClick={() => onClickOpen(tokenSen.pool?.link ?? '#')}
                      >
                        {tokenSen.pool?.name ?? 'Coming soon'}
                      </span>
                    </div>
                    <div className="contract-info">
                      <span className="contract-title">SEN / </span>
                      <span className="extra-light">WBNB</span>
                    </div>
                    <Ellipsis className="contract-info contract-title">
                      PAIR:
                      <div
                        className="extra-light"
                        style={{ marginLeft: '4px' }}
                      >
                        {getFirstAddress(tokenSen.pair?.address ?? '')}
                      </div>
                      <div className="extra-light ellipsisRtl">
                        {getTailAddress(tokenSen.pair?.address ?? '')}
                      </div>
                      {!isMobile && (
                        <CoppyIcon
                          src={coppy}
                          onClick={() => Copy(tokenSen.pair?.address ?? '')}
                        />
                      )}
                    </Ellipsis>
                    <div className="contract-info">
                      <span className="contract-title">Liq: </span>
                      <span className="extra-light">
                        {tokenSen.pair?.liq ?? '---'}
                      </span>
                    </div>
                  </ContractBody>
                  <ContractFooter>
                    <FooterContain>
                      <div className="bigTitle tradeColor">
                        Trade at:
                        {tokenSen.trade?.map((v, index) => (
                          <TradeIcon
                            key={index}
                            src={v.icon}
                            onClick={() => onClickOpen(v.link)}
                          />
                        ))}
                      </div>
                      {tokenSen.audit?.link && (
                        <div
                          className="bigTitle auditedColor"
                          onClick={() => onClickOpen(tokenSen.audit.link)}
                        >
                          Audited by:
                          <AuditedIcon src={tokenSen.audit.icon} />
                          <LinkIcon src={linkIcon} />
                        </div>
                      )}
                    </FooterContain>
                  </ContractFooter>
                </BackgroundContract>
              </Reveal>
            )}
            <RarityText>{tokenSen?.Description}</RarityText>
          </Body>
        </Contain>
      </Container>
    </section>
  );
};

/* flutuação preservando o espelhamento do personagem */
const floatFlip = keyframes`
  0%, 100% { transform: rotateY(180deg) translateY(0); }
  50% { transform: rotateY(180deg) translateY(-16px); }
`;

/** Personagem decorativo à esquerda — flutua devagar; some em telas menores. */
const HeroDecoration = styled.img`
  position: absolute;
  width: 26rem;
  margin-top: 8%;
  right: 72%;
  animation: ${floatFlip} 5s ease-in-out infinite;
  pointer-events: none;
  opacity: 0.9;

  @media screen and (max-width: 1399px) {
    display: none;
  }
`;

const ButtonMetaMask = styled.button`
  font-family: ${arcadeFonts.display};
  font-size: 13px;
  line-height: 1.4;
  height: 54px;
  width: 128px;
  border: ${arcadeBorder.thin} !important;
  border-radius: ${arcadeRadius.md};
  background: ${arcadeColors.blue} !important;
  color: ${arcadeColors.white} !important;
  box-shadow: ${hardShadow(4)};
  flex: 0 0 auto;
  margin-left: auto;
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
`;

const RarityText = styled.p`
  color: ${arcadeColors.smoke};
  font-size: 17px;
  line-height: 1.6;
  text-align: center;
  margin-top: 20px;
`;

const Body = styled.div`
  width: 80%;
  margin-left: 10%;

  @media screen and (max-width: 991px) {
    width: 100%;
    margin-left: 0%;
  }
`;

const BackgroundContract = styled.div`
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  overflow: hidden;
  margin-top: 4%;

  .wallet-address {
    font-size: 14px;
    font-weight: bold;
    color: ${arcadeColors.cyan} !important;

    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  .contract-title {
    font-size: 1.05rem;
    font-weight: bold;
    color: ${arcadeColors.white} !important;
  }

  .contract-info {
    font-size: 17px;
    color: ${arcadeColors.cloud};
  }

  .text-blue {
    color: ${arcadeColors.cyan} !important;
  }

  .extra-light {
    font-weight: normal;
    color: ${arcadeColors.smoke};
  }
`;

/**
 * Faixa de topo do card. Vira flex para que ícone, dados e botão fiquem em
 * linha sem posicionamento absoluto — o layout antigo estourava em telas
 * estreitas.
 */
const ContractHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding: 14px 15px;
  background: ${arcadeColors.panelLight};
  border-bottom: ${arcadeBorder.thick};
  position: relative;

  /* bloco do ícone + símbolo, que vinha com position: absolute inline */
  > div:first-child {
    position: static !important;
    text-align: center;
  }
`;

const ContractBody = styled.div`
  background: rgba(0, 0, 0, 0.25);
  border: ${arcadeBorder.thin};
  padding: 12px 15px;
  border-radius: ${arcadeRadius.md};
  justify-content: space-around;

  @media screen and (min-width: 0px) {
    margin: 15px;
  }
`;

const ContractFooter = styled.div`
  background: ${arcadeColors.nightDeep};
  border-top: ${arcadeBorder.thin};
  padding: 8px 12px;
`;

const FooterContain = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .bigTitle {
    font-family: ${arcadeFonts.display};
    font-size: 17px;
    letter-spacing: 1px;
    text-align: left;
    margin: 0px 10px 0px 5px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
  }

  .tradeColor {
    color: ${arcadeColors.green};
  }

  .auditedColor {
    color: ${arcadeColors.yellow};
    cursor: pointer;
  }
`;

const LinkIcon = styled.img`
  display: inline;
  width: 15px;
  height: 15px;
  margin: 0 4px;
  cursor: pointer;
`;

/** Moeda gira em Y ao passar o mouse, como no jogo. */
const CoinIcon = styled.img`
  width: 50px;
  height: 50px;
  transition: transform 0.5s ease;

  &:hover {
    transform: rotateY(360deg);
  }
`;
const CoppyIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: -4px 5px auto;
`;
const TradeIcon = styled.img`
  height: 42px;
  margin: 6px 0 6px 6px;
  cursor: pointer;
  display: inline-block;
  border-radius: ${arcadeRadius.sm};
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
  }
`;

const AuditedIcon = styled.img`
  width: 140px;
  height: 38px;
  margin: 6px 0 6px 6px;
  cursor: pointer;
  display: inline-block;
`;

const ContractHeaderCenter = styled.div<{ isMobile: boolean }>`
  flex: 1 1 240px;
  min-width: 0;
  margin: 0;
`;

const Ellipsis = styled.div`
  display: flex;
  flex-wrap: nowrap;
  min-width: 0;
  overflow: hidden;

  .ellipsisRtl {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
  }
`;

const Contain = styled.div`
  margin: 0 auto;
  padding: 50px 0;
`;

export default BcoinToken;
