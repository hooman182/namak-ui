import type { IconifyName } from 'src/components/iconify/register-icons';

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/format-number';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { LETTER_DIRECTION_LABELS } from 'src/types/letter';

// ----------------------------------------------------------------------

export function DashboardView() {
  const router = useRouter();
  const { letters, getOrganizationName } = useData();

  const stats = useMemo(() => {
    const incoming = letters.filter((l) => l.direction === 'incoming').length;
    const outgoing = letters.filter((l) => l.direction === 'outgoing').length;
    const now = new Date();
    const thisMonth = letters.filter((l) => {
      const d = new Date(l.letterDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
    return { incoming, outgoing, thisMonth, total: letters.length };
  }, [letters]);

  const recentLetters = useMemo(
    () => [...letters].sort((a, b) => b.letterDate.localeCompare(a.letterDate)).slice(0, 5),
    [letters]
  );

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          داشبورد
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => router.push('/letters/new')}
        >
          ثبت نامه جدید
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="کل نامه‌ها" value={stats.total} icon="solar:chat-round-dots-bold" color="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="نامه‌های وارده" value={stats.incoming} icon="solar:bell-bing-bold-duotone" color="info" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="نامه‌های صادره" value={stats.outgoing} icon="solar:share-bold" color="success" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard title="این ماه" value={stats.thisMonth} icon="solar:clock-circle-outline" color="warning" />
        </Grid>
      </Grid>

      <Card sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6">آخرین نامه‌ها</Typography>
          <Button size="small" onClick={() => router.push('/letters')}>
            مشاهده همه
          </Button>
        </Stack>

        {recentLetters.length ? (
          <Stack spacing={2}>
            {recentLetters.map((letter) => (
              <Box
                key={letter.id}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  cursor: 'pointer',
                  border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
                onClick={() => router.push(`/letters/${letter.id}`)}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Label color={letter.direction === 'incoming' ? 'info' : 'success'} variant="soft">
                    {LETTER_DIRECTION_LABELS[letter.direction]}
                  </Label>
                  <Typography variant="caption" color="text.secondary">
                    {letter.letterNumber}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2">{letter.subject}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {getOrganizationName(letter.organizationId)} — {fDate(letter.letterDate)}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">هنوز نامه‌ای ثبت نشده است.</Typography>
        )}
      </Card>
    </DashboardContent>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: IconifyName;
  color: 'primary' | 'info' | 'success' | 'warning';
};

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <Card sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          display: 'flex',
          borderRadius: 1.5,
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}.lighter`,
          color: `${color}.dark`,
        }}
      >
        <Iconify icon={icon} width={28} />
      </Box>
      <Box>
        <Typography variant="h4">{fNumber(value)}</Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
