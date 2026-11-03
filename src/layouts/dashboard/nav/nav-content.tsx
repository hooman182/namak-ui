import type { Theme, SxProps } from '@mui/material/styles';

import Divider from '@mui/material/Divider';

import { NavList } from './nav-list';
import { NavBrand } from './nav-brand';
import { NavToggleButton } from './nav-toggle-button';

import type { NavItem } from '../../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavContentProps = {
  data: NavItem[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  sx?: SxProps<Theme>;
  collapsed?: boolean;
  onToggle?: () => void;
};

export function NavContent({ data, slots, sx, collapsed = false, onToggle }: NavContentProps) {
  return (
    <>
      <NavBrand collapsed={collapsed} />

      <Divider sx={{ mt: collapsed ? 3 : 2, mb: 2 }} />

      {slots?.topArea}

      <NavList data={data} collapsed={collapsed} scrollable sx={sx} />

      {slots?.bottomArea}

      {onToggle && <NavToggleButton collapsed={collapsed} onToggle={onToggle} />}
    </>
  );
}
