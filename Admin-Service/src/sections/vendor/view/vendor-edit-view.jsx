import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetVendor } from 'src/api/vendor';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VendorNewEditForm from '../vendor-new-edit-form';

// ----------------------------------------------------------------------

export default function VendorEditView({ id }) {
  const settings = useSettingsContext();

  const { vendor: currentDriver } = useGetVendor(id);

  return (
    <>
    <Button
            component={RouterLink}
            to="/dashboard"
            variant="outlined"
            color="primary"
            style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
          >
            Back
          </Button>
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT VENDOR DETAILS"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Vendor',
            href: paths.dashboard.lms_vendor.root,
          },
          { name: currentDriver?.data.fullName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VendorNewEditForm currentDriver={currentDriver} />
    </Container>
    </>
  );
}

VendorEditView.propTypes = {
  id: PropTypes.string,
};
