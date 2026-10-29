import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import { faIR as dateFnsFaIR } from 'date-fns-jalali/locale/fa-IR';

import { faIR } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';

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
        <LocalizationProvider
          dateAdapter={AdapterDateFnsJalali}
          adapterLocale={dateFnsFaIR}
          localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
