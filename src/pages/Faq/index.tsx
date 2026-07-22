import React from 'react';

import Navbar from 'src/pages/Home/Navbar';
import SocialNetwork from 'src/pages/Home/SocialNetwork';
import ContentFaq from './ContentFaq';
import SearchFaq from './SearchFaq';

const Main: React.FC = () => {
  return (
    <div className="main">
      <Navbar id="navbar" />
      <SocialNetwork id="social" show={true} />
      <SearchFaq id="searchFaq" />
      <ContentFaq id="contentFaq" />
    </div>
  );
};

export default Main;
