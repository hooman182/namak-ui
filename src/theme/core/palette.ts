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
    primary: grey[800],
    secondary: grey[600],
    disabled: grey[500],
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
    default: grey[100],
    neutral: grey[200],
  }),
  dark: createPaletteChannel({
    paper: '#1C252E',
    default: '#141A21',
    neutral: '#283241',
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
  '50': '#141A21',
  '100': '#1C252E',
  '200': '#283241',
  '300': '#3A4556',
  '400': '#566476',
  '500': '#7B8A9E',
  '600': '#A0ADB9',
  '700': '#C1CBD3',
  '800': '#DFE3E8',
  '900': '#F4F6F8',
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
