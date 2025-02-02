import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetDocument } from 'src/api/document';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DucumentNewEditForm from '../document-new-edit-form';

// ----------------------------------------------------------------------

export default function DocumentEditView({ id }) {
  const settings = useSettingsContext();

  const { document: currentDriver } = useGetDocument(id);

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
        heading="EDIT CASE DETAILS"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Documents',
            href: paths.dashboard.LMS_document.root,
          },
          { name: currentDriver?.data.serviceArea },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <DucumentNewEditForm currentDriver={currentDriver} />
    </Container>
    </>
  );
}

DocumentEditView.propTypes = {
  id: PropTypes.string,
};
