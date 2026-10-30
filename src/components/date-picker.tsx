import type { Theme } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ArrowLeftIcon, ArrowRightIcon } from '@mui/x-date-pickers/icons';

import { Iconify } from './iconify';

type DatePickerFieldProps = {
  label?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  error?: boolean;
  helperText?: React.ReactNode;
};

export function DatePickerField({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  fullWidth = true,
  size = 'medium',
  error = false,
  helperText,
}: DatePickerFieldProps) {
  return (
    <DatePicker
      label={label}
      format="yyyy/MM/dd"
      value={value}
      minDate={minDate}
      maxDate={maxDate}
      onChange={onChange}
      slots={{
        leftArrowIcon: ArrowRightIcon,
        rightArrowIcon: ArrowLeftIcon,
        openPickerIcon: () => <Iconify icon="custom:calendar" />,
      }}
      slotProps={{
        textField: {
          fullWidth,
          size,
          error,
          helperText,
        },
        desktopPaper: { sx: glassDatePickerPaperSx },
        mobilePaper: { sx: glassDatePickerPaperSx },
      }}
    />
  );
}

const glassDatePickerPaperSx = (theme: Theme) => ({
  border: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
  borderRadius: 2.5,
  backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.76),
  backdropFilter: 'blur(20px) saturate(1.4)',
  boxShadow: `0 18px 48px ${varAlpha(theme.vars.palette.grey['900Channel'], 0.22)}`,
  overflow: 'hidden',
  '& .MuiPickersDay-root': {
    borderRadius: 2,
    transition: theme.transitions.create(['background-color', 'transform']),
    '&:hover': {
      backgroundColor: varAlpha(theme.vars.palette.primary.mainChannel, 0.12),
    },
    '&.Mui-selected': {
      boxShadow: `0 4px 12px ${varAlpha(theme.vars.palette.primary.mainChannel, 0.32)}`,
    },
  },
});
