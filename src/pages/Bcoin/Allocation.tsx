import React from 'react';
import styled from 'styled-components';
import bgAllocation from 'src/assests/bcoin/bg-allocation.jpeg';
import PieChart from 'src/assests/bcoin/pie-chart.png';
import AllocationTable from 'src/assests/bcoin/allocation-table.png';
import { arcadeColors, arcadeFonts } from 'src/theme/arcade';
import { SectionTitle } from 'src/components/ui';

const SectionWrapper = styled.section`
  width: 100%;
  background: linear-gradient(
      180deg,
      rgba(14, 17, 48, 0.92) 0%,
      rgba(8, 10, 31, 0.94) 100%
    ),
    url(${bgAllocation}) no-repeat center;
  background-size: cover;
  font-family: ${arcadeFonts.body};
  color: ${arcadeColors.cloud};
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const AllocationWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  .item-left {
    margin-top: 40px;
  }
  @media (max-width: 576px) {
    flex-direction: column;
    margin-top: 0px;
  }
`;

const AllocationItem = styled.div``;

const PieChartImage = styled.img`
  width: 100%;
`;

const TableImage = styled.img`
  width: 100%;
`;

const Allocation: React.FC<{ id: string }> = ({ id }) => {
  return (
    <SectionWrapper id={id}>
      <Container className="container">
        <SectionTitle $center>Allocation</SectionTitle>
        <AllocationWrapper>
          <AllocationItem className="col-12 col-sm-6">
            <PieChartImage src={PieChart} />
          </AllocationItem>
          <AllocationItem className="col-12 col-sm-6 ">
            <TableImage src={AllocationTable} />
          </AllocationItem>
        </AllocationWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Allocation;
