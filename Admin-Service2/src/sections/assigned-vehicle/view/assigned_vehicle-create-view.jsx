import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { ref, onValue, getDatabase } from 'firebase/database';
// import { Marker, GoogleMap, LoadScript } from '@react-google-maps/api';

import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
// import { LoadingButton } from "@mui/lab";
import { Grid, Card, Stack, Typography, CardContent } from '@mui/material';

import { useGetVoterTrips } from 'src/api/trip';
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

import FormProvider from 'src/components/hook-form/form-provider';

import MapWithPolyline from '../googleMapComponents/mapWithPolyline';

export default function AssignedVehicle(id) {
  // const { trip, tripError } = useGetVoterTrips(id);
  // const [mapCenter, setMapCenter] = useState({ lat: 40.714728, lng: -73.998672 });
  const [tripData, setTripData] = useState({});
  const [coordinates, setCoordinates] = useState([]);
  const response = useGetVoterTrips();
  // console.log('>>>>trip', response.trips.data);

  useEffect(() => {
    if (response && response?.trips?.data) {
      const assignedTripWithVehicleAndDriver = response?.trips?.data?.find((trip) => {
        console.log('ass', trip);
        return (
          trip?.tripStatus === 'Accepted' && trip?.User?.DriverDetail?.VehicleDetail && trip?.User
        );
      });
      setTripData(assignedTripWithVehicleAndDriver); // Changed to tripData
      // setTripDriver(trip.data.DriverDetail);
      console.log(assignedTripWithVehicleAndDriver);
    }
    // console.log('use Effect', tripData);
  }, [response]);

  useEffect(() => {
    if (tripData?.tripId) {
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
        fetchUserLocationsContinuous(tripData?.tripId);
      }, 1000);
    }
  }, [tripData?.tripId]);

  const fetchUserLocationsContinuous = (userId) => {
    const db = getDatabase();
    // console.log(db);
    const locationRef = ref(db, `locations/${userId}`);
    // console.log(">>>>",locationRef);
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

  return (
    <>
      <Typography sx={{ ml: { xs: 1 }, fontSize: '27px', fontWeight: 700 }} component="h1">
        Your Assigned Vehicle
      </Typography>
      <Stack spacing={2} sx={{ padding: 3 }}>
        {/* <Typography fontSize={26} fontWeight={600}>
          Your Vehicle
        </Typography> */}
        <FormProvider>
          <Stack
            spacing={2}
            sx={{
              borderRadius: '20px',
              padding: 3,
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            }}
          >
            <Typography fontSize="1rem" fontWeight="600">
              Details
            </Typography>
            <Grid container>
              <Grid item xs={12} md={4}>
                {/* First Grid */}
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      No. Of Vehicle
                    </Typography>
                    <Typography variant="body2">
                      {tripData?.User?.DriverDetail?.VehicleDetail?.licensePlate}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      Driver Name
                    </Typography>
                    <Typography variant="body2">
                      {tripData?.User?.DriverDetail?.fullName}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                {/* Second Grid */}
                <Card>
                  <CardContent>
                    <Typography variant="h4" component="div">
                      Mobile Number
                    </Typography>
                    <Typography variant="body2">{tripData?.User?.DriverDetail?.phone}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <MapWithPolyline coordinates={coordinates} />
              </Grid>
            </Grid>
          </Stack>
        </FormProvider>
      </Stack>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );
}
