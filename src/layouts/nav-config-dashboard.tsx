import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

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
    icon: icon('ic-analytics'),
  },
  {
    title: 'نامه‌ها',
    path: '/letters',
    icon: icon('ic-blog'),
  },
  {
    title: 'ثبت نامه',
    path: '/letters/new',
    icon: icon('ic-cart'),
  },
  {
    title: 'سازمان‌ها',
    path: '/organizations',
    icon: icon('ic-user'),
  },
  {
    title: 'ورود',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
];
