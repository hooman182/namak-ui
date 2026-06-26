import { Iconify } from 'src/components/iconify';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'داشبورد',
    href: '/',
    icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
  },
  {
    label: 'نامه‌ها',
    href: '/letters',
    icon: <Iconify width={22} icon="solar:chat-round-dots-bold" />,
  },
  {
    label: 'تنظیمات',
    href: '#',
    icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
  },
];
