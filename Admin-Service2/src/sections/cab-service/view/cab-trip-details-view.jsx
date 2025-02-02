import PropTypes from 'prop-types';
import { fromLatLng } from 'react-geocode';
import { enqueueSnackbar } from 'notistack';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import { Phone, Message } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Grid, Card, Stack, Button, Avatar, Typography, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useAuthContext } from 'src/auth/hooks';
import { otpverifyTMS } from 'src/api/ambulancetrip';
import { UpdateCab, useGetCabTrip } from 'src/api/cab_service';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OtpModal from 'src/sections/ambulance-trip/otp-modal';

import CabServiceRoute from '../cab-service-details-map';
import calculateFare from '../utils/calculateFare';

// ----------------------------------------------------------------------

export default function DeliveryTripDetailsView({ id }) {
  const [tripData, setTripData] = useState({}); // Changed to tripData
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [address, setAddress] = useState({ source: null, drop: null });

  const [driverLocation, setDriverLocation] = useState({ latitude: null, longitude: null });

  const [openOtpModal, setOpenOtpModal] = useState(false);

  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');


  const { pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong } =
    tripData;

  const { user } = useAuthContext();

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
    useGetCabTrip(id).then((res) => {
      console.log(res);
      setTripData(res);
    });
  }, [id]);

  const calculateRoute = useCallback(async () => {
    console.log('calculate route called',pickupLocationLat,pickupLocationLong ,dropoffLocationLat ,dropoffLocationLong);

      if (!pickupLocationLat || !pickupLocationLong || !dropoffLocationLat || !dropoffLocationLong) {
      console.log('calculate route return');
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: Number(pickupLocationLat), lng: Number(pickupLocationLong) },
        destination: { lat: Number(dropoffLocationLat), lng: Number(dropoffLocationLong) },
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: 'pessimistic',
        },
        provideRouteAlternatives: true,
      });

      // setDirectionsResponse(results);
      // setLoading(false);
      console.log(results)
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Route Finding Error:', error);
      enqueueSnackbar('Route Finding is not supported by this browser.', { variant: 'error' });
    }
  }, [setDistance, setDuration,dropoffLocationLong,dropoffLocationLat,pickupLocationLong,pickupLocationLat]);



  
  useEffect(() => {
    if (
      pickupLocationLat &&
    pickupLocationLong &&
      dropoffLocationLat &&
      dropoffLocationLong
    ) {
      calculateRoute();
    }
  }, [calculateRoute,dropoffLocationLong,dropoffLocationLat,pickupLocationLong,pickupLocationLat]);

  const memoizedFromLatLng = useMemo(() => fromLatLng, []);

  const getAddressFromCoordinates = useCallback(
    (lat, lng, isSource) => {
      if (!lat || !lng) return;

      memoizedFromLatLng(lat, lng)
        .then((response) => {
          const newAddress = response.results[0].formatted_address;
          setAddress((prev) => ({
            ...prev,
            [isSource ? 'source' : 'drop']: newAddress,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [memoizedFromLatLng]
  );

  useEffect(() => {
    if (pickupLocationLat && pickupLocationLong) {
      getAddressFromCoordinates(pickupLocationLat, pickupLocationLong, true);
    }
    if (dropoffLocationLat && dropoffLocationLong) {
      getAddressFromCoordinates(dropoffLocationLat, dropoffLocationLong, false);
    }
  }, [
    pickupLocationLat,
    pickupLocationLong,
    dropoffLocationLat,
    dropoffLocationLong,
    getAddressFromCoordinates,
  ]);

  const getFullName = (userProfile) => {
    const userName = [userProfile?.firstName, userProfile?.middleName, userProfile?.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();

    return userName;
  };

  const handleTripStart = async (otpCode) => {
    const otpcodeId = localStorage.getItem('tmsOtpCodeId');
    try {
      if (otpverifyTMS) {
        const { response } = await otpverifyTMS(otpCode, otpcodeId);
        console.log(response);
        if (response === 'ok') {
          enqueueSnackbar('verified successfully!', { variant: 'success' });
          setOpenOtpModal(false);
          const res = await UpdateCab(id, { status: 'started' });
          if (res.success) {
            setTripData(res.data);
            window.open(
              `https://www.google.com/maps/dir/?api=1&origin=${coordinates.latitude}%2C${coordinates.longitude}&destination=${pickupLocationLat}%2C${pickupLocationLong}&travelmode=driving`,
              '_blank'
            );
          }
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

  // set initial driver location
  useEffect(() => {
    if (tripData) {
      setDriverLocation({
        longitude: Number(tripData?.dropoffLocationLong),
        latitude: Number(tripData?.dropoffLocationLat),
      });
    }
  }, [tripData]);

  console.log(tripData);

  const driverInfo = (
    <>
    {console.log(tripData?.status !== "pending")}
    {tripData?.status !== "pending" &&   <Box>
      <Typography variant="body2" fontWeight="bold">
        Driver Name: {tripData?.DriverDetail?.driverName}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        <strong>Phone Number:</strong> {tripData?.DriverDetail?.User?.phone}
      </Typography>
      <br />
      <Typography variant="caption" color="text.secondary">
        <strong> Email:</strong> {tripData?.DriverDetail?.User?.email}
      </Typography>

      <Typography variant="body2" fontWeight="bold">
        Vehicle Information
      </Typography>
      <Typography variant="caption" color="text.secondary">
        <strong> Name:</strong>: {tripData?.DriverDetail?.Vehicles?.vehicleName}
      </Typography>
      <Typography variant="body2" fontWeight="bold">
        Trip Information
      </Typography>
      <Typography variant="caption" color="text.secondary">
        <strong>Trip Distance:</strong>: {distance}
      </Typography>
      <br />
      <Typography variant="caption" color="text.secondary">
        <strong>Trip Duration:</strong>: {duration}
      </Typography>

      <br />
      <Typography variant="caption" color="text.secondary">
        <strong>Trip Fare:</strong>: {calculateFare(distance,tripData?.vehicleOption)} Rs
      </Typography>
    </Box>}
    </>
  
  );

  const userInfo = (
    <Box>
      <Typography variant="body2" fontWeight="bold">
        User Name: {getFullName(tripData?.requester?.UserProfile)}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        <strong>Phone Number:</strong> {tripData?.requester?.phone}
      </Typography>
      <br />
      <Typography variant="caption" color="text.secondary">
        <strong> Email:</strong>{' '}
        {tripData?.requester?.email !== null ? tripData?.requester?.email : 'Not Available'}
      </Typography>
    </Box>
  );

  const renderCabDetails = (
    <>
      <Typography variant="body1" textAlign="center" padding={1} fontWeight={700}>
        OUTGOING DELIVERY
      </Typography>
      <Card sx={{ maxWidth: 350, p: 2, borderRadius: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Vehicle number
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {tripData?.DriverDetail?.Vehicles?.registrationNumber}
            </Typography>
          </Box>
          <Box
            component="img"
            src="/assets/images/cabService/mini_prime.png"
            alt="Car"
            sx={{ width: 100 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24, mr: 1 }}>
              <LocationOnIcon fontSize="small" />
            </Avatar>
            <Typography variant="body2">Pickup Point</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
            {address.source}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 24, height: 24, mr: 1 }}>
              <LocationOnIcon fontSize="small" />
            </Avatar>
            <Typography variant="body2">Drop Point</Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ pl: 4 }}>
            {address.drop}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          
          { user?.userRoleId === 8 ? <> {userInfo}</> : <> {driverInfo}</>}
       

          <Box sx={{ ml: 'auto' }}>
            <IconButton color="primary" size="small">
              <Phone fontSize="small" />
            </IconButton>{' '}
            <br />
            <IconButton color="primary" size="small">
              <Message fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {user?.userRoleId === 8 && tripData?.status === 'accepted' && (
          <Stack sx={{ mb: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              style={{ padding: '10px 20px' }}
              onClick={() => setOpenOtpModal(true)}
            >
              Start Trip
            </Button>
          </Stack>
        )}

        {user?.userRoleId === 8 && tripData?.status === 'started' && (
          <Stack sx={{ mb: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              style={{ padding: '10px 20px' }}
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${coordinates.latitude}%2C${coordinates.longitude}&destination=${pickupLocationLat}%2C${pickupLocationLong}&travelmode=driving`,
                  '_blank'
                )
              }
            >
              Get Direction
            </Button>
          </Stack>
        )}
      </Card>
    </>
  );


  return (
    <>
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
              href: paths.dashboard.cabService.root, // Changed to paths.dashboard.trip.root
            },
            {
              name: 'Details',
              // href: paths.trip, // Changed to paths.trip
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          {renderCabDetails}
        </Grid>
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '550px' }}>
            <CabServiceRoute driverLocation={driverLocation} userLocation={coordinates} />
          </Box>
        </Grid>
      </Grid>

      <OtpModal
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
        onSubmit={handleTripStart}
        otpRef={localStorage.getItem('tmsOtpRef')}
      />
    </>
  );
}
DeliveryTripDetailsView.propTypes = {
  id: PropTypes.string,
};
