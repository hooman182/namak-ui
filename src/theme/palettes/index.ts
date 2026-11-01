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

export type PaletteName =
  | 'light'
  | 'dark'
  | 'ocean'
  | 'forest'
  | 'rose'
  | 'sunset'
  | 'midnight'
  | 'aurora'
  | 'ember'
  | 'slate'
  | 'plum'
  | 'blue'
  | 'mist';

type PaletteEntry = {
  label: string;
  icon: string;
  colorScheme: 'light' | 'dark';
  mode: 'light' | 'dark';
  background: {
    paper: string;
    default: string;
    neutral: string;
  };
  palette: PaletteColorSet;
};

// ----------------------------------------------------------------------

const grey = {
  '50': '#FEFDFF',
  '100': '#F8F7FC',
  '200': '#F0EFF7',
  '300': '#E2E0EC',
  '400': '#C8C5D5',
  '500': '#9692A6',
  '600': '#6E6A7D',
  '700': '#504D60',
  '800': '#302E3D',
  '900': '#1D1B29',
} as const;

const darkGrey = {
  '50': '#191722',
  '100': '#211F2D',
  '200': '#302D3D',
  '300': '#454253',
  '400': '#646173',
  '500': '#898699',
  '600': '#AAA7B8',
  '700': '#C7C4D2',
  '800': '#E0DEE8',
  '900': '#F5F3FA',
} as const;

const common = { black: '#000000', white: '#FFFFFF' };

const info = {
  lighter: '#D5F3F8',
  light: '#7CC9D8',
  main: '#278CA2',
  dark: '#176A7D',
  darker: '#104654',
  contrastText: '#FFFFFF',
};

const success = {
  lighter: '#DDF5E8',
  light: '#83D2A6',
  main: '#27966F',
  dark: '#187151',
  darker: '#104C39',
  contrastText: '#FFFFFF',
};

const warning = {
  lighter: '#FFF0D5',
  light: '#F2BE67',
  main: '#D99127',
  dark: '#A66816',
  darker: '#75480F',
  contrastText: '#30200C',
};

const error = {
  lighter: '#FBE2E4',
  light: '#EA9299',
  main: '#D65C68',
  dark: '#A23A47',
  darker: '#702630',
  contrastText: '#FFFFFF',
};

// ----------------------------------------------------------------------

