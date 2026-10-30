import type { Theme } from '@mui/material/styles';

import { createPaletteChannel } from 'minimal-shared/utils';

import { createTheme as createMuiTheme } from '@mui/material/styles';

import { shadows } from './core/shadows';
import { palette } from './core/palette';
import { themeConfig } from './theme-config';
import { components } from './core/components';
import { typography } from './core/typography';
import { customShadows } from './core/custom-shadows';
import { PALETTES, type PaletteName } from './palettes';

import type { ThemeOptions } from './types';

// ----------------------------------------------------------------------

function createExtraPalette(
  name: Exclude<PaletteName, 'light' | 'dark'>
) {
  const { palette: colors, colorScheme, background } = PALETTES[name];

  return {
    ...(colorScheme === 'dark' ? palette.dark : palette.light),
    primary: createPaletteChannel(colors.primary),
    secondary: createPaletteChannel(colors.secondary),
    background: createPaletteChannel(background),
  };
}

// ----------------------------------------------------------------------

export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    dark: {
      palette: palette.dark,
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    },
    ocean: {
      palette: createExtraPalette('ocean'),
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    forest: {
      palette: createExtraPalette('forest'),
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    rose: {
      palette: createExtraPalette('rose'),
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    sunset: {
      palette: createExtraPalette('sunset'),
      shadows: shadows.light,
      customShadows: customShadows.light,
    },
    midnight: {
      palette: createExtraPalette('midnight'),
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    },
    aurora: {
      palette: createExtraPalette('aurora'),
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    },
    ember: {
      palette: createExtraPalette('ember'),
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    },
  },
  components,
  typography,
  shape: { borderRadius: 10 },
  cssVariables: themeConfig.cssVariables,
};

// ----------------------------------------------------------------------

type CreateThemeProps = {
  themeOverrides?: ThemeOptions;
};

export function createTheme({ themeOverrides = {} }: CreateThemeProps = {}): Theme {
  const theme = createMuiTheme(baseTheme, themeOverrides);

  return theme;
}
