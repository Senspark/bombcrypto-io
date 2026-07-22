import { isSafari, isMobileSafari, isMobile } from 'react-device-detect';

export const isSafariBrowser = () => {
  return isSafari || isMobileSafari;
};

export const isMobileDevice = () => {
  return isMobile;
};

export const minAddress = (address) => {
  if (!address) return;
  const first = address.slice(0, 6);
  const last = address.slice(address.length - 4, address.length);
  return first + '...' + last;
};
