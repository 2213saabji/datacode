import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
// import { FarmerCombineDetailsView } from 'src/sections/Farmer-Service/equipment/view';
import { EmergencyDetailsView } from 'src/sections/Emergency Services/view';


// ----------------------------------------------------------------------

export default function FarmerDetailsPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <Helmet>
                <title> Dashboard:  Emergency Contact Number Details</title>
            </Helmet>

            <EmergencyDetailsView id={`${id}`} />
        </>
    );
}
