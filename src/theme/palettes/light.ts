import { grey, info, error, common, success, warning } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const light: PaletteEntry = {
  label: 'روشن',
  icon: '☀️',
  mode: 'light',
  background: {
    paper: '#FFFFFF',
    default: '#F4F6F9',
    neutral: '#E9EDF2',
  },
  palette: {
    primary: {
      lighter: '#E7E5FD',
      light: '#A49BF2',
      main: '#5B4FD1',
      dark: '#463CA8',
      darker: '#2F2873',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#E4EBF2',
      light: '#A9BACB',
      main: '#5C7089',
      dark: '#465768',
      darker: '#2F3C48',
      contrastText: '#FFFFFF',
    },
    info,
    success,
    warning,
    error,
    grey,
    common,
  },
};

export default light;
