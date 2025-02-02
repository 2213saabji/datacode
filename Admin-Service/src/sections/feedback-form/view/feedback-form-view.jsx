import React from 'react';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeedbackNewEditForm from '../feedback-new-edit-form';

export default function FeedbackForm() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading=" SHARE YOUR SUGGESTION"
        links={[
          { name: 'DASHBOARD', href: paths.dashboard.root },
          { name: 'SUGGESTION BOX', href: paths.dashboard.FeedbackForm },
        ]}
        sx={{ mb: { xs: 3, md: 5 }, mt: 3 }}
      />
      <FeedbackNewEditForm />
    </Container>
  );
}
