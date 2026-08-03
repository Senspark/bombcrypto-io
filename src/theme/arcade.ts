/**
 * Design tokens do visual "arcade" do site.
 *
 * A ideia é simples: cores vivas, bordas grossas pretas e sombras "duras"
 * (sem blur), como nos gabinetes de fliperama e nos sprites do jogo.
 * Tudo que for novo layout deve consumir estes tokens em vez de hardcodar cor.
 */

export const arcadeColors = {
  // fundos
  night: '#0E1130',
  nightDeep: '#080A1F',
  panel: '#1B2050',
  panelLight: '#2A3170',

  // cores de marca / destaque
  yellow: '#FFD23F',
  yellowDark: '#E5A700',
  red: '#FF4757',
  redDark: '#C1121F',
  blue: '#2E86FF',
  blueDark: '#1B4FB8',
  green: '#2CBB17',
  greenDark: '#1B7A0E',
  purple: '#7B2FF7',
  orange: '#FF8A00',
  cyan: '#31E1F7',

  // neutros
  ink: '#05060F',
  white: '#FFFFFF',
  cloud: '#E3E6E8',
  smoke: '#A9AEC9',
};

export const arcadeFonts = {
  /** Títulos e botões — fonte pixelada já embarcada no projeto. */
  display: "'Retro', 'Bungee', cursive",
  /** Reforço para números/labels curtos. */
  arcade: "'Bungee', 'Retro', cursive",
  /** Texto corrido — legível em blocos longos. */
  body: "'Roboto', 'Barlow Condensed', sans-serif",
};

/** Sombra "dura" característica do estilo. */
export const hardShadow = (size = 6, color: string = arcadeColors.ink) =>
  `${size}px ${size}px 0 ${color}`;

/** Contorno de texto em pixel art (sem depender de -webkit-text-stroke). */
export const pixelTextShadow = (color: string = arcadeColors.ink) =>
  `-2px -2px 0 ${color}, 2px -2px 0 ${color}, -2px 2px 0 ${color}, 2px 2px 0 ${color}`;

export const arcadeRadius = {
  sm: '6px',
  md: '12px',
  lg: '20px',
  pill: '999px',
};

export const arcadeBorder = {
  thin: `3px solid ${arcadeColors.ink}`,
  thick: `4px solid ${arcadeColors.ink}`,
  chunky: `6px solid ${arcadeColors.ink}`,
};

export const breakpoint = {
  xs: '(max-width: 575px)',
  sm: '(max-width: 767px)',
  md: '(max-width: 991px)',
  lg: '(max-width: 1199px)',
  xl: '(max-width: 1399px)',
};

const arcade = {
  colors: arcadeColors,
  fonts: arcadeFonts,
  radius: arcadeRadius,
  border: arcadeBorder,
  breakpoint,
  hardShadow,
  pixelTextShadow,
};

export default arcade;
