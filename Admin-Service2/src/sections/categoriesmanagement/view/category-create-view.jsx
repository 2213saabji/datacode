import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CategoryNewEditForm from '../category-new-edit-form';

// ----------------------------------------------------------------------

export default function CategoryCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW CATEGORY"
        links={[
          {
            name: 'Categories Management',
            href: paths.dashboard.category.root,
          },
          { name: 'New Category' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <CategoryNewEditForm />
    </Container>
  );
}
