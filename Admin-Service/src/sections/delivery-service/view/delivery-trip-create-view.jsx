import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DeliveryNewEditForm from '../delivery-new-edit-form';

// ----------------------------------------------------------------------

export default function DeliveryCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="DELIVERY REQUEST"
        links={[
          // {
          //   name: 'Wardvol ',
          //   href: paths.dashboard.wardvol.root,
          // },
          { name: 'New Request' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <DeliveryNewEditForm />
    </Container>
  );
}
