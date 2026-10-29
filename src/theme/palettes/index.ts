import type { PaletteColor } from '@mui/material/styles';

// ----------------------------------------------------------------------

/** Palette color without additional channel keys */
export type PaletteColorNoChannels = Omit<PaletteColor, 'lighterChannel' | 'darkerChannel'>;

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

export type PaletteName = 'light' | 'dark' | 'ocean' | 'forest';

type PaletteEntry = {
  label: string;
  icon: string;
  colorScheme: 'light' | 'dark';
  mode: 'light' | 'dark';
  palette: PaletteColorSet;
};

// ----------------------------------------------------------------------

const grey = {
  '50': '#FCFDFD',
  '100': '#F9FAFB',
  '200': '#F4F6F8',
  '300': '#DFE3E8',
  '400': '#C4CDD5',
  '500': '#919EAB',
  '600': '#637381',
  '700': '#454F5B',
  '800': '#1C252E',
  '900': '#141A21',
} as const;

const darkGrey = {
  '50': '#141A21',
  '100': '#1C252E',
  '200': '#283241',
  '300': '#3A4556',
  '400': '#566476',
  '500': '#7B8A9E',
  '600': '#A0ADB9',
  '700': '#C1CBD3',
  '800': '#DFE3E8',
  '900': '#F4F6F8',
} as const;

const common = { black: '#000000', white: '#FFFFFF' };

const info = {
  lighter: '#CAFDF5',
  light: '#61F3F3',
  main: '#00B8D9',
  dark: '#006C9C',
  darker: '#003768',
  contrastText: '#FFFFFF',
};

const success = {
  lighter: '#D3FCD2',
  light: '#77ED8B',
  main: '#22C55E',
  dark: '#118D57',
  darker: '#065E49',
  contrastText: '#ffffff',
};

const warning = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: '#1C252E',
};

const error = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------

export const PALETTES: Record<PaletteName, PaletteEntry> = {
  light: {
    label: 'Light',
    icon: '☀️',
    colorScheme: 'light',
    mode: 'light',
    palette: {
      primary: {
        lighter: '#D0ECFE',
        light: '#73BAFB',
        main: '#1877F2',
        dark: '#0C44AE',
        darker: '#042174',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#EFD6FF',
        light: '#C684FF',
        main: '#8E33FF',
        dark: '#5119B7',
        darker: '#27097A',
        contrastText: '#FFFFFF',
      },
      info,
      success,
      warning,
      error,
      grey,
      common,
    },
  },
  dark: {
    label: 'Dark',
    icon: '🌙',
    colorScheme: 'dark',
    mode: 'dark',
    palette: {
      primary: {
        lighter: '#2B4A7A',
        light: '#3D6DB5',
        main: '#4E8FE6',
        dark: '#6EA8F0',
        darker: '#95C3F7',
        contrastText: '#0B1D33',
      },
      secondary: {
        lighter: '#3D1F6B',
        light: '#5A2E9E',
        main: '#7B42D1',
        dark: '#9B6BE0',
        darker: '#BC96EC',
        contrastText: '#F3E8FF',
      },
      info,
      success,
      warning: { ...warning, contrastText: '#1C252E' },
      error,
      grey: darkGrey,
      common,
    },
  },
  ocean: {
    label: 'Ocean',
    icon: '🌊',
    colorScheme: 'light',
    mode: 'light',
    palette: {
      primary: {
        lighter: '#C2F0F7',
        light: '#5FCFDD',
        main: '#0CA5B8',
        dark: '#067A8C',
        darker: '#034F5C',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#D4F0FE',
        light: '#72BBF5',
        main: '#1A8FE3',
        dark: '#0B65B0',
        darker: '#053D73',
        contrastText: '#FFFFFF',
      },
      info,
      success,
      warning,
      error,
      grey,
      common,
    },
  },
  forest: {
    label: 'Forest',
    icon: '🌲',
    colorScheme: 'light',
    mode: 'light',
    palette: {
      primary: {
        lighter: '#D5F5E3',
        light: '#82D9A5',
        main: '#2DAF6E',
        dark: '#1B7F4F',
        darker: '#0E5535',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#E8F5E9',
        light: '#A5D6A7',
        main: '#66BB6A',
        dark: '#388E3C',
        darker: '#1B5E20',
        contrastText: '#FFFFFF',
      },
      info,
      success: {
        lighter: '#C8E6C9',
        light: '#81C784',
        main: '#4CAF50',
        dark: '#388E3C',
        darker: '#1B5E20',
        contrastText: '#FFFFFF',
      },
      warning,
      error,
      grey,
      common,
    },
  },
};

/** Labels keyed by palette name */
export const PALETTE_LABELS: Record<PaletteName, string> = {
  light: PALETTES.light.label,
  dark: PALETTES.dark.label,
  ocean: PALETTES.ocean.label,
  forest: PALETTES.forest.label,
};
