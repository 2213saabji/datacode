import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useAuthContext } from 'src/auth/hooks';
import { useGetProductRole } from 'src/api/product_roles';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductRoleEditView({ id }) {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const { user: currentProductDetail } = useGetProductRole(id, user.accessToken);
  // console.log("currentProductDetail",currentProductDetail)
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT PRODUCT ROLE"
        links={[
          {
            name: 'Product',
            href: paths.dashboard.userRoleManagement.root,
          },
          {
            name: 'Edit',
            href: paths.dashboard.userRoleManagement.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentRole={currentProductDetail} />
    </Container>
  );
}

ProductRoleEditView.propTypes = {
  id: PropTypes.string,
};
