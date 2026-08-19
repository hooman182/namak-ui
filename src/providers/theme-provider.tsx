import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import { ThemeProvider } from 'src/theme/theme-provider';


// ----------------------------------------------------------------------

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// ----------------------------------------------------------------------


export default function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider themeOverrides={{ direction: 'rtl' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fa">
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
