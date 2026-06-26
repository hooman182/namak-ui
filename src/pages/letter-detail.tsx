import { CONFIG } from 'src/config-global';

import { LetterDetailView } from 'src/sections/letter/view/letter-detail-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`جزئیات نامه - ${CONFIG.appName}`}</title>
      <LetterDetailView />
    </>
  );
}
