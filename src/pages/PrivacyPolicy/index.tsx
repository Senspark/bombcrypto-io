import React from 'react';
import styled from 'styled-components';

import { content } from 'src/data/privacyPolicy';
import PageLayout from 'src/templates/PageLayout';
import { ArcadeContainer, SectionTitle } from 'src/components/ui';
import { arcadeColors } from 'src/theme/arcade';

const Wrapper = styled.section`
  padding: 140px 0 80px;

  @media (max-width: 767px) {
    padding: 110px 0 56px;
  }
`;

/**
 * O conteúdo é um HTML exportado de editor de texto: traz fundo branco e
 * fontes fixas em `style` inline. Aqui esses estilos são neutralizados para
 * o texto seguir o tema escuro.
 */
const Content = styled.div`
  line-height: 1.8;
  color: ${arcadeColors.cloud};

  * {
    background-color: transparent !important;
    font-family: inherit !important;
    max-width: 100%;
  }

  p,
  li,
  span {
    color: ${arcadeColors.smoke} !important;
    font-size: 15px !important;
  }

  /* trechos em negrito do documento fazem o papel dos títulos */
  span[style*='font-weight: 700'],
  strong,
  b {
    color: ${arcadeColors.yellow} !important;
    font-size: 17px !important;
  }

  ul,
  ol {
    padding-left: 22px;
    list-style: disc;
  }

  a,
  a span {
    color: ${arcadeColors.cyan} !important;
  }
`;

const PrivacyPolicy: React.FC = () => {
  return (
    <PageLayout>
      <Wrapper>
        <ArcadeContainer>
          <SectionTitle>Privacy Policy</SectionTitle>
          <Content dangerouslySetInnerHTML={{ __html: content }} />
        </ArcadeContainer>
      </Wrapper>
    </PageLayout>
  );
};

export default PrivacyPolicy;
