import type { LetterDataType } from 'src/types/letter';

import { useMemo, useState } from 'react';
import { faIR } from 'date-fns-jalali/locale/fa-IR';
import {
  format,
  addMonths,
  endOfWeek,
  endOfMonth,
  isSameMonth,
  startOfWeek,
  startOfMonth,
  eachDayOfInterval,
} from 'date-fns-jalali';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { fNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

import { parseDateFilterValue } from '../letter/utils';

// ----------------------------------------------------------------------

type DashboardOutgoingCalendarProps = {
  letters: LetterDataType[];
  initialDate?: string;
};

const WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export function DashboardOutgoingCalendar({
  letters,
  initialDate,
}: DashboardOutgoingCalendarProps) {
  const [visibleMonth, setVisibleMonth] = useState(
    () => (initialDate && parseDateFilterValue(initialDate)) || new Date()
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { calendarDays, outgoingByDate } = useMemo(() => {
    const monthStart = startOfMonth(visibleMonth);
    const days = eachDayOfInterval({
      start: startOfWeek(monthStart, { locale: faIR }),
      end: endOfWeek(endOfMonth(monthStart), { locale: faIR }),
    });
    const byDate = new Map<string, number>();

    letters.forEach((letter) => {
      if (letter.direction !== 'outgoing') return;

      const date = parseDateFilterValue(letter.letterDate.slice(0, 10));
      if (!date) return;

      const key = getDateKey(date);
      byDate.set(key, (byDate.get(key) ?? 0) + 1);
    });

    return { calendarDays: days, outgoingByDate: byDate };
  }, [letters, visibleMonth]);

  const selectedCount = selectedDate ? (outgoingByDate.get(selectedDate) ?? 0) : 0;

  return (
    <Card>
      <CardHeader
        title="تقویم نامه‌های صادره"
        subheader="روزهای ارسال نامه با نقطه مشخص شده‌اند"
        action={
          <Stack direction="row" spacing={0.25}>
            <IconButton
              aria-label="ماه قبل"
              size="small"
              onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
            >
              <Iconify icon="eva:arrow-ios-forward-fill" width={20} />
            </IconButton>
            <IconButton
              aria-label="ماه بعد"
              size="small"
              onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
            >
              <Iconify
                icon="eva:arrow-ios-forward-fill"
                width={20}
                sx={{ transform: 'rotate(180deg)' }}
              />
            </IconButton>
          </Stack>
        }
      />

      <Box sx={{ px: 2.5, pb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, textAlign: 'center' }}>
          {format(visibleMonth, 'MMMM yyyy', { locale: faIR })}
        </Typography>

        <Box
          role="grid"
          aria-label="تقویم نامه‌های صادره"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: 0.5,
          }}
        >
          {WEEKDAYS.map((day, index) => (
            <Typography
              key={`${day}-${index}`}
              role="columnheader"
              variant="caption"
              color="text.secondary"
              sx={{ py: 0.5, textAlign: 'center' }}
            >
              {day}
            </Typography>
          ))}

          {calendarDays.map((day) => {
            const dateKey = getDateKey(day);
            const letterCount = outgoingByDate.get(dateKey) ?? 0;
            const isCurrentMonth = isSameMonth(day, visibleMonth);
            const isSelected = selectedDate === dateKey;
            const accessibleLabel = `${format(day, 'd MMMM yyyy', { locale: faIR })}، ${fNumber(letterCount)} نامه صادره`;

            return (
              <ButtonBase
                key={dateKey}
                role="gridcell"
                aria-label={accessibleLabel}
                aria-pressed={isSelected}
                title={accessibleLabel}
                onClick={() => setSelectedDate(dateKey)}
                sx={{
                  minWidth: 0,
                  height: 38,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.25,
                  borderRadius: 1,
                  typography: 'caption',
                  color: isCurrentMonth ? 'text.primary' : 'text.disabled',
                  bgcolor: isSelected ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {format(day, 'd', { locale: faIR })}
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    bgcolor: letterCount ? 'primary.main' : 'transparent',
                  }}
                />
              </ButtonBase>
            );
          })}
        </Box>

        <Stack
          direction="row"
          spacing={0.75}
          sx={{ alignItems: 'center', justifyContent: 'center', mt: 1.5 }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography variant="caption" color="text.secondary">
            {selectedCount
              ? `${fNumber(selectedCount)} نامه صادره در روز انتخاب‌شده`
              : 'روزهای دارای نامه صادره'}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

function getDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
