import { Iconify } from '@/components/iconify/iconify';

// ----------------------------------------------------------------------

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData: NavItem[] = [
  {
    title: 'داشبورد',
    path: '/',
    icon: <Iconify width={24} icon="solar:home-angle-bold-duotone" />,
  },
  {
    title: 'نامه‌ها',
    path: '/letters',
    icon: <Iconify width={24} icon="solar:letter-bold-duotone" />,
  },
  {
    title: 'ثبت نامه',
    path: '/letters/new',
    icon: <Iconify width={24} icon="mingcute:add-line" />,
  },
  {
    title: 'سازمان‌ها',
    path: '/organizations',
    icon: <Iconify width={24} icon="solar:buildings-2-bold-duotone" />,
  },
];
