
import { OrganizationView } from '@/sections/organization/view/organization-view';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`سازمان‌ها - ${CONFIG.appName}`}</title>
      <OrganizationView />
    </>
  );
}
