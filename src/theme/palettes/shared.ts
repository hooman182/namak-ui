import type { PaletteColorNoChannels } from './types';

// ----------------------------------------------------------------------

/**
 * Neutral grey ramp shared by every light palette.
 */
export const grey = {
  '50': '#FAFBFC',
  '100': '#F4F6F8',
  '200': '#EDF0F4',
  '300': '#DEE4EA',
  '400': '#C4CDD6',
  '500': '#8F9AA7',
  '600': '#66717E',
  '700': '#4A5561',
  '800': '#303A45',
  '900': '#1A222B',
} as const;

/** Inverted grey ramp shared by every dark palette */
export const darkGrey = {
  '50': '#11151A',
  '100': '#171C22',
  '200': '#212830',
  '300': '#2C3540',
  '400': '#434E5A',
  '500': '#66727F',
  '600': '#8C98A6',
  '700': '#B4BEC9',
  '800': '#D6DCE3',
  '900': '#F0F3F7',
} as const;

export const common = { black: '#000000', white: '#FFFFFF' } as const;

export const info: PaletteColorNoChannels = {
  lighter: '#D5F3F8',
  light: '#7CC9D8',
  main: '#278CA2',
  dark: '#176A7D',
  darker: '#104654',
  contrastText: '#FFFFFF',
};

export const success: PaletteColorNoChannels = {
  lighter: '#DDF5E8',
  light: '#83D2A6',
  main: '#27966F',
  dark: '#187151',
  darker: '#104C39',
  contrastText: '#FFFFFF',
};

export const warning: PaletteColorNoChannels = {
  lighter: '#FFF0D5',
  light: '#F2BE67',
  main: '#D99127',
  dark: '#A66816',
  darker: '#75480F',
  contrastText: '#30200C',
};

export const error: PaletteColorNoChannels = {
  lighter: '#FBE2E4',
  light: '#EA9299',
  main: '#D65C68',
  dark: '#A23A47',
  darker: '#702630',
  contrastText: '#FFFFFF',
};
