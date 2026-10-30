import type { Breakpoint } from '@mui/material/styles';
import type { ContainerProps } from '@mui/material/Container';

import { useLocation } from 'react-router-dom';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components/router-link';

import { layoutClasses } from '../core/classes';

// ----------------------------------------------------------------------

export type DashboardContentProps = ContainerProps & {
  layoutQuery?: Breakpoint;
  disablePadding?: boolean;
};

export function DashboardContent({
  sx,
  children,
  className,
  disablePadding,
  maxWidth = 'lg',
  layoutQuery = 'lg',
  ...other
}: DashboardContentProps) {
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <Container
      className={mergeClasses([layoutClasses.content, className])}
      maxWidth={maxWidth}
      sx={[
        (theme) => ({
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          pt: 'var(--layout-dashboard-content-pt)',
          pb: 'var(--layout-dashboard-content-pb-mobile)',
          [theme.breakpoints.up(layoutQuery)]: {
            px: 'var(--layout-dashboard-content-px)',
            pb: 'var(--layout-dashboard-content-pb)',
          },
          ...(disablePadding && {
            p: {
              xs: 0,
              sm: 0,
              md: 0,
              lg: 0,
              xl: 0,
            },
          }),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Breadcrumbs aria-label="مسیر صفحه" sx={{ mb: 3 }}>
        {breadcrumbs.map((item, index) =>
          index === breadcrumbs.length - 1 ? (
            <Typography key={item.href} color="text.primary" variant="body2">
              {item.label}
            </Typography>
          ) : (
            <Link
              key={item.href}
              component={RouterLink}
              href={item.href}
              color="inherit"
              underline="hover"
              variant="body2"
            >
              {item.label}
            </Link>
          )
        )}
      </Breadcrumbs>
      {children}
    </Container>
  );
}

function getBreadcrumbs(pathname: string) {
  const dashboard = { label: 'داشبورد', href: '/' };

  if (pathname === '/') return [dashboard];
  if (pathname === '/organizations') {
    return [dashboard, { label: 'سازمان‌ها', href: pathname }];
  }
  if (pathname === '/letters') {
    return [dashboard, { label: 'نامه‌ها', href: pathname }];
  }
  if (pathname === '/letters/new') {
    return [
      dashboard,
      { label: 'نامه‌ها', href: '/letters' },
      { label: 'ثبت نامه جدید', href: pathname },
    ];
  }
  if (pathname.startsWith('/letters/')) {
    return [
      dashboard,
      { label: 'نامه‌ها', href: '/letters' },
      { label: 'جزئیات نامه', href: pathname },
    ];
  }

  return [dashboard];
}
