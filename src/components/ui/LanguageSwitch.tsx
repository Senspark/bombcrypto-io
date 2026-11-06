import React from 'react';
import styled from 'styled-components';

import { LANGS, useLang } from 'src/i18n';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';

/* Seletor EN | PT do menu: o idioma escolhido fica guardado no navegador. */

const Group = styled.div`
  display: inline-flex;
  padding: 3px;
  gap: 3px;
  background: ${arcadeColors.nightDeep};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.pill};
  box-shadow: ${hardShadow(3)};
`;

const Option = styled.button<{ $active: boolean }>`
  min-width: 40px;
  padding: 5px 10px;
  font-family: ${arcadeFonts.display};
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 1;
  color: ${({ $active }) => ($active ? arcadeColors.ink : arcadeColors.smoke)};
  background: ${({ $active }) =>
    $active ? arcadeColors.yellow : 'transparent'};
  border: 0;
  border-radius: ${arcadeRadius.pill};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    color: ${({ $active }) =>
      $active ? arcadeColors.ink : arcadeColors.white};
  }
  &:focus-visible {
    outline: 3px solid ${arcadeColors.cyan};
    outline-offset: 2px;
  }
`;

const LanguageSwitch: React.FC<{ className?: string }> = ({ className }) => {
  const { lang, setLang } = useLang();
  return (
    <Group
      className={className}
      role="radiogroup"
      aria-label="Language / Idioma"
    >
      {LANGS.map((l) => (
        <Option
          key={l.id}
          type="button"
          role="radio"
          aria-checked={lang === l.id}
          aria-label={l.name}
          title={l.name}
          $active={lang === l.id}
          onClick={() => {
            setLang(l.id);
            logTrackClickEventAnalytics(`language_${l.id}`);
          }}
        >
          {l.label}
        </Option>
      ))}
    </Group>
  );
};

export default LanguageSwitch;
