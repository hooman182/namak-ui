import type { Theme } from '@mui/material/styles';

import { createPaletteChannel } from 'minimal-shared/utils';

import { createTheme as createMuiTheme } from '@mui/material/styles';

import { shadows } from './core/shadows';
import { palette } from './core/palette';
import { themeConfig } from './theme-config';
import { components } from './core/components';
import { typography } from './core/typography';
import { PALETTES, PALETTE_NAMES } from './palettes';
import { customShadows } from './core/custom-shadows';

import type { ThemeOptions } from './types';
import type { PaletteName, PaletteEntry } from './palettes';

// ----------------------------------------------------------------------

function createExtraPalette({ palette: colors, mode, background }: PaletteEntry) {
  return {
    ...(mode === 'dark' ? palette.dark : palette.light),
    // `mode` is required for MUI and for scheme-aware layout styling (e.g. the background gradient)
    mode,
    primary: createPaletteChannel(colors.primary),
    secondary: createPaletteChannel(colors.secondary),
    info: createPaletteChannel(colors.info),
    success: createPaletteChannel(colors.success),
    warning: createPaletteChannel(colors.warning),
    error: createPaletteChannel(colors.error),
    grey: createPaletteChannel(colors.grey),
    background: createPaletteChannel(background),
  };
}

/**
 * Color scheme options for a palette in the registry.
 * `light` and `dark` use the base palette; every other palette is generated from its entry.
 */
function createColorScheme(name: PaletteName) {
  if (name === 'light' || name === 'dark') {
    return {
      palette: palette[name],
      shadows: shadows[name],
      customShadows: customShadows[name],
    };
  }

  const entry = PALETTES[name];

  return {
    palette: createExtraPalette(entry),
    shadows: shadows[entry.mode],
    customShadows: customShadows[entry.mode],
  };
}

const colorSchemes = Object.fromEntries(
  PALETTE_NAMES.map((name) => [name, createColorScheme(name)])
) as ThemeOptions['colorSchemes'];

// ----------------------------------------------------------------------

export const baseTheme: ThemeOptions = {
  colorSchemes,
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
