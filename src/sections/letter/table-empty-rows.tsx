import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

type TableEmptyRowsProps = {
  emptyRows: number;
  height?: number;
};

export function TableEmptyRows({ emptyRows, height = 68 }: TableEmptyRowsProps) {
  if (!emptyRows) return null;

  return (
    <TableRow sx={{ height: height * emptyRows }}>
      <TableCell colSpan={8} />
    </TableRow>
  );
}
