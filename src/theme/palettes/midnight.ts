import { info, error, common, success, warning, darkGrey } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const midnight: PaletteEntry = {
  label: ' نیمه‌شب',
  icon: '🌌',
  mode: 'dark',
  background: {
    paper: '#182029',
    default: '#0F151B',
    neutral: '#1F2A34',
  },
  palette: {
    primary: {
      lighter: '#1F3D48',
      light: '#5FA6B9',
      main: '#8AC9DA',
      dark: '#B2E0EC',
      darker: '#D7F1F7',
      contrastText: '#0D242C',
    },
    secondary: {
      lighter: '#233247',
      light: '#7C9BC4',
      main: '#A9C2E1',
      dark: '#CBD8EA',
      darker: '#E7EDF6',
      contrastText: '#101A28',
    },
    info,
    success,
    warning,
    error,
    grey: darkGrey,
    common,
  },
};

export default midnight;
