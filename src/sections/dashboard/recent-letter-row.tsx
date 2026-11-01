import type { LetterDataType } from 'src/types/letter';

import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';

import { LETTER_DIRECTION_LABELS } from 'src/types/letter';

type DashboardRecentLetterRowProps = {
  letter: LetterDataType;
  onClick: () => void;
};

export function DashboardRecentLetterRow({ letter, onClick }: DashboardRecentLetterRowProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: 1,
        py: 1.25,
        px: 0.5,
        borderRadius: 1,
        textAlign: 'start',
        justifyContent: 'space-between',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Stack spacing={0.25} sx={{ minWidth: 0, alignItems: 'flex-start' }}>
        <Typography variant="subtitle2" noWrap sx={{ maxWidth: '100%' }}>
          {letter.subject}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {letter.letterNumber}
        </Typography>
      </Stack>
      <Stack spacing={0.5} sx={{ alignItems: 'flex-end', flexShrink: 0, ml: 1 }}>
        <Label color={letter.direction === 'incoming' ? 'info' : 'success'} variant="soft">
          {LETTER_DIRECTION_LABELS[letter.direction]}
        </Label>
        <Typography variant="caption" color="text.secondary">
          {fDate(letter.letterDate)}
        </Typography>
      </Stack>
    </ButtonBase>
  );
}
