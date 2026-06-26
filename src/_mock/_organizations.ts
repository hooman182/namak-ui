import type { Organization } from 'src/types/organization';

import { _id } from './_mock';

// ----------------------------------------------------------------------

export const _organizations: Organization[] = [
  {
    id: _id(1),
    name: 'وزارت امور اقتصادی و دارایی',
    code: 'MEF-001',
    contactPerson: 'علی رضایی',
    phone: '021-88776655',
  },
  {
    id: _id(2),
    name: 'شرکت ملی نفت ایران',
    code: 'NIOC-002',
    contactPerson: 'مریم احمدی',
    phone: '021-44556677',
  },
  {
    id: _id(3),
    name: 'سازمان تأمین اجتماعی',
    code: 'SSO-003',
    contactPerson: 'حسین کریمی',
    phone: '021-33445566',
  },
  {
    id: _id(4),
    name: 'بانک مرکزی جمهوری اسلامی ایران',
    code: 'CBI-004',
    contactPerson: 'زهرا موسوی',
    phone: '021-55667788',
  },
  {
    id: _id(5),
    name: 'شرکت ایران خودرو',
    code: 'IKCO-005',
    contactPerson: 'رضا نوری',
    phone: '021-77889900',
  },
  {
    id: _id(6),
    name: 'اداره کل مالیات',
    code: 'TAX-006',
    contactPerson: 'فاطمه حسینی',
    phone: '021-11223344',
  },
];
