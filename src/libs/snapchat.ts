/**
 * Wrapper do react-snapchat-pixel.
 *
 * A lib acessa `window` já no import, o que quebra o pré-render das páginas.
 * Aqui ela é carregada sob demanda e só no navegador; no servidor as chamadas
 * viram no-op.
 */

type Pixel = {
  init: (id: string, user?: unknown, options?: unknown) => void;
  pageView: () => void;
  track: (event: string, data?: unknown) => void;
  snaptr: (...args: unknown[]) => void;
};

let pixel: Pixel | null = null;
let initialized = false;

const PIXEL_ID = '9c5b6f7c-8ac1-48f6-ab99-777da59b8199';

function getPixel(): Pixel | null {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!pixel) {
    // require em vez de import estático: só executa no navegador
    // eslint-disable-next-line
    pixel = require('react-snapchat-pixel').default as Pixel;
  }
  return pixel;
}

/** Inicializa o pixel e registra o page view (chamado uma vez, no _app). */
export function initSnapchatPixel(): void {
  const p = getPixel();
  if (!p || initialized) {
    return;
  }
  initialized = true;
  p.init(PIXEL_ID, { user_email: 'contact@senspark.com' }, { debug: false });
  p.pageView();
}

export function snapTrack(event: string, data?: unknown): void {
  getPixel()?.track(event, data);
}

export function snapEvent(...args: unknown[]): void {
  getPixel()?.snaptr(...args);
}
