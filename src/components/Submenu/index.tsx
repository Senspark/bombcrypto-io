import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { NavText, navText } from 'src/data/nav';
import { useNavigate } from 'react-router-dom';
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

const Wrapper = styled.nav<{ show?: boolean }>`
  position: fixed;
  top: 80px;
  left: 0;
  width: 170px;
  height: 100vh;
  z-index: 9999;
  background-color: rgba(143, 65, 32, 1);
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

const NavMenu = styled.label`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
  padding-top: 100px;
  a {
    font-family: Lato, sans-serif;
    color: #fff;
    margin: 10px 0;
    font-size: 1.5em;
    font-weight: 550;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #fff;
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
  const navigate = useNavigate();

  const clickNavMenu = React.useCallback(
    (menu) => {
      //logTrackClick(menu.button_name);
      if (menu.conversion) {
        logTrackClickEventAnalytics(menu.conversion);
      }
      let link = menu.link;
      if (menu.linkPolygon && network == NETWORK.POLYGON) {
        link = menu.linkPolygon;
      }
      if (menu.target) {
        window.open(link);
      } else {
        navigate(link);
      }
    },
    [network],
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
                backgroundColor: '#3A1620',
                borderRadius: '0 0 20px 20px',
                zIndex: '10',
                marginTop: '-30px',
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
            backgroundColor: '#722C3F',
            borderRadius: '15px',
            backgroundSize: '100% 100%',
            width: '170px',
            height: '40px',
            justifyContent: 'center',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.7)',
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
