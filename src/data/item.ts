import layer1 from 'src/assests/NFTItems/layer1.gif';
import layer2 from 'src/assests/NFTItems/layer2.gif';
import layer3 from 'src/assests/NFTItems/layer3.gif';
import layer4 from 'src/assests/NFTItems/layer4.gif';
import layer5 from 'src/assests/NFTItems/layer5.gif';
import layer6 from 'src/assests/NFTItems/layer6.gif';
import layer7 from 'src/assests/NFTItems/layer7.gif';
import layer8 from 'src/assests/NFTItems/layer8.gif';
import layer9 from 'src/assests/NFTItems/layer9.gif';
import newImage from 'src/assests/NFTItems/new.gif';
import pilot from 'src/assests/NFTItems/pilot.gif';
import monkey from 'src/assests/NFTItems/monkey.gif';
import meo from 'src/assests/NFTItems/meo.gif';
import shieldImg from 'src/assests/NFTItems/shield_lightning_big.png';

import rareNinja from 'src/assests/NFTItems/rare_ninja.gif';
import rareDoge from 'src/assests/NFTItems/rare_doge.gif';
import rarePepe from 'src/assests/NFTItems/rare_pepe.gif';
import rareFrog from 'src/assests/NFTItems/rare_frog.gif';
import rareKnight from 'src/assests/NFTItems/rare_knight.gif';
import rareCowboy from 'src/assests/NFTItems/rare_cowboy.gif';
import rareVamprite from 'src/assests/NFTItems/rare_vampire.gif';
import rareWitch from 'src/assests/NFTItems/rare_witch.gif';
import rareKing from 'src/assests/NFTItems/rare_king.gif';

import spRareNinja from 'src/assests/NFTItems/sprare_ninja.gif';
import spRareDoge from 'src/assests/NFTItems/sprare_doge.gif';
import spRarePepe from 'src/assests/NFTItems/sprare_pepe.gif';
import spRareFrog from 'src/assests/NFTItems/sprare_frog.gif';
import spRareKnight from 'src/assests/NFTItems/sprare_knight.gif';
import spRareCowboy from 'src/assests/NFTItems/sprare_cowboy.gif';
import spRareVamprite from 'src/assests/NFTItems/sprare_vampire.gif';
import spRareWitch from 'src/assests/NFTItems/sprare_witch.gif';
import spRareKing from 'src/assests/NFTItems/sprare_king.gif';

import epicNinja from 'src/assests/NFTItems/epic_ninja.gif';
import epicDoge from 'src/assests/NFTItems/epic_doge.gif';
import epicPepe from 'src/assests/NFTItems/epic_pepe.gif';
import epicFrog from 'src/assests/NFTItems/epic_frog.gif';
import epicKnight from 'src/assests/NFTItems/epic_knight.gif';
import epicCowboy from 'src/assests/NFTItems/epic_cowboy.gif';
import epicVampire from 'src/assests/NFTItems/epic_vampire.gif';
import epicWitch from 'src/assests/NFTItems/epic_witch.gif';
import epicKing from 'src/assests/NFTItems/epic_king.gif';

import lgNinja from 'src/assests/NFTItems/lg_ninja.gif';
import lgDoge from 'src/assests/NFTItems/lg_doge.gif';
import lgPepe from 'src/assests/NFTItems/lg_pepe.gif';
import lgFrog from 'src/assests/NFTItems/lg_frog.gif';
import lgKnight from 'src/assests/NFTItems/lg_knight.gif';
import lgCowboy from 'src/assests/NFTItems/lg_cowboy.gif';
import lgVampire from 'src/assests/NFTItems/lg_vampire.gif';
import lgWitch from 'src/assests/NFTItems/lg_witch.gif';
import lgKing from 'src/assests/NFTItems/lg_king.gif';

import splgNinja from 'src/assests/NFTItems/splg_ninja.gif';
import splgDoge from 'src/assests/NFTItems/splg_doge.gif';
import splgPepe from 'src/assests/NFTItems/splg_pepe.gif';
import splgFrog from 'src/assests/NFTItems/splg_frog.gif';
import splgKnight from 'src/assests/NFTItems/splg_knight.gif';
import splgCowboy from 'src/assests/NFTItems/splg_cowboy.gif';
import splgVampire from 'src/assests/NFTItems/splg_vampire.gif';
import splgWitch from 'src/assests/NFTItems/splg_witch.gif';
import splgKing from 'src/assests/NFTItems/splg_king.gif';

type ItemImage = {
  id: number;
  image: string; // nếu bạn dùng import từ .gif như module
  shield: string;
  new?: string;
};

