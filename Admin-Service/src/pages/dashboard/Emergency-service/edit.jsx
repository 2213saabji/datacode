import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import { EmergencyEditView } from 'src/sections/Emergency Services/view';


// ----------------------------------------------------------------------

export default function EmergencyContacteditPage() {
    const params = useParams();

    const { id } = params;

    return (
        <>
            <Helmet>
                <title> Dashboard: EDIT EMERGENCY HELPLINE NUMBER</title>
            </Helmet>

            <EmergencyEditView id={`${id}`} />
        </>
    );
}