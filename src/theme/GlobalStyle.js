import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ${normalize}
  html {
    scroll-behavior: smooth;
  }

  @font-face {
    font-family: ${({ theme }) => theme.font.font_0};
    src: ${({ theme }) => theme.font.url_1};
    src: ${({ theme }) => theme.font.url_2} format("embedded-opentype"), ${({
  theme,
}) => theme.font.url_3} format("woff"),
    ${({ theme }) => theme.font.url_4} format("truetype"), ${({ theme }) =>
  theme.font.url_5} format("svg");
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.color};
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    text-decoration: none;


    &:hover {
      text-decoration: none;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
    letter-spacing: -0.01em;
    margin: 0;
  }

  h1 {
    font-size: 380px;
  }

  h2 {
    font-size: 48px;
  }

  main {
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
