import type { Theme } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

// ----------------------------------------------------------------------

export type LayoutBackgroundMode = 'gradient' | 'solid';
export type LayoutSchemeMode = 'light' | 'dark';

/** Resolve whether the active color scheme is a light or a dark palette */
export function resolveSchemeMode(theme: Theme, scheme?: string | null): LayoutSchemeMode {
  const colorSchemes = theme.colorSchemes as
    | Record<string, { palette?: { mode?: LayoutSchemeMode } }>
    | undefined;

  return colorSchemes?.[scheme ?? '']?.palette?.mode ?? 'light';
}

/**
 * Light schemes get a bright, low-contrast wash (paper → background → faint primary tint).
 * Dark schemes get a deeper wash (raised neutral → background → near black).
 */
function createLayoutGradient(theme: Theme, mode: LayoutSchemeMode) {
  const { primary, common, background } = theme.vars.palette;

  if (mode === 'dark') {
    return `linear-gradient(165deg, ${background.neutral} 0%, ${background.default} 45%, ${varAlpha(common.blackChannel, 0.7)} 100%)`;
  }

  return `linear-gradient(165deg, ${background.paper} 0%, ${background.default} 55%, ${varAlpha(primary.mainChannel, 0.06)} 100%)`;
}

// ----------------------------------------------------------------------

export function layoutSectionVars(theme: Theme, mode: LayoutSchemeMode = 'light') {
  return {
    /** Flat background used when the background mode is "solid" */
    '--layout-bg-solid': theme.vars.palette.background.default,
    /** Scheme aware background gradient */
    '--layout-bg-gradient': createLayoutGradient(theme, mode),
    /** Active layout background, switched by the `data-layout-background` attribute */
    '--layout-background': 'var(--layout-bg-gradient)',
    '--layout-nav-zIndex': theme.zIndex.drawer + 1,
    '--layout-nav-mobile-width': '288px',
    '--layout-header-blur': '8px',
    '--layout-header-zIndex': theme.zIndex.appBar + 1,
    '--layout-header-mobile-height': '64px',
    '--layout-header-desktop-height': '72px',
  };
}

/** Rules that switch `--layout-background` between the gradient and the flat background */
export const layoutBackgroundSelectors = {
  'html[data-layout-background="gradient"] body': {
    '--layout-background': 'var(--layout-bg-gradient)',
  },
  'html[data-layout-background="solid"] body': {
    '--layout-background': 'var(--layout-bg-solid)',
  },
};
