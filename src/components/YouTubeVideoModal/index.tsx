import React, { useState } from 'react';
import { default as _ReactPlayer } from 'react-player';
import { ReactPlayerProps } from 'react-player/types/lib';
import { CustomModal, CancelButton, Contain } from './styles';

type Props = {
  isShow: boolean;
  url: string;
  onShow: (v: boolean) => void;
};

const YouTubeVideoModal: React.FC<Props> = ({ isShow, url, onShow }) => {
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
  const [isReady, setIsReady] = useState(false);

  return (
    <Contain isShow={isShow}>
      <CustomModal
        show={isShow}
        contentLabel="YouTube Video Modal"
        size="xl"
        centered
      >
        <ReactPlayer
          width={'100%'}
          height={'100%'}
          url={url}
          controls
          playing={isShow && isReady}
          onReady={() => setIsReady(true)}
          onError={(error) => console.log('Lỗi chơi video:', error)}
        />
        <CancelButton onClick={() => onShow(false)} />
      </CustomModal>
    </Contain>
  );
};

export default YouTubeVideoModal;
