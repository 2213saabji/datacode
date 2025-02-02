import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductMappingNewEditForm from '../product-mapping-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductMappingCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="MAPPING PRODUCTS & ROLES"
        links={[
          {
            name: 'Mapping',
            href: paths.dashboard.party.root,
          },
          { name: 'Roles' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {/* <PartyNewEditForm /> */}
      <ProductMappingNewEditForm />
    </Container>
  );
}
