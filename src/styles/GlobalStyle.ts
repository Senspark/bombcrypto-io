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
`;
export default GlobalStyle;
