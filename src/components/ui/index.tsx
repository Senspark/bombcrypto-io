import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import {
  arcadeBorder,
  arcadeColors,
  arcadeFonts,
  arcadeRadius,
  breakpoint,
  hardShadow,
  pixelTextShadow,
} from 'src/theme/arcade';

type Tone = 'yellow' | 'red' | 'blue' | 'green' | 'purple' | 'dark';

const toneMap: Record<Tone, { base: string; shade: string; text: string }> = {
  yellow: {
    base: arcadeColors.yellow,
    shade: arcadeColors.yellowDark,
    text: arcadeColors.ink,
  },
  red: {
    base: arcadeColors.red,
    shade: arcadeColors.redDark,
    text: arcadeColors.white,
  },
  blue: {
    base: arcadeColors.blue,
    shade: arcadeColors.blueDark,
    text: arcadeColors.white,
  },
  green: {
    base: arcadeColors.green,
    shade: arcadeColors.greenDark,
    text: arcadeColors.white,
  },
  purple: {
    base: arcadeColors.purple,
    shade: '#4A1499',
    text: arcadeColors.white,
  },
  dark: {
    base: arcadeColors.panel,
    shade: arcadeColors.nightDeep,
    text: arcadeColors.white,
  },
};

/** Fundo padrão das páginas internas (abaixo do header fixo). */
export const PageBackground = styled.div`
  background: ${arcadeColors.night};
  color: ${arcadeColors.cloud};
  font-family: ${arcadeFonts.body};
  min-height: 100vh;
  overflow-x: hidden;
`;

/** Container centralizado com largura máxima, usado em todas as seções. */
export const ArcadeContainer = styled.div`
  width: 100%;
  /* mais estreito que 1240 para o conteúdo não passar sob a barra
     de redes sociais, que é fixa à direita em telas grandes */
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;

  @media ${breakpoint.sm} {
    padding: 0 16px;
  }
`;

/** Bloco de página com fundo escuro e espaçamento vertical consistente. */
export const ArcadeSection = styled.section<{ $bg?: string; $tight?: boolean }>`
  position: relative;
  background: ${({ $bg }) => $bg || arcadeColors.night};
  padding: ${({ $tight }) => ($tight ? '48px 0' : '88px 0')};
  color: ${arcadeColors.white};
  font-family: ${arcadeFonts.body};

  @media ${breakpoint.sm} {
    padding: ${({ $tight }) => ($tight ? '32px 0' : '56px 0')};
  }
`;

/** Balanço vertical suave — para personagens/moedas decorativas. */
export const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;

const brickScroll = keyframes`
  from { background-position-x: 0; }
  to { background-position-x: 34px; }
`;

/**
 * Faixa de "blocos" que separa seções, lembrando os tijolos do jogo.
 * Os tijolos deslizam devagar, como uma esteira.
 */
export const BrickDivider = styled.div<{ $color?: string }>`
  height: 14px;
  width: 100%;
  background-image: repeating-linear-gradient(
    90deg,
    ${({ $color }) => $color || arcadeColors.yellow} 0 28px,
    ${arcadeColors.ink} 28px 34px
  );
  border-top: ${arcadeBorder.thin};
  border-bottom: ${arcadeBorder.thin};
  animation: ${brickScroll} 2.5s linear infinite;
`;

export const SectionTitle = styled.h2<{ $tone?: Tone; $center?: boolean }>`
  font-family: ${arcadeFonts.display};
  font-size: 44px;
  line-height: 1.2;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ $tone }) => toneMap[$tone || 'yellow'].base};
  text-shadow: ${pixelTextShadow()}, ${hardShadow(4)};
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
  margin: 0 0 12px;

  @media ${breakpoint.md} {
    font-size: 34px;
  }
  @media ${breakpoint.sm} {
    font-size: 26px;
  }
`;

export const SectionSubtitle = styled.p<{ $center?: boolean }>`
  font-family: ${arcadeFonts.body};
  font-size: 18px;
  line-height: 1.6;
  color: ${arcadeColors.smoke};
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
  max-width: 720px;
  margin: ${({ $center }) => ($center ? '0 auto 40px' : '0 0 40px')};

  @media ${breakpoint.sm} {
    font-size: 15px;
    margin-bottom: 28px;
  }
`;

const pressable = css`
  cursor: pointer;
  transition: transform 0.08s ease, box-shadow 0.08s ease;

  &:hover {
    transform: translate(-2px, -2px);
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: ${hardShadow(0)};
  }
`;

