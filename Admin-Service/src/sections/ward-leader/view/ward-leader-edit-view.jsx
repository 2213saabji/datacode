import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetTrip } from 'src/api/wardleader'; // Changed to useGetTrip

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WardLeaderNewEditForm from '../ward-leader-new-edit-form'; // Changed to TripNewEditForm

// ----------------------------------------------------------------------

export default function WardLeaderEditView({ id }) {
  // Changed function name to TripEditView
  const settings = useSettingsContext();
  const [trip, setCurrentTrip] = useState({});

  // Changed to useGetTrip
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetTrip(id).then((res) => {
      console.log(res);
      setCurrentTrip(res);
    });
  }, [id]);
  //  console.log(trip);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="ASSIGN DRIVER" // Changed heading
        links={[
          {
            name: 'Trip', // Changed to Trip
            href: paths.dashboard.trip.managedList, // Changed to paths.dashboard.trip.root
          },
          { name: trip?.tripId }, // Changed to currentTrip
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WardLeaderNewEditForm currentTrip={trip} />
    </Container>
  );
}

WardLeaderEditView.propTypes = {
  id: PropTypes.string,
};
