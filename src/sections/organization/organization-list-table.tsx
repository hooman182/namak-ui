import type { OrganizationDataType } from 'src/types/organization';

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
  organizations: OrganizationDataType[];
  onEdit: (org: OrganizationDataType) => void;
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
              <TableCell >نام سازمان</TableCell>
              <TableCell >آدرس</TableCell>
              <TableCell >توضیحات</TableCell>
              <TableCell  width={100} />
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id} hover>
                <TableCell >{org.name}</TableCell>
                <TableCell >{org.address ?? '—'}</TableCell>
                <TableCell >{org.description ?? '—'}</TableCell>
                <TableCell >
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
