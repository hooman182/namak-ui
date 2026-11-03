import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import type { NavItem } from '../../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavDesktopItemProps = {
  item: NavItem;
  isActive: boolean;
  collapsed?: boolean;
};

export function NavDesktopItem({ item, isActive, collapsed = false }: NavDesktopItemProps) {
  return (
    <ListItem disableGutters disablePadding>
      <Tooltip
        title={item.title}
        placement="right"
        disableHoverListener={!collapsed}
        disableFocusListener={!collapsed}
        disableTouchListener={!collapsed}
        disableInteractive
      >
        <ListItemButton
          disableGutters
          component={RouterLink}
          href={item.path}
          aria-current={isActive ? 'page' : undefined}
          sx={[
            (theme) => ({
              pl: collapsed ? 0 : 2,
              py: 1,
              gap: collapsed ? 0 : 2,
              pr: collapsed ? 0 : 1.5,
              flexDirection: collapsed ? 'column' : 'row',
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
          <NavDesktopItemIcon>{item.icon}</NavDesktopItemIcon>

          {!collapsed && (
            <Box component="span" sx={{ flexGrow: 1 }}>
              {item.title}
            </Box>
          )}

          {collapsed && isActive && <NavDesktopItemCaption>{item.title}</NavDesktopItemCaption>}

          {!collapsed && item.info}
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}

// ----------------------------------------------------------------------

function NavDesktopItemIcon({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

function NavDesktopItemCaption({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        fontSize: 10,
        lineHeight: 1.2,
        fontWeight: 'fontWeightMedium',
        textAlign: 'center',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        maxWidth: 1,
      }}
    >
      {children}
    </Box>
  );
}
