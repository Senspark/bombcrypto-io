import React, { useEffect, useRef, useState } from 'react';

// import Hero from './Hero';
//import PlayToEarn from './PlayToEarn';
import BcoinToken from './BcoinToken';
//import Information from './Infomation';
// import Navbar from './Navbar';
import NFTItem from './NFTItem';
import Footer from './Footer';
//import TokenMetric from './TokenMetric';
// import BuildHouse from './Build';
//import BattleMode from './BattleMode';
// import CoreTeam from './CoreTeam';
//import RoadMap from './RoadMap';
// import AboutSenspark from './AboutSenspark';
//import Partners from './Partners';
import SocialNetwork from './SocialNetwork';
import Notification from './Notification';
// import Popup from 'src/components/Popup';
// import ModalAdvertisement from 'src/components/Modal';
import UpdateHero from './UpdateHero';
import PlayableMap from './PlayableMap';
import Community from './Community';
import TreasureHero from './TreasureHero';
import Announcements from './Announcements';
import HeroShowcase from './HeroShowcase';
import TokenCards from './TokenCards';
import HouseShowcase from './HouseShowcase';
import Header from 'src/templates/worldcup/Header';
import ContentHeader from '../../templates/worldcup/ContentHeader';
import { NETWORK, NetworkType, networkOptions } from 'src/Contants/Contants';
import { BackToTop, BrickDivider } from 'src/components/ui';
import { arcadeColors } from 'src/theme/arcade';
// import Advisor from './Advisor';

/**
 * Home nova (out/2026): topo com o mapa do jogo, anúncios em cards, vitrine de
 * heróis e tokens com preço ao vivo. `false` volta para a home anterior
 * (carrossel no topo, mapa jogável, anúncios em abas e tokens antigos).
 */
const HOME_V2 = true;

const Main: React.FC = () => {
  const headerRef = useRef(null);
  const [isHeaderVisible, setHeaderVisible] = useState(true); // phần được show có phải video không
  const [showInHeader, setShowInHeader] = useState(false); // thanh platform có đang được show hay không
  const [networkSelected, setNetwork] = useState(NETWORK.BINANCE);
  const [showMenuSp, setShowMenuSp] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true); // Header đang được hiển thị
        } else {
          setHeaderVisible(false); // Header đang bị scroll qua
        }
      });
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);
  const changeNetwork = (network: NetworkType) => {
    if (networkOptions.includes(network)) {
      setNetwork(network);
    }
  };

  return (
    <div className="main" style={{ overflowX: 'hidden' }}>
      {/*<Navbar id="navbar" />*/}
      <Header
        id="header"
        content={
          <ContentHeader ChangeNetWork={changeNetwork} showSp={setShowMenuSp} />
        }
        show={!isHeaderVisible || showMenuSp}
      />
      <SocialNetwork id="social" show={showInHeader} />
      {/*<Popup />*/}
      {HOME_V2 ? (
        <>
          <div ref={headerRef}>
            <TreasureHero id="top" />
          </div>
          <Announcements id="notification" />
          <BrickDivider />
          <UpdateHero
            id="hero"
            show={!isHeaderVisible}
            setShowInVideo={setShowInHeader}
          />
          <BrickDivider $color={arcadeColors.cyan} />
          <HeroShowcase id="heroes" />
          <BrickDivider $color={arcadeColors.red} />
          <TokenCards id="bcoin_token" networkSelected={networkSelected} />
          <BrickDivider $color={arcadeColors.green} />
          <NFTItem id="item" network={networkSelected} hideHouses />
          <BrickDivider $color={arcadeColors.yellow} />
          <HouseShowcase id="houses" network={networkSelected} />
        </>
      ) : (
        <>
          <div ref={headerRef}>
            <UpdateHero
              id="hero"
              show={!isHeaderVisible}
              setShowInVideo={setShowInHeader}
            />
          </div>
          {/*<Hero id="hero" />*/}
          <BrickDivider />
          <PlayableMap id="play" />
          <BrickDivider $color={arcadeColors.cyan} />
          <div>
            <Notification id="notification" />
          </div>
          {/*<PlayToEarn id="play_to_earn" />*/}
          <BrickDivider $color={arcadeColors.red} />
          <div>
            <BcoinToken id="bcoin_token" networkSelected={networkSelected} />
          </div>
          {/*<Information id="information" />*/}
          <BrickDivider $color={arcadeColors.green} />
          <div>
            <NFTItem id="item" network={networkSelected} />
          </div>
        </>
      )}
      {/*<BuildHouse id="build" />*/}
      {/*<BattleMode id="battle" />*/}
      {/*<RoadMap id="road" />*/}
      {/*<TokenMetric id="token_metric" />*/}
      {/* <CoreTeam id="core_team" /> */}
      {/*<Advisor id="advisor" />*/}
      {/*<AboutSenspark id="about_senspark" />*/}
      {/*<Partners id="partner" />*/}
      <BrickDivider $color={arcadeColors.purple} />
      <Community id="community" />
      <div>
        <Footer id="footer" />
      </div>
      <BackToTop />
      {/*<ModalAdvertisement />*/}
    </div>
  );
};

export default Main;
