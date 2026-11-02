import { grey, info, error, common, success, warning } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const ocean: PaletteEntry = {
  label: ' اقلیمی',
  icon: '🌊',
  mode: 'light',
  background: {
    paper: '#FFFFFF',
    default: '#F2F7F7',
    neutral: '#E5EEEF',
  },
  palette: {
    primary: {
      lighter: '#D6F0EF',
      light: '#6BBFBD',
      main: '#1B7F7C',
      dark: '#146663',
      darker: '#0D4745',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#E3EAF6',
      light: '#92A8CD',
      main: '#4C6EA2',
      dark: '#3A5279',
      darker: '#283A55',
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

export default ocean;
