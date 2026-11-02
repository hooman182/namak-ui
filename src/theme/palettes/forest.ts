import { grey, info, error, common, success, warning } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const forest: PaletteEntry = {
  label: ' جنگلی',
  icon: '🌲',
  mode: 'light',
  background: {
    paper: '#FFFFFF',
    default: '#F4F7F3',
    neutral: '#E9EFE4',
  },
  palette: {
    primary: {
      lighter: '#DCF0E3',
      light: '#84BE97',
      main: '#3E7F55',
      dark: '#2D6240',
      darker: '#1E442C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#E7EDDC',
      light: '#A9BE86',
      main: '#718A50',
      dark: '#576A3D',
      darker: '#3C4A2A',
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

export default forest;