export const item: ItemImage[] = [
  { image: pilot, id: 0, shield: shieldImg, new: newImage },
  { image: monkey, id: 1, shield: shieldImg, new: newImage },
  { image: meo, id: 2, shield: shieldImg, new: newImage },
  { image: layer1, id: 3, shield: shieldImg },
  { image: layer2, id: 4, shield: shieldImg },
  { image: layer3, id: 5, shield: shieldImg },
  { image: layer4, id: 6, shield: shieldImg },
  { image: layer5, id: 7, shield: shieldImg },
  { image: layer6, id: 8, shield: shieldImg },
  { image: layer7, id: 9, shield: shieldImg },
  { image: layer8, id: 10, shield: shieldImg },
  { image: layer9, id: 11, shield: shieldImg },
];

export const rareItem: ItemImage[] = [
  { image: rareNinja, id: 0, shield: shieldImg, new: newImage },
  { image: rareDoge, id: 1, shield: shieldImg, new: newImage },
  { image: rarePepe, id: 2, shield: shieldImg, new: newImage },
  { image: rareFrog, id: 3, shield: shieldImg, new: newImage },
  { image: rareKnight, id: 4, shield: shieldImg, new: newImage },
  { image: rareCowboy, id: 5, shield: shieldImg, new: newImage },
  { image: rareVamprite, id: 6, shield: shieldImg, new: newImage },
  { image: rareWitch, id: 7, shield: shieldImg, new: newImage },
  { image: rareKing, id: 8, shield: shieldImg, new: newImage },
];

export const spRareItem: ItemImage[] = [
  { image: spRareNinja, id: 0, shield: shieldImg, new: newImage },
  { image: spRareDoge, id: 1, shield: shieldImg, new: newImage },
  { image: spRarePepe, id: 2, shield: shieldImg, new: newImage },
  { image: spRareFrog, id: 3, shield: shieldImg, new: newImage },
  { image: spRareKnight, id: 4, shield: shieldImg, new: newImage },
  { image: spRareCowboy, id: 5, shield: shieldImg, new: newImage },
  { image: spRareVamprite, id: 6, shield: shieldImg, new: newImage },
  { image: spRareWitch, id: 7, shield: shieldImg, new: newImage },
  { image: spRareKing, id: 8, shield: shieldImg, new: newImage },
];

export const epicItem: ItemImage[] = [
  { image: epicNinja, id: 0, shield: shieldImg, new: newImage },
  { image: epicDoge, id: 1, shield: shieldImg, new: newImage },
  { image: epicPepe, id: 2, shield: shieldImg, new: newImage },
  { image: epicFrog, id: 3, shield: shieldImg, new: newImage },
  { image: epicKnight, id: 4, shield: shieldImg, new: newImage },
  { image: epicCowboy, id: 5, shield: shieldImg, new: newImage },
  { image: epicVampire, id: 6, shield: shieldImg, new: newImage },
  { image: epicWitch, id: 7, shield: shieldImg, new: newImage },
  { image: epicKing, id: 8, shield: shieldImg, new: newImage },
];

export const lgItem: ItemImage[] = [
  { image: lgNinja, id: 0, shield: shieldImg, new: newImage },
  { image: lgDoge, id: 1, shield: shieldImg, new: newImage },
  { image: lgPepe, id: 2, shield: shieldImg, new: newImage },
  { image: lgFrog, id: 3, shield: shieldImg, new: newImage },
  { image: lgKnight, id: 4, shield: shieldImg, new: newImage },
  { image: lgCowboy, id: 5, shield: shieldImg, new: newImage },
  { image: lgVampire, id: 6, shield: shieldImg, new: newImage },
  { image: lgWitch, id: 7, shield: shieldImg, new: newImage },
  { image: lgKing, id: 8, shield: shieldImg, new: newImage },
];

export const splgItem: ItemImage[] = [
  { image: splgNinja, id: 0, shield: shieldImg, new: newImage },
  { image: splgDoge, id: 1, shield: shieldImg, new: newImage },
  { image: splgPepe, id: 2, shield: shieldImg, new: newImage },
  { image: splgFrog, id: 3, shield: shieldImg, new: newImage },
  { image: splgKnight, id: 4, shield: shieldImg, new: newImage },
  { image: splgCowboy, id: 5, shield: shieldImg, new: newImage },
  { image: splgVampire, id: 6, shield: shieldImg, new: newImage },
  { image: splgWitch, id: 7, shield: shieldImg, new: newImage },
  { image: splgKing, id: 8, shield: shieldImg, new: newImage },
];
