import React, { useEffect, useRef, useState, useContext } from 'react';
import { default as _ReactPlayer } from 'react-player';
import { ReactPlayerProps } from 'react-player/types/lib';

import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import styled from 'styled-components';

const Contain = styled.div`
  position: relative;
  display: inline-block;
  width: 100vw;
  height: 56.5vw;

  .noPointer {
    pointer-events: none;
    user-select: none;
  }
`;

type Props = {
  url: string;
  itemId: string;
  isMuted: boolean;
  onEnded: () => void;
  setVisible: () => void;
  isLinkYoutube: boolean;
};

export const Video: React.FC<Props> = ({
  itemId,
  url,
  isMuted,
  onEnded,
  setVisible,
  isLinkYoutube,
}) => {
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.isItemVisible(itemId);
  const timeoutRef = useRef<any>(null);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isVisible && isReady) {
      setVisible();
    }
  }, [isVisible, isReady]);

  const onLoadReady = () => {
    setIsReady(true);
    // Gọi hàm setVisible nếu muốn xử lý gì khi đã load xong
    setVisible();
  };

  const showEnded = () => {
    onEnded();
    clearMyTimeout();
  };

  const clearMyTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <Contain tabIndex={0}>
      <ReactPlayer
        url={url}
        controls={false}
        playing={isVisible && isReady}
        muted={isMuted}
        width="100vw"
        height="56.5vw"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        onReady={onLoadReady}
        onEnded={showEnded}
      />
    </Contain>
  );
};
