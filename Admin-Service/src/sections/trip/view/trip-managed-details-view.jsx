import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetTripManaged } from 'src/api/trip'; // Changed to useGetTrip
import { initializeApp } from 'firebase/app';
import { ref, onValue, getDatabase } from 'firebase/database';

import { useAuthContext } from 'src/auth/hooks';
import {
  // ATTPL_TMS_HOST_API,
  ATTPL_TMS_FIREBASE_APP_ID,
  ATTPL_TMS_FIREBASE_API_KEY,
  ATTPL_TMS_FIREBASE_PROJECT_ID,
  ATTPL_TMS_FIREBASE_AUTH_DOMAIN,
  ATTPL_TMS_FIREBASE_DATABASE_URL,
  ATTPL_TMS_FIREBASE_MESUREMENT_ID,
  ATTPL_TMS_FIREBASE_STORAGE_BUCKET,
  ATTPL_TMS_FIREBASE_MESSAGING_SENDER_ID,
} from 'src/config-global';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import TripDetailsHero from '../trip-details-hero'; // Changed to TripDetailsHero
import MapWithPolyline from '../googleMapComponents/mapWithPolyline';
// ----------------------------------------------------------------------

export default function TripManagedDetailsView({ id }) {
  const { user } = useAuthContext();
  // Changed function name to TripDetailsView
  const { trip, tripError } = useGetTripManaged(id, user?.accessToken); // Changed to useGetTrip
  console.log(trip);
  const [tripData, setTripData] = useState({}); // Changed to tripData
  // const [tripDriver,setTripDriver] = useState({});
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    if (trip && trip.data) {
      setTripData(trip.data); // Changed to tripData
      // setTripDriver(trip.data.DriverDetail);
    }
    // console.log("use Effect",tripData)
  }, [trip]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: ATTPL_TMS_FIREBASE_API_KEY,
      authDomain: ATTPL_TMS_FIREBASE_AUTH_DOMAIN,
      databaseURL: ATTPL_TMS_FIREBASE_DATABASE_URL,
      projectId: ATTPL_TMS_FIREBASE_PROJECT_ID,
      storageBucket: ATTPL_TMS_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ATTPL_TMS_FIREBASE_MESSAGING_SENDER_ID,
      appId: ATTPL_TMS_FIREBASE_APP_ID,
      measurementId: ATTPL_TMS_FIREBASE_MESUREMENT_ID,
    };
    initializeApp(firebaseConfig);
    setTimeout(() => {
      fetchUserLocationsContinuous(id);
    }, 1000);
  }, [id]);

  const fetchUserLocationsContinuous = (userId) => {
    const db = getDatabase();
    const locationRef = ref(db, `locations/${userId}`);

    onValue(
      locationRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userLocations = snapshot.val();
          const coordinate = Object.values(userLocations).map((location) => ({
            lat: location?.lat,
            lng: location?.lng,
          }));
          setCoordinates(coordinate);
        } else {
          console.log('No data available for the user');
        }
      },
      {
        onlyOnce: false, // Set to false if you want to continuously listen for changes
      }
    );
  };

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${tripError?.message}`} // Changed to tripError
        action={
          <Button
            component={RouterLink}
            href={paths.trip} // Changed to paths.trip
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = trip && ( // Changed to trip
    <>
      <TripDetailsHero title="TRIP DETAILS" coverUrl={BannerBlurImg} />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Trip', // Changed to Trip
              href: paths.dashboard.trip.managedList, // Changed to paths.dashboard.trip.root
            },
            {
              name: 'Details',
              href: paths.trip, // Changed to paths.trip
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Any Suggestion Landmark:</Typography>
              <Typography sx={{ ml: 1 }}> {tripData?.tripDetails}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Trip Status:</Typography>
              <Typography sx={{ ml: 1 }}> {tripData?.tripStatus}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Driver Name:</Typography>
              <Typography sx={{ ml: 1 }}> {tripData?.User?.DriverDetail?.fullName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Acceptance Time:</Typography>
              <Typography sx={{ ml: 1 }}> {tripData?.created_at}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
        <MapWithPolyline coordinates={coordinates} />
      </Container>
    </>
  );

  return (
    <>
      {tripError && renderError}

      {trip && renderPost}
    </>
  );
}
TripManagedDetailsView.propTypes = {
  id: PropTypes.string,
}; // Changed to TripDetailsView
