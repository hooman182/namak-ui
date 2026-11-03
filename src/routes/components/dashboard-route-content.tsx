import { Outlet, useLocation } from 'react-router-dom';
import { useRef, Suspense, useState, useLayoutEffect } from 'react';

import Box from '@mui/material/Box';

import { SplashScreen } from 'src/components/loading-screen';

function DashboardLoadingScreen({ fullScreen = false }: { fullScreen?: boolean }) {
  if (fullScreen) {
    return <SplashScreen />;
  }

  return (
    <SplashScreen
      sx={(theme) => ({
        position: 'fixed',
        zIndex: theme.zIndex.appBar - 1,
        top: 'var(--layout-header-mobile-height)',
        bottom: `calc(${theme.spacing(12)} + env(safe-area-inset-bottom))`,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        width: 'auto',
        height: 'auto',
        bgcolor: 'background.default',
        [theme.breakpoints.up('lg')]: {
          top: 'var(--layout-header-desktop-height)',
          bottom: 0,
          insetInlineStart: 'var(--layout-nav-vertical-width)',
        },
      })}
    />
  );
}

export function DashboardRouteContent() {
  const location = useLocation();
  const previousLocationKey = useRef(location.key);
  const [loadingMode, setLoadingMode] = useState<'initial' | 'route' | null>('initial');

  useLayoutEffect(() => {
    if (previousLocationKey.current !== location.key) {
      previousLocationKey.current = location.key;
      setLoadingMode('route');
    }

    const timeoutId = window.setTimeout(() => setLoadingMode(null), 300);

    return () => window.clearTimeout(timeoutId);
  }, [location.key]);

  return (
    <Box
      sx={{ display: 'flex', flex: '1 1 auto', position: 'relative' }}
      aria-busy={loadingMode !== null}
    >
      <Box
        aria-hidden={loadingMode !== null}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          visibility: loadingMode !== null ? 'hidden' : 'visible',
        }}
      >
        <Suspense
          fallback={
            <DashboardLoadingScreen fullScreen={previousLocationKey.current === location.key} />
          }
        >
          <Outlet />
        </Suspense>
      </Box>

      {loadingMode && <DashboardLoadingScreen fullScreen={loadingMode === 'initial'} />}
    </Box>
  );
}
