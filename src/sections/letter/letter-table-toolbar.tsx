import type { LetterDirection } from 'src/types/letter';
import type { OrganizationDataType } from 'src/types/organization';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Iconify } from 'src/components/iconify';
import { DatePickerField } from 'src/components/date-picker';

import { parseDateFilterValue, formatDateFilterValue } from './utils';

// ----------------------------------------------------------------------

type LetterTableToolbarProps = {
  filterName: string;
  filterDirection: LetterDirection | 'all';
  filterOrganizationId: string;
  filterDateFrom: string;
  filterDateTo: string;
  isLastMonthSelected: boolean;
  organizations: OrganizationDataType[];
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterDirection: (value: LetterDirection | 'all') => void;
  onFilterOrganization: (organizationId: string) => void;
  onFilterDateFrom: (value: string) => void;
  onFilterDateTo: (value: string) => void;
  onFilterLastMonth: () => void;
};

export function LetterTableToolbar({
  filterName,
  filterDirection,
  filterOrganizationId,
  filterDateFrom,
  filterDateTo,
  isLastMonthSelected,
  organizations,
  onFilterName,
  onFilterDirection,
  onFilterOrganization,
  onFilterDateFrom,
  onFilterDateTo,
  onFilterLastMonth,
}: LetterTableToolbarProps) {
  const selectedOrg = organizations.find((org) => org.id === filterOrganizationId) ?? null;

  return (
    <Box
      sx={{
        p: 2.5,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'minmax(0, 1fr)',
          sm: 'repeat(2, minmax(0, 1fr))',
          xl: 'repeat(4, minmax(0, 1fr))',
        },
        gap: 2,
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        size="medium"
        value={filterName}
        onChange={onFilterName}
        placeholder="جستجو بر اساس موضوع، شماره یا سازمان..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{ gridColumn: { sm: 'span 2', xl: 'span 2' } }}
      />

      <Autocomplete
        fullWidth
        size="medium"
        options={organizations}
        value={selectedOrg}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => onFilterOrganization(value?.id ?? '')}
        renderInput={(params) => (
          <TextField {...params} label="سازمان" placeholder="همه سازمان‌ها" />
        )}
        sx={{ minWidth: 0 }}
      />

      <Stack direction="row" spacing={1} sx={{ whiteSpace: 'nowrap', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          نوع نامه:
        </Typography>

        <ToggleButtonGroup
          exclusive
          size="medium"
          value={filterDirection}
          onChange={(_, value: LetterDirection | 'all' | null) => {
            if (value !== null) {
              onFilterDirection(value);
            }
          }}
          sx={{
            '& .MuiToggleButton-root': {
              px: 2,
              minHeight: 40,
            },
          }}
        >
          <ToggleButton value="all">همه</ToggleButton>
          <ToggleButton value="incoming">وارده</ToggleButton>
          <ToggleButton value="outgoing">صادره</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <DatePickerField
        label="از تاریخ"
        value={parseDateFilterValue(filterDateFrom)}
        maxDate={parseDateFilterValue(filterDateTo) ?? undefined}
        onChange={(value) => onFilterDateFrom(value ? formatDateFilterValue(value) : '')}
      />

      <DatePickerField
        label="تا تاریخ"
        value={parseDateFilterValue(filterDateTo)}
        minDate={parseDateFilterValue(filterDateFrom) ?? undefined}
        onChange={(value) => onFilterDateTo(value ? formatDateFilterValue(value) : '')}
      />

      <Button
        fullWidth
        variant={isLastMonthSelected ? 'contained' : 'outlined'}
        color={isLastMonthSelected ? 'primary' : 'inherit'}
        startIcon={<Iconify icon="solar:clock-circle-outline" />}
        aria-pressed={isLastMonthSelected}
        onClick={onFilterLastMonth}
        sx={{ minHeight: 40, whiteSpace: 'nowrap' }}
        size='small'
      >
         ماه گذشته
      </Button>
    </Box>
  );
}
