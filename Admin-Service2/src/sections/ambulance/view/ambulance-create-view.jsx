import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AmbulanceNewEditForm from '../ambulance-new-edit-form';

// ----------------------------------------------------------------------

export default function AmbulanceCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW TRIP AMBULANCE"
        links={[
          // {
          //   name: 'Wardvol ',
          //   href: paths.dashboard.wardvol.root,
          // },
          { name: 'New Ambulance ' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AmbulanceNewEditForm />
    </Container>
  );
}
