import { spriteStyle } from './atlas';

/**
 * Solta um punhado de moedas do jogo (BCOIN e SEN) de dentro de um elemento,
 * que pulam e caem. Usado no "Play Now" do menu. O elemento precisa de
 * `position: relative`; quem prefere menos movimento não vê nada.
 */
export function coinBurst(el: HTMLElement, count = 7) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  // navegador sem Web Animations API (Safari antigo): sem moedas
  if (typeof el.animate !== 'function') return;
  for (let i = 0; i < count; i++) {
    const coin = document.createElement('span');
    Object.assign(coin.style, spriteStyle(i % 3 ? 'bcoin' : 'sen', 22), {
      position: 'absolute',
      left: '50%',
      top: '50%',
      pointerEvents: 'none',
      zIndex: '2',
    });
    el.appendChild(coin);
    const ang = ((-150 + Math.random() * 120) * Math.PI) / 180;
    const d = 50 + Math.random() * 40;
    const dx = Math.cos(ang) * d;
    const dy = Math.sin(ang) * d;
    const spin = Math.random() * 120 - 60;
    const anim = coin.animate(
      [
        { transform: 'translate(-50%, -50%) scale(.4)', opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${spin}deg)`,
          opacity: 1,
          offset: 0.6,
        },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${
            dy + 30
          }px)) scale(.8)`,
          opacity: 0,
        },
      ],
      {
        duration: 750 + Math.random() * 250,
        easing: 'cubic-bezier(.2,.8,.3,1)',
      },
    );
    anim.onfinish = () => coin.remove();
  }
}
