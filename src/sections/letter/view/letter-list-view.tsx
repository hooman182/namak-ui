import type { Letter, LetterDirection } from 'src/types/letter';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import { useData } from 'src/contexts/data-context';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { TableNoData } from '../table-no-data';
import { LetterTableRow } from '../letter-table-row';
import { TableEmptyRows } from '../table-empty-rows';
import { LetterTableHead } from '../letter-table-head';
import { LetterTableToolbar } from '../letter-table-toolbar';
import { emptyRows, applyFilter, getLetterComparator } from '../utils';

// ----------------------------------------------------------------------

export function LetterListView() {
  const router = useRouter();
  const { letters, organizations, getOrganizationName, deleteLetter } = useData();
  const table = useTable();

  const [filterName, setFilterName] = useState('');
  const [filterDirection, setFilterDirection] = useState<LetterDirection | 'all'>('all');
  const [filterOrganizationId, setFilterOrganizationId] = useState('');

  const dataFiltered = applyFilter({
    inputData: letters,
    comparator: getLetterComparator(
      table.order,
      table.orderBy as keyof Letter | 'attachments'
    ),
    filterName,
    filterDirection,
    filterOrganizationId,
    getOrganizationName,
  });

  const notFound = !dataFiltered.length && (!!filterName || filterDirection !== 'all' || !!filterOrganizationId);

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          نامه‌ها
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => router.push('/letters/new')}
        >
          ثبت نامه جدید
        </Button>
      </Box>

      <Card>
        <LetterTableToolbar
          filterName={filterName}
          filterDirection={filterDirection}
          filterOrganizationId={filterOrganizationId}
          organizations={organizations}
          onFilterName={(event) => {
            setFilterName(event.target.value);
            table.onResetPage();
          }}
          onFilterDirection={(value) => {
            setFilterDirection(value);
            table.onResetPage();
          }}
          onFilterOrganization={(id) => {
            setFilterOrganizationId(id);
            table.onResetPage();
          }}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 960 }}>
              <LetterTableHead
                order={table.order}
                orderBy={table.orderBy}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((letter) => letter.id)
                  )
                }
                headLabel={[
                  { id: 'letterNumber', label: 'شماره نامه' },
                  { id: 'subject', label: 'موضوع' },
                  { id: 'direction', label: 'نوع', align: 'center' },
                  { id: 'organizationId', label: 'سازمان' },
                  { id: 'letterDate', label: 'تاریخ' },
                  { id: 'attachments', label: 'پیوست', align: 'center' },
                  { id: '', label: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <LetterTableRow
                      key={row.id}
                      row={row}
                      organizationName={getOrganizationName(row.organizationId)}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => deleteLetter(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />

                {notFound && <TableNoData searchQuery={filterName} />}
                {!dataFiltered.length && !notFound && <TableNoData />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          component="div"
          page={table.page}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          labelRowsPerPage="تعداد در صفحه:"
          labelDisplayedRows={({ from, to, count }) => `${from}–${to} از ${count}`}
        />
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

function useTable() {
  const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('letterDate');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    setSelected(checked ? newSelecteds : []);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      setSelected((prev) =>
        prev.includes(inputValue) ? prev.filter((v) => v !== inputValue) : [...prev, inputValue]
      );
    },
    []
  );

  const onResetPage = useCallback(() => setPage(0), []);

  const onChangePage = useCallback((_: unknown, newPage: number) => setPage(newPage), []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
  };
}
