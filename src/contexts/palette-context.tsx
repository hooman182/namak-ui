import type { StorageManager } from '@mui/system/cssVars';
import type { LayoutBackgroundMode } from 'src/layouts/core/css-vars';

import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

import { useColorScheme } from '@mui/material/styles';

import { isPaletteName, PALETTE_LABELS, type PaletteName } from 'src/theme/palettes';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'minimal__palette';
const BACKGROUND_STORAGE_KEY = 'minimal__background';

// ----------------------------------------------------------------------

function readBackgroundMode(): LayoutBackgroundMode {
  try {
    return window.localStorage.getItem(BACKGROUND_STORAGE_KEY) === 'solid' ? 'solid' : 'gradient';
  } catch (error) {
    console.warn('Unable to read the saved background mode.', error);
    return 'gradient';
  }
}

// ----------------------------------------------------------------------

interface PaletteContextType {
  scheme: PaletteName;
  schemes: Record<PaletteName, string>;
  setScheme: (scheme: PaletteName) => void;
  backgroundMode: LayoutBackgroundMode;
  setBackgroundMode: (mode: LayoutBackgroundMode) => void;
  toggleBackgroundMode: () => void;
}

// ----------------------------------------------------------------------

export const paletteStorageManager: StorageManager = ({ key, storageWindow }) => {
  const isPaletteStorageKey = key === `${STORAGE_KEY}-light` || key === `${STORAGE_KEY}-dark`;
  const storageKey = isPaletteStorageKey ? STORAGE_KEY : key;

  return {
    get(defaultValue) {
      try {
        const value = storageWindow?.localStorage.getItem(storageKey);

        if (isPaletteStorageKey && !isPaletteName(value)) {
          return defaultValue;
        }

        return value ?? defaultValue;
      } catch (error) {
        console.warn('Unable to read the saved color palette.', error);
        return defaultValue;
      }
    },
    set(value) {
      try {
        storageWindow?.localStorage.setItem(storageKey, String(value));
      } catch (error) {
        console.warn('Unable to save the selected color palette.', error);
      }
    },
    subscribe(handler) {
      if (!storageWindow) {
        return () => {};
      }

      const handleStorage = (event: StorageEvent) => {
        if (event.key === storageKey) {
          handler(event.newValue);
        }
      };

      storageWindow.addEventListener('storage', handleStorage);
      return () => storageWindow.removeEventListener('storage', handleStorage);
    },
  };
};

// ----------------------------------------------------------------------

const PaletteContext = createContext<PaletteContextType | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [backgroundMode, setBackgroundModeState] =
    useState<LayoutBackgroundMode>(readBackgroundMode);

  const scheme = isPaletteName(colorScheme) ? colorScheme : 'light';

  // A palette that no longer exists (e.g. removed from the registry) falls back to light
  useEffect(() => {
    if (colorScheme && !isPaletteName(colorScheme)) {
      setColorScheme('light');
    }
  }, [colorScheme, setColorScheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-layout-background', backgroundMode);

    try {
      window.localStorage.setItem(BACKGROUND_STORAGE_KEY, backgroundMode);
    } catch (error) {
      console.warn('Unable to save the background mode.', error);
    }
  }, [backgroundMode]);

  const setBackgroundMode = useCallback((mode: LayoutBackgroundMode) => {
    setBackgroundModeState(mode);
  }, []);

  const toggleBackgroundMode = useCallback(() => {
    setBackgroundModeState((current) => (current === 'gradient' ? 'solid' : 'gradient'));
  }, []);

  const value = useMemo(
    () => ({
      scheme,
      schemes: PALETTE_LABELS,
      setScheme: (newScheme: PaletteName) => setColorScheme(newScheme),
      backgroundMode,
      setBackgroundMode,
      toggleBackgroundMode,
    }),
    [scheme, setColorScheme, backgroundMode, setBackgroundMode, toggleBackgroundMode]
  );

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}

export function usePalette(): PaletteContextType {
  const context = useContext(PaletteContext);

  if (!context) {
    throw new Error('usePalette must be used inside PaletteProvider');
  }

  return context;
}
