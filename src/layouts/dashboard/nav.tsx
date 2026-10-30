import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { Logo } from 'src/components/logo';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
};

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

// ----------------------------------------------------------------------

export function NavMobile({
  data,
  anchorEl,
  onClose,
}: {
  data: NavItem[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (anchorEl) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{
        '& .MuiPopover-paper': {
          mb: 1,
          width: 240,
          maxHeight: '60vh',
          borderRadius: 2,
          boxShadow: 8,
        },
      }}
    >
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => {
          const isActived = item.path === pathname;

          return (
            <ListItem disableGutters disablePadding key={item.title}>
              <ListItemButton
                component={RouterLink}
                href={item.path}
                onClick={onClose}
                selected={isActived}
                sx={{
                  minHeight: 48,
                  gap: 1.5,
                  borderRadius: 1,
                  color: isActived ? 'primary.main' : 'text.primary',
                }}
              >
                {item.icon}
                <Box component="span" sx={{ flexGrow: 1 }}>
                  {item.title}
                </Box>
                {item.info}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Popover>
  );
}

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
  const pathname = usePathname();
  const theme = useTheme();

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
          alignItems: 'stretch',
          justifyContent: 'space-around',
          m: 0,
          p: 0,
          listStyle: 'none',
        }}
      >
        {data.map((item) => {
          const isActived = item.path === pathname;

          return (
            <Box component="li" key={item.title} sx={{ flex: 1 }}>
              <ButtonBase
                component={RouterLink}
                href={item.path}
                aria-label={item.title}
                aria-current={isActived ? 'page' : undefined}
                title={item.title}
                sx={{
                  width: 1,
                  minHeight: 64,
                  color: isActived ? 'primary.main' : 'text.secondary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {item.icon}
              </ButtonBase>
            </Box>
          );
        })}
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

// ----------------------------------------------------------------------

export function NavContent({
  data,
  slots,
  sx,
  collapsed = false,
  onToggle,
}: NavContentProps & { collapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname();

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

      {onToggle ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', my: 2 }}>
          {!collapsed && <Divider sx={{ flex: 1 }} />}
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
          {collapsed && <Divider sx={{ flex: 1 }} />}
        </Stack>
      ) : (
        <Divider sx={{ my: 2 }} />
      )}

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
            {data.map((item) => {
              const isActived = item.path === pathname;

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <Tooltip title={item.title} placement="right" disableHoverListener={!collapsed}>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      sx={[
                        (theme) => ({
                          pl: collapsed ? 0 : 2,
                          py: 1,
                          gap: collapsed ? 0 : 2,
                          pr: collapsed ? 0 : 1.5,
                          justifyContent: collapsed ? 'center' : 'flex-start',
                          borderRadius: 0.75,
                          typography: 'body1',
                          fontWeight: 'fontWeightMedium',
                          color: theme.vars.palette.text.secondary,
                          minHeight: 48,
                          ...(isActived && {
                            fontWeight: 'fontWeightSemiBold',
                            color: theme.vars.palette.primary.main,
                            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
                            '&:hover': {
                              bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.16),
                            },
                          }),
                        }),
                      ]}
                    >
                      <Box
                        component="span"
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: 30,
                          display: 'grid',
                          placeItems: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>

                      {!collapsed && (
                        <Box component="span" sx={{ flexGrow: 1 }}>
                          {item.title}
                        </Box>
                      )}

                      {!collapsed && item.info}
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}
    </>
  );
}