export const ArcadeButton = styled.button<{ $tone?: Tone; $block?: boolean }>`
  ${pressable};
  display: ${({ $block }) => ($block ? 'flex' : 'inline-flex')};
  width: ${({ $block }) => ($block ? '100%' : 'auto')};
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: ${arcadeFonts.display};
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 14px 28px;
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.md};
  background: ${({ $tone }) => toneMap[$tone || 'yellow'].base};
  color: ${({ $tone }) => toneMap[$tone || 'yellow'].text};
  box-shadow: ${hardShadow(6)};
  text-decoration: none;

  &:hover {
    box-shadow: ${hardShadow(8)};
    background: ${({ $tone }) => toneMap[$tone || 'yellow'].base};
    color: ${({ $tone }) => toneMap[$tone || 'yellow'].text};
  }

  @media ${breakpoint.sm} {
    font-size: 16px;
    padding: 12px 20px;
  }
`;

/** Cartão base: borda grossa, sombra dura e topo colorido opcional. */
export const ArcadeCard = styled.div<{ $tone?: Tone; $interactive?: boolean }>`
  position: relative;
  background: ${arcadeColors.panel};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.lg};
  box-shadow: ${hardShadow(8)};
  padding: 24px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: ${({ $tone }) => toneMap[$tone || 'yellow'].base};
  }

  ${({ $interactive }) => $interactive && pressable};

  @media ${breakpoint.sm} {
    padding: 18px;
  }
`;

export const ArcadeBadge = styled.span<{ $tone?: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${arcadeFonts.display};
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 14px;
  border: ${arcadeBorder.thin};
  border-radius: ${arcadeRadius.pill};
  background: ${({ $tone }) => toneMap[$tone || 'red'].base};
  color: ${({ $tone }) => toneMap[$tone || 'red'].text};
  box-shadow: ${hardShadow(3)};
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

/** Texto piscando, no espírito do "PRESS START". */
export const BlinkText = styled.span`
  animation: ${blink} 1.2s steps(1, end) infinite;
`;

export const ArcadeGrid = styled.div<{ $min?: string; $gap?: string }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ $min }) => $min || '260px'}, 1fr)
  );
  gap: ${({ $gap }) => $gap || '24px'};
`;

const RevealBox = styled.div<{ $visible: boolean; $delay: number; $y: number }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible, $y }) => ($visible ? 0 : $y)}px);
  transition: opacity 0.6s ease ${({ $delay }) => $delay}ms,
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${({ $delay }) => $delay}ms;
  will-change: opacity, transform;
`;

type RevealProps = {
  children: React.ReactNode;
  /** Atraso em ms — use para escalonar cards vizinhos. */
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  y?: number;
  className?: string;
};

/**
 * Revela o conteúdo com fade + subida quando ele entra na viewport.
 * Anima uma única vez; sem IntersectionObserver, mostra direto.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 28,
  className,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <RevealBox
      ref={ref}
      $visible={visible}
      $delay={delay}
      $y={y}
      className={className}
    >
      {children}
    </RevealBox>
  );
};

const BackToTopButton = styled.button<{ $show: boolean }>`
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 990;
  width: 52px;
  height: 52px;
  font-family: ${arcadeFonts.display};
  font-size: 20px;
  line-height: 1;
  color: ${arcadeColors.ink};
  background: ${arcadeColors.yellow};
  border: ${arcadeBorder.thick};
  border-radius: ${arcadeRadius.md};
  box-shadow: ${hardShadow(5)};
  cursor: pointer;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? 'translateY(0)' : 'translateY(120px)')};
  pointer-events: ${({ $show }) => ($show ? 'auto' : 'none')};
  transition: transform 0.3s ease, opacity 0.3s ease;

  &:hover {
    transform: translate(-2px, -4px);
    box-shadow: ${hardShadow(7)};
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: ${hardShadow(0)};
  }

  /* no mobile o canto inferior direito já tem o toggle da barra social */
  @media ${breakpoint.sm} {
    right: auto;
    left: 16px;
    bottom: 16px;
    width: 46px;
    height: 46px;
  }
`;

/** Botão "voltar ao topo" que aparece depois de rolar a página. */
export const BackToTop: React.FC = () => {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      setShow(el.scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <BackToTopButton
      type="button"
      aria-label="Back to top"
      $show={show}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      ▲
    </BackToTopButton>
  );
};
