type Data = {
  type: string;
  value: number;
  description: string;
  color: string;
};

export const data: Data[] = [
  {
    type: 'Private Sale',
    value: 6,
    color: '#4285f4',
    description: 'Q3 2021, Locked 1 month, vest 10% monthly',
  },
  {
    type: 'IDO',
    value: 2,
    color: '#ff3a2d',
    description: 'Q3 2021',
  },
  {
    type: 'Listing Pancakeswap',
    value: 1,
    color: '#ffcc00',
    description: 'Q3 2021',
  },
  {
    type: 'Play To Earn',
    value: 20,
    color: '#34a853',
    description:
      'Locked, issuance starts in Q4 2021, Q1 2022. Play To Earn Rewards Pool starts with 20 million Tokens, the number of Tokens in this Rewards Pool is not fixed, it will be continuously added by the company to reward players',
  },
  {
    type: 'Staking Reward',
    value: 20,
    color: '#ff6d01',
    description: 'Locked: issuance starts in Q4 2021, Q1 2022',
  },
  {
    type: 'Ecosystem Fund',
    value: 6,
    color: '#46bdc6',
    description: 'Locked: issuance starts in Q4 2021, Q1 2022',
  },
  {
    type: 'Team',
    value: 25,
    color: '#7baaf7',
    description: 'Locked 1 year, then vest linearly over 1 year',
  },
  {
    type: 'Advisor',
    value: 3,
    color: '#f07b72',
    description: 'Locked 1 year, then vest linearly over 1 year',
  },
  {
    type: 'DEX Liquidity',
    value: 5,
    color: '#fc4f94',
    description: 'Locked 1 month, then 5% monthly',
  },
  {
    type: 'Reserves',
    value: 12,
    color: '#864ffc',
    description: 'Locked 1 year, then vest linearly over 2 years',
  },
];
