import React from 'react';

import Header from 'src/templates/worldcup/Header';
import ContentHeader from './ContentHeader';
import Hero from '../Home/UpdateHero';
import Glory from './Glory';
import Timeline from './Timeline';
import Reward from './Reward';
import HowToJoin from './HowToJoin';
import Footer from './Footer';
import AccountProvider from 'src/context/account';
import SmartContract from 'src/context/smc';

const WorldCup = () => {
  return (
    <AccountProvider>
      <SmartContract>
        <div className="main">
          <Header id="header" content={<ContentHeader />} show={true} />
          <Hero id="hero" content={<div />} isPageWorldCup show={true} />
          <Glory id="glory-pass" />
          <Timeline id="timeline" />
          <HowToJoin id="event" />
          <Reward id="reward" />
          <Footer />
        </div>
      </SmartContract>
    </AccountProvider>
  );
};

export default WorldCup;
