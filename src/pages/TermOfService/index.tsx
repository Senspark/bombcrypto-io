import React from 'react';

import Content from './Content';
import PageLayout from 'src/templates/PageLayout';

const Main: React.FC = () => {
  return (
    <PageLayout>
      <Content id="contentTerms" />
    </PageLayout>
  );
};

export default Main;
