import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding: 120px 0 60px 0;
  font-family: barlow condensed, sans-serif !important;
`;

const Search = styled.div`
  position: relative;
  width: 100%;
`;

const ContainSearch = styled.div`
  position: absolute;
  width: 75%;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
`;

const ButtonSearch = styled.button`
  background: rgb(51, 50, 50);
  color: rgb(249, 176, 67);
  width: 42px;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  f
  top: -1px;
  right: -1px;
`;

const InputSearch = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #b0b0b0;
  border-radius: 5px;

  padding-left: 10px;
`;

const ContentFaq: React.FC<{ id: string }> = ({ id }) => {
  return (
    <Wrapper id={id}>
      <Container>
        <Search>
          <div className="position-absolute w-100">
            <ContainSearch>
              <InputSearch placeholder="Search FAQ" />
              <ButtonSearch>
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
            </ContainSearch>
          </div>
        </Search>
      </Container>
    </Wrapper>
  );
};

export default ContentFaq;
