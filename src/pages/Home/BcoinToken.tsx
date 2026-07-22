import React, { useCallback } from 'react';
import styled from 'styled-components';
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

const BcoinToken: React.FC<{ id: string; networkSelected: string }> = ({
  id,
  networkSelected,
}) => {
  const isMobile = isMobileDevice();

  function detectMetaMask() {
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
      alert('Metamask not installed. Please install Metamask.');
      return;
    }

    if (provider.chainId !== chainId) {
      if (chainId === BNB_CONFIG.chainId) {
        alert(`Please switch Metamask to Binance Smartchain Network.`);
        return;
      }

      if (chainId === POLYGON_CONFIG.chainId) {
        alert(`Please switch Metamask to Polygon Smartchain Network.`);
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

  const onClickOpen = useCallback((link) => {
    if (!link || link.trim() === '' || link === '#') {
      alert('Information not available.');
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
      <img
        src={BcoinTokenHero}
        style={{
          position: 'absolute',
          width: '30rem',
          marginTop: '10%',
          right: '70%',
          transform: 'rotateY(180deg)',
        }}
      />
      <Container style={{ position: 'relative' }}>
        <Contain className="detail">
          <Title>TOKENS</Title>
          <Body>
            {tokenBcoin && (
              <BackgroundContract>
                <ContractHeader className="mb-3">
                  <div style={{ position: 'absolute' }}>
                    <CoinIcon src={tokenBcoin.icon} alt="bcoin" />
                    <p className="mb-0 text-black contract-title">
                      {tokenBcoin.symbol ?? '---'}
                    </p>
                  </div>
                  <ContractHeaderCenter isMobile={isMobile}>
                    <p className="mb-0 text-black contract-title">
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
                      onClick={() => onClickOpen(tokenBcoin.pool?.link ?? '#')}
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
                    <div className="extra-light" style={{ marginLeft: '4px' }}>
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
            )}
            <RarityText>{tokenBcoin?.Description}</RarityText>
            {tokenSen && (
              <BackgroundContract>
                <ContractHeader className="mb-3">
                  <div style={{ position: 'absolute' }}>
                    <CoinIcon src={tokenSen.icon} alt="sen" />
                    <p
                      className="mb-0 text-black contract-title"
                      style={{ marginLeft: '8px' }}
                    >
                      {tokenSen.symbol}
                    </p>
                  </div>
                  <ContractHeaderCenter isMobile={isMobile}>
                    <p className="mb-0 text-black contract-title">
                      {tokenSen.title}
                    </p>
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
                        addMetamask(getConfig().chainId, getConfig().token_sen)
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
                    <div className="extra-light" style={{ marginLeft: '4px' }}>
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
            )}
            <RarityText>{tokenSen?.Description}</RarityText>
          </Body>
        </Contain>
      </Container>
    </section>
  );
};

const ButtonMetaMask = styled.button`
  font-size: 16px;
  height: 50px;
  width: 115px;
  border-radius: 15px;
  position: absolute;
  right: 15px;
  top: 10px;
`;

const RarityText = styled.p`
  color: white;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
`;

const Body = styled.div`
  width: 80%;
  margin-left: 10%;

  @media screen and (max-width: 510px) {
    width: 100%;
    margin-left: 0%;
  }
`;

const BackgroundContract = styled.div`
  background-color: #1e3cab;
  border-radius: 20px;
  margin-top: 4%;

  .wallet-address {
    font-size: 14px;
    font-weight: bold;

    @media screen and (max-width: 600px) {
      font-size: 12px;
    }
  }

  .contract-title {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .contract-info {
    font-size: 18px;
  }

  .extra-light {
    font-family: 'Roboto-Light';
    font-weight: normal;
  }
`;

const ContractHeader = styled.div`
  padding: 3px 15px 15px 15px;
  background-color: white;
  background-size: 100% 100%;
  border-radius: 20px 20px 0 0;
  position: relative;
`;

const ContractBody = styled.div`
  background-color: #152a78;
  padding: 10px 15px;
  border-radius: 15px;
  justify-content: space-around;

  @media screen and (min-width: 0px) {
    margin: 15px;
  }
  @media screen and (min-width: 992px) {
    margin: 2px 5px 2px 15px;
  }
`;

const ContractFooter = styled.div`
  background-color: #152a78;
  background-size: 100% 100%;
  padding: 5px 8px;
  border-radius: 0 0 20px 20px;
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
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    margin: 0px 10px 0px 5px;
  }

  .tradeColor {
    color: #63f230;
  }

  .auditedColor {
    color: #e7cc00;
  }
`;

const LinkIcon = styled.img`
  display: inline;
  width: 15px;
  height: 15px;
  margin: -16px 5px auto;
  cursor: pointer;
`;

const CoinIcon = styled.img`
  width: 50px;
  height: 50px;
`;
const CoppyIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: -4px 5px auto;
`;
const TradeIcon = styled.img`
  //width: 45px;
  height: 45px;
  margin: 7px 0px 10px 5px;
  cursor: pointer;
  display: inline-block;
`;

const AuditedIcon = styled.img`
  width: 150px;
  height: 40px;
  margin: 10px 0px 10px 5px;
  cursor: pointer;
  display: inline-block;
`;

const ContractHeaderCenter = styled.div<{ isMobile: boolean }>`
  margin: 7px ${(props) => (props.isMobile ? '0' : '120px')} 0 70px;
`;

const Ellipsis = styled.div`
  display: flex;
  flexwrap: nowrap;

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

const Title = styled.p`
  color: white;
  font-weight: 800;
  font-size: 50px;
  margin: 0;
  text-align: center;
`;

export default BcoinToken;
