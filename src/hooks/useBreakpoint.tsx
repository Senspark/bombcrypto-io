import { useEffect, useState } from 'react';

type WindowSize = {
  width: number;
};

const useBreakpoint = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return {
    xs: windowSize.width > 0 && windowSize.width <= 500 ? true : false,
    sm: windowSize.width > 500 && windowSize.width <= 600 ? true : false,
    md: windowSize.width > 600 && windowSize.width <= 768 ? true : false,
    lg: windowSize.width > 768 && windowSize.width <= 1024 ? true : false,
  };
};

export default useBreakpoint;
