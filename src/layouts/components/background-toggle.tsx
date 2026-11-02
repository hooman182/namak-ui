import type { IconButtonProps } from '@mui/material/IconButton';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import { usePalette } from 'src/contexts/palette-context';

// ----------------------------------------------------------------------

export type BackgroundToggleProps = IconButtonProps;

/**
 * Switches the layout background between the gradient wash and the flat background.
 * The rendered swatch previews the active mode.
 */
export function BackgroundToggle({ sx, ...other }: BackgroundToggleProps) {
  const { backgroundMode, toggleBackgroundMode } = usePalette();

  const isGradient = backgroundMode === 'gradient';

  return (
    <Tooltip title={isGradient ? 'پس‌زمینه: گرادیانی' : 'پس‌زمینه: ساده'}>
      <IconButton
        aria-label="Background mode toggle"
        onClick={toggleBackgroundMode}
        sx={[
          {
            p: 0,
            width: 40,
            height: 40,
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...other}
      >
        <Box
          component="span"
          sx={{
            // Kept in a custom property so the RTL plugin does not rewrite the gradient stops
            '--background-toggle-gradient':
              'linear-gradient(135deg, var(--palette-primary-light) 0%, var(--palette-primary-main) 55%, var(--palette-primary-darker) 100%)',
            width: 20,
            height: 20,
            borderRadius: '6px',
            border: '1.5px solid',
            borderColor: 'divider',
            backgroundImage: isGradient ? 'var(--background-toggle-gradient)' : 'none',
            backgroundColor: isGradient ? 'transparent' : 'var(--palette-primary-main)',
          }}
        />
      </IconButton>
    </Tooltip>
  );
}
