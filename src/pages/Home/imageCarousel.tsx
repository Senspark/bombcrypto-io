import React, { useEffect } from 'react';

export const ImageWithTimeout = ({ src, onEnded, ...props }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnded();
    }, 0.1 * 60 * 1000); // 2 phút

    return () => clearTimeout(timer); // Cleanup timeout nếu component bị unmount
  }, [onEnded]);

  return <img src={src} alt="Image" {...props} />;
};
