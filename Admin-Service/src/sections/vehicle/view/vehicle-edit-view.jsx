import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetVehicle } from 'src/api/vehicle'; // Changed to useGetVehicle

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VehicleNewEditForm from '../vehicle-new-edit-form'; // Changed to VehicleNewEditForm

// ----------------------------------------------------------------------

export default function VehicleEditView({ id }) {
  // Changed function name to VehicleEditView
  const settings = useSettingsContext();

  const { vehicle: currentVehicle } = useGetVehicle(id); // Changed to useGetVehicle
  console.log(currentVehicle);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT VEHICLE DETAILS" // Changed heading
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Vehicle', // Changed to Vehicle
            href: paths.dashboard.vehicle.root, // Changed to paths.dashboard.vehicle.root
          },
          { name: currentVehicle?.data.vehicleName }, // Changed to currentVehicle
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <VehicleNewEditForm currentVehicle={currentVehicle} />
    </Container>
  );
}

VehicleEditView.propTypes = {
  id: PropTypes.string,
};
