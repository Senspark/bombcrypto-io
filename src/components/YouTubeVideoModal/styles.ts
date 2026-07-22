import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import cancel from 'src/assests/imgModal/Close button.png';

export const CustomModal = styled(Modal)`
  .modal-content {
    width: 80vw;
    height: 35vw;
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export const Contain = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? 'block' : 'none')};
  width: 100vw;
  height: 130vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
`;

export const CancelButton = styled.button`
  outline: none;
  border: none;
  background: url(${cancel}) no-repeat;
  background-size: 100% 100%;
  width: 3.5vw;
  height: 3.5vw;
  z-index: 1001;
  position: absolute;
  right: -3.5vw;
  top: 0px;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;
