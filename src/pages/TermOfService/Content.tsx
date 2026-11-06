import React from 'react';
import LegalNotice from 'src/components/ui/LegalNotice';
import { useLang } from 'src/i18n';
import styled from 'styled-components';

import { content } from 'src/data/termOfSevices/content';
import { arcadeColors, arcadeFonts } from 'src/theme/arcade';
import { ArcadeContainer, SectionTitle } from 'src/components/ui';

const Wrapper = styled.section`
  padding: 140px 0 80px;
  color: ${arcadeColors.cloud};

  @media (max-width: 767px) {
    padding: 110px 0 56px;
  }
`;

const ContentDetail = styled.div`
  padding-top: 24px;
`;

const Heading = styled.strong`
  display: block;
  margin-top: 32px;
  font-family: ${arcadeFonts.display};
  font-size: 18px;
  letter-spacing: 1px;
  color: ${arcadeColors.yellow};
`;

const Detail = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${arcadeColors.smoke};
  margin: 12px 0;

  &:empty {
    display: none;
  }
`;

const Content: React.FC<{ id: string }> = ({ id }) => {
  const { lang } = useLang();
  return (
    <Wrapper id={id}>
      <ArcadeContainer>
        <SectionTitle>
          {lang === 'pt' ? 'Termos de Serviço' : 'Terms Of Service'}
        </SectionTitle>
        <LegalNotice />
        <ContentDetail>
          {content.map((v, i) => {
            return (
              <div key={i}>
                <Heading>{v.heading}</Heading>
                <Detail>{v.detail1}</Detail>
                <Detail>{v.detail2}</Detail>
                <Detail>{v.detail3 && v.detail3}</Detail>
                <Detail>{v.detail4 && v.detail4}</Detail>
              </div>
            );
          })}
        </ContentDetail>
      </ArcadeContainer>
    </Wrapper>
  );
};

export default Content;
