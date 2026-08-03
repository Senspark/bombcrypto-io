import React, { Fragment, useState } from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { snapEvent, snapTrack } from 'src/libs/snapchat';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';

import logo from '../../assests/event/worldCup/logo.png';
import SubMenu from '../../components/Submenu';
import ModalAdvertisement from 'src/components/ModalComingSoon';
import { logTrackClickEventAnalytics } from '../../libs/logEvent';
import { logEvenAppsflyer } from '../../libs/appsflyer';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';

import BNBIcon from 'src/assests/images/Binance-network.png';
import arrowButton from 'src/assests/images/arrow.png';

import {
  NETWORK,
  networkOptions,
  NetworkType,
  networkIcons,
} from 'src/Contants/Contants';

type Props = {
  ChangeNetWork?: (value: string) => void;
  showSp?: (value: boolean) => void;
};

const ContentHeader: React.FC<Props> = ({ ChangeNetWork, showSp }) => {
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [netWorkSelected, setNetwork] = useState(NETWORK.BINANCE);

  const clickShowMenuSp = (value: boolean) => {
    setShow(value);
    if (showSp != null) {
      showSp(value);
    }
  };

  const clickPlayNow = React.useCallback(() => {
    snapEvent('track', 'CUSTOM_EVENT_4');
    ReactGA.ga('send', 'event', 'play_now', 'button_click', 'Campaign', '0');
    snapTrack('click-playnow', {
      content_name: 'playnow',
      content_category: 'button_click',
      content_ids: [''],
      content_type: 'Campaign',
      value: 0,
      currency: 'VND',
    });
    logTrackClickEventAnalytics('play_click');
    logEvenAppsflyer('button_click', 'play_now');
    window.open('https://game.bombcrypto.io/');
  }, []);

  const doChangeNetwork = (network: NetworkType) => {
    if (ChangeNetWork != null) {
      ChangeNetWork(network);
    }
    setNetwork(network);
  };

  const trackClickInfor = () => {
    logTrackClickEventAnalytics('info_click');
  };

  return (
    <Fragment>
      <NavItemLeftLogo>
        <Navbar.Brand className="pt-0" onClick={() => router.push('/')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                onClick={() => clickShowMenuSp(!show)}
                style={{
                  borderColor: 'transparent',
                  border: 'none',
                  marginRight: '50px',
                  outline: 'none',
                }}
              />
            </div>
            <IconLogo
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              src={logo}
            />
          </div>
        </Navbar.Brand>
      </NavItemLeftLogo>

      {/* DAPPS + MARKET + GUIDE */}
      <Nav
        className="d-none d-lg-flex align-items-center"
        style={{ maxHeight: '100px' }}
      >
        <NavItemLeft>
          <NavItem
            onClick={() => {
              trackClickInfor();
              window.open('https://dapps.bombcrypto.io', '_blank');
            }}
          >
            DAPPS
          </NavItem>
        </NavItemLeft>
        <NavItemLeft>
          <NavItem
            onClick={() => {
              logTrackClickEventAnalytics('market_click');
              // o market é único, independente da rede selecionada
              window.open('https://market.bombcrypto.io/', '_blank');
            }}
          >
            MARKET
          </NavItem>
        </NavItemLeft>
        <NavItemLeft>
          <NavItem isActive={router.pathname === '/guide'}>
            <Link href="/guide">GUIDE</Link>
          </NavItem>
        </NavItemLeft>
      </Nav>

      {/* PLAY NOW */}
      <Nav className="d-none d-lg-flex align-items-center pe-4">
        <PlayButton type="button" onClick={clickPlayNow}>
          Play Now
        </PlayButton>
      </Nav>

      {/* WHITEPAPER + OTHER */}
      <Nav
        className="d-none d-lg-flex align-items-center"
        style={{ maxHeight: '100px' }}
      >
        <NavItem
          onClick={() => {
            logTrackClickEventAnalytics('market_click');
            window.open('https://whitepaper.bombcrypto.io/', '_blank');
          }}
        >
          WHITEPAPER
        </NavItem>
        <OtherWrapper>
          <NavItem>OTHER</NavItem>
          <OtherMenu>
            <OtherMenuItem
              onClick={() => {
                logTrackClickEventAnalytics('demo_click');
                window.open('https://demo.bombcrypto.io', '_blank');
              }}
            >
              DEMO PLAY
            </OtherMenuItem>
            <OtherMenuItem
              onClick={() => {
                logTrackClickEventAnalytics('leaderboard_click');
                window.open('https://treasure-mode.bombcrypto.io/', '_blank');
              }}
            >
              LEADERBOARD
            </OtherMenuItem>
            <OtherMenuItem
              onClick={() => {
                logTrackClickEventAnalytics('token_distribution_click');
                window.open(
                  'https://token-distribution.bombcrypto.io/',
                  '_blank',
                );
              }}
            >
              TOKEN DISTRIBUTION
            </OtherMenuItem>
          </OtherMenu>
        </OtherWrapper>
      </Nav>

      {/* NETWORK SWITCH */}
      <Nav
        className="d-none d-lg-flex align-items-center"
        style={{ maxHeight: '100px' }}
      >
        <NavDropdown>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
              <img
                src={networkIcons[netWorkSelected] ?? BNBIcon}
                alt={netWorkSelected}
                style={{ width: '125px' }}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{
                backgroundColor: arcadeColors.panel,
                border: arcadeBorder.thin,
                borderRadius: arcadeRadius.md,
                boxShadow: hardShadow(4),
                zIndex: '10',
                marginTop: '6px',
                marginLeft: '-1px',
              }}
            >
              {networkOptions.map((network) =>
                network === netWorkSelected ? null : (
                  <Dropdown.Item
                    key={network}
                    onClick={() => doChangeNetwork(network)}
                    style={{
                      backgroundColor: 'transparent',
                      width: '170px',
                    }}
                  >
                    <img
                      src={networkIcons[network]}
                      alt={network}
                      style={{ width: '100%', marginTop: '5px' }}
                    />
                  </Dropdown.Item>
                ),
              )}
            </Dropdown.Menu>
          </Dropdown>
        </NavDropdown>
      </Nav>

      {/* MOBILE MENU */}
      <Nav className="d-block d-lg-none">
        <SubMenu
          show={show}
          setShow={clickShowMenuSp}
          doChangeNetwork={doChangeNetwork}
          network={netWorkSelected}
        />
      </Nav>

      <ModalAdvertisement isShow={isModalOpen} onShow={setIsModalOpen} />
    </Fragment>
  );
};

