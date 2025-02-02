import PropTypes from 'prop-types';
// import { useState ,useEffect } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetTripsManaged } from 'src/api/trip'; // Changed to useGetTrip

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import TripNewEditForm from '../trip-new-edit-form'; // Changed to TripNewEditForm

// ----------------------------------------------------------------------

export default function TripEditView({ id }) {
  // Changed function name to TripEditView
  const settings = useSettingsContext();
  // const [trip,setCurrentTrip] = useState({});

  const { trip: currentTrip } = useGetTripsManaged(id); // Changed to useGetTrip
  console.log(currentTrip);

  //  useEffect(()=>{
  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   useGetTripsManaged(id).then(res=>{
  //     setCurrentTrip(res);
  //   })
  // },[id])
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT TRIP DETAILS" // Changed heading
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Trip', // Changed to Trip
            href: paths.dashboard.trip.managedList, // Changed to paths.dashboard.trip.root
          },
          { name: currentTrip?.data.tripId }, // Changed to currentTrip
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TripNewEditForm currentTrip={currentTrip} />
    </Container>
  );
}

TripEditView.propTypes = {
  id: PropTypes.string,
};
