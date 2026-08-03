import React, { useState } from 'react';
import { useTransition, animated, config } from 'react-spring';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import bg from 'src/assests/getting_started/bg.jpeg';
import logo from 'src/assests/imgHeader/icon.png';
import started from 'src/assests/getting_started/menu_getting_start.webp';
import menu_join from 'src/assests/getting_started/menu_join.webp';
import menu_tele from 'src/assests/getting_started/menu_tele.webp';
import back from 'src/assests/getting_started/back.webp';
import next from 'src/assests/getting_started/next.webp';
import right from 'src/assests/getting_started/right.webp';
import discord from 'src/assests/getting_started/discord.webp';
import telegram from 'src/assests/getting_started/telegram.webp';
import playNow from 'src/assests/imgHeader/playNow.png';
import arrow from 'src/assests/imgHeader/arrow.png';
import { logTrackClickEventAnalytics } from 'src/libs/logEvent';

import list from './data';
import { arcadeBorder, arcadeColors, arcadeFonts } from 'src/theme/arcade';
import SocialNetwork from 'src/pages/Home/SocialNetwork';
import ModalAdvertisement from '../../components/ModalComingSoon';

const GettingStart: React.FC = () => {
  const [isActive, setIsActive] = useState(0);
  const [isShow, SetShowModalComingSoon] = useState(false);
  const transition = useTransition(list[isActive], {
    from: { y: -100, opacity: 0, transform: 'rotateX(45deg)', x: -100 },
    enter: { y: 0, opacity: 1, transform: 'rotateX(0)', x: 0 },
    leave: { y: -100, opacity: 0, transform: 'rotateX(45deg)', x: -100 },
    config: config.slow,
  });

  const trackClickComunity = () => {
    logTrackClickEventAnalytics('community_click');
  };

  return (
    <section>
      <SocialNetwork id="social" show={true} />
      <Container>
        <Menu>
          <Link href="/">
            <img width={120} src={logo} alt="logo" />
          </Link>
          <div>
            <a href="">
              <img width={150} src={started} alt="" />
            </a>
            <a
              onClick={trackClickComunity}
              href="https://discord.gg/wG75cP9TRh"
              target="_blank"
              rel="noreferrer"
            >
              <img width={165} src={menu_join} alt="" />
            </a>
            <a
              onClick={trackClickComunity}
              href=" https://t.me/BombCryptoGroup"
              target="_blank"
              rel="noreferrer"
            >
              <img width={175} src={menu_tele} alt="" />
            </a>
            <a
              href="https://game.bombcrypto.io/"
              target="_blank"
              rel="noreferrer"
              className="position-relative"
              onClick={() => logTrackClickEventAnalytics('play_click')}
            >
              <img src={playNow} alt="playNow" width={100} />
              <ButtonPlayNow className="text-uppercase w-100 text-center fw-550">
                play now!
              </ButtonPlayNow>
              <ImgArrow src={arrow} width={25} alt="arrow" />
            </a>
            <ModalAdvertisement
              isShow={isShow}
              onShow={SetShowModalComingSoon}
            />
          </div>
        </Menu>

        <StyleSlide className="row">
          <TopText>
            <div className="left">
              <h4>Basic step</h4>
            </div>
            <div className="right">
              <h4>Advance step</h4>
            </div>
          </TopText>
          {list.map((item, key) => {
            return (
              <PointItem
                key={key}
                className="col-2 text-center fw-650 cursor-pointer mb-3"
                isend={key === list.length - 1}
              >
                <StyleImg
                  src={isActive === key ? item.active : item.number}
                  onClick={() => {
                    isActive !== key && setIsActive(key);
                  }}
                  w={2.5}
                />
                <p className="fs-14">{item.label}</p>
              </PointItem>
            );
          })}

          {transition((style, item) => {
            return (
              item.index - 1 === isActive && (
                <div>
                  <animated.div
                    className="text-center mb-3"
                    style={{
                      y: style.y,
                      opacity: style.opacity,
                    }}
                  >
                    <h3 className="fw-650 mb-0">{item.title}</h3>
                    <span>
                      {item.content || (
                        <span style={{ visibility: 'hidden' }}>
                          Lorem ipsum dolor sit amet.
                        </span>
                      )}
                    </span>
                  </animated.div>
                  <animated.div
                    style={{ transform: style.transform }}
                    className="row"
                  >
                    <div className="col-6 text-center">
                      <StyleImg
                        w={item.index === 1 ? 21 : 28}
                        src={item.left}
                        alt=""
                      />
                    </div>
                    <div className="col-6 text-center">
                      <StyleImg w={28} src={item.right} alt="" />
                    </div>
                  </animated.div>
                  <animated.div
                    style={{ x: style.x, opacity: style.opacity }}
                    className="text-end row"
                  >
                    <div className="col-6 text-center"></div>
                    <div className="col-6 text-center">
                      <span>Still need help? </span>
                      <a
                        className="fw-600 text-dark text-decoration-none"
                        href="https://www.youtube.com/watch?v=PwgCs2aH5TA&feature=youtu.be"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img src={right} alt="" /> Watch BombCrypto-made
                        tutorial
                      </a>
                    </div>
                  </animated.div>
                </div>
              )
            );
          })}

          <ButtonGroup>
            {isActive < 5 && isActive >= 0 ? (
              <React.Fragment>
                <StyleImg
                  onClick={() => setIsActive(isActive - 1)}
                  w={5}
                  src={back}
                  alt=""
                />
                <StyleImg
                  onClick={() => setIsActive(isActive + 1)}
                  w={5}
                  src={next}
                  alt=""
                />
              </React.Fragment>
            ) : (
              <div>
                <a
                  onClick={trackClickComunity}
                  href="https://discord.gg/wG75cP9TRh"
                  target="_blank"
                  className="d-block mb-3"
                  rel="noreferrer"
                >
                  <StyleImg w={15} src={discord} alt="" />
                </a>
                <a
                  onClick={trackClickComunity}
                  href=" https://t.me/BombCryptoGroup"
                  target="_blank"
                  className="d-block"
                  rel="noreferrer"
                >
                  <StyleImg w={15} src={telegram} alt="" />
                </a>
              </div>
            )}
          </ButtonGroup>
        </StyleSlide>
      </Container>
    </section>
  );
};

