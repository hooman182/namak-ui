import type { IconifyName } from 'src/components/iconify/register-icons';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

type DashboardStatCardProps = {
  title: string;
  value: number;
  icon: IconifyName;
  color: 'primary' | 'info' | 'success' | 'warning';
};

export function DashboardStatCard({ title, value, icon, color }: DashboardStatCardProps) {
  return (
    <Card sx={{ p: { xs: 1.5, sm: 2 }, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: { xs: 40, sm: 44 },
          height: { xs: 40, sm: 44 },
          display: 'flex',
          flexShrink: 0,
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}.lighter`,
          color: `${color}.dark`,
        }}
      >
        <Iconify icon={icon} width={24} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h5">{fNumber(value)}</Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
