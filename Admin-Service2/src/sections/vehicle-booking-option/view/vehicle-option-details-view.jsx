import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useGetVehicleOption } from 'src/api/vehicle_option_booking';

// import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import EmergencyServiceHero from '../emergency-service-hero';

export default function VehicleOptionDetailsView({ id }) {
  const { VehicleOption, VehicleOptionError } = useGetVehicleOption(id);
  const [vehicleOptionData, setVehicleOptionData] = useState({});

  useEffect(() => {
    if (VehicleOption && VehicleOption?.data) {
      setVehicleOptionData(VehicleOption?.data);
    }
  }, [VehicleOption]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${VehicleOptionError?.message}`}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.ward}
        //     startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        //     sx={{ mt: 3 }}
        //   >
        //     Back to List
        //   </Button>
        // }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost =
    <>
      {/* <EmergencyServiceHero title='Emergency Servive Details'/> */}

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Button
          component={RouterLink}
          to="/dashboard/vehicle-booking-option"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
        >
          Back
        </Button>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Vehicle Booking Option',
              href: paths.dashboard.vehicleOption.root,
            },
            {
              name: 'Details',
              // href: paths.party,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Vehicle Type:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.vehicleType}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Vehicle Option:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.vehicleOptionFor}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Base Charge:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.baseCharge}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Rent Per KM:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.rentPerKm}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Seating Capacity:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.seatingCapacity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Weight Capacity:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.weightCapacity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Status:</Typography>
              <Typography sx={{ ml: 1 }}> {vehicleOptionData.status}</Typography>
            </Stack>

            {/* <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contact Person:</Typography>
              <Typography sx={{ ml: 1 }}> {emergencyData.contactName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contact Mobile Number:</Typography>
              <Typography sx={{ ml: 1 }}> {emergencyData.phoneNumber}</Typography>
            </Stack> */}
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
    ;

  return (
    <>
      {VehicleOptionError && renderError}

      {VehicleOption && renderPost}
    </>
  );
}
VehicleOptionDetailsView.propTypes = {
  id: PropTypes.string,
};
