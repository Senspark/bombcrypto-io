import React from 'react';
import styled from 'styled-components';
import bgAllocation from 'src/assests/bcoin/bg-allocation.jpeg';
import PieChart from 'src/assests/bcoin/pie-chart.png';
import AllocationTable from 'src/assests/bcoin/allocation-table.png';

const SectionWrapper = styled.section`
  width: 100%;
  background: url(${bgAllocation}) no-repeat center;
  background-size: cover;
  font-family: 'Montserrat', sans-serif;
  color: white;
`;

const Container = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const Title = styled.div`
  font-size: 41px;
  color: #ffea00;
  text-align: center;
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
        <Title>Allocation</Title>
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
