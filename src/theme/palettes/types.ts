import type { PaletteColor } from '@mui/material/styles';

// ----------------------------------------------------------------------

/** Palette color without the additional channel keys generated at theme runtime */
export type PaletteColorNoChannels = Omit<PaletteColor, 'lighterChannel' | 'darkerChannel'>;

/** Color scheme mode a palette is built on */
export type PaletteMode = 'light' | 'dark';

/** Full set of color tokens required by a palette */
export type PaletteColorSet = Record<
  'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
  PaletteColorNoChannels
> & {
  common: { black: string; white: string };
  grey: Record<
    '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    string
  >;
};

export type PaletteEntry = {
  label: string;
  icon: string;
  mode: PaletteMode;
  background: {
    paper: string;
    default: string;
    neutral: string;
  };
  palette: PaletteColorSet;
};
