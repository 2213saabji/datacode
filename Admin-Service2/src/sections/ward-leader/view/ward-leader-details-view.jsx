import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetTrip } from 'src/api/wardleader'; // Changed to useGetTrip

import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, onValue, getDatabase } from 'firebase/database';

import { Typography } from '@mui/material';

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

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import TripDetailsHero from '../ward-leader-details-hero'; // Changed to TripDetailsHero
import BannerBlurImg from './assets/overlay_2.jpg';
import MapWithPolyline from '../googleMapComponents/mapWithPolyline';

// ----------------------------------------------------------------------

export default function WardLeaderDetailsView({ id }) {
  // Changed function name to TripDetailsView
  // const { trip, tripError } = useGetTrip(id); // Changed to useGetTrip
  const [tripData, setTripData] = useState({}); // Changed to tripData
  // const [tripDriver, setTripDriver] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const [trips, setTrip] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetTrip(id).then((res) => {
      //  console.log(res);
      setTrip(res);
    });
  }, [id]);
  useEffect(() => {
    // console.log('<<<<<',trips);
    if (trips) {
      // Changed to trips
      setTripData(trips);
    }
  }, [trips]);
  // useEffect(() => {

  //   // console.log("user")

  //   if (trip ) {
  //     console.log('>>>',trip);
  //     setTripData(trip.data); // Changed to tripData
  //     setTripDriver(trip.data.DriverDetail);
  //   }

  // }, [trip]);

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

  const fetchUserLocationsContinuous = (tripId) => {
    const db = getDatabase();
    const locationRef = ref(db, `locations/${tripId}`);

    onValue(
      locationRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const userLocations = snapshot.val();
          const coordinate = Object.values(userLocations).map((location) => ({
            lat: location.lat,
            lng: location.lng,
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

  // const renderError = (
  //   <Container sx={{ my: 10 }}>
  //     <EmptyContent
  //       filled
  //       // title={`${tripError?.message}`} // Changed to tripError
  //       action={
  //         <Button
  //           component={RouterLink}
  //           href={paths.trip} // Changed to paths.trip
  //           startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
  //           sx={{ mt: 3 }}
  //         >
  //           Back to List
  //         </Button>
  //       }
  //       sx={{ py: 10 }}
  //     />
  //   </Container>
  // );

  const renderPost = // Changed to trip
    (
      <>
        <TripDetailsHero title="Trip Details" coverUrl={BannerBlurImg} />

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
                href: paths.dashboard.wardleader.root, // Changed to paths.dashboard.trip.root
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
                <Typography sx={{ mr: 1, minWidth: 180 }}>Trip Deatils:</Typography>
                <Typography sx={{ ml: 1 }}> {tripData?.tripDetails}</Typography>
              </Stack>
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Trip Status:</Typography>
                <Typography sx={{ ml: 1 }}> {tripData?.tripStatus}</Typography>
              </Stack>
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Driver Name:</Typography>
                <Typography sx={{ ml: 1 }}>
                  {' '}
                  {tripData?.User?.DriverDetail
                    ? tripData?.User?.DriverDetail?.fullName
                    : 'Not Assigned'}
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Vehicle Number:</Typography>
                <Typography sx={{ ml: 1 }}>
                  {' '}
                  {tripData?.VehicleDetail ? tripData?.VehicleDetail?.licensePlate : 'Not Assigned'}
                </Typography>
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
      {/* {postLoading && renderSkeleton} */}

      {/* {tripErr && renderError} */}

      {renderPost}
    </>
  );
}
WardLeaderDetailsView.propTypes = {
  id: PropTypes.string,
}; // Changed to TripDetailsView
