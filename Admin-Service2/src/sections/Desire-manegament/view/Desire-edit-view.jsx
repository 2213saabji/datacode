import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetDesire } from 'src/api/desire';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AppointmentNewEditForm from '../Desire-new-edit-form';

// ----------------------------------------------------------------------

export default function DesireEditView({ id }) {
  const settings = useSettingsContext();

  const { Desires: currentappointment } = useGetDesire(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT DESIRE  DETAILS"
        links={[
          {
            name: 'Desire  Management',
            href: paths.dashboard.Desire.root,
          },
          { name: currentappointment?.data.desire },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <AppointmentNewEditForm currentappointment={currentappointment} />
    </Container>
  );
}

DesireEditView.propTypes = {
  id: PropTypes.string,
};
