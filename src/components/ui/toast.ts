import { arcadeColors } from 'src/theme/arcade';

/**
 * Toast imperativo no estilo arcade — substitui os alert() de feedback
 * (endereço copiado, informação indisponível etc.) sem exigir contexto React.
 */

let container: HTMLDivElement | null = null;

function ensureContainer(): HTMLDivElement {
  if (container && document.body.contains(container)) {
    return container;
  }
  container = document.createElement('div');
  container.style.cssText = [
    'position: fixed',
    'left: 50%',
    'bottom: 32px',
    'transform: translateX(-50%)',
    'display: flex',
    'flex-direction: column',
    'align-items: center',
    'gap: 10px',
    'z-index: 2000',
    'pointer-events: none',
  ].join(';');
  document.body.appendChild(container);
  return container;
}

export function arcadeToast(message: string): void {
  const parent = ensureContainer();

  const el = document.createElement('div');
  el.textContent = message;
  el.style.cssText = [
    "font-family: 'Retro', 'Bungee', cursive",
    'font-size: 14px',
    'letter-spacing: 1px',
    `color: ${arcadeColors.white}`,
    `background: ${arcadeColors.panel}`,
    `border: 3px solid ${arcadeColors.ink}`,
    'border-radius: 10px',
    `box-shadow: 4px 4px 0 ${arcadeColors.ink}`,
    `border-left: 8px solid ${arcadeColors.yellow}`,
    'padding: 12px 20px',
    'max-width: 86vw',
    'text-align: center',
    'opacity: 0',
    'transform: translateY(12px)',
    'transition: opacity 0.25s ease, transform 0.25s ease',
  ].join(';');

  parent.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });

  window.setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    window.setTimeout(() => el.remove(), 300);
  }, 2400);
}
