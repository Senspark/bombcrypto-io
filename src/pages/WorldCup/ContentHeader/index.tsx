import React, { Fragment, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../../assests/event/worldCup/logo.png';
import SubMenu from '../../../components/Submenu';
import { IconLogo, NavItem, ToggleIcon } from './styles';
import { navTextWorldCup } from 'src/data/nav';

const ContentHeader = () => {
  const location = useLocation();
  const [show, setShow] = useState<boolean>(false);

  return (
    <Fragment>
      <Navbar.Brand as={Link} to="/">
        <IconLogo src={logo} />
      </Navbar.Brand>
      {!show && (
        <ToggleIcon
          aria-controls="basic-navbar-nav"
          onClick={() => setShow(true)}
        />
      )}
      <Nav
        className="my-2 my-lg-0 d-none d-lg-flex align-items-baseline"
        style={{ maxHeight: '100px' }}
      >
        <NavItem isActive={location.pathname === '/events/worldcup2022'}>
          <Link to="/events/worldcup2022">HOME</Link>
        </NavItem>
        <NavItem href="#glory-pass">GLORY PASS</NavItem>
      </Nav>
      <Nav
        className="my-2 my-lg-0 d-none d-lg-flex align-items-center"
        style={{ maxHeight: '100px' }}
      >
        <NavItem href="#event">EVENT</NavItem>
        <NavItem href="#timeline">TIMELINE</NavItem>
        <NavItem href="#reward">REWARD</NavItem>
      </Nav>
      <SubMenu show={show} setShow={setShow} navItems={navTextWorldCup} />
    </Fragment>
  );
};

export default ContentHeader;
