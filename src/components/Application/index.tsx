import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/styles/GlobalStyle';
import theme from 'src/theme';

interface ApplicationInterface {
  children: any;
}

export default function Application({ children }: ApplicationInterface) {
  return (
    // SSRProvider: mantém os ids do react-bootstrap iguais no pré-render e no
    // navegador (sem ele, Tabs/Dropdown quebram a hidratação)
    <SSRProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </SSRProvider>
  );
}
