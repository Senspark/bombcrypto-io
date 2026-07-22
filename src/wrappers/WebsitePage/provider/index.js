import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'src/theme';
import GlobalStyle from 'src/theme/GlobalStyle';

export default function WebsiteGlobalProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
