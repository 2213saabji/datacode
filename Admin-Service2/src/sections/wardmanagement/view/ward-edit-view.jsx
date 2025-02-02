import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetWard } from 'src/api/ward';
// import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WardNewEditForm from '../ward-new-edit-form';

// ----------------------------------------------------------------------

export default function WardEditView({ id }) {
  const settings = useSettingsContext();

  // const { product: currentProduct } = useGetProduct(id);

  const { ward: currentWard } = useGetWard(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT WARD DETAILS"
        links={[
          {
            name: 'Ward Management',
            href: paths.dashboard.wardmanagement.root,
          },
          { name: currentWard?.data.wardName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WardNewEditForm currentWard={currentWard} />
    </Container>
  );
}

WardEditView.propTypes = {
  id: PropTypes.string,
};
