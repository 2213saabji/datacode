import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AmbulanceTripNewEditForm from '../ambulance-trip-new-edit-form';

// ----------------------------------------------------------------------

export default function AmbulanceTripCreateView() {
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
        heading="BOOK AMBULANCE"
        links={[
          // {
          //   name: 'Wardvol ',
          //   href: paths.dashboard.wardvol.root,
          // },
          { name: 'New Book' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <AmbulanceTripNewEditForm />
    </Container>
  );
}
