import React, { useContext, useEffect, useRef } from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';
import styled, { keyframes } from 'styled-components';

import { arcadeColors } from 'src/theme/arcade';

/** Quanto tempo o banner fica na tela antes do carrossel seguir. */
const DURATION_MS = 8000;

/* A arte é estática; o movimento vem daqui. Um zoom bem lento dá a sensação
   de câmera se aproximando sem que nada saia de lugar. */
const kenBurns = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

/* O carrossel sobe tudo em `margin-top: -4%` (da largura) para esconder a
   tarja do player do YouTube. Nos vídeos isso não incomoda, mas aqui comeria
   o topo da arte. Como o slide tem 56.5vw de altura, esses 4% da largura
   equivalem a 7.1% da altura — a arte começa daí para baixo. */
const TOP_CROP = '7.1%';

/* Halo das gemas: respira fora de fase entre elas, como o brilho do jogo. */
const pulse = keyframes`
  0%, 100% { opacity: .25; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: .75; transform: translate(-50%, -50%) scale(1.18); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(.6); }
  50% { opacity: 1; transform: scale(1); }
`;

/* Mesmas medidas do slide de vídeo, para o carrossel não “pular” na troca. */
const Contain = styled.div`
  position: relative;
  display: inline-block;
  width: 100vw;
  height: 56.5vw;
  overflow: hidden;
  background: ${arcadeColors.nightDeep};
`;

const Art = styled.img`
  position: absolute;
  top: ${TOP_CROP};
  left: 0;
  width: 100%;
  height: calc(100% - ${TOP_CROP});
  object-fit: cover;
  animation: ${kenBurns} 24s ease-in-out infinite;
  user-select: none;
  -webkit-user-drag: none;
`;

/* Escurece as bordas de leve, ajudando o texto do centro a se destacar. */
const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 45%,
    transparent 52%,
    rgba(8, 10, 31, 0.45) 100%
  );
`;

const Glow = styled.div<{
  $x: number;
  $y: number;
  $color: string;
  $delay: number;
}>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  /* as posições são medidas sobre a arte, que começa abaixo do corte */
  top: calc(${TOP_CROP} + ${({ $y }) => $y}% * 0.929);
  width: 13%;
  aspect-ratio: 1;
  border-radius: 50%;
  pointer-events: none;
  mix-blend-mode: screen;
  background: radial-gradient(
    circle,
    ${({ $color }) => $color} 0%,
    transparent 62%
  );
  animation: ${pulse} 2.6s ease-in-out ${({ $delay }) => $delay}ms infinite;
`;

const Star = styled.div<{
  $x: number;
  $y: number;
  $size: number;
  $delay: number;
}>`
  position: absolute;
  left: ${({ $x }) => $x}%;
  top: calc(${TOP_CROP} + ${({ $y }) => $y}% * 0.929);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  pointer-events: none;
  background: ${arcadeColors.white};
  box-shadow: 0 0 6px ${arcadeColors.white};
  clip-path: polygon(
    50% 0,
    60% 40%,
    100% 50%,
    60% 60%,
    50% 100%,
    40% 60%,
    0 50%,
    40% 40%
  );
  animation: ${twinkle} 2.2s ease-in-out ${({ $delay }) => $delay}ms infinite;
`;

/* Posições das quatro gemas na arte, em % — medidas sobre a imagem 1920x1080. */
const GEMS = [
  { x: 28.1, y: 47.2, color: '#31E1F7', delay: 0 },
  { x: 42.6, y: 47.2, color: '#2E86FF', delay: 400 },
  { x: 56.9, y: 47.2, color: '#B57BFF', delay: 800 },
  { x: 71.4, y: 47.2, color: '#FF5C9E', delay: 1200 },
];

const STARS = [
  { x: 16, y: 14, size: 10, delay: 0 },
  { x: 24, y: 32, size: 7, delay: 700 },
  { x: 37, y: 9, size: 8, delay: 1400 },
  { x: 63, y: 12, size: 9, delay: 300 },
  { x: 78, y: 26, size: 7, delay: 1000 },
  { x: 87, y: 16, size: 11, delay: 1800 },
];

type Props = {
  src: string;
  itemId: string;
  alt?: string;
  onEnded: () => void;
  setVisible: () => void;
};

/**
 * Slide de imagem do carrossel do topo. A arte é um WebP estático e todo o
 * movimento é CSS por cima — assim o banner fica nítido em qualquer tela e
 * pesa uma fração do que pesaria um vídeo equivalente.
 */
export const BannerSlide: React.FC<Props> = ({
  src,
  itemId,
  alt = '',
  onEnded,
  setVisible,
}) => {
  const visibility = useContext(VisibilityContext);
  const isVisible = visibility.isItemVisible(itemId);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    setVisible();
    // o vídeo avança sozinho ao terminar; aqui o "fim" é um tempo de leitura
    timerRef.current = setTimeout(onEnded, DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isVisible]);

  return (
    <Contain tabIndex={0}>
      <Art src={src} alt={alt} draggable={false} />
      {GEMS.map((g, i) => (
        <Glow key={i} $x={g.x} $y={g.y} $color={g.color} $delay={g.delay} />
      ))}
      {STARS.map((s, i) => (
        <Star key={i} $x={s.x} $y={s.y} $size={s.size} $delay={s.delay} />
      ))}
      <Vignette />
    </Contain>
  );
};

export default BannerSlide;
