import { useMemo } from 'react';

import Grid from '@mui/material/Grid';

import { useRouter } from 'src/routes/hooks';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { DashboardStatCard } from '../stat-card';
import { DashboardRecentLettersCard } from '../recent-letters-card';
import { DashboardLatestOutgoingCard } from '../latest-outgoing-card';
import { DashboardOutgoingCalendar } from '../dashboard-outgoing-calendar';
import { DashboardLettersByMonthChart, DashboardLetterDirectionsChart } from '../dashboard-charts';

// ----------------------------------------------------------------------

export function DashboardView() {
  const router = useRouter();
  const { letters } = useData();

  const { stats, recentLetters, latestOutgoing, monthlyStats } = useMemo(() => {
    const incoming = letters.filter((letter) => letter.direction === 'incoming').length;
    const outgoingLetters = letters.filter((letter) => letter.direction === 'outgoing');
    const outgoing = outgoingLetters.length;
    const now = new Date();
    const thisMonth = letters.filter((letter) => {
      const date = new Date(letter.letterDate);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    const sortedLetters = [...letters].sort((a, b) => b.letterDate.localeCompare(a.letterDate));
    const latestOutgoingLetter = [...outgoingLetters].sort((a, b) =>
      b.letterDate.localeCompare(a.letterDate)
    )[0];

    const datedLetters = letters
      .map((letter) => ({ letter, date: new Date(letter.letterDate) }))
      .filter(({ date }) => !Number.isNaN(date.getTime()));
    const latestDate = datedLetters.reduce<Date | null>(
      (latest, { date }) => (!latest || date > latest ? date : latest),
      null
    );
    const endMonth = latestDate ?? now;
    const monthBuckets = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(endMonth.getFullYear(), endMonth.getMonth() - 5 + index, 1);
      return {
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: new Intl.DateTimeFormat('fa-IR-u-ca-gregory', { month: 'short' }).format(date),
        incoming: 0,
        outgoing: 0,
      };
    });
    const monthBucketMap = new Map(monthBuckets.map((bucket) => [bucket.key, bucket]));

    datedLetters.forEach(({ letter, date }) => {
      const bucket = monthBucketMap.get(`${date.getFullYear()}-${date.getMonth()}`);
      if (bucket) {
        bucket[letter.direction] += 1;
      }
    });

    return {
      stats: { incoming, outgoing, thisMonth, total: letters.length },
      recentLetters: sortedLetters.slice(0, 5),
      latestOutgoing: latestOutgoingLetter,
      monthlyStats: {
        categories: monthBuckets.map((bucket) => bucket.label),
        incoming: monthBuckets.map((bucket) => bucket.incoming),
        outgoing: monthBuckets.map((bucket) => bucket.outgoing),
      },
    };
  }, [letters]);

  return (
    <DashboardContent>
      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 6, md: 4 }}>
          <DashboardStatCard
            title="کل نامه‌ها"
            value={stats.total}
            icon="solar:letter-bold-duotone"
            color="primary"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 4 }}>
          <DashboardStatCard
            title="این ماه"
            value={stats.thisMonth}
            icon="solar:clock-circle-outline"
            color="warning"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardLatestOutgoingCard letter={latestOutgoing} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <DashboardRecentLettersCard
            letters={recentLetters}
            onShowAll={() => router.push('/letters')}
            onLetterClick={(letterId) => router.push(`/letters/${letterId}`)}
          />
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <DashboardLetterDirectionsChart incoming={stats.incoming} outgoing={stats.outgoing} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardOutgoingCalendar letters={letters} initialDate={latestOutgoing?.letterDate} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardLettersByMonthChart
            categories={monthlyStats.categories}
            incoming={monthlyStats.incoming}
            outgoing={monthlyStats.outgoing}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
