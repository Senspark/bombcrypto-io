import telegram from 'src/assests/menuSocial_2024/Icon_Tele.png';
import discord from 'src/assests/menuSocial_2024/Icon_Discord.png';
import twitter from 'src/assests/menuSocial_2024/Icon_Twitter.png';
//import facebook from 'src/assests/menuSocial/facebook.webp';
//import youtube from 'src/assests/menuSocial/youtube.webp';
import twitch from 'src/assests/menuSocial_2024/Icon_Twitch.png';
import tiktok from 'src/assests/menuSocial_2024/Icon_Tiktok.png';
// import medium from 'src/assests/menuSocial/medium.png';
import substack from 'src/assests/menuSocial_2024/Icon_Substack.png';

type SocialImage = {
  image: any;
  url: string;
  target: string;
  name: string;
};

export const social: SocialImage[] = [
  {
    image: discord,
    target: '_blank',
    url: 'https://discord.gg/wG75cP9TRh',
    name: 'discord',
  },
  {
    image: twitter,
    target: '_blank',
    url: 'https://twitter.com/BombCryptoGame',
    name: 'twitter',
  },
  {
    image: telegram,
    target: '_blank',
    url: 'https://t.me/BombCryptoGroup',
    name: 'telegram',
  },
  //{
  //  image: facebook,
  //  target: '_blank',
  //  url: 'https://www.facebook.com/BombCryptoGame',
  //  name: 'facebook',
  //},
  //{
  //  image: youtube,
  //  target: '_blank',
  //  url: 'https://www.youtube.com/channel/UCQGdoNOnb71PB4MvZa9upwg/featured',
  //  name: 'youtube',
  //},
  {
    image: twitch,
    target: '_blank',
    url: 'https://www.twitch.tv/bombcrypto_bcoin',
    name: 'twitch',
  },
  {
    image: tiktok,
    target: '_blank',
    url: 'https://www.tiktok.com/@bombcrypto_official?',
    name: 'discord',
  },
  // {
  //   image: medium,
  //   target: '_blank',
  //   url: 'https://bombcrypto.medium.com/',
  //   name: 'tiktok',
  // },
  {
    image: substack,
    target: '_blank',
    url: 'https://bombcrypto.substack.com/',
    name: 'substack',
  },
];
