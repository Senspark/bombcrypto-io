import React from 'react';
import Guideline from './Guideline';
import SocialNetwork from 'src/pages/Home/SocialNetwork';
import Header from '../../templates/worldcup/Header';
import ContentHeader from '../../templates/worldcup/ContentHeader';

const Main: React.FC = () => {
  const changeNetwork = () => {};
  return (
    <div className="main">
      <Header
        id="update-navbar"
        show={true}
        content={<ContentHeader ChangeNetWork={changeNetwork} />}
      />
      {/* <UpdateNavbar id="updateNavbar" /> */}
      <Guideline id="guidline" />
      <SocialNetwork id="social" show={true} />
    </div>
  );
};

export default Main;
