import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import VehicleOptionsEditView from 'src/sections/vehicle-booking-option/view/vehicle-option-edit-view';


// ----------------------------------------------------------------------

export default function VehicleOptionEditPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <Helmet>
                <title> Dashboard:  Edit Emergency Helpline Number</title>
            </Helmet>

            <VehicleOptionsEditView id={`${id}`} />
        </>
    );
}