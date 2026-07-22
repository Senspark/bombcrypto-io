import React from 'react';

import { CancelButton, ContentModal, CustomModal } from './styles';
import modalImgComingSoon from 'src/assests/eventPopup/comingSoon.png';

type Props = {
  isShow: boolean;
  onShow: (v: boolean) => void;
  imgBanner?: string;
};

const ModalAdvertisement: React.FC<Props> = ({
  isShow,
  onShow,
  imgBanner = modalImgComingSoon,
}) => {
  return (
    <div>
      <CustomModal
        show={isShow}
        onHide={() => onShow(false)}
        size="lg"
        centered
      >
        <ContentModal xs={12}>
          <CancelButton onClick={() => onShow(false)} />
          <img className="img-fluid" src={imgBanner} />
        </ContentModal>
      </CustomModal>
    </div>
  );
};

export default ModalAdvertisement;
