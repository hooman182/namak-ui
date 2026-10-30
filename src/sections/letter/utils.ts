import type { LetterDataType, LetterDirection } from 'src/types/letter';

import { subMonths, endOfMonth, startOfMonth } from 'date-fns-jalali';

// ----------------------------------------------------------------------

export type LetterDateRange = {
  from: string;
  to: string;
};

export function formatDateFilterValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function parseDateFilterValue(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;

  const [, yearString, monthString, dayString] = match;
  const year = Number(yearString);
  const month = Number(monthString);
  const day = Number(dayString);
  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
    ? date
    : null;
}

export function getLastMonthDateRange(date = new Date()): LetterDateRange {
  const lastMonth = subMonths(date, 1);

  return {
    from: formatDateFilterValue(startOfMonth(lastMonth)),
    to: formatDateFilterValue(endOfMonth(lastMonth)),
  };
}

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

export function getLetterComparator(
  order: 'asc' | 'desc',
  orderBy: keyof LetterDataType | 'attachments'
): (a: LetterDataType, b: LetterDataType) => number {
  return (a, b) => {
    let aVal: string | number = '';
    let bVal: string | number = '';

    if (orderBy === 'attachments') {
      aVal = a.attachments.length;
      bVal = b.attachments.length;
    } else {
      const key = orderBy as keyof LetterDataType;
      const av = a[key];
      const bv = b[key];
      aVal = typeof av === 'string' || typeof av === 'number' ? av : String(av ?? '');
      bVal = typeof bv === 'string' || typeof bv === 'number' ? bv : String(bv ?? '');
    }

    if (bVal < aVal) return order === 'desc' ? -1 : 1;
    if (bVal > aVal) return order === 'desc' ? 1 : -1;
    return 0;
  };
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: LetterDataType[];
  comparator: (a: LetterDataType, b: LetterDataType) => number;
  filterName: string;
  filterDirection: LetterDirection | 'all';
  filterOrganizationId: string;
  filterDateFrom: string;
  filterDateTo: string;
  getOrganizationName: (id: string) => string;
};

export function applyFilter({
  inputData,
  comparator,
  filterName,
  filterDirection,
  filterOrganizationId,
  filterDateFrom,
  filterDateTo,
  getOrganizationName,
}: ApplyFilterProps) {
  const stabilized = inputData.map((el, index) => [el, index] as const);

  stabilized.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  let result = stabilized.map((el) => el[0]);

  if (filterName) {
    const query = filterName.toLowerCase();
    result = result.filter(
      (letter) =>
        letter.subject.toLowerCase().includes(query) ||
        letter.letterNumber.toLowerCase().includes(query) ||
        getOrganizationName(letter.organizationId).toLowerCase().includes(query)
    );
  }

  if (filterDirection !== 'all') {
    result = result.filter((letter) => letter.direction === filterDirection);
  }

  if (filterOrganizationId) {
    result = result.filter((letter) => letter.organizationId === filterOrganizationId);
  }

  if (filterDateFrom) {
    result = result.filter((letter) => letter.letterDate >= filterDateFrom);
  }

  if (filterDateTo) {
    result = result.filter((letter) => letter.letterDate <= filterDateTo);
  }

  return result;
}
