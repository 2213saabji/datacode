import { Helmet } from 'react-helmet-async';
import { FarmerListView } from 'src/sections/Farmer-Service/equipment/view';


// ----------------------------------------------------------------------

export default function FarmerDetailsListPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Equipment List</title>
            </Helmet>

            < FarmerListView />
        </>
    );
}
