import { useEffect } from 'react';

import List from '@mui/material/List';
import Popover from '@mui/material/Popover';

import { usePathname } from 'src/routes/hooks';

import { NavItemLink } from './nav-item-link';

import type { NavItem } from '../nav-config-dashboard';

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
        {data.map((item) => (
          <NavItemLink key={item.title} item={item} variant="mobile" onClick={onClose} />
        ))}
      </List>
    </Popover>
  );
}
