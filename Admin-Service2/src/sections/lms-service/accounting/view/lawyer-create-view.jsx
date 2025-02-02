import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LawyerNewEditForm from '../lawyer-new-edit-form';

// ----------------------------------------------------------------------

export default function LawyerCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW LAWYER"
        links={[
        
          {
            name: 'Lawyer ',
            href: paths.dashboard.lawyer.root,
          },
          { name: 'New Lawyer' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <LawyerNewEditForm />
    </Container>
  );
}
