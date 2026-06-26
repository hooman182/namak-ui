import { CONFIG } from 'src/config-global';

import { LetterListView } from 'src/sections/letter/view/letter-list-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`نامه‌ها - ${CONFIG.appName}`}</title>
      <LetterListView />
    </>
  );
}
