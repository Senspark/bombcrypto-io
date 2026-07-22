import styled from 'styled-components';

import bgRound from 'src/assests/event/worldCupPage/Frame 2 Grolypass/Info box.png';
import bgBoard from 'src/assests/event/worldCupPage/Frame4/Table.png';

export const RoundContent = styled.div`
  background: url(${bgRound}) center no-repeat;
  height: 750px;
  background-size: 100% 100%;
  .round-content {
    padding: 20px 50px 20px 30px;
    @media (max-width: 500px) {
      padding: 20px 30px;
    }
  }
  @media (max-width: 500px) {
    height: 600px;
  }
`;

export const Board = styled.div`
  background: url(${bgBoard}) center no-repeat;
  background-size: 100% 100%;
  .round-board {
    padding: 30px 80px;
    @media (max-width: 500px) {
      padding: 30px 10px;
    }
  }
`;
