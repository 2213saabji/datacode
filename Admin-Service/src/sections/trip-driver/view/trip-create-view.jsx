import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import MaxWidthDialog from 'src/sections/_examples/mui/dialog-view/max-width-dialog';

import TripDriverNewEditForm from '../trip-new-edit-form';
// ----------------------------------------------------------------------

export default function TripDriverCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW TRIPDRIVER"
        links={[
          {
            name: 'TripDriver ',
            href: paths.dashboard.tripdriver.root,
          },
          { name: 'New TripDriver' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <TripDriverNewEditForm />
      {/* <MaxWidthDialog/> */}
    </Container>
  );
}
