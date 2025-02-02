import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverNewEditForm from '../driver-new-edit-form';

// ----------------------------------------------------------------------

export default function DriverCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard/driver"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="CREATE A NEW DRIVER"
        links={[
          {
            name: 'Driver ',
            href: paths.dashboard.driver.root,
          },
          { name: 'New Driver' },
        ]}
        sx={{
          mb: { xs: 3, md: 3 },
          mt: '20px',
        }}
      />
      <DriverNewEditForm />
    </Container>
  );
}
