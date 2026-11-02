import { PALETTES, PALETTE_NAMES } from './palettes';

import type { ThemeCssVariables } from './types';
import type { PaletteName, PaletteEntry, PaletteColorSet } from './palettes';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<PaletteName, PaletteColorSet>;
  background: Record<PaletteName, PaletteEntry['background']>;
};

// ----------------------------------------------------------------------

const palette = Object.fromEntries(
  PALETTE_NAMES.map((name) => [name, PALETTES[name].palette])
) as Record<PaletteName, PaletteColorSet>;

const background = Object.fromEntries(
  PALETTE_NAMES.map((name) => [name, PALETTES[name].background])
) as Record<PaletteName, PaletteEntry['background']>;

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
  palette,
  background,
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
