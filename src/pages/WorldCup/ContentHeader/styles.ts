import styled from 'styled-components';
import { platinum, yellowGreen } from '../../../templates/worldcup/color';
import { Navbar } from 'react-bootstrap';

export const NavItem = styled.a<{ isActive?: boolean }>`
  background-color: ${({ isActive }) =>
    isActive ? yellowGreen : 'transparent'};
  padding: 5px 10px;
  font-weight: 500;
  &:hover {
    background: ${yellowGreen};
    color: ${platinum};
  }
  color: ${platinum};
  margin: 0 20px;
  text-decoration: none;

  a {
    color: ${platinum};
    text-decoration: none;
  }
`;

export const IconPlay = styled.img`
  height: 50px;
  margin-left: 20px;
  cursor: pointer;
`;

export const IconLogo = styled.img`
  width: 120px;
  @media (max-width: 1024px) {
    margin-top: 0px;
    width: 100px;
  }
`;

export const ToggleIcon = styled(Navbar.Toggle)`
  border: none;
`;
