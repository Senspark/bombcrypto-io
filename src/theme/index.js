import { typographyVariants } from './typographyVariants';

const breakpoints = {
  desktop: 'only screen and (min-width: 1400px)',
  laptop: 'only screen and (min-width: 1200px) and (max-width: 1399px)',
  lg: 'only screen and (min-width: 992px) and (max-width: 1199px)',
  md: 'only screen and (min-width: 768px) and (max-width: 991px)',
  xs: '(max-width: 767px)',
  sm: 'only screen and (min-width: 575px) and (max-width: 767px)',
  xxs: 'only screen and (min-width:320px) and (max-width: 374px)',
};

const colors = {
  black: '#000000',
  grey3: '#7a7a7a',
  grey2: '#b8b8b8',
  grey1: '#eeeeee',
  white: '#ffffff',
  blue: '#4b79d2',
  red: '#ff7272',

  navbarHover: '#8a8a8a',
};

const spacing = {
  spacing1: '8px',
  spacing2: '16px',
  spacing3: '24px',
  spacing4: '40px',
  spacing5: '64px',
  spacing6: '80px',
  spacing7: '116px',
  spacing8: '180px',
  spacing9: '240px',
};

const font = {
  font_0: 'Founders Grotesk',
  url_1: 'url(/assets/fonts/FoundersGrotesk-Regular.eot)',
  url_2: 'url(/assets/fonts/FoundersGrotesk-Regular.eot?#iefix)',
  url_3: 'url(/assets/fonts/FoundersGrotesk-Regular.woff)',
  url_4: 'url(/assets/fonts/FoundersGrotesk-Regular.ttf)',
  url_5: 'url(/assets/fonts/FoundersGrotesk-Regular.svg#ralewayregular)',
};

export default {
  colors,
  spacing,
  breakpoints,
  font,
  fontFamily: "'Founders Grotesk', sans-serif",
  typographyVariants,
};
