import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { NavItemLink } from './nav-item-link';

import type { NavItem } from '../nav-config-dashboard';

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

export function NavContent({
  data,
  slots,
  sx,
  collapsed = false,
  onToggle,
}: NavContentProps & { collapsed?: boolean; onToggle?: () => void }) {
  return (
    <>
      <Stack
        direction="row"
        spacing={collapsed ? 0 : 2}
        sx={{ alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}
      >
        <Logo />
        {!collapsed && <Typography variant="h4">نامک</Typography>}
      </Stack>

      {onToggle && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            insetInlineEnd: 0,
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <Tooltip title={collapsed ? 'گسترش منو' : 'جمع کردن منو'}>
            <IconButton
              size="small"
              onClick={onToggle}
              aria-label={collapsed ? 'گسترش منو' : 'جمع کردن منو'}
            >
              <Iconify
                icon="eva:arrow-ios-forward-fill"
                sx={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Divider sx={{ my: 2 }} />

      {slots?.topArea}

      <Scrollbar fillContent>
        <Box
          component="nav"
          sx={[
            {
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        >
          <Box
            component="ul"
            sx={{
              gap: 0.5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {data.map((item) => (
              <NavItemLink key={item.title} item={item} variant="desktop" collapsed={collapsed} />
            ))}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}
