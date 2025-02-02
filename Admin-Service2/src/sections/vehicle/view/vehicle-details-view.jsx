import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetVehicle } from 'src/api/vehicle'; // Changed to useGetVehicle
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import VehicleDetailsHero from '../vehicle-details-hero'; // Changed to VehicleDetailsHero

// ----------------------------------------------------------------------

export default function VehicleDetailsView({ id }) {
  // Changed function name to VehicleDetailsView
  const { vehicle, vehicleError } = useGetVehicle(id); // Changed to useGetVehicle
  const [vehicleData, setVehicleData] = useState({}); // Changed to vehicleData

  useEffect(() => {
    if (vehicle && vehicle.data) {
      setVehicleData(vehicle.data); // Changed to vehicleData
    }
  }, [vehicle]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${vehicleError?.message}`} // Changed to vehicleError
        action={
          <Button
            component={RouterLink}
            href={paths.vehicle} // Changed to paths.vehicle
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

  const renderPost = vehicle && ( // Changed to vehicle
    <>
      <VehicleDetailsHero title="VEHICLE DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Vehicle', // Changed to Vehicle
              href: paths.dashboard.vehicle.root, // Changed to paths.dashboard.vehicle.root
            },
            {
              name: 'Details',
              href: paths.vehicle, // Changed to paths.vehicle
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <TableContainer sx={{ borderRadius: 4, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          <Table sx={{ minWidth: 500 }} aria-label="vehicle details table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Name:
                </TableCell>
                <TableCell>{vehicleData.vehicleName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Model:
                </TableCell>
                <TableCell>{vehicleData.model}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Year:
                </TableCell>
                <TableCell>{vehicleData.year}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Chasis Number:
                </TableCell>
                <TableCell>{vehicleData.chassisNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Type:
                </TableCell>
                <TableCell>{vehicleData.vehicleType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Color:
                </TableCell>
                <TableCell>{vehicleData.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Manufacturing Year:
                </TableCell>
                <TableCell>{vehicleData.manufacturingYear}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Engine Number:
                </TableCell>
                <TableCell>{vehicleData.engineNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Fuel Type:
                </TableCell>
                <TableCell>{vehicleData.fuelType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Gross Weight:
                </TableCell>
                <TableCell>{vehicleData.grossVehicleWeight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Registeration Number:
                </TableCell>
                <TableCell>{vehicleData.registrationNumber}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Maintenance History:
                </TableCell>
                <TableCell>{vehicleData.maintenanceHistory}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Condition:
                </TableCell>
                <TableCell>{vehicleData.vehicleCondition}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Insurance Expiry Date:
                </TableCell>
                <TableCell>{vehicleData.insuranceExpiryDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle GPS Tracking:
                </TableCell>
                <TableCell>{vehicleData.gpsTracking}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Availability:
                </TableCell>
                <TableCell>{vehicleData.availability}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row" sx={{ minWidth: 180 }}>
                  Vehicle Additional Equipment:
                </TableCell>
                <TableCell>{vehicleData.additionalEquipment}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider sx={{ mt: 5, mb: 2 }} />
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {vehicleError && renderError}

      {vehicle && renderPost}
    </>
  );
}
VehicleDetailsView.propTypes = {
  id: PropTypes.string,
}; // Changed to VehicleDetailsView
