import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetService } from 'src/api/case';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CaseNewEditForm from '../case-new-edit-form';

// ----------------------------------------------------------------------

export default function CaseEditView({ id }) {
  const settings = useSettingsContext();

  const { document: currentDriver } = useGetService(id);

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
            name: 'Case',
            href: paths.dashboard.LMS_case.root,
          },
          { name: currentDriver?.data.serviceArea },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CaseNewEditForm currentDriver={currentDriver} />
    </Container>
    </>
  );
}

CaseEditView.propTypes = {
  id: PropTypes.string,
};
