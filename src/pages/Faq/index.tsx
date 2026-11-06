import React, { useState } from 'react';

import ContentFaq from './ContentFaq';
import SearchFaq from './SearchFaq';
import PageLayout from 'src/templates/PageLayout';

const Main: React.FC = () => {
  // busca compartilhada entre a caixa de pesquisa e a lista de perguntas
  const [query, setQuery] = useState('');

  return (
    <PageLayout>
      <SearchFaq id="searchFaq" query={query} onQueryChange={setQuery} />
      <ContentFaq id="contentFaq" query={query} />
    </PageLayout>
  );
};

export default Main;
