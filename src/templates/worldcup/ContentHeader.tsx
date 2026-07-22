import React, { Fragment, useState } from 'react';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ReactPixel from 'react-snapchat-pixel';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import logo from '../../assests/event/worldCup/logo.png';
import playIcon from '../../assests/imgHeader_2024/button_play.png';
import playIconActive from '../../assests/imgHeader_2024/button_play_hover.png';
import SubMenu from '../../components/Submenu';
import ModalAdvertisement from 'src/components/ModalComingSoon';
import { logTrackClickEventAnalytics } from '../../libs/logEvent';
import { logEvenAppsflyer } from '../../libs/appsflyer';
import { platinum, saddleBrown } from './color';

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
  const location = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [netWorkSelected, setNetwork] = useState(NETWORK.BINANCE);
  const navigate = useNavigate();

  const clickShowMenuSp = (value: boolean) => {
    setShow(value);
    if (showSp != null) {
      showSp(value);
    }
  };

  const clickPlayNow = React.useCallback(() => {
    ReactPixel.snaptr('track', 'CUSTOM_EVENT_4');
    ReactGA.ga('send', 'event', 'play_now', 'button_click', 'Campaign', '0');
    ReactPixel.track('click-playnow', {
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
        <Navbar.Brand className="pt-0" onClick={() => navigate('/')}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginTop: '13px' }}>
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
        className="my-1 mb-lg-0 mt-lg-3 d-none d-lg-flex"
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
              const url =
                netWorkSelected === NETWORK.BINANCE
                  ? 'https://market.bombcrypto.io/'
                  : 'https://market-polygon.senspark.com/';
              window.open(url, '_blank');
            }}
          >
            MARKET
          </NavItem>
        </NavItemLeft>
        <NavItemLeft>
          <NavItem isActive={location.pathname === '/guide'}>
            <Link to="/guide">GUIDE</Link>
          </NavItem>
        </NavItemLeft>
      </Nav>

      {/* PLAY NOW */}
      <Nav className="d-none d-lg-block">
        <a onClick={clickPlayNow} className="pe-4">
          <IconPlay
            src={playIcon}
            onMouseOver={(e) => (e.currentTarget.src = playIconActive)}
            onMouseOut={(e) => (e.currentTarget.src = playIcon)}
          />
        </a>
      </Nav>

      {/* WHITEPAPER + OTHER */}
      <Nav
        className="my-1 my-lg-0 mt-lg-3 d-none d-lg-flex align-items-center"
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
        className="my-1 my-lg-0 mt-lg-3 d-none d-lg-flex align-items-center"
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
                backgroundColor: '#3A1620',
                borderRadius: '0 0 20px 20px',
                zIndex: '10',
                marginTop: '-10px',
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
          backgroundColor: '#722C3F',
          borderRadius: '15px',
          backgroundSize: '100% 100%',
          width: '170px',
          height: '40px',
          justifyContent: 'center',
          boxShadow: '0 3px 5px rgba(0, 0, 0, 0.7)',
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
  background-color: ${({ isActive }) =>
    isActive ? saddleBrown : 'transparent'};
  border-top: 6px solid
    ${({ isActive }) => (isActive ? saddleBrown : 'transparent')};
  font-weight: 500;
  font-size: 24px;
  border-radius: 10px;
  text-shadow: 0px 0px 3px black;
  font-family: Retro;
  cursor: pointer;
  color: ${platinum};
  margin: 1px 10px 0px;
  text-decoration: none;
  padding: 0px 5px 0px 5px;
  white-space: nowrap;

  a {
    color: ${platinum};
    text-decoration: none;
  }

  &:hover {
    background: ${saddleBrown};
    color: ${platinum};
  }

  @media (max-width: 1400px) {
    font-size: 20px;
    margin: 4px 6px 0px;
  }
  @media (max-width: 1199px) {
    margin: 0 4px;
    font-size: 17px;
  }
  @media (max-width: 1040px) {
    margin: 0 2px;
    font-size: 16px;
  }
`;

const IconPlay = styled.img`
  height: 105px;
  width: 160px;
  cursor: pointer;

  @media (max-width: 1400px) {
    margin-top: -8px;
    height: 95px;
    width: 140px;
  }
  @media (max-width: 1199px) {
    margin-left: 0%;
  }
  @media (max-width: 1040px) {
    height: 80px;
    width: 120px;
  }
`;

const OtherWrapper = styled.div`
  position: relative;

  &:hover > div:last-child {
    display: block;
  }
`;

const OtherMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3a1620;
  border-radius: 0 0 12px 12px;
  padding: 6px 0;
  min-width: 180px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
  z-index: 9999;
`;

const OtherMenuItem = styled.div`
  font-family: Retro;
  font-weight: 500;
  font-size: 20px;
  color: ${platinum};
  text-shadow: 0px 0px 3px black;
  text-align: center;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${saddleBrown};
  }

  @media (max-width: 1400px) {
    font-size: 18px;
  }
  @media (max-width: 1199px) {
    font-size: 16px;
  }
`;

const NavDropdown = styled.div`
  @media (max-width: 1199px) {
    margin: -6px 0 0 10px;
  }
  @media (min-width: 1200px) {
    margin-top: 2px;
  }
`;

const IconLogo = styled.img`
  width: 160px;
  @media (max-width: 1400px) {
    margin-top: -5px;
    margin-left: -30px;
  }
`;

export default ContentHeader;
