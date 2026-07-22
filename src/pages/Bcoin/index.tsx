import React from 'react';

import Navbar from '../Home/Navbar';
import Introduction from './Introduction';
import WhatIsBcoin from './WhatIsBcoin';
import TokenMetrics from './TokenMetrics';
import Allocation from './Allocation';
import AvailableOn from './AvailableOn';
import SocialNetwork from 'src/pages/Home/SocialNetwork';

const Main: React.FC = () => {
  return (
    <div className="main">
      <Navbar id="navbar" />
      <Introduction id="bcoin_introduction" />
      <WhatIsBcoin id="what_is_bcoin" />
      <TokenMetrics id="bcoin_token_metrics" />
      <Allocation id="bcoin_allocation" />
      <AvailableOn id="bcoin_available_on" />
      <SocialNetwork id="social" show={true} />
    </div>
  );
};

export default Main;
