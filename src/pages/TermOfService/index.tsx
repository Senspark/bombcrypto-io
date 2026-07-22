import React from 'react';

import Navbar from 'src/pages/Home/UpdateNavbar';
import Content from './Content';
import SocialNetwork from 'src/pages/Home/SocialNetwork';

const Main: React.FC = () => {
  return (
    <div className="main">
      <Navbar id="update-navbar" />
      <SocialNetwork id="social" show={true} />
      <Content id="contentTerms" />
    </div>
  );
};

export default Main;
