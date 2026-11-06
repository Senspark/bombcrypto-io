import React from 'react';
import styled from 'styled-components';

import { useLang } from 'src/i18n';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
} from 'src/theme/arcade';

/*
 * Termos de Serviço e Política de Privacidade ficam só em inglês (texto
 * jurídico sem tradução revisada). Em português a página avisa isso no topo.
 */

const Box = styled.p`
  margin: 0 0 24px;
  padding: 12px 16px;
  font-family: ${arcadeFonts.body};
  font-size: 15px;
  line-height: 1.5;
  color: ${arcadeColors.cloud};
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
`;

const LegalNotice: React.FC = () => {
  const { lang } = useLang();
  if (lang !== 'pt') return null;
  return (
    <Box>
      Este documento está disponível apenas em inglês. A versão em inglês é a
      oficial.
    </Box>
  );
};

export default LegalNotice;
