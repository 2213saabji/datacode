import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetLawyer } from 'src/api/lawyer';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverNewEditForm from '../lawyer-new-edit-form';

// ----------------------------------------------------------------------

export default function LawyerEditView({ id }) {
  const settings = useSettingsContext();

  const { lawyer: currentDriver } = useGetLawyer(id);

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
          heading="EDIT LAWYER DETAILS"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Lawyer',
              href: paths.dashboard.lawyer.root,
            },
            { name: currentDriver?.data.serviceArea },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <DriverNewEditForm currentDriver={currentDriver} />
      </Container>
    </>
  );
}

LawyerEditView.propTypes = {
  id: PropTypes.string,
};
