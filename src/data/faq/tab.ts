import imgIcon from 'src/assests/imgFaq/icon.webp';
import imgUpdate from 'src/assests/imgFaq/imgUpdate.png';

export type Tabs = {
  titleTab: string;
  text: string;
};

type TabContents = Tabs[];

export const tabContents: TabContents[] = [
  [
    {
      titleTab: 'Information about Listing & Game Release',
      text: `03:00 UTC (10:00 GMT+7) September 22 Listing on PancakeSwap
    <br />  
    September 30, 2021 web game release `,
    },
    {
      titleTab: 'How many types of Tokens does the game have?',
      text: `The game will have only 1 Token: BCOIN <br /> BCOIN Official Contract address: <strong>0x00e1656e45f18ec6747F5a8496Fd39B50b38396D</strong> `,
    },
    {
      titleTab: 'Bomb Crypto will be released on which platform?',
      text: 'PC (Web Game), login using MetaMask (using Network BSC)',
    },
    {
      titleTab: 'What is the starting price on PancakeSwap?',
      text: 'The starting price when listing on PancakeSwap will be 1 BCOIN = 0.1 BUSD.',
    },
    {
      titleTab: 'What is the initial cost to join the game?',
      text: 'The initial cost to be able to join the game is 10 BCOIN (equivalent to buying 1 Bomber Hero)',
    },
    {
      titleTab: 'Some heroes have slow energy regeneration, why?',
      text: `The higher the hero's rarity, the more energy bar is stored, so the longer it heals, if there's no house, the recovery rate will be 0.5 energy/min <br> 
The higher the stamina of the hero, the greater the energy reserve. <br> 
1 stamina = 50 energy `,
    },
    {
      titleTab: 'Sometimes my gas charge is up to 0.4 bnb, what should i do?',
      text: 'Please refresh the website and perform the transaction as usual. Disagree transaction when gas fee 0.4 bnb',
    },
    {
      titleTab: 'When can I claim Bcoin and Hero Rescue?',
      text: `You can claim when you mine 40 Bcoins and you must hold at least 1 BCOIN in your wallet <br> 
You can claim a hero when there is a rescue hero, in addition, the chest must contain the hero, there must be space, not exceeding 500 heroes.`,
    },
    {
      titleTab:
        'My heroes are stuck, they don’t dig even though there are blocks on the map?',
      text: 'You just need to go back to the main menu then go back to Treasure Hunt mode.',
    },
    {
      titleTab:
        'I bought the hero successfully but didn’t receive it, what should I do?',
      text: `- Refresh your game browser. <img src=${imgIcon} width={${25}} height={{${25}}} /> <br>  on top menu and click claim hero`,
    },
    {
      titleTab: 'When my loading stops at 10%, what should I do?',
      text: 'Refresh the browser, clear the cache, and repeat several times until you get into the game.',
    },
    {
      titleTab:
        'I claim hero/bcoin and my transaction on report https://report.bombcrypto.io/ which is successfull, but I don’t receive them',
      text: `BCOIN: <br> 1. If claiming failed. <br>  >> Go to the Report site <a href="https://report.bombcrypto.io/" target="_blank">(https://report.bombcrypto.io/)</a>  to retry. if you didn't retry within 24 hours, we will auto-retry for you, then BCOIN will return to your wallet. <br> <br> 2. If the claim is successful. but hasn't been received yet <br> >> We will automatically process it within 24 hours, then the BCOIN will return to your wallet. <br> <br>  BHERO: <br> The claim fails or claims successfully without receiving: <br> => Please wait within 24 hours, then go to the Report site (https://report.bombcrypto.io/hero) <br> and then connect the wallet to receive Hero back. `,
    },
    {
      titleTab: 'Does the hero recover energy when unactive?',
      text: 'Heroes will not recover energy while in an unactive state, heroes when unactive will also retain their current energy level.',
    },
    {
      titleTab: 'Is there a limit to the number of houses in the game?',
      text: 'The number of houses in the game is currently limited to only 5000 houses.',
    },
    {
      titleTab:
        'Does the game use the player’s personal skills to win, or does the character’s stats in the game?',
      text: `Phase 1 has only one mode, Treasure Hunt, which allows users to mine Bcoins through Bomber Heroes, the PVP function in phase 4 will allow players to use their skills more. <br> However, we also need time to analyze user trends and preferences before deciding to design a PVP. `,
    },
    {
      titleTab: 'Is the game required to buy a House for Bomber Hero?',
      text: 'Not mandatory. If there is no house, Bomber Hero will rest with a slow recovery speed.',
    },
    {
      titleTab: 'Does Bomb Crypto plan to update the graphics?',
      text: 'Graphics is improved gradually but still has classic pixel style.',
    },
    {
      titleTab: 'Is the amount of Bomber Hero limited?',
      text: 'We needed a short period to analyze the in-game user data, then we could decide to limit bomber heroes.',
    },
    {
      titleTab: 'How many are hero max in game?',
      text: 'One account can contain 500 heroes, in-game there will be 15 mining heroes',
    },
    {
      titleTab: 'Can I transfer my heroes / house to another wallet?',
      text: `No, you can't. But soon we will have the Marketplace to buy/sell heroes/houses in Q4/2021.`,
    },
  ],
  [
    {
      titleTab: 'Information about Listing & Game Release',
      text: `03:00 UTC (10:00 GMT+7) September 22 Listing on PancakeSwap
    <br />  
    September 30, 2021 web game release `,
    },
    {
      titleTab: 'How many types of Tokens does the game have?',
      text: `The game will have only 1 Token: BCOIN <br /> BCOIN Official Contract address: <strong>0x00e1656e45f18ec6747F5a8496Fd39B50b38396D</strong> `,
    },
    {
      titleTab: 'Bomb Crypto will be released on which platform?',
      text: 'PC (Web Game), login using MetaMask (using Network BSC)',
    },
    {
      titleTab: 'What is the starting price on PancakeSwap?',
      text: 'The starting price when listing on PancakeSwap will be 1 BCOIN = 0.1 BUSD.',
    },
    {
      titleTab: 'What is the initial cost to join the game?',
      text: 'The initial cost to be able to join the game is 10 BCOIN (equivalent to buying 1 Bomber Hero)',
    },
    {
      titleTab:
        'Is it possible to join Play-To-Earn at the game’s launch stage?',
      text: `Play-To-Earn is now available through the Treasure Hunt Mode. <br> You can buy Hero in the Shop then use it to mine Bcoin and Hero in Treasure Hunt Mode.`,
    },
    {
      titleTab: 'Do we have the Staking System?',
      text: `<strong>VIP & STAKE will be released in 1Q2022.</strong> <br> According to the amount of your Staking, you will have more benefits, following the image below: `,
    },
    {
      titleTab: 'Where can I update the official information of Bomb Crypto?',
      text: `<strong>You can join the community group:</strong> <br> 
    <strong>Twitter:</strong> <a href="https://twitter.com/BombCryptoGame">https://twitter.com/BombCryptoGame</a> <br> 
    <strong>Facebook:</strong> <a href="https://www.facebook.com/BombCryptoGame">https://www.facebook.com/BombCryptoGame</a> <br>
    <strong>Discord:</strong> <a href="https://discord.link/bombcrypto">https://discord.link/bombcrypto</a> <br>
    <strong>Youtube:</strong> <a href="https://bit.ly/bombcrypto">https://bit.ly/bombcrypto</a> <br>
    <strong>Medium:</strong> <a href="https://bombcrypto.medium.com/">https://bombcrypto.medium.com/</a> <br>
    <strong>Tiktok:</strong> <a href="https://www.tiktok.com/@bombcrypto_official">https://www.tiktok.com/@bombcrypto_official</a> <br>
    <strong>Telegram Channel:</strong> <a href=" https://t.me/BombCryptoGroup"> https://t.me/BombCryptoGroup</a> <br>
    <strong>Telegram Group::</strong> <a></a> <br>
    <strong>Offiicial:</strong> <a href=" https://t.me/BombCryptoGroup">https://t.me/BombCryptoGroup</a> <br>
    <strong>Vietnam:</strong> <a href="https://t.me/BombcryptoVietnamgroup">https://t.me/BombcryptoVietnamgroup</a> <br>
    <strong>Philippines:</strong> <a href="https://t.me/Bombcrypto_PH">https://t.me/Bombcrypto_PH</a> <br>
    <strong>China:</strong> <a href=" https://t.me/BombCryptoGroup_CN"> https://t.me/BombCryptoGroup_CN</a> <br>
    <strong>Brazil:</strong> <a href="https://t.me/BombCryptoBR">https://t.me/BombCryptoBR</a> <br>
    <strong>Spanish:</strong> <a href="https://t.me/BombCryptoGroup_SP">https://t.me/BombCryptoGroup_SP</a> <br>
    <strong>Thailand:</strong> <a href="https://t.me/bombcrypto_Thailand">https://t.me/bombcrypto_Thailand</a> <br>
    `,
    },
    {
      titleTab:
        'If I have a problem besides FAQ, who can I contact to be supported?',
      text: `You can join <strong>Telegram:</strong> <a href="  https://t.me/BombCryptoGroup ">  https://t.me/BombCryptoGroup </a> and filter /admin <br> You can inbox one of them. <br> <strong>Note: Admins never inbox you first and ask you for the secret key and password.</strong> `,
    },
  ],
  [
    {
      titleTab: 'What is the initial cost to join the game?',
      text: 'The initial cost to be able to join the game is 10 BCOIN (equivalent to buying 1 Bomber Hero)',
    },
    {
      titleTab: 'Some heroes have slow energy regeneration, why?',
      text: `The higher the hero's rarity, the more energy bar is stored, so the longer it heals, if there's no house, the recovery rate will be 0.5 energy/min <br> The higher the stamina of the hero, the greater the energy reserve. <br> 1 stamina = 50 energy`,
    },
    {
      titleTab: 'When can I claim Bcoin and Hero Rescue?',
      text: `You can claim when you mine 40 Bcoins and you must hold at least 1 BCOIN in your wallet <br> You can claim a hero when there is a rescue hero, in addition, the chest must contain the hero, there must be space, not exceeding 500 heroes.`,
    },
    {
      titleTab: 'Does the hero recover energy when unactive?',
      text: `Heroes will not recover energy while in an unactive state, heroes when unactive will also retain their current energy level.`,
    },
    {
      titleTab: 'Is there a limit to the number of houses in the game?',
      text: `The number of houses in the game is currently limited to only 5000 houses.`,
    },
    {
      titleTab:
        'Does the game use the player’s personal skills to win, or does the character’s stats in the game?',
      text: `Phase 1 has only one mode, Treasure Hunt, which allows users to mine Bcoins through Bomber Heroes, the PVP function in phase 4 will allow players to use their skills more. <br> However, we also need time to analyze user trends and preferences before deciding to design a PVP.`,
    },
    {
      titleTab: 'Is the game required to buy a House for Bomber Hero?',
      text: `Not mandatory. If there is no house, Bomber Hero will rest with a slow recovery speed.`,
    },
    {
      titleTab: 'Does Bomb Crypto plan to update the graphics?',
      text: `Graphics is improved gradually but still has classic pixel style.`,
    },
    {
      titleTab: 'Is the amount of Bomber Hero limited?',
      text: `We needed a short period to analyze the in-game user data, then we could decide to limit bomber heroes.`,
    },
    {
      titleTab: 'How many are hero max in game?',
      text: `One account can contain 500 heroes, in-game there will be 15 mining heroes`,
    },
    {
      titleTab: 'Can I transfer my heroes / house to another wallet?',
      text: `No, you can't. But soon we will have the Marketplace to buy/sell heroes/houses in Q4/2021.`,
    },
    {
      titleTab:
        'Does the game have any special mechanics to play and retain players for a long time?',
      text: `The game will have many different game modes to satisfy the needs of all gamers as well as investors <br>
  Featured functions include Story Mode, Treasure Hunt Mode, PvP Mode, collect & sell special NFT items <br>
- The game has 3 main playstyles suitable for many audiences like Busy people they will love the Treasure Hunt mode <br>
- The game has a Story Mode suitable for offline gamers who like to explore experiences and still earn money. <br>
- The game has a PVP Mode suitable for gamers who like to play online with competition and high skills`,
    },
    {
      titleTab: 'What’s outstanding about Bomb Crypto to attract players?',
      text: `- Users can play and earn BCOIN right after the game is released. <br>
- Classic Casual games are a new niche in the NFT Blockchain market. <br>
- The game has proven a success on a mobile platform called Bomb Squad with over 1 million users. <br>
- The game has more than 1 million downloads and is a success when released on Google Play. <br>
- Our team has more than 10 years of experience in game development. <br>
- Our team has security and marketing advice from Google experts. <br>
- Pixel graphics is familiarity to users. There will be events to create characters and select beautiful characters for Airdrop.`,
    },
  ],
  [
    {
      titleTab: 'Sometimes my gas charge is up to 0.4 bnb, what should i do?',
      text: 'Please refresh the website and perform the transaction as usual. Disagree transaction when gas fee 0.4 bnb',
    },
    {
      titleTab:
        'My heroes are stuck, they don’t dig even though there are blocks on the map?',
      text: 'You just need to go back to the main menu then go back to Treasure Hunt mode.',
    },
    {
      titleTab:
        'I bought the hero successfully but didn’t receive it, what should I do?',
      text: `- Refresh your game browser. <br>
- Go check Chest    on top menu and click claim hero`,
    },
    {
      titleTab: 'When my loading stops at 10%, what should I do?',
      text: 'Refresh the browser, clear the cache, and repeat several times until you get into the game',
    },
    {
      titleTab:
        'I claim hero/bcoin and my transaction on report https://report.bombcrypto.io/ which is successfull, but I don’t receive them',
      text: `BCOIN: <br> 1. If claiming failed. <br>  >> Go to the Report site <a href="https://report.bombcrypto.io/" target="_blank">(https://report.bombcrypto.io/)</a>  to retry. if you didn't retry within 24 hours, we will auto-retry for you, then BCOIN will return to your wallet. <br> <br> 2. If the claim is successful. but hasn't been received yet <br> >> We will automatically process it within 24 hours, then the BCOIN will return to your wallet. <br> <br>  BHERO: <br> The claim fails or claims successfully without receiving: <br> => Please wait within 24 hours, then go to the Report site (https://report.bombcrypto.io/hero) <br> and then connect the wallet to receive Hero back. `,
    },
  ],
  [
    {
      titleTab: 'When can I claim Bcoin and Hero Rescue?',
      text: `You can claim when you mine 40 Bcoins and you must hold at least 1 BCOIN in your wallet <br>
You can claim a hero when there is a rescue hero, in addition, the chest must contain the hero, there must be space, not exceeding 500 heroes.`,
    },
    {
      titleTab: 'Claim Bcoins but not received, what should I do?',
      text: `You can access the address <a href=" https://report.bombcrypto.io/">https://report.bombcrypto.io/</a> then proceed to paste your MetaMask wallet address into the "Search by wallet address" field to check. <br>

If the Bcoins claim fails (Status: failed), you can click the Retry button in the Action column to proceed to receive your Bcoins ba`,
    },
  ],
  [
    {
      titleTab: 'When can I claim Bcoin and Hero Rescue?',
      text: `You can claim when you mine 40 Bcoins and you must hold at least 1 BCOIN in your wallet <br>
You can claim a hero when there is a rescue hero, in addition, the chest must contain the hero, there must be space, not exceeding 500 heroes.`,
    },
    {
      titleTab: 'When can I claim Bcoin and Hero Rescue?',
      text: `You can access the address <a href=" https://report.bombcrypto.io/hero">https://report.bombcrypto.io/hero</a> and follow these steps: <br>
Step 1: Connect to the Wallet. <br>
Step 2: Click claim BHERO and confirm MetaMask Wallet. <br>
Step 3: Click Receive BHERO and confirm MetaMask Wallet. <br>
Then wait about 5 minutes, proceed to log in the game again and check at CHEST.`,
    },
  ],
  [
    {
      titleTab: 'How does the Upgrade Hero mechanism work?',
      text: `You can Upgrade Level for Bomber Hero by using another Bomber Hero of the same level as the Bomber Hero you want to upgrade plus the cost of Bcoin. <br>
The steps to perform the Upgrade are as follows: <br>
Step 1: Go to the HEROES menu, select the Bomber Hero you want to upgrade. <br>
Step 2: Click the UPGRADE button. <br>
Step 3: Select 1 Bomber Hero of the same level as an upgrade material (Note: after upgrading, Bomber Hero used as material will be lost). <br>
Step 3: Click the UPGRADE button and confirm MetaMask wallet to complete. <br>
<img src=${imgUpdate} width="300" height="157" />
`,
    },
    {
      titleTab: 'What is the extra attribute after Upgrade Hero?',
      text: `After Upgrade, Hero will be added with Power attribute, depending on the level and additional Power stats will be different.CHEST.`,
    },
    {
      titleTab:
        'What is the cost as well as Power plus when conducting Upgrade Hero?',
      text: `Cost and Power plus when conducting Upgrade Hero:`,
    },
  ],
  [
    {
      titleTab: 'When does Marketplace open?',
      text: `Marketplace will be launched in Q4/2021.`,
    },
  ],
];
