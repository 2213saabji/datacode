import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ModelNewEditForm from '../model-new-edit-form';

// ----------------------------------------------------------------------

export default function ModelCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW MODAL"
        links={[
          {
            name: 'Modal ',
            href: paths.dashboard.model.root,
          },
          { name: 'New Work' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ModelNewEditForm />
    </Container>
  );
}
