import type { Organization } from 'src/types/organization';

import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

interface OrganizationListTableProps {
  organizations: Organization[];
  onEdit: (org: Organization) => void;
  onDelete: (id: string) => void;
}

// ----------------------------------------------------------------------

export function OrganizationListTable({
  organizations,
  onEdit,
  onDelete,
}: OrganizationListTableProps) {
  return (
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
                  <IconButton size="small" onClick={() => onEdit(org)}>
                    <Iconify icon="solar:pen-bold" />
                  </IconButton>
                  <IconButton size="small" color="error" onClick={() => onDelete(org.id)}>
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
  );
}
