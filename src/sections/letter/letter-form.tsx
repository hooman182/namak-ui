import type { OrganizationDataType } from 'src/types/organization';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/providers/form-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UploadController,
  TextFieldController,
  DatePickerController,
  ToggleButtonController,
  AutocompleteController,
} from '@/components/composite/form-controller';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { LetterFormschema, type LetterFormValues } from './letter-form-schema';

// ----------------------------------------------------------------------

type LetterFormProps = {
  organizations: OrganizationDataType[];
  initialValues?: Partial<LetterFormValues>;
  onSubmit: (values: LetterFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
};

// ----------------------------------------------------------------------

export function LetterForm({
  organizations,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'ذخیره',
}: LetterFormProps) {
  const method = useForm<LetterFormValues>({
    resolver: zodResolver(LetterFormschema),
    defaultValues: {
      title: '',
      letterNumber: '',
      letterType: undefined,
      letterDate: '',
      organization: null,
      term: '',
      attachments: [],
    },
  });

  const { handleSubmit, reset } = method;

  useEffect(() => {
    if (initialValues) {
      reset({
        title: '',
        letterNumber: '',
        letterType: undefined,
        letterDate: '',
        organization: null,
        term: '',
        attachments: [],
        ...initialValues,
      });
    }
  }, [initialValues, reset]);

  return (
    <Card sx={{ p: 3 }}>
      <Form onSubmit={handleSubmit(onSubmit)} method={method}>
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">اطلاعات نامه</Typography>

            <Stack spacing={1} sx={{ alignItems: 'center' }} direction="row">
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                نوع نامه:
              </Typography>
              <ToggleButtonController
                name="letterType"
                options={[
                  { value: 'incoming', label: 'وارده' },
                  { value: 'outgoing', label: 'صادره' },
                ]}
              />
            </Stack>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'minmax(0, 1fr)',
                sm: 'repeat(2, minmax(0, 1fr))',
              },
              gap: { xs: 2, md: 2.5 },
              alignItems: 'start',
            }}
          >
            <TextFieldController name="title" label="موضوع" fullWidth />
            <TextFieldController name="letterNumber" label="شماره نامه" fullWidth />
            <DatePickerController name="letterDate" label="تاریخ نامه" />
            <AutocompleteController
              name="organization"
              options={organizations}
              label="سازمان"
              getOptionLabel={(option) => option.name}
            />
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              توضیحات و پیوست‌ها
            </Typography>
            <Stack spacing={3}>
              <TextFieldController name="term" label="توضیحات" fullWidth multiline rows={3} />
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                  پیوست‌ها
                </Typography>
                <UploadController name="attachments" />
              </Box>
            </Stack>
          </Box>

          <Stack direction="row-reverse" spacing={1.5}>
            <Button type="submit" variant="contained" color="inherit">
              {submitLabel}
            </Button>
            <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
              انصراف
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Card>
  );
}
