import { CONFIG } from 'src/config-global';

import { LetterCreateView } from 'src/sections/letter/view/letter-create-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`ثبت نامه - ${CONFIG.appName}`}</title>
      <LetterCreateView />
    </>
  );
}
