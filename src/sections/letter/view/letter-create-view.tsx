import { useCallback } from 'react';

import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { LetterForm, type LetterFormValues, formValuesToLetterData } from '../letter-form';

// ----------------------------------------------------------------------

export function LetterCreateView() {
  const router = useRouter();
  const { organizations, addLetter } = useData();

  const handleSubmit = useCallback(
    (values: LetterFormValues) => {
      const letter = addLetter(formValuesToLetterData(values));
      router.push(`/letters/${letter.id}`);
    },
    [addLetter, router]
  );

  return (
    <DashboardContent>
      <Typography variant="h4" sx={{ mb: 3 }}>
        ثبت نامه جدید
      </Typography>
      <LetterForm
        organizations={organizations}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/letters')}
        submitLabel="ثبت نامه"
      />
    </DashboardContent>
  );
}
