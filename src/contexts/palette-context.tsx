import type { StorageManager } from '@mui/system/cssVars';

import { useMemo, useContext, createContext } from 'react';

import { useColorScheme } from '@mui/material/styles';

import { PALETTE_LABELS, type PaletteName } from 'src/theme/palettes';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'minimal__palette';

// ----------------------------------------------------------------------

function isPaletteName(value: string | null | undefined): value is PaletteName {
  return (
    value === 'light' ||
    value === 'dark' ||
    value === 'ocean' ||
    value === 'forest' ||
    value === 'rose' ||
    value === 'sunset' ||
    value === 'midnight' ||
    value === 'aurora' ||
    value === 'ember'
  );
}

// ----------------------------------------------------------------------

interface PaletteContextType {
  scheme: PaletteName;
  schemes: Record<PaletteName, string>;
  setScheme: (scheme: PaletteName) => void;
}

// ----------------------------------------------------------------------

export const paletteStorageManager: StorageManager = ({ key, storageWindow }) => {
  const isPaletteStorageKey =
    key === `${STORAGE_KEY}-light` || key === `${STORAGE_KEY}-dark`;
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
  const scheme = isPaletteName(colorScheme) ? colorScheme : 'light';

  const value = useMemo(
    () => ({
      scheme,
      schemes: PALETTE_LABELS,
      setScheme: (newScheme: PaletteName) => setColorScheme(newScheme),
    }),
    [scheme, setColorScheme]
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
