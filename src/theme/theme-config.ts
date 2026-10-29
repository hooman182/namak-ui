import { PALETTES, type PaletteName, type PaletteColorSet } from './palettes';

import type { ThemeCssVariables } from './types';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<PaletteName, PaletteColorSet>;
};

// ----------------------------------------------------------------------

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Vazirmatn Variable',
    secondary: 'Vazirmatn Variable',
  },
  /** **************************************
   * Palette (from registry)
   *************************************** */
  palette: {
    light: PALETTES.light.palette,
    dark: PALETTES.dark.palette,
    ocean: PALETTES.ocean.palette,
    forest: PALETTES.forest.palette,
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
