import { PaletteProvider } from 'src/contexts/palette-context';

import QueryProvider from './query-provider';
import CustomThemeProvider from './theme-provider';

// ----------------------------------------------------------------------

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <PaletteProvider>
      <QueryProvider>
        <CustomThemeProvider>
          {children}
        </CustomThemeProvider>
      </QueryProvider>
    </PaletteProvider>
  );
}
