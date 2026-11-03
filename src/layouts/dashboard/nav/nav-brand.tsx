import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Logo } from 'src/components/logo';
import { Sparkle } from 'src/components/sparkle';

// ----------------------------------------------------------------------

export type NavBrandProps = {
  collapsed?: boolean;
  title?: string;
  href?: string;
};

export function NavBrand({ collapsed = false, title = 'نامک', href }: NavBrandProps) {
  return (
    <Stack
      direction="row"
      spacing={collapsed ? 0 : 1.5}
      sx={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        minHeight: 48,
      }}
    >
      <Logo href={href} sx={{ width: 40, height: 40 }} />

      {!collapsed && (
        <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <Sparkle top={-6} insetInlineStart={0} size={8} duration={3.1} delay={0.6} />
          <Sparkle top={-4} insetInlineStart="78%" size={11} duration={2.6} delay={1.7} />
          <Sparkle top={20} insetInlineStart="96%" size={6} duration={3.8} delay={0.2} />

          <NavBrandTitle>{title}</NavBrandTitle>
        </Box>
      )}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function NavBrandTitle({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="h5"
      sx={(theme) => ({
        position: 'relative',
        fontWeight: 'fontWeightBold',
        background: `linear-gradient(110deg, ${theme.vars.palette.text.primary} 0%, ${theme.vars.palette.primary.main} 35%, ${theme.vars.palette.text.primary} 50%, ${theme.vars.palette.primary.main} 65%, ${theme.vars.palette.text.primary} 100%)`,
        backgroundSize: '250% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'navTitleShine 6s linear infinite',
        '@keyframes navTitleShine': {
          '0%': { backgroundPosition: '150% 0' },
          '100%': { backgroundPosition: '-150% 0' },
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      })}
    >
      {children}
    </Typography>
  );
}
