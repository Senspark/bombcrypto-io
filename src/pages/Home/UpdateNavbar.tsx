import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Nav, Navbar } from 'react-bootstrap';
//import ReactPixel from 'react-snapchat-pixel';
//import ReactGA from 'react-ga';
import { Link, useLocation } from 'react-router-dom';

import bg from 'src/assests/halloween/BG.png';
import logo from 'src/assests/halloween/logo.png';
import playIcon from 'src/assests/halloween/Play1.png';
import playIconActive from 'src/assests/halloween/play2.png';
import market1 from 'src/assests/halloween/market1.png';
import market2 from 'src/assests/halloween/market2.png';
import home1 from 'src/assests/halloween/home1.png';
import home2 from 'src/assests/halloween/home2.png';
import stake1 from 'src/assests/halloween/stake1.png';
import stake2 from 'src/assests/halloween/stake2.png';
import guide1 from 'src/assests/halloween/guide1.png';
import guide2 from 'src/assests/halloween/guide2.png';
//import { logTrackClick } from 'src/libs/logEvent';
//import { logEvenAppsflyer } from '../../libs/appsflyer';
import SubMenu from '../../components/Submenu';
import ModalAdvertisement from '../../components/ModalComingSoon';
import { NETWORK } from 'src/Contants/Contants';

const Wrapper = styled.section`
  background: url(${bg}) center no-repeat;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  z-index: 999999;
  width: 100%;
  font-family: legend;

  #toggle {
    &:checked ~ #menu {
      display: block;
    }
    &:checked + .navbar-toggler {
      display: none;
      opacity: 0;
    }
  }

  a {
    cursor: pointer;
  }
  .navbar-dark .navbar-toggler {
    color: transparent;
    border: none;
  }

  .navbar-brand {
    margin-right: 0;
  }
`;

const UpdateNavbar: React.FC<{ id: string }> = ({ id }) => {
  // const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setComingSoon = React.useCallback(() => {
    setIsModalOpen(true); // Hiển thị modal khi nhấn STAKE
  }, []);

  /*const clickPlayNow = React.useCallback(() => {
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
    logTrackClick('play_now');
    logEvenAppsflyer('button_click', 'play_now');
    window.open('https://app.bombcrypto.io/');
  }, []);*/

  // const clickNavMenu = React.useCallback((menu) => {
  //   logTrackClick(menu.button_name);
  //   logEvenAppsflyer('button_click', menu.button_name);
  //   if (menu.target) {
  //     window.open(menu.link);
  //   } else {
  //     navigate(menu.link);
  //   }
  // }, []);

  return (
    <Wrapper id={id}>
      <Container>
        <Navbar
          variant="dark"
          expand="lg"
          className={` ${
            show && 'justify-content-end'
          } justify-content-lg-center pt-xl-0 flex-row-reverse flex-lg-row`}
        >
          {!show && (
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setShow(true)}
            />
          )}
          <Nav
            className="my-2 my-lg-0 d-none d-lg-flex align-items-baseline"
            style={{ maxHeight: '100px' }}
          >
            <NavItem>
              <Link to="/">
                <NavIcon
                  icon={location.pathname === '/' ? home2 : home1}
                  iconHover={home2}
                />
              </Link>
            </NavItem>
            <NavItem target="_blank">
              {/*href={'https://market.bombcrypto.io'}*/}
              <NavIcon
                icon={market1}
                iconHover={market2}
                onClick={setComingSoon}
              />
            </NavItem>
          </Nav>
          <Navbar.Brand>
            <Link to="/">
              <IconLogo src={logo} />
            </Link>
          </Navbar.Brand>
          <Nav
            className="my-2 my-lg-0 d-none d-lg-flex align-items-center"
            style={{ maxHeight: '100px' }}
          >
            <NavItem target="_blank">
              {/*href={'https://dapp.bombcrypto.io'}*/}
              <NavIcon
                icon={stake1}
                iconHover={stake2}
                onClick={setComingSoon}
              />
            </NavItem>
            <NavItem active={location.pathname === '/guide'}>
              <NavIcon
                icon={location.pathname === '/guide' ? guide2 : guide1}
                iconHover={guide2}
                onClick={setComingSoon}
              />
            </NavItem>
            <a onClick={setComingSoon}>
              <IconPlay
                src={playIcon}
                width={120}
                onMouseOver={(e) => (e.currentTarget.src = playIconActive)}
                onMouseOut={(e) => (e.currentTarget.src = playIcon)}
              />
            </a>
          </Nav>
          <SubMenu
            show={show}
            setShow={setShow}
            doChangeNetwork={() => {}}
            network={NETWORK.BINANCE}
          />
        </Navbar>
      </Container>
      <ModalAdvertisement isShow={isModalOpen} onShow={setIsModalOpen} />
    </Wrapper>
  );
};

const NavItem = styled.a<{ active?: boolean }>`
  padding: 0 20px;
`;

const NavIcon = styled.div<{ iconHover: string; icon: string }>`
  background: url(${({ icon }) => icon}) center no-repeat;
  background-size: 100% 100%;
  width: 150px;
  height: 60px;
  &:hover {
    background: url(${({ iconHover }) => iconHover}) center no-repeat;
    width: 150px;
    height: 60px;
    background-size: 100% 100%;
  }
  @media (max-width: 1024px) {
    width: 100px;
    height: 60px;
    &:hover {
      width: 100px;
      height: 60px;
    }
  }
  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const IconPlay = styled.img`
  height: 80px;
  margin-left: 20px;
`;

const IconLogo = styled.img`
  width: 120px;
  @media (max-width: 1023px) {
    margin-top: 0px;
    width: 80px;
  }
`;

export default UpdateNavbar;
