import React from 'react';
import { Tabs } from 'src/data/faq/tab';
import styled from 'styled-components';

type Props = {
  list: Tabs[];
};

const TabContent = styled.div`
  padding: 0;
  margin: 0 auto;
  details > summary::after {
    position: absolute;
    content: '+';
    color: #fff;
    background: rgb(247, 155, 64);
    font-size: 20px;
    text-align: center;
    border-radius: 5px;
    padding: 2px 10px;
    right: 16px;
    top: 4px;
  }
  details[open] > summary::after {
    position: absolute;
    content: '-';
    color: #fff;
    background: rgb(247, 155, 64);
    font-size: 20px;
    text-align: center;
    border-radius: 5px;
    padding: 2px 10px;
    right: 16px;
    top: 4px;
    @media screen and (max-width: 600px) {
      right: 0 !important;
      margin: 0 20px;
    }
  }
  details > summary {
    list-style: none;
  }
  details > summary::-webkit-details-marker {
    display: none;
    opacity: 0;
  }
`;

const Detail = styled.details`
  border: 1px solid #b0b0b0;
  border-radius: 5px;
  margin: 10px 0;
  p {
    color: #777;
    font-size: 14px;
    margin-bottom: 10px;
    padding-left: 5px;
  }
`;

const Summary = styled.summary`
  font-size: 16px;
  font-weight: 600;
  padding: 10px 5px;
  color: #777;
  outline: none;
  text-align: left;
  cursor: pointer;
  position: relative;
  @media screen and (max-width: 600px) {
    padding-right: 50px;
  }
`;

const TabContentFaq: React.FC<Props> = ({ list }) => {
  return (
    <TabContent>
      {list.map((v, i) => {
        return (
          <Detail key={i}>
            <Summary>{v.titleTab}</Summary>
            <div className="py-2">
              <p dangerouslySetInnerHTML={{ __html: v.text }} />
            </div>
          </Detail>
        );
      })}
    </TabContent>
  );
};

export default TabContentFaq;
