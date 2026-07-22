import part1 from 'src/assests/imgRouteGuide/part1.png';
import part2 from 'src/assests/imgRouteGuide/part2.png';
import part3 from 'src/assests/imgRouteGuide/part3.png';
import part4 from 'src/assests/imgRouteGuide/part4.png';
import part5 from 'src/assests/imgRouteGuide/part5.png';
import part6 from 'src/assests/imgRouteGuide/part6.png';

type ListGuide = {
  image: any;
  detail: string;
  href: string;
  target: string;
};

export const listGuide: ListGuide[] = [
  {
    image: part1,
    detail:
      'BOMBCRYPTO Guideline – Creating Metamask Wallet to Play Bombcrypto (part 1/6)',
    target: '_blank',
    href: 'https://www.youtube.com/watch?v=ERJMp2AU2Ic',
  },
  {
    image: part2,
    detail: 'BOMBCRYPTO Guideline – How to Buy Heroes (part 2/6)',
    target: '_blank',
    href: 'https://www.youtube.com/watch?v=uDTNkNVlU70',
  },
  {
    image: part3,
    detail: 'BOMBCRYPTO Guideline – Treasure Hunt Mode (part 3/6)',
    target: '_blank',
    href: 'https://www.youtube.com/watch?v=2kuxC_qG5RM',
  },
  {
    image: part4,
    detail: `BOMBCRYPTO Guideline – Shield (part 4/6)
 `,
    target: '_blank',
    href: 'https://www.youtube.com/watch?v=SRr9EWg4oZE',
  },
  {
    image: part5,
    detail: `Bomb Crypto Guideline Part 5 - Fusion Heroes (part 5/6)`,
    target: '_blank',
    href: 'https://www.youtube.com/watch?v=_eRsdmXO93U',
  },
  {
    image: part6,
    detail: `Bomb Crypto Guideline Part 6 - Staking Hero (part 6/6)`,
    target: '_blank',
    href: 'https://www.youtube.com/watch?v=8WVfXLiTOOk',
  },
];
