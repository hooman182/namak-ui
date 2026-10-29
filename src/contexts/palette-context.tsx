import { useMemo, useState, useContext, useCallback, createContext, useLayoutEffect } from 'react';

import { PALETTE_LABELS, type PaletteName } from 'src/theme/palettes';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'minimal__palette';

// ----------------------------------------------------------------------

interface PaletteContextType {
  scheme: PaletteName;
  schemes: Record<PaletteName, string>;
  setScheme: (scheme: PaletteName) => void;
}

// ----------------------------------------------------------------------

function getStoredScheme(): PaletteName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'ocean' || stored === 'forest') {
      return stored;
    }
  } catch {}
  return 'light';
}

// ----------------------------------------------------------------------

const PaletteContext = createContext<PaletteContextType | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setSchemeState] = useState<PaletteName>(getStoredScheme);

  const setScheme = useCallback((newScheme: PaletteName) => {
    setSchemeState(newScheme);
    try {
      localStorage.setItem(STORAGE_KEY, newScheme);
    } catch {}
  }, []);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', scheme);
  });

  const value = useMemo(
    () => ({ scheme, schemes: PALETTE_LABELS, setScheme }),
    [scheme, setScheme]
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
