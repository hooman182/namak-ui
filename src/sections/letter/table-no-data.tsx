import type { TableRowProps } from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type TableNoDataProps = TableRowProps & {
  searchQuery?: string;
  colSpan?: number;
};

export function TableNoData({ searchQuery, colSpan = 7, ...other }: TableNoDataProps) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={colSpan}>
        <Box sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {searchQuery ? 'نتیجه‌ای یافت نشد' : 'نامه‌ای ثبت نشده است'}
          </Typography>
          {searchQuery && (
            <Typography variant="body2" color="text.secondary">
              برای «{searchQuery}» نتیجه‌ای پیدا نشد. عبارت دیگری امتحان کنید.
            </Typography>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
}
