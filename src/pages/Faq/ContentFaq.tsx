import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Container, Col } from 'react-bootstrap';

import { buttonList } from 'src/data/faq/listButton';
import { tabContents } from 'src/data/faq/tab';
import TabContentFaq from 'src/components/TabContentFaq';

const Wrapper = styled.section`
  border-top: 1px solid #b0b0b0;
  font-family: barlow condensed, sans-serif !important;
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
          background: rgb(249, 193, 41);
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
    transition: 0.3s;
    background: rgb(247, 155, 64);
    margin: 10px;
    border-radius: 5px;
    &:hover {
      background: rgb(249, 193, 41);
      cursor: pointer;
    }
    @media screen and (min-width: 1000px) {
      width: 10% !important;
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
    padding: 5px 0;
    color: #fff;
  }

  .tab-container {
    padding: 15px 30px;
  }
`;

const ContentFaq: React.FC<{ id: string }> = ({ id }) => {
  const [isChecked, setIsChecked] = useState<number>(1);

  return (
    <Container>
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
    </Container>
  );
};

export default ContentFaq;
