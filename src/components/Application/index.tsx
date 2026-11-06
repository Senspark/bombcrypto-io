import React from 'react';
import { SSRProvider } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'src/styles/GlobalStyle';
import theme from 'src/theme';
import { LanguageProvider } from 'src/i18n';

interface ApplicationInterface {
  children: any;
}

export default function Application({ children }: ApplicationInterface) {
  return (
    // SSRProvider: mantém os ids do react-bootstrap iguais no pré-render e no
    // navegador (sem ele, Tabs/Dropdown quebram a hidratação)
    <SSRProvider>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {children}
        </ThemeProvider>
      </LanguageProvider>
    </SSRProvider>
  );
}
