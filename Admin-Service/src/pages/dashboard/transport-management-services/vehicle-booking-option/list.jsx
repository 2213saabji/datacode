import { Helmet } from 'react-helmet-async';

import VehicleOptionsList from 'src/sections/vehicle-booking-option/view/vehicle-option-list-view';
// ----------------------------------------------------------------------

export default function VehicleOptionsListPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Vehicle Management</title>
            </Helmet>

            <VehicleOptionsList />
        </>
    );
}
