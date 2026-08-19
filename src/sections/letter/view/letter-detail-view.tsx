import { useMemo, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { isImageMime } from 'src/components/upload/file-utils';

import { LETTER_DIRECTION_LABELS } from 'src/types/letter';

import {
  LetterForm,
  letterToFormValues,
  type LetterFormValues,
  formValuesToLetterData,
} from '../letter-form';

// ----------------------------------------------------------------------

export function LetterDetailView() {
  const router = useRouter();
  const { id = '' } = useParams();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get('edit') === '1';

  const { getLetter, getOrganizationName, organizations, updateLetter, deleteLetter } = useData();
  const letter = getLetter(id);

  const [editing, setEditing] = useState(isEditMode);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const initialValues = useMemo(
    () => (letter ? letterToFormValues(letter) : undefined),
    [letter]
  );

  const handleUpdate = useCallback(
    (values: LetterFormValues) => {
      updateLetter(id, formValuesToLetterData(values));
      setEditing(false);
      router.push(`/letters/${id}`);
    },
    [id, router, updateLetter]
  );

  const handleDelete = useCallback(() => {
    deleteLetter(id);
    router.push('/letters');
  }, [deleteLetter, id, router]);

  if (!letter) {
    return (
      <DashboardContent>
        <Typography variant="h5">نامه یافت نشد</Typography>
        <Button sx={{ mt: 2 }} onClick={() => router.push('/letters')}>
          بازگشت به لیست
        </Button>
      </DashboardContent>
    );
  }

  if (editing && initialValues) {
    return (
      <DashboardContent>
        <Typography variant="h4" sx={{ mb: 3 }}>
          ویرایش نامه
        </Typography>
        <LetterForm
          organizations={organizations}
          initialValues={initialValues}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
          submitLabel="ذخیره تغییرات"
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">جزئیات نامه</Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={() => setEditing(true)}
          >
            ویرایش
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={() => setDeleteOpen(true)}
          >
            حذف
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Label color={letter.direction === 'incoming' ? 'info' : 'success'}>
              {LETTER_DIRECTION_LABELS[letter.direction]}
            </Label>
            <Typography variant="caption" color="text.secondary">
              شماره: {letter.letterNumber}
            </Typography>
          </Stack>
          <Typography variant="h5">{letter.subject}</Typography>
          <Stack spacing={1}>
            <InfoRow label="سازمان" value={getOrganizationName(letter.organizationId)} />
            <InfoRow label="تاریخ نامه" value={fDate(letter.letterDate)} />
            {letter.description && <InfoRow label="توضیحات" value={letter.description} />}
          </Stack>
        </Stack>
      </Card>

      <Typography variant="h6" sx={{ mb: 2 }}>
        پیوست‌ها ({letter.attachments.length})
      </Typography>

      <Stack spacing={2}>
        {letter.attachments.map((file) => (
          <Card key={file.id} sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              {isImageMime(file.mimeType) && file.previewUrl ? (
                <Box
                  component="img"
                  src={file.previewUrl}
                  alt={file.name}
                  sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover' }}
                />
              ) : (
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    bgcolor: 'background.neutral',
                  }}
                >
                  <Iconify icon="ic:round-filter-list" width={40} />
                </Box>
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{file.name}</Typography>
              </Box>
              {file.previewUrl && (
                <Button
                  component="a"
                  href={file.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="small"
                >
                  مشاهده
                </Button>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>حذف نامه</DialogTitle>
        <DialogContent>
          <DialogContentText>آیا از حذف این نامه مطمئن هستید؟</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>انصراف</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
        {label}:
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
}
