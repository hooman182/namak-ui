import { CONFIG } from 'src/config-global';

import { OrganizationListView } from 'src/sections/organization/view/organization-list-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`سازمان‌ها - ${CONFIG.appName}`}</title>
      <OrganizationListView />
    </>
  );
}
