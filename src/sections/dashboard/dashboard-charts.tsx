import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fNumber } from 'src/utils/format-number';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type MonthlyChartProps = {
  categories: string[];
  incoming: number[];
  outgoing: number[];
};

export function DashboardLettersByMonthChart({
  categories,
  incoming,
  outgoing,
}: MonthlyChartProps) {
  const theme = useTheme();
  const hasData = incoming.some(Boolean) || outgoing.some(Boolean);

  const chartOptions = useChart({
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    xaxis: { categories },
    yaxis: { labels: { formatter: (value: number) => fNumber(value) } },
    plotOptions: { bar: { columnWidth: '45%' } },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: { y: { formatter: (value: number) => fNumber(value) } },
    dataLabels: { enabled: false },
  });

  return (
    <Card sx={{ height: 1 }}>
      <CardHeader title="روند نامه‌ها" subheader="تعداد نامه‌های وارده و صادره در ماه‌ها" />
      {hasData ? (
        <Chart
          type="bar"
          series={[
            { name: 'وارده', data: incoming },
            { name: 'صادره', data: outgoing },
          ]}
          options={chartOptions}
          sx={{ height: 290, px: 1.5, pb: 1 }}
        />
      ) : (
        <ChartEmptyState />
      )}
    </Card>
  );
}

type DirectionChartProps = {
  incoming: number;
  outgoing: number;
};

export function DashboardLetterDirectionsChart({ incoming, outgoing }: DirectionChartProps) {
  const theme = useTheme();
  const hasData = incoming + outgoing > 0;
  const colors = [theme.palette.primary.main, theme.palette.secondary.main];

  const chartOptions = useChart({
    labels: ['وارده', 'صادره'],
    colors,
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 3, colors: [theme.vars.palette.background.paper] },
    tooltip: { y: { formatter: (value: number) => fNumber(value) } },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: { label: 'کل نامه‌ها', show: true },
          },
        },
      },
    },
  });

  return (
    <Card sx={{ height: 1 }}>
      <CardHeader title="تفکیک نامه‌ها" subheader="بر اساس نوع نامه" />
      {hasData ? (
        <>
          <Chart
            type="donut"
            series={[incoming, outgoing]}
            options={chartOptions}
            sx={{ height: 230, px: 2 }}
          />
          <Stack
            direction="row"
            spacing={3}
            sx={{ justifyContent: 'center', alignItems: 'center', pb: 2.5 }}
          >
            <ChartLegend color={colors[0]} label="وارده" value={incoming} />
            <ChartLegend color={colors[1]} label="صادره" value={outgoing} />
          </Stack>
        </>
      ) : (
        <ChartEmptyState />
      )}
    </Card>
  );
}

function ChartLegend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
      <Typography variant="caption" color="text.secondary">
        {label}: {fNumber(value)}
      </Typography>
    </Stack>
  );
}

function ChartEmptyState() {
  return (
    <Box
      sx={{
        height: 230,
        display: 'grid',
        placeItems: 'center',
        px: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        برای نمایش نمودار، ابتدا نامه ثبت کنید.
      </Typography>
    </Box>
  );
}
