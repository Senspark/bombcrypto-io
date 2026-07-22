import styled from 'styled-components';
import bgRound from 'src/assests/event/worldCupPage/Frame 2 Grolypass/Info box.png';
import { Row } from 'react-bootstrap';

export const RoundContent = styled.div`
  background: url(${bgRound}) center no-repeat;
  background-size: 100% 100%;
  .round-content {
    padding: 20px 10px;
  }
`;

export const Content = styled(Row)`
  margin: 0 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #672b2f;
  @media (max-width: 500px) {
    margin: 0 10px;
  }
`;
