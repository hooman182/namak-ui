import type { LetterDataType } from 'src/types/letter';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

type DashboardLatestOutgoingCardProps = {
  letter?: LetterDataType;
};

export function DashboardLatestOutgoingCard({ letter }: DashboardLatestOutgoingCardProps) {
  return (
    <Card sx={{ p: 2, height: 1 }}>
      <Stack
        direction="row"
        sx={{ height: 1, alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}
      >
        <Stack direction="row" spacing={1.5} sx={{ minWidth: 0, alignItems: 'center' }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              display: 'grid',
              flexShrink: 0,
              placeItems: 'center',
              borderRadius: 1,
              bgcolor: 'success.lighter',
              color: 'success.dark',
            }}
          >
            <Iconify icon="solar:share-bold" width={20} />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            {letter ? (
              <>
                <Typography variant="h6" noWrap dir="auto">
                  {letter.letterNumber}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  آخرین شماره نامه صادره
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" color="text.secondary">
                  هنوز نامه‌ای صادر نشده است.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  آخرین شماره نامه صادره
                </Typography>
              </>
            )}
          </Box>
        </Stack>

        {letter && (
          <Button
            component={RouterLink}
            href={`/letters/${letter.id}`}
            size="small"
            aria-label="مشاهده آخرین نامه صادره"
            sx={{ minWidth: 36, p: 1, flexShrink: 0 }}
          >
            <Iconify icon="eva:arrow-ios-forward-fill" sx={{ transform: 'rotate(180deg)' }} />
          </Button>
        )}
      </Stack>
    </Card>
  );
}
