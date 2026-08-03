import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    --color-yellow: #ffcc00;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-pink: #ff0072;
  }
  
  ${normalize}

  /* Quem prefere menos movimento não recebe as animações decorativas. */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
export default GlobalStyle;
