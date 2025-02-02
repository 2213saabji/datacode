import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// import { useGetParty } from 'src/api/party';

import { useSettingsContext } from 'src/components/settings';
import { useGetEmergencyNumber } from 'src/api/emergency_service';
import { useGetVehicleOption } from 'src/api/vehicle_option_booking';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Button from '@mui/material/Button';
import { RouterLink } from 'src/routes/components';
import VehicleOptionsForm from '../vehicle-option-new-edit-form';
// ----------------------------------------------------------------------

export default function VehicleOptionsEditView({ id }) {
    const settings = useSettingsContext();
    const { VehicleOption: currentVehicleOption } = useGetVehicleOption(id);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
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
                heading="EDIT VEHICLE BOOKING OPTION"
                links={[
                    {
                        name: 'Vehicle Booking Option',
                        href: paths.dashboard.vehicleOption.root,
                    },
                    // { name: currentParty?.data.partyName },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                    mt: '20px'
                }}
            />

            <VehicleOptionsForm currentVehicleOption={currentVehicleOption} />
        </Container>
    );
}

VehicleOptionsEditView.propTypes = {
    id: PropTypes.string,
};
