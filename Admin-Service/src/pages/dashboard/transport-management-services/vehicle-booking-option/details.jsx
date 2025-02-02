import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import VehicleOptionDetailsView from 'src/sections/vehicle-booking-option/view/vehicle-option-details-view';


// ----------------------------------------------------------------------

export default function VehicleOptionDetailsPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <Helmet>
                <title> Dashboard:  Emergency Contact Number Details</title>
            </Helmet>

            <VehicleOptionDetailsView id={`${id}`} />
        </>
    );
}
