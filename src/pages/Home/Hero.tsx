import React from 'react';
import styled from 'styled-components';
import ReactPixel from 'react-snapchat-pixel';
import { useNavigate } from 'react-router-dom';
import buttonStart from 'src/assests/imgHeader/buttonStart.png';
import buttonWhitepaper from 'src/assests/imgHeader/buttonWhitepaper.png';
import buttonStartOther from 'src/assests/imgHeader/buttonStartOther.png';
import PcWeb from 'src/assests/imgHeader/PcWeb.png';
import PcIOS from 'src/assests/imgHeader/PcIOS.png';
import PcAndroid from 'src/assests/images/android_pc.png';
import SpWeb from 'src/assests/imgHeader/SpWeb.png';
import SpIOS from 'src/assests/imgHeader/SpIos.png';
import SpChPlay from 'src/assests/images/googlePlay.png';
import SpAndroid from 'src/assests/images/android_sp.png';
import buttonWhitepaperOther from 'src/assests/imgHeader/buttonWhitepaperOther.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';
import { isMobileDevice } from 'src/utils/helpers';
import pcImage from 'src/assests/images/home_banner_pc.jpg';
import spImage from 'src/assests/images/home_banner_sp.jpg';
import { logEvenAppsflyer } from '../../libs/appsflyer';

const Contain = styled.div`
  position: relative;
`;

const ButtonImgOther = styled.img`
  display: block;
  width: 60%;
  margin: 0 auto;
`;

const ContainImgPC = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
`;

const ImgPcOnly = styled.img`
  width: 10%;
  &:nth-child(2) {
    margin: 0 8px;
  }
  @media screen and (max-width: 600px) {
    width: 8%;
  }
`;

const ContainImgSp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 15px;
`;

const ImgSpOnly = styled.img`
  width: 20%;
  &:nth-child(2) {
    margin: 0 8px;
  }
`;

const Hero: React.FC<{ id: string }> = ({ id }) => {
  // const arrayImgPc = [PcWeb, PcIOS, PcAndroid];
  // const arrayImgSp = [SpWeb, SpIOS, SpAndroid];
  const isMobile = isMobileDevice();
  const navigate = useNavigate();

  const onClickGettingStarted = React.useCallback(() => {
    ReactPixel.snaptr('track', 'AD_CLICK');
    logTrackClickEventAnalytics('info_click');
    logEvenAppsflyer('button_click', 'getting_started');
    navigate('/getting-started');
  }, []);

  const onClickWhitePaper = React.useCallback(() => {
    ReactPixel.snaptr('track', 'AD_VIEW');
    logTrackClickEventAnalytics('whiterpaper_click');
    logEvenAppsflyer('button_click', 'whitepaper');
    window.open('https://whitepaper.bombcrypto.io');
  }, []);

  const onCDownloadAPK = React.useCallback(() => {
    ReactPixel.track('click_Android', {
      content_name: 'click_Android',
      content_category: 'click_Android',
      content_ids: [''],
      content_type: 'Campaign',
      value: 0,
      currency: 'VND',
    });
    logEvenAppsflyer('button_click', 'click_Android');
    logTrackClickEventAnalytics('play_click');
    window.open(`
      https://app.bombcrypto.io/android/com.senspark.bombcrypto-v65.apk
    `);
  }, []);

  return (
    <section id={id}>
      <Contain>
        {isMobile ? (
          <img
            className="img-fluid vw-100 d-none d-sm-block pt-5 pb-3"
            src={pcImage}
            alt="Home banner"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: `<video class='img-fluid vw-100 d-none d-sm-block pt-5 pb-3' autoplay loop muted playsinline>
                        <source src='/Fix-size.mp4' type='video/mp4' />
                        Your browser does not support the video tag.
                    </video>`,
            }}
          />
        )}

        {isMobile ? (
          <img
            className="img-fluid d-block d-sm-none pt-4"
            src={spImage}
            alt="Home banner mobile"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: `<video class="img-fluid d-block d-sm-none pt-4" autoplay loop muted playsinline>
                        <source src="/VideoTop.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>`,
            }}
          />
        )}
        <div className="position-absolute w-100 img-button text-center top-xl-50 d-none d-sm-block">
          <a href="#" onClick={onClickGettingStarted}>
            <img src={buttonStart} alt="buttonStart" className="button" />
          </a>
          <a
            target={'_blank'}
            href="#"
            rel="noreferrer"
            onClick={onClickWhitePaper}
          >
            <img src={buttonWhitepaper} alt="buttonStart" className="button" />
          </a>
          <ContainImgPC>
            {/*{arrayImgPc.map((v, i) => (*/}
            {/*  <ImgPcOnly key={i} src={v} alt="imgPC" />*/}
            {/*))}*/}
            <ImgPcOnly src={PcWeb} alt="imgPC" />
            <ImgPcOnly src={PcIOS} alt="imgPC" />
            <ImgPcOnly
              src={PcAndroid}
              alt="imgPC"
              className="cursor-pointer"
              onClick={onCDownloadAPK}
            />
            <ImgPcOnly
              src={SpChPlay}
              alt="imgPC"
              className="cursor-pointer ms-2"
              onClick={() => {
                logTrackClickEventAnalytics('play_click');
                window.open(
                  'https://play.google.com/store/apps/details?id=com.senspark.bomber.land.boom.battle.bombgames',
                );
              }}
            />
          </ContainImgPC>
        </div>
        <div className="position-absolute w-100 img-button-other text-center top-xl-50 d-block d-sm-none">
          <a href="#" onClick={onClickGettingStarted}>
            <ButtonImgOther
              src={buttonStartOther}
              alt="buttonStart"
              className="mb-3"
            />
          </a>
          <a
            target={'_blank'}
            href="#"
            rel="noreferrer"
            onClick={onClickWhitePaper}
          >
            <ButtonImgOther src={buttonWhitepaperOther} alt="buttonStart" />
          </a>
        </div>
        <ContainImgSp className="d-sm-none">
          {/*{arrayImgSp.map((v, i) => (*/}
          {/*  <ImgSpOnly key={i} src={v} alt="imgPC" />*/}
          {/*))}*/}
          <ImgSpOnly src={SpWeb} alt="imgPC" />
          <ImgSpOnly src={SpIOS} alt="imgPC" />
          <ImgSpOnly src={SpAndroid} alt="imgPC" onClick={onCDownloadAPK} />
          <ImgSpOnly
            src={SpChPlay}
            alt="imgPC"
            className="ms-2"
            onClick={() => {
              logTrackClickEventAnalytics('play_click');
              window.open(
                'https://play.google.com/store/apps/details?id=com.senspark.bomber.land.boom.battle.bombgames',
              );
            }}
          />
        </ContainImgSp>
        <BlurBg />
      </Contain>
    </section>
  );
};

const BlurBg = styled.div`
  position: absolute;
  bottom: -5px;
  width: 100%;
  height: 10px;
  box-shadow: 0px -16px 15px 10px #1697d9;
  @media screen and (max-width: 700px) {
    bottom: -12px;
  }
  @media screen and (max-width: 575px) {
    bottom: -22px;
  }
`;

export default Hero;
