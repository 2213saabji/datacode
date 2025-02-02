import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { useGetCandidate } from 'src/api/candidate';
import { useGetService } from 'src/api/vms';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ServiceVersionNewEditForm from '../service-version-new-edit-form';

// ----------------------------------------------------------------------

export default function ServiceVersionEditView({ id }) {
  // console.log("id -> ", id)

  const settings = useSettingsContext();

  const { versions: currentversions } = useGetService(id);

  // console.log("currentversions -> ", currentversions)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Service version Details"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: ' Service Version',
            href: paths.dashboard.serviceversion.root,
          },
          { name: currentversions?.data.serviceName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ServiceVersionNewEditForm currentversions={currentversions} />
    </Container>
  );
}

ServiceVersionEditView.propTypes = {
  id: PropTypes.string,
};
