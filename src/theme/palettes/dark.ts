import { info, error, common, success, warning, darkGrey } from './shared';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

const dark: PaletteEntry = {
  label: 'تیره',
  icon: '🌙',
  mode: 'dark',
  background: {
    paper: '#1B2129',
    default: '#12171C',
    neutral: '#232B34',
  },
  palette: {
    primary: {
      lighter: '#332C63',
      light: '#8A7EE8',
      main: '#B0A6FB',
      dark: '#CCC5FF',
      darker: '#E4E0FF',
      contrastText: '#1D1838',
    },
    secondary: {
      lighter: '#2B3947',
      light: '#93A8BB',
      main: '#BDCDDC',
      dark: '#D7E2EC',
      darker: '#EDF3F8',
      contrastText: '#16212B',
    },
    info,
    success,
    warning,
    error,
    grey: darkGrey,
    common,
  },
};

export default dark;
