import React from 'react';

import { Container } from '@mui/system';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

export default function AddFakeVoting() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <EmptyContent title="Coming Soon..." description="The UI is coming soon." sx={{ py: 0 }} />
    </Container>
  );
}
