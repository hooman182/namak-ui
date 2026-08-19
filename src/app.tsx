import 'src/global.css';

import { useEffect } from 'react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

import { usePathname } from 'src/routes/hooks';

import AppProvider from './providers/app-provider';

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
    <AppProvider>
      {children}
    </AppProvider>
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
