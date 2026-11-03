import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

import { RouterLink } from 'src/routes/components';

import type { NavItem } from '../../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavMobileBottomItemProps = {
  item: NavItem;
  isActive: boolean;
};

export function NavMobileBottomItem({ item, isActive }: NavMobileBottomItemProps) {
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
        py: 1,
        gap: 0.25,
        flexDirection: 'column',
        color: isActive ? 'primary.main' : 'text.secondary',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      {item.icon}

      <Box
        component="span"
        sx={{
          fontSize: 10,
          lineHeight: 1.2,
          fontWeight: isActive ? 'fontWeightSemiBold' : 'fontWeightMedium',
          textAlign: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: 1,
        }}
      >
        {item.title}
      </Box>
    </ButtonBase>
  );
}
