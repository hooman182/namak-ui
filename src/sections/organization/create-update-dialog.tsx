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


export default () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{editingOrg ? 'ویرایش سازمان' : 'افزودن سازمان'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
        <TextField
          label="نام سازمان"
          value={form.place}
          error={!!error}
          helperText={error}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
        <TextField
          label="آدرس "
          value={form.address}
          onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
        />
        <TextField
          label="توضیحات"
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, contactPerson: e.target.value }))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>انصراف</Button>
        <Button variant="contained" onClick={handleSave}>
          ذخیره
        </Button>
      </DialogActions>
    </Dialog>)
  )
}
