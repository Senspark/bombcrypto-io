import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactPixel from 'react-snapchat-pixel';
import ReactGA from 'react-ga';

import icon from 'src/assests/imgHeader/icon.png';
import playNow from 'src/assests/imgHeader/playNow.png';
import arrow from 'src/assests/imgHeader/arrow.png';
import { nav } from 'src/data/nav';
import SubMenu from 'src/components/Submenu';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { logEvenAppsflyer } from '../../libs/appsflyer';

const Wrapper = styled.section`
  #toggle {
    &:checked ~ #menu {
      display: block;
    }
    &:checked + .navbar-toggler {
      display: none;
      opacity: 0;
    }
  }
`;

const ButtonToggle = styled.label`
  font-size: 12px;
  z-index: 200;
  cursor: pointer;
`;

const Navbar: React.FC<{ id: string }> = ({ id }) => {
  const navigate = useNavigate();

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

  const clickNavMenu = React.useCallback((menu) => {
    if (menu.conversion) {
      logTrackClickEventAnalytics(menu.conversion);
    }
    logEvenAppsflyer('button_click', menu.button_name);
    if (menu.target) {
      window.open(menu.link);
    } else {
      navigate(menu.link);
    }
  }, []);

  return (
    <Wrapper id={id}>
      <Container>
        <nav className="navbar navbar-expand-lg position-relative nav navbar-dark bg-light justify-content-between">
          <input type="checkbox" hidden id="toggle" />
          <ButtonToggle className="navbar-toggler border-0" htmlFor="toggle">
            <span className="navbar-toggler-icon" />
          </ButtonToggle>
          <div className="container-fluid position-absolute justify-content-center justify-content-lg-start nav-item">
            <Link
              to={'/'}
              className="navbar-brand m-0 text-center text-lg-inherit"
            >
              <img src={icon} alt="icon" className="w-50" />
            </Link>
            <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
              <div className="navbar-nav align-items-baseline">
                {nav.map((v, i) => {
                  return (
                    <a href="#" onClick={() => clickNavMenu(v)} key={i}>
                      <img src={v.image} alt="image" />
                    </a>
                  );
                })}
              </div>
              <a
                href="#"
                target="_blank"
                className="position-relative"
                rel="noreferrer"
                onClick={clickPlayNow}
              >
                <div className="position-absolute play">
                  <img src={playNow} alt="playNow" className="w-100" />
                  <p className="text-uppercase position-absolute fs-24 play-now w-100 text-center fw-550">
                    play now!
                  </p>
                </div>
                <img
                  src={arrow}
                  alt="arrow"
                  className="position-absolute img-arrow"
                />
              </a>
            </div>
          </div>
          <SubMenu />
        </nav>
      </Container>
    </Wrapper>
  );
};

export default Navbar;
