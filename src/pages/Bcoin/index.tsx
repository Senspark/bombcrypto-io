import React from 'react';

import Introduction from './Introduction';
import WhatIsBcoin from './WhatIsBcoin';
import TokenMetrics from './TokenMetrics';
import Allocation from './Allocation';
import AvailableOn from './AvailableOn';
import PageLayout from 'src/templates/PageLayout';

const Main: React.FC = () => {
  return (
    <PageLayout>
      <Introduction id="bcoin_introduction" />
      <WhatIsBcoin id="what_is_bcoin" />
      <TokenMetrics id="bcoin_token_metrics" />
      <Allocation id="bcoin_allocation" />
      <AvailableOn id="bcoin_available_on" />
    </PageLayout>
  );
};

export default Main;