export const PALETTES: Record<PaletteName, PaletteEntry> = {
  light: {
    label: 'Light',
    icon: '☀️',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#FFFFFF',
      default: '#F7F8FC',
      neutral: '#EEF1F7',
    },
    palette: {
      primary: {
        lighter: '#E8E4FF',
        light: '#A69BFA',
        main: '#6558D3',
        dark: '#4C40AD',
        darker: '#352D7D',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#FCE6E0',
        light: '#F1A08E',
        main: '#D97764',
        dark: '#AD594B',
        darker: '#783D35',
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
    background: {
      paper: '#20212B',
      default: '#181922',
      neutral: '#2A2B37',
    },
    palette: {
      primary: {
        lighter: '#403A68',
        light: '#8174DE',
        main: '#A69BFA',
        dark: '#C3BBFF',
        darker: '#DDD8FF',
        contrastText: '#201C3A',
      },
      secondary: {
        lighter: '#603A3A',
        light: '#C8796A',
        main: '#F1A08E',
        dark: '#FFBDAF',
        darker: '#FFD7CE',
        contrastText: '#351D1B',
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
    background: {
      paper: '#FFFFFF',
      default: '#F4F9FA',
      neutral: '#EAF3F5',
    },
    palette: {
      primary: {
        lighter: '#D2F2F1',
        light: '#64C4C1',
        main: '#168C8A',
        dark: '#106C6B',
        darker: '#0A4D4C',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#E3EAFE',
        light: '#91A9E8',
        main: '#637BC4',
        dark: '#485E9E',
        darker: '#344574',
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
    background: {
      paper: '#FFFFFF',
      default: '#F6F8F4',
      neutral: '#EEF2E9',
    },
    palette: {
      primary: {
        lighter: '#DDF3E5',
        light: '#87C69B',
        main: '#438C5D',
        dark: '#2F6F46',
        darker: '#205034',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#E9F0D8',
        light: '#B4C982',
        main: '#849D52',
        dark: '#64793D',
        darker: '#46572B',
        contrastText: '#FFFFFF',
      },
      info,
      success: {
        lighter: '#DDF5E8',
        light: '#83D2A6',
        main: '#27966F',
        dark: '#187151',
        darker: '#104C39',
        contrastText: '#FFFFFF',
      },
      warning,
      error,
      grey,
      common,
    },
  },
  rose: {
    label: 'Rose',
    icon: '🌸',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#FFFFFF',
      default: '#FAF6F8',
      neutral: '#F4ECF1',
    },
    palette: {
      primary: {
        lighter: '#FCE4EF',
        light: '#E895B8',
        main: '#C74F83',
        dark: '#9E3565',
        darker: '#702447',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#F0E5F8',
        light: '#B995D1',
        main: '#8957AA',
        dark: '#684080',
        darker: '#482B59',
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
  sunset: {
    label: 'Sunset',
    icon: '🌅',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#FFFFFF',
      default: '#FBF7F1',
      neutral: '#F5EEE2',
    },
    palette: {
      primary: {
        lighter: '#FCE8D7',
        light: '#E9A06B',
        main: '#C86A35',
        dark: '#9E4D27',
        darker: '#71361D',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#FAEDCF',
        light: '#D9B55E',
        main: '#A9852B',
        dark: '#80631E',
        darker: '#594516',
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
  midnight: {
    label: 'نیمه‌شب',
    icon: '🌌',
    colorScheme: 'dark',
    mode: 'dark',
    background: {
      paper: '#1E1D2A',
      default: '#171622',
      neutral: '#292738',
    },
    palette: {
      primary: {
        lighter: '#38315F',
        light: '#8274E6',
        main: '#A99BFF',
        dark: '#C4BAFF',
        darker: '#DED8FF',
        contrastText: '#211B3D',
      },
      secondary: {
        lighter: '#16464A',
        light: '#4EBFC2',
        main: '#77D8D6',
        dark: '#A4E9E3',
        darker: '#D0F5F0',
        contrastText: '#123436',
      },
      info,
      success,
      warning,
      error,
      grey: darkGrey,
      common,
    },
  },
  aurora: {
    label: 'شفق قطبی',
    icon: '✨',
    colorScheme: 'dark',
    mode: 'dark',
    background: {
      paper: '#1C2421',
      default: '#151C19',
      neutral: '#27302B',
    },
    palette: {
      primary: {
        lighter: '#174B43',
        light: '#55CDAA',
        main: '#75E2BD',
        dark: '#A1F0D2',
        darker: '#CFF8E7',
        contrastText: '#12352E',
      },
      secondary: {
        lighter: '#4A4A25',
        light: '#C4C86A',
        main: '#DFE486',
        dark: '#EAF0AD',
        darker: '#F4F7D2',
        contrastText: '#353619',
      },
      info,
      success,
      warning,
      error,
      grey: darkGrey,
      common,
    },
  },
  ember: {
    label: 'اخگر',
    icon: '🔥',
    colorScheme: 'dark',
    mode: 'dark',
    background: {
      paper: '#25201F',
      default: '#1B1716',
      neutral: '#302522',
    },
    palette: {
      primary: {
        lighter: '#60352E',
        light: '#E88768',
        main: '#F5A17E',
        dark: '#FFBDA3',
        darker: '#FFD8C9',
        contrastText: '#44251F',
      },
      secondary: {
        lighter: '#59431F',
        light: '#D9B35E',
        main: '#F0CB70',
        dark: '#F7DB98',
        darker: '#FBEBC2',
        contrastText: '#3D3018',
      },
      info,
      success,
      warning,
      error,
      grey: darkGrey,
      common,
    },
  },
  slate: {
    label: 'Slate',
    icon: '🪨',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#F6F9FA',
      default: '#CCDCDF',
      neutral: '#9BA8AB',
    },
    palette: {
      primary: {
        lighter: '#CCDCDF',
        light: '#9BA8AB',
        main: '#4A5C6A',
        dark: '#253745',
        darker: '#11212D',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#9BA8AB',
        light: '#4A5C6A',
        main: '#253745',
        dark: '#11212D',
        darker: '#06141B',
        contrastText: '#FFFFFF',
      },
      info,
      success,
      warning,
      error,
      grey: {
        '50': '#F6F9FA',
        '100': '#E8EEF0',
        '200': '#CCDCDF',
        '300': '#9BA8AB',
        '400': '#84939C',
        '500': '#6C7E88',
        '600': '#4A5C6A',
        '700': '#253745',
        '800': '#11212D',
        '900': '#06141B',
      },
      common,
    },
  },
  plum: {
    label: 'Plum',
    icon: '🍇',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#FFF9F7',
      default: '#FBE4D8',
      neutral: '#DFB6B2',
    },
    palette: {
      primary: {
        lighter: '#FBE4D8',
        light: '#DFB6B2',
        main: '#854F6C',
        dark: '#522B5B',
        darker: '#2B124C',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#DFB6B2',
        light: '#854F6C',
        main: '#522B5B',
        dark: '#2B124C',
        darker: '#190019',
        contrastText: '#FFFFFF',
      },
      info,
      success,
      warning,
      error,
      grey: {
        '50': '#FFF9F7',
        '100': '#FBE4D8',
        '200': '#DFB6B2',
        '300': '#B8818A',
        '400': '#985D72',
        '500': '#854F6C',
        '600': '#6B3D61',
        '700': '#522B5B',
        '800': '#2B124C',
        '900': '#190019',
      },
      common,
    },
  },
  blue: {
    label: 'Blue',
    icon: '🩵',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#F5FAFF',
      default: '#C1E8FF',
      neutral: '#7DA0CA',
    },
    palette: {
      primary: {
        lighter: '#C1E8FF',
        light: '#7DA0CA',
        main: '#052659',
        dark: '#021024',
        darker: '#021024',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#C1E8FF',
        light: '#7DA0CA',
        main: '#5483B3',
        dark: '#052659',
        darker: '#021024',
        contrastText: '#FFFFFF',
      },
      info,
      success,
      warning,
      error,
      grey: {
        '50': '#F5FAFF',
        '100': '#E5F3FF',
        '200': '#C1E8FF',
        '300': '#A8CFEA',
        '400': '#7DA0CA',
        '500': '#648EBB',
        '600': '#5483B3',
        '700': '#2E6097',
        '800': '#052659',
        '900': '#021024',
      },
      common,
    },
  },
  mist: {
    label: 'Mist',
    icon: '🌫️',
    colorScheme: 'light',
    mode: 'light',
    background: {
      paper: '#FFFFFF',
      default: '#F1F7F7',
      neutral: '#D5E5E5',
    },
    palette: {
      primary: {
        lighter: '#F7CBCA',
        light: '#B0D7D8',
        main: '#5D6B6B',
        dark: '#4A5555',
        darker: '#4A5555',
        contrastText: '#FFFFFF',
      },
      secondary: {
        lighter: '#F7CBCA',
        light: '#DDD3D3',
        main: '#B0D7D8',
        dark: '#5D6B6B',
        darker: '#4A5555',
        contrastText: '#253333',
      },
      info,
      success,
      warning,
      error,
      grey: {
        '50': '#FCF7F7',
        '100': '#F7CBCA',
        '200': '#F1F7F7',
        '300': '#DDD3D3',
        '400': '#D5E5E5',
        '500': '#C5DEDF',
        '600': '#B0D7D8',
        '700': '#91B9BA',
        '800': '#5D6B6B',
        '900': '#4A5555',
      },
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
  rose: PALETTES.rose.label,
  sunset: PALETTES.sunset.label,
  midnight: PALETTES.midnight.label,
  aurora: PALETTES.aurora.label,
  ember: PALETTES.ember.label,
  slate: PALETTES.slate.label,
  plum: PALETTES.plum.label,
  blue: PALETTES.blue.label,
  mist: PALETTES.mist.label,
};
