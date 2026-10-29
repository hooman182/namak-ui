import type { IconButtonProps } from '@mui/material/IconButton';

import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { usePalette } from 'src/contexts/palette-context';
import { PALETTES, type PaletteName } from 'src/theme/palettes';

// ----------------------------------------------------------------------

const PALETTE_NAMES: PaletteName[] = ['light', 'dark', 'ocean', 'forest'];

// ----------------------------------------------------------------------

export type PaletteToggleProps = IconButtonProps;

export function PaletteToggle({ sx, ...other }: PaletteToggleProps) {
  const { scheme, setScheme } = usePalette();
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const handleChangeScheme = (newScheme: PaletteName) => {
    setScheme(newScheme);
    onClose();
  };

  const renderSwatch = (color: string) => (
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: '50%',
        bgcolor: color,
        border: '1.5px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
        flexShrink: 0,
      }}
    />
  );

  const renderMenuList = () => (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuList
        sx={{
          p: 0.5,
          gap: 0.5,
          width: 200,
          display: 'flex',
          flexDirection: 'column',
          [`& .${menuItemClasses.root}`]: {
            px: 1,
            gap: 1.5,
            borderRadius: 0.75,
            [`&.${menuItemClasses.selected}`]: {
              bgcolor: 'action.selected',
              fontWeight: 'fontWeightSemiBold',
            },
          },
        }}
      >
        {PALETTE_NAMES.map((key) => (
          <MenuItem key={key} selected={key === scheme} onClick={() => handleChangeScheme(key)}>
            <Box component="span" sx={{ fontSize: 18, lineHeight: 1 }}>
              {PALETTES[key].icon}
            </Box>
            {PALETTES[key].label}
            <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5, alignItems: 'center' }}>
              {renderSwatch(PALETTES[key].palette.primary.main)}
              {renderSwatch(PALETTES[key].palette.secondary.main)}
            </Box>
          </MenuItem>
        ))}
      </MenuList>
    </Popover>
  );

  return (
    <>
      <IconButton
        aria-label="Palette toggle"
        onClick={onOpen}
        sx={[
          (theme) => ({
            p: 0,
            width: 40,
            height: 40,
            ...(open && { bgcolor: theme.vars.palette.action.selected }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box
          component="span"
          sx={{
            fontSize: 20,
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {PALETTES[scheme].icon}
        </Box>
      </IconButton>

      {renderMenuList()}
    </>
  );
}
