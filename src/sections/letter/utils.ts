import type { Letter, LetterDirection } from 'src/types/letter';

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

export function getLetterComparator(
  order: 'asc' | 'desc',
  orderBy: keyof Letter | 'attachments'
): (a: Letter, b: Letter) => number {
  return (a, b) => {
    let aVal: string | number = '';
    let bVal: string | number = '';

    if (orderBy === 'attachments') {
      aVal = a.attachments.length;
      bVal = b.attachments.length;
    } else {
      const key = orderBy as keyof Letter;
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
  inputData: Letter[];
  comparator: (a: Letter, b: Letter) => number;
  filterName: string;
  filterDirection: LetterDirection | 'all';
  filterOrganizationId: string;
  getOrganizationName: (id: string) => string;
};

export function applyFilter({
  inputData,
  comparator,
  filterName,
  filterDirection,
  filterOrganizationId,
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

  return result;
}
