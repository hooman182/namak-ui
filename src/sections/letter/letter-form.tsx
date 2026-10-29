import type { OrganizationDataType } from 'src/types/organization';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from '@/providers/form-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextFieldController,
  ToggleButtonController,
  DatePickerController,
  AutocompleteController,
  UploadController,
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
          <Typography variant="h6">اطلاعات نامه</Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextFieldController name="title" label="موضوع" fullWidth />

            <TextFieldController name="letterNumber" label="شماره نامه" fullWidth />
          </Stack>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 3 }}
            sx={{ alignItems: 'flex-start' }}
          >
            {/* Letter Type */}
            <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                نوع نامه
              </Typography>
              <ToggleButtonController
                name="letterType"
                options={[
                  { value: 'incoming', label: 'وارده' },
                  { value: 'outgoing', label: 'صادره' },
                ]}
              />
            </Stack>

            {/* Letter Date */}
            <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
              <DatePickerController name="letterDate" label="تاریخ نامه" />
            </Stack>
          </Stack>

          <AutocompleteController
            name="organization"
            options={organizations}
            label="سازمان"
            getOptionLabel={(option) => option.name}
          />

          <TextFieldController name="term" label="توضیحات" fullWidth multiline rows={3} />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              پیوست‌ها
            </Typography>

            <UploadController name="attachments" />
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
