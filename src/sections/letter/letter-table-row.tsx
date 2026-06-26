import type { Letter } from 'src/types/letter';

import { useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { useRouter } from 'src/routes/hooks';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import { LETTER_DIRECTION_LABELS } from 'src/types/letter';

// ----------------------------------------------------------------------

type LetterTableRowProps = {
  row: Letter;
  selected: boolean;
  organizationName: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function LetterTableRow({
  row,
  selected,
  organizationName,
  onSelectRow,
  onDeleteRow,
}: LetterTableRowProps) {
  const router = useRouter();
  const { open, anchorEl, onClose, onOpen } = usePopover();

  const handleView = useCallback(() => {
    onClose();
    router.push(`/letters/${row.id}`);
  }, [onClose, router, row.id]);

  const handleEdit = useCallback(() => {
    onClose();
    router.push(`/letters/${row.id}?edit=1`);
  }, [onClose, router, row.id]);

  const handleDelete = useCallback(() => {
    onClose();
    onDeleteRow();
  }, [onClose, onDeleteRow]);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell align="right">{row.letterNumber}</TableCell>
        <TableCell align="right">{row.subject}</TableCell>
        <TableCell align="center">
          <Label color={row.direction === 'incoming' ? 'info' : 'success'}>
            {LETTER_DIRECTION_LABELS[row.direction]}
          </Label>
        </TableCell>
        <TableCell align="right">{organizationName}</TableCell>
        <TableCell align="right">{fDate(row.letterDate)}</TableCell>
        <TableCell align="center">
          <Label variant="soft" color="default">
            {row.attachments.length}
          </Label>
        </TableCell>
        <TableCell align="left">
          <IconButton onClick={onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
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
          <MenuItem onClick={handleView}>
            <Iconify icon="solar:eye-bold" />
            مشاهده
          </MenuItem>
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
