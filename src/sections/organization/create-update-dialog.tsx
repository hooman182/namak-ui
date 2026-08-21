import type { Organization } from 'src/types/organization';

import * as z from 'zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';

import Form from 'src/providers/form-provider';

import { FormField } from 'src/components/composite/form-field';

import { useOrganizationMutation } from './use-organization-mutation';

// ----------------------------------------------------------------------

const schema = z.object({
  place: z.string().min(1, 'نام سازمان الزامی است'),
  address: z.string(),
  description: z.string(),
});

type FormValues = z.infer<typeof schema>;

// ----------------------------------------------------------------------

interface OrganizationCreateUpdateDialogProps {
  open: boolean;
  onClose: () => void;
  editingOrg: Organization | null;
}

// ----------------------------------------------------------------------

export function OrganizationCreateUpdateDialog({
  open,
  onClose,
  editingOrg,
}: OrganizationCreateUpdateDialogProps) {
  const { create, update } = useOrganizationMutation();

  const method = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      place: '',
      address: '',
      description: '',
    },
  });

  const { handleSubmit, reset } = method;

  useEffect(() => {
    if (open) {
      if (editingOrg) {
        reset({
          place: editingOrg.name,
          address: editingOrg.code ?? '',
          description: editingOrg.contactPerson ?? '',
        });
      } else {
        reset({ place: '', address: '', description: '' });
      }
    }
  }, [open, editingOrg, reset]);

  const isPending = create.isPending || update.isPending;

  const onSubmit = handleSubmit(async (data: FormValues) => {
    if (editingOrg) {
      await update.mutateAsync({
        id: editingOrg.id,
        name: data.place,
        code: data.address,
        contactPerson: data.description,
      });
    } else {
      await create.mutateAsync({
        name: data.place,
        code: data.address,
        contactPerson: data.description,
      });
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingOrg ? 'ویرایش سازمان' : 'افزودن سازمان'}</DialogTitle>
      {isPending && <LinearProgress />}
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
        <Form onSubmit={onSubmit} method={method}>
          <FormField name="place" label="نام سازمان" />
          <FormField name="address" label="آدرس" />
          <FormField name="description" label="توضیحات" />
          <DialogActions>
            <Button onClick={onClose}>انصراف</Button>
            <Button variant="contained" type="submit" disabled={isPending}>
              ذخیره
            </Button>
          </DialogActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
