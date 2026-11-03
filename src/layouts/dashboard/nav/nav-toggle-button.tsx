import { varAlpha } from 'minimal-shared/utils';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type NavToggleButtonProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function NavToggleButton({ collapsed, onToggle }: NavToggleButtonProps) {
  const label = collapsed ? 'بازکردن منو' : 'بستن منو';

  return (
    <Tooltip title={label}>
      <IconButton
        size="small"
        onClick={onToggle}
        aria-label={label}
        aria-expanded={!collapsed}
        sx={(theme) => ({
          position: 'fixed',
          top: 46,
          insetInlineStart: 'calc(var(--layout-nav-vertical-width) - 12px)',
          zIndex: 1,
          width: 24,
          height: 24,
          p: 0,
          color: 'primary.main',
          bgcolor: 'background.paper',
          border: `1px solid ${varAlpha(theme.vars.palette.primary.mainChannel, 0.24)}`,
          boxShadow: theme.shadows[2],
          transition: theme.transitions.create(['inset-inline-start', 'background-color'], {
            easing: 'var(--layout-transition-easing)',
            duration: 'var(--layout-transition-duration)',
          }),
          '&:hover': {
            bgcolor: varAlpha(theme.vars.palette.primary.mainChannel, 0.08),
          },
        })}
      >
        <Iconify
          width={16}
          icon="eva:arrow-ios-forward-fill"
          sx={{ transform: collapsed ? 'rotate(180deg)' : 'none' }}
        />
      </IconButton>
    </Tooltip>
  );
}
