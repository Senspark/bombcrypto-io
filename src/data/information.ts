import battle from 'src/assests/images/battle.png';
import heroes from 'src/assests/images/heroes.png';
import adventure from 'src/assests/images/adventure.png';

type Data = {
  image: any;
  title: string;
  content: string;
};

export const data: Data[] = [
  {
    image: adventure,
    title: 'Adventure',
    content:
      'Players choose a bomber hero of their own to participate in each level, at each level the player needs to destroy all the monsters to pass the level.',
  },
  {
    image: battle,
    title: 'Arena Battle',
    content:
      'Players choose a hero to join a bomb battle with many other players. Users have to pay a certain amount of tokens to participate in battle mode, the final winner will receive the entire loser’s token amount. Bomber Hero will also lose a certain amount of energy when participating in battle mode.',
  },
  {
    image: heroes,
    title: 'Manage Heroes',
    content:
      'Users can acquire new heroes via rescue missions. In some maps, there is a rare chance users meet a prison block which locked a bomber hero. After accomplishing the rescue mission, you will receive a damaged hero, which needs to be recovered a while before it can go wild again.',
  },
];
