import React from 'react';
import styled, { keyframes } from 'styled-components';

import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
  pixelTextShadow,
} from 'src/theme/arcade';

/* A bomba dá um pulinho, como um sprite parado esperando o "start". */
const bounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1, 1); }
  45%      { transform: translateY(-16px) scale(0.96, 1.04); }
  60%      { transform: translateY(0) scale(1.06, 0.94); }
`;

/* Faísca do pavio: pisca em degraus, sem transição suave (cara de pixel art). */
const spark = keyframes`
  0%, 100% { transform: scale(1);   background: ${arcadeColors.yellow}; }
  50%      { transform: scale(1.4); background: ${arcadeColors.orange}; }
`;

const blink = keyframes`
  0%, 49%   { opacity: 1; }
  50%, 100% { opacity: 0.15; }
`;

/* Barra indeterminada: um bloco corre de ponta a ponta, estilo "loading" de fliperama. */
const sweep = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
`;

const scanlines = keyframes`
  from { background-position-y: 0; }
  to   { background-position-y: 6px; }
`;

const Screen = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  background: radial-gradient(
    circle at 50% 35%,
    ${arcadeColors.panel} 0%,
    ${arcadeColors.night} 55%,
    ${arcadeColors.nightDeep} 100%
  );
  font-family: ${arcadeFonts.body};

  /* Linhas horizontais finas, imitando o tubo de um monitor CRT. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.22) 0 2px,
      transparent 2px 6px
    );
    animation: ${scanlines} 0.6s linear infinite;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-family: ${arcadeFonts.display};
  font-size: 40px;
  letter-spacing: 2px;
  color: ${arcadeColors.yellow};
  text-shadow: ${pixelTextShadow()};
  text-align: center;

  @media ${breakpoint.sm} {
    font-size: 26px;
  }
`;

const BombWrap = styled.div`
  position: relative;
  width: 96px;
  height: 112px;
  animation: ${bounce} 1.1s ease-in-out infinite;
`;

const Body = styled.div`
  position: absolute;
  bottom: 0;
  left: 8px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 32% 30%,
    ${arcadeColors.panelLight} 0 14%,
    ${arcadeColors.ink} 60%
  );
  border: ${arcadeBorder.thick};
  box-shadow: ${hardShadow(6, arcadeColors.redDark)};
`;

const Fuse = styled.div`
  position: absolute;
  top: 14px;
  left: 52px;
  width: 6px;
  height: 26px;
  background: ${arcadeColors.smoke};
  border: 2px solid ${arcadeColors.ink};
  transform: rotate(18deg);
`;

const Spark = styled.div`
  position: absolute;
  top: 4px;
  left: 58px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${arcadeColors.ink};
  animation: ${spark} 0.35s steps(2, end) infinite;
`;

const Bar = styled.div`
  position: relative;
  width: 280px;
  max-width: 70vw;
  height: 22px;
  overflow: hidden;
  background: ${arcadeColors.nightDeep};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.sm};
  box-shadow: ${hardShadow(4)};
`;

const BarFill = styled.div`
  position: absolute;
  inset: 3px auto 3px 0;
  width: 25%;
  background: repeating-linear-gradient(
    90deg,
    ${arcadeColors.yellow} 0 8px,
    ${arcadeColors.orange} 8px 14px
  );
  animation: ${sweep} 1.2s linear infinite;
`;

const Label = styled.p`
  margin: 0;
  font-family: ${arcadeFonts.arcade};
  font-size: 14px;
  letter-spacing: 4px;
  color: ${arcadeColors.cyan};
  text-shadow: ${hardShadow(2)};
  animation: ${blink} 1s steps(1, end) infinite;
`;

interface ArcadeLoaderProps {
  /** Texto sob a barra — o padrão serve para troca de página. */
  label?: string;
}

/** Tela de carregamento no visual arcade, usada no fallback do Suspense. */
const ArcadeLoader: React.FC<ArcadeLoaderProps> = ({
  label = 'LOADING...',
}) => (
  <Screen role="status" aria-live="polite" aria-label="Loading">
    <Logo>BOMBCRYPTO</Logo>
    <BombWrap>
      <Body />
      <Fuse />
      <Spark />
    </BombWrap>
    <Bar>
      <BarFill />
    </Bar>
    <Label>{label}</Label>
  </Screen>
);

export default ArcadeLoader;
