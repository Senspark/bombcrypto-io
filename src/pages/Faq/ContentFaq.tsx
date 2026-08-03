import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Col } from 'react-bootstrap';

import { buttonList } from 'src/data/faq/listButton';
import { tabContents } from 'src/data/faq/tab';
import TabContentFaq from 'src/components/TabContentFaq';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';
import { ArcadeContainer } from 'src/components/ui';

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

const ContentFaq: React.FC<{ id: string }> = ({ id }) => {
  const [isChecked, setIsChecked] = useState<number>(1);

  return (
    <ArcadeContainer>
      <Wrapper>
        <ToggleButton>
          {buttonList.map((v, i) => {
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
            {buttonList.map((v, i) => {
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
          <div className="tab-container">
            {tabContents.map((v, i) => {
              return (
                <div className="tab-content" key={i}>
                  <TabContentFaq list={v} />
                </div>
              );
            })}
          </div>
        </ToggleButton>
      </Wrapper>
    </ArcadeContainer>
  );
};

export default ContentFaq;
