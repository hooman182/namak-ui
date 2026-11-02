import type { Breakpoint } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { NavContent } from './nav-content';

import type { NavContentProps } from './nav-content';

// ----------------------------------------------------------------------

export function NavDesktop({
  sx,
  data,
  slots,
  layoutQuery,
  collapsed,
  onToggle,
}: NavContentProps & {
  layoutQuery: Breakpoint;
  collapsed: boolean;
  onToggle: () => void;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: collapsed ? 1.25 : 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        boxSizing: 'border-box',
        transition: theme.transitions.create(['width', 'padding'], {
          easing: 'var(--layout-transition-easing)',
          duration: 'var(--layout-transition-duration)',
        }),
        borderRight: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} collapsed={collapsed} onToggle={onToggle} />
    </Box>
  );
}
