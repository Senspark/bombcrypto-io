import React from 'react';
import { Tabs } from 'src/data/faq/tab';
import styled from 'styled-components';
import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';

type Props = {
  list: Tabs[];
};

const markerStyles = `
  position: absolute;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.sm};
  font-family: ${arcadeFonts.display};
  font-size: 16px;
  line-height: 1;
  text-align: center;
  padding: 6px 10px;
  right: 14px;
  top: 12px;
`;

const TabContent = styled.div`
  padding: 0;
  margin: 0 auto;

  details > summary::after {
    ${markerStyles};
    content: '+';
  }
  details[open] > summary::after {
    ${markerStyles};
    content: '-';

    @media screen and (max-width: 600px) {
      right: 10px;
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
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(4)};
  margin: 12px 0;
  overflow: hidden;

  p {
    color: ${arcadeColors.smoke};
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 0;
    padding: 0 16px 14px;
  }

  a {
    color: ${arcadeColors.cyan};
  }
`;

const Summary = styled.summary`
  font-size: 16px;
  font-weight: 600;
  padding: 14px 60px 14px 16px;
  color: ${arcadeColors.white};
  outline: none;
  text-align: left;
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${arcadeColors.yellow};
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