const StyleSlide = styled.div`
  margin: 0 auto;
  width: 80vw;
`;

const Container = styled.div`
  background: linear-gradient(
      180deg,
      rgba(14, 17, 48, 0.85) 0%,
      rgba(8, 10, 31, 0.9) 100%
    ),
    url(${bg});
  min-height: 100vh;
  color: ${arcadeColors.cloud};

  > * {
    font-family: ${arcadeFonts.body};
  }
`;

const Menu = styled.div`
  background: linear-gradient(
    180deg,
    ${arcadeColors.panel} 0%,
    ${arcadeColors.nightDeep} 100%
  );
  padding: 10px 24px;
  border-bottom: ${arcadeBorder.thick};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  div {
    a {
      margin-left: 24px;
    }
  }
`;

const ButtonGroup = styled.div`
  width: 20%;
  margin: 24px auto;
  display: flex;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    padding-left: 0px;
    img {
      margin: 0 5px;
    }
  }
`;

const PointItem = styled.div<{ isend?: boolean }>`
  position: relative;
  ${({ isend }) =>
    !isend &&
    css`
      &:after {
        position: absolute;
        content: '';
        left: 9.2vw;
        top: 1.5vw;
        width: 60%;
        height: 3px;
        background: ${arcadeColors.yellow};
      }
    `}
  @media screen and (max-width: 600px) {
    .fs-14 {
      font-size: 10px;
    }
  }
  @media screen and (max-width: 500px) {
    .fs-14 {
      font-size: 8px;
    }
  }
`;

const StyleImg = styled('img')<{ w?: number; h?: number }>`
  width: ${({ w }) => w}vw;
  height: ${({ h }) => (h ? 'auto' : `${h}vw`)};
`;

const TopText = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 6.8vw;
  margin-bottom: 24px;

  h4 {
    color: white;
  }

  > div {
    text-align: center;
    border-bottom: 3px solid white;
    position: relative;

    &:before {
      position: absolute;
      content: '';
      left: 0;
      top: 100%;
      height: 20px;
      width: 3px;
      background: white;
    }
    &:after {
      position: absolute;
      content: '';
      left: 100%;
      top: 100%;
      height: 20px;
      width: 3px;
      background: white;
    }
  }

  .left {
    width: 60%;
  }

  .right {
    width: 20%;
  }
  @media screen and (max-width: 600px) {
    h4 {
      font-size: 12px;
    }
  }
`;

const ImgArrow = styled.img`
  top: 12px;
  left: 35px;
  position: absolute;
`;

const ButtonPlayNow = styled.p`
  position: absolute;
  top: -8px;
  left: 0;
  font-size: 12px;
  color: black;
`;

export default GettingStart;
