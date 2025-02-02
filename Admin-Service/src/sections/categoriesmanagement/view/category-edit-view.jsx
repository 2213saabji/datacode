import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetCategory } from 'src/api/exp_category';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CategoryNewEditForm from '../category-new-edit-form';

// ----------------------------------------------------------------------

export default function CategoryEditView({ id }) {
  const settings = useSettingsContext();

  const { category: currentCategory } = useGetCategory(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT CATEGORY DETAILS"
        links={[
          {
            name: 'Categories Management',
            href: paths.dashboard.category.root,
          },
          { name: currentCategory?.data.expenseCategoryName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CategoryNewEditForm currentCategory={currentCategory} />
    </Container>
  );
}

CategoryEditView.propTypes = {
  id: PropTypes.string,
};
