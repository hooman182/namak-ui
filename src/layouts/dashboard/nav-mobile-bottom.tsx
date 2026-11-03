import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';

import { usePathname } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { NavMobileBottomItem } from './nav';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

export function NavMobileBottom({
  data,
  layoutQuery,
  onMoreClick,
}: {
  data: NavItem[];
  layoutQuery: Breakpoint;
  onMoreClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const theme = useTheme();
  const pathname = usePathname();

  return (
    <Box
      component="nav"
      aria-label="ناوبری اصلی"
      sx={{
        position: 'fixed',
        bottom: `calc(${theme.spacing(2)} + env(safe-area-inset-bottom))`,
        left: '50%',
        right: 'auto',
        width: 'calc(100% - 48px)',
        transform: 'translateX(-50%)',
        zIndex: theme.zIndex.appBar,
        display: 'block',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: theme.shadows[8],
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'none',
        },
      }}
    >
      <Box
        component="ul"
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'stretch',
          justifyContent: 'space-around',
          m: 0,
          p: 0,
          listStyle: 'none',
        }}
      >
        {data.map((item) => (
          <Box component="li" key={item.title} sx={{ flex: 1 }}>
            <NavMobileBottomItem item={item} isActive={item.path === pathname} />
          </Box>
        ))}
        <Box component="li" sx={{ flex: 1 }}>
          <ButtonBase
            component="button"
            type="button"
            onClick={onMoreClick}
            aria-label="بیشتر"
            title="بیشتر"
            sx={{
              width: 1,
              minHeight: 64,
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Iconify width={26} icon="eva:more-vertical-fill" />
          </ButtonBase>
        </Box>
      </Box>
    </Box>
  );
}
