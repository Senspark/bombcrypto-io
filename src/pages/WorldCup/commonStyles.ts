import styled from 'styled-components';

export const Wrapper = styled.section<{ bg: string }>`
  background: url(${({ bg }) => bg}) center no-repeat;
  background-size: 100% 100%;
  position: relative;
  .round {
    padding: 50px 0;
  }
`;

export const FooterRound = styled.img`
  position: absolute;
  bottom: -5px;
  width: 100%;
  display: block;
  height: auto;
`;
