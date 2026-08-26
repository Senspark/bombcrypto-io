import React from 'react';
import styled from 'styled-components';

import {
  arcadeBorder,
  arcadeColors,
  arcadeRadius,
  hardShadow,
} from 'src/theme/arcade';
import {
  ArcadeContainer,
  SectionSubtitle,
  SectionTitle,
} from 'src/components/ui';

const Wrapper = styled.section`
  padding: 140px 0 40px;

  @media (max-width: 767px) {
    padding: 110px 0 24px;
  }
`;

const SearchBox = styled.div`
  position: relative;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
`;

const InputSearch = styled.input`
  width: 100%;
  height: 52px;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(5)};
  color: ${arcadeColors.white};
  padding: 0 60px 0 16px;
  outline: none;

  &::placeholder {
    color: ${arcadeColors.smoke};
  }

  &:focus {
    border-color: ${arcadeColors.yellow};
  }
`;

const ButtonSearch = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 46px;
  height: 44px;
  background: ${arcadeColors.yellow};
  color: ${arcadeColors.ink};
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.sm};
  cursor: pointer;
`;

const SearchFaq: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <ArcadeContainer>
        <SectionTitle $center>FAQ</SectionTitle>
        <SectionSubtitle $center>
          Find quick answers about the game, tokens, NFTs and the marketplace.
        </SectionSubtitle>
        <SearchBox>
          <InputSearch placeholder="Search FAQ" />
          <ButtonSearch type="button" aria-label="Search">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </ButtonSearch>
        </SearchBox>
      </ArcadeContainer>
    </Wrapper>
  );
};

export default SearchFaq;
