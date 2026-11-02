import { grey, info, error, common, success, warning } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const blue: PaletteEntry = {
  label: ' آبی',
  icon: '🔷',
  mode: 'light',
  background: {
    paper: '#FFFFFF',
    default: '#F3F6FB',
    neutral: '#E7EDF6',
  },
  palette: {
    primary: {
      lighter: '#DCE8F9',
      light: '#8DB0DA',
      main: '#2C5C99',
      dark: '#204574',
      darker: '#142C4C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#E2EAF3',
      light: '#9FB3C7',
      main: '#5B7895',
      dark: '#445C74',
      darker: '#2D3E50',
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

export default blue;
