import type { OrganizationDataType } from 'src/types/organization';

import { useState, useCallback } from 'react';

import Table from '@mui/material/Table';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

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
              <TableCell>نام سازمان</TableCell>
              <TableCell>آدرس</TableCell>
              <TableCell>توضیحات</TableCell>
              <TableCell width={100} />
            </TableRow>
          </TableHead>
          <TableBody>
            {organizations.map((org) => (
              <OrganizationTableRow
                key={org.id}
                organization={org}
                onEdit={onEdit}
                onDelete={onDelete}
              />
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

interface OrganizationTableRowProps {
  organization: OrganizationDataType;
  onEdit: (org: OrganizationDataType) => void;
  onDelete: (id: string) => void;
}

function OrganizationTableRow({
  organization,
  onEdit,
  onDelete,
}: OrganizationTableRowProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleEdit = useCallback(() => {
    handleClosePopover();
    onEdit(organization);
  }, [handleClosePopover, onEdit, organization]);

  const handleDelete = useCallback(() => {
    handleClosePopover();
    onDelete(organization.id);
  }, [handleClosePopover, onDelete, organization.id]);

  return (
    <>
      <TableRow hover>
        <TableCell>{organization.name}</TableCell>
        <TableCell>{organization.address ?? '—'}</TableCell>
        <TableCell>{organization.description ?? '—'}</TableCell>
        <TableCell>
          <IconButton
            size="small"
            aria-label="باز کردن منوی عملیات"
            aria-haspopup="true"
            aria-expanded={!!anchorEl}
            onClick={handleOpenPopover}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            ویرایش
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            حذف
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
