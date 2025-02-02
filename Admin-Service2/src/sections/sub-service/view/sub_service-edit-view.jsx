import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import {useGetService } from 'src/api/sub-service';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SubServiceNewEditForm from '../sub-service-new-edit-form';

// ----------------------------------------------------------------------

export default function SubServiceEditView({ id }) {
  const settings = useSettingsContext();

  const { subservice: currentDriver } = useGetService(id);

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
        heading="EDIT SUB SERVICE DETAILS"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Sub Service',
            href: paths.dashboard.LMS_sub_service.root,
          },
          { name: currentDriver?.data.serviceArea },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SubServiceNewEditForm currentDriver={currentDriver} />
    </Container>
    </>
  );
}

SubServiceEditView.propTypes = {
  id: PropTypes.string,
};
