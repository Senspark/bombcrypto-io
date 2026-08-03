import React from 'react';

import ContentFaq from './ContentFaq';
import SearchFaq from './SearchFaq';
import PageLayout from 'src/templates/PageLayout';

const Main: React.FC = () => {
  return (
    <PageLayout>
      <SearchFaq id="searchFaq" />
      <ContentFaq id="contentFaq" />
    </PageLayout>
  );
};

export default Main;
