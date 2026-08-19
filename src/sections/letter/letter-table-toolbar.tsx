import type { LetterDirection } from 'src/types/letter';
import type { Organization } from 'src/types/organization';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButton from '@mui/material/ToggleButton';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type LetterTableToolbarProps = {
  filterName: string;
  filterDirection: LetterDirection | 'all';
  filterOrganizationId: string;
  organizations: Organization[];
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterDirection: (value: LetterDirection | 'all') => void;
  onFilterOrganization: (organizationId: string) => void;
};

export function LetterTableToolbar({
  filterName,
  filterDirection,
  filterOrganizationId,
  organizations,
  onFilterName,
  onFilterDirection,
  onFilterOrganization,
}: LetterTableToolbarProps) {
  const selectedOrg =
    organizations.find((org) => org.id === filterOrganizationId) ?? null;

  return (
    <Stack
      spacing={2}
      sx={{
        p: 2.5,
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: "space-between"
      }}
    >
      <TextField
        fullWidth
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="جستجو بر اساس موضوع، شماره یا سازمان..."
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          },
        }}
        sx={{ maxWidth: { md: 360 } }}
      />

      <Stack
        direction="row"
        spacing={1}
        sx={{ whiteSpace: 'nowrap', alignItems:"center" }}
      >
        <Typography variant="body2" color="text.secondary">
          نوع نامه:
        </Typography>

        <ToggleButtonGroup
          exclusive
          size="small"
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

      <Autocomplete
        size="small"
        options={organizations}
        value={selectedOrg}
        getOptionLabel={(option) => option.name}
        onChange={(_, value) => onFilterOrganization(value?.id ?? '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label="سازمان"
            placeholder="همه سازمان‌ها"
          />
        )}
        sx={{ minWidth: { md: 240 } }}
      />

      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}
