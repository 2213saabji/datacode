import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { Box, Grid, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useAuthContext } from 'src/auth/hooks';
import { useGetDeliveryTrip } from 'src/api/delivery_service';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/Courior Services.jpg';
import DeliveryTripDetailsHero from '../delivery-trip-details-hero'; // Changed to TripDetailsHero

// ----------------------------------------------------------------------

export default function DeliveryTripDetailsView({ id }) {
  const [tripData, setTripData] = useState({}); // Changed to tripData
  // const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  // console.log('tripdata', id, coordinates);
  // const router = useRouter();
  // const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate();
  const { user } = useAuthContext();

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.watchPosition((position) => {
  //       const newPosition = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       };
  //       setCoordinates(newPosition);
  //     });
  //   }
  // }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetDeliveryTrip(id).then((res) => {
      console.log(res);
      setTripData(res);
    });
  }, [id]);

  // const handleTripFinish = async () => {

  //   try{
  //     const data = {
  //       "tripStatus":"finished"
  //   }
  //     const response = await updateTripFinish(id,data);
  //     if(response){
  //       enqueueSnackbar('Trip Finished', { variant: 'success' });
  //       router.push(paths.dashboard.deliveryService.root);
  //     }
  //     console.log(response);
  //   } catch(error){
  //     console.log('error');
  //   }

  // };

  const renderItemDetails = (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">ITEM DETAILS</Typography>{' '}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Item Name: </strong>
            {tripData?.itemDetails?.itemName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Item Height: </strong> {tripData?.itemDetails?.height}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Item Width: </strong> {tripData?.itemDetails?.width}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Item Size: </strong> {tripData?.itemDetails?.size}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Item Weight: </strong> {tripData?.itemDetails?.weight}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderUserDetails = (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">Businessman Details</Typography>{' '}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Business Name: </strong>
            {tripData?.businessmanDetails?.businessName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Bussinessman Phone: </strong>{' '}
            {tripData?.businessmanDetails?.businessPhoneNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} md={61} lg={41}>
          <Typography>
            <strong>Business Type: </strong> {tripData?.businessmanDetails?.businessType}
          </Typography>
        </Grid>
        <Grid item xs={12} md={61} lg={41}>
          <Typography>
            <strong>Drop Location Phone Number: </strong>{' '}
            {tripData?.itemDetails?.dropLocationContactNumber}
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={61} justifyContent="flex-start">
            <Button
              variant="contained"
              style={{ padding: '10px 20px' }}
              onClick={() => {
                window.open(
                  `https://www.google.com/maps/dir/?api=1&origin=${tripData?.itemDetails?.pickupLocationLat}%2C${tripData?.itemDetails?.pickupLocationLong}&destination=${tripData?.itemDetails?.dropoffLocationLong}%2C${tripData?.itemDetails?.dropoffLocationLong}&travelmode=driving`,
                  '_blank'
                );
              }}
            >
              Get Direction
            </Button>
          </Grid>
          {/* <Grid item xs={12} sm={61} container justifyContent="flex-end">
        <Button variant="contained" style={{ padding: '10px 20px' }}
        onClick={handleTripFinish}
        >
          Trip Finish
        </Button>
      </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );

  const renderVehicleDetails = (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">VEHICLE DETAILS</Typography>{' '}
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Vehicle Modal: </strong>
            {tripData?.DriverDetail?.Vehicles?.model}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Vehicle Name: </strong> {tripData?.DriverDetail?.Vehicles?.vehicleName}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Vehicle Type: </strong> {tripData?.DriverDetail?.Vehicles?.vehicleType}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Registration Number: </strong> {tripData?.DriverDetail?.Vehicles?.licensePlate}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Fuel Type: </strong> {tripData?.DriverDetail?.Vehicles?.fuelType}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography>
            <strong>Weight Capacity: </strong> {tripData?.DriverDetail?.Vehicles?.weightCapacity}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );

  const renderDriverDetails = (
    <>
      <Box mt={2}>
        {/* Centering the content */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5">DRIVER DETAILS</Typography>{' '}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography>
              <strong>Driver Name: </strong>
              {tripData?.DriverDetail?.driverName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography>
              <strong>Driver Phone: </strong> {tripData?.DriverDetail?.phone}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography>
              <strong>Driver Email: </strong> {tripData?.DriverDetail?.email}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography>
              <strong>Booking Status: </strong> {tripData?.bookingStatus}
            </Typography>
          </Grid>
          {/* <Grid item xs={12}>
          <Box sx={{ height: '550px' }}>
            <MapRoute driverLocation={tripData?.tripSource} userLocation={coordinates} />
          </Box>
        </Grid> */}
        </Grid>
      </Box>
      {renderVehicleDetails}
    </>
  );

  const renderPost = // Changed to trip
    (
      <>
        <DeliveryTripDetailsHero title="DELIVERY TRIP DETAILS" coverUrl={BannerBlurImg} />

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
                href: paths.dashboard.deliveryService.root, // Changed to paths.dashboard.trip.root
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
            {renderItemDetails}
            {user?.userRoleId === 8 && <>{renderUserDetails}</>}
            {user?.userRoleId === 42 && <>{renderDriverDetails}</>}
          </Stack>
        </Container>
      </>
    );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {/* {tripError && renderError} */}

      {renderPost}
    </>
  );
}
DeliveryTripDetailsView.propTypes = {
  id: PropTypes.string,
}; // Changed to TripDetailsView
