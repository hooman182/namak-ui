import type { LetterDataType } from 'src/types/letter';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { DashboardRecentLetterRow } from './recent-letter-row';

type DashboardRecentLettersCardProps = {
  letters: LetterDataType[];
  onShowAll: () => void;
  onLetterClick: (letterId: string) => void;
};

export function DashboardRecentLettersCard({
  letters,
  onShowAll,
  onLetterClick,
}: DashboardRecentLettersCardProps) {
  return (
    <Card sx={{ p: { xs: 2, sm: 2.5 }, height: 1 }}>
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}
      >
        <Typography variant="h6">آخرین نامه‌ها</Typography>
        <Button size="small" onClick={onShowAll}>
          مشاهده همه
        </Button>
      </Stack>

      {letters.length ? (
        <Stack divider={<Divider flexItem />}>
          {letters.map((letter) => (
            <DashboardRecentLetterRow
              key={letter.id}
              letter={letter}
              onClick={() => onLetterClick(letter.id)}
            />
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary" variant="body2" sx={{ py: 2 }}>
          هنوز نامه‌ای ثبت نشده است.
        </Typography>
      )}
    </Card>
  );
}
