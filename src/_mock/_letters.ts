import type { Letter } from 'src/types/letter';

import { _id } from './_mock';
import { _organizations } from './_organizations';

// ----------------------------------------------------------------------

export const _letters: Letter[] = [
  {
    id: _id(101),
    subject: 'درخواست تأیید قرارداد همکاری',
    letterNumber: '۱۴۰۳/۱۲۵۰',
    direction: 'incoming',
    organizationId: _organizations[0].id,
    letterDate: '2024-03-15',
    description: 'نامه رسمی درخواست تأیید قرارداد سالانه',
    attachments: [
      {
        id: _id(201),
        name: 'contract-request.pdf',
        mimeType: 'application/pdf',
        size: 245000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-03-15T10:30:00Z',
  },
  {
    id: _id(102),
    subject: 'پاسخ به استعلام بیمه',
    letterNumber: '۱۴۰۳/۱۲۵۱',
    direction: 'outgoing',
    organizationId: _organizations[2].id,
    letterDate: '2024-03-18',
    description: 'ارسال مدارک بیمه کارکنان',
    attachments: [
      {
        id: _id(202),
        name: 'insurance-docs.pdf',
        mimeType: 'application/pdf',
        size: 512000,
        previewUrl: '',
      },
      {
        id: _id(203),
        name: 'employee-list.jpg',
        mimeType: 'image/jpeg',
        size: 89000,
        previewUrl: '/assets/images/avatar/avatar-1.webp',
      },
    ],
    createdAt: '2024-03-18T14:00:00Z',
  },
  {
    id: _id(103),
    subject: 'اعلامیه تغییرات سهامداران',
    letterNumber: '۱۴۰۳/۱۲۵۲',
    direction: 'incoming',
    organizationId: _organizations[3].id,
    letterDate: '2024-04-02',
    attachments: [
      {
        id: _id(204),
        name: 'shareholder-notice.pdf',
        mimeType: 'application/pdf',
        size: 178000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-04-02T09:15:00Z',
  },
  {
    id: _id(104),
    subject: 'درخواست خرید تجهیزات',
    letterNumber: '۱۴۰۳/۱۲۵۳',
    direction: 'outgoing',
    organizationId: _organizations[4].id,
    letterDate: '2024-04-10',
    description: 'نامه رسمی درخواست خرید ۵ دستگاه خودرو',
    attachments: [
      {
        id: _id(205),
        name: 'purchase-order.pdf',
        mimeType: 'application/pdf',
        size: 320000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-04-10T11:45:00Z',
  },
  {
    id: _id(105),
    subject: 'ابلاغیه مالیاتی فصل اول',
    letterNumber: '۱۴۰۳/۱۲۵۴',
    direction: 'incoming',
    organizationId: _organizations[5].id,
    letterDate: '2024-04-22',
    attachments: [
      {
        id: _id(206),
        name: 'tax-notice.pdf',
        mimeType: 'application/pdf',
        size: 156000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-04-22T08:00:00Z',
  },
  {
    id: _id(106),
    subject: 'گزارش عملکرد فصلی',
    letterNumber: '۱۴۰۳/۱۲۵۵',
    direction: 'outgoing',
    organizationId: _organizations[1].id,
    letterDate: '2024-05-05',
    description: 'ارسال گزارش عملکرد سه‌ماهه اول',
    attachments: [
      {
        id: _id(207),
        name: 'quarterly-report.pdf',
        mimeType: 'application/pdf',
        size: 890000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-05-05T16:30:00Z',
  },
  {
    id: _id(107),
    subject: 'دعوتنامه جلسه هیئت مدیره',
    letterNumber: '۱۴۰۳/۱۲۵۶',
    direction: 'incoming',
    organizationId: _organizations[0].id,
    letterDate: '2024-05-12',
    attachments: [
      {
        id: _id(208),
        name: 'meeting-invitation.jpg',
        mimeType: 'image/jpeg',
        size: 67000,
        previewUrl: '/assets/images/avatar/avatar-2.webp',
      },
    ],
    createdAt: '2024-05-12T10:00:00Z',
  },
  {
    id: _id(108),
    subject: 'تأییدیه حساب بانکی',
    letterNumber: '۱۴۰۳/۱۲۵۷',
    direction: 'outgoing',
    organizationId: _organizations[3].id,
    letterDate: '2024-05-20',
    attachments: [
      {
        id: _id(209),
        name: 'bank-confirmation.pdf',
        mimeType: 'application/pdf',
        size: 98000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-05-20T13:20:00Z',
  },
  {
    id: _id(109),
    subject: 'نامه رسمی درخواست تسهیلات',
    letterNumber: '۱۴۰۳/۱۲۵۸',
    direction: 'incoming',
    organizationId: _organizations[4].id,
    letterDate: '2024-06-01',
    description: 'درخواست تسهیلات بانکی برای پروژه جدید',
    attachments: [
      {
        id: _id(210),
        name: 'facility-request.pdf',
        mimeType: 'application/pdf',
        size: 445000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-06-01T09:00:00Z',
  },
  {
    id: _id(110),
    subject: 'پاسخ به نامه شماره ۱۲۵۰',
    letterNumber: '۱۴۰۳/۱۲۵۹',
    direction: 'outgoing',
    organizationId: _organizations[0].id,
    letterDate: '2024-06-10',
    attachments: [
      {
        id: _id(211),
        name: 'reply-letter.pdf',
        mimeType: 'application/pdf',
        size: 210000,
        previewUrl: '',
      },
    ],
    createdAt: '2024-06-10T15:45:00Z',
  },
];
