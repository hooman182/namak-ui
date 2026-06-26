import type { Organization } from 'src/types/organization';
import type { Letter, LetterDirection, LetterAttachment } from 'src/types/letter';

import dayjs, { type Dayjs } from 'dayjs';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButton from '@mui/material/ToggleButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { UploadBox } from 'src/components/upload/upload-box';

// ----------------------------------------------------------------------

export type LetterFormValues = {
  subject: string;
  letterNumber: string;
  direction: LetterDirection;
  organizationId: string;
  letterDate: Dayjs | null;
  description: string;
  attachments: LetterAttachment[];
};

type LetterFormProps = {
  organizations: Organization[];
  initialValues?: Partial<LetterFormValues>;
  onSubmit: (values: LetterFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
};

const defaultValues: LetterFormValues = {
  subject: '',
  letterNumber: '',
  direction: 'incoming',
  organizationId: '',
  letterDate: dayjs(),
  description: '',
  attachments: [],
};

export function LetterForm({
  organizations,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'ذخیره',
}: LetterFormProps) {
  const [values, setValues] = useState<LetterFormValues>({
    ...defaultValues,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedOrg = organizations.find((org) => org.id === values.organizationId) ?? null;

  const validate = useCallback(() => {
    const nextErrors: Record<string, string> = {};
    if (!values.subject.trim()) nextErrors.subject = 'این فیلد الزامی است';
    if (!values.letterNumber.trim()) nextErrors.letterNumber = 'این فیلد الزامی است';
    if (!values.organizationId) nextErrors.organizationId = 'سازمان را انتخاب کنید';
    if (!values.letterDate) nextErrors.letterDate = 'تاریخ نامه الزامی است';
    if (!values.attachments.length) nextErrors.attachments = 'حداقل یک پیوست الزامی است';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [values]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (validate()) onSubmit(values);
    },
    [onSubmit, validate, values]
  );

  return (
    <Card sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Typography variant="h6">اطلاعات نامه</Typography>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="موضوع"
              value={values.subject}
              error={!!errors.subject}
              helperText={errors.subject}
              onChange={(e) => setValues((prev) => ({ ...prev, subject: e.target.value }))}
            />
            <TextField
              fullWidth
              label="شماره نامه"
              value={values.letterNumber}
              error={!!errors.letterNumber}
              helperText={errors.letterNumber}
              onChange={(e) => setValues((prev) => ({ ...prev, letterNumber: e.target.value }))}
            />
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                نوع نامه
              </Typography>
              <ToggleButtonGroup
                exclusive
                value={values.direction}
                onChange={(_, value) => value && setValues((prev) => ({ ...prev, direction: value }))}
              >
                <ToggleButton value="incoming">وارده</ToggleButton>
                <ToggleButton value="outgoing">صادره</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <DatePicker
              label="تاریخ نامه"
              value={values.letterDate}
              onChange={(date) => setValues((prev) => ({ ...prev, letterDate: date }))}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.letterDate,
                  helperText: errors.letterDate,
                },
              }}
              sx={{ flex: 1 }}
            />
          </Stack>

          <Autocomplete
            options={organizations}
            value={selectedOrg}
            getOptionLabel={(option) => option.name}
            onChange={(_, org) => setValues((prev) => ({ ...prev, organizationId: org?.id ?? '' }))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="سازمان"
                error={!!errors.organizationId}
                helperText={errors.organizationId}
              />
            )}
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="توضیحات"
            value={values.description}
            onChange={(e) => setValues((prev) => ({ ...prev, description: e.target.value }))}
          />

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              پیوست‌ها
            </Typography>
            <UploadBox
              value={values.attachments}
              onChange={(attachments) => setValues((prev) => ({ ...prev, attachments }))}
              error={errors.attachments}
            />
          </Box>

          <Stack direction="row" spacing={1.5} justifyContent="flex-start">
            <Button type="submit" variant="contained" color="inherit">
              {submitLabel}
            </Button>
            <Button variant="outlined" color="inherit" onClick={onCancel}>
              انصراف
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}

export function letterToFormValues(letter: Letter): LetterFormValues {
  return {
    subject: letter.subject,
    letterNumber: letter.letterNumber,
    direction: letter.direction,
    organizationId: letter.organizationId,
    letterDate: dayjs(letter.letterDate),
    description: letter.description ?? '',
    attachments: letter.attachments,
  };
}

export function formValuesToLetterData(values: LetterFormValues) {
  return {
    subject: values.subject.trim(),
    letterNumber: values.letterNumber.trim(),
    direction: values.direction,
    organizationId: values.organizationId,
    letterDate: values.letterDate!.format('YYYY-MM-DD'),
    description: values.description.trim() || undefined,
    attachments: values.attachments,
  };
}
