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

// ----------------------------------------------------------------------

type OrgFormState = {
  name: string;
  code: string;
  contactPerson: string;
  phone: string;
};

const emptyForm: OrgFormState = { name: '', code: '', contactPerson: '', phone: '' };

export function OrganizationListView() {
  const { organizations, addOrganization, updateOrganization, deleteOrganization } = useData();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [form, setForm] = useState<OrgFormState>(emptyForm);
  const [error, setError] = useState('');

  const openCreate = useCallback(() => {
    setEditingOrg(null);
    setForm(emptyForm);
    setError('');
    setDialogOpen(true);
  }, []);

  const openEdit = useCallback((org: Organization) => {
    setEditingOrg(org);
    setForm({
      name: org.name,
      code: org.code ?? '',
      contactPerson: org.contactPerson ?? '',
      phone: org.phone ?? '',
    });
    setError('');
    setDialogOpen(true);
  }, []);

  const handleSave = useCallback(() => {
    if (!form.name.trim()) {
      setError('نام سازمان الزامی است');
      return;
    }
    const data = {
      name: form.name.trim(),
      code: form.code.trim() || undefined,
      contactPerson: form.contactPerson.trim() || undefined,
      phone: form.phone.trim() || undefined,
    };
    if (editingOrg) {
      updateOrganization(editingOrg.id, data);
    } else {
      addOrganization(data);
    }
    setDialogOpen(false);
  }, [addOrganization, editingOrg, form, updateOrganization]);

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
          <TextField
            label="نام سازمان"
            value={form.name}
            error={!!error}
            helperText={error}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
          <TextField
            label="کد / شناسه"
            value={form.code}
            onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
          />
          <TextField
            label="مسئول"
            value={form.contactPerson}
            onChange={(e) => setForm((prev) => ({ ...prev, contactPerson: e.target.value }))}
          />
          <TextField
            label="تلفن"
            value={form.phone}
            onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>انصراف</Button>
          <Button variant="contained" onClick={handleSave}>
            ذخیره
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}
