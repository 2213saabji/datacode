import { Helmet } from 'react-helmet-async';
import FarmerRegCreateView from 'src/sections/Farmer-Service/equipment/view/farmer-reg-create-view';


// ----------------------------------------------------------------------

export default function FarmerCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Add Create</title>
      </Helmet>

      <FarmerRegCreateView />
    </>
  );
}
