import { grey, info, error, common, success, warning } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const slate: PaletteEntry = {
  label: 'سنگی',  // Persian for "Slate"
  icon: '🪨',
  mode: 'light',
  background: {
    paper: '#FBFCFD',
    default: '#EDF1F4',
    neutral: '#DFE6EC',
  },
  palette: {
    primary: {
      lighter: '#DCE4EB',
      light: '#8E9EAC',
      main: '#40566A',
      dark: '#2C3E4D',
      darker: '#1B2833',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#E6EAEE',
      light: '#A8B4BF',
      main: '#65747F',
      dark: '#4B5964',
      darker: '#303B43',
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

export default slate;
