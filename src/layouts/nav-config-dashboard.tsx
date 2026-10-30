import { Iconify } from '@/components/iconify/iconify';

// ----------------------------------------------------------------------

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
  mobilePrimary?: boolean;
};

export const navData: NavItem[] = [
  {
    title: 'داشبورد',
    path: '/',
    icon: <Iconify width={24} icon="solar:home-angle-bold-duotone" />,
    mobilePrimary: true,
  },
  {
    title: 'نامه‌ها',
    path: '/letters',
    icon: <Iconify width={24} icon="solar:letter-bold-duotone" />,
    mobilePrimary: true,
  },
  {
    title: 'ثبت نامه',
    path: '/letters/new',
    icon: <Iconify width={24} icon="mingcute:add-line" />,
    mobilePrimary: true,
  },
  {
    title: 'سازمان‌ها',
    path: '/organizations',
    icon: <Iconify width={24} icon="solar:buildings-2-bold-duotone" />,
  },
];

export const mobileNavData = navData.filter((item) => item.mobilePrimary);
export const mobileMoreNavData = navData.filter((item) => !item.mobilePrimary);
