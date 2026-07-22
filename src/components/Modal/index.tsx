import React, { useEffect, useState } from 'react';

import {
  CancelButton,
  ContentModal,
  CustomModal,
  ImgBanner,
  Video,
} from './styles';
import newBanner from 'src/assests/newBanner/Lucky Wheel.png';

const ModalAdvertisement = () => {
  const [show, setShow] = useState<boolean>(true);
  const [showNewBanner, setShowNewBanner] = useState<boolean>(false);

  useEffect(() => {
    if (!show) {
      let time = setTimeout(() => {
        setShowNewBanner(true);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [show]);

  return (
    <div>
      <CustomModal show={show} onHide={() => setShow(false)} size="lg" centered>
        <ContentModal xs={12}>
          <CancelButton onClick={() => setShow(false)} />
          <Video
            className="img-fluid"
            autoPlay
            loop
            muted
            playsInline
            onClick={() => window.open('https://polygon.bombcrypto.io/')}
          >
            <source src="/Popup.webm" type="video/webm" />
          </Video>
        </ContentModal>
      </CustomModal>
      <CustomModal
        show={showNewBanner}
        onHide={() => setShowNewBanner(false)}
        size="lg"
        centered
      >
        <ContentModal xs={12}>
          <CancelButton onClick={() => setShowNewBanner(false)} />
          <ImgBanner
            onClick={() => window.open('https://polygon.bombcrypto.io/')}
            className="img-fluid"
            src={newBanner}
          />
        </ContentModal>
      </CustomModal>
    </div>
  );
};

export default ModalAdvertisement;
