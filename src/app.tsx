import 'src/global.css';

import { useEffect } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { usePathname } from 'src/routes/hooks';

import { ThemeProvider } from 'src/theme/theme-provider';

// ----------------------------------------------------------------------

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  useScrollToTop();
  useRtlDocument();

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

// ----------------------------------------------------------------------

function useRtlDocument() {
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'fa';
  }, []);
}

function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
