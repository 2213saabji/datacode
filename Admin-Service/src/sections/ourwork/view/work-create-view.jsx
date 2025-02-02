import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WorkNewEditForm from '../work-new-edit-form';

// ----------------------------------------------------------------------

export default function WorkCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW WORK"
        links={[
          {
            name: 'Our Work ',
            href: paths.dashboard.work.root,
          },
          { name: 'New Work' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <WorkNewEditForm />
    </Container>
  );
}
