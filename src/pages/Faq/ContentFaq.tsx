import React, { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { Col } from 'react-bootstrap';

import { buttonList, buttonListPt } from 'src/data/faq/listButton';
import { tabContents, Tabs } from 'src/data/faq/tab';
import { tabContents as tabContentsPt } from 'src/data/faq/tab.pt';
import { defineText, useLang, useText } from 'src/i18n';
import TabContentFaq from 'src/components/TabContentFaq';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';
import { ArcadeContainer } from 'src/components/ui';

const TEXT = defineText(
  {
    results: (n: number) => `${n} result${n === 1 ? '' : 's'}`,
    noResults: 'No questions found. Try other words.',
  },
  {
    results: (n: number) => `${n} resultado${n === 1 ? '' : 's'}`,
    noResults: 'Nenhuma pergunta encontrada. Tente outras palavras.',
  },
);

// Busca sem acento e sem diferenciar maiúsculas; ignora as tags HTML das respostas.
function normalize(value: string) {
  return value
    .replace(/<[^>]*>/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function searchFaq(categories: Tabs[][], query: string): Tabs[] {
  const words = normalize(query).split(/\s+/).filter(Boolean);
  const seen = new Set<string>();
  const found: Tabs[] = [];
  categories.forEach((list) =>
    list.forEach((item) => {
      // a mesma pergunta aparece em várias categorias (às vezes com espaços
      // diferentes no texto): mostra uma vez só, pelo título
      const key = normalize(item.titleTab).trim();
      if (seen.has(key)) return;
      seen.add(key);
      const haystack = normalize(`${item.titleTab} ${item.text}`);
      if (words.every((w) => haystack.includes(w))) found.push(item);
    }),
  );
  return found;
}

const SearchResults = styled.div`
  padding: 24px 8px;
  color: ${arcadeColors.cloud};

  .faq-results-count {
    font-family: ${arcadeFonts.display};
    font-size: 13px;
    letter-spacing: 1px;
    color: ${arcadeColors.smoke};
  }

  .faq-no-results {
    text-align: center;
    color: ${arcadeColors.smoke};
    padding: 24px 0;
  }
`;

const Wrapper = styled.section`
  border-top: 2px solid rgba(255, 255, 255, 0.12);
  padding-bottom: 60px;
`;

function createCssTab() {
  let stylesTabContent = '';
  let stylesTabItem = '';

  for (let i = 1; i < buttonList.length + 1; i++) {
    stylesTabContent += `
       .tab-toggle:nth-child(${i}):checked ~ .tab-container .tab-content:nth-child(${i}) {
         display: block;
       }
     `;
    stylesTabItem += `
       .tab-toggle:nth-child(${i}):checked ~ .tab-list .tab-item:nth-child(${i}) {
          background: ${arcadeColors.yellow};
          color: ${arcadeColors.ink};
       }
       .tab-toggle:nth-child(${i}):checked ~ .tab-list .tab-item:nth-child(${i}) .tab-trigger {
          color: ${arcadeColors.ink};
       }
    `;
  }

  return css`
    ${stylesTabContent}
    ${stylesTabItem}
  `;
}

const ToggleButton = styled.div`
  .tab-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .tab-item {
    text-align: center;
    transition: 0.2s;
    background: ${arcadeColors.panel};
    border: ${arcadeBorder.thin};
    box-shadow: ${hardShadow(4)};
    margin: 8px;
    border-radius: ${arcadeRadius.md};

    &:hover {
      background: ${arcadeColors.panelLight};
      cursor: pointer;
      transform: translate(-2px, -2px);
      box-shadow: ${hardShadow(6)};
    }

    @media screen and (min-width: 1000px) {
      width: 12% !important;
    }
  }
  .tab-toggle {
    display: none;
  }

  .tab-content {
    display: none;
  }
  ${createCssTab()}

  .tab-trigger {
    display: block;
    padding: 10px 4px;
    font-family: ${arcadeFonts.display};
    font-size: 13px;
    letter-spacing: 1px;
    color: ${arcadeColors.cloud};
    cursor: pointer;
  }

  .tab-container {
    padding: 24px 8px;
    color: ${arcadeColors.cloud};
  }
`;

const ContentFaq: React.FC<{ id: string; query: string }> = ({ id, query }) => {
  const [isChecked, setIsChecked] = useState<number>(1);
  const { lang } = useLang();
  const t = useText(TEXT);
  // aba escolhida é por índice: trocar o idioma mantém a mesma categoria
  const buttons = lang === 'pt' ? buttonListPt : buttonList;
  const contents = lang === 'pt' ? tabContentsPt : tabContents;
  const searching = query.trim().length > 0;
  const results = useMemo(
    () => (searching ? searchFaq(contents, query) : []),
    [contents, query, searching],
  );

  return (
    <ArcadeContainer>
      <Wrapper id={id}>
        <ToggleButton>
          {buttons.map((v, i) => {
            return (
              <input
                type="radio"
                className="tab-toggle"
                name="tab-toggle"
                id={`tab${isChecked}`}
                hidden
                checked={i + 1 === isChecked}
                readOnly
                key={i}
              />
            );
          })}
          <ul className="tab-list">
            {buttons.map((v, i) => {
              return (
                <Col className="tab-item" key={i} xs={4} sm={3}>
                  <label
                    className="tab-trigger"
                    htmlFor={`tab${i + 1}`}
                    onClick={() => {
                      setIsChecked(i + 1);
                    }}
                  >
                    {v.children}
                  </label>
                </Col>
              );
            })}
          </ul>
          {searching ? (
            <SearchResults>
              {results.length > 0 ? (
                <>
                  <div className="faq-results-count">
                    {t.results(results.length)}
                  </div>
                  <TabContentFaq list={results} />
                </>
              ) : (
                <p className="faq-no-results">{t.noResults}</p>
              )}
            </SearchResults>
          ) : (
            <div className="tab-container">
              {contents.map((v, i) => {
                return (
                  <div className="tab-content" key={i}>
                    <TabContentFaq list={v} />
                  </div>
                );
              })}
            </div>
          )}
        </ToggleButton>
      </Wrapper>
    </ArcadeContainer>
  );
};

export default ContentFaq;
