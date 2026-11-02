import type { PaletteColor, ColorSystemOptions, PaletteColorChannel } from '@mui/material/styles';

import { varAlpha, createPaletteChannel } from 'minimal-shared/utils';

import { themeConfig } from '../theme-config';
import { darkGrey } from '../palettes/shared';

import type { ThemeColorScheme } from '../types';

// ----------------------------------------------------------------------

/**
 * TypeScript (type definition and extension)
 * @to {@link file://./../extend-theme-types.d.ts}
 */

// Keys for the palette colors
export type PaletteColorKey = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

// Palette color without additional channels
export type PaletteColorNoChannels = Omit<PaletteColor, 'lighterChannel' | 'darkerChannel'>;

// Palette color with additional channels
export type PaletteColorWithChannels = PaletteColor & PaletteColorChannel;

// Extended common colors
export type CommonColorsExtend = {
  whiteChannel: string;
  blackChannel: string;
};

// Extended text colors
export type TypeTextExtend = {
  disabledChannel: string;
};

// Extended background colors
export type TypeBackgroundExtend = {
  neutral: string;
  neutralChannel: string;
};

// Extended palette colors
export type PaletteColorExtend = {
  lighter: string;
  darker: string;
  lighterChannel: string;
  darkerChannel: string;
};

// Extended grey channels
export type GreyExtend = {
  '50Channel': string;
  '100Channel': string;
  '200Channel': string;
  '300Channel': string;
  '400Channel': string;
  '500Channel': string;
  '600Channel': string;
  '700Channel': string;
  '800Channel': string;
  '900Channel': string;
};

// ----------------------------------------------------------------------

// Primary color
export const primary = createPaletteChannel(themeConfig.palette.light.primary);

// Secondary color
export const secondary = createPaletteChannel(themeConfig.palette.light.secondary);

// Info color
export const info = createPaletteChannel(themeConfig.palette.light.info);

// Success color
export const success = createPaletteChannel(themeConfig.palette.light.success);

// Warning color
export const warning = createPaletteChannel(themeConfig.palette.light.warning);

// Error color
export const error = createPaletteChannel(themeConfig.palette.light.error);

// Common color
export const common = createPaletteChannel(themeConfig.palette.light.common);

// Grey color
export const grey = createPaletteChannel(themeConfig.palette.light.grey);

// Text color
export const text = {
  light: createPaletteChannel({
    primary: '#1A222B',
    secondary: '#66717E',
    disabled: '#8F9AA7',
  }),
  dark: createPaletteChannel({
    primary: '#F0F3F7',
    secondary: '#B4BEC9',
    disabled: '#66727F',
  }),
};

// Background color (kept in sync with the `light` / `dark` palette modules)
export const background = {
  light: createPaletteChannel(themeConfig.background.light),
  dark: createPaletteChannel(themeConfig.background.dark),
};

// Base action color
export const baseAction = {
  hover: varAlpha(grey['500Channel'], 0.08),
  selected: varAlpha(grey['500Channel'], 0.16),
  focus: varAlpha(grey['500Channel'], 0.24),
  disabled: varAlpha(grey['500Channel'], 0.8),
  disabledBackground: varAlpha(grey['500Channel'], 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

// Action color
export const action = {
  light: { ...baseAction, active: grey[600] },
  dark: { ...baseAction, active: '#B4BEC9' },
};

// ----------------------------------------------------------------------

// Base palette
export const basePalette = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  common,
  grey,
  divider: varAlpha(grey['500Channel'], 0.2),
};

const darkGreyPalette = createPaletteChannel(darkGrey);

export const palette: Partial<Record<ThemeColorScheme, ColorSystemOptions['palette']>> = {
  light: {
    ...basePalette,
    text: text.light,
    background: background.light,
    action: action.light,
  },
  dark: {
    primary: createPaletteChannel(themeConfig.palette.dark.primary),
    secondary: createPaletteChannel(themeConfig.palette.dark.secondary),
    info,
    success,
    warning,
    error,
    common,
    grey: darkGreyPalette,
    text: text.dark,
    background: background.dark,
    action: action.dark,
    divider: varAlpha(darkGreyPalette['500Channel'], 0.2),
  },
};
