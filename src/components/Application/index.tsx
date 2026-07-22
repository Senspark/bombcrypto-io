import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/styles/GlobalStyle';
import theme from 'src/theme';

interface ApplicationInterface {
  children: any;
}

export default function Application({ children }: ApplicationInterface) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
