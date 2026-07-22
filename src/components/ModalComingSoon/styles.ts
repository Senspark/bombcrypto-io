import styled from 'styled-components';
import { Col, Modal } from 'react-bootstrap';

import cancel from 'src/assests/imgModal/Close button.png';

export const CustomModal = styled(Modal)`
  .modal-content {
    background-color: transparent !important;
    border: none;
  }
`;

export const Video = styled.video`
  border: 10px solid #bec0c5;
  border-radius: 20px;
  height: 100%;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    border-width: 5px;
  }
`;

export const ContentModal = styled(Col)`
  position: relative;
`;

export const CancelButton = styled.button`
  outline: none;
  border: none;
  background: url(${cancel}) no-repeat;
  background-size: 100% 100%;
  width: 55px;
  height: 55px;
  z-index: 1001;
  position: absolute;
  right: -12px;
  top: -12px;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`;
