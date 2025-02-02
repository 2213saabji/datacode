import { Helmet } from 'react-helmet-async';
// import FarmerRegCreateView from 'src/sections/Farmer-Service/equipment/view/farmer-reg-create-view';
import VehicleOptionCreateView from 'src/sections/vehicle-booking-option/view/vehicle-option-create-view';


// ----------------------------------------------------------------------

export default function VehicleOptionCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Add Emergency Contact Number</title>
      </Helmet>

      <VehicleOptionCreateView />
    </>
  );
}
