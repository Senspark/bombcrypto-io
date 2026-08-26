import React, { useCallback, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

import bannerPopup from 'src/assests/imgPopup/bannerPopup.png';
import cancel from 'src/assests/imgPopup/cancel.png';

const Wrapper = styled.section``;

const PopupDesk = styled.div`
  position: fixed;
  z-index: 1000;
  right: 10px;
  bottom: 0px;
  width: 300px;
  .modal-content {
    background-color: transparent;
    border: none;
  }
`;

const PopupSp = styled(Modal)`
  padding: 20px;
  .modal-content {
    background-color: transparent;
    border: none;
  }
`;

const DialogCustom = styled(Modal.Dialog)<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  transition: all 0.5s linear;
`;

const CancelButton = styled.button`
  outline: none;
  border: none;
  background: url(${cancel}) no-repeat;
  background-size: 100% 100%;
  width: 20px;
  height: 20px;
  z-index: 1001;
  position: absolute;
  right: 2px;
  top: 35px;
  cursor: pointer;
`;

const Popup = () => {
  const [isShowDesk, setIsShowDesk] = useState<boolean>(true);
  const [isShowSp, setIsShowSp] = useState<boolean>(true);
  const [size, setSize] = useState<number>(0);

  const handleResize = useCallback(() => {
    setSize(window.innerWidth);
  }, [size]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  const onClick = () => {
    window.open('https://polygon.bombcrypto.io/');
  };

  return (
    <Wrapper>
      <PopupDesk
        className={`d-none ${isShowDesk ? 'd-sm-block' : 'd-sm-none'}`}
      >
        <DialogCustom show={isShowDesk}>
          <CancelButton onClick={() => setIsShowDesk(false)} />
          <img
            src={bannerPopup}
            className="w-100"
            style={{ cursor: 'pointer' }}
            onClick={onClick}
          />
        </DialogCustom>
      </PopupDesk>
      <div className="d-block d-sm-none">
        <PopupSp
          size="lg"
          centered
          show={size < 500 ? isShowSp : false}
          onHide={() => setIsShowSp(false)}
        >
          <CancelButton onClick={() => setIsShowSp(false)} />
          <img src={bannerPopup} className="w-100" onClick={onClick} />
        </PopupSp>
      </div>
    </Wrapper>
  );
};

export default React.memo(Popup);
