import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetTrip } from 'src/api/trip'; // Changed to useGetTrip

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import TripDriverNewEditForm from '../trip-new-edit-form'; // Changed to TripNewEditForm

// ----------------------------------------------------------------------

export default function TripDriverEditView({ id }) {
  // Changed function name to TripEditView
  const settings = useSettingsContext();

  const { trip: currentTrip } = useGetTrip(id); // Changed to useGetTrip
  //  console.log(currentTrip);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT TRIP DRIVER DETAILS" // Changed heading
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Trip', // Changed to Trip
            href: paths.dashboard.tripdriver.root, // Changed to paths.dashboard.trip.root
          },
          { name: currentTrip?.data.tripId }, // Changed to currentTrip
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TripDriverNewEditForm currentTrip={currentTrip} />
    </Container>
  );
}

TripDriverEditView.propTypes = {
  id: PropTypes.string,
};
