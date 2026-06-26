import { CONFIG } from 'src/config-global';

import { DashboardView } from 'src/sections/dashboard/view/dashboard-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`داشبورد - ${CONFIG.appName}`}</title>
      <meta name="description" content="مدیریت نامه‌های وارده و صادره" />
      <DashboardView />
    </>
  );
}
