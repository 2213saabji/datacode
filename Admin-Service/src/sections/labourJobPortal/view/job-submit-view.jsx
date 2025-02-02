import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobSubmitEditForm from '../job-submit-edit-form';

// ----------------------------------------------------------------------

export default function JobSubmitView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="FILL SURVEY"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Submited Surveys',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobSubmitEditForm />
    </Container>
  );
}
