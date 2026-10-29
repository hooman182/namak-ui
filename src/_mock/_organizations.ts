import type { OrganizationDataType } from 'src/types/organization';

import { _id } from './_mock';

// ----------------------------------------------------------------------

export const _organizations: OrganizationDataType[] = [
  {
    id: _id(1),
    name: 'وزارت امور اقتصادی و دارایی',
    address: 'MEF-001',
    description: 'علی رضایی',
  },
  {
    id: _id(2),
    name: 'شرکت ملی نفت ایران',
    address: 'NIOC-002',
    description: 'مریم احمدی',
  },
  {
    id: _id(3),
    name: 'سازمان تأمین اجتماعی',
    address: 'SSO-003',
    description: 'حسین کریمی',
  },
  {
    id: _id(4),
    name: 'بانک مرکزی جمهوری اسلامی ایران',
    address: 'CBI-004',
    description: 'زهرا موسوی',
  },
  {
    id: _id(5),
    name: 'شرکت ایران خودرو',
    address: 'IKCO-005',
    description: 'رضا نوری',
  },
  {
    id: _id(6),
    name: 'اداره کل مالیات',
    address: 'TAX-006',
    description: 'فاطمه حسینی',
  },
];