interface CustomToggleProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

const CustomToggle = React.forwardRef<HTMLDivElement, CustomToggleProps>(
  function CustomToggle({ onClick, children }, ref) {
    return (
      <div
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick?.(e);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '20px',
          backgroundColor: arcadeColors.panelLight,
          border: arcadeBorder.thin,
          borderRadius: arcadeRadius.md,
          width: '170px',
          height: '42px',
          justifyContent: 'center',
          boxShadow: hardShadow(4),
          position: 'relative',
          zIndex: '9999',
          cursor: 'pointer',
        }}
      >
        {children}
        <img
          src={arrowButton}
          alt="Toggle Image"
          style={{ width: '20px', height: '15px', marginLeft: '2px' }}
        />
      </div>
    );
  },
);
CustomToggle.displayName = 'CustomToggle';

const NavItemLeftLogo = styled.div`
  padding: 0 1.5% 0 1.5%;

  @media (max-width: 1400px) {
    padding: 0 1.2% 0 1.2%;
  }

  @media (max-width: 1199px) {
    padding: 0 1.9% 0 1.9%;
  }
`;

const NavItemLeft = styled.div`
  margin: 0px 4px;

  @media (max-width: 1400px) {
    margin: 0px 8px;
  }
`;

const NavItem = styled.div<{ isActive?: boolean }>`
  position: relative;
  font-size: 20px;
  font-family: ${arcadeFonts.display};
  letter-spacing: 1px;
  cursor: pointer;
  color: ${({ isActive }) =>
    isActive ? arcadeColors.yellow : arcadeColors.cloud};
  margin: 0 10px;
  padding: 6px 4px;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;

  a {
    color: inherit;
    text-decoration: none;
  }

  /* sublinhado em bloco, como uma barra de energia */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    background: ${arcadeColors.yellow};
    transform: scaleX(${({ isActive }) => (isActive ? 1 : 0)});
    transform-origin: left;
    transition: transform 0.18s ease;
  }

  &:hover {
    color: ${arcadeColors.yellow};
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 1400px) {
    font-size: 18px;
    margin: 0 8px;
  }
  @media (max-width: 1199px) {
    margin: 0 4px;
    font-size: 16px;
  }
`;

/* anel de energia pulsando, chamando para o clique */
const playPulse = keyframes`
  0% { box-shadow: ${hardShadow(5)}, 0 0 0 0 rgba(255, 210, 63, 0.55); }
  70% { box-shadow: ${hardShadow(5)}, 0 0 0 14px rgba(255, 210, 63, 0); }
  100% { box-shadow: ${hardShadow(5)}, 0 0 0 0 rgba(255, 210, 63, 0); }
`;

const PlayButton = styled.button`
  font-family: ${arcadeFonts.display};
  font-size: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(5)};
  padding: 10px 26px;
  cursor: pointer;
  animation: ${playPulse} 2.4s ease-out infinite;
  transition: transform 0.08s ease, box-shadow 0.08s ease;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: ${hardShadow(7)};
  }

  &:active {
    transform: translate(3px, 3px);
    box-shadow: ${hardShadow(0)};
  }

  @media (max-width: 1199px) {
    font-size: 17px;
    padding: 8px 18px;
  }
`;

const OtherWrapper = styled.div`
  position: relative;

  &:hover > div:last-child {
    display: block;
  }
`;

/* sem vão entre o item e o menu: um gap aqui derruba o :hover no meio do
   caminho e o dropdown fecha antes do clique */
const OtherMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(6)};
  padding: 8px 0;
  min-width: 210px;
  overflow: hidden;
  z-index: 9999;
`;

const OtherMenuItem = styled.div`
  font-family: ${arcadeFonts.display};
  font-size: 16px;
  color: ${arcadeColors.cloud};
  text-align: center;
  padding: 10px 12px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: ${arcadeColors.yellow};
    color: ${arcadeColors.ink};
  }

  @media (max-width: 1199px) {
    font-size: 14px;
  }
`;

const NavDropdown = styled.div`
  display: flex;
  align-items: center;
`;

const IconLogo = styled.img`
  width: 150px;
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.04);
  }

  @media (max-width: 1400px) {
    width: 132px;
  }
  @media (max-width: 991px) {
    width: 118px;
  }
`;

export default ContentHeader;
