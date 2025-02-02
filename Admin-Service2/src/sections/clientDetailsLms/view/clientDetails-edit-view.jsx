import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetClient } from 'src/api/clientLms';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClientNewEditForm from '../clientDetails-new-edit-form';

// ----------------------------------------------------------------------

export default function ClientDetailsEditView({ id }) {
  const settings = useSettingsContext();

  const { client: currentClient } = useGetClient(id);

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
          heading="EDIT CLIENT DETAILS"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Client',
              href: paths.dashboard.Lms_client.root,
            },
            { name: currentClient?.data.companyName },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ClientNewEditForm currentClient={currentClient} />
      </Container>
    </>
  );
}

ClientDetailsEditView.propTypes = {
  id: PropTypes.string,
};
