import React from 'react';
import Guideline from './Guideline';
import PageLayout from 'src/templates/PageLayout';

const Main: React.FC = () => {
  return (
    <PageLayout>
      <Guideline id="guidline" />
    </PageLayout>
  );
};

export default Main;
