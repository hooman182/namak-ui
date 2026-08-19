import type { Organization } from 'src/types/organization';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import * as z from "zod";
import Form from '@/providers/form-provider';
import { FormField } from '@/components/composite/form-field';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query';

// ----------------------------------------------------------------------

const schema = z.object({
  place: z.string(),
  address: z.string(),
  description: z.string(),
});

type FormValues = z.infer<typeof schema>;

export function OrganizationListView() {

  const method = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      place: "",
      address: "",
      description: "",
    }
  })

  const { organizations, addOrganization, updateOrganization, deleteOrganization } = useData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

  const openCreate = useCallback(() => {
    setEditingOrg(null);
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((org: Organization) => {
    setEditingOrg(org);
    setDialogOpen(true);
  }, []);

  const { handleSubmit } = method

  const { mutateAsync: createPlaceMutate } = useMutation({
    mutationKey: ["register-place"],
    mutationFn: async (data: FormValues) => {
      if (editingOrg) {
        await updateOrganization(editingOrg.id, data);
      } else {
        await addOrganization(data);
      }
    },
    onSuccess: () => {
      setDialogOpen(false);
    },
  })


  const createPlaceSubmit = handleSubmit(async (data) => {
    await createPlaceMutate(data);
  })


  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          سازمان‌ها
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={openCreate}
        >
          افزودن سازمان
        </Button>
      </Box>

      <Card>
        <Scrollbar>
          <TableContainer>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="right">نام سازمان</TableCell>
                  <TableCell align="right">کد</TableCell>
                  <TableCell align="right">مسئول</TableCell>
                  <TableCell align="right">تلفن</TableCell>
                  <TableCell align="left" width={100} />
                </TableRow>
              </TableHead>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id} hover>
                    <TableCell align="right">{org.name}</TableCell>
                    <TableCell align="right">{org.code ?? '—'}</TableCell>
                    <TableCell align="right">{org.contactPerson ?? '—'}</TableCell>
                    <TableCell align="right">{org.phone ?? '—'}</TableCell>
                    <TableCell align="left">
                      <IconButton size="small" onClick={() => openEdit(org)}>
                        <Iconify icon="solar:pen-bold" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => deleteOrganization(org.id)}>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {!organizations.length && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Typography color="text.secondary">سازمانی ثبت نشده است</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingOrg ? 'ویرایش سازمان' : 'افزودن سازمان'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Form onSubmit={createPlaceSubmit} method={method}>
            <FormField
              name="name"
              label="نام سازمان"
            // error={!!error}
            // helperText={error}
            />
            <FormField
              name='address'
              label="آدرس "
            />
            <FormField
              name="description"
              label="توضیحات"
            />
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>انصراف</Button>
              <Button variant="contained" type="submit">
                ذخیره
              </Button>
            </DialogActions>
          </Form>
        </DialogContent>

      </Dialog>
    </DashboardContent>
  );
}
