import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import type { NavItem } from '../nav-config-dashboard';

// ----------------------------------------------------------------------

type NavItemLinkProps = {
  item: NavItem;
  variant: 'desktop' | 'mobile' | 'mobileBottom';
  collapsed?: boolean;
  onClick?: () => void;
};

// ----------------------------------------------------------------------

export function NavItemLink({ item, variant, collapsed = false, onClick }: NavItemLinkProps) {
  const pathname = usePathname();
  const isActive = item.path === pathname;

  if (variant === 'desktop') {
    return (
      <ListItem disableGutters disablePadding>
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
                ...(isActive && {
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
  }

  if (variant === 'mobile') {
    return (
      <ListItem disableGutters disablePadding>
        <ListItemButton
          component={RouterLink}
          href={item.path}
          onClick={onClick}
          selected={isActive}
          sx={{
            minHeight: 48,
            gap: 1.5,
            borderRadius: 1,
            color: isActive ? 'primary.main' : 'text.primary',
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
  }

  return (
    <ButtonBase
      component={RouterLink}
      href={item.path}
      aria-label={item.title}
      aria-current={isActive ? 'page' : undefined}
      title={item.title}
      sx={{
        width: 1,
        minHeight: 64,
        color: isActive ? 'primary.main' : 'text.secondary',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      {item.icon}
    </ButtonBase>
  );
}
