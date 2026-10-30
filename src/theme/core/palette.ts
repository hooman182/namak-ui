import type { PaletteColor, ColorSystemOptions, PaletteColorChannel } from '@mui/material/styles';

import { varAlpha, createPaletteChannel } from 'minimal-shared/utils';

import { themeConfig } from '../theme-config';

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
    primary: '#302E3D',
    secondary: '#6E6A7D',
    disabled: '#9692A6',
  }),
  dark: createPaletteChannel({
    primary: '#F4F6F8',
    secondary: '#C4CDD5',
    disabled: '#919EAB',
  }),
};

// Background color
export const background = {
  light: createPaletteChannel({
    paper: '#FFFFFF',
    default: '#F7F8FC',
    neutral: '#EEF1F7',
  }),
  dark: createPaletteChannel({
    paper: '#20212B',
    default: '#181922',
    neutral: '#2A2B37',
  }),
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
  dark: { ...baseAction, active: '#C4CDD5' },
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

const darkGrey = createPaletteChannel({
  '50': '#191722',
  '100': '#211F2D',
  '200': '#302D3D',
  '300': '#454253',
  '400': '#646173',
  '500': '#898699',
  '600': '#AAA7B8',
  '700': '#C7C4D2',
  '800': '#E0DEE8',
  '900': '#F5F3FA',
});

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
    grey: darkGrey,
    text: text.dark,
    background: background.dark,
    action: action.dark,
    divider: varAlpha(darkGrey['500Channel'], 0.2),
  },
};
