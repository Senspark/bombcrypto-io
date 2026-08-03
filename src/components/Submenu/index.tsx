import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { NavText, navText } from 'src/data/nav';
import { useRouter } from 'next/router';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import PolygonIcon from 'src/assests/images/Polygon_network.png';
import BNBIcon from 'src/assests/images/Binance-network.png';
import arrowButton from 'src/assests/images/arrow.png';
import {
  NETWORK,
  networkOptions,
  NetworkType,
  networkIcons,
} from 'src/Contants/Contants';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';

const Wrapper = styled.nav<{ show?: boolean }>`
  position: fixed;
  top: 72px;
  left: 0;
  width: 230px;
  height: 100vh;
  z-index: 9999;
  background: ${arcadeColors.panel};
  border-right: ${arcadeBorder.thick};
  box-shadow: ${hardShadow(6)};
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const NavMenu = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 32px 0 0;
  text-align: center;

  a {
    display: block;
    font-family: ${arcadeFonts.display};
    color: ${arcadeColors.cloud};
    padding: 14px 0;
    font-size: 18px;
    letter-spacing: 1px;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: ${arcadeColors.yellow};
      color: ${arcadeColors.ink};
    }
  }

  li {
    animation: floating 0.6s ease-in-out;
  }
`;

type Props = {
  show?: boolean;
  setShow?: (v: boolean) => void;
  navItems?: NavText[];
  doChangeNetwork?: (network: NetworkType) => void;
  network?: string;
};

const SubMenu: React.FC<Props> = ({
  show,
  navItems,
  doChangeNetwork,
  network,
}) => {
  const router = useRouter();

  const clickNavMenu = React.useCallback(
    (menu) => {
      //logTrackClick(menu.button_name);
      if (menu.conversion) {
        logTrackClickEventAnalytics(menu.conversion);
      }
      // links são fixos, independentes da rede selecionada
      const link = menu.link;
      if (menu.target) {
        window.open(link);
      } else {
        router.push(link);
      }
    },
    [network, router],
  );

  return (
    <Wrapper id="menu" show={show}>
      <NavMenu htmlFor="toggle">
        {!navItems &&
          navText.map((v, i) => {
            return (
              <li className="nav-item" key={i}>
                <a
                  className="nav-link"
                  href="#"
                  onClick={() => clickNavMenu(v)}
                >
                  {v.text}
                </a>
              </li>
            );
          })}
        {navItems &&
          navItems.map((v, i) => (
            <li className="nav-item" key={i}>
              <a className="nav-link" href={v.link}>
                {v.text}
              </a>
            </li>
          ))}
        {show && (
          <Dropdown>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                <img
                  src={network == NETWORK.BINANCE ? BNBIcon : PolygonIcon}
                  style={{ width: '125px' }}
                ></img>
              </Dropdown.Toggle>
            </div>
            <Dropdown.Menu
              style={{
                backgroundColor: arcadeColors.panel,
                border: arcadeBorder.thin,
                borderRadius: arcadeRadius.md,
                boxShadow: hardShadow(4),
                zIndex: '10',
                marginTop: '-24px',
              }}
            >
              {networkOptions.map(
                (net) =>
                  net !== network && (
                    <Dropdown.Item
                      key={net}
                      style={{ backgroundColor: 'transparent', width: '170px' }}
                      onClick={() => doChangeNetwork?.(net)}
                    >
                      <img
                        src={networkIcons[net]}
                        style={{ width: '100%', marginTop: '5px' }}
                        alt={net}
                      />
                    </Dropdown.Item>
                  ),
              )}
            </Dropdown.Menu>
          </Dropdown>
        )}
      </NavMenu>
    </Wrapper>
  );
};

export default SubMenu;
interface CustomToggleProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
}
const CustomToggle = React.forwardRef<HTMLAnchorElement, CustomToggleProps>(
  function CustomToggle({ onClick, children }, ref) {
    return (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick && onClick(e);
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: arcadeColors.panelLight,
            border: arcadeBorder.thin,
            borderRadius: arcadeRadius.md,
            width: '170px',
            height: '42px',
            justifyContent: 'center',
            boxShadow: hardShadow(4),
            position: 'relative',
            zIndex: '9999',
          }}
        >
          {children}
          <img
            src={arrowButton}
            alt="Toggle Image"
            style={{ width: '20px', height: '15px', marginLeft: '2px' }}
          />
        </div>
      </a>
    );
  },
);
CustomToggle.displayName = 'CustomToggle';
