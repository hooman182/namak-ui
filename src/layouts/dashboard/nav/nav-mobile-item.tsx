import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { RouterLink } from 'src/routes/components';

import type { NavItem } from '../../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavMobileItemProps = {
  item: NavItem;
  isActive: boolean;
  onClick?: () => void;
};

export function NavMobileItem({ item, isActive, onClick }: NavMobileItemProps) {
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
