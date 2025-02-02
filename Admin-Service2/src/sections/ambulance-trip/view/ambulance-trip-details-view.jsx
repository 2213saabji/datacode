/* eslint-disable no-unused-vars */
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useRef, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { initializeApp } from 'firebase/app';
// import { ref, onValue, getDatabase } from 'firebase/database';

import { Box, Grid, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { ATTPL_TMS_SOCKET_API } from 'src/config-global';
import { useGetTrip, otpverifyTMS, updateTripFinish } from 'src/api/ambulancetrip';

import { useSnackbar } from 'src/components/snackbar';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/Ambulance.jpg';
import AmbulanceTripDetailsHero from '../ambulance-trip-details-hero'; // Changed to TripDetailsHero
import OtpModal from '../otp-modal';
import MapRoute from '../ambulance-route-map';

// import MapWithPolyline from '../googleMapComponents/mapWithPolyline';

// ----------------------------------------------------------------------

export default function AmbulanceTripDetailsView({ id }) {
  // Changed function name to TripDetailsView// Changed to useGetTrip
  const [tripData, setTripData] = useState({}); // Changed to tripData
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  const [openOtpModal, setOpenOtpModal] = useState(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [driverLocation, setDriverLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoordinates(newPosition);
      });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetTrip(id).then((res) => {
      console.log(res);
      setTripData(res);
    });
  }, [id]);

  const handleTripUpdate = async (status) => {
    try {
      const data = {
        tripStatus: status,
      };
      const response = await updateTripFinish(id, data);
      if (response) {
        enqueueSnackbar(`Trip ${status}`, { variant: 'success' });
        router.push(paths.dashboard.ambulancetrip.root);
      }
      console.log(response);
    } catch (error) {
      console.log('error');
    }
  };

  const handleTripStart = async (otpCode) => {
    const otpcodeId = localStorage.getItem('tmsOtpCodeId');
    try {
      if (otpverifyTMS) {
        const { response } = await otpverifyTMS(otpCode, otpcodeId);
        console.log(response);
        if (response === 'ok') {
          enqueueSnackbar('verified successfully!', { variant: 'success' });
          await handleTripUpdate('started');
          window.open(
            `https://www.google.com/maps/dir/?api=1&origin=${coordinates.latitude}%2C${coordinates.longitude}&destination=${tripData?.tripSource?.latitude}%2C${tripData?.tripSource?.longitude}&travelmode=driving`,
            '_blank'
          );
        }
      } else {
        // Handle the case when otpverify is undefined
        enqueueSnackbar('Invalid OTP.', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to verify OTP.', { variant: 'error' });
    }
  };

  const socketRef = useRef(null);
  const [socketConnected, setSocketconnect] = useState(false);
  const {
    user: { userId },
  } = useAuthContext();

  useEffect(() => {
    if (!socketRef.current) {
      if (user.userRoleId !== 8) {
        socketRef.current = io(`${ATTPL_TMS_SOCKET_API}`, {
          query: { userId },
        });
      }
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userId, user]);

  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current;

      socket.on('connect', () => {
        setSocketconnect(true);
        console.log('user connected');
        socket.emit('getDriverLocation', { tripId: id }, (err) => {
          console.log('error');
        });
      });

      socket.on('disconnect', () => {
        setSocketconnect(false);
        console.log('user disconnected');
      });
    }
  }, [socketRef, id]);

  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current;
      // console.log("Attempting to emit getDriverLocation event");

      // socket.emit("getDriverLocation", { tripId: id },(err)=>{
      //   console.log("error")
      // });
      // console.log("getDriverLocation event emitted with tripId:", id);

      socket.on('updatedDriverLocation', (data) => {
        console.log('Received updatedDriverLocation event', data);
        if (data) {
          setDriverLocation(data);
        }
      });

      // Cleanup function
      return () => {
        console.log('Cleaning up socket listeners');
        socket.off('updatedDriverLocation');
      };
    }
    console.log('socketRef.current is not available');
    return null;
  }, [socketRef]);

  const renderUserDetails = (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">PATIENT DETAILS</Typography>{' '}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Patient Name: </strong>
            {tripData?.ambulanceUser?.UserProfile?.firstName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Patient Phone: </strong> {tripData?.ambulanceUser?.phone}
          </Typography>
        </Grid>
        {tripData?.ambulanceUser?.email && (
          <Grid item xs={12} md={6} lg={4}>
            <Typography>
              <strong>Patient Email: </strong> {tripData?.ambulanceUser?.email}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={6} lg={41}>
          <Typography>
            <strong>Trip Status: </strong> {tripData?.tripStatus}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {tripData?.tripStatus === 'started' && (
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} justifyContent="space-evenly">
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      const origin = `${coordinates.latitude},${coordinates.longitude}`;
                      const destination = `${tripData?.tripSource?.latitude},${tripData?.tripSource?.longitude}`;
                      const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
                      window.open(url, '_blank');
                    }}
                  >
                    Get Direction
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleTripUpdate('finished')}
                  >
                    Trip Finish
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12} md={6} justifyContent="center">
            {tripData?.tripStatus === 'accepted' && (
              <Button
                variant="contained"
                style={{ padding: '10px 20px' }}
                onClick={() => setOpenOtpModal(true)}
              >
                Start Trip
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );

  // set initial driver location
  useEffect(() => {
    if (tripData?.tripSource) {
      setDriverLocation(tripData?.tripSource);
    }
  }, [tripData]);

  const renderDriverDetails = (
    <Box mt={2}>
      {/* Centering the content */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">DRIVER DETAILS</Typography>{' '}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Driver Name: </strong>
            {tripData?.driver?.driverDetails?.driverName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Driver Phone: </strong> {tripData?.driver?.phone}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Driver Email: </strong> {tripData?.driver?.email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Trip Status: </strong> {tripData?.tripStatus}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ height: '550px' }}>
            <MapRoute driverLocation={driverLocation} userLocation={coordinates} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  const renderPost = // Changed to trip
    (
      <>
        <AmbulanceTripDetailsHero title="TRIP DETAILS" coverUrl={BannerBlurImg} />

        <Container
          maxWidth={false}
          sx={{
            py: 3,
            mb: 2,
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <CustomBreadcrumbs
            links={[
              {
                name: 'Trip', // Changed to Trip
                href: paths.dashboard.ambulancetrip.root, // Changed to paths.dashboard.trip.root
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
            {/* <Divider sx={{ mt: 5, mb: 2 }} /> */}
            {user?.userRoleId === 8 ? <>{renderUserDetails}</> : <>{renderDriverDetails}</>}
          </Stack>
        </Container>
      </>
    );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {/* {tripError && renderError} */}

      {renderPost}

      <OtpModal
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
        onSubmit={handleTripStart}
        otpRef={localStorage.getItem('tmsOtpRef')}
      />
    </>
  );
}
AmbulanceTripDetailsView.propTypes = {
  id: PropTypes.string,
}; // Changed to TripDetailsView
