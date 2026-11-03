import type { Theme, SxProps } from '@mui/material/styles';

import Box from '@mui/material/Box';

import { usePathname } from 'src/routes/hooks';

import { Scrollbar } from 'src/components/scrollbar';

import { NavDesktopItem } from './nav-desktop-item';

import type { NavItem } from '../../nav-config-dashboard';

// ----------------------------------------------------------------------

export type NavListProps = {
  data: NavItem[];
  collapsed?: boolean;
  scrollable?: boolean;
  sx?: SxProps<Theme>;
};

export function NavList({ data, collapsed = false, scrollable = false, sx }: NavListProps) {
  const pathname = usePathname();

  const content = (
    <Box
      component="nav"
      sx={[
        {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        component="ul"
        sx={{
          gap: 0.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {data.map((item) => (
          <NavDesktopItem
            key={item.title}
            item={item}
            isActive={item.path === pathname}
            collapsed={collapsed}
          />
        ))}
      </Box>
    </Box>
  );

  if (!scrollable) {
    return content;
  }

  return <Scrollbar fillContent>{content}</Scrollbar>;
}
