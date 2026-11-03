import dark from './dark';
import blue from './blue';
import light from './light';
import ocean from './ocean';
import slate from './slate';
import forest from './forest';
import midnight from './midnight';

import type { PaletteEntry } from './types';

// ----------------------------------------------------------------------

/**
 * Palette registry.
 *
 * Every palette lives in its own module; this file is the single source of truth for
 * which palettes exist and in which order they are listed in the UI.
 * Adding a palette only requires a new module + one entry here.
 */
export const PALETTES = {
  dark,
  midnight,
  light,
  blue,
  ocean,
  forest,
  slate,
} satisfies Record<string, PaletteEntry>;

export type PaletteName = keyof typeof PALETTES;

/** Palette names in display order */
export const PALETTE_NAMES = Object.keys(PALETTES) as PaletteName[];

/** Palette labels keyed by palette name */
export const PALETTE_LABELS = Object.fromEntries(
  PALETTE_NAMES.map((name) => [name, PALETTES[name].label])
) as Record<PaletteName, string>;

export function isPaletteName(value: string | null | undefined): value is PaletteName {
  return typeof value === 'string' && (PALETTE_NAMES as string[]).includes(value);
}

export type { PaletteMode, PaletteEntry, PaletteColorSet, PaletteColorNoChannels } from './types';
